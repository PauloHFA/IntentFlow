import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";
import { ytGet } from "@/lib/youtube/client";
import {
  duracaoIsoParaSegundos,
  segundosParaMinutosCeil,
} from "@/lib/algorithms/duracao";
import { CandidatoVideo } from "@/lib/algorithms/mochila";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const intencaoId = searchParams.get("intencaoId");

    let canais = db.listarCanais();
    if (intencaoId) {
      canais = canais.filter((c) => c.intencaoId === intencaoId);
    }

    if (canais.length === 0) {
      return NextResponse.json({ candidatos: [] });
    }

    const candidatos: CandidatoVideo[] = [];

    // Para cada canal da intenção, busca uploads recentes com baixo custo de cota
    for (const canal of canais) {
      try {
        // 1. Obtém dados do canal e playlist de uploads (1 unidade, em cache na maior parte do tempo)
        const canalRes = await ytGet<{
          items?: Array<{
            contentDetails?: {
              relatedPlaylists?: {
                uploads?: string;
              };
            };
          }>;
        }>("channels", { id: canal.channelId, part: "contentDetails" }, 1);

        const uploadsPlaylistId =
          canalRes.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

        if (!uploadsPlaylistId) continue;

        // 2. Busca os últimos 5 vídeos da playlist de uploads (1 unidade)
        const playlistRes = await ytGet<{
          items?: Array<{
            contentDetails?: {
              videoId?: string;
            };
            snippet?: {
              title?: string;
              description?: string;
              thumbnails?: {
                medium?: { url: string };
              };
            };
          }>;
        }>(
          "playlistItems",
          {
            playlistId: uploadsPlaylistId,
            part: "snippet,contentDetails",
            maxResults: "5",
          },
          1
        );

        const videoItems = playlistRes.items ?? [];
        const videoIds = videoItems
          .map((i) => i.contentDetails?.videoId)
          .filter((id): id is string => Boolean(id));

        if (videoIds.length === 0) continue;

        // 3. Busca detalhes de duração e metadados em lote (1 unidade para até 50 vídeos)
        const videosRes = await ytGet<{
          items?: Array<{
            id: string;
            snippet?: {
              title: string;
              description: string;
              thumbnails?: {
                medium?: { url: string };
              };
            };
            contentDetails?: {
              duration: string;
            };
            status?: {
              madeForKids: boolean;
            };
          }>;
        }>(
          "videos",
          {
            id: videoIds.join(","),
            part: "snippet,contentDetails,status",
          },
          1
        );

        for (const v of videosRes.items ?? []) {
          const segundos = duracaoIsoParaSegundos(v.contentDetails?.duration ?? "PT0S");
          const duracaoMin = segundosParaMinutosCeil(segundos);

          // Ignora vídeos vazios ou extremamente curtos/longos inválidos
          if (duracaoMin > 0) {
            candidatos.push({
              videoId: v.id,
              titulo: v.snippet?.title ?? "Sem título",
              canalNome: canal.titulo,
              miniaturaUrl: v.snippet?.thumbnails?.medium?.url,
              duracaoMin,
              // Valor = prioridade do canal multiplicada
              valor: canal.prioridade * 10,
            });
          }
        }
      } catch (err) {
        console.warn(`Erro ao carregar candidatos do canal ${canal.titulo}:`, err);
      }
    }

    return NextResponse.json({ candidatos });
  } catch (error: any) {
    return NextResponse.json(
      { erro: error.message || "Erro ao obter feed de candidatos" },
      { status: 500 }
    );
  }
}


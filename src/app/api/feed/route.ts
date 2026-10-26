import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";
import { ytGet } from "@/lib/youtube/client";
import {
  duracaoIsoParaSegundos,
  segundosParaMinutosCeil,
} from "@/lib/algorithms/duracao";
import { CandidatoVideo } from "@/lib/algorithms/mochila";

function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Calcula score de relevância semântica baseado nos termos do objetivo do usuário.
 * Permite que "inglês", "react", "vocabulário" etc. recebam prioridade matemática na mochila.
 */
function calcularRelevancia(
  objetivo: string,
  titulo: string,
  descricao: string,
  canalNome: string
): number {
  if (!objetivo || objetivo.trim().length === 0) return 0;

  const termos = normalizarTexto(objetivo)
    .split(/\s+/)
    .filter((t) => t.length > 2);

  const alvo = normalizarTexto(`${titulo} ${descricao} ${canalNome}`);
  let score = 0;

  for (const termo of termos) {
    if (alvo.includes(termo)) {
      score += 150; // grande bônus para coincidir na mochila
    }
  }

  // Bônus específicos para intenções comuns
  const objNorm = normalizarTexto(objetivo);
  if (
    (objNorm.includes("ingl") || objNorm.includes("english") || objNorm.includes("idioma")) &&
    (alvo.includes("ingl") || alvo.includes("english") || alvo.includes("grammar") || alvo.includes("bbc"))
  ) {
    score += 300;
  }

  if (
    (objNorm.includes("react") || objNorm.includes("program") || objNorm.includes("codigo") || objNorm.includes("web")) &&
    (alvo.includes("react") || alvo.includes("code") || alvo.includes("javascript") || alvo.includes("fireship"))
  ) {
    score += 300;
  }

  return score;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const intencaoId = searchParams.get("intencaoId");
    const objetivo = searchParams.get("objetivo") || "";

    let canais = db.listarCanais();

    // Se o usuário especificou uma intenção válida, filtra;
    // Se selecionou "todas" ou vazio, busca de todos os canais para maximizar a relevância ao objetivo!
    if (intencaoId && intencaoId !== "todas") {
      canais = canais.filter((c) => c.intencaoId === intencaoId);
    }

    if (canais.length === 0) {
      return NextResponse.json({ candidatos: [] });
    }

    const candidatos: Array<CandidatoVideo & { descricao?: string }> = [];

    for (const canal of canais) {
      try {
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

          if (duracaoMin > 0) {
            const titulo = v.snippet?.title ?? "Sem título";
            const descricao = v.snippet?.description ?? "";
            const bonusRelevancia = calcularRelevancia(
              objetivo,
              titulo,
              descricao,
              canal.titulo
            );

            candidatos.push({
              videoId: v.id,
              titulo,
              descricao,
              canalNome: canal.titulo,
              miniaturaUrl: v.snippet?.thumbnails?.medium?.url,
              duracaoMin,
              // Valor da mochila = Prioridade do canal + Bônus semântico do objetivo digitado
              valor: canal.prioridade * 10 + bonusRelevancia,
            });
          }
        }
      } catch (err) {
        console.warn(`Erro ao carregar candidatos do canal ${canal.titulo}:`, err);
      }
    }

    // Ordena pelo valor total de relevância decrescente
    candidatos.sort((a, b) => b.valor - a.valor);

    return NextResponse.json({ candidatos });
  } catch (error: any) {
    return NextResponse.json(
      { erro: error.message || "Erro ao obter feed de candidatos" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";
import { ytGet } from "@/lib/youtube/client";
import {
  duracaoIsoParaSegundos,
  segundosParaMinutosCeil,
} from "@/lib/algorithms/duracao";
import { CandidatoVideo } from "@/lib/algorithms/mochila";
import { CATALOGO_DISCIPLINAS, buscarVideosCatalogo } from "@/lib/disciplinas/catalogo";

function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function calcularRelevancia(
  objetivo: string,
  titulo: string,
  descricao: string,
  canalNome: string,
  tags: string[] = []
): number {
  if (!objetivo || objetivo.trim().length === 0) return 0;

  const termos = normalizarTexto(objetivo)
    .split(/\s+/)
    .filter((t) => t.length > 2);

  const alvo = normalizarTexto(`${titulo} ${descricao} ${canalNome} ${tags.join(" ")}`);
  let score = 0;

  for (const termo of termos) {
    if (alvo.includes(termo)) {
      score += 150;
    }
  }

  return score;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const intencaoId = searchParams.get("intencaoId");
    const objetivo = searchParams.get("objetivo") || "";
    const disciplinaId = searchParams.get("disciplinaId");

    const mapaVideos = new Map<string, CandidatoVideo & { descricao?: string }>();

    // 1. Busca vídeos temáticos no catálogo de disciplinas
    const videosDoCatalogo = buscarVideosCatalogo(objetivo, disciplinaId || undefined);

    // Identifica se estamos em uma disciplina específica (para evitar contaminação de outras matérias)
    const ehEscopoEstrito =
      (disciplinaId && disciplinaId !== "todas") ||
      (videosDoCatalogo.length > 0 &&
        videosDoCatalogo.every((v) => v.disciplinaId === videosDoCatalogo[0].disciplinaId));

    for (const v of videosDoCatalogo) {
      const bonusRelevancia = calcularRelevancia(
        objetivo || disciplinaId || "",
        v.titulo,
        v.descricao,
        v.canalNome,
        v.tags
      );

      mapaVideos.set(v.videoId, {
        videoId: v.videoId,
        titulo: v.titulo,
        descricao: v.descricao,
        canalNome: v.canalNome,
        miniaturaUrl: v.miniaturaUrl,
        duracaoMin: v.duracaoMin,
        valor: 100 + bonusRelevancia,
      });
    }

    // 2. Se o usuário escolheu uma disciplina específica (ex: Geografia, Matemática, Química),
    // NUNCA misturamos canais de outras matérias na playlist! Mantém o escopo 100% puro!
    if (ehEscopoEstrito) {
      const candidatosEstritos = Array.from(mapaVideos.values()).sort(
        (a, b) => b.valor - a.valor
      );

      return NextResponse.json({
        candidatos: candidatosEstritos,
        disciplinasDisponiveis: CATALOGO_DISCIPLINAS.map((d) => ({
          id: d.id,
          nome: d.nome,
          icone: d.icone,
          descricao: d.descricao,
          corGradiente: d.corGradiente,
        })),
      });
    }

    // 3. Caso o usuário esteja na busca geral/todas, inclui os uploads dos canais cadastrados
    let canais = db.listarCanais();
    if (intencaoId && intencaoId !== "todas") {
      canais = canais.filter((c) => c.intencaoId === intencaoId);
    }

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
          }>;
        }>(
          "videos",
          {
            id: videoIds.join(","),
            part: "snippet,contentDetails",
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

            const existente = mapaVideos.get(v.id);
            const valorTotal = canal.prioridade * 10 + bonusRelevancia;

            if (!existente || valorTotal > existente.valor) {
              mapaVideos.set(v.id, {
                videoId: v.id,
                titulo,
                descricao,
                canalNome: canal.titulo,
                miniaturaUrl: v.snippet?.thumbnails?.medium?.url,
                duracaoMin,
                valor: valorTotal,
              });
            }
          }
        }
      } catch (err) {
        console.warn(`Erro ao carregar candidatos do canal ${canal.titulo}:`, err);
      }
    }

    const candidatos = Array.from(mapaVideos.values()).sort(
      (a, b) => b.valor - a.valor
    );

    return NextResponse.json({
      candidatos,
      disciplinasDisponiveis: CATALOGO_DISCIPLINAS.map((d) => ({
        id: d.id,
        nome: d.nome,
        icone: d.icone,
        descricao: d.descricao,
        corGradiente: d.corGradiente,
      })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { erro: error.message || "Erro ao obter feed de candidatos" },
      { status: 500 }
    );
  }
}

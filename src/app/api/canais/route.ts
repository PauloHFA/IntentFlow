import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/store";
import { ytGet } from "@/lib/youtube/client";

const AdicionarCanalSchema = z.object({
  identificador: z.string().min(2, "Informe um handle (@canal), ID ou URL válida"),
  intencaoId: z.string().min(1, "Selecione uma intenção"),
  prioridade: z.number().int().min(1).max(5).default(3),
});

export async function GET() {
  const canais = db.listarCanais();
  const intencoes = db.listarIntencoes();
  return NextResponse.json({ canais, intencoes });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = AdicionarCanalSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { erro: "Dados inválidos", detalhes: parsed.error.format() },
        { status: 400 }
      );
    }

    let { identificador, intencaoId, prioridade } = parsed.data;
    identificador = identificador.trim();

    // Se for URL, extrai o handle ou channel id
    if (identificador.includes("youtube.com/")) {
      const url = new URL(identificador);
      const pathname = url.pathname;
      if (pathname.includes("/@")) {
        identificador = pathname.slice(pathname.indexOf("@"));
      } else if (pathname.includes("/channel/")) {
        identificador = pathname.split("/channel/")[1].split("/")[0];
      }
    }

    // Consulta canal via YouTube API (1 unidade)
    const params: Record<string, string> = {
      part: "snippet,contentDetails",
    };

    if (identificador.startsWith("@")) {
      params.forHandle = identificador;
    } else if (identificador.startsWith("UC")) {
      params.id = identificador;
    } else {
      params.forHandle = `@${identificador}`;
    }

    const resposta = await ytGet<{
      items?: Array<{
        id: string;
        snippet: {
          title: string;
          description: string;
          customUrl?: string;
          thumbnails?: {
            medium?: { url: string };
            default?: { url: string };
          };
        };
        contentDetails?: {
          relatedPlaylists?: {
            uploads?: string;
          };
        };
      }>;
    }>("channels", params, 1);

    if (!resposta.items || resposta.items.length === 0) {
      return NextResponse.json(
        { erro: `Nenhum canal encontrado com o identificador '${identificador}'` },
        { status: 404 }
      );
    }

    const item = resposta.items[0];
    const canalCriado = db.adicionarCanal({
      channelId: item.id,
      handle: item.snippet.customUrl || (identificador.startsWith("@") ? identificador : `@${identificador}`),
      titulo: item.snippet.title,
      miniaturaUrl: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
      intencaoId,
      prioridade,
    });

    return NextResponse.json({ canal: canalCriado }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { erro: error.message || "Erro ao adicionar canal" },
      { status: 500 }
    );
  }
}


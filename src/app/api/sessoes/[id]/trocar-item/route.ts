import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/store";

const TrocarItemSchema = z.object({
  videoIdAntigo: z.string().min(1),
  novoItem: z.object({
    videoId: z.string().min(1),
    titulo: z.string().min(1),
    duracaoMin: z.number().positive(),
    canalNome: z.string().optional(),
    miniaturaUrl: z.string().optional(),
  }),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sessaoId } = await params;
    const body = await req.json();
    const parsed = TrocarItemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { erro: "Parâmetros inválidos", detalhes: parsed.error.format() },
        { status: 400 }
      );
    }

    const { videoIdAntigo, novoItem } = parsed.data;

    const sessaoAtualizada = db.trocarItemFila(sessaoId, videoIdAntigo, novoItem);

    if (!sessaoAtualizada) {
      return NextResponse.json(
        { erro: "Sessão ou item a ser substituído não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      sessao: sessaoAtualizada,
      mensagem: "Vídeo substituído com sucesso preservando o orçamento.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { erro: error.message || "Erro ao trocar item da fila" },
      { status: 400 }
    );
  }
}


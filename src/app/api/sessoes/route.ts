import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/store";
import { montarFila, CandidatoVideo } from "@/lib/algorithms/mochila";

const IniciarSessaoSchema = z.object({
  objetivo: z.string().min(3, "Defina um objetivo para a sessão"),
  minutosPlanejados: z.number().int().min(5).max(300),
  candidatos: z.array(
    z.object({
      videoId: z.string(),
      duracaoMin: z.number(),
      valor: z.number(),
      titulo: z.string().optional(),
      canalNome: z.string().optional(),
      miniaturaUrl: z.string().optional(),
    })
  ).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = IniciarSessaoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { erro: "Parâmetros inválidos", detalhes: parsed.error.format() },
        { status: 400 }
      );
    }

    const { objetivo, minutosPlanejados, candidatos } = parsed.data;

    let filaSelecionada: CandidatoVideo[] = [];

    if (candidatos && candidatos.length > 0) {
      // Aplica o algoritmo da Mochila 0/1 com base no orçamento de tempo
      filaSelecionada = montarFila(candidatos, minutosPlanejados, { maxVideos: 6 });
    }

    const sessao = db.criarSessao(
      objetivo,
      minutosPlanejados,
      filaSelecionada.map((item, index) => ({
        videoId: item.videoId,
        ordem: index + 1,
        status: index === 0 ? "assistindo" : "pendente",
        segundosAssistidos: 0,
        titulo: item.titulo,
        duracaoMin: item.duracaoMin,
        canalNome: item.canalNome,
        miniaturaUrl: item.miniaturaUrl,
      }))
    );

    return NextResponse.json({ sessao }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { erro: error.message || "Erro ao iniciar sessão" },
      { status: 500 }
    );
  }
}


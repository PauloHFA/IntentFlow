import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/store";

const EncerrarSchema = z.object({
  reflexao: z.string().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const parsed = EncerrarSchema.safeParse(body);

    const reflexao = parsed.success ? parsed.data.reflexao : undefined;
    const sessao = db.encerrarSessao(id, reflexao);

    if (!sessao) {
      return NextResponse.json({ erro: "Sessão não encontrada" }, { status: 404 });
    }

    const notas = db.listarNotasPorSessao(id);

    return NextResponse.json({
      sessao,
      notas,
      resumo: {
        totalItens: sessao.itens.length,
        segundosAssistidosTotal: sessao.itens.reduce((acc, i) => acc + i.segundosAssistidos, 0),
        notasCriadas: notas.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { erro: error.message || "Erro ao encerrar sessão" },
      { status: 500 }
    );
  }
}


import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/store";
import { proximaRevisao, QualidadeRevisao } from "@/lib/algorithms/sm2";

const AvaliacaoSchema = z.object({
  qualidade: z.number().int().min(0).max(5),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ cartaoId: string }> }
) {
  try {
    const { cartaoId } = await params;
    const body = await req.json();
    const parsed = AvaliacaoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { erro: "Nota de avaliação deve ser entre 0 e 5" },
        { status: 400 }
      );
    }

    const { qualidade } = parsed.data;
    const cartao = db.cartoes.find((c) => c.id === cartaoId);

    if (!cartao) {
      return NextResponse.json({ erro: "Cartão não encontrado" }, { status: 404 });
    }

    // Aplica o algoritmo SM-2
    const cartaoAtualizado = proximaRevisao(
      {
        ...cartao,
        proximaEm: new Date(cartao.proximaEm),
      },
      qualidade as QualidadeRevisao
    );

    const persistido = {
      ...cartaoAtualizado,
      proximaEm: cartaoAtualizado.proximaEm.toISOString(),
    };

    db.atualizarCartao(persistido);
    db.registrarRevisao(cartaoId, qualidade);

    return NextResponse.json({
      cartao: persistido,
      mensagem: "Revisão computada com sucesso pelo algoritmo SM-2",
    });
  } catch (error: any) {
    return NextResponse.json(
      { erro: error.message || "Erro ao registrar revisão" },
      { status: 500 }
    );
  }
}


import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/store";

const NotaSchema = z.object({
  videoId: z.string().min(1),
  sessaoId: z.string().optional(),
  tempoS: z.number().nonnegative(),
  texto: z.string().min(1, "A nota não pode ser vazia"),
  etiquetas: z.array(z.string()).default([]),
  criarCartao: z.boolean().default(false),
  frenteCartao: z.string().optional(),
  versoCartao: z.string().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");
  const sessaoId = searchParams.get("sessaoId");

  if (videoId) {
    const notas = db.listarNotasPorVideo(videoId);
    return NextResponse.json({ notas });
  }

  if (sessaoId) {
    const notas = db.listarNotasPorSessao(sessaoId);
    return NextResponse.json({ notas });
  }

  return NextResponse.json({ notas: db.notas });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = NotaSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { erro: "Parâmetros inválidos", detalhes: parsed.error.format() },
        { status: 400 }
      );
    }

    const { videoId, sessaoId, tempoS, texto, etiquetas, criarCartao, frenteCartao, versoCartao } = parsed.data;

    const nota = db.adicionarNota({
      videoId,
      sessaoId,
      tempoS: Math.round(tempoS),
      texto,
      etiquetas,
      usuarioId: "usr_local_demo",
    });

    let cartaoCriado = null;
    if (criarCartao) {
      cartaoCriado = db.criarCartao(
        nota.id,
        frenteCartao || texto,
        versoCartao || `Nota registrada no tempo ${Math.floor(tempoS / 60)}:${(tempoS % 60).toString().padStart(2, "0")}`
      );
    }

    return NextResponse.json({ nota, cartao: cartaoCriado }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { erro: error.message || "Erro ao criar nota" },
      { status: 500 }
    );
  }
}


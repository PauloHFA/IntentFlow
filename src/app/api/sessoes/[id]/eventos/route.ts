import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/store";

const EventoLoteSchema = z.object({
  eventos: z.array(
    z.object({
      videoId: z.string(),
      tipo: z.enum(["play", "pause", "seek", "heartbeat", "end"]),
      posicaoS: z.number(),
    })
  ),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sessaoId } = await params;
    const body = await req.json();
    const parsed = EventoLoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { erro: "Lote de eventos inválido", detalhes: parsed.error.format() },
        { status: 400 }
      );
    }

    db.registrarEventos(sessaoId, parsed.data.eventos);

    return NextResponse.json({ status: "ok", recebidos: parsed.data.eventos.length });
  } catch (error: any) {
    return NextResponse.json(
      { erro: error.message || "Erro ao registrar eventos" },
      { status: 500 }
    );
  }
}


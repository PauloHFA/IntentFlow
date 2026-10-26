import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sessao = db.obterSessao(id);

  if (!sessao) {
    return NextResponse.json({ erro: "Sessão não encontrada" }, { status: 404 });
  }

  const notas = db.listarNotasPorSessao(id);

  return NextResponse.json({ sessao, notas });
}


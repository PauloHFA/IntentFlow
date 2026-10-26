import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";
import { avaliarGamificacao } from "@/lib/gamification/engine";

export async function GET() {
  const perfil = avaliarGamificacao({
    sessoes: db.sessoes,
    notas: db.notas,
    revisoes: db.revisoes,
  });

  return NextResponse.json(perfil);
}


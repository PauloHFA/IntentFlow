import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET() {
  const metricas = db.obterMetricasSemanais();
  const sessoesRecentes = db.sessoes.slice(-5).reverse();
  const intencoes = db.listarIntencoes();

  return NextResponse.json({
    metricas,
    sessoesRecentes,
    intencoes,
  });
}


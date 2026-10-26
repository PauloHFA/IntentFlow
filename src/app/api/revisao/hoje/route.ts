import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET() {
  const cartoesHoje = db.listarCartoesParaHoje();
  const metricas = db.obterMetricasSemanais();

  return NextResponse.json({
    cartoes: cartoesHoje,
    totalPendentes: cartoesHoje.length,
    metricas,
  });
}


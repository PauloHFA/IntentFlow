import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function DELETE() {
  try {
    const resultado = db.excluirDadosUsuario();
    return NextResponse.json(resultado, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { erro: error.message || "Erro ao excluir dados da conta" },
      { status: 500 }
    );
  }
}


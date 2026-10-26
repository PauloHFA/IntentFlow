import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";
import { gerarMarkdownExport } from "@/lib/export/markdown";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const formato = searchParams.get("formato") || "markdown";

  const dados = db.exportarDadosUsuario();

  if (formato === "json") {
    return new NextResponse(JSON.stringify(dados, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": 'attachment; filename="intentflow-dados.json"',
      },
    });
  }

  // Padrão: Markdown otimizado para Obsidian / Notion / Logseq
  const conteudoMarkdown = gerarMarkdownExport(dados);

  return new NextResponse(conteudoMarkdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": 'attachment; filename="intentflow-notas-estudo.md"',
    },
  });
}


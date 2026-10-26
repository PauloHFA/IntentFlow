import { Sessao, Nota, CartaoEstudo, Canal } from "../db/types";
import { formatarSegundos } from "../algorithms/duracao";

interface DadosExportacao {
  usuarioNome: string;
  dataExportacao: string;
  sessoes: Sessao[];
  notas: Nota[];
  cartoes: CartaoEstudo[];
  canais: Canal[];
}

/**
 * Gera um documento estruturado em Markdown otimizado para Obsidian, Notion e Logseq.
 * Atende ao requisito RF-14 e boas práticas de portabilidade de notas de estudo.
 */
export function gerarMarkdownExport(dados: DadosExportacao): string {
  const linhas: string[] = [];

  linhas.push(`# IntentFlow — Exportação de Conhecimento e Notas`);
  linhas.push(`> Exportado em: ${dados.dataExportacao} | Estudante: ${dados.usuarioNome}\n`);
  linhas.push(`---`);

  // 1. Resumo Geral
  linhas.push(`## 📊 Resumo de Aprendizado`);
  linhas.push(`- **Total de Sessões com Intenção:** ${dados.sessoes.length}`);
  linhas.push(`- **Notas Ancoradas no Tempo:** ${dados.notas.length}`);
  linhas.push(`- **Cartões de Revisão Espaçada (SM-2):** ${dados.cartoes.length}`);
  linhas.push(`- **Canais Confiáveis:** ${dados.canais.length}\n`);

  // 2. Sessões Realizadas
  linhas.push(`## 🎯 Sessões de Foco Realizadas\n`);
  if (dados.sessoes.length === 0) {
    linhas.push(`*Nenhuma sessão realizada ainda.*\n`);
  } else {
    for (const sessao of dados.sessoes) {
      const dataFormatada = new Date(sessao.inicio).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const segundosTotal = sessao.itens.reduce(
        (acc, item) => acc + item.segundosAssistidos,
        0
      );
      const minutosReais = Math.round(segundosTotal / 60);

      linhas.push(`### 📌 ${sessao.objetivo}`);
      linhas.push(`- **Data:** ${dataFormatada}`);
      linhas.push(`- **Tempo:** ${sessao.minutosPlanejados} min planejados | ${minutosReais} min de foco real assistido`);
      linhas.push(`- **Status:** \`${sessao.status}\``);

      if (sessao.reflexao) {
        linhas.push(`\n> **Reflexão da Sessão:**\n> "${sessao.reflexao}"\n`);
      }

      linhas.push(`\n**Vídeos da Fila Finita:**`);
      for (const item of sessao.itens) {
        const link = `https://www.youtube.com/watch?v=${item.videoId}`;
        linhas.push(
          `- [${item.titulo || item.videoId}](${link}) — ${item.canalNome || "Canal"} (${item.duracaoMin || 0} min)`
        );
      }
      linhas.push("");
    }
  }

  // 3. Notas Ancoradas no Tempo
  linhas.push(`## 📝 Notas Ancoradas no Tempo do Vídeo\n`);
  if (dados.notas.length === 0) {
    linhas.push(`*Nenhuma nota cadastrada.*\n`);
  } else {
    for (const nota of dados.notas) {
      const linkTimestamp = `https://www.youtube.com/watch?v=${nota.videoId}&t=${nota.tempoS}s`;
      const tempo = formatarSegundos(nota.tempoS);

      linhas.push(`- [${tempo}](${linkTimestamp}) — ${nota.texto}`);
    }
    linhas.push("");
  }

  // 4. Cartões de Revisão Espaçada (SM-2)
  linhas.push(`## 🧠 Cartões de Revisão Espaçada (Flashcards SM-2)\n`);
  if (dados.cartoes.length === 0) {
    linhas.push(`*Nenhum cartão cadastrado.*\n`);
  } else {
    for (const [idx, cartao] of dados.cartoes.entries()) {
      linhas.push(`#### Cartão #${idx + 1}`);
      linhas.push(`**Pergunta / Frente:**`);
      linhas.push(`${cartao.frente}\n`);
      linhas.push(`**Resposta / Verso:**`);
      linhas.push(`${cartao.verso}\n`);
      linhas.push(
        `*Fator de Facilidade: ${cartao.facilidade} | Repetições: ${cartao.repeticoes} | Intervalo: ${cartao.intervaloDias} dias | Próxima Revisão: ${cartao.proximaEm.slice(0, 10)}*\n`
      );
      linhas.push(`---`);
    }
  }

  return linhas.join("\n");
}


export interface CandidatoVideo {
  videoId: string;
  duracaoMin: number;
  valor: number;
  titulo?: string;
  canalNome?: string;
  miniaturaUrl?: string;
}

export interface OpcoesMontagemFila {
  maxVideos?: number;
}

/**
 * Algoritmo da Mochila 0/1 com Programação Dinâmica.
 * Seleciona o subconjunto de vídeos candidatos de maior valor total que cabe
 * dentro do orçamento de tempo (orcamentoMin) sem excedê-lo.
 * 
 * Complexidade: O(n * T), onde n = candidatos.length e T = orcamentoMin.
 * Documentado na Seção 11.1 do documento de arquitetura.
 */
export function montarFila(
  candidatos: CandidatoVideo[],
  orcamentoMin: number,
  opcoes?: OpcoesMontagemFila
): CandidatoVideo[] {
  const maxVideos = opcoes?.maxVideos ?? 6;

  if (orcamentoMin <= 0 || !candidatos || candidatos.length === 0) {
    return [];
  }

  // Filtra candidatos válidos (duração positiva e que caibam no orçamento total)
  const validos = candidatos.filter(
    (c) => c.duracaoMin > 0 && c.duracaoMin <= orcamentoMin
  );

  if (validos.length === 0) {
    return [];
  }

  const n = validos.length;
  const orcamento = Math.floor(orcamentoMin);

  // Tabela DP: dp[i][t] = valor máximo considerando os primeiros i candidatos e t minutos
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array<number>(orcamento + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const { duracaoMin, valor } = validos[i - 1];
    for (let t = 0; t <= orcamento; t++) {
      dp[i][t] = dp[i - 1][t];
      if (duracaoMin <= t) {
        dp[i][t] = Math.max(dp[i][t], dp[i - 1][t - duracaoMin] + valor);
      }
    }
  }

  // Reconstrução da solução ótima (backtracking)
  const selecionados: CandidatoVideo[] = [];
  let tAtual = orcamento;

  for (let i = n; i > 0; i--) {
    if (dp[i][tAtual] !== dp[i - 1][tAtual]) {
      selecionados.push(validos[i - 1]);
      tAtual -= validos[i - 1].duracaoMin;
    }
  }

  // Ordena por ordem de prioridade/valor decrescente para a experiência de visualização
  const filaFinal = selecionados.reverse().sort((a, b) => b.valor - a.valor);

  // Respeita limite máximo de vídeos se configurado
  if (filaFinal.length > maxVideos) {
    return filaFinal.slice(0, maxVideos);
  }

  return filaFinal;
}


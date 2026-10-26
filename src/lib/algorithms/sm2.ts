export type QualidadeRevisao = 0 | 1 | 2 | 3 | 4 | 5;

export interface CartaoRevisao {
  id?: string;
  notaId?: string;
  frente?: string;
  verso?: string;
  facilidade: number;     // Fator de facilidade inicial: 2.5 (mínimo 1.3)
  intervaloDias: number;  // Intervalo inicial: 0
  repeticoes: number;     // Contagem de repetições bem-sucedidas: 0
  proximaEm: Date;
}

export const VALORES_INICIAIS_SM2 = {
  facilidade: 2.5,
  intervaloDias: 0,
  repeticoes: 0,
};

function adicionarDias(data: Date, dias: number): Date {
  const resultado = new Date(data);
  resultado.setDate(resultado.getDate() + dias);
  return resultado;
}

/**
 * Algoritmo SM-2 (SuperMemo) para Repetição Espaçada.
 * Atualiza o fator de facilidade, contagem de repetições e calcula o próximo intervalo em dias.
 * 
 * Qualidade:
 * 0 - Esquecimento total
 * 1 - Resposta incorreta; ao ver, lembrou
 * 2 - Resposta incorreta, mas parecia fácil
 * 3 - Resposta correta, mas exigiu grande esforço
 * 4 - Resposta correta após hesitação
 * 5 - Resposta correta e imediata
 * 
 * Documentado na Seção 11.4 da especificação.
 */
export function proximaRevisao<T extends CartaoRevisao>(
  cartao: T,
  qualidade: QualidadeRevisao,
  dataAtual: Date = new Date()
): T {
  let { facilidade, intervaloDias, repeticoes } = cartao;

  if (qualidade < 3) {
    // Se a resposta foi insatisfatória, reinicia a sequência
    repeticoes = 0;
    intervaloDias = 1;
  } else {
    // Se acertou (3 a 5), avança a sequência
    repeticoes += 1;
    if (repeticoes === 1) {
      intervaloDias = 1;
    } else if (repeticoes === 2) {
      intervaloDias = 6;
    } else {
      intervaloDias = Math.round(intervaloDias * facilidade);
    }
  }

  // Ajuste do fator de facilidade (EF) com limite mínimo de 1.3
  const novoEF =
    facilidade + 0.1 - (5 - qualidade) * (0.08 + (5 - qualidade) * 0.02);
  facilidade = Math.max(1.3, Number(novoEF.toFixed(2)));

  const proximaEm = adicionarDias(dataAtual, intervaloDias);

  return {
    ...cartao,
    facilidade,
    intervaloDias,
    repeticoes,
    proximaEm,
  };
}


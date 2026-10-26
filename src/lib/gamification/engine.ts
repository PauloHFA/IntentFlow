import { Sessao, Nota, RevisaoHistorico } from "../db/types";
import { Conquista, PerfilGamificacao } from "./types";

export const NIVEIS_MESTRIA = [
  { nivel: 1, titulo: "Aprendiz da Intenção", xpMin: 0, xpMax: 250 },
  { nivel: 2, titulo: "Explorador Focado", xpMin: 250, xpMax: 650 },
  { nivel: 3, titulo: "Praticante Deliberado", xpMin: 650, xpMax: 1400 },
  { nivel: 4, titulo: "Arquiteto da Memória", xpMin: 1400, xpMax: 2600 },
  { nivel: 5, titulo: "Mestre da Retenção", xpMin: 2600, xpMax: 4500 },
  { nivel: 6, titulo: "Sábio Intencional", xpMin: 4500, xpMax: 99999 },
];

export const XP_VALORES = {
  MINUTO_FOCO: 10,
  SESSAO_CONCLUIDA: 50,
  NOTA_CRIADA: 20,
  REVISAO_SM2: 15,
  REFLEXAO_PREENCHIDA: 75,
};

/**
 * Calcula o streak (dias consecutivos) baseado nas datas das sessões
 */
export function calcularStreak(sessoes: Sessao[]): number {
  if (!sessoes || sessoes.length === 0) return 0;

  // Extrai datas únicas YYYY-MM-DD
  const diasUnicos = Array.from(
    new Set(sessoes.map((s) => s.inicio.slice(0, 10)))
  ).sort().reverse();

  if (diasUnicos.length === 0) return 0;

  const hojeIso = new Date().toISOString().slice(0, 10);
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);
  const ontemIso = ontem.toISOString().slice(0, 10);

  // O streak continua se houve sessão hoje ou ontem
  if (diasUnicos[0] !== hojeIso && diasUnicos[0] !== ontemIso) {
    return 0;
  }

  let streak = 1;
  let dataReferencia = new Date(diasUnicos[0]);

  for (let i = 1; i < diasUnicos.length; i++) {
    const dataAnterior = new Date(diasUnicos[i]);
    const diffDias = Math.round(
      (dataReferencia.getTime() - dataAnterior.getTime()) / (1000 * 3600 * 24)
    );

    if (diffDias === 1) {
      streak++;
      dataReferencia = dataAnterior;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Avalia e calcula o estado completo da gamificação
 */
export function avaliarGamificacao(dados: {
  sessoes: Sessao[];
  notas: Nota[];
  revisoes: RevisaoHistorico[];
}): PerfilGamificacao {
  const sessoesConcluidas = dados.sessoes.filter((s) => s.status === "concluida");

  let segundosFocoTotal = 0;
  let reflexoesCount = 0;
  let sessoesInglesCount = 0;

  for (const sessao of dados.sessoes) {
    if (sessao.reflexao && sessao.reflexao.trim().length > 0) {
      reflexoesCount++;
    }
    const objNorm = sessao.objetivo.toLowerCase();
    if (objNorm.includes("ingl") || objNorm.includes("english")) {
      sessoesInglesCount++;
    }
    for (const item of sessao.itens) {
      segundosFocoTotal += item.segundosAssistidos || 0;
    }
  }

  const minutosFocoTotal = Math.round(segundosFocoTotal / 60);
  const totalNotas = dados.notas.length;
  const totalRevisoes = dados.revisoes.length;
  const streakDias = calcularStreak(sessoesConcluidas);

  // Cálculo do XP Total
  const xpTotal =
    minutosFocoTotal * XP_VALORES.MINUTO_FOCO +
    sessoesConcluidas.length * XP_VALORES.SESSAO_CONCLUIDA +
    totalNotas * XP_VALORES.NOTA_CRIADA +
    totalRevisoes * XP_VALORES.REVISAO_SM2 +
    reflexoesCount * XP_VALORES.REFLEXAO_PREENCHIDA;

  // Determina Nível Atual
  let nivelInfo = NIVEIS_MESTRIA[0];
  for (const n of NIVEIS_MESTRIA) {
    if (xpTotal >= n.xpMin) {
      nivelInfo = n;
    } else {
      break;
    }
  }

  const intervaloNivel = nivelInfo.xpMax - nivelInfo.xpMin;
  const xpNoNivelAtual = xpTotal - nivelInfo.xpMin;
  const porcentagemNivel = Math.min(
    100,
    Math.round((xpNoNivelAtual / intervaloNivel) * 100)
  );

  // Avaliação das Conquistas (Badges)
  const conquistas: Conquista[] = [
    {
      id: "primeira_sessao",
      titulo: "Primeiro Passo",
      descricao: "Concluiu sua primeira sessão de estudo com intenção",
      icone: "🎯",
      categoria: "sessoes",
      desbloqueada: sessoesConcluidas.length >= 1,
      progressoAtual: Math.min(1, sessoesConcluidas.length),
      progressoMaximo: 1,
    },
    {
      id: "anti_feed",
      titulo: "Anti-Feed Infinito",
      descricao: "Completou 3 filas finitas de vídeo sem se perder em distrações",
      icone: "⚡",
      categoria: "sessoes",
      desbloqueada: sessoesConcluidas.length >= 3,
      progressoAtual: Math.min(3, sessoesConcluidas.length),
      progressoMaximo: 3,
    },
    {
      id: "hora_ouro",
      titulo: "Hora de Ouro",
      descricao: "Acumulou 60 minutos de foco real assistido",
      icone: "⏱️",
      categoria: "tempo",
      desbloqueada: minutosFocoTotal >= 60,
      progressoAtual: Math.min(60, minutosFocoTotal),
      progressoMaximo: 60,
    },
    {
      id: "escriba",
      titulo: "Escriba Atento",
      descricao: "Anotou 5 insights ancorados no tempo do vídeo",
      icone: "📝",
      categoria: "notas",
      desbloqueada: totalNotas >= 5,
      progressoAtual: Math.min(5, totalNotas),
      progressoMaximo: 5,
    },
    {
      id: "cerebro_sm2",
      titulo: "Memória Blindada (SM-2)",
      descricao: "Realizou 5 repetições espaçadas para consolidar a memória",
      icone: "🧠",
      categoria: "revisao",
      desbloqueada: totalRevisoes >= 5,
      progressoAtual: Math.min(5, totalRevisoes),
      progressoMaximo: 5,
    },
    {
      id: "poliglota",
      titulo: "Cidadão do Mundo",
      descricao: "Completou uma sessão de aprendizado focada em Inglês/Idiomas",
      icone: "🇬🇧",
      categoria: "sessoes",
      desbloqueada: sessoesInglesCount >= 1,
      progressoAtual: Math.min(1, sessoesInglesCount),
      progressoMaximo: 1,
    },
    {
      id: "filosofo",
      titulo: "Mente Reflexiva",
      descricao: "Escreveu 2 reflexões sobre o que aprendeu ao fim da sessão",
      icone: "🦉",
      categoria: "sessoes",
      desbloqueada: reflexoesCount >= 2,
      progressoAtual: Math.min(2, reflexoesCount),
      progressoMaximo: 2,
    },
    {
      id: "chama_viva",
      titulo: "Chama Viva",
      descricao: "Manteve uma sequência de estudo diário de 3 dias seguidos",
      icone: "🔥",
      categoria: "streak",
      desbloqueada: streakDias >= 3,
      progressoAtual: Math.min(3, streakDias),
      progressoMaximo: 3,
    },
  ];

  return {
    xpTotal,
    nivelAtual: nivelInfo.nivel,
    nivelTitulo: nivelInfo.titulo,
    xpNivelAtual: xpNoNivelAtual,
    xpProximoNivel: nivelInfo.xpMax,
    porcentagemNivel,
    streakDias,
    conquistas,
    totalSessoesConcluidas: sessoesConcluidas.length,
    minutosFocoTotal,
  };
}

export interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  desbloqueada: boolean;
  progressoAtual: number;
  progressoMaximo: number;
  categoria: "sessoes" | "tempo" | "notas" | "revisao" | "streak";
}

export interface PerfilGamificacao {
  xpTotal: number;
  nivelAtual: number;
  nivelTitulo: string;
  xpNivelAtual: number;
  xpProximoNivel: number;
  porcentagemNivel: number;
  streakDias: number;
  conquistas: Conquista[];
  totalSessoesConcluidas: number;
  minutosFocoTotal: number;
}


export interface Usuario {
  id: string;
  nome: string;
  email?: string;
  criadoEm: string;
}

export interface Intencao {
  id: string;
  usuarioId: string;
  nome: string;
  metaMinutosSemana: number;
}

export interface Canal {
  id: string;
  usuarioId: string;
  channelId: string;
  handle?: string;
  titulo: string;
  miniaturaUrl?: string;
  intencaoId: string;
  prioridade: number; // 1 a 5
}

export interface SessaoItem {
  id: string;
  sessaoId: string;
  videoId: string;
  ordem: number;
  status: "pendente" | "assistindo" | "concluido" | "pulado";
  segundosAssistidos: number;
  titulo?: string;
  duracaoMin?: number;
  miniaturaUrl?: string;
  canalNome?: string;
}

export interface Sessao {
  id: string;
  usuarioId: string;
  objetivo: string;
  minutosPlanejados: number;
  inicio: string;
  fim?: string;
  status: "em_andamento" | "concluida" | "cancelada";
  reflexao?: string;
  itens: SessaoItem[];
}

export interface EventoReproducao {
  id: string;
  sessaoId: string;
  videoId: string;
  tipo: "play" | "pause" | "seek" | "heartbeat" | "end";
  posicaoS: number;
  criadoEm: string;
}

export interface Nota {
  id: string;
  usuarioId: string;
  sessaoId?: string;
  videoId: string;
  tempoS: number;
  texto: string;
  etiquetas: string[];
  criadoEm: string;
}

export interface CartaoEstudo {
  id: string;
  notaId: string;
  frente: string;
  verso: string;
  facilidade: number;
  intervaloDias: number;
  repeticoes: number;
  proximaEm: string;
}

export interface RevisaoHistorico {
  id: string;
  cartaoId: string;
  qualidade: number; // 0 a 5
  revisadoEm: string;
}


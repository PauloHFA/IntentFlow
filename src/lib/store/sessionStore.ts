import { create } from "zustand";

export interface ItemFila {
  videoId: string;
  ordem: number;
  titulo?: string;
  duracaoMin?: number;
  miniaturaUrl?: string;
  canalNome?: string;
  segundosAssistidos: number;
}

export interface NotaItem {
  id: string;
  tempoS: number;
  texto: string;
  etiquetas: string[];
}

interface EstadoSessao {
  sessaoId: string | null;
  objetivo: string;
  minutosPlanejados: number;
  segundosDecorridos: number;
  estaTocando: boolean;
  itemAtualIndex: number;
  fila: ItemFila[];
  notas: NotaItem[];
  playerTempoAtual: number;

  // Ações
  iniciarSessaoLocal: (
    sessaoId: string,
    objetivo: string,
    minutosPlanejados: number,
    fila: ItemFila[]
  ) => void;
  avancarTempo: (segundos: number) => void;
  setEstaTocando: (tocando: boolean) => void;
  setPlayerTempoAtual: (segundos: number) => void;
  selecionarItemFila: (index: number) => void;
  proximoItemFila: () => void;
  adicionarNotaLocal: (nota: NotaItem) => void;
  encerrarSessaoLocal: () => void;
}

export const useSessionStore = create<EstadoSessao>((set, get) => ({
  sessaoId: null,
  objetivo: "",
  minutosPlanejados: 30,
  segundosDecorridos: 0,
  estaTocando: false,
  itemAtualIndex: 0,
  fila: [],
  notas: [],
  playerTempoAtual: 0,

  iniciarSessaoLocal: (sessaoId, objetivo, minutosPlanejados, fila) => {
    set({
      sessaoId,
      objetivo,
      minutosPlanejados,
      segundosDecorridos: 0,
      estaTocando: false,
      itemAtualIndex: 0,
      fila,
      notas: [],
      playerTempoAtual: 0,
    });
  },

  avancarTempo: (segundos) => {
    set((state) => {
      // Só avança se estiver tocando
      if (!state.estaTocando) return state;

      const novaFila = [...state.fila];
      if (novaFila[state.itemAtualIndex]) {
        novaFila[state.itemAtualIndex].segundosAssistidos += segundos;
      }

      return {
        segundosDecorridos: state.segundosDecorridos + segundos,
        fila: novaFila,
      };
    });
  },

  setEstaTocando: (tocando) => set({ estaTocando: tocando }),
  setPlayerTempoAtual: (segundos) => set({ playerTempoAtual: segundos }),

  selecionarItemFila: (index) => {
    const { fila } = get();
    if (index >= 0 && index < fila.length) {
      set({ itemAtualIndex: index, playerTempoAtual: 0 });
    }
  },

  proximoItemFila: () => {
    const { itemAtualIndex, fila } = get();
    if (itemAtualIndex + 1 < fila.length) {
      set({ itemAtualIndex: itemAtualIndex + 1, playerTempoAtual: 0 });
    }
  },

  adicionarNotaLocal: (nota) => {
    set((state) => ({
      notas: [...state.notas, nota].sort((a, b) => a.tempoS - b.tempoS),
    }));
  },

  encerrarSessaoLocal: () => {
    set({
      sessaoId: null,
      estaTocando: false,
    });
  },
}));


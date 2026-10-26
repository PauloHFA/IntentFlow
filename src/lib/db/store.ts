import {
  Usuario,
  Intencao,
  Canal,
  Sessao,
  SessaoItem,
  Nota,
  CartaoEstudo,
  RevisaoHistorico,
  EventoReproducao,
} from "./types";
import { VALORES_INICIAIS_SM2 } from "../algorithms/sm2";

const USUARIO_PADRAO_ID = "usr_local_demo";

class DatabaseStore {
  usuarios: Usuario[] = [
    {
      id: USUARIO_PADRAO_ID,
      nome: "Estudante Intencional",
      email: "demo@intentflow.app",
      criadoEm: new Date().toISOString(),
    },
  ];

  intencoes: Intencao[] = [
    { id: "int-aprender", usuarioId: USUARIO_PADRAO_ID, nome: "Aprender", metaMinutosSemana: 180 },
    { id: "int-desenvolvimento", usuarioId: USUARIO_PADRAO_ID, nome: "Desenvolvimento de Software", metaMinutosSemana: 240 },
    { id: "int-relaxar", usuarioId: USUARIO_PADRAO_ID, nome: "Relaxar & Curiosidades", metaMinutosSemana: 60 },
  ];

  canais: Canal[] = [
    {
      id: "cn-1",
      usuarioId: USUARIO_PADRAO_ID,
      channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
      handle: "@GoogleDevelopers",
      titulo: "Google Developers",
      miniaturaUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&h=150&fit=crop",
      intencaoId: "int-desenvolvimento",
      prioridade: 5,
    },
    {
      id: "cn-2",
      usuarioId: USUARIO_PADRAO_ID,
      channelId: "UCreact123456789",
      handle: "@react",
      titulo: "React Community",
      miniaturaUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&h=150&fit=crop",
      intencaoId: "int-desenvolvimento",
      prioridade: 4,
    },
    {
      id: "cn-3",
      usuarioId: USUARIO_PADRAO_ID,
      channelId: "UCfireship987654",
      handle: "@fireship",
      titulo: "Fireship",
      miniaturaUrl: "https://images.unsplash.com/photo-1534972195531-a756b1140f6c?w=150&h=150&fit=crop",
      intencaoId: "int-aprender",
      prioridade: 5,
    },
  ];

  sessoes: Sessao[] = [];
  eventos: EventoReproducao[] = [];
  notas: Nota[] = [];
  cartoes: CartaoEstudo[] = [];
  revisoes: RevisaoHistorico[] = [];

  // Intenções
  listarIntencoes(usuarioId = USUARIO_PADRAO_ID): Intencao[] {
    return this.intencoes.filter((i) => i.usuarioId === usuarioId);
  }

  adicionarIntencao(nome: string, metaMinutos = 120, usuarioId = USUARIO_PADRAO_ID): Intencao {
    const intencao: Intencao = {
      id: `int-${Date.now()}`,
      usuarioId,
      nome,
      metaMinutosSemana: metaMinutos,
    };
    this.intencoes.push(intencao);
    return intencao;
  }

  // Canais
  listarCanais(usuarioId = USUARIO_PADRAO_ID): Canal[] {
    return this.canais.filter((c) => c.usuarioId === usuarioId);
  }

  adicionarCanal(canal: Omit<Canal, "id" | "usuarioId">, usuarioId = USUARIO_PADRAO_ID): Canal {
    const novo: Canal = {
      ...canal,
      id: `cn-${Date.now()}`,
      usuarioId,
    };
    this.canais.push(novo);
    return novo;
  }

  removerCanal(id: string, usuarioId = USUARIO_PADRAO_ID): boolean {
    const idx = this.canais.findIndex((c) => c.id === id && c.usuarioId === usuarioId);
    if (idx >= 0) {
      this.canais.splice(idx, 1);
      return true;
    }
    return false;
  }

  // Sessões
  criarSessao(
    objetivo: string,
    minutosPlanejados: number,
    itens: Array<Omit<SessaoItem, "id" | "sessaoId">>,
    usuarioId = USUARIO_PADRAO_ID
  ): Sessao {
    const sessaoId = `ses-${Date.now()}`;
    const sessao: Sessao = {
      id: sessaoId,
      usuarioId,
      objetivo,
      minutosPlanejados,
      inicio: new Date().toISOString(),
      status: "em_andamento",
      itens: itens.map((item, index) => ({
        ...item,
        id: `si-${sessaoId}-${index}`,
        sessaoId,
      })),
    };
    this.sessoes.push(sessao);
    return sessao;
  }

  obterSessao(id: string): Sessao | null {
    return this.sessoes.find((s) => s.id === id) ?? null;
  }

  encerrarSessao(id: string, reflexao?: string): Sessao | null {
    const sessao = this.obterSessao(id);
    if (!sessao) return null;
    sessao.status = "concluida";
    sessao.fim = new Date().toISOString();
    if (reflexao) sessao.reflexao = reflexao;
    return sessao;
  }

  // Notas
  adicionarNota(nota: Omit<Nota, "id" | "criadoEm">): Nota {
    const nova: Nota = {
      ...nota,
      id: `nt-${Date.now()}`,
      criadoEm: new Date().toISOString(),
    };
    this.notas.push(nova);
    return nova;
  }

  listarNotasPorVideo(videoId: string, usuarioId = USUARIO_PADRAO_ID): Nota[] {
    return this.notas
      .filter((n) => n.videoId === videoId && n.usuarioId === usuarioId)
      .sort((a, b) => a.tempoS - b.tempoS);
  }

  listarNotasPorSessao(sessaoId: string): Nota[] {
    return this.notas
      .filter((n) => n.sessaoId === sessaoId)
      .sort((a, b) => a.tempoS - b.tempoS);
  }

  // Cartões SM-2
  criarCartao(notaId: string, frente: string, verso: string): CartaoEstudo {
    const cartao: CartaoEstudo = {
      id: `crd-${Date.now()}`,
      notaId,
      frente,
      verso,
      facilidade: VALORES_INICIAIS_SM2.facilidade,
      intervaloDias: VALORES_INICIAIS_SM2.intervaloDias,
      repeticoes: VALORES_INICIAIS_SM2.repeticoes,
      proximaEm: new Date().toISOString(),
    };
    this.cartoes.push(cartao);
    return cartao;
  }

  listarCartoesParaHoje(): CartaoEstudo[] {
    const hojeIso = new Date().toISOString().slice(0, 10);
    return this.cartoes.filter((c) => c.proximaEm.slice(0, 10) <= hojeIso);
  }

  atualizarCartao(cartaoAtualizado: CartaoEstudo): void {
    const idx = this.cartoes.findIndex((c) => c.id === cartaoAtualizado.id);
    if (idx >= 0) {
      this.cartoes[idx] = cartaoAtualizado;
    }
  }

  registrarRevisao(cartaoId: string, qualidade: number): void {
    this.revisoes.push({
      id: `rev-${Date.now()}`,
      cartaoId,
      qualidade,
      revisadoEm: new Date().toISOString(),
    });
  }

  // Eventos de reprodução e tempo assistido real
  registrarEventos(sessaoId: string, eventos: Array<Omit<EventoReproducao, "id" | "sessaoId" | "criadoEm">>): void {
    const agora = new Date().toISOString();
    for (const ev of eventos) {
      this.eventos.push({
        ...ev,
        id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        sessaoId,
        criadoEm: agora,
      });

      // Atualiza segundos assistidos no item correspondente
      const sessao = this.obterSessao(sessaoId);
      if (sessao) {
        const item = sessao.itens.find((i) => i.videoId === ev.videoId);
        if (item && ev.tipo === "heartbeat") {
          item.segundosAssistidos += 15; // batimento a cada 15 segundos
        }
      }
    }
  }

  // Métricas para Painel Semanal
  obterMetricasSemanais(usuarioId = USUARIO_PADRAO_ID) {
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
    const limiteIso = seteDiasAtras.toISOString();

    const sessoesRecentes = this.sessoes.filter(
      (s) => s.usuarioId === usuarioId && s.inicio >= limiteIso
    );

    let segundosTotaisAssistidos = 0;
    for (const s of sessoesRecentes) {
      for (const item of s.itens) {
        segundosTotaisAssistidos += item.segundosAssistidos;
      }
    }

    return {
      totalSessoes: sessoesRecentes.length,
      minutosAssistidosHistorico: Math.round(segundosTotaisAssistidos / 60),
      totalNotasCriadas: this.notas.filter((n) => n.usuarioId === usuarioId).length,
      totalCartoesRevisados: this.revisoes.length,
      cartoesPendentesHoje: this.listarCartoesParaHoje().length,
    };
  }

  // Exportação e Exclusão (RF-14 / LGPD)
  exportarDadosUsuario(usuarioId = USUARIO_PADRAO_ID) {
    const usuario = this.usuarios.find((u) => u.id === usuarioId);
    const sessoes = this.sessoes.filter((s) => s.usuarioId === usuarioId);
    const notas = this.notas.filter((n) => n.usuarioId === usuarioId);
    const canais = this.canais.filter((c) => c.usuarioId === usuarioId);
    const notaIds = new Set(notas.map((n) => n.id));
    const cartoes = this.cartoes.filter((c) => notaIds.has(c.notaId));

    return {
      usuarioNome: usuario?.nome || "Estudante Intencional",
      dataExportacao: new Date().toISOString(),
      sessoes,
      notas,
      cartoes,
      canais,
    };
  }

  excluirDadosUsuario(usuarioId = USUARIO_PADRAO_ID) {
    const sessoesRemovidas = this.sessoes.filter((s) => s.usuarioId === usuarioId);
    const sessoesIds = new Set(sessoesRemovidas.map((s) => s.id));

    this.sessoes = this.sessoes.filter((s) => s.usuarioId !== usuarioId);
    this.eventos = this.eventos.filter((e) => !sessoesIds.has(e.sessaoId));

    const notasRemovidas = this.notas.filter((n) => n.usuarioId === usuarioId);
    const notasIds = new Set(notasRemovidas.map((n) => n.id));

    this.notas = this.notas.filter((n) => n.usuarioId !== usuarioId);
    this.cartoes = this.cartoes.filter((c) => !notasIds.has(c.notaId));
    this.revisoes = []; // limpa histórico de revisões associadas
    this.canais = this.canais.filter((c) => c.usuarioId !== usuarioId);

    return {
      sucesso: true,
      mensagem: "Todos os dados pessoais, notas, sessões e histórico foram excluídos permanentemente.",
    };
  }
}

// Singleton na aplicação
export const db = new DatabaseStore();
export { USUARIO_PADRAO_ID };


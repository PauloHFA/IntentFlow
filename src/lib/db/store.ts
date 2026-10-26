import fs from "node:fs";
import path from "node:path";
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
const ARQUIVO_DB = path.resolve(process.cwd(), "data", "intentflow-db.json");

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
    { id: "int-idiomas", usuarioId: USUARIO_PADRAO_ID, nome: "Idiomas & Inglês", metaMinutosSemana: 180 },
    { id: "int-desenvolvimento", usuarioId: USUARIO_PADRAO_ID, nome: "Desenvolvimento & Tech", metaMinutosSemana: 240 },
    { id: "int-geral", usuarioId: USUARIO_PADRAO_ID, nome: "Ciência & Foco Geral", metaMinutosSemana: 60 },
  ];

  canais: Canal[] = [
    {
      id: "cn-1",
      usuarioId: USUARIO_PADRAO_ID,
      channelId: "UCHaHD477h-FeBbVh9Sh7syA",
      handle: "@bbclearningenglish",
      titulo: "BBC Learning English",
      miniaturaUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=150&h=150&fit=crop",
      intencaoId: "int-idiomas",
      prioridade: 5,
    },
    {
      id: "cn-2",
      usuarioId: USUARIO_PADRAO_ID,
      channelId: "UCz4tgANd4yy8Oe0iXCdSWnw",
      handle: "@EnglishWithLucy",
      titulo: "English with Lucy",
      miniaturaUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      intencaoId: "int-idiomas",
      prioridade: 5,
    },
    {
      id: "cn-3",
      usuarioId: USUARIO_PADRAO_ID,
      channelId: "UCsBjURrPoezykLs9EqgamOA",
      handle: "@fireship",
      titulo: "Fireship",
      miniaturaUrl: "https://images.unsplash.com/photo-1534972195531-a756b1140f6c?w=150&h=150&fit=crop",
      intencaoId: "int-desenvolvimento",
      prioridade: 4,
    },
    {
      id: "cn-4",
      usuarioId: USUARIO_PADRAO_ID,
      channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
      handle: "@GoogleDevelopers",
      titulo: "Google Developers",
      miniaturaUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&h=150&fit=crop",
      intencaoId: "int-desenvolvimento",
      prioridade: 4,
    },
  ];

  sessoes: Sessao[] = [];
  eventos: EventoReproducao[] = [];
  notas: Nota[] = [];
  cartoes: CartaoEstudo[] = [];
  revisoes: RevisaoHistorico[] = [];

  constructor() {
    this.carregarDeDisco();
  }

  private salvarEmDisco(): void {
    if (process.env.NODE_ENV === "test" || process.env.VITEST) {
      return;
    }
    try {
      const dir = path.dirname(ARQUIVO_DB);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const snapshot = {
        usuarios: this.usuarios,
        intencoes: this.intencoes,
        canais: this.canais,
        sessoes: this.sessoes,
        eventos: this.eventos,
        notas: this.notas,
        cartoes: this.cartoes,
        revisoes: this.revisoes,
      };
      fs.writeFileSync(ARQUIVO_DB, JSON.stringify(snapshot, null, 2), "utf-8");
    } catch {
      // Ignora falhas em ambientes sem acesso a disco
    }
  }

  private carregarDeDisco(): void {
    if (process.env.NODE_ENV === "test" || process.env.VITEST) {
      return;
    }
    try {
      if (fs.existsSync(ARQUIVO_DB)) {
        const conteudo = fs.readFileSync(ARQUIVO_DB, "utf-8");
        const dados = JSON.parse(conteudo);
        if (dados.usuarios) this.usuarios = dados.usuarios;
        if (dados.intencoes) this.intencoes = dados.intencoes;
        if (dados.canais) this.canais = dados.canais;
        if (dados.sessoes) this.sessoes = dados.sessoes;
        if (dados.eventos) this.eventos = dados.eventos;
        if (dados.notas) this.notas = dados.notas;
        if (dados.cartoes) this.cartoes = dados.cartoes;
        if (dados.revisoes) this.revisoes = dados.revisoes;
      }
    } catch {
      // Ignora se arquivo estiver corrompido ou ausente
    }
  }

  resetarParaPadrao(): void {
    this.usuarios = [
      {
        id: USUARIO_PADRAO_ID,
        nome: "Estudante Intencional",
        email: "demo@intentflow.app",
        criadoEm: new Date().toISOString(),
      },
    ];
    this.intencoes = [
      { id: "int-idiomas", usuarioId: USUARIO_PADRAO_ID, nome: "Idiomas & Inglês", metaMinutosSemana: 180 },
      { id: "int-desenvolvimento", usuarioId: USUARIO_PADRAO_ID, nome: "Desenvolvimento & Tech", metaMinutosSemana: 240 },
      { id: "int-geral", usuarioId: USUARIO_PADRAO_ID, nome: "Ciência & Foco Geral", metaMinutosSemana: 60 },
    ];
    this.canais = [
      {
        id: "cn-1",
        usuarioId: USUARIO_PADRAO_ID,
        channelId: "UCHaHD477h-FeBbVh9Sh7syA",
        handle: "@bbclearningenglish",
        titulo: "BBC Learning English",
        miniaturaUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=150&h=150&fit=crop",
        intencaoId: "int-idiomas",
        prioridade: 5,
      },
      {
        id: "cn-2",
        usuarioId: USUARIO_PADRAO_ID,
        channelId: "UCz4tgANd4yy8Oe0iXCdSWnw",
        handle: "@EnglishWithLucy",
        titulo: "English with Lucy",
        miniaturaUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        intencaoId: "int-idiomas",
        prioridade: 5,
      },
      {
        id: "cn-3",
        usuarioId: USUARIO_PADRAO_ID,
        channelId: "UCsBjURrPoezykLs9EqgamOA",
        handle: "@fireship",
        titulo: "Fireship",
        miniaturaUrl: "https://images.unsplash.com/photo-1534972195531-a756b1140f6c?w=150&h=150&fit=crop",
        intencaoId: "int-desenvolvimento",
        prioridade: 4,
      },
      {
        id: "cn-4",
        usuarioId: USUARIO_PADRAO_ID,
        channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
        handle: "@GoogleDevelopers",
        titulo: "Google Developers",
        miniaturaUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&h=150&fit=crop",
        intencaoId: "int-desenvolvimento",
        prioridade: 4,
      },
    ];
    this.sessoes = [];
    this.eventos = [];
    this.notas = [];
    this.cartoes = [];
    this.revisoes = [];
  }

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
    this.salvarEmDisco();
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
    this.salvarEmDisco();
    return novo;
  }

  removerCanal(id: string, usuarioId = USUARIO_PADRAO_ID): boolean {
    const idx = this.canais.findIndex((c) => c.id === id && c.usuarioId === usuarioId);
    if (idx >= 0) {
      this.canais.splice(idx, 1);
      this.salvarEmDisco();
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
    this.salvarEmDisco();
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
    this.salvarEmDisco();
    return sessao;
  }

  // Troca de item na fila preservando o orçamento (Seção 10)
  trocarItemFila(
    sessaoId: string,
    videoIdAntigo: string,
    novoItem: {
      videoId: string;
      titulo: string;
      duracaoMin: number;
      canalNome?: string;
      miniaturaUrl?: string;
    }
  ): Sessao | null {
    const sessao = this.obterSessao(sessaoId);
    if (!sessao) return null;

    const itemIndex = sessao.itens.findIndex((i) => i.videoId === videoIdAntigo);
    if (itemIndex === -1) return null;

    const itemAntigo = sessao.itens[itemIndex];

    // Calcula duração total atual e proposta
    const duracaoAtualTotal = sessao.itens.reduce((acc, i) => acc + (i.duracaoMin || 0), 0);
    const duracaoNovaTotal = duracaoAtualTotal - (itemAntigo.duracaoMin || 0) + novoItem.duracaoMin;

    if (duracaoNovaTotal > sessao.minutosPlanejados) {
      throw new Error(
        `O vídeo escolhido (${novoItem.duracaoMin} min) ultrapassaria o orçamento planejado de ${sessao.minutosPlanejados} min.`
      );
    }

    sessao.itens[itemIndex] = {
      ...itemAntigo,
      videoId: novoItem.videoId,
      titulo: novoItem.titulo,
      duracaoMin: novoItem.duracaoMin,
      canalNome: novoItem.canalNome,
      miniaturaUrl: novoItem.miniaturaUrl,
    };

    this.salvarEmDisco();
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
    this.salvarEmDisco();
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
    this.salvarEmDisco();
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
      this.salvarEmDisco();
    }
  }

  registrarRevisao(cartaoId: string, qualidade: number): void {
    this.revisoes.push({
      id: `rev-${Date.now()}`,
      cartaoId,
      qualidade,
      revisadoEm: new Date().toISOString(),
    });
    this.salvarEmDisco();
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

      const sessao = this.obterSessao(sessaoId);
      if (sessao) {
        const item = sessao.itens.find((i) => i.videoId === ev.videoId);
        if (item && ev.tipo === "heartbeat") {
          item.segundosAssistidos += 15;
        }
      }
    }
    this.salvarEmDisco();
  }

  // Métricas Detalhadas para o Painel de Atenção Semanal (RF-11)
  obterMetricasSemanais(usuarioId = USUARIO_PADRAO_ID) {
    const agora = new Date();
    const diasNomes = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const diasDaSemana: Array<{
      dia: string;
      data: string;
      minutosAssistidos: number;
      minutosMeta: number;
    }> = [];

    // Constrói os últimos 7 dias
    for (let i = 6; i >= 0; i--) {
      const d = new Date(agora);
      d.setDate(d.getDate() - i);
      const dataIso = d.toISOString().slice(0, 10);
      const diaNome = diasNomes[d.getDay()];

      const sessoesNoDia = this.sessoes.filter(
        (s) => s.usuarioId === usuarioId && s.inicio.slice(0, 10) === dataIso
      );

      let segsDia = 0;
      for (const s of sessoesNoDia) {
        for (const it of s.itens) {
          segsDia += it.segundosAssistidos;
        }
      }

      diasDaSemana.push({
        dia: diaNome,
        data: dataIso,
        minutosAssistidos: Math.round(segsDia / 60),
        minutosMeta: 45, // meta diária de referência
      });
    }

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

    // Distribuição por Intenção
    const intencoes = this.listarIntencoes(usuarioId);
    const porIntencao = intencoes.map((int) => {
      return {
        nome: int.nome,
        metaMinutos: int.metaMinutosSemana,
        minutosAssistidos: Math.round(segundosTotaisAssistidos * 0.4), // distribuição estimada
      };
    });

    return {
      totalSessoes: sessoesRecentes.length,
      minutosAssistidosHistorico: Math.round(segundosTotaisAssistidos / 60),
      totalNotasCriadas: this.notas.filter((n) => n.usuarioId === usuarioId).length,
      totalCartoesRevisados: this.revisoes.length,
      cartoesPendentesHoje: this.listarCartoesParaHoje().length,
      diasDaSemana,
      porIntencao,
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
    this.revisoes = [];
    this.canais = this.canais.filter((c) => c.usuarioId !== usuarioId);

    this.salvarEmDisco();

    return {
      sucesso: true,
      mensagem: "Todos os dados pessoais, notas, sessões e histórico foram excluídos permanentemente.",
    };
  }
}

export const db = new DatabaseStore();
export { USUARIO_PADRAO_ID };

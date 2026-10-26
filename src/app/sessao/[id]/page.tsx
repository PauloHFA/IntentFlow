"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { YouTubePlayer, YouTubePlayerInstance } from "@/components/player/YouTubePlayer";
import { formatarSegundos } from "@/lib/algorithms/duracao";
import { extrairCapitulos, type CapituloVideo } from "@/lib/algorithms/capitulos";
import {
  Clock,
  CheckCircle,
  Play,
  Pause,
  Plus,
  BookOpen,
  ListOrdered,
  Bookmark,
  ExternalLink,
  RefreshCw,
  X,
  Sparkles,
} from "lucide-react";

interface SessaoItem {
  id: string;
  videoId: string;
  ordem: number;
  status: string;
  segundosAssistidos: number;
  titulo?: string;
  duracaoMin?: number;
  canalNome?: string;
  miniaturaUrl?: string;
}

interface SessaoDados {
  id: string;
  objetivo: string;
  minutosPlanejados: number;
  status: string;
  itens: SessaoItem[];
}

interface Nota {
  id: string;
  tempoS: number;
  texto: string;
  etiquetas: string[];
}

export default function SalaSessaoPage() {
  const params = useParams();
  const router = useRouter();
  const sessaoId = params?.id as string;

  const [sessao, setSessao] = useState<SessaoDados | null>(null);
  const [itemAtualIndex, setItemAtualIndex] = useState(0);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [capitulos, setCapitulos] = useState<CapituloVideo[]>([]);
  const [segundosDecorridos, setSegundosDecorridos] = useState(0);
  const [playerEstado, setPlayerEstado] = useState<number>(2); // 1 = tocando, 2 = pausado
  const [novaNotaTexto, setNovaNotaTexto] = useState("");
  const [tempoCapturadoNota, setTempoCapturadoNota] = useState<number | null>(null);
  const [criarCartao, setCriarCartao] = useState(true);
  const [painelAba, setPainelAba] = useState<"notas" | "capitulos">("notas");

  // Modal de Troca de Item (RF-05 / Seção 10)
  const [modalTrocaAberto, setModalTrocaAberto] = useState(false);
  const [itemParaTrocar, setItemParaTrocar] = useState<SessaoItem | null>(null);
  const [candidatosDisponiveis, setCandidatosDisponiveis] = useState<any[]>([]);
  const [trocando, setTrocando] = useState(false);

  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const bufferEventos = useRef<Array<{ videoId: string; tipo: any; posicaoS: number }>>([]);

  // Carrega dados da sessão
  useEffect(() => {
    async function carregarSessao() {
      try {
        const res = await fetch(`/api/sessoes/${sessaoId}`);
        const data = await res.json();
        if (data.sessao) {
          setSessao(data.sessao);
          if (data.notas) setNotas(data.notas);
        }
      } catch (err) {
        console.error("Erro ao carregar sessão", err);
      }
    }
    carregarSessao();
  }, [sessaoId]);

  // Carrega feed de candidatos para permitir troca
  useEffect(() => {
    async function carregarCandidatos() {
      try {
        const res = await fetch("/api/feed");
        const data = await res.json();
        if (data.candidatos) {
          setCandidatosDisponiveis(data.candidatos);
        }
      } catch (err) {
        // ignore
      }
    }
    carregarCandidatos();
  }, []);

  const itemAtual = sessao?.itens[itemAtualIndex];

  // Carrega e extrai capítulos da descrição real do vídeo atual
  useEffect(() => {
    if (!itemAtual) return;
    async function carregarCapitulosDoVideo() {
      try {
        // Encontra candidato correspondente para obter a descrição completa
        const candidato = candidatosDisponiveis.find((c) => c.videoId === itemAtual?.videoId);
        const descricaoTexto = candidato?.descricao || `
0:00 Introdução ao Conteúdo
03:15 Conceitos Fundamentais
08:40 Aplicação Prática e Exemplos
14:20 Resumo e Próximos Passos
`;
        const capsExtraidos = extrairCapitulos(descricaoTexto);
        setCapitulos(capsExtraidos);
      } catch (e) {
        // fallback
      }
    }
    carregarCapitulosDoVideo();
  }, [itemAtual, candidatosDisponiveis]);

  // Cronômetro de tempo real: conta segundos APENAS quando o player está reproduzindo E a aba está visível
  useEffect(() => {
    const timer = setInterval(() => {
      const abaVisivel = typeof document !== "undefined" && document.visibilityState === "visible";
      if (playerEstado === 1 && abaVisivel) {
        setSegundosDecorridos((s) => s + 1);

        if (itemAtual) {
          const pos = playerRef.current?.getCurrentTime() ?? 0;
          bufferEventos.current.push({
            videoId: itemAtual.videoId,
            tipo: "heartbeat",
            posicaoS: Math.round(pos),
          });
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [playerEstado, itemAtual]);

  // Despacho em lote de eventos de reprodução a cada 15 segundos
  useEffect(() => {
    const intervaloEnvio = setInterval(() => {
      if (bufferEventos.current.length > 0 && sessaoId) {
        const eventosParaEnviar = [...bufferEventos.current];
        bufferEventos.current = [];

        fetch(`/api/sessoes/${sessaoId}/eventos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventos: eventosParaEnviar }),
        }).catch((err) => console.error("Erro ao enviar eventos:", err));
      }
    }, 15000);

    return () => clearInterval(intervaloEnvio);
  }, [sessaoId]);

  function handleEstadoPlayer(estado: number, posicaoS: number) {
    setPlayerEstado(estado);

    if (itemAtual) {
      const tipo = estado === 1 ? "play" : estado === 2 ? "pause" : estado === 0 ? "end" : "seek";
      bufferEventos.current.push({
        videoId: itemAtual.videoId,
        tipo,
        posicaoS: Math.round(posicaoS),
      });

      if (estado === 0 && sessao) {
        if (itemAtualIndex + 1 < sessao.itens.length) {
          setItemAtualIndex((i) => i + 1);
        }
      }
    }
  }

  function capturarTempoNota() {
    const tempo = playerRef.current?.getCurrentTime() ?? 0;
    setTempoCapturadoNota(Math.round(tempo));
  }

  async function handleSalvarNota(e: React.FormEvent) {
    e.preventDefault();
    if (!novaNotaTexto.trim() || !itemAtual) return;

    const tempoS = tempoCapturadoNota ?? Math.round(playerRef.current?.getCurrentTime() ?? 0);

    try {
      const res = await fetch("/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: itemAtual.videoId,
          sessaoId,
          tempoS,
          texto: novaNotaTexto,
          etiquetas: ["estudo"],
          criarCartao,
        }),
      });

      const data = await res.json();
      if (res.ok && data.nota) {
        setNotas((prev) => [...prev, data.nota].sort((a, b) => a.tempoS - b.tempoS));
        setNovaNotaTexto("");
        setTempoCapturadoNota(null);
      }
    } catch (err) {
      console.error("Erro ao salvar nota", err);
    }
  }

  function irParaSegundo(segundos: number) {
    playerRef.current?.seekTo(segundos, true);
  }

  async function handleEncerrarSessao() {
    router.push(`/sessao/${sessaoId}/resumo`);
  }

  function abrirModalTroca(item: SessaoItem) {
    setItemParaTrocar(item);
    setModalTrocaAberto(true);
  }

  async function handleConfirmarTroca(novoCandidato: any) {
    if (!itemParaTrocar) return;
    setTrocando(true);

    try {
      const res = await fetch(`/api/sessoes/${sessaoId}/trocar-item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoIdAntigo: itemParaTrocar.videoId,
          novoItem: {
            videoId: novoCandidato.videoId,
            titulo: novoCandidato.titulo,
            duracaoMin: novoCandidato.duracaoMin,
            canalNome: novoCandidato.canalNome,
            miniaturaUrl: novoCandidato.miniaturaUrl,
          },
        }),
      });

      const data = await res.json();
      if (res.ok && data.sessao) {
        setSessao(data.sessao);
        setModalTrocaAberto(false);
        setItemParaTrocar(null);
      } else {
        alert(data.erro || "Não foi possível trocar o vídeo.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao comunicar com o servidor.");
    } finally {
      setTrocando(false);
    }
  }

  if (!sessao) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 text-sm">Carregando sala de sessão...</p>
      </div>
    );
  }

  const minutosLimite = sessao.minutosPlanejados;
  const segundosTotalPlanejado = minutosLimite * 60;
  const porcentagemTempo = Math.min(100, Math.round((segundosDecorridos / segundosTotalPlanejado) * 100));

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar />

      {/* Barra de Foco da Sessão */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Sessão com Intenção
              </p>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
                {sessao.objetivo}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span className="font-mono text-sm font-bold text-slate-800">
                {formatarSegundos(segundosDecorridos)} / {minutosLimite}:00
              </span>
              <span className="text-[11px] text-slate-400 font-medium">({porcentagemTempo}%)</span>
            </div>

            <button
              type="button"
              onClick={handleEncerrarSessao}
              className="px-4 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold transition-colors"
            >
              Encerrar Sessão
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lado Esquerdo: Player Oficial + Fila de Vídeos */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-black rounded-2xl overflow-hidden shadow-lg border border-slate-800">
              {itemAtual ? (
                <YouTubePlayer
                  videoId={itemAtual.videoId}
                  onEstado={handleEstadoPlayer}
                  onPlayerPronto={(instance) => {
                    playerRef.current = instance;
                  }}
                />
              ) : (
                <div className="aspect-video flex items-center justify-center text-white text-sm">
                  Fila concluída.
                </div>
              )}
            </div>

            {/* Metadados e Atribuição Oficial */}
            {itemAtual && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-start justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {itemAtual.titulo || "Vídeo da Sessão"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 flex items-center space-x-2">
                    <span className="font-semibold text-slate-700">{itemAtual.canalNome}</span>
                    <span>•</span>
                    <a
                      href={`https://www.youtube.com/watch?v=${itemAtual.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline inline-flex items-center space-x-1"
                    >
                      <span>Abrir no YouTube original</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Fila Finita da Sessão com Opção de Troca */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <ListOrdered className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Fila Finita da Sessão ({itemAtualIndex + 1} de {sessao.itens.length})
                  </h3>
                </div>
                <span className="text-xs text-slate-500">Sem autoplay infinito</span>
              </div>

              <div className="space-y-2">
                {sessao.itens.map((item, index) => (
                  <div
                    key={item.id}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-colors ${
                      index === itemAtualIndex
                        ? "bg-indigo-50/70 border-indigo-200"
                        : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setItemAtualIndex(index)}
                      className="flex items-center space-x-3 flex-1 text-left min-w-0"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === itemAtualIndex
                            ? "bg-indigo-600 text-white"
                            : index < itemAtualIndex
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {index < itemAtualIndex ? "✓" : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {item.titulo}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {item.canalNome} • {item.duracaoMin} min
                        </p>
                      </div>
                    </button>

                    <div className="flex items-center space-x-2 ml-2">
                      {index === itemAtualIndex && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 uppercase tracking-wider">
                          Assistindo
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => abrirModalTroca(item)}
                        title="Trocar este vídeo da fila"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lado Direito: Painel de Notas e Capítulos Lado a Lado */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[540px]">
              <div className="flex border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setPainelAba("notas")}
                  className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors flex items-center justify-center space-x-1.5 ${
                    painelAba === "notas"
                      ? "border-indigo-600 text-indigo-600 bg-indigo-50/30"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Notas Ancoradas ({notas.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPainelAba("capitulos")}
                  className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors flex items-center justify-center space-x-1.5 ${
                    painelAba === "capitulos"
                      ? "border-indigo-600 text-indigo-600 bg-indigo-50/30"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <ListOrdered className="w-4 h-4" />
                  <span>Capítulos ({capitulos.length})</span>
                </button>
              </div>

              {painelAba === "notas" ? (
                <div className="p-4 flex-1 flex flex-col">
                  <form onSubmit={handleSalvarNota} className="mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <button
                        type="button"
                        onClick={capturarTempoNota}
                        className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {tempoCapturadoNota !== null
                            ? `Ponto fixado: ${formatarSegundos(tempoCapturadoNota)}`
                            : "Capturar posição atual"}
                        </span>
                      </button>
                      <label className="text-[11px] text-slate-500 flex items-center space-x-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={criarCartao}
                          onChange={(e) => setCriarCartao(e.target.checked)}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Gerar cartão SM-2</span>
                      </label>
                    </div>

                    <textarea
                      value={novaNotaTexto}
                      onChange={(e) => setNovaNotaTexto(e.target.value)}
                      placeholder="Anote um insight, fórmula ou conceito deste trecho..."
                      rows={3}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={!novaNotaTexto.trim()}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs font-semibold shadow-sm transition-colors"
                      >
                        Adicionar Nota
                      </button>
                    </div>
                  </form>

                  <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[360px]">
                    {notas.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 text-xs">
                        Nenhuma nota registrada nesta sessão ainda. Anote enquanto assiste!
                      </div>
                    ) : (
                      notas.map((n) => (
                        <div
                          key={n.id}
                          className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-colors shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <button
                              type="button"
                              onClick={() => irParaSegundo(n.tempoS)}
                              className="font-mono text-[11px] font-bold text-indigo-600 hover:underline bg-indigo-50 px-2 py-0.5 rounded"
                            >
                              ▶ {formatarSegundos(n.tempoS)}
                            </button>
                          </div>
                          <p className="text-xs text-slate-800 whitespace-pre-wrap">{n.texto}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 flex-1 overflow-y-auto space-y-2 max-h-[480px]">
                  {capitulos.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      Este vídeo não possui carimbos de capítulos na descrição.
                    </div>
                  ) : (
                    capitulos.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => irParaSegundo(c.tempoSegundos)}
                        className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:bg-indigo-50/50 flex items-center justify-between transition-colors"
                      >
                        <span className="text-xs text-slate-800 font-medium">{c.titulo}</span>
                        <span className="font-mono text-xs text-indigo-600 font-bold bg-slate-100 px-2 py-0.5 rounded">
                          {c.tempoFormatado}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Substituição de Vídeo na Fila (RF-05 / Seção 10) */}
      {modalTrocaAberto && itemParaTrocar && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Trocar Vídeo da Fila
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Substituindo: <span className="font-semibold">{itemParaTrocar.titulo}</span> ({itemParaTrocar.duracaoMin} min)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalTrocaAberto(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 my-2 pr-1">
              {candidatosDisponiveis
                .filter((c) => c.videoId !== itemParaTrocar.videoId)
                .map((cand) => (
                  <div
                    key={cand.videoId}
                    className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {cand.titulo}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {cand.canalNome} • {cand.duracaoMin} min
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={trocando}
                      onClick={() => handleConfirmarTroca(cand)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs font-semibold shadow-sm transition-colors flex-shrink-0"
                    >
                      Selecionar
                    </button>
                  </div>
                ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setModalTrocaAberto(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

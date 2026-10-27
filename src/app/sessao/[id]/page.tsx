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
  Maximize2,
  Minimize2,
  Keyboard,
  HelpCircle,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Flame,
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
  const [tempoCapturadoNota, setTempoCapturadoNota] = useState<number | null>(null);
  const [painelAba, setPainelAba] = useState<"notas" | "capitulos">("notas");

  // Melhoria 1 & 2: Modo Zen e Atalhos de Teclado
  const [modoZen, setModoZen] = useState(false);
  const [modalAtalhosAberto, setModalAtalhosAberto] = useState(false);
  const [mudo, setMudo] = useState(false);

  // Melhoria 3: Gerador de Flashcard Pergunta/Resposta para o SM-2
  const [tipoNota, setTipoNota] = useState<"simples" | "flashcard">("simples");
  const [novaNotaTexto, setNovaNotaTexto] = useState("");
  const [frenteCartao, setFrenteCartao] = useState("");
  const [versoCartao, setVersoCartao] = useState("");
  const [criarCartao, setCriarCartao] = useState(true);
  const [revelarVersoId, setRevelarVersoId] = useState<string | null>(null);

  // Modal de Troca de Item (RF-05 / Seção 10)
  const [modalTrocaAberto, setModalTrocaAberto] = useState(false);
  const [itemParaTrocar, setItemParaTrocar] = useState<SessaoItem | null>(null);
  const [candidatosDisponiveis, setCandidatosDisponiveis] = useState<any[]>([]);
  const [trocando, setTrocando] = useState(false);

  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const bufferEventos = useRef<Array<{ videoId: string; tipo: any; posicaoS: number }>>([]);
  const inputNotaRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);

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

  // MELHORIA 1: Listener de Atalhos de Teclado Globais (N, Espaço, K, J, L, M, Z, C, ?)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const emCampoTexto =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if (e.key === "Escape") {
        if (modalAtalhosAberto) {
          setModalAtalhosAberto(false);
          return;
        }
        if (modalTrocaAberto) {
          setModalTrocaAberto(false);
          return;
        }
        if (modoZen) {
          setModoZen(false);
          return;
        }
        if (emCampoTexto) {
          target.blur();
          return;
        }
      }

      // Se o usuário está digitando em um campo de texto, não dispara os atalhos de controle
      if (emCampoTexto) return;

      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        capturarTempoNota();
        setPainelAba("notas");
        setTimeout(() => {
          inputNotaRef.current?.focus();
        }, 50);
      } else if (e.key === " " || e.key === "k" || e.key === "K") {
        e.preventDefault();
        if (playerEstado === 1) {
          playerRef.current?.pauseVideo();
        } else {
          playerRef.current?.playVideo();
        }
      } else if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        const pos = playerRef.current?.getCurrentTime() ?? 0;
        playerRef.current?.seekTo(Math.max(0, pos - 10), true);
      } else if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        const pos = playerRef.current?.getCurrentTime() ?? 0;
        playerRef.current?.seekTo(pos + 10, true);
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        if (playerRef.current?.isMuted?.()) {
          playerRef.current?.unMute?.();
          setMudo(false);
        } else {
          playerRef.current?.mute?.();
          setMudo(true);
        }
      } else if (e.key === "z" || e.key === "Z") {
        e.preventDefault();
        setModoZen((prev) => !prev);
      } else if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        setPainelAba((prev) => (prev === "notas" ? "capitulos" : "notas"));
      } else if (e.key === "?") {
        e.preventDefault();
        setModalAtalhosAberto((prev) => !prev);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerEstado, modoZen, modalAtalhosAberto, modalTrocaAberto]);

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
    if (!itemAtual) return;

    let textoFinal = "";
    let frenteFinal: string | undefined = undefined;
    let versoFinal: string | undefined = undefined;
    let deveCriarCartao = criarCartao;

    if (tipoNota === "flashcard") {
      if (!frenteCartao.trim() || !versoCartao.trim()) return;
      textoFinal = `❓ Frente: ${frenteCartao.trim()}\n💡 Verso: ${versoCartao.trim()}`;
      frenteFinal = frenteCartao.trim();
      versoFinal = versoCartao.trim();
      deveCriarCartao = true;
    } else {
      if (!novaNotaTexto.trim()) return;
      textoFinal = novaNotaTexto.trim();
      frenteFinal = novaNotaTexto.trim();
      versoFinal = `Insight registrado no tempo ${formatarSegundos(tempoCapturadoNota ?? 0)}`;
    }

    const tempoS = tempoCapturadoNota ?? Math.round(playerRef.current?.getCurrentTime() ?? 0);

    try {
      const res = await fetch("/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: itemAtual.videoId,
          sessaoId,
          tempoS,
          texto: textoFinal,
          etiquetas: tipoNota === "flashcard" ? ["estudo", "flashcard", "sm2"] : ["estudo"],
          criarCartao: deveCriarCartao,
          frenteCartao: frenteFinal,
          versoCartao: versoFinal,
        }),
      });

      const data = await res.json();
      if (res.ok && data.nota) {
        setNotas((prev) => [...prev, data.nota].sort((a, b) => a.tempoS - b.tempoS));
        setNovaNotaTexto("");
        setFrenteCartao("");
        setVersoCartao("");
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

  // RENDERIZAÇÃO DO CONTEÚDO LATERAL (NOTAS / CAPÍTULOS)
  const renderPainelLateral = (ehTemaEscuro = false) => (
    <div
      className={`rounded-2xl border overflow-hidden flex flex-col h-full min-h-[540px] ${
        ehTemaEscuro
          ? "bg-slate-900 border-slate-800 text-slate-100"
          : "bg-white border-slate-200 shadow-sm text-slate-800"
      }`}
    >
      <div className={`flex border-b ${ehTemaEscuro ? "border-slate-800" : "border-slate-200"}`}>
        <button
          type="button"
          onClick={() => setPainelAba("notas")}
          className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors flex items-center justify-center space-x-1.5 ${
            painelAba === "notas"
              ? "border-indigo-500 text-indigo-400 bg-indigo-500/10"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Notas & Flashcards ({notas.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setPainelAba("capitulos")}
          className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors flex items-center justify-center space-x-1.5 ${
            painelAba === "capitulos"
              ? "border-indigo-500 text-indigo-400 bg-indigo-500/10"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <ListOrdered className="w-4 h-4" />
          <span>Capítulos ({capitulos.length})</span>
        </button>
      </div>

      {painelAba === "notas" ? (
        <div className="p-4 flex-1 flex flex-col min-h-0">
          {/* Seletor de Tipo de Nota: Nota Simples vs Flashcard SM-2 */}
          <div className="flex items-center space-x-2 mb-2.5">
            <button
              type="button"
              onClick={() => setTipoNota("simples")}
              className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-bold transition-all ${
                tipoNota === "simples"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : ehTemaEscuro
                  ? "bg-slate-800 text-slate-400 hover:text-slate-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              📝 Nota Rápida
            </button>
            <button
              type="button"
              onClick={() => {
                setTipoNota("flashcard");
                setCriarCartao(true);
              }}
              className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-bold transition-all ${
                tipoNota === "flashcard"
                  ? "bg-amber-600 text-white shadow-sm"
                  : ehTemaEscuro
                  ? "bg-slate-800 text-slate-400 hover:text-slate-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              🃏 Flashcard SM-2
            </button>
          </div>

          <form
            onSubmit={handleSalvarNota}
            className={`mb-4 p-3 rounded-xl border ${
              ehTemaEscuro
                ? "bg-slate-950 border-slate-800"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={capturarTempoNota}
                className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {tempoCapturadoNota !== null
                    ? `Ponto fixado: ${formatarSegundos(tempoCapturadoNota)}`
                    : "Capturar posição [N]"}
                </span>
              </button>
              {tipoNota === "simples" && (
                <label className="text-[11px] text-slate-400 flex items-center space-x-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={criarCartao}
                    onChange={(e) => setCriarCartao(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Gerar cartão SM-2</span>
                </label>
              )}
            </div>

            {tipoNota === "simples" ? (
              <textarea
                ref={inputNotaRef as any}
                value={novaNotaTexto}
                onChange={(e) => setNovaNotaTexto(e.target.value)}
                placeholder="Anote um insight, fórmula ou conceito deste trecho... (Pressione N para focar)"
                rows={3}
                className={`w-full text-xs p-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  ehTemaEscuro
                    ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                }`}
              />
            ) : (
              <div className="space-y-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1">
                    Frente (Pergunta ou Conceito)
                  </label>
                  <input
                    ref={inputNotaRef as any}
                    type="text"
                    value={frenteCartao}
                    onChange={(e) => setFrenteCartao(e.target.value)}
                    placeholder="Ex: Qual é a 2ª Lei da Termodinâmica?"
                    className={`w-full text-xs p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      ehTemaEscuro
                        ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500"
                        : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-1">
                    Verso (Explicação ou Resposta)
                  </label>
                  <textarea
                    value={versoCartao}
                    onChange={(e) => setVersoCartao(e.target.value)}
                    placeholder="Ex: Em um sistema isolado, a entropia total sempre tende a aumentar com o tempo..."
                    rows={2}
                    className={`w-full text-xs p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      ehTemaEscuro
                        ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500"
                        : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                    }`}
                  />
                </div>
              </div>
            )}

            <div className="mt-2.5 flex justify-end">
              <button
                type="submit"
                disabled={
                  tipoNota === "simples"
                    ? !novaNotaTexto.trim()
                    : !frenteCartao.trim() || !versoCartao.trim()
                }
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                {tipoNota === "flashcard" ? "Salvar Flashcard SM-2" : "Adicionar Nota"}
              </button>
            </div>
          </form>

          {/* Lista de Notas e Flashcards */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[380px]">
            {notas.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Nenhuma nota registrada nesta sessão ainda. Pressione{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">
                  N
                </kbd>{" "}
                para anotar a qualquer instante!
              </div>
            ) : (
              notas.map((n) => {
                const ehFlashcard = n.texto.includes("❓ Frente:") && n.texto.includes("💡 Verso:");
                let frente = n.texto;
                let verso = "";

                if (ehFlashcard) {
                  const partes = n.texto.split("💡 Verso:");
                  frente = partes[0].replace("❓ Frente:", "").trim();
                  verso = partes[1]?.trim() || "";
                }

                return (
                  <div
                    key={n.id}
                    className={`p-3 rounded-xl border transition-colors shadow-sm ${
                      ehTemaEscuro
                        ? "bg-slate-950/80 border-slate-800 hover:border-indigo-500/50"
                        : "bg-white border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <button
                        type="button"
                        onClick={() => irParaSegundo(n.tempoS)}
                        className="font-mono text-[11px] font-bold text-indigo-400 hover:underline bg-indigo-500/10 px-2 py-0.5 rounded"
                      >
                        ▶ {formatarSegundos(n.tempoS)}
                      </button>
                      {ehFlashcard && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          🃏 Cartão SM-2
                        </span>
                      )}
                    </div>

                    {ehFlashcard ? (
                      <div className="space-y-1.5 mt-1">
                        <div className="text-xs font-semibold text-slate-200">
                          <span className="text-amber-400 font-bold mr-1">P:</span> {frente}
                        </div>
                        {revelarVersoId === n.id ? (
                          <div className="text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-800/40 p-2 rounded-lg">
                            <span className="font-bold text-emerald-400 mr-1">R:</span> {verso}
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setRevelarVersoId(n.id)}
                            className="inline-flex items-center space-x-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Revelar Resposta</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-300 whitespace-pre-wrap">{n.texto}</p>
                    )}
                  </div>
                );
              })
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
                onClick={() => irParaSegundo(c.segundos)}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                  ehTemaEscuro
                    ? "bg-slate-950/70 border-slate-800 hover:bg-slate-800"
                    : "bg-slate-50 border-slate-100 hover:bg-indigo-50/60"
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                    {formatarSegundos(c.segundos)}
                  </span>
                  <span className="text-xs font-medium text-slate-300 truncate">{c.titulo}</span>
                </div>
                <Play className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* MODO FOCO ZEN EM TELA CHEIA (MELHORIA 2) */}
      {modoZen ? (
        <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col p-4 sm:p-6 overflow-hidden">
          {/* Barra Superior Zen */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400">
                Modo Foco Zen
              </span>
              <span className="text-slate-600">•</span>
              <h1 className="text-sm font-bold text-slate-200 line-clamp-1">{sessao.objetivo}</h1>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>
                  {formatarSegundos(segundosDecorridos)} / {minutosLimite}:00 ({porcentagemTempo}%)
                </span>
              </div>

              <button
                type="button"
                onClick={() => setModalAtalhosAberto(true)}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors text-xs flex items-center space-x-1"
                title="Atalhos de Teclado (?)"
              >
                <Keyboard className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setModoZen(false)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Sair do Zen [Z]</span>
              </button>
            </div>
          </div>

          {/* Split 70% Vídeo / 30% Notas em Tela Cheia */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-0">
            <div className="lg:col-span-8 flex flex-col justify-center bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
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
            <div className="lg:col-span-4 min-h-0">{renderPainelLateral(true)}</div>
          </div>
        </div>
      ) : (
        <>
          <Navbar />

          {/* Barra de Foco da Sessão Padrão */}
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

              <div className="flex items-center space-x-3">
                {/* Botão de Atalhos */}
                <button
                  type="button"
                  onClick={() => setModalAtalhosAberto(true)}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                  title="Ver atalhos de teclado (?)"
                >
                  <Keyboard className="w-3.5 h-3.5 text-slate-500" />
                  <span>Atalhos [?]</span>
                </button>

                {/* Botão de Modo Zen */}
                <button
                  type="button"
                  onClick={() => setModoZen(true)}
                  className="px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
                  title="Ativar Modo Foco Zen sem distrações (Z)"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Modo Zen [Z]</span>
                </button>

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
                  Encerrar
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

                    <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono">
                      <span>10s: [J] [L]</span>
                      <span>•</span>
                      <span>Play/Pause: [Espaço]</span>
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
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="min-w-0 flex-1 pr-3">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {item.titulo || `Vídeo ${index + 1}`}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {item.canalNome} • {item.duracaoMin} min
                            </p>
                          </div>
                        </button>

                        <div className="flex items-center space-x-2">
                          {index === itemAtualIndex && (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase tracking-wider">
                              Assistindo
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => abrirModalTroca(item)}
                            title="Trocar este vídeo por outro do mesmo tema"
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

              {/* Lado Direito: Painel de Notas e Capítulos */}
              <div className="lg:col-span-4 space-y-6">{renderPainelLateral(false)}</div>
            </div>
          </main>
          <Footer />
        </>
      )}

      {/* MODAL DE AJUDA DE ATALHOS DE TECLADO (MELHORIA 1) */}
      {modalAtalhosAberto && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2.5 text-indigo-600">
                <Keyboard className="w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-900">Atalhos de Teclado</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalAtalhosAberto(false)}
                className="p-1 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Controle sua sessão sem tirar as mãos do teclado e mantenha seu foco contínuo:
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              {[
                { tecla: "N", acao: "Pular para o campo de notas e capturar segundo atual" },
                { tecla: "Espaço ou K", acao: "Pausar / Retomar reprodução do vídeo" },
                { tecla: "J", acao: "Voltar 10 segundos no vídeo" },
                { tecla: "L", acao: "Avançar 10 segundos no vídeo" },
                { tecla: "M", acao: "Silenciar / Ativar áudio" },
                { tecla: "Z", acao: "Alternar Modo Foco Zen (Cinema)" },
                { tecla: "C", acao: "Alternar entre Notas e Capítulos" },
                { tecla: "?", acao: "Abrir / Fechar esta ajuda de atalhos" },
                { tecla: "Esc", acao: "Sair do Modo Zen ou desfocar campo" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <span className="text-slate-700 font-sans text-xs">{item.acao}</span>
                  <kbd className="px-2 py-1 rounded bg-white text-indigo-600 border border-slate-200 font-bold text-[11px] shadow-sm ml-2">
                    {item.tecla}
                  </kbd>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setModalAtalhosAberto(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE TROCA DE VÍDEO (RF-05) */}
      {modalTrocaAberto && itemParaTrocar && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-indigo-600">
                <RefreshCw className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-900">Trocar Vídeo da Fila</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalTrocaAberto(false)}
                className="p-1 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Substituindo: <strong className="text-slate-800">{itemParaTrocar.titulo}</strong>
            </p>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {candidatosDisponiveis
                .filter((c) => c.videoId !== itemParaTrocar.videoId)
                .map((cand) => (
                  <div
                    key={cand.videoId}
                    className="p-3 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-sm transition-all flex items-center justify-between bg-white"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <p className="text-xs font-bold text-slate-900 line-clamp-1">{cand.titulo}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {cand.canalNome} • {cand.duracaoMin} min
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={trocando}
                      onClick={() => handleConfirmarTroca(cand)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-xs font-bold transition-all disabled:opacity-50"
                    >
                      {trocando ? "Trocando..." : "Escolher"}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

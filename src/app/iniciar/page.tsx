"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { montarFila, type CandidatoVideo } from "@/lib/algorithms/mochila";
import { formatarSegundos } from "@/lib/algorithms/duracao";
import {
  Clock,
  Target,
  Play,
  Sparkles,
  Layers,
  ArrowRight,
  RefreshCw,
  Sliders,
  Check,
  Compass,
} from "lucide-react";

interface DisciplinaCard {
  id: string;
  nome: string;
  icone: string;
  descricao: string;
  corGradiente: string;
}

export default function IniciarSessaoPage() {
  const router = useRouter();
  const [objetivo, setObjetivo] = useState("Geografia mundial e placas tectônicas");
  const [tempoMinutos, setTempoMinutos] = useState(35);
  const [disciplinaAtiva, setDisciplinaAtiva] = useState<string>("geografia");
  const [profundidade, setProfundidade] = useState<"todos" | "rapido" | "intermediario" | "aprofundado">("todos");
  const [disciplinas, setDisciplinas] = useState<DisciplinaCard[]>([]);
  const [candidatos, setCandidatos] = useState<CandidatoVideo[]>([]);
  const [filaOtimizada, setFilaOtimizada] = useState<CandidatoVideo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [iniciando, setIniciando] = useState(false);

  // Carrega feed e catálogo de disciplinas
  useEffect(() => {
    const timer = setTimeout(async () => {
      setCarregando(true);
      try {
        const queryParams = new URLSearchParams();
        if (disciplinaAtiva && disciplinaAtiva !== "todas") {
          queryParams.set("disciplinaId", disciplinaAtiva);
        }
        if (objetivo.trim()) {
          queryParams.set("objetivo", objetivo.trim());
        }
        if (profundidade !== "todos") {
          queryParams.set("profundidade", profundidade);
        }

        const res = await fetch(`/api/feed?${queryParams.toString()}`);
        const data = await res.json();
        if (data.candidatos) {
          setCandidatos(data.candidatos);
        }
        if (data.disciplinasDisponiveis && disciplinas.length === 0) {
          setDisciplinas(data.disciplinasDisponiveis);
        }
      } catch (err) {
        console.error("Erro ao carregar candidatos", err);
      } finally {
        setCarregando(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [disciplinaAtiva, objetivo, profundidade]);

  // Recalcula a fila pela Mochila 0/1 sempre que os candidatos ou o tempo mudam
  useEffect(() => {
    if (candidatos.length > 0) {
      const fila = montarFila(candidatos, tempoMinutos, { maxVideos: 6 });
      setFilaOtimizada(fila);
    } else {
      setFilaOtimizada([]);
    }
  }, [candidatos, tempoMinutos]);

  const tempoTotalFila = filaOtimizada.reduce((acc, c) => acc + c.duracaoMin, 0);

  function selecionarDisciplinaCard(disc: DisciplinaCard) {
    setDisciplinaAtiva(disc.id);
    const sugestoesObjetivo: Record<string, string> = {
      geografia: "Geografia física, placas tectônicas e relevo",
      matematica: "Matemática, funções, probabilidade e cálculo",
      portugues: "Língua Portuguesa, gramática e redação",
      fisica: "Física fundamental, leis de Newton e termodinâmica",
      quimica: "Química geral, tabela periódica e estequiometria",
      biologia: "Biologia humana, citologia e ecologia",
      historia: "História do Brasil e História Geral",
      ingles: "Inglês para conversação e gramática prática",
      filosofia: "Filosofia, sociologia e pensamento crítico",
      tecnologia: "Programação, algoritmos e desenvolvimento de software",
    };
    setObjetivo(sugestoesObjetivo[disc.id] || disc.nome);
  }

  async function handleIniciarSessao() {
    if (!objetivo.trim()) return;
    setIniciando(true);

    try {
      const res = await fetch("/api/sessoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objetivo,
          minutosPlanejados: tempoMinutos,
          candidatos: filaOtimizada.length > 0 ? filaOtimizada : candidatos,
        }),
      });

      const data = await res.json();
      if (res.ok && data.sessao) {
        router.push(`/sessao/${data.sessao.id}`);
      } else {
        alert(data.erro || "Falha ao iniciar a sessão.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setIniciando(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3 border border-indigo-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Playlists Dinâmicas e Disciplinas Curadas</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            O que você quer dominar hoje?
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-1.5 max-w-2xl">
            Escolha uma disciplina nos cards abaixo ou digite seu tema específico (ex: <em>"Geografia"</em>, <em>"Inglês"</em>, <em>"Termodinâmica"</em>). O algoritmo da Mochila 0/1 empacota a playlist finita perfeita.
          </p>
        </div>

        {/* CARDS VISUAIS DE DISCIPLINAS (PRÉ-SELEÇÕES RÁPIDAS) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Trilhas & Disciplinas Prontas (1 Clique)
            </h2>
            <button
              type="button"
              onClick={() => {
                setDisciplinaAtiva("todas");
                setObjetivo("");
              }}
              className="text-xs text-indigo-600 font-semibold hover:underline"
            >
              Explorar Catálogo Livre
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {disciplinas.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => selecionarDisciplinaCard(d)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  disciplinaAtiva === d.id
                    ? "bg-gradient-to-b from-indigo-50 to-white border-indigo-500 shadow-md ring-2 ring-indigo-500/20 scale-[1.02]"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div>
                  <span className="text-2xl sm:text-3xl block mb-2">{d.icone}</span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {d.nome.split("&")[0]}
                  </h3>
                </div>
                <span
                  className={`mt-3 inline-block text-[10px] font-bold uppercase tracking-wider ${
                    disciplinaAtiva === d.id ? "text-indigo-600" : "text-slate-400"
                  }`}
                >
                  {disciplinaAtiva === d.id ? "Ativo ✓" : "Selecionar"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* FORMULÁRIO DE INTENÇÃO & ORÇAMENTO DE TEMPO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Objetivo ou Tema Específico
              </label>
              <input
                type="text"
                value={objetivo}
                onChange={(e) => {
                  setObjetivo(e.target.value);
                  setDisciplinaAtiva("todas");
                }}
                placeholder="Ex: Geografia mundial, Inglês do zero, Física clássica..."
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
              />
              <p className="text-[11px] text-slate-400 mt-2">
                Dica: Digite qualquer termo como <em>"geografia"</em>, <em>"relevo"</em> ou <em>"phrasal verbs"</em> para a playlist se ajustar dinamicamente.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Quanto tempo você tem disponível?</span>
                </label>
                <span className="text-sm font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100 font-mono">
                  {tempoMinutos} minutos
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={tempoMinutos}
                onChange={(e) => setTempoMinutos(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                <span>10 min</span>
                <span>25 min</span>
                <span>45 min</span>
                <span>60 min</span>
                <span>90 min</span>
              </div>
            </div>

            {/* SELETOR DE PROFUNDIDADE / INTENSIDADE DA TRILHA */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Intensidade dos Vídeos
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "todos", label: "Misto", desc: "Qualquer duração", cor: "border-slate-300" },
                  { id: "rapido", label: "⚡ Rápidos", desc: "5 a 12 min", cor: "border-emerald-300" },
                  { id: "intermediario", label: "🎯 Práticos", desc: "12 a 20 min", cor: "border-amber-300" },
                  { id: "aprofundado", label: "📚 Master", desc: "20+ min", cor: "border-indigo-300" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProfundidade(p.id as any)}
                    className={`py-2 px-2.5 rounded-xl border text-left transition-all ${
                      profundidade === p.id
                        ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20 font-bold"
                        : "bg-white border-slate-200 hover:border-slate-300 font-medium"
                    }`}
                  >
                    <div className="text-xs text-slate-900 leading-tight">{p.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleIniciarSessao}
                disabled={iniciando || filaOtimizada.length === 0}
                className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold shadow-lg transition-all text-sm"
              >
                {iniciando ? (
                  <span>Criando Sala de Foco...</span>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    <span>Iniciar Playlist Finita ({tempoTotalFila} de {tempoMinutos} min)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* PRÉVIA DA PLAYLIST DINÂMICA DA MOCHILA 0/1 */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Playlist Dinâmica Sugerida
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {filaOtimizada.length} vídeo(s) • {tempoTotalFila} min
              </span>
            </div>

            {carregando ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400">
                <RefreshCw className="w-8 h-8 animate-spin mb-2 text-indigo-600" />
                <p className="text-sm">Buscando os melhores vídeos da disciplina...</p>
              </div>
            ) : filaOtimizada.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400 text-center">
                <p className="text-sm font-medium">Nenhum vídeo cabe neste tempo.</p>
                <p className="text-xs text-slate-400 mt-1">
                  Aumente o tempo no controle deslizante para incluir mais aulas.
                </p>
              </div>
            ) : (
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px] pr-1">
                {filaOtimizada.map((video, index) => (
                  <div
                    key={video.videoId}
                    className="p-3 rounded-2xl border border-slate-100 bg-slate-50 flex items-center space-x-3.5 hover:bg-indigo-50/50 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    {video.miniaturaUrl && (
                      <img
                        src={video.miniaturaUrl}
                        alt={video.titulo}
                        className="w-16 h-11 object-cover rounded-xl flex-shrink-0 shadow-sm"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 line-clamp-1">
                        {video.titulo}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {video.canalNome} • <span className="font-semibold text-slate-700">{video.duracaoMin} min</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-3.5 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
              <span>🔒 Zero feed infinito: para ao terminar a fila</span>
              <span className="font-mono text-indigo-600 font-bold">{tempoTotalFila} / {tempoMinutos}m</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

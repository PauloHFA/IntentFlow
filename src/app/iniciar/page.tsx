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
} from "lucide-react";

export default function IniciarSessaoPage() {
  const router = useRouter();
  const [objetivo, setObjetivo] = useState("Aprender arquitetura de software e React");
  const [tempoMinutos, setTempoMinutos] = useState(35);
  const [intencaoSelecionada, setIntencaoSelecionada] = useState("");
  const [intencoes, setIntencoes] = useState<Array<{ id: string; nome: string }>>([]);
  const [candidatos, setCandidatos] = useState<CandidatoVideo[]>([]);
  const [filaOtimizada, setFilaOtimizada] = useState<CandidatoVideo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [iniciando, setIniciando] = useState(false);

  // Carrega canais e intenções
  useEffect(() => {
    async function carregarInicial() {
      try {
        const res = await fetch("/api/canais");
        const data = await res.json();
        if (data.intencoes && data.intencoes.length > 0) {
          setIntencoes(data.intencoes);
          setIntencaoSelecionada(data.intencoes[0].id);
        }
      } catch (err) {
        console.error("Erro ao carregar intenções", err);
      }
    }
    carregarInicial();
  }, []);

  // Carrega candidatos do feed ao alterar a intenção
  useEffect(() => {
    async function carregarFeed() {
      setCarregando(true);
      try {
        const query = intencaoSelecionada ? `?intencaoId=${intencaoSelecionada}` : "";
        const res = await fetch(`/api/feed${query}`);
        const data = await res.json();
        if (data.candidatos) {
          setCandidatos(data.candidatos);
        }
      } catch (err) {
        console.error("Erro ao carregar candidatos", err);
      } finally {
        setCarregando(false);
      }
    }
    carregarFeed();
  }, [intencaoSelecionada]);

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

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Target className="w-7 h-7 text-indigo-600" />
            <span>Iniciar Sessão com Intenção</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Diga o que você quer aprender e quanto tempo tem. O algoritmo da Mochila 0/1 monta uma fila finita sob medida.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Formulário de Configuração */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Qual é o seu objetivo de aprendizado?
              </label>
              <input
                type="text"
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                placeholder="Ex: Dominar Hooks do React e Ciclo de Vida"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Intenção
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {intencoes.map((intencao) => (
                  <button
                    key={intencao.id}
                    type="button"
                    onClick={() => setIntencaoSelecionada(intencao.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-xl border text-center transition-all ${
                      intencaoSelecionada === intencao.id
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {intencao.nome}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Orçamento de Tempo Disponível</span>
                </label>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                  {tempoMinutos} minutos
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={tempoMinutos}
                onChange={(e) => setTempoMinutos(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                <span>10m</span>
                <span>30m</span>
                <span>60m</span>
                <span>90m</span>
                <span>120m</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleIniciarSessao}
                disabled={iniciando || filaOtimizada.length === 0}
                className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold shadow-md transition-all"
              >
                {iniciando ? (
                  <span>Preparando sala...</span>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    <span>Iniciar Sala de Foco ({tempoTotalFila} min)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Prévia da Fila Otimizada pela Mochila 0/1 */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Fila Otimizada (Algoritmo da Mochila)
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                {filaOtimizada.length} vídeo(s) • {tempoTotalFila} de {tempoMinutos} min
              </span>
            </div>

            {carregando ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400">
                <RefreshCw className="w-8 h-8 animate-spin mb-2" />
                <p className="text-sm">Buscando candidatos recentes dos canais...</p>
              </div>
            ) : filaOtimizada.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400 text-center">
                <p className="text-sm font-medium">Nenhum vídeo cabe no tempo informado.</p>
                <p className="text-xs text-slate-400 mt-1">
                  Experimente aumentar o orçamento de tempo no slider acima.
                </p>
              </div>
            ) : (
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px] pr-1">
                {filaOtimizada.map((video, index) => (
                  <div
                    key={video.videoId}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center space-x-3 hover:bg-indigo-50/40 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    {video.miniaturaUrl && (
                      <img
                        src={video.miniaturaUrl}
                        alt={video.titulo}
                        className="w-16 h-10 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                        {video.titulo}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {video.canalNome} • {video.duracaoMin} min
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              ⚡ Fila finita e estrita: ao terminar o último vídeo, a reprodução encerra e você é direcionado para a reflexão e revisão. Sem autoplay contínuo.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


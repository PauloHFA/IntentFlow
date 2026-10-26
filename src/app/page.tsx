"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Compass,
  PlayCircle,
  Clock,
  BookOpen,
  Sparkles,
  Tv,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
} from "lucide-react";

interface MetricasSemanais {
  totalSessoes: number;
  minutosAssistidosHistorico: number;
  totalNotasCriadas: number;
  totalCartoesRevisados: number;
  cartoesPendentesHoje: number;
}

export default function HomePage() {
  const [metricas, setMetricas] = useState<MetricasSemanais>({
    totalSessoes: 0,
    minutosAssistidosHistorico: 0,
    totalNotasCriadas: 0,
    totalCartoesRevisados: 0,
    cartoesPendentesHoje: 0,
  });
  const [canais, setCanais] = useState<any[]>([]);
  const [cartoesPendentes, setCartoesPendentes] = useState<any[]>([]);
  const [ultimasSessoes, setUltimasSessoes] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resPainel, resCanais, resRevisao] = await Promise.all([
          fetch("/api/painel/semana").then((r) => r.json()),
          fetch("/api/canais").then((r) => r.json()),
          fetch("/api/revisao/hoje").then((r) => r.json()),
        ]);

        if (resPainel.metricas) setMetricas(resPainel.metricas);
        if (resPainel.sessoesRecentes) setUltimasSessoes(resPainel.sessoesRecentes);
        if (resCanais.canais) setCanais(resCanais.canais);
        if (resRevisao.cartoes) setCartoesPendentes(resRevisao.cartoes);
      } catch (err) {
        console.error("Erro ao carregar dados da página inicial:", err);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Banner de Proposta de Valor */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl mb-10">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Oposto ao Feed Infinito</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Plataformas otimizam tempo de tela. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-white">
                O IntentFlow otimiza o que você aprende.
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl">
              Defina seu objetivo e o tempo que você tem. Montamos uma fila finita usando algoritmos de otimização (Problema da Mochila), você anota no tempo do vídeo e consolida o conhecimento com repetição espaçada (SM-2).
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/iniciar"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium shadow-lg hover:shadow-indigo-500/30 transition-all text-base"
              >
                <PlayCircle className="w-5 h-5" />
                <span>Iniciar Sessão com Intenção</span>
              </Link>
              <Link
                href="/revisao"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium border border-white/15 transition-all text-base"
              >
                <BookOpen className="w-5 h-5" />
                <span>Revisar Cartões ({cartoesPendentes.length})</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Grade de Indicadores & Métricas de Foco */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Minutos de Foco (7d)
              </p>
              <h3 className="text-2xl font-bold text-slate-900">
                {metricas.minutosAssistidosHistorico} min
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Sessões Concluídas
              </p>
              <h3 className="text-2xl font-bold text-slate-900">
                {metricas.totalSessoes}
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Notas Ancoradas
              </p>
              <h3 className="text-2xl font-bold text-slate-900">
                {metricas.totalNotasCriadas}
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Revisões Espaçadas
              </p>
              <h3 className="text-2xl font-bold text-slate-900">
                {metricas.totalCartoesRevisados}
              </h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1 e 2: Sessões e Cartões */}
          <div className="lg:col-span-2 space-y-8">
            {/* Seção Cartões do Dia */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <BrainCircuit className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Revisões Espaçadas para Hoje (SM-2)
                  </h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold">
                  {cartoesPendentes.length} pendente(s)
                </span>
              </div>

              {cartoesPendentes.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <p className="text-sm">Você está em dia com todas as suas revisões!</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Crie notas durante sua próxima sessão para gerar novos cartões de estudo.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartoesPendentes.slice(0, 3).map((cartao) => (
                    <div
                      key={cartao.id}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{cartao.frente}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Repetições: {cartao.repeticoes} • Intervalo atual: {cartao.intervaloDias}d
                        </p>
                      </div>
                      <Link
                        href="/revisao"
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors"
                      >
                        Revisar
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sessões Recentes */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Sessões Recentes de Aprendizado
                  </h2>
                </div>
              </div>

              {ultimasSessoes.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <p className="text-sm">Nenhuma sessão registrada recentemente.</p>
                  <Link
                    href="/iniciar"
                    className="mt-3 inline-flex items-center space-x-1.5 text-xs text-indigo-600 font-semibold hover:underline"
                  >
                    <span>Iniciar a primeira sessão agora</span>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {ultimasSessoes.map((sessao) => (
                    <div key={sessao.id} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{sessao.objetivo}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {sessao.minutosPlanejados} min planejados • {sessao.itens.length} vídeos • Status: {sessao.status}
                        </p>
                      </div>
                      <Link
                        href={`/sessao/${sessao.id}`}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Ver detalhes →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Coluna 3: Canais Prioritários */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Tv className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg font-bold text-slate-900">Canais Ativos</h2>
                </div>
                <Link
                  href="/canais"
                  className="text-xs text-indigo-600 hover:underline font-medium"
                >
                  Gerenciar
                </Link>
              </div>

              <div className="space-y-3">
                {canais.map((canal) => (
                  <div key={canal.id} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-50">
                    <img
                      src={canal.miniaturaUrl || "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&h=150&fit=crop"}
                      alt={canal.titulo}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{canal.titulo}</p>
                      <p className="text-xs text-slate-500">{canal.handle || "@canal"}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                      ★ {canal.prioridade}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500">
                <p>
                  💡 <strong>Sem busca custosa:</strong> o IntentFlow lista vídeos recentes diretamente da playlist de uploads dos canais, consumindo ~98% menos cota da API.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

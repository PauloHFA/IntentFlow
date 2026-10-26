"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PerfilGamificacao } from "@/lib/gamification/types";
import {
  Trophy,
  Flame,
  Sparkles,
  Award,
  Clock,
  BookOpen,
  Target,
  BrainCircuit,
  CheckCircle2,
  Lock,
  Zap,
} from "lucide-react";

export default function ConquistasPage() {
  const [perfil, setPerfil] = useState<PerfilGamificacao | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarGamificacao() {
      try {
        const res = await fetch("/api/gamificacao");
        const data = await res.json();
        setPerfil(data);
      } catch (err) {
        console.error("Erro ao carregar gamificação:", err);
      } finally {
        setCarregando(false);
      }
    }
    carregarGamificacao();
  }, []);

  const conquistasFiltradas = perfil?.conquistas.filter((c) => {
    if (filtroCategoria === "todas") return true;
    return c.categoria === filtroCategoria;
  }) || [];

  const totalDesbloqueadas = perfil?.conquistas.filter((c) => c.desbloqueada).length || 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Cabeçalho */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2.5">
              <Trophy className="w-8 h-8 text-amber-500" />
              <span>Jornada de Aprendizado & Conquistas</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Gamificação deliberada: seja recompensado pelo seu foco real, retenção com SM-2 e disciplina contra o feed infinito.
            </p>
          </div>

          {/* Badge de Sequência / Streak */}
          <div className="inline-flex items-center space-x-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5 rounded-2xl shadow-md">
            <Flame className="w-6 h-6 animate-pulse" />
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold opacity-90">
                Sequência de Estudo
              </p>
              <p className="text-base font-extrabold leading-none">
                {perfil?.streakDias || 0} dia(s) seguidos
              </p>
            </div>
          </div>
        </div>

        {/* Card Principal: Nível de Mestria e XP */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-10 border border-indigo-900/40 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-2xl sm:text-3xl shadow-lg border-2 border-amber-300">
                {perfil?.nivelAtual || 1}
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-400/30">
                  Nível {perfil?.nivelAtual || 1}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                  {perfil?.nivelTitulo || "Aprendiz da Intenção"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {perfil?.xpTotal || 0} XP acumulados no seu histórico
                </p>
              </div>
            </div>

            {/* Barra de Progresso de XP */}
            <div className="w-full md:w-80 space-y-2">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span>Progresso do Nível</span>
                <span className="font-mono text-amber-300">
                  {perfil?.porcentagemNivel || 0}%
                </span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/10 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, perfil?.porcentagemNivel || 0)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 text-right">
                Próximo nível em {perfil ? Math.max(0, perfil.xpProximoNivel - perfil.xpTotal) : 0} XP
              </p>
            </div>
          </div>
        </div>

        {/* Grade de Estatísticas Rápidas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Tempo Focado</p>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                {perfil?.minutosFocoTotal || 0} min
              </h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Sessões Concluídas</p>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                {perfil?.totalSessoesConcluidas || 0}
              </h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Emblemas Conquistados</p>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                {totalDesbloqueadas} de {perfil?.conquistas.length || 0}
              </h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">XP Total</p>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                {perfil?.xpTotal || 0} pts
              </h4>
            </div>
          </div>
        </div>

        {/* Seção de Conquistas e Emblemas */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Emblemas Desbloqueáveis
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Alcance marcos de atenção deliberada e retenção para desbloquear medalhas.
              </p>
            </div>

            {/* Filtros de Categoria */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "todas", rotulo: "Todas" },
                { id: "sessoes", rotulo: "Sessões" },
                { id: "tempo", rotulo: "Tempo" },
                { id: "notas", rotulo: "Notas" },
                { id: "revisao", rotulo: "Revisão SM-2" },
                { id: "streak", rotulo: "Streak" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFiltroCategoria(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    filtroCategoria === f.id
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f.rotulo}
                </button>
              ))}
            </div>
          </div>

          {/* Grade de Conquistas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {conquistasFiltradas.map((c) => (
              <div
                key={c.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  c.desbloqueada
                    ? "bg-gradient-to-b from-amber-50/50 to-white border-amber-200 shadow-sm hover:shadow-md"
                    : "bg-slate-50/80 border-slate-200 opacity-75"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{c.icone}</span>
                    {c.desbloqueada ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Conquistado</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold">
                        <Lock className="w-3 h-3" />
                        <span>Bloqueado</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {c.titulo}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {c.descricao}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                    <span>Progresso</span>
                    <span>
                      {c.progressoAtual} / {c.progressoMaximo}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        c.desbloqueada ? "bg-amber-500" : "bg-indigo-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          (c.progressoAtual / c.progressoMaximo) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabela de Como Ganhar XP */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Como ganhar Pontos de Intenção (XP):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs text-slate-600">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="font-bold text-indigo-600 block text-sm">+10 XP</span>
                <span>Por minuto de foco real</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="font-bold text-indigo-600 block text-sm">+50 XP</span>
                <span>Por sessão concluída</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="font-bold text-indigo-600 block text-sm">+20 XP</span>
                <span>Por nota com timestamp</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="font-bold text-indigo-600 block text-sm">+15 XP</span>
                <span>Por revisão espaçada</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="font-bold text-indigo-600 block text-sm">+75 XP</span>
                <span>Por reflexão final</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

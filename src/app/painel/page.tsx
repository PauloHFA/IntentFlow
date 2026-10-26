"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  Target,
  Clock,
  BookOpen,
  BrainCircuit,
  TrendingUp,
  Sparkles,
  Calendar,
} from "lucide-react";

interface MetricasPainel {
  totalSessoes: number;
  minutosAssistidosHistorico: number;
  totalNotasCriadas: number;
  totalCartoesRevisados: number;
  cartoesPendentesHoje: number;
  diasDaSemana: Array<{
    dia: string;
    data: string;
    minutosAssistidos: number;
    minutosMeta: number;
  }>;
  porIntencao: Array<{
    nome: string;
    metaMinutos: number;
    minutosAssistidos: number;
  }>;
}

export default function PainelSemanalPage() {
  const [metricas, setMetricas] = useState<MetricasPainel | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const res = await fetch("/api/painel/semana");
        const data = await res.json();
        if (data.metricas) {
          setMetricas(data.metricas);
        }
      } catch (err) {
        console.error("Erro ao carregar painel semanal:", err);
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
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
              <TrendingUp className="w-7 h-7 text-indigo-600" />
              <span>Painel de Atenção Semanal (RF-11)</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Acompanhe sua consistência de aprendizado, tempo focado e progresso de metas por intenção.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Últimos 7 Dias</span>
          </div>
        </div>

        {/* Indicadores Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Foco Acumulado
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                {metricas?.minutosAssistidosHistorico ?? 0} min
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Sessões Concluídas
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                {metricas?.totalSessoes ?? 0}
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Notas Ancoradas
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                {metricas?.totalNotasCriadas ?? 0}
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Revisões Espaçadas (SM-2)
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                {metricas?.totalCartoesRevisados ?? 0}
              </h3>
            </div>
          </div>
        </div>

        {/* Gráficos Recharts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Gráfico 1: Evolução Diária da Atenção (Minutos Reais vs Meta) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Tempo Assistido com Foco vs. Meta Diária
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Métrica honesta: contabiliza apenas o tempo em que o player estava reproduzindo e a aba ativa.
              </p>
            </div>

            <div className="w-full h-72">
              {metricas?.diasDaSemana && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metricas.diasDaSemana} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="dia" stroke="#64748b" fontSize={12} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        borderRadius: "12px",
                        border: "none",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                      formatter={(value: any, name: any) => [
                        `${value} min`,
                        name === "minutosAssistidos" ? "Foco Real Assistido" : "Meta de Estudo",
                      ]}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ fontSize: "12px", paddingBottom: "10px" }}
                    />
                    <Bar
                      dataKey="minutosAssistidos"
                      name="Foco Real Assistido"
                      fill="#6366f1"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="minutosMeta"
                      name="Meta Planejada"
                      fill="#cbd5e1"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Gráfico 2: Metas por Intenção */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Atenção Dedicada por Intenção
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Distribuição do tempo conforme suas categorias de aprendizado.
              </p>
            </div>

            <div className="space-y-5">
              {metricas?.porIntencao.map((int, i) => {
                const progresso = Math.min(100, Math.round((int.minutosAssistidos / int.metaMinutos) * 100));
                return (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-800">{int.nome}</span>
                      <span className="text-slate-500">
                        {int.minutosAssistidos} / {int.metaMinutos} min ({progresso}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(5, progresso)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
              💡 Metas semanais ajudam a manter a intenção e evitar o consumo passivo.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Activity,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Database,
  Lock,
  Layers,
  AlertTriangle,
} from "lucide-react";

export default function StatusCotaPage() {
  const [dados, setDados] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch("/api/saude/cota");
        const json = await res.json();
        setDados(json);
      } catch (err) {
        console.error(err);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Activity className="w-7 h-7 text-indigo-600" />
            <span>Livro de Cota & Conformidade de Políticas</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Monitoramento em tempo real do orçamento diário da YouTube Data API v3 e regras de conformidade do Google.
          </p>
        </div>

        {/* Painel de Consumo de Cota */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                Orçamento Diário da API
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">
                Consumo Hoje (Fuso do Pacífico / PT)
              </h2>
            </div>
            {dados?.cota?.tetoAlcancado ? (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Teto de 80% Atingido (Modo Cache Ativo)</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Operação Segura (&lt; 30% do orçamento)</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500">Unidades Gastas Hoje</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {dados?.cota?.consumoHoje ?? 0}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500">Limite Diário Padrão</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {dados?.cota?.limiteDiario?.toLocaleString() ?? "10.000"}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500">Teto Seguro (80%)</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                8.000 unidades
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
              <span className="text-xs text-indigo-700 font-semibold">Entradas em Cache</span>
              <p className="text-2xl font-bold text-indigo-900 mt-1">
                {dados?.cache?.entradasAtivas ?? 0}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-600">
              <span>Progresso de consumo do dia</span>
              <span>{dados?.cota?.porcentagemConsumida ?? 0}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, dados?.cota?.porcentagemConsumida ?? 0))}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              * A cota oficial do Google Cloud é renovada pontualmente à meia-noite no horário do Pacífico (PT).
            </p>
          </div>
        </div>

        {/* Checklist de Conformidade com Políticas do YouTube (Seção 4) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Checklist de Conformidade de Políticas (YouTube Data API v3)
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Player Incorporado Oficial e Intacto
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Vídeos são reproduzidos exclusivamente pelo YouTube IFrame Player oficial. Controles nativos não são alterados e nenhum elemento visual sobrepõe o player.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Retenção Máxima de 30 Dias e Expurgo Automatizado
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dados do YouTube residem apenas na tabela/camada de cache com TTLs de algumas horas até 7 dias. O teste automatizado de conformidade bloqueia qualquer dado mais antigo que 30 dias.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Sem Download, Áudio em Segundo Plano ou Bloqueio de Anúncios
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  O IntentFlow não baixa arquivos, não extrai áudio e não interfere com a exibição normal de anúncios da plataforma.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Zero Dependência de search.list
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Em vez de gastar 100 unidades por pesquisa, o aplicativo lê vídeos da playlist de uploads dos canais cadastrados (~2 unidades por canal), economizando 98% da cota.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Chave Protegida Estritamente no Servidor
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  A chave da API reside apenas em variáveis de ambiente no Next.js Route Handler (`ytGet`), nunca sendo exposta no JavaScript do navegador ou em URLs de requisições do cliente.
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


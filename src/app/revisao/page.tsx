"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { tocarSomVitoria } from "@/lib/audio/somConquista";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  BrainCircuit,
  RotateCw,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface CartaoEstudo {
  id: string;
  frente: string;
  verso: string;
  facilidade: number;
  intervaloDias: number;
  repeticoes: number;
}

export default function RevisaoPage() {
  const [cartoes, setCartoes] = useState<CartaoEstudo[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [revelado, setRevelado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [concluido, setConcluido] = useState(false);
  const [ultimoFeedback, setUltimoFeedback] = useState<string | null>(null);

  useEffect(() => {
    async function carregarCartoes() {
      try {
        const res = await fetch("/api/revisao/hoje");
        const data = await res.json();
        if (data.cartoes) {
          setCartoes(data.cartoes);
        }
      } catch (err) {
        console.error("Erro ao carregar revisões:", err);
      } finally {
        setCarregando(false);
      }
    }
    carregarCartoes();
  }, []);

  const cartaoAtual = cartoes[indiceAtual];

  async function handleAvaliar(qualidade: number) {
    if (!cartaoAtual) return;

    try {
      const res = await fetch(`/api/revisao/${cartaoAtual.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qualidade }),
      });
      const data = await res.json();

      if (data.cartao) {
        setUltimoFeedback(
          `Próxima revisão em ${data.cartao.intervaloDias} dia(s) (Fator: ${data.cartao.facilidade})`
        );
      }

      setRevelado(false);
      if (indiceAtual + 1 < cartoes.length) {
        setIndiceAtual((i) => i + 1);
      } else {
        setConcluido(true);
        try {
          tocarSomVitoria();
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
              <BrainCircuit className="w-7 h-7 text-indigo-600" />
              <span>Revisão Espaçada (SM-2)</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Consolide na memória de longo prazo os conceitos e notas das suas sessões.
            </p>
          </div>
          {cartoes.length > 0 && !concluido && (
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {indiceAtual + 1} de {cartoes.length}
            </span>
          )}
        </div>

        {carregando ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center text-slate-400">
            <RotateCw className="w-8 h-8 animate-spin mx-auto mb-2 text-indigo-600" />
            <p className="text-sm">Buscando cartões do dia...</p>
          </div>
        ) : concluido || cartoes.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Revisões em Dia!
            </h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
              Você completou todas as repetições agendadas para hoje. Novas sessões de estudo gerarão mais cartões com repetição espaçada.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/iniciar"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md transition-all"
              >
                Iniciar Nova Sessão
              </Link>
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all"
              >
                Voltar ao Início
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cartão Flashcard */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm min-h-[300px] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  Pergunta / Conceito
                </span>
                <p className="text-lg sm:text-xl font-semibold text-slate-900 mt-4 leading-relaxed">
                  {cartaoAtual.frente}
                </p>
              </div>

              {revelado ? (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Resposta / Insight
                  </span>
                  <p className="text-base text-slate-800 mt-3 leading-relaxed">
                    {cartaoAtual.verso}
                  </p>
                </div>
              ) : (
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setRevelado(true)}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-md transition-all flex items-center space-x-2"
                  >
                    <span>Mostrar Resposta</span>
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Painel de Autoavaliação SM-2 (0 a 5) */}
            {revelado && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 text-center">
                  Como foi sua recordação? (Algoritmo SM-2)
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  <button
                    type="button"
                    onClick={() => handleAvaliar(0)}
                    className="p-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 text-center transition-colors"
                  >
                    <span className="block text-base font-bold">0</span>
                    <span className="text-[10px] text-rose-600">Esqueci</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAvaliar(1)}
                    className="p-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 text-center transition-colors"
                  >
                    <span className="block text-base font-bold">1</span>
                    <span className="text-[10px] text-rose-600">Incorreto</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAvaliar(2)}
                    className="p-3 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-center transition-colors"
                  >
                    <span className="block text-base font-bold">2</span>
                    <span className="text-[10px] text-amber-600">Quase</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAvaliar(3)}
                    className="p-3 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 text-center transition-colors"
                  >
                    <span className="block text-base font-bold">3</span>
                    <span className="text-[10px] text-sky-600">Com esforço</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAvaliar(4)}
                    className="p-3 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-center transition-colors"
                  >
                    <span className="block text-base font-bold">4</span>
                    <span className="text-[10px] text-indigo-600">Hesitei</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAvaliar(5)}
                    className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-center transition-colors"
                  >
                    <span className="block text-base font-bold">5</span>
                    <span className="text-[10px] text-emerald-600">Perfeito</span>
                  </button>
                </div>

                {ultimoFeedback && (
                  <p className="text-center text-xs text-indigo-600 font-medium mt-3">
                    {ultimoFeedback}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}


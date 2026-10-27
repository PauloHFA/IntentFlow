"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { tocarSomVitoria } from "@/lib/audio/somConquista";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatarSegundos } from "@/lib/algorithms/duracao";
import {
  CheckCircle2,
  Clock,
  BookOpen,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  MessageSquare,
} from "lucide-react";

export default function ResumoSessaoPage() {
  const params = useParams();
  const router = useRouter();
  const sessaoId = params?.id as string;

  const [sessao, setSessao] = useState<any>(null);
  const [notas, setNotas] = useState<any[]>([]);
  const [reflexao, setReflexao] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch(`/api/sessoes/${sessaoId}`);
        const data = await res.json();
        if (data.sessao) {
          setSessao(data.sessao);
          setNotas(data.notas || []);
          if (data.sessao.reflexao) setReflexao(data.sessao.reflexao);

          // Dispara celebração sonora e visual de conquista
          try {
            tocarSomVitoria();
            confetti({
              particleCount: 120,
              spread: 75,
              origin: { y: 0.6 },
              colors: ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#3b82f6"],
            });
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    carregar();
  }, [sessaoId]);

  async function handleSalvarReflexao() {
    setSalvando(true);
    try {
      await fetch(`/api/sessoes/${sessaoId}/encerrar`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reflexao }),
      });
      setSalvo(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSalvando(false);
    }
  }

  if (!sessao) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 text-sm">Carregando resumo...</p>
      </div>
    );
  }

  const segundosAssistidosTotal = sessao.itens.reduce(
    (acc: number, item: any) => acc + item.segundosAssistidos,
    0
  );
  const minutosAssistidosReal = Math.round(segundosAssistidosTotal / 60);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mb-3 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sessão Concluída com Sucesso!
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Você atingiu o fim da sua fila finita sem distrações de feed infinito.
          </p>
        </div>

        {/* Cartão de Métricas Comparativas */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Resumo de Foco da Sessão
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500">Tempo Planejado</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {sessao.minutosPlanejados} min
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
              <span className="text-xs text-indigo-700 font-semibold">
                Tempo com Foco Real
              </span>
              <p className="text-2xl font-bold text-indigo-900 mt-1">
                {minutosAssistidosReal} min
              </p>
              <span className="text-[10px] text-slate-400">
                (Player ativo e aba visível)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500">Notas Registradas</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {notas.length} notas
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <span className="text-xs text-amber-800 font-semibold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>XP Conquistado</span>
              </span>
              <p className="text-2xl font-extrabold text-amber-700 mt-1">
                +{minutosAssistidosReal * 10 + 50 + notas.length * 20 + (reflexao.trim() ? 75 : 0)} XP
              </p>
              <Link href="/conquistas" className="text-[10px] font-semibold text-amber-800 hover:underline">
                Ver Conquistas & Nível →
              </Link>
            </div>
          </div>
        </div>

        {/* Pergunta Reflexiva (Seção 5.1 e 6) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex items-center space-x-2 mb-3">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              Reflexão: O que você aprendeu nesta sessão?
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            O aprendizado se consolida quando você sintetiza com as suas próprias palavras.
          </p>

          <textarea
            value={reflexao}
            onChange={(e) => setReflexao(e.target.value)}
            rows={4}
            placeholder="Sintetize aqui os pontos principais que você absorveu..."
            className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handleSalvarReflexao}
              disabled={salvando}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              {salvando ? "Salvando..." : salvo ? "Reflexão Salva ✓" : "Salvar Reflexão"}
            </button>

            <Link
              href="/revisao"
              className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <span>Ir para Revisão Espaçada</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Notas da Sessão */}
        {notas.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Notas Ancoradas no Tempo</span>
            </h3>

            <div className="space-y-2">
              {notas.map((n) => (
                <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
                  <span className="font-mono text-xs font-bold text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {formatarSegundos(n.tempoS)}
                  </span>
                  <p className="text-xs text-slate-700 flex-1">{n.texto}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}


"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Tv,
  Plus,
  Star,
  CheckCircle,
  AlertCircle,
  Trash2,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface Canal {
  id: string;
  channelId: string;
  handle?: string;
  titulo: string;
  miniaturaUrl?: string;
  intencaoId: string;
  prioridade: number;
}

interface Intencao {
  id: string;
  nome: string;
}

export default function CanaisPage() {
  const [canais, setCanais] = useState<Canal[]>([]);
  const [intencoes, setIntencoes] = useState<Intencao[]>([]);
  const [identificador, setIdentificador] = useState("");
  const [intencaoId, setIntencaoId] = useState("");
  const [prioridade, setPrioridade] = useState(4);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: "ok" | "erro"; texto: string } | null>(null);

  useEffect(() => {
    carregarCanais();
  }, []);

  async function carregarCanais() {
    try {
      const res = await fetch("/api/canais");
      const data = await res.json();
      if (data.canais) setCanais(data.canais);
      if (data.intencoes && data.intencoes.length > 0) {
        setIntencoes(data.intencoes);
        if (!intencaoId) setIntencaoId(data.intencoes[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAdicionarCanal(e: React.FormEvent) {
    e.preventDefault();
    if (!identificador.trim()) return;

    setSalvando(true);
    setMensagem(null);

    try {
      const res = await fetch("/api/canais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identificador,
          intencaoId,
          prioridade,
        }),
      });

      const data = await res.json();
      if (res.ok && data.canal) {
        setCanais((prev) => [...prev, data.canal]);
        setIdentificador("");
        setMensagem({
          tipo: "ok",
          texto: `Canal "${data.canal.titulo}" validado e adicionado com sucesso!`,
        });
      } else {
        setMensagem({
          tipo: "erro",
          texto: data.erro || "Não foi possível validar o canal informado.",
        });
      }
    } catch (err) {
      setMensagem({
        tipo: "erro",
        texto: "Erro ao comunicar com a API do servidor.",
      });
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Tv className="w-7 h-7 text-indigo-600" />
            <span>Gerenciar Canais e Intenções</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Cadastre canais por @handle, URL ou ID. O IntentFlow consome a playlist de uploads em vez de gastar cota com buscas infinitas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Formulário de Cadastro */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 h-fit">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-1.5">
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>Adicionar Canal Confiável</span>
            </h2>

            <form onSubmit={handleAdicionarCanal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  @handle, URL ou ID do canal
                </label>
                <input
                  type="text"
                  value={identificador}
                  onChange={(e) => setIdentificador(e.target.value)}
                  placeholder="Ex: @GoogleDevelopers ou @react"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Intenção associada
                </label>
                <select
                  value={intencaoId}
                  onChange={(e) => setIntencaoId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {intencoes.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Prioridade na Fila (Algoritmo da Mochila)
                  </label>
                  <span className="text-xs font-bold text-amber-600">
                    ★ {prioridade} de 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={prioridade}
                  onChange={(e) => setPrioridade(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {mensagem && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
                    mensagem.tipo === "ok"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {mensagem.tipo === "ok" ? (
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span>{mensagem.texto}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={salvando || !identificador.trim()}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs font-semibold shadow-sm transition-all"
              >
                {salvando ? "Consultando YouTube API..." : "Validar e Cadastrar Canal"}
              </button>
            </form>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              Custo de validação: <strong>1 unidade</strong> de cota na YouTube Data API v3 (vs 100 de uma busca por palavra-chave).
            </div>
          </div>

          {/* Lista de Canais Cadastrados */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
                <span>Canais Cadastrados ({canais.length})</span>
                <span className="text-xs font-normal text-slate-400">
                  Ordenados por prioridade
                </span>
              </h2>

              <div className="space-y-3">
                {canais.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50 flex items-center space-x-3.5 hover:bg-white transition-all shadow-sm"
                  >
                    <img
                      src={
                        c.miniaturaUrl ||
                        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&h=150&fit=crop"
                      }
                      alt={c.titulo}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {c.titulo}
                      </p>
                      <p className="text-xs text-slate-500">
                        {c.handle || `@${c.channelId}`}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end space-y-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                        ★ {c.prioridade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Settings,
  Download,
  Trash2,
  Shield,
  FileText,
  FileCode,
  CheckCircle,
  AlertTriangle,
  Lock,
} from "lucide-react";

export default function ConfiguracoesPage() {
  const [excluindo, setExcluindo] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);

  async function handleExcluirDados() {
    setExcluindo(true);
    try {
      const res = await fetch("/api/conta", {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setMensagemSucesso(
          "Seus dados, notas e sessões foram completamente excluídos com sucesso."
        );
        setConfirmarExclusao(false);
      } else {
        alert(data.erro || "Falha ao excluir dados.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao comunicar com o servidor.");
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Settings className="w-7 h-7 text-indigo-600" />
            <span>Configurações & Privacidade</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Exporte suas anotações para o Obsidian/Notion e gerencie seus dados com total transparência (LGPD).
          </p>
        </div>

        {mensagemSucesso && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center space-x-3 shadow-sm">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{mensagemSucesso}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Exportação de Dados (RF-14) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center space-x-2.5 mb-2">
              <Download className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">
                Exportar Conhecimento e Anotações (RF-14)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-6 max-w-xl">
              Leve suas anotações com timestamps do vídeo, sessões realizadas e cartões de repetição espaçada para onde quiser.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="/api/conta/exportar?formato=markdown"
                download="intentflow-notas-estudo.md"
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-indigo-50/60 hover:border-indigo-300 transition-all flex items-start space-x-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Exportar para Markdown (.md)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Formato ideal para importar diretamente no <strong>Obsidian</strong>, <strong>Notion</strong> ou <strong>Logseq</strong>, com links clicáveis para o minuto exato do vídeo.
                  </p>
                </div>
              </a>

              <a
                href="/api/conta/exportar?formato=json"
                download="intentflow-backup.json"
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all flex items-start space-x-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <FileCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 transition-colors">
                    Exportar Backup Estruturado (.json)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Arquivo JSON completo com todas as sessões, canais, notas e o estado do algoritmo SM-2 para portabilidade total.
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Políticas de Privacidade & LGPD */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center space-x-2.5 mb-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Privacidade & Proteção de Dados (LGPD)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-6 max-w-xl">
              Em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018) e as Políticas de Desenvolvedores do YouTube:
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center space-x-2">
                <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>
                  <strong>Coleta Mínima:</strong> Nenhum rastreador comercial ou cookies de terceiros são utilizados.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center space-x-2">
                <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>
                  <strong>Expurgo Rigoroso:</strong> Metadados da YouTube API nunca residem por mais de 30 dias na base local.
                </span>
              </div>
            </div>

            {/* Zona de Perigo / Exclusão Total de Dados */}
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-sm font-bold text-rose-700 flex items-center space-x-1.5 mb-1">
                <Trash2 className="w-4 h-4 text-rose-600" />
                <span>Excluir Conta e Todos os Dados</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Esta ação apagará permanentemente todas as suas sessões de foco, notas no tempo, cartões SM-2 e canais associados. A operação não pode ser desfeita.
              </p>

              {confirmarExclusao ? (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center space-x-2 text-rose-900 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>Tem certeza absoluta de que deseja apagar todos os seus dados?</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setConfirmarExclusao(false)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleExcluirDados}
                      disabled={excluindo}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      {excluindo ? "Excluindo..." : "Sim, Excluir Tudo"}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmarExclusao(true)}
                  className="px-4 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors"
                >
                  Solicitar Exclusão Completa
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


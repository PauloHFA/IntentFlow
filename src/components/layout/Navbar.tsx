import React from "react";
import Link from "next/link";
import { Compass, PlayCircle, BookOpen, Tv, Activity, ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              IntentFlow
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Anti-Feed Infinito
            </span>
          </div>
        </Link>

        <nav className="flex items-center space-x-1 sm:space-x-3 text-sm font-medium">
          <Link
            href="/"
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span className="hidden md:inline">Hoje</span>
          </Link>
          <Link
            href="/iniciar"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-all"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Iniciar Sessão</span>
          </Link>
          <Link
            href="/revisao"
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Revisão SM-2</span>
          </Link>
          <Link
            href="/canais"
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Tv className="w-4 h-4" />
            <span className="hidden md:inline">Canais</span>
          </Link>
          <Link
            href="/status"
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Activity className="w-4 h-4" />
            <span className="hidden lg:inline">Cota & Cache</span>
          </Link>
          <Link
            href="/configuracoes"
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Configurações e Exportação"
          >
            <span className="text-sm">⚙️</span>
            <span className="hidden xl:inline">Configurações</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}


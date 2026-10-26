import React from "react";
import Link from "next/link";
import { ShieldCheck, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-sm text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-700">IntentFlow</span>
            <span>— Experiência deliberada de aprendizado com vídeos.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
            <a
              href="https://www.youtube.com/t/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-indigo-600 transition-colors"
            >
              Termos de Serviço do YouTube
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-indigo-600 transition-colors"
            >
              Política de Privacidade do Google
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <Link href="/status" className="hover:text-indigo-600 transition-colors">
              Conformidade e Cota
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 text-center md:text-left text-xs text-slate-400">
          Aviso legal: Projeto de portfólio acadêmico e técnico. Não é afiliado, associado, autorizado ou endossado pelo YouTube ou Google LLC. Todos os vídeos e marcas são propriedade de seus respectivos detentores.
        </div>
      </div>
    </footer>
  );
}


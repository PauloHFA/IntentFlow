import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IntentFlow – Assistir com Intenção",
  description: "Experiência intencional de aprendizado em vídeo com a YouTube Data API v3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}

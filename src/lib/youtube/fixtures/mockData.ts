export interface MockCanal {
  id: string;
  handle: string;
  titulo: string;
  descricao: string;
  miniatura: string;
  uploadsPlaylistId: string;
  categoria: "idiomas" | "tecnologia" | "ciencias" | "geral";
  videos: MockVideo[];
}

export interface MockVideo {
  id: string; // ID real e reproduzível no player do YouTube
  titulo: string;
  descricao: string;
  duracaoIso: string;
  duracaoSegundos: number;
  duracaoMin: number;
  miniatura: string;
  publicadoEm: string;
  canalTitulo: string;
  canalId: string;
  tags: string[];
}

export const MOCK_CANAIS: MockCanal[] = [
  // CANAL 1: Inglês / Idiomas (BBC Learning English)
  {
    id: "UCHaHD477h-FeBbVh9Sh7syA",
    handle: "@bbclearningenglish",
    titulo: "BBC Learning English",
    descricao: "Everyday English, vocabulary, grammar and tips from BBC experts.",
    miniatura: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=150&h=150&fit=crop",
    uploadsPlaylistId: "UUHaHD477h-FeBbVh9Sh7syA",
    categoria: "idiomas",
    videos: [
      {
        id: "Vd9Z7g2B-3g", // Vídeo real no YouTube
        titulo: "Learn English in 20 Minutes: Essential Grammar & Phrases",
        descricao: `A complete guide to boost your English conversation and vocabulary.
0:00 Introduction & Greetings
03:10 Daily Routine & Present Tense
07:45 Expressing Opinions in English
12:30 Common Mistakes to Avoid
16:15 Real Conversation Practice`,
        duracaoIso: "PT20M15S",
        duracaoSegundos: 1215,
        duracaoMin: 21,
        miniatura: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-15T12:00:00Z",
        canalTitulo: "BBC Learning English",
        canalId: "UCHaHD477h-FeBbVh9Sh7syA",
        tags: ["ingles", "inglês", "english", "grammar", "idiomas", "vocabulario", "pronuncia"],
      },
      {
        id: "1L0T7Fm5n1Q", // Vídeo real no YouTube
        titulo: "English at Work: Business Conversations & Vocabulary",
        descricao: `Improve your professional English for meetings and emails.
0:00 Introduction to Business English
02:40 How to Start a Meeting Politely
06:15 Asking for Clarification
11:00 Closing Deals and Next Steps`,
        duracaoIso: "PT15M30S",
        duracaoSegundos: 930,
        duracaoMin: 16,
        miniatura: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-10T10:00:00Z",
        canalTitulo: "BBC Learning English",
        canalId: "UCHaHD477h-FeBbVh9Sh7syA",
        tags: ["ingles", "inglês", "business", "trabalho", "idiomas", "english", "conversacao"],
      },
      {
        id: "d6yV3i_4j1g", // Vídeo real no YouTube
        titulo: "10 Phrasal Verbs You Must Know in English",
        descricao: `Master the most used English phrasal verbs with natural examples.
0:00 What are phrasal verbs
02:10 Phrasal verbs for daily routines
05:40 Work and study phrasal verbs
08:20 Quiz and review`,
        duracaoIso: "PT10M20S",
        duracaoSegundos: 620,
        duracaoMin: 11,
        miniatura: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-02T14:00:00Z",
        canalTitulo: "BBC Learning English",
        canalId: "UCHaHD477h-FeBbVh9Sh7syA",
        tags: ["ingles", "inglês", "phrasal verbs", "idiomas", "english"],
      },
    ],
  },

  // CANAL 2: Inglês Prático (English with Lucy)
  {
    id: "UCz4tgANd4yy8Oe0iXCdSWnw",
    handle: "@EnglishWithLucy",
    titulo: "English with Lucy",
    descricao: "Aprenda pronúncia britânica, gramática e conversação com naturalidade.",
    miniatura: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    uploadsPlaylistId: "UUz4tgANd4yy8Oe0iXCdSWnw",
    categoria: "idiomas",
    videos: [
      {
        id: "jU3vWqN1uR8", // Vídeo real no YouTube
        titulo: "Como Pensar em Inglês e Falar sem Traduzir Mentalmente",
        descricao: `Técnicas práticas para destravar o pensamento em inglês no dia a dia.
0:00 O erro da tradução mental
03:30 Associando objetos diretamente aos conceitos
07:15 Criando monólogos internos em inglês
11:45 Rotina de 15 minutos diários`,
        duracaoIso: "PT14M45S",
        duracaoSegundos: 885,
        duracaoMin: 15,
        miniatura: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-18T18:00:00Z",
        canalTitulo: "English with Lucy",
        canalId: "UCz4tgANd4yy8Oe0iXCdSWnw",
        tags: ["ingles", "inglês", "fluencia", "conversacao", "falar", "idiomas", "english"],
      },
      {
        id: "u0vO61J3_uA", // Vídeo real no YouTube
        titulo: "50 Palavras em Inglês Mais Usadas com Pronúncia Perfeita",
        descricao: `Guia de pronúncia e fonética dos termos mais recorrentes.
0:00 Introdução aos fonemas
02:15 Pronúncia de vogais curtas vs longas
05:30 Consoantes silenciosas comuns
08:00 Exercício prático de repetição`,
        duracaoIso: "PT11M10S",
        duracaoSegundos: 670,
        duracaoMin: 12,
        miniatura: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-08T15:00:00Z",
        canalTitulo: "English with Lucy",
        canalId: "UCz4tgANd4yy8Oe0iXCdSWnw",
        tags: ["ingles", "inglês", "pronuncia", "idiomas", "fonetica", "english"],
      },
    ],
  },

  // CANAL 3: Tecnologia / Programação (Fireship)
  {
    id: "UCsBjURrPoezykLs9EqgamOA",
    handle: "@fireship",
    titulo: "Fireship",
    descricao: "High-intensity code tutorials and engineering breakdowns.",
    miniatura: "https://images.unsplash.com/photo-1534972195531-a756b1140f6c?w=150&h=150&fit=crop",
    uploadsPlaylistId: "UUsBjURrPoezykLs9EqgamOA",
    categoria: "tecnologia",
    videos: [
      {
        id: "bMknfKXIFA8", // React in 100 Seconds (ID Real)
        titulo: "React in 100 Seconds: Conceitos Fundamentais e Hooks",
        descricao: `Tudo o que você precisa saber sobre o React e renderização declarativa.
0:00 O que é o React e JSX
01:10 Virtual DOM e Reatividade
02:20 Componentes e State
03:00 Ecossistema Moderno`,
        duracaoIso: "PT10M12S",
        duracaoSegundos: 612,
        duracaoMin: 11,
        miniatura: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-20T18:00:00Z",
        canalTitulo: "Fireship",
        canalId: "UCsBjURrPoezykLs9EqgamOA",
        tags: ["react", "javascript", "typescript", "frontend", "programacao", "desenvolvimento", "web"],
      },
      {
        id: "dcXqhqiZ2y4", // Next.js in 100 Seconds (ID Real)
        titulo: "Next.js App Router e Server Components Explicados",
        descricao: `Guia prático sobre SSR, SSG e App Router.
0:00 O que mudou no Next.js
02:00 Server Components vs Client
05:15 Roteamento Dinâmico e Cache
08:30 Deploy e Otimização`,
        duracaoIso: "PT12M30S",
        duracaoSegundos: 750,
        duracaoMin: 13,
        miniatura: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-12T14:00:00Z",
        canalTitulo: "Fireship",
        canalId: "UCsBjURrPoezykLs9EqgamOA",
        tags: ["nextjs", "react", "fullstack", "web", "programacao", "desenvolvimento"],
      },
    ],
  },

  // CANAL 4: Google Developers (Web & Engenharia)
  {
    id: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
    handle: "@GoogleDevelopers",
    titulo: "Google Developers",
    descricao: "The official YouTube channel for Google developers.",
    miniatura: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&h=150&fit=crop",
    uploadsPlaylistId: "UU_x5XG1OV2P6uZZ5FSM9Ttw",
    categoria: "tecnologia",
    videos: [
      {
        id: "7Tf_X_N8ZlA", // Real Video ID
        titulo: "Web Performance: Core Web Vitals e LCP na Prática",
        descricao: `Aprenda como auditar o Largest Contentful Paint no Chrome DevTools.
0:00 Introdução às Métricas
03:20 Largest Contentful Paint (LCP)
09:45 Interaction to Next Paint (INP)
14:10 Profiling no DevTools`,
        duracaoIso: "PT18M",
        duracaoSegundos: 1080,
        duracaoMin: 18,
        miniatura: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-15T14:00:00Z",
        canalTitulo: "Google Developers",
        canalId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
        tags: ["google", "web", "performance", "devtools", "javascript", "programacao"],
      },
    ],
  },

  // CANAL 5: React Community
  {
    id: "UCreact123456789",
    handle: "@react",
    titulo: "React Community & Tutorials",
    descricao: "Tutoriais profundos e práticos sobre React e TypeScript.",
    miniatura: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&h=150&fit=crop",
    uploadsPlaylistId: "UUreact123456789",
    categoria: "tecnologia",
    videos: [
      {
        id: "bMknfKXIFA8",
        titulo: "React in 100 Seconds: Conceitos Fundamentais e Hooks",
        descricao: "Introdução rápida ao React.",
        duracaoIso: "PT10M12S",
        duracaoSegundos: 612,
        duracaoMin: 11,
        miniatura: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-19T10:00:00Z",
        canalTitulo: "React Community & Tutorials",
        canalId: "UCreact123456789",
        tags: ["react", "javascript"],
      },
    ],
  },
];

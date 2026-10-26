export interface MockCanal {
  id: string;
  handle: string;
  titulo: string;
  descricao: string;
  miniatura: string;
  uploadsPlaylistId: string;
  videos: MockVideo[];
}

export interface MockVideo {
  id: string;
  titulo: string;
  descricao: string;
  duracaoIso: string;
  duracaoSegundos: number;
  miniatura: string;
  publicadoEm: string;
  canalTitulo: string;
  canalId: string;
}

export const MOCK_CANAIS: MockCanal[] = [
  {
    id: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
    handle: "@GoogleDevelopers",
    titulo: "Google Developers",
    descricao: "The official YouTube channel for Google developers.",
    miniatura: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&h=150&fit=crop",
    uploadsPlaylistId: "UU_x5XG1OV2P6uZZ5FSM9Ttw",
    videos: [
      {
        id: "gd-vid-1",
        titulo: "Novidades do Web Performance & Core Web Vitals",
        descricao: `Aprenda como otimizar a experiência web para usuários modernos.
0:00 Introdução às Métricas
03:20 Largest Contentful Paint (LCP)
09:45 Interaction to Next Paint (INP)
16:10 Ferramentas de Profiling no DevTools
24:00 Conclusão e Melhores Práticas`,
        duracaoIso: "PT25M15S",
        duracaoSegundos: 1515,
        miniatura: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-15T14:00:00Z",
        canalTitulo: "Google Developers",
        canalId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
      },
      {
        id: "gd-vid-2",
        titulo: "Construindo Aplicações Seguras com APIs Modernas",
        descricao: `Boas práticas essenciais de segurança, OAuth 2.0 e privacidade.
0:00 Visão Geral de Ameaças Web
04:15 Autenticação sem Armazenar Segredos no Cliente
12:30 Sanitização e Prevenção de XSS/CSRF
19:00 Checklist de Produção`,
        duracaoIso: "PT20M",
        duracaoSegundos: 1200,
        miniatura: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-10T11:00:00Z",
        canalTitulo: "Google Developers",
        canalId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
      },
      {
        id: "gd-vid-3",
        titulo: "Arquitetura Eficiente de Cache HTTP e CDNs",
        descricao: `Como desenhar camadas de cache resilientes.
0:00 Estratégias de Invalidação
02:50 Stale-While-Revalidate
08:15 Gerenciamento de Custos de API`,
        duracaoIso: "PT10M40S",
        duracaoSegundos: 640,
        miniatura: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-01T10:00:00Z",
        canalTitulo: "Google Developers",
        canalId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
      },
    ],
  },
  {
    id: "UCreact123456789",
    handle: "@react",
    titulo: "React Community & Tutorials",
    descricao: "Tutoriais profundos e práticos sobre o ecossistema React e TypeScript.",
    miniatura: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&h=150&fit=crop",
    uploadsPlaylistId: "UUreact123456789",
    videos: [
      {
        id: "react-vid-1",
        titulo: "Dominando useEffect e Lifecycle no React 19",
        descricao: `Tudo o que você precisa entender sobre efeitos colaterais.
0:00 Por que menos useEffect é melhor
04:10 Sincronização vs Manipulação de Eventos
11:25 Limpeza de assinaturas e timers
18:30 Casos práticos reais`,
        duracaoIso: "PT22M30S",
        duracaoSegundos: 1350,
        miniatura: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-18T16:00:00Z",
        canalTitulo: "React Community & Tutorials",
        canalId: "UCreact123456789",
      },
      {
        id: "react-vid-2",
        titulo: "Gerenciamento de Estado Leve com Zustand",
        descricao: `Esqueça a complexidade de stores pesadas.
0:00 Context API vs Zustand
03:10 Criando sua primeira store
07:45 Seletores e prevenção de re-renders desnecessários
13:00 Persistência e middleware`,
        duracaoIso: "PT15M10S",
        duracaoSegundos: 910,
        miniatura: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-12T09:30:00Z",
        canalTitulo: "React Community & Tutorials",
        canalId: "UCreact123456789",
      },
    ],
  },
  {
    id: "UCfireship987654",
    handle: "@fireship",
    titulo: "Fireship",
    descricao: "High-intensity code tutorials to help you build apps faster.",
    miniatura: "https://images.unsplash.com/photo-1534972195531-a756b1140f6c?w=150&h=150&fit=crop",
    uploadsPlaylistId: "UUfireship987654",
    videos: [
      {
        id: "fire-vid-1",
        titulo: "Algoritmos que Todo Desenvolvedor Deve Saber em 10 Minutos",
        descricao: `Resumo dinâmico dos algoritmos mais importantes da computação.
0:00 Introdução ao Big-O
02:15 Busca Binária
04:40 Programação Dinâmica e Mochila (Knapsack)
07:20 Grafos e BFS/DFS
09:10 Dicas de estudo e revisão espaçada`,
        duracaoIso: "PT10M12S",
        duracaoSegundos: 612,
        miniatura: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-20T18:00:00Z",
        canalTitulo: "Fireship",
        canalId: "UCfireship987654",
      },
      {
        id: "fire-vid-2",
        titulo: "TypeScript 5 Recursos que Vão Mudar seu Código",
        descricao: `Recursos modernos de tipagem estrita e decorators.
0:00 Intro rápida
01:30 Const type parameters
03:50 Satisfies operator
06:10 Performance de compilação`,
        duracaoIso: "PT7M45S",
        duracaoSegundos: 465,
        miniatura: "https://images.unsplash.com/photo-1516116211227-bbc03e33f674?w=480&h=270&fit=crop",
        publicadoEm: "2026-10-05T14:00:00Z",
        canalTitulo: "Fireship",
        canalId: "UCfireship987654",
      },
    ],
  },
];


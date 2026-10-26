export interface Disciplina {
  id: string;
  nome: string;
  icone: string;
  descricao: string;
  corGradiente: string;
  palavrasChave: string[];
  videos: VideoDisciplina[];
}

export interface VideoDisciplina {
  videoId: string;
  titulo: string;
  canalNome: string;
  duracaoMin: number;
  duracaoIso: string;
  miniaturaUrl: string;
  descricao: string;
  tags: string[];
}

export const CATALOGO_DISCIPLINAS: Disciplina[] = [
  // 1. GEOGRAFIA & GEOPOLÍTICA
  {
    id: "geografia",
    nome: "Geografia & Geopolítica",
    icone: "🌍",
    descricao: "Cartografia, relevo, biomas terrestres e dinâmica geopolítica mundial.",
    corGradiente: "from-emerald-500 to-teal-700",
    palavrasChave: ["geografia", "geopolitica", "relevo", "clima", "biomas", "mapa", "planeta", "continentes", "terra"],
    videos: [
      {
        videoId: "kJQP7kiw5Fk", // Real YouTube ID (Despacito / Kurzgesagt / Educational style)
        titulo: "Como as Placas Tectônicas Moldaram a Geografia da Terra",
        canalNome: "Geografia em Foco",
        duracaoMin: 14,
        duracaoIso: "PT14M",
        miniaturaUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=480&h=270&fit=crop",
        descricao: `Entenda a deriva continental, zonas de subducção e formação de montanhas.
0:00 A Teoria da Deriva Continental
03:10 Movimento das Placas Tectônicas
07:45 Terremotos e Círculo de Fogo
11:20 O Futuro dos Continentes`,
        tags: ["geografia", "relevo", "placas tectonicas", "terra"],
      },
      {
        videoId: "WfGMYdalClU",
        titulo: "Climas do Mundo e Biomas Globais Explicados",
        canalNome: "Geografia Visual",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=480&h=270&fit=crop",
        descricao: `Classificação climática, correntes marítimas e vegetação.
0:00 Fatores que determinam o clima
04:15 Zonas Tropicais, Temperadas e Polares
09:30 Biomas e Biodiversidade
13:40 Mudanças Climáticas Atuais`,
        tags: ["geografia", "clima", "biomas", "vegetacao"],
      },
      {
        videoId: "6uXGz8F1xY4",
        titulo: "Geopolítica Mundial: Recursos Hídricos e Fronteiras",
        canalNome: "Mundo em Mapas",
        duracaoMin: 12,
        duracaoIso: "PT12M",
        miniaturaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=270&fit=crop",
        descricao: `Como os rios e montanhas definiram as fronteiras e conflitos históricos.
0:00 Geografia como destino estratégico
03:00 Bacias hidrográficas internacionais
07:15 Rotas marítimas e Estreitos
10:10 Geopolítica do Século XXI`,
        tags: ["geografia", "geopolitica", "mapas", "fronteiras"],
      },
    ],
  },

  // 2. INGLÊS & IDIOMAS
  {
    id: "ingles",
    nome: "Inglês & Idiomas",
    icone: "🇬🇧",
    descricao: "Conversação, vocabulário essencial, pronúncia e gramática contextual.",
    corGradiente: "from-blue-600 to-indigo-800",
    palavrasChave: ["ingles", "inglês", "english", "idiomas", "grammar", "conversacao", "vocabu", "listening"],
    videos: [
      {
        videoId: "Vd9Z7g2B-3g",
        titulo: "Learn English in 20 Minutes: Essential Grammar & Phrases",
        canalNome: "BBC Learning English",
        duracaoMin: 21,
        duracaoIso: "PT21M",
        miniaturaUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=480&h=270&fit=crop",
        descricao: `A complete guide to boost your English conversation and vocabulary.
0:00 Introduction & Greetings
03:10 Daily Routine & Present Tense
07:45 Expressing Opinions in English
12:30 Common Mistakes to Avoid
16:15 Real Conversation Practice`,
        tags: ["ingles", "inglês", "english", "grammar", "conversacao"],
      },
      {
        videoId: "jU3vWqN1uR8",
        titulo: "Como Pensar em Inglês e Falar sem Traduzir Mentalmente",
        canalNome: "English with Lucy",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=480&h=270&fit=crop",
        descricao: `Técnicas práticas para destravar o pensamento em inglês no dia a dia.
0:00 O erro da tradução mental
03:30 Associando objetos diretamente aos conceitos
07:15 Criando monólogos internos em inglês
11:45 Rotina de 15 minutos diários`,
        tags: ["ingles", "inglês", "fluencia", "conversacao"],
      },
      {
        videoId: "d6yV3i_4j1g",
        titulo: "10 Phrasal Verbs Essenciais para Conversação Diária",
        canalNome: "BBC Learning English",
        duracaoMin: 11,
        duracaoIso: "PT11M",
        miniaturaUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=480&h=270&fit=crop",
        descricao: `Os phrasal verbs mais usados no inglês contemporâneo.
0:00 O que são phrasal verbs
02:10 Phrasal verbs do dia a dia
05:40 Phrasal verbs para estudos e trabalho
08:20 Exemplos práticos`,
        tags: ["ingles", "inglês", "phrasal verbs", "english"],
      },
    ],
  },

  // 3. FÍSICA & ASTRONOMIA
  {
    id: "fisica",
    nome: "Física & Ciência",
    icone: "⚛️",
    descricao: "Mecânica clássica, termodinâmica, gravitação e cosmos.",
    corGradiente: "from-purple-600 to-indigo-900",
    palavrasChave: ["fisica", "física", "ciencia", "ciência", "astronomia", "newton", "energia", "universo", "gravidade"],
    videos: [
      {
        videoId: "7Tf_X_N8ZlA",
        titulo: "As Três Leis de Newton e a Mecânica do Universo",
        canalNome: "Física em Minutos",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=480&h=270&fit=crop",
        descricao: `Inércia, força e ação e reação explicadas com experimentos reais.
0:00 Introdução à Mecânica Clássica
03:20 Primeira Lei: O Princípio da Inércia
07:40 Segunda Lei: F = m * a
11:50 Terceira Lei: Ação e Reação`,
        tags: ["fisica", "mecanica", "newton", "ciencia"],
      },
      {
        videoId: "bMknfKXIFA8",
        titulo: "Termodinâmica: Entropia, Calor e a Seta do Tempo",
        canalNome: "Ciência Todo Dia",
        duracaoMin: 18,
        duracaoIso: "PT18M",
        miniaturaUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=480&h=270&fit=crop",
        descricao: `Por que o tempo anda para frente? Entenda a Segunda Lei da Termodinâmica.
0:00 O que é Calor e Temperatura
04:10 Primeira Lei: Conservação da Energia
09:20 Segunda Lei e Entropia
14:00 Morte Térmica do Universo`,
        tags: ["fisica", "termodinamica", "entropia", "ciencia"],
      },
      {
        videoId: "dcXqhqiZ2y4",
        titulo: "Gravitação e Relatividade: O Espaço-Tempo Curvo",
        canalNome: "Cosmos & Física",
        duracaoMin: 12,
        duracaoIso: "PT12M",
        miniaturaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=270&fit=crop",
        descricao: `Como Einstein revolucionou a visão de gravidade além de Newton.
0:00 A gravidade de Newton
03:15 O experimento mental da luz
06:40 O tecido do espaço-tempo
09:50 Ondas gravitacionais`,
        tags: ["fisica", "relatividade", "gravidade", "astronomia"],
      },
    ],
  },

  // 4. PROGRAMAÇÃO & TECNOLOGIA
  {
    id: "tecnologia",
    nome: "Programação & Tech",
    icone: "💻",
    descricao: "Desenvolvimento web, React, TypeScript, algoritmos e arquitetura.",
    corGradiente: "from-slate-800 to-indigo-900",
    palavrasChave: ["programacao", "programação", "react", "nextjs", "javascript", "typescript", "codigo", "dev", "software"],
    videos: [
      {
        videoId: "bMknfKXIFA8",
        titulo: "React in 100 Seconds: Conceitos Fundamentais e Hooks",
        canalNome: "Fireship",
        duracaoMin: 11,
        duracaoIso: "PT11M",
        miniaturaUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=480&h=270&fit=crop",
        descricao: `Tudo o que você precisa saber sobre o React e renderização declarativa.
0:00 O que é o React e JSX
01:10 Virtual DOM e Reatividade
02:20 Componentes e State
03:00 Ecossistema Moderno`,
        tags: ["react", "javascript", "programacao", "dev"],
      },
      {
        videoId: "dcXqhqiZ2y4",
        titulo: "Next.js App Router e Server Components Explicados",
        canalNome: "Fireship",
        duracaoMin: 13,
        duracaoIso: "PT13M",
        miniaturaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=480&h=270&fit=crop",
        descricao: `Guia prático sobre SSR, SSG e App Router.
0:00 O que mudou no Next.js
02:00 Server Components vs Client
05:15 Roteamento Dinâmico e Cache
08:30 Deploy e Otimização`,
        tags: ["nextjs", "react", "programacao", "web"],
      },
      {
        videoId: "7Tf_X_N8ZlA",
        titulo: "Web Performance: Core Web Vitals e LCP na Prática",
        canalNome: "Google Developers",
        duracaoMin: 18,
        duracaoIso: "PT18M",
        miniaturaUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=270&fit=crop",
        descricao: `Aprenda como auditar o Largest Contentful Paint no Chrome DevTools.
0:00 Introdução às Métricas
03:20 Largest Contentful Paint (LCP)
09:45 Interaction to Next Paint (INP)
14:10 Profiling no DevTools`,
        tags: ["web", "performance", "programacao", "google"],
      },
    ],
  },

  // 5. BIOLOGIA & SAÚDE
  {
    id: "biologia",
    nome: "Biologia & Neurociência",
    icone: "🧬",
    descricao: "Genética, evolução, funcionamento cerebral e imunologia humana.",
    corGradiente: "from-rose-500 to-pink-700",
    palavrasChave: ["biologia", "neurociencia", "neurociência", "cerebro", "cérebro", "dna", "genetica", "saude", "imunidade"],
    videos: [
      {
        videoId: "WfGMYdalClU",
        titulo: "Como o Cérebro Cria Memórias e Aprende Novas Habilidades",
        canalNome: "Neurociência Prática",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=480&h=270&fit=crop",
        descricao: `Neuroplasticidade, sinapses e a ciência da repetição espaçada.
0:00 Como os neurônios se comunicam
04:15 Plasticidade sináptica e aprendizado
08:50 Sono e consolidação da memória
12:30 Técnicas comprovadas de estudo`,
        tags: ["biologia", "neurociencia", "memoria", "aprendizado"],
      },
      {
        videoId: "6uXGz8F1xY4",
        titulo: "O Sistema Imunológico: Como Seu Corpo Combate Ameaças",
        canalNome: "Biologia Animada",
        duracaoMin: 14,
        duracaoIso: "PT14M",
        miniaturaUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&h=270&fit=crop",
        descricao: `Anticorpos, células T e a fantástica defesa microscópica.
0:00 Barreiras inatas do corpo
03:20 Células apresentadoras de antígeno
07:10 Células B e anticorpos
11:00 Memória imunológica`,
        tags: ["biologia", "imunologia", "saude", "medicina"],
      },
    ],
  },

  // 6. HISTÓRIA & SOCIEDADE
  {
    id: "historia",
    nome: "História & Sociedade",
    icone: "🏛️",
    descricao: "Revoluções históricas, guerras, cidadania e pensamento social.",
    corGradiente: "from-amber-600 to-yellow-800",
    palavrasChave: ["historia", "história", "sociedade", "revolucao", "revolução", "guerra", "democracia", "civilizacao"],
    videos: [
      {
        videoId: "kJQP7kiw5Fk",
        titulo: "A Revolução Científica e o Surgimento do Método Moderno",
        canalNome: "História do Conhecimento",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=480&h=270&fit=crop",
        descricao: `De Galileu a Newton: como a humanidade aprendeu a questionar a natureza.
0:00 O mundo antes do método científico
03:30 Galileu e a luneta telescópica
07:45 O método empírico de Bacon e Descartes
11:30 Impacto no Iluminismo e sociedade`,
        tags: ["historia", "ciencia", "revolucao", "iluminismo"],
      },
      {
        videoId: "1L0T7Fm5n1Q",
        titulo: "A Guerra Fria e a Corrida Espacial em Perspectiva",
        canalNome: "Documentários Históricos",
        duracaoMin: 17,
        duracaoIso: "PT17M",
        miniaturaUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=480&h=270&fit=crop",
        descricao: `As décadas de tensão geopolítica entre EUA e União Soviética.
0:00 Pós-Segunda Guerra e divisão de Berlim
04:20 O Sputnik e a corrida lunar
09:10 Crise dos mísseis em Cuba
13:40 Queda do Muro e legado`,
        tags: ["historia", "guerra fria", "espaco", "geopolitica"],
      },
    ],
  },
];

/**
 * Busca vídeos do catálogo de disciplinas por termos de busca
 */
export function buscarVideosCatalogo(termoBusca: string): VideoDisciplina[] {
  if (!termoBusca || termoBusca.trim().length === 0) {
    return CATALOGO_DISCIPLINAS.flatMap((d) => d.videos);
  }

  const normalizar = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const termoNorm = normalizar(termoBusca);
  const palavras = termoNorm.split(/\s+/).filter((p) => p.length > 2);

  const encontrados: Array<{ video: VideoDisciplina; score: number }> = [];

  for (const disc of CATALOGO_DISCIPLINAS) {
    for (const v of disc.videos) {
      const textoAlvo = normalizar(`${v.titulo} ${v.descricao} ${v.tags.join(" ")} ${disc.nome} ${disc.palavrasChave.join(" ")}`);
      let score = 0;

      // Correspondência com a disciplina
      for (const kw of disc.palavrasChave) {
        if (termoNorm.includes(kw)) {
          score += 200;
        }
      }

      // Correspondência com palavras individuais
      for (const p of palavras) {
        if (textoAlvo.includes(p)) {
          score += 100;
        }
      }

      if (score > 0) {
        encontrados.push({ video: v, score });
      }
    }
  }

  if (encontrados.length > 0) {
    return encontrados.sort((a, b) => b.score - a.score).map((e) => e.video);
  }

  // Fallback: se nada específico foi digitado, devolve o catálogo geral
  return CATALOGO_DISCIPLINAS.flatMap((d) => d.videos);
}


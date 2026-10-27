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
  disciplinaId: string;
}

export const CATALOGO_DISCIPLINAS: Disciplina[] = [
  // 1. GEOGRAFIA & GEOPOLÍTICA
  {
    id: "geografia",
    nome: "Geografia & Geopolítica",
    icone: "🌍",
    descricao: "Cartografia, placas tectônicas, biomas terrestres, clima e dinâmica geopolítica internacional.",
    corGradiente: "from-emerald-600 to-teal-800",
    palavrasChave: [
      "geografia",
      "geopolitica",
      "geopolítica",
      "relevo",
      "clima",
      "biomas",
      "mapa",
      "planeta",
      "continentes",
      "terra",
      "cartografia",
      "tectonica",
      "placas",
      "fronteiras",
    ],
    videos: [
      {
        videoId: "DX19JF7R13g",
        titulo: "Teoria da Deriva Continental e Tectônica de Placas",
        canalNome: "GeoIlustrada",
        duracaoMin: 14,
        duracaoIso: "PT14M",
        miniaturaUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=480&h=270&fit=crop",
        descricao: `Entenda a deriva continental, a formação da Pangeia e as zonas de subducção.
0:00 A Teoria da Deriva Continental
03:10 Movimento das Placas Tectônicas
07:45 Terremotos e Círculo de Fogo
11:20 O Futuro dos Continentes`,
        tags: ["geografia", "relevo", "placas tectonicas", "terra"],
        disciplinaId: "geografia",
      },
      {
        videoId: "wbR-5mHI6bo",
        titulo: "Mudanças Climáticas e Dinâmica dos Biomas Globais",
        canalNome: "Kurzgesagt – In a Nutshell",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=480&h=270&fit=crop",
        descricao: `Classificação climática, aquecimento global e o impacto nos ecossistemas do planeta.
0:00 Fatores que determinam o clima
04:15 Zonas Tropicais, Temperadas e Polares
09:30 Biomas e Biodiversidade
13:40 O Futuro Climático da Terra`,
        tags: ["geografia", "clima", "biomas", "vegetacao"],
        disciplinaId: "geografia",
      },
      {
        videoId: "kIID5FDi2JQ",
        titulo: "Cartografia: Por Que Todos os Mapas Mundi Planos Estão Distorcidos",
        canalNome: "Vox",
        duracaoMin: 12,
        duracaoIso: "PT12M",
        miniaturaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=270&fit=crop",
        descricao: `A Projeção de Mercator vs Gall-Peters e o desafio geométrico de representar uma esfera em 2D.
0:00 O problema da projeção de uma esfera
03:00 A Projeção de Mercator e sua finalidade náutica
06:30 Distorções territoriais da Groenlândia e África
09:40 Projeções modernas e sensoriamento remoto`,
        tags: ["geografia", "cartografia", "mapas", "geopolitica"],
        disciplinaId: "geografia",
      },
      {
        videoId: "e-WO-c9xHms",
        titulo: "Como a Geografia Moldou o Poder e Recursos das Nações",
        canalNome: "Wendover Productions",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=480&h=270&fit=crop",
        descricao: `Como bacias hidrográficas navegáveis, barreiras montanhosas e clima definem o poder geopolítico.
0:00 A geografia como destino econômico
04:00 Portos naturais e redes fluviais
08:30 Recursos minerais e fronteiras defensivas
12:10 Geopolítica dos corredores comerciais`,
        tags: ["geografia", "geopolitica", "recursos", "economia"],
        disciplinaId: "geografia",
      },
      {
        videoId: "m-TFENSuJ5U",
        titulo: "Geopolítica e Fronteiras: A Geografia da Eurásia",
        canalNome: "RealLifeLore",
        duracaoMin: 14,
        duracaoIso: "PT14M",
        miniaturaUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=480&h=270&fit=crop",
        descricao: `Análise demográfica, recursos energéticos e o relevo que conecta a Europa e a Ásia.
0:00 A estepe eurasiática e o clima continental
03:45 Acesso a mares quentes e portos
07:30 Rotas energéticas de gás e petróleo
11:00 A nova Rota da Seda`,
        tags: ["geografia", "geopolitica", "fronteiras", "mapas"],
        disciplinaId: "geografia",
      },
    ],
  },

  // 2. MATEMÁTICA
  {
    id: "matematica",
    nome: "Matemática",
    icone: "📐",
    descricao: "Cálculo, álgebra linear, probabilidade e raciocínio geométrico intuitivo.",
    corGradiente: "from-blue-600 to-cyan-700",
    palavrasChave: [
      "matematica",
      "matemática",
      "algebra",
      "álgebra",
      "geometria",
      "funcoes",
      "funções",
      "calculo",
      "cálculo",
      "derivada",
      "vetores",
      "probabilidade",
      "fourier",
    ],
    videos: [
      {
        videoId: "WUvTyaaNkzM",
        titulo: "A Essência do Cálculo: A Visão Geométrica de Derivadas e Integrais",
        canalNome: "3Blue1Brown",
        duracaoMin: 18,
        duracaoIso: "PT18M",
        miniaturaUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=480&h=270&fit=crop",
        descricao: `Uma introdução visual e intuitiva aos fundamentos do cálculo diferencial e integral.
0:00 O problema da área sob a curva
04:15 Taxa de variação instantânea e derivadas
09:30 O Teorema Fundamental do Cálculo
14:10 Por que o cálculo é a linguagem da física`,
        tags: ["matematica", "calculo", "derivadas", "geometria"],
        disciplinaId: "matematica",
      },
      {
        videoId: "9vKqVkMQHKk",
        titulo: "O Paradoxo da Derivada e a Reta Tangente",
        canalNome: "3Blue1Brown",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=480&h=270&fit=crop",
        descricao: `Como calcular a velocidade em um instante de tempo exato sem dividir por zero.
0:00 Velocidade instantânea vs média
04:30 O conceito de limite infinitesimal
10:15 A inclinação da reta tangente
14:00 Aplicações no mundo real`,
        tags: ["matematica", "calculo", "limites", "derivadas"],
        disciplinaId: "matematica",
      },
      {
        videoId: "fNk_zzaMoSs",
        titulo: "Vetores e Espaço Vetorial: O Que Realmente É um Vetor?",
        canalNome: "3Blue1Brown",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=480&h=270&fit=crop",
        descricao: `Perspectiva física, computacional e matemática de vetores e coordenadas.
0:00 A tríplice perspectiva dos vetores
03:50 Coordenadas cartesianas no plano
08:10 Adição e multiplicação por escalar
12:00 Vetores como setas no espaço`,
        tags: ["matematica", "algebra linear", "vetores", "geometria"],
        disciplinaId: "matematica",
      },
      {
        videoId: "kYB8IZa5AuE",
        titulo: "Transformações Lineares e Matrizes Explicadas Visualmente",
        canalNome: "3Blue1Brown",
        duracaoMin: 17,
        duracaoIso: "PT17M",
        miniaturaUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=480&h=270&fit=crop",
        descricao: `Como matrizes transformam o espaço vetorial através de rotações e escalas.
0:00 O que é uma transformação linear
04:40 De onde vêm as colunas de uma matriz
09:20 Determinantes e distorção de área
14:15 Composição de matrizes`,
        tags: ["matematica", "matrizes", "algebra linear", "transformacoes"],
        disciplinaId: "matematica",
      },
      {
        videoId: "HZGCoVF3YvM",
        titulo: "Teorema de Bayes: A Geometria de Mudar Nossas Crenças",
        canalNome: "3Blue1Brown",
        duracaoMin: 19,
        duracaoIso: "PT19M",
        miniaturaUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=480&h=270&fit=crop",
        descricao: `Probabilidade condicional, testes médicos e atualização de probabilidades com evidências.
0:00 O paradoxo do falso positivo
05:10 Visualizando probabilidade com áreas retangulares
11:30 A fórmula de Bayes explicada
16:00 Aplicações em Inteligência Artificial`,
        tags: ["matematica", "probabilidade", "estatistica", "bayes"],
        disciplinaId: "matematica",
      },
      {
        videoId: "HEfHFsfGXjs",
        titulo: "A Resposta Mais Inesperada Para um Enigma de Contagem (Pi)",
        canalNome: "3Blue1Brown",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=480&h=270&fit=crop",
        descricao: `Como blocos colidindo calculam os dígitos do Pi através de conservação de energia e momento.
0:00 O problema dos blocos e a massa exponencial
04:20 Contando colisões elásticas
08:50 A conexão geométrica com círculos
12:30 Por que o número Pi aparece aqui`,
        tags: ["matematica", "pi", "geometria", "curiosidades"],
        disciplinaId: "matematica",
      },
      {
        videoId: "d4EgbgTm0Bg",
        titulo: "Visualizando Números em 4 Dimensões: Quatérnios",
        canalNome: "3Blue1Brown",
        duracaoMin: 18,
        duracaoIso: "PT18M",
        miniaturaUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=480&h=270&fit=crop",
        descricao: `A extensão dos números complexos para 4D e rotações 3D sem gimbal lock.
0:00 Números complexos como rotações no plano
05:15 O nascimento dos Quatérnios por Hamilton
11:00 Rotações tridimensionais suaves
15:30 Aplicações em computação gráfica e robótica`,
        tags: ["matematica", "algebra", "quaternios", "geometria"],
        disciplinaId: "matematica",
      },
      {
        videoId: "spUNpyF58BY",
        titulo: "A Transformada de Fourier: Uma Introdução Visual",
        canalNome: "3Blue1Brown",
        duracaoMin: 21,
        duracaoIso: "PT21M",
        miniaturaUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=480&h=270&fit=crop",
        descricao: `Como decompor qualquer sinal ou onda complexa em frequências puras e simples.
0:00 O que é a Transformada de Fourier
05:20 Enrolando o sinal em torno de um círculo
12:10 O centro de massa e picos de frequência
17:40 Aplicações em áudio, imagem e telecomunicações`,
        tags: ["matematica", "fourier", "ondas", "sinais"],
        disciplinaId: "matematica",
      },
    ],
  },

  // 3. PORTUGUÊS & REDAÇÃO
  {
    id: "portugues",
    nome: "Português & Redação",
    icone: "🇧🇷",
    descricao: "Sintaxe, crase, pontuação, concordância e técnicas estruturais de redação nota 1000.",
    corGradiente: "from-amber-600 to-yellow-800",
    palavrasChave: [
      "portugues",
      "português",
      "redacao",
      "redação",
      "crase",
      "sintaxe",
      "pontuacao",
      "pontuação",
      "gramatica",
      "gramática",
      "concordancia",
      "concordância",
    ],
    videos: [
      {
        videoId: "yUpRa62vcSI",
        titulo: "Crase Sem Segredo: O Concerto da Crase e Regras Definitivas",
        canalNome: "Professor Noslen",
        duracaoMin: 14,
        duracaoIso: "PT14M",
        miniaturaUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=480&h=270&fit=crop",
        descricao: `Quando usar crase, casos proibidos e o macete da troca pela palavra masculina.
0:00 A fusão da preposição 'a' com o artigo 'a'
03:00 A regra da troca por palavra masculina
06:40 Casos proibidos (antes de verbo e masculinos)
10:30 Casos facultativos memoráveis`,
        tags: ["portugues", "crase", "gramatica", "redacao"],
        disciplinaId: "portugues",
      },
      {
        videoId: "-uUtlvKifiY",
        titulo: "O Uso da Vírgula e Pontuação Correta na Redação",
        canalNome: "Professor Noslen",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=480&h=270&fit=crop",
        descricao: `Por que a vírgula não é pausa para respiração: regras sintáticas essenciais.
0:00 O mito da respiração
04:10 Nunca separe sujeito de predicado
08:20 Adjuntos adverbiais deslocados
12:30 Orações coordenadas e subordinadas`,
        tags: ["portugues", "virgula", "pontuacao", "sintaxe"],
        disciplinaId: "portugues",
      },
      {
        videoId: "rEi8LPMDL4Q",
        titulo: "Concordância Verbal Descomplicada",
        canalNome: "Professor Noslen",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=480&h=270&fit=crop",
        descricao: `Verbo haver com sentido de existir, sujeito composto e casos especiais de concordância.
0:00 Princípio geral da concordância
03:30 Verbos impessoais (haver e fazer)
07:45 Voz passiva sintética e partícula 'se'
12:00 Sujeito partitivo e coletivo`,
        tags: ["portugues", "concordancia", "gramatica", "sintaxe"],
        disciplinaId: "portugues",
      },
      {
        videoId: "m-LyXHcALuA",
        titulo: "Passo a Passo da Redação Nota 1000 no ENEM",
        canalNome: "Profinho",
        duracaoMin: 22,
        duracaoIso: "PT22M",
        miniaturaUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=480&h=270&fit=crop",
        descricao: `Estrutura de 4 parágrafos: introdução com tese, repertório sociocultural e intervenção com os 5 elementos.
0:00 O esqueleto nota 1000 da dissertação
05:10 Introdução em 3 partes e tese clara
11:00 Desenvolvimentos D1 e D2 com repertório
17:30 Proposta de Intervenção com os 5 elementos`,
        tags: ["portugues", "redacao", "enem", "dissertacao"],
        disciplinaId: "portugues",
      },
      {
        videoId: "06GYx8qoYqQ",
        titulo: "Crase Facultativa e Casos Especiais",
        canalNome: "Professor Noslen",
        duracaoMin: 12,
        duracaoIso: "PT12M",
        miniaturaUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=480&h=270&fit=crop",
        descricao: `Casos facultativos da crase (nomes femininos, até a, pronomes possessivos) e pegadinhas de prova.
0:00 O que torna a crase facultativa
03:15 Nomes próprios femininos
06:40 Pronomes possessivos femininos
09:50 A preposição 'até'`,
        tags: ["portugues", "crase", "gramatica", "provas"],
        disciplinaId: "portugues",
      },
      {
        videoId: "YY8CqGBc9B8",
        titulo: "Resolução Comentada de Exercícios de Gramática e Crase",
        canalNome: "Professor Noslen",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=480&h=270&fit=crop",
        descricao: `Prática direta com questões reais comentadas passo a passo para fixação absoluta.
0:00 Introdução às questões
03:30 Resolução de crase em frases complexas
08:15 Identificação de armadilhas sintáticas
12:00 Dicas finais de prova`,
        tags: ["portugues", "exercicios", "gramatica", "enem"],
        disciplinaId: "portugues",
      },
    ],
  },

  // 4. FÍSICA
  {
    id: "fisica",
    nome: "Física",
    icone: "⚛️",
    descricao: "Mecânica clássica, gravitação, termodinâmica, eletricidade e física moderna.",
    corGradiente: "from-purple-600 to-indigo-900",
    palavrasChave: [
      "fisica",
      "física",
      "mecanica",
      "mecânica",
      "newton",
      "energia",
      "termodinamica",
      "ondas",
      "gravidade",
      "eletricidade",
      "quantica",
    ],
    videos: [
      {
        videoId: "XRr1kaXKBsU",
        titulo: "Por Que a Gravidade NÃO É Uma Força (Relatividade Geral)",
        canalNome: "Veritasium",
        duracaoMin: 17,
        duracaoIso: "PT17M",
        miniaturaUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=480&h=270&fit=crop",
        descricao: `Como Einstein reformulou a gravidade de Newton: curvatura do espaço-tempo e geodésicas.
0:00 O equívoco de Newton sobre atração
04:20 O princípio da equivalência no elevador
09:10 Geodésicas e espaço-tempo curvo
14:00 Por que você está acelerando para cima agora`,
        tags: ["fisica", "gravidade", "relatividade", "einstein"],
        disciplinaId: "fisica",
      },
      {
        videoId: "DxL2HoqLbyA",
        titulo: "O Conceito Mais Mal Compreendido da Física: Entropia",
        canalNome: "Veritasium",
        duracaoMin: 18,
        duracaoIso: "PT18M",
        miniaturaUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=480&h=270&fit=crop",
        descricao: `Por que o tempo segue uma direção? A Segunda Lei da Termodinâmica e microestados estatísticos.
0:00 A seta do tempo e calor
04:10 Entropia não é simplesmente 'desordem'
09:20 Microestados e probabilidades de Boltzmann
14:30 A morte térmica do Universo`,
        tags: ["fisica", "termodinamica", "entropia", "energia"],
        disciplinaId: "fisica",
      },
      {
        videoId: "bHIhgxav9LY",
        titulo: "O Maior Equívoco Sobre Eletricidade e Circuitos",
        canalNome: "Veritasium",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=480&h=270&fit=crop",
        descricao: `A energia elétrica não viaja dentro dos fios, mas sim nos campos eletromagnéticos externos!
0:00 A velocidade dos elétrons vs da luz
04:30 O experimento mental do circuito de 1 segundo-luz
09:15 O Vetor de Poynting e fluxo de energia
13:30 Como a física dos circuitos realmente opera`,
        tags: ["fisica", "eletricidade", "circuitos", "eletromagnetismo"],
        disciplinaId: "fisica",
      },
      {
        videoId: "GeyDf4ooPdo",
        titulo: "Roda Antigravidade? Momento Angular e Giroscópios",
        canalNome: "Veritasium",
        duracaoMin: 12,
        duracaoIso: "PT12M",
        miniaturaUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=480&h=270&fit=crop",
        descricao: `Por que uma roda pesada girando parece não pesar nada ao ser erguida por um braço?
0:00 A demonstração surpreendente da roda
03:10 Momento angular e precessão giroscópica
07:20 Conservação do momento e torque
10:30 Aplicações em satélites e naves espaciais`,
        tags: ["fisica", "mecanica", "giroscopio", "momento angular"],
        disciplinaId: "fisica",
      },
      {
        videoId: "2OSrvzNW9FE",
        titulo: "O Efeito Magnus e a Dinâmica dos Fluidos na Prática",
        canalNome: "Veritasium",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=480&h=270&fit=crop",
        descricao: `Lançando uma bola com rotação do topo de uma represa de 140 metros: física de fluidos em ação.
0:00 O lançamento da bola da represa
03:30 Como o spin cria diferença de pressão
07:15 A Lei de Bernoulli e a força de sustentação
11:20 Aplicações em aviação, futebol e navios eólicos`,
        tags: ["fisica", "fluidos", "magnus", "bernoulli"],
        disciplinaId: "fisica",
      },
      {
        videoId: "Iuv6hY6zsd0",
        titulo: "O Experimento Original da Dupla Fenda e a Física Quântica",
        canalNome: "Veritasium",
        duracaoMin: 18,
        duracaoIso: "PT18M",
        miniaturaUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=480&h=270&fit=crop",
        descricao: `A experiência que provou a dualidade onda-partícula da luz e a natureza quântica da matéria.
0:00 O experimento histórico de Thomas Young
04:40 Padrões de interferência de ondas
10:15 Disparando fótons individuais
14:50 O colapso da função de onda e medição`,
        tags: ["fisica", "quantica", "ondas", "luz"],
        disciplinaId: "fisica",
      },
    ],
  },

  // 5. QUÍMICA
  {
    id: "quimica",
    nome: "Química",
    icone: "🧪",
    descricao: "Tabela periódica, ligações químicas, estequiometria, soluções e cinética molecular.",
    corGradiente: "from-teal-600 to-emerald-900",
    palavrasChave: [
      "quimica",
      "química",
      "tabela periodica",
      "tabela periódica",
      "atomos",
      "átomos",
      "estequiometria",
      "ligacoes",
      "ligações",
      "solucoes",
      "soluções",
      "reacoes",
      "reações",
      "acidos",
    ],
    videos: [
      {
        videoId: "0RRVV4Diomg",
        titulo: "A Tabela Periódica: Como a Natureza Organiza a Matéria",
        canalNome: "CrashCourse",
        duracaoMin: 12,
        duracaoIso: "PT12M",
        miniaturaUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&h=270&fit=crop",
        descricao: `A genialidade de Mendeleev, famílias periódicas, eletronegatividade e raio atômico.
0:00 A história da tabela de Mendeleev
03:10 Metais, ametais e nobres
06:45 Propriedades periódicas em ação
10:00 Previsão de novos elementos químicos`,
        tags: ["quimica", "tabela periodica", "atomos", "elementos"],
        disciplinaId: "quimica",
      },
      {
        videoId: "QXT4OVM4vXI",
        titulo: "Tipos de Ligações Químicas: Iônica, Covalente e Metálica",
        canalNome: "CrashCourse",
        duracaoMin: 11,
        duracaoIso: "PT11M",
        miniaturaUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&h=270&fit=crop",
        descricao: `Como os elétrons de valência unem os átomos: transferência vs compartilhamento.
0:00 Por que átomos formam ligações
03:20 Ligação iônica e transferência de carga
06:15 Ligação covalente e moléculas estáveis
09:00 Ligação metálica e o mar de elétrons`,
        tags: ["quimica", "ligacoes", "ionica", "covalente"],
        disciplinaId: "quimica",
      },
      {
        videoId: "UL1jmJaUkaQ",
        titulo: "Estequiometria: O Cálculo Químico na Prática",
        canalNome: "CrashCourse",
        duracaoMin: 13,
        duracaoIso: "PT13M",
        miniaturaUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&h=270&fit=crop",
        descricao: `Balanceamento, constante de Avogadro, massa molar e proporções sem complicação.
0:00 O que é estequiometria e a Lei de Lavoisier
04:00 A ponte do Mol e Número de Avogadro
08:20 Relações de massa em reações químicas
11:15 Rendimento e reagente limitante`,
        tags: ["quimica", "estequiometria", "mol", "reacoes"],
        disciplinaId: "quimica",
      },
      {
        videoId: "FSyAehMdpyI",
        titulo: "O Núcleo Atômico, Prótons, Nêutrons e Isótopos",
        canalNome: "CrashCourse",
        duracaoMin: 12,
        duracaoIso: "PT12M",
        miniaturaUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&h=270&fit=crop",
        descricao: `Estrutura atômica detalhada, forças nucleares fortes e número atômico.
0:00 O modelo atômico moderno
03:30 Massa atômica e isótopos
07:15 A força nuclear forte que segura o núcleo
10:00 Radioatividade e decaimento`,
        tags: ["quimica", "atomos", "nucleo", "isotopos"],
        disciplinaId: "quimica",
      },
      {
        videoId: "ANi709MYnWg",
        titulo: "Reações Ácido-Base em Solução e Escala de pH",
        canalNome: "CrashCourse",
        duracaoMin: 14,
        duracaoIso: "PT14M",
        miniaturaUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&h=270&fit=crop",
        descricao: `Definição de Arrhenius e Brønsted-Lowry, cálculo de pH, neutralização e tampões.
0:00 O que define um ácido e uma base
03:50 Doação e aceitação de prótons H+
07:30 A escala logarítmica de pH
11:10 Neutralização e formação de sais`,
        tags: ["quimica", "acidos", "bases", "ph", "solucoes"],
        disciplinaId: "quimica",
      },
    ],
  },

  // 6. BIOLOGIA & SAÚDE
  {
    id: "biologia",
    nome: "Biologia & Saúde",
    icone: "🧬",
    descricao: "Genética, evolução, citologia celular, engenharia genética CRISPR e ecologia.",
    corGradiente: "from-rose-500 to-pink-700",
    palavrasChave: [
      "biologia",
      "genetica",
      "genética",
      "dna",
      "celulas",
      "células",
      "ecologia",
      "evolucao",
      "evolução",
      "corpo",
      "crispr",
      "respiracao",
    ],
    videos: [
      {
        videoId: "jAhjPd4uNFY",
        titulo: "Engenharia Genética e CRISPR: O Futuro do DNA e da Medicina",
        canalNome: "Kurzgesagt – In a Nutshell",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=480&h=270&fit=crop",
        descricao: `Como a tecnologia CRISPR-Cas9 permite editar o código genético com precisão cirúrgica.
0:00 O que é o DNA e o código da vida
04:10 Como bactérias inventaram o sistema CRISPR
08:30 Aplicações no combate a doenças genéticas
13:00 Dilemas éticos da edição genética`,
        tags: ["biologia", "genetica", "dna", "crispr"],
        disciplinaId: "biologia",
      },
      {
        videoId: "1AElONvi9WQ",
        titulo: "Por Que Baleias Azuis Não Têm Câncer: O Paradoxo de Peto",
        canalNome: "Kurzgesagt – In a Nutshell",
        duracaoMin: 12,
        duracaoIso: "PT12M",
        miniaturaUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=480&h=270&fit=crop",
        descricao: `Divisão celular, mutações genéticas e mecanismos biológicos de proteção do organismo.
0:00 A matemática da probabilidade de mutação celular
03:30 O Paradoxo de Peto em grandes animais
07:15 Genes supressores de tumor (p53)
10:00 O que a medicina humana pode aprender`,
        tags: ["biologia", "celulas", "fisiologia", "genetica"],
        disciplinaId: "biologia",
      },
      {
        videoId: "8kK2zwjRV0M",
        titulo: "Estrutura do DNA e Replicação Celular",
        canalNome: "CrashCourse",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=480&h=270&fit=crop",
        descricao: `A dupla hélice de Watson e Crick, bases nitrogenadas e o maquinário enzimático de duplicação.
0:00 As quatro bases do DNA (A, T, C, G)
04:00 Replicação semiconservativa
08:15 DNA polimerase e enzimas de cópia
12:30 Síntese de proteínas e ribossomos`,
        tags: ["biologia", "dna", "celulas", "genetica"],
        disciplinaId: "biologia",
      },
      {
        videoId: "aTftyFboC_M",
        titulo: "Seleção Natural e Evolução Biológica",
        canalNome: "CrashCourse",
        duracaoMin: 14,
        duracaoIso: "PT14M",
        miniaturaUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=480&h=270&fit=crop",
        descricao: `A teoria da evolução de Charles Darwin, pressão seletiva e adaptação das espécies ao ambiente.
0:00 A viagem do Beagle e observações de Darwin
03:50 Variação genética dentro das populações
07:45 Pressão seletiva e reprodução diferencial
11:20 Evidências fósseis e moleculares`,
        tags: ["biologia", "evolucao", "darwin", "selecao natural"],
        disciplinaId: "biologia",
      },
      {
        videoId: "00jbG_cfGuQ",
        titulo: "ATP, Respiração Celular e Bioenergética",
        canalNome: "CrashCourse",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=480&h=270&fit=crop",
        descricao: `Como as mitocôndrias convertem glicose em moeda de energia celular (ATP).
0:00 O que é a molécula de ATP
03:40 Glicólise no citoplasma
07:30 O Ciclo de Krebs
11:15 Cadeia transportadora de elétrons e fosforilação oxidativa`,
        tags: ["biologia", "celulas", "respiracao", "atp", "mitocondria"],
        disciplinaId: "biologia",
      },
      {
        videoId: "LxgMdjyw8uw",
        titulo: "Tecnologias Verdes e Conservação da Biodiversidade",
        canalNome: "Kurzgesagt – In a Nutshell",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=480&h=270&fit=crop",
        descricao: `Soluções biológicas, transição energética e recuperação de florestas e oceanos.
0:00 O estado atual da biodiversidade
04:10 Reflorestamento e corredores ecológicos
08:30 Energia limpa e biotecnologia
12:50 O papel da cooperação global`,
        tags: ["biologia", "ecologia", "biodiversidade", "sustentabilidade"],
        disciplinaId: "biologia",
      },
    ],
  },

  // 7. HISTÓRIA
  {
    id: "historia",
    nome: "História",
    icone: "🏛️",
    descricao: "Revoluções modernas, guerras mundiais, Iluminismo, Revolução Industrial e História do Brasil.",
    corGradiente: "from-orange-600 to-amber-800",
    palavrasChave: [
      "historia",
      "história",
      "brasil",
      "revolucao",
      "revolução",
      "guerra",
      "imperio",
      "império",
      "democracia",
      "iluminismo",
      "industrial",
    ],
    videos: [
      {
        videoId: "lTTvKwCylFY",
        titulo: "A Revolução Francesa: O Colapso do Antigo Regime",
        canalNome: "CrashCourse",
        duracaoMin: 12,
        duracaoIso: "PT12M",
        miniaturaUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=480&h=270&fit=crop",
        descricao: `A Queda da Bastilha, a Declaração dos Direitos do Homem e as raízes da modernidade democrática.
0:00 Os Três Estados e a crise francesa
03:15 A Tomada da Bastilha em 1789
07:00 A fase radical do Terror e Robespierre
10:30 O legado para os direitos humanos`,
        tags: ["historia", "revolucao francesa", "europa", "iluminismo"],
        disciplinaId: "historia",
      },
      {
        videoId: "vzo8vnxSARg",
        titulo: "A Revolução Científica: Galileu, Newton e o Método Empírico",
        canalNome: "CrashCourse",
        duracaoMin: 13,
        duracaoIso: "PT13M",
        miniaturaUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=480&h=270&fit=crop",
        descricao: `Como a humanidade deixou o dogma para trás e adotou o método empírico de observação.
0:00 O cosmos geocêntrico e Aristóteles
03:40 Copérnico e as órbitas heliocêntricas
07:20 O telescópio de Galileu e o julgamento
11:00 Newton e as leis universais da física`,
        tags: ["historia", "ciencia", "revolucao", "iluminismo"],
        disciplinaId: "historia",
      },
      {
        videoId: "dHSQAEam2yc",
        titulo: "Primeira Guerra Mundial Explicada: As Alianças e a Tragédia",
        canalNome: "OverSimplified",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=480&h=270&fit=crop",
        descricao: `O assassinato de Francisco Ferdinando, o jogo de alianças e a guerra de trincheiras.
0:00 O barril de pólvora dos Balcãs
04:20 O atentado em Sarajevo
08:15 O plano Schlieffen e a frente ocidental
13:00 Guerra de trincheiras e novas tecnologias bélicas`,
        tags: ["historia", "primeira guerra", "europa", "seculo xx"],
        disciplinaId: "historia",
      },
      {
        videoId: "y9HjvHZfCUI",
        titulo: "A Guerra Fria: EUA vs União Soviética e a Corrida Espacial",
        canalNome: "CrashCourse",
        duracaoMin: 13,
        duracaoIso: "PT13M",
        miniaturaUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=480&h=270&fit=crop",
        descricao: `O confronto ideológico bipolar, a crise dos mísseis em Cuba e o pouso na Lua.
0:00 A divisão pós-Segunda Guerra Mundial
03:50 Doutrina Truman e o Plano Marshall
07:30 A Crise dos Mísseis e corrida armamentista
11:00 Queda do Muro de Berlim em 1989`,
        tags: ["historia", "guerra fria", "espaco", "geopolitica"],
        disciplinaId: "historia",
      },
      {
        videoId: "BzADvI7MAKg",
        titulo: "Independência do Brasil e o Primeiro Reinado",
        canalNome: "Nerdologia",
        duracaoMin: 11,
        duracaoIso: "PT11M",
        miniaturaUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=480&h=270&fit=crop",
        descricao: `A vinda da família real em 1808, o Dia do Fico e o 7 de Setembro de 1822.
0:00 O Bloqueio Continental e a fuga de D. João VI
03:10 Abertura dos Portos e elevação a Reino Unido
06:40 D. Pedro I e o processo de separação de Portugal
09:20 A primeira Constituição do Brasil de 1824`,
        tags: ["historia", "brasil", "independencia", "imperio"],
        disciplinaId: "historia",
      },
      {
        videoId: "zhL5DCizj5c",
        titulo: "A Revolução Industrial: Carvão, Vapor e Transformação Social",
        canalNome: "CrashCourse",
        duracaoMin: 13,
        duracaoIso: "PT13M",
        miniaturaUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=480&h=270&fit=crop",
        descricao: `A transição da manufatura artesanal para as máquinas térmicas, urbanização e novos regimes de trabalho.
0:00 Por que a revolução começou na Grã-Bretanha
04:00 O motor a vapor de James Watt
08:15 Crescimento das cidades industriais
11:40 Consequências sociais e leis trabalhistas`,
        tags: ["historia", "revolucao industrial", "trabalho", "europa"],
        disciplinaId: "historia",
      },
    ],
  },

  // 8. INGLÊS & IDIOMAS
  {
    id: "ingles",
    nome: "Inglês",
    icone: "🇬🇧",
    descricao: "Conversação prática, tempos verbais, phrasal verbs, pronúncia e pensar em inglês.",
    corGradiente: "from-blue-600 to-indigo-800",
    palavrasChave: [
      "ingles",
      "inglês",
      "english",
      "idiomas",
      "grammar",
      "conversacao",
      "conversação",
      "phrasal",
      "listening",
      "pronuncia",
      "verbos",
    ],
    videos: [
      {
        videoId: "Q7HBdzgvmIs",
        titulo: "BBC English Class: Como Aprender e Usar Phrasal Verbs",
        canalNome: "BBC Learning English",
        duracaoMin: 10,
        duracaoIso: "PT10M",
        miniaturaUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=480&h=270&fit=crop",
        descricao: `Dicas rápidas e práticas de especialistas da BBC para dominar os verbos frasais mais comuns.
0:00 O que torna um phrasal verb especial
02:30 Verbos com 'get', 'take' e 'put'
05:40 Como deduzir pelo contexto
08:15 Exercícios práticos e fixação`,
        tags: ["ingles", "inglês", "phrasal verbs", "english", "grammar"],
        disciplinaId: "ingles",
      },
      {
        videoId: "FBmjH6nh5-k",
        titulo: "6 Minute Grammar: Phrasal Verbs Tipos 1, 2, 3 e 4",
        canalNome: "BBC Learning English",
        duracaoMin: 6,
        duracaoIso: "PT6M",
        miniaturaUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=480&h=270&fit=crop",
        descricao: `Aprenda a diferença entre phrasal verbs separáveis e inseparáveis na fala cotidiana.
0:00 Tipos de phrasal verbs
01:45 Verbos transitivos vs intransitivos
03:30 Onde colocar o pronome (turn it on)
05:00 Quiz rápido da BBC`,
        tags: ["ingles", "inglês", "grammar", "phrasal verbs"],
        disciplinaId: "ingles",
      },
      {
        videoId: "OkbAsTGz6lo",
        titulo: "Como Pensar em Inglês e Parar de Traduzir Mentalmente",
        canalNome: "English with Lucy",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=480&h=270&fit=crop",
        descricao: `5 técnicas comprovadas para destravar a fluência e criar monólogos internos em inglês.
0:00 O vício de traduzir palavra por palavra
03:30 Narrando seu dia a dia em inglês
07:15 Aprendendo expressões em blocos (chunks)
11:45 Rotina de 15 minutos diários de imersão`,
        tags: ["ingles", "inglês", "fluencia", "conversacao"],
        disciplinaId: "ingles",
      },
      {
        videoId: "jwmKjgwlMk8",
        titulo: "Present Perfect vs Past Simple: Quando Usar Cada Tempo",
        canalNome: "BBC Learning English",
        duracaoMin: 8,
        duracaoIso: "PT8M",
        miniaturaUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=480&h=270&fit=crop",
        descricao: `Aprenda de forma clara a distinguir ações finalizadas no passado daquelas com conexão no presente.
0:00 A regra de ouro do tempo especificado vs não especificado
02:30 'I have been' vs 'I went'
05:00 Palavras-chave: ever, never, yesterday, in 2020
07:15 Teste prático de fixação`,
        tags: ["ingles", "grammar", "present perfect", "tempos verbais"],
        disciplinaId: "ingles",
      },
      {
        videoId: "XgLdOI6UsJY",
        titulo: "The Grammar Gameshow: Desafios Práticos de Tempos Verbais",
        canalNome: "BBC Learning English",
        duracaoMin: 12,
        duracaoIso: "PT12M",
        miniaturaUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=480&h=270&fit=crop",
        descricao: `O show interativo da BBC com perguntas sobre estruturas gramaticais desafiadoras.
0:00 Apresentação dos competidores
03:00 Rodada de preposições e tempos
06:30 Armadilhas gramaticais comuns
10:00 Rodada relâmpago de pronúncia`,
        tags: ["ingles", "gameshow", "grammar", "listening"],
        disciplinaId: "ingles",
      },
      {
        videoId: "dn_F66mUkag",
        titulo: "50 Palavras Mais Usadas no Inglês com Pronúncia e Exemplos",
        canalNome: "Eat Sleep Dream English",
        duracaoMin: 18,
        duracaoIso: "PT18M",
        miniaturaUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=480&h=270&fit=crop",
        descricao: `Guia de pronúncia britânica e natural com as 50 palavras mais recorrentes do idioma falado.
0:00 Introdução ao vocabulário de alta frequência
04:00 Artigos, pronomes e conectores
09:20 Verbos auxiliares e modais
14:30 Exercício prático de escuta e repetição`,
        tags: ["ingles", "vocabulario", "pronuncia", "fluencia"],
        disciplinaId: "ingles",
      },
    ],
  },

  // 9. FILOSOFIA & SOCIOLOGIA
  {
    id: "filosofia",
    nome: "Filosofia & Sociologia",
    icone: "💭",
    descricao: "Mito da caverna, ética de Aristóteles, utilitarismo, ceticismo cartesiano e sociologia clássica.",
    corGradiente: "from-violet-600 to-purple-800",
    palavrasChave: [
      "filosofia",
      "sociologia",
      "etica",
      "ética",
      "pensamento",
      "politica",
      "política",
      "platao",
      "platão",
      "aristoteles",
      "aristóteles",
      "sociedade",
      "kant",
      "descartes",
    ],
    videos: [
      {
        videoId: "IV-8YsyghbU",
        titulo: "O Mito da Caverna de Platão e a Ilusão da Realidade",
        canalNome: "CrashCourse",
        duracaoMin: 10,
        duracaoIso: "PT10M",
        miniaturaUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=480&h=270&fit=crop",
        descricao: `A alegoria de Platão sobre ignorância, o mundo das sombras e o mundo das ideias.
0:00 Os prisioneiros acorrentados na caverna
03:00 As sombras projetadas pelo fogo
06:15 A fuga para o mundo exterior e a luz do Sol
08:30 Conexão com o conhecimento e a verdade`,
        tags: ["filosofia", "platao", "caverna", "conhecimento"],
        disciplinaId: "filosofia",
      },
      {
        videoId: "PrvtOWEXDIQ",
        titulo: "Ética a Nicômaco de Aristóteles: A Virtude e a Felicidade",
        canalNome: "CrashCourse",
        duracaoMin: 10,
        duracaoIso: "PT10M",
        miniaturaUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=480&h=270&fit=crop",
        descricao: `Eudaimonia (felicidade plena) e a virtude como equilíbrio perfeito entre dois extremos.
0:00 O que é a virtude moral
03:10 A doutrina do justo meio de Aristóteles
06:20 A coragem entre a covardia e a imprudência
08:45 A formação de hábitos virtuosos`,
        tags: ["filosofia", "aristoteles", "etica", "moral"],
        disciplinaId: "filosofia",
      },
      {
        videoId: "DbTt_ySTjaY",
        titulo: "Os Três Grandes Paradigmas Sociológicos: Marx, Weber e Durkheim",
        canalNome: "CrashCourse",
        duracaoMin: 10,
        duracaoIso: "PT10M",
        miniaturaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=270&fit=crop",
        descricao: `Funcionalismo de Durkheim, conflito de classes de Marx e ação social de Weber.
0:00 Por que estudar a sociedade de forma científica
03:00 Émile Durkheim e os fatos sociais
05:40 Karl Marx e o conflito entre classes
08:10 Max Weber e o significado da ação humana`,
        tags: ["sociologia", "weber", "marx", "durkheim"],
        disciplinaId: "filosofia",
      },
      {
        videoId: "-a739VjqdSI",
        titulo: "Utilitarismo: Jeremy Bentham e John Stuart Mill",
        canalNome: "CrashCourse",
        duracaoMin: 11,
        duracaoIso: "PT11M",
        miniaturaUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=480&h=270&fit=crop",
        descricao: `O princípio da maior felicidade para o maior número de pessoas e dilemas morais consequencialistas.
0:00 O que é ética consequencialista
03:15 O cálculo felicífico de Bentham
06:40 Prazeres superiores vs inferiores de Mill
09:20 O dilema do bonde (Trolley Problem)`,
        tags: ["filosofia", "utilitarismo", "etica", "moral"],
        disciplinaId: "filosofia",
      },
      {
        videoId: "8bIys6JoEDw",
        titulo: "Immanuel Kant e o Imperativo Categórico na Ética",
        canalNome: "CrashCourse",
        duracaoMin: 11,
        duracaoIso: "PT11M",
        miniaturaUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=480&h=270&fit=crop",
        descricao: `A ética deontológica do dever moral absoluto: agir apenas segundo máximas universalizáveis.
0:00 Deontologia e o dever pelo dever
03:30 A primeira formulação da lei universal
06:15 A segunda formulação da humanidade como fim em si mesma
09:00 Por que mentir viola a dignidade humana`,
        tags: ["filosofia", "kant", "etica", "dever"],
        disciplinaId: "filosofia",
      },
      {
        videoId: "MLKrmw906TM",
        titulo: "Ceticismo Cartesiano e René Descartes: Penso, Logo Existo",
        canalNome: "CrashCourse",
        duracaoMin: 11,
        duracaoIso: "PT11M",
        miniaturaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=270&fit=crop",
        descricao: `A dúvida metódica, a hipótese do gênio maligno e o fundamento indubitável da consciência (Cogito).
0:00 A busca por certezas absolutas
03:20 A falibilidade dos sentidos e o argumento do sonho
06:40 O gênio maligno enganador
09:15 'Cogito, ergo sum': a certeza da existência`,
        tags: ["filosofia", "descartes", "epistemologia", "ceticismo"],
        disciplinaId: "filosofia",
      },
    ],
  },

  // 10. PROGRAMAÇÃO & TECNOLOGIA
  {
    id: "tecnologia",
    nome: "Programação & Tech",
    icone: "💻",
    descricao: "Algoritmos, estruturas de dados, React, TypeScript, Docker, Python, Linux e engenharia web.",
    corGradiente: "from-slate-800 to-indigo-900",
    palavrasChave: [
      "programacao",
      "programação",
      "react",
      "algoritmos",
      "javascript",
      "typescript",
      "codigo",
      "código",
      "dev",
      "software",
      "tecnologia",
      "docker",
      "python",
      "linux",
    ],
    videos: [
      {
        videoId: "8mei6uVttho",
        titulo: "Introdução a Algoritmos e Lógica de Programação",
        canalNome: "Curso em Vídeo",
        duracaoMin: 28,
        duracaoIso: "PT28M",
        miniaturaUrl: "https://images.unsplash.com/photo-1516116211227-bbc03e33f674?w=480&h=270&fit=crop",
        descricao: `O que são algoritmos, variáveis, operadores lógicos e estruturas de controle com Gustavo Guanabara.
0:00 O que é um algoritmo na prática
05:30 Como o computador processa instruções
12:10 Algoritmos no cotidiano: da receita ao código
20:40 Primeiros passos no raciocínio computacional`,
        tags: ["algoritmos", "logica", "programacao", "guanabara"],
        disciplinaId: "tecnologia",
      },
      {
        videoId: "kPRA0W1kECg",
        titulo: "15 Algoritmos de Ordenação e Análise de Complexidade",
        canalNome: "Timo Bingmann",
        duracaoMin: 12,
        duracaoIso: "PT12M",
        miniaturaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=480&h=270&fit=crop",
        descricao: `Visualização sonora e gráfica de algoritmos de ordenação: Quicksort, Mergesort e complexidade Big-O.
0:00 O que é complexidade de tempo Big-O
02:15 Bubble Sort vs Selection Sort
05:30 Quicksort e divisão e conquista
09:10 Mergesort e performance em escala`,
        tags: ["algoritmos", "ordenacao", "big-o", "estruturas de dados"],
        disciplinaId: "tecnologia",
      },
      {
        videoId: "Tn6-PIqc4UM",
        titulo: "React in 100 Seconds: Conceitos Fundamentais e Hooks",
        canalNome: "Fireship",
        duracaoMin: 5,
        duracaoIso: "PT5M",
        miniaturaUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=480&h=270&fit=crop",
        descricao: `Tudo o que você precisa saber sobre o React, JSX, Virtual DOM e useState.
0:00 O que é o React e JSX
01:10 Virtual DOM e Reatividade
02:20 Componentes e State com Hooks
03:30 Ecossistema Moderno do React`,
        tags: ["react", "javascript", "programacao", "dev"],
        disciplinaId: "tecnologia",
      },
      {
        videoId: "zQnBQ4tB3ZA",
        titulo: "TypeScript in 100 Seconds: Tipagem e Produtividade",
        canalNome: "Fireship",
        duracaoMin: 5,
        duracaoIso: "PT5M",
        miniaturaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=480&h=270&fit=crop",
        descricao: `Como o TypeScript adiciona tipos estáticos ao JavaScript para evitar bugs em produção.
0:00 Por que o TypeScript foi criado
01:15 Interfaces, Types e Genéricos
02:30 Compilação e checagem em tempo real
03:45 Configuração do tsconfig.json`,
        tags: ["typescript", "javascript", "programacao", "dev"],
        disciplinaId: "tecnologia",
      },
      {
        videoId: "DHjqpvDnNGE",
        titulo: "JavaScript in 100 Seconds: O Motor da Web Moderna",
        canalNome: "Fireship",
        duracaoMin: 5,
        duracaoIso: "PT5M",
        miniaturaUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=480&h=270&fit=crop",
        descricao: `A história, o Event Loop e as capacidades modernas do JavaScript no navegador e Node.js.
0:00 A criação relâmpago por Brendan Eich
01:10 V8 Engine e o Event Loop assíncrono
02:20 ES6+ e a evolução da sintaxe
03:30 JavaScript no backend com Node e Bun`,
        tags: ["javascript", "web", "programacao", "dev"],
        disciplinaId: "tecnologia",
      },
      {
        videoId: "Gjnup-PuquQ",
        titulo: "Docker in 100 Seconds: Containers e Imagens",
        canalNome: "Fireship",
        duracaoMin: 5,
        duracaoIso: "PT5M",
        miniaturaUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=480&h=270&fit=crop",
        descricao: `Como o Docker resolve o problema de 'na minha máquina funciona' com namespaces Linux e containers.
0:00 O que é um container vs máquina virtual
01:15 Criando um Dockerfile
02:30 Construindo e rodando imagens
03:45 Docker Compose e orquestração`,
        tags: ["docker", "devops", "containers", "tecnologia"],
        disciplinaId: "tecnologia",
      },
      {
        videoId: "x7X9w_GIm1s",
        titulo: "Python in 100 Seconds: A Linguagem Mais Popular",
        canalNome: "Fireship",
        duracaoMin: 5,
        duracaoIso: "PT5M",
        miniaturaUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=480&h=270&fit=crop",
        descricao: `Por que o Python domina data science, automação e inteligência artificial.
0:00 Sintaxe limpa e tipagem dinâmica
01:15 Estruturas de dados embutidas
02:30 Ecossistema para IA (NumPy, PyTorch)
03:30 Casos de uso na indústria`,
        tags: ["python", "programacao", "ia", "dev"],
        disciplinaId: "tecnologia",
      },
      {
        videoId: "rrB13utjYV4",
        titulo: "Linux in 100 Seconds: O Núcleo do Mundo Conectado",
        canalNome: "Fireship",
        duracaoMin: 5,
        duracaoIso: "PT5M",
        miniaturaUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=480&h=270&fit=crop",
        descricao: `A arquitetura do kernel Linux, distribuições, o terminal Bash e a nuvem.
0:00 Linus Torvalds e a criação do Linux
01:10 Arquitetura do kernel e tudo é um arquivo
02:20 Principais distribuições (Ubuntu, Debian, Arch)
03:30 O terminal e servidores de produção`,
        tags: ["linux", "servidores", "terminal", "devops"],
        disciplinaId: "tecnologia",
      },
      {
        videoId: "bMknfKXIFA8",
        titulo: "Curso Prático de React: Do Zero a Aplicações Reais",
        canalNome: "freeCodeCamp.org",
        duracaoMin: 35,
        duracaoIso: "PT35M",
        miniaturaUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=480&h=270&fit=crop",
        descricao: `Aprenda React construindo interfaces declarativas com componentes reutilizáveis e props.
0:00 Configuração inicial e Create-React-App
08:20 Compondo componentes e props
18:40 Manipulando eventos e estado local
28:10 Renderização condicional e listas`,
        tags: ["react", "frontend", "programacao", "web"],
        disciplinaId: "tecnologia",
      },
      {
        videoId: "cuEtnrL9-H0",
        titulo: "Aprenda Fetch API e Async/Await em Poucos Minutos",
        canalNome: "Web Dev Simplified",
        duracaoMin: 8,
        duracaoIso: "PT8M",
        miniaturaUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=270&fit=crop",
        descricao: `Como fazer requisições HTTP GET e POST na web usando promises e async/await moderno.
0:00 Introdução ao fetch nativo
02:15 Lidando com respostas JSON
04:30 Tratamento de erros com try/catch
06:45 Enviando dados via POST`,
        tags: ["javascript", "fetch", "web", "api"],
        disciplinaId: "tecnologia",
      },
    ],
  },
];

/**
 * Busca vídeos do catálogo com filtro estrito de escopo
 */
export function buscarVideosCatalogo(
  termoBusca?: string,
  disciplinaIdFiltro?: string
): VideoDisciplina[] {
  const normalizar = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const termoNorm = normalizar(termoBusca || "");
  const palavras = termoNorm.split(/\s+/).filter((p) => p.length > 2);

  const ordenarPorPalavras = (videos: VideoDisciplina[]) => {
    if (palavras.length === 0) return videos;
    return [...videos].sort((a, b) => {
      const aTexto = normalizar(`${a.titulo} ${a.descricao} ${a.tags.join(" ")}`);
      const bTexto = normalizar(`${b.titulo} ${b.descricao} ${b.tags.join(" ")}`);
      const aScore = palavras.reduce((acc, p) => acc + (aTexto.includes(p) ? 100 : 0), 0);
      const bScore = palavras.reduce((acc, p) => acc + (bTexto.includes(p) ? 100 : 0), 0);
      return bScore - aScore;
    });
  };

  // 1. Se foi selecionada uma disciplina específica (diferente de 'todas'),
  // o escopo é 100% ESTRITO para essa disciplina! Nenhum vídeo de fora entra!
  if (disciplinaIdFiltro && disciplinaIdFiltro !== "todas") {
    const disc = CATALOGO_DISCIPLINAS.find((d) => d.id === disciplinaIdFiltro);
    if (disc) {
      return ordenarPorPalavras(disc.videos);
    }
  }

  // 2. Se não há termo e nem disciplina específica, devolve todos
  if (!termoBusca || termoBusca.trim().length === 0) {
    return CATALOGO_DISCIPLINAS.flatMap((d) => d.videos);
  }

  // 3. Tenta identificar se o usuário digitou o nome de uma disciplina (ex: "geografia")
  const discEncontrada = CATALOGO_DISCIPLINAS.find((d) => {
    const nomeNorm = normalizar(d.nome);
    const idNorm = normalizar(d.id);
    return (
      termoNorm.includes(idNorm) ||
      nomeNorm.split(/\s+/).some((w) => w.length > 3 && termoNorm.includes(w)) ||
      d.palavrasChave.some((kw) => termoNorm.includes(kw))
    );
  });

  // Se o objetivo claramente é de uma disciplina específica (ex: "geografia mundial"),
  // limita ESTRITAMENTE aos vídeos dessa matéria para evitar contaminação!
  if (discEncontrada) {
    return ordenarPorPalavras(discEncontrada.videos);
  }

  // 4. Caso contrário, faz busca pontuada
  const encontrados: Array<{ video: VideoDisciplina; score: number }> = [];

  for (const disc of CATALOGO_DISCIPLINAS) {
    for (const v of disc.videos) {
      const textoAlvo = normalizar(`${v.titulo} ${v.descricao} ${v.tags.join(" ")} ${disc.nome}`);
      let score = 0;

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

  return CATALOGO_DISCIPLINAS.flatMap((d) => d.videos);
}

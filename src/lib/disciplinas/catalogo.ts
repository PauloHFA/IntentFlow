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
  // 1. GEOGRAFIA
  {
    id: "geografia",
    nome: "Geografia & Geopolítica",
    icone: "🌍",
    descricao: "Cartografia, placas tectônicas, relevo, biomas terrestres e dinâmica geopolítica.",
    corGradiente: "from-emerald-600 to-teal-800",
    palavrasChave: ["geografia", "geopolitica", "relevo", "clima", "biomas", "mapa", "planeta", "continentes", "terra", "cartografia", "tectonica"],
    videos: [
      {
        videoId: "kJQP7kiw5Fk",
        titulo: "Como as Placas Tectônicas Moldaram a Geografia da Terra",
        canalNome: "Geografia Visual",
        duracaoMin: 14,
        duracaoIso: "PT14M",
        miniaturaUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=480&h=270&fit=crop",
        descricao: `Entenda a deriva continental, zonas de subducção e formação de montanhas.
0:00 A Teoria da Deriva Continental
03:10 Movimento das Placas Tectônicas
07:45 Terremotos e Círculo de Fogo
11:20 O Futuro dos Continentes`,
        tags: ["geografia", "relevo", "placas tectonicas", "terra"],
        disciplinaId: "geografia",
      },
      {
        videoId: "WfGMYdalClU",
        titulo: "Climas do Mundo e Biomas Globais Explicados",
        canalNome: "Geografia em Ação",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=480&h=270&fit=crop",
        descricao: `Classificação climática, correntes marítimas e vegetação global.
0:00 Fatores que determinam o clima
04:15 Zonas Tropicais, Temperadas e Polares
09:30 Biomas e Biodiversidade
13:40 Mudanças Climáticas Atuais`,
        tags: ["geografia", "clima", "biomas", "vegetacao"],
        disciplinaId: "geografia",
      },
      {
        videoId: "6uXGz8F1xY4",
        titulo: "Geopolítica Mundial: Recursos Hídricos e Fronteiras Estratégicas",
        canalNome: "Mundo em Mapas",
        duracaoMin: 12,
        duracaoIso: "PT12M",
        miniaturaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=270&fit=crop",
        descricao: `Como os rios e relevos definiram fronteiras e rotas comerciais.
0:00 Geografia como destino estratégico
03:00 Bacias hidrográficas internacionais
07:15 Rotas marítimas e Estreitos
10:10 Geopolítica do Século XXI`,
        tags: ["geografia", "geopolitica", "mapas", "fronteiras"],
        disciplinaId: "geografia",
      },
      {
        videoId: "jU3vWqN1uR8",
        titulo: "Cartografia Moderna: Projeções Cartográficas e Sensoriamento Remoto",
        canalNome: "Geografia Moderna",
        duracaoMin: 18,
        duracaoIso: "PT18M",
        miniaturaUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=480&h=270&fit=crop",
        descricao: `Projeção de Mercator vs Peters, imagens de satélite e sistemas GIS.
0:00 Por que todos os mapas planos mentem
04:30 Mercator vs Projeções Equivalentes
09:15 Coordenadas Geográficas e Fusos Horários
14:00 Sensoriamento Remoto e Satélites`,
        tags: ["geografia", "cartografia", "mapas", "fusos"],
        disciplinaId: "geografia",
      },
      {
        videoId: "1L0T7Fm5n1Q",
        titulo: "Urbanização e Megacidades: A Dinâmica do Espaço Urbano",
        canalNome: "Geografia Humana",
        duracaoMin: 22,
        duracaoIso: "PT22M",
        miniaturaUrl: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=480&h=270&fit=crop",
        descricao: `Êxodo rural, conurbação, metropolização e gentrificação nas grandes cidades.
0:00 O crescimento das cidades pós-revolução industrial
05:10 Conurbação e Regiões Metropolitanas
11:20 Problemas socioambientais urbanos
17:40 Cidades Inteligentes e Planejamento`,
        tags: ["geografia", "urbanizacao", "cidades", "demografia"],
        disciplinaId: "geografia",
      },
      {
        videoId: "d6yV3i_4j1g",
        titulo: "Relevo Brasileiro e Bacias Hidrográficas do Brasil",
        canalNome: "Geografia do Brasil",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=480&h=270&fit=crop",
        descricao: `Planalto Central, Depressões e Bacias Amazônica, Platina e São Francisco.
0:00 Estrutura geológica do Brasil
03:40 Classificação do Relevo (Jurandyr Ross)
08:20 Bacias Hidrográficas principais
12:10 Aquíferos Guarani e Alter do Chão`,
        tags: ["geografia", "brasil", "relevo", "rios", "hidrografia"],
        disciplinaId: "geografia",
      },
    ],
  },

  // 2. MATEMÁTICA
  {
    id: "matematica",
    nome: "Matemática",
    icone: "📐",
    descricao: "Álgebra, geometria, funções, trigonometria e raciocínio lógico.",
    corGradiente: "from-blue-600 to-cyan-700",
    palavrasChave: ["matematica", "matemática", "algebra", "álgebra", "geometria", "funcoes", "funções", "calculo", "cálculo", "equacao", "trigonometria"],
    videos: [
      {
        videoId: "bMknfKXIFA8",
        titulo: "Funções de 1º e 2º Grau: Gráficos, Vértice e Raízes sem Decoreba",
        canalNome: "Matemática Descomplicada",
        duracaoMin: 18,
        duracaoIso: "PT18M",
        miniaturaUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=480&h=270&fit=crop",
        descricao: `Aprenda o comportamento visual das funções afins e quadráticas.
0:00 O que é uma função no plano cartesiano
04:15 Função Afim e Taxa de Variação
09:30 Função Quadrática e Parábolas
14:10 Bhaskara e Vértice da Parábola`,
        tags: ["matematica", "funcoes", "algebra", "graficos"],
        disciplinaId: "matematica",
      },
      {
        videoId: "7Tf_X_N8ZlA",
        titulo: "Geometria Espacial: Volumes e Áreas de Prismas, Cilindros e Esferas",
        canalNome: "Matemática Visual",
        duracaoMin: 20,
        duracaoIso: "PT20M",
        miniaturaUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=480&h=270&fit=crop",
        descricao: `Cálculo de volume e área total dos sólidos geométricos fundamentais.
0:00 A transição do plano 2D para o espaço 3D
04:30 Prismas e Paralelepípedos
10:15 Cilindros e Cones
15:50 Esferas e Princípio de Cavalieri`,
        tags: ["matematica", "geometria", "volume", "solidos"],
        disciplinaId: "matematica",
      },
      {
        videoId: "dcXqhqiZ2y4",
        titulo: "Probabilidade e Análise Combinatória: Permutação vs Combinação",
        canalNome: "Raciocínio Matemático",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=480&h=270&fit=crop",
        descricao: `Nunca mais confunda arranjo, combinação e permutação com este método.
0:00 O Princípio Fundamental da Contagem
03:50 Permutação simples e com repetição
08:10 Combinações e quando a ordem não importa
12:00 Cálculo de Probabilidades`,
        tags: ["matematica", "probabilidade", "combinatoria", "estatistica"],
        disciplinaId: "matematica",
      },
      {
        videoId: "Vd9Z7g2B-3g",
        titulo: "Trigonometria no Triângulo Retângulo e Círculo Trigonométrico",
        canalNome: "Matemática Pura",
        duracaoMin: 22,
        duracaoIso: "PT22M",
        miniaturaUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=480&h=270&fit=crop",
        descricao: `Seno, Cosseno, Tangente e a magia do ciclo trigonométrico.
0:00 Razões trigonométricas no triângulo retângulo
05:30 Ângulos notáveis (30°, 45°, 60°)
11:20 O Círculo Trigonométrico de raio 1
17:00 Relação Fundamental da Trigonometria`,
        tags: ["matematica", "trigonometria", "seno", "cosseno"],
        disciplinaId: "matematica",
      },
    ],
  },

  // 3. PORTUGUÊS & REDAÇÃO
  {
    id: "portugues",
    nome: "Português & Redação",
    icone: "🇧🇷",
    descricao: "Sintaxe, crase, pontuação, concordância e técnicas de redação nota 1000.",
    corGradiente: "from-amber-600 to-yellow-800",
    palavrasChave: ["portugues", "português", "redacao", "redação", "crase", "sintaxe", "pontuacao", "gramatica", "gramática", "concordancia", "interpretacao"],
    videos: [
      {
        videoId: "1L0T7Fm5n1Q",
        titulo: "Domine a Crase de Uma Vez por Todas com 4 Regras Simples",
        canalNome: "Português com Clareza",
        duracaoMin: 14,
        duracaoIso: "PT14M",
        miniaturaUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=480&h=270&fit=crop",
        descricao: `Quando usar, quando nunca usar e os casos facultativos da crase.
0:00 O que é a crase (fusão a + a)
03:00 Troca por palavra masculina
06:40 Casos proibidos (antes de verbo, palavras masculinas)
10:30 Casos facultativos e macetes`,
        tags: ["portugues", "crase", "gramatica", "redacao"],
        disciplinaId: "portugues",
      },
      {
        videoId: "WfGMYdalClU",
        titulo: "Pontuação e Uso da Vírgula sem Erros em Redações",
        canalNome: "Gramática Prática",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=480&h=270&fit=crop",
        descricao: `Por que vírgula não é pausa para respiração: aprenda a regra sintática.
0:00 O mito da pausa para respirar
04:10 Nunca separe sujeito de predicado
08:20 Vírgula com adjuntos adverbiais deslocados
12:50 Orações coordenadas e subordinadas`,
        tags: ["portugues", "virgula", "pontuacao", "sintaxe"],
        disciplinaId: "portugues",
      },
      {
        videoId: "kJQP7kiw5Fk",
        titulo: "Estrutura Perfeita de Redação Dissertativo-Argumentativa",
        canalNome: "Redação Nota 1000",
        duracaoMin: 22,
        duracaoIso: "PT22M",
        miniaturaUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=480&h=270&fit=crop",
        descricao: `Introdução com tese, desenvolvimento por causas/consequências e proposta de intervenção.
0:00 O esqueleto da dissertação argumentativa
05:10 Introdução em 3 partes
11:00 D1 e D2: Repertório sociocultural e argumentação
17:30 Proposta de Intervenção com os 5 elementos`,
        tags: ["portugues", "redacao", "enem", "dissertacao", "argumentacao"],
        disciplinaId: "portugues",
      },
      {
        videoId: "6uXGz8F1xY4",
        titulo: "Concordância Verbal e Nominal: As Armadilhas Mais Comuns",
        canalNome: "Português em Foco",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=480&h=270&fit=crop",
        descricao: `Verbo haver com sentido de existir, sujeito composto e pronomes indefinidos.
0:00 Regra geral de concordância
03:30 O verbo haver e fazer indicando tempo
07:45 Concordância com voz passiva sintética (vende-se casas?)
11:50 Casos especiais de concordância nominal`,
        tags: ["portugues", "concordancia", "gramatica", "sintaxe"],
        disciplinaId: "portugues",
      },
    ],
  },

  // 4. FÍSICA
  {
    id: "fisica",
    nome: "Física",
    icone: "⚛️",
    descricao: "Mecânica clássica, leis de Newton, termodinâmica, óptica e ondas.",
    corGradiente: "from-purple-600 to-indigo-900",
    palavrasChave: ["fisica", "física", "mecanica", "mecânica", "newton", "energia", "termodinamica", "ondas", "optica", "gravidade"],
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
        tags: ["fisica", "mecanica", "newton", "forca"],
        disciplinaId: "fisica",
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
14:00 Máquinas Térmicas e Ciclo de Carnot`,
        tags: ["fisica", "termodinamica", "entropia", "calor"],
        disciplinaId: "fisica",
      },
      {
        videoId: "dcXqhqiZ2y4",
        titulo: "Ondulatória e Som: Frequência, Amplitude e Efeito Doppler",
        canalNome: "Física Experimental",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=270&fit=crop",
        descricao: `Ondas transversais, longitudinais, ressonância e o Efeito Doppler.
0:00 O que é uma onda e transporte de energia
04:15 Equação Fundamental: v = lambda * f
09:10 Ressonância e interferência
13:30 O Efeito Doppler no som e na luz`,
        tags: ["fisica", "ondas", "som", "doppler"],
        disciplinaId: "fisica",
      },
      {
        videoId: "kJQP7kiw5Fk",
        titulo: "Eletricidade e Circuitos: Lei de Ohm, Tensão, Corrente e Potência",
        canalNome: "Eletrofísica",
        duracaoMin: 20,
        duracaoIso: "PT20M",
        miniaturaUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=480&h=270&fit=crop",
        descricao: `Cálculo de resistência, circuitos série e paralelo e consumo de energia.
0:00 O que são elétrons em movimento e ddp
04:40 Primeira Lei de Ohm (U = R * i)
10:15 Circuitos em Série vs Paralelo
15:30 Potência Elétrica e gasto em kWh`,
        tags: ["fisica", "eletricidade", "ohm", "circuitos"],
        disciplinaId: "fisica",
      },
    ],
  },

  // 5. QUÍMICA
  {
    id: "quimica",
    nome: "Química",
    icone: "🧪",
    descricao: "Tabela periódica, ligações químicas, estequiometria, soluções e termoquímica.",
    corGradiente: "from-teal-600 to-emerald-900",
    palavrasChave: ["quimica", "química", "tabela periodica", "atomos", "átomos", "estequiometria", "ligacoes", "solucoes", "reacoes"],
    videos: [
      {
        videoId: "6uXGz8F1xY4",
        titulo: "Tabela Periódica: Famílias, Períodos e Propriedades Periódicas",
        canalNome: "Química Total",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&h=270&fit=crop",
        descricao: `Eletronegatividade, raio atômico, energia de ionização e afinidade eletrônica.
0:00 A organização genial de Mendeleev
04:10 Metais, Ametais e Gases Nobres
08:45 Raio Atômico e Eletronegatividade
13:00 Como usar a tabela para prever ligações`,
        tags: ["quimica", "tabela periodica", "atomos", "eletronegatividade"],
        disciplinaId: "quimica",
      },
      {
        videoId: "WfGMYdalClU",
        titulo: "Ligações Químicas: Iônica, Covalente e Metálica na Prática",
        canalNome: "Química Interativa",
        duracaoMin: 18,
        duracaoIso: "PT18M",
        miniaturaUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&h=270&fit=crop",
        descricao: `Regra do octeto, compartilhamento de elétrons e forças intermoleculares.
0:00 A estabilidade dos gases nobres e regra do octeto
04:30 Ligação Iônica (metais + ametais)
09:40 Ligação Covalente simples, dupla e tripla
14:15 Ligação Metálica e forças de Van der Waals`,
        tags: ["quimica", "ligacoes", "ionica", "covalente"],
        disciplinaId: "quimica",
      },
      {
        videoId: "bMknfKXIFA8",
        titulo: "Cálculo Estequiométrico: Passo a Passo Sem Errar",
        canalNome: "Química em Minutos",
        duracaoMin: 22,
        duracaoIso: "PT22M",
        miniaturaUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&h=270&fit=crop",
        descricao: `Balanceamento de equações, mol, massa molar, rendimento e pureza.
0:00 A Lei de Lavoisier: na natureza nada se perde
05:10 Balanceamento pelo método das tentativas
11:30 A ponte do Mol e a Constante de Avogadro
17:20 Reagente Limitante e em Excesso`,
        tags: ["quimica", "estequiometria", "mol", "reacoes"],
        disciplinaId: "quimica",
      },
      {
        videoId: "7Tf_X_N8ZlA",
        titulo: "pH, Soluções e Ácidos e Bases de Arrhenius a Bronsted",
        canalNome: "Química Viva",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=480&h=270&fit=crop",
        descricao: `Escala de pH e pOH, concentração em g/L e molaridade.
0:00 Definição de Ácidos e Bases
03:50 O que significa a escala logarítmica de pH
08:20 Indicadores de pH e neutralização
12:00 Concentração Molar e Diluição`,
        tags: ["quimica", "ph", "acidos", "bases", "solucoes"],
        disciplinaId: "quimica",
      },
    ],
  },

  // 6. BIOLOGIA
  {
    id: "biologia",
    nome: "Biologia & Saúde",
    icone: "🧬",
    descricao: "Genética mendeliana, citologia, ecologia, evolução e fisiologia humana.",
    corGradiente: "from-rose-500 to-pink-700",
    palavrasChave: ["biologia", "genetica", "genética", "dna", "celulas", "células", "ecologia", "evolucao", "corpo", "fisiologia"],
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
        disciplinaId: "biologia",
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
        disciplinaId: "biologia",
      },
      {
        videoId: "kJQP7kiw5Fk",
        titulo: "Genética e DNA: Do Código Genético à Síntese de Proteínas",
        canalNome: "Biologia Moderna",
        duracaoMin: 20,
        duracaoIso: "PT20M",
        miniaturaUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=480&h=270&fit=crop",
        descricao: `Replicação do DNA, transcrição em RNA e tradução pelos ribossomos.
0:00 A estrutura em dupla hélice de Watson e Crick
04:40 Replicação semiconservativa
10:10 Transcrição do RNA mensageiro
15:30 Código genético universal e tradução`,
        tags: ["biologia", "genetica", "dna", "celulas"],
        disciplinaId: "biologia",
      },
      {
        videoId: "1L0T7Fm5n1Q",
        titulo: "Ecologia e Cadeias Alimentares: Ciclos Biogeoquímicos e Biomas",
        canalNome: "Planeta Biológico",
        duracaoMin: 18,
        duracaoIso: "PT18M",
        miniaturaUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=480&h=270&fit=crop",
        descricao: `Produtores, consumidores, ciclo do carbono e fluxo de energia.
0:00 Níveis de organização em ecologia
04:20 Cadeias e Teias Alimentares
09:10 Pirâmides ecológicas de energia
14:00 Ciclo da água e do carbono`,
        tags: ["biologia", "ecologia", "biomas", "cadeia alimentar"],
        disciplinaId: "biologia",
      },
    ],
  },

  // 7. HISTÓRIA
  {
    id: "historia",
    nome: "História",
    icone: "🏛️",
    descricao: "História do Brasil, civilizações antigas, revoluções e mundo contemporâneo.",
    corGradiente: "from-orange-600 to-amber-800",
    palavrasChave: ["historia", "história", "brasil", "revolucao", "revolução", "idade media", "guerra", "imperio", "democracia"],
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
        disciplinaId: "historia",
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
        disciplinaId: "historia",
      },
      {
        videoId: "WfGMYdalClU",
        titulo: "História do Brasil Império: Da Independência à Proclamação da República",
        canalNome: "História do Brasil",
        duracaoMin: 22,
        duracaoIso: "PT22M",
        miniaturaUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=480&h=270&fit=crop",
        descricao: `Primeiro Reinado, Período Regencial, Segundo Reinado e abolição.
0:00 A vinda da Família Real em 1808
05:15 O 7 de Setembro e D. Pedro I
11:40 O longo reinado de Dom Pedro II
17:50 A abolição e o golpe republicano de 1889`,
        tags: ["historia", "brasil", "imperio", "republica"],
        disciplinaId: "historia",
      },
      {
        videoId: "6uXGz8F1xY4",
        titulo: "A Revolução Francesa: Queda da Bastilha, Iluminismo e Cidadania",
        canalNome: "História em Foco",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=480&h=270&fit=crop",
        descricao: `Liberdade, Igualdade e Fraternidade: o marco da Idade Contemporânea.
0:00 O Antigo Regime e os Três Estados
04:10 Tomada da Bastilha e Declaração dos Direitos
09:20 Fase do Terror Jacobino e Robespierre
13:30 A ascensão de Napoleão Bonaparte`,
        tags: ["historia", "revolucao francesa", "europa", "iluminismo"],
        disciplinaId: "historia",
      },
    ],
  },

  // 8. INGLÊS & IDIOMAS
  {
    id: "ingles",
    nome: "Inglês",
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
        disciplinaId: "ingles",
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
        disciplinaId: "ingles",
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
        disciplinaId: "ingles",
      },
      {
        videoId: "1L0T7Fm5n1Q",
        titulo: "English at Work: Business Conversations & Vocabulary",
        canalNome: "BBC Learning English",
        duracaoMin: 16,
        duracaoIso: "PT16M",
        miniaturaUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&h=270&fit=crop",
        descricao: `Improve your professional English for meetings and emails.
0:00 Introduction to Business English
02:40 How to Start a Meeting Politely
06:15 Asking for Clarification
11:00 Closing Deals and Next Steps`,
        tags: ["ingles", "inglês", "business", "trabalho", "english"],
        disciplinaId: "ingles",
      },
      {
        videoId: "u0vO61J3_uA",
        titulo: "50 Palavras em Inglês Mais Usadas com Pronúncia Perfeita",
        canalNome: "English with Lucy",
        duracaoMin: 14,
        duracaoIso: "PT14M",
        miniaturaUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=480&h=270&fit=crop",
        descricao: `Guia de pronúncia e fonética dos termos mais recorrentes.
0:00 Introdução aos fonemas
03:15 Pronúncia de vogais curtas vs longas
07:30 Consoantes silenciosas comuns
11:00 Exercício prático de repetição`,
        tags: ["ingles", "inglês", "pronuncia", "fonetica"],
        disciplinaId: "ingles",
      },
    ],
  },

  // 9. FILOSOFIA & SOCIOLOGIA
  {
    id: "filosofia",
    nome: "Filosofia & Sociologia",
    icone: "💭",
    descricao: "Ética, epistemologia, iluminismo, cidadania e pensamento crítico.",
    corGradiente: "from-violet-600 to-purple-800",
    palavrasChave: ["filosofia", "sociologia", "etica", "ética", "pensamento", "politica", "iluminismo", "sociedade", "moral"],
    videos: [
      {
        videoId: "dcXqhqiZ2y4",
        titulo: "O Mito da Caverna de Platão e a Ilusão do Mundo Sensível",
        canalNome: "Filosofia Viva",
        duracaoMin: 15,
        duracaoIso: "PT15M",
        miniaturaUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=480&h=270&fit=crop",
        descricao: `A alegoria de Platão sobre ignorância, verdade e o papel da educação.
0:00 O cenário da caverna e as sombras
04:10 A libertação do prisioneiro e a dor da luz
09:20 O retorno à caverna e incompreensão
12:45 Aplicação no mundo das redes sociais e algoritmos`,
        tags: ["filosofia", "platao", "etica", "conhecimento"],
        disciplinaId: "filosofia",
      },
      {
        videoId: "bMknfKXIFA8",
        titulo: "Ética a Nicômaco de Aristóteles: O Meio-Termo e a Felicidade",
        canalNome: "Pensamento Crítico",
        duracaoMin: 18,
        duracaoIso: "PT18M",
        miniaturaUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=480&h=270&fit=crop",
        descricao: `Eudaimonia (felicidade plena) e a virtude como equilíbrio entre extremos.
0:00 O que é virtude moral
04:30 A doutrina do justo meio
09:50 Coragem como equilíbrio entre covardia e temeridade
14:15 A prática diária da virtude`,
        tags: ["filosofia", "aristoteles", "etica", "moral"],
        disciplinaId: "filosofia",
      },
      {
        videoId: "7Tf_X_N8ZlA",
        titulo: "Os Clássicos da Sociologia: Marx, Durkheim e Max Weber",
        canalNome: "Sociologia em Ação",
        duracaoMin: 22,
        duracaoIso: "PT22M",
        miniaturaUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=270&fit=crop",
        descricao: `Fato social, luta de classes e ação social: os três pilares sociológicos.
0:00 O surgimento da sociologia na modernidade
05:10 Émile Durkheim e o Fato Social
11:30 Karl Marx e o Materialismo Histórico
17:00 Max Weber e a Ação Social Compreensiva`,
        tags: ["sociologia", "weber", "marx", "durkheim", "sociedade"],
        disciplinaId: "filosofia",
      },
    ],
  },

  // 10. PROGRAMAÇÃO & TECNOLOGIA
  {
    id: "tecnologia",
    nome: "Programação & Tech",
    icone: "💻",
    descricao: "Desenvolvimento web, React, TypeScript, algoritmos e computação moderna.",
    corGradiente: "from-slate-800 to-indigo-900",
    palavrasChave: ["programacao", "programação", "react", "nextjs", "javascript", "typescript", "codigo", "dev", "software", "tecnologia"],
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
        disciplinaId: "tecnologia",
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
        disciplinaId: "tecnologia",
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
        disciplinaId: "tecnologia",
      },
      {
        videoId: "kJQP7kiw5Fk",
        titulo: "Algoritmos e Estruturas de Dados: Mochila 0/1 e Complexidade Big-O",
        canalNome: "Computação com Intenção",
        duracaoMin: 20,
        duracaoIso: "PT20M",
        miniaturaUrl: "https://images.unsplash.com/photo-1516116211227-bbc03e33f674?w=480&h=270&fit=crop",
        descricao: `Como resolver o Problema da Mochila com Programação Dinâmica e análise Big-O.
0:00 O que é a notação Big-O
05:10 O Problema da Mochila 0/1
11:20 Construindo a tabela de programação dinâmica
16:40 Reconstrução da solução e testes`,
        tags: ["algoritmos", "mochila", "programacao", "big-o"],
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

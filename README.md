# ⚡ IntentFlow – Assistir com Intenção

> **Um "YouTube" deliberado contra o feed infinito, desenhado para otimizar aprendizado por minuto usando a YouTube Data API v3.**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-47_Passing-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![YouTube API v3](https://img.shields.io/badge/YouTube_API_v3-Compliant-FF0000?style=for-the-badge&logo=youtube)](https://developers.google.com/youtube/v3)
[![LGPD Ready](https://img.shields.io/badge/LGPD-Compliant-success?style=for-the-badge)](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)

---

## 🧭 O Problema: A Armadilha do Feed Infinito

Plataformas de streaming e redes sociais tradicionais foram projetadas sob a lógica da **economia da atenção**:
- **Algoritmos de Recomendação** otimizam para *tempo total de tela*, não para assimilação de conhecimento.
- **Autoplay Infinito** induz o consumo passivo contínuo ("apenas mais um vídeo").
- **Comentários e Vídeos Relacionados Laterais** fragmentam a atenção e causam sobrecarga cognitiva.

### A Abordagem do IntentFlow:
O **IntentFlow** inverte completamente essa dinâmica:
> **"Plataformas convencionais otimizam tempo de tela. O IntentFlow otimiza o que você aprende."**

| Plataformas Convencionais | IntentFlow |
| :--- | :--- |
| **Feed Infinito** com rolagem sem fim | **Playlists Finitas** empacotadas sob medida |
| **Autoplay compulsivo** | A sessão **encerra** no último minuto planejado |
| **Consumo Passivo** de entretenimento | **Estudo Ativo**: Notas no tempo e Flashcards SM-2 |
| **Recomendações aleatórias** laterais | **Modo Foco Zen** sem comentários nem distrações |
| **Métricas de vaidade** (visualizações) | **Tempo de Foco Real** (apenas com player ativo e aba visível) |

---

## ✨ Funcionalidades Principais

### 1. 🎯 Orçamento Finito & Algoritmo da Mochila 0/1 (Knapsack)
Defina seu objetivo de estudo (ex: *"Geografia física"*, *"Álgebra Linear"*, *"React Hooks"*) e quanto tempo você tem disponível (10 a 90 minutos). O algoritmo de Programação Dinâmica seleciona a combinação exata de vídeos que maximiza o valor pedagógico dentro do seu orçamento temporal.

### 2. 🧘 Modo Foco Zen (Distraction-Free Cinema Mode)
Pressione `Z` a qualquer momento para entrar no **Modo Zen**:
- Oculta menus superiores, rodapés e métricas secundárias.
- Expande o vídeo oficial em alta resolução ocupando **70%** da tela.
- Mantém o bloco de anotações e capítulos em **30%** com tema escuro imersivo (`slate-950`).

### 3. ⌨️ Fluxo de Estudo Contínuo por Teclado
Controle todo o seu estudo sem tirar as mãos do teclado e sem interromper o fluxo mental (*flow state*):

| Tecla | Ação |
| :---: | :--- |
| <kbd>N</kbd> | Pula para o campo de notas e fixa a minutagem exata do vídeo (`currentTime`) |
| <kbd>Espaço</kbd> ou <kbd>K</kbd> | Pausar / Retomar a reprodução do vídeo |
| <kbd>J</kbd> | Retroceder 10 segundos |
| <kbd>L</kbd> | Avançar 10 segundos |
| <kbd>M</kbd> | Silenciar / Ativar áudio |
| <kbd>Z</kbd> | Alternar Modo Foco Zen (Cinema) |
| <kbd>C</kbd> | Alternar entre aba de Notas Ancoradas e Capítulos |
| <kbd>?</kbd> | Abrir modal de ajuda de atalhos |
| <kbd>Esc</kbd> | Sair do Modo Zen ou desfocar campo de digitação |

### 4. 🃏 Flashcards Inteligentes para Repetição Espaçada (SM-2)
Durante o vídeo, alterne entre:
- **Nota Rápida**: Captura insights e fórmulas ancorados ao segundo exato com link para reprodução instantânea (`seekTo`).
- **Flashcard SM-2**: Cria pares de **Frente (Pergunta ou Conceito)** e **Verso (Explicação ou Gabarito)** para prática deliberada de *Active Recall* na esteira de revisão diária (`/revisao`).

### 5. 🎚️ Seletor de Intensidade e Profundidade
Adapte a seleção de vídeos ao momento do seu dia no `/iniciar`:
- ⚡ **Rápidos**: Pílulas conceituais diretas ao ponto ($\le 12$ min).
- 🎯 **Práticos**: Conteúdos intermediários com exemplos aplicados ($12$ a $20$ min).
- 📚 **Masterclass**: Aulas aprofundadas e densas ($> 20$ min).
- ⚪ **Misto**: Combinação livre calculada pela mochila.

### 6. 🎮 Gamificação & Reforço Positivo
- **Sistema de XP**: Ganhe experiência por minutos de foco assistidos (+10 XP/min), sessões concluídas (+50 XP), notas tomadas (+20 XP), revisões SM-2 (+15 XP) e reflexões registradas (+75 XP).
- **6 Níveis de Maestria**: De *Iniciante Consciente* a *Mestre do Foco Deliberado*.
- **Streaks Diários**: Sequência ininterrupta de dias de estudo.
- **8 Conquistas Desbloqueáveis**: Badges visuais que premiam consistência, domínio e active recall.
- **Feedback Multissensorial**: Chuva de confetes (`canvas-confetti`) e acorde harmônico gerado nativamente via **Web Audio API** do navegador ao concluir sessões ou zerar revisões.

### 7. 📊 Dashboard Semanal de Foco
Acompanhe seu desempenho no `/painel` com gráficos interativos construídos em **Recharts**:
- Comparativo entre minutos planejados vs minutos reais com foco.
- Distribuição de tempo por categorias e matérias.

### 8. 🔒 LGPD, Portabilidade e Privacidade Total (RF-14)
- **Exportação em Markdown**: Exporte todas as suas sessões e notas formatadas para seu segundo cérebro (**Obsidian**, **Notion** ou **Logseq**).
- **Backup em JSON**: Exportação integral dos dados para portabilidade.
- **Exclusão de Conta com 1 Clique**: Eliminação irrevogável de todo o histórico e cache local, em conformidade com a LGPD e o GDPR.

---

## 📚 Catálogo Curado de 10 Disciplinas Essenciais

Cada disciplina conta com acervo rico de vídeos educativos autênticos e verificados via API oficial, com isolamento estrito de matérias para evitar qualquer contaminação temática na playlist:

1. 📐 **Matemática**: Cálculo diferencial, limites, álgebra linear, vetores, teorema de Bayes e transformada de Fourier (*3Blue1Brown*).
2. 🇧🇷 **Português & Redação**: Crase obrigatória e facultativa, sintaxe da vírgula, concordância verbal e redação nota 1000 ENEM (*Prof. Noslen*, *Profinho*).
3. ⚛️ **Física**: Leis da relatividade, termodinâmica e entropia, circuitos e efeito Magnus (*Veritasium*).
4. 🧪 **Química**: Tabela periódica, ligações iônicas/covalentes, estequiometria, núcleo atômico e reações ácido-base (*CrashCourse*).
5. 🧬 **Biologia & Saúde**: Engenharia genética CRISPR, divisão celular, síntese proteica, evolução e respiração celular (*Kurzgesagt*, *CrashCourse*).
6. 🌍 **Geografia & Geopolítica**: Deriva continental e placas tectônicas, biomas globais, projeções cartográficas e geopolítica da Eurásia (*GeoIlustrada*, *Vox*, *Kurzgesagt*).
7. 🏛️ **História**: Revolução Francesa, Revolução Científica, Primeira Guerra Mundial, Guerra Fria e Independência do Brasil (*CrashCourse*, *OverSimplified*, *Nerdologia*).
8. 🇬🇧 **Inglês**: Phrasal verbs práticos, pensar em inglês sem traduzir, present perfect vs past simple e pronúncia natural (*BBC Learning English*, *English with Lucy*).
9. 💭 **Filosofia & Sociologia**: Mito da caverna de Platão, ética de Aristóteles, paradigmas de Marx/Weber/Durkheim, utilitarismo e ceticismo cartesiano (*CrashCourse*).
10. 💻 **Programação & Tecnologia**: Lógica de algoritmos, complexidade Big-O, React, TypeScript, JavaScript, Docker, Python e Linux (*Curso em Vídeo*, *Fireship*, *freeCodeCamp*).

---

## 🛡️ Engenharia de Cota da YouTube API (Economia de 98%)

A YouTube Data API v3 impõe um limite padrão de **10.000 unidades diárias**. Para garantir que a aplicação nunca exceda essa cota, o IntentFlow implementa uma arquitetura preventiva rigorosa:

| Estratégia | Operação Tradicional | No IntentFlow | Economia |
| :--- | :---: | :---: | :---: |
| **Busca de Vídeos** | `search.list` (100 unidades/chamada) | **Banido.** Lê uploads por playlist de canal (`playlistItems.list`) | **98% menor** (~2 unidades) |
| **Cadastro de Canais** | Múltiplas chamadas | Resolução única por handle (`channels.list`) | Custo único de **1 unidade** |
| **Camada de Cache** | Sem cache (chamadas repetidas) | Cache local com TTL adaptativo (1h a 7 dias) | Chamadas subsequentes custam **0 unidades** |
| **Teto de Proteção** | Risco de esgotamento | Circuit breaker que bloqueia novas chamadas em **80% da cota** | **100% à prova de bloqueio** |

### Política de Armazenamento de 30 Dias:
Em estrita conformidade com a Seção III.E.4 dos Termos da API do YouTube, **nenhum dado em cache ultrapassa 30 dias**. Rotinas automáticas de expurgo eliminam entradas antigas, garantido por testes automatizados em [`conformidade.test.ts`](file:///c:/Projetos/IntentFlow/src/lib/algorithms/__tests__/conformidade.test.ts).

---

## 🧠 Fundamentos Algorítmicos

### 1. O Problema da Mochila 0/1 (`mochila.ts`)
Para preencher o orçamento de tempo $T$ com os vídeos mais relevantes de uma lista de $n$ candidatos:
$$\text{DP}[i][w] = \max\Big(\text{DP}[i-1][w],\; \text{DP}[i-1][w - d_i] + v_i\Big)$$
Onde:
- $d_i$ é a duração em minutos do vídeo $i$.
- $v_i$ é o valor pedagógico (calculado por prioridade do canal, relevância semântica com o objetivo e bônus de intensidade).
- Complexidade: $O(n \times T)$ com reconstrução de solução ótima em tempo linear.

### 2. Algoritmo SuperMemo SM-2 (`sm2.ts`)
A cada avaliação de cartão (nota $q \in [0, 5]$):
$$EF' = \max\Big(1.3,\; EF + (0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02))\Big)$$
$$I(n) = \begin{cases} 1 & \text{se } n = 1 \\ 6 & \text{se } n = 2 \\ I(n-1) \times EF' & \text{se } n > 2 \end{cases}$$
Se a avaliação for $q < 3$, a contagem de repetições é reiniciada para $n=0$ e o intervalo é redefinido para 1 dia.

---

## 📁 Arquitetura do Repositório

```
IntentFlow/
├── docs/
│   └── adr/                           # Registros de Decisões de Arquitetura (ADR 001 a 007)
│       ├── ADR-001-nao-depender-de-search-list.md
│       ├── ADR-002-politica-de-cache-e-limite-de-30-dias.md
│       ├── ADR-003-fila-por-programacao-dinamica-mochila.md
│       ├── ADR-004-oauth-fora-do-mvp.md
│       ├── ADR-005-nextjs-com-rotas-de-servidor.md
│       ├── ADR-006-eventos-de-reproducao-e-tempo-assistido.md
│       └── ADR-007-experiencia-de-aprendizado-e-modo-zen.md
├── src/
│   ├── app/                           # Next.js 16 App Router
│   │   ├── api/                       # Rotas de Servidor (REST)
│   │   │   ├── canais/                # CRUD de canais e upload playlists
│   │   │   ├── feed/                  # Candidatos filtrados por disciplina e profundidade
│   │   │   ├── gamificacao/           # Métricas de XP, ranks e badges
│   │   │   ├── notas/                 # Anotações ancoradas e criação de flashcards
│   │   │   ├── painel/                # Métricas semanais para Recharts
│   │   │   ├── revisao/               # Motor de agendamento SM-2
│   │   │   ├── saude/cota/            # Livro contábil de consumo de cota
│   │   │   └── sessoes/               # Sessões, encerramento e troca de itens
│   │   ├── canais/                    # Gestor de canais favoritos
│   │   ├── configuracoes/             # Exportação (Markdown/JSON) e exclusão LGPD
│   │   ├── conquistas/                # Hub de gamificação e regras de pontos
│   │   ├── iniciar/                   # Configuração de sessões, disciplinas e tempo
│   │   ├── painel/                    # Gráficos de foco semanal
│   │   ├── revisao/                   # Interface de revisão espaçada SM-2
│   │   ├── sessao/[id]/               # Sala de Foco, Player IFrame e Modo Zen
│   │   │   └── resumo/                # Métricas comparativas, confetes e reflexão
│   │   └── status/                    # Checklist de conformidade e uso de cota
│   ├── components/
│   │   ├── layout/                    # Navbar e Footer com links de compliance
│   │   └── player/                    # YouTube IFrame Player com API de controle
│   └── lib/
│       ├── algorithms/                # Mochila 0/1, SM-2, Capítulos, Duração ISO
│       ├── audio/                     # Sintetizador harmônico nativo (Web Audio API)
│       ├── cache/                     # Cache seguro com auto-expurgo < 30 dias
│       ├── db/                        # Store com persistência local em disco
│       ├── disciplinas/               # Catálogo curado das 10 disciplinas
│       ├── export/                    # Exportadores Markdown (Obsidian) e JSON
│       ├── gamification/              # Motor de cálculo de XP, níveis e badges
│       └── youtube/                   # Proxy ytGet, fixtures offline e cota
└── package.json
```

---

## 🚀 Como Executar Localmente

### 1. Pré-requisitos
- **Node.js**: versão 20 ou superior recomendada.
- **npm** ou **pnpm**.

### 2. Instalação
Clone o repositório e instale as dependências:
```bash
git clone https://github.com/PauloHFA/IntentFlow.git
cd IntentFlow
npm install
```

### 3. Configuração de Variáveis de Ambiente
Copie o arquivo de exemplo para seu ambiente local:
```bash
cp .env.example .env.local
```
*(Opcional: Adicione sua `YOUTUBE_API_KEY`. Se omitida, a aplicação opera automaticamente em modo de demonstração com fixtures autênticas e offline).*

### 4. Executando os Testes Automatizados
O projeto conta com **47 testes unitários e de integração** no Vitest:
```bash
npm test
```
Para executar no modo watch:
```bash
npm run test:watch
```

### 5. Iniciando o Servidor de Desenvolvimento
```bash
npm run dev
```
Abra seu navegador em [http://localhost:3000](http://localhost:3000).

### 6. Compilação para Produção
```bash
npm run build
npm start
```

---

## ⚖️ Conformidade e Aviso Legal

O **IntentFlow** foi desenvolvido para fins educacionais, de pesquisa em design de interação e portfólio de engenharia de software. Não possui vínculo comercial com o Google LLC ou YouTube. Todas as marcas registradas, títulos de vídeos e dados de canais pertencem aos seus respectivos proprietários.

- [Termos de Serviço da YouTube Data API](https://developers.google.com/youtube/terms/api-services-terms-of-service)
- [Diretrizes de Marca do YouTube](https://www.youtube.com/howyoutubeworks/resources/brand-resources/)
- [Política de Privacidade do Google](https://policies.google.com/privacy)

---

Desenvolvido com foco no aprendizado intencional e na soberania do tempo de atenção.

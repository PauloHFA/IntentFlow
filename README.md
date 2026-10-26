# IntentFlow – Assistir com Intenção

> **Um "YouTube" criativo contra o feed infinito, utilizando a YouTube Data API v3.**

O **IntentFlow** é um aplicativo web projetado para inverter a lógica tradicional das plataformas de vídeo: enquanto as redes buscam maximizar o tempo de tela com feeds infinitos e autoplay, o IntentFlow otimiza o **aprendizado deliberado por minuto**.

---

## 🎯 Proposta de Valor e Diferenciais

- **Orçamento de Tempo & Algoritmo da Mochila (0/1 Knapsack)**: O estudante define seu objetivo e quantos minutos tem disponível. O algoritmo seleciona a combinação ideal de vídeos dos canais prioritários que cabem no tempo estipulado.
- **Fila Finita e Foco**: Ao terminar o último vídeo, a sessão é concluída. Sem recomendações aleatórias nem autoplay contínuo.
- **Notas Ancoradas no Tempo**: Capture insights associados à posição exata do player oficial (`currentTime`). Clicar na nota leva o player ao segundo correspondente (`seekTo`).
- **Repetição Espaçada (SM-2)**: Cada nota pode ser convertida em cartões de revisão inteligente com autoavaliação (0 a 5) recalculando intervalos ideais para fixação a longo prazo.
- **Medição de Tempo de Atenção Real**: O cronômetro de foco só avança se o player oficial estiver em reprodução e a aba do navegador estiver visível.

---

## 🛡️ Políticas da YouTube API & Otimização de Cota

O IntentFlow foi desenhado com estrita observância aos Termos de Serviço da YouTube Data API v3:

| Regra / Política | Como o IntentFlow Cumpre |
| :--- | :--- |
| **Player Incorporado Oficial** | Utiliza a API oficial do IFrame Player com controles intactos, tamanho 16:9 sem qualquer sobreposição visual. |
| **Zero dependência de `search.list`** | Cada busca custaria 100 unidades de cota. O app cadastra canais por handle/URL (1 unidade) e consome uploads recentes via `playlistItems.list` (~2 unidades no total). Economia de 98% da cota diária. |
| **Limite de Armazenamento de 30 Dias** | Camada de cache dedicada com TTLs curtos (1h a 7 dias) e rotina de expurgo automatizada com teste unitário de conformidade. |
| **Integridade de Métricas** | Dados de tempo de estudo do usuário são rotulados explicitamente como *"Tempo no seu histórico de sessão"*, sem renomear estatísticas oficiais da plataforma. |
| **Proteção de Chave** | Chave da API protegida no servidor via rotas do Next.js App Router (`ytGet`). Nunca exposta no navegador. |
| **Modo Demonstração / Fallback** | Caso a chave não esteja configurada ou o teto de segurança (80%) seja atingido, o app opera graciosamente com fixtures e cache. |

---

## 🧠 Algoritmos Implementados

1. **Problema da Mochila 0/1 (`montarFila`)**:
   - Programação dinâmica em $O(n \times T)$, onde $n$ é o total de candidatos e $T$ é o orçamento em minutos.
   - Encontra o subconjunto de maior valor pedagógico e prioridade sem ultrapassar o tempo limite.
2. **Repetição Espaçada SuperMemo SM-2 (`proximaRevisao`)**:
   - Ajuste dinâmico do fator de facilidade ($EF \ge 1.3$) e cálculo do intervalo de repetição em dias.
3. **Conversão ISO 8601 (`duracaoIsoParaSegundos`)**:
   - Parser seguro para tempos `PT1H2M3S`, convertendo para segundos e minutos (arredondando para cima).
4. **Extrator de Capítulos da Descrição (`extrairCapitulos`)**:
   - Identifica timestamps no início de linha da descrição do vídeo, validando o início em `0:00` e o mínimo de 3 seções.

---

## 📁 Arquitetura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── canais/          # Cadastro e listagem de canais
│   │   ├── feed/            # Candidatos recentes via playlist de uploads
│   │   ├── notas/           # Notas ancoradas no tempo e cartões
│   │   ├── painel/          # Agregações de métricas semanais
│   │   ├── revisao/         # Endpoints de repetição espaçada SM-2
│   │   ├── saude/cota/      # Livro de monitoramento de cota diária
│   │   └── sessoes/         # Criação de sessão e eventos em lote
│   ├── canais/              # Gestão de canais e prioridades
│   ├── iniciar/             # Configuração de objetivo e orçamento
│   ├── revisao/             # Interface de flashcards SM-2
│   ├── sessao/[id]/         # Sala de sessão com player oficial e notas
│   │   └── resumo/          # Resumo de foco e reflexão
│   ├── status/              # Painel de cota e conformidade
│   └── page.tsx             # Tela principal (Hoje)
├── components/
│   ├── layout/              # Navbar e Footer (links legais)
│   └── player/              # Componente do YouTube IFrame Player
├── lib/
│   ├── algorithms/          # Mochila 0/1, SM-2, Capítulos, Duração ISO
│   ├── cache/               # Cache Store com expurgo (< 30 dias)
│   ├── db/                  # Modelo de dados e repositório
│   └── youtube/             # Cliente de servidor ytGet e gerenciador de cota
docs/
└── adr/                     # Architectural Decision Records (ADR-001 a ADR-006)
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20+ instalado
- npm ou pnpm

### Instalação
```bash
git clone https://github.com/seu-usuario/intent-flow.git
cd IntentFlow
npm install
```

### Configuração do Ambiente
Copie `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```
*(Opcional: insira sua `YOUTUBE_API_KEY`. Se omitida, a aplicação opera automaticamente no modo demonstração com fixtures pré-carregadas).*

### Execução dos Testes
```bash
npm test
```
*30 testes cobrindo algoritmos, conformidade de políticas de cache, rotas de API e YouTube client.*

### Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Compilação de Produção
```bash
npm run build
```

---

## ⚖️ Conformidade e Aviso Legal

Este é um projeto acadêmico e de portfólio de engenharia de software. Não é afiliado, associado ou endossado pelo YouTube ou Google LLC. Todos os dados e marcas do YouTube pertencem aos seus respectivos proprietários.
- [Termos de Serviço do YouTube](https://www.youtube.com/t/terms)
- [Política de Privacidade do Google](https://policies.google.com/privacy)

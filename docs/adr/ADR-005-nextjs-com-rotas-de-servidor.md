# ADR-005: Next.js com Rotas de Servidor em vez de API Separada

## Contexto
O aplicativo precisa de chamadas seguras à YouTube Data API v3 sem vazar a chave de API no navegador do usuário, além de orquestrar cache e livro de cota.

## Decisão
Utilizar o Next.js App Router com Route Handlers (`src/app/api/...`) como backend unificado:
- A chave `YOUTUBE_API_KEY` reside exclusivamente nas variáveis de ambiente do servidor (`process.env.YOUTUBE_API_KEY`).
- Centraliza a lógica de negócios, banco de dados, rate limit e validação Zod no mesmo projeto TypeScript compartilhado.
- Simplifica o deploy contínuo em plataformas como Vercel ou contêiner Docker único.

## Consequências
- Tipagem fim a fim (end-to-end type safety).
- Arquitetura limpa sem necessidade de manter dois repositórios ou dois pipelines de deploy separados.


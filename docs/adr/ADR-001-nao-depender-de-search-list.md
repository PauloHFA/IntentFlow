# ADR-001: Não depender de search.list

## Contexto
O limite diário padrão da YouTube Data API v3 para projetos em desenvolvimento é de 10.000 unidades.
O método `search.list` consome 100 unidades por chamada (1% de toda a cota diária por requisição), o que tornaria inviável a operação com múltiplos testes ou demonstração para portfólio. Além disso, a documentação recente do Google introduziu restrições adicionais e quotas específicas para `search.list`.

## Decisão
O IntentFlow **não utiliza** `search.list` no fluxo principal de descoberta e montagem de fila.
A entrada de canais é feita por:
- URL do canal
- @handle (ex: `@GoogleDevelopers`)
- ID do canal (`UC...`)

Validamos o canal via `channels.list` (custo: 1 unidade), obtemos a playlist de uploads em `relatedPlaylists.uploads`, e listamos os vídeos via `playlistItems.list` (custo: 1 unidade por página) e `videos.list` em lote (até 50 IDs por chamada = 1 unidade).

Custo total para alimentar os vídeos recentes de um canal: **apenas 2 unidades** (uma economia de 98% em relação a buscar).

## Consequências
- Consumo diário de cota extremamente reduzido e previsível.
- Feed limpo e focado estritamente nos canais confiáveis escolhidos pelo usuário.
- Se no futuro busca por palavra-chave for disponibilizada (v1.1), será estritamente opcional, cacheada agressivamente e com limites de taxa rígidos por usuário.


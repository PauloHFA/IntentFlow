# ADR-003: Algoritmo da Fila por Orçamento de Tempo (Problema da Mochila 0/1)

## Contexto
O usuário define um objetivo (ex: "Aprender Rust") e um tempo limite disponível (ex: 40 minutos). Diferente do algoritmo de recomendação tradicional (feed infinito que induz o binge-watching), o IntentFlow precisa preencher esse orçamento de tempo com a combinação de maior valor pedagógico e prioridade selecionada pelo usuário.

## Decisão
Implementar a seleção de vídeos como uma instância do **Problema da Mochila 0/1 (0/1 Knapsack)** resolvido por programação dinâmica:
- **Capacidade (W)**: orçamento de tempo em minutos informado pelo usuário.
- **Peso do item (w_i)**: duração do vídeo em minutos (`Math.ceil(segundos / 60)`).
- **Valor do item (v_i)**: prioridade do canal (1 a 5) somada a modificadores (ex: bônus para vídeos ainda não assistidos).
- **Complexidade**: $O(n \times T)$, onde $n$ é o total de candidatos recentes e $T$ é o orçamento em minutos. Para $n \le 50$ e $T \le 180$, a execução leva frações de milissegundo.

## Consequências
- Fila finita previsível, garantindo que o usuário termine a sessão dentro da meta estabelecida.
- Usuário mantém o controle: pode substituir itens da fila preservando o teto de tempo.


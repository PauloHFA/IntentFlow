# ADR-006: Registro de Eventos de Reprodução e Tempo Assistido de Verdade

## Contexto
O IntentFlow mede a atenção real dedicada pelo estudante. Se o player estiver pausado ou se o usuário mudar de aba enquanto o vídeo toca, esse tempo não deve ser contabilizado como tempo de foco com intenção. Além disso, as políticas do YouTube vedam a renomeação de métricas nativas do YouTube (como views/likes) como se fossem proprietárias da aplicação.

## Decisão
1. **Medição estrita de presença e foco**:
   - O contador de segundos assistidos avança apenas quando o player está no estado 1 (`reproduzindo`) E a página/aba está visível (`document.visibilityState === 'visible'`).
   - Se o usuário pausar, minimizar ou alternar para outra janela, a contabilização de tempo assistido pausa imediatamente.
2. **Envio em lotes (batching)**:
   - Para evitar sobrecarga na rede e no banco, eventos de reprodução são agrupados no cliente e despachados periodicamente em lote (a cada 15 segundos) e no encerramento da sessão.
3. **Rotulagem transparente**:
   - Essa métrica é rotulada explicitamente na interface como "Tempo no seu histórico de sessão" ou "Atenção dedicada", nunca como "Tempo oficial do YouTube".

## Consequências
- Métricas honestas de foco para o estudante.
- Conformidade estrita com as políticas de integridade de métricas do YouTube.


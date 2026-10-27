# ADR-007: Experiência de Aprendizado Contínuo, Modo Zen e Atalhos de Produtividade

## Status
Aceito

## Contexto
O IntentFlow tem como proposta central substituir o consumo passivo de vídeos ("feed infinito") pelo estudo deliberado e ativo ("assistir com intenção"). Durante as sessões de estudo, o uso excessivo do mouse para pausar, retroceder ou anotar fragmenta o fluxo cognitivo (estado de *flow*). Além disso, anotações puramente textuais têm menor retenção a longo prazo do que o teste ativo de memória (*Active Recall*).

## Decisão de Arquitetura e UX

1. **Atalhos de Teclado Globais de Aprendizado (Keyboard-First)**:
   - `N`: Pula o foco diretamente para o campo de notas/flashcards e ancora o segundo exato (`currentTime`).
   - `Espaço` / `K`: Pausar / Continuar reprodução.
   - `J` / `L`: Retroceder / Avançar 10 segundos para rever explicações complexas.
   - `M`: Silenciar / Ativar áudio.
   - `Z`: Alternar para o **Modo Foco Zen**.
   - `C`: Alternar entre abas de Notas Ancoradas e Capítulos extraídos.
   - `?`: Abrir modal de ajuda de atalhos.
   - `Esc`: Sair do Modo Zen ou desfocar campo de digitação.
   *Garantia técnica*: Quando o usuário está digitando em `<input>` ou `<textarea>`, os atalhos de controle são suprimidos para evitar conflitos de digitação.

2. **Modo Foco Zen (Distraction-Free Cinema Mode)**:
   - Ativado via teclado (`Z`) ou botão na interface.
   - Oculta Navbar, Footer e métricas secundárias, convertendo a tela para um layout `slate-950` em tela cheia.
   - Divisão espacial áurea: 70% largura para o player oficial 16:9 e 30% para o bloco de notas/capítulos ancorados.

3. **Gerador de Flashcards Pergunta/Resposta para o SM-2 (Active Recall)**:
   - Permite ao estudante alternar entre *Nota Rápida* e *Flashcard SM-2*.
   - O flashcard armazena formalmente **Frente (Pergunta ou Conceito)** e **Verso (Explicação ou Resposta)**.
   - Integrado diretamente ao algoritmo SuperMemo SM-2 (`/api/revisao/hoje` e `/api/revisao/[id]`), maximizando a retenção na memória de longo prazo.

4. **Filtro de Profundidade & Intensidade na Mochila 0/1**:
   - Classificação por duração no momento da geração da playlist:
     - ⚡ *Conceitos Rápidos*: $\le 12$ min.
     - 🎯 *Práticos & Intermediários*: $12$ a $20$ min.
     - 📚 *Aprofundado / Masterclass*: $> 20$ min.
     - ⚪ *Misto*: Qualquer duração.
   - Aplica bônus de pontuação pedagógica ao resolver o Problema da Mochila 0/1.

5. **Celebração Multissensorial com Web Audio API Naitva e Confetes**:
   - Ao concluir a sessão de estudo com sucesso (`/sessao/[id]/resumo`) ou zerar a fila de revisões diárias (`/revisao`), o sistema dispara confetes (`canvas-confetti`) e um acorde harmônico suave em Dó Maior gerado nativamente via `AudioContext` do navegador.
   - Zero dependência de arquivos de áudio externos pesados (.mp3/.wav), garantindo carregamento instantâneo e offline.

## Consequências
- Aumento drástico na velocidade de anotação durante os vídeos.
- Redução de distrações visuais com o Modo Zen.
- Maior rigor pedagógico ao transformar notas em pares Pergunta/Resposta para repetição espaçada.


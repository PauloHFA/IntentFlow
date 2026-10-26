# ADR-004: OAuth fora do MVP

## Contexto
O login com Google OAuth (escopo de leitura de inscrições do YouTube) envolve verificação formal de consentimento pelo Google, configuração de credenciais sensíveis e fluxos de revogação de tokens. Para acelerar a validação do produto e viabilizar demonstração imediata do conceito, é prudente desacoplar o OAuth inicial.

## Decisão
No MVP (v1.0), o app suporta conta anônima/local (armazenada em cookie de sessão ou identificador anônimo gerado localmente), permitindo uso instantâneo sem fricção de cadastro. A importação de canais ocorre diretamente por digitação de @handle ou URL.
O suporte a Google OAuth para importar automaticamente as inscrições é delegado para a fase v2.

## Consequências
- Acelera o tempo de entrega do núcleo de valor do app.
- Zero atrito inicial para avaliadores e recrutadores que testarem a demonstração online.
- Arquitetura de dados já modelada com tabela `usuarios` com chave flexível (`id`, `nome`, `email` opcional).


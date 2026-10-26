# ADR-002: Política de Cache e Limite de 30 Dias (Conformidade com YouTube API)

## Contexto
Os Termos de Serviço dos Serviços de API do YouTube e Políticas para Desenvolvedores proíbem categoricamente armazenar dados da API por mais de 30 dias corridos sem renovação ou expurgo. Violações dessa regra podem acarretar revogação da chave de API e do projeto.

## Decisão
1. **Separação Rígida de Dados**: Dados do YouTube (título, descrição, duração, thumbnails, uploads) residem exclusivamente na tabela/camada de cache (`cache_youtube`) com campo de expiração (`expira_em`). Nenhuma tabela do usuário armazena metadados do YouTube além dos IDs de referência necessários (`channel_id`, `video_id`).
2. **TTLs Curtos**:
   - Dados de canal: 24 horas a 7 dias (bem abaixo de 30 dias).
   - Lista de uploads recentes: 30 a 120 minutos.
   - Metadados do vídeo: 1 a 7 dias.
3. **Rotina de Expurgo**: O sistema executa expurgo automático diário de entradas com `expira_em < NOW()` ou criadas há mais de 30 dias.
4. **Teste Automatizado de Conformidade**: Teste de unidade / integração que falha automaticamente se houver qualquer registro retornado ou armazenado com idade superior a 30 dias.

## Consequências
- Total conformidade com as diretrizes do Google / YouTube.
- Proteção da saúde da cota através de reutilização inteligente dos dados durante a janela de validade.


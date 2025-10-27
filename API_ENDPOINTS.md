## Documentação dos Endpoints — Plantonize BFF

Esta documentação descreve todos os endpoints expostos pelo BFF localizado em `src/routes` e como eles proxyam/integram com os microserviços e Azure Functions configurados.

Base URL do BFF (por padrão):
- http://localhost:3000/api

Variáveis de ambiente importantes (em `.env`):
- UPSTREAM_BASE_URL — URL base do microserviço principal (por padrão `https://localhost:44301/`).
- FUNCTIONS_BASE_URL — URL base das Azure Functions (por padrão `https://localhost:44301/`).
- PLANTAO_BASE_URL — URL base para Plantonize.Plantao (por padrão `https://localhost:7073/`).
- AZURE_AD_TENANT_ID, AZURE_AD_CLIENT_ID — configuram validação JWT via Azure AD (se presentes as rotas protegidas exigirão um token válido).

Autenticação
- A maior parte das rotas de recurso estão protegidas pelo middleware `azureAuth` (se AZURE_AD_* configurado). Em desenvolvimento, se essas variáveis não estiverem definidas, o middleware é noop.
- Para chamadas autenticadas: Header `Authorization: Bearer {token}` (token JWT emitido pelo Azure AD com audience igual a `AZURE_AD_CLIENT_ID`).

Formato de erro padrão
- O BFF repassa erros do upstream. Em geral, responses de erro retornam JSON com `status` HTTP apropriado e uma `message`/`detail`.

----

## Endpoints Gerais

### GET /api/health
- Descrição: Health check do BFF.
- Headers: nenhum
- Response 200:
```json
{ "status": "ok", "uptime": 123.45, "timestamp": 1630000000000 }
```

### GET /api/proxy
- Descrição: Exemplo de rota proxied (usa `src/controllers/proxyController.js`). Está protegida pelo middleware `requireAuth` (placeholder).
- Headers: Authorization Bearer (se `requireAuth` ativo)

----

## Notas Fiscais (NotasFiscais)
Base: /api/notasfiscais

### GET /api/notasfiscais
- Descrição: Busca todas as notas (proxy para microserviço upstream).
- Query params: opcionalmente filtros que o upstream suporte.
- Headers: Authorization (se AZURE AD configurado)
- Response 200: array de objetos Nota Fiscal (repasse do upstream).

### GET /api/notasfiscais/:id
- Descrição: Busca uma nota por id (proxy para upstream). Suporta agregação com Function.
- Query params:
  - includeFunction=true|1 — se presente e `FUNCTIONS_BASE_URL` configurado, o BFF chama também a Function `/notasfiscais/{id}` e retorna ambos os resultados combinados.
- Response 200 (padrão): objeto Nota Fiscal (retornado pelo microserviço)
- Response 200 (com includeFunction):
```json
{ "microservice": { /* nota do microservico */ }, "function": { /* dado da function */ } }
```

### GET /api/notasfiscais/:id/exists
- Descrição: Retorna true/false se a nota existe (proxy para upstream).

### GET /api/notasfiscais/medico/:medicoId
- Descrição: Busca notas por medicoId.

### POST /api/notasfiscais
- Descrição: Cria uma nota fiscal no microserviço upstream.
- Body: JSON com os campos da nota (veja API_DOCUMENTATION_NF.md para formato completo).
- Comportamento adicional: após criar no microserviço, o BFF envia um evento HTTP POST para a Function em `${FUNCTIONS_BASE_URL}/events/notasfiscais` com payload `{ event: 'created', data: created }`. Essa chamada é não-bloqueante (não impede resposta ao cliente).
- Response 201: recurso criado (retorno do upstream)

### PUT /api/notasfiscais/:id
- Descrição: Atualiza nota no microserviço.
- Body: JSON com campos atualizados.
- Comportamento adicional: BFF envia evento `{ event: 'updated', data: updated }` para `${FUNCTIONS_BASE_URL}/events/notasfiscais` (não-bloqueante).

### DELETE /api/notasfiscais/:id
- Descrição: Deleta nota no microserviço (proxy).
- Comportamento adicional: envia evento `{ event: 'deleted', data: { id } }` para a Function (não-bloqueante).

----

## Faturas
Base: /api/faturas

### GET /api/faturas
- Descrição: Lista faturas (proxy upstream).

### GET /api/faturas/:id
- Descrição: Busca fatura por id.

### GET /api/faturas/medico/:medicoId
- Descrição: Lista faturas por medico.

### GET /api/faturas/:id/exists
- Descrição: Verifica existência.

### POST /api/faturas
- Descrição: Cria fatura no microserviço upstream. Body: JSON com campos de fatura.

### PUT /api/faturas/:id
- Descrição: Atualiza fatura.

### DELETE /api/faturas/:id
- Descrição: Remove fatura.

----

## Municipios Aliquota
Base: /api/municipiosaliquota

### GET /api/municipiosaliquota
- Descrição: Lista todos municipios e suas alíquotas.

### GET /api/municipiosaliquota/:id
- Descrição: Busca por ID.

### GET /api/municipiosaliquota/codigo/:codigoMunicipio
- Descrição: Busca por código do município (IBGE).

### GET /api/municipiosaliquota/:id/exists
- Descrição: Verifica existência por id.

### GET /api/municipiosaliquota/codigo/:codigoMunicipio/exists
- Descrição: Verifica existência por código.

### POST /api/municipiosaliquota
- Cria um novo registro de municipio/aliquota.

### PUT /api/municipiosaliquota/:id
- Atualiza registro.

### DELETE /api/municipiosaliquota/:id
- Remove registro.

----

## Impostos Resumo
Base: /api/impostosresumo

### GET /api/impostosresumo
- Lista resumos.

### GET /api/impostosresumo/:id
- Busca por id.

### GET /api/impostosresumo/medico/:medicoId
- Lista resumos por medico.

### GET /api/impostosresumo/medico/:medicoId/periodo?mes={mes}&ano={ano}
- Recupera resumo por medico e período (query params mes e ano obrigatórios).

### GET /api/impostosresumo/:id/exists
- Verifica existência.

### POST /api/impostosresumo
- Cria um resumo manualmente (body com campos do resumo).

### PUT /api/impostosresumo/:id
- Atualiza resumo.

### DELETE /api/impostosresumo/:id
- Remove resumo.

### POST /api/impostosresumo/calcular?medicoId={id}&mes={mes}&ano={ano}
- Descrição: Endpoint poderoso que solicita ao microserviço (via upstream) calcular automaticamente o resumo de impostos para o médico e período indicados.
- Query params: medicoId (UUID), mes (1-12), ano (YYYY).
- Response: objeto de resumo calculado.

----

## Plantonize.Plantao (Plantao)
Base: /api/plantao

Observação: o BFF mapeia para `PLANTAO_BASE_URL` (por padrão `https://localhost:7073/`). Os paths exatos no upstream foram assumidos como `/plantao` para operações CRUD. Ajuste no controller se o upstream usa paths diferentes.

### GET /api/plantao
- Proxy para GET `${PLANTAO_BASE_URL}/` (ou lista de plantões conforme o upstream).

### GET /api/plantao/:id
- Proxy para GET `${PLANTAO_BASE_URL}/plantao/:id`.

### GET /api/plantao/:id/exists
- Proxy para existência `${PLANTAO_BASE_URL}/plantao/:id/exists`.

### POST /api/plantao
- Cria recurso em `${PLANTAO_BASE_URL}/plantao`.

### PUT /api/plantao/:id
- Atualiza recurso em `${PLANTAO_BASE_URL}/plantao/:id`.

### DELETE /api/plantao/:id
- Deleta recurso em `${PLANTAO_BASE_URL}/plantao/:id`.

----

## Comportamento de proxy e cabeçalhos
- O BFF usa `axios` para chamar os upstreams. Cabeçalhos padrão incluem `Content-Type: application/json`.
- Se `UPSTREAM_API_KEY` estiver configurado, o BFF adiciona header `x-api-key: {UPSTREAM_API_KEY}` nas chamadas ao microserviço (`upstreamService`).
- Autorização: o BFF valida o JWT no header `Authorization` quando `azureAuth` está habilitado. O BFF não reescreve automaticamente o header quando chama upstream, mas você pode propagar `Authorization` (ajuste `upstreamService` se desejar).

## Observações operacionais
- TLS local: se os serviços upstream (44301, 7073) usam certificados autoassinados, o Node/Axios pode rejeitar a conexão. Para desenvolvimento você pode usar `NODE_TLS_REJECT_UNAUTHORIZED=0` (não recomendado em produção) ou configurar Axios para aceitar certificado local.
- Entrega de eventos: notificações para Functions são não-bloqueantes — o BFF não falhará o request do cliente se a chamada à Function falhar; isso evita impactar a experiência do usuário.
- Garantia de entrega: se precisar de entrega garantida, recomendo usar uma fila (Azure Service Bus, Storage Queue) ou implementar retries + dead-letter.

## Mapeamento de código (onde procurar)
- Rotas: `src/routes/*.js`
  - `notasfiscais.js`, `faturas.js`, `municipiosaliquota.js`, `impostosresumo.js`, `plantao.js`, `index.js`
- Controllers: `src/controllers/*Controller.js`
- Serviços de chamada externa: `src/services/upstreamService.js`, `src/services/functionsService.js`, `src/services/plantaoService.js`
- Middleware de autenticação: `src/middleware/azureAuth.js` (jwks-rsa + jsonwebtoken)

----

## Exemplos rápidos (PowerShell)

- GET notas agregada (microservice + function):
```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/api/notasfiscais/{id}?includeFunction=true' -Method GET -Headers @{ Authorization = 'Bearer {token}' }
```

- Criar nota e notificar function (o BFF fará a notificação automaticamente):
```powershell
$body = @{ numeroNota='NF-1'; valorTotal=1000 } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3000/api/notasfiscais' -Method POST -Body $body -ContentType 'application/json' -Headers @{ Authorization = 'Bearer {token}' }
```

----

Se quiser, eu posso:
- Gerar um arquivo Swagger/OpenAPI automaticamente a partir das rotas (posso esboçar o spec YML/JSON e adicioná-lo ao projeto).
- Gerar exemplos de request/responses mais completos com os schemas exatos (preciso dos schemas ou confirmar que usemos os exemplos do `API_DOCUMENTATION_NF.md`).
- Criar um mock server local em 7073 e 44301 para testar integração end-to-end.

Fim da documentação.

# Backend — Plano de Implementação (Fastify)

**Data:** 2026-03-10
**Status:** Planejado — não iniciado

## Stack

| Dependência | Uso |
|---|---|
| `fastify@^4` | Framework HTTP principal |
| `@fastify/cors` | CORS |
| `@fastify/multipart` | Upload multipart/form-data |
| `@fastify/rate-limit` | Rate limiting por IP |
| `@fastify/helmet` | Headers de segurança HTTP |
| `@fastify/sensible` | httpErrors helpers |
| `@prisma/client` | ORM — PostgreSQL |
| `zod` | Validação de campos multipart |
| `env-schema` | Validação de variáveis de ambiente |
| `file-type` | Validação de MIME por magic bytes |

Dev: `prisma`, `nodemon`, `dotenv-cli`

## Estrutura de Pastas

```
backend/
├── src/
│   ├── server.js
│   ├── app.js
│   ├── config/env.js
│   ├── plugins/
│   │   ├── prisma.js
│   │   ├── multipart.js
│   │   └── upload.js
│   ├── modules/
│   │   ├── banco-talentos/
│   │   │   ├── routes.js
│   │   │   ├── schema.js
│   │   │   └── service.js
│   │   └── vagas/
│   │       ├── routes.js
│   │       ├── schema.js
│   │       └── service.js
│   └── shared/
│       ├── errors.js
│       ├── slugify.js
│       └── fileStorage.js
├── uploads/curriculos/            # gitignored
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env                           # nunca comitado
├── .env.example
├── package.json
└── ecosystem.config.js
```

## Banco de Dados (PostgreSQL)

### Tabelas

- **Vaga** — slug (unique), titulo, empresa, area, nivel, regime, modalidade, localidade, salario, descricao, requisitos[], beneficios[], destaque, status (ATIVA/INATIVA/ENCERRADA), dataPublicacao
- **Candidatura** — vagaId (FK), nome, email, telefone, mensagem?, curriculo? (path relativo)
- **BancoTalentos** — nome, email, telefone, areaInteresse, pretensaoSalarial?, linkedin?, resumo, curriculo (obrigatório), expiraEm (criadoEm + 2 anos, LGPD)

### Enums

- `NivelVaga`: JUNIOR | PLENO | SENIOR
- `RegimeVaga`: CLT | PJ | ESTAGIO | TEMPORARIO | FREELANCE
- `ModalidadeVaga`: PRESENCIAL | HIBRIDO | REMOTO
- `StatusVaga`: ATIVA | INATIVA | ENCERRADA

## Endpoints REST

Prefixo: `/api/v1`

### Vagas (público)

| Método | Path | Descrição |
|---|---|---|
| GET | `/vagas` | Lista vagas ativas — query: busca, area, nivel, modalidade, page, limit |
| GET | `/vagas/:slug` | Detalhe da vaga |
| POST | `/vagas/:slug/candidatura` | Candidatura — multipart: nome, email, telefone, mensagem?, curriculo? |

### Banco de Talentos

| Método | Path | Descrição |
|---|---|---|
| POST | `/banco-talentos` | Cadastro — multipart: nome, email, telefone, areaInteresse, resumo, pretensaoSalarial?, linkedin?, curriculo (obrigatório) |

### Health Check

| Método | Path | Descrição |
|---|---|---|
| GET | `/api/health` | Status do servidor |

## Upload de Arquivos

- Armazenamento: disco local na VPS em `/var/www/unigestao-uploads/curriculos/`
- Nome no disco: `{uuid}.{ext}` — nunca o nome original (segurança)
- MIME validado via magic bytes (`file-type`) — não confiar no Content-Type do cliente
- Tipos aceitos: PDF, DOC, DOCX
- Tamanho máximo: 5 MB (configurado no plugin multipart, rejeita com 413 antes de salvar)
- Path relativo salvo no banco: `curriculos/{uuid}.pdf`
- Diretório NÃO servido pelo Nginx nem pelo Fastify

## Variáveis de Ambiente

```bash
NODE_ENV=production
PORT=3334
HOST=127.0.0.1
DATABASE_URL=postgresql://unigestao_user:SENHA@localhost:5432/unigestao
UPLOAD_DIR=/var/www/unigestao-uploads
CORS_ORIGIN=https://uni.gleetalentos.com.br
```

## Segurança

- CORS: apenas `https://uni.gleetalentos.com.br` em produção + `localhost:5173` em dev
- Rate limit geral: 60 req/min por IP
- Rate limit dos endpoints de POST: 5 req/10min por IP
- Helmet: headers de segurança HTTP
- HOST=127.0.0.1: Fastify só escuta no loopback, Nginx faz proxy
- Nginx: `client_max_body_size 6M` (acima do limite do app para erro consistente)

## PM2

- Nome do processo: `unigestao-api`
- Porta: `3334`
- Modo: `fork` (1 instância — VPS compartilhada)
- Logs: `/var/log/pm2/unigestao-api-*.log`

## Ordem de Implementação

### Fase 1 — Fundação
1. `npm init`, instalar dependências
2. `app.js` + `server.js` + CORS + helmet + rate-limit
3. `config/env.js` com validação
4. Endpoint `GET /api/health` — validar proxy Nginx

### Fase 2 — Banco de Dados
5. `prisma/schema.prisma` com as 3 entidades
6. PostgreSQL na VPS: criar usuário e banco
7. `prisma migrate dev --name init`
8. Plugin `src/plugins/prisma.js`

### Fase 3 — Banco de Talentos
9. Plugin `multipart.js` com limites
10. `shared/fileStorage.js` — salvar arquivo no disco
11. `banco-talentos/schema.js` (Zod), `service.js`, `routes.js`
12. Testar com Insomnia → integrar frontend (descomentar `bancoTalentosService.js`)

### Fase 4 — Vagas
13. `vagas/service.js` — listagem com filtros + paginação + detalhe por slug
14. `vagas/routes.js` — GET e candidatura
15. Seed: migrar dados mockados de `frontend/src/data/vagas.js` para o banco
16. Frontend: criar `vagasService.js` + hooks TanStack Query, remover dados mockados

### Fase 5 — Deploy e Hardening
17. `ecosystem.config.js` e PM2 na VPS
18. Atualizar `nginx.conf` — ativar bloco `/api/`
19. Criar `/var/www/unigestao-uploads/curriculos/` com permissões corretas
20. `.env` de produção na VPS (fora do git)
21. Teste ponta a ponta em produção
22. Atualizar `deploy.sh` para restart do PM2

## Decisões Técnicas

- **Fastify 4** (não 5): ecossistema de plugins mais maduro, v5 tem breaking changes
- **Prisma** (não Drizzle): migrations automáticas, schema como documentação, JSDoc typing
- **Disco local** (não S3/R2): VPS tem 193 GB, volume de CVs não representa risco por anos
- **upsert** no banco de talentos: se email já existe, atualiza silenciosamente (UX melhor que erro 409)
- **`instances: 1` no PM2**: VPS compartilhada, evitar consumo excessivo de cores

---

## Fase 6 — Autenticação e Painel Admin

### Decisão: JWT sem refresh token

Access token JWT (HS256), expiração 8h, armazenado no localStorage do painel admin. Adequado para 1-2 usuários admin sem necessidade de refresh token.

### Novas dependências

| Dependência | Uso |
|---|---|
| `@fastify/jwt` | Plugin JWT oficial — decorator `autenticar` + `request.jwtVerify()` |
| `bcrypt` | Hash de senha — `SALT_ROUNDS = 12` (~250ms) |

### Nova tabela: Usuario

```prisma
model Usuario {
  id          String      @id @default(cuid())
  email       String      @unique
  nome        String
  senhaHash   String
  role        RoleUsuario @default(ADMIN)
  ativo       Boolean     @default(true)
  criadoEm   DateTime    @default(now())
  ultimoLogin DateTime?
  @@map("usuarios")
}

enum RoleUsuario { ADMIN  SUPER_ADMIN }
```

### Endpoints de Auth — `/api/v1/auth` (público)

| Método | Path | Descrição |
|---|---|---|
| POST | `/auth/login` | email + senha → JWT (rate limit: 5 req/15min) |
| POST | `/auth/logout` | client-side — registro de logout |
| GET | `/auth/me` | dados do usuário logado |
| PUT | `/auth/senha` | troca senha (requer senha atual) |

### Endpoints Admin — `/api/v1/admin` (JWT obrigatório via `addHook`)

**Vagas (CRUD):**

| Método | Path | Descrição |
|---|---|---|
| GET | `/admin/vagas` | Todas as vagas (inclui INATIVA/ENCERRADA) |
| POST | `/admin/vagas` | Criar vaga |
| PUT | `/admin/vagas/:id` | Atualizar vaga |
| PATCH | `/admin/vagas/:id/status` | Mudar status (operação frequente) |
| DELETE | `/admin/vagas/:id` | Encerrar vaga (soft delete preferido) |

**Candidaturas:**

| Método | Path | Descrição |
|---|---|---|
| GET | `/admin/vagas/:id/candidaturas` | Listagem por vaga |
| GET | `/admin/candidaturas/:id/curriculo` | Servir PDF (stream autenticado) |

**Banco de Talentos:**

| Método | Path | Descrição |
|---|---|---|
| GET | `/admin/banco-talentos` | Listagem com busca por nome/email/área |
| GET | `/admin/banco-talentos/:id/curriculo` | Servir PDF (stream autenticado) |
| DELETE | `/admin/banco-talentos/:id` | Direito ao esquecimento (LGPD) |

**Dashboard:**

| Método | Path | Descrição |
|---|---|---|
| GET | `/admin/dashboard` | Stats: vagas ativas, candidaturas 7d/30d, total banco |

### Nova variável de ambiente

```bash
JWT_SECRET=<64 chars hex — gerar com: openssl rand -hex 32>
```

### Criação do primeiro admin

Script interativo (nunca persistido em arquivo ou git):

```bash
node backend/scripts/create-admin.js
```

### Estrutura de pastas adicional

```
backend/src/
├── plugins/
│   └── jwt.js                     # decorator `autenticar`
├── modules/
│   ├── auth/                      # routes, schema (Zod), service
│   └── admin/
│       ├── routes.js              # addHook preHandler autenticar
│       ├── vagas/
│       ├── candidaturas/
│       ├── banco-talentos/
│       └── dashboard/
└── scripts/
    └── create-admin.js
```

### Painel Admin no Frontend

Opção escolhida: **rotas protegidas no mesmo React** (HashRouter, mesma SPA).

- Componente `RotaProtegida` — redireciona para `/admin/login` se sem token
- Páginas lazy-loaded: `Admin/Login`, `Admin/Dashboard`, `Admin/Vagas`, `Admin/Candidaturas`, `Admin/BancoTalentos`
- `api.js` — interceptor de request (injeta `Authorization: Bearer`) e response (trata 401 → redirect login)
- Token: `localStorage.getItem('uni_admin_token')`

### Ordem de implementação (Fase 6)

**6a — Backend:**
1. Instalar `@fastify/jwt` e `bcrypt`
2. `JWT_SECRET` no `config/env.js` e `.env.example`
3. `src/plugins/jwt.js` — decorator `autenticar`
4. `src/modules/auth/` — login, logout, me, troca de senha
5. `src/modules/admin/` — todos os sub-módulos
6. `scripts/create-admin.js` → executar na VPS

**6b — Frontend:**
7. `authService.js`, `useAuth.js`, interceptors no `api.js`
8. `RotaProtegida` + `AdminLayout`
9. Páginas admin com `React.lazy`
10. Rotas `/admin/*` no `App.jsx`

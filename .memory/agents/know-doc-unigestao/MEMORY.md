# Documentação UNI — Agent Memory

## Última atualização: 2026-03-10

## Documentos Existentes em docs/

- `docs/frontend-descricao.md` — mapeamento de páginas planejadas
- `docs/progresso.md` — status completo de implementação (atualizado em 2026-03-10)
- `docs/backend-plano.md` — plano completo do backend: stack, estrutura, endpoints, fases
- `docs/decisoes/ADR-001-backend-fastify-prisma.md` — decisão de stack backend
- `docs/pacote-completo.html` — flyer promocional de identidade visual

## Estado atual resumido

**Frontend:** 9 rotas implementadas (Home, Sobre, Serviços, Vagas, VagaDetalhe, Contato, BancoTalentos, PoliticaPrivacidade, NotFound/404). 3 páginas faltando (/processo-seletivo, /blog, /blog/:slug). Deploy em produção em https://uni.gleetalentos.com.br.
**Backend:** planejado (stack definida), não iniciado (pasta não existe).
**Infra:** VPS Contabo `144.91.95.180`, Nginx + SSL configurados.

## Versões reais (verificadas no package.json)

- React **19.2.0** (não 18.x — CLAUDE.md foi corrigido em 2026-03-10)
- Vite 7.x, React Router DOM 6.20.0
- date-fns 4.1.0 — dependência existente, não estava no CLAUDE.md

## ADRs Registrados

| ADR | Título | Status |
|---|---|---|
| ADR-001 | Backend: Fastify 4 + Prisma + PostgreSQL | aceito |
| ADR-002 | Autenticação JWT sem refresh token (painel admin) | aceito |

## Decisões Técnicas Conhecidas (ainda sem ADR formal)

- **HashRouter** — SPA sem backend de rotas (trade-off: SEO ruim via `#`)
- **CSS Modules** para páginas, **CSS global** para design system base
- **Dados mockados** em `src/data/` enquanto backend não existe
- **npm** como package manager (não bun), `--legacy-peer-deps` obrigatório
- **VPS compartilhada** com gleetalentos.com.br — configs sempre isoladas
- **TanStack Query** já tem uso real via `useBancoTalentos` (mutation)
- **`services/api.js`** existe com instância axios centralizada + interceptor

## Backend — Stack Definida (2026-03-10)

- Framework: **Fastify 4** (não 5 — breaking changes nos plugins)
- ORM: **Prisma** (não Drizzle — migrations mais maduras)
- Banco: **PostgreSQL** na VPS (porta 5432, usuário `unigestao_user`, DB `unigestao`)
- API porta: **3334** (loopback apenas, Nginx faz proxy)
- Upload: disco local `/var/www/unigestao-uploads/curriculos/` — uuid como nome de arquivo
- PM2: processo `unigestao-api`, modo fork (1 instância)
- Próximo passo: Fase 1 — setup Fastify + health check

## Agentes Existentes

| Agente | Arquivo |
|---|---|
| design-ui-ux | `.claude/agents/design-ui-ux.md` |
| dev-fe-unigestao | `.claude/agents/dev-fe-unigestao.md` |
| dev-ops-deploy | `.claude/agents/dev-ops-deploy.md` |
| know-doc-unigestao | `.claude/agents/know-doc-unigestao.md` |

## Guias Criados

_Nenhum ainda. Criar `docs/guias/como-rodar.md` após Fase 1 do backend._

## Fase 6 — Autenticação e Painel Admin (planejado em 2026-03-10)

- Backend (6a): `@fastify/jwt` + `bcrypt`, plugin `jwt.js`, módulo `auth/`, módulo `admin/` (vagas CRUD, candidaturas, banco-talentos, dashboard), script `create-admin.js`
- Frontend (6b): `authService.js`, `useAuth.js`, `RotaProtegida`, `AdminLayout`, páginas admin lazy-loaded via `React.lazy`, rotas `/admin/*` no `App.jsx`
- Token: JWT HS256, 8h, `localStorage` (`uni_admin_token`)
- Nova tabela no Prisma: `Usuario` (email, senhaHash, role, ativo, ultimoLogin)
- Nova env var: `JWT_SECRET` (64 chars hex)
- Painel admin: rotas protegidas no mesmo React (HashRouter), não aplicação separada

## Pendências de Documentação

1. Criar `docs/decisoes/ADR-003-hashrouter.md` (HashRouter — SEO trade-off) — renumerado pois ADR-002 foi usado para auth
2. Criar `docs/guias/como-rodar.md` após Fase 1 do backend
3. Atualizar `progresso.md` conforme cada fase do backend for concluída

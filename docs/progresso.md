# Progresso — UNI Gestão de Pessoas

**Última atualização:** 2026-03-10 (backend planejado)

---

## Infraestrutura / Deploy

| Item | Status | Observações |
|---|---|---|
| VPS (Contabo) | ✅ | Ubuntu 24.04.3, 6 cores, 11 GB RAM, 193 GB disco |
| Nginx | ✅ | Config isolada em `/etc/nginx/sites-available/unigestao` |
| SSL / HTTPS | ✅ | Let's Encrypt, válido até 2026-06-09, renovação automática |
| Domínio | ✅ | https://uni.gleetalentos.com.br |
| Deploy frontend | ✅ | rsync → `/var/www/unigestao/` → Nginx serve estático |
| Node.js / PM2 | ⬜ | Não necessário ainda — aguarda backend |
| PostgreSQL | ⬜ | Não necessário ainda — aguarda backend |

> VPS compartilhada com gleetalentos.com.br. Configs sempre isoladas — nunca editar arquivos do gleetalentos.

---

## Frontend (`frontend/`)

### Infraestrutura

| Item | Status | Observações |
|---|---|---|
| Setup Vite 7 + React 19 | ✅ | npm (não bun), `--legacy-peer-deps` no install |
| CSS Custom Properties | ✅ | `globals.css` — tokens completos: cores, espaçamentos, sombras, radius |
| CSS Modules | ✅ | Páginas e layout com `.module.css` |
| CSS global | ✅ | `components.css` — design system base (btn, badge, card, form) |
| Roteamento HashRouter | ✅ | React Router DOM 6.20.0 |
| Lazy loading de páginas | ✅ | Todas as rotas usam `React.lazy` + `Suspense` |
| TanStack Query | ✅ | Configurado em `main.jsx`; usado ativamente via `useBancoTalentos` |
| axios | ✅ | `services/api.js` criado com instância centralizada e interceptor de erros |
| lucide-react | ✅ | Instalado e em uso |
| date-fns | ✅ | Instalado (v4.1.0) — disponível para formatação de datas |
| Integração real com backend | ⬜ | `bancoTalentosService` simula delay — aguarda backend |
| SEO (meta tags, OG) | ⬜ | Nenhuma página tem meta tags |
| Favicon | ⬜ | Referenciado no `index.html`, arquivo não criado |

### Componentes Base (`src/components/ui/`)

| Componente | Status | Observações |
|---|---|---|
| Button | ✅ | Variantes: primary, secondary, accent, ghost, white, outline-white. Sizes: sm, md, lg, xl. Suporta `to` (Link), `href` (a) |
| Badge | ✅ | Variantes: primary, yellow, orange, success, muted |
| Card | ✅ | Card, CardBody, CardHeader, CardFooter |
| Logo | ✅ | SVG inline, variantes: horizontal, vertical, icon. Sizes: sm, md, lg |

### Layout (`src/components/layout/`)

| Componente | Status | Observações |
|---|---|---|
| Header | ✅ | Sticky, scroll shadow, hamburger mobile, NavLink com active state |
| Footer | ⚠️ | Funcional — contraste de links/texto muted abaixo de WCAG AA |
| PageHero | ✅ | Componente reutilizável para hero de páginas secundárias (eyebrow, título, descrição) |

### Páginas

| Rota | Página | Status | Observações |
|---|---|---|---|
| `/` | Home | ✅ | Hero, Diferenciais, Como Funciona, Serviços Destaque, Stats, Depoimentos, Vagas Destaque, CTA Final |
| `/sobre` | Sobre | ✅ | Hero, História, MVV, Equipe, Números |
| `/servicos` | Serviços | ✅ | Hero, 5 serviços em layout alternado (grid 2 cols), CTA |
| `/vagas` | Vagas | ✅ | Hero, busca + filtros, grid de cards, banner CV espontâneo |
| `/vagas/:slug` | Vaga Detalhe | ✅ | Hero azul, conteúdo + sidebar sticky, outras vagas |
| `/contato` | Contato | ✅ | Hero, form com validação, info card sticky, FAQ |
| `/banco-talentos` | Banco de Talentos | ✅ | Formulário com upload de currículo (drag-and-drop), sidebar informativa, CTA para empresas. Integração simulada (sem backend) |
| `/politica-de-privacidade` | Política de Privacidade | ✅ | 12 seções LGPD, sidebar com índice navegável (IntersectionObserver), botão "voltar ao topo" |
| `*` | 404 Not Found | ✅ | Página de erro simples com links para Home e Vagas |
| `/processo-seletivo` | Processo Seletivo | ⬜ | Timeline detalhada das etapas de R&S |
| `/blog` | Blog | ⬜ | Listagem de artigos com filtro por categoria |
| `/blog/:slug` | Post do Blog | ⬜ | Artigo individual |
| `/proposta` | Solicitar Proposta | ⬜ | Formulário para empresas (opcional) |

### Services (`src/services/`)

| Arquivo | Status | Observações |
|---|---|---|
| `api.js` | ✅ | Instância axios centralizada; lê `VITE_API_URL` do env; interceptor global de erros |
| `bancoTalentosService.js` | ⚠️ | `cadastrar()` implementado com FormData; chamada real à API comentada; delay simulado de 1,8s enquanto backend não existe |

### Hooks (`src/hooks/`)

| Arquivo | Status | Observações |
|---|---|---|
| `useBancoTalentos.js` | ✅ | Wrapper de `useMutation` (TanStack Query) sobre `bancoTalentosService.cadastrar` |

### Dados Mockados (`src/data/`)

| Arquivo | Status | Observações |
|---|---|---|
| `vagas.js` | ✅ | 6 vagas mockadas com slug, área, nível, regime, modalidade, requisitos, benefícios |
| `depoimentos.js` | ✅ | 3 depoimentos |
| `equipe.js` | ✅ | 3 membros da equipe |

### Qualidade / Acessibilidade

| Item | Status | Observações |
|---|---|---|
| Focus ring (`:focus-visible`) | ❌ | Ausente em todos os componentes interativos — falha crítica WCAG 2.1 AA |
| Contraste footer | ❌ | Links: ~3.1:1 / Texto muted: ~2.6:1 — ambos abaixo de 4.5:1 |
| ARIA (`aria-label`, `role`) | ⚠️ | Presente em BancoTalentos (upload area, erros) e PoliticaPrivacidade. Faltando em outros pontos |
| `prefers-reduced-motion` | ⬜ | Não implementado |
| Responsividade | ⚠️ | Breakpoints 1024px e 768px OK; falta 480px |
| Imagens | ⚠️ | URLs externas (Pexels) — sem fallback, sem lazy load consistente |

---

## Backend (`backend/`)

> Stack definida: **Fastify 4 + Prisma + PostgreSQL**. Ver `docs/backend-plano.md` e `docs/decisoes/ADR-001-backend-fastify-prisma.md`.

### Fase 1 — Fundação

| Módulo | Status | Observações |
|---|---|---|
| Setup Fastify + plugins base | ⬜ | Fase 1 — CORS, helmet, rate-limit |
| Validação de env + health check | ⬜ | Fase 1 — `config/env.js`, `GET /api/health` |

### Fase 2 — Banco de Dados

| Módulo | Status | Observações |
|---|---|---|
| Schema Prisma + migrations | ⬜ | Fase 2 — entidades: Vaga, Candidatura, BancoTalentos |
| Plugin Prisma | ⬜ | Fase 2 — `src/plugins/prisma.js` |

### Fase 3 — Banco de Talentos

| Módulo | Status | Observações |
|---|---|---|
| Upload multipart (fileStorage) | ⬜ | Fase 3 — disco local, uuid, validação MIME magic bytes |
| Módulo Banco de Talentos | ⬜ | Fase 3 — `POST /api/v1/banco-talentos`, upsert por email |

### Fase 4 — Vagas

| Módulo | Status | Observações |
|---|---|---|
| Módulo Vagas — listagem + detalhe | ⬜ | Fase 4 — `GET /api/v1/vagas`, `GET /api/v1/vagas/:slug` |
| Módulo Vagas — candidatura | ⬜ | Fase 4 — `POST /api/v1/vagas/:slug/candidatura` |
| Seed de vagas (migrar mockados) | ⬜ | Fase 4 — migrar `frontend/src/data/vagas.js` para o banco |

### Fase 5 — Deploy e Hardening

| Módulo | Status | Observações |
|---|---|---|
| PM2 + deploy VPS | ⬜ | Fase 5 — processo `unigestao-api`, porta 3334, modo fork |
| Nginx proxy /api/ | ⬜ | Fase 5 — ativar bloco `/api/` no nginx.conf |

### Fase 6 — Autenticação e Painel Admin

| Módulo | Status | Observações |
|---|---|---|
| Auth — login JWT (backend) | ⬜ | Fase 6a |
| Auth — rotas admin protegidas | ⬜ | Fase 6a |
| Módulo Admin — vagas CRUD | ⬜ | Fase 6a |
| Módulo Admin — candidaturas | ⬜ | Fase 6a |
| Módulo Admin — banco de talentos | ⬜ | Fase 6a |
| Módulo Admin — dashboard stats | ⬜ | Fase 6a |
| Frontend — painel admin (React) | ⬜ | Fase 6b |

---

## Agentes Claude Code (`.claude/agents/`)

| Agente | Responsabilidade |
|---|---|
| `design-ui-ux` | Identidade visual, componentes, layouts, acessibilidade |
| `dev-fe-unigestao` | Frontend React/Vite — componentes, páginas, hooks, CSS |
| `dev-ops-deploy` | Deploy na VPS, Nginx, PM2, SSL, banco |
| `know-doc-unigestao` | Documentação, progresso, ADRs, guias |

---

## Pendências Prioritárias

1. **Urgente — Acessibilidade:** `:focus-visible` global + corrigir contraste do footer
2. **Backend — Fase 1:** iniciar implementação (stack definida: Fastify 4 + Prisma + PostgreSQL)
3. **SEO:** meta tags e OG tags em todas as páginas
4. **`prefers-reduced-motion`:** adicionar ao CSS global
5. **Favicon:** criar e adicionar ao projeto
6. **Páginas faltando:** `/processo-seletivo`, `/blog`
7. **Imagens:** substituir URLs externas por assets locais ou CDN próprio

---

## Legenda

| Ícone | Significado |
|---|---|
| ✅ | Feito / funcional |
| 🔄 | Em andamento |
| ⚠️ | Parcial — funciona mas tem pendências |
| ⬜ | Não iniciado |
| ❌ | Problema crítico / bloqueado |

---
name: doc-padroes
description: "Padrões de documentação do projeto UNI Gestão de Pessoas. Use para gerar ou atualizar: progresso.md, ADRs, guias técnicos, inventário de componentes, e qualquer documento em docs/."
---

# Skill: Padrões de Documentação — UNI Gestão de Pessoas

Ao ser invocada, aplique os templates e regras abaixo para gerar ou atualizar documentação no projeto.

---

## Regras Gerais

1. **Idioma:** sempre em português brasileiro
2. **Tom:** direto, técnico, sem filler (sem "este documento descreve...")
3. **Datas:** formato `YYYY-MM-DD`
4. **Legenda de status** (usar em todas as tabelas de progresso):
   - `✅` Feito / funcional
   - `🔄` Em andamento
   - `⚠️` Parcial — funciona mas tem pendências conhecidas
   - `⬜` Não iniciado
   - `❌` Bloqueado / problema

---

## Template: `docs/progresso.md`

```markdown
# Progresso — UNI Gestão de Pessoas

**Última atualização:** {YYYY-MM-DD}

## Frontend (`frontend/`)

### Infraestrutura
| Item | Status | Observações |
|---|---|---|
| Setup Vite + React | ✅ | Vite 7, React 18 |
| CSS Custom Properties | ✅ | globals.css com tokens completos |
| Roteamento (HashRouter) | ✅ | React Router DOM 6 |
| TanStack Query | ⚠️ | Configurado, sem uso real (sem backend) |
| Integração com backend | ⬜ | Aguarda backend |

### Componentes Base (`src/components/ui/`)
| Componente | Status | Observações |
|---|---|---|
| Button | ✅ | Variantes: primary, secondary, accent, ghost, white, outline-white |
| Badge | ✅ | Variantes: primary, yellow, orange, success, muted |
| Card | ✅ | Card, CardBody, CardHeader, CardFooter |
| Logo | ✅ | SVG inline, variantes: horizontal, vertical, icon |

### Layout (`src/components/layout/`)
| Componente | Status | Observações |
|---|---|---|
| Header | ✅ | Sticky, scroll shadow, hamburger mobile |
| Footer | ✅ | Dark, 4 colunas, gradient |

### Páginas
| Rota | Página | Status | Observações |
|---|---|---|---|
| `/` | Home | ✅ | Hero, Diferenciais, Como Funciona, Serviços, Stats, Depoimentos, Vagas, CTA |
| `/sobre` | Sobre | ✅ | Hero, História, MVV, Equipe, Números |
| `/servicos` | Serviços | ✅ | 5 serviços em layout alternado |
| `/vagas` | Vagas | ✅ | Busca, filtros, grid de cards |
| `/vagas/:slug` | Vaga Detalhe | ✅ | Hero, conteúdo + sidebar sticky |
| `/contato` | Contato | ✅ | Form com validação, info card, FAQ |
| `/processo-seletivo` | Processo Seletivo | ⬜ | — |
| `/candidatos` | Candidatos | ⬜ | — |
| `/blog` | Blog | ⬜ | — |
| `/blog/:slug` | Post do Blog | ⬜ | — |
| `/proposta` | Solicitar Proposta | ⬜ | Opcional |

### Qualidade
| Item | Status | Observações |
|---|---|---|
| Acessibilidade (WCAG AA) | ⚠️ | Focus ring ausente, contraste do footer baixo, ARIA faltando |
| SEO (meta tags, OG) | ⬜ | Nenhuma página tem meta tags |
| Responsividade | ⚠️ | Breakpoints 1024px e 768px OK; falta 480px |
| `prefers-reduced-motion` | ⬜ | Não implementado |

---

## Backend (`backend/`)

| Módulo | Status | Observações |
|---|---|---|
| Setup inicial | ⬜ | Stack ainda não definida |

---

## Pendências Prioritárias

1. {pendência 1}
2. {pendência 2}
```

---

## Template: ADR (Architecture Decision Record)

Salvar em `docs/decisoes/ADR-{NNN}-{slug-do-titulo}.md`

```markdown
# ADR-{NNN} — {Título}

**Data:** {YYYY-MM-DD}
**Status:** `proposto` | `aceito` | `depreciado` | `substituído por ADR-{NNN}`
**Autores:** {quem tomou a decisão}

## Contexto

{O que estava acontecendo que exigiu esta decisão. Qual problema estava sendo resolvido.}

## Decisão

{O que foi decidido, de forma direta.}

## Alternativas Consideradas

- **{Alternativa A}** — {por que foi descartada}
- **{Alternativa B}** — {por que foi descartada}

## Consequências

**Positivas:**
- {benefício 1}

**Negativas / Trade-offs:**
- {trade-off 1}

## Referências

- {link ou arquivo relevante}
```

---

## Template: Guia Técnico

Salvar em `docs/guias/{nome-do-guia}.md`

```markdown
# {Título do Guia}

> {Uma frase descrevendo o que este guia cobre.}

## Pré-requisitos

- {Node 20+ / etc.}

## {Seção 1}

{Conteúdo direto, com blocos de código quando necessário.}

```bash
comando-exemplo
```

## {Seção 2}

...

## Problemas Comuns

| Problema | Solução |
|---|---|
| {erro X} | {como resolver} |
```

---

## Template: Inventário de Componentes

Salvar em `docs/componentes.md` ou incluir em `progresso.md`

```markdown
## Componentes (`src/components/`)

### UI Base (`ui/`)

#### `Button`
- **Arquivo:** `src/components/ui/Button.jsx`
- **Props:** `variant` (primary|secondary|accent|ghost|white|outline-white), `size` (sm|md|lg|xl), `to` (Link), `href` (a), `full` (boolean)
- **CSS:** `src/styles/components.css` → `.btn`, `.btn--*`

#### `Badge`
- **Arquivo:** `src/components/ui/Badge.jsx`
- **Props:** `variant` (primary|yellow|orange|success|muted)
- **CSS:** `src/styles/components.css` → `.badge`, `.badge--*`
```

---

## Quando Atualizar Cada Documento

| Evento | Documentos a atualizar |
|---|---|
| Nova página implementada | `progresso.md` |
| Novo componente criado | `progresso.md`, `componentes.md` |
| Decisão de arquitetura | `docs/decisoes/ADR-NNN.md`, `CLAUDE.md` se relevante |
| Bug crítico resolvido | `progresso.md` (observações) |
| Nova dependência adicionada | `CLAUDE.md` (stack), guia relevante |
| Backend iniciado | `progresso.md`, `CLAUDE.md` |
| Deploy / infra definida | novo guia em `docs/guias/` |

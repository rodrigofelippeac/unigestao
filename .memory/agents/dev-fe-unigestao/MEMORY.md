# Frontend UNI — Agent Memory

## Setup do Projeto

- `frontend/` inicializado com Vite 7 + React 18
- Node: usar `npm` (não bun)
- Dev server na porta padrão 5173 (ou 5174)
- Build funcional: `npm run build` passa sem erros

## Dependências Instaladas

- react-router-dom@6.20.0 (HashRouter)
- @tanstack/react-query@5.17.9
- axios@1.6.5
- lucide-react@0.294.0
- date-fns@4.1.0
- Instalação usou `--legacy-peer-deps` (necessário devido a conflitos)

## Estrutura de Arquivos Criados

```
src/
├── styles/
│   ├── globals.css      ← tokens CSS + reset + utilities
│   └── components.css   ← estilos de componentes base (btn, badge, card, form, etc.)
├── components/
│   ├── ui/
│   │   ├── Button.jsx   ← variantes: primary|secondary|accent|ghost|white|outline-white
│   │   ├── Badge.jsx    ← variantes: primary|yellow|orange|success|muted
│   │   ├── Card.jsx     ← Card, CardBody, CardHeader, CardFooter
│   │   └── Logo.jsx     ← SVG inline, variantes: horizontal|vertical, sizes: sm|md|lg
│   └── layout/
│       ├── Header.jsx + Header.module.css   ← sticky, scroll shadow, menu mobile
│       └── Footer.jsx + Footer.module.css   ← 4 colunas, gradient top, dark bg
├── pages/
│   ├── Home/          Home.jsx + Home.module.css
│   ├── Sobre/         Sobre.jsx + Sobre.module.css
│   ├── Servicos/      Servicos.jsx + Servicos.module.css
│   ├── Vagas/         Vagas.jsx + VagaDetalhe.jsx + módulos CSS
│   ├── Contato/       Contato.jsx + Contato.module.css
│   └── BancoTalentos/ index.jsx + BancoTalentos.css
├── services/
│   ├── api.js                   ← instância axios centralizada
│   └── bancoTalentosService.js  ← POST /api/banco-talentos
├── hooks/
│   └── useBancoTalentos.js      ← useMutation TanStack Query
└── data/
    ├── vagas.js        ← 6 vagas mockadas + arrays de filtros
    ├── depoimentos.js  ← 3 depoimentos
    └── equipe.js       ← 3 membros
```

## Componentes Criados

- **Button** — `variant`, `size`, suporta `to` (Link), `href` (a), ou button; prop `full`
- **Badge** — 5 variantes de cor
- **Card/CardBody/CardHeader/CardFooter** — base reutilizável
- **Logo** — SVG inline (ícone 3 figuras + texto UNI)
- **Header** — sticky, scroll shadow, hamburger mobile, NavLink com active state
- **Footer** — dark, 4 colunas, gradient colorido no topo

## Páginas Implementadas

- `/` Home — Hero, Diferenciais, Como Funciona, Serviços, Stats, Depoimentos, Vagas Destaque, CTA
- `/sobre` Sobre — Hero, História, MVV, Equipe, Números
- `/servicos` Serviços — Hero, 5 serviços alternados (grid 2col), CTA
- `/vagas` Vagas — Hero, busca, filtros, grid de vagas, banner CV espontâneo
- `/vagas/:slug` VagaDetalhe — Hero azul, layout 2col (conteúdo + sidebar sticky), outras vagas
- `/contato` Contato — Hero, form com validação, info card, FAQ

## Padrões Estabelecidos

- CSS Modules para estilos de página/layout (`.module.css`)
- CSS global (`components.css`) para componentes base reutilizáveis
- CSS Custom Properties em `globals.css` (tokens: `--color-*`, `--radius-*`, `--spacing-*`, `--shadow-*`)
- Variantes de componentes via classes BEM (`.btn--primary`, `.btn--md`, etc.)
- Dados mockados como constantes JS em `src/data/` — sem useEffect, sem API
- Axios centralizado em `services/api.js` (ainda não criado — sem backend)
- TanStack Query configurado no main.jsx mas não usado ainda (dados são locais)

## Decisões Arquiteturais

- CSS Modules para pages/layout (escopo local)
- CSS global puro para componentes base de design system (reutilização por className)
- `@import` do Google Fonts deve ser a primeira linha do globals.css (PostCSS exige)
- `--legacy-peer-deps` necessário no npm install por conflitos de peer deps
- Logo implementado como SVG inline (sem arquivo externo) — mais performático

## Serviços e Hooks Criados

- `services/api.js` — instância axios centralizada (baseURL: VITE_API_URL || '/api')
- `services/bancoTalentosService.js` — POST /api/banco-talentos (simulado até backend)
- `hooks/useBancoTalentos.js` — useMutation do TanStack Query para cadastro

## Padrões adicionais (BancoTalentos)

- CSS plain (não Module) para páginas que usam classes globais do design system
- `FileUploadArea` usa drag-and-drop nativo + validação de tipo/tamanho no frontend
- Simulação de API com `setTimeout` em services enquanto backend não existe
- `useMutation` do TanStack Query controla `isPending`, `isSuccess`, `isError`
- `@keyframes spin` inline via `<style>` tag para spinner de loading no botão

## Pendências / TODOs

- Serviços de API ainda precisam remover simulação quando backend for implementado
- Páginas `/candidatos` e `/blog` não implementadas (não eram obrigatórias)
- Favicon SVG não criado (usa /favicon.svg referenciado no index.html)

## Páginas Adicionais

- `/banco-talentos` BancoTalentos — Hero, form com upload, sidebar informativa, CTA empresas
- `/politica-de-privacidade` PoliticaPrivacidade — Hero azul, layout 2col (sidebar com índice âncora + conteúdo), 12 seções LGPD, botão voltar ao topo

## Padrões adicionais (PoliticaPrivacidade)

- CSS plain (não Module) para a página — arquivo `PoliticaPrivacidade.css`
- `IntersectionObserver` para detectar seção visível e destacar item no índice (sidebar)
- Âncora suave com `scroll-margin-top: 96px` nas seções (compensa header sticky)
- Tabelas com `.pp-tabela-wrapper` para overflow-x em mobile
- Grid de cards para direitos do titular (2 colunas, responsivo para 1 no mobile)
- Botão "voltar ao topo" com `position: fixed` e visibilidade controlada por scroll
- `Link` com `target="_blank"` do React Router usado no checkbox de aceite do BancoTalentos
- Footer atualizado: coluna "Para Candidatos" inclui links Banco de Talentos + Política de Privacidade

# Estrutura — frontend/ (unigestao)

```
frontend/
  src/
    main.jsx          ← entry; configura QueryClient + Router
    App.jsx           ← rotas (HashRouter)
    styles/
      globals.css     ← CSS Custom Properties (tokens de design)
      components.css  ← estilos base de componentes (única fonte de verdade)
    components/
      ui/             ← Button, Input, Modal, Badge, Card... (reaproveitar, não duplicar)
      layout/         ← Header, Sidebar, PageWrapper, Footer...
    pages/            ← uma pasta por página
    hooks/            ← custom hooks (useVagas, useCandidatos...) com TanStack Query
    services/         ← chamadas axios por domínio (todas importam services/api.js)
    utils/            ← helpers (formatDate, exportPDF, exportXLSX...)
    data/             ← dados mockados de conteúdo (vagas/depoimentos/equipe)
  index.html, vite.config.js, package.json
```

## Rotas (HashRouter — App.jsx)
`/`, `/sobre`, `/servicos`, `/vagas`, `/vagas/:slug`, `/candidatos`, `/blog`,
`/blog/:slug`, `/contato`, `/proposta`.

## Estado (snapshot 2026-03-10 — confirmar no código)
- Implementado: setup Vite/React/HashRouter; componentes base Button/Badge/Card/
  Logo/Header/Footer; páginas Home/Sobre/Serviços/Vagas/Vaga:slug/Contato.
- Faltava: `/candidatos`, `/blog`, `/proposta`, integração backend (`services/`),
  SEO, acessibilidade (focus-visible, ARIA). Ver `docs/progresso.md`.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

**UNI Gestão de Pessoas** — portal de uma empresa de recrutamento e seleção humanizado, similar ao modelo de negócio da Glee Talentos (gleetalentos.com.br). Foco em recrutamento com visão humanizada e abordagem psicológica.

**URL de produção:** https://uni.gleetalentos.com.br
**VPS:** Contabo — `144.91.95.180` (Ubuntu 24.04, compartilhada com gleetalentos.com.br)

## Estrutura de Pastas

```
unigestao/
├── frontend/    # SPA React + Vite (deploy em /var/www/unigestao/ via Nginx)
├── backend/     # API Node.js (não iniciado)
├── deploy/      # Scripts e configs de deploy (Nginx, PM2, ecosystem.config.js)
├── docs/        # Documentação do projeto
└── briefing/    # Assets de identidade visual
```

## Stack Frontend (`frontend/`)

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19.2.0 | Biblioteca UI |
| Vite | 7.x | Build tool / dev server |
| React Router DOM | 6.20.0 | SPA com **HashRouter** |
| JavaScript / JSX | ES2023 | Linguagem principal |
| CSS Custom Properties | — | Design tokens (`globals.css`) |
| CSS Modules | — | Estilos de página/layout (`.module.css`) |
| @tanstack/react-query | 5.17.9 | Data fetching — usado em `useBancoTalentos` |
| axios | 1.6.5 | Cliente HTTP — instância em `services/api.js` |
| lucide-react | 0.294.0 | Ícones |
| date-fns | 4.1.0 | Formatação de datas |

**Comandos:**
```bash
cd frontend
npm install --legacy-peer-deps   # necessário por conflitos de peer deps
npm run dev                       # dev server (porta 5173)
npm run build                     # gera dist/ para deploy
```

**Deploy do frontend:**
```bash
cd frontend && npm run build
rsync -avz --delete dist/ root@144.91.95.180:/var/www/unigestao/
```

## Agentes Claude Code

| Agente | Responsabilidade |
|---|---|
| `design-ui-ux` | Identidade visual, UI/UX, componentes, acessibilidade |
| `dev-fe-unigestao` | Frontend — componentes, páginas, hooks, CSS |
| `dev-ops-deploy` | Deploy VPS, Nginx, PM2, SSL, banco de dados |
| `know-doc-unigestao` | Documentação, progresso, ADRs, guias técnicos |

## Identidade Visual (Brand)

Os assets de branding estão em [briefing/](briefing/).

### Paleta de Cores

| Token | Hex | Uso |
|---|---|---|
| Azul principal | `#224976` | Primária, headers, navegação |
| Amarelo destaque | `#FBB724` | Destaque, CTAs secundários |
| Laranja destaque | `#EB802A` | Destaque, ações, badges |
| Cinza texto | `#96A2AF` | Texto secundário, labels |
| Branco base | `#FBFBFC` | Backgrounds, superfícies |

### Logo

- Ícone circular com 3 figuras humanas estilizadas nas cores azul, amarelo e laranja
- Tipografia: **UNI** em bold azul escuro (`#224976`), **GESTÃO DE PESSOAS** em spaced uppercase cinza
- Duas variantes: horizontal (logo + texto lado a lado) e vertical (logo acima do texto)
- Background decorativo com ondas/faixas nas cores da marca

### Princípios visuais

- Clean, profissional, corporativo
- Fundo majoritariamente branco (`#FBFBFC`) com acentos coloridos
- Elementos decorativos: faixas onduladas nos cantos usando as cores primárias

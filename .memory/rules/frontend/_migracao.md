# Migração frontend — unigestao → persona global
Origem: `.claude/agents/dev-fe-unigestao.md` (commit 2d96b29) — ação MIGRAR

## Foi para a persona global (comportamento) — `~/.claude/agents/frontend.md`
- Como cria componente/página/hook/rota, integra API, acessibilidade.
- Protocolo de git/permissões genérico, memória do agente.

## Ficou no projeto (.memory/rules/frontend/)
- `stack.md` — React 18/Vite 5/HashRouter/CSS vars/TanStack Query + libs de domínio.
- `estrutura.md` — árvore `frontend/src`, rotas, snapshot de estado.
- `padroes.md` — tokens CSS, reuso de componentes, axios central, TanStack Query, HashRouter.
- `do-dont.md` — sem hex/dup CSS, sem axios avulso, sem useEffect-fetch, sem BrowserRouter.

## Arquivado/removido
- `.claude/agents/dev-fe-unigestao.md` **removido** (MIGRAR; nome não referenciado
  em skills/teams). Comportamento agora na persona global `frontend`.
- Memória do agente preservada em `.claude/agent-memory/dev-fe-unigestao/`.

## Rollback
`git -C /Users/rodrigofelippe/Documents/projetosgit/unigestao checkout HEAD -- .claude/agents/dev-fe-unigestao.md`

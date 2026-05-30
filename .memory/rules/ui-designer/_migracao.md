# Migração ui-designer — unigestao → persona global
Origem: `.claude/agents/design-ui-ux.md` (commit 2d96b29) — ação MIGRAR

## Foi para a persona global (comportamento) — `~/.claude/agents/ui-designer.md`
- Como projeta layout/componentes/UX, garante acessibilidade e responsividade.
- Protocolo de git/permissões genérico, memória do agente.

## Ficou no projeto (.memory/rules/ui-designer/)
- `stack.md` — onde a identidade vive (briefing/, CLAUDE.md, globals.css).
- `estrutura.md` — assets e subdomínios de atuação.
- `padroes.md` — paleta (#224976/#FBB724/#EB802A/#96A2AF/#FBFBFC), logo, princípios, WCAG AA, botões.
- `do-dont.md` — paleta, contraste, hover/focus, logo, máx. 3 destaques.

## Arquivado/removido
- `.claude/agents/design-ui-ux.md` **removido** (MIGRAR; não referenciado).
  Comportamento agora na persona global `ui-designer`.
- Memória preservada em `.claude/agent-memory/design-ui-ux/`.

## Rollback
`git -C /Users/rodrigofelippe/Documents/projetosgit/unigestao checkout HEAD -- .claude/agents/design-ui-ux.md`

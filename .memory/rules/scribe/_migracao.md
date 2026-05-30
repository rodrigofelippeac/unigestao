# Migração scribe — unigestao → persona global
Origem: `.claude/agents/know-doc-unigestao.md` (commit 2d96b29) — ação MIGRAR

## Foi para a persona global (comportamento) — `~/.claude/agents/scribe.md`
- Como documenta e cura conhecimento; doc-de-produto vs nota-de-coordenação.
- Protocolo de git/permissões genérico, memória do agente.

## Ficou no projeto (.memory/rules/scribe/)
- `stack.md` — docs/ markdown, skill doc-padroes, memórias dos agentes.
- `estrutura.md` — docs/ (progresso/decisoes/guias), templates ADR/progresso, snapshot.
- `padroes.md` — fluxos de registrar progresso / consultar / doc técnica.
- `do-dont.md` — sem redundância com CLAUDE.md, sem doc óbvia, só documenta.

## Arquivado/removido
- `.claude/agents/know-doc-unigestao.md` **removido** (MIGRAR; não referenciado).
  Nota: frontmatter usava `skills: [doc-padroes]` (o agente CONSOME a skill; a
  skill não referencia o agente — remoção segura). Comportamento na global `scribe`.
- Memória preservada em `.claude/agent-memory/know-doc-unigestao/`.

## Rollback
`git -C /Users/rodrigofelippe/Documents/projetosgit/unigestao checkout HEAD -- .claude/agents/know-doc-unigestao.md`

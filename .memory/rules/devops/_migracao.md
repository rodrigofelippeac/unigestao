# Migração devops — unigestao → persona global
Origem: `.claude/agents/dev-ops-deploy.md` (commit 2d96b29) — ação MIGRAR

## Foi para a persona global (comportamento) — `~/.claude/agents/devops.md`
- Como faz deploy/infra/rollback; aditivo>destrutivo; nunca expõe segredo.
- AskUserQuestion para decisões; verificação de permissões; memória do agente.

## Ficou no projeto (.memory/rules/devops/)
- `stack.md` — VPS Nginx/PM2/PostgreSQL, portas, comandos rsync/pm2/prisma.
- `estrutura.md` — deploy/ (nginx.conf, ecosystem, deploy.sh), checklist.
- `padroes.md` — backup antes de migration, .env só na VPS, permissões users.json.
- `do-dont.md` — credenciais, .env prod, pm2 delete all, 5432 público, git na VPS.

## Arquivado/removido
- `.claude/agents/dev-ops-deploy.md` **removido** (MIGRAR; não referenciado).
  Comportamento agora na persona global `devops`.
- Memória preservada em `.claude/agent-memory/dev-ops-deploy/`.

## Rollback
`git -C /Users/rodrigofelippe/Documents/projetosgit/unigestao checkout HEAD -- .claude/agents/dev-ops-deploy.md`

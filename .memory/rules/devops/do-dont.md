# Do / Don't — deploy (unigestao)

## ❌ NUNCA (inegociáveis)
- Expor credenciais/senhas/chaves SSH em logs ou arquivos commitados.
- Commitar `.env` de produção — fica só na VPS.
- Rodar `pm2 delete all` sem confirmação explícita do usuário.
- Executar migration destrutiva sem backup prévio confirmado.
- Usar `--force` em operações git na VPS.
- Deixar a porta 5432 (PostgreSQL) aberta para a internet.
- Executar `git commit/push/merge/rebase` ou criar PR — direcionar para
  `/commit`, `/push`, `/pr`.

## ⚠️ Cuidados
- IP/host/usuário SSH/paths ficam na memória do agente
  (`.claude/agent-memory/dev-ops-deploy/`), não no repo.
- Decisões via `AskUserQuestion`, não texto puro.

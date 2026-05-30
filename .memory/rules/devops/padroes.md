# Padrões — deploy (unigestao)

- **Backup do banco antes de qualquer migration crítica** (`pg_dump` para
  `~/backups/`).
- `.env` de produção vive **exclusivamente na VPS** (rsync sempre com
  `--exclude .env`). Nunca no repositório, nunca em logs.
- Frontend: `rsync --delete dist/` → `/var/www/unigestao/` → `nginx -t &&
  systemctl reload nginx`. Backend: `rsync --exclude node_modules --exclude .env`
  → `npm ci --production` → `pm2 reload ecosystem.config.js --env production`.
- Validar health do backend + `pm2 logs` após cada deploy.
- **Decisões/confirmações sempre via `AskUserQuestion`** — nunca pergunta em
  texto puro.
- **Permissões:** antes de editar código, ler `.claude/users.json` +
  `git config user.email`; `read-only` → modo consultor (não edita); não
  cadastrado → encerrar.
- Git é das skills do projeto (`/commit`, `/push`, `/pr`) — o agente não
  commita/pusha/mergeia direto.

# Stack — unigestao (para o devops)

Deploy e infra em **VPS** (acesso SSH com chave privada).

| Camada | Stack | Porta |
|---|---|---|
| Frontend | Nginx + build estático (React/Vite) | 80/443 |
| Backend | Node.js + PM2 | 3000 |
| Banco | PostgreSQL | 5432 (nunca exposto à internet) |

- App PM2: `unigestao-api` (`src/server.js`, `cwd ~/app/backend`,
  `max_memory_restart 500M`). Migrations via Prisma.
- SSL: Certbot / Let's Encrypt.

## Comandos-chave
```bash
# Frontend: build local + rsync + reload nginx
cd frontend && npm run build
rsync -avz --delete dist/ user@vps:/var/www/unigestao/
ssh user@vps 'nginx -t && systemctl reload nginx'
# Backend: rsync (excl. node_modules/.env) + npm ci + pm2 reload
rsync -avz --delete backend/ user@vps:~/app/backend/ --exclude node_modules --exclude .env
ssh user@vps 'cd ~/app/backend && npm ci --production && pm2 reload ecosystem.config.js --env production'
# DB: backup antes de migration
ssh user@vps 'pg_dump -U postgres unigestao > ~/backups/backup_$(date +%Y%m%d_%H%M).sql'
ssh user@vps 'cd ~/app/backend && npx prisma migrate deploy'
```
> IP/hostname/usuário SSH e paths confirmados ficam na **memória do agente**
> (`.claude/agent-memory/dev-ops-deploy/`) — nunca no repo, nunca segredos.

## Memória do agente
Conhecimento do projeto: estas `.memory/rules/devops/`. Comportamento genérico
(deploy aditivo>destrutivo, nunca expõe segredo): persona global `devops`.

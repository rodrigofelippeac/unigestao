# Estrutura — deploy (unigestao)

```
unigestao/
  frontend/        ← build em frontend/dist/
  backend/         ← app Node.js (PM2)
  deploy/          ← scripts/configs (criar conforme necessário)
    nginx.conf            ← config Nginx de produção
    ecosystem.config.js   ← config PM2 (unigestao-api, PORT 3000)
    deploy.sh             ← script principal
```

## Nginx (SPA HashRouter + proxy API)
```nginx
root /var/www/unigestao; index index.html;
location / { try_files $uri $uri/ /index.html; }   # SPA fallback
location /api/ { proxy_pass http://localhost:3000/; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; }
```

## Subdomínios
Provisioning (Node/Nginx/PM2/PostgreSQL), deploy frontend (build+rsync+reload),
deploy backend (rsync+npm ci+pm2 reload), banco (migrations/backup/restore),
SSL/HTTPS (certbot), monitoramento (logs PM2, status, disco).

## Checklist de deploy (antes de produção)
- [ ] Backup do banco feito
- [ ] `.env` de produção presente **na VPS** (nunca no repo)
- [ ] Build local testado (`npm run build`)
- [ ] PM2 reiniciado (backend) / Nginx recarregado (frontend)
- [ ] Health check do backend respondendo
- [ ] `pm2 logs unigestao-api --lines 50` sem erros

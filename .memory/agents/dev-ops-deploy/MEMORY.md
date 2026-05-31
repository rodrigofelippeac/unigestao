# dev-ops-deploy — Memória Operacional

## Histórico

| Data | Evento |
|------|--------|
| 2026-03-10 | Agente criado via /criar-agente |
| 2026-03-11 | Deploy inicial do frontend realizado com sucesso |

## VPS — Configuração

| Campo | Valor |
|-------|-------|
| IP | `144.91.95.180` |
| Hostname | `mail.gleetalentos.com.br` (Contabo VPS) |
| Usuário SSH | `root` |
| Acesso | Chave SSH sem senha (já configurada localmente) |
| OS | Ubuntu 24.04.3 LTS, kernel 6.8.0-90-generic |
| Recursos | 6 cores CPU, 11 GB RAM, 193 GB disco |
| Credenciais completas | Ver `/Users/rodrigofelippe/Documents/projetosgit/gleetalentos/deploy/docs/ACESSO.md` |

**Comando SSH:**
```bash
ssh root@144.91.95.180
```

## Paths na VPS

| Serviço | Path |
|---------|------|
| Frontend (Nginx root) | `/var/www/unigestao/` |
| Nginx config | `/etc/nginx/sites-available/unigestao` |
| SSL cert | `/etc/letsencrypt/live/uni.gleetalentos.com.br/` |

## URLs de Produção

| Recurso | URL |
|---------|-----|
| Site | https://uni.gleetalentos.com.br |
| (futura API) | https://uni.gleetalentos.com.br/api |

## Serviços Configurados

- [x] Nginx — virtualhost `/etc/nginx/sites-available/unigestao` (isolado do gleetalentos)
- [x] SSL — Let's Encrypt via certbot, válido até 2026-06-09, renovação automática
- [ ] Node.js/PM2 — não necessário ainda (sem backend)
- [ ] PostgreSQL — não necessário ainda (sem backend)

## Coexistência com gleetalentos

O unigestao compartilha a mesma VPS que o gleetalentos. Isolamento garantido por:

| Recurso | gleetalentos | unigestao |
|---------|-------------|-----------|
| Diretório web | `/var/www/gleetalentos/` | `/var/www/unigestao/` |
| Nginx config | `/etc/nginx/sites-available/gleetalentos` | `/etc/nginx/sites-available/unigestao` |
| Domínio | `gleetalentos.com.br` | `uni.gleetalentos.com.br` |
| PM2 | `gleetalentos-api` (porta 3333) | — |
| Banco | `gleetalentos` | — |

**Regra de ouro:** NUNCA editar configs do gleetalentos. Sempre criar arquivos separados.

## Padrões Confirmados de Deploy (Frontend)

```bash
# 1. Build local
cd frontend && npm run build

# 2. Upload para VPS
rsync -avz --delete frontend/dist/ root@144.91.95.180:/var/www/unigestao/

# 3. Nginx já está configurado — nada a fazer após upload
```

## Próximas Tarefas (quando houver backend)

- [ ] Criar DB PostgreSQL: `unigestao` (usuario `unigestao_user`)
- [ ] Criar `/root/unigestao-backend/` na VPS
- [ ] Configurar PM2 processo `unigestao-api` na porta `3334`
- [ ] Adicionar `location /api/` no nginx config do unigestao

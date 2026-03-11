# ADR-002 — Autenticação JWT sem refresh token

**Data:** 2026-03-10
**Status:** aceito

## Contexto

O painel admin da plataforma UNI Gestão de Pessoas precisa de autenticação. O sistema terá no máximo 1-2 usuários admin com acesso via desktop em sessões de trabalho típicas de 4-8 horas.

## Decisão

Usar JWT com access token de vida longa (8 horas), sem refresh token. Token armazenado no `localStorage` do painel admin.

## Alternativas Consideradas

- **JWT com refresh token** — overhead desnecessário para 1-2 usuários; exigiria tabela de refresh tokens no banco e lógica de rotação no frontend
- **Sessão server-side (cookie + session store)** — requer armazenamento de sessão (Redis ou tabela no banco); complexidade desproporcional ao volume de uso
- **Solução de terceiro (Auth0, Clerk)** — dependência externa desnecessária para caso de uso interno simples

## Consequências

**Positivas:**
- Implementação simples — 1 endpoint de login, 1 plugin JWT, 1 decorator `autenticar`
- Zero overhead de rotação de token no banco
- Sem lógica de retry no frontend
- Adequado para o volume e perfil de uso (1-2 admins, sessões diurnas)

**Negativas:**
- Token não pode ser revogado antes de expirar (mitigado pelo curto horizonte de uso e ausência de dados sensíveis de terceiros no painel)
- Ao expirar (8h), o admin precisa fazer login novamente

**Mitigações:**
- Rate limit de 5 tentativas/15min no endpoint de login
- `JWT_SECRET` mínimo de 64 caracteres hex gerado via `openssl rand -hex 32`
- Interceptor no frontend redireciona para login ao receber 401

## Referências

- `docs/backend-plano.md` — Fase 6, seção "Autenticação e Painel Admin"
- `@fastify/jwt` — plugin oficial Fastify para JWT

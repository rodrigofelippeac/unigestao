# ADR-001 — Backend: Fastify 4 + Prisma + PostgreSQL

**Data:** 2026-03-10
**Status:** `aceito`
**Autores:** Equipe UNI Gestão de Pessoas

## Contexto

O backend do projeto UNI ainda não existe. O frontend já possui `services/api.js` com instância axios centralizada e `bancoTalentosService.js` aguardando um endpoint `POST /api/banco-talentos`. É necessário definir a stack antes de iniciar a implementação. Os critérios relevantes são:

- VPS compartilhada com gleetalentos.com.br (6 cores, 11 GB RAM) — overhead mínimo
- Equipe pequena, codebase simples — não justifica framework pesado
- Dois módulos principais: Vagas e Banco de Talentos, ambos com upload de currículo
- PostgreSQL já planejado na infra (mesmo servidor, porta padrão)
- Necessidade de migrations versionadas e schema como documentação

## Decisão

Usar **Fastify 4** como framework HTTP, **Prisma** como ORM e **PostgreSQL** como banco de dados.

A organização do código seguirá estrutura modular por domínio (`modules/banco-talentos/`, `modules/vagas/`) com plugins dedicados para Prisma, multipart e upload. Validação de variáveis de ambiente via `env-schema`. Validação de campos de formulário via `zod`. MIME de arquivos validado por magic bytes via `file-type`.

## Alternativas Consideradas

- **Express + Sequelize** — descartado: mais boilerplate, Sequelize tem API verbosa e migrations manuais
- **Fastify 5** — descartado: breaking changes no ecossistema de plugins; v4 tem estabilidade comprovada
- **Drizzle ORM** — descartado: migrations ainda são menos maduras que Prisma; schema menos legível como documentação
- **Hono** — descartado: excelente para edge/serverless, mas o projeto roda em VPS com Node.js — sem vantagem real
- **NestJS** — descartado: overhead desnecessário para a escala atual; complexidade que não se justifica

## Consequências

**Positivas:**
- Fastify tem throughput superior ao Express com menos overhead de memória — adequado para VPS compartilhada
- Prisma gera tipos implícitos via JSDoc e mantém migrations versionadas no repositório
- `@fastify/multipart` lida com streams de upload sem bufferizar o arquivo inteiro em memória
- `@fastify/rate-limit` e `@fastify/helmet` como plugins oficiais mantêm segurança centralizada
- Estrutura modular facilita onboarding de novos agentes/desenvolvedores

**Negativas / Trade-offs:**
- Fastify 4 ficará sem suporte de longo prazo conforme v5 amadurece — migração eventual necessária
- Prisma adiciona um passo de geração de cliente (`prisma generate`) no pipeline de deploy
- Disco local para uploads significa que escalar horizontalmente exigiria migração para storage remoto — aceitável dado o volume atual

## Referências

- `docs/backend-plano.md` — plano completo de implementação com fases e estrutura de pastas
- `frontend/src/services/bancoTalentosService.js` — serviço que aguarda o endpoint `POST /api/v1/banco-talentos`
- `frontend/src/services/api.js` — instância axios com `VITE_API_URL` já configurada

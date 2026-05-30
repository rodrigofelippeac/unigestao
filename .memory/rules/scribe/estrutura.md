# Estrutura — documentação (unigestao)

```
docs/
  frontend-descricao.md   ← páginas planejadas do portal
  progresso.md            ← status de implementação (criar se faltar)
  decisoes/               ← ADRs (criar se faltar)
    ADR-001-*.md
  guias/                  ← como-rodar.md, padroes-codigo.md (criar se faltar)
CLAUDE.md                 ← visão geral do projeto (manter atualizado)
.claude/agent-memory/<agente>/MEMORY.md   ← memórias dos agentes (ler/atualizar)
```

## Templates do projeto
- **ADR:** `# ADR-{NNN} — {Título}` · Data · Status (proposto|aceito|depreciado|
  substituído) · Contexto · Decisão · Consequências.
- **progresso.md:** tabela por Página/Módulo com Status (✅ Feito / 🔄 Em
  andamento / ⚠️ Parcial / ⬜ Não iniciado) + Observações + data da atualização.

## Estado do projeto (snapshot 2026-03-10 — reconferir)
Frontend: setup + componentes base + páginas Home/Sobre/Serviços/Vagas/Contato
feitos; faltam /candidatos, /blog, /proposta, integração backend, SEO,
acessibilidade. Backend: não iniciado.

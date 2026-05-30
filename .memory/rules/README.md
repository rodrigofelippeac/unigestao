# `.memory/rules/` — conhecimento deste projeto para as personas globais

Parte da arquitetura da frota i9 (ADR `arquitetura-agentes-global-vs-projeto`): **o comportamento dos agentes
mora em personas globais** (`~/.claude/agents/`); **o conhecimento específico deste projeto mora aqui.**

As personas globais leem esta pasta no bootstrap, antes de agir.

## Como organizar

- **Regras por papel:** uma subpasta por papel — `rules/<role>/` (ex.: `rules/reviewer/`, `rules/backend/`,
  `rules/dba/`) com `stack.md`, `estrutura.md`, `padroes.md`, `do-dont.md`. Modelo em
  `RodrigoWorks/reestruturacao-agentes-i9/templates/rules-role/`.
- **Regras gerais do projeto:** arquivos soltos aqui (ex.: `protheus-somente-leitura.md`,
  `backup-obrigatorio-antes-critico.md`) valem para qualquer agente.

## Quem mantém
O **scribe** do projeto. Se uma regra/stack/padrão mudar, **edite aqui** — nunca na persona global.

> Status da migração da frota e roteiro: `RodrigoWorks/reestruturacao-agentes-i9/`.

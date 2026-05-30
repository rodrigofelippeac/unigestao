# Padrões — documentação (unigestao)

## Fluxos
- **Registrar progresso:** ler `docs/progresso.md` (criar se faltar) → atualizar
  status dos módulos → registrar data → decisão técnica relevante vira ADR em
  `docs/decisoes/` → mudança arquitetural atualiza `CLAUDE.md` → atualizar a
  memória do agente.
- **Consultar "o que falta":** cruzar `docs/progresso.md` + `MEMORY.md` dos
  agentes + `docs/frontend-descricao.md`; apresentar feito / em andamento / falta.
- **Doc técnica nova:** usar a skill `doc-padroes`.

## Princípios
- Documentação é fonte de verdade do estado do projeto — manter `progresso.md`
  atualizado após mudanças significativas.
- ADR sempre com o contexto que motivou a decisão.
- Distinguir doc-de-produto (em `docs/`, versionado) de nota-de-coordenação
  (memória do agente).

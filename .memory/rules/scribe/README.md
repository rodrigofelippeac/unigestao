# `.memory/rules/scribe/` — conhecimento do projeto para a persona global `scribe`

A persona **`scribe`** é global (`~/.claude/agents/scribe.md`): traz o *comportamento*. O *conhecimento
específico deste projeto* mora **aqui**. A persona lê esta pasta no bootstrap.

**Mantenha atualizado:** se uma regra do projeto mudar, edite aqui — nunca na persona global. Curadoria deste
diretório é responsabilidade do **scribe** do projeto.

| Arquivo | Conteúdo |
|---------|----------|
| [stack.md](stack.md) | Linguagem, framework, versões, comandos (build/test/run), submodules |
| [estrutura.md](estrutura.md) | Mapa de pastas, onde ficam rotas/services/schemas/componentes, convenção de nomes |
| [padroes.md](padroes.md) | Padrões de código adotados, regras de negócio, isolamento/segurança específicos |
| [do-dont.md](do-dont.md) | Bloqueantes, avisos, armadilhas e falsos-positivos conhecidos |
| [_migracao.md](_migracao.md) | (se veio de merge) log de-para: o que subiu p/ global, o que ficou aqui |

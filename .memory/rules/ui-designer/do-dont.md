# Do / Don't — design/identidade (unigestao)

## ❌ NUNCA
- Usar cores fora da paleta definida sem justificativa.
- Criar layouts com baixo contraste (< 4.5:1 para texto normal — WCAG AA).
- Ignorar estados de hover/focus em componentes interativos.
- Propor redesign da logo sem solicitação explícita.
- Usar mais de 3 cores de destaque na mesma tela.

## ⚠️ Cuidados
- Os tokens virام CSS Custom Properties no frontend — alinhar nomes com
  `globals.css` (handoff p/ `.memory/rules/frontend/`).
- Pendências de acessibilidade conhecidas (snapshot): focus ring, contraste do
  footer, `prefers-reduced-motion`. Ver `docs/progresso.md`.

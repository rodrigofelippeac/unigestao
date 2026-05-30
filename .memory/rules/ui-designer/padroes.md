# Padrões — design/identidade (unigestao)

## Paleta (tokens canônicos)
| Token | Hex | Uso |
|---|---|---|
| `--color-primary` | `#224976` | Azul principal (ações primárias, texto) |
| `--color-accent-yellow` | `#FBB724` | Amarelo de destaque |
| `--color-accent-orange` | `#EB802A` | Laranja de destaque |
| `--color-text-muted` | `#96A2AF` | Cinza de texto/label |
| `--color-bg-base` | `#FBFBFC` | Branco base (fundo) |

Radius padrão `8px` (`--radius-md`). Sombras suaves em tom azul.

## Logo
Ícone circular com 3 figuras humanas (azul + amarelo + laranja); "UNI" bold
`#224976`; "GESTÃO DE PESSOAS" uppercase, letter-spacing amplo, cinza. Variantes
horizontal e vertical.

## Princípios
- Clean e corporativo, fundo quase branco; acentos com moderação (máx. 3 cores de
  destaque por tela). Faixas onduladas nos cantos como elemento decorativo.
- Hierarquia: azul = ação primária; amarelo/laranja = destaques.

## Componentes — especificar sempre
- Estados: default, hover, active, disabled, focus, error.
- Variantes: primary, secondary, ghost/accent, danger.
- Acessibilidade: contraste mínimo **4.5:1** (WCAG AA), focus ring visível.
- Botões: primary fundo `#224976`/texto branco; secondary borda+texto `#224976`;
  accent fundo `#FBB724`/`#EB802A`.

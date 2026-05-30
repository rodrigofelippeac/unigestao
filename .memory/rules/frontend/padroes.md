# Padrões — frontend/ (unigestao)

## CSS / design system
- **Sempre** usar tokens `var(--color-*)`, `var(--radius-*)`, `var(--spacing-*)`,
  `var(--shadow-*)` definidos em `globals.css` — nunca hex/valores hard-coded.
- Estilos base de componente em `components.css` (única fonte de verdade).
  Layout (padding/margin/grid) vai no CSS da página/seção, não no componente base.
- Variantes via classes/data-attributes/tokens — nunca um arquivo CSS por variante.

## Componentes
- Antes de criar, checar `components/ui/` e `components/layout/` — reaproveitar.
- Componente recebe `className` para extensão pontual. Padrão:
  `className={\`btn btn--${variant} btn--${size} ${className}\`}`.
- Nada de UI descartável inline na página — mover para `components/ui/`.

## Dados
- Data fetching **sempre** com TanStack Query (`useQuery`/`useMutation`) — nunca
  `useEffect` para buscar dados. `queryKey` por domínio + filtros.
- HTTP só via instância central `services/api.js` (`axios.create({ baseURL:
  import.meta.env.VITE_API_URL })`). Services importam `api` — nunca axios avulso.

## Navegação
- `HashRouter` (não `BrowserRouter`) — Nginx serve SPA com fallback `index.html`.

## Dependências
- Reaproveitar a stack existente — não instalar lib alternativa para função já
  coberta (ex.: outro date picker se `react-big-calendar` já cobre).

# Do / Don't — frontend/ (unigestao)

## ❌ NUNCA
- Escrever cores hex direto no CSS — sempre `var(--color-*)`.
- Duplicar blocos de CSS entre componentes/páginas — extrair token/componente.
- Criar instância axios fora de `services/api.js`.
- Usar `useEffect` para data fetching — usar TanStack Query.
- Criar componente de UI descartável inline na página — mover p/ `components/ui/`.
- Usar `BrowserRouter` — o projeto usa `HashRouter`.
- Instalar lib alternativa para função já coberta pela stack.

## ⚠️ Git/permissões
- Confirmar com o usuário antes de commit/push; nunca `--force`/`--no-verify`/
  reescrever histórico sem pedido; não criar branch sem orientação. Operações
  git são das skills do projeto (`/commit`, `/push`, `/pr`).

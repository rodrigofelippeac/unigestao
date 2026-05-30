# Stack — unigestao (para o frontend)

Portal **UNI Gestão de Pessoas** — SPA de recrutamento e seleção. Frontend em `frontend/`.

- **UI:** React 18.2 + Vite 5 + JavaScript/JSX (ES2023)
- **Rotas:** React Router DOM 6 — **HashRouter** (não BrowserRouter)
- **Estilo:** CSS Custom Properties (design system por tokens) — sem framework CSS
- **Dados:** @tanstack/react-query 5 + axios 1.6 (instância central)
- **Libs de domínio:** lucide-react (ícones), recharts 3 (gráficos), date-fns 4,
  jspdf 4 (PDF), xlsx 0.18 (Excel), qrcode.react 4 (QR), react-big-calendar 1.19
  (calendário de entrevistas), react-signature-canvas 1.1 (assinatura digital)

## Comandos
```bash
cd frontend && npm run dev      # dev server (Vite)
cd frontend && npm run build    # gera frontend/dist/
```
Base da API: `import.meta.env.VITE_API_URL`.

## Memória do agente
Conhecimento do projeto: estas `.memory/rules/frontend/`. Comportamento genérico:
persona global `frontend`. Identidade visual/tokens: ver `.memory/rules/ui-designer/`
+ `CLAUDE.md`.

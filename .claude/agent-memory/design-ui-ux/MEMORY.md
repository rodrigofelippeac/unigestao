# Design UI/UX — Agent Memory

## Estado do Projeto (leitura de 2026-03-10)

Frontend em `/frontend/src/`. Stack: React + CSS Modules + globals.css com tokens CSS.

## Componentes Existentes

- `Button.jsx` — variantes: primary, secondary, accent, ghost, white, outline-white. Tamanhos: sm, md, lg, xl. Suporta `to` (Link), `href` (a) e `button`.
- `Card.jsx` + `CardBody/Header/Footer` — simples, sem variantes de cor
- `Badge.jsx` — variantes: primary, yellow, orange, success, muted
- `Logo.jsx` — variantes: horizontal, vertical, icon. Tamanhos: sm, md, lg.

## Tokens CSS (globals.css)

Arquivo sólido com tokens bem definidos. Escala tipográfica vai de 12px a 64px. Espaçamentos de 4px a 96px. Breakpoints usados: 1024px e 768px (falta 640px e 480px).

## Páginas Implementadas

- Home — Hero, Diferenciais, ComoFunciona, ServicosDestaque, Stats, Depoimentos, VagasDestaque, CTAFinal
- Sobre — PageHero, Historia, MVV, Equipe, Numeros
- Servicos — PageHero, 5 serviços em layout alternado (imagem + texto), CTA
- Vagas — PageHero, busca+filtros, grid de cards, banner candidatura espontânea
- VagaDetalhe — hero da vaga, conteúdo + sidebar sticky, outras vagas
- Contato — PageHero, formulário com validação, infoCard sticky, FAQ

## Páginas Planejadas ainda NÃO implementadas

- `/processo-seletivo` — timeline detalhada
- `/candidatos` — dicas, cadastro espontâneo, CV upload
- `/blog` + `/blog/[slug]` — conteúdo editorial
- `/proposta` — formulário para empresas (opcional)

## Problemas de Design Identificados

### Alta Prioridade
1. Focus ring ausente em todos os componentes interativos (btn, card, navLink, tags) — falha crítica de acessibilidade WCAG 2.1 AA
2. Botão `.btn` não tem `:focus-visible` definido em components.css
3. `role="aria-*"` faltando em elementos interativos que são `<div>` ou `<Link>` com comportamento de botão
4. `.heroImage` some no mobile (`display: none`) — perde força visual; preferível mostrar em versão menor ou background
5. Inline styles espalhados por páginas (Sobre, Servicos, VagaDetalhe) — viola consistência do design system
6. Imagens externas (Pexels) em produção — sem fallback, sem lazy load consistente
7. Página `/vagas` usa `input` sem `aria-label` explícito (só placeholder)

### Média Prioridade
8. `--color-text` (#224976) no body é o azul da marca — texto corrido em azul tem contraste OK mas é incomum; body usa `--color-text-dark` (#1a2e42), headings usam `--color-primary`. Duas variáveis de texto similares geram confusão.
9. `scroll-behavior: smooth` sem `prefers-reduced-motion` — usuários com vestibular/epilepsia podem ter problemas
10. `<section>` sem `aria-label` ou `aria-labelledby` em múltiplas seções por página
11. `.section--dark .section-header p` usa `rgba(255,255,255,.7)` — verificar se contraste é >= 4.5:1 (aproximadamente 4.0:1, abaixo do AA)
12. `.contactItem` no footer usa `rgba(255,255,255,.55)` — contraste muito baixo (~2.6:1), falha WCAG
13. `.link` no footer usa `rgba(255,255,255,.65)` — contraste limítrofe (~3.1:1), abaixo de 4.5:1 para texto pequeno
14. `diferencialGrid` na Home usa classe `grid--4` mas tem breakpoint duplo via globals — pode acumular 2 queries concorrentes
15. Falta breakpoint 480px para telas muito pequenas (header 72px + nav 100vw pode colidir)
16. `VagaDetalhe` usa `ArrowLeft` com `transform: rotate(180deg)` para criar seta direita — deve usar `ArrowRight`

### Baixa Prioridade
17. `diferencialCard`, `servicoCard`, `vagaCard` são estruturalmente idênticos — candidatos à unificação em variante do Card component
18. CTAFinal e Hero compartilham blobs absolutamente posicionados com CSS duplicado
19. Falta componente `Section` wrapper para padronizar `section-header` + container
20. `HashRouter` — implica URLs com `#`, ruim para SEO (sem server-side rendering)
21. Sem meta tags OG/SEO em nenhuma página
22. `main.jsx` não verificado — possível ausência de `<StrictMode>`

## Padrões Estabelecidos

- Paleta: azul #224976 (primary), amarelo #FBB724 (accent-yellow), laranja #EB802A (accent-orange), cinza #96A2AF (muted), branco #FBFBFC (bg-base)
- Visual: corporativo, clean, fundo branco com acentos coloridos
- Botões primary: fundo azul; accent: fundo amarelo (hover vira laranja + texto branco)
- Cards interativos: hover com `translateY(-2px ou -3px)` + `shadow-md`
- Sem animações de entrada (scroll-triggered) implementadas ainda
- Fonte: Inter via Google Fonts

## Pendências de Design (priorizadas)

1. Focus ring global (`:focus-visible`) — urgente
2. `prefers-reduced-motion` para transitions
3. Contraste do footer (links e texto muted)
4. Páginas faltantes: /candidatos, /processo-seletivo, /blog
5. SEO: meta tags, OG, sitemap, migrar HashRouter para BrowserRouter

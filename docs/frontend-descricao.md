# Frontend — Descrição do Portal UNI Gestão de Pessoas

Portal institucional e de serviços de uma empresa de **recrutamento e seleção humanizado**, com abordagem psicológica no processo seletivo. O site atende dois públicos: **empresas contratantes** e **candidatos**.

---

## Públicos-Alvo

| Perfil | Objetivo no site |
|---|---|
| **Empresa** | Contratar o serviço de R&S, entender o processo, solicitar proposta |
| **Candidato** | Ver vagas abertas, cadastrar currículo, entender como funciona o processo |

---

## Páginas

### 1. Home (`/`)

Página principal com apresentação da empresa.

**Seções:**
- **Hero** — headline impactante com proposta de valor ("Recrutamento humanizado com olhar de psicóloga"), CTA duplo: "Contratar para empresa" / "Ver vagas abertas"
- **Diferenciais** — cards com os principais diferenciais do serviço (abordagem humanizada, visão psicológica, fit cultural, agilidade)
- **Como funciona** — stepper/timeline do processo seletivo em etapas
- **Serviços** — visão geral dos serviços oferecidos com link para página de serviços
- **Depoimentos** — testimonials de empresas clientes
- **CTA final** — chamada para solicitar proposta ou entrar em contato

---

### 2. Sobre (`/sobre`)

Apresentação da empresa e equipe.

**Seções:**
- História e missão da empresa
- Valores e filosofia (recrutamento humanizado, psicologia aplicada)
- Equipe (perfis com foto, nome, cargo e especialidade)
- Números/resultados (vagas preenchidas, clientes atendidos, etc.)

---

### 3. Serviços (`/servicos`)

Detalhamento dos serviços oferecidos para empresas contratantes.

**Serviços esperados:**
- **Recrutamento e Seleção** — processo completo de R&S com triagem, entrevistas e avaliação psicológica
- **Hunting** — busca ativa de perfis específicos (headhunting)
- **Assessment / Avaliação Comportamental** — testes e dinâmicas para avaliação de candidatos
- **Consultoria de RH** — orientação estratégica para área de pessoas
- **Employer Branding** — apoio à construção da marca empregadora

Cada serviço com: descrição, benefícios, para quem é indicado e CTA para solicitar proposta.

---

### 4. Processo Seletivo (`/processo-seletivo`)

Explicação detalhada de como funciona o processo de R&S da empresa.

**Etapas típicas:**
1. Briefing com a empresa (entendimento da vaga e cultura)
2. Divulgação e atração de talentos
3. Triagem de currículos
4. Entrevistas comportamentais
5. Avaliação psicológica
6. Apresentação dos finalistas
7. Apoio à decisão e onboarding

---

### 5. Vagas (`/vagas`)

Página de listagem de vagas abertas para candidatos.

**Funcionalidades:**
- Listagem de vagas com filtros (área, nível, regime, localidade)
- Card de vaga com: título, empresa (ou anônimo), localidade, regime, resumo
- Página de detalhe da vaga (`/vagas/[slug]`) com descrição completa e botão "Candidatar-se"
- Formulário de candidatura ou redirecionamento para cadastro

---

### 6. Para Candidatos (`/candidatos`)

Página dedicada ao público candidato.

**Seções:**
- Como funciona o processo para o candidato
- Dicas de carreira e preparação para entrevistas
- Cadastro de currículo espontâneo (formulário ou upload de CV)
- Link para página de vagas

---

### 7. Blog / Conteúdo (`/blog`)

Artigos sobre RH, carreira, liderança, mercado de trabalho e psicologia organizacional.

**Funcionalidades:**
- Listagem de posts com categoria, data e thumbnail
- Página de post individual (`/blog/[slug]`)
- Filtro por categoria

---

### 8. Contato (`/contato`)

Formulário de contato e informações da empresa.

**Conteúdo:**
- Formulário: nome, e-mail, telefone, empresa (opcional), mensagem, tipo de interesse (empresa / candidato)
- WhatsApp / telefone de contato
- E-mail
- Localização (cidade/estado)
- Links de redes sociais (LinkedIn, Instagram)

---

### 9. Solicitar Proposta (`/proposta`) *(opcional)*

Formulário dedicado para empresas interessadas em contratar o serviço.

**Campos:**
- Dados da empresa (razão social, segmento, porte)
- Vaga em aberto (cargo, nível, quantidade)
- Prazo esperado
- Contato do responsável

---

## Elementos Globais

### Header
- Logo UNI Gestão de Pessoas
- Menu de navegação: Home | Sobre | Serviços | Vagas | Blog | Contato
- CTA no header: "Solicitar proposta" (botão primário)
- Menu responsivo (hamburger no mobile)

### Footer
- Logo + tagline
- Links institucionais
- Links de serviços
- Links para candidatos
- Redes sociais
- Copyright

---

## Observações Técnicas

- O frontend fica em `frontend/`
- Todas as páginas devem seguir a identidade visual definida em `briefing/` e documentada em `CLAUDE.md`
- Vagas e blog devem ter suporte a SEO (meta tags, OG tags, sitemap)
- Formulários se comunicam com a API do `backend/`

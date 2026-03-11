import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Shield, ChevronRight, ArrowUp, Mail } from 'lucide-react'
import './PoliticaPrivacidade.css'

/* ============================================================
   Seções da política — fonte única de verdade para índice e conteúdo
   ============================================================ */

const SECOES = [
  { id: 'quem-somos',       titulo: '1. Quem somos' },
  { id: 'dados-coletados',  titulo: '2. Dados que coletamos' },
  { id: 'finalidade',       titulo: '3. Finalidade do tratamento' },
  { id: 'base-legal',       titulo: '4. Base legal (LGPD)' },
  { id: 'compartilhamento', titulo: '5. Compartilhamento de dados' },
  { id: 'retencao',         titulo: '6. Retenção e armazenamento' },
  { id: 'direitos',         titulo: '7. Direitos do titular' },
  { id: 'cookies',          titulo: '8. Cookies e tecnologias similares' },
  { id: 'seguranca',        titulo: '9. Segurança da informação' },
  { id: 'menores',          titulo: '10. Menores de idade' },
  { id: 'alteracoes',       titulo: '11. Alterações desta política' },
  { id: 'contato',          titulo: '12. Contato e DPO' },
]

/* ============================================================
   Hero
   ============================================================ */

function PageHero() {
  return (
    <section className="pp-hero">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="pp-hero__eyebrow">
          <Shield size={16} aria-hidden="true" />
          Privacidade & Proteção de Dados
        </div>
        <h1>Política de Privacidade</h1>
        <p className="pp-hero__subtitle">
          Entenda como a UNI Gestão de Pessoas coleta, usa e protege seus dados
          pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei n° 13.709/2018).
        </p>
        <div className="pp-hero__meta">
          <span>Última atualização: março de 2026</span>
          <span className="pp-hero__meta-sep" aria-hidden="true">·</span>
          <span>Vigência: 01/03/2026</span>
        </div>
      </div>

      {/* Decorações */}
      <div
        aria-hidden="true"
        className="pp-hero__deco pp-hero__deco--1"
      />
      <div
        aria-hidden="true"
        className="pp-hero__deco pp-hero__deco--2"
      />
    </section>
  )
}

/* ============================================================
   Índice / Sidebar de navegação
   ============================================================ */

function Indice({ secaoAtiva }) {
  function handleClick(e, id) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const offset = 88 // altura do header sticky
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <nav className="pp-indice" aria-label="Índice da política de privacidade">
      <p className="pp-indice__titulo">Nesta página</p>
      <ol className="pp-indice__lista">
        {SECOES.map(({ id, titulo }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`pp-indice__link${secaoAtiva === id ? ' pp-indice__link--ativa' : ''}`}
              onClick={(e) => handleClick(e, id)}
            >
              <ChevronRight size={13} aria-hidden="true" />
              {titulo}
            </a>
          </li>
        ))}
      </ol>
      <div className="pp-indice__footer">
        <a href="mailto:privacidade@unigestaodepessoas.com.br" className="pp-indice__dpo">
          <Mail size={14} aria-hidden="true" />
          Falar com o DPO
        </a>
      </div>
    </nav>
  )
}

/* ============================================================
   Conteúdo — seções individuais
   ============================================================ */

function SecaoConteudo() {
  return (
    <div className="pp-conteudo">

      {/* 1. Quem somos */}
      <section id="quem-somos" className="pp-secao">
        <h2>1. Quem somos</h2>
        <p>
          A <strong>UNI Gestão de Pessoas</strong> é uma empresa especializada em recrutamento e
          seleção com abordagem humanizada, fundada com o propósito de conectar profissionais
          talentosos a empresas parceiras de forma ética, transparente e respeitosa.
        </p>
        <p>
          Atuamos como operadores e controladores de dados pessoais nos processos de recrutamento,
          seleção e gestão de banco de talentos, sendo responsáveis pelas decisões sobre o
          tratamento das informações que você nos confia.
        </p>
        <div className="pp-destaque">
          <strong>Controlador dos dados:</strong> UNI Gestão de Pessoas<br />
          <strong>CNPJ:</strong> XX.XXX.XXX/0001-XX<br />
          <strong>Endereço:</strong> São Paulo, SP<br />
          <strong>E-mail de contato:</strong>{' '}
          <a href="mailto:contato@unigestaodepessoas.com.br">contato@unigestaodepessoas.com.br</a>
        </div>
      </section>

      {/* 2. Dados que coletamos */}
      <section id="dados-coletados" className="pp-secao">
        <h2>2. Dados que coletamos</h2>
        <p>
          Coletamos apenas os dados estritamente necessários para as finalidades descritas nesta
          política. Os dados podem ser fornecidos diretamente por você ou gerados automaticamente
          durante a navegação no portal.
        </p>

        <h3>2.1 Dados fornecidos por você (candidatos)</h3>
        <ul className="pp-lista">
          <li><strong>Identificação:</strong> nome completo, CPF (quando solicitado)</li>
          <li><strong>Contato:</strong> endereço de e-mail, número de telefone ou WhatsApp</li>
          <li><strong>Perfil profissional:</strong> área de interesse, cargo pretendido, pretensão salarial, resumo profissional e currículo (PDF, DOC ou DOCX)</li>
          <li><strong>Presença digital:</strong> URL do perfil no LinkedIn (opcional)</li>
          <li><strong>Informações adicionais:</strong> dados inseridos no campo de apresentação pessoal e eventuais informações coletadas durante entrevistas</li>
        </ul>

        <h3>2.2 Dados fornecidos por empresas clientes</h3>
        <ul className="pp-lista">
          <li>Razão social, CNPJ e dados de contato do representante</li>
          <li>Requisitos de vagas e briefings de seleção</li>
        </ul>

        <h3>2.3 Dados coletados automaticamente</h3>
        <ul className="pp-lista">
          <li><strong>Navegação:</strong> endereço IP, tipo de navegador, sistema operacional, páginas visitadas e horário de acesso</li>
          <li><strong>Cookies:</strong> identificadores de sessão e preferências de navegação (veja a seção 8)</li>
          <li><strong>Dispositivo:</strong> resolução de tela e tipo de dispositivo (desktop, mobile, tablet)</li>
        </ul>
      </section>

      {/* 3. Finalidade */}
      <section id="finalidade" className="pp-secao">
        <h2>3. Finalidade do tratamento</h2>
        <p>
          Seus dados são utilizados exclusivamente para as seguintes finalidades:
        </p>
        <ol className="pp-lista pp-lista--numerada">
          <li>
            <strong>Gestão do banco de talentos:</strong> armazenar e organizar currículos e
            perfis profissionais para identificar candidatos compatíveis com vagas abertas ou futuras.
          </li>
          <li>
            <strong>Processos seletivos:</strong> conduzir etapas de triagem, entrevistas e
            avaliações comportamentais para preenchimento de vagas de clientes.
          </li>
          <li>
            <strong>Comunicação sobre oportunidades:</strong> entrar em contato quando surgir
            uma vaga compatível com o seu perfil profissional.
          </li>
          <li>
            <strong>Contato comercial e atendimento:</strong> responder a solicitações,
            proposta comercial e relacionamento com empresas clientes.
          </li>
          <li>
            <strong>Cumprimento de obrigações legais:</strong> atender eventuais requisições
            de autoridades regulatórias ou judiciais.
          </li>
          <li>
            <strong>Melhoria do portal:</strong> análise de uso para aprimorar a experiência
            de navegação (com dados anonimizados sempre que possível).
          </li>
        </ol>
        <div className="pp-alerta">
          Seus dados <strong>nunca serão utilizados para fins de marketing de terceiros</strong>,
          publicidade direcionada ou vendidos a qualquer empresa. O uso é restrito às finalidades
          listadas acima.
        </div>
      </section>

      {/* 4. Base legal (LGPD) */}
      <section id="base-legal" className="pp-secao">
        <h2>4. Base legal (LGPD)</h2>
        <p>
          Todo tratamento de dados que realizamos possui ao menos uma base legal prevista no
          art. 7° da Lei n° 13.709/2018 (LGPD):
        </p>
        <div className="pp-tabela-wrapper">
          <table className="pp-tabela">
            <thead>
              <tr>
                <th>Tratamento</th>
                <th>Base legal (LGPD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cadastro no banco de talentos</td>
                <td>Consentimento do titular (art. 7°, I)</td>
              </tr>
              <tr>
                <td>Participação em processo seletivo</td>
                <td>Execução de contrato ou diligências pré-contratuais (art. 7°, V)</td>
              </tr>
              <tr>
                <td>Envio de comunicações sobre vagas</td>
                <td>Legítimo interesse — finalidade de recrutamento (art. 7°, IX)</td>
              </tr>
              <tr>
                <td>Atendimento a requisições legais</td>
                <td>Cumprimento de obrigação legal ou regulatória (art. 7°, II)</td>
              </tr>
              <tr>
                <td>Análise de navegação no portal</td>
                <td>Legítimo interesse — melhoria de serviço (art. 7°, IX)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Quando o tratamento for baseado no <strong>consentimento</strong>, você pode revogá-lo
          a qualquer momento, conforme explicado na seção 7 (Direitos do titular). A revogação do
          consentimento não afeta a licitude dos tratamentos realizados antes da revogação.
        </p>
      </section>

      {/* 5. Compartilhamento */}
      <section id="compartilhamento" className="pp-secao">
        <h2>5. Compartilhamento de dados</h2>
        <p>
          A UNI Gestão de Pessoas pode compartilhar seus dados nas seguintes situações:
        </p>

        <h3>5.1 Com empresas clientes</h3>
        <p>
          Quando seu perfil for compatível com uma vaga aberta, suas informações profissionais
          poderão ser compartilhadas com a empresa cliente exclusivamente para fins de
          recrutamento. Antes do compartilhamento, você será informado e poderá recusar.
        </p>

        <h3>5.2 Com fornecedores de tecnologia</h3>
        <p>
          Utilizamos prestadores de serviços de infraestrutura (hospedagem, banco de dados,
          armazenamento de arquivos) que atuam como operadores de dados sob nosso controle,
          estando contratualmente obrigados a garantir a segurança das informações.
        </p>

        <h3>5.3 Por obrigação legal</h3>
        <p>
          Poderemos compartilhar dados com autoridades públicas, judiciais ou regulatórias
          quando exigido por lei, ordem judicial ou investigação administrativa.
        </p>

        <div className="pp-alerta pp-alerta--info">
          <strong>O que nunca fazemos:</strong> vender, alugar, ceder ou compartilhar seus dados
          pessoais com terceiros para fins comerciais, publicitários ou de prospecção que não
          estejam relacionados ao processo de recrutamento e seleção.
        </div>
      </section>

      {/* 6. Retenção */}
      <section id="retencao" className="pp-secao">
        <h2>6. Retenção e armazenamento</h2>
        <p>
          O prazo de retenção dos dados varia conforme a finalidade do tratamento:
        </p>
        <ul className="pp-lista">
          <li>
            <strong>Banco de talentos (currículo e dados de candidatos):</strong> os dados são
            mantidos por <strong>2 (dois) anos</strong> a partir do último cadastro ou atualização.
            Após esse prazo, os dados são anonimizados ou excluídos, salvo se houver novo
            consentimento ou obrigação legal.
          </li>
          <li>
            <strong>Processos seletivos concluídos:</strong> dados de candidatos que participaram
            de processos seletivos são retidos por até <strong>5 (cinco) anos</strong> para fins
            de comprovação e defesa em eventuais demandas trabalhistas ou judiciais.
          </li>
          <li>
            <strong>Dados de navegação e logs:</strong> retidos por até <strong>6 (seis) meses</strong>,
            conforme o Marco Civil da Internet (Lei n° 12.965/2014).
          </li>
          <li>
            <strong>Dados de empresas clientes:</strong> mantidos durante a vigência do contrato
            e por até <strong>5 (cinco) anos</strong> após o encerramento, conforme obrigações
            fiscais e legais.
          </li>
        </ul>
        <p>
          Você pode solicitar a exclusão antecipada dos seus dados a qualquer momento,
          conforme descrito na seção 7.
        </p>
      </section>

      {/* 7. Direitos do titular */}
      <section id="direitos" className="pp-secao">
        <h2>7. Direitos do titular</h2>
        <p>
          Nos termos dos arts. 17 a 22 da LGPD, você — enquanto titular dos dados — possui
          os seguintes direitos, que podem ser exercidos a qualquer momento:
        </p>
        <div className="pp-direitos-grid">
          {[
            {
              titulo: 'Acesso',
              desc: 'Confirmar se tratamos seus dados e obter uma cópia das informações que temos sobre você.',
            },
            {
              titulo: 'Correção',
              desc: 'Solicitar a atualização ou correção de dados incompletos, inexatos ou desatualizados.',
            },
            {
              titulo: 'Exclusão',
              desc: 'Pedir a eliminação dos seus dados pessoais do nosso sistema, ressalvadas obrigações legais.',
            },
            {
              titulo: 'Portabilidade',
              desc: 'Receber seus dados em formato estruturado e legível por máquina para transferência a outro serviço.',
            },
            {
              titulo: 'Revogação do consentimento',
              desc: 'Retirar o consentimento dado anteriormente sem prejuízo dos tratamentos já realizados.',
            },
            {
              titulo: 'Oposição',
              desc: 'Opor-se ao tratamento de dados realizado com base em legítimo interesse, quando a lei permitir.',
            },
            {
              titulo: 'Anonimização ou bloqueio',
              desc: 'Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.',
            },
            {
              titulo: 'Informação sobre compartilhamento',
              desc: 'Saber com quais terceiros seus dados foram ou poderão ser compartilhados.',
            },
          ].map(({ titulo, desc }) => (
            <div key={titulo} className="pp-direito-card">
              <h4>{titulo}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
        <p>
          Para exercer qualquer um destes direitos, entre em contato com nosso Encarregado de
          Proteção de Dados (DPO) pelo e-mail{' '}
          <a href="mailto:privacidade@unigestaodepessoas.com.br">
            privacidade@unigestaodepessoas.com.br
          </a>.
          Responderemos em até <strong>15 dias úteis</strong>.
        </p>
      </section>

      {/* 8. Cookies */}
      <section id="cookies" className="pp-secao">
        <h2>8. Cookies e tecnologias similares</h2>
        <p>
          Utilizamos cookies e tecnologias de rastreamento para melhorar a sua experiência no
          portal. Abaixo, descrevemos os tipos de cookies que usamos:
        </p>
        <div className="pp-tabela-wrapper">
          <table className="pp-tabela">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Finalidade</th>
                <th>Duração</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Essenciais</strong></td>
                <td>Funcionamento básico do portal (sessão, segurança)</td>
                <td>Sessão</td>
              </tr>
              <tr>
                <td><strong>Analíticos</strong></td>
                <td>Mensurar visitas, páginas mais acessadas e comportamento de navegação (via Google Analytics ou similar)</td>
                <td>Até 2 anos</td>
              </tr>
              <tr>
                <td><strong>Preferências</strong></td>
                <td>Lembrar configurações e preferências do usuário</td>
                <td>Até 1 ano</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Você pode gerenciar ou desabilitar cookies diretamente nas configurações do seu
          navegador. A desativação de cookies essenciais pode impactar o funcionamento de
          algumas funcionalidades do portal.
        </p>
        <p>
          Não utilizamos cookies de publicidade ou retargeting de terceiros.
        </p>
      </section>

      {/* 9. Segurança */}
      <section id="seguranca" className="pp-secao">
        <h2>9. Segurança da informação</h2>
        <p>
          Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados
          pessoais contra acesso não autorizado, perda, destruição ou divulgação indevida:
        </p>
        <ul className="pp-lista">
          <li>Transmissão de dados via protocolo HTTPS com certificado SSL/TLS</li>
          <li>Armazenamento em servidores seguros com controle de acesso por autenticação</li>
          <li>Acesso restrito aos dados apenas a colaboradores que necessitem para exercer suas funções</li>
          <li>Treinamento periódico da equipe sobre boas práticas de segurança e privacidade</li>
          <li>Monitoramento de incidentes e plano de resposta a violações de dados</li>
        </ul>
        <p>
          Em caso de incidente de segurança que possa representar risco aos titulares, notificaremos
          a Autoridade Nacional de Proteção de Dados (ANPD) e os titulares afetados nos prazos
          previstos na LGPD.
        </p>
      </section>

      {/* 10. Menores */}
      <section id="menores" className="pp-secao">
        <h2>10. Menores de idade</h2>
        <p>
          Nosso portal e os serviços de recrutamento são destinados a maiores de 18 (dezoito)
          anos ou jovens aprendizes na forma da lei (a partir de 14 anos, com consentimento dos
          responsáveis legais).
        </p>
        <p>
          Não coletamos intencionalmente dados de menores de 14 anos. Caso identifiquemos
          que dados de uma criança foram coletados sem o consentimento adequado, procederemos
          à eliminação imediata dessas informações.
        </p>
      </section>

      {/* 11. Alterações */}
      <section id="alteracoes" className="pp-secao">
        <h2>11. Alterações desta política</h2>
        <p>
          Esta Política de Privacidade pode ser atualizada periodicamente para refletir
          mudanças nas nossas práticas de tratamento de dados, em legislações aplicáveis ou
          em melhorias operacionais.
        </p>
        <p>
          Quando realizarmos alterações relevantes, notificaremos por e-mail os titulares
          cadastrados ou exibiremos aviso em destaque no portal, indicando a nova data de
          vigência. O uso continuado do portal após as alterações implica concordância com
          a versão atualizada da política.
        </p>
        <p>
          Recomendamos que você revise esta página periodicamente. A versão vigente é
          sempre a disponível nesta URL.
        </p>
      </section>

      {/* 12. Contato / DPO */}
      <section id="contato" className="pp-secao">
        <h2>12. Contato e DPO</h2>
        <p>
          Se você tiver dúvidas sobre esta Política de Privacidade, desejar exercer seus
          direitos como titular ou precisar reportar um incidente de segurança, entre em
          contato com nosso <strong>Encarregado de Proteção de Dados (DPO)</strong>:
        </p>
        <div className="pp-destaque pp-destaque--dpo">
          <div className="pp-dpo-grid">
            <div>
              <strong>Encarregado (DPO)</strong><br />
              UNI Gestão de Pessoas — Privacidade de Dados
            </div>
            <div>
              <strong>E-mail</strong><br />
              <a href="mailto:privacidade@unigestaodepessoas.com.br">
                privacidade@unigestaodepessoas.com.br
              </a>
            </div>
            <div>
              <strong>Prazo de resposta</strong><br />
              Até 15 dias úteis
            </div>
            <div>
              <strong>Horário de atendimento</strong><br />
              Segunda a sexta, 9h às 18h
            </div>
          </div>
        </div>
        <p>
          Você também pode registrar reclamações perante a{' '}
          <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong> pelo site{' '}
          <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">
            www.gov.br/anpd
          </a>.
        </p>
        <div className="pp-cta">
          <p>Tem alguma dúvida sobre seus dados?</p>
          <Link to="/contato" className="pp-cta__link">
            Fale conosco
          </Link>
          <a href="mailto:privacidade@unigestaodepessoas.com.br" className="pp-cta__link pp-cta__link--outline">
            E-mail do DPO
          </a>
        </div>
      </section>

    </div>
  )
}

/* ============================================================
   Botão "voltar ao topo"
   ============================================================ */

function VoltarTopo() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisivel(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`pp-voltar-topo${visivel ? ' pp-voltar-topo--visivel' : ''}`}
      onClick={handleClick}
      aria-label="Voltar ao topo da página"
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  )
}

/* ============================================================
   Página principal
   ============================================================ */

export function PoliticaPrivacidade() {
  const [secaoAtiva, setSecaoAtiva] = useState(SECOES[0].id)
  const observerRef = useRef(null)

  // Intersection Observer para destacar a seção ativa no índice
  useEffect(() => {
    const ids = SECOES.map((s) => s.id)
    const elementos = ids.map((id) => document.getElementById(id)).filter(Boolean)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSecaoAtiva(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    )

    elementos.forEach((el) => observerRef.current.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <>
      <PageHero />

      <div className="pp-body">
        <div className="container">
          <div className="pp-layout">
            <aside className="pp-sidebar">
              <div className="pp-sidebar__sticky">
                <Indice secaoAtiva={secaoAtiva} />
              </div>
            </aside>
            <SecaoConteudo />
          </div>
        </div>
      </div>

      <VoltarTopo />
    </>
  )
}

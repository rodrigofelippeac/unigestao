import { UserCheck, Search, Brain, TrendingUp, Star, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import styles from './Servicos.module.css'

function PageHero() {
  return (
    <section className="page-hero">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ color: 'var(--color-accent-yellow)', fontWeight: 600, marginBottom: 12, fontSize: 'var(--font-size-sm)' }}>
          O que fazemos
        </p>
        <h1>Nossos Serviços</h1>
        <p>
          Soluções completas em Gestão de Pessoas para empresas que acreditam
          no potencial humano como diferencial competitivo.
        </p>
      </div>
    </section>
  )
}

const servicos = [
  {
    id: 'recrutamento',
    icon: <UserCheck size={40} />,
    titulo: 'Recrutamento & Seleção',
    subtitulo: 'Processo completo do briefing aos finalistas',
    descricao:
      'Conduzimos processos seletivos completos, desde o entendimento profundo da vaga e da cultura da empresa até a apresentação dos candidatos finalistas. Cada etapa é cuidadosamente estruturada para garantir assertividade e agilidade.',
    beneficios: [
      'Briefing detalhado com mapeamento cultural',
      'Divulgação multicanal estratégica',
      'Triagem criteriosa com análise curricular',
      'Entrevistas comportamentais por competências',
      'Avaliação psicológica dos finalistas',
      'Relatório completo de cada candidato',
      'Acompanhamento pós-contratação por 3 meses',
    ],
    indicado: 'Empresas que precisam preencher vagas operacionais a gerenciais com qualidade e agilidade.',
    cor: 'primary',
    imagem: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    id: 'hunting',
    icon: <Search size={40} />,
    titulo: 'Hunting Executivo',
    subtitulo: 'Busca ativa de talentos de alta performance',
    descricao:
      'Buscamos ativamente profissionais que não estão necessariamente no mercado — aqueles que fazem a diferença onde estão. Ideal para posições estratégicas, de liderança e alta especialização onde o método tradicional não é suficiente.',
    beneficios: [
      'Mapeamento de mercado e mapeamento de concorrência',
      'Abordagem direta de profissionais qualificados',
      'Processo totalmente confidencial',
      'Avaliação técnica e comportamental completa',
      'Gestão de todo o processo de negociação',
      'Garantia estendida de até 6 meses',
    ],
    indicado: 'Empresas que buscam C-Level, diretores, gerentes sênior e especialistas de nicho.',
    cor: 'orange',
    imagem: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    id: 'assessment',
    icon: <Brain size={40} />,
    titulo: 'Assessment Comportamental',
    subtitulo: 'Avaliação psicológica e comportamental',
    descricao:
      'Aplicamos instrumentos psicológicos validados para mapear comportamentos, motivações, potenciais e riscos dos candidatos. Um diferencial que aumenta significativamente a assertividade nas contratações.',
    beneficios: [
      'Testes psicométricos validados pelo CFP',
      'Avaliação por competências comportamentais',
      'Dinâmicas de grupo para posições gerenciais',
      'Relatório psicológico detalhado',
      'Laudo de aptidão para a função',
      'Feedback humanizado para todos os participantes',
    ],
    indicado: 'Para qualquer processo seletivo onde a adequação comportamental é crítica para o sucesso.',
    cor: 'yellow',
    imagem: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    id: 'consultoria',
    icon: <TrendingUp size={40} />,
    titulo: 'Consultoria de RH',
    subtitulo: 'Estratégia e estruturação da área de pessoas',
    descricao:
      'Apoiamos empresas a estruturar, profissionalizar e otimizar sua área de Recursos Humanos. Da definição de políticas de RH até a implementação de processos de gestão de desempenho e desenvolvimento.',
    beneficios: [
      'Diagnóstico completo da área de RH',
      'Estruturação de políticas e processos',
      'Implementação de gestão de desempenho',
      'Programas de desenvolvimento de lideranças',
      'Planos de carreira e sucessão',
      'Indicadores e métricas de RH (People Analytics)',
    ],
    indicado: 'Empresas em crescimento que precisam profissionalizar a gestão de pessoas.',
    cor: 'primary',
    imagem: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    id: 'employer-branding',
    icon: <Star size={40} />,
    titulo: 'Employer Branding',
    subtitulo: 'Construção da marca empregadora',
    descricao:
      'Ajudamos sua empresa a se posicionar como um lugar onde as pessoas querem trabalhar. Uma marca empregadora forte atrai talentos melhores, reduz o custo de contratação e aumenta a retenção.',
    beneficios: [
      'Diagnóstico de marca empregadora (EVP)',
      'Pesquisa de satisfação e clima organizacional',
      'Definição da proposta de valor ao empregado',
      'Estratégia de comunicação interna e externa',
      'Presença em plataformas como LinkedIn e Glassdoor',
      'Conteúdo estratégico para atração de talentos',
    ],
    indicado: 'Empresas que enfrentam dificuldade em atrair e reter bons profissionais.',
    cor: 'orange',
    imagem: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
]

function ServicoCard({ servico, reverse }) {
  const corMap = { primary: 'var(--color-primary)', yellow: 'var(--color-accent-yellow)', orange: 'var(--color-accent-orange)' }
  const corBg = { primary: 'rgba(34,73,118,.08)', yellow: 'rgba(251,183,36,.12)', orange: 'rgba(235,128,42,.1)' }

  return (
    <div id={servico.id} className={`${styles.servicoSection} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.servicoImage}>
        <img src={servico.imagem} alt={servico.titulo} />
        <div
          className={styles.servicoImageAccent}
          style={{ background: corMap[servico.cor] }}
          aria-hidden="true"
        />
      </div>
      <div className={styles.servicoContent}>
        <div
          className={styles.servicoIconWrap}
          style={{ background: corBg[servico.cor], color: corMap[servico.cor] }}
        >
          {servico.icon}
        </div>
        <p className={styles.servicoSubtitulo}>{servico.subtitulo}</p>
        <h2 className={styles.servicoTitulo}>{servico.titulo}</h2>
        <p className={styles.servicoDesc}>{servico.descricao}</p>

        <div className={styles.beneficiosList}>
          <h4>O que está incluído:</h4>
          <ul>
            {servico.beneficios.map((b) => (
              <li key={b}>
                <CheckCircle size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.indicadoPara}>
          <strong>Indicado para:</strong> {servico.indicado}
        </div>

        <Button to="/contato" variant="primary" size="lg">
          Solicitar proposta
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  )
}

function CTAServicos() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', alignItems: 'center' }}>
          <h2>Não sabe qual serviço é ideal?</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-md)', lineHeight: 'var(--line-height-loose)' }}>
            Fale conosco sem compromisso. Nossa equipe analisa sua necessidade e indica
            a solução mais adequada para o seu momento.
          </p>
          <Button to="/contato" variant="accent" size="xl">
            Conversar com especialista
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  )
}

export function Servicos() {
  return (
    <>
      <PageHero />
      <section className="section">
        <div className="container">
          {servicos.map((s, i) => (
            <ServicoCard key={s.id} servico={s} reverse={i % 2 !== 0} />
          ))}
        </div>
      </section>
      <CTAServicos />
    </>
  )
}

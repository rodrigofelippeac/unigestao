import { Link } from 'react-router-dom'
import {
  Heart, Users, Brain, Zap, Star, ArrowRight,
  CheckCircle, Building2, UserCheck, TrendingUp, Shield
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { depoimentos } from '../../data/depoimentos'
import { vagas } from '../../data/vagas'
import styles from './Home.module.css'

/* ─── Hero ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className={styles.hero}>
      {/* Decorative blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroContent}>
          <span className={styles.heroPill}>Recrutamento &amp; Seleção Humanizado</span>
          <h1 className={styles.heroTitle}>
            Conectamos{' '}
            <span className={styles.heroHighlight}>talentos</span>{' '}
            e empresas com{' '}
            <span className={styles.heroHighlight2}>propósito</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Processos seletivos com visão psicológica, foco em fit cultural e abordagem
            humanizada — para empresas que entendem que pessoas são o maior ativo.
          </p>
          <div className={styles.heroCtas}>
            <Button to="/contato" variant="accent" size="xl">
              Contratar para empresa
              <ArrowRight size={18} />
            </Button>
            <Button to="/vagas" variant="outline-white" size="xl">
              Ver vagas abertas
            </Button>
          </div>
          <div className={styles.heroTrust}>
            <span className={styles.trustItem}><CheckCircle size={16} />+150 vagas preenchidas</span>
            <span className={styles.trustItem}><CheckCircle size={16} />+80 empresas parceiras</span>
            <span className={styles.trustItem}><CheckCircle size={16} />92% de retenção</span>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&fit=crop"
            alt="Equipe reunida em ambiente colaborativo"
            loading="eager"
          />
          <div className={styles.heroImageBadge}>
            <Heart size={20} fill="currentColor" />
            <span>Recrutamento<br />Humanizado</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Diferenciais ─────────────────────────────────────────── */
const diferenciais = [
  {
    icon: <Brain size={28} />,
    titulo: 'Visão Psicológica',
    descricao: 'Avaliação comportamental e testes psicométricos aplicados por psicóloga especialista em organizações.',
    cor: 'yellow',
  },
  {
    icon: <Heart size={28} />,
    titulo: 'Abordagem Humanizada',
    descricao: 'Cada candidato é tratado com respeito e recebe feedback. Processos éticos e transparentes.',
    cor: 'orange',
  },
  {
    icon: <Users size={28} />,
    titulo: 'Fit Cultural',
    descricao: 'Mapeamos a cultura da empresa para encontrar candidatos que se identificam com os valores do negócio.',
    cor: 'primary',
  },
  {
    icon: <Zap size={28} />,
    titulo: 'Agilidade',
    descricao: 'Processos otimizados com entrega de finalistas em até 15 dias úteis, sem abrir mão da qualidade.',
    cor: 'yellow',
  },
]

function Diferenciais() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Por que escolher a UNI?</h2>
          <p>Combinamos tecnologia, psicologia e humanidade para entregar os melhores talentos.</p>
        </div>
        <div className={`grid grid--4 ${styles.diferencialGrid}`}>
          {diferenciais.map((d) => (
            <div key={d.titulo} className={styles.diferencialCard}>
              <div className={`icon-circle icon-circle--${d.cor}`}>
                {d.icon}
              </div>
              <h3>{d.titulo}</h3>
              <p>{d.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Como Funciona ────────────────────────────────────────── */
const etapas = [
  { n: '01', titulo: 'Briefing',         desc: 'Reunião de alinhamento para entender profundamente a vaga, cultura da empresa e perfil ideal do candidato.' },
  { n: '02', titulo: 'Atração',          desc: 'Divulgação estratégica e busca ativa de talentos em múltiplas plataformas e nossa base de candidatos.' },
  { n: '03', titulo: 'Triagem',          desc: 'Análise criteriosa de currículos e pré-seleção dos perfis mais aderentes à vaga e à empresa.' },
  { n: '04', titulo: 'Entrevistas',      desc: 'Entrevistas comportamentais por competências conduzidas por consultores especializados.' },
  { n: '05', titulo: 'Assessment',       desc: 'Avaliação psicológica e comportamental com testes validados para candidatos finalistas.' },
  { n: '06', titulo: 'Finalistas',       desc: 'Apresentação dos melhores perfis com relatório completo para apoiar a decisão da empresa.' },
  { n: '07', titulo: 'Apoio à Decisão', desc: 'Suporte na negociação, feedback aos candidatos e acompanhamento pós-contratação.' },
]

function ComoFunciona() {
  return (
    <section className={`section section--alt`}>
      <div className="container">
        <div className="section-header">
          <h2>Como funciona nosso processo</h2>
          <p>Metodologia estruturada que garante assertividade em cada contratação.</p>
        </div>
        <div className={styles.etapasGrid}>
          {etapas.map((e) => (
            <div key={e.n} className={styles.etapaCard}>
              <div className={styles.etapaNum}>{e.n}</div>
              <div>
                <h3 className={styles.etapaTitulo}>{e.titulo}</h3>
                <p className={styles.etapaDesc}>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Serviços Destaque ─────────────────────────────────────── */
const servicosDestaque = [
  {
    icon: <UserCheck size={32} />,
    titulo: 'Recrutamento & Seleção',
    descricao: 'Processo completo: da triagem à apresentação dos finalistas, com assessment comportamental incluído.',
    link: '/servicos#recrutamento',
  },
  {
    icon: <Building2 size={32} />,
    titulo: 'Hunting Executivo',
    descricao: 'Busca ativa de profissionais de alta performance para cargos estratégicos e de liderança.',
    link: '/servicos#hunting',
  },
  {
    icon: <Brain size={32} />,
    titulo: 'Assessment Comportamental',
    descricao: 'Avaliações psicológicas e comportamentais para apoiar decisões de contratação e desenvolvimento.',
    link: '/servicos#assessment',
  },
  {
    icon: <TrendingUp size={32} />,
    titulo: 'Consultoria de RH',
    descricao: 'Orientação estratégica para estruturar e otimizar a área de pessoas do seu negócio.',
    link: '/servicos#consultoria',
  },
]

function ServicosDestaque() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Nossos serviços</h2>
          <p>Soluções completas em Gestão de Pessoas para empresas de todos os portes.</p>
        </div>
        <div className="grid grid--4">
          {servicosDestaque.map((s) => (
            <Link key={s.titulo} to={s.link} className={styles.servicoCard}>
              <div className={styles.servicoIcon}>{s.icon}</div>
              <h3 className={styles.servicoTitulo}>{s.titulo}</h3>
              <p className={styles.servicoDesc}>{s.descricao}</p>
              <span className={styles.servicoLink}>
                Saiba mais <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
          <Button to="/servicos" variant="secondary" size="lg">
            Ver todos os serviços
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ─── Stats ─────────────────────────────────────────────────── */
function Stats() {
  return (
    <section className={`section section--dark ${styles.statsSection}`}>
      <div className="container">
        <div className={styles.statsGrid}>
          {[
            { n: '+150', l: 'Vagas preenchidas' },
            { n: '+80',  l: 'Empresas parceiras' },
            { n: '92%',  l: 'Taxa de retenção' },
            { n: '15',   l: 'Dias médios por processo' },
          ].map(({ n, l }) => (
            <div key={l} className="stat-item">
              <div className="stat-item__number">{n}</div>
              <div className="stat-item__label">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Depoimentos ───────────────────────────────────────────── */
function Depoimentos() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section-header">
          <h2>O que nossos clientes dizem</h2>
          <p>Empresas que confiam na UNI para seus processos seletivos.</p>
        </div>
        <div className="grid grid--3">
          {depoimentos.map((d) => (
            <div key={d.id} className="testimonial-card">
              <div className="stars">
                {Array.from({ length: d.estrelas }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-card__text">{d.texto}</p>
              <div className="testimonial-card__author">
                <img
                  src={d.foto}
                  alt={d.nome}
                  className="testimonial-card__avatar"
                />
                <div>
                  <div className="testimonial-card__name">{d.nome}</div>
                  <div className="testimonial-card__role">{d.cargo} · {d.empresa}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Vagas em Destaque ─────────────────────────────────────── */
function VagasDestaque() {
  const vagasDestaque = vagas.filter((v) => v.destaque).slice(0, 3)
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Vagas em destaque</h2>
          <p>Oportunidades abertas para profissionais qualificados.</p>
        </div>
        <div className="grid grid--3">
          {vagasDestaque.map((v) => (
            <Link key={v.id} to={`/vagas/${v.slug}`} className={styles.vagaCard}>
              <div className={styles.vagaCardTop}>
                <span className={`badge badge--${v.nivel === 'Sênior' ? 'orange' : v.nivel === 'Pleno' ? 'primary' : 'muted'}`}>
                  {v.nivel}
                </span>
                <span className={`badge badge--muted`}>{v.modalidade}</span>
              </div>
              <h3 className={styles.vagaTitle}>{v.titulo}</h3>
              <p className={styles.vagaEmpresa}>{v.empresa}</p>
              <p className={styles.vagaInfo}>{v.localidade} · {v.regime}</p>
              {v.salario && <p className={styles.vagaSalario}>{v.salario}</p>}
              <span className={styles.vagaLink}>
                Ver vaga <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
          <Button to="/vagas" variant="secondary" size="lg">
            Ver todas as vagas
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Final ─────────────────────────────────────────────── */
function CTAFinal() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaBlob1} aria-hidden="true" />
      <div className={styles.ctaBlob2} aria-hidden="true" />
      <div className="container">
        <div className={styles.ctaInner}>
          <Shield size={48} color="var(--color-accent-yellow)" />
          <h2 className={styles.ctaTitle}>
            Faça parte do nosso{' '}
            <span style={{ color: 'var(--color-accent-yellow)' }}>banco de talentos</span>
          </h2>
          <p className={styles.ctaSubtitle}>
            Cadastre seu currículo e seja encontrado pelas melhores oportunidades.
            A UNI conecta talentos às empresas certas.
          </p>
          <div className={styles.ctaBtns}>
            <Button to="/banco-talentos" variant="accent" size="xl">
              Cadastrar currículo agora
              <ArrowRight size={18} />
            </Button>
            <Button to="/vagas" variant="outline-white" size="xl">
              Ver vagas abertas
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */
export function Home() {
  return (
    <>
      <Hero />
      <Diferenciais />
      <ComoFunciona />
      <ServicosDestaque />
      <Stats />
      <Depoimentos />
      <VagasDestaque />
      <CTAFinal />
    </>
  )
}

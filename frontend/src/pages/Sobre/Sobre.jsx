import { Heart, Target, Eye, Star, Linkedin } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { equipe } from '../../data/equipe'
import styles from './Sobre.module.css'

function PageHero() {
  return (
    <section className="page-hero">
      <div className="blob1" style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'var(--color-accent-yellow)', opacity: 0.06,
        top: -100, right: -50, pointerEvents: 'none'
      }} aria-hidden="true" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ color: 'var(--color-accent-yellow)', fontWeight: 600, marginBottom: 12, fontSize: 'var(--font-size-sm)' }}>
          Quem somos
        </p>
        <h1>Sobre a UNI Gestão de Pessoas</h1>
        <p style={{ maxWidth: 560 }}>
          Uma empresa fundada com a missão de transformar o jeito como as organizações contratam —
          com humanidade, psicologia e propósito.
        </p>
      </div>
    </section>
  )
}

function Historia() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.historiaGrid}>
          <div className={styles.historiaImage}>
            <img
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop"
              alt="Equipe UNI em reunião"
            />
            <div className={styles.historiaImageOverlay}>
              <span>Desde 2018 conectando talentos</span>
            </div>
          </div>
          <div className={styles.historiaContent}>
            <span className={styles.label}>Nossa história</span>
            <h2>Nascemos da crença de que<br /> contratar pode ser diferente</h2>
            <p>
              A UNI Gestão de Pessoas nasceu em 2018, quando a psicóloga Ana Paula Rodrigues
              percebeu que os processos seletivos do mercado ignoravam o que realmente importa:
              as pessoas.
            </p>
            <p>
              Cansada de ver candidatos desrespeitados e empresas sofrendo com contratações
              equivocadas, ela fundou a UNI com uma proposta diferente: um recrutamento que
              coloca o humano no centro — sem abrir mão de rigor técnico e assertividade.
            </p>
            <p>
              Hoje, atendemos mais de 80 empresas parceiras e já ajudamos mais de 150 profissionais
              a encontrarem sua vaga ideal. Nossa taxa de retenção de 92% fala por si.
            </p>
            <Button to="/contato" variant="primary" size="lg" style={{ marginTop: 8 }}>
              Fale conosco
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

const mvv = [
  {
    icon: <Target size={28} />,
    titulo: 'Missão',
    texto: 'Conectar talentos e empresas de forma humanizada, ética e assertiva, gerando valor duradouro para pessoas e organizações.',
    cor: 'yellow',
  },
  {
    icon: <Eye size={28} />,
    titulo: 'Visão',
    texto: 'Ser a consultoria de recrutamento mais confiável do Brasil, reconhecida pela excelência humana e pelo impacto positivo no mercado de trabalho.',
    cor: 'orange',
  },
  {
    icon: <Heart size={28} />,
    titulo: 'Valores',
    lista: ['Humanidade em primeiro lugar', 'Ética e transparência', 'Excelência técnica', 'Impacto positivo', 'Diversidade e inclusão'],
    cor: 'primary',
  },
]

function MVV() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section-header">
          <h2>Missão, Visão e Valores</h2>
          <p>Os princípios que guiam cada decisão da UNI.</p>
        </div>
        <div className="grid grid--3">
          {mvv.map((item) => (
            <div key={item.titulo} className={styles.mvvCard}>
              <div className={`icon-circle icon-circle--${item.cor}`}>
                {item.icon}
              </div>
              <h3>{item.titulo}</h3>
              {item.texto && <p>{item.texto}</p>}
              {item.lista && (
                <ul className={styles.mvvList}>
                  {item.lista.map((l) => (
                    <li key={l}>
                      <Star size={12} color="var(--color-accent-yellow)" fill="var(--color-accent-yellow)" />
                      {l}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Equipe() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Nossa equipe</h2>
          <p>Profissionais apaixonados por pessoas e pelo que fazem.</p>
        </div>
        <div className="grid grid--3">
          {equipe.map((m) => (
            <div key={m.id} className={styles.membroCard}>
              <div className={styles.membroFotoWrapper}>
                <img src={m.foto} alt={m.nome} className={styles.membroFoto} />
              </div>
              <div className={styles.membroInfo}>
                <h3 className={styles.membroNome}>{m.nome}</h3>
                <p className={styles.membroCargo}>{m.cargo}</p>
                <span className={`badge badge--primary`} style={{ marginBlock: 8 }}>{m.especialidade}</span>
                <p className={styles.membroBio}>{m.bio}</p>
                <a href={m.linkedin} className={styles.membroLinkedin} aria-label={`LinkedIn de ${m.nome}`}>
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Numeros() {
  return (
    <section className="section section--dark">
      <div className="container">
        <div className="section-header">
          <h2>Nossos resultados</h2>
          <p style={{ color: 'rgba(255,255,255,.65)' }}>Números que refletem nosso comprometimento.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-lg)' }}>
          {[
            { n: '+150', l: 'Vagas preenchidas' },
            { n: '+80', l: 'Empresas parceiras' },
            { n: '92%', l: 'Taxa de retenção' },
            { n: '6+', l: 'Anos de mercado' },
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

export function Sobre() {
  return (
    <>
      <PageHero />
      <Historia />
      <MVV />
      <Equipe />
      <Numeros />
    </>
  )
}

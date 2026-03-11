import { useParams, Link } from 'react-router-dom'
import { MapPin, Briefcase, Clock, ArrowLeft, CheckCircle, Gift, Send } from 'lucide-react'
import { vagas } from '../../data/vagas'
import { Button } from '../../components/ui/Button'
import styles from './VagaDetalhe.module.css'

export function VagaDetalhe() {
  const { slug } = useParams()
  const vaga = vagas.find((v) => v.slug === slug)

  if (!vaga) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-state">
            <h3>Vaga não encontrada</h3>
            <p>Esta vaga pode ter sido encerrada ou o link está incorreto.</p>
            <Button to="/vagas" variant="primary" size="md" style={{ marginTop: 16 }}>
              Ver todas as vagas
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const nivelColor = { Sênior: 'orange', Pleno: 'primary', Júnior: 'muted' }

  return (
    <>
      {/* Back nav */}
      <div className={styles.backNav}>
        <div className="container">
          <Link to="/vagas" className={styles.backLink}>
            <ArrowLeft size={16} />
            Voltar para vagas
          </Link>
        </div>
      </div>

      {/* Hero da vaga */}
      <section className={styles.vagaHero}>
        <div className="container">
          <div className={styles.vagaHeroInner}>
            <div className={styles.vagaHeroContent}>
              <div className={styles.vagaBadges}>
                <span className={`badge badge--${nivelColor[vaga.nivel] || 'muted'}`}>{vaga.nivel}</span>
                <span className="badge badge--muted">{vaga.modalidade}</span>
                <span className="badge badge--muted">{vaga.regime}</span>
                {vaga.destaque && <span className="badge badge--yellow">Destaque</span>}
              </div>
              <h1 className={styles.vagaTitulo}>{vaga.titulo}</h1>
              <p className={styles.vagaEmpresa}>{vaga.empresa}</p>

              <div className={styles.vagaMeta}>
                <span className={styles.vagaMetaItem}>
                  <MapPin size={16} />
                  {vaga.localidade}
                </span>
                <span className={styles.vagaMetaItem}>
                  <Briefcase size={16} />
                  {vaga.area}
                </span>
                <span className={styles.vagaMetaItem}>
                  <Clock size={16} />
                  Publicada em {new Date(vaga.dataPublicacao).toLocaleDateString('pt-BR')}
                </span>
              </div>

              {vaga.salario && (
                <p className={styles.vagaSalario}>Faixa salarial: {vaga.salario}</p>
              )}
            </div>

            <div className={styles.vagaHeroCta}>
              <Button to={`/contato?vaga=${vaga.slug}`} variant="accent" size="xl" full>
                <Send size={18} />
                Candidatar-se agora
              </Button>
              <p className={styles.vagaHeroNote}>
                Ao se candidatar, nosso time analisará seu perfil e entrará em contato em até 5 dias úteis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="section">
        <div className="container">
          <div className={styles.vagaLayout}>
            {/* Main content */}
            <div className={styles.vagaMain}>
              <div className={styles.vagaBlock}>
                <h2>Sobre a vaga</h2>
                <p>{vaga.descricao}</p>
              </div>

              <div className={styles.vagaBlock}>
                <h2>Requisitos</h2>
                <ul className={styles.checkList}>
                  {vaga.requisitos.map((r) => (
                    <li key={r}>
                      <CheckCircle size={18} className={styles.checkIcon} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.vagaBlock}>
                <h2>Benefícios</h2>
                <ul className={styles.beneficiosList}>
                  {vaga.beneficios.map((b) => (
                    <li key={b}>
                      <Gift size={16} className={styles.giftIcon} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className={styles.vagaSidebar}>
              <div className={styles.sidebarCard}>
                <h3>Detalhes da vaga</h3>
                <dl className={styles.details}>
                  <div>
                    <dt>Área</dt>
                    <dd>{vaga.area}</dd>
                  </div>
                  <div>
                    <dt>Nível</dt>
                    <dd>{vaga.nivel}</dd>
                  </div>
                  <div>
                    <dt>Regime</dt>
                    <dd>{vaga.regime}</dd>
                  </div>
                  <div>
                    <dt>Modalidade</dt>
                    <dd>{vaga.modalidade}</dd>
                  </div>
                  <div>
                    <dt>Localidade</dt>
                    <dd>{vaga.localidade}</dd>
                  </div>
                  {vaga.salario && (
                    <div>
                      <dt>Salário</dt>
                      <dd style={{ color: 'var(--color-success)', fontWeight: 700 }}>{vaga.salario}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className={styles.sidebarCta}>
                <h3>Processo humanizado</h3>
                <p>
                  Na UNI, todos os candidatos recebem feedback ao final do processo — aprovados ou não.
                  Acreditamos que respeito e transparência fazem parte de um recrutamento de qualidade.
                </p>
                <Button to={`/contato?vaga=${vaga.slug}`} variant="accent" size="lg" full>
                  <Send size={16} />
                  Candidatar-se
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Outras vagas */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <h2>Outras vagas</h2>
            <p>Confira mais oportunidades disponíveis.</p>
          </div>
          <div className="grid grid--3">
            {vagas.filter((v) => v.slug !== slug).slice(0, 3).map((v) => (
              <Link key={v.id} to={`/vagas/${v.slug}`} className={styles.mini}>
                <span className={`badge badge--${nivelColor[v.nivel] || 'muted'}`}>{v.nivel}</span>
                <h4>{v.titulo}</h4>
                <p>{v.empresa}</p>
                <span className={styles.miniLink}>Ver vaga <ArrowLeft size={12} style={{ transform: 'rotate(180deg)' }} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

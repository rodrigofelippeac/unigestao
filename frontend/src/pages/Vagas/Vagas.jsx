import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Briefcase, Clock, Search, SlidersHorizontal, ArrowRight, X } from 'lucide-react'
import { vagas, areas, niveis, modalidades } from '../../data/vagas'
import { Button } from '../../components/ui/Button'
import styles from './Vagas.module.css'

function PageHero() {
  return (
    <section className="page-hero">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ color: 'var(--color-accent-yellow)', fontWeight: 600, marginBottom: 12, fontSize: 'var(--font-size-sm)' }}>
          Oportunidades abertas
        </p>
        <h1>Vagas disponíveis</h1>
        <p>
          Encontre a oportunidade certa para o próximo passo da sua carreira.
          Processos seletivos humanizados, transparentes e com feedback garantido.
        </p>
      </div>
    </section>
  )
}

function VagaCard({ vaga }) {
  const nivelColor = { Sênior: 'orange', Pleno: 'primary', Júnior: 'muted' }

  return (
    <Link to={`/vagas/${vaga.slug}`} className={styles.vagaCard}>
      <div className={styles.vagaCardHeader}>
        <div className={styles.vagaBadges}>
          <span className={`badge badge--${nivelColor[vaga.nivel] || 'muted'}`}>{vaga.nivel}</span>
          <span className="badge badge--muted">{vaga.modalidade}</span>
          {vaga.destaque && <span className="badge badge--yellow">Destaque</span>}
        </div>
        <span className={styles.vagaArea}>{vaga.area}</span>
      </div>

      <h3 className={styles.vagaTitulo}>{vaga.titulo}</h3>
      <p className={styles.vagaEmpresa}>{vaga.empresa}</p>

      <div className={styles.vagaMeta}>
        <span className={styles.vagaMetaItem}>
          <MapPin size={14} />
          {vaga.localidade}
        </span>
        <span className={styles.vagaMetaItem}>
          <Briefcase size={14} />
          {vaga.regime}
        </span>
      </div>

      <p className={styles.vagaResumo}>{vaga.descricao.slice(0, 120)}...</p>

      {vaga.salario && (
        <p className={styles.vagaSalario}>{vaga.salario}</p>
      )}

      <div className={styles.vagaFooter}>
        <span className={styles.vagaData}>
          <Clock size={13} />
          {new Date(vaga.dataPublicacao).toLocaleDateString('pt-BR')}
        </span>
        <span className={styles.vagaLink}>
          Ver detalhes <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  )
}

export function Vagas() {
  const [busca, setBusca] = useState('')
  const [area, setArea] = useState('Todos')
  const [nivel, setNivel] = useState('Todos')
  const [modalidade, setModalidade] = useState('Todos')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const vagasFiltradas = useMemo(() => {
    return vagas.filter((v) => {
      const matchBusca = busca === '' ||
        v.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        v.empresa.toLowerCase().includes(busca.toLowerCase()) ||
        v.area.toLowerCase().includes(busca.toLowerCase())
      const matchArea = area === 'Todos' || v.area === area
      const matchNivel = nivel === 'Todos' || v.nivel === nivel
      const matchModalidade = modalidade === 'Todos' || v.modalidade === modalidade
      return matchBusca && matchArea && matchNivel && matchModalidade
    })
  }, [busca, area, nivel, modalidade])

  const hasFilters = area !== 'Todos' || nivel !== 'Todos' || modalidade !== 'Todos' || busca !== ''

  function clearFilters() {
    setBusca('')
    setArea('Todos')
    setNivel('Todos')
    setModalidade('Todos')
  }

  return (
    <>
      <PageHero />

      <section className="section">
        <div className="container">
          {/* Search bar */}
          <div className={styles.searchBar}>
            <div className={styles.searchInputWrap}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar por cargo, empresa ou área..."
                className={`form-input ${styles.searchInput}`}
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <button
              className={`btn btn--secondary btn--md ${styles.filterToggle}`}
              onClick={() => setFiltersOpen((v) => !v)}
            >
              <SlidersHorizontal size={16} />
              Filtros
              {hasFilters && <span className={styles.filterBadge} />}
            </button>
          </div>

          {/* Filters */}
          {filtersOpen && (
            <div className={styles.filtersPanel}>
              <div className={styles.filtersGrid}>
                <div className="form-group">
                  <label className="form-label">Área</label>
                  <select className="form-select" value={area} onChange={(e) => setArea(e.target.value)}>
                    {areas.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Nível</label>
                  <select className="form-select" value={nivel} onChange={(e) => setNivel(e.target.value)}>
                    {niveis.map((n) => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Modalidade</label>
                  <select className="form-select" value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
                    {modalidades.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              {hasFilters && (
                <button className="btn btn--ghost btn--sm" onClick={clearFilters} style={{ marginTop: 8 }}>
                  <X size={14} />
                  Limpar filtros
                </button>
              )}
            </div>
          )}

          {/* Results count */}
          <div className={styles.resultsHeader}>
            <p className={styles.resultsCount}>
              {vagasFiltradas.length} {vagasFiltradas.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}
            </p>
            {hasFilters && (
              <button className="btn btn--ghost btn--sm" onClick={clearFilters}>
                <X size={14} />
                Limpar filtros
              </button>
            )}
          </div>

          {/* Vagas grid */}
          {vagasFiltradas.length > 0 ? (
            <div className={`grid grid--3 ${styles.vagasGrid}`}>
              {vagasFiltradas.map((v) => (
                <VagaCard key={v.id} vaga={v} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={48} />
              <h3>Nenhuma vaga encontrada</h3>
              <p>Tente ajustar os filtros ou cadastre seu currículo para ser contactado quando surgir uma oportunidade.</p>
              <Button to="/contato" variant="primary" size="md" style={{ marginTop: 16 }}>
                Cadastrar currículo
              </Button>
            </div>
          )}

          {/* Banner candidatura espontânea */}
          <div className={styles.cvBanner}>
            <div>
              <h3>Não encontrou a vaga ideal?</h3>
              <p>Cadastre seu currículo e entraremos em contato quando surgir uma oportunidade compatível com seu perfil.</p>
            </div>
            <Button to="/contato" variant="accent" size="lg">
              Cadastrar currículo
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

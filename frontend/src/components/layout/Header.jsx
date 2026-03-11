import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'
import styles from './Header.module.css'

const NAV_LINKS = [
  { to: '/',                label: 'Home' },
  { to: '/sobre',           label: 'Sobre' },
  { to: '/servicos',        label: 'Serviços' },
  { to: '/vagas',           label: 'Vagas' },
  { to: '/banco-talentos',  label: 'Banco de Talentos' },
  { to: '/contato',         label: 'Contato' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" aria-label="UNI Gestão de Pessoas — Página inicial" style={{ display: 'flex', alignItems: 'center', height: '48px' }}>
          <Logo size="md" />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Navegação principal">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className={styles.mobileCtaWrapper}>
            <Button to="/banco-talentos" variant="accent" size="md">
              Cadastrar currículo
            </Button>
          </div>
        </nav>

        <div className={styles.actions}>
          <Button to="/banco-talentos" variant="accent" size="md" className={styles.desktopCta}>
            Cadastrar currículo
          </Button>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}
    </header>
  )
}

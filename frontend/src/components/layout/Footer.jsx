import { Link, useNavigate } from 'react-router-dom'
import { Linkedin, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react'
import { Logo } from '../ui/Logo'
import styles from './Footer.module.css'

const LINKS_INSTITUCIONAL = [
  { to: '/sobre',    label: 'Sobre nós' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/contato',  label: 'Contato' },
]

const LINKS_SERVICOS = [
  { to: '/servicos', hash: 'recrutamento',      label: 'Recrutamento e Seleção' },
  { to: '/servicos', hash: 'hunting',           label: 'Hunting' },
  { to: '/servicos', hash: 'assessment',        label: 'Assessment Comportamental' },
  { to: '/servicos', hash: 'consultoria',       label: 'Consultoria de RH' },
  { to: '/servicos', hash: 'employer-branding', label: 'Employer Branding' },
]

const LINKS_CANDIDATOS = [
  { to: '/vagas',                       label: 'Vagas abertas' },
  { to: '/banco-talentos',              label: 'Banco de Talentos' },
  { to: '/contato',                     label: 'Cadastrar currículo' },
  { to: '/politica-de-privacidade',     label: 'Política de Privacidade' },
]

function HashLink({ to, hash, className, children }) {
  const navigate = useNavigate()
  const handleClick = (e) => {
    e.preventDefault()
    navigate(to)
    setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
  return (
    <a href={`#${to}#${hash}`} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Wave decoration */}
      <div className={styles.wave} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <Logo variant="icon" size="md" />
            <div className={styles.brandText}>
              <span className={styles.brandName}>UNI</span>
              <span className={styles.brandSub}>Gestão de Pessoas</span>
            </div>
          </div>
          <p className={styles.tagline}>
            Recrutamento humanizado com olhar de psicóloga. Conectando pessoas e empresas com propósito.
          </p>
          <div className={styles.social}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
              <Linkedin size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
              <Instagram size={18} />
            </a>
            <a href="mailto:contato@unigestao.com.br" aria-label="E-mail" className={styles.socialLink}>
              <Mail size={18} />
            </a>
          </div>
        </div>

        <nav className={styles.linksGroup} aria-label="Links institucionais">
          <h4 className={styles.groupTitle}>Empresa</h4>
          <ul>
            {LINKS_INSTITUCIONAL.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={styles.link}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.linksGroup} aria-label="Links de serviços">
          <h4 className={styles.groupTitle}>Serviços</h4>
          <ul>
            {LINKS_SERVICOS.map(({ to, hash, label }) => (
              <li key={hash}>
                <HashLink to={to} hash={hash} className={styles.link}>{label}</HashLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.linksGroup} aria-label="Links para candidatos">
          <h4 className={styles.groupTitle}>Para Candidatos</h4>
          <ul>
            {LINKS_CANDIDATOS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={styles.link}>{label}</Link>
              </li>
            ))}
          </ul>
          <div className={styles.contact}>
            <a href="tel:+5511999999999" className={styles.contactItem}>
              <Phone size={14} />
              (11) 99999-9999
            </a>
            <a href="mailto:contato@unigestao.com.br" className={styles.contactItem}>
              <Mail size={14} />
              contato@unigestao.com.br
            </a>
            <span className={styles.contactItem}>
              <MapPin size={14} />
              São Paulo, SP
            </span>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <span>© {new Date().getFullYear()} UNI Gestão de Pessoas. Todos os direitos reservados.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            Feito com <Heart size={13} fill="currentColor" /> para conectar talentos
          </span>
        </div>
      </div>
    </footer>
  )
}

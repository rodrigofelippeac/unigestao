import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import styles from './NotFound.module.css'

export function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Pagina nao encontrada</h1>
        <p className={styles.text}>
          A pagina que voce esta procurando nao existe ou foi movida.
        </p>
        <div className={styles.actions}>
          <Button to="/" variant="primary" size="lg">
            <Home size={18} />
            Voltar ao inicio
          </Button>
          <Button to="/vagas" variant="secondary" size="lg">
            Ver vagas abertas
          </Button>
        </div>
      </div>
    </div>
  )
}

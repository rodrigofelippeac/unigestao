import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'

const Home = lazy(() => import('./pages/Home/Home').then(m => ({ default: m.Home })))
const Sobre = lazy(() => import('./pages/Sobre/Sobre').then(m => ({ default: m.Sobre })))
const Servicos = lazy(() => import('./pages/Servicos/Servicos').then(m => ({ default: m.Servicos })))
const Vagas = lazy(() => import('./pages/Vagas/Vagas').then(m => ({ default: m.Vagas })))
const VagaDetalhe = lazy(() => import('./pages/Vagas/VagaDetalhe').then(m => ({ default: m.VagaDetalhe })))
const Contato = lazy(() => import('./pages/Contato/Contato').then(m => ({ default: m.Contato })))
const BancoTalentos = lazy(() => import('./pages/BancoTalentos').then(m => ({ default: m.BancoTalentos })))
const PoliticaPrivacidade = lazy(() => import('./pages/PoliticaPrivacidade').then(m => ({ default: m.PoliticaPrivacidade })))
const NotFound = lazy(() => import('./pages/NotFound/NotFound').then(m => ({ default: m.NotFound })))

function AppLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <AppLayout>
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/vagas" element={<Vagas />} />
            <Route path="/vagas/:slug" element={<VagaDetalhe />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/banco-talentos" element={<BancoTalentos />} />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </HashRouter>
  )
}

export default App

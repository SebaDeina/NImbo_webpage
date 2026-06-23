import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LangProvider } from './i18n/LangContext'
import { ContactProvider } from './contexts/ContactContext'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import WhatsAppFab from './components/WhatsAppFab'
import Home from './pages/Home'

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Contacto = lazy(() => import('./pages/Contacto'))
const Propuesta = lazy(() => import('./pages/Propuesta'))

/* Al navegar entre páginas: ir arriba. Si hay #hash (links del nav a
   secciones de la home), scrollear a la sección. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const [ready, setReady] = useState(false)
  const onSplashDone = useCallback(() => setReady(true), [])

  // La landing de venta (/propuesta) es una página enfocada: sin nav, footer ni chat.
  const { pathname } = useLocation()
  const isLanding = pathname.startsWith('/propuesta')

  return (
    <LangProvider>
      <ContactProvider>
        {!ready && <SplashScreen onDone={onSplashDone} />}
        <div className="app-shell">
          <ScrollManager />
          {!isLanding && <Nav />}
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trabajos/:slug" element={<ProjectDetail />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/propuesta/:slug" element={<Propuesta />} />
              <Route path="/propuesta" element={<Propuesta />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
          {!isLanding && <Footer />}
          {!isLanding && ready && <WhatsAppFab />}
        </div>
      </ContactProvider>
    </LangProvider>
  )
}

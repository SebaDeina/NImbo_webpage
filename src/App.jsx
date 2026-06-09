import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LangProvider } from './i18n/LangContext'
import { ContactProvider } from './contexts/ContactContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Contacto = lazy(() => import('./pages/Contacto'))
const Chatbot = lazy(() => import('./components/Chatbot'))

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
  const [showChat, setShowChat] = useState(false)
  const onSplashDone = useCallback(() => setReady(true), [])

  useEffect(() => {
    if (!ready) return
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setShowChat(true), { timeout: 2200 })
      : window.setTimeout(() => setShowChat(true), 1200)
    return () => {
      if (window.requestIdleCallback) window.cancelIdleCallback(id)
      else window.clearTimeout(id)
    }
  }, [ready])

  return (
    <ThemeProvider>
    <LangProvider>
      <ContactProvider>
        {!ready && <SplashScreen onDone={onSplashDone} />}
        <div className={ready ? 'app-shell app-shell--ready' : 'app-shell'}>
          <div className="grain" aria-hidden="true" />
          <ScrollManager />
          <Nav />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trabajos/:slug" element={<ProjectDetail />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
          <Footer />
          {showChat && (
            <Suspense fallback={null}>
              <Chatbot />
            </Suspense>
          )}
        </div>
      </ContactProvider>
    </LangProvider>
    </ThemeProvider>
  )
}

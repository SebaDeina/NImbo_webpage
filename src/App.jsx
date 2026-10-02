import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import { LangProvider } from './i18n/LangContext'
import { ContactProvider } from './contexts/ContactContext'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import WhatsAppFab from './components/WhatsAppFab'
import Home from './pages/Home'
import { GDefs } from './components/g/Art'

const Proyectos = lazy(() => import('./pages/Proyectos'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Contacto = lazy(() => import('./pages/Contacto'))
const Propuesta = lazy(() => import('./pages/Propuesta'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Links = lazy(() => import('./pages/Links'))
const Privacidad = lazy(() => import('./pages/Privacidad'))

/* Al navegar entre páginas: ir arriba. Si hay #hash (links del nav a
   secciones de la home), scrollear a la sección. */
/* Las fichas viejas /trabajos/:slug ahora viven dentro de /proyectos. */
function LegacyProject() {
  const { slug } = useParams()
  return <Navigate to={`/proyectos#${slug}`} replace />
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // las páginas se cargan en diferido: reintentar hasta que exista la sección
      let tries = 0
      let timer
      const find = () => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (el) return el.scrollIntoView({ behavior: 'smooth' })
        if (++tries < 30) timer = setTimeout(find, 80)
      }
      window.scrollTo(0, 0)
      find()
      return () => clearTimeout(timer)
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
  const isLanding = pathname.startsWith('/propuesta') || pathname === '/links'

  return (
    <LangProvider>
      <ContactProvider>
        {!ready && <SplashScreen onDone={onSplashDone} />}
        <div className="app-shell">
          {!isLanding && <GDefs />}
          <ScrollManager />
          {!isLanding && <Nav />}
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/proyectos" element={<Proyectos />} />
              <Route path="/trabajos/:slug" element={<LegacyProject />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/propuesta/:slug" element={<Propuesta />} />
              <Route path="/propuesta" element={<Propuesta />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/links" element={<Links />} />
              <Route path="/privacidad" element={<Privacidad />} />
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

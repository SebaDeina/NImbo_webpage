import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import { LangProvider } from './i18n/LangContext'
import { ContactProvider } from './contexts/ContactContext'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import { GDefs } from './components/g/Art'
import NdHeader from './components/nd/NdHeader'
import { NdFloat, useNdPage } from './components/nd/Nd'
import { DiagnosticoProvider } from './components/nd/DiagnosticoForm'
import { AgendarProvider } from './components/nd/AgendarPopup'
import './styles/automatizaciones.css'
import './styles/nd-site.css'
import { isLandingPath, LANDINGS } from './lib/landings'

const Proyectos = lazy(() => import('./pages/Proyectos'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Propuesta = lazy(() => import('./pages/Propuesta'))
const Links = lazy(() => import('./pages/Links'))
const Privacidad = lazy(() => import('./pages/Privacidad'))
const Robots = lazy(() => import('./pages/Robots'))
const Automatizaciones = lazy(() => import('./pages/Automatizaciones'))
const Display = lazy(() => import('./pages/Display'))
const Diagnostico = lazy(() => import('./pages/Diagnostico'))
const Agendar = lazy(() => import('./pages/Agendar'))
const Anuncio = lazy(() => import('./pages/Anuncio'))
// sitio nuevo (src/ns): inicio, servicios, casos, blog, BETA y contacto, con su propio marco
const Shell = lazy(() => import('./ns/Shell'))
const Inicio = lazy(() => import('./pages/Inicio'))
const Servicio = lazy(() => import('./pages/Servicio'))
const Casos = lazy(() => import('./pages/Casos'))
const BetaPage = lazy(() => import('./pages/Beta'))
const BlogIndice = lazy(() => import('./pages/BlogIndice'))
const Articulo = lazy(() => import('./pages/Articulo'))
const Empecemos = lazy(() => import('./pages/Empecemos'))
const Landing = lazy(() => import('./pages/Landing'))

// robots.nimbodata.com (VPS) publica este mismo build y muestra el informe en la raíz.
const IS_ROBOTS_HOST = typeof window !== 'undefined' && window.location.hostname.startsWith('robots.')
// automatizaciones.nimbodata.com muestra la landing de automatizaciones en la raíz.
const IS_AUTO_HOST = typeof window !== 'undefined' && window.location.hostname.startsWith('automatizaciones.')
// rutas del sitio nuevo: van dentro de su marco (src/ns/Shell.jsx) en lugar del encabezado y el pie de antes
// …y las páginas de contenido de src/landings (pilares, zonas y rubros), que salen de src/lib/landings.js
const NS_PATH = /^\/(casos|beta|contacto|blog(\/[^/]+)?|agentes-de-ia|automatizacion-e-integracion|datos-y-tableros|software-a-medida)?\/?$/

/* Al navegar entre páginas: ir arriba. Si hay #hash (links del nav a
   secciones de la home), scrollear a la sección. */
/* Las fichas viejas /trabajos/:slug ahora viven dentro de /proyectos. */
function LegacyProject() {
  const { slug } = useParams()
  return <Navigate to={`/proyectos#${slug}`} replace />
}

/* El informe de robots vive en robots.nimbodata.com (VPS): sus videos no están en git ni en Vercel.
   En el sitio principal /robots lleva allá; en desarrollo se ve acá mismo. */
function RobotsRoute() {
  const away = !import.meta.env.DEV && !IS_ROBOTS_HOST
  useEffect(() => {
    if (away) window.location.replace('https://robots.nimbodata.com/')
  }, [away])
  return away ? null : <Robots />
}

// las páginas del sitio nuevo van dentro de su marco; las demás, tal cual
function Frame({ isNew, children }) {
  return isNew ? <Shell>{children}</Shell> : children
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

  // La landing de venta (/propuesta) y /links son páginas enfocadas: sin encabezado, pie ni botón flotante.
  const { pathname } = useLocation()
  const isLanding = pathname.startsWith('/propuesta') || pathname === '/links'
  // El informe /robots (y robots.nimbodata.com) es una página de lectura: sin barra de navegación ni botón
  // flotante, pero con el footer de Nimbo.
  const isReport = pathname === '/robots' || (IS_ROBOTS_HOST && pathname === '/')
  // La landing de automatizaciones tiene encabezado y botón de WhatsApp propios.
  // Las landings de los anuncios en ChatGPT también.
  const isAuto =
    pathname === '/automatizaciones' ||
    pathname === '/diagnostico-ia' ||
    pathname === '/sistemas-conectados' ||
    (IS_AUTO_HOST && pathname === '/')
  // El resto del sitio usa el diseño blanco ("Nimbodata Landing v2"): encabezado, botón flotante y pie blancos.
  const isSite = !isLanding && !isReport
  const isNew = !IS_ROBOTS_HOST && !IS_AUTO_HOST && (NS_PATH.test(pathname) || isLandingPath(pathname))
  useNdPage(isSite)
  // si el splash índigo de index.html quedó (p. ej. /robots redirigido a la home), en el sitio blanco no va
  useEffect(() => {
    if (isSite) document.getElementById('splash')?.remove()
  }, [isSite])

  return (
    <LangProvider>
      <ContactProvider>
        <DiagnosticoProvider>
        <AgendarProvider>
        {!ready && !isSite && <SplashScreen onDone={onSplashDone} />}
        <div className={`app-shell${isSite && !isNew ? ' nd' : ''}`}>
          {isReport && <GDefs />}
          <ScrollManager />
          {isSite && !isAuto && !isNew && <NdHeader />}
          <Suspense fallback={null}>
            <Frame isNew={isNew}>
            <Routes>
              <Route path="/" element={IS_ROBOTS_HOST ? <Robots /> : IS_AUTO_HOST ? <Automatizaciones /> : <Inicio />} />
              <Route path="/agentes-de-ia" element={<Servicio slug="agentes-de-ia" />} />
              <Route path="/automatizacion-e-integracion" element={<Servicio slug="automatizaciones" />} />
              <Route path="/datos-y-tableros" element={<Servicio slug="datos-y-tableros" />} />
              <Route path="/software-a-medida" element={<Servicio slug="software-a-medida" />} />
              <Route path="/casos" element={<Casos />} />
              <Route path="/beta" element={<BetaPage />} />
              <Route path="/proyectos" element={<Proyectos />} />
              <Route path="/trabajos/:slug" element={<LegacyProject />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Empecemos />} />
              <Route path="/propuesta/:slug" element={<Propuesta />} />
              <Route path="/propuesta" element={<Propuesta />} />
              <Route path="/blog" element={<BlogIndice />} />
              <Route path="/blog/:slug" element={<Articulo />} />
              <Route path="/links" element={<Links />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/robots" element={<RobotsRoute />} />
              <Route path="/automatizaciones" element={<Automatizaciones />} />
              <Route path="/display" element={<Display />} />
              <Route path="/diagnostico" element={<Diagnostico />} />
              <Route path="/agendar" element={<Agendar />} />
              <Route path="/desarrollo-web-pymes" element={<Navigate to="/paginas-web-pymes" replace />} />
              <Route path="/diagnostico-ia" element={<Anuncio />} />
              <Route path="/sistemas-conectados" element={<Anuncio variante="sistemas" />} />
              {LANDINGS.map((l) => <Route key={l.path} path={l.path} element={<Landing path={l.path} />} />)}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </Frame>
          </Suspense>
          {!isLanding && !isNew && <Footer />}
          {isSite && !isAuto && !isNew && <NdFloat />}
        </div>
        </AgendarProvider>
        </DiagnosticoProvider>
      </ContactProvider>
    </LangProvider>
  )
}

import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LangProvider } from './i18n/LangContext'
import { ContactProvider } from './contexts/ContactContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'

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
  return (
    <ThemeProvider>
    <LangProvider>
      <ContactProvider>
        <div className="grain" aria-hidden="true" />
        <ScrollManager />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trabajos/:slug" element={<ProjectDetail />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </ContactProvider>
    </LangProvider>
    </ThemeProvider>
  )
}

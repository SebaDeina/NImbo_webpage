// Marco del sitio nuevo (inicio, servicios, casos, blog, BETA y contacto): barra, pie, la nube, el cursor y los
// efectos de scroll. Todo va dentro de `.ns`, que es donde aplican sus estilos (ver scripts/scope-ns-css.mjs);
// las páginas viejas (propuesta, links, agendar, landings…) siguen con su propio diseño.
// Los links internos son <a href> comunes: acá se interceptan para navegar sin recargar la página.
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Buddy from './Buddy'
import { Cursor, ScrollFx } from './motion'
import { Footer, Nav, useReveal } from './ui'

export default function Shell({ children }) {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  useReveal(pathname + search)

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a')
      if (!a || a.target || a.hasAttribute('download') || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const url = new URL(a.href, location.href)
      if (url.origin !== location.origin || /\.\w+$/.test(url.pathname)) return
      if (url.pathname === location.pathname && url.search === location.search) {
        // mismo lugar: un #ancla la resuelve el navegador; sin ancla, vuelve arriba
        if (!url.hash) { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }) }
        return
      }
      e.preventDefault()
      navigate(url.pathname + url.search + url.hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])

  return (
    <div className="ns">
      <div className="page f-hanken">
        <Nav />
        {children}
        <Footer />
        <Buddy path={pathname} />
        <ScrollFx />
        <Cursor />
      </div>
    </div>
  )
}

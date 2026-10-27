import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MENU, MENU_CTA } from '../../lib/menu'
import { Cloud, useScrolled } from './Nd'

/* Encabezado blanco de las páginas viejas (nosotros, display, diagnóstico, agendar…). Los links son los mismos
   del sitio nuevo (src/lib/menu.js): un solo menú en todo el sitio. */

const NAV = MENU

function NavLinks() {
  return NAV.map(([to, label]) =>
    to.includes('#') ? (
      <Link key={to} to={to}>
        {label}
      </Link>
    ) : (
      <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'is-on' : undefined)}>
        {label}
      </NavLink>
    ),
  )
}

export default function NdHeader() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  useEffect(() => setOpen(false), [pathname, hash])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nd-head${scrolled || open ? ' is-scrolled' : ''}`}>
      <div className="nd-wrap nd-head-in">
        <Link to="/" className="nd-logo" aria-label="Nimbo — inicio">
          <Cloud />
          <span>nimbo</span>
        </Link>
        <nav className="nd-nav">
          <NavLinks />
        </nav>
        <div className="nd-head-cta">
          <Link to={MENU_CTA[0]} className="nd-btn nd-btn-sm">
            {MENU_CTA[1]}
          </Link>
          <button
            type="button"
            className="hm-burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="hm-sheet"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      {open && (
        <div id="hm-sheet" className="hm-sheet">
          <div className="nd-wrap">
            <NavLinks />
            <Link to="/contacto">Contacto</Link>
          </div>
        </div>
      )}
    </header>
  )
}

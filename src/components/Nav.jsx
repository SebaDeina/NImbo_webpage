import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { whatsappUrl } from '../config/whatsapp'

const LOGO =
  'M271.84,16.97c15.42,12.31,28,33.93,28.55,53.89,13.64-.57,26.09-.17,38.52,5.87,56.51,27.48,43.11,115.68-20.22,122.53l-261.99-.05c-62.34-7.28-77.99-89.68-23.15-121.24,14.02-8.07,30.12-8.07,45.94-6.19,1.71-.48,5.47-10.25,6.98-12.67,10.49-16.9,33.25-31.45,53.83-31.99,3.61-.09,18.6,3.19,19.55,2.91.59-.17,6.77-7.6,8.32-8.95,29.26-25.43,72.35-29.12,103.66-4.12Z'

export function Logo({ onClick }) {
  return (
    <Link className="logo" to="/" aria-label="Nimbo — inicio" onClick={onClick}>
      <svg viewBox="-10 -10 395 220" aria-hidden="true"><path d={LOGO} /></svg>
      nimbo
    </Link>
  )
}

const LINKS = [
  { to: '/#servicios', label: 'Servicios' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/blog', label: 'Blog' },
  { to: '/nosotros', label: 'Nosotros' },
]

export default function Nav() {
  const { t } = useLang()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const wa = whatsappUrl(t('wa.message'))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const link = ({ to, label }) =>
    to.includes('#') ? (
      <Link key={to} to={to}>{label}</Link>
    ) : (
      <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'on' : undefined)}>
        {label}
      </NavLink>
    )

  return (
    <div className={open ? 'nav-open' : undefined}>
      <nav className={`g-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap">
          <Logo onClick={() => setOpen(false)} />
          <div className="nav-links">{LINKS.map(link)}</div>
          <a className="btn btn-ghost" href={wa} data-cta="menu" target="_blank" rel="noopener noreferrer">
            Hablemos <span className="arr">→</span>
          </a>
          <button
            type="button"
            className="nav-burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div id="nav-sheet" className="nav-sheet" aria-hidden={!open}>
        {LINKS.map(link)}
        <Link to="/contacto">Contacto</Link>
        <a className="btn btn-ghost" href={wa} data-cta="menu-celular" target="_blank" rel="noopener noreferrer">
          Escribinos por WhatsApp <span className="arr">→</span>
        </a>
      </div>
    </div>
  )
}

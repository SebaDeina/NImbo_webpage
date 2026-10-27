// Piezas compartidas entre la home y las páginas de servicio.
import { Player } from '@remotion/player'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MENU, MENU_CTA } from '../lib/menu'
import { AREAS, WA } from './data'
import { Hero, HERO } from './scenes/Hero'
import './styles.css'

const LINKS = MENU

// En el celular los links van en un menú desplegable (botón "Menú"); se cierra al elegir, al tocar afuera o con Escape.
export function Nav() {
  const [open, setOpen] = useState(false)
  const nav = useRef(null)
  const { pathname, hash } = useLocation()
  useEffect(() => setOpen(false), [pathname, hash])
  useEffect(() => {
    if (!open) return
    const out = (e) => { if (!nav.current?.contains(e.target)) setOpen(false) }
    const esc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', out)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('pointerdown', out); document.removeEventListener('keydown', esc) }
  }, [open])
  return (
    <nav ref={nav} className={`nav${open ? ' open' : ''}`}>
      <a href="/" className="logo"><Logo /> nimbo</a>
      <div className="nav-links">
        {LINKS.map(([href, t]) => <a key={href} href={href}>{t}</a>)}
      </div>
      <div className="nav-end">
        <button type="button" className="nav-menu" aria-expanded={open} aria-controls="nav-sheet" onClick={() => setOpen((o) => !o)}>
          <span aria-hidden="true"><i /><i /></span>{open ? 'Cerrar' : 'Menú'}
        </button>
        <a href={MENU_CTA[0]} className="btn btn-acc btn-sm">{MENU_CTA[1]}</a>
      </div>
      <div id="nav-sheet" className="nav-sheet" hidden={!open}>
        {LINKS.map(([href, t]) => <a key={href} href={href} onClick={() => setOpen(false)}>{t}</a>)}
        <a href="/contacto" onClick={() => setOpen(false)}>Contacto</a>
      </div>
    </nav>
  )
}

// `s` deja marcado el servicio en el formulario de contacto
export function Final({ title = 'Dejá de hacerlo a mano.', s }) {
  return (
    <section className="wrap" id="cierre">
      <div className="final" data-reveal>
        <div className="final-copy">
          <h2>{title}</h2>
          <p className="lead">Contanos qué proceso le come las horas a tu equipo y te decimos cómo lo resolveríamos. La primera charla no tiene costo.</p>
          <div className="btns">
            <a className="btn btn-acc" href={s ? `/contacto?s=${s}` : '/contacto'}>Empecemos <Arrow /></a>
            <a className="btn" href="/casos">Ver casos <Arrow /></a>
          </div>
        </div>
        <LiveEngraving className="final-art" />
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="wrap foot">
      <div>
        <a href="/" className="logo"><Logo /> nimbo</a>
        <p>IA, automatización y software a medida para pymes. Un equipo chico de Buenos Aires.</p>
      </div>
      <div><h5>Servicios</h5>{AREAS.map((a) => <a key={a.slug} href={a.path}>{a.t}</a>)}<a href="/desarrollo-web-pymes">Páginas web</a><a href="/display">Nimbo Display</a></div>
      <div><h5>Explorar</h5><a href="/casos">Casos</a><a href="/blog">Blog</a><a href="/beta">BETA</a><a href="/#proceso">Cómo trabajamos</a><a href="/nosotros">Nosotros</a></div>
      <div><h5>Nimbo</h5><a href="/diagnostico">Diagnóstico gratis</a><a href="/agendar">Agendar una llamada</a><a href="/contacto">Contacto</a><a href={WA}>WhatsApp</a><a href="https://instagram.com/nimbodata">Instagram</a><a href="https://linkedin.com/company/nimboconsulting">LinkedIn</a></div>
      <p className="foot-trust">Partner de Tiendanube · Certificaciones HubSpot y Make · En la Guía de Buenos Aires</p>
      <p className="foot-bottom">© 2026 Nimbo. Hecho en Argentina.</p>
    </footer>
  )
}

// grabado vivo a la resolución real del contenedor (tope 1600 px de composición para que corra fluido).
// El tamaño lo decide el CSS (alto del hero según la ventana, o aspect-ratio en el cierre).
export function LiveEngraving({ className }) {
  const box = useRef(null)
  const [size, setSize] = useState(null)
  useEffect(() => {
    const el = box.current
    const ro = new ResizeObserver(([e]) => {
      const { width: cssW, height: cssH } = e.contentRect
      if (!cssW || !cssH) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.min(1600, Math.round((cssW * dpr) / 8) * 8)
      const h = Math.round((w * cssH) / cssW)
      setSize((prev) => (prev && prev.w === w && Math.abs(prev.h - h) < 4 ? prev : { w, h, k: w / cssW }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const player = useRef(null)
  useEffect(() => {
    const el = box.current
    const io = new IntersectionObserver(([e]) => {
      if (!player.current) return
      if (e.isIntersecting) player.current.play()
      else player.current.pause()
    })
    io.observe(el)
    return () => io.disconnect()
  }, [size?.w])
  return (
    <div ref={box} className={className}>
      {size && (
        <Player ref={player} numberOfSharedAudioTags={0} component={Hero} inputProps={{ cssScale: size.k }} durationInFrames={HERO.durationInFrames}
          fps={HERO.fps} compositionWidth={size.w} compositionHeight={size.h} autoPlay loop controls={false}
          clickToPlay={false} doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false}
          style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  )
}

// en el prerender (Node) no hay layout: ahí va un useEffect común para que React no avise
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function useReveal(key) {
  // useLayoutEffect: lo que ya está en pantalla arranca en el mismo cuadro, sin esperar al observer
  // (al cambiar de página el observer tarda mientras se montan las animaciones y el título quedaba invisible)
  useBrowserLayoutEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]:not(.in)')]
    const io = new IntersectionObserver((list) => list.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { rootMargin: '0px 0px -8% 0px' })
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight * 0.92) el.classList.add('in')
      else io.observe(el)
    })
    return () => io.disconnect()
  }, [key])
}

export const Icon = ({ d }) => <svg viewBox="0 0 24 24"><path d={d} /></svg>

export const Arrow = () => (
  <i aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M3.5 8.5l5-5M4.5 3.5h4v4" /></svg></i>
)

export const Logo = () => (
  <svg viewBox="-12 -12 399 224" aria-hidden="true">
    <path d="M271.84,16.97c15.42,12.31,28,33.93,28.55,53.89,13.64-.57,26.09-.17,38.52,5.87,56.51,27.48,43.11,115.68-20.22,122.53l-261.99-.05c-62.34-7.28-77.99-89.68-23.15-121.24,14.02-8.07,30.12-8.07,45.94-6.19,1.71-.48,5.47-10.25,6.98-12.67,10.49-16.9,33.25-31.45,53.83-31.99,3.61-.09,18.6,3.19,19.55,2.91.59-.17,6.77-7.6,8.32-8.95,29.26-25.43,72.35-29.12,103.66-4.12Z"
      fill="none" stroke="#26248a" strokeWidth="22" strokeLinejoin="round" />
  </svg>
)

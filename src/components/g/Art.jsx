import { useEffect, useRef } from 'react'
import { engrave, cloudBank, logoSample, INK, PAPER } from '../../lib/grabado/engine'
import FX from '../../lib/grabado/fx'

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Patrones de tramado + filtro duotono, compartidos por todos los SVG del sitio. */
export function GDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <pattern id="hl" width="6" height="5" patternUnits="userSpaceOnUse"><line x1="0" y1="2.5" x2="6" y2="2.5" stroke={INK} strokeWidth="1" /></pattern>
        <pattern id="hx" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke={INK} strokeWidth="1.1" /></pattern>
        <pattern id="hd" width="3.6" height="3.6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="3.6" stroke={INK} strokeWidth="1.3" /></pattern>
        <pattern id="hlp" width="20" height="16" patternUnits="userSpaceOnUse"><line x1="0" y1="8" x2="20" y2="8" stroke={PAPER} strokeWidth="4" /></pattern>
        <clipPath id="printClip"><rect x="560" y="194" width="170" height="260" /></clipPath>
        <filter id="duo" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values=".3 .59 .11 0 0 .3 .59 .11 0 0 .3 .59 .11 0 0 0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.149 0.953" />
            <feFuncG type="table" tableValues="0.141 0.918" />
            <feFuncB type="table" tableValues="0.537 0.843" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  )
}

export function Emblem({ n, className = '' }) {
  return <div className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: FX.E[n] || FX.E.I }} />
}

export function Flock({ n = 5, seed = 3, className = '' }) {
  return (
    <div className={`flock ${className}`} aria-hidden="true">
      <svg viewBox="-10 -16 200 60" dangerouslySetInnerHTML={{ __html: FX.flock(n, seed) }} />
    </div>
  )
}

/*
  Banda de nubes grabadas: varias filas de nubes en <canvas> (cada fila una capa),
  con capas extra opcionales (isla, dirigible) insertadas entre filas.
  - rows: [{base,rmin,rmax,seed,fade}] en fracciones de la altura
  - layers: [{at, depth, html}] → se insertan antes de la fila `at`
  - drift: deriva + parallax por scroll; el dirigible (#ship dentro) cruza solo.
*/
export function CloudBand({ rows, layers = [], drift = true, line = 3.6, className = '', delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return
    let timers = []
    let raf = 0
    let lastW = 0

    const build = () => {
      timers.forEach(clearTimeout)
      timers = []
      host.innerHTML = ''
      const W = host.clientWidth + 120
      const H = host.clientHeight
      lastW = window.innerWidth
      const rowEls = rows.map((r, i) => {
        const lay = document.createElement('div')
        lay.className = 'drift'
        lay.dataset.depth = i
        const cv = document.createElement('canvas')
        lay.appendChild(cv)
        host.appendChild(lay)
        timers.push(
          setTimeout(() => {
            const spec = { ...r, base: H * r.base, rmin: H * r.rmin, rmax: H * r.rmax }
            const bank = cloudBank(W, H, spec)
            engrave(cv, W, H, bank.sample, { paper: PAPER, ink: INK, s: line + i * 0.22, seed: r.seed, top: bank.top - 2 })
            requestAnimationFrame(() => cv.classList.add('in'))
          }, delay + 40 + i * 180),
        )
        return lay
      })
      layers.forEach(({ at, depth, html }) => {
        const d = document.createElement('div')
        d.className = 'drift'
        d.dataset.depth = depth
        d.innerHTML = html
        host.insertBefore(d, rowEls[at] || null)
      })
    }
    build()

    if (drift && !reduceMotion()) {
      const loop = (t) => {
        const sy = window.scrollY
        host.querySelectorAll(':scope > .drift').forEach((el) => {
          const k = +el.dataset.depth
          el.style.transform = `translate3d(${Math.sin(t / (9000 - k * 1400) + k) * (14 + k * 10)}px,${sy * (0.18 - k * 0.06)}px,0)`
        })
        const sh = host.querySelector('.ship-wrap')
        if (sh) {
          const span = window.innerWidth + 520
          sh.style.transform = `translateX(${((t * 0.03 + sy * 0.7) % span) - 380}px)`
        }
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    let rt
    const onResize = () => {
      if (Math.abs(window.innerWidth - lastW) < 40) return
      clearTimeout(rt)
      rt = setTimeout(build, 300)
    }
    window.addEventListener('resize', onResize)
    return () => {
      timers.forEach(clearTimeout)
      cancelAnimationFrame(raf)
      clearTimeout(rt)
      window.removeEventListener('resize', onResize)
    }
    // las filas son constantes por instancia
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={ref} className={className} aria-hidden="true" />
}

export const SHIP_LAYER = (at = 1, depth = 1.5) => ({ at, depth, html: `<div class="ship-wrap">${FX.airship}</div>` })
export const ISLAND_LAYER = (at, depth, uid, far = false) => ({
  at,
  depth,
  html: `<div class="isl-wrap${far ? ' far' : ''}">${FX.island(uid)}</div>`,
})

/* Logo de Nimbo grabado dentro de un medallón ovalado. */
export function LogoMedallion({ className = '' }) {
  const cv = useRef(null)
  useEffect(() => {
    const c = cv.current
    if (!c) return
    const box = c.parentElement
    const draw = () => {
      const W = box.clientWidth
      const H = box.clientHeight
      if (!W || !H) return
      engrave(c, W, H, logoSample(W, H), { paper: '#ebdfc6', ink: INK, s: 2.7, seed: 3 })
      c.style.width = '100%'
      c.style.height = '100%'
    }
    draw()
  }, [])
  return (
    <div className={`medallion ${className}`}>
      <canvas ref={cv} />
      <svg viewBox="0 0 120 102" preserveAspectRatio="none" aria-hidden="true">
        <ellipse cx="60" cy="51" rx="56" ry="47" strokeWidth=".8" />
        <ellipse cx="60" cy="51" rx="58.5" ry="49.5" strokeWidth=".35" />
      </svg>
    </div>
  )
}

/* Agrega la clase .in cuando el elemento entra en pantalla. */
export function useRevealAll(selector = '.rv,.pj', deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(selector)
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      }),
      { rootMargin: '0px 0px -10% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

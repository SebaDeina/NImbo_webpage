// Movimiento de la página: bajadas que entran palabra por palabra, el cursor circular y los efectos atados
// al scroll (parallax del cielo y barra de progreso). Todo se apaga con prefers-reduced-motion.
import { Fragment, useEffect, useRef } from 'react'

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

// texto que entra palabra por palabra cuando su contenedor [data-reveal] recibe .in
export function Words({ children, step = 28 }) {
  // el espacio va afuera del span: dentro de un inline-block el navegador lo descarta y se pegan las palabras
  return String(children).split(' ').map((w, i) => (
    <Fragment key={i}>{i > 0 && ' '}<span className="w" style={{ '--i': i, '--step': `${step}ms` }}>{w}</span></Fragment>
  ))
}

// --sy (scroll en px) para el parallax y la barra de progreso de lectura arriba de todo
export function ScrollFx() {
  const bar = useRef(null)
  useEffect(() => {
    if (reduced()) return
    let raf = 0
    const tick = () => {
      raf = 0
      const y = scrollY
      document.documentElement.style.setProperty('--sy', y.toFixed(1))
      const max = document.documentElement.scrollHeight - innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={bar} className="progress" aria-hidden="true" />
}

// cursor: un aro que sigue al mouse con un poco de retraso y un punto que va pegado. Crece sobre lo que se
// puede tocar y se achica al hacer clic. Solo con mouse; en los campos de texto vuelve el cursor normal.
export function Cursor() {
  const ring = useRef(null)
  const dot = useRef(null)
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const root = document.documentElement
    root.classList.add('has-cursor', 'cursor-out') // oculto hasta que se mueva el mouse, si no aparece clavado en el centro
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const cur = { ...pos }
    const smooth = reduced() ? 1 : 0.2
    let raf = 0
    const loop = () => {
      cur.x += (pos.x - cur.x) * smooth
      cur.y += (pos.y - cur.y) * smooth
      if (ring.current) ring.current.style.transform = `translate(${cur.x}px, ${cur.y}px)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    const set = (k, v) => ring.current?.classList.toggle(k, v)
    const move = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      root.classList.remove('cursor-out')
    }
    const over = (e) => {
      const t = e.target
      const field = t.closest?.('input, textarea, select, [contenteditable]')
      set('field', !!field)
      dot.current?.classList.toggle('field', !!field)
      set('hover', !field && !!t.closest?.('a, button, summary, label, [role="tab"], .fig, .pola'))
    }
    const down = () => set('down', true)
    const up = () => set('down', false)
    const leave = () => root.classList.add('cursor-out')
    addEventListener('pointermove', move, { passive: true })
    addEventListener('pointerover', over, { passive: true })
    addEventListener('pointerdown', down)
    addEventListener('pointerup', up)
    document.addEventListener('mouseleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('has-cursor', 'cursor-out')
      removeEventListener('pointermove', move)
      removeEventListener('pointerover', over)
      removeEventListener('pointerdown', down)
      removeEventListener('pointerup', up)
      document.removeEventListener('mouseleave', leave)
    }
  }, [])
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true"><i /></div>
      <div ref={dot} className="cursor-dot" aria-hidden="true"><i /></div>
    </>
  )
}

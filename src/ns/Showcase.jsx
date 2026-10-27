// "Todo tu negocio, en un solo panel": el video de la app de administración que junta los canales de un
// negocio (banco, Mercado Pago, Gmail, Instagram, facturas…). Horizontal en compu y vertical en el celular;
// sin sonido. Arranca solo al verse, se reproduce una vez y queda pausado con un botón de play para volver a
// verlo. Con "reducir movimiento" no arranca solo.
import { useEffect, useRef, useState } from 'react'
import { Words } from './motion'
import { Arrow } from './ui'

const NARROW = '(max-width: 760px)'

export default function Showcase({ cta = '/contacto?s=software-a-medida' }) {
  // arranca en horizontal (igual que el HTML prerenderado) y se ajusta al montar
  const [ended, setEnded] = useState(false)
  const done = useRef(false) // ya se vio entero: no vuelve a arrancar solo al scrollear
  const video = useRef(null)
  const [vertical, setVertical] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = matchMedia(NARROW)
    const on = () => setVertical(mq.matches)
    on()
    setReduced(matchMedia('(prefers-reduced-motion: reduce)').matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    const v = video.current
    if (!v) return
    v.muted = true // React no siempre pone el atributo y sin él el navegador no deja arrancar solo
    if (reduced) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause()
      else if (!done.current) v.play().catch(() => {})
    }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [vertical, reduced])

  const onEnded = () => { done.current = true; setEnded(true) }
  const replay = () => {
    const v = video.current
    done.current = false // mientras se vuelve a ver, se pausa y retoma con el scroll como la primera vez
    v.currentTime = 0
    v.play().catch(() => {})
    setEnded(false)
  }

  const src = vertical ? '/videos/nimbo-admin-vertical' : '/videos/nimbo-admin'
  return (
    <section className="sec wrap show" id="panel">
      <div className="sec-head" data-reveal>
        <div>
          <h2>Todo tu negocio, en un solo panel.</h2>
          <p className="lead words" data-reveal><Words>Banco, Mercado Pago, Gmail, Instagram, facturas y clientes en un mismo lugar, con IA que responde mensajes, arma presupuestos y te contesta como un socio.</Words></p>
        </div>
        <a className="btn" href={cta}>Quiero algo así <Arrow /></a>
      </div>
      <div className={`show-media${vertical ? ' is-vertical' : ''}`} data-reveal>
        <video key={src} ref={video} src={`${src}.mp4`} poster={`${src}.jpg`} muted playsInline preload="metadata"
          autoPlay={!reduced} controls={reduced} onEnded={onEnded} onPlay={() => setEnded(false)}
          aria-label="Recorrido por la app de administración: un solo panel con ingresos, mensajes, presupuestos, cobros y un agente de IA" />
        {ended && !reduced && (
          <button type="button" className="show-play" onClick={replay} aria-label="Ver el video de nuevo">
            <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg></span>
          </button>
        )}
      </div>
      <ul className="show-points" data-reveal>
        <li><b>Un solo panel</b><span>Ingresos, gastos y lo que falta cobrar, en pesos.</span></li>
        <li><b>Mensajes y presupuestos con IA</b><span>El bot arma la respuesta o el borrador y vos aprobás.</span></li>
        <li><b>Un agente que te contesta</b><span>Le preguntás por qué subieron los gastos, como a un socio.</span></li>
      </ul>
    </section>
  )
}

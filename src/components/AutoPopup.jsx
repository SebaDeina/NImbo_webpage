import { useEffect, useRef, useState } from 'react'
import { whatsappUrl } from '../config/whatsapp'

/*
  Popup de diagnóstico de la landing de automatizaciones: el visitante marca qué
  tareas quiere sacarse de encima y sale a WhatsApp con el mensaje ya armado.
  No envía nada a ningún servidor: solo arma el texto del link de WhatsApp.
*/

export const TAREAS = [
  'Responder WhatsApp',
  'Turnos y recordatorios',
  'Facturación',
  'Presupuestos',
  'Carga de datos',
  'Seguimiento de clientes',
  'Reportes',
  'Otra',
]

const SEEN = 'au-popup-visto'
const seen = () => {
  try {
    return sessionStorage.getItem(SEEN) === '1'
  } catch {
    return false
  }
}
export const markSeen = () => {
  try {
    sessionStorage.setItem(SEEN, '1')
  } catch {
    /* sin almacenamiento: puede volver a aparecer, no pasa nada */
  }
}

/* Abre el popup una sola vez por sesión: a los 25 s, al pasar la mitad de la página
   o cuando el mouse sale por arriba (intención de irse). No aparece si ya tocó un CTA. */
export function useAutoPopup(open) {
  useEffect(() => {
    if (seen()) return
    let done = false
    const fire = (src) => {
      if (done || seen()) return
      done = true
      open(src)
    }
    const timer = setTimeout(() => fire('tiempo'), 25000)
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (h > 0 && window.scrollY / h > 0.5) fire('scroll')
    }
    const onOut = (e) => {
      if (!e.relatedTarget && e.clientY <= 0) fire('salida')
    }
    // si ya tocó un botón de contacto, no lo interrumpimos
    const onClick = (e) => {
      if (e.target.closest?.('[data-cta]')) {
        markSeen()
        done = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseout', onOut)
    document.addEventListener('click', onClick, true)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('click', onClick, true)
    }
  }, [open])
}

export default function AutoPopup({ source, onClose }) {
  const [sel, setSel] = useState([])
  const [rubro, setRubro] = useState('')
  const cta = useRef(null)

  useEffect(() => {
    markSeen()
    cta.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const toggle = (t) => setSel((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))
  const r = rubro.trim()
  const msg =
    `¡Hola! Quiero un diagnóstico gratis para automatizar mi negocio${r ? ` (${r})` : ''}.` +
    (sel.length ? ` Me interesa: ${sel.join(', ').toLowerCase()}.` : '')

  return (
    <div className="au-pop-bg" onClick={onClose}>
      <div className="au-pop" role="dialog" aria-modal="true" aria-labelledby="au-pop-t" onClick={(e) => e.stopPropagation()}>
        <div className="au-pop-in">
          <button className="au-pop-x" type="button" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
          <span className="au-pop-k">Diagnóstico gratis · 30 min</span>
          <h3 id="au-pop-t">¿Qué tarea te gustaría sacarte de encima?</h3>
          <p>Marcá una o varias y seguimos por WhatsApp con ideas para tu negocio.</p>
          <div className="au-chips">
            {TAREAS.map((t) => (
              <button key={t} type="button" className="au-chip" aria-pressed={sel.includes(t)} onClick={() => toggle(t)}>
                {t}
              </button>
            ))}
          </div>
          <label className="au-pop-field">
            <span>¿De qué es tu negocio? (opcional)</span>
            <input value={rubro} onChange={(e) => setRubro(e.target.value)} placeholder="Ej.: consultorio, tienda de ropa, inmobiliaria" maxLength={60} />
          </label>
          <a
            ref={cta}
            className="nd-btn au-pop-cta"
            data-cta={`auto-popup-${source}`}
            href={whatsappUrl(msg)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            Seguir por WhatsApp →
          </a>
          <p className="au-pop-note">Sin compromiso · Respuesta en menos de 24 h</p>
        </div>
      </div>
    </div>
  )
}

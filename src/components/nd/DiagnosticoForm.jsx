import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { submitContact } from '../../lib/cms'

/*
  Pedido de reunión de diagnóstico: el formulario y el popup que lo abre desde cualquier botón.
  Va por /api/contact como el formulario de contacto: tema "diagnostico", origen con el botón
  que lo abrió y los datos de la empresa dentro del mensaje (llega al mismo mail y Slack).
  La página /diagnostico usa el mismo formulario.
*/

const EMPLEADOS = ['1 a 9', '10 a 30', '31 a 100', 'Más de 100']
const RUBROS = ['Clínica o centro de servicios', 'Comercio o distribuidora', 'Empresa con mucha administración', 'Otro']
const HORARIOS = ['Por la mañana', 'Por la tarde', 'Me da igual']

const EMPTY = { nombre: '', empresa: '', email: '', telefono: '', empleados: '', rubro: '', problema: '', horario: '' }

export function DiagnosticoForm({ source = 'pagina', autoFocus = false }) {
  const [d, setD] = useState(EMPTY)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const first = useRef(null)
  const set = (k) => (e) => setD((v) => ({ ...v, [k]: e.target.value }))

  useEffect(() => {
    // en celulares no: abriría el teclado tapando el popup apenas aparece
    if (autoFocus && window.matchMedia?.('(pointer: fine)').matches) first.current?.focus()
  }, [autoFocus])

  const submit = async (e) => {
    e.preventDefault()
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email.trim())
    if (!d.nombre.trim() || !d.empresa.trim() || !emailOk || !d.telefono.trim() || !d.problema.trim()) {
      return setError('Completá los campos marcados con * (y revisá el mail).')
    }
    setError('')
    setSending(true)
    const [firstName, ...rest] = d.nombre.trim().split(/\s+/)
    const message = [
      `Qué quiere resolver: ${d.problema.trim()}`,
      d.empleados && `Empleados: ${d.empleados}`,
      d.rubro && `Rubro: ${d.rubro}`,
      d.horario && `Horario preferido: ${d.horario}`,
      `Botón: ${source}`,
    ]
      .filter(Boolean)
      .join('\n')
    try {
      await submitContact({
        firstName,
        lastName: rest.join(' ') || undefined,
        email: d.email.trim(),
        countryCode: '+54',
        phone: d.telefono.trim(),
        company: d.empresa.trim(),
        topic: 'diagnostico',
        source: 'diagnostico',
        message,
        lang: 'es',
      })
      setSent(true)
    } catch {
      setError('No se pudo enviar. Probá de nuevo o escribinos por WhatsApp.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="dg-done" role="status">
        <h2>¡Listo, {d.nombre.trim().split(/\s+/)[0]}!</h2>
        <p>Te escribimos en menos de 24 horas hábiles para coordinar el día y la hora.</p>
      </div>
    )
  }

  return (
    <form className="dg-form" onSubmit={submit} noValidate>
      <label>
        <span>Nombre y apellido *</span>
        <input ref={first} value={d.nombre} onChange={set('nombre')} autoComplete="name" required />
      </label>
      <label>
        <span>Empresa *</span>
        <input value={d.empresa} onChange={set('empresa')} autoComplete="organization" required />
      </label>
      <div className="dg-row">
        <label>
          <span>Email *</span>
          <input type="email" value={d.email} onChange={set('email')} autoComplete="email" required />
        </label>
        <label>
          <span>WhatsApp *</span>
          <input type="tel" value={d.telefono} onChange={set('telefono')} autoComplete="tel" placeholder="11 2345-6789" required />
        </label>
      </div>
      <div className="dg-row">
        <label>
          <span>Personas en la empresa</span>
          <select value={d.empleados} onChange={set('empleados')}>
            <option value="">Elegí</option>
            {EMPLEADOS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Rubro</span>
          <select value={d.rubro} onChange={set('rubro')}>
            <option value="">Elegí</option>
            {RUBROS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span>¿Qué te gustaría resolver? *</span>
        <textarea
          rows={3}
          value={d.problema}
          onChange={set('problema')}
          placeholder="Ej.: respondemos a mano 80 consultas por día de WhatsApp y fuera de horario se pierden."
          required
        />
      </label>
      <label>
        <span>¿Cuándo te queda mejor?</span>
        <select value={d.horario} onChange={set('horario')}>
          <option value="">Elegí</option>
          {HORARIOS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      {error && (
        <p className="dg-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="nd-btn" disabled={sending}>
        {sending ? 'Enviando…' : 'Pedir mi diagnóstico'}
      </button>
      <p className="dg-note">Sin cargo · 30 a 45 minutos por videollamada · Usamos tus datos solo para coordinar.</p>
    </form>
  )
}

/* Popup: lo abre cualquier botón con useDiagnostico()(origen). */
const Ctx = createContext(() => {})
export const useDiagnostico = () => useContext(Ctx)

export function DiagnosticoProvider({ children }) {
  const [source, setSource] = useState(null)
  const open = useCallback((src = 'boton') => setSource(src), [])
  const close = useCallback(() => setSource(null), [])
  return (
    <Ctx.Provider value={open}>
      {children}
      {source && <DiagnosticoPopup source={source} onClose={close} />}
    </Ctx.Provider>
  )
}

function DiagnosticoPopup({ source, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div className="au-pop-bg" onClick={onClose}>
      <div className="au-pop dg-pop" role="dialog" aria-modal="true" aria-labelledby="dg-pop-t" onClick={(e) => e.stopPropagation()}>
        <div className="au-pop-in">
          <button className="au-pop-x" type="button" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
          <span className="au-pop-k">Diagnóstico gratis</span>
          <h3 id="dg-pop-t">Contanos qué te frena</h3>
          <p>Te escribimos en menos de 24 h para coordinar una reunión sin cargo.</p>
          <DiagnosticoForm source={source} autoFocus />
        </div>
      </div>
    </div>
  )
}

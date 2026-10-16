import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { submitContact } from '../../lib/cms'

/*
  Pedido de reunión de diagnóstico: el formulario y el popup que lo abre desde cualquier botón.
  Va por /api/contact como el formulario de contacto: tema "diagnostico", origen con el botón
  que lo abrió y los datos de la empresa dentro del mensaje (llega al mismo mail y Slack).
  La página /diagnostico usa el mismo formulario.
*/

const TAREAS = [
  'Responder WhatsApp e Instagram',
  'Turnos y reservas',
  'Pedidos y stock',
  'Presupuestos y ventas',
  'Carga de datos y planillas',
  'Reportes y números del negocio',
  'Facturación y cobranzas',
  'Otra cosa',
]
const RUBROS = ['Clínica o salud', 'Comercio', 'Distribuidora', 'Servicios', 'Industria', 'Otro']
const EMPLEADOS = ['1 a 9', '10 a 30', '31 a 100', 'Más de 100']
const PASOS = ['Qué resolver', 'Tu empresa', 'Contacto']

const EMPTY = { tareas: [], detalle: '', rubro: '', empleados: '', nombre: '', telefono: '', email: '', empresa: '' }

/* Tres pasos cortos: casi todo se elige con un toque y los datos de contacto quedan al final,
   cuando el visitante ya contó qué necesita. */
export function DiagnosticoForm({ source = 'pagina', autoFocus = false }) {
  const [d, setD] = useState(EMPTY)
  const [paso, setPaso] = useState(0)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const box = useRef(null)
  const set = (k) => (e) => setD((v) => ({ ...v, [k]: e.target.value }))
  const pick = (k, v) => setD((x) => ({ ...x, [k]: x[k] === v ? '' : v }))
  const toggle = (t) => setD((x) => ({ ...x, tareas: x.tareas.includes(t) ? x.tareas.filter((y) => y !== t) : [...x.tareas, t] }))

  // al cambiar de paso, foco en el primer control (en celulares no: abriría el teclado tapando el popup)
  useEffect(() => {
    if (!autoFocus && paso === 0) return
    if (!window.matchMedia?.('(pointer: fine)').matches) return
    box.current?.querySelector('button.au-chip, input, textarea')?.focus()
  }, [paso, autoFocus])

  const okPaso0 = d.tareas.length > 0 || d.detalle.trim()
  const ir = (n) => {
    setError('')
    setPaso(n)
  }
  const siguiente = () => {
    if (paso === 0 && !okPaso0) return setError('Elegí al menos una opción o contanos en una línea.')
    ir(paso + 1)
  }

  const submit = async (e) => {
    e.preventDefault()
    if (paso < 2) return siguiente()
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email.trim())
    if (!d.nombre.trim() || !d.telefono.trim() || !emailOk) {
      return setError('Completá nombre, WhatsApp y un mail válido.')
    }
    setError('')
    setSending(true)
    const [firstName, ...rest] = d.nombre.trim().split(/\s+/)
    const message = [
      d.tareas.length && `Quiere resolver: ${d.tareas.join(', ')}`,
      d.detalle.trim() && `Detalle: ${d.detalle.trim()}`,
      d.rubro && `Rubro: ${d.rubro}`,
      d.empleados && `Personas: ${d.empleados}`,
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
        company: d.empresa.trim() || undefined,
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
        <p>Te escribimos por WhatsApp en menos de 24 horas hábiles para coordinar el día y la hora.</p>
      </div>
    )
  }

  return (
    <form className="dg-form" onSubmit={submit} noValidate ref={box}>
      <div className="dg-prog" aria-label={`Paso ${paso + 1} de 3: ${PASOS[paso]}`}>
        {PASOS.map((p, i) => (
          <span key={p} className={i <= paso ? 'is-on' : undefined}>
            {p}
          </span>
        ))}
      </div>

      {paso === 0 && (
        <fieldset>
          <legend>¿Qué te gustaría sacarte de encima?</legend>
          <p className="dg-hint">Podés marcar varias.</p>
          <div className="au-chips">
            {TAREAS.map((t) => (
              <button key={t} type="button" className="au-chip" aria-pressed={d.tareas.includes(t)} onClick={() => toggle(t)}>
                {t}
              </button>
            ))}
          </div>
          <label>
            <span>Contanos en una línea (opcional)</span>
            <input value={d.detalle} onChange={set('detalle')} placeholder="Ej.: respondemos 80 consultas por día a mano" maxLength={200} />
          </label>
        </fieldset>
      )}

      {paso === 1 && (
        <fieldset>
          <legend>Contanos de tu empresa</legend>
          <p className="dg-hint">Así llegamos a la reunión con ideas para tu rubro.</p>
          <span className="dg-sub">Rubro</span>
          <div className="au-chips">
            {RUBROS.map((r) => (
              <button key={r} type="button" className="au-chip" aria-pressed={d.rubro === r} onClick={() => pick('rubro', r)}>
                {r}
              </button>
            ))}
          </div>
          <span className="dg-sub">¿Cuántas personas trabajan?</span>
          <div className="au-chips">
            {EMPLEADOS.map((r) => (
              <button key={r} type="button" className="au-chip" aria-pressed={d.empleados === r} onClick={() => pick('empleados', r)}>
                {r}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {paso === 2 && (
        <fieldset>
          <legend>¿A dónde te escribimos?</legend>
          <p className="dg-hint">Coordinamos la reunión por WhatsApp.</p>
          <label>
            <span>Nombre y apellido</span>
            <input value={d.nombre} onChange={set('nombre')} autoComplete="name" required />
          </label>
          <div className="dg-row">
            <label>
              <span>WhatsApp</span>
              <input type="tel" value={d.telefono} onChange={set('telefono')} autoComplete="tel" placeholder="11 2345-6789" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" value={d.email} onChange={set('email')} autoComplete="email" required />
            </label>
          </div>
          <label>
            <span>Empresa (opcional)</span>
            <input value={d.empresa} onChange={set('empresa')} autoComplete="organization" />
          </label>
        </fieldset>
      )}

      {error && (
        <p className="dg-error" role="alert">
          {error}
        </p>
      )}

      <div className="dg-nav">
        {paso > 0 && (
          <button type="button" className="dg-back" onClick={() => ir(paso - 1)}>
            ← Atrás
          </button>
        )}
        <button type="submit" className="nd-btn" disabled={sending}>
          {paso < 2 ? 'Siguiente →' : sending ? 'Enviando…' : 'Pedir mi diagnóstico'}
        </button>
      </div>
      {paso === 1 && (
        <button type="button" className="dg-skip" onClick={() => ir(2)}>
          Prefiero contarlo en la reunión
        </button>
      )}
      <p className="dg-note">Sin cargo · 30 a 45 minutos por videollamada</p>
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
          <span className="au-pop-k">Diagnóstico gratis · 1 minuto</span>
          <h3 id="dg-pop-t">Contanos qué te frena</h3>
          <DiagnosticoForm source={source} autoFocus />
        </div>
      </div>
    </div>
  )
}

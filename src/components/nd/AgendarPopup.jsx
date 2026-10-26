import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { IconArrowLeft, IconArrowRight, IconCalendar } from '../Icons'
import { Cloud, WaLink } from './Nd'

/*
  Agendador de llamadas en un popup al estilo Cal.com: todo en una ventana, sin scroll.
  Mes a la izquierda, horarios del día al lado y, al elegir uno, los datos en el mismo lugar.
  Los horarios salen del Google Calendar de Nimbo y la reserva crea el evento con Meet
  (lib/booking-handler.js). Cualquier botón lo abre con useAgendar()(origen).

  Anti-bots propio, sin servicios externos: el "No soy un robot" es una prueba de trabajo firmada.
*/

const TZ = 'America/Argentina/Buenos_Aires'
const WA_MSG = '¡Hola! Quiero agendar una llamada con Nimbo.'

const dayKey = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' })
const fmtTime = new Intl.DateTimeFormat('es-AR', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
const fmtLong = new Intl.DateTimeFormat('es-AR', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' })
const fmtDayHead = new Intl.DateTimeFormat('es-AR', { timeZone: 'UTC', weekday: 'short', day: 'numeric' })
const fmtMonth = new Intl.DateTimeFormat('es-AR', { timeZone: 'UTC', month: 'long', year: 'numeric' })
const WEEKDAYS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const when = (iso) => `${fmtLong.format(new Date(iso))}, ${fmtTime.format(new Date(iso))} h`
// 'YYYY-MM-DD' → fecha UTC de ese día (para armar el mes sin líos de zona horaria)
const keyDate = (k) => new Date(`${k}T12:00:00Z`)
const monthOf = (k) => k.slice(0, 7)
const addMonth = (m, n) => {
  const d = new Date(`${m}-01T12:00:00Z`)
  d.setUTCMonth(d.getUTCMonth() + n)
  return d.toISOString().slice(0, 7)
}

/* ---------- "No soy un robot": el servidor manda un desafío firmado y el navegador busca el número
   cuyo SHA-256 coincide (~1 s). Para una persona es un toque; para un bot, cada reserva cuesta lo mismo. */
const enc = new TextEncoder()
async function solveChallenge({ salt, challenge, max }) {
  const target = Uint8Array.from(challenge.match(/../g), (h) => parseInt(h, 16))
  const same = (buf) => new Uint8Array(buf).every((b, i) => b === target[i])
  for (let n = 0; n <= max; n += 1000) {
    const batch = []
    for (let i = n; i < Math.min(n + 1000, max + 1); i++) batch.push(crypto.subtle.digest('SHA-256', enc.encode(salt + i)))
    const k = (await Promise.all(batch)).findIndex(same)
    if (k >= 0) return n + k
  }
  throw new Error('sin solución')
}

async function getProof() {
  const r = await fetch('/api/agendar?reto=1', { headers: { Accept: 'application/json' } })
  if (!r.ok) throw new Error(String(r.status))
  const c = await r.json()
  // un mínimo visible para que el "Verificando…" no parpadee
  const [number] = await Promise.all([solveChallenge(c), new Promise((ok) => setTimeout(ok, 700))])
  return { salt: c.salt, challenge: c.challenge, signature: c.signature, number }
}

const ROBOT_LABEL = {
  idle: 'No soy un robot',
  working: 'Verificando…',
  done: 'Verificado',
  error: 'No se pudo verificar. Tocá para reintentar',
}

function NotRobot({ state, onVerify }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={state === 'done'}
      className="ag-robot"
      data-state={state}
      onClick={onVerify}
      disabled={state === 'working' || state === 'done'}
    >
      <span className="ag-robot-box" aria-hidden="true">
        {state === 'done' && '✓'}
      </span>
      <span className="ag-robot-t" aria-live="polite">
        {ROBOT_LABEL[state]}
      </span>
      <span className="ag-robot-by" aria-hidden="true">
        <Cloud /> Nimbo
      </span>
    </button>
  )
}

const IconClock = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconVideo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <rect x="3" y="6.5" width="12.5" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M15.5 10.5 21 7.5v9l-5.5-3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
)
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5s1.2-6.1 3.6-8.5Z" stroke="currentColor" strokeWidth="1.6" />
  </svg>
)

/* ---------- mes ---------- */

function Month({ month, byDay, day, onDay, onMonth, months }) {
  const first = keyDate(`${month}-01`)
  const offset = (first.getUTCDay() + 6) % 7 // la semana empieza el lunes
  const total = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate()
  const today = dayKey.format(new Date())
  const cells = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => `${month}-${String(i + 1).padStart(2, '0')}`)]
  const i = months.indexOf(month)

  return (
    <div className="ag-month">
      <div className="ag-month-head">
        <b>{cap(fmtMonth.format(first))}</b>
        <div className="ag-month-nav">
          <button type="button" aria-label="Mes anterior" disabled={i <= 0} onClick={() => onMonth(months[i - 1])}>
            <IconArrowLeft size={16} />
          </button>
          <button type="button" aria-label="Mes siguiente" disabled={i < 0 || i >= months.length - 1} onClick={() => onMonth(months[i + 1])}>
            <IconArrowRight size={16} />
          </button>
        </div>
      </div>
      <div className="ag-grid" role="grid" aria-label="Días con horarios libres">
        {WEEKDAYS.map((w) => (
          <span key={w} className="ag-wd" aria-hidden="true">
            {w}
          </span>
        ))}
        {cells.map((k, n) =>
          k ? (
            <button
              key={k}
              type="button"
              className="ag-cell"
              data-today={k === today || undefined}
              aria-pressed={k === day}
              disabled={!byDay.has(k)}
              onClick={() => onDay(k)}
              aria-label={cap(fmtLong.format(keyDate(k)))}
            >
              {Number(k.slice(8))}
            </button>
          ) : (
            <span key={`e${n}`} />
          ),
        )}
      </div>
    </div>
  )
}

/* ---------- el agendador ---------- */

const EMPTY = { name: '', email: '', phone: '', company: '', topic: '', website: '' }

function useSlots() {
  const [state, setState] = useState({ loading: true, error: '', slots: [] })
  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }))
    fetch('/api/agendar', { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => setState({ loading: false, error: '', slots: d.slots ?? [] }))
      .catch(() => setState({ loading: false, error: 'No pudimos cargar los horarios.', slots: [] }))
  }, [])
  useEffect(load, [load])
  return [state, load]
}

function Booking({ source, onClose }) {
  const [{ loading, error: loadError, slots }, reload] = useSlots()
  const byDay = useMemo(() => {
    const map = new Map()
    for (const iso of slots) {
      const k = dayKey.format(new Date(iso))
      if (!map.has(k)) map.set(k, [])
      map.get(k).push(iso)
    }
    return map
  }, [slots])
  const months = useMemo(() => [...new Set([...byDay.keys()].map(monthOf))], [byDay])

  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [slot, setSlot] = useState('')
  const [d, setD] = useState(EMPTY)
  const [proof, setProof] = useState(null)
  const [robot, setRobot] = useState('idle')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(null)
  const shownAt = useRef(0)
  const firstField = useRef(null)

  // al cargar: el primer día con horarios, elegido
  useEffect(() => {
    const first = byDay.keys().next().value
    if (first && !byDay.has(day)) {
      setDay(first)
      setMonth(monthOf(first))
    }
  }, [byDay, day])
  useEffect(() => {
    if (!slot) return
    shownAt.current = Date.now()
    if (window.matchMedia?.('(pointer: fine)').matches) firstField.current?.focus()
  }, [slot])

  const set = (k) => (e) => setD((v) => ({ ...v, [k]: e.target.value }))
  const verify = async () => {
    setRobot('working')
    try {
      const p = await getProof()
      setProof(p)
      setRobot('done')
      return p
    } catch {
      setRobot('error')
      return null
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email.trim())
    if (!d.name.trim() || !emailOk) return setError('Completá tu nombre y un mail válido.')
    setError('')
    setSending(true)
    try {
      // si no tocó "No soy un robot", se verifica solo al confirmar
      const pow = proof ?? (await verify())
      if (!pow) return setError('No pudimos verificar que no seas un robot. Tocá "No soy un robot" de nuevo.')
      const res = await fetch('/api/agendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...d, start: slot, pow, source, elapsed: Date.now() - shownAt.current }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'No se pudo agendar. Probá de nuevo o escribinos por WhatsApp.')
        // la verificación vale para una reserva: si el servidor la rechazó, hay que hacerla de nuevo
        if (res.status === 403 || /verificación/i.test(data.error || '')) {
          setProof(null)
          setRobot('idle')
        }
        // el horario se ocupó mientras completaba: volver a elegir con la lista al día
        if (res.status === 409 && !/agendada/.test(data.error || '')) {
          setSlot('')
          reload()
        }
        return
      }
      setDone({ ...data, start: data.start || slot })
    } catch {
      setError('No se pudo agendar. Probá de nuevo o escribinos por WhatsApp.')
    } finally {
      setSending(false)
    }
  }

  const times = byDay.get(day) ?? []
  const step = done ? 'done' : slot ? 'form' : 'pick'

  let main
  if (done) {
    main = (
      <div className="ag-done" role="status">
        <span className="ag-done-ic" aria-hidden="true">
          ✓
        </span>
        <h3>¡Listo, {d.name.trim().split(/\s+/)[0]}!</h3>
        <p>
          Nos vemos el <b>{when(done.start)}</b>. Te mandamos la invitación a <b>{d.email.trim()}</b> con el link de Google Meet.
        </p>
        <div className="ag-done-btns">
          {done.meet && (
            <a className="nd-btn" href={done.meet} target="_blank" rel="noreferrer">
              Link de la videollamada
            </a>
          )}
          <button type="button" className="nd-btn nd-btn-soft" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    )
  } else if (loading && !slots.length) {
    main = <p className="ag-state">Buscando horarios libres…</p>
  } else if (loadError || !byDay.size) {
    main = (
      <div className="ag-state">
        <p>{loadError || 'No quedan horarios libres en las próximas semanas.'}</p>
        <div className="ag-state-btns">
          {loadError && (
            <button type="button" className="nd-btn" onClick={reload}>
              Reintentar
            </button>
          )}
          <WaLink cta="agendar" msg={WA_MSG} className="nd-more">
            Coordinemos por WhatsApp →
          </WaLink>
        </div>
      </div>
    )
  } else if (step === 'pick') {
    main = (
      <>
        <Month month={month || months[0]} byDay={byDay} day={day} onDay={setDay} onMonth={setMonth} months={months} />
        <div className="ag-times">
          <b className="ag-times-h">{day ? cap(fmtDayHead.format(keyDate(day))).replace('.', '') : 'Elegí un día'}</b>
          <div className="ag-times-list">
            {times.map((iso) => (
              <button key={iso} type="button" className="ag-time" onClick={() => setSlot(iso)}>
                {fmtTime.format(new Date(iso))}
              </button>
            ))}
          </div>
        </div>
      </>
    )
  } else {
    main = (
      <form className="ag-form" onSubmit={submit} noValidate>
        <button type="button" className="ag-back" onClick={() => (setSlot(''), setError(''))}>
          <IconArrowLeft size={16} /> Cambiar horario
        </button>
        <label>
          <span>Nombre y apellido</span>
          <input ref={firstField} value={d.name} onChange={set('name')} autoComplete="name" maxLength={80} required />
        </label>
        <div className="ag-row">
          <label>
            <span>Email</span>
            <input type="email" value={d.email} onChange={set('email')} autoComplete="email" maxLength={120} required />
          </label>
          <label>
            <span>WhatsApp (opcional)</span>
            <input type="tel" value={d.phone} onChange={set('phone')} autoComplete="tel" placeholder="11 2345-6789" maxLength={30} />
          </label>
        </div>
        <div className="ag-row">
          <label>
            <span>Empresa (opcional)</span>
            <input value={d.company} onChange={set('company')} autoComplete="organization" maxLength={80} />
          </label>
          <label>
            <span>¿Qué querés resolver? (opcional)</span>
            <input value={d.topic} onChange={set('topic')} maxLength={400} placeholder="Ej.: responder WhatsApp" />
          </label>
        </div>
        {/* campo trampa para bots: oculto para las personas */}
        <label className="ag-hp" aria-hidden="true">
          <span>Sitio web</span>
          <input value={d.website} onChange={set('website')} tabIndex={-1} autoComplete="off" />
        </label>
        <NotRobot state={robot} onVerify={verify} />
        {error && (
          <p className="ag-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="nd-btn ag-submit" disabled={sending}>
          {sending ? 'Agendando…' : 'Confirmar llamada'}
        </button>
      </form>
    )
  }

  return (
    <div className="ag-box" data-step={step}>
      <aside className="ag-info">
        <span className="ag-brand">
          <Cloud /> Nimbo
        </span>
        <h3 id="ag-pop-t">Llamada con Nimbo</h3>
        <p className="ag-lead">Vemos tu caso y qué se puede automatizar. Sin cargo.</p>
        <ul className="ag-meta">
          <li>
            <IconClock /> 30 minutos
          </li>
          <li>
            <IconVideo /> Google Meet
          </li>
          <li>
            <IconGlobe /> Argentina (GMT-3)
          </li>
          {slot && (
            <li className="ag-meta-on">
              <IconCalendar size={18} /> {cap(when(slot))}
            </li>
          )}
        </ul>
        <WaLink cta="agendar" msg={WA_MSG} className="ag-wa">
          ¿Preferís WhatsApp? →
        </WaLink>
      </aside>
      <div className="ag-main">{main}</div>
    </div>
  )
}

/* ---------- popup ---------- */

const Ctx = createContext(() => {})
export const useAgendar = () => useContext(Ctx)

export function AgendarProvider({ children }) {
  const [pop, setPop] = useState(null)
  const open = useCallback((source = 'boton') => setPop({ source }), [])
  const close = useCallback(() => setPop(null), [])
  return (
    <Ctx.Provider value={open}>
      {children}
      {pop && <AgendarPopup source={pop.source} onClose={close} />}
    </Ctx.Provider>
  )
}

function AgendarPopup({ source, onClose }) {
  const box = useRef(null)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    box.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div className="au-pop-bg ag-pop-bg" onClick={onClose}>
      <div
        className="ag-pop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ag-pop-t"
        tabIndex={-1}
        ref={box}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="au-pop-x" type="button" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <Booking source={source} onClose={onClose} />
      </div>
    </div>
  )
}

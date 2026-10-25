import { useEffect, useMemo, useRef, useState } from 'react'
import { NdPageHero, WA_LABEL, WaLink } from '../components/nd/Nd'
import { useSeo } from '../hooks/useSeo'

/*
  Agendador propio de llamadas (reemplaza Cal.com): el visitante elige día y hora entre los huecos
  libres del Google Calendar de Nimbo y la reserva crea el evento con link de Meet (lib/booking-handler.js).
  Captcha: Cloudflare Turnstile. En local sin clave se usa la de prueba de Cloudflare (siempre pasa).
*/

const TZ = 'America/Argentina/Buenos_Aires'
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || (import.meta.env.DEV ? '1x00000000000000000000AA' : '')
const WA_MSG = '¡Hola! Quiero agendar una llamada con Nimbo.'

const dayKey = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' })
const fmtWeekday = new Intl.DateTimeFormat('es-AR', { timeZone: TZ, weekday: 'short' })
const fmtDayNum = new Intl.DateTimeFormat('es-AR', { timeZone: TZ, day: 'numeric', month: 'short' })
const fmtTime = new Intl.DateTimeFormat('es-AR', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
const fmtLong = new Intl.DateTimeFormat('es-AR', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' })

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const when = (iso) => `${fmtLong.format(new Date(iso))}, ${fmtTime.format(new Date(iso))} h`
const longWhen = (iso) => cap(when(iso))

/* El script de Turnstile se carga una sola vez y solo cuando aparece el formulario */
let turnstileReady
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  turnstileReady ??= new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    s.async = true
    s.onload = () => resolve(window.turnstile)
    s.onerror = () => {
      turnstileReady = undefined
      reject(new Error('turnstile'))
    }
    document.head.appendChild(s)
  })
  return turnstileReady
}

function Captcha({ onToken, resetKey }) {
  const box = useRef(null)
  const id = useRef(null)
  useEffect(() => {
    let off = false
    loadTurnstile()
      .then((ts) => {
        if (off || !box.current) return
        id.current = ts.render(box.current, {
          sitekey: SITE_KEY,
          language: 'es',
          callback: onToken,
          'expired-callback': () => onToken(''),
          'error-callback': () => onToken(''),
        })
      })
      .catch(() => onToken(''))
    return () => {
      off = true
      if (id.current != null) window.turnstile?.remove(id.current)
    }
  }, [onToken])
  // después de un error del servidor el token ya se usó: se pide uno nuevo
  useEffect(() => {
    if (resetKey && id.current != null) window.turnstile?.reset(id.current)
  }, [resetKey])
  return <div ref={box} className="ag-captcha" />
}

function useSlots() {
  const [state, setState] = useState({ loading: true, error: '', slots: [] })
  const load = () => {
    setState((s) => ({ ...s, loading: true, error: '' }))
    fetch('/api/agendar', { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => setState({ loading: false, error: '', slots: d.slots ?? [] }))
      .catch(() => setState({ loading: false, error: 'No pudimos cargar los horarios.', slots: [] }))
  }
  useEffect(load, [])
  return [state, load]
}

const EMPTY = { name: '', email: '', phone: '', company: '', topic: '', website: '' }

export default function Agendar() {
  useSeo({
    title: 'Agendá una llamada — Nimbo Consulting',
    description:
      'Elegí día y horario para una videollamada de 30 minutos sin cargo con Nimbo. Te llega la invitación con el link de Google Meet.',
    path: '/agendar',
  })

  const [{ loading, error: loadError, slots }, reload] = useSlots()
  const days = useMemo(() => {
    const map = new Map()
    for (const iso of slots) {
      const k = dayKey.format(new Date(iso))
      if (!map.has(k)) map.set(k, [])
      map.get(k).push(iso)
    }
    return [...map.entries()].map(([key, times]) => ({ key, times }))
  }, [slots])

  const [day, setDay] = useState('')
  const [slot, setSlot] = useState('')
  const [d, setD] = useState(EMPTY)
  const [captcha, setCaptcha] = useState('')
  const [resetKey, setResetKey] = useState(0)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(null)
  const shownAt = useRef(0)
  const cardRef = useRef(null)

  useEffect(() => {
    if (!day && days.length) setDay(days[0].key)
  }, [days, day])
  useEffect(() => {
    if (slot) shownAt.current = Date.now()
  }, [slot])
  // al pasar de paso la tarjeta cambia de alto: que su comienzo quede a la vista (sobre todo en celular)
  useEffect(() => {
    const el = cardRef.current
    if ((slot || done) && el && el.getBoundingClientRect().top < 80) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [slot, done])

  const set = (k) => (e) => setD((v) => ({ ...v, [k]: e.target.value }))
  const current = days.find((x) => x.key === day)

  const submit = async (e) => {
    e.preventDefault()
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email.trim())
    if (!d.name.trim() || !emailOk) return setError('Completá tu nombre y un mail válido.')
    if (!captcha) return setError('Completá la verificación de abajo.')
    setError('')
    setSending(true)
    try {
      const res = await fetch('/api/agendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...d, start: slot, captcha, elapsed: Date.now() - shownAt.current }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'No se pudo agendar. Probá de nuevo o escribinos por WhatsApp.')
        setCaptcha('')
        setResetKey((n) => n + 1)
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

  let card
  if (done) {
    card = (
      <div className="dg-done ag-done" role="status">
        <span className="ag-ok">✓ Llamada agendada</span>
        <h2>¡Listo, {d.name.trim().split(/\s+/)[0]}!</h2>
        <p>
          Nos vemos el <b>{when(done.start)}</b> (hora de Argentina). Te mandamos la invitación a <b>{d.email.trim()}</b>{' '}
          con el link de Google Meet.
        </p>
        {done.meet && (
          <a className="nd-btn" href={done.meet} target="_blank" rel="noreferrer">
            Link de la videollamada
          </a>
        )}
      </div>
    )
  } else if (loading && !slots.length) {
    card = <p className="ag-msg">Buscando horarios libres…</p>
  } else if (loadError || !days.length) {
    card = (
      <div className="ag-msg">
        <p>{loadError || 'No quedan horarios libres en las próximas semanas.'}</p>
        <div className="ag-actions">
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
  } else if (!slot) {
    card = (
      <div className="ag-pick">
        <h2 className="ag-h">Elegí el día</h2>
        <div className="ag-days" role="listbox" aria-label="Días disponibles">
          {days.map(({ key, times }) => {
            const t = new Date(times[0])
            return (
              <button key={key} type="button" role="option" aria-selected={key === day} className="ag-day" onClick={() => setDay(key)}>
                <span>{fmtWeekday.format(t).replace('.', '')}</span>
                <b>{fmtDayNum.format(t).replace('.', '')}</b>
              </button>
            )
          })}
        </div>
        {current && (
          <>
            <h2 className="ag-h">{cap(fmtLong.format(new Date(current.times[0])))}</h2>
            <div className="ag-times">
              {current.times.map((iso) => (
                <button key={iso} type="button" className="ag-time" onClick={() => setSlot(iso)}>
                  {fmtTime.format(new Date(iso))}
                </button>
              ))}
            </div>
          </>
        )}
        <p className="dg-note">Horarios en hora de Argentina (GMT-3) · 30 minutos por Google Meet</p>
        {error && (
          <p className="dg-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  } else {
    card = (
      <form className="dg-form" onSubmit={submit} noValidate>
        <div className="ag-chosen">
          <span>
            <b>{longWhen(slot)}</b> · 30 min por Meet
          </span>
          <button type="button" className="dg-back" onClick={() => (setSlot(''), setError(''))}>
            Cambiar
          </button>
        </div>
        <fieldset>
          <legend>Tus datos</legend>
          <label>
            <span>Nombre y apellido</span>
            <input value={d.name} onChange={set('name')} autoComplete="name" maxLength={80} required />
          </label>
          <div className="dg-row">
            <label>
              <span>Email</span>
              <input type="email" value={d.email} onChange={set('email')} autoComplete="email" maxLength={120} required />
            </label>
            <label>
              <span>WhatsApp (opcional)</span>
              <input type="tel" value={d.phone} onChange={set('phone')} autoComplete="tel" placeholder="11 2345-6789" maxLength={30} />
            </label>
          </div>
          <label>
            <span>Empresa (opcional)</span>
            <input value={d.company} onChange={set('company')} autoComplete="organization" maxLength={80} />
          </label>
          <label>
            <span>¿Qué te gustaría resolver? (opcional)</span>
            <textarea value={d.topic} onChange={set('topic')} maxLength={400} placeholder="Ej.: respondemos 80 consultas por día a mano" />
          </label>
          {/* campo trampa para bots: oculto para las personas */}
          <label className="ag-hp" aria-hidden="true">
            <span>Sitio web</span>
            <input value={d.website} onChange={set('website')} tabIndex={-1} autoComplete="off" />
          </label>
        </fieldset>
        <Captcha onToken={setCaptcha} resetKey={resetKey} />
        {error && (
          <p className="dg-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="nd-btn" disabled={sending}>
          {sending ? 'Agendando…' : 'Confirmar llamada'}
        </button>
        <p className="dg-note">Te llega la invitación por mail con el link de Google Meet.</p>
      </form>
    )
  }

  return (
    <main className="nd-page-main">
      <NdPageHero eyebrow="Llamada sin cargo" title="Agendá una llamada con Nimbo">
        <p>Elegí el día y el horario que te quede cómodo. Son 30 minutos por videollamada para ver tu caso.</p>
      </NdPageHero>

      <section className="nd-wrap ct-grid">
        <div className="ct-aside">
          <h2>Qué vemos en la llamada</h2>
          <ol className="dg-steps">
            <li>
              <b>Cómo trabajás hoy.</b> Cómo llega un cliente, un pedido o un turno, y quién hace cada paso.
            </li>
            <li>
              <b>Dónde se pierde tiempo.</b> Las tareas que se repiten y lo que cuestan por semana.
            </li>
            <li>
              <b>Qué se puede hacer.</b> Si hay caso, te mandamos una propuesta en pesos. Si no, te lo decimos.
            </li>
          </ol>
          <dl className="ct-list">
            <div>
              <dt>Duración</dt>
              <dd>30 minutos</dd>
            </div>
            <div>
              <dt>Modalidad</dt>
              <dd>Google Meet</dd>
            </div>
            <div>
              <dt>Costo</dt>
              <dd>Sin cargo</dd>
            </div>
          </dl>
          <WaLink cta="agendar" msg={WA_MSG} className="nd-more">
            ¿Preferís WhatsApp? {WA_LABEL} →
          </WaLink>
        </div>

        <div className="ct-card ag-card" ref={cardRef}>
          {card}
        </div>
      </section>
    </main>
  )
}

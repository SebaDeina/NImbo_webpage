// /contacto · "Empecemos": formulario en tres pasos (vos, contacto, tu caso) al estilo de
// shipperslab.tech/empecemos. Todos los botones de contacto del sitio llegan acá; `?s=<servicio>` deja
// marcado el tema. El envío va por submitContact (src/lib/cms → /api/contact): llega un mail a Nimbo y, si dejó
// mail, el acuse a la persona.
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { submitContact } from '../lib/cms'
import { AREAS, RUBROS } from './data'
import { Arrow, Icon, LiveEngraving } from './ui'
import { Words } from './motion'

const WA_NUM = '5491124036836'
const MAIL = 'contacto@nimbodata.com'
const AGENDAR = '/agendar'
const PREFIJOS = ['+54', '+598', '+56', '+52', '+34', '+1']

const TEMAS = [
  ['agentes-de-ia', 'Atender WhatsApp e Instagram'],
  ['automatizaciones', 'Sacar tareas repetidas'],
  ['datos-y-tableros', 'Tener mis números claros'],
  ['software-a-medida', 'Un sistema a medida'],
  ['otro', 'Todavía no sé'],
]
const PASOS = ['Vos', 'Contacto', 'Tu caso']

export default function Contact() {
  const params = new URLSearchParams(useLocation().search)
  const pre = params.get('s')
  const rubro = RUBROS.find((x) => x.slug === params.get('r')) // ?r=…: viene de "Para quién trabajamos"
  const temas = pre === 'beta' ? [...TEMAS, ['beta', 'Sumarme a BETA']] : TEMAS
  const [step, setStep] = useState(0)
  const [d, setD] = useState({
    name: '', company: '', cc: '+54', phone: '', email: '',
    temas: pre === 'beta' || TEMAS.some(([k]) => k === pre) ? [pre] : [], msg: '',
  })
  const [err, setErr] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const set = (k) => (e) => setD((x) => ({ ...x, [k]: e.target.value }))
  const toggle = (k) => setD((x) => ({ ...x, temas: x.temas.includes(k) ? x.temas.filter((t) => t !== k) : [...x.temas, k] }))

  const mailOk = !d.email || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)
  const check = () => {
    if (step === 0 && !d.name.trim()) return 'Decinos cómo te llamás.'
    if (step === 1 && !d.phone.trim() && !d.email.trim()) return 'Dejanos un WhatsApp o un mail para responderte.'
    if (step === 1 && !mailOk) return 'Revisá el mail.'
    if (step === 2 && !d.temas.length && !d.msg.trim()) return 'Elegí un tema o contanos en una línea qué pasa.'
    return ''
  }
  const next = async (e) => {
    e.preventDefault()
    const m = check()
    setErr(m)
    if (m) return
    if (step < 2) return setStep(step + 1)
    const [firstName, ...rest] = d.name.trim().split(/\s+/)
    setSending(true)
    try {
      await submitContact({
        firstName, lastName: rest.join(' '), company: d.company.trim(), email: d.email.trim(),
        countryCode: d.phone.trim() ? d.cc : '', phone: d.phone.trim(), topics: d.temas, topic: d.temas[0] || 'otro',
        message: d.msg.trim(), source: 'form', page: pre ? `/contacto?s=${pre}` : rubro ? `/contacto?r=${rubro.slug}` : '/contacto',
        rubro: rubro ? rubro.t : '', lang: 'es',
      })
      setSent(true)
    } catch {
      setErr('No pudimos enviarlo. Probá de nuevo o escribinos por WhatsApp.')
    } finally {
      setSending(false)
    }
  }

  const resumen = [
    `¡Hola! Soy ${d.name.trim()}${d.company.trim() ? ` de ${d.company.trim()}` : ''}.`,
    d.temas.length ? `Me interesa: ${d.temas.map((k) => temas.find(([t]) => t === k)[1].toLowerCase()).join(', ')}.` : '',
    d.msg.trim(),
  ].filter(Boolean).join(' ')
  const waLink = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(sent ? resumen : '¡Hola! Vi el sitio de Nimbo y quiero contarles un proceso de mi empresa.')}`
  const servicio = pre === 'beta' ? { t: 'BETA' } : AREAS.find((a) => a.slug === pre) || rubro

  return (
    <>
      <section className="start wrap">
        <div className="start-panel">
          <LiveEngraving className="start-art" />
          <div className="start-head" data-reveal>
            <h1>Empecemos.</h1>
            <p className="lead"><Words>Tres pasos, menos de un minuto. Te respondemos en menos de 24 h para coordinar una charla de 20 minutos, sin cargo.</Words></p>
          </div>

          <div className="start-card" data-reveal style={{ '--d': '120ms' }}>
            {sent ? (
              <div className="done">
                <span className="done-check"><Icon d="M5 12.5l4.2 4.2L19 7" /></span>
                <h2>Listo, {d.name.trim().split(' ')[0]}.</h2>
                <p>Te escribimos {d.phone.trim() ? 'por WhatsApp' : 'por mail'} en menos de 24 h para coordinar la charla.</p>
                <a className="btn btn-wide" href={waLink}>¿Apurado? Mandalo por WhatsApp <Arrow /></a>
              </div>
            ) : (
              <form onSubmit={next} noValidate>
                <ol className="stepper" aria-label="Pasos">
                  {PASOS.map((p, i) => (
                    <li key={p} className={i === step ? 'on' : i < step ? 'ok' : ''}>
                      <button type="button" onClick={() => i < step && setStep(i)} disabled={i > step}>
                        <span>{i < step ? '✓' : i + 1}</span>{p}
                      </button>
                    </li>
                  ))}
                </ol>

                <div key={step} className="step-body">
                  {step === 0 && (
                    <>
                      <label className="field">Nombre<input autoFocus value={d.name} onChange={set('name')} placeholder="Tu nombre" autoComplete="name" /></label>
                      <label className="field">Negocio o empresa <i>(opcional)</i><input value={d.company} onChange={set('company')} placeholder="Nombre de tu negocio" autoComplete="organization" /></label>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <div className="field">WhatsApp
                        <div className="phone">
                          <select value={d.cc} onChange={set('cc')} aria-label="Prefijo">{PREFIJOS.map((p) => <option key={p}>{p}</option>)}</select>
                          <input autoFocus value={d.phone} onChange={set('phone')} placeholder="11 2345 6789" inputMode="tel" autoComplete="tel-national" aria-label="Número de WhatsApp" />
                        </div>
                      </div>
                      <label className="field">Mail <i>(si preferís)</i><input value={d.email} onChange={set('email')} placeholder="vos@tuempresa.com" inputMode="email" autoComplete="email" /></label>
                      <p className="hint">Con uno de los dos alcanza.</p>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <div className="field">¿Qué te gustaría resolver?
                        <div className="chips">
                          {temas.map(([k, l]) => (
                            <button type="button" key={k} className={d.temas.includes(k) ? 'on' : ''} aria-pressed={d.temas.includes(k)} onClick={() => toggle(k)}>{l}</button>
                          ))}
                        </div>
                      </div>
                      <label className="field">Contanos un poco <i>(opcional)</i>
                        <textarea rows={4} value={d.msg} onChange={set('msg')} placeholder="Ej.: los pedidos entran por WhatsApp y los cargamos a mano en una planilla." />
                      </label>
                    </>
                  )}
                </div>

                {err && <p className="err" role="alert">{err}</p>}

                <div className="form-foot">
                  {step > 0
                    ? <button type="button" className="back" onClick={() => { setErr(''); setStep(step - 1) }}>← Atrás</button>
                    : <a className="cal" href={AGENDAR}><Icon d="M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4" />Agendá una llamada</a>}
                  <button type="submit" className="btn btn-acc" disabled={sending}>{step < 2 ? 'Siguiente' : sending ? 'Enviando…' : 'Enviar'} <Arrow /></button>
                </div>
              </form>
            )}
          </div>
          {servicio && !sent && <p className="start-from mono">Venís de {servicio.t}</p>}
        </div>
      </section>

      <section className="sec wrap channels">
        <div className="sec-head" data-reveal>
          <div>
            <h2>¿Preferís otro canal?</h2>
            <p className="lead">Escribinos por donde te quede más cómodo. Del otro lado está el equipo, no un bot.</p>
          </div>
        </div>
        <div className="others">
          <a className="other" href={waLink} data-reveal>
            <span className="chip chip-sm"><Icon d="M4 5h16v11H9l-5 4z" /></span>
            <h4>WhatsApp</h4><p>+54 9 11 2403-6836 · respondemos el mismo día.</p>
            <span className="other-go">Escribir <Arrow /></span>
          </a>
          <a className="other" href={`mailto:${MAIL}`} data-reveal style={{ '--d': '80ms' }}>
            <span className="chip chip-sm"><Icon d="M3 6h18v12H3z M3 7l9 6 9-6" /></span>
            <h4>Mail</h4><p>{MAIL}</p>
            <span className="other-go">Escribir <Arrow /></span>
          </a>
          <a className="other" href={AGENDAR} data-reveal style={{ '--d': '160ms' }}>
            <span className="chip chip-sm"><Icon d="M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4" /></span>
            <h4>Videollamada</h4><p>Elegí un horario de 20 minutos en el calendario.</p>
            <span className="other-go">Agendar <Arrow /></span>
          </a>
        </div>
        <ol className="steps steps-3" data-reveal>
          <li><span className="mono">01</span><h4>Te respondemos</h4><p>En menos de 24 h, por el canal que elegiste.</p></li>
          <li><span className="mono">02</span><h4>Charla de 20 minutos</h4><p>Nos contás cómo trabajan y dónde se traba.</p></li>
          <li><span className="mono">03</span><h4>Propuesta por escrito</h4><p>Qué incluye, la puesta en marcha y el abono mensual.</p></li>
        </ol>
      </section>
    </>
  )
}

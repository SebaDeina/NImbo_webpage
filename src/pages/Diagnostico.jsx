import { useState } from 'react'
import { NdPageHero, WA_LABEL, WaLink } from '../components/nd/Nd'
import { submitContact } from '../lib/cms'
import { useSeo } from '../hooks/useSeo'

/*
  Pedido de reunión de diagnóstico (el botón principal de la home lleva acá).
  Va por /api/contact como el formulario de contacto: tema "diagnostico" y los datos de la
  empresa dentro del mensaje, así llega al mismo mail y Slack sin tocar el backend.
*/

const EMPLEADOS = ['1 a 9', '10 a 30', '31 a 100', 'Más de 100']
const RUBROS = ['Clínica o centro de servicios', 'Comercio o distribuidora', 'Empresa con mucha administración', 'Otro']
const HORARIOS = ['Por la mañana', 'Por la tarde', 'Me da igual']

const EMPTY = { nombre: '', empresa: '', email: '', telefono: '', empleados: '', rubro: '', problema: '', horario: '' }

const WA_MSG = '¡Hola! Quiero agendar una reunión de diagnóstico para mi empresa.'

export default function Diagnostico() {
  useSeo({
    title: 'Agendá un diagnóstico gratis — Nimbo Consulting',
    description:
      'Una reunión sin cargo de 30 a 45 minutos para entender tus procesos, cuánto te cuesta el problema y si la IA o la automatización lo pueden resolver.',
    path: '/diagnostico',
  })

  const [d, setD] = useState(EMPTY)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setD((v) => ({ ...v, [k]: e.target.value }))

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

  return (
    <main className="nd-page-main">
      <NdPageHero eyebrow="Diagnóstico gratis" title="Contanos qué te frena y lo vemos juntos">
        <p>
          Una reunión por videollamada, sin cargo, para entender cómo trabaja tu empresa y dónde pierde tiempo. Si tiene
          solución, te decimos cómo la resolveríamos y cuánto costaría.
        </p>
      </NdPageHero>

      <section className="nd-wrap ct-grid">
        <div className="ct-aside">
          <h2>Qué pasa en la reunión</h2>
          <ol className="dg-steps">
            <li>
              <b>Tu proceso actual.</b> Cómo llega un cliente, un pedido o un turno, y quién hace cada paso.
            </li>
            <li>
              <b>Cuánto te cuesta.</b> Horas por semana y ventas que se pierden: el número que justifica (o no) invertir.
            </li>
            <li>
              <b>Qué se puede hacer.</b> Si hay caso, en 48 h te mandamos una propuesta en pesos. Si no, te lo decimos.
            </li>
          </ol>
          <dl className="ct-list">
            <div>
              <dt>Duración</dt>
              <dd>30 a 45 minutos</dd>
            </div>
            <div>
              <dt>Modalidad</dt>
              <dd>Videollamada</dd>
            </div>
            <div>
              <dt>Costo</dt>
              <dd>Sin cargo</dd>
            </div>
          </dl>
          <WaLink cta="diagnostico" msg={WA_MSG} className="nd-more">
            ¿Preferís WhatsApp? {WA_LABEL} →
          </WaLink>
        </div>

        <div className="ct-card">
          {sent ? (
            <div className="dg-done" role="status">
              <h2>¡Listo, {d.nombre.trim().split(/\s+/)[0]}!</h2>
              <p>Te escribimos en menos de 24 horas hábiles para coordinar el día y la hora.</p>
            </div>
          ) : (
            <form className="dg-form" onSubmit={submit} noValidate>
              <label>
                <span>Nombre y apellido *</span>
                <input value={d.nombre} onChange={set('nombre')} autoComplete="name" required />
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
                  rows={4}
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
              <p className="dg-note">Usamos tus datos solo para coordinar la reunión.</p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

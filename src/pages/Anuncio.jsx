import { useState } from 'react'
import { Cloud, NdFaq, WA_LABEL, WaLink, useScrolled } from '../components/nd/Nd'
import { useSeo } from '../hooks/useSeo'
import '../styles/anuncio.css'

/*
  Landing del anuncio en ChatGPT (/diagnostico-ia). Quien llega ya estuvo preguntándole
  a una IA por su negocio: la página retoma esa pregunta y ofrece el diagnóstico gratis.
  Página enfocada: logo sin menú, todo termina en WhatsApp (data-cta "gpt-*" para medir
  qué botón convierte). No nombra a ChatGPT ni imita su interfaz: es un anuncio, no una
  recomendación de OpenAI.
*/

const WA_MSG = '¡Hola! Vi el anuncio de Nimbo y quiero el diagnóstico gratis para mi negocio.'

const PROBLEMAS = [
  'Responder WhatsApp todo el día',
  'Turnos y recordatorios',
  'Carga de datos a mano',
  'Presupuestos y facturación',
  'Seguimiento de clientes',
  'Reportes que nadie arma',
]

const msgFor = (sel) =>
  sel.length
    ? `¡Hola! Vi el anuncio de Nimbo y quiero el diagnóstico gratis. Lo que más me quita tiempo: ${sel.join(', ').toLowerCase()}.`
    : WA_MSG

const CASOS = [
  [
    'Un agente que responde por vos',
    'Precios, horarios, stock y estado de pedidos, en WhatsApp a cualquier hora. Lo que no sabe, lo pasa a una persona.',
  ],
  [
    'Turnos que se agendan solos',
    'El cliente elige el horario, le llega el recordatorio y la agenda se actualiza sin que nadie la toque.',
  ],
  [
    'Datos que viajan sin copiar',
    'Del mail o el formulario a la planilla, al CRM o a facturación. Menos horas de carga y menos errores.',
  ],
]

const PASOS = [
  ['Escribinos', 'Por WhatsApp, con lo que te quita más tiempo. Coordinamos una videollamada.'],
  ['30 minutos de diagnóstico', 'Vemos cómo trabaja tu negocio, dónde se pierde tiempo y cuánto te cuesta.'],
  ['Propuesta en 48 h', 'Si hay caso, te mandamos qué haríamos y cuánto cuesta, en pesos. Si no lo hay, te lo decimos.'],
]

const FAQ = [
  ['¿El diagnóstico tiene costo?', 'No. Es una videollamada de 30 a 45 minutos sin cargo y sin compromiso de contratar nada.'],
  ['¿Necesito saber de tecnología?', 'No. Vos nos contás cómo trabaja tu negocio; nosotros configuramos todo y capacitamos a tu equipo.'],
  ['¿Funciona con lo que ya uso?', 'En la mayoría de los casos sí: WhatsApp, Gmail, Google Sheets, CRMs y sistemas de gestión. Lo revisamos en la reunión.'],
  ['¿Cuánto tarda en estar andando?', 'Un primer agente o automatización suele quedar funcionando en 2 a 4 semanas.'],
]

export default function Anuncio() {
  useSeo({
    title: 'Diagnóstico gratis: IA y automatización para tu pyme | Nimbo',
    description:
      'Ya sabés que la IA puede ayudarte. En 30 minutos vemos qué tareas de tu negocio se pueden automatizar y cuánto cuesta. Sin cargo, por videollamada.',
    path: '/diagnostico-ia',
  })

  const scrolled = useScrolled()
  const [sel, setSel] = useState([])
  const toggle = (p) => setSel((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]))
  const msg = msgFor(sel)

  return (
    <div className="nd ad">
      <header className={`nd-head${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nd-wrap nd-head-in">
          <span className="nd-logo" aria-label="Nimbo">
            <Cloud />
            <span>nimbo</span>
          </span>
          <WaLink cta="gpt-top" msg={msg} className="nd-btn nd-btn-sm">
            WhatsApp
          </WaLink>
        </div>
      </header>

      <section className="ad-hero">
        <div className="nd-wrap ad-hero-in">
          <div className="ad-copy">
            <span className="nd-eyebrow">Diagnóstico gratis · 30 minutos</span>
            <h1>Ya sabés que la IA te puede ayudar. Nosotros la ponemos a trabajar en tu negocio.</h1>
            <p>
              Preguntar es el primer paso. En una videollamada sin cargo vemos qué tareas de tu pyme se pueden
              automatizar, cuánto tiempo te devuelven y cuánto cuesta hacerlo.
            </p>
            <ul className="ad-ticks">
              <li>Sin cargo y sin compromiso</li>
              <li>Propuesta en pesos en 48 h</li>
              <li>Equipo en Argentina</li>
            </ul>
          </div>

          <div className="ad-pick">
            <h2>¿Qué te quita más tiempo?</h2>
            <p className="nd-muted">Marcá lo que aplique y te escribimos con eso en mente.</p>
            <div className="ad-chips">
              {PROBLEMAS.map((p) => (
                <button key={p} type="button" aria-pressed={sel.includes(p)} onClick={() => toggle(p)}>
                  {p}
                </button>
              ))}
            </div>
            <WaLink cta={sel.length ? 'gpt-hero-elegido' : 'gpt-hero'} msg={msg} className="nd-btn ad-go">
              Pedir mi diagnóstico por WhatsApp
            </WaLink>
            <span className="ad-note">Te responde una persona del equipo · <span className="ad-nowrap">{WA_LABEL}</span></span>
          </div>
        </div>
      </section>

      <section className="nd-sec ad-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">Lo que suele salir de un diagnóstico</h2>
          <div className="nd-cols">
            {CASOS.map(([t, d], i) => (
              <div key={t} className="nd-col">
                <h3>{t}</h3>
                <p>{d}</p>
                <WaLink cta={`gpt-caso-${i + 1}`} msg={`¡Hola! Vi el anuncio de Nimbo. Me interesa esto: “${t}”. ¿Lo vemos en el diagnóstico?`} className="nd-more">
                  Lo quiero en mi negocio →
                </WaLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nd-sec ad-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">Cómo sigue después de escribirnos</h2>
          <div className="nd-cols nd-steps">
            {PASOS.map(([t, d], i) => (
              <div key={t} className="nd-col">
                <span className="nd-mono nd-step-k">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nd-sec ad-sec">
        <div className="nd-wrap nd-narrow">
          <h2 className="nd-h2 nd-center">Preguntas frecuentes</h2>
          <NdFaq items={FAQ} />
        </div>
      </section>

      <section className="nd-final">
        <div className="nd-wrap nd-final-in">
          <h2>Contanos qué te frena y lo vemos juntos</h2>
          <p>30 minutos por videollamada. Te vas con un plan concreto, aunque no trabajemos juntos.</p>
          <div className="nd-btns">
            <WaLink cta="gpt-cierre" msg={msg} className="nd-btn">
              Pedir mi diagnóstico gratis
            </WaLink>
          </div>
        </div>
      </section>

      <WaLink cta="gpt-flotante" msg={msg} className="nd-float">
        <span className="nd-dot" />
        WhatsApp
      </WaLink>
    </div>
  )
}

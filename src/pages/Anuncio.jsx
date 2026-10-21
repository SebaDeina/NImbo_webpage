import { useState } from 'react'
import { Cloud, NdFaq, NdFloat, WA_LABEL, WaLink, useScrolled } from '../components/nd/Nd'
import { useSeo } from '../hooks/useSeo'
import '../styles/anuncio.css'

/*
  Landings de los anuncios en ChatGPT. Quien llega ya estuvo preguntándole a una IA por
  su negocio: la página retoma esa pregunta y ofrece el diagnóstico gratis.
  Una variante por ángulo del A/B test:
  - /diagnostico-ia (data-cta "gpt-*"): automatización del día a día.
  - /sistemas-conectados (data-cta "gpt-sis-*"): integraciones y software a medida.
  Páginas enfocadas: logo sin menú, todo termina en WhatsApp. No nombran a ChatGPT ni
  imitan su interfaz: son anuncios, no recomendaciones de OpenAI.
*/

const PASOS = [
  ['Escribinos', 'Por WhatsApp, con lo que te quita más tiempo. Coordinamos una videollamada.'],
  ['30 minutos de diagnóstico', 'Vemos cómo trabaja tu negocio, dónde se pierde tiempo y cuánto te cuesta.'],
  ['Propuesta en 48 h', 'Si hay caso, te mandamos qué haríamos y cuánto cuesta, en pesos. Si no lo hay, te lo decimos.'],
]

const FAQ_GRATIS = ['¿El diagnóstico tiene costo?', 'No. Es una videollamada de 30 a 45 minutos sin cargo y sin compromiso de contratar nada.']

const VARIANTES = {
  diagnostico: {
    cta: 'gpt',
    seo: {
      title: 'Diagnóstico gratis: IA y automatización para tu pyme | Nimbo',
      description:
        'Ya sabés que la IA puede ayudarte. En 30 minutos vemos qué tareas de tu negocio se pueden automatizar y cuánto cuesta. Sin cargo, por videollamada.',
      path: '/diagnostico-ia',
    },
    eyebrow: 'Diagnóstico gratis · 30 minutos',
    title: 'Ya sabés que la IA te puede ayudar. Nosotros la ponemos a trabajar en tu negocio.',
    lead:
      'Preguntar es el primer paso. En una videollamada sin cargo vemos qué tareas de tu pyme se pueden automatizar, cuánto tiempo te devuelven y cuánto cuesta hacerlo.',
    ticks: ['Sin cargo y sin compromiso', 'Propuesta en pesos en 48 h', 'Equipo en Argentina'],
    pickTitle: '¿Qué te quita más tiempo?',
    pickLead: 'Marcá lo que aplique y te escribimos con eso en mente.',
    pickMsg: 'Lo que más me quita tiempo',
    opciones: [
      'Responder WhatsApp todo el día',
      'Turnos y recordatorios',
      'Carga de datos a mano',
      'Presupuestos y facturación',
      'Seguimiento de clientes',
      'Reportes que nadie arma',
    ],
    casosTitle: 'Lo que suele salir de un diagnóstico',
    casos: [
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
    ],
    faq: [
      FAQ_GRATIS,
      ['¿Necesito saber de tecnología?', 'No. Vos nos contás cómo trabaja tu negocio; nosotros configuramos todo y capacitamos a tu equipo.'],
      ['¿Funciona con lo que ya uso?', 'En la mayoría de los casos sí: WhatsApp, Gmail, Google Sheets, CRMs y sistemas de gestión. Lo revisamos en la reunión.'],
      ['¿Cuánto tarda en estar andando?', 'Un primer agente o automatización suele quedar funcionando en 2 a 4 semanas.'],
    ],
    finalTitle: 'Contanos qué te frena y lo vemos juntos',
  },

  sistemas: {
    cta: 'gpt-sis',
    seo: {
      title: 'Integración de sistemas y software a medida para pymes | Nimbo',
      description:
        'Conectamos tu sistema de gestión, CRM, planillas y e-commerce para que los datos viajen solos, y desarrollamos apps a medida. Diagnóstico gratis.',
      path: '/sistemas-conectados',
    },
    eyebrow: 'Integraciones y software a medida',
    title: '¿Tus sistemas no se hablan? Los conectamos.',
    lead:
      'Un Excel por acá, un correo por allá y el sistema de gestión por otro lado. Conectamos lo que ya usás para que los datos viajen solos, y si la herramienta que necesitás no existe, la desarrollamos a medida.',
    ticks: ['Diagnóstico gratis de 30 min', 'Presupuesto en pesos, por etapas', 'Equipo en Argentina'],
    pickTitle: '¿Qué querés conectar o resolver?',
    pickLead: 'Marcá lo que aplique y te escribimos con eso en mente.',
    pickMsg: 'Quiero conectar o resolver',
    opciones: [
      'Sistema de gestión o ERP',
      'CRM y ventas',
      'Excel y Google Sheets',
      'Mails y facturación',
      'E-commerce y stock',
      'Una app o sistema a medida',
    ],
    casosTitle: 'Lo que construimos',
    casos: [
      [
        'Integraciones entre sistemas',
        'Gestión, CRM, planillas y tienda online sincronizados. Un dato se carga una vez y aparece donde tiene que estar.',
      ],
      [
        'Apps y sistemas a medida',
        'Cuando ninguna herramienta se adapta a cómo trabajás: paneles internos, portales para clientes o apps para tu equipo.',
      ],
      [
        'Tableros con datos en vivo',
        'Ventas, stock y cobranzas en un solo lugar, actualizados solos, sin armar reportes a mano.',
      ],
      [
        'IA que trabaja con tus datos',
        'Agentes que leen mails y PDFs, cargan pedidos en el sistema y avisan cuando algo no cierra.',
      ],
    ],
    faq: [
      FAQ_GRATIS,
      [
        '¿Con qué sistemas trabajan?',
        'Sistemas de gestión, CRMs, e-commerce, Google Workspace o Microsoft 365. Si tu sistema tiene API o permite exportar datos, casi siempre se puede conectar; lo revisamos en el diagnóstico.',
      ],
      ['¿Tengo que cambiar lo que ya uso?', 'No. La idea es conectar lo que ya funciona. Solo te proponemos reemplazar algo si sale más barato que integrarlo.'],
      [
        '¿Cuánto cuesta y cuánto tarda?',
        'Depende del alcance. Una integración simple suele estar en 2 a 4 semanas; un sistema a medida lo dividimos en etapas, con presupuesto cerrado en pesos y fechas para cada una.',
      ],
    ],
    finalTitle: 'Contanos qué sistemas usás y cómo se conectan hoy',
  },
}

export default function Anuncio({ variante = 'diagnostico' }) {
  const v = VARIANTES[variante]
  useSeo(v.seo)

  const scrolled = useScrolled()
  const [sel, setSel] = useState([])
  const toggle = (p) => setSel((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]))
  const base = '¡Hola! Vi el anuncio de Nimbo y quiero el diagnóstico gratis'
  const msg = sel.length ? `${base}. ${v.pickMsg}: ${sel.join(', ').toLowerCase()}.` : `${base} para mi negocio.`

  return (
    <div className="nd ad">
      <header className={`nd-head${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nd-wrap nd-head-in">
          <span className="nd-logo" aria-label="Nimbo">
            <Cloud />
            <span>nimbo</span>
          </span>
          <WaLink cta={`${v.cta}-top`} msg={msg} className="nd-btn nd-btn-sm">
            WhatsApp
          </WaLink>
        </div>
      </header>

      <section className="ad-hero">
        <div className="nd-wrap ad-hero-in">
          <div className="ad-copy">
            <span className="nd-eyebrow">{v.eyebrow}</span>
            <h1>{v.title}</h1>
            <p>{v.lead}</p>
            <ul className="ad-ticks">
              {v.ticks.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="ad-pick">
            <h2>{v.pickTitle}</h2>
            <p className="nd-muted">{v.pickLead}</p>
            <div className="ad-chips">
              {v.opciones.map((p) => (
                <button key={p} type="button" aria-pressed={sel.includes(p)} onClick={() => toggle(p)}>
                  {p}
                </button>
              ))}
            </div>
            <WaLink cta={sel.length ? `${v.cta}-hero-elegido` : `${v.cta}-hero`} msg={msg} className="nd-btn ad-go">
              Pedir mi diagnóstico por WhatsApp
            </WaLink>
            <span className="ad-note">
              Te responde una persona del equipo · <span className="ad-nowrap">{WA_LABEL}</span>
            </span>
          </div>
        </div>
      </section>

      <section className="nd-sec ad-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">{v.casosTitle}</h2>
          <div className="nd-cols">
            {v.casos.map(([t, d], i) => (
              <div key={t} className="nd-col">
                <h3>{t}</h3>
                <p>{d}</p>
                <WaLink cta={`${v.cta}-caso-${i + 1}`} msg={`¡Hola! Vi el anuncio de Nimbo. Me interesa esto: “${t}”. ¿Lo vemos en el diagnóstico?`} className="nd-more">
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
          <NdFaq items={v.faq} />
        </div>
      </section>

      <section className="nd-final">
        <div className="nd-wrap nd-final-in">
          <h2>{v.finalTitle}</h2>
          <p>30 minutos por videollamada. Te vas con un plan concreto, aunque no trabajemos juntos.</p>
          <div className="nd-btns">
            <WaLink cta={`${v.cta}-cierre`} msg={msg} className="nd-btn">
              Pedir mi diagnóstico gratis
            </WaLink>
          </div>
        </div>
      </section>

      <NdFloat cta={`${v.cta}-flotante`} msg={msg} />
    </div>
  )
}

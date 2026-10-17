import { useCallback, useState } from 'react'
import AutoPopup, { useAutoPopup } from '../components/AutoPopup'
import { AgentDemo, DiagnosisDemo, HeroDemo, IntegrationsDemo, OrchestraDemo, TrainingDemo } from '../components/AutoDemos'
import { Cloud, NdFaq, WA_LABEL, WaLink as BaseWaLink, useScrolled } from '../components/nd/Nd'
import { useSeo } from '../hooks/useSeo'
import '../styles/automatizaciones.css'

/*
  Landing de automatizaciones y agentes de IA para pymes (sub-marca de Nimbo).
  Vive en /automatizaciones y en la raíz de automatizaciones.nimbodata.com.
  Diseño "Nimbodata Landing v2" (Claude Design): blanco, Poppins, bloques limpios.
  Todo termina en WhatsApp: los botones de diagnóstico abren el popup (elige tareas y
  sale a WhatsApp con el mensaje armado; también se abre solo una vez por sesión) y el
  resto de los botones van directo a WhatsApp. El pie es el de Nimbo.
*/

const WA_MSG = '¡Hola! Vi la página de automatizaciones de Nimbo y quiero un diagnóstico gratis para mi negocio.'

const WaLink = ({ msg = WA_MSG, ...rest }) => <BaseWaLink msg={msg} {...rest} />

const DOLORES = [
  ['WhatsApp que no para', 'Las mismas preguntas todo el día. Y las de la noche se pierden con el cliente.'],
  ['Datos copiados a mano', 'Del mail a la planilla, de la planilla a facturación. Horas por semana y errores.'],
  ['Herramientas sueltas', 'Varias apps que no se hablan entre sí, y todo depende de que alguien se acuerde.'],
  ['La IA, para otros', 'Sabés que sirve, pero no por dónde empezar ni en quién confiar.'],
]

const PASOS = [
  ['01 · Semana 1', 'Diagnóstico', '30 minutos para mapear dónde se pierde tiempo.'],
  ['02 · Semana 1', 'Plan y presupuesto', 'Una propuesta clara, en pesos, con prioridades y plazos.'],
  ['03 · Semanas 2–4', 'Implementación', 'Configuramos, conectamos y probamos con casos reales.'],
  ['04 · Siempre', 'Acompañamiento', 'Capacitamos, medimos y ajustamos todos los meses.'],
]

const FAQ = [
  ['¿Necesito saber de tecnología?', 'No. Nosotros configuramos todo y capacitamos a tu equipo. Vos nos contás cómo trabaja tu negocio.'],
  ['¿Qué es OpenClaw?', 'Es la plataforma que usamos para coordinar varios agentes de IA entre sí: uno atiende, otro carga datos, otro organiza tareas. Funciona como un equipo digital.'],
  ['¿El agente puede equivocarse con un cliente?', 'Lo entrenamos con la información real de tu negocio y le ponemos límites claros. Si no sabe algo o el caso es delicado, deriva a una persona.'],
  ['¿Funciona con los sistemas que ya uso?', 'En la mayoría de los casos sí: WhatsApp, Gmail, Google Sheets, CRMs y sistemas de gestión con facturación electrónica. Lo revisamos en el diagnóstico.'],
  ['¿Cuánto cuesta?', 'Depende de qué automatices. En el diagnóstico gratuito te pasamos un presupuesto cerrado en pesos, sin sorpresas.'],
  ['¿Cuánto tarda la implementación?', 'Un primer agente de atención suele estar funcionando en 2 a 4 semanas.'],
]

export default function Automatizaciones() {
  useSeo({
    title: 'Agentes de IA y automatización para pymes | Nimbodata',
    description:
      'Agentes que atienden clientes 24/7, conectan tus sistemas y se ocupan de las tareas repetitivas. Implementados y acompañados por nuestro equipo en Argentina. Diagnóstico gratis.',
    path: '/automatizaciones',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': 'https://www.nimbodata.com/automatizaciones#service',
          name: 'Agentes de IA y automatización de procesos para pymes',
          description:
            'Implementación y acompañamiento de agentes de IA, integraciones y automatización de procesos para pymes de Argentina.',
          url: 'https://www.nimbodata.com/automatizaciones',
          provider: { '@id': 'https://www.nimbodata.com/#business' },
          areaServed: { '@type': 'Country', name: 'Argentina' },
          audience: { '@type': 'BusinessAudience', audienceType: 'Pymes de Argentina' },
          serviceType: 'Automatización de procesos con IA',
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.nimbodata.com/automatizaciones#faq',
          mainEntity: FAQ.map(([name, text]) => ({
            '@type': 'Question',
            name,
            acceptedAnswer: { '@type': 'Answer', text },
          })),
        },
      ],
    },
  })

  const scrolled = useScrolled()

  const [popup, setPopup] = useState(null)
  const openPopup = useCallback((src) => setPopup(src), [])
  const closePopup = useCallback(() => setPopup(null), [])
  useAutoPopup(openPopup)

  // los botones de diagnóstico abren el popup (elige tareas → WhatsApp); el resto va directo a WhatsApp
  const diag = (src, label = 'Pedí tu diagnóstico gratis', className = 'nd-btn') => (
    <button type="button" className={className} onClick={() => openPopup(src)}>
      {label}
    </button>
  )

  return (
    <div className="nd">
      <header className={`nd-head${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nd-wrap nd-head-in">
          <a href="#top" className="nd-logo" aria-label="Nimbodata — inicio">
            <Cloud />
            <span>nimbodata</span>
          </a>
          <nav className="nd-nav">
            <a href="#servicios">Servicios</a>
            <a href="#proceso">Cómo trabajamos</a>
            <a href="#faq">Preguntas</a>
          </nav>
          <div className="nd-head-cta">
            <WaLink cta="auto-top-wa" className="nd-head-wa">
              WhatsApp
            </WaLink>
            {diag('top', 'Diagnóstico gratis', 'nd-btn nd-btn-sm')}
          </div>
        </div>
      </header>

      <section id="top" className="nd-hero">
        <div className="nd-wrap nd-hero-in">
          <div className="nd-hero-copy">
            <span className="nd-eyebrow">Nimbodata para pymes</span>
            <h1>IA que trabaja en tu negocio, todos los días</h1>
            <p>
              Agentes que atienden clientes 24/7, conectan tus sistemas y se ocupan de las tareas repetitivas.
              Implementados y acompañados por nuestro equipo en Argentina.
            </p>
            <div className="nd-btns">
              {diag('hero')}
              <WaLink cta="auto-hero-wa" className="nd-btn nd-btn-soft">
                Escribinos por WhatsApp
              </WaLink>
            </div>
          </div>

          <div className="nd-stage">
            <HeroDemo avatar={<Cloud />} />
          </div>
        </div>
      </section>

      <section className="nd-sectors">
        <div className="nd-wrap nd-sectors-in">
          <span>Para pymes de todo el país</span>
          <b>Comercios y retail</b>
          <b>Servicios profesionales</b>
          <b>Industria y distribución</b>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">El día se va en tareas que no hacen crecer tu negocio</h2>
          <div className="nd-cols">
            {DOLORES.map(([t, d], i) => (
              <div key={t} className="nd-col">
                <h3>{t}</h3>
                <p>{d}</p>
                <WaLink cta={`auto-dolor-${i + 1}`} className="nd-more" msg={`¡Hola! En mi negocio me pasa esto: “${t}”. ¿Se puede resolver?`}>
                  Quiero resolverlo →
                </WaLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <h2 className="nd-h2">Lo que implementamos en tu pyme</h2>
            {diag('servicios', 'Ver qué te conviene →', 'nd-link')}
          </div>

          <div className="nd-grid-2">
            <article className="nd-card">
              <div className="nd-visual nd-v-ink">
                <AgentDemo />
              </div>
              <div className="nd-card-copy">
                <h3>Agente de atención 24/7</h3>
                <p>
                  Responde en WhatsApp, web e Instagram con la información real de tu negocio. Si hace falta una
                  persona, deriva con todo el contexto.
                </p>
                <WaLink cta="auto-svc-agente" className="nd-more" msg="¡Hola! Me interesa un agente de atención 24/7 para mi negocio.">
                  Quiero un agente →
                </WaLink>
              </div>
            </article>

            <article className="nd-card">
              <div className="nd-visual nd-v-lilac">
                <OrchestraDemo />
              </div>
              <div className="nd-card-copy">
                <h3>Orquestación de agentes con OpenClaw</h3>
                <p>
                  Varios agentes coordinados: uno atiende, otro carga pedidos, otro organiza tareas y mails. Un equipo
                  digital que no se toma vacaciones.
                </p>
                <WaLink cta="auto-svc-openclaw" className="nd-more" msg="¡Hola! Me interesa la orquestación de agentes con OpenClaw.">
                  Consultar →
                </WaLink>
              </div>
            </article>
          </div>

          <div className="nd-grid-3">
            <article className="nd-card">
              <div className="nd-visual nd-v-sand sm">
                <IntegrationsDemo />
              </div>
              <div className="nd-card-copy">
                <h3>Integraciones</h3>
                <p>Conectamos tus sistemas para que los datos viajen solos.</p>
                <WaLink cta="auto-svc-integraciones" className="nd-more" msg="¡Hola! Quiero conectar los sistemas de mi negocio para que los datos viajen solos.">
                  Conectar mis sistemas →
                </WaLink>
              </div>
            </article>
            <article className="nd-card">
              <div className="nd-visual nd-v-mist sm">
                <DiagnosisDemo />
              </div>
              <div className="nd-card-copy">
                <h3>Diagnóstico digital</h3>
                <p>Qué automatizar primero, cuánto cuesta y cuánto tiempo te devuelve.</p>
                {diag('svc-diagnostico', 'Pedir mi diagnóstico →', 'nd-more')}
              </div>
            </article>
            <article className="nd-card">
              <div className="nd-visual nd-v-wheat sm">
                <TrainingDemo />
              </div>
              <div className="nd-card-copy">
                <h3>Capacitación al equipo</h3>
                <p>Tu gente aprende a usar la IA sin miedo, en su trabajo real.</p>
                <WaLink cta="auto-svc-capacitacion" className="nd-more" msg="¡Hola! Me interesa una capacitación en IA para mi equipo.">
                  Capacitar a mi equipo →
                </WaLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="proceso" className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">De la primera charla a tu agente andando, en semanas</h2>
          <div className="nd-cols nd-steps">
            {PASOS.map(([k, t, d]) => (
              <div key={t} className="nd-col">
                <span className="nd-mono nd-step-k">{k}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="nd-btns nd-sec-cta">{diag('proceso', 'Empezá por el diagnóstico')}</div>
        </div>
      </section>

      <section id="faq" className="nd-sec">
        <div className="nd-wrap nd-narrow">
          <h2 className="nd-h2 nd-center">Preguntas frecuentes</h2>
          <NdFaq items={FAQ} />
        </div>
      </section>

      <section id="diagnostico" className="nd-final">
        <div className="nd-wrap nd-final-in">
          <h2>Contanos cómo trabaja tu negocio</h2>
          <p>Diagnóstico gratuito de 30 minutos por videollamada. Te vas con un plan concreto, sin compromiso.</p>
          <div className="nd-btns">
            {diag('cierre')}
            <WaLink cta="auto-cierre-wa" className="nd-btn nd-btn-soft">
              WhatsApp {WA_LABEL}
            </WaLink>
          </div>
        </div>
      </section>

      <WaLink cta="auto-flotante" className="nd-float">
        <span className="nd-dot" />
        WhatsApp
      </WaLink>

      {popup && <AutoPopup source={popup} onClose={closePopup} />}
    </div>
  )
}

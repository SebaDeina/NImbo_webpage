import { useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { IconArrowRight, IconStar, IconWhatsApp, IconCalendar } from '../components/Icons'
import { getProspect } from '../data/prospects'
import { whatsappUrl } from '../config/whatsapp'

/* URL para agendar una llamada. Reemplazá con tu Calendly o similar. */
const CALL_URL = whatsappUrl('¡Hola! Quiero agendar una llamada para ver cómo pueden ayudarme 📞')

/* Planes mensuales — PRECIOS DE PLACEHOLDER. Ajustá los montos a tu realidad. */
const PLANS = [
  {
    id: 'inicial',
    name: 'Inicial',
    price: '$35.000',
    period: '/mes',
    tagline: 'Tu web online y lista para recibir clientes.',
    features: [
      'Tu web publicada y mantenida',
      'Chatbot web que responde 24/7',
      'Captura de consultas automática',
      '1 automatización a elección (turnos, recordatorios…)',
    ],
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$65.000',
    period: '/mes',
    tagline: 'El que más eligen. Tu negocio se organiza solo.',
    features: [
      'Todo lo de Inicial',
      'Sistema de turnos / reservas online',
      'Recordatorios automáticos por email',
      'Seguimiento de consultas',
      'Hasta 3 automatizaciones a medida',
    ],
    featured: true,
  },
  {
    id: 'full',
    name: 'Full',
    price: '$110.000',
    period: '/mes',
    tagline: 'Para escalar sin sumar gente.',
    features: [
      'Todo lo de Pro',
      'Automatizaciones ilimitadas a medida',
      'Agente IA entrenado con tu negocio',
      'Integraciones (sistemas, pagos, etc.)',
      'Soporte prioritario',
    ],
    featured: false,
  },
]

const VALUE = [
  {
    title: 'Atendés mientras dormís',
    body: 'Un chatbot en tu web contesta las dudas de siempre en segundos, a cualquier hora. El cliente no se va a la competencia por esperar.',
  },
  {
    title: 'Turnos y reservas sin un solo llamado',
    body: 'El cliente elige día y horario online, y recibe su recordatorio solo. Menos teléfono, menos ausencias, agenda siempre ordenada.',
  },
  {
    title: 'Ninguna consulta se pierde',
    body: 'Cada consulta queda registrada y con seguimiento. Dejás de perder ventas por mensajes que quedaron sin responder.',
  },
  {
    title: 'Menos tareas repetitivas',
    body: 'Recordatorios, presupuestos y reportes salen automáticos. Recuperás horas para lo que de verdad mueve la aguja.',
  },
]

const FAQ = [
  {
    q: '¿La web está incluida?',
    a: 'La web que ves arriba la diseñé para vos como muestra, gratis. Si te gusta, con cualquier plan la publicamos, la conectamos a tu dominio y la mantenemos al día.',
  },
  {
    q: '¿Por qué es mensual?',
    a: 'Las automatizaciones no son un "lo hago una vez y listo": se monitorean, se ajustan y crecen con tu negocio. El plan mensual cubre eso, sin costos sorpresa.',
  },
  {
    q: '¿Tengo que saber de tecnología?',
    a: 'No. Nos ocupamos de todo: armado, conexión y mantenimiento. Vos seguís con tu negocio.',
  },
  {
    q: '¿Hay permanencia?',
    a: 'No te atamos. Si no te sirve, lo cortás cuando quieras.',
  },
]

export default function Propuesta() {
  const { slug } = useParams()
  const p = getProspect(slug)
  const hasDemo = Boolean(p.demoUrl)

  // Mensaje precargado de WhatsApp — identifica al lead por el nombre del negocio.
  const waUrl = whatsappUrl(
    p.name === 'tu negocio'
      ? '¡Hola! Vi la propuesta de mi web y quiero avanzar 🚀'
      : `¡Hola! Soy de ${p.name}. Vi la propuesta de mi web y quiero avanzar 🚀`
  )

  // Todos los CTA principales escriben directo por WhatsApp.
  const PrimaryCTA = ({ children }) => (
    <a className="btn btn-primary" href={waUrl} target="_blank" rel="noopener noreferrer">
      <IconWhatsApp size={20} /> <span>{children}</span>
    </a>
  )

  return (
    <main className="sale">
      {/* ——— Hero ——— */}
      <section className="section sale-hero" data-screen-label="Propuesta">
        <div className="wrap sale-hero-inner">
          <Reveal as="p" className="eyebrow">
            Hecha para {p.name}
          </Reveal>
          <Reveal as="h1" delay={1} className="display sale-hero-title">
            {p.name === 'tu negocio' ? 'Tu negocio' : p.name}, te diseñé tu nueva web
            <span className="star"><IconStar size="0.7em" /></span>
          </Reveal>
          <Reveal as="p" delay={2} className="lead">
            Sí, sin que me lo pidas. Mirá cómo quedaría tu página online. Si te gusta,
            la hacemos realidad — y de paso te automatizamos el negocio: turnos,
            recordatorios y un asistente que atiende solo.
          </Reveal>
          <Reveal delay={2} className="sale-hero-cta">
            <a href="#tu-web" className="btn btn-primary">
              <span>Ver mi web</span> <IconArrowRight size={18} className="arr" />
            </a>
            <a href="#planes" className="btn btn-ghost">Ver los planes</a>
          </Reveal>
        </div>
      </section>

      {/* ——— La web demo ——— */}
      <section className="section sale-demo" id="tu-web">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Acá está tu web</Reveal>
          <Reveal as="h2" delay={1} className="sale-h2">
            Así se vería {p.name} online.
          </Reveal>

          <Reveal delay={1} className="sale-browser-wrap">
            {hasDemo ? (
              <a
                className="sale-browser"
                href={p.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir la web de ${p.name} en vivo`}
              >
                <div className="sale-browser-bar">
                  <span className="sale-dot" />
                  <span className="sale-dot" />
                  <span className="sale-dot" />
                  <span className="sale-url">{prettyUrl(p.demoUrl)}</span>
                </div>
                <div className="sale-browser-screen">
                  {p.image ? (
                    <img src={p.image} alt={`Vista previa de la web de ${p.name}`} loading="lazy" />
                  ) : (
                    <iframe
                      src={p.demoUrl}
                      title={`Web demo de ${p.name}`}
                      loading="lazy"
                      tabIndex={-1}
                      scrolling="no"
                    />
                  )}
                  <span className="sale-browser-overlay">
                    <span className="sale-browser-cue">Tocá para verla en vivo <IconArrowRight size={18} /></span>
                  </span>
                </div>
              </a>
            ) : (
              <div className="sale-browser sale-browser--empty">
                <div className="sale-browser-bar">
                  <span className="sale-dot" />
                  <span className="sale-dot" />
                  <span className="sale-dot" />
                  <span className="sale-url">tunegocio.com</span>
                </div>
                <div className="sale-browser-screen">
                  <span className="sale-empty-note">Acá va tu web 👋</span>
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={2} className="sale-demo-cta">
            <p className="sale-demo-pitch">¿Te gusta? La hacemos realidad por vos.</p>
            <div className="sale-demo-actions">
              <PrimaryCTA>La quiero online</PrimaryCTA>
              {hasDemo && (
                <a className="btn btn-ghost" href={p.demoUrl} target="_blank" rel="noopener noreferrer">
                  Abrir en vivo <IconArrowRight size={16} className="arr" />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Pivot: la web sola no alcanza ——— */}
      <section className="section sale-pivot">
        <div className="wrap">
          <Reveal as="p" className="eyebrow no-dot">El verdadero diferencial</Reveal>
          <Reveal as="h2" delay={1} className="display sale-pivot-title">
            Una web linda trae visitas. Las <em>automatizaciones</em> las convierten en plata.
          </Reveal>
          <Reveal as="p" delay={2} className="lead">
            La mayoría pierde clientes no por falta de web, sino por no responder a
            tiempo, perder turnos por teléfono y vivir tapado de tareas. Eso lo
            resolvemos nosotros, todos los meses, por vos.
          </Reveal>
        </div>
      </section>

      {/* ——— Valor de las automatizaciones ——— */}
      <section className="section sale-value">
        <div className="wrap">
          <div className="sale-value-grid">
            {VALUE.map((v, i) => (
              <Reveal as="article" key={v.title} delay={i % 2} className="sale-value-card">
                <h3 className="sale-value-title">{v.title}</h3>
                <p className="sale-value-body">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Planes ——— */}
      <section className="section sale-pricing" id="planes">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Planes mensuales</Reveal>
          <Reveal as="h2" delay={1} className="display sale-h2">
            Elegí cómo querés empezar.
          </Reveal>
          <Reveal as="p" delay={2} className="lead">
            Sin permanencia. Cancelás cuando quieras. Empezás a ver resultados desde el primer mes.
          </Reveal>

          <div className="sale-plans">
            {PLANS.map((plan, i) => (
              <Reveal
                as="article"
                key={plan.id}
                delay={i % 2}
                className={`sale-plan${plan.featured ? ' sale-plan--featured' : ''}`}
              >
                {plan.featured && <span className="sale-plan-badge">Más elegido</span>}
                <h3 className="sale-plan-name">{plan.name}</h3>
                <p className="sale-plan-price">
                  <strong>{plan.price}</strong>
                  <span className="sale-plan-period">{plan.period}</span>
                </p>
                <p className="sale-plan-tagline">{plan.tagline}</p>
                <ul className="sale-plan-features">
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <PrimaryCTA>Quiero el plan {plan.name}</PrimaryCTA>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" delay={2} className="sale-pricing-note">
            ¿No sabés cuál te conviene? Te lo recomendamos sin compromiso.
          </Reveal>
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <section className="section sale-faq">
        <div className="wrap">
          <Reveal as="h2" className="sale-h2">Preguntas frecuentes</Reveal>
          <div className="sale-faq-list">
            {FAQ.map((item, i) => (
              <Reveal as="article" key={item.q} delay={i % 2} className="sale-faq-item">
                <h3 className="sale-faq-q">{item.q}</h3>
                <p className="sale-faq-a">{item.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CTA final: WhatsApp + formulario por mail ——— */}
      <section className="section sale-final" id="empezar">
        <div className="wrap sale-final-inner">
          <Reveal as="p" className="eyebrow no-dot">Empecemos</Reveal>
          <Reveal as="h2" delay={1} className="display">
            {p.name === 'tu negocio' ? 'Contame qué necesitás' : `Hagámoslo realidad, ${firstName(p.name)}`}
          </Reveal>
          <Reveal as="p" delay={2} className="lead">
            La forma más rápida: escribime por WhatsApp y lo arreglamos en minutos.
          </Reveal>
          <Reveal delay={2} className="sale-final-cta">
            <a className="btn btn-primary btn-wa" href={waUrl} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp size={22} /> <span>Escribime por WhatsApp</span>
            </a>
            <a className="btn btn-ghost" href={CALL_URL} target="_blank" rel="noopener noreferrer">
              <IconCalendar size={18} /> <span>Agendar una llamada</span>
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

function prettyUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function firstName(name) {
  return name.split(' ')[0]
}

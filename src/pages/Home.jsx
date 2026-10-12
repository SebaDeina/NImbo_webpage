import { Link } from 'react-router-dom'
import { AgentDemo, HeroDemo } from '../components/AutoDemos'
import { DataDemo, FlowDemo, VisionDemo, WebDemo } from '../components/HomeDemos'
import { Cloud, NdFaq, NdFinal, WaLink as BaseWaLink } from '../components/nd/Nd'
import { PROJECTS } from '../data/projects'
import { useSeo } from '../hooks/useSeo'
import '../styles/automatizaciones.css'
import '../styles/home.css'

/*
  Home de Nimbo con el diseño blanco de /automatizaciones ("Nimbodata Landing v2"):
  Poppins, bloques limpios y una demo animada por servicio. El encabezado, el
  botón flotante y el pie los pone App (NdHeader, NdFloat, Footer).
  Los data-cta conservan las etiquetas de la home anterior para no cortar la medición.
*/

const WA_MSG = '¡Hola! Vi el sitio de Nimbo y me gustaría conversar sobre un proyecto.'
const WaLink = ({ msg = WA_MSG, ...rest }) => <BaseWaLink msg={msg} {...rest} />
const svcMsg = (t) => `¡Hola! Vi el servicio de ${t} en el sitio de Nimbo y me gustaría conversar sobre un proyecto.`

// los ids cap-I…cap-V son los que usa el pie para saltar a cada servicio
const SERVICIOS = [
  {
    id: 'cap-I',
    cta: 'servicio-web',
    t: 'Desarrollo web',
    d: 'Sitios rápidos y modernos, pensados para convertir visitantes en clientes.',
    usos: ['Tienda online con pedidos a WhatsApp', 'Rápida y visible en Google'],
    v: 'nd-v-ink',
    demo: <WebDemo />,
  },
  {
    id: 'cap-II',
    cta: 'servicio-automatizacion',
    t: 'Automatización',
    d: 'Tus procesos corren solos, 24/7, sin errores humanos.',
    usos: ['Recordatorios de turnos', 'Facturación automática'],
    v: 'nd-v-lilac',
    demo: <FlowDemo />,
    mas: ['/automatizaciones', 'Ver automatizaciones para pymes'],
  },
  {
    id: 'cap-III',
    cta: 'servicio-chatbots',
    t: 'Chatbots y agentes IA',
    d: 'Atendé a tus clientes en el momento justo, por WhatsApp, Instagram, tu web o teléfono.',
    usos: ['Atención 24/7', 'Agente de voz para llamadas'],
    v: 'nd-v-sand',
    demo: <AgentDemo />,
  },
  {
    id: 'cap-IV',
    cta: 'servicio-datos',
    t: 'Datos con IA',
    d: 'Tus números en un solo lugar, con avisos antes de que sea tarde.',
    usos: ['Tableros y alertas', 'Previsión de demanda'],
    v: 'nd-v-mist',
    demo: <DataDemo />,
  },
  {
    id: 'cap-V',
    cta: 'servicio-vision',
    t: 'Visión por computadora',
    tag: 'Nuevo',
    d: 'IA sobre las cámaras que ya tenés para entender qué pasa en tu local.',
    usos: ['Conteo de personas', 'Recorridos', 'Mapas de calor'],
    v: 'nd-v-wheat',
    demo: <VisionDemo />,
  },
]

const DESTACADOS = ['nimbo-display', 'analitica-video', 'marketing-automatico']
const PROYECTOS = DESTACADOS.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(Boolean)

const PASOS = [
  ['01', 'Charla', 'Nos contás cómo trabaja tu negocio y qué te gustaría resolver. Sin compromiso.'],
  ['02', 'Propuesta', 'Un plan claro, en pesos, con prioridades y plazos.'],
  ['03', 'Construcción', 'Diseñamos, desarrollamos y probamos con casos reales.'],
  ['04', 'Acompañamiento', 'Medimos, ajustamos y capacitamos a tu equipo para que lo aproveche.'],
]

const FAQ = [
  ['¿Necesito saber de tecnología?', 'No. Nosotros nos ocupamos de todo y te explicamos lo justo para que lo uses. Vos nos contás cómo trabaja tu negocio.'],
  ['¿Pueden hacer la web y también automatizar?', 'Sí. Web, automatizaciones, agentes de IA, datos y visión los hace el mismo equipo, así que todo queda conectado desde el principio.'],
  ['¿Funciona con los sistemas que ya uso?', 'En la mayoría de los casos sí: WhatsApp, Gmail, Google Sheets, CRMs y sistemas de gestión con facturación electrónica. Lo revisamos en la primera charla.'],
  ['¿Cuánto cuesta?', 'Depende de qué necesites. Después de la primera charla te pasamos un presupuesto cerrado en pesos, sin sorpresas.'],
  ['¿Dónde están?', 'En Buenos Aires, y trabajamos de forma remota con negocios de todo el país.'],
]

export default function Home() {
  useSeo({
    title: 'Nimbo — Transformación Digital para Pymes: Automatización, IA y Web',
    description:
      'Soluciones digitales para pymes en Argentina: automatización de procesos, implementación de IA, páginas web profesionales, análisis de datos y visión por computadora. Más clientes, menos trabajo manual.',
    path: '/',
  })

  return (
    <div className="nd nd-home">
      <section id="top" className="nd-hero">
        <div className="nd-wrap nd-hero-in">
          <div className="nd-hero-copy">
            <span className="nd-eyebrow">Nimbo · Estudio web e IA en Argentina</span>
            <h1>
              Webs que venden. <span className="hm-l">IA que trabaja por vos.</span>
            </h1>
            <p>
              Diseñamos tu web, automatizamos tus procesos y sumamos agentes de IA, datos y visión por computadora. Un
              solo equipo, de la idea a que funcione todos los días.
            </p>
            <div className="nd-btns">
              <WaLink cta="hero" className="nd-btn">
                Escribinos por WhatsApp
              </WaLink>
              <a href="#servicios" className="nd-btn nd-btn-soft">
                Ver servicios
              </a>
            </div>
          </div>

          <div className="nd-stage">
            <HeroDemo avatar={<Cloud />} />
          </div>
        </div>
      </section>

      <section className="nd-sectors">
        <div className="nd-wrap nd-sectors-in">
          <span>Un solo equipo para</span>
          {SERVICIOS.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              <b>{s.t}</b>
            </a>
          ))}
        </div>
      </section>

      <section id="servicios" className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <h2 className="nd-h2">Lo que hacemos por tu negocio</h2>
            <WaLink cta="indice" className="nd-link" msg="¡Hola! Vi los servicios de Nimbo y no sé cuál me conviene. ¿Podemos charlar sobre mi negocio?">
              ¿No sabés cuál te conviene? →
            </WaLink>
          </div>

          <div className="nd-grid-2">
            {SERVICIOS.slice(0, 2).map((s) => (
              <Servicio key={s.id} s={s} />
            ))}
          </div>
          <div className="nd-grid-3">
            {SERVICIOS.slice(2).map((s) => (
              <Servicio key={s.id} s={s} />
            ))}
          </div>
        </div>
      </section>

      <section id="proyectos" className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <h2 className="nd-h2">Proyectos que ya están andando</h2>
            <Link to="/proyectos" className="nd-link">
              Ver todos los proyectos →
            </Link>
          </div>
          <div className="nd-grid-3 hm-projects">
            {PROYECTOS.map((p) => (
              <Link key={p.slug} to={`/proyectos#${p.slug}`} className="nd-card hm-project">
                <div className="nd-visual nd-v-mist sm hm-shot">
                  <img src={p.cover} alt={`Captura de ${p.title}`} loading="lazy" />
                </div>
                <div className="nd-card-copy">
                  <span className="nd-mono hm-type">{p.type}</span>
                  <h3>{p.title}</h3>
                  <p>{p.summary.es}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">Cómo trabajamos</h2>
          <div className="nd-cols nd-steps">
            {PASOS.map(([k, t, d]) => (
              <div key={t} className="nd-col">
                <span className="nd-mono nd-step-k">{k}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="nd-sec">
        <div className="nd-wrap nd-narrow">
          <h2 className="nd-h2 nd-center">Preguntas frecuentes</h2>
          <NdFaq items={FAQ} />
        </div>
      </section>

      <NdFinal />
    </div>
  )
}

function Servicio({ s }) {
  return (
    <article id={s.id} className="nd-card">
      <div className={`nd-visual ${s.v}`}>{s.demo}</div>
      <div className="nd-card-copy">
        <h3>
          {s.t}
          {s.tag && <span className="hm-tag">{s.tag}</span>}
        </h3>
        <p>{s.d}</p>
        <ul className="hm-usos">
          {s.usos.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
        <div className="hm-more">
          <WaLink cta={s.cta} className="nd-more" msg={svcMsg(s.t)}>
            Consultanos →
          </WaLink>
          {s.mas && (
            <Link to={s.mas[0]} className="nd-more hm-alt">
              {s.mas[1]} →
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

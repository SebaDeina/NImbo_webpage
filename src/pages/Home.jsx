import { Link } from 'react-router-dom'
import { AgentDemo, HeroDemo } from '../components/AutoDemos'
import { DataDemo, DisplayDemo, VisionDemo, WebDemo } from '../components/HomeDemos'
import Ofertas from '../components/nd/Ofertas'
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

// los ids cap-I…cap-V son los que usa el pie para saltar a cada servicio (no siguen el orden de la lista:
// automatización y agentes van primero porque la home le habla a la pyme, la web es un servicio más).
// "Datos" quedó dentro de Automatización y datos: su id viejo (cap-IV) sigue como ancla en esa tarjeta.
const SERVICIOS = [
  {
    id: 'cap-II',
    alias: 'cap-IV',
    cta: 'servicio-automatizacion',
    t: 'Automatización y datos',
    d: 'Dashboards, integración de APIs, reportes automáticos y procesos que corren solos. Ideal para empresas que dependen de Excel y tareas manuales.',
    usos: ['Dashboards', 'Integración de APIs', 'Reportes automáticos', 'Procesos'],
    v: 'nd-v-lilac',
    demo: <DataDemo />,
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
    id: 'cap-I',
    cta: 'servicio-web',
    t: 'Desarrollo web y aplicaciones',
    d: 'El software que tu negocio necesita, hecho a medida y conectado a tus procesos.',
    usos: ['Webs corporativas', 'Sistemas internos', 'Formularios inteligentes', 'Apps a medida'],
    v: 'nd-v-ink',
    demo: <WebDemo />,
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

const DISPLAY_MSG = '¡Hola! Vi Nimbo Display en el sitio y me gustaría ver una demo.'

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
  ['¿Pueden automatizar y también hacer el sistema o la web?', 'Sí. Automatizaciones, agentes de IA, datos, desarrollo a medida y visión los hace el mismo equipo, así que todo queda conectado desde el principio.'],
  ['¿Funciona con los sistemas que ya uso?', 'En la mayoría de los casos sí: WhatsApp, Gmail, Google Sheets, CRMs y sistemas de gestión con facturación electrónica. Lo revisamos en la primera charla.'],
  ['¿Cuánto cuesta?', 'Automatización y datos arranca en $200.000 por mes, desarrollo web y apps en $400.000 por proyecto y Nimbo Display en $70.000 por dispositivo más un abono mensual. Después de la primera charla te pasamos un presupuesto cerrado en pesos, sin sorpresas.'],
  ['¿Dónde están?', 'En Buenos Aires, y trabajamos de forma remota con negocios de todo el país.'],
]

export default function Home() {
  useSeo({
    title: 'Nimbo — Automatización e IA para Pymes en Argentina',
    description:
      'Automatizamos procesos, sumamos agentes de IA y ordenamos los datos de pymes argentinas. También desarrollo a medida, visión por computadora y cartelería digital con Nimbo Display. Más clientes, menos trabajo manual.',
    path: '/',
  })

  return (
    <div className="nd nd-home">
      <section id="top" className="nd-hero">
        <div className="nd-wrap nd-hero-in">
          <div className="nd-hero-copy">
            <span className="nd-eyebrow">Nimbo · Tecnología para pymes argentinas</span>
            <h1>
              La tecnología de las grandes empresas, <span className="hm-l">a la medida de tu pyme.</span>
            </h1>
            <p>
              Automatizamos tus procesos, sumamos agentes de IA que atienden a tus clientes y ponemos tus números en un
              solo lugar. Un solo equipo, de la idea a que funcione todos los días.
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
          <Link to="/display">
            <b>Nimbo Display</b>
          </Link>
        </div>
      </section>

      <section id="servicios" className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div className="hm-line">
              <span className="nd-eyebrow">Nimbo Solutions</span>
              <h2 className="nd-h2">Lo que hacemos por tu negocio</h2>
              <p>Consultoría, desarrollo a medida, IA y automatizaciones.</p>
            </div>
            <WaLink cta="indice" className="nd-link" msg="¡Hola! Vi los servicios de Nimbo y no sé cuál me conviene. ¿Podemos charlar sobre mi negocio?">
              ¿No sabés cuál te conviene? →
            </WaLink>
          </div>

          <div className="nd-grid-2">
            {SERVICIOS.map((s) => (
              <Servicio key={s.id} s={s} />
            ))}
          </div>
        </div>
      </section>

      <section id="productos" className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div className="hm-line">
              <span className="nd-eyebrow">Nimbo Products</span>
              <h2 className="nd-h2">Software propio, listo para usar</h2>
              <p>Productos que desarrollamos y mantenemos nosotros, con un abono mensual.</p>
            </div>
          </div>

          <article className="hm-product">
            <Link to="/display" className="nd-visual nd-v-mist hm-product-vis" aria-label="Conocé Nimbo Display">
              <DisplayDemo />
            </Link>
            <div className="hm-product-copy">
              <span className="nd-mono hm-type">Cartelería digital · SaaS</span>
              <h3>Nimbo Display</h3>
              <p>
                Las pantallas de tu local conectadas a tus promociones, precios, stock y horarios. Cambiás lo que se ve en
                todas las sucursales desde un solo panel, y sigue andando aunque se corte internet.
              </p>
              <ul className="hm-usos">
                <li>Promos programadas</li>
                <li>Precios desde tu planilla</li>
                <li>Varias sucursales</li>
              </ul>
              <div className="hm-more">
                <Link to="/display" className="nd-btn">
                  Conocé Nimbo Display
                </Link>
                <WaLink cta="display" className="nd-more" msg={DISPLAY_MSG}>
                  Pedí una demo →
                </WaLink>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Ofertas />

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
      {s.alias && <span id={s.alias} className="hm-alias" aria-hidden="true" />}
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

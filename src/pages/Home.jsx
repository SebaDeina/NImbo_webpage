import { Link } from 'react-router-dom'
import { AgentDemo, HeroDemo } from '../components/AutoDemos'
import { DataDemo, DisplayDemo, FlowDemo, WebDemo } from '../components/HomeDemos'
import { useDiagnostico } from '../components/nd/DiagnosticoForm'
import Ofertas from '../components/nd/Ofertas'
import { Cloud, NdFaq, NdFinal, WaLink as BaseWaLink } from '../components/nd/Nd'
import { PROJECTS } from '../data/projects'
import { useSeo } from '../hooks/useSeo'
import '../styles/automatizaciones.css'
import '../styles/home.css'

/*
  Home de Nimbo Consulting con el diseño blanco de /automatizaciones ("Nimbodata Landing v2"):
  Poppins, bloques limpios y una demo animada por área. El encabezado, el
  botón flotante y el pie los pone App (NdHeader, NdFloat, Footer).
  Los data-cta conservan las etiquetas de la home anterior para no cortar la medición.
*/

const WA_MSG = '¡Hola! Vi el sitio de Nimbo y me gustaría agendar una reunión de diagnóstico para mi empresa.'
const WaLink = ({ msg = WA_MSG, ...rest }) => <BaseWaLink msg={msg} {...rest} />
const svcMsg = (t) => `¡Hola! Vi el área de ${t} en el sitio de Nimbo y me gustaría conversar sobre mi empresa.`

// Las cuatro áreas de la consultora (oct. 2026). IA y automatización van primero: son las que se promocionan
// en los primeros 90 días; datos y software a medida son venta complementaria.
// Los ids cap-I…cap-V son los que usa el pie para saltar a cada área; visión por computadora quedó dentro
// de IA y su id viejo (cap-V) sigue como ancla en esa tarjeta.
const SERVICIOS = [
  {
    id: 'cap-III',
    alias: 'cap-V',
    n: '01',
    cta: 'servicio-chatbots',
    t: 'Inteligencia artificial y agentes',
    d: 'Agentes que atienden, venden y reservan por WhatsApp e Instagram, asistentes internos para tu equipo y visión sobre las cámaras que ya tenés.',
    usos: ['Bots de WhatsApp e Instagram', 'Reservas y turnos', 'Asistentes internos', 'Visión por computadora'],
    v: 'nd-v-sand',
    demo: <AgentDemo />,
    mas: ['/automatizaciones', 'Ver agentes de IA para pymes'],
  },
  {
    id: 'cap-II',
    n: '02',
    cta: 'servicio-automatizacion',
    t: 'Automatización e integración',
    d: 'Conectamos tus sistemas y sacamos de encima las tareas repetitivas: lo que hoy se copia a mano entre planillas pasa solo.',
    usos: ['APIs', 'ERP y CRM', 'Google Workspace', 'Procesos administrativos'],
    v: 'nd-v-lilac',
    demo: <FlowDemo />,
    mas: ['/automatizaciones', 'Ver automatizaciones para pymes'],
  },
  {
    id: 'cap-IV',
    n: '03',
    cta: 'servicio-datos',
    t: 'Datos y business intelligence',
    d: 'Tus números en un solo lugar: tableros de gestión, fuentes integradas y alertas cuando algo se sale de lo normal.',
    usos: ['Dashboards', 'Indicadores de gestión', 'SQL', 'Alertas inteligentes'],
    v: 'nd-v-wheat',
    demo: <DataDemo />,
  },
  {
    id: 'cap-I',
    n: '04',
    cta: 'servicio-web',
    t: 'Desarrollo web y software a medida',
    d: 'Diseñamos páginas web, aplicaciones internas, portales y sistemas de gestión para pymes cuando lo que necesitás no existe hecho. Se cotiza por proyecto.',
    usos: ['Sistemas de gestión', 'Portales', 'Apps internas', 'Webs con lógica de negocio'],
    v: 'nd-v-ink',
    demo: <WebDemo />,
  },
]

const RESULTADOS = [
  ['Menos tiempo perdido', 'Las tareas repetitivas pasan a correr solas y tu equipo se dedica a lo que suma.'],
  ['Mejor atención comercial', 'Cada consulta recibe respuesta en el momento, también fuera de horario.'],
  ['Menos errores', 'Menos datos copiados a mano entre planillas y sistemas.'],
  ['Más información para decidir', 'Ves cómo viene el negocio sin esperar al cierre del mes.'],
]

const CLIENTES = [
  ['Clínicas y centros de servicios', 'Reservas, confirmación de turnos, consultas frecuentes, derivaciones y reportes, cuidando los datos sensibles.'],
  ['Comercios y distribuidores', 'Atención comercial, consultas de stock, pedidos, integración de ventas e indicadores.'],
  ['Empresas con mucha administración', 'Consolidación de información, integraciones, conciliaciones, tableros y controles automáticos.'],
]

const DISPLAY_MSG = '¡Hola! Vi Nimbo Display en el sitio y me gustaría ver una demo.'

const DESTACADOS = ['nimbo-display', 'analitica-video', 'marketing-automatico']
const PROYECTOS = DESTACADOS.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(Boolean)

const PASOS = [
  ['01', 'Diagnóstico', 'Una primera reunión sin cargo para entender tu proceso, cuánto te cuesta el problema y si tiene solución.'],
  ['02', 'Propuesta', 'Alcance, entregables, exclusiones, plazos y costos por escrito, en pesos.'],
  ['03', 'Implementación', 'Construimos, probamos con casos reales y lo ponemos en producción con tu aprobación.'],
  ['04', 'Acompañamiento', 'Monitoreo, soporte y una reunión periódica para revisar resultados y ajustar.'],
]

const FAQ = [
  ['¿El diagnóstico tiene costo?', 'La primera reunión es sin cargo. Si el problema necesita un relevamiento técnico detallado y un documento de solución, ese diagnóstico arranca en $150.000 y se bonifica si después contratás la implementación.'],
  ['¿Cuánto cuesta?', 'Un agente de IA arranca en $350.000 de implementación más $120.000 por mes; Nimbo Managed AI, en $650.000 más $200.000 por mes. Las automatizaciones arrancan en $400.000 y los dashboards en $500.000. El software a medida se cotiza por proyecto. Después del diagnóstico te pasamos un presupuesto cerrado en pesos.'],
  ['¿Qué incluye el abono mensual?', 'La operación del servicio, monitoreo, resolución de incidencias en horario de soporte y ajustes menores. Nuevas integraciones, rediseños completos y costos de terceros (consumo de modelos de IA, cargos de Meta, licencias) se presupuestan aparte.'],
  ['¿Cómo se paga la implementación?', 'En general, 50 % al iniciar y 50 % contra la aceptación, con hitos definidos en la propuesta.'],
  ['¿Funciona con los sistemas que ya uso?', 'En la mayoría de los casos sí: WhatsApp, Gmail, Google Sheets, CRMs y sistemas de gestión con facturación electrónica. Lo revisamos en el diagnóstico.'],
  ['¿Dónde están?', 'En Buenos Aires, y trabajamos de forma remota con empresas de todo el país.'],
]

export default function Home() {
  const openDiagnostico = useDiagnostico()
  useSeo({
    title: 'Nimbo Consulting — IA y automatización para pymes en Argentina',
    description:
      'Consultoría tecnológica, inteligencia artificial y automatización para pymes argentinas. Diagnosticamos tus procesos, implementamos agentes de IA, integraciones y tableros, y los acompañamos todos los meses.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://www.nimbodata.com/#faq',
      mainEntity: FAQ.map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    },
  })

  return (
    <div className="nd nd-home">
      <section id="top" className="nd-hero">
        <div className="nd-wrap nd-hero-in">
          <div className="nd-hero-copy">
            <span className="nd-eyebrow">Nimbo Consulting · Tecnología, IA y automatización</span>
            <h1>
              Automatizamos los procesos que <span className="hm-l">frenan el crecimiento de tu empresa.</span>
            </h1>
            <p>
              Diseñamos e implementamos agentes de inteligencia artificial, integraciones y soluciones digitales para que
              tu equipo dedique menos tiempo a tareas repetitivas y más tiempo a hacer crecer el negocio.
            </p>
            <div className="nd-btns">
              <button type="button" className="nd-btn" onClick={() => openDiagnostico('hero')}>
                Agendá un diagnóstico gratis
              </button>
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

      <section id="enfoque" className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div className="hm-line">
              <span className="nd-eyebrow">Cómo pensamos</span>
              <h2 className="nd-h2">Un socio tecnológico, no un proveedor de bots</h2>
              <p>
                Primero entendemos cómo trabaja tu empresa y dónde pierde tiempo o plata. Después elegimos la tecnología,
                la implementamos y nos hacemos cargo de que siga funcionando.
              </p>
            </div>
          </div>
          <div className="nd-cols">
            {RESULTADOS.map(([t, d]) => (
              <div key={t} className="nd-col">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div className="hm-line">
              <span className="nd-eyebrow">Servicios</span>
              <h2 className="nd-h2">Cuatro áreas, un solo equipo</h2>
              <p>Consultoría, IA aplicada e ingeniería de software para resolver problemas de negocio.</p>
            </div>
            <button type="button" className="nd-link dg-link" onClick={() => openDiagnostico('indice')}>
              ¿No sabés por dónde empezar? →
            </button>
          </div>

          <div className="nd-grid-2">
            {SERVICIOS.map((s) => (
              <Servicio key={s.id} s={s} />
            ))}
          </div>
        </div>
      </section>

      <section id="clientes" className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div className="hm-line">
              <span className="nd-eyebrow">Para quién trabajamos</span>
              <h2 className="nd-h2">Pymes de 10 a 100 personas</h2>
              <p>Empresas con procesos digitales desordenados, consultas que se repiten todo el día y ganas de invertir en eficiencia.</p>
            </div>
          </div>
          <div className="nd-cols">
            {CLIENTES.map(([t, d]) => (
              <div key={t} className="nd-col">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div className="hm-line">
              <h2 className="nd-h2">Cómo trabajamos</h2>
              <p>Diagnóstico, implementación y abono mensual: cada solución queda funcionando y con alguien a cargo.</p>
            </div>
          </div>
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

      <Ofertas />

      <section id="productos" className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div className="hm-line">
              <span className="nd-eyebrow">Producto propio</span>
              <h2 className="nd-h2">Software listo para usar</h2>
              <p>Además de los proyectos a medida, desarrollamos y mantenemos un producto con abono mensual.</p>
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
        <span className="nd-mono hm-type">Área {s.n}</span>
        <h3>{s.t}</h3>
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

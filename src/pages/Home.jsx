import { Link } from 'react-router-dom'
import { AgentDemo, HeroDemo } from '../components/AutoDemos'
import { DataDemo, FlowDemo, WebDemo } from '../components/HomeDemos'
import { useDiagnostico } from '../components/nd/DiagnosticoForm'
import { Cloud, NdFaq, NdFinalBtns } from '../components/nd/Nd'
import Ofertas from '../components/nd/Ofertas'
import { PROJECTS } from '../data/projects'
import { useSeo } from '../hooks/useSeo'
import '../styles/automatizaciones.css'
import '../styles/home.css'

/*
  Home de Nimbo Consulting con el diseño blanco de /automatizaciones ("Nimbodata Landing v2"):
  Poppins, bloques limpios y una demo animada por área. El encabezado, el
  botón flotante y el pie los pone App (NdHeader, NdFloat, Footer).
*/

// Las cuatro áreas de la consultora (oct. 2026). IA y automatización van primero: son las que se promocionan
// en los primeros 90 días; datos y software a medida son venta complementaria.
// Los ids cap-I…cap-V son los que usa el pie para saltar a cada área; visión por computadora quedó dentro
// de IA y su id viejo (cap-V) sigue como ancla en esa tarjeta.
const WA_MSG = '¡Hola! Vi el sitio de Nimbo y me gustaría agendar una reunión de diagnóstico para mi empresa.'

const SERVICIOS = [
  {
    id: 'cap-III',
    alias: 'cap-V',
    n: '01',
    cta: 'servicio-chatbots',
    t: 'Inteligencia artificial y agentes',
    d: 'Agentes que atienden, venden y resuelven consultas en los canales que tu empresa ya usa.',
    usos: ['WhatsApp e Instagram', 'Reservas y turnos', 'Asistentes internos'],
    tareas: ['Responder WhatsApp e Instagram', 'Turnos y reservas'],
    v: 'nd-v-sand',
    demo: <AgentDemo />,
    mas: ['/agentes-de-ia', 'Ver agentes de IA para pymes'],
  },
  {
    id: 'cap-II',
    n: '02',
    cta: 'servicio-automatizacion',
    t: 'Automatización e integración',
    d: 'Conectamos tus sistemas para que los datos circulen y las tareas repetitivas sucedan solas.',
    usos: ['ERP y CRM', 'Google Workspace', 'Procesos administrativos'],
    tareas: ['Carga de datos y planillas'],
    v: 'nd-v-lilac',
    demo: <FlowDemo />,
    mas: ['/automatizacion-de-procesos', 'Ver automatizaciones para pymes'],
  },
  {
    id: 'cap-IV',
    n: '03',
    cta: 'servicio-datos',
    t: 'Datos y business intelligence',
    d: 'Unificamos tus números en tableros claros, con indicadores y alertas para decidir a tiempo.',
    usos: ['Dashboards', 'Indicadores', 'Alertas inteligentes'],
    tareas: ['Reportes y números del negocio'],
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
    mas: ['/desarrollo-web-pymes', 'Ver desarrollo web para pymes'],
  },
]

const RESULTADOS = [
  ['Menos trabajo manual', 'Las tareas repetitivas dejan de consumir horas del equipo.'],
  ['Mejor atención', 'Cada consulta recibe una respuesta rápida y consistente.'],
  ['Sistemas conectados', 'La información circula sin copias ni datos duplicados.'],
  ['Decisiones a tiempo', 'Los indicadores están disponibles cuando hacen falta.'],
]

const CASOS = [
  {
    slug: 'asistente-ia',
    label: 'IA + datos',
    resumen: 'Preguntas de negocio respondidas con datos reales, sin SQL ni dependencia del equipo técnico.',
  },
  {
    slug: 'dashboard-a-medida',
    label: 'Business intelligence',
    resumen: 'Indicadores, comparativas y alertas reunidos en un tablero conectado a la operación.',
  },
  {
    slug: 'gestion-agro',
    label: 'Software a medida',
    resumen: 'Producción, sanidad, clima, tareas y stock centralizados en una aplicación de uso diario.',
  },
].map((story) => ({ ...story, project: PROJECTS.find((p) => p.slug === story.slug) })).filter((story) => story.project)

const PASOS = [
  ['01', 'Diagnóstico', 'Entendemos el proceso y la oportunidad de mejora.'],
  ['02', 'Propuesta', 'Definimos alcance, tiempos, costos y resultados esperados.'],
  ['03', 'Implementación', 'Construimos y probamos la solución con casos reales.'],
  ['04', 'Evolución', 'Medimos, mantenemos y ajustamos lo implementado.'],
]

const FAQ = [
  ['¿El diagnóstico tiene costo?', 'La primera reunión es sin cargo. Si hace falta un relevamiento técnico detallado, lo cotizamos antes de avanzar.'],
  ['¿Cuánto cuesta?', 'Depende del alcance. Después del diagnóstico entregamos una propuesta cerrada, en pesos y a precio fijo, con tiempos y resultados esperados.'],
  ['¿Qué incluye el abono mensual?', 'La operación del servicio, monitoreo, soporte y ajustes continuos. Nuevas integraciones, rediseños completos y costos de terceros (consumo de modelos de IA, cargos de Meta, licencias) se proponen aparte.'],
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
            <span className="nd-eyebrow">Consultoría tecnológica · Estrategia, implementación y evolución</span>
            <h1>
              Automatizamos los procesos que <span className="hm-l">frenan el crecimiento de tu empresa.</span>
            </h1>
            <p>
              Analizamos tus procesos y diseñamos soluciones para reducir trabajo manual, mejorar la atención y conectar
              los sistemas que tu operación ya usa.
            </p>
            <div className="nd-btns">
              <button type="button" className="nd-btn" onClick={() => openDiagnostico('hero')}>
                Solicitar un diagnóstico
              </button>
              <a href="#casos" className="nd-btn nd-btn-soft">
                Ver casos reales
              </a>
            </div>
            <p className="hm-hero-note">Diagnóstico gratuito de 20 minutos · Sin compromiso</p>
          </div>

          <div className="nd-stage">
            <HeroDemo avatar={<Cloud />} />
          </div>
        </div>
      </section>

      <section className="nd-sectors">
        <div className="nd-wrap nd-sectors-in">
          <span>Resultados que buscamos</span>
          <a href="#resultados"><b>Menos tareas repetitivas</b></a>
          <a href="#resultados"><b>Mejor atención</b></a>
          <a href="#resultados"><b>Sistemas conectados</b></a>
          <a href="#resultados"><b>Decisiones con datos</b></a>
        </div>
      </section>

      <section id="resultados" className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div className="hm-line">
              <span className="nd-eyebrow">Resultados</span>
              <h2 className="nd-h2">Menos fricción. Más capacidad para crecer.</h2>
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
              <span className="nd-eyebrow">Soluciones</span>
              <h2 className="nd-h2">De la estrategia a la implementación</h2>
              <p>Combinamos consultoría, IA e ingeniería de software según lo que el proceso necesite.</p>
            </div>
            <button type="button" className="nd-link dg-link" onClick={() => openDiagnostico('indice')}>
              ¿No sabés por dónde empezar? →
            </button>
          </div>

          <div className="nd-grid-2">
            {SERVICIOS.map((s) => (
              <Servicio key={s.id} s={s} onDiagnostico={openDiagnostico} />
            ))}
          </div>
        </div>
      </section>

      <section id="casos" className="nd-sec hm-cases">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div className="hm-line">
              <span className="nd-eyebrow">Experiencia aplicada</span>
              <h2 className="nd-h2">Soluciones que ya están funcionando.</h2>
            </div>
            <Link to="/proyectos" className="nd-link">Ver todos los proyectos →</Link>
          </div>
          <div className="nd-grid-3 hm-case-grid">
            {CASOS.map((story, index) => (
              <article key={story.slug} className="hm-case-card">
                <Link to={`/proyectos#${story.slug}`} className="hm-case-media" aria-label={`Ver caso ${story.project.title}`}>
                  <img src={story.project.cover} alt={`Captura de ${story.project.title}`} loading="lazy" />
                </Link>
                <div className="hm-case-copy">
                  <span className="nd-mono hm-type">{story.label} · Caso 0{index + 1}</span>
                  <h3>{story.project.title}</h3>
                  <p>{story.resumen}</p>
                  <Link to={`/proyectos#${story.slug}`} className="nd-more">Ver el proyecto →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div className="hm-line">
              <span className="nd-eyebrow">Método de trabajo</span>
              <h2 className="nd-h2">Primero entendemos. Después construimos.</h2>
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

      <section id="faq" className="nd-sec">
        <div className="nd-wrap nd-narrow">
          <h2 className="nd-h2 nd-center">Preguntas frecuentes</h2>
          <NdFaq items={FAQ} />
        </div>
      </section>

      <section className="nd-final hm-final">
        <div className="nd-wrap nd-final-in">
          <span className="nd-eyebrow">¿Qué proceso está frenando hoy a tu equipo?</span>
          <h2>Empecemos por entender el problema.</h2>
          <p>Revisamos tu proceso y detectamos oportunidades concretas de mejora.</p>
          <NdFinalBtns cta="cierre" msg={WA_MSG} onForm={() => openDiagnostico('cierre')} />
          <p className="hm-final-note">Sin cargo · 20 minutos por videollamada · Te respondemos en menos de 24 h</p>
        </div>
      </section>
    </div>
  )
}

// toda la tarjeta abre el diagnóstico con las tareas del área ya marcadas; los enlaces de adentro siguen haciendo lo suyo
function Servicio({ s, onDiagnostico }) {
  const abrir = () => onDiagnostico(s.cta, s.tareas)
  return (
    <article id={s.id} className="nd-card hm-svc" onClick={(e) => !e.target.closest('a, button') && abrir()}>
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
          <button type="button" className="nd-more hm-text-button" onClick={abrir}>
            Evaluar este proceso →
          </button>
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

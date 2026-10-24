import { Link } from 'react-router-dom'
import { NdFaq, NdFinal, NdPageHero } from '../components/nd/Nd'
import { useSeo } from '../hooks/useSeo'

const SOLUCIONES = [
  {
    title: 'Páginas web para pymes',
    description:
      'Sitios claros, rápidos y preparados para funcionar bien desde el celular, explicar qué ofrece tu empresa y facilitar el contacto.',
  },
  {
    title: 'Portales y aplicaciones internas',
    description:
      'Herramientas para centralizar información, tareas y operaciones que hoy dependen de mensajes, planillas o pasos manuales.',
  },
  {
    title: 'Sistemas de gestión a medida',
    description:
      'Software diseñado alrededor del proceso real de tu empresa cuando una solución estándar no alcanza o no se integra con lo que ya usás.',
  },
]

const PROCESS = [
  ['01', 'Diagnóstico', 'Entendemos el objetivo, los usuarios y el proceso que la solución tiene que mejorar.'],
  ['02', 'Propuesta', 'Definimos alcance, prioridades, tiempos, costos y resultados esperados antes de construir.'],
  ['03', 'Diseño y desarrollo', 'Diseñamos la experiencia, desarrollamos la solución y la probamos con casos reales.'],
  ['04', 'Evolución', 'Acompañamos lo implementado para mantenerlo, medirlo y ajustarlo cuando cambie la empresa.'],
]

const FAQ = [
  [
    '¿Qué desarrolla Nimbo?',
    'Desarrollamos páginas web, aplicaciones internas, portales y sistemas de gestión para pymes. La solución se define según el objetivo y el proceso que necesite mejorar la empresa.',
  ],
  [
    '¿Necesito una página web o un sistema a medida?',
    'Una página web sirve para presentar la empresa, explicar servicios y generar consultas. Un sistema a medida conviene cuando también necesitás organizar tareas, datos, usuarios o procesos internos.',
  ],
  [
    '¿Trabajan solo en Buenos Aires?',
    'Nimbo tiene base en Buenos Aires y trabaja de forma remota con pymes de todo el país.',
  ],
  [
    '¿Pueden conectar la web con herramientas que ya usamos?',
    'Sí, cuando las herramientas ofrecen una forma segura de integración. En el diagnóstico revisamos los sistemas existentes y qué información necesita circular entre ellos.',
  ],
  [
    '¿Cómo empieza un proyecto?',
    'Empieza con un diagnóstico para entender el problema, los usuarios y el resultado esperado. Después definimos una propuesta con el alcance antes de avanzar.',
  ],
]

export default function ServicioDesarrolloWeb() {
  useSeo({
    title: 'Desarrollo web para pymes en Buenos Aires | Nimbo',
    description:
      'Diseño y desarrollo de páginas web, aplicaciones internas, portales y sistemas de gestión para pymes. Nimbo trabaja desde Buenos Aires con empresas de toda Argentina.',
    path: '/desarrollo-web-pymes',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://www.nimbodata.com/desarrollo-web-pymes#page',
          name: 'Desarrollo web para pymes en Buenos Aires',
          description:
            'Servicio de diseño y desarrollo de páginas web, aplicaciones internas, portales y sistemas de gestión para pymes de Argentina.',
          url: 'https://www.nimbodata.com/desarrollo-web-pymes',
          inLanguage: 'es-AR',
          isPartOf: { '@id': 'https://www.nimbodata.com/#website' },
          about: { '@id': 'https://www.nimbodata.com/#business' },
          mainEntity: { '@id': 'https://www.nimbodata.com/desarrollo-web-pymes#service' },
          breadcrumb: { '@id': 'https://www.nimbodata.com/desarrollo-web-pymes#breadcrumb' },
        },
        {
          '@type': 'Service',
          '@id': 'https://www.nimbodata.com/desarrollo-web-pymes#service',
          name: 'Desarrollo web y software a medida para pymes',
          serviceType: 'Desarrollo web y software a medida',
          description:
            'Diseño y desarrollo de páginas web, aplicaciones internas, portales y sistemas de gestión alrededor de la operación de cada pyme.',
          url: 'https://www.nimbodata.com/desarrollo-web-pymes',
          provider: { '@id': 'https://www.nimbodata.com/#business' },
          areaServed: { '@type': 'Country', name: 'Argentina' },
          audience: { '@type': 'BusinessAudience', audienceType: 'Pymes de Argentina' },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.nimbodata.com/desarrollo-web-pymes#faq',
          mainEntity: FAQ.map(([name, text]) => ({
            '@type': 'Question',
            name,
            acceptedAnswer: { '@type': 'Answer', text },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.nimbodata.com/desarrollo-web-pymes#breadcrumb',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: 'https://www.nimbodata.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Desarrollo web para pymes',
              item: 'https://www.nimbodata.com/desarrollo-web-pymes',
            },
          ],
        },
      ],
    },
  })

  return (
    <main className='nd-page-main'>
      <NdPageHero eyebrow='Desarrollo web y software a medida' title='Desarrollo web para pymes en Buenos Aires'>
        <p>
          Diseñamos páginas web, aplicaciones internas, portales y sistemas de gestión para pymes. Trabajamos desde
          Buenos Aires de forma remota con empresas de toda Argentina.
        </p>
        <div className='nd-btns'>
          <Link to='/contacto' className='nd-btn'>
            Contanos tu proyecto
          </Link>
          <Link to='/proyectos' className='nd-btn nd-btn-soft'>
            Ver proyectos
          </Link>
        </div>
      </NdPageHero>

      <section className='nd-sec'>
        <div className='nd-wrap'>
          <div className='nd-sec-top'>
            <div>
              <span className='nd-eyebrow'>Qué desarrollamos</span>
              <h2 className='nd-h2'>Una solución digital alrededor de tu negocio</h2>
              <p>
                No empezamos por una plantilla ni por una tecnología. Primero definimos qué tiene que resolver la web o
                el sistema y quién lo va a usar.
              </p>
            </div>
          </div>
          <div className='nd-cols'>
            {SOLUCIONES.map((solution) => (
              <article className='nd-col' key={solution.title}>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='nd-sec'>
        <div className='nd-wrap'>
          <h2 className='nd-h2'>Qué priorizamos en cada proyecto</h2>
          <div className='nd-cols'>
            <div className='nd-col'>
              <h3>Claridad</h3>
              <p>La propuesta, los servicios y el próximo paso tienen que entenderse sin depender de explicaciones extra.</p>
            </div>
            <div className='nd-col'>
              <h3>Uso desde celulares</h3>
              <p>Diseñamos la experiencia para que clientes y equipos puedan usarla desde los dispositivos cotidianos.</p>
            </div>
            <div className='nd-col'>
              <h3>Integración</h3>
              <p>Cuando corresponde, conectamos la solución con las herramientas y los datos que la empresa ya utiliza.</p>
            </div>
            <div className='nd-col'>
              <h3>Evolución</h3>
              <p>La solución puede acompañar nuevos procesos, integraciones y necesidades a medida que la empresa cambia.</p>
            </div>
          </div>
        </div>
      </section>

      <section className='nd-sec'>
        <div className='nd-wrap'>
          <h2 className='nd-h2'>Cómo trabajamos</h2>
          <div className='nd-cols nd-steps'>
            {PROCESS.map(([number, title, description]) => (
              <div className='nd-col' key={title}>
                <span className='nd-mono nd-step-k'>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id='faq' className='nd-sec'>
        <div className='nd-wrap nd-narrow'>
          <h2 className='nd-h2 nd-center'>Preguntas frecuentes</h2>
          <NdFaq items={FAQ} />
        </div>
      </section>

      <NdFinal title='Contanos qué necesitás construir' cta='desarrollo-web' />
    </main>
  )
}

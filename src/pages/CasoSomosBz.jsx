import { Link } from 'react-router-dom'
import { NdFinal, NdPageHero } from '../components/nd/Nd'
import { useSeo } from '../hooks/useSeo'
import '../styles/casos.css'

/*
  Caso de éxito: Somos BZ (salas de bingo y slots de Berazategui).
  Contenido aprobado por Sebastian el 24/10/2026. BZ autorizó que se lo nombre y que se use su logo.
  Por pedido del cliente NO se publican números ni métricas internas de BZ (cantidad de máquinas,
  cifras de validación, resultados de promociones, etc.): el caso se cuenta en forma cualitativa.
  La URL del sitio de informes es interna y tampoco va.
*/

const URL = 'https://www.nimbodata.com/casos/somos-bz'
const LOGO = '/proyectos/somos-bz-logo.jpg'

const PROBLEMAS = [
  [
    'Un PDF armado a mano',
    'El directorio miraba un informe en PDF hecho en Looker Studio. Había que actualizarlo y exportarlo cada vez, y no siempre quedaba claro de dónde salían algunas cifras.',
  ],
  [
    'Eventos sin punto de comparación',
    'Cada evento se evaluaba con los números de esa noche. Sin una base contra la cual comparar, no había forma de saber si el evento atraía gente o si ese sábado iba a ser igual de bueno sin él.',
  ],
  [
    'Métricas que medían otra cosa',
    'Lo que se usaba como "ingresos a la sala" en realidad contaba tarjetas emitidas. Por eso una noche de evento con más gente podía aparecer en el gráfico con menos.',
  ],
  [
    'Sin vista de ocupación',
    'No había forma de ver la ocupación de cada sala por día y hora, ni qué parte del parque de máquinas estaba en uso.',
  ],
  [
    'Promociones juzgadas por el fin de semana',
    'Las promociones se evaluaban solo por el fin de semana, que siempre sube, sin mirar qué pasaba con el resto de la semana.',
  ],
  [
    'Una base de clientes sin perfilar',
    'La base de clientes no estaba documentada ni segmentada: no se sabía bien quién juega, cuánto ni cómo se reparte entre las salas.',
  ],
]

const SOLUCIONES = [
  [
    'Sitio privado de informes',
    'Un sitio de informes propio, de uso interno, con los tableros de Directorio, Ocupación de sala, Fidelización, Altas de clientes y Máquinas. Tiene filtros por sala y por período, y se entra con la cuenta de Google de la empresa.',
  ],
  [
    'Actualización automática con control de datos',
    'Los informes se actualizan solos todas las mañanas en un servidor dedicado. Antes de publicar, el proceso controla los datos: si algo no cierra, no publica. También hay un botón para actualizar a demanda.',
  ],
  [
    'Adiós al PDF de Looker',
    'El informe de directorio se rearmó desde cero y se validó cifra por cifra contra el PDF original antes de reemplazarlo.',
  ],
  [
    'Informe mensual de eventos',
    'Cada evento se compara contra los sábados sin evento del mismo mes y contra la otra sala. El informe da un veredicto por evento (repetir, ajustar o descartar) y se entrega como presentación con el relato armado.',
  ],
  [
    'Informes de campaña sin tocar código',
    'Sumar una campaña nueva es copiar un archivo de configuración: el informe se arma solo, sin cambios de programación.',
  ],
  [
    'Segmentación de clientes',
    'Clusterización de la base para construir perfiles de jugador por sala, a partir de edad, género, zona y ocupación.',
  ],
  [
    'Análisis de máquinas',
    'Un análisis del rendimiento real de las máquinas comparado con lo que declara cada fabricante.',
  ],
]

const RESULTADOS = [
  ['Informes diarios y automáticos', 'Del PDF manual se pasó a informes que se actualizan solos todos los días, sin exportar nada a mano.'],
  ['Números en los que se puede confiar', 'Los informes se validaron de punta a punta: la ocupación recalculada por un camino independiente coincide, y la consulta SQL, el análisis en Python y el sitio dan exactamente lo mismo.'],
  ['Errores de medición corregidos', 'Se corrigieron errores que daban vuelta las conclusiones. Por ejemplo, sin un mínimo de casos, una caída real en las altas de clientes aparecía como una suba.'],
  ['Decisiones con una base de comparación', 'Los eventos y las promociones ahora se evalúan contra una referencia adecuada, y no solo por cómo fue el fin de semana.'],
]

const STACK = ['n8n', 'OpenClaw', 'Python', 'SQL', 'Sitio web de informes']

export default function CasoSomosBz() {
  useSeo({
    title: 'Caso Somos BZ: datos e informes automáticos para salas de bingo — Nimbo',
    description:
      'Cómo Nimbo reemplazó el PDF manual de Somos BZ (Berazategui) por informes que se actualizan solos, con control de datos, análisis de eventos y segmentación de clientes.',
    path: '/casos/somos-bz',
    image: LOGO,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${URL}#article`,
          headline: 'Caso Somos BZ: datos e informes automáticos para salas de bingo y slots',
          description:
            'Nimbo reemplazó el informe manual de Somos BZ por un sitio privado de informes que se actualiza solo, con control de datos, análisis de eventos, segmentación de clientes y análisis de máquinas.',
          url: URL,
          inLanguage: 'es-AR',
          image: `https://www.nimbodata.com${LOGO}`,
          isPartOf: { '@id': 'https://www.nimbodata.com/#website' },
          author: { '@id': 'https://www.nimbodata.com/#business' },
          publisher: { '@id': 'https://www.nimbodata.com/#business' },
          about: { '@id': `${URL}#cliente` },
          breadcrumb: { '@id': `${URL}#breadcrumb` },
        },
        {
          '@type': 'Organization',
          '@id': `${URL}#cliente`,
          name: 'Somos BZ',
          alternateName: 'BZ',
          foundingDate: '1997',
          address: { '@type': 'PostalAddress', addressLocality: 'Berazategui', addressRegion: 'Buenos Aires', addressCountry: 'AR' },
          sameAs: ['https://www.linkedin.com/company/somosbz', 'https://www.instagram.com/somosbz'],
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${URL}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.nimbodata.com/' },
            { '@type': 'ListItem', position: 2, name: 'Proyectos', item: 'https://www.nimbodata.com/proyectos' },
            { '@type': 'ListItem', position: 3, name: 'Caso Somos BZ', item: URL },
          ],
        },
      ],
    },
  })

  return (
    <main className="nd-page-main cs-page">
      <NdPageHero eyebrow="Caso de éxito · Datos e IA" title="Somos BZ: del PDF manual a informes que se actualizan solos">
        <p>
          Para una empresa de entretenimiento de Berazategui, armamos un sistema de informes que se actualiza todos los
          días, controla sus propios datos y ayuda a decidir qué eventos y promociones conviene repetir.
        </p>
      </NdPageHero>

      <section className="nd-wrap cs-intro">
        <div className="cs-logo">
          <img src={LOGO} alt="Logo de Somos BZ" width="200" height="200" />
        </div>
        <dl className="cs-facts">
          <div>
            <dt>Cliente</dt>
            <dd>Somos BZ</dd>
          </div>
          <div>
            <dt>Rubro</dt>
            <dd>Entretenimiento: salas de bingo y slots</dd>
          </div>
          <div>
            <dt>Ubicación</dt>
            <dd>Berazategui, zona sur del Gran Buenos Aires</dd>
          </div>
          <div>
            <dt>Trabajamos juntos</dt>
            <dd>Desde mayo de 2026</dd>
          </div>
        </dl>
      </section>

      <section className="nd-wrap cs-sec">
        <div className="nd-art">
          <h2>El cliente</h2>
          <p>
            Somos BZ es una empresa de entretenimiento de Berazategui fundada en 1997. Tiene dos salas de bingo y slots,
            BZ Bera y BZ Cruce, y la sala gaming BZ Rebels.
          </p>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div>
              <span className="nd-eyebrow">El problema</span>
              <h2 className="nd-h2">Muchos datos, pocas respuestas confiables.</h2>
            </div>
          </div>
          <div className="nd-cols">
            {PROBLEMAS.map(([t, d]) => (
              <div key={t} className="nd-col">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div>
              <span className="nd-eyebrow">Lo que construimos</span>
              <h2 className="nd-h2">Un sistema de informes que trabaja solo.</h2>
            </div>
          </div>
          <div className="nd-cols nd-steps">
            {SOLUCIONES.map(([t, d], i) => (
              <div key={t} className="nd-col">
                <span className="nd-mono nd-step-k">{String(i + 1).padStart(2, '0')}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="nd-art cs-extra">
            <h3>Además, en producción</h3>
            <p>
              Para BZ también implementamos un bot de WhatsApp con OpenClaw para el seguimiento de tareas y las reservas,
              junto con un panel de marketing, backups y un panel de estado de los sistemas. Todo eso ya funciona en el día
              a día de la empresa.
            </p>
          </div>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div>
              <span className="nd-eyebrow">Resultados</span>
              <h2 className="nd-h2">Decisiones con datos que cierran.</h2>
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

      <section className="nd-sec">
        <div className="nd-wrap cs-stack">
          <span className="nd-eyebrow">Tecnología</span>
          <ul className="hm-usos">
            {STACK.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="cs-note">
            El equipo de BZ también usa Claude y ChatGPT Team en su trabajo diario.
          </p>
          <Link to="/proyectos" className="nd-more">
            Ver más proyectos →
          </Link>
        </div>
      </section>

      <NdFinal title="¿Tus números tampoco te dan respuestas?" cta="caso-bz" />
    </main>
  )
}

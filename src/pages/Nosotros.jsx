import { Cloud, NdFinal, NdPageHero } from '../components/nd/Nd'
import { TEAM } from '../data/team'
import { useSeo } from '../hooks/useSeo'

const VALUES = [
  { t: 'Una sola mesa', d: 'Web, automatización, datos e IA bajo un mismo techo. Sin traducciones entre proveedores: todo avanza en paralelo.' },
  { t: 'Negocio, no solo tecnología', d: 'Entendemos a quién le hablás y qué tiene que pasar para que funcione. Medimos resultados, no líneas de código.' },
  { t: 'Lanzar es el comienzo', d: 'Acompañamos todos los meses: medimos, ajustamos y sumamos automatizaciones a medida que tu negocio crece.' },
]

const HISTORY = [
  { y: '2024', t: 'La intuición', d: 'El nombre y la metáfora: bajar las ideas de las nubes a productos que funcionan en el mundo real.' },
  { y: '2025', t: 'Primeros clientes', d: 'WODSI y los primeros sitios y automatizaciones: de la estrategia al lanzamiento, con datos e IA desde el día uno.' },
  { y: '2026', t: 'Productos propios', d: 'Lanzamos Nimbo Display, Nimbo Tax y Recorridos 360: herramientas propias que también usan nuestros clientes.' },
  { y: '2026', t: 'Agentes y visión por computadora', d: 'Agentes de IA que trabajan solos (prospección, marketing, atención) y cámaras que entienden lo que pasa en un local.' },
]

const PROCESS = [
  { t: 'Diagnóstico', d: 'Charlamos y entendemos dónde se te va el tiempo y la plata.' },
  { t: 'Propuesta', d: 'Te mostramos qué automatizar primero, cuánto cuesta y qué vas a ahorrar.' },
  { t: 'Demo', d: 'Antes de cobrarte, te mostramos cómo se vería funcionando en tu negocio.' },
  { t: 'Construcción', d: 'Lo armamos e integramos con lo que ya usás: WhatsApp, planillas, tu sistema.' },
  { t: 'Acompañamiento', d: 'Lo mantenemos, medimos y lo hacemos crecer mes a mes.' },
]

export default function Nosotros() {
  useSeo({
    title: 'Nosotros — Nimbo | Transformación digital para pymes argentinas',
    description:
      'Somos Nimbo: ayudamos a pymes argentinas a crecer con automatización, inteligencia artificial, páginas web, datos y visión por computadora. Conocé quiénes somos y cómo trabajamos.',
    path: '/nosotros',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          '@id': 'https://www.nimbodata.com/nosotros#page',
          name: 'Nosotros — Nimbo',
          url: 'https://www.nimbodata.com/nosotros',
          inLanguage: 'es-AR',
          isPartOf: { '@id': 'https://www.nimbodata.com/#website' },
          about: { '@id': 'https://www.nimbodata.com/#business' },
          mainEntity: TEAM.map((member) => ({ '@id': 'https://www.nimbodata.com/nosotros#' + member.id })),
        },
        ...TEAM.map((member) => ({
          '@type': 'Person',
          '@id': 'https://www.nimbodata.com/nosotros#' + member.id,
          name: member.name.es,
          jobTitle: member.role.es,
          description: member.bio.es,
          worksFor: { '@id': 'https://www.nimbodata.com/#business' },
        })),
      ],
    },
  })

  return (
    <main className="nd-page-main">
      <NdPageHero eyebrow="Nosotros" title="Bajamos las ideas a tierra">
        <p>Somos un estudio digital argentino que toma algo intangible —una idea— y lo convierte en sistemas que trabajan solos.</p>
      </NdPageHero>

      <section className="nd-wrap">
        <div className="nd-stage ab-why">
          <span className="ab-cloud" aria-hidden="true">
            <Cloud />
          </span>
          <div>
            <span className="nd-mono ab-k">POR QUÉ NIMBO</span>
            <p>
              Nimbo es “nube”. Las mejores ideas empiezan ahí arriba: intangibles, ambiciosas, llenas de potencial. Nuestro
              trabajo es darles forma con diseño, tecnología, datos e IA para que existan de verdad en tu negocio.
            </p>
          </div>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">Cómo pensamos</h2>
          <div className="nd-cols">
            {VALUES.map((v) => (
              <div className="nd-col" key={v.t}>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">De las nubes al mundo real</h2>
          <ol className="ab-tl">
            {HISTORY.map((h) => (
              <li key={h.t}>
                <span className="nd-mono ab-yr">{h.y}</span>
                <div>
                  <h3>{h.t}</h3>
                  <p>{h.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">Las personas detrás de las nubes</h2>
          <div className="ab-team">
            {TEAM.map((m, i) => (
              <div className="ab-person" key={m.id}>
                <div className={`nd-visual ab-photo ${i % 2 ? 'nd-v-sand' : 'nd-v-lilac'}`}>
                  {m.photo ? <img src={m.photo} alt={m.name.es} loading="lazy" /> : <span className="ab-ini">{m.initials}</span>}
                </div>
                <h3>{m.name.es}</h3>
                <span className="nd-mono ab-role">{m.role.es}</span>
                <p>{m.bio.es}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">De la charla al sistema funcionando</h2>
          <div className="nd-cols nd-steps ab-steps">
            {PROCESS.map((s, i) => (
              <div key={s.t} className="nd-col">
                <span className="nd-mono nd-step-k">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NdFinal />
    </main>
  )
}

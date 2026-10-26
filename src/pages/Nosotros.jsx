import { Cloud, NdFinal, NdPageHero } from '../components/nd/Nd'
import { TEAM } from '../data/team'
import { useSeo } from '../hooks/useSeo'

const VALUES = [
  { t: 'Primero el problema', d: 'Antes de proponer tecnología entendemos el proceso, cuánto cuesta hoy y qué cambia si se resuelve.' },
  { t: 'Un solo equipo', d: 'IA, automatización, datos y software bajo la misma mesa. Sin intermediarios ni traducciones entre proveedores.' },
  { t: 'Resultados, no entregables', d: 'Medimos lo implementado y lo acompañamos todos los meses para que siga rindiendo a medida que la empresa crece.' },
]

const HISTORY = [
  { y: '2024', t: 'El origen', d: 'Seba arranca sus primeros proyectos con una idea simple: bajar la tecnología de las nubes a soluciones que funcionen en la operación diaria.' },
  { y: '2025', t: 'Primeros clientes', d: 'WODSI y las primeras automatizaciones e integraciones, con datos e IA desde el día uno, antes de formalizar Nimbo.' },
  { y: '2026', t: 'Nimbo Consulting', d: 'Nimbo se formaliza como consultora, ordenada en cuatro áreas: IA y agentes, automatización e integración, datos y software a medida.' },
  { y: '2026', t: 'Producto propio', d: 'Lanzamos Nimbo Display, cartelería digital conectada a precios, promociones y stock.' },
]

const PROCESS = [
  { t: 'Diagnóstico', d: 'Entendemos el proceso y la oportunidad de mejora.' },
  { t: 'Propuesta', d: 'Definimos alcance, tiempos, costos y resultados esperados.' },
  { t: 'Implementación', d: 'Construimos y probamos la solución con casos reales.' },
  { t: 'Evolución', d: 'Medimos, mantenemos y ajustamos lo implementado.' },
]

export default function Nosotros() {
  useSeo({
    title: 'Nosotros — Nimbo Consulting | IA y automatización para pymes argentinas',
    description:
      'Somos Nimbo Consulting: ayudamos a pymes argentinas a reducir trabajo manual con inteligencia artificial, automatización, datos y software a medida. Conocé quiénes somos y cómo trabajamos.',
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
          ...(member.sameAs ? { sameAs: member.sameAs } : {}),
        })),
      ],
    },
  })

  return (
    <main className="nd-page-main">
      <NdPageHero eyebrow="Nosotros" title="Consultoría tecnológica con los pies en la tierra">
        <p>
          Somos una consultora argentina que ayuda a pymes a reducir trabajo manual, mejorar la atención y conectar sus
          sistemas con IA, automatización y software a medida.
        </p>
      </NdPageHero>

      <section className="nd-wrap">
        <div className="nd-stage ab-why">
          <span className="ab-cloud" aria-hidden="true">
            <Cloud />
          </span>
          <div>
            <span className="nd-mono ab-k">POR QUÉ NIMBO</span>
            <p>
              Nimbo es “nube”. Mucha tecnología se queda ahí arriba: promesas, demos y herramientas que nadie termina de usar.
              Nuestro trabajo es bajarla a tierra, en soluciones concretas que tu equipo usa todos los días y que se pueden medir.
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
          <h2 className="nd-h2">Nuestra historia</h2>
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
          <p className="ab-entity">
            Nimbo Consulting (nimbodata.com) es la consultora de Sebastian Deina, con base en Buenos Aires y fundada en
            2026. No tiene relación con Nimbo Consulting SL (España) ni con Nimbo Tecnología SAS.
          </p>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">El equipo</h2>
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
          <h2 className="nd-h2">Primero entendemos. Después construimos.</h2>
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

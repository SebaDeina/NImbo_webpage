import PageHero from '../components/g/PageHero'
import { Emblem, useRevealAll } from '../components/g/Art'
import CTA from '../components/CTA'
import { TEAM } from '../data/team'
import { useSeo } from '../hooks/useSeo'

const VALUES = [
  { e: 'II', t: 'Una sola mesa', d: 'Web, automatización, datos e IA bajo un mismo techo. Sin traducciones entre proveedores: todo avanza en paralelo.' },
  { e: 'IV', t: 'Negocio, no solo tecnología', d: 'Entendemos a quién le hablás y qué tiene que pasar para que funcione. Medimos resultados, no líneas de código.' },
  { e: 'I', t: 'Lanzar es el comienzo', d: 'Acompañamos todos los meses: medimos, ajustamos y sumamos automatizaciones a medida que tu negocio crece.' },
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
  })
  useRevealAll('.rv')

  return (
    <main className="g-main">
      <PageHero>
        <div className="eyebrow">Nosotros</div>
        <h1>
          Bajamos las ideas <em>a tierra</em>
        </h1>
        <p className="hero-sub">
          Somos un estudio digital argentino que toma algo intangible —una idea— y lo convierte en sistemas que trabajan solos.
        </p>
      </PageHero>

      <section className="paper about-body">
        <div className="wrap">
          <div className="about-intro rv">
            <div className="eyebrow">Por qué Nimbo</div>
            <p className="lead">
              Nimbo es “nube”. Las mejores ideas empiezan ahí arriba: intangibles, ambiciosas, llenas de potencial. Nuestro
              trabajo es darles forma con diseño, tecnología, datos e IA para que existan de verdad en tu negocio.
            </p>
          </div>
          <div className="values">
            {VALUES.map((v) => (
              <div className="value rv" key={v.t}>
                <div className="value-in">
                  <Emblem n={v.e} className="emb" />
                  <h3>{v.t}</h3>
                  <p>{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter inkbg sec-pad">
        <div className="wrap">
          <header className="ch-head">
            <div className="eyebrow">Historia</div>
            <h2>De las nubes al mundo real</h2>
          </header>
          <div className="timeline">
            {HISTORY.map((h) => (
              <div className="tl rv" key={h.t}>
                <div className="yr">{h.y}</div>
                <div>
                  <h3>{h.t}</h3>
                  <p>{h.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="paper sec-pad">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Equipo</div>
            <h2>
              Las personas detrás <em>de las nubes</em>
            </h2>
            <p className="lead">Un equipo chico, cercano y obsesionado con que tu idea llegue al mundo real.</p>
          </div>
          <div className="team">
            {TEAM.map((m) => (
              <div className="person rv" key={m.id}>
                <div className="portrait">
                  <div className="portrait-in">
                    {m.photo ? <img src={m.photo} alt={m.name.es} loading="lazy" /> : <span className="ini">{m.initials}</span>}
                  </div>
                </div>
                <h3>{m.name.es}</h3>
                <div className="role">{m.role.es}</div>
                <p>{m.bio.es}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="paper sec-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Cómo trabajamos</div>
            <h2>
              De la charla <em>al sistema funcionando</em>
            </h2>
          </div>
          <div className="steps-row">
            {PROCESS.map((s, i) => (
              <div className="st rv" key={s.t} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="st-in">
                  <span className="n">{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}

// Lo que acredita a Nimbo y las herramientas con las que trabaja, en dos secciones separadas del inicio:
//   Partners y certificaciones: partner de Tiendanube, certificaciones de HubSpot y Make, y la Guía de
//   Buenos Aires. Solo lo verificable (GoodFirms sale hasta que la ficha esté publicada; n8n va como herramienta
//   hasta confirmar la certificación).
//   Tecnologías con las que trabajamos: herramientas, no alianzas (por eso no van en la grilla de partners).
// Logos en un solo color: Tiendanube sale de su sitio; el resto de simple-icons. La Guía de Buenos Aires va con el
// nombre escrito hasta tener su sello oficial.
import claude from './logos/claude.svg?raw'
import googlecloud from './logos/googlecloud.svg?raw'
import hubspot from './logos/hubspot.svg?raw'
import make from './logos/make.svg?raw'
import meta from './logos/meta.svg?raw'
import n8n from './logos/n8n.svg?raw'
import openai from './logos/openai.svg?raw'
import tiendanube from './logos/tiendanube.svg?raw'
import twilio from './logos/twilio.svg?raw'
import zapier from './logos/zapier.svg?raw'

const SELLOS = [
  { name: 'Tiendanube', svg: tiendanube, wide: true, tag: 'Partner' },
  { name: 'HubSpot', svg: hubspot, tag: 'Certificaciones' },
  { name: 'Make', svg: make, tag: 'Certificación' },
  { name: 'Guía de Buenos Aires', tag: 'Empresa publicada' },
]

const TECNOLOGIAS = [
  { name: 'Google Cloud', svg: googlecloud, tag: 'Infraestructura' },
  { name: 'Meta', svg: meta, tag: 'WhatsApp e Instagram' },
  { name: 'OpenAI', svg: openai, tag: 'Modelos de IA' },
  { name: 'Claude', svg: claude, tag: 'Modelos de IA' },
  { name: 'n8n', svg: n8n, tag: 'Automatización' },
  { name: 'Zapier', svg: zapier, tag: 'Integraciones' },
  { name: 'Twilio', svg: twilio, tag: 'Mensajería' },
]

const Mark = ({ s }) => (
  <span className={`logo-mark${s.wide ? ' wide' : ''}`} role="img" aria-label={s.name}>
    {s.svg ? <i dangerouslySetInnerHTML={{ __html: s.svg }} /> : null}
    {!s.wide && <b>{s.name}</b>}
  </span>
)

export default function Trust() {
  return (
    <section className="sec wrap" id="partners">
      <div className="sec-head" data-reveal>
        <div>
          <h2>Partners y certificaciones.</h2>
          <p className="lead">Los programas en los que nos formamos y los lugares donde Nimbo está registrada.</p>
        </div>
      </div>
      <ul className="logos" data-reveal>
        {SELLOS.map((s) => (
          <li key={s.name}><Mark s={s} /><span className="mono">{s.tag}</span></li>
        ))}
      </ul>
    </section>
  )
}

export function Tecnologias() {
  return (
    <section className="sec wrap" id="tecnologias">
      <div className="sec-head" data-reveal>
        <div>
          <h2>Tecnologías con las que trabajamos.</h2>
          <p className="lead">Elegimos la herramienta según tu caso. Estas son las que más usamos.</p>
        </div>
      </div>
      <ul className="tech" data-reveal>
        {TECNOLOGIAS.map((s) => (
          <li key={s.name}><Mark s={s} /><span className="mono">{s.tag}</span></li>
        ))}
      </ul>
    </section>
  )
}

// Partners, certificaciones, directorios y plataformas: una sola grilla de logos en un solo color con una
// etiqueta abajo que dice qué es cada uno (las plataformas que usamos no son partners: lo aclara la etiqueta).
// Primero lo que acredita a Nimbo y después las plataformas. Solo lo que es verdad: las plataformas
// son las que ya nombra el sitio (Make, n8n, Zapier, OpenAI, Twilio, WhatsApp) más Google Cloud y Claude.
// Logos: Tiendanube sale de su sitio; el resto de simple-icons. GoodFirms y la Guía de Buenos Aires van con el
// nombre escrito hasta tener sus sellos oficiales.
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
  { name: 'Tiendanube', svg: tiendanube, wide: true, tag: 'Partner oficial' },
  { name: 'HubSpot', svg: hubspot, tag: 'Certificaciones' },
  { name: 'Make', svg: make, tag: 'Certificación' },
  { name: 'n8n', svg: n8n, tag: 'Certificación' },
  { name: 'GoodFirms', tag: 'Directorio' },
  { name: 'Guía de Buenos Aires', tag: 'Empresa publicada' },
  { name: 'Google Cloud', svg: googlecloud, tag: 'Infraestructura' },
  { name: 'Meta', svg: meta, tag: 'WhatsApp e Instagram' },
  { name: 'OpenAI', svg: openai, tag: 'Modelos de IA' },
  { name: 'Claude', svg: claude, tag: 'Modelos de IA' },
  { name: 'Zapier', svg: zapier, tag: 'Integraciones' },
  { name: 'Twilio', svg: twilio, tag: 'Mensajería' },
]

export default function Trust() {
  return (
    <section className="sec wrap" id="partners">
      <div className="sec-head" data-reveal>
        <div>
          <h2>Partners y certificaciones.</h2>
          <p className="lead">Las plataformas con las que trabajamos todos los días y los programas en los que nos formamos.</p>
        </div>
      </div>
      <ul className="logos" data-reveal>
        {SELLOS.map((s) => (
          <li key={s.name}>
            <span className={`logo-mark${s.wide ? ' wide' : ''}`} role="img" aria-label={s.name}>
              {s.svg ? <i dangerouslySetInnerHTML={{ __html: s.svg }} /> : null}
              {!s.wide && <b>{s.name}</b>}
            </span>
            <span className="mono">{s.tag}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

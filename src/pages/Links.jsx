import CloudMark from '../components/CloudMark'
import { whatsappUrl } from '../config/whatsapp'

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/nimbodata',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: whatsappUrl('Hola, vi el perfil de Nimbo en Instagram y me gustaría saber más.'),
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.115 1.524 5.84L0 24l6.336-1.501A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.015-1.374l-.36-.214-3.733.884.934-3.622-.235-.372A9.818 9.818 0 1 1 12 21.818z"/>
      </svg>
    ),
  },
]

const LINKS = [
  {
    label: 'Conocé Nimbo',
    desc: 'Web, IA y automatizaciones para tu negocio',
    href: 'https://www.nimbodata.com',
    primary: true,
  },
  {
    label: 'Blog: Consejos para crecer',
    desc: 'Web, SEO e IA explicados sin rodeos',
    href: 'https://www.nimbodata.com/blog',
  },
  {
    label: 'Automatizar tu negocio: guía gratuita',
    desc: 'Para pymes argentinas que quieren escalar',
    href: 'https://www.nimbodata.com/blog/ia-para-pymes-argentinas-guia-2026',
  },
  {
    label: 'Por qué necesitás una página web',
    desc: 'Si solo tenés Instagram, leé esto',
    href: 'https://www.nimbodata.com/blog/por-que-tu-negocio-necesita-una-pagina-web',
  },
  {
    label: 'Contacto',
    desc: 'Contanos tu proyecto',
    href: 'https://www.nimbodata.com/contacto',
  },
]

export default function Links() {
  return (
    <div className="links-page">
      <div className="links-glow" aria-hidden="true" />

      <div className="links-wrap">
        <header className="links-header">
          <div className="links-logo links-logo--purple">
            <CloudMark />
          </div>
          <h1 className="links-name">Nimbo</h1>
          <p className="links-tagline">Páginas web · Automatización · IA para negocios en Argentina</p>

          <div className="links-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="links-social-btn"
              >
                {s.icon}
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </header>

        <nav className="links-list" aria-label="Links de Nimbo">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`links-item${link.primary ? ' links-item--primary' : ''}`}
            >
              <span className="links-item-label">{link.label}</span>
              {link.desc && <span className="links-item-desc">{link.desc}</span>}
            </a>
          ))}
        </nav>

        <footer className="links-foot">
          <span>nimbodata.com</span>
        </footer>
      </div>
    </div>
  )
}

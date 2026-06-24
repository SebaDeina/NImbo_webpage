import CloudMark from '../components/CloudMark'

const LINKS = [
  {
    label: '🌐 Conocé Nimbo',
    desc: 'Web, IA y automatizaciones para tu negocio',
    href: 'https://www.nimbodata.com',
    primary: true,
  },
  {
    label: '💬 Escribinos por WhatsApp',
    desc: 'Respuesta en menos de 24 hs',
    href: 'https://wa.me/5491130105256',
  },
  {
    label: '📖 Blog: Consejos para crecer',
    desc: 'Web, SEO e IA explicados sin rodeos',
    href: 'https://www.nimbodata.com/blog',
  },
  {
    label: '🤖 ¿Por qué automatizar tu negocio?',
    desc: 'Guía gratuita para pymes argentinas',
    href: 'https://www.nimbodata.com/blog/ia-para-pymes-argentinas-guia-2026',
  },
  {
    label: '🔍 ¿Por qué necesitás una web?',
    desc: 'Si solo tenés Instagram, leé esto',
    href: 'https://www.nimbodata.com/blog/por-que-tu-negocio-necesita-una-pagina-web',
  },
  {
    label: '📩 Contacto',
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
          <div className="links-logo">
            <CloudMark />
          </div>
          <h1 className="links-name">Nimbo</h1>
          <p className="links-tagline">Páginas web · Automatización · IA para negocios en Argentina</p>
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

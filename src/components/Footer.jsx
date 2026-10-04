import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { whatsappUrl } from '../config/whatsapp'
import { Logo } from './Nav'
import { CloudBand, Stars, ISLAND_LAYER } from './g/Art'

const ROWS = [
  { base: 0.42, rmin: 0.07, rmax: 0.14, seed: 61, fade: 'dark' },
  { base: 0.68, rmin: 0.09, rmax: 0.18, seed: 71, fade: 'dark' },
  { base: 0.95, rmin: 0.11, rmax: 0.23, seed: 83, fade: 'light' },
]

export default function Footer() {
  const { t } = useLang()
  const wa = whatsappUrl(t('wa.message'))
  return (
    <footer>
      <Stars count={50} seed={29} className="f-stars" />
      <div className="wrap">
        <div className="f-grid">
          <div className="f-brand">
            <Logo />
            <p>Tecnología que trabaja mientras vos te enfocás en crecer.</p>
            <ul>
              <li><a href={wa} data-cta="pie" target="_blank" rel="noopener noreferrer">WhatsApp · +54 9 11 2403-6836</a></li>
              <li><a href="mailto:contacto@nimbodata.com" data-cta="pie">contacto@nimbodata.com</a></li>
              <li>Buenos Aires, Argentina</li>
            </ul>
          </div>
          <div className="f-col">
            <h4>Servicios</h4>
            <Link to="/#cap-I">Desarrollo web</Link>
            <Link to="/#cap-II">Automatización</Link>
            <Link to="/#cap-III">Chatbots e IA</Link>
            <Link to="/#cap-IV">Datos</Link>
            <Link to="/#cap-V">Visión por computadora</Link>
          </div>
          <div className="f-col">
            <h4>Nimbo</h4>
            <Link to="/proyectos">Proyectos</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/privacidad">Privacidad</Link>
          </div>
          <div className="f-col">
            <h4>Hablemos</h4>
            <p>Contanos tu idea y te respondemos en menos de 24 horas.</p>
            <a className="btn btn-ghost" href={wa} data-cta="pie" target="_blank" rel="noopener noreferrer">
              Escribinos <span className="arr">→</span>
            </a>
          </div>
        </div>
        <div className="f-legal">
          <span>© {new Date().getFullYear()} Nimbo</span>
          <span>|</span>
          <span>Hecho en Argentina</span>
        </div>
      </div>
      <CloudBand className="horizon" rows={ROWS} drift={false} line={3.3} delay={400} layers={[ISLAND_LAYER(1, 1, 'z')]} />
    </footer>
  )
}

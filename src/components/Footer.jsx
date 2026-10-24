import { Link as RouterLink } from 'react-router-dom'
import { whatsappUrl } from '../config/whatsapp'
import { Cloud } from './nd/Nd'

/*
  Pie del sitio en el diseño blanco: mismas piezas que el pie grabado (marca, contacto,
  servicios, Nimbo, "Hablemos" y el cierre legal), sobrio como el de openai.com, con la
  marca grande y muy clara al final en lugar del horizonte de nubes.
  Trae sus propios tokens (.nd-foot) porque también se usa en /robots, fuera de .nd.
*/

const WA_MSG = '¡Hola! Vi el sitio de Nimbo y me gustaría conversar sobre un proyecto.'

/* En los subdominios (robots., automatizaciones.) la raíz es otra página: los links del footer van al sitio principal. */
const EXTERNO =
  typeof window !== 'undefined' && /^(robots|automatizaciones)\./.test(window.location.hostname)
function Link({ to, children, ...rest }) {
  return EXTERNO ? (
    <a href={`https://www.nimbodata.com${to}`} {...rest}>
      {children}
    </a>
  ) : (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  )
}

export default function Footer() {
  const wa = whatsappUrl(WA_MSG)
  return (
    <footer className="nd-foot">
      <div className="nd-wrap">
        <div className="nf-grid">
          <div className="nf-brand">
            <Link to="/" className="nd-logo" aria-label="Nimbo — inicio">
              <Cloud />
              <span>nimbo</span>
            </Link>
            <p>Tecnología que trabaja mientras vos te enfocás en crecer.</p>
            <ul>
              <li>
                <a href={wa} data-cta="pie" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:contacto@nimbodata.com" data-cta="pie">
                  contacto@nimbodata.com
                </a>
              </li>
              <li>Buenos Aires, Argentina</li>
            </ul>
          </div>
          <div className="nf-col">
            <h4>Servicios</h4>
            <Link to="/automatizaciones">IA y agentes para pymes</Link>
            <Link to="/#cap-II">Automatización e integración</Link>
            <Link to="/#cap-IV">Datos y BI</Link>
            <Link to="/desarrollo-web-pymes">Desarrollo web y software a medida</Link>
            <Link to="/#precios">Formas de trabajar</Link>
            <h4 className="nf-sub">Producto propio</h4>
            <Link to="/display">Nimbo Display</Link>
          </div>
          <div className="nf-col">
            <h4>Nimbo</h4>
            <Link to="/proyectos">Proyectos</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/privacidad">Privacidad</Link>
          </div>
          <div className="nf-col nf-talk">
            <h4>Diagnóstico</h4>
            <p>Contanos qué proceso querés mejorar y te respondemos en menos de 24 horas.</p>
            <Link className="nf-btn" to="/diagnostico">
              Solicitar diagnóstico →
            </Link>
          </div>
        </div>
        <div className="nf-legal">
          <span>© {new Date().getFullYear()} Nimbo</span>
          <span>Hecho en Argentina</span>
        </div>
      </div>
      <div className="nf-mark" aria-hidden="true">
        <Cloud />
        <span>nimbo</span>
      </div>
    </footer>
  )
}

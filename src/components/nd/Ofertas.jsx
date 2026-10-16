import { Link } from 'react-router-dom'
import { WaLink } from './Nd'

/*
  Las tres ofertas para vender primero, con precio "desde" en pesos (confirmados por Seba, oct. 2026).
  Va en la home y en /contacto. Cada botón lleva su data-cta para medir qué oferta mueve más consultas.
*/

const OFERTAS = [
  {
    cta: 'oferta-automatizacion',
    t: 'Automatización y datos',
    para: 'Para empresas que dependen de Excel y tareas manuales.',
    precio: '$200.000',
    unidad: 'por mes',
    nota: 'Abono mensual: incluye el servidor y el mantenimiento, así la automatización no se corta.',
    incluye: [
      'Relevamiento y armado de tus primeros procesos',
      'Dashboard o reporte automático con tus números',
      'Integración con WhatsApp, Gmail, Sheets o tu sistema',
      'Servidor, monitoreo y ajustes todos los meses',
    ],
  },
  {
    cta: 'oferta-web',
    t: 'Desarrollo web y apps',
    para: 'Para mostrar tu negocio o dejar de trabajar con planillas sueltas.',
    precio: '$400.000',
    unidad: 'por proyecto',
    nota: 'Pago por proyecto. El precio final depende del alcance.',
    incluye: [
      'Web corporativa o sistema interno a medida',
      'Formularios inteligentes conectados a tu planilla o CRM',
      'Rápida, adaptada al celular y visible en Google',
      'Puesta en línea y capacitación a tu equipo',
    ],
  },
  {
    cta: 'oferta-display',
    t: 'Nimbo Display',
    para: 'Para locales y cadenas con pantallas o televisores.',
    precio: '$70.000',
    unidad: 'por dispositivo',
    nota: 'Más un abono mensual según la cantidad de pantallas.',
    incluye: [
      'Dispositivo Nimbo listo para conectar por HDMI',
      'Panel en la nube para todas tus pantallas',
      'Promos, precios y horarios programados',
      'Sigue mostrando contenido aunque se corte internet',
    ],
    mas: ['/display', 'Conocé Nimbo Display'],
  },
]

const msg = (t) => `¡Hola! Vi la oferta de ${t} en el sitio de Nimbo y me gustaría saber más.`

export default function Ofertas({ id = 'ofertas', title = 'Tres formas concretas de empezar' }) {
  return (
    <section id={id} className="nd-sec">
      <div className="nd-wrap">
        <div className="nd-sec-top">
          <h2 className="nd-h2">{title}</h2>
          <p className="of-lead">Precios de referencia en pesos. Después de la primera charla te pasamos un presupuesto cerrado.</p>
        </div>
        <div className="of-grid">
          {OFERTAS.map((o) => (
            <article key={o.cta} className="of-card">
              <div className="of-head">
                <h3>{o.t}</h3>
                <p>{o.para}</p>
              </div>
              <div className="of-price">
                <span className="of-desde">Desde</span>
                <b>{o.precio}</b>
                <span className="of-unit">{o.unidad}</span>
              </div>
              <p className="of-nota">{o.nota}</p>
              <ul className="of-list">
                {o.incluye.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <div className="of-foot">
                <WaLink cta={o.cta} msg={msg(o.t)} className="nd-btn">
                  Consultar por WhatsApp
                </WaLink>
                {o.mas && (
                  <Link to={o.mas[0]} className="nd-more">
                    {o.mas[1]} →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

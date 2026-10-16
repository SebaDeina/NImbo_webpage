import { Link } from 'react-router-dom'
import { WaLink } from './Nd'

/*
  Tarifario de Nimbo Consulting (oct. 2026): precios "desde" en pesos, a validar con clientes.
  Dos tarjetas para vender primero (Nimbo Managed AI, el producto estrella, y el diagnóstico técnico)
  y la tabla con el resto de los servicios. Va en la home y en /contacto.
  Cada botón lleva su data-cta para medir qué oferta mueve más consultas.
*/

const OFERTAS = [
  {
    cta: 'oferta-managed-ai',
    t: 'Nimbo Managed AI',
    tag: 'El más elegido',
    para: 'Un agente de IA en hasta dos canales, operado y mejorado por nosotros todos los meses.',
    precio: '$200.000',
    unidad: 'por mes',
    extra: 'Más implementación desde $650.000',
    incluye: [
      'Operación del agente en los canales acordados, con monitoreo',
      'Resolución de incidencias en horario de soporte',
      'Ajustes de instrucciones, respuestas y base de conocimiento',
      'Hasta tres horas por mes de cambios menores',
      'Reporte de consultas atendidas y derivaciones',
    ],
    aparte: [
      'Fuera del abono',
      'Nuevas integraciones, rediseño completo de flujos, consumo de modelos de IA, cargos de Meta y licencias.',
    ],
  },
  {
    cta: 'oferta-diagnostico',
    t: 'Diagnóstico técnico',
    para: 'Para problemas complejos: entendemos el proceso y diseñamos la solución antes de construir nada.',
    precio: '$150.000',
    unidad: 'por diagnóstico',
    extra: 'La primera reunión es sin cargo',
    incluye: [
      'Relevamiento del proceso actual y de tus sistemas',
      'Estimación de cuánto te cuesta hoy el problema',
      'Arquitectura de la solución',
      'Documento con alcance, plazos y costos',
    ],
    aparte: ['Se bonifica', 'Si contratás la implementación, el diagnóstico se descuenta del total.'],
  },
]

// [servicio, implementación, abono mensual]
const TARIFAS = [
  ['Agente IA básico, un canal', 'Desde $350.000', '$120.000'],
  ['Agente IA empresarial, hasta 2 canales', 'Desde $650.000', '$200.000'],
  ['Automatización entre sistemas', 'Desde $400.000', 'Desde $90.000'],
  ['Dashboard empresarial', 'Desde $500.000', 'Desde $100.000'],
  ['Aplicación o sistema a medida', 'Desde $1.200.000', 'A cotizar'],
  ['Consultoría y diagnóstico técnico', 'Desde $150.000', 'No obligatorio'],
]

const msg = (t) => `¡Hola! Vi ${t} en el sitio de Nimbo y me gustaría saber más.`

export default function Ofertas({ id = 'precios', title = 'Precios de referencia' }) {
  return (
    <section id={id} className="nd-sec">
      <div className="nd-wrap">
        <div className="nd-sec-top">
          <h2 className="nd-h2">{title}</h2>
          <p className="of-lead">Valores en pesos. Después del diagnóstico te pasamos un presupuesto cerrado según alcance y plazos.</p>
        </div>
        <div className="of-grid">
          {OFERTAS.map((o) => (
            <article key={o.cta} className={`of-card${o.tag ? ' is-star' : ''}`}>
              <div className="of-head">
                <h3>
                  {o.t}
                  {o.tag && <span className="of-tag">{o.tag}</span>}
                </h3>
                <p>{o.para}</p>
              </div>
              <div className="of-price">
                <span className="of-desde">Desde</span>
                <b>{o.precio}</b>
                <span className="of-unit">{o.unidad}</span>
              </div>
              <p className="of-nota">{o.extra}</p>
              <ul className="of-list">
                {o.incluye.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className="of-aparte">
                <b>{o.aparte[0]}.</b> {o.aparte[1]}
              </p>
              <div className="of-foot">
                <WaLink cta={o.cta} msg={msg(o.t)} className="nd-btn">
                  Consultar por WhatsApp
                </WaLink>
              </div>
            </article>
          ))}
        </div>

        <div className="of-table" role="table" aria-label="Tarifario de servicios">
          <div className="of-row of-row-head" role="row">
            <span role="columnheader">Servicio</span>
            <span role="columnheader">Implementación</span>
            <span role="columnheader">Abono mensual</span>
          </div>
          {TARIFAS.map(([s, impl, abono]) => (
            <div key={s} className="of-row" role="row">
              <span role="cell" className="of-svc">
                {s}
              </span>
              <span role="cell" data-label="Implementación">
                {impl}
              </span>
              <span role="cell" data-label="Abono">
                {abono}
              </span>
            </div>
          ))}
        </div>
        <p className="of-small">
          Sujetos a alcance, plazo y costos de terceros. El abono es por servicio gestionado, no por desarrollo ilimitado.
          Nimbo Display se cotiza aparte: <Link to="/display">desde $70.000 por dispositivo</Link>.
        </p>
      </div>
    </section>
  )
}

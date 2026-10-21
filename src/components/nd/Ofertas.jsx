import { useDiagnostico } from './DiagnosticoForm'

/*
  Formas de contratar a Nimbo Consulting (oct. 2026). Sin montos: los precios "desde" en pesos hacían ver
  el servicio caro o barato según quién mirara, y le bajaban el nivel a la consultora. Cada tarjeta dice
  cómo se cotiza y qué incluye; el precio va en la propuesta cerrada después del diagnóstico.
  Va en la home y en /contacto. Cada botón abre el diagnóstico con su origen para medir qué tarjeta mueve más.
*/

const FORMAS = [
  {
    cta: 'oferta-diagnostico',
    k: '01',
    t: 'Diagnóstico',
    para: 'Entendemos el proceso, medimos cuánto te cuesta hoy y te decimos qué conviene resolver primero.',
    modo: 'Primera reunión sin cargo',
    incluye: [
      'Relevamiento del proceso y de tus sistemas',
      'Estimación del costo actual del problema',
      'Hoja de ruta con prioridades',
    ],
    nota: 'Si hace falta un relevamiento técnico profundo, lo cotizamos antes y se bonifica al implementar.',
    btn: 'Solicitar un diagnóstico',
  },
  {
    cta: 'oferta-implementacion',
    k: '02',
    t: 'Implementación',
    para: 'Construimos la solución, la probamos con casos reales y la ponemos en producción con tu aprobación.',
    modo: 'Propuesta cerrada, a precio fijo',
    incluye: [
      'Alcance, entregables y plazos por escrito',
      'Pagos por hitos, contra avance aprobado',
      'Pruebas con casos reales antes de salir',
    ],
    nota: 'Sabés cuánto vas a invertir y qué vas a recibir antes de empezar.',
    btn: 'Contanos tu proyecto',
  },
  {
    cta: 'oferta-managed-ai',
    k: '03',
    t: 'Servicio gestionado',
    tag: 'Recomendado',
    para: 'Nos hacemos cargo de que lo implementado siga funcionando y mejore todos los meses.',
    modo: 'Abono mensual según alcance',
    incluye: [
      'Operación y monitoreo de agentes e integraciones',
      'Soporte y ajustes continuos',
      'Reporte mensual de resultados',
    ],
    nota: 'Nuevas integraciones y desarrollos se proponen aparte.',
    btn: 'Quiero este acompañamiento',
  },
]

export default function Ofertas({ id = 'precios', title = 'Formas de trabajar juntos' }) {
  const openDiagnostico = useDiagnostico()
  return (
    <section id={id} className="nd-sec">
      <div className="nd-wrap">
        <div className="nd-sec-top">
          <div className="hm-line">
            <span className="nd-eyebrow">Inversión</span>
            <h2 className="nd-h2">{title}</h2>
          </div>
          <p className="of-lead">
            Cada empresa es distinta, por eso no vendemos paquetes. Después del diagnóstico recibís una propuesta cerrada,
            en pesos, con alcance, plazos y resultados esperados.
          </p>
        </div>
        <div className="of-grid">
          {FORMAS.map((o) => (
            <article key={o.cta} className={`of-card${o.tag ? ' is-star' : ''}`}>
              <div className="of-head">
                <span className="nd-mono of-k">{o.k}</span>
                <h3>
                  {o.t}
                  {o.tag && <span className="of-tag">{o.tag}</span>}
                </h3>
                <p>{o.para}</p>
              </div>
              <p className="of-modo">{o.modo}</p>
              <ul className="of-list">
                {o.incluye.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className="of-aparte">{o.nota}</p>
              <div className="of-foot">
                <button type="button" className={`nd-btn${o.tag ? '' : ' nd-btn-soft'}`} onClick={() => openDiagnostico(o.cta)}>
                  {o.btn}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

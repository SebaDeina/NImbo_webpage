import { on, useSteps } from './AutoDemos'

/*
  Demos animadas de las tarjetas de servicios de la home (diseño blanco).
  Mismo motor que las de /automatizaciones: corren en loop solo en pantalla y,
  con "reducir movimiento", quedan quietas en el último paso. Datos de ejemplo.
*/

/* Desarrollo web: la tienda carga, el cliente agrega un producto y el pedido llega por WhatsApp */
const PRODUCTOS = [
  ['Taladro percutor', '$189.900', '#DCD8F5'],
  ['Set de puntas', '$18.400', '#F6F1E7'],
  ['Amoladora 115', '$96.500', '#E4F7EC'],
]
export function WebDemo() {
  const [ref, s] = useSteps([900, 900, 1000, 900, 1100, 2800])
  return (
    <div className="hw" ref={ref}>
      <div className="hw-bar">
        <i />
        <i />
        <i />
        <span className="hw-url nd-mono">ferreteriadelsur.com.ar</span>
        <span className={`hw-cart nd-mono${s >= 3 ? ' is-full' : ''}`}>🛒 {s >= 3 ? 1 : 0}</span>
      </div>
      <div className={`hw-body${s >= 1 ? ' is-loaded' : ''}`}>
        <div className="hw-hero">
          <b>Herramientas con envío en el día</b>
          <span>Pagás online y te llega a tu casa.</span>
        </div>
        <div className="hw-grid">
          {PRODUCTOS.map(([n, p, c], i) => (
            <div key={n} className="hw-prod">
              <span className="hw-img" style={{ background: c }} />
              <span className="hw-n">{n}</span>
              <span className="hw-p nd-mono">{p}</span>
              <span className={`hw-add${i === 1 && s >= 2 ? ' is-on' : ''}`}>{i === 1 && s >= 3 ? 'Agregado ✓' : 'Agregar'}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={`hw-toast${on(s >= 4)}`}>
        <span className="hw-toast-k nd-mono">WhatsApp · ahora</span>
        Nuevo pedido #1045 · Set de puntas · $18.400
      </div>
    </div>
  )
}

/* Automatización: una venta dispara la factura, el mail y la planilla, sin tipear nada */
const FLUJO = [
  ['Venta en el local', '$46.300 · tarjeta'],
  ['Factura C emitida', 'ARCA · 0003-00000231'],
  ['Enviada al cliente', 'por mail, con el PDF'],
  ['Caja actualizada', 'Google Sheets'],
]
export function FlowDemo() {
  const [ref, s] = useSteps([800, 900, 900, 900, 900, 2600])
  return (
    <div className="nd-panel hf" ref={ref}>
      <span className="nd-mono nd-panel-k">AUTOMATIZACIÓN · EJEMPLO</span>
      <ol className="hf-list">
        {FLUJO.map(([t, d], i) => (
          <li key={t} className={`hf-step${s > i ? ' is-on' : ''}${s === i + 1 ? ' is-now' : ''}`}>
            <span className="dm-check" aria-hidden="true">
              ✓
            </span>
            <span className="hf-txt">
              {t}
              <small>{d}</small>
            </span>
          </li>
        ))}
      </ol>
      <div className={`dm-done nd-mono${on(s >= 5)}`}>✓ Listo en segundos, sin tipear nada</div>
    </div>
  )
}

/* Datos: las ventas de las últimas semanas y una alerta antes de quedarte sin stock */
const SEMANAS = [42, 55, 48, 61, 58, 70, 66, 82]
export function DataDemo() {
  const [ref, s] = useSteps([600, 1700, 1300, 2600])
  const max = Math.max(...SEMANAS)
  return (
    <div className="nd-panel hdata" ref={ref}>
      <div className="hdata-top">
        <span className="nd-mono nd-panel-k">VENTAS POR SEMANA · EJEMPLO</span>
        <b className={`hdata-up nd-mono${on(s >= 2)}`}>+24%</b>
      </div>
      <div className="hdata-bars" aria-hidden="true">
        {SEMANAS.map((v, i) => (
          <i
            key={i}
            className={i === SEMANAS.length - 1 ? 'is-last' : ''}
            style={{ height: s >= 1 ? `${(v / max) * 100}%` : '6%', transitionDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>
      <div className={`hdata-alert dm-pop${on(s >= 2)}`}>
        <b>Stock bajo</b> · Tornillos 6 mm alcanzan para 5 días. Sugerido: pedir 200.
      </div>
    </div>
  )
}

/* Visión: la cámara de la entrada cuenta a la gente que pasa */
const PERSONAS = [
  ['M-20 150C60 140 120 120 170 96S260 60 330 48', '0s'],
  ['M330 160C280 150 230 140 190 116S110 76 40 64', '-1.6s'],
  ['M-20 110C50 104 110 92 160 80S260 70 330 96', '-3.2s'],
]
export function VisionDemo() {
  const [ref, , loop] = useSteps([1600])
  return (
    <div className="hv" ref={ref}>
      <div className="hv-k nd-mono">
        <span>CAM 02 · ENTRADA</span>
        <span className="hv-rec">REC</span>
      </div>
      <svg viewBox="0 0 310 180" role="img" aria-label="Cámara de la entrada detectando y contando personas">
        <defs>
          <radialGradient id="hvHeat">
            <stop offset="0" stopColor="#FF8A5B" stopOpacity=".55" />
            <stop offset=".5" stopColor="#FFC85B" stopOpacity=".25" />
            <stop offset="1" stopColor="#FFC85B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M0 180L70 40H240L310 180Z" className="hv-floor" />
        <path d="M118 40V20H192V40" className="hv-door" />
        <ellipse cx="160" cy="98" rx="70" ry="34" fill="url(#hvHeat)" />
        <ellipse cx="236" cy="138" rx="46" ry="22" fill="url(#hvHeat)" opacity=".7" />
        <line x1="40" y1="120" x2="270" y2="120" className="hv-line" />
        {PERSONAS.map(([d, begin], i) => (
          <g key={i}>
            <rect x="-11" y="-26" width="22" height="30" rx="3" className="hv-box" />
            <circle r="5" cy="-14" className="hv-head" />
            <path d="M-6 2V-6Q0 -10 6 -6V2Z" className="hv-head" />
            <animateMotion dur="4.8s" begin={begin} repeatCount="indefinite" path={d} />
          </g>
        ))}
      </svg>
      <div className="hv-stats">
        <span>
          Entraron hoy{' '}
          <b key={loop} className="nd-mono hd-tick">
            {128 + loop}
          </b>
        </span>
        <span>
          Hora pico <b className="nd-mono">18 h</b>
        </span>
      </div>
    </div>
  )
}

/* Nimbo Display: la pantalla del local pasa de la promo a los precios y al stock, y el panel la ve en línea */
const PANTALLAS = [
  ['PROMO · HASTA LAS 12', '2x1 en cafés', 'Con cualquier medialuna'],
  ['PRECIOS · DESDE LA PLANILLA', null, null],
  ['STOCK · EN VIVO', 'Últimas 3 tortas', 'Llevala antes de que se termine'],
]
const MENU = [
  ['Café con leche', '$3.200'],
  ['Tostado J y Q', '$6.900'],
  ['Jugo de naranja', '$4.100'],
]
export function DisplayDemo() {
  const [ref, s] = useSteps([2600, 2600, 2600])
  const [k, t, d] = PANTALLAS[s]
  return (
    <div className="hdi" ref={ref}>
      <div className="hdi-tv">
        <div key={s} className="hdi-slide">
          <span className="nd-mono hdi-k">{k}</span>
          {t ? (
            <>
              <b>{t}</b>
              <span>{d}</span>
            </>
          ) : (
            <ul className="hdi-menu">
              {MENU.map(([n, p]) => (
                <li key={n}>
                  {n}
                  <span className="nd-mono">{p}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="hdi-stand" aria-hidden="true" />
      <div className="hdi-status nd-mono">
        <span className="nd-on">Sucursal Centro · en línea</span>
        <span>
          {s + 1}/{PANTALLAS.length}
        </span>
      </div>
    </div>
  )
}

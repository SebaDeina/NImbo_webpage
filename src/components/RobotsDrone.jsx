import { useEffect, useMemo, useRef, useState } from 'react'

/* ---------------------------------------------------------------------------------------------
   Piezas del informe /robots que hablan del dron:
   - RoutePlanner: planificador de recorrido por cobertura. Es un cálculo real (geometría), no IA.
   --------------------------------------------------------------------------------------------- */

/* ---------- planificador de recorrido ---------- */

/* Potrero convexo, en metros. Origen arriba a la izquierda. */
const FIELD = [
  [70, 46],
  [510, 18],
  [598, 150],
  [566, 318],
  [280, 380],
  [44, 306],
]
const HOME = [22, 24]
const VB_W = 640
const VB_H = 410

// supuestos (se muestran bajo el planificador)
const FOV_DEG = 75 // campo visual horizontal de la cámara
const SENSOR_PX = 4000 // ancho de la imagen del dron
const MODEL_PX = 1280 // ancho con el que trabaja el detector
const COW_M = 2.4 // largo de una vaca vista desde arriba
const BATTERY_MIN = 20 // vuelo útil por batería
const FRONT_OVERLAP = 0.7 // solapamiento entre fotos consecutivas

function polyArea(p) {
  let a = 0
  for (let i = 0; i < p.length; i++) {
    const [x1, y1] = p[i]
    const [x2, y2] = p[(i + 1) % p.length]
    a += x1 * y2 - x2 * y1
  }
  return Math.abs(a) / 2
}

/* Cruces de una recta horizontal y con el polígono: devuelve [xmin, xmax] o null. */
function rowSpan(poly, y) {
  const xs = []
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i]
    const [x2, y2] = poly[(i + 1) % poly.length]
    if ((y1 <= y && y < y2) || (y2 <= y && y < y1)) xs.push(x1 + ((y - y1) * (x2 - x1)) / (y2 - y1))
  }
  if (xs.length < 2) return null
  return [Math.min(...xs), Math.max(...xs)]
}

export function planRoute({ alt, overlap, speed }) {
  const swath = 2 * alt * Math.tan((FOV_DEG * Math.PI) / 360)
  const spacing = swath * (1 - overlap / 100)
  const ys = FIELD.map((p) => p[1])
  const y0 = Math.min(...ys)
  const y1 = Math.max(...ys)
  const lines = Math.max(1, Math.ceil((y1 - y0) / spacing))
  const step = (y1 - y0) / lines

  const pts = []
  let sweepLen = 0
  for (let k = 0; k < lines; k++) {
    const y = y0 + (k + 0.5) * step
    const span = rowSpan(FIELD, y)
    if (!span) continue
    const [a, b] = k % 2 ? [span[1], span[0]] : [span[0], span[1]]
    pts.push([a, y], [b, y])
    sweepLen += Math.abs(b - a)
  }
  const route = [HOME, ...pts, HOME]
  let dist = 0
  for (let i = 1; i < route.length; i++) dist += Math.hypot(route[i][0] - route[i - 1][0], route[i][1] - route[i - 1][1])

  const minutes = dist / speed / 60
  const trigger = swath * 0.75 * (1 - FRONT_OVERLAP) // metros entre fotos (imagen 4:3)
  const gsd = swath / SENSOR_PX // metros por píxel
  const cowPx = COW_M / gsd
  const cowModelPx = cowPx * (MODEL_PX / SENSOR_PX)
  return {
    swath,
    lines: pts.length / 2,
    route,
    dist,
    minutes,
    batteries: Math.max(1, Math.ceil(minutes / BATTERY_MIN)),
    photos: Math.ceil(sweepLen / trigger),
    hectares: polyArea(FIELD) / 10000,
    cowModelPx,
  }
}

function cowVerdict(px) {
  if (px >= 48) return ['ok', 'Se ve bien']
  if (px >= 32) return ['maq', 'Justo']
  return ['bad', 'Muy chica']
}

const fmt = (n, d = 0) => n.toLocaleString('es-AR', { maximumFractionDigits: d, minimumFractionDigits: d })

export function RoutePlanner() {
  const [alt, setAlt] = useState(60)
  const [overlap, setOverlap] = useState(30)
  const [speed, setSpeed] = useState(8)
  const plan = useMemo(() => planRoute({ alt, overlap, speed }), [alt, overlap, speed])

  const d = useMemo(() => plan.route.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(''), [plan])
  const pathRef = useRef(null)
  const doneRef = useRef(null)
  const droneRef = useRef(null)
  const swathRef = useRef(null)

  // el dron recorre la ruta en un ciclo de 14 s; con "reducir movimiento" queda la ruta completa
  useEffect(() => {
    const path = pathRef.current
    const done = doneRef.current
    if (!path || !done) return
    const len = path.getTotalLength()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const place = (p) => {
      const pt = path.getPointAtLength(p * len)
      done.style.strokeDasharray = `${p * len} ${len + 10}`
      droneRef.current?.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`)
      const r = plan.swath / 2
      swathRef.current?.setAttribute('x', (pt.x - r).toFixed(1))
      swathRef.current?.setAttribute('y', (pt.y - r * 0.75).toFixed(1))
    }
    if (reduce) {
      place(1)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const loop = (t) => {
      const p = (((t - t0) % 15000) / 15000) * 1.06
      place(Math.min(1, p))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [plan])

  const [vk, vt] = cowVerdict(plan.cowModelPx)
  const r = plan.swath / 2

  return (
    <div className="rb-planner">
      <div className="rb-map">
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} role="img" aria-label="Mapa de un potrero con la ruta de vuelo del dron en pasadas paralelas">
          <rect x="0" y="0" width={VB_W} height={VB_H} fill="var(--paper)" />
          <rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#hl)" opacity=".1" />
          <polygon points={FIELD.map((p) => p.join(',')).join(' ')} fill="url(#hd)" fillOpacity=".18" stroke="var(--ink)" strokeWidth="1.8" />
          <rect ref={swathRef} x="0" y="0" width={plan.swath} height={plan.swath * 0.75} fill="var(--brand)" opacity=".18" stroke="var(--brand)" strokeWidth="1" strokeDasharray="3 3" clipPath="none" />
          <path ref={pathRef} d={d} fill="none" stroke="var(--ink)" strokeWidth="1.3" strokeDasharray="4 5" opacity=".55" />
          <path ref={doneRef} d={d} fill="none" stroke="var(--brand)" strokeWidth="2.6" strokeLinejoin="round" />
          {plan.route.slice(1, -1).map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
          ))}
          {/* punto de despegue */}
          <g transform={`translate(${HOME[0]} ${HOME[1]})`}>
            <rect x="-9" y="-9" width="18" height="18" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
            <text x="0" y="4.5" fontSize="12" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: "'EB Garamond',serif", fontWeight: 600 }}>
              H
            </text>
          </g>
          <g ref={droneRef} transform={`translate(${HOME[0]} ${HOME[1]})`}>
            <circle r="9" fill="var(--ink)" />
            <path d="M-13 -7l7 4M13 -7l-7 4M-13 7l7-4M13 7l-7-4" stroke="var(--ink)" strokeWidth="2" />
            <circle r="3" fill="var(--paper)" />
          </g>
          <text x={VB_W - 10} y={VB_H - 10} fontSize="13" textAnchor="end" fill="var(--ink)" style={{ fontFamily: "'EB Garamond',serif", fontStyle: 'italic' }}>
            Ancho de cada pasada: {fmt(plan.swath, 0)} m · {fmt(plan.hectares, 1)} ha
          </text>
        </svg>
      </div>

      <div className="rb-ctrl">
        <label>
          <span>
            Altura de vuelo <b>{alt} m</b>
          </span>
          <input type="range" min="30" max="120" step="5" value={alt} onChange={(e) => setAlt(+e.target.value)} />
        </label>
        <label>
          <span>
            Solapamiento entre pasadas <b>{overlap} %</b>
          </span>
          <input type="range" min="10" max="70" step="5" value={overlap} onChange={(e) => setOverlap(+e.target.value)} />
        </label>
        <label>
          <span>
            Velocidad <b>{speed} m/s</b>
          </span>
          <input type="range" min="3" max="15" step="1" value={speed} onChange={(e) => setSpeed(+e.target.value)} />
        </label>
      </div>

      <div className="rb-plates rb-plates-6">
        <div className="rb-plate">
          <b>{plan.lines}</b>
          <span>pasadas</span>
          <i>{plan.route.length - 2} puntos de ruta</i>
        </div>
        <div className="rb-plate">
          <b>{fmt(plan.dist / 1000, 2)} km</b>
          <span>de recorrido</span>
          <i>ida y vuelta al despegue</i>
        </div>
        <div className="rb-plate">
          <b>{fmt(plan.minutes, 1)} min</b>
          <span>de vuelo</span>
          <i>
            {plan.batteries} {plan.batteries === 1 ? 'batería' : 'baterías'}
          </i>
        </div>
        <div className="rb-plate">
          <b>{fmt(plan.photos)}</b>
          <span>fotos</span>
          <i>una cada {fmt(plan.swath * 0.75 * (1 - FRONT_OVERLAP), 0)} m</i>
        </div>
        <div className={`rb-plate rb-cow v-${vk}`}>
          <b>~{fmt(plan.cowModelPx, 0)} px</b>
          <span>mide una vaca para el detector</span>
          <i>{vt}</i>
        </div>
      </div>
    </div>
  )
}

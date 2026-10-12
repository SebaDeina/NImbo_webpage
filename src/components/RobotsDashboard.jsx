import { useEffect, useMemo, useRef, useState } from 'react'

/* ---------------------------------------------------------------------------------------------
   Tablero de métricas del informe /robots.
   Todas las curvas salen del conteo REAL del video de dron (public/robots/dashboard.json, que
   exporta ganado_demo.py). Lo que no existe todavía (histórico por día, alertas) se muestra
   como tarjeta vacía y rotulada "Propuesto": no se inventan números.
   --------------------------------------------------------------------------------------------- */

const CW = 640
const CH = 250
const ML = 40
const MR = 16
const MT = 14
const MB = 32

const fmt = (n, d = 0) => n.toLocaleString('es-AR', { maximumFractionDigits: d, minimumFractionDigits: d })

/* promedio de cada segundo de video */
function perSecond(arr, fps) {
  const out = []
  const n = Math.ceil(arr.length / fps)
  for (let s = 0; s < n; s++) {
    const seg = arr.slice(Math.floor(s * fps), Math.floor((s + 1) * fps))
    if (seg.length) out.push(seg.reduce((a, b) => a + b, 0) / seg.length)
  }
  return out
}

function Chart({ visibles, unicos, secs }) {
  const maxV = Math.max(...unicos, ...visibles)
  const top = Math.ceil(maxV / 25) * 25
  const x = (s) => ML + (s / Math.max(1, secs - 1)) * (CW - ML - MR)
  const y = (v) => MT + (1 - v / top) * (CH - MT - MB)
  const line = (a) => a.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join('')
  const area = `${line(visibles)}L${x(secs - 1).toFixed(1)} ${y(0)}L${x(0).toFixed(1)} ${y(0)}Z`
  const yTicks = Array.from({ length: top / 25 + 1 }, (_, i) => i * 25)
  const xTicks = [0, 5, 10, 15, secs - 1]
  const last = unicos[unicos.length - 1]

  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} role="img" aria-label={`Gráfico: animales visibles por segundo (entre ${fmt(Math.min(...visibles))} y ${fmt(Math.max(...visibles))}) y animales únicos acumulados, que llegan a ${fmt(last)}`}>
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={ML} x2={CW - MR} y1={y(t)} y2={y(t)} stroke="var(--ink)" strokeWidth={t === 0 ? 1.4 : 0.6} opacity={t === 0 ? 0.8 : 0.22} />
          <text x={ML - 8} y={y(t) + 4} fontSize="12" textAnchor="end" fill="var(--ink)" style={{ fontFamily: "'EB Garamond',serif" }}>
            {t}
          </text>
        </g>
      ))}
      {xTicks.map((t) => (
        <text key={t} x={x(t)} y={CH - 10} fontSize="12" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: "'EB Garamond',serif" }}>
          {t} s
        </text>
      ))}
      <path d={area} fill="url(#hd)" opacity=".28" />
      <path className="rb-line" pathLength="1" d={line(visibles)} fill="none" stroke="var(--ink)" strokeWidth="1.8" />
      <path className="rb-line rb-line-b" pathLength="1" d={line(unicos)} fill="none" stroke="var(--brand)" strokeWidth="3" strokeLinejoin="round" />
      {unicos.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="2.8" fill="var(--paper)" stroke="var(--brand)" strokeWidth="1.6" />
      ))}
      <text x={x(secs - 1) - 8} y={y(last) - 10} fontSize="13" textAnchor="end" fill="var(--brand)" fontWeight="600" style={{ fontFamily: "'EB Garamond',serif" }}>
        {fmt(last)} y subiendo
      </text>
    </svg>
  )
}

function Heat({ heat }) {
  const { cols, rows, data } = heat
  const max = Math.max(...data.flat())
  return (
    <div className="rb-heat" style={{ backgroundImage: 'url(/robots/dron-raw.jpg)' }} role="img" aria-label="Mapa de calor de dónde estaban los animales en la imagen del dron">
      <svg viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="none">
        {data.map((row, r) =>
          row.map((v, c) =>
            v > max * 0.012 ? <rect key={`${r}-${c}`} x={c} y={r} width="1.02" height="1.02" fill="var(--brand)" opacity={(0.08 + Math.pow(v / max, 0.55) * 0.7).toFixed(2)} /> : null,
          ),
        )}
      </svg>
    </div>
  )
}

export default function RobotsDashboard() {
  const [d, setD] = useState(null)
  const [err, setErr] = useState(false)
  const chartRef = useRef(null)

  useEffect(() => {
    let live = true
    fetch('/robots/dashboard.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => live && setD(j))
      .catch(() => live && setErr(true))
    return () => {
      live = false
    }
  }, [])

  const m = useMemo(() => {
    if (!d) return null
    const vis = perSecond(d.visibles, d.fps)
    const uni = perSecond(d.unicos_acumulados, d.fps)
    return {
      vis,
      uni,
      secs: vis.length,
      unicas: d.unicos_acumulados[d.unicos_acumulados.length - 1],
      prom: d.visibles.reduce((a, b) => a + b, 0) / d.visibles.length,
      max: Math.max(...d.visibles),
      min: Math.min(...d.visibles),
      dur: d.frames / d.fps,
    }
  }, [d])

  // el gráfico se dibuja al entrar en pantalla (los datos llegan después de montar la página)
  useEffect(() => {
    const el = chartRef.current
    if (!m || !el) return
    if (!('IntersectionObserver' in window)) return el.classList.add('in')
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [m])

  if (err) return <p className="rb-dash-msg">No se pudieron cargar las métricas del video.</p>
  if (!m) return <p className="rb-dash-msg">Cargando métricas…</p>

  return (
    <div className="rb-dash">
      <div className="rb-kpis">
        <div className="rb-plate">
          <b>{fmt(m.unicas)}</b>
          <span>animales únicos</span>
          <i>los que se sostuvieron {d.min_frames} cuadros</i>
        </div>
        <div className="rb-plate">
          <b>{fmt(m.prom)}</b>
          <span>visibles por cuadro</span>
          <i>
            entre {fmt(m.min)} y {fmt(m.max)}
          </i>
        </div>
        <div className="rb-plate">
          <b>{fmt(d.confianza_media * 100)} %</b>
          <span>confianza media</span>
          <i>de las detecciones</i>
        </div>
        <div className="rb-plate">
          <b>{fmt(m.dur)} s</b>
          <span>de vuelo</span>
          <i>{fmt(d.frames)} cuadros</i>
        </div>
      </div>

      <div className="rb-dash-row">
        <div className="rb-tile">
          <h4>Animales durante el vuelo</h4>
          <p className="rb-sub">
            <span className="k b" /> únicos acumulados <span className="k i" /> visibles a la vez
          </p>
          <div className="rb-chart" ref={chartRef}>
            <Chart visibles={m.vis} unicos={m.uni} secs={m.secs} />
          </div>
          <p className="rb-insight">
            Los visibles se mantienen estables, pero los únicos siguen subiendo hasta el final: el recorrido todavía estaba descubriendo
            animales. Cuando la curva se aplana, el dron ya vio todo el rebaño.
          </p>
        </div>

        <div className="rb-tile">
          <h4>Dónde estaban</h4>
          <p className="rb-sub">Posición de los animales en la imagen del dron</p>
          <Heat heat={d.heat} />
          <p className="rb-insight">
            Es posición en la imagen, no en un mapa. Para ubicarlos en el campo hace falta la telemetría del vuelo (GPS y altura).
          </p>
        </div>
      </div>

      <div className="rb-dash-row rb-dash-row-2">
        <div className="rb-tile empty">
          <div className="rb-card-top">
            <h4>Evolución por día</h4>
            <em className="rb-tag t-prop">Propuesto</em>
          </div>
          <p className="rb-insight">
            El conteo de cada día en una línea, para ver si el rodeo crece, se mantiene o baja. Se arma con vuelos repetidos; hoy hay uno.
          </p>
        </div>
        <div className="rb-tile empty">
          <div className="rb-card-top">
            <h4>Alertas y faltantes</h4>
            <em className="rb-tag t-prop">Propuesto</em>
          </div>
          <p className="rb-insight">
            “Hoy faltan 3 animales respecto de ayer”, con el sector donde se vieron por última vez. Necesita guardar cada vuelo y compararlos.
          </p>
        </div>
      </div>
    </div>
  )
}

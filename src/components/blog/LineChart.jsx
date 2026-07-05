/*
  Gráfico de líneas (una serie) en SVG con viewBox, así escala responsivo sin JS.
  Los colores salen de las variables CSS del sitio (se adapta a claro/oscuro).
  Uso desde el contenido del post:
    :::line
    { "title": "Adopción de IA en pymes", "unit": "%", "data": [["2022", 20], ["2024", 48], ["2026", 75]] }
    :::
*/
export default function LineChart({ title, data = [], unit = '', note }) {
  const W = 640
  const H = 280
  const padX = 44
  const padTop = 24
  const padBottom = 40

  const values = data.map((d) => Number(d[1]) || 0)
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = max - min || 1
  const innerW = W - padX * 2
  const innerH = H - padTop - padBottom
  const stepX = data.length > 1 ? innerW / (data.length - 1) : 0

  const points = data.map((d, i) => {
    const x = padX + i * stepX
    const y = padTop + innerH - ((Number(d[1]) - min) / range) * innerH
    return [x, y]
  })

  const line = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(' ')
  const last = points[points.length - 1] || [padX, padTop + innerH]
  const first = points[0] || [padX, padTop + innerH]
  const area = `${line} L${last[0].toFixed(1)},${padTop + innerH} L${first[0].toFixed(1)},${padTop + innerH} Z`
  const baseline = padTop + innerH

  return (
    <figure className="blog-viz blog-line">
      {title && <figcaption className="blog-viz-title">{title}</figcaption>}
      <svg
        className="blog-line-svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={title || 'Gráfico de líneas'}
        preserveAspectRatio="xMidYMid meet"
      >
        <line className="blog-line-axis" x1={padX} y1={baseline} x2={W - padX} y2={baseline} />
        {area && <path className="blog-line-area" d={area} />}
        {line && <path className="blog-line-path" d={line} />}
        {points.map((p, i) => (
          <g key={i}>
            <circle className="blog-line-dot" cx={p[0]} cy={p[1]} r="4.5" />
            <text className="blog-line-val" x={p[0]} y={p[1] - 12} textAnchor="middle">
              {data[i][1]}
              {unit}
            </text>
            <text className="blog-line-label" x={p[0]} y={baseline + 22} textAnchor="middle">
              {data[i][0]}
            </text>
          </g>
        ))}
      </svg>
      {note && <p className="blog-viz-note">{note}</p>}
    </figure>
  )
}

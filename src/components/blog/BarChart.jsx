/*
  Gráfico de barras horizontales. HTML/CSS puro: los valores son texto real en
  el DOM (bueno para SEO y accesibilidad) y escala perfecto en mobile.
  Uso desde el contenido del post:
    :::bar
    { "title": "Consultas mensuales", "unit": "", "data": [["Solo redes", 100], ["Con web", 170]] }
    :::
*/
export default function BarChart({ title, data = [], unit = '', note }) {
  const max = Math.max(...data.map((d) => Number(d[1]) || 0), 1)

  return (
    <figure className="blog-viz blog-bar">
      {title && <figcaption className="blog-viz-title">{title}</figcaption>}
      <div className="blog-bar-rows" role="img" aria-label={title || 'Gráfico de barras'}>
        {data.map(([label, value], i) => {
          const pct = (Number(value) / max) * 100
          const highlight = i === data.length - 1
          return (
            <div className="blog-bar-row" key={i}>
              <span className="blog-bar-label">{label}</span>
              <span className="blog-bar-track">
                <span
                  className={`blog-bar-fill${highlight ? ' is-highlight' : ''}`}
                  style={{ width: `${Math.max(pct, 2)}%` }}
                />
              </span>
              <span className="blog-bar-value">
                {value}
                {unit}
              </span>
            </div>
          )
        })}
      </div>
      {note && <p className="blog-viz-note">{note}</p>}
    </figure>
  )
}

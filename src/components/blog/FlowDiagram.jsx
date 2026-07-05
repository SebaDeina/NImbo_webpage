/*
  Diagrama de flujo / pasos: lista ordenada semántica (<ol>) con números y
  conectores dibujados por CSS. Todo el contenido es texto real → suma SEO.
  Uso desde el contenido del post:
    :::flow
    { "title": "Cómo empezar", "steps": [
      { "title": "Auditá tu tiempo", "text": "Registrá una semana qué tareas repetís." },
      { "title": "Elegí una sola cosa", "text": "Automatizá bien antes de pasar a la siguiente." }
    ] }
    :::
*/
export default function FlowDiagram({ title, steps = [], note }) {
  return (
    <figure className="blog-viz blog-flow">
      {title && <figcaption className="blog-viz-title">{title}</figcaption>}
      <ol className="blog-flow-steps">
        {steps.map((step, i) => (
          <li className="blog-flow-step" key={i}>
            <span className="blog-flow-num" aria-hidden="true">
              {i + 1}
            </span>
            <div className="blog-flow-body">
              <h4 className="blog-flow-step-title">{step.title}</h4>
              {step.text && <p className="blog-flow-step-text">{step.text}</p>}
            </div>
          </li>
        ))}
      </ol>
      {note && <p className="blog-viz-note">{note}</p>}
    </figure>
  )
}

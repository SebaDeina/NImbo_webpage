// Página de un servicio, con la estructura de shipperslab.tech/sistemas-de-gestion: título centrado con la
// figura animada, qué resolvemos, ejemplos reales con pestañas, para quién, cómo se ve en distintos
// negocios, cómo trabajamos y cómo se cotiza, y los otros servicios.
import { useState } from 'react'
import Fig from './Fig'
import { AREAS, PASOS_SERVICIO, PROYECTOS_URL } from './data'
import { FIGS } from './scenes'
import Showcase from './Showcase'
import { Arrow, Final, Icon } from './ui'
import { Words } from './motion'

export default function Service({ area }) {
  const p = area.page
  const otros = AREAS.filter((a) => a.slug !== area.slug)
  return (
    <>
      <section className="sv-hero wrap">
        <a href="/#servicios" className="crumb mono" data-reveal>← Servicios</a>
        <h1 data-reveal>{p.title}</h1>
        <p className="lead words" data-reveal style={{ '--d': '80ms' }}><Words>{p.lead}</Words></p>
        <div className="btns" data-reveal style={{ '--d': '160ms' }}>
          <a className="btn btn-acc" href={`/contacto?s=${area.slug}`}>Contanos tu caso <Arrow /></a>
          <a className="btn" href="#ejemplos">Ver ejemplos <Arrow /></a>
        </div>
        <div className="fig sv-fig" data-reveal style={{ '--d': '220ms' }}>
          <Fig component={FIGS[area.fig].C} meta={FIGS[area.fig].meta} className="fig-player" />
        </div>
      </section>

      <div className="frame">
        <section className="sec wrap sv-split">
          <h2 data-reveal>Qué resolvemos.</h2>
          <div data-reveal style={{ '--d': '100ms' }}>
            <p className="sv-text">{p.resolvemos}</p>
            <ul className="tags">
              {p.tags.map((t) => <li key={t}><span className="tag-dot" />{t}</li>)}
            </ul>
          </div>
        </section>

        {area.slug === 'software-a-medida' && <Showcase />}

        <section className="sec wrap" id="ejemplos" data-buddy="¿Querés algo así para tu negocio?">
          <Ejemplos list={p.ejemplos} />
        </section>

        <section className="sec wrap">
          <div className="sec-head" data-reveal>
            <div>
              <h2>Para quién.</h2>
              <p className="lead">Si alguna de estas te suena, arrancamos por ahí.</p>
            </div>
          </div>
          <ul className="para">
            {p.para.map(([t, d], i) => (
              <li key={t} data-reveal style={{ '--d': `${i * 80}ms` }}>
                <span className="mono">0{i + 1}</span>
                <h4>{t}</h4>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="sec wrap">
          <Negocios list={p.negocios} icon={area.icon} />
        </section>

        {(p.mas ?? []).map(([h, paras]) => (
          <section key={h} className="sec wrap ld-sec">
            <div className="ld-head" data-reveal><h2>{h}</h2></div>
            <div className="ld-body" data-reveal style={{ '--d': '100ms' }}>
              {paras.map((t) => <p key={t.slice(0, 40)}><Linked text={t} /></p>)}
            </div>
          </section>
        ))}

        <section className="sec wrap sv-split">
          <div data-reveal>
            <h2>Cómo trabajamos y cómo se cotiza.</h2>
            <div className="price">
              <b>Cómo se paga</b>
              <p>{p.precio}</p>
            </div>
          </div>
          <ol className="timeline" data-reveal style={{ '--d': '100ms' }}>
            {PASOS_SERVICIO.map(([t, d], i) => (
              <li key={t}><span className="mono">0{i + 1}</span><div><h4>{t}</h4><p>{d}</p></div></li>
            ))}
          </ol>
        </section>

        {p.faq && (
          <section id="faq" className="sec wrap">
            <div className="faq-grid">
              <div data-reveal>
                <h2 className="faq-title">Preguntas frecuentes.</h2>
                <p className="lead">¿Te quedó otra? <a className="link" href={`/contacto?s=${area.slug}`}>Escribinos</a> o <a className="link" href="/agendar">agendá 20 minutos</a>.</p>
              </div>
              <div className="faq" data-reveal style={{ '--d': '100ms' }}>
                {p.faq.map(([q, a], i) => (
                  <details key={q} open={i === 0}><summary>{q}</summary><p><Linked text={a} /></p></details>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="sec wrap">
          <div className="sec-head" data-reveal><div><h2>Otros servicios.</h2></div></div>
          <div className="others">
            {otros.map((a, i) => (
              <a key={a.slug} href={a.path} className="other" data-reveal style={{ '--d': `${i * 80}ms` }}>
                <span className="chip chip-sm"><Icon d={a.icon} /></span>
                <h4>{a.t}</h4>
                <p>{a.d}</p>
                <span className="other-go">Ver más <Arrow /></span>
              </a>
            ))}
          </div>
        </section>

        <Final title="Contanos tu caso." s={area.slug} />
      </div>
    </>
  )
}

function Ejemplos({ list }) {
  const [k, setK] = useState(0)
  const [img, setImg] = useState(0)
  const ej = list[k]
  const pick = (i) => { setK(i); setImg(0) }
  return (
    <div className="ej" data-reveal>
      <div className="ej-copy">
        <h2>Ejemplos reales.</h2>
        <div className="ej-tabs" role="tablist">
          {list.map((e, i) => (
            <button key={e.t} role="tab" aria-selected={i === k} className={i === k ? 'on' : ''} onClick={() => pick(i)}>{e.t}</button>
          ))}
        </div>
        <div key={ej.t} className="ej-body">
          <span className="mono">{ej.client}</span>
          <h3>{ej.t}</h3>
          <p>{ej.d}</p>
          {ej.url && <a className="link" href={`${PROYECTOS_URL}#${ej.slug}`}>Ver el proyecto</a>}
        </div>
      </div>
      <div className="ej-media">
        {ej.imgs.length > 1 && (
          <div className="ej-sub">
            {ej.imgs.map(([label], i) => (
              <button key={label} className={i === img ? 'on' : ''} onClick={() => setImg(i)}>{label}</button>
            ))}
          </div>
        )}
        <div className="ej-shot">
          <img key={ej.imgs[img][1]} src={ej.imgs[img][1]} alt={`${ej.t}: ${ej.imgs[img][0]}`} />
        </div>
      </div>
    </div>
  )
}

function Negocios({ list, icon }) {
  const [k, setK] = useState(0)
  return (
    <div className="neg" data-reveal>
      <h2>Cómo se ve en distintos negocios.</h2>
      <div className="neg-tabs" role="tablist">
        {list.map(([t], i) => (
          <button key={t} role="tab" aria-selected={i === k} className={i === k ? 'on' : ''} onClick={() => setK(i)}>{t}</button>
        ))}
      </div>
      <div key={k} className="neg-card">
        <span className="chip chip-sq"><Icon d={icon} /></span>
        <div>
          <h3>{list[k][0]}</h3>
          <p>{list[k][1]}</p>
        </div>
      </div>
    </div>
  )
}

// Texto con enlaces en formato [texto](/ruta), para las secciones extra y las preguntas frecuentes.
export function Linked({ text }) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    return m ? <a key={i} className="link" href={m[2]}>{m[1]}</a> : part
  })
}

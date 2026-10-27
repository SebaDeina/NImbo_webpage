// /blog · índice de artículos con el estilo simple: el último destacado y el resto en filas, con filtro por
// categoría. Cada artículo abre su página (BlogPost.jsx).
import { useState } from 'react'
import { POSTS } from './blog-posts'
import { Arrow } from './ui'
import { Words } from './motion'

export const POST_URL = (slug) => `/blog/${slug}`
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
export const fecha = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MESES[m - 1]} ${y}` }

export default function Blog() {
  const cats = ['Todos', ...new Set(POSTS.map((p) => p.category))]
  const [cat, setCat] = useState('Todos')
  const [first, ...rest] = POSTS
  const list = cat === 'Todos' ? rest : POSTS.filter((p) => p.category === cat)

  return (
    <>
      <section className="cs-hero wrap">
        <h1 data-reveal>Ideas que hacen crecer negocios.</h1>
        <p className="lead words" data-reveal style={{ '--d': '80ms' }}><Words>Web, automatización e IA explicadas sin rodeos para dueños de negocios argentinos.</Words></p>
      </section>

      <div className="frame">
        <section className="sec wrap">
          {cat === 'Todos' && (
            <a className="bl-feat" href={POST_URL(first.slug)} data-reveal>
              <span className="mono">Último artículo · {fecha(first.date)}</span>
              <h2>{first.title}</h2>
              <p>{first.description}</p>
              <span className="bl-meta">{first.category} · {first.readTime} de lectura</span>
              <span className="btn">Leer el artículo <Arrow /></span>
            </a>
          )}

          <div className="bl-filter" role="tablist" aria-label="Categorías" data-reveal>
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={c === cat} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>

          <ul className="bl-list" key={cat}>
            {list.map((p) => <PostRow key={p.slug} p={p} />)}
          </ul>
        </section>

        <section className="wrap">
          <div className="cs-next" data-reveal>
            <h2>¿Te quedó una duda puntual?</h2>
            <p className="lead">Contanos tu caso y te respondemos con algo concreto para tu negocio, no con un artículo más.</p>
            <a className="btn btn-acc" href="/contacto">Empecemos <Arrow /></a>
          </div>
        </section>
      </div>
    </>
  )
}

export function PostRow({ p }) {
  return (
    <li className="bl-row">
      <a href={POST_URL(p.slug)}>
        <span className="mono bl-date">{fecha(p.date)}</span>
        <div>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
        <span className="bl-cat">{p.category}<small>{p.readTime}</small></span>
        <span className="cs-go" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M3.5 8.5l5-5M4.5 3.5h4v4" /></svg></span>
      </a>
    </li>
  )
}

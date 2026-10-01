import { useState } from 'react'
import { Link } from 'react-router-dom'
import { posts } from '../data/blog'
import PageHero from '../components/g/PageHero'
import { Emblem, useRevealAll } from '../components/g/Art'
import CTA from '../components/CTA'
import { useSeo } from '../hooks/useSeo'

export const EMB_BY_CAT = {
  'Diseño Web': 'I',
  SEO: 'I',
  'Automatización & IA': 'II',
  'Inteligencia Artificial': 'III',
  'Transformación Digital': 'IV',
}
export const fmtDate = (d) =>
  new Date(`${d}T12:00:00`).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })

export function PostCard({ p, short = false }) {
  return (
    <Link className="card rv" to={`/blog/${p.slug}`}>
      <div className="card-in">
        <Emblem n={EMB_BY_CAT[p.category] || 'I'} className="emb" />
        <div className="meta">
          <span className="cat">{p.category}</span>
          <span className="dot">·</span>
          <span>{p.readTime}{short ? '' : ' de lectura'}</span>
        </div>
        <h3>{p.title}</h3>
        <p className="desc">{p.description}</p>
        <div className="foot">
          <span className="date">{fmtDate(p.date)}</span>
          <span className="go">Leer artículo →</span>
        </div>
      </div>
    </Link>
  )
}

export default function Blog() {
  const [cat, setCat] = useState('Todas')
  useSeo({
    title: 'Blog Nimbo — Transformación digital, IA y web para pymes',
    description:
      'Guías prácticas sobre automatización, inteligencia artificial, páginas web y transformación digital para dueños de negocios en Argentina.',
    path: '/blog',
  })
  useRevealAll('.rv', [cat])

  const cats = ['Todas', ...new Set(posts.map((p) => p.category))]
  const [first, ...rest] = posts
  const list = cat === 'Todas' ? rest : posts.filter((p) => p.category === cat)

  return (
    <main className="g-main">
      <PageHero>
        <div className="eyebrow">Blog</div>
        <h1>
          Ideas que hacen <em>crecer negocios</em>
        </h1>
        <p className="hero-sub">Web, automatización e IA explicadas sin rodeos para dueños de negocios argentinos.</p>
      </PageHero>
      <section className="paper blog-body">
        <div className="wrap">
          <div className="chips" role="group" aria-label="Filtrar por categoría">
            {cats.map((c) => (
              <button key={c} type="button" className={`chip${cat === c ? ' on' : ''}`} onClick={() => setCat(c)} aria-pressed={cat === c}>
                {c}
              </button>
            ))}
          </div>
          {cat === 'Todas' && (
            <Link className="feat rv" to={`/blog/${first.slug}`}>
              <Emblem n={EMB_BY_CAT[first.category] || 'I'} className="emb" />
              <div className="txt">
                <div className="meta">
                  <span className="cat">Último artículo · {first.category}</span>
                  <span className="dot">·</span>
                  <span>{first.readTime} de lectura</span>
                </div>
                <h2>{first.title}</h2>
                <p className="desc">{first.description}</p>
                <span className="more">Leer artículo →</span>
              </div>
            </Link>
          )}
          <div className="grid">
            {list.map((p) => (
              <PostCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </main>
  )
}

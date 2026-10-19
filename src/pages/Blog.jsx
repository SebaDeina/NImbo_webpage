import { useState } from 'react'
import { Link } from 'react-router-dom'
import { posts } from '../data/blog'
import { NdFinal, NdPageHero } from '../components/nd/Nd'
import PostVisual from '../components/nd/PostVisual'
import { useSeo } from '../hooks/useSeo'

export const fmtDate = (d) =>
  new Date(`${d}T12:00:00`).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })

export function PostCard({ p }) {
  return (
    <Link className="bl-card" to={`/blog/${p.slug}`}>
      <PostVisual post={p} />
      <h3>{p.title}</h3>
      <span className="bl-meta">
        {p.category} · {fmtDate(p.date)}
      </span>
    </Link>
  )
}

export default function Blog() {
  const [cat, setCat] = useState('Todas')
  useSeo({
    title: 'Blog Nimbo — Automatización e IA para pymes',
    description:
      'Guías prácticas sobre automatización, inteligencia artificial, páginas web y transformación digital para dueños de negocios en Argentina.',
    path: '/blog',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': 'https://www.nimbodata.com/blog#page',
          name: 'Blog de Nimbo',
          description:
            'Guías prácticas sobre automatización, inteligencia artificial, páginas web y transformación digital para dueños de negocios en Argentina.',
          url: 'https://www.nimbodata.com/blog',
          inLanguage: 'es-AR',
          isPartOf: { '@id': 'https://www.nimbodata.com/#website' },
          about: { '@id': 'https://www.nimbodata.com/#business' },
          mainEntity: { '@id': 'https://www.nimbodata.com/blog#articles' },
        },
        {
          '@type': 'ItemList',
          '@id': 'https://www.nimbodata.com/blog#articles',
          numberOfItems: posts.length,
          itemListElement: posts.map((p, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: 'https://www.nimbodata.com/blog/' + p.slug,
            item: {
              '@type': 'BlogPosting',
              '@id': 'https://www.nimbodata.com/blog/' + p.slug + '#article',
              headline: p.title,
              description: p.description,
              datePublished: p.date,
              articleSection: p.category,
              inLanguage: 'es-AR',
              author: { '@id': 'https://www.nimbodata.com/#business' },
              publisher: { '@id': 'https://www.nimbodata.com/#business' },
            },
          })),
        },
      ],
    },
  })

  const cats = ['Todas', ...new Set(posts.map((p) => p.category))]
  const [first, ...rest] = posts
  const list = cat === 'Todas' ? rest : posts.filter((p) => p.category === cat)

  return (
    <main className="nd-page-main">
      <NdPageHero eyebrow="Blog" title="Ideas que hacen crecer negocios">
        <p>Web, automatización e IA explicadas sin rodeos para dueños de negocios argentinos.</p>
      </NdPageHero>
      <section className="nd-wrap bl-body">
        {cat === 'Todas' && (
          <Link className="bl-feat" to={`/blog/${first.slug}`}>
            <PostVisual post={first} />
            <div className="bl-feat-txt">
              <span className="bl-meta">Último artículo · {fmtDate(first.date)}</span>
              <h2>{first.title}</h2>
              <p>{first.description}</p>
              <span className="nd-more">Leer artículo →</span>
            </div>
          </Link>
        )}
        <div className="nd-chips" role="group" aria-label="Filtrar por categoría">
          {cats.map((c) => (
            <button key={c} type="button" className="au-chip" onClick={() => setCat(c)} aria-pressed={cat === c}>
              {c}
            </button>
          ))}
        </div>
        <div className="bl-grid">
          {list.map((p) => (
            <PostCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
      <NdFinal />
    </main>
  )
}

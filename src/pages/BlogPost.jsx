import { useParams, Link, Navigate } from 'react-router-dom'
import { getPost, posts } from '../data/blog'
import { useSeo } from '../hooks/useSeo'
import { BlogContent } from '../lib/blog-render'
import PageHero from '../components/g/PageHero'
import { Emblem, useRevealAll } from '../components/g/Art'
import CTA from '../components/CTA'
import { EMB_BY_CAT, fmtDate, PostCard } from './Blog'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  useSeo(
    post
      ? {
          title: `${post.title} | Nimbo`,
          description: post.description,
          path: `/blog/${post.slug}`,
          type: 'article',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            articleSection: post.category,
            inLanguage: 'es-AR',
            author: { '@type': 'Organization', name: 'Nimbo' },
            publisher: { '@type': 'Organization', name: 'Nimbo', url: 'https://www.nimbodata.com' },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.nimbodata.com/blog/${post.slug}` },
          },
        }
      : {},
  )
  useRevealAll('.rv', [slug])

  if (!post) return <Navigate to="/blog" replace />

  const others = [
    ...posts.filter((p) => p.slug !== slug && p.category === post.category),
    ...posts.filter((p) => p.slug !== slug && p.category !== post.category),
  ].slice(0, 2)

  return (
    <main className="g-main">
      <PageHero className="art-hero">
        <Link className="back" to="/blog">← Blog</Link>
        <Emblem n={EMB_BY_CAT[post.category] || 'I'} className="emb" />
        <div className="meta">
          <span className="cat">{post.category}</span>
          <span className="dot">·</span>
          <span>{post.readTime} de lectura</span>
          <span className="dot">·</span>
          <span>{fmtDate(post.date)}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="hero-sub">{post.description}</p>
      </PageHero>
      <div className="paper">
        <div className="wrap">
          <article className="art">
            <BlogContent content={post.content} />
          </article>
        </div>
        {others.length > 0 && (
          <section className="related wrap">
            <h2>Seguir leyendo</h2>
            <div className="grid">
              {others.map((p) => (
                <PostCard key={p.slug} p={p} />
              ))}
            </div>
          </section>
        )}
      </div>
      <CTA />
    </main>
  )
}

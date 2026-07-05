import { useParams, Link, Navigate } from 'react-router-dom'
import { getPost, posts } from '../data/blog'
import Reveal from '../components/Reveal'
import { useSeo } from '../hooks/useSeo'
import { BlogContent } from '../lib/blog-render'

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
            publisher: {
              '@type': 'Organization',
              name: 'Nimbo',
              url: 'https://www.nimbodata.com',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://www.nimbodata.com/blog/${post.slug}`,
            },
          },
        }
      : {},
  )

  if (!post) return <Navigate to="/blog" replace />

  const others = posts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <main className="page blog-post-page">
      <div className="blog-hero-glow" aria-hidden="true" />
      <div className="wrap wrap-narrow">
        <Reveal as="div" className="blog-post-meta">
          <Link to="/blog" className="blog-back">← Blog</Link>
          <span className="blog-category">{post.category}</span>
          <span className="blog-read-time">{post.readTime} de lectura</span>
        </Reveal>

        <Reveal as="h1" delay={1} className="blog-post-title">
          {post.title}
        </Reveal>

        <Reveal as="p" delay={2} className="blog-post-lead">
          {post.description}
        </Reveal>

        <Reveal delay={3}>
          <article className="blog-post-body">
            <BlogContent content={post.content} />
          </article>
        </Reveal>

        {others.length > 0 && (
          <Reveal delay={4} as="section" className="blog-related">
            <h2 className="blog-related-title">Seguir leyendo</h2>
            <div className="blog-grid blog-grid-sm">
              {others.map((p) => (
                <article key={p.slug} className="blog-card">
                  <Link to={`/blog/${p.slug}`} className="blog-card-link">
                    <div className="blog-card-meta">
                      <span className="blog-category">{p.category}</span>
                      <span className="blog-read-time">{p.readTime}</span>
                    </div>
                    <h3 className="blog-card-title">{p.title}</h3>
                    <p className="blog-card-desc">{p.description}</p>
                    <span className="blog-card-cta">Leer artículo →</span>
                  </Link>
                </article>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </main>
  )
}

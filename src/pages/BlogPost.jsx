import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getPost, posts } from '../data/blog'
import Reveal from '../components/Reveal'

function renderMarkdown(md) {
  // Headings
  let html = md
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  // Inline links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  // HR
  html = html.replace(/^---$/gm, '<hr />')
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>[\s\S]+?<\/li>)/g, (m) => `<ul>${m}</ul>`)
  // Fix nested ul wrapping
  html = html.replace(/<\/ul>\n<ul>/g, '')
  // Paragraphs: wrap non-tagged lines
  html = html
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (/^<(h[2-3]|ul|hr|li)/.test(trimmed)) return trimmed
      return `<p>${trimmed.replace(/\n/g, ' ')}</p>`
    })
    .join('\n')
  return html
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  useEffect(() => {
    if (post) document.title = `${post.title} | Nimbo`
    return () => { document.title = 'Nimbo — Automatización, IA y Páginas Web' }
  }, [post])

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
          <article
            className="blog-post-body"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
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

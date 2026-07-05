import { Link } from 'react-router-dom'
import { posts } from '../data/blog'
import Reveal from './Reveal'
import { IconArrowRight } from './Icons'

/*
  Sección "últimas del blog" para la home: muestra los 3 posts más recientes
  (posts[] está ordenado del más nuevo al más viejo) reutilizando las clases
  .blog-card del /blog para mantener consistencia visual. Va antes del CTA.
*/
export default function BlogTeaser() {
  const latest = posts.slice(0, 3)

  return (
    <section className="section blog-teaser" id="blog" data-screen-label="Blog">
      <div className="wrap">
        <div className="shead">
          <Reveal as="p" className="eyebrow">Blog</Reveal>
          <Reveal as="h2" delay={1} className="display">
            Ideas que hacen crecer negocios
          </Reveal>
        </div>

        <div className="blog-grid">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i} as="article" className="blog-card">
              <Link to={`/blog/${post.slug}`} className="blog-card-link">
                <div className="blog-card-meta">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-read-time">{post.readTime} de lectura</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-desc">{post.description}</p>
                <span className="blog-card-cta">Leer artículo →</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3} className="blog-teaser-more">
          <Link to="/blog" className="btn btn-ghost">
            <span>Ver todo el blog</span> <IconArrowRight size={18} className="arr" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

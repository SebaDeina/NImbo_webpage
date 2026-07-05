import { Link } from 'react-router-dom'
import { posts } from '../data/blog'
import Reveal from '../components/Reveal'
import { useSeo } from '../hooks/useSeo'

export default function Blog() {
  useSeo({
    title: 'Blog Nimbo — Transformación digital, IA y web para pymes',
    description:
      'Guías prácticas sobre automatización, inteligencia artificial, páginas web y transformación digital para dueños de negocios en Argentina.',
    path: '/blog',
  })
  return (
    <main className="page blog-page">
      <div className="blog-hero-glow" aria-hidden="true" />
      <div className="wrap">
        <header className="blog-header">
          <Reveal as="p" className="eyebrow no-dot">Blog</Reveal>
          <Reveal as="h1" delay={1} className="display">
            Ideas que hacen crecer negocios
          </Reveal>
          <Reveal as="p" delay={2} className="lead">
            Web, automatización e IA explicadas sin rodeos para dueños de negocios argentinos.
          </Reveal>
        </header>

        <div className="blog-grid">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i} as="article" className="blog-card">
              <Link to={`/blog/${post.slug}`} className="blog-card-link">
                <div className="blog-card-meta">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-read-time">{post.readTime} de lectura</span>
                </div>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-desc">{post.description}</p>
                <span className="blog-card-cta">Leer artículo →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  )
}

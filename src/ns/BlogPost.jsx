// /blog/<slug> · el artículo igual que en nimbodata.com (src/pages/BlogPost.jsx): título y portada lado a lado,
// ficha en cajas grises, barra de compartir, columna de texto angosta e índice fijo a la izquierda que marca la
// sección que estás leyendo. Lo único nuevo es lo de alrededor: la barra, el cierre y el pie del sitio nuevo.
import { useEffect, useMemo, useState } from 'react'
import { BlogContent, headings } from './blog-render'
import { getPost, POSTS } from './blog-posts'
import PostVisual from './PostVisual'
import { Arrow, Final } from './ui'

const fmtDate = (d) => new Date(`${d}T12:00:00`).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })

// a qué servicio apunta el "Empecemos" según el tema del artículo
const SERVICIO = {
  'Inteligencia Artificial': 'agentes-de-ia',
  'Automatización & IA': 'automatizaciones',
  'Transformación Digital': 'software-a-medida',
}

// la sección que se está leyendo: el último subtítulo que ya pasó el tercio de arriba de la pantalla
function useActiveHeading(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    if (!ids.length) return
    const onScroll = () => {
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < innerHeight * 0.33) cur = id
      }
      setActive(cur)
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

function Share({ post }) {
  const [copied, setCopied] = useState(false)
  const url = `https://www.nimbodata.com/blog/${post.slug}`
  const u = encodeURIComponent(url)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* sin portapapeles: no hacemos nada */ }
  }
  return (
    <div className="ba-share">
      <span>{post.readTime} de lectura</span>
      <div className="ba-share-btns">
        <a href={`https://twitter.com/intent/tweet?url=${u}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Compartir en X">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" /></svg>
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Compartir en LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.830-2.05 3.77-2.05 4.03 0 4.77 2.6 4.77 6V21h-4v-5.1c0-1.22-.02-2.8-1.7-2.8-1.71 0-1.97 1.33-1.97 2.7V21h-4V9.75Z" /></svg>
        </a>
        <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Compartir por WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" /></svg>
        </a>
        <button type="button" onClick={copy}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.6 13.4a1 1 0 0 1 0-1.4l3.5-3.5a3 3 0 0 1 4.2 4.2l-2.1 2.1a1 1 0 1 1-1.4-1.4l2.1-2.1a1 1 0 0 0-1.4-1.4L12 13.4a1 1 0 0 1-1.4 0Zm2.8-2.8a1 1 0 0 1 0 1.4l-3.5 3.5a3 3 0 0 1-4.2-4.2l2.1-2.1a1 1 0 1 1 1.4 1.4l-2.1 2.1a1 1 0 0 0 1.4 1.4l3.5-3.5a1 1 0 0 1 1.4 0Z" /></svg>
          {copied ? 'Copiado' : 'Copiar link'}
        </button>
      </div>
    </div>
  )
}

export default function BlogPost({ slug }) {
  const post = getPost(slug)
  const toc = useMemo(() => (post ? headings(post.content) : []), [post])
  const ids = useMemo(() => toc.map((h) => h.id), [toc])
  const active = useActiveHeading(ids)

  if (!post) {
    return (
      <section className="cs-hero wrap">
        <h1>No encontramos ese artículo.</h1>
        <p className="lead">Puede que haya cambiado de nombre.</p>
        <a className="btn" href="/blog" style={{ marginTop: 28 }}>Ver todos los artículos <Arrow /></a>
      </section>
    )
  }

  const s = SERVICIO[post.category]
  const others = [
    ...POSTS.filter((p) => p.slug !== slug && p.category === post.category),
    ...POSTS.filter((p) => p.slug !== slug && p.category !== post.category),
  ].slice(0, 3)

  return (
    <div className="ba">
      <header className="wrap ba-hero">
        <div className="ba-hero-copy">
          <a className="ba-back" href="/blog">← Blog</a>
          <span className="ba-date">{fmtDate(post.date)}</span>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <a className="btn btn-acc btn-sm" href={s ? `/contacto?s=${s}` : '/contacto'}>Contanos tu caso <Arrow /></a>
        </div>
        <PostVisual post={post} className="ba-cover" />
      </header>

      <div className="wrap ba-facts">
        <div className="ba-fact">
          <span>Tema: <b>{post.category}</b></span>
          <span>Lectura: <b>{post.readTime}</b></span>
          <span>Para: <b>dueños y equipos de pymes</b></span>
        </div>
        <div className="ba-fact ba-fact-cta">
          <span className="ba-fact-k">Con Nimbo</span>
          <b>¿Lo querés aplicar en tu negocio?</b>
          <a className="ba-more" href={s ? `/contacto?s=${s}` : '/contacto'}>Contanos tu caso →</a>
        </div>
      </div>

      <div className="wrap ba-main">
        {toc.length > 1 && (
          <nav className="ba-toc" aria-label="En este artículo">
            {toc.map((h) => <a key={h.id} href={`#${h.id}`} className={active === h.id ? 'is-on' : undefined}>{h.t}</a>)}
          </nav>
        )}
        <div className="ba-col">
          <Share post={post} />
          <div className="nd-art"><BlogContent content={post.content} /></div>
        </div>
      </div>

      {others.length > 0 && (
        <section className="sec wrap">
          <div className="sec-head">
            <h2>Seguir leyendo.</h2>
            <a className="btn" href="/blog">Ver todos <Arrow /></a>
          </div>
          <div className="ba-grid">
            {others.map((p) => (
              <a key={p.slug} className="ba-card" href={`/blog/${p.slug}`}>
                <PostVisual post={p} />
                <h3>{p.title}</h3>
                <span className="ba-meta">{p.category} · {fmtDate(p.date)}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <Final title="¿Lo querés aplicar en tu negocio?" s={s} />
    </div>
  )
}

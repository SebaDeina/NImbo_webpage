// Página de contenido (pilar, zona o rubro): título con la búsqueda, respuesta directa, secciones, preguntas
// frecuentes, links a las otras páginas y al blog, y el cierre. El texto vive en src/landings/<nombre>.page.js
// y la lista de páginas en src/lib/landings.js. Usa el diseño del sitio nuevo (src/ns).
import { useSeo } from '../hooks/useSeo'
import { LANDINGS } from '../lib/landings'
import { POSTS } from '../ns/blog-posts'
import { PostRow } from '../ns/Blog'
import { AREAS } from '../ns/data'
import { Arrow, Final } from '../ns/ui'

const SITE = 'https://www.nimbodata.com'
const PAGES = Object.fromEntries(
  Object.values(import.meta.glob('../landings/*.page.js', { eager: true, import: 'default' })).map((p) => [p.path, p]),
)

// [texto](/ruta) → link y **texto** → negrita, dentro de un párrafo
function Rich({ text }) {
  const out = []
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g
  let last = 0
  let m
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[3]) out.push(<b key={m.index}>{m[3]}</b>)
    else {
      const ext = /^https?:/.test(m[2])
      out.push(<a key={m.index} className="link" href={m[2]} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{m[1]}</a>)
    }
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}
const plain = (text) => text.replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1')

// las páginas que se pueden enlazar abajo: las de contenido y las de servicio del sitio nuevo
const LINKABLE = [
  ...LANDINGS.map((l) => ({ path: l.path, name: l.name, summary: l.summary })),
  ...AREAS.map((a) => ({ path: a.path, name: a.t, summary: a.d })),
]

function jsonLd(p) {
  const url = SITE + p.path
  const crumbs = [['Inicio', '/'], ...(p.crumbs ?? []), [p.crumb, p.path]]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name: p.h1,
        description: p.description,
        inLanguage: 'es-AR',
        isPartOf: { '@id': `${SITE}/#website` },
        about: { '@id': `${SITE}/#business` },
        mainEntity: { '@id': `${url}#service` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: p.service.name,
        serviceType: p.service.type,
        description: p.service.description,
        url,
        areaServed: p.service.areaServed ?? { '@type': 'Country', name: 'Argentina' },
        provider: { '@id': `${SITE}/#business` },
        inLanguage: 'es-AR',
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: 'es-AR',
        mainEntity: p.faq.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: plain(a) },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: crumbs.map(([name, path], i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name,
          item: path === '/' ? `${SITE}/` : SITE + path,
        })),
      },
    ],
  }
}

export default function Landing({ path }) {
  const p = PAGES[path]
  useSeo({ title: p.title, description: p.description, path: p.path, jsonLd: jsonLd(p) })
  const related = (p.related ?? []).map((r) => LINKABLE.find((l) => l.path === r)).filter(Boolean)
  const posts = (p.posts ?? []).map((s) => POSTS.find((x) => x.slug === s)).filter(Boolean)
  const contacto = p.contacto ?? '/contacto'

  return (
    <>
      <section className="sv-hero wrap ld-hero">
        <nav className="crumb mono ld-crumbs" aria-label="Ruta" data-reveal>
          <a href="/">Inicio</a>
          {(p.crumbs ?? []).map(([t, href]) => <span key={href}> / <a href={href}>{t}</a></span>)}
          <span> / {p.crumb}</span>
        </nav>
        <h1 data-reveal>{p.h1}</h1>
        <div className="ld-answer" data-reveal style={{ '--d': '80ms' }}>
          <span className="mono">Respuesta directa</span>
          <p><Rich text={p.answer} /></p>
        </div>
        <div className="btns" data-reveal style={{ '--d': '160ms' }}>
          <a className="btn btn-acc" href="/diagnostico">Diagnóstico gratis de 20 minutos <Arrow /></a>
          <a className="btn" href="/agendar">Agendar una llamada <Arrow /></a>
        </div>
      </section>

      <div className="frame">
        {p.sections.map((s, i) => (
          <section key={s.h2} id={s.id} className={`sec wrap ld-sec${s.items && !s.paras ? ' ld-sec-cards' : ''}`}>
            <div className="ld-head" data-reveal>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <h2>{s.h2}</h2>
            </div>
            <div className="ld-body" data-reveal style={{ '--d': '100ms' }}>
              {(s.paras ?? []).map((t) => <p key={t.slice(0, 40)}><Rich text={t} /></p>)}
              {s.items && (
                <ul className={s.steps ? 'ld-steps' : 'ld-items'}>
                  {s.items.map(([t, d], k) => (
                    <li key={t}>
                      {s.steps && <span className="mono">{String(k + 1).padStart(2, '0')}</span>}
                      <h4>{t}</h4>
                      <p><Rich text={d} /></p>
                    </li>
                  ))}
                </ul>
              )}
              {(s.after ?? []).map((t) => <p key={t.slice(0, 40)}><Rich text={t} /></p>)}
            </div>
          </section>
        ))}

        <section id="faq" className="sec wrap">
          <div className="faq-grid">
            <div data-reveal>
              <h2 className="faq-title">Preguntas frecuentes.</h2>
              <p className="lead">¿Te quedó otra? <a className="link" href={contacto}>Escribinos</a> o <a className="link" href="/agendar">agendá 20 minutos</a>.</p>
            </div>
            <div className="faq" data-reveal style={{ '--d': '100ms' }}>
              {p.faq.map(([q, a], i) => (
                <details key={q} open={i === 0}><summary>{q}</summary><p><Rich text={a} /></p></details>
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="sec wrap">
            <div className="sec-head" data-reveal><div><h2>Seguí por acá.</h2></div></div>
            <div className="others">
              {related.map((r, i) => (
                <a key={r.path} href={r.path} className="other ld-other" data-reveal style={{ '--d': `${i * 80}ms` }}>
                  <h4>{r.name}</h4>
                  <p>{r.summary}</p>
                  <span className="other-go">Ver más <Arrow /></span>
                </a>
              ))}
            </div>
          </section>
        )}

        {posts.length > 0 && (
          <section className="sec wrap">
            <div className="sec-head" data-reveal>
              <div><h2>Para leer antes.</h2></div>
              <a className="btn" href="/blog">Todos los artículos <Arrow /></a>
            </div>
            <ul className="bl-list" data-reveal>
              {posts.map((x) => <PostRow key={x.slug} p={x} />)}
            </ul>
          </section>
        )}

        <Final title={p.final ?? 'Contanos tu caso.'} href={contacto} />
      </div>
    </>
  )
}

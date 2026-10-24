import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { NdFaq, NdFinal, WaLink } from '../components/nd/Nd'
import { useDiagnostico } from '../components/nd/DiagnosticoForm'
import { useSeo } from '../hooks/useSeo'
import { BlogContent, headings } from '../lib/blog-render'
import { GUIA } from '../data/guia'
import { RUBROS } from '../data/rubros'
import '../styles/rubros.css'

/*
  Guía pilar 2026. Reemplaza al post /blog/automatiza-tu-negocio-con-ia (301 en vercel.json).
  La FAQ visible y el FAQPage del JSON-LD salen de GUIA.faq: no pueden diferir.
*/

const SITE = 'https://www.nimbodata.com'
const URL = `${SITE}${GUIA.path}`
const WA_MSG = '¡Hola! Leí la guía para automatizar una pyme y quiero saber qué automatizar primero en mi empresa.'

const EXTRA_TOC = [
  { id: 'diagnostico', t: '¿Qué automatizar primero en tu empresa?' },
  { id: 'preguntas-frecuentes', t: 'Preguntas frecuentes' },
  { id: 'fuentes', t: 'Fuentes' },
]

function useActiveHeading(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    if (!ids.length) return
    const onScroll = () => {
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.33) cur = id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${URL}#article`,
      headline: GUIA.headline,
      description: GUIA.description,
      inLanguage: 'es-AR',
      datePublished: GUIA.published,
      dateModified: GUIA.modified,
      mainEntityOfPage: URL,
      image: `${SITE}/og-nimbo-v2.jpg`,
      author: { '@id': `${SITE}/nosotros#seba` },
      publisher: { '@id': `${SITE}/#business` },
      isPartOf: { '@id': `${SITE}/#website` },
      about: [
        { '@type': 'Thing', name: 'Automatización de procesos' },
        { '@type': 'Thing', name: 'Pymes de Argentina' },
      ],
      citation: GUIA.citations,
    },
    {
      '@type': 'FAQPage',
      '@id': `${URL}#faq`,
      mainEntity: GUIA.faq.map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Guía 2026 para automatizar una pyme', item: URL },
      ],
    },
  ],
}

export default function GuiaAutomatizarPyme() {
  useSeo({ title: GUIA.title, description: GUIA.description, path: GUIA.path, type: 'article', jsonLd: JSON_LD })
  const openDiagnostico = useDiagnostico()
  const toc = useMemo(() => [...headings(GUIA.body), ...EXTRA_TOC], [])
  const ids = useMemo(() => toc.map((h) => h.id), [toc])
  const active = useActiveHeading(ids)

  return (
    <main className="nd-page-main ba gu">
      <header className="nd-wrap ba-hero gu-hero">
        <div className="ba-hero-copy">
          <Link className="ba-back" to="/blog">
            ← Blog
          </Link>
          <h1>{GUIA.h1}</h1>
          <p className="gu-byline">
            Por <Link to="/nosotros">Sebastian Deina</Link>, fundador de Nimbo Consulting · Buenos Aires · Publicado:{' '}
            <time dateTime={GUIA.published}>24 de octubre de 2026</time> · Última actualización:{' '}
            <time dateTime={GUIA.modified}>24 de octubre de 2026</time>
          </p>
        </div>
        <aside className="rb-resumen" aria-label="En resumen">
          <span className="nd-eyebrow">En resumen</span>
          <p>{GUIA.resumen}</p>
        </aside>
      </header>

      <div className="nd-wrap ba-main">
        <nav className="ba-toc" aria-label="En esta guía">
          {toc.map((h) => (
            <a key={h.id} href={`#${h.id}`} className={active === h.id ? 'is-on' : undefined}>
              {h.t}
            </a>
          ))}
        </nav>
        <div className="ba-col">
          <div className="nd-art">
            <BlogContent content={GUIA.body} />

            <hr />
            <h2 id="diagnostico">¿Querés saber qué automatizar primero en tu empresa?</h2>
            <p>
              En Nimbo empezamos siempre por un <strong>diagnóstico sin cargo de 20 minutos, por videollamada</strong>.
              Revisamos cómo trabaja tu empresa, estimamos cuánto te cuesta hoy el problema y, si hay caso, en 48 horas
              te mandamos una propuesta cerrada, en pesos, con alcance, plazos y resultados esperados. Si no hay caso,
              te lo decimos.
            </p>
            <div className="nd-btns">
              <button type="button" className="nd-btn" onClick={() => openDiagnostico('guia-2026')}>
                Pedí tu diagnóstico
              </button>
              <WaLink cta="guia-2026" msg={WA_MSG} className="nd-btn nd-btn-soft">
                Escribinos por WhatsApp
              </WaLink>
            </div>

            <hr />
            <h2 id="preguntas-frecuentes">Preguntas frecuentes</h2>
            <div className="gu-faq">
              <NdFaq items={GUIA.faq} />
            </div>

            <hr />
            <h2 id="fuentes">Fuentes</h2>
            <div className="rb-fuentes">
              <BlogContent content={GUIA.fuentes} />
            </div>

            <p className="gu-bio">
              <em>{GUIA.bio}</em> <Link to="/nosotros">Más sobre Nimbo</Link>.
            </p>
          </div>
        </div>
      </div>

      <section className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">Automatización por rubro</h2>
          <div className="nd-cols">
            {RUBROS.map((r) => (
              <Link className="nd-col rb-card" to={r.path} key={r.slug}>
                <h3>Automatización para {r.nav.toLowerCase()}</h3>
                <p>{r.card}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NdFinal title="Empezá por un proceso" cta="guia-2026" msg={WA_MSG} />
    </main>
  )
}

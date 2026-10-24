import { Link, Navigate } from 'react-router-dom'
import { NdFaq, NdFinal, NdPageHero } from '../components/nd/Nd'
import { useSeo } from '../hooks/useSeo'
import { BlogContent } from '../lib/blog-render'
import { rubros, RUBROS, RUBRO_UPDATED } from '../data/rubros'
import '../styles/rubros.css'

/*
  Página de automatización por rubro, armada desde src/data/rubros.js.
  La FAQ visible y el FAQPage del JSON-LD salen del mismo array: no pueden diferir.
*/

const SITE = 'https://www.nimbodata.com'

function jsonLd(r) {
  const url = `${SITE}${r.path}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        name: r.h1,
        description: r.description,
        url,
        inLanguage: 'es-AR',
        dateModified: RUBRO_UPDATED,
        isPartOf: { '@id': `${SITE}/#website` },
        about: { '@id': `${SITE}/#business` },
        mainEntity: { '@id': `${url}#service` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: r.service.name,
        serviceType: r.service.serviceType,
        description: r.service.description,
        url,
        provider: { '@id': `${SITE}/#business` },
        areaServed: { '@type': 'Country', name: 'Argentina' },
        audience: { '@type': 'BusinessAudience', audienceType: r.service.audience },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: r.faq.map(([name, text]) => ({
          '@type': 'Question',
          name,
          acceptedAnswer: { '@type': 'Answer', text },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Automatizaciones', item: `${SITE}/automatizaciones` },
          { '@type': 'ListItem', position: 3, name: r.nav, item: url },
        ],
      },
    ],
  }
}

export default function RubroPage({ slug }) {
  const r = rubros[slug]

  useSeo(
    r
      ? { title: r.title, description: r.description, path: r.path, jsonLd: jsonLd(r) }
      : { title: 'Nimbo', description: '', path: '/automatizaciones' },
  )

  if (!r) return <Navigate to="/automatizaciones" replace />

  const otros = RUBROS.filter((o) => o.slug !== slug)
  const msg = `¡Hola! Vi la página de automatización para ${r.nav.toLowerCase()} y quiero pedir el diagnóstico.`

  return (
    <main className="nd-page-main rb">
      <NdPageHero eyebrow={r.eyebrow} title={r.h1}>
        <nav className="rb-crumbs" aria-label="Ubicación">
          <Link to="/">Inicio</Link> <span aria-hidden="true">›</span>{' '}
          <Link to="/automatizaciones">Automatizaciones</Link> <span aria-hidden="true">›</span> <span>{r.nav}</span>
        </nav>
      </NdPageHero>

      <section className="nd-sec rb-first">
        <div className="nd-wrap nd-narrow">
          <aside className="rb-resumen" aria-label="En resumen">
            <span className="nd-eyebrow">En resumen</span>
            <p>{r.resumen}</p>
            <div className="nd-btns">
              <Link to="/diagnostico" className="nd-btn" data-cta={`rubro-${slug}`}>
                Pedí tu diagnóstico sin cargo
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap nd-narrow">
          <div className="nd-art">
            <h2>{r.mercado.title}</h2>
            <BlogContent content={r.mercado.md} />
          </div>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">{r.problemas.title}</h2>
          <div className="nd-cols">
            {r.problemas.items.map(([t, d]) => (
              <article className="nd-col" key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <div>
              <h2 className="nd-h2">{r.soluciones.title}</h2>
              <p>
                Lo hacemos con <Link to="/automatizaciones">agentes de IA, automatizaciones e integraciones</Link>,
                tableros de datos y, cuando hace falta, software a medida.
              </p>
            </div>
          </div>
          <div className="nd-cols">
            {r.soluciones.items.map(([t, d]) => (
              <article className="nd-col" key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap nd-narrow">
          <h2 className="nd-h2">{r.flujos.title}</h2>
          {r.flujos.items.map((f) => (
            <div className="rb-flow" key={f.t}>
              <h3>{f.t}</h3>
              <ol>
                {f.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">¿Cómo funciona el diagnóstico?</h2>
          <div className="nd-cols nd-steps">
            {r.diagnostico.map(([t, d], i) => (
              <div className="nd-col" key={t}>
                <span className="nd-mono nd-step-k">{String(i + 1).padStart(2, '0')}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <p className="rb-note">
            <Link to="/diagnostico" className="nd-link" data-cta={`rubro-${slug}`}>
              Pedí tu diagnóstico sin cargo →
            </Link>{' '}
            Te respondemos en menos de 24 horas.
          </p>
        </div>
      </section>

      <section id="faq" className="nd-sec">
        <div className="nd-wrap nd-narrow">
          <h2 className="nd-h2 nd-center">Preguntas frecuentes</h2>
          <NdFaq items={r.faq} />
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap nd-narrow">
          <div className="nd-art rb-fuentes">
            <h2>Fuentes</h2>
            <BlogContent content={r.fuentes} />
          </div>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">Seguí leyendo</h2>
          <div className="nd-cols">
            <Link className="nd-col rb-card" to="/guia-automatizar-pyme-argentina-2026">
              <h3>Guía 2026 para automatizar una pyme en Argentina</h3>
              <p>Qué automatizar primero, cuánto tarda y cómo medir el retorno.</p>
            </Link>
            {otros.map((o) => (
              <Link className="nd-col rb-card" to={o.path} key={o.slug}>
                <h3>Automatización para {o.nav.toLowerCase()}</h3>
                <p>{o.card}</p>
              </Link>
            ))}
            {r.relacionados.map(([href, t]) => (
              <Link className="nd-col rb-card" to={href} key={href}>
                <h3>{t}</h3>
                <p>{href.startsWith('/blog') ? 'Artículo del blog' : 'Servicio de Nimbo'} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NdFinal title={`Automatizá tu ${slug === 'inmobiliarias' ? 'inmobiliaria' : slug === 'servicios-profesionales' ? 'estudio' : 'distribuidora'}`} cta={`rubro-${slug}`} msg={msg} />
    </main>
  )
}

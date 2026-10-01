import { useEffect, useRef, useState } from 'react'
import PageHero from '../components/g/PageHero'
import { Emblem } from '../components/g/Art'
import CTA from '../components/CTA'
import { PROJECTS } from '../data/projects'
import { useSeo } from '../hooks/useSeo'

const FILTERS = ['Todos', 'Apps y plataformas', 'Webs', 'Automatización', 'IA y agentes', 'Datos', 'Visión', 'Marketing']
const EMB = { Webs: 'I', 'Apps y plataformas': 'I', Automatización: 'II', Marketing: 'II', 'IA y agentes': 'III', Datos: 'IV', Visión: 'V' }
const PRIORITY = ['Visión', 'IA y agentes', 'Marketing', 'Automatización', 'Datos', 'Apps y plataformas', 'Webs']

/* Recuerda en estado si el proyecto ya entró en pantalla: así la animación de
   aparición no se pierde cuando React redibuja la lista al cambiar el filtro. */
function useSeen() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (!('IntersectionObserver' in window)) return setSeen(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen])
  return [ref, seen]
}

function Project({ p, i }) {
  const [ref, seen] = useSeen()
  const areas = p.areas || []
  const emb = EMB[PRIORITY.find((x) => areas.includes(x))] || 'I'
  const Plate = p.live ? 'a' : 'div'
  const plateProps = p.live ? { href: p.live, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${p.title} (abre el sitio)` } : {}
  return (
    <article ref={ref} className={`pj${i % 2 ? ' flip' : ''}${seen ? ' in' : ''}`} id={p.slug}>
      <Plate className="plate" {...plateProps}>
        <span className="corner" />
        <div className="plate-in wipe">
          {p.cover ? (
            <>
              <img src={p.cover} alt={`${p.title} — ${p.summary?.es || ''}`} loading={i < 2 ? 'eager' : 'lazy'} />
              <img className="duo" src={p.cover} alt="" loading={i < 2 ? 'eager' : 'lazy'} aria-hidden="true" />
            </>
          ) : (
            <Emblem n={emb} className="ph-emb" />
          )}
        </div>
        <span className="num">Nº {String(i + 1).padStart(2, '0')}</span>
      </Plate>
      <div className="info">
        <div className="eyebrow">
          {p.type || p.category?.es}
          {p.isNew && <span className="tag-n">Nuevo</span>}
        </div>
        <h2>{p.title}</h2>
        <div className="who">
          {p.client}
          {p.year ? ` · ${p.year}` : ''}
        </div>
        {p.summary?.es && <p className="sum">{p.summary.es}</p>}
        {p.description?.es?.[0] && <p className="desc2">{p.description.es[0]}</p>}
        {p.services?.length > 0 && (
          <div className="svcs">
            {p.services.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        )}
        <div className="btns">
          {p.live && (
            <a className="btn btn-solid" href={p.live} target="_blank" rel="noopener noreferrer">
              Ver en vivo ↗
            </a>
          )}
          {p.status ? <span className="soon">{p.status}</span> : !p.live && <span className="soon">Próximamente online</span>}
        </div>
      </div>
    </article>
  )
}

export default function Proyectos() {
  const [filter, setFilter] = useState('Todos')
  useSeo({
    title: 'Proyectos — Nimbo | Webs, apps, automatización e IA para negocios',
    description:
      'Proyectos reales de Nimbo: apps y plataformas, sitios web, automatizaciones, agentes de IA, dashboards de datos y visión por computadora para negocios en Argentina.',
    path: '/proyectos',
  })

  const filters = FILTERS.filter((f, i) => !i || PROJECTS.some((p) => p.areas?.includes(f)))
  const list = filter === 'Todos' ? PROJECTS : PROJECTS.filter((p) => p.areas?.includes(filter))

  return (
    <main className="g-main">
      <PageHero>
        <div className="eyebrow">Proyectos</div>
        <h1>
          Lo que ya está <em>funcionando</em>
        </h1>
        <p className="hero-sub">Apps, webs, automatizaciones, datos e IA hechos para negocios reales.</p>
      </PageHero>
      <section className="paper proj-body">
        <div className="wrap">
          <div className="chips" role="group" aria-label="Filtrar proyectos">
            {filters.map((f) => (
              <button key={f} type="button" className={`chip${filter === f ? ' on' : ''}`} onClick={() => setFilter(f)} aria-pressed={filter === f}>
                {f}
              </button>
            ))}
          </div>
          <div>
            {list.map((p, i) => (
              <Project key={p.slug} p={p} i={i} />
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </main>
  )
}

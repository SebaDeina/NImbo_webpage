import { useState } from 'react'
import { Cloud, NdFinal, NdPageHero } from '../components/nd/Nd'
import { PROJECTS } from '../data/projects'
import { useSeo } from '../hooks/useSeo'

const FILTERS = ['Todos', 'Apps y plataformas', 'Webs', 'Automatización', 'IA y agentes', 'Datos', 'Visión', 'Marketing']
// fondo del panel de cada proyecto (se alterna)
const TONOS = ['nd-v-mist', 'nd-v-lilac', 'nd-v-sand', 'nd-v-wheat']

function Project({ p, i }) {
  const Shot = p.live ? 'a' : 'div'
  const shotProps = p.live ? { href: p.live, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${p.title} (abre el sitio)` } : {}
  return (
    <article className={`npj${i % 2 ? ' is-flip' : ''}`} id={p.slug}>
      <Shot className={`nd-visual pj-shot ${TONOS[i % TONOS.length]}`} {...shotProps}>
        {p.cover ? (
          <img src={p.cover} alt={`${p.title} — ${p.summary?.es || ''}`} loading={i < 2 ? 'eager' : 'lazy'} />
        ) : (
          <span className="pj-ph">
            <Cloud />
          </span>
        )}
      </Shot>
      <div className="pj-info">
        <span className="nd-mono pj-type">
          {p.type || p.category?.es}
          {p.isNew && <span className="hm-tag">Nuevo</span>}
        </span>
        <h2>{p.title}</h2>
        <span className="pj-who">
          {p.client}
          {p.year ? ` · ${p.year}` : ''}
        </span>
        {p.summary?.es && <p className="pj-sum">{p.summary.es}</p>}
        {p.description?.es?.[0] && <p className="pj-desc">{p.description.es[0]}</p>}
        {p.services?.length > 0 && (
          <ul className="hm-usos">
            {p.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
        <div className="pj-btns">
          {p.live && (
            <a className="nd-btn nd-btn-sm" href={p.live} target="_blank" rel="noopener noreferrer">
              Ver en vivo ↗
            </a>
          )}
          {p.status ? <span className="pj-status">{p.status}</span> : !p.live && <span className="pj-status">Próximamente online</span>}
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
    <main className="nd-page-main">
      <NdPageHero eyebrow="Proyectos" title="Lo que ya está funcionando">
        <p>Apps, webs, automatizaciones, datos e IA hechos para negocios reales.</p>
      </NdPageHero>
      <section className="nd-wrap pj-body">
        <div className="nd-chips" role="group" aria-label="Filtrar proyectos">
          {filters.map((f) => (
            <button key={f} type="button" className="au-chip" onClick={() => setFilter(f)} aria-pressed={filter === f}>
              {f}
            </button>
          ))}
        </div>
        <div className="pj-list">
          {list.map((p, i) => (
            <Project key={p.slug} p={p} i={i} />
          ))}
        </div>
      </section>
      <NdFinal />
    </main>
  )
}

import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import Reveal from './Reveal'
import { useProjects } from '../hooks/useProjects'

export default function Work() {
  const { t, lang } = useLang()
  const { projects } = useProjects()

  return (
    <section className="section work" id="trabajos" data-screen-label="Trabajos">
      <div className="wrap">
        <div className="shead">
          <Reveal as="p" className="eyebrow">
            {t('work.eyebrow')}
          </Reveal>
          <Reveal as="h2" delay={1} className="display">
            {t('work.title')}
          </Reveal>
          <Reveal as="p" delay={2} className="lead">
            {t('work.lead')}
          </Reveal>
        </div>

        <div className="work-grid">
          {projects.map((p, i) => {
            const disciplines =
              p.services && p.services.length
                ? p.services.slice(0, 3).join(', ')
                : p.category?.[lang]
            const metaLine = [disciplines, p.year].filter(Boolean).join(' — ')
            return (
              <Reveal
                as={Link}
                key={p.slug}
                to={`/trabajos/${p.slug}`}
                delay={i % 2 ? 1 : 0}
                className="proj"
                aria-label={p.title}
              >
                <div className="proj-media">
                  {p.cover ? (
                    <img src={p.cover} alt={p.title} loading="lazy" />
                  ) : (
                    <div className="ph">
                      <div className="ph-tag">
                        <b>[ {p.title} ]</b>
                        <br />
                        {p.placeholder?.[lang]}
                      </div>
                    </div>
                  )}
                </div>
                <div className="proj-shade" />
                <div className="proj-overlay">
                  <div className="proj-info">
                    <h3>{p.title}</h3>
                    <p className="proj-meta-line">{metaLine}</p>
                  </div>
                  <span className="proj-go" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

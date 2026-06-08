import { useParams, Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { useProject } from '../hooks/useProjects'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t, lang } = useLang()
  const project = useProject(slug)

  if (project === undefined) {
    return (
      <main className="page project-page">
        <div className="wrap project-state">{t('proj.loading')}</div>
      </main>
    )
  }

  if (project === null) {
    return (
      <main className="page project-page">
        <div className="wrap project-state">
          <h1 className="display">{t('proj.notfound')}</h1>
          <Link to="/" className="btn btn-ghost">
            ← {t('proj.back')}
          </Link>
        </div>
      </main>
    )
  }

  const paragraphs = project.description?.[lang] || []

  return (
    <main className="page project-page">
      <div className="project-glow" aria-hidden="true" />
      <article className="wrap">
        <Link to={{ pathname: '/', hash: '#trabajos' }} className="project-back">
          ← {t('proj.back')}
        </Link>

        <header className="project-head">
          <p className="eyebrow no-dot project-cat">{project.category?.[lang]}</p>
          <h1 className="display">{project.title}</h1>
          {project.summary?.[lang] && <p className="lead">{project.summary[lang]}</p>}

          <div className="project-meta">
            {project.client && (
              <div className="pm">
                <span className="pm-k">{t('proj.client')}</span>
                <span className="pm-v">{project.client}</span>
              </div>
            )}
            {project.year && (
              <div className="pm">
                <span className="pm-k">{t('proj.year')}</span>
                <span className="pm-v">{project.year}</span>
              </div>
            )}
            {project.services?.length > 0 && (
              <div className="pm">
                <span className="pm-k">{t('proj.services')}</span>
                <span className="pm-v">{project.services.join(' · ')}</span>
              </div>
            )}
          </div>

          {project.live && (
            <a className="btn btn-primary project-visit" href={project.live} target="_blank" rel="noopener noreferrer">
              <span>{t('proj.visit')}</span> <span className="arr">↗</span>
            </a>
          )}
        </header>

        <div className="project-cover">
          {project.cover ? (
            <img src={project.cover} alt={project.title} />
          ) : (
            <div className="ph">
              <div className="ph-tag">
                <b>[ {project.title} ]</b>
                <br />
                {project.placeholder?.[lang]}
              </div>
            </div>
          )}
        </div>

        {paragraphs.length > 0 && (
          <div className="project-body">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {project.tags?.length > 0 && (
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.gallery?.length > 0 && (
          <div className="project-gallery">
            {project.gallery.map((src, i) => (
              <img key={i} src={src} alt={`${project.title} ${i + 1}`} loading="lazy" />
            ))}
          </div>
        )}

        <div className="project-foot">
          <Link to={{ pathname: '/', hash: '#trabajos' }} className="btn btn-ghost">
            ← {t('proj.back')}
          </Link>
          <Link to="/contacto" className="btn btn-primary">
            <span>{t('cta.btn')}</span> <span className="arr">→</span>
          </Link>
        </div>
      </article>
    </main>
  )
}

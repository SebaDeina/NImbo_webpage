import { useLang } from '../i18n/LangContext'
import Reveal from './Reveal'

const MILESTONES = ['m1', 'm2', 'm3']

export default function History() {
  const { t } = useLang()
  return (
    <section className="section about-history" id="historia" data-screen-label="Historia">
      <div className="wrap">
        <div className="shead">
          <Reveal as="p" className="eyebrow">
            {t('about.history.eyebrow')}
          </Reveal>
          <Reveal as="h2" delay={1} className="display">
            {t('about.history.title')}
          </Reveal>
          <Reveal as="p" delay={2} className="lead">
            {t('about.history.lead')}
          </Reveal>
        </div>

        <div className="history-body">
          <Reveal delay={1} className="history-copy">
            <p>{t('about.history.p1')}</p>
            <p>{t('about.history.p2')}</p>
          </Reveal>

          <div className="history-timeline">
            {MILESTONES.map((key, i) => (
              <Reveal className="history-milestone" delay={i} key={key}>
                <span className="history-year">{t(`about.history.${key}.year`)}</span>
                <h3>{t(`about.history.${key}.t`)}</h3>
                <p>{t(`about.history.${key}.d`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useLang } from '../i18n/LangContext'
import Reveal from './Reveal'
import { IconArrowRight } from './Icons'

const ARTICLES = ['a1', 'a2', 'a3', 'a4']

export default function Insights() {
  const { t } = useLang()
  return (
    <section className="section insights" id="insights" data-screen-label="Insights">
      <div className="wrap">
        <div className="shead">
          <Reveal as="p" className="eyebrow">{t('ins.eyebrow')}</Reveal>
          <Reveal as="h2" delay={1} className="display">{t('ins.title')}</Reveal>
        </div>
        <div className="ins-grid">
          {ARTICLES.map((key, i) => (
            <Reveal key={key} className="ins-card" delay={i % 2}>
              <p className="ins-cat">{t(`ins.${key}.cat`)}</p>
              <h3 className="ins-title">{t(`ins.${key}.title`)}</h3>
              <span className="ins-link">
                {t('ins.readmore')}
                <IconArrowRight size={14} />
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

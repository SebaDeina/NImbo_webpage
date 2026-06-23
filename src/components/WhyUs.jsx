import { useLang } from '../i18n/LangContext'
import Reveal from './Reveal'

const VALUES = ['v1', 'v2', 'v3', 'v4']

export default function WhyUs() {
  const { t } = useLang()
  return (
    <section className="section why-us" id="diferencial" data-screen-label="Por qué elegirnos">
      <div className="wrap">
        <div className="shead">
          <Reveal as="p" className="eyebrow">{t('why.eyebrow')}</Reveal>
          <Reveal as="h2" delay={1} className="display">
            {t('why.title1')}
            <br />
            <span className="why-hl">{t('why.titleHL')}</span>
          </Reveal>
        </div>
        <div className="why-grid">
          {VALUES.map((v, i) => (
            <Reveal key={v} className={`why-card${v === 'v4' ? ' why-card--ai' : ''}`} delay={i + 1}>
              <span className="why-num">0{i + 1}</span>
              <h3 className="why-card-title">{t(`why.${v}.t`)}</h3>
              <p className="why-card-desc">{t(`why.${v}.d`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

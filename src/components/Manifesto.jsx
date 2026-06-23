import { useLang } from '../i18n/LangContext'
import Reveal from './Reveal'

export default function Manifesto({ eyebrowKey = 'mf.eyebrow', id = 'manifiesto', variant }) {
  const { t } = useLang()
  const cls = `section manifesto${variant ? ` manifesto--${variant}` : ''}`
  return (
    <section className={cls} id={id} data-screen-label="Manifiesto">
      <div className="wrap">
        <div className="mf-cloud">
          <div className="mf-marks" aria-hidden="true">
            <span className="mf-mark mf-mark--plus mf-mark--1">+</span>
            <span className="mf-mark mf-mark--circle mf-mark--2" />
            <span className="mf-mark mf-mark--plus mf-mark--3">+</span>
            <span className="mf-mark mf-mark--circle mf-mark--4" />
            <span className="mf-mark mf-mark--cross mf-mark--5">×</span>
          </div>
          <Reveal as="p" className="eyebrow mf-eyebrow">
            {t(eyebrowKey)}
          </Reveal>
          <div className="manifesto-grid">
            <Reveal as="h2" delay={1} className="big">
              {t('mf.big1')}
              <span className="hl">{t('mf.bigHL')}</span>
              {t('mf.big2')}
            </Reveal>
            <Reveal delay={2}>
              <p>{t('mf.p1')}</p>
              <p>{t('mf.p2')}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

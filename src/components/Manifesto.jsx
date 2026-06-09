import { useLang } from '../i18n/LangContext'
import Reveal from './Reveal'

export default function Manifesto({ eyebrowKey = 'mf.eyebrow', id = 'manifiesto', variant }) {
  const { t } = useLang()
  const cls = `section manifesto${variant ? ` manifesto--${variant}` : ''}`
  return (
    <section className={cls} id={id} data-screen-label="Manifiesto">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">
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
    </section>
  )
}

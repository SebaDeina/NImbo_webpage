import { useLang } from '../i18n/LangContext'
import Reveal from './Reveal'

const STEPS = [
  { sn: '01', key: 'p1' },
  { sn: '02', key: 'p2' },
  { sn: '03', key: 'p3' },
  { sn: '04', key: 'p4' },
]

export default function Process() {
  const { t } = useLang()
  return (
    <section className="section process" id="proceso" data-screen-label="Proceso">
      <div className="wrap">
        <div className="shead">
          <Reveal as="p" className="eyebrow">
            {t('proc.eyebrow')}
          </Reveal>
          <Reveal as="h2" delay={1} className="display">
            {t('proc.title')}
          </Reveal>
        </div>
        <div className="steps">
          {STEPS.map(({ sn, key }, i) => (
            <Reveal className="step" delay={i} key={key}>
              <div className="sn">{sn}</div>
              <div className="sline" />
              <h4>{t(`${key}.t`)}</h4>
              <p>{t(`${key}.d`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

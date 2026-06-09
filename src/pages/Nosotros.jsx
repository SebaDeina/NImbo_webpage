import { useLang } from '../i18n/LangContext'
import Reveal from '../components/Reveal'
import History from '../components/History'
import Manifesto from '../components/Manifesto'
import Team from '../components/Team'
import Process from '../components/Process'
import CTA from '../components/CTA'

const VALUES = ['v1', 'v2', 'v3']

export default function Nosotros() {
  const { t } = useLang()
  return (
    <main className="page about-page">
      <header className="section about-hero">
        <div className="about-hero-glow" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p" className="eyebrow no-dot">
            {t('about.eyebrow')}
          </Reveal>
          <Reveal as="h1" delay={1} className="display about-title">
            {t('about.title')}
          </Reveal>
          <Reveal as="p" delay={2} className="lead">
            {t('about.lead')}
          </Reveal>

          <div className="about-values">
            {VALUES.map((v, i) => (
              <Reveal className="about-value" delay={i} key={v}>
                <h3>{t(`about.${v}.t`)}</h3>
                <p>{t(`about.${v}.d`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </header>

      <History />

      <div className="about-story">
        <Manifesto eyebrowKey="mf.manifestoEyebrow" variant="about" />
        <Team variant="about" />
      </div>

      <Process />
      <CTA />
    </main>
  )
}

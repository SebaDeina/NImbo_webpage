import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { useContact } from '../contexts/ContactContext'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Hero() {
  const { t } = useLang()
  const { openContact } = useContact()
  const isMobile = useIsMobile()

  const onContact = (e) => {
    if (isMobile) {
      e.preventDefault()
      openContact()
    }
  }

  return (
    <header className="hero" id="top">
      <div className="hero-grid-overlay" aria-hidden="true" />
      <div className="hero-fade" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-badge">
          <span className="hero-badge-new">NIMBO</span>
          {t('hero.eyebrow')}
        </div>

        <h1 className="hero-h1">{t('hero.title')}</h1>

        <p className="hero-sub">{t('hero.sub')}</p>

        <div className="hero-btns">
          <Link to="/contacto" className="btn-hero-primary" onClick={onContact}>
            {t('hero.cta1')}
          </Link>
          <a href="#servicios" className="btn-hero-ghost">
            {t('hero.cta2')}
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">+150</span>
            <span className="hero-stat-label">{t('hero.stat1')}</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">98%</span>
            <span className="hero-stat-label">{t('hero.stat2')}</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">×5</span>
            <span className="hero-stat-label">{t('hero.stat3')}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

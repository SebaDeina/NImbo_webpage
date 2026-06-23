import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import CloudMark from './CloudMark'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="foot">
      <div className="foot-inner">
        <Link to="/" className="foot-brand-logo" aria-label="NIMBO">
          <CloudMark />
        </Link>
        <p className="foot-tagline">{t('foot.tagline')}</p>
        <nav className="foot-links" aria-label={t('foot.navLabel')}>
          <Link to="/contacto">{t('nav.contact')}</Link>
          <Link to={{ pathname: '/', hash: '#trabajos' }}>{t('foot.work')}</Link>
          <Link to="/nosotros">{t('foot.about')}</Link>
          <a href={`mailto:${t('foot.email')}`}>{t('foot.email')}</a>
        </nav>
        <p className="foot-copy">{t('foot.rights')}</p>
      </div>
    </footer>
  )
}

import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import CloudMark from './CloudMark'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <div className="brand">
              <CloudMark />
              <span>NIMBO</span>
            </div>
            <p>{t('foot.tagline')}</p>
          </div>
          <div className="foot-col">
            <h5>{t('foot.c1')}</h5>
            <Link to={{ pathname: '/', hash: '#servicios' }}>{t('svc1.name')}</Link>
            <Link to={{ pathname: '/', hash: '#servicios' }}>{t('svc2.name')}</Link>
            <Link to={{ pathname: '/', hash: '#servicios' }}>{t('svc3.name')}</Link>
            <Link to={{ pathname: '/', hash: '#servicios' }}>IA</Link>
          </div>
          <div className="foot-col">
            <h5>{t('foot.c2')}</h5>
            <Link to={{ pathname: '/', hash: '#trabajos' }}>{t('foot.work')}</Link>
            <Link to="/nosotros">{t('foot.about')}</Link>
            <Link to="/contacto">{t('nav.contact')}</Link>
          </div>
          <div className="foot-col">
            <h5>{t('foot.c3')}</h5>
            <a href="mailto:contacto@nimbodata.com">{t('foot.email')}</a>
            <span className="foot-static">{t('foot.loc')}</span>
            <Link to="/contacto">{t('nav.cta')}</Link>
          </div>
        </div>
        <div className="foot-bot">
          <p>{t('foot.rights')}</p>
          <p>{t('foot.made')}</p>
        </div>
      </div>
    </footer>
  )
}

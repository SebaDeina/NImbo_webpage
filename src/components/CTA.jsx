import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { whatsappUrl } from '../config/whatsapp'
import { LogoMedallion } from './g/Art'

/* Cierre de página: medallón con el logo grabado + contacto. */
export default function CTA() {
  const { t } = useLang()
  return (
    <section className="paper colophon">
      <div className="wrap">
        <div className="orn"><span />✦<span /></div>
        <LogoMedallion />
        <div className="eyebrow">De la idea al impacto</div>
        <p className="lead">{t('cta.lead')}</p>
        <div className="col-btns">
          <a className="btn btn-solid" href={whatsappUrl(t('wa.message'))} data-cta="cierre" target="_blank" rel="noopener noreferrer">
            Escribinos por WhatsApp <span className="arr">→</span>
          </a>
          <Link className="btn btn-ghost" to="/contacto">
            Contanos tu idea
          </Link>
        </div>
        <p className="col-note">Sin compromiso · Respuesta en menos de 24 h</p>
        <div className="orn"><span />✦<span /></div>
      </div>
    </section>
  )
}

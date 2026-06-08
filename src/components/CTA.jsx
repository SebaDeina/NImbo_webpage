import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { useContact } from '../contexts/ContactContext'
import { useIsMobile } from '../hooks/useIsMobile'
import Reveal from './Reveal'
import { IconArrowRight } from './Icons'

export default function CTA() {
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
    <section className="cta" id="contacto" data-screen-label="CTA">
      <div className="wrap">
        <Reveal as="p" className="eyebrow no-dot">
          {t('cta.eyebrow')}
        </Reveal>
        <Reveal as="h2" delay={1} className="display">
          {t('cta.title')}
        </Reveal>
        <Reveal as="p" delay={2} className="lead">
          {t('cta.lead')}
        </Reveal>
        <Reveal delay={2} className="cta-actions">
          <Link to="/contacto" className="btn btn-primary" onClick={onContact}>
            <span>{t('cta.btn')}</span> <IconArrowRight size={18} className="arr" />
          </Link>
        </Reveal>
        <Reveal as="p" delay={3} className="cta-note">
          {t('cta.noteText')}{' '}
          <a href="mailto:contacto@nimbodata.com">contacto@nimbodata.com</a>
        </Reveal>
      </div>
    </section>
  )
}

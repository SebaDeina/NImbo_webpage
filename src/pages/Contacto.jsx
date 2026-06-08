import { useLang } from '../i18n/LangContext'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'

export default function Contacto() {
  const { t } = useLang()

  return (
    <main className="page contact-page">
      <div className="contact-glow" aria-hidden="true" />
      <section className="section">
        <div className="wrap contact-grid">
          <div className="contact-intro">
            <Reveal as="p" className="eyebrow no-dot">
              {t('contact.eyebrow')}
            </Reveal>
            <Reveal as="h1" delay={1} className="display">
              {t('contact.title')}
            </Reveal>
            <Reveal as="p" delay={2} className="lead">
              {t('contact.lead')}
            </Reveal>

            <Reveal className="contact-info" delay={2}>
              <div className="ci">
                <span className="ci-k">{t('foot.c3')}</span>
                <a className="ci-v" href="mailto:contacto@nimbodata.com">
                  contacto@nimbodata.com
                </a>
              </div>
              <div className="ci">
                <span className="ci-k">{t('contact.locK')}</span>
                <span className="ci-v">{t('foot.loc')}</span>
              </div>
              <div className="ci">
                <span className="ci-k">{t('contact.respK')}</span>
                <span className="ci-v">{t('contact.resp')}</span>
              </div>
            </Reveal>
          </div>

          <Reveal className="contact-form-wrap" delay={1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  )
}

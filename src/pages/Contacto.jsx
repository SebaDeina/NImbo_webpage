import { useLang } from '../i18n/LangContext'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'
import { useSeo } from '../hooks/useSeo'

export default function Contacto() {
  const { t } = useLang()
  useSeo({
    title: 'Contacto — Nimbo | Automatización, IA y páginas web para pymes',
    description:
      'Contactá a Nimbo para automatizar tu negocio, implementar IA, diseñar tu página web o analizar tus datos. Consultá gratis y sin compromiso.',
    path: '/contacto',
  })

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

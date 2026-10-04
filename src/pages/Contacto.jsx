import { useLang } from '../i18n/LangContext'
import ContactForm from '../components/ContactForm'
import PageHero from '../components/g/PageHero'
import { whatsappUrl } from '../config/whatsapp'
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
    <main className="g-main">
      <PageHero>
        <div className="eyebrow">Hablemos</div>
        <h1>
          Contanos <em>tu idea</em>
        </h1>
        <p className="hero-sub">{t('contact.lead')}</p>
      </PageHero>
      <section className="paper contact-body">
        <div className="wrap contact-grid">
          <div className="contact-aside">
            <div className="eyebrow">El camino más rápido</div>
            <p className="lead">Escribinos por WhatsApp y te respondemos el mismo día. O completá el formulario y te contactamos nosotros.</p>
            <a className="btn btn-solid" href={whatsappUrl(t('wa.message'))} data-cta="contacto" target="_blank" rel="noopener noreferrer">
              Escribinos por WhatsApp <span className="arr">→</span>
            </a>
            <ul className="contact-list">
              <li><b>Mail</b> <a href="mailto:contacto@nimbodata.com" data-cta="contacto">contacto@nimbodata.com</a></li>
              <li><b>Ubicación</b> Buenos Aires, Argentina</li>
              <li><b>Respuesta</b> En menos de 24 h</li>
            </ul>
          </div>
          <div className="contact-card">
            <div className="contact-card-in">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

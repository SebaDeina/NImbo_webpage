import { useLang } from '../i18n/LangContext'
import ContactForm from '../components/ContactForm'
import { NdPageHero, WA_LABEL, WaLink } from '../components/nd/Nd'
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
    <main className="nd-page-main">
      <NdPageHero eyebrow="Hablemos" title="Contanos tu idea">
        <p>{t('contact.lead')}</p>
      </NdPageHero>
      <section className="nd-wrap ct-grid">
        <div className="ct-aside">
          <h2>El camino más rápido</h2>
          <p>Escribinos por WhatsApp y te respondemos el mismo día. O completá el formulario y te contactamos nosotros.</p>
          <WaLink cta="contacto" msg={t('wa.message')} className="nd-btn">
            WhatsApp {WA_LABEL}
          </WaLink>
          <dl className="ct-list">
            <div>
              <dt>Mail</dt>
              <dd>
                <a href="mailto:contacto@nimbodata.com" data-cta="contacto">
                  contacto@nimbodata.com
                </a>
              </dd>
            </div>
            <div>
              <dt>Ubicación</dt>
              <dd>Buenos Aires, Argentina</dd>
            </div>
            <div>
              <dt>Respuesta</dt>
              <dd>En menos de 24 h</dd>
            </div>
          </dl>
        </div>
        <div className="ct-card">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}

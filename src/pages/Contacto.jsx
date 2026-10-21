import { useLang } from '../i18n/LangContext'
import ContactForm from '../components/ContactForm'
import { NdPageHero, WA_LABEL, WaLink } from '../components/nd/Nd'
import Ofertas from '../components/nd/Ofertas'
import { useSeo } from '../hooks/useSeo'

export default function Contacto() {
  const { t } = useLang()
  useSeo({
    title: 'Contacto — Nimbo Consulting | IA y automatización para pymes',
    description:
      'Pedí un diagnóstico a Nimbo Consulting para automatizar procesos, implementar agentes de IA o tableros de gestión en tu empresa. La primera reunión es sin cargo.',
    path: '/contacto',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          '@id': 'https://www.nimbodata.com/contacto#page',
          name: 'Contacto — Nimbo Consulting',
          description:
            'Página de contacto de Nimbo para conversar sobre automatización, agentes de IA, datos, desarrollo web y software a medida para pymes.',
          url: 'https://www.nimbodata.com/contacto',
          inLanguage: 'es-AR',
          isPartOf: { '@id': 'https://www.nimbodata.com/#website' },
          about: { '@id': 'https://www.nimbodata.com/#business' },
          breadcrumb: { '@id': 'https://www.nimbodata.com/contacto#breadcrumb' },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.nimbodata.com/contacto#breadcrumb',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: 'https://www.nimbodata.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Contacto',
              item: 'https://www.nimbodata.com/contacto',
            },
          ],
        },
      ],
    },
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
      <Ofertas />
    </main>
  )
}

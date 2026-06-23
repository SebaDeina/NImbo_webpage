import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { useContact } from '../contexts/ContactContext'
import { useIsMobile } from '../hooks/useIsMobile'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$499',
    currency: 'USD/mes',
    desc: 'Para negocios que dan sus primeros pasos en automatización. Setup inicial bonificado por lanzamiento.',
    features: ['Hasta 3 automatizaciones activas', '1 integración', 'Dashboard básico', 'Soporte async', 'Revisión mensual'],
    ctaKey: 'pricing.cta.starter',
    featured: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$899',
    currency: 'USD/mes',
    desc: 'Para equipos en crecimiento que necesitan automatización avanzada e inteligencia de datos.',
    features: ['Hasta 10 automatizaciones activas', 'Hasta 5 integraciones', 'Dashboard + alertas', '1 agente IA', 'Reunión mensual', 'Soporte prioritario'],
    ctaKey: 'pricing.cta.growth',
    featured: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$1.499',
    currency: '+ USD/mes',
    desc: 'Para organizaciones con necesidades específicas. Setup y alcance definidos a medida.',
    features: ['Roadmap mensual de automatización', 'Integraciones avanzadas ilimitadas', 'IA personalizada para tu sector', 'Reporting ejecutivo', 'SLA acordado', 'Setup a medida'],
    ctaKey: 'pricing.cta.scale',
    featured: false,
  },
]

export default function Pricing() {
  const { t } = useLang()
  const { openContact } = useContact()
  const isMobile = useIsMobile()

  const onContact = (e) => {
    if (isMobile) { e.preventDefault(); openContact() }
  }

  return (
    <section className="section pricing-section" id="precios">
      <div className="wrap">
        <div className="pricing-head">
          <p className="pricing-eyebrow">{t('pricing.eyebrow')}</p>
          <h2 className="pricing-title">{t('pricing.title')}</h2>
          <p className="pricing-sub">{t('pricing.sub')}</p>
        </div>

        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <div key={plan.id} className={`price-card${plan.featured ? ' price-card--featured' : ''}`}>
              {plan.featured && (
                <div className="price-badge">{t('pricing.popular')}</div>
              )}
              <div className="price-name">{plan.name}</div>
              <div className="price-amount">
                <sup>$</sup>{plan.price.replace('$', '')}<span className="price-mo"> {plan.currency}</span>
              </div>
              <p className="price-desc">{plan.desc}</p>
              <hr className="price-divider" />
              <ul className="price-features">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link
                to="/contacto"
                className={`btn-price${plan.featured ? ' btn-price--featured' : ''}`}
                onClick={onContact}
              >
                {t(plan.ctaKey)}
              </Link>
            </div>
          ))}
        </div>

        <p className="pricing-note">{t('pricing.note')}</p>
      </div>
    </section>
  )
}

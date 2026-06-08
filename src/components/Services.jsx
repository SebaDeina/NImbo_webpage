import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import Reveal from './Reveal'
import ServiceCloud from './ServiceCloud'

const SERVICES = [
  { key: 'svc1' },
  { key: 'svc2' },
  { key: 'svc3' },
  { key: 'svc4' },
]

export default function Services() {
  const { t } = useLang()
  const [open, setOpen] = useState(null)

  const toggle = (key) => setOpen((prev) => (prev === key ? null : key))

  return (
    <section className="section services" id="servicios" data-screen-label="Servicios">
      <div className="wrap">
        <div className="shead">
          <Reveal as="p" className="eyebrow">
            {t('svc.eyebrow')}
          </Reveal>
          <Reveal as="h2" delay={1} className="display">
            {t('svc.title')}
          </Reveal>
          <Reveal as="p" delay={2} className="lead">
            {t('svc.lead')}
          </Reveal>
        </div>

        <div className="svc-list">
          {SERVICES.map(({ key }) => {
            const isOpen = open === key
            return (
              <Reveal as="article" className={`svc-acc${isOpen ? ' open' : ''}`} key={key}>
                {!isOpen ? (
                  <button
                    type="button"
                    className="svc-acc-trigger"
                    onClick={() => toggle(key)}
                    aria-expanded={false}
                  >
                    <ServiceCloud variant={key} shape="pill" />
                    <span className="svc-acc-title">{t(`${key}.name`)}</span>
                    <span className="svc-acc-icon" aria-hidden="true">+</span>
                  </button>
                ) : (
                  <div className="svc-acc-card">
                    <button
                      type="button"
                      className="svc-acc-card-head"
                      onClick={() => toggle(key)}
                      aria-expanded={true}
                    >
                      <ServiceCloud variant={key} shape="square" />
                      <span className="svc-acc-title">{t(`${key}.name`)}</span>
                      <span className="svc-acc-icon" aria-hidden="true">−</span>
                    </button>
                    <div className="svc-acc-card-body">
                      <p className="svc-acc-line">{t(`${key}.line`)}</p>
                      <p className="svc-acc-desc">{t(`${key}.tag`)}</p>
                      <div className="svc-deliv">
                        <span className="tag">{t(`${key}.d1`)}</span>
                        <span className="tag">{t(`${key}.d2`)}</span>
                        <span className="tag">{t(`${key}.d3`)}</span>
                        <span className="tag">{t(`${key}.d4`)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

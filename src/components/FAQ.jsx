import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import Reveal from './Reveal'

const QUESTIONS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6']

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-body" style={{ '--faq-h': open ? '500px' : '0px' }}>
        <p className="faq-a">{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t } = useLang()
  const [open, setOpen] = useState(null)

  return (
    <section className="section faq" id="faq" data-screen-label="FAQ">
      <div className="wrap">
        <div className="faq-layout">
          <div className="faq-intro">
            <Reveal as="p" className="eyebrow">{t('faq.eyebrow')}</Reveal>
            <Reveal as="h2" delay={1} className="display faq-display">
              {t('faq.title1')}
              <br />
              <span className="faq-hl">{t('faq.titleHL')}</span>
            </Reveal>
          </div>
          <div className="faq-list">
            {QUESTIONS.map((key, i) => (
              <Reveal key={key} delay={i % 3}>
                <FAQItem
                  q={t(`faq.${key}`)}
                  a={t(`faq.a${key.slice(1)}`)}
                  open={open === key}
                  onToggle={() => setOpen(open === key ? null : key)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

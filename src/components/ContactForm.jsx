import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { submitContact } from '../lib/cms'

const STEPS = 3

const COUNTRIES = [
  { cc: '+54', flag: '🇦🇷' },
  { cc: '+1', flag: '🇺🇸' },
  { cc: '+34', flag: '🇪🇸' },
  { cc: '+52', flag: '🇲🇽' },
  { cc: '+55', flag: '🇧🇷' },
  { cc: '+56', flag: '🇨🇱' },
  { cc: '+57', flag: '🇨🇴' },
  { cc: '+51', flag: '🇵🇪' },
  { cc: '+598', flag: '🇺🇾' },
  { cc: '+44', flag: '🇬🇧' },
]

const TOPICS = [
  { v: 'branding', es: 'Branding', en: 'Branding' },
  { v: 'web', es: 'Web / E-commerce', en: 'Web / E-commerce' },
  { v: 'datos', es: 'Datos / Dashboards', en: 'Data / Dashboards' },
  { v: 'ia', es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
  { v: 'otro', es: 'Otro', en: 'Other' },
]

const BUDGETS = [
  { v: 'u10', es: 'Menos de $10K', en: 'Under $10K' },
  { v: '10-25', es: '$10K - $25K', en: '$10K - $25K' },
  { v: '25-50', es: '$25K - $50K', en: '$25K - $50K' },
  { v: '50-100', es: '$50K - $100K', en: '$50K - $100K' },
  { v: '100-500', es: '$100K - $500K', en: '$100K - $500K' },
  { v: '500+', es: '$500K+', en: '$500K+' },
  { v: 'na', es: 'N/A', en: 'N/A' },
]

const EMPTY = {
  firstName: '',
  lastName: '',
  email: '',
  cc: '+54',
  phone: '',
  company: '',
  topic: '',
  budget: '',
  message: '',
}

export default function ContactForm({ onSubmitted }) {
  const { t, lang } = useLang()
  const [step, setStep] = useState(0)
  const [data, setData] = useState(EMPTY)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }))
  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)

  const validStep = () => {
    if (step === 0) return data.firstName.trim() && data.email.trim() && emailOk
    if (step === 1) return !!data.topic
    if (step === 2) return data.message.trim().length > 0
    return true
  }

  const next = () => {
    if (!validStep()) return setError(t('contact.err'))
    setError('')
    setStep((s) => Math.min(s + 1, STEPS - 1))
  }
  const back = () => {
    setError('')
    setStep((s) => Math.max(s - 1, 0))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < STEPS - 1) return next()
    if (!validStep()) return setError(t('contact.err'))
    setSending(true)
    setError('')
    try {
      await submitContact({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim() || undefined,
        email: data.email.trim(),
        countryCode: data.cc,
        phone: data.phone.trim() || undefined,
        company: data.company.trim() || undefined,
        topic: data.topic,
        budget: data.budget || undefined,
        message: data.message.trim(),
        lang,
      })
      setSent(true)
      onSubmitted?.()
    } catch {
      setError(t('contact.fail'))
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="cform-done">
        <div className="cform-check">✓</div>
        <p className="lead">{t('contact.sent')}</p>
      </div>
    )
  }

  const stepTitle = [t('contact.s1'), t('contact.s2'), t('contact.s3')][step]

  return (
    <form className="cform" onSubmit={handleSubmit} noValidate>
      <div className="cform-progress">
        <div className="cform-steplabel">
          <span className="cform-stepnum">
            {t('contact.step')} {step + 1} {t('contact.of')} {STEPS}
          </span>
          <span className="cform-steptitle">{stepTitle}</span>
        </div>
        <div className="cform-bar">
          <span style={{ width: `${((step + 1) / STEPS) * 100}%` }} />
        </div>
      </div>

      {step === 0 && (
        <div className="cform-grid">
          <label className="field">
            <span>
              {t('contact.fFirst')} <i className="req">*</i>
            </span>
            <input value={data.firstName} onChange={set('firstName')} placeholder={t('contact.fFirstPh')} />
          </label>
          <label className="field">
            <span>{t('contact.fLast')}</span>
            <input value={data.lastName} onChange={set('lastName')} placeholder={t('contact.fLastPh')} />
          </label>
          <label className="field span2">
            <span>
              {t('contact.fEmail')} <i className="req">*</i>
            </span>
            <input type="email" value={data.email} onChange={set('email')} placeholder="tu@email.com" />
          </label>
          <label className="field span2">
            <span>{t('contact.fPhone')}</span>
            <div className="phone-row">
              <select value={data.cc} onChange={set('cc')} aria-label="código de país">
                {COUNTRIES.map((c) => (
                  <option key={c.cc} value={c.cc}>
                    {c.flag} {c.cc}
                  </option>
                ))}
              </select>
              <input type="tel" value={data.phone} onChange={set('phone')} placeholder={t('contact.fPhonePh')} />
            </div>
          </label>
          <label className="field span2">
            <span>{t('contact.fCompany')}</span>
            <input value={data.company} onChange={set('company')} placeholder={t('contact.fCompanyPh')} />
          </label>
        </div>
      )}

      {step === 1 && (
        <div className="cform-grid">
          <label className="field span2">
            <span>
              {t('contact.fTopic')} <i className="req">*</i>
            </span>
            <select value={data.topic} onChange={set('topic')} className={data.topic ? '' : 'is-empty'}>
              <option value="">{t('contact.fTopicPh')}</option>
              {TOPICS.map((o) => (
                <option key={o.v} value={o.v}>
                  {o[lang]}
                </option>
              ))}
            </select>
          </label>
          <label className="field span2">
            <span>{t('contact.fBudget')}</span>
            <select value={data.budget} onChange={set('budget')} className={data.budget ? '' : 'is-empty'}>
              <option value="">{t('contact.fBudgetPh')}</option>
              {BUDGETS.map((o) => (
                <option key={o.v} value={o.v}>
                  {o[lang]}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="cform-grid">
          <label className="field span2">
            <span>
              {t('contact.fMsg')} <i className="req">*</i>
            </span>
            <textarea rows={6} value={data.message} onChange={set('message')} placeholder={t('contact.fMsgPh')} />
          </label>
        </div>
      )}

      {error && <p className="cform-error">{error}</p>}

      <div className="cform-actions">
        {step > 0 ? (
          <button type="button" className="btn btn-ghost" onClick={back}>
            ← {t('contact.back')}
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className="btn btn-primary" disabled={sending}>
          <span>
            {sending ? t('contact.sending') : step < STEPS - 1 ? t('contact.next') : t('contact.send')}
          </span>{' '}
          {!sending && <span className="arr">→</span>}
        </button>
      </div>
    </form>
  )
}

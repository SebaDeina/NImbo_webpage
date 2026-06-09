import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { submitContact } from '../lib/cms'
import { IconArrowLeft, IconArrowRight, IconCheck } from './Icons'

const STEPS = 3

const COUNTRIES = [
  { cc: '+54', iso: 'AR' },
  { cc: '+1', iso: 'US' },
  { cc: '+34', iso: 'ES' },
  { cc: '+52', iso: 'MX' },
  { cc: '+55', iso: 'BR' },
  { cc: '+56', iso: 'CL' },
  { cc: '+57', iso: 'CO' },
  { cc: '+51', iso: 'PE' },
  { cc: '+598', iso: 'UY' },
  { cc: '+44', iso: 'GB' },
]

const TOPICS = [
  { v: 'branding', es: 'Branding', en: 'Branding' },
  { v: 'web', es: 'Web / E-commerce', en: 'Web / E-commerce' },
  { v: 'datos', es: 'Datos / Dashboards', en: 'Data / Dashboards' },
  { v: 'ia', es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
  { v: 'otro', es: 'Otro', en: 'Other' },
]

const BUDGETS = [
  { v: 'u500k', es: 'Menos de 500 mil', en: 'Under ARS 500K' },
  { v: '500k-1.5m', es: 'Entre 500 mil y 1,5 millones', en: 'ARS 500K – 1.5M' },
  { v: '1.5m-3m', es: 'Entre 1,5 y 3 millones', en: 'ARS 1.5M – 3M' },
  { v: '3m+', es: 'Más de 3 millones', en: 'Over ARS 3M' },
]

const EMPTY = {
  topic: '',
  fullName: '',
  email: '',
  cc: '+54',
  phone: '',
  budget: '',
  company: '',
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
    if (step === 0) return !!data.topic
    if (step === 1) return data.fullName.trim() && data.email.trim() && emailOk
    return !!data.budget
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
    const nameParts = data.fullName.trim().split(/\s+/)
    const firstName = nameParts.shift() || ''
    const lastName = nameParts.join(' ') || undefined
    try {
      await submitContact({
        firstName,
        lastName,
        email: data.email.trim(),
        countryCode: data.cc,
        phone: data.phone.trim() || undefined,
        company: data.company.trim() || undefined,
        topic: data.topic,
        budget: data.budget,
        message: data.message.trim() || undefined,
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
        <div className="cform-check">
          <IconCheck size={28} />
        </div>
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
        </div>
      )}

      {step === 1 && (
        <div className="cform-grid">
          <label className="field span2">
            <span>
              {t('contact.fFull')} <i className="req">*</i>
            </span>
            <input value={data.fullName} onChange={set('fullName')} placeholder={t('contact.fFullPh')} />
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
                    {c.iso} {c.cc}
                  </option>
                ))}
              </select>
              <input type="tel" value={data.phone} onChange={set('phone')} placeholder={t('contact.fPhonePh')} />
            </div>
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="cform-grid">
          <label className="field span2">
            <span>
              {t('contact.fBudget')} <i className="req">*</i>
            </span>
            <select value={data.budget} onChange={set('budget')} className={data.budget ? '' : 'is-empty'}>
              <option value="">{t('contact.fBudgetPh')}</option>
              {BUDGETS.map((o) => (
                <option key={o.v} value={o.v}>
                  {o[lang]}
                </option>
              ))}
            </select>
          </label>
          <label className="field span2">
            <span>{t('contact.fCompany')}</span>
            <input value={data.company} onChange={set('company')} placeholder={t('contact.fCompanyPh')} />
          </label>
          <label className="field span2">
            <span>{t('contact.fMsg')}</span>
            <textarea rows={5} value={data.message} onChange={set('message')} placeholder={t('contact.fMsgPh')} />
          </label>
        </div>
      )}

      {error && <p className="cform-error">{error}</p>}

      <div className="cform-actions">
        {step > 0 ? (
          <button type="button" className="btn btn-ghost" onClick={back}>
            <IconArrowLeft size={16} /> {t('contact.back')}
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className="btn btn-primary" disabled={sending}>
          <span>
            {sending ? t('contact.sending') : step < STEPS - 1 ? t('contact.next') : t('contact.send')}
          </span>{' '}
          {!sending && <IconArrowRight size={18} className="arr" />}
        </button>
      </div>
    </form>
  )
}

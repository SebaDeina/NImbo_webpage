export const INTAKE_STEPS = [
  'firstName',
  'email',
  'phone',
  'company',
  'topic',
  'message',
  'confirm',
]

export const TOPICS = [
  { v: 'branding', es: 'Branding', en: 'Branding' },
  { v: 'web', es: 'Web / E-commerce', en: 'Web / E-commerce' },
  { v: 'datos', es: 'Datos / Dashboards', en: 'Data / Dashboards' },
  { v: 'ia', es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
  { v: 'otro', es: 'Otro', en: 'Other' },
]

export const BUDGETS = [
  { v: 'u10', es: 'Menos de $10K', en: 'Under $10K' },
  { v: '10-25', es: '$10K - $25K', en: '$10K - $25K' },
  { v: '25-50', es: '$25K - $50K', en: '$25K - $50K' },
  { v: '50-100', es: '$50K - $100K', en: '$50K - $100K' },
  { v: '100-500', es: '$100K - $500K', en: '$100K - $500K' },
  { v: '500+', es: '$500K+', en: '$500K+' },
]

const SKIP_RE = /^(saltar|skip|no|ninguno|n\/a|na|-|—|omitir)$/i
const CONFIRM_RE = /^(si|sí|dale|ok|confirmo|enviar|yes|yep|confirm)$/i
const DENY_RE = /^(no|corregir|volver|editar|cambiar)$/i

const TOPIC_ALIASES = {
  branding: ['branding', 'marca', 'identidad', 'logo', 'naming'],
  web: ['web', 'sitio', 'pagina', 'página', 'ecommerce', 'e-commerce', 'tienda', 'website'],
  datos: ['datos', 'dato', 'dashboard', 'analitica', 'analítica', 'data', 'analytics'],
  ia: ['ia', 'ai', 'inteligencia artificial', 'chatbot', 'agente'],
  otro: ['otro', 'other', 'varios', 'multiple'],
}

const BUDGET_ALIASES = {
  u10: ['u10', '10k', 'menos de 10', 'under 10'],
  '10-25': ['10-25', '10 a 25', '10k-25k'],
  '25-50': ['25-50', '25 a 50', '25k-50k'],
  '50-100': ['50-100', '50 a 100', '50k-100k'],
  '100-500': ['100-500', '100 a 500', '100k-500k'],
  '500+': ['500+', '500k', 'mas de 500', 'más de 500'],
}

export function emptyIntake() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+54',
    phone: '',
    company: '',
    topic: '',
    budget: '',
    message: '',
  }
}

export function isSkip(text) {
  return SKIP_RE.test(text.trim())
}

export function isConfirm(text) {
  return CONFIRM_RE.test(text.trim().toLowerCase())
}

export function isDeny(text) {
  return DENY_RE.test(text.trim().toLowerCase())
}

export function validateEmail(text) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(text.trim())
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function parseTopic(text) {
  const norm = normalize(text)
  for (const [value, aliases] of Object.entries(TOPIC_ALIASES)) {
    if (aliases.some((a) => norm === normalize(a) || norm.includes(normalize(a)))) {
      return value
    }
  }
  return TOPICS.some((t) => t.v === norm) ? norm : null
}

export function parseBudget(text) {
  const norm = normalize(text)
  for (const [value, aliases] of Object.entries(BUDGET_ALIASES)) {
    if (aliases.some((a) => norm.includes(normalize(a)))) return value
  }
  return BUDGETS.some((b) => b.v === norm) ? norm : null
}

export function splitName(text) {
  const parts = text.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return null
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' ') || '',
  }
}

export function nextStep(step) {
  const i = INTAKE_STEPS.indexOf(step)
  return i >= 0 && i < INTAKE_STEPS.length - 1 ? INTAKE_STEPS[i + 1] : null
}

export function topicLabel(value, lang) {
  return TOPICS.find((t) => t.v === value)?.[lang] ?? value
}

export function budgetLabel(value, lang) {
  return BUDGETS.find((b) => b.v === value)?.[lang] ?? value
}

export function buildSummary(data, t, lang) {
  const lines = [
    `• ${t('chat.intake.summary.name')}: ${[data.firstName, data.lastName].filter(Boolean).join(' ')}`,
    `• ${t('chat.intake.summary.email')}: ${data.email}`,
  ]
  if (data.phone?.trim()) {
    lines.push(`• ${t('chat.intake.summary.phone')}: ${data.countryCode} ${data.phone}`)
  }
  if (data.company?.trim()) {
    lines.push(`• ${t('chat.intake.summary.company')}: ${data.company}`)
  }
  lines.push(`• ${t('chat.intake.summary.topic')}: ${topicLabel(data.topic, lang)}`)
  lines.push(`• ${t('chat.intake.summary.message')}: ${data.message}`)
  if (data.budget) {
    lines.push(`• ${t('chat.intake.summary.budget')}: ${budgetLabel(data.budget, lang)}`)
  }
  return lines.join('\n')
}

export function toContactPayload(data, lang) {
  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName?.trim() || undefined,
    email: data.email.trim(),
    countryCode: data.countryCode,
    phone: data.phone?.trim() || undefined,
    company: data.company?.trim() || undefined,
    topic: data.topic,
    budget: data.budget || undefined,
    message: data.message.trim(),
    lang,
    source: 'chat',
  }
}

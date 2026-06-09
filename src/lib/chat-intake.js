export const INTAKE_STEPS = [
  'firstName',
  'email',
  'phone',
  'company',
  'topic',
  'message',
  'budget',
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
  { v: 'u500k', es: 'Menos de 500 mil', en: 'Under ARS 500K' },
  { v: '500k-1.5m', es: 'Entre 500 mil y 1,5 millones', en: 'ARS 500K – 1.5M' },
  { v: '1.5m-3m', es: 'Entre 1,5 y 3 millones', en: 'ARS 1.5M – 3M' },
  { v: '3m+', es: 'Más de 3 millones', en: 'Over ARS 3M' },
]

const SKIP_RE = /^(saltar|skip|no|ninguno|n\/a|na|-|—|omitir)$/i
const CONFIRM_RE = /^(si|sí|dale|ok|confirmo|enviar|yes|yep|confirm)$/i
const DENY_RE = /^(no|corregir|volver|editar|cambiar)$/i

const TOPIC_ALIASES = {
  branding: ['branding', 'marca', 'identidad', 'logo', 'naming', 'rebranding', 'rediseño', 'redesign'],
  web: ['web', 'sitio', 'pagina', 'página', 'ecommerce', 'e-commerce', 'tienda', 'website', 'landing'],
  datos: ['datos', 'dato', 'dashboard', 'analitica', 'analítica', 'data', 'analytics', 'panel'],
  ia: ['ia', 'ai', 'inteligencia artificial', 'chatbot', 'agente', 'bot', 'automatizacion', 'automatización'],
  otro: ['otro', 'other', 'varios', 'multiple'],
}

const DELIVERABLE_KEYWORDS = [
  'landing', 'landing page', 'one page', 'one-page',
  'e-commerce', 'ecommerce', 'tienda online', 'tienda virtual', 'online store',
  'web app', 'webapp', 'aplicacion web', 'aplicación web',
  'dashboard', 'panel de control', 'chatbot', 'agente de ia',
  'rediseño', 'redesign', 'rebranding', 'identidad visual',
  'sitio web', 'página web', 'pagina web', 'sitio completo', 'sitio informativo',
]

const INFO_QUESTION_RE = /^(cuanto|cuánto|precio|costo|plazo|tiempo|como|cómo|que es|qué es|how much|price|cost|timeline|what is)\b/i
const INTENT_VERB_RE = /(quiero|necesito|busco|me interesa|por el momento|arranco con|want|need|looking for|for now)/

const BUDGET_ALIASES = {
  u500k: ['u500k', 'menos de 500 mil', 'under 500k', '500 mil'],
  '500k-1.5m': ['500k-1.5m', '500 mil', '1.5 millones', 'entre 500 mil y 1.5'],
  '1.5m-3m': ['1.5m-3m', '1.5 millones', '3 millones', 'entre 1.5 y 3'],
  '3m+': ['3m+', 'mas de 3 millones', 'más de 3 millones', 'over 3m'],
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

export function nextIntakeStep(step, data) {
  let following = nextStep(step)
  while (following) {
    if (following === 'topic' && data.topic) {
      following = nextStep('topic')
      continue
    }
    if (following === 'message' && data.message?.trim().length >= 3) {
      following = nextStep('message')
      continue
    }
    break
  }
  return following
}

export function inferTopicFromText(text) {
  return parseTopic(text)
}

export function isReadyForIntake(text) {
  const norm = normalize(text)
  if (!norm.trim()) return false

  if (INFO_QUESTION_RE.test(norm.trim()) && !INTENT_VERB_RE.test(norm)) {
    return false
  }

  const hasDeliverable = DELIVERABLE_KEYWORDS.some((kw) => {
    const nkw = normalize(kw)
    return nkw.includes(' ')
      ? norm.includes(nkw)
      : new RegExp(`\\b${nkw}\\b`).test(norm)
  })
  if (!hasDeliverable) return false

  const wordCount = norm.trim().split(/\s+/).length
  if (wordCount <= 10) return true

  return INTENT_VERB_RE.test(norm)
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
  if (data.message?.trim()) {
    lines.push(`• ${t('chat.intake.summary.message')}: ${data.message}`)
  }
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
    message: data.message?.trim() || undefined,
    lang,
    source: 'chat',
  }
}

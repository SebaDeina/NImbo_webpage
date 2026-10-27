import { Resend } from 'resend'
import { buildConfirmation, buildHtml, TOPIC_LABELS, waDigits } from './email-templates.js'

const BUDGET_LABELS = {
  u500k: 'Menos de 500 mil',
  '500k-1.5m': 'Entre 500 mil y 1,5 millones',
  '1.5m-3m': 'Entre 1,5 y 3 millones',
  '3m+': 'Más de 3 millones',
}

const ORIGEN = { chat: 'Chat', nube: 'Chat de la nube', diagnostico: 'Página /diagnostico' }

// Con un WhatsApp o un mail alcanza: el formulario nuevo y la nube aceptan solo WhatsApp.
function validateEntry(entry) {
  if (!entry?.firstName?.trim()) throw httpError(400, 'firstName is required')
  if (!entry?.email?.trim() && !entry?.phone?.trim()) throw httpError(400, 'email or phone is required')
  if (!entry?.topic?.trim() && !entry?.topics?.length) throw httpError(400, 'topic is required')
}

function httpError(status, message) {
  const err = new Error(message)
  err.status = status
  return err
}

const topicsOf = (entry) =>
  (entry.topics?.length ? entry.topics : [entry.topic]).filter(Boolean).map((k) => TOPIC_LABELS[k] ?? k)

function slackField(label, value) {
  if (!value?.trim()) return null
  return { type: 'mrkdwn', text: `*${label}:*\n${value}` }
}

function buildSlackBlocks(entry) {
  const name = [entry.firstName, entry.lastName].filter(Boolean).join(' ')
  const phone = [entry.countryCode, entry.phone].filter(Boolean).join(' ').trim()
  const topic = topicsOf(entry).join(', ')
  const budget = entry.budget ? (BUDGET_LABELS[entry.budget] ?? entry.budget) : null
  const digits = waDigits(entry)

  const fields = [
    slackField('Nombre', name),
    slackField('Email', entry.email),
    slackField('Teléfono', phone),
    slackField('Empresa', entry.company),
    slackField('Tema', topic),
    slackField('Presupuesto', budget),
    slackField('Idioma', entry.lang === 'en' ? 'English' : 'Español'),
    slackField('Rubro', entry.rubro),
    slackField('Origen', ORIGEN[entry.source] ?? 'Formulario web'),
    slackField('Página', entry.page),
  ].filter(Boolean)

  return [
    {
      type: 'header',
      text: { type: 'plain_text', text: 'Nueva consulta — NIMBO', emoji: true },
    },
    { type: 'section', fields },
    ...(entry.message?.trim()
      ? [{ type: 'section', text: { type: 'mrkdwn', text: `*Mensaje:*\n${entry.message}` } }]
      : []),
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: entry.email?.trim()
            ? `Responder a <mailto:${entry.email}|${entry.email}>`
            : `Responder por <https://wa.me/${digits}|WhatsApp>`,
        },
      ],
    },
  ]
}

async function sendSlack(entry, env) {
  const webhookUrl = env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return

  const name = [entry.firstName, entry.lastName].filter(Boolean).join(' ')
  const topic = topicsOf(entry).join(', ')

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `Nueva consulta: ${name} — ${topic}`,
      blocks: buildSlackBlocks(entry),
    }),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(body || `Slack webhook responded with ${response.status}`)
  }
}

async function sendEmail(entry, env) {
  const apiKey = env.RESEND_API_KEY
  if (!apiKey) return

  const resend = new Resend(apiKey)
  const to = env.CONTACT_NOTIFY_EMAIL || 'contacto@nimbodata.com'
  const from = env.RESEND_FROM || 'NIMBO <onboarding@resend.dev>'
  const name = [entry.firstName, entry.lastName].filter(Boolean).join(' ')

  const { error } = await resend.emails.send({
    from,
    to: [to],
    ...(entry.email?.trim() ? { replyTo: entry.email.trim() } : {}),
    subject: `Nueva consulta: ${name} — ${topicsOf(entry).join(', ')}`,
    html: buildHtml(entry),
  })

  if (error) throw new Error(error.message)

  // Acuse al cliente, solo si dejó mail (si dejó WhatsApp se le responde por ahí). Si falla, no tumba la
  // consulta: el aviso interno ya salió.
  if (!entry.email?.trim()) return
  const confirmation = buildConfirmation(entry)
  const { error: confirmError } = await resend.emails.send({
    from,
    to: [entry.email.trim()],
    replyTo: to,
    subject: confirmation.subject,
    html: confirmation.html,
  })
  if (confirmError) console.error('contact confirmation failed:', confirmError.message)
}

export async function handleContactRequest(entry, env = process.env) {
  validateEntry(entry)

  const tasks = []
  if (env.SLACK_WEBHOOK_URL) tasks.push(sendSlack(entry, env))
  if (env.RESEND_API_KEY) tasks.push(sendEmail(entry, env))

  if (tasks.length === 0) {
    throw httpError(503, 'No notification channels configured')
  }

  const results = await Promise.allSettled(tasks)
  if (results.every((r) => r.status === 'rejected')) {
    const reason = results[0]?.reason?.message || 'Notification failed'
    throw httpError(502, reason)
  }

  return { ok: true }
}

export { buildHtml, buildConfirmation }

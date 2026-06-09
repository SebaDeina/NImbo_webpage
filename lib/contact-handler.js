import { Resend } from 'resend'

const TOPIC_LABELS = {
  branding: 'Branding',
  web: 'Web / E-commerce',
  datos: 'Datos / Dashboards',
  ia: 'Inteligencia Artificial',
  otro: 'Otro',
}

const BUDGET_LABELS = {
  u500k: 'Menos de 500 mil',
  '500k-1.5m': 'Entre 500 mil y 1,5 millones',
  '1.5m-3m': 'Entre 1,5 y 3 millones',
  '3m+': 'Más de 3 millones',
}

function validateEntry(entry) {
  if (!entry?.firstName?.trim()) throw httpError(400, 'firstName is required')
  if (!entry?.email?.trim()) throw httpError(400, 'email is required')
  if (!entry?.topic?.trim()) throw httpError(400, 'topic is required')
  if (!entry?.budget?.trim()) throw httpError(400, 'budget is required')
}

function httpError(status, message) {
  const err = new Error(message)
  err.status = status
  return err
}

function row(label, value) {
  if (!value?.trim()) return ''
  return `<tr><td style="padding:8px 12px 8px 0;color:#666;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:8px 0">${value}</td></tr>`
}

function buildHtml(entry) {
  const name = [entry.firstName, entry.lastName].filter(Boolean).join(' ')
  const phone = [entry.countryCode, entry.phone].filter(Boolean).join(' ').trim()
  const topic = TOPIC_LABELS[entry.topic] ?? entry.topic
  const budget = entry.budget ? (BUDGET_LABELS[entry.budget] ?? entry.budget) : null

  return `
    <h2 style="margin:0 0 16px;font-size:20px">Nueva consulta — NIMBO</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;line-height:1.5">
      ${row('Nombre', name)}
      ${row('Email', `<a href="mailto:${entry.email}">${entry.email}</a>`)}
      ${row('Teléfono', phone)}
      ${row('Empresa', entry.company)}
      ${row('Tema', topic)}
      ${row('Presupuesto', budget)}
      ${row('Idioma', entry.lang === 'en' ? 'English' : 'Español')}
      ${row('Origen', entry.source === 'chat' ? 'Chat' : 'Formulario web')}
    </table>
    ${entry.message?.trim() ? `<h3 style="margin:24px 0 8px;font-size:16px">Mensaje</h3><p style="margin:0;white-space:pre-wrap">${entry.message}</p>` : ''}
  `
}

function slackField(label, value) {
  if (!value?.trim()) return null
  return { type: 'mrkdwn', text: `*${label}:*\n${value}` }
}

function buildSlackBlocks(entry) {
  const name = [entry.firstName, entry.lastName].filter(Boolean).join(' ')
  const phone = [entry.countryCode, entry.phone].filter(Boolean).join(' ').trim()
  const topic = TOPIC_LABELS[entry.topic] ?? entry.topic
  const budget = entry.budget ? (BUDGET_LABELS[entry.budget] ?? entry.budget) : null

  const fields = [
    slackField('Nombre', name),
    slackField('Email', entry.email),
    slackField('Teléfono', phone),
    slackField('Empresa', entry.company),
    slackField('Tema', topic),
    slackField('Presupuesto', budget),
    slackField('Idioma', entry.lang === 'en' ? 'English' : 'Español'),
    slackField('Origen', entry.source === 'chat' ? 'Chat' : 'Formulario web'),
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
        { type: 'mrkdwn', text: `Responder a <mailto:${entry.email}|${entry.email}>` },
      ],
    },
  ]
}

async function sendSlack(entry, env) {
  const webhookUrl = env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return

  const name = [entry.firstName, entry.lastName].filter(Boolean).join(' ')
  const topic = TOPIC_LABELS[entry.topic] ?? entry.topic

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
    replyTo: entry.email,
    subject: `Nueva consulta: ${name} — ${TOPIC_LABELS[entry.topic] ?? entry.topic}`,
    html: buildHtml(entry),
  })

  if (error) throw new Error(error.message)
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

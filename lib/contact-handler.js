import { Resend } from 'resend'

const TOPIC_LABELS = {
  branding: 'Branding',
  web: 'Web / E-commerce',
  datos: 'Datos / Dashboards',
  ia: 'Inteligencia Artificial',
  diagnostico: 'Reunión de diagnóstico',
  otro: 'Otro',
}

const BUDGET_LABELS = {
  u500k: 'Menos de 500 mil',
  '500k-1.5m': 'Entre 500 mil y 1,5 millones',
  '1.5m-3m': 'Entre 1,5 y 3 millones',
  '3m+': 'Más de 3 millones',
}

const ORIGEN = { chat: 'Chat', diagnostico: 'Página /diagnostico' }

function validateEntry(entry) {
  if (!entry?.firstName?.trim()) throw httpError(400, 'firstName is required')
  if (!entry?.email?.trim()) throw httpError(400, 'email is required')
  if (!entry?.topic?.trim()) throw httpError(400, 'topic is required')
}

function httpError(status, message) {
  const err = new Error(message)
  err.status = status
  return err
}

const SITE = 'https://www.nimbodata.com'
const LOGO = `${SITE}/icon-192.png`
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Marco común: fondo lavanda, tarjeta blanca, logo arriba y pie. Tablas y estilos en línea para que
// se vea igual en Gmail, Outlook y el celular.
function layout({ preheader, body, footer }) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F1F0FA">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F1F0FA">
  <tr><td align="center" style="padding:32px 16px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
      <tr><td style="padding:0 4px 20px">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="vertical-align:middle"><img src="${LOGO}" width="32" height="32" alt="" style="display:block;border-radius:8px"></td>
          <td style="vertical-align:middle;padding-left:10px;font-family:${FONT};font-size:18px;font-weight:600;color:#26248A">Nimbo</td>
        </tr></table>
      </td></tr>
      <tr><td style="background:#FFFFFF;border:1px solid #E2E0EE;border-radius:20px;padding:32px;font-family:${FONT};color:#4A4868;font-size:15px;line-height:1.6">
        ${body}
      </td></tr>
      <tr><td style="padding:20px 4px 0;font-family:${FONT};font-size:12px;line-height:1.5;color:#5C5A7A;text-align:center">
        ${footer}
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

function button(href, label, primary) {
  const bg = primary ? '#14133A' : '#F1F0FA'
  const color = primary ? '#FFFFFF' : '#14133A'
  return `<a href="${href}" style="display:inline-block;background:${bg};color:${color};text-decoration:none;font-weight:600;font-size:14px;padding:12px 20px;border-radius:999px;margin:0 8px 8px 0">${label}</a>`
}

function chip(text) {
  return `<span style="display:inline-block;background:#F1F0FA;color:#26248A;font-size:12px;font-weight:600;padding:5px 12px;border-radius:999px;margin:0 6px 6px 0">${esc(text)}</span>`
}

function row(label, value) {
  if (!String(value ?? '').trim()) return ''
  return `<tr>
    <td style="padding:10px 16px 10px 0;border-top:1px solid #EEECF5;color:#5C5A7A;font-size:13px;vertical-align:top;white-space:nowrap">${label}</td>
    <td style="padding:10px 0;border-top:1px solid #EEECF5;color:#14133A">${value}</td>
  </tr>`
}

function fechaArgentina(date = new Date()) {
  return new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date)
}

function buildHtml(entry, now = new Date()) {
  const name = [entry.firstName, entry.lastName].filter(Boolean).join(' ')
  const phone = [entry.countryCode, entry.phone].filter(Boolean).join(' ').trim()
  const digits = phone.replace(/\D/g, '')
  const topic = TOPIC_LABELS[entry.topic] ?? entry.topic
  const budget = entry.budget ? (BUDGET_LABELS[entry.budget] ?? entry.budget) : null
  const origen = ORIGEN[entry.source] ?? 'Formulario web'
  const email = esc(entry.email)

  const lines = String(entry.message ?? '').trim().split('\n').filter((l) => l.trim())
  const message = lines.length
    ? `<div style="margin-top:24px;padding:16px 20px;background:#F6F1E7;border-left:3px solid #6665FF;border-radius:12px">
        <div style="font-size:12px;font-weight:600;color:#5C5A7A;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Mensaje</div>
        ${lines
          .map((l) => {
            const i = l.indexOf(':')
            return i > 0 && i < 30
              ? `<div style="margin:2px 0"><span style="color:#5C5A7A">${esc(l.slice(0, i))}:</span> <strong style="color:#14133A;font-weight:600">${esc(l.slice(i + 1).trim())}</strong></div>`
              : `<div style="margin:2px 0;color:#14133A">${esc(l)}</div>`
          })
          .join('')}
      </div>`
    : ''

  const body = `
    <div style="font-size:12px;font-weight:600;color:#6665FF;text-transform:uppercase;letter-spacing:.08em">Nueva consulta</div>
    <h1 style="margin:6px 0 14px;font-size:24px;line-height:1.25;font-weight:600;color:#14133A">${esc(name)}${entry.company?.trim() ? ` <span style="color:#5C5A7A;font-weight:400">· ${esc(entry.company)}</span>` : ''}</h1>
    <div style="margin-bottom:20px">${chip(topic)}${chip(origen)}${budget ? chip(budget) : ''}</div>
    <div style="margin-bottom:8px">
      ${button(`mailto:${email}`, 'Responder por mail', true)}
      ${digits ? button(`https://wa.me/${digits}`, 'Escribir por WhatsApp', false) : ''}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;font-size:14px">
      ${row('Email', `<a href="mailto:${email}" style="color:#26248A">${email}</a>`)}
      ${row('Teléfono', digits ? `<a href="tel:+${digits}" style="color:#26248A">${esc(phone)}</a>` : '')}
      ${row('Empresa', esc(entry.company))}
      ${row('Idioma', entry.lang === 'en' ? 'English' : 'Español')}
    </table>
    ${message}`

  return layout({
    preheader: `${name} — ${topic}`,
    body,
    footer: `Llegó el ${fechaArgentina(now)} desde nimbodata.com`,
  })
}

const CONFIRM = {
  es: {
    subject: 'Recibimos tu consulta — Nimbo',
    hola: (n) => `Hola, ${n}`,
    p1: 'Gracias por escribirnos. Recibimos tu consulta y te vamos a contactar lo antes posible, normalmente dentro de las próximas 24 horas hábiles.',
    resumen: 'Lo que nos contaste',
    tema: 'Tema',
    p2: 'Si querés sumar algo, respondé este mail y nos llega directo.',
    cta: 'Conocé Nimbo',
    firma: 'El equipo de Nimbo',
    pie: 'Recibís este mail porque completaste el formulario de nimbodata.com.',
  },
  en: {
    subject: 'We got your message — Nimbo',
    hola: (n) => `Hi ${n},`,
    p1: "Thanks for reaching out. We received your message and we'll get back to you as soon as possible, usually within one business day.",
    resumen: 'What you told us',
    tema: 'Topic',
    p2: 'If you want to add anything, just reply to this email.',
    cta: 'Visit Nimbo',
    firma: 'The Nimbo team',
    pie: 'You are receiving this email because you filled out the form at nimbodata.com.',
  },
}

function buildConfirmation(entry) {
  const t = entry.lang === 'en' ? CONFIRM.en : CONFIRM.es
  const topic = TOPIC_LABELS[entry.topic] ?? entry.topic
  const body = `
    <h1 style="margin:0 0 14px;font-size:24px;line-height:1.25;font-weight:600;color:#14133A">${esc(t.hola(entry.firstName.trim()))}</h1>
    <p style="margin:0 0 20px">${t.p1}</p>
    <div style="padding:16px 20px;background:#F1F0FA;border-radius:12px;margin-bottom:20px">
      <div style="font-size:12px;font-weight:600;color:#5C5A7A;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">${t.resumen}</div>
      <div style="color:#14133A"><span style="color:#5C5A7A">${t.tema}:</span> <strong style="font-weight:600">${esc(topic)}</strong></div>
    </div>
    <p style="margin:0 0 24px">${t.p2}</p>
    ${button(SITE, t.cta, true)}
    <p style="margin:24px 0 0;color:#14133A;font-weight:600">${t.firma}</p>`
  return {
    subject: t.subject,
    html: layout({ preheader: t.p1, body, footer: `${t.pie}<br><a href="${SITE}" style="color:#5C5A7A">nimbodata.com</a>` }),
  }
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
    slackField('Origen', ORIGEN[entry.source] ?? 'Formulario web'),
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

  // Acuse al cliente: si falla, no tumba la consulta (el aviso interno ya salió).
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

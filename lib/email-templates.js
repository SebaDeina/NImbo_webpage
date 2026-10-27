// Los dos mails del contacto (lib/contact-handler.js) con el diseño del sitio nuevo: hoja blanca con borde fino,
// cielo en líneas, etiquetas en mono y un solo acento violeta.
//   buildHtml(entry, now)     → aviso para Nimbo: quién escribió, cómo responderle y qué contó
//   buildConfirmation(entry)  → acuse corto para quien escribió (solo si dejó mail)
// Aceptan lo que mandan todos los formularios: el tema viejo (`topic`) o varios (`topics`), contacto solo por
// WhatsApp, y el origen "nube" con la página desde donde escribió (`page`) y el rubro.
// Tablas y estilos en línea para que se vea igual en Gmail, Outlook y el celular. Las imágenes salen de
// public/email/ (logo.png, cielo.jpg, nube.png) con URL absoluta.

const SITE = 'https://www.nimbodata.com'
const WA_NIMBO = '5491124036836'

const INK = '#14133A'
const TEXT = '#55536F'
const MUTED = '#8A88A3'
const LINE = '#E6E4F0'
const ACC = '#4F4FD5'
const MIST = '#F6F5FC'
const FONT = "'Geist','Hanken Grotesk',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"
const MONO = "'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"

// los temas del formulario nuevo y los del viejo, para que los dos lleguen con nombre
export const TOPIC_LABELS = {
  'agentes-de-ia': 'Atender WhatsApp e Instagram',
  automatizaciones: 'Sacar tareas repetidas',
  'datos-y-tableros': 'Tener mis números claros',
  'software-a-medida': 'Un sistema a medida',
  beta: 'Sumarme a BETA',
  branding: 'Branding',
  web: 'Web / E-commerce',
  datos: 'Datos / Dashboards',
  ia: 'Inteligencia Artificial',
  diagnostico: 'Reunión de diagnóstico',
  otro: 'Todavía no sé',
}

const ORIGEN = { nube: 'Chat de la nube', chat: 'Chat', diagnostico: 'Página /diagnostico' }

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function fechaArgentina(date = new Date()) {
  return new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date)
}

// número para wa.me: los celulares de Argentina van con 549 (+54 11 … → 54911…); sin prefijo se asume Argentina
export function waDigits(entry) {
  let d = [entry.countryCode, entry.phone].filter(Boolean).join('').replace(/\D/g, '')
  if (!entry.phone || !d) return ''
  if (!entry.countryCode && !String(entry.phone).trim().startsWith('+')) d = `54${d.replace(/^0/, '')}`
  if (/^54(?!9)\d{10}$/.test(d)) d = `549${d.slice(2)}`
  return d
}

// lo que se repite en los dos mails
function datos(entry) {
  const name = [entry.firstName, entry.lastName].filter(Boolean).join(' ').trim()
  const phone = [entry.countryCode, entry.phone].filter(Boolean).join(' ').trim()
  const keys = entry.topics?.length ? entry.topics : entry.topic ? [entry.topic] : []
  return {
    name,
    phone,
    digits: waDigits(entry),
    email: entry.email?.trim() || '',
    topics: keys.map((k) => TOPIC_LABELS[k] ?? k),
    origen: ORIGEN[entry.source] ?? 'Formulario web',
    lines: String(entry.message ?? '').trim().split('\n').filter((l) => l.trim()),
  }
}

const label = (text, color = MUTED) =>
  `<div style="font-family:${MONO};font-size:11px;line-height:1;letter-spacing:.08em;text-transform:uppercase;color:${color}">${text}</div>`

function button(href, text, primary) {
  const style = primary
    ? `background:${ACC};color:#FFFFFF;border:1px solid ${ACC}`
    : `background:#FFFFFF;color:${INK};border:1px solid ${LINE}`
  return `<a href="${href}" style="display:inline-block;${style};text-decoration:none;font-family:${FONT};font-weight:500;font-size:14px;line-height:1;padding:13px 18px;border-radius:8px;margin:0 8px 8px 0">${text}&nbsp;&nbsp;↗</a>`
}

function chip(text) {
  return `<span style="display:inline-block;border:1px solid ${LINE};color:${INK};font-family:${MONO};font-size:11px;letter-spacing:.04em;padding:6px 10px;border-radius:6px;margin:0 6px 6px 0">${esc(text)}</span>`
}

function row(name, value) {
  if (!String(value ?? '').trim()) return ''
  return `<tr>
    <td width="96" style="padding:12px 16px 12px 0;border-top:1px solid ${LINE};vertical-align:top;white-space:nowrap">${label(name)}</td>
    <td style="padding:10px 0;border-top:1px solid ${LINE};color:${INK};font-size:14px;line-height:1.5">${value}</td>
  </tr>`
}

function mensaje(lines) {
  if (!lines.length) return ''
  return lines
    .map((l) => {
      const i = l.indexOf(':')
      return i > 0 && i < 30
        ? `<div style="margin:2px 0"><span style="color:${MUTED}">${esc(l.slice(0, i))}:</span> ${esc(l.slice(i + 1).trim())}</div>`
        : `<div style="margin:2px 0">${esc(l)}</div>`
    })
    .join('')
}

// la hoja: logo y una etiqueta arriba, el cielo en líneas, el cuerpo y el pie afuera de la hoja
function layout({ preheader, tag, body, footer, img }) {
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>@media (max-width:600px){.pad{padding:24px 20px !important}.h1{font-size:28px !important}}</style>
</head>
<body style="margin:0;padding:0;background:${MIST}">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${MIST}">
  <tr><td align="center" style="padding:32px 12px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border:1px solid ${LINE};border-radius:14px">
      <tr><td class="pad" style="padding:28px 32px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="vertical-align:middle"><a href="${SITE}"><img src="${img}/logo.png" width="96" height="17" alt="nimbo" style="display:block;border:0"></a></td>
          <td align="right" style="vertical-align:middle">${label(`<span style="color:${ACC}">●</span>&nbsp; ${tag}`, INK)}</td>
        </tr></table>
      </td></tr>
      <tr><td class="pad" style="padding:22px 32px 0">
        <img src="${img}/cielo.jpg" width="536" alt="" style="display:block;width:100%;max-width:536px;height:auto;border:1px solid ${LINE};border-radius:10px">
      </td></tr>
      <tr><td class="pad" style="padding:30px 32px 32px;font-family:${FONT};color:${TEXT};font-size:15px;line-height:1.6">
        ${body}
      </td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
      <tr><td style="padding:22px 16px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:${MUTED};text-align:center">
        ${footer}
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

const h1 = (html) =>
  `<h1 class="h1" style="margin:0 0 14px;font-family:${FONT};font-size:32px;line-height:1.1;letter-spacing:-.03em;font-weight:500;color:${INK}">${html}</h1>`

// aviso para Nimbo: quién escribió, cómo responderle y qué contó
export function buildHtml(entry, now = new Date(), { img = `${SITE}/email` } = {}) {
  const d = datos(entry)
  const email = esc(d.email)
  const empresa = entry.company?.trim() ? ` <span style="color:${MUTED}">· ${esc(entry.company)}</span>` : ''

  const body = `
    ${label('Nueva consulta', ACC)}
    <div style="height:12px"></div>
    ${h1(`${esc(d.name)}${empresa}`)}
    <div style="margin-bottom:18px">${d.topics.map(chip).join('')}${chip(d.origen)}${entry.page ? chip(entry.page) : ''}</div>
    <div style="margin-bottom:10px">
      ${d.digits ? button(`https://wa.me/${d.digits}`, 'Responder por WhatsApp', true) : ''}
      ${d.email ? button(`mailto:${email}`, 'Responder por mail', !d.digits) : ''}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px">
      ${row('Mail', d.email ? `<a href="mailto:${email}" style="color:${ACC};text-decoration:none">${email}</a>` : '')}
      ${row('WhatsApp', d.digits ? `<a href="https://wa.me/${d.digits}" style="color:${ACC};text-decoration:none">${esc(d.phone)}</a>` : '')}
      ${row('Empresa', esc(entry.company))}
      ${row('Rubro', esc(entry.rubro))}
      ${row('Mensaje', mensaje(d.lines))}
    </table>`

  return layout({
    preheader: `${d.name} — ${d.topics.join(', ') || d.origen}`,
    tag: d.origen,
    body,
    img,
    footer: `Llegó el ${fechaArgentina(now)} desde nimbodata.com`,
  })
}

// acuse para quien escribió: corto, que sepa que llegó y cuándo le respondemos. Si no dejó mail no se manda
// (el aviso interno sí sale y se le responde por WhatsApp).
export function buildConfirmation(entry, { img = `${SITE}/email` } = {}) {
  const d = datos(entry)
  const nombre = esc((entry.firstName || d.name).trim().split(' ')[0])

  const body = `
    ${h1(`Hola, ${nombre}.<br>Ya nos llegó tu consulta.`)}
    <p style="margin:0 0 22px">Te respondemos por ${d.digits ? 'WhatsApp' : 'mail'} dentro de las 24 horas hábiles. Si querés sumar algo, respondé este mail.</p>
    ${button(`https://wa.me/${WA_NIMBO}`, 'Escribinos por WhatsApp', true)}
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:18px">
      <tr>
        <td style="vertical-align:middle;padding-right:10px"><img src="${img}/nube.png" width="44" height="33" alt="" style="display:block;border:0"></td>
        <td style="vertical-align:middle;font-size:14px;color:${INK};font-weight:500">El equipo de Nimbo</td>
      </tr>
    </table>`

  return {
    subject: 'Recibimos tu consulta — Nimbo',
    html: layout({
      preheader: 'Te respondemos dentro de las 24 horas hábiles.',
      tag: 'Consulta recibida',
      body,
      img,
      footer: `<a href="${SITE}" style="color:${MUTED}">nimbodata.com</a> · Recibís este mail porque nos escribiste desde la web.`,
    }),
  }
}

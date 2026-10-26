/*
  Agendador propio de llamadas (/agendar → /api/agendar), en lugar de Cal.com.

  GET  /api/agendar          → horarios libres de los próximos días (mira el Google Calendar de Nimbo).
  GET  /api/agendar?reto=1   → desafío de verificación ("No soy un robot").
  POST /api/agendar          → reserva: valida el desafío, vuelve a mirar que el horario siga libre
                               y crea el evento con link de Meet. Google le manda la invitación al cliente.

  Google: OAuth con refresh token de la cuenta de Nimbo (scripts/google-calendar-token.mjs lo genera).
  Anti-bots, sin servicios externos: prueba de trabajo firmada (el navegador busca un número cuyo
  SHA-256 coincide; tarda ~1 s, y para un bot cada reserva cuesta lo mismo) + campo trampa + tiempo
  mínimo de llenado + una reserva por mail + cada desafío sirve para una sola reserva.
*/
import { createHash, createHmac, randomBytes, randomInt, timingSafeEqual } from 'node:crypto'
import { sendMetaBooking } from './meta-capi.js'

// Argentina no tiene horario de verano desde 2009: siempre UTC-3.
const AR_OFFSET_H = -3
const TZ = 'America/Argentina/Buenos_Aires'

export const BOOKING = {
  minutes: 20,
  days: [1, 2, 3, 4, 5], // lunes a viernes
  startHour: 10,
  endHour: 18, // el último turno empieza 17:40
  minNoticeH: 12,
  horizonDays: 21,
}

function httpError(status, message) {
  const err = new Error(message)
  err.status = status
  return err
}

/* ---------- horarios ---------- */

// Fecha/hora "de reloj" en Argentina → instante real
function arToDate(y, m, d, h, min) {
  return new Date(Date.UTC(y, m, d, h - AR_OFFSET_H, min))
}

// Todos los turnos posibles (sin mirar el calendario) entre ahora+anticipación y el horizonte
export function candidateSlots(now = new Date(), cfg = BOOKING) {
  const earliest = now.getTime() + cfg.minNoticeH * 3600e3
  const arNow = new Date(now.getTime() + AR_OFFSET_H * 3600e3)
  const slots = []
  for (let i = 0; i <= cfg.horizonDays; i++) {
    const day = new Date(Date.UTC(arNow.getUTCFullYear(), arNow.getUTCMonth(), arNow.getUTCDate() + i))
    if (!cfg.days.includes(day.getUTCDay())) continue
    for (let t = cfg.startHour * 60; t + cfg.minutes <= cfg.endHour * 60; t += cfg.minutes) {
      const start = arToDate(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), Math.floor(t / 60), t % 60)
      if (start.getTime() >= earliest) slots.push(start)
    }
  }
  return slots
}

function overlaps(start, minutes, busy) {
  const s = start.getTime()
  const e = s + minutes * 60e3
  return busy.some((b) => s < b.end && e > b.start)
}

export function freeSlots(candidates, busy, minutes = BOOKING.minutes) {
  return candidates.filter((s) => !overlaps(s, minutes, busy))
}

/* ---------- Google ---------- */

async function googleToken(env) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = env
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    throw httpError(503, 'Google Calendar no está configurado')
  }
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.access_token) {
    console.error('google token failed:', res.status, data.error)
    throw httpError(502, 'No se pudo conectar con Google Calendar')
  }
  return data.access_token
}

const calendarId = (env) => env.GOOGLE_CALENDAR_ID || 'primary'

async function gcal(token, path, { method = 'GET', query, body } = {}) {
  const url = new URL(`https://www.googleapis.com/calendar/v3${path}`)
  for (const [k, v] of Object.entries(query ?? {})) url.searchParams.set(k, v)
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    console.error(`gcal ${method} ${path} failed:`, res.status, data.error?.message)
    throw httpError(502, 'Google Calendar respondió con un error')
  }
  return data
}

async function busyBetween(token, env, timeMin, timeMax) {
  const data = await gcal(token, '/freeBusy', {
    method: 'POST',
    body: { timeMin: timeMin.toISOString(), timeMax: timeMax.toISOString(), timeZone: TZ, items: [{ id: calendarId(env) }] },
  })
  const cal = data.calendars?.[calendarId(env)] ?? Object.values(data.calendars ?? {})[0]
  if (cal?.errors?.length) {
    console.error('freeBusy errors:', cal.errors)
    throw httpError(502, 'No se pudo leer la disponibilidad')
  }
  return (cal?.busy ?? []).map((b) => ({ start: Date.parse(b.start), end: Date.parse(b.end) }))
}

/* ---------- anti-bots: prueba de trabajo ---------- */

const POW_MAX = 200000 // el navegador prueba en promedio la mitad: ~1 s (algo más en celulares viejos)
const POW_TTL_MS = 30 * 60e3

const sha256 = (text) => createHash('sha256').update(text).digest('hex')

function powSecret(env) {
  if (env.BOOKING_SECRET) return env.BOOKING_SECRET
  // en local se usa una clave fija; en producción no se reserva sin clave propia
  if (env.VERCEL_ENV === 'production') throw httpError(503, 'Verificación no configurada')
  return 'nimbo-agendar-dev'
}

const sign = (env, challenge) => createHmac('sha256', powSecret(env)).update(challenge).digest('hex')

export function createChallenge(env, now = Date.now()) {
  const salt = `${randomBytes(12).toString('hex')}?expires=${now + POW_TTL_MS}`
  const challenge = sha256(salt + randomInt(POW_MAX))
  return { salt, challenge, max: POW_MAX, signature: sign(env, challenge) }
}

export function verifyChallenge(pow, env, now = Date.now()) {
  const fail = () => httpError(403, 'No pudimos verificar que no seas un robot. Probá de nuevo.')
  if (!pow || typeof pow.salt !== 'string' || typeof pow.challenge !== 'string' || typeof pow.signature !== 'string') {
    throw httpError(400, 'Falta la verificación de "No soy un robot".')
  }
  const expires = Number(new URLSearchParams(pow.salt.split('?')[1] ?? '').get('expires'))
  if (!expires || expires < now) throw httpError(400, 'La verificación venció. Volvé a tocar "No soy un robot".')
  const n = Number(pow.number)
  if (!Number.isInteger(n) || n < 0 || n > POW_MAX) throw fail()
  if (sha256(pow.salt + n) !== pow.challenge) throw fail()
  const expected = Buffer.from(sign(env, pow.challenge))
  const given = Buffer.from(pow.signature)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) throw fail()
}

const MIN_FILL_MS = 4000

/* ---------- handlers ---------- */

export async function handleSlotsRequest(query, env = process.env, now = new Date()) {
  if (query?.reto) return createChallenge(env, now.getTime())
  const candidates = candidateSlots(now)
  if (!candidates.length) return { minutes: BOOKING.minutes, tz: TZ, slots: [] }
  const token = await googleToken(env)
  const last = candidates[candidates.length - 1]
  const busy = await busyBetween(token, env, candidates[0], new Date(last.getTime() + BOOKING.minutes * 60e3))
  return {
    minutes: BOOKING.minutes,
    tz: TZ,
    slots: freeSlots(candidates, busy).map((s) => s.toISOString()),
  }
}

const clean = (v, max) => String(v ?? '').trim().slice(0, max)

function fechaLarga(date) {
  return new Intl.DateTimeFormat('es-AR', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(date)
}

// atribución que manda el navegador (src/lib/attribution.js): solo strings cortos, claves conocidas
const ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid', 'landing', 'referrer', 'fbp', 'fbc']
function cleanAttribution(raw) {
  const out = {}
  for (const k of ATTR_KEYS) {
    const v = clean(raw?.[k], 200)
    if (v) out[k] = v
  }
  return out
}
const attrLine = (a) =>
  [a.utm_source, a.utm_medium, a.utm_campaign, a.utm_content].some(Boolean)
    ? `${a.utm_source || '-'} / ${a.utm_medium || '-'} / ${a.utm_campaign || '-'}${a.utm_content ? ` / ${a.utm_content}` : ''}`
    : null

async function notifySlack(env, b, when, link, attr = {}) {
  if (!env.SLACK_WEBHOOK_URL) return
  const lines = [
    `*Nueva llamada agendada* — ${fechaLarga(when)} h`,
    `${b.name}${b.company ? ` · ${b.company}` : ''} — ${b.email}${b.phone ? ` — ${b.phone}` : ''}`,
    b.topic && `Quiere ver: ${b.topic}`,
    link && `Meet: ${link}`,
    attrLine(attr) && `Anuncio: ${attrLine(attr)}`,
    attr.fbclid && 'Llegó por un clic de Meta (fbclid)',
    attr.gclid && 'Llegó por un clic de Google Ads (gclid)',
  ].filter(Boolean)
  await fetch(env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: lines.join('\n') }),
  }).catch((err) => console.error('booking slack failed:', err.message))
}

export async function handleBookingRequest(body, env = process.env, { now = new Date(), ctx = {} } = {}) {
  // campo trampa: las personas no lo ven; si viene lleno, se responde "ok" sin reservar
  if (clean(body?.website, 200)) return { ok: true }
  if (Number(body?.elapsed) < MIN_FILL_MS) throw httpError(400, 'Probá de nuevo en unos segundos.')

  const b = {
    name: clean(body?.name, 80),
    email: clean(body?.email, 120).toLowerCase(),
    phone: clean(body?.phone, 30),
    company: clean(body?.company, 80),
    topic: clean(body?.topic, 400),
    source: clean(body?.source, 40),
  }
  const attr = cleanAttribution(body?.attribution)
  const eventId = clean(body?.eventId, 64).replace(/[^\w-]/g, '')
  if (!b.name) throw httpError(400, 'Falta tu nombre')
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email)) throw httpError(400, 'El mail no es válido')

  const start = new Date(body?.start)
  if (Number.isNaN(start.getTime())) throw httpError(400, 'Elegí un horario')
  // solo se aceptan horarios que el agendador ofrece (no cualquier fecha que mande un script)
  if (!candidateSlots(now).some((s) => s.getTime() === start.getTime())) {
    throw httpError(409, 'Ese horario ya no está disponible. Elegí otro.')
  }

  verifyChallenge(body?.pow, env, now.getTime())

  const token = await googleToken(env)
  const end = new Date(start.getTime() + BOOKING.minutes * 60e3)
  const cal = encodeURIComponent(calendarId(env))
  const findBooking = (prop) =>
    gcal(token, `/calendars/${cal}/events`, {
      query: { privateExtendedProperty: prop, timeMin: now.toISOString(), singleEvents: 'true', maxResults: '1' },
    }).then((r) => Boolean(r.items?.length))

  // una llamada pendiente por mail (corta a quien reserva todos los horarios con el mismo correo)
  // y cada desafío resuelto sirve para una sola reserva: el calendario mismo guarda cuáles se usaron
  const [sameEmail, usedPow] = await Promise.all([findBooking(`bookingEmail=${b.email}`), findBooking(`bookingPow=${body.pow.challenge}`)])
  if (usedPow) throw httpError(403, 'Esa verificación ya se usó. Volvé a tocar "No soy un robot".')
  if (sameEmail) throw httpError(409, 'Ya tenés una llamada agendada con nosotros. Revisá tu mail para cambiarla.')

  const busy = await busyBetween(token, env, start, end)
  if (overlaps(start, BOOKING.minutes, busy)) throw httpError(409, 'Ese horario se acaba de ocupar. Elegí otro.')

  const event = await gcal(token, `/calendars/${cal}/events`, {
    method: 'POST',
    query: { conferenceDataVersion: '1', sendUpdates: 'all' },
    body: {
      summary: `Diagnóstico Nimbo · ${b.name}${b.company ? ` (${b.company})` : ''}`,
      description: [
        'Llamada agendada desde nimbodata.com/agendar',
        '',
        `Nombre: ${b.name}`,
        `Email: ${b.email}`,
        b.phone ? `WhatsApp: ${b.phone}` : null,
        b.company ? `Empresa: ${b.company}` : null,
        b.topic ? `Quiere ver: ${b.topic}` : null,
        b.source ? `Botón: ${b.source}` : null,
        attrLine(attr) ? `Anuncio (fuente/medio/campaña/contenido): ${attrLine(attr)}` : null,
        attr.fbclid ? `fbclid: ${attr.fbclid}` : null,
        attr.gclid ? `gclid: ${attr.gclid}` : null,
        attr.landing ? `Entró por: ${attr.landing}` : null,
      ]
        .filter((l) => l !== null)
        .join('\n'),
      start: { dateTime: start.toISOString(), timeZone: TZ },
      end: { dateTime: end.toISOString(), timeZone: TZ },
      attendees: [{ email: b.email, displayName: b.name }],
      conferenceData: {
        createRequest: { requestId: `nimbo-${start.getTime()}-${Math.random().toString(36).slice(2, 10)}`, conferenceSolutionKey: { type: 'hangoutsMeet' } },
      },
      // la atribución queda guardada en el evento (Google: hasta 1024 caracteres por valor), filtrable por API
      extendedProperties: {
        private: {
          source: 'nimbo-agendar',
          bookingEmail: b.email,
          bookingPow: body.pow.challenge,
          ...Object.fromEntries(Object.entries(attr).filter(([k]) => !['fbp', 'fbc'].includes(k))),
          ...(eventId ? { metaEventId: eventId } : {}),
        },
      },
      reminders: { useDefault: true },
    },
  })

  await Promise.all([
    notifySlack(env, b, start, event.hangoutLink, attr),
    sendMetaBooking(env, { eventId, b, attr, ctx }),
  ])

  return { ok: true, start: start.toISOString(), end: end.toISOString(), meet: event.hangoutLink ?? null }
}

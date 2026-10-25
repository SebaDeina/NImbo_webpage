/*
  Agendador propio de llamadas (/agendar → /api/agendar), en lugar de Cal.com.

  GET  /api/agendar          → horarios libres de los próximos días (mira el Google Calendar de Nimbo).
  POST /api/agendar          → reserva: verifica el captcha, vuelve a mirar que el horario siga libre
                               y crea el evento con link de Meet. Google le manda la invitación al cliente.

  Google: OAuth con refresh token de la cuenta de Nimbo (scripts/google-calendar-token.mjs lo genera).
  Anti-bots: Cloudflare Turnstile + campo trampa + tiempo mínimo de llenado + una reserva por mail.
*/

// Argentina no tiene horario de verano desde 2009: siempre UTC-3.
const AR_OFFSET_H = -3
const TZ = 'America/Argentina/Buenos_Aires'

export const BOOKING = {
  minutes: 30,
  days: [1, 2, 3, 4, 5], // lunes a viernes
  startHour: 10,
  endHour: 18, // el último turno empieza 17:30
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

/* ---------- anti-bots ---------- */

async function verifyTurnstile(token, ip, env) {
  const secret = env.TURNSTILE_SECRET_KEY
  if (!secret) {
    // en local sin clave se deja pasar; en producción no se reserva sin captcha
    if (env.VERCEL_ENV === 'production') throw httpError(503, 'Captcha no configurado')
    return
  }
  if (!token) throw httpError(400, 'Falta completar la verificación')
  const body = new URLSearchParams({ secret, response: token })
  if (ip) body.set('remoteip', ip)
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
  const data = await res.json().catch(() => ({}))
  if (!data.success) throw httpError(403, 'No pudimos verificar que no seas un robot. Probá de nuevo.')
}

const MIN_FILL_MS = 4000

/* ---------- handlers ---------- */

export async function handleSlotsRequest(_query, env = process.env, now = new Date()) {
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

async function notifySlack(env, b, when, link) {
  if (!env.SLACK_WEBHOOK_URL) return
  const lines = [
    `*Nueva llamada agendada* — ${fechaLarga(when)} h`,
    `${b.name}${b.company ? ` · ${b.company}` : ''} — ${b.email}${b.phone ? ` — ${b.phone}` : ''}`,
    b.topic && `Quiere ver: ${b.topic}`,
    link && `Meet: ${link}`,
  ].filter(Boolean)
  await fetch(env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: lines.join('\n') }),
  }).catch((err) => console.error('booking slack failed:', err.message))
}

export async function handleBookingRequest(body, env = process.env, { ip, now = new Date() } = {}) {
  // campo trampa: las personas no lo ven; si viene lleno, se responde "ok" sin reservar
  if (clean(body?.website, 200)) return { ok: true }
  if (Number(body?.elapsed) < MIN_FILL_MS) throw httpError(400, 'Probá de nuevo en unos segundos.')

  const b = {
    name: clean(body?.name, 80),
    email: clean(body?.email, 120).toLowerCase(),
    phone: clean(body?.phone, 30),
    company: clean(body?.company, 80),
    topic: clean(body?.topic, 400),
  }
  if (!b.name) throw httpError(400, 'Falta tu nombre')
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email)) throw httpError(400, 'El mail no es válido')

  const start = new Date(body?.start)
  if (Number.isNaN(start.getTime())) throw httpError(400, 'Elegí un horario')
  // solo se aceptan horarios que el agendador ofrece (no cualquier fecha que mande un script)
  if (!candidateSlots(now).some((s) => s.getTime() === start.getTime())) {
    throw httpError(409, 'Ese horario ya no está disponible. Elegí otro.')
  }

  await verifyTurnstile(body?.captcha, ip, env)

  const token = await googleToken(env)
  const end = new Date(start.getTime() + BOOKING.minutes * 60e3)
  const cal = encodeURIComponent(calendarId(env))

  // una llamada pendiente por mail: corta a quien reserva todos los horarios con el mismo correo
  const existing = await gcal(token, `/calendars/${cal}/events`, {
    query: { privateExtendedProperty: `bookingEmail=${b.email}`, timeMin: now.toISOString(), singleEvents: 'true', maxResults: '1' },
  })
  if (existing.items?.length) {
    throw httpError(409, 'Ya tenés una llamada agendada con nosotros. Revisá tu mail para cambiarla.')
  }

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
      ]
        .filter((l) => l !== null)
        .join('\n'),
      start: { dateTime: start.toISOString(), timeZone: TZ },
      end: { dateTime: end.toISOString(), timeZone: TZ },
      attendees: [{ email: b.email, displayName: b.name }],
      conferenceData: {
        createRequest: { requestId: `nimbo-${start.getTime()}-${Math.random().toString(36).slice(2, 10)}`, conferenceSolutionKey: { type: 'hangoutsMeet' } },
      },
      extendedProperties: { private: { source: 'nimbo-agendar', bookingEmail: b.email } },
      reminders: { useDefault: true },
    },
  })

  await notifySlack(env, b, start, event.hangoutLink)

  return { ok: true, start: start.toISOString(), end: end.toISOString(), meet: event.hangoutLink ?? null }
}

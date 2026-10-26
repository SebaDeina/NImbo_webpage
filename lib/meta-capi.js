/*
  Meta Conversions API (server-side). Manda Schedule + Lead cuando se crea una reserva en /api/agendar,
  con el mismo event_id que dispara el Pixel en el navegador (Meta deduplica por event_name + event_id).
  Env: META_PIXEL_ID, META_CAPI_TOKEN (token del dataset, solo servidor). Opcional: META_TEST_EVENT_CODE
  (para ver los eventos en "Probar eventos" del Administrador de eventos sin ensuciar los datos reales).
  Si falta config o Meta falla, la reserva sigue igual: esto nunca rompe el agendador.
*/
import { createHash } from 'node:crypto'

const GRAPH = 'https://graph.facebook.com/v21.0'
const sha = (v) => (v ? createHash('sha256').update(String(v).trim().toLowerCase()).digest('hex') : undefined)
const digits = (v) => String(v ?? '').replace(/\D/g, '')

export async function sendMetaBooking(env, { eventId, b, attr = {}, ctx = {} }) {
  const { META_PIXEL_ID, META_CAPI_TOKEN, META_TEST_EVENT_CODE } = env
  if (!META_PIXEL_ID || !META_CAPI_TOKEN || !eventId) return
  const [first, ...rest] = b.name.split(/\s+/)
  const user_data = {
    em: [sha(b.email)],
    ph: b.phone ? [sha(digits(b.phone))] : undefined,
    fn: [sha(first)],
    ln: rest.length ? [sha(rest.join(' '))] : undefined,
    country: [sha('ar')],
    client_ip_address: ctx.ip || undefined,
    client_user_agent: ctx.ua || undefined,
    fbp: attr.fbp || undefined,
    fbc: attr.fbc || undefined,
  }
  const base = {
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: ctx.url || 'https://www.nimbodata.com/agendar',
    user_data,
  }
  const body = {
    data: [
      { ...base, event_name: 'Schedule', event_id: `${eventId}-schedule` },
      { ...base, event_name: 'Lead', event_id: `${eventId}-lead`, custom_data: { content_name: 'diagnostico-20min' } },
    ],
    ...(META_TEST_EVENT_CODE ? { test_event_code: META_TEST_EVENT_CODE } : {}),
  }
  try {
    const res = await fetch(`${GRAPH}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(META_CAPI_TOKEN)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) console.error('meta capi failed:', res.status, (await res.json().catch(() => ({}))).error?.message)
  } catch (err) {
    console.error('meta capi failed:', err.message)
  }
}

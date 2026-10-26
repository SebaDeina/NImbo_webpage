/*
  Meta Pixel (Facebook/Instagram Ads). Se carga en todo el sitio.
  - PageView en cada cambio de ruta (el sitio es una SPA: lo dispara <MetaPageViews /> en App.jsx).
  - Schedule + Lead cuando se confirma una reserva en /agendar, con el mismo event_id que manda
    el servidor por la Conversions API (lib/meta-capi.js) para que Meta no los cuente dos veces.
  El ID sale de VITE_META_PIXEL_ID (Vercel → Environment Variables). Sin ID no se carga nada.
*/

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || ''
const SDK = 'https://connect.facebook.net/en_US/fbevents.js'

function load() {
  if (typeof window === 'undefined' || !PIXEL_ID) return null
  if (window.fbq) return window.fbq
  const n = function (...args) {
    n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args)
  }
  n.push = n
  n.loaded = true
  n.version = '2.0'
  n.queue = []
  window.fbq = n
  if (!window._fbq) window._fbq = n
  const s = document.createElement('script')
  s.async = true
  s.src = SDK
  document.head.appendChild(s)
  n('init', PIXEL_ID)
  return n
}

export function metaPageView() {
  load()?.('track', 'PageView')
}

// eventId: el mismo que se manda a /api/agendar (dedup con la Conversions API)
export function metaBooking(eventId) {
  const fbq = load()
  if (!fbq) return
  fbq('track', 'Schedule', {}, { eventID: `${eventId}-schedule` })
  fbq('track', 'Lead', { content_name: 'diagnostico-20min' }, { eventID: `${eventId}-lead` })
}

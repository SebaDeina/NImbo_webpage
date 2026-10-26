/*
  Atribución de anuncios: guarda utm_*, fbclid y gclid del primer link con parámetros de la sesión
  (y la página de entrada y el referrer) para mandarlos junto con la reserva de /agendar.
  Se guarda en localStorage 30 días (el plazo de atribución de Meta/Google por clic es de 7 a 30 días).
*/

const KEY = 'nimbo_attr'
const TTL = 30 * 24 * 3600e3
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid']

export function captureAttribution() {
  if (typeof window === 'undefined') return
  try {
    const q = new URLSearchParams(window.location.search)
    const found = Object.fromEntries(PARAMS.filter((p) => q.get(p)).map((p) => [p, q.get(p).slice(0, 200)]))
    if (!Object.keys(found).length) return
    // un clic nuevo en un anuncio reemplaza al anterior (último clic pago)
    const data = {
      ...found,
      landing: window.location.pathname.slice(0, 200),
      referrer: document.referrer.slice(0, 200),
      ts: Date.now(),
    }
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    /* modo privado o storage bloqueado: sin atribución */
  }
}

const cookie = (name) => document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1]

export function getAttribution() {
  if (typeof window === 'undefined') return {}
  let data = {}
  try {
    data = JSON.parse(localStorage.getItem(KEY) || '{}')
    if (!data.ts || Date.now() - data.ts > TTL) data = {}
  } catch {
    data = {}
  }
  // cookies del Meta Pixel: mejoran el match de la Conversions API
  const fbp = cookie('_fbp')
  let fbc = cookie('_fbc')
  if (!fbc && data.fbclid) fbc = `fb.1.${data.ts}.${data.fbclid}`
  return { ...data, fbp, fbc }
}

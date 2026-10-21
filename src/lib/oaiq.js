/*
  Píxel de anuncios de ChatGPT (OpenAI). Solo se carga en las landings de los anuncios
  (/diagnostico-ia y /sistemas-conectados), no en el resto del sitio.
  Eventos: page_viewed al entrar y lead_created al tocar cualquier botón de WhatsApp
  (la conversión que se configura en el administrador de anuncios).
*/

const PIXEL_ID = 'WCcLDJ93Qz9b5mYu2NoMnV'
const SDK = 'https://bzrcdn.openai.com/sdk/oaiq.min.js'

function load() {
  if (window.oaiq) return window.oaiq
  const q = (...args) => q.q.push(args)
  q.q = []
  window.oaiq = q
  const s = document.createElement('script')
  s.async = true
  s.src = SDK
  document.head.appendChild(s)
  q('init', { pixelId: PIXEL_ID, debug: import.meta.env.DEV })
  return q
}

export function pixelPageView() {
  load()('measure', 'page_viewed', { type: 'contents' })
}

export function pixelLead() {
  load()('measure', 'lead_created', { type: 'customer_action' })
}

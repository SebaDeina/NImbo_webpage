/** WhatsApp de Nimbo (wa.me: solo dígitos, con código de país). */
export const WHATSAPP_NUMBER = '5491124036836'

export function whatsappUrl(text) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!text) return base
  return `${base}?text=${encodeURIComponent(text)}`
}

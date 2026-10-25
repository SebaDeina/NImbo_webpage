import { handleBookingRequest, handleSlotsRequest } from '../lib/booking-handler.js'

function clientIp(req) {
  return String(req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '').split(',')[0].trim() || undefined
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).json(await handleSlotsRequest(req.query))
    }
    if (req.method === 'POST') {
      return res.status(200).json(await handleBookingRequest(req.body, process.env, { ip: clientIp(req) }))
    }
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    const status = err.status || 500
    if (status >= 500) console.error('agendar:', err)
    return res.status(status).json({ error: err.message || 'Internal error' })
  }
}

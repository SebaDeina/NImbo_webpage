import { handleBookingRequest, handleSlotsRequest } from '../lib/booking-handler.js'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).json(await handleSlotsRequest(req.query))
    }
    if (req.method === 'POST') {
      const ctx = {
        ip: String(req.headers['x-forwarded-for'] || '').split(',')[0].trim(),
        ua: req.headers['user-agent'] || '',
        url: req.headers.referer || '',
      }
      return res.status(200).json(await handleBookingRequest(req.body, process.env, { ctx }))
    }
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    const status = err.status || 500
    if (status >= 500) console.error('agendar:', err)
    return res.status(status).json({ error: err.message || 'Internal error' })
  }
}

import { handleContactRequest } from '../lib/contact-handler.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const result = await handleContactRequest(req.body)
    return res.status(200).json(result)
  } catch (err) {
    const status = err.status || 500
    return res.status(status).json({ error: err.message || 'Internal error' })
  }
}

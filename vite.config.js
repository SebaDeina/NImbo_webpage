import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleContactRequest } from './lib/contact-handler.js'

function contactApiPlugin(env) {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/api/contact' || req.method !== 'POST') return next()

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', async () => {
          try {
            const payload = JSON.parse(body || '{}')
            const result = await handleContactRequest(payload, env)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(result))
          } catch (err) {
            res.statusCode = err.status || 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message || 'Internal error' }))
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), contactApiPlugin(env)],
  }
})

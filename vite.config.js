import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleChatRequest } from './lib/chat-handler.js'
import { handleContactRequest } from './lib/contact-handler.js'

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'))
      } catch {
        reject(Object.assign(new Error('Invalid JSON'), { status: 400 }))
      }
    })
    req.on('error', reject)
  })
}

function apiPlugin(env) {
  const routes = {
    '/api/contact': handleContactRequest,
    '/api/chat': handleChatRequest,
  }

  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const handler = routes[req.url]
        if (!handler || req.method !== 'POST') return next()

        try {
          const payload = await readJsonBody(req)
          const result = await handler(payload, env)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        } catch (err) {
          res.statusCode = err.status || 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err.message || 'Internal error' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // `vite build --ssr` arma la entrada de servidor que usa scripts/prerender.mjs (corre en Node, no se publica)
  if (isSsrBuild) {
    return {
      plugins: [react()],
      build: { outDir: 'dist-ssr', emptyOutDir: true, target: 'node18' },
    }
  }
  return {
    plugins: [react(), apiPlugin(env)],
    build: {
      target: ['chrome72', 'es2019'],
      // el prerender lo lee para poner el CSS de cada página en su <head>; después lo borra
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
  }
})

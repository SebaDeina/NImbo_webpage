import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleChatRequest } from './lib/chat-handler.js'
import { handleContactRequest } from './lib/contact-handler.js'
import { handleBookingRequest, handleSlotsRequest } from './lib/booking-handler.js'
import { guardOldCss, scopeNsCss } from './scripts/scope-ns-css.mjs'

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
    'POST /api/contact': handleContactRequest,
    'POST /api/chat': handleChatRequest,
    'GET /api/agendar': (query) => handleSlotsRequest(query, env),
    'POST /api/agendar': (body) => handleBookingRequest(body, env),
  }

  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost')
        const handler = routes[`${req.method} ${url.pathname}`]
        if (!handler) return next()

        try {
          const payload = req.method === 'GET' ? Object.fromEntries(url.searchParams) : await readJsonBody(req)
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

// El sitio nuevo (src/ns) y las páginas viejas conviven: el CSS nuevo se encierra bajo .ns y el viejo deja de
// aplicar dentro de .ns, así ninguno pisa al otro (ver scripts/scope-ns-css.mjs). blog-scenes.css queda igual:
// las portadas del blog las usan los dos.
const OLD_CSS = /\/src\/(index\.css|styles\/(grabado|home|nd-site|anuncio|robots|automatizaciones)\.css|components\/legacy-ui\.css)$/
function nsScopePlugin() {
  return {
    name: 'ns-scope-css',
    enforce: 'pre',
    transform(code, id) {
      const file = id.split('?')[0]
      if (file.endsWith('/src/ns/styles.css')) return { code: scopeNsCss(code), map: null }
      if (OLD_CSS.test(file)) return { code: guardOldCss(code), map: null }
    },
  }
}

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // `vite build --ssr` arma la entrada de servidor que usa scripts/prerender.mjs (corre en Node, no se publica)
  if (isSsrBuild) {
    return {
      plugins: [nsScopePlugin(), react()],
      build: { outDir: 'dist-ssr', emptyOutDir: true, target: 'node18' },
    }
  }
  return {
    plugins: [nsScopePlugin(), react(), apiPlugin(env)],
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

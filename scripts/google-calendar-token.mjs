/*
  Saca el GOOGLE_REFRESH_TOKEN que usa el agendador (/api/agendar) para leer y crear eventos
  en el Google Calendar de Nimbo. Se corre una sola vez, en tu compu:

    GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... node scripts/google-calendar-token.mjs

  (o con las dos variables ya puestas en .env). Abre Google en el navegador: entrá con la cuenta
  @nimbodata.com dueña del calendario y aceptá. Al final imprime el refresh token para cargarlo
  en Vercel → Settings → Environment Variables.

  El cliente OAuth tiene que ser de tipo "App de escritorio" (Google Cloud → APIs y servicios →
  Credenciales) y la pantalla de consentimiento "Interna" (solo Workspace): así el token no vence.
*/
import http from 'node:http'
import fs from 'node:fs'
import { exec } from 'node:child_process'

// lee .env si existe, sin pisar lo que venga por la terminal
try {
  for (const line of fs.readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
  }
} catch {}

const { GOOGLE_CLIENT_ID: clientId, GOOGLE_CLIENT_SECRET: clientSecret } = process.env
if (!clientId || !clientSecret) {
  console.error('Faltan GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET (en .env o en la terminal).')
  process.exit(1)
}

const PORT = 53682
const redirectUri = `http://127.0.0.1:${PORT}/callback`
const scopes = ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.freebusy']

const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
authUrl.search = new URLSearchParams({
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: 'code',
  scope: scopes.join(' '),
  access_type: 'offline',
  prompt: 'consent',
}).toString()

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, redirectUri)
  if (url.pathname !== '/callback') return res.writeHead(404).end()
  const code = url.searchParams.get('code')
  if (!code) {
    res.end(`Google respondió: ${url.searchParams.get('error') || 'sin código'}`)
    return server.close()
  }
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: 'authorization_code' }),
  })
  const data = await r.json()
  if (!data.refresh_token) {
    res.end('No llegó el refresh token. Mirá la terminal.')
    console.error('Respuesta de Google:', data)
  } else {
    res.end('Listo. Ya podés cerrar esta pestaña y volver a la terminal.')
    console.log('\nGOOGLE_REFRESH_TOKEN=' + data.refresh_token + '\n')
    console.log('Cargalo en Vercel (Production) y en tu .env para probar en local.')
  }
  server.close()
})

server.listen(PORT, '127.0.0.1', () => {
  console.log('Abrí este link y entrá con la cuenta de Nimbo:\n\n' + authUrl + '\n')
  exec(`open "${authUrl}"`)
})

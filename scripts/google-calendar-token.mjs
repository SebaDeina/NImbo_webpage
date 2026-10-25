/*
  Saca el GOOGLE_REFRESH_TOKEN que usa el agendador (/api/agendar) para leer y crear eventos
  en el Google Calendar de Nimbo. Se corre una sola vez, en tu compu:

    GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... node scripts/google-calendar-token.mjs

  (o con las dos variables ya puestas en .env). Si faltan, abre una ventana para pegarlas y las
  guarda en .env. Abre Google en el navegador: entrá con la cuenta @nimbodata.com dueña del
  calendario y aceptá. Al final guarda el refresh token en .env y lo imprime para cargarlo en
  Vercel → Settings → Environment Variables.

  El cliente OAuth tiene que ser de tipo "App de escritorio" (Google Cloud → APIs y servicios →
  Credenciales) y la pantalla de consentimiento "Interna" (solo Workspace): así el token no vence.
*/
import http from 'node:http'
import fs from 'node:fs'
import { exec, execFileSync } from 'node:child_process'
import readline from 'node:readline/promises'

const ENV_FILE = new URL('../.env', import.meta.url)

// lee .env si existe, sin pisar lo que venga por la terminal
try {
  for (const line of fs.readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
  }
} catch {}

// escribe (o reemplaza) una variable en .env
function saveEnv(key, value) {
  let text = ''
  try {
    text = fs.readFileSync(ENV_FILE, 'utf8')
  } catch {}
  const line = `${key}=${value}`
  const re = new RegExp(`^\\s*${key}\\s*=.*$`, 'm')
  text = re.test(text) ? text.replace(re, line) : `${text.replace(/\n*$/, '\n')}${line}\n`
  fs.writeFileSync(ENV_FILE, text)
}

// pide un valor: ventana de macOS (anda aunque la terminal no sea interactiva) o, si no, la terminal
async function ask(message, { hidden = false } = {}) {
  if (process.platform === 'darwin') {
    const script = `text returned of (display dialog ${JSON.stringify(message)} default answer "" with title "Nimbo · Google Calendar"${hidden ? ' with hidden answer' : ''})`
    try {
      return execFileSync('osascript', ['-e', script], { encoding: 'utf8' }).trim()
    } catch {
      console.error('Cancelado.')
      process.exit(1)
    }
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const value = (await rl.question(`${message}\n> `)).trim()
  rl.close()
  return value
}

let { GOOGLE_CLIENT_ID: clientId, GOOGLE_CLIENT_SECRET: clientSecret } = process.env
if (!clientId) {
  clientId = (await ask('Pegá el ID de cliente de Google (termina en .apps.googleusercontent.com):')).replace(/\s+/g, '')
  if (!clientId.endsWith('.apps.googleusercontent.com')) {
    console.error('Ese ID no parece de Google: tiene que terminar en .apps.googleusercontent.com')
    process.exit(1)
  }
  saveEnv('GOOGLE_CLIENT_ID', clientId)
}
if (!clientSecret) {
  clientSecret = (await ask('Pegá el secreto del cliente (empieza con GOCSPX-):', { hidden: true })).replace(/\s+/g, '')
  if (!clientSecret) {
    console.error('No pegaste el secreto.')
    process.exit(1)
  }
  saveEnv('GOOGLE_CLIENT_SECRET', clientSecret)
}
console.log('ID y secreto guardados en .env.')

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
    saveEnv('GOOGLE_REFRESH_TOKEN', data.refresh_token)
    console.log('\nGOOGLE_REFRESH_TOKEN=' + data.refresh_token + '\n')
    console.log('Ya quedó guardado en .env. Cargalo también en Vercel (Production).')
  }
  server.close()
})

server.listen(PORT, '127.0.0.1', () => {
  console.log('Abrí este link y entrá con la cuenta de Nimbo:\n\n' + authUrl + '\n')
  exec(`open "${authUrl}"`)
})

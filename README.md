# NIMBO

Sitio del estudio NIMBO — React + Vite, deploy en Vercel.

Estructura inspirada en la plantilla *Peak* (creative studio), con identidad propia de Nimbo
(estética cinematográfica "de las nubes al mundo real").

## Stack

- **Frontend:** React 18 + Vite + React Router. Bilingüe ES/EN.
- **Proyectos:** `src/data/projects.js` — editás el archivo y pusheás; Vercel redeploya.
- **Contacto:** Vercel Function `/api/contact` → Slack (+ email opcional vía Resend).
- **Costo:** $0 (Vercel hobby + Slack gratis).

## Páginas

- `/` — Home (Hero → Trabajos → Nosotros → Servicios → CTA)
- `/trabajos/:slug` — detalle de cada proyecto
- `/nosotros` — sobre el estudio
- `/contacto` — formulario de contacto

## Correr en local

```bash
npm install
cp .env.example .env   # completar SLACK_WEBHOOK_URL (y Resend si querés email)
npm run dev            # http://localhost:5173
```

El dev server incluye `/api/contact` para probar el formulario sin Vercel.

## Administrar proyectos

Editá `src/data/projects.js`. Cada proyecto tiene:

- `slug`, `title`, `client`, `year`
- `cover` / `gallery` — rutas en `/public` (o `null` → placeholder)
- `live` — URL del proyecto (o `null` → "Próximamente")
- `category` / `summary` / `description` / `placeholder` — objetos `{ es, en }`
- `services` y `tags` — arrays de strings

Hacé commit + push → Vercel redeploya automáticamente.

## Deploy en Vercel

1. Conectá el repo `SebaDeina/NImbo_webpage`
2. Framework: **Vite** (auto-detectado)
3. Agregá las variables de entorno:

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `SLACK_WEBHOOK_URL` | Sí* | Webhook de Slack para alertas |
| `RESEND_API_KEY` | No | API key de Resend para email |
| `RESEND_FROM` | No | Remitente verificado en Resend |
| `CONTACT_NOTIFY_EMAIL` | No | Destino del email |

\* Al menos Slack o Resend tiene que estar configurado.

4. Deploy. Listo.

## Notificaciones de contacto

Cuando alguien envía el formulario, `/api/contact` dispara en paralelo:

- **Slack** vía `SLACK_WEBHOOK_URL`
- **Email** vía Resend (si `RESEND_API_KEY` está definida)

Si una variable no está definida, ese canal se omite. Falla solo si todos los canales configurados fallan.

### Configurar Slack

1. Slack → **Apps → Incoming Webhooks → Add to Slack**
2. Elegí el canal (ej. `#consultas-nimbo`)
3. Copiá la URL en `.env` (local) o en Vercel → Environment Variables

## Build

```bash
npm run build        # frontend → dist/
```

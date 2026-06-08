# NIMBO

Sitio del estudio NIMBO — React + Vite (frontend) con Strapi como CMS para los proyectos.

Estructura inspirada en la plantilla *Peak* (creative studio), con identidad propia de Nimbo
(estética cinematográfica "de las nubes al mundo real").

## Stack

- **Frontend:** React 18 + Vite + React Router. Bilingüe ES/EN.
- **CMS:** Strapi 5 (carpeta `cms/`) — content-type **Proyecto**. Requiere **Node 20–22**.
- El frontend lee los proyectos de Strapi si `VITE_STRAPI_URL` está definido; si no, usa el
  seed local de `src/data/projects.js`. Así la web funciona con o sin el CMS encendido.

## Páginas

- `/` — Home (Hero → Trabajos → Nosotros → Servicios → CTA)
- `/trabajos/:slug` — detalle de cada proyecto
- `/nosotros` — sobre el estudio
- `/contacto` — formulario de contacto

## Correr en local

### 1. Frontend

```bash
npm install
npm run dev          # http://localhost:5173
```

Copiá `.env.example` a `.env` para apuntar al CMS:

```
VITE_STRAPI_URL=http://localhost:1337
```

### 2. CMS (Strapi)

Strapi necesita Node ≤ 22. Si usás `fnm`/`nvm`, la carpeta ya trae `.node-version`:

```bash
cd cms
fnm use            # o: nvm use   (selecciona Node 22)
npm run develop    # http://localhost:1337/admin
```

- En el **primer arranque** se crean automáticamente: los permisos públicos de lectura
  (`find`/`findOne`) y el **seed** de proyectos (WODSI + 3 plantillas).
- Entrá a `http://localhost:1337/admin`, creá tu usuario admin y administrá los proyectos
  desde **Content Manager → Proyecto**.

## Administrar proyectos

Cada proyecto tiene: `title`, `slug`, `client`, `year`, `accent` (hex), `live` (URL),
`cover` (imagen), `gallery` (imágenes), y campos JSON bilingües
`category` / `summary` / `description` / `placeholder` con forma `{ "es": ..., "en": ... }`
(`description` admite arrays de párrafos), más `services` y `tags` (arrays).

Para editar sin CMS, modificá `src/data/projects.js` (misma forma).

## Build

```bash
npm run build        # frontend → dist/
```

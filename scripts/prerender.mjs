/*
  Prerender del build: escribe un HTML estático por cada ruta pública, con su <head> propio
  (title, description, canonical, Open Graph, Twitter, JSON-LD) y el contenido ya renderizado.
  Es para los crawlers que no ejecutan JS (GPTBot, ClaudeBot, PerplexityBot…): sin esto todas
  las rutas les mostraban el head y el contenido de la home.

  Corre después de `vite build` (cliente) y `vite build --ssr` (dist-ssr/entry-server.js).
  Sin navegador: React renderiza en Node, así que anda en cualquier container (node:24).

  Rutas = reactSnap.include de package.json + sitemap.xml + todos los artículos del blog + las páginas
  de contenido de src/landings.
  /propuesta queda afuera siempre (landing privada de prospectos).

  En el navegador, main.jsx hidrata el HTML si es de la misma ruta; las rutas que no tienen
  archivo propio caen en _spa.html (el index sin prerender) por el rewrite de vercel.json.
*/
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js')
const EXCLUDE = [/^\/propuesta(\/|$)/]

const { render, posts, seoTags, LANDING_PATHS = [] } = await import(pathToFileURL(SSR_ENTRY).href)

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
const manifestPath = path.join(DIST, '.vite', 'manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

/* ---------- rutas ---------- */

function routeList() {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
  const fromSnap = pkg.reactSnap?.include ?? []
  const sitemap = fs.readFileSync(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8')
  const fromSitemap = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => new URL(m[1]).pathname)
  const fromBlog = posts.map((p) => `/blog/${p.slug}`)
  const all = [...fromSnap, ...fromSitemap, ...fromBlog, ...LANDING_PATHS].map((r) => r.replace(/\/+$/, '') || '/')
  return [...new Set(all)].filter((r) => !EXCLUDE.some((re) => re.test(r)))
}

/* ---------- head ---------- */

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// JSON dentro de <script>: que ningún "</script>" del texto cierre la etiqueta
const jsonForScript = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

function setTag(html, re, replacement, label, route) {
  if (!re.test(html)) throw new Error(`prerender ${route}: no encontré ${label} en index.html`)
  return html.replace(re, replacement)
}

function headFor(html, route, seo) {
  // los mismos valores que pone useSeo en el navegador; sin useSeo, al menos el canonical propio
  const t = seoTags(seo ?? { path: route === '/' ? '/' : route })
  const meta = (attr, key, value) => [
    new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`),
    `<meta ${attr}="${key}" content="${esc(value)}" />`,
  ]
  const tags = [
    [/<title>[^<]*<\/title>/, `<title>${esc(t.title)}</title>`, 'title'],
    [/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${esc(t.url)}" />`, 'canonical'],
    // el sitio es solo en español de Argentina: cada ruta se declara a sí misma como es-AR y x-default
    ...['es-AR', 'x-default'].map((lang) => [
      new RegExp(`<link rel="alternate" hreflang="${lang}" href="[^"]*"\\s*/?>`),
      `<link rel="alternate" hreflang="${lang}" href="${esc(t.url)}" />`,
      `hreflang ${lang}`,
    ]),
    [...meta('name', 'description', t.description), 'description'],
    [...meta('name', 'robots', t.robots), 'robots'],
    [...meta('property', 'og:title', t.title), 'og:title'],
    [...meta('property', 'og:description', t.description), 'og:description'],
    [...meta('property', 'og:url', t.url), 'og:url'],
    [...meta('property', 'og:type', t.type), 'og:type'],
    [...meta('property', 'og:image', t.image), 'og:image'],
    [...meta('name', 'twitter:title', t.title), 'twitter:title'],
    [...meta('name', 'twitter:description', t.description), 'twitter:description'],
    [...meta('name', 'twitter:image', t.image), 'twitter:image'],
  ]
  for (const [re, rep, label] of tags) html = setTag(html, re, rep, label, route)
  // og:image:alt describe la imagen por defecto: si la ruta tiene la suya, no corresponde
  if (seo?.image) html = html.replace(/\s*<meta property="og:image:alt" content="[^"]*"\s*\/?>/, '')

  let extra = ''
  if (seo?.jsonLd) {
    extra += `  <script type="application/ld+json" data-seo-route="true">${jsonForScript(seo.jsonLd)}</script>\n`
  }
  extra += assetsFor(route)
  return html.replace('</head>', `${extra}</head>`)
}

/* ---------- CSS y JS de la página (cargada con lazy) ---------- */

// La página de cada ruta: su CSS va en el <head> (si no, el HTML se ve sin estilos hasta que
// carga el JS de la página) y su JS se precarga para hidratar antes.
// La ruta → componente sale de los <Route> de src/App.jsx y el componente → archivo de sus
// lazy(() => import('./pages/X')): así sirve para rutas con guiones (/desarrollo-web-pymes →
// ServicioDesarrolloWeb.jsx) o con otro nombre (/diagnostico-ia → Anuncio.jsx) sin tocar esto.
const APP_SRC = fs.readFileSync(path.join(ROOT, 'src', 'App.jsx'), 'utf8')
const PAGE_OF = Object.fromEntries(
  [...APP_SRC.matchAll(/(?:const|import)\s+(\w+)\s*(?:=\s*lazy\(\s*\(\)\s*=>\s*import\(|from\s+)\s*['"]\.\/pages\/([\w-]+)(?:\.jsx)?['"]/g)].map(
    ([, comp, file]) => [comp, `src/pages/${file}.jsx`],
  ),
)
const ROUTES = [...APP_SRC.matchAll(/<Route\s+path="([^"]+)"\s+element=\{([\s\S]*?)\}\s*\/>/g)]
  .map(([, p, el]) => {
    // el último componente de páginas que aparece en el element (en "/" es Home, tras los ternarios de host)
    const comps = [...el.matchAll(/<(\w+)/g)].map((m) => m[1]).filter((c) => PAGE_OF[c])
    if (!comps.length || p === '*') return null
    const re = new RegExp('^' + p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/:\w+/g, '[^/]+') + '/?$')
    return { re, file: PAGE_OF[comps[comps.length - 1]] }
  })
  .filter(Boolean)

function pageFile(route) {
  // las páginas de contenido de src/landings se arman todas con Landing.jsx (sus <Route> salen de un .map)
  if (LANDING_PATHS.includes(route)) return 'src/pages/Landing.jsx'
  const hit = ROUTES.find((r) => r.re.test(route))
  if (hit) return hit.file
  // respaldo: /algo → src/pages/Algo.jsx, /algo-mas → src/pages/AlgoMas.jsx
  const seg = route.split('/')[1] || 'home'
  return `src/pages/${seg.replace(/(^|-)(\w)/g, (_, _d, c) => c.toUpperCase())}.jsx`
}

// Vite a veces junta una página con otra (Blog.jsx la importa BlogPost) y la clave del
// manifest pasa a ser el nombre del chunk: se busca también por nombre.
function manifestKey(file) {
  if (manifest[file]) return file
  const name = path.basename(file, path.extname(file))
  return Object.keys(manifest).find((k) => manifest[k].name === name && manifest[k].file.endsWith('.js'))
}

function assetsFor(route) {
  const file = pageFile(route)
  // la home viene en el bundle principal: index.html ya trae su CSS y su JS
  if (file === 'src/pages/Home.jsx') return ''
  const key = manifestKey(file)
  if (!key) {
    console.warn(`prerender ${route}: ${file} no está en el manifest (sin CSS precargado)`)
    return ''
  }
  const css = new Set()
  const js = new Set()
  const seen = new Set()
  const walk = (k) => {
    if (seen.has(k) || !manifest[k]) return
    seen.add(k)
    const e = manifest[k]
    ;(e.css ?? []).forEach((c) => css.add(c))
    if (!e.isEntry) js.add(e.file)
    ;(e.imports ?? []).forEach(walk)
  }
  walk(key)
  // lo que ya trae index.html no se repite
  const already = (f) => template.includes(`/${f}"`)
  let out = ''
  for (const f of css) if (!already(f)) out += `  <link rel="stylesheet" crossorigin href="/${f}">\n`
  for (const f of js) if (!already(f)) out += `  <link rel="modulepreload" crossorigin href="/${f}">\n`
  return out
}

/* ---------- cuerpo ---------- */

// Si el HTML prerenderado no es de esta ruta (otra URL cayó en este archivo) o el host es
// robots./automatizaciones. (que muestran otra página en "/"), se descarta antes de pintar
// y React renderiza de cero. Va en línea: la CSP permite 'unsafe-inline'.
const GUARD =
  '<script>(function(){var r=document.getElementById("root"),p=r.getAttribute("data-prerender"),' +
  'l=location.pathname.replace(/\\/+$/,"")||"/";' +
  'if(p!==l||/^(robots|automatizaciones)\\./.test(location.hostname))r.innerHTML=""})()</script>'

function bodyFor(html, route, rendered) {
  return setTag(
    html,
    /<div id="root"><\/div>/,
    `<div id="root" data-prerender="${esc(route)}">${rendered}</div>\n  ${GUARD}`,
    '<div id="root">',
    route,
  )
}

/* ---------- main ---------- */

const routes = routeList()
// el index sin prerender: lo sirve el rewrite de vercel.json para las rutas sin archivo propio
fs.writeFileSync(path.join(DIST, '_spa.html'), template)

for (const route of routes) {
  const { html: rendered, seo } = await render(route)
  if (!rendered.trim()) throw new Error(`prerender ${route}: la página salió vacía`)
  if (!seo) console.warn(`prerender ${route}: la página no llama a useSeo`)
  const page = bodyFor(headFor(template, route, seo), route, rendered)
  const file = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page)
  console.log(`prerender ${route} → ${path.relative(ROOT, file)} (${(page.length / 1024).toFixed(1)} kB)`)
}

// el manifest era solo para esto: no se publica
fs.rmSync(path.join(DIST, '.vite'), { recursive: true, force: true })
console.log(`prerender: ${routes.length} rutas`)

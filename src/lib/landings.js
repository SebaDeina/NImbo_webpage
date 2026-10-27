// Páginas de contenido para buscadores: pilares (mejora de procesos, páginas web, automatización, IA), zonas y
// rubros. Cada una es un par de archivos en src/landings/: `<nombre>.meta.js` (ruta, nombre corto y dónde se
// enlaza) y `<nombre>.page.js` (el texto). Sumar una página es sumar esos dos archivos: la ruta, el marco del
// sitio nuevo, el prerender y los links del inicio y del pie salen de acá.
// Las metas se cargan con el sitio (son unas líneas); el texto va solo en el chunk de src/pages/Landing.jsx.
const mods = import.meta.glob('../landings/*.meta.js', { eager: true, import: 'default' })

export const LANDINGS = Object.values(mods).sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
export const LANDING_PATHS = LANDINGS.map((l) => l.path)
export const isLandingPath = (pathname) => LANDING_PATHS.includes(pathname.replace(/\/+$/, '') || '/')

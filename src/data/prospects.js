/* Registro de prospectos para la landing de venta /propuesta/:slug.
   La landing es SIEMPRE la misma; lo único que cambia por lead es su nombre
   y la URL de la web demo que le diseñamos.

   Webs demo del cliente → carpeta client-demos/ (fuera del build principal).
   Ver client-demos/README.md para crear y deployar en Vercel como subdominio:
     https://<slug>.nimbodata.com

   Para sumar un prospecto:
   1. cp -R client-demos/_template client-demos/<slug>
   2. Personalizá la web y deployá en Vercel (root: client-demos/<slug>)
   3. Agregá el bloque acá abajo con demoUrl apuntando al subdominio
   4. Mandá: https://nimbodata.com/propuesta/<slug>

   - demoUrl: URL pública de la demo, ej. https://pizzeria-don-luis.nimbodata.com
   - image:   opcional. Si el sitio NO permite embeberse en un iframe
              (queda en blanco), poné acá una captura local, ej '/demos/cliente.jpg'
              (guardada en /public/demos/). Si hay image, se muestra la captura
              en vez del iframe. El botón "Ver en vivo" siempre abre demoUrl. */

const DEFAULT = {
  name: 'tu negocio',
  industry: null,
  demoUrl: null, // sin demo → se muestra un placeholder neutro
  image: null,
}

export const PROSPECTS = {
  // ——— Ejemplo (borralo o duplicalo) ———
  ejemplo: {
    name: 'Pizzería Don Luis',
    industry: 'gastronomía',
    demoUrl: 'https://pizzeria-don-luis.nimbodata.com',
    image: null,
  },
}

export function getProspect(slug) {
  if (slug && PROSPECTS[slug]) return { ...DEFAULT, ...PROSPECTS[slug] }
  return DEFAULT
}

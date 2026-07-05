import { useEffect } from 'react'

/*
  SEO por ruta. Como el sitio es una SPA, sin esto TODAS las páginas comparten
  el <title>, la description y —lo más grave— el <link rel="canonical"> de la
  home, con lo cual Google trata cada artículo del blog como un duplicado de la
  home y no lo indexa por separado. Este hook actualiza el <head> en cada ruta:
  title, description, canonical propio, Open Graph, Twitter y JSON-LD opcional.
  Googlebot ejecuta JS, así que respeta estas etiquetas puestas en cliente.
*/

const SITE_URL = 'https://www.nimbodata.com'
const DEFAULT_IMAGE = `${SITE_URL}/dashboard-cover.jpg`
const DEFAULT_TITLE =
  'Nimbo — Transformación Digital para Pymes: Automatización, IA y Web'
const DEFAULT_DESCRIPTION =
  'Automatizamos procesos, implementamos IA, diseñamos páginas web y analizamos datos para pymes en Argentina. Más clientes, menos trabajo manual.'

function upsertMeta(attr, key, content) {
  if (content == null) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function useSeo({
  title,
  description,
  path = '',
  image,
  type = 'website',
  jsonLd,
} = {}) {
  const jsonLdStr = jsonLd ? JSON.stringify(jsonLd) : null

  useEffect(() => {
    const finalTitle = title || DEFAULT_TITLE
    const finalDesc = description || DEFAULT_DESCRIPTION
    const url = `${SITE_URL}${path}`
    const img = image ? `${SITE_URL}${image}` : DEFAULT_IMAGE

    document.title = finalTitle
    upsertMeta('name', 'description', finalDesc)
    upsertLink('canonical', url)

    upsertMeta('property', 'og:title', finalTitle)
    upsertMeta('property', 'og:description', finalDesc)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:image', img)

    upsertMeta('name', 'twitter:title', finalTitle)
    upsertMeta('name', 'twitter:description', finalDesc)
    upsertMeta('name', 'twitter:image', img)

    let script
    if (jsonLdStr) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seoRoute = 'true'
      script.textContent = jsonLdStr
      document.head.appendChild(script)
    }

    return () => {
      if (script) script.remove()
    }
  }, [title, description, path, image, type, jsonLdStr])
}

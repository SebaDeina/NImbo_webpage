/* ============================================================
   NIMBO — capa de datos.
   Lee los proyectos desde Strapi si VITE_STRAPI_URL está definido;
   si no (o si falla), usa el seed local de src/data/projects.js.
   Así la web siempre renderiza, con o sin CMS encendido.
   ============================================================ */
import { PROJECTS as LOCAL } from '../data/projects'

const BASE = import.meta.env.VITE_STRAPI_URL?.replace(/\/$/, '') || ''

/* Normaliza una entrada de Strapi (v5: campos planos) a la forma local. */
function fromStrapi(entry) {
  const a = entry.attributes ?? entry // v5 entrega campos planos
  const media = (m) => {
    const data = m?.data
    const url = (x) => (x?.attributes?.url ?? x?.url)
    const abs = (u) => (u ? (u.startsWith('http') ? u : BASE + u) : null)
    if (Array.isArray(data)) return data.map((d) => abs(url(d))).filter(Boolean)
    if (Array.isArray(m)) return m.map((d) => abs(url(d))).filter(Boolean)
    return abs(url(data ?? m))
  }
  const i18n = (val) => (val && typeof val === 'object' ? val : { es: val ?? '', en: val ?? '' })
  return {
    slug: a.slug,
    title: a.title,
    client: a.client ?? '',
    year: a.year ?? '',
    cover: media(a.cover),
    gallery: media(a.gallery) || [],
    live: a.live || null,
    category: i18n(a.category),
    summary: i18n(a.summary),
    description: a.description ?? { es: [], en: [] },
    services: a.services ?? [],
    tags: a.tags ?? [],
    placeholder: i18n(a.placeholder),
  }
}

async function strapiFetch(path) {
  const res = await fetch(`${BASE}/api${path}`, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`Strapi ${res.status}`)
  const json = await res.json()
  return json.data
}

export async function getProjects() {
  if (!BASE) return LOCAL
  try {
    const data = await strapiFetch('/proyectos?populate=*&sort=year:desc')
    if (Array.isArray(data) && data.length) return data.map(fromStrapi)
    return LOCAL
  } catch {
    return LOCAL
  }
}

export async function getProject(slug) {
  if (!BASE) return LOCAL.find((p) => p.slug === slug) || null
  try {
    const data = await strapiFetch(`/proyectos?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`)
    if (Array.isArray(data) && data.length) return fromStrapi(data[0])
    return LOCAL.find((p) => p.slug === slug) || null
  } catch {
    return LOCAL.find((p) => p.slug === slug) || null
  }
}

export async function submitContact(payload) {
  if (!BASE) throw new Error('CMS not configured')
  const res = await fetch(`${BASE}/api/contactos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ data: payload }),
  })
  if (!res.ok) throw new Error(`Strapi ${res.status}`)
  return res.json()
}

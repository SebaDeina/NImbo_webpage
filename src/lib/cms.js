/* ============================================================
   NIMBO — capa de datos.
   Proyectos: src/data/projects.js (editar y pushear).
   Contacto: /api/contact (Vercel Function → Slack + Resend).
   ============================================================ */
import { PROJECTS } from '../data/projects'

export async function getProjects() {
  return PROJECTS
}

export async function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null
}

export async function submitContact(payload) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Contact API ${res.status}`)
  return res.json()
}

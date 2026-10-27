// Página 404 real. En Vercel, una URL que no existe recibe dist/404.html (prerenderada desde esta página)
// con estado 404; antes caía en la SPA y redirigía a la home con 200 (soft 404 en Search Console).
import { Link } from 'react-router-dom'
import { NdPageHero } from '../components/nd/Nd'
import { useSeo } from '../hooks/useSeo'

const DESTINOS = [
  ['/', 'Inicio'],
  ['/#servicios', 'Servicios'],
  ['/casos', 'Casos'],
  ['/blog', 'Blog'],
  ['/diagnostico', 'Diagnóstico gratis'],
  ['/contacto', 'Contacto'],
]

// `ns`: dentro del marco del sitio nuevo (un /blog/<slug> que no existe), con sus clases
export default function NotFound({ ns = false }) {
  useSeo({
    title: 'Página no encontrada | Nimbo',
    description: 'La página que buscás no existe o cambió de dirección. Desde acá podés volver al inicio, ver los servicios, los casos o el blog de Nimbo.',
    path: '/404',
    robots: 'noindex, follow',
  })
  if (ns) {
    return (
      <section className="sv-hero wrap">
        <p className="crumb mono">Error 404</p>
        <h1>Esta página no existe.</h1>
        <p className="lead">Puede que el link esté mal escrito o que la página haya cambiado de dirección. Estos lugares sí existen:</p>
        <div className="btns" style={{ flexWrap: 'wrap' }}>
          {DESTINOS.map(([to, t], i) => (
            <a key={to} href={to} className={`btn${i ? '' : ' btn-acc'}`}>{t}</a>
          ))}
        </div>
      </section>
    )
  }
  return (
    <main className="nd-page-main">
      <NdPageHero eyebrow="Error 404" title="Esta página no existe">
        <p>Puede que el link esté mal escrito o que la página haya cambiado de dirección. Estos lugares sí existen:</p>
        <div className="nd-btns" style={{ flexWrap: 'wrap', marginTop: 24 }}>
          {DESTINOS.map(([to, t], i) => (
            <Link key={to} to={to} className={`nd-btn${i ? ' nd-btn-soft' : ''}`}>{t}</Link>
          ))}
        </div>
      </NdPageHero>
    </main>
  )
}

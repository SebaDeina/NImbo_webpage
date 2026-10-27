// Página de cada servicio del sitio nuevo (src/ns/Service.jsx): /agentes-de-ia, /automatizacion-e-integracion,
// /datos-y-tableros y /software-a-medida.
import { useSeo } from '../hooks/useSeo'
import { AREAS } from '../ns/data'
import Service from '../ns/Service'

const SITE = 'https://www.nimbodata.com'

export default function Servicio({ slug }) {
  const area = AREAS.find((a) => a.slug === slug)
  const url = SITE + area.path
  useSeo({
    title: `${area.t} para pymes — Nimbo Consulting`,
    description: area.page.lead,
    path: area.path,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': `${url}#service`,
          name: area.t,
          description: area.d,
          url,
          areaServed: { '@type': 'Country', name: 'Argentina' },
          provider: { '@id': `${SITE}/#business` },
          inLanguage: 'es-AR',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${url}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: area.t, item: url },
          ],
        },
      ],
    },
  })
  return <Service key={slug} area={area} />
}

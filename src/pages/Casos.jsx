// /casos del sitio nuevo: los proyectos de Nimbo y lo que dicen los clientes (src/ns/Cases.jsx).
// También absorbe /proyectos (redirección 301 en vercel.json): las fichas y su lista para buscadores viven acá.
import { PROJECTS } from '../data/projects'
import { useSeo } from '../hooks/useSeo'
import Cases from '../ns/Cases'

const URL = 'https://www.nimbodata.com/casos'

export default function Casos() {
  useSeo({
    title: 'Casos — Proyectos de IA, automatización y software | Nimbo',
    description:
      'Agentes de IA, automatizaciones, tableros y sistemas a medida que hicimos para pymes argentinas, con lo que dicen sus dueños.',
    path: '/casos',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${URL}#page`,
          name: 'Casos y proyectos de Nimbo',
          description:
            'Proyectos de aplicaciones, sitios web, automatizaciones, agentes de IA, datos y visión por computadora desarrollados por Nimbo.',
          url: URL,
          inLanguage: 'es-AR',
          isPartOf: { '@id': 'https://www.nimbodata.com/#website' },
          about: { '@id': 'https://www.nimbodata.com/#business' },
          mainEntity: { '@id': `${URL}#project-list` },
        },
        {
          '@type': 'ItemList',
          '@id': `${URL}#project-list`,
          numberOfItems: PROJECTS.length,
          itemListElement: PROJECTS.map((p, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${URL}#${p.slug}`,
            item: {
              '@type': 'CreativeWork',
              '@id': `${URL}#${p.slug}`,
              name: p.title,
              description: p.summary.es,
              creator: { '@id': 'https://www.nimbodata.com/#business' },
              inLanguage: 'es-AR',
            },
          })),
        },
      ],
    },
  })
  return <Cases />
}

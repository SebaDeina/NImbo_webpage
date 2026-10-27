// /contacto del sitio nuevo: el formulario en tres pasos (src/ns/Contact.jsx). La key reinicia el formulario
// cuando se llega desde otro servicio (?s=…).
import { useLocation } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import Contact from '../ns/Contact'

const SITE = 'https://www.nimbodata.com'

export default function Empecemos() {
  const { search } = useLocation()
  useSeo({
    title: 'Contacto — Nimbo Consulting | IA y automatización para pymes',
    description:
      'Contanos qué proceso le come las horas a tu equipo: te respondemos en menos de 24 h para coordinar una charla de 20 minutos, sin cargo.',
    path: '/contacto',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          '@id': `${SITE}/contacto#page`,
          name: 'Contacto — Nimbo Consulting',
          url: `${SITE}/contacto`,
          inLanguage: 'es-AR',
          isPartOf: { '@id': `${SITE}/#website` },
          about: { '@id': `${SITE}/#business` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${SITE}/contacto#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: 'Contacto', item: `${SITE}/contacto` },
          ],
        },
      ],
    },
  })
  return <Contact key={search} />
}

// Inicio del sitio nuevo (src/ns/Home.jsx) con su SEO. El marco (barra, pie, nube) lo pone src/ns/Shell.jsx.
import { useSeo } from '../hooks/useSeo'
import { FAQ } from '../ns/data'
import Home from '../ns/Home'

export default function Inicio() {
  useSeo({
    title: 'Nimbo Consulting — IA y automatización para pymes en Argentina',
    description:
      'Agentes de IA, automatizaciones, tableros y software a medida para pymes argentinas. Diagnosticamos tus procesos, los automatizamos y los acompañamos todos los meses.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://www.nimbodata.com/#faq',
      mainEntity: FAQ.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
    },
  })
  return <Home />
}

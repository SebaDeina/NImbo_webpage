// /casos del sitio nuevo: los proyectos de Nimbo y lo que dicen los clientes (src/ns/Cases.jsx).
import { useSeo } from '../hooks/useSeo'
import Cases from '../ns/Cases'

export default function Casos() {
  useSeo({
    title: 'Casos — Proyectos de IA, automatización y software | Nimbo',
    description:
      'Agentes de IA, automatizaciones, tableros y sistemas a medida que hicimos para pymes argentinas, con lo que dicen sus dueños.',
    path: '/casos',
  })
  return <Cases />
}

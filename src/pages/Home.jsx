import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Chapters, { ServicesToc } from '../components/Chapters'
import CTA from '../components/CTA'
import { useSeo } from '../hooks/useSeo'

export default function Home() {
  useSeo({
    title: 'Nimbo — Transformación Digital para Pymes: Automatización, IA y Web',
    description:
      'Soluciones digitales para pymes en Argentina: automatización de procesos, implementación de IA, páginas web profesionales, análisis de datos y visión por computadora. Más clientes, menos trabajo manual.',
    path: '/',
  })
  return (
    <div className="home">
      <Hero />
      <Marquee />
      <ServicesToc />
      <Chapters />
      <CTA />
    </div>
  )
}

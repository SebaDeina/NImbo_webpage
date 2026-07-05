import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Services from '../components/Services'
import ChatShowcase from '../components/ChatShowcase'
import StickyScroll from '../components/StickyScroll'
import Work from '../components/Work'
import Testimonios from '../components/Testimonios'
import FAQ from '../components/FAQ'
import BlogTeaser from '../components/BlogTeaser'
import CTA from '../components/CTA'
import { useSeo } from '../hooks/useSeo'

export default function Home() {
  useSeo({
    title: 'Nimbo — Transformación Digital para Pymes: Automatización, IA y Web',
    description:
      'Soluciones digitales para pymes en Argentina: automatización de procesos, implementación de IA, páginas web profesionales y análisis de datos. Más clientes, menos trabajo manual.',
    path: '/',
  })
  return (
    <div className="home">
      <Hero />
      <Marquee />
      <Services />
      <ChatShowcase />
      <StickyScroll />
      <Work />
      <Testimonios />
      <FAQ />
      <BlogTeaser />
      <CTA />
    </div>
  )
}

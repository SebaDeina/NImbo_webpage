import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Work from '../components/Work'
import Manifesto from '../components/Manifesto'
import Services from '../components/Services'
import CTA from '../components/CTA'

const ScrollAmbient = lazy(() => import('../components/ScrollAmbient'))

/* Estructura tipo Peak (con identidad Nimbo):
   Hero → Trabajos → Nosotros (manifiesto) → Servicios → CTA. */
export default function Home() {
  return (
    <div className="home">
      <Suspense fallback={null}>
        <ScrollAmbient />
      </Suspense>
      <Hero />
      <Marquee />
      <Work />
      <Manifesto />
      <Services />
      <CTA />
    </div>
  )
}

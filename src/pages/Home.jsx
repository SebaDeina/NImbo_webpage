import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Work from '../components/Work'
import Manifesto from '../components/Manifesto'
import Services from '../components/Services'
import CTA from '../components/CTA'
import ScrollAmbient from '../components/ScrollAmbient'

/* Estructura tipo Peak (con identidad Nimbo):
   Hero → Trabajos → Nosotros (manifiesto) → Servicios → CTA. */
export default function Home() {
  return (
    <div className="home">
      <ScrollAmbient />
      <Hero />
      <Marquee />
      <Work />
      <Manifesto />
      <Services />
      <CTA />
    </div>
  )
}

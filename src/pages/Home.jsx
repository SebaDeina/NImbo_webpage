import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Services from '../components/Services'
import ChatShowcase from '../components/ChatShowcase'
import StickyScroll from '../components/StickyScroll'
import Work from '../components/Work'
import Testimonios from '../components/Testimonios'
import FAQ from '../components/FAQ'

export default function Home() {
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
    </div>
  )
}

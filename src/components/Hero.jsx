import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LangContext'
import { whatsappUrl } from '../config/whatsapp'
import { CloudBand, Flock, Stars, SHIP_LAYER, ISLAND_LAYER } from './g/Art'

const ROWS = [
  { base: 0.36, rmin: 0.07, rmax: 0.15, seed: 11, fade: 'dark' },
  { base: 0.55, rmin: 0.09, rmax: 0.19, seed: 23, fade: 'dark' },
  { base: 0.76, rmin: 0.11, rmax: 0.23, seed: 37, fade: 'dark' },
  { base: 0.93, rmin: 0.13, rmax: 0.28, seed: 51, fade: 'light' },
]
// isla lejana detrás de todo, dirigible e isla principal entre las filas 1 y 2
const LAYERS = [ISLAND_LAYER(0, 0.4, 'f', true), SHIP_LAYER(2, 1.5), ISLAND_LAYER(2, 1.6, 'h')]

export default function Hero() {
  const { t } = useLang()
  const ref = useRef(null)

  // parallax suave con el mouse (solo punteros finos)
  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      el.style.setProperty('--mx', (e.clientX / window.innerWidth - 0.5).toFixed(3))
      el.style.setProperty('--my', (e.clientY / window.innerHeight - 0.5).toFixed(3))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <header className="hero" id="top" ref={ref}>
      <Stars count={80} seed={7} />
      <Flock n={6} seed={11} className="hero-flock" />
      <Flock n={4} seed={16} className="hero-flock b" />
      <div className="hero-inner wrap">
        <div className="eyebrow">Web · Automatización · IA — Argentina</div>
        <h1>
          De la idea a la automatización, <em>en la nube</em>
        </h1>
        <p className="hero-sub">{t('hero.sub')}</p>
        <div className="hero-btns">
          <a className="btn btn-solid" href={whatsappUrl(t('wa.message'))} target="_blank" rel="noopener noreferrer">
            Empezá gratis <span className="arr">→</span>
          </a>
          <a className="btn btn-ghost" href="#servicios">
            Ver cómo funciona
          </a>
        </div>
      </div>
      <CloudBand className="clouds" rows={ROWS} layers={LAYERS} line={3.7} />
    </header>
  )
}

import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LangContext'
import { IconArrowRight, IconStar } from './Icons'

export default function Hero() {
  const { t } = useLang()
  const mediaRef = useRef(null)
  const glowRef = useRef(null)

  // Light parallax on hero glow + background as you scroll.
  useEffect(() => {
    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (mediaRef.current) mediaRef.current.style.transform = `translateY(${y * 0.12}px) scale(1.05)`
        if (glowRef.current) glowRef.current.style.transform = `translateX(-50%) translateY(${y * 0.05}px)`
        raf = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="hero" id="top" data-screen-label="Hero">
      <div className="hero-bg">
        <div
          ref={mediaRef}
          className="hero-media"
          role="img"
          aria-label="Mar de nubes al atardecer visto desde el cielo, con cielo azul despejado en el horizonte"
          style={{ backgroundImage: "url('/hero-nubes.png')" }}
        />
      </div>
      <div className="hero-glow" ref={glowRef} aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-top in" data-reveal="">
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <p className="hero-sub">{t('hero.sub')}</p>
        </div>

        <h1 className="hero-word in" data-reveal="" data-delay="1">
          Nimbo<span className="star"><IconStar size="100%" /></span>
        </h1>

        <div className="hero-meta in" data-reveal="" data-delay="2">
          <div className="hero-cta">
            <a href="#contacto" className="btn btn-primary">
              <span>{t('hero.cta1')}</span> <IconArrowRight size={18} className="arr" />
            </a>
            <a href="#servicios" className="btn btn-ghost">
              {t('hero.cta2')}
            </a>
          </div>
          <div className="scroll-cue">
            <span className="dot" />
            <span>{t('hero.scroll')}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

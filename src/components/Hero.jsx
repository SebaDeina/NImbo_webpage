import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { useContact } from '../contexts/ContactContext'
import { useIsMobile } from '../hooks/useIsMobile'
import { IconArrowRight, IconStar } from './Icons'

const HERO_IMG = {
  src: '/hero-nubes.jpg',
  alt: 'Mar de nubes al atardecer visto desde el cielo, con cielo azul despejado en el horizonte',
  width: 1024,
  height: 572,
}

export default function Hero() {
  const { t } = useLang()
  const { openContact } = useContact()
  const isMobile = useIsMobile()
  const mediaRef = useRef(null)
  const glowRef = useRef(null)
  const bgRef = useRef(null)
  const [needsImg, setNeedsImg] = useState(true)

  const onContact = (e) => {
    if (isMobile) {
      e.preventDefault()
      openContact()
    }
  }

  // Reuse the static LCP <img> from index.html — avoids a second download and keeps LCP stable.
  useEffect(() => {
    const bg = bgRef.current
    const staticImg = document.getElementById('lcp-hero')
    if (!bg || !staticImg) return
    staticImg.classList.add('hero-media')
    staticImg.removeAttribute('id')
    staticImg.style.position = ''
    staticImg.style.inset = ''
    staticImg.style.zIndex = ''
    staticImg.style.pointerEvents = ''
    bg.prepend(staticImg)
    mediaRef.current = staticImg
    setNeedsImg(false)
  }, [])

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
      <div className="hero-bg" ref={bgRef}>
        {needsImg && (
          <img
            ref={mediaRef}
            src={HERO_IMG.src}
            alt={HERO_IMG.alt}
            className="hero-media"
            width={HERO_IMG.width}
            height={HERO_IMG.height}
            fetchPriority="high"
            decoding="sync"
            sizes="100vw"
          />
        )}
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
            <Link to="/contacto" className="btn btn-primary" onClick={onContact}>
              <span>{t('hero.cta1')}</span> <IconArrowRight size={18} className="arr" />
            </Link>
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

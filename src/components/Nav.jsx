import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { useContact } from '../contexts/ContactContext'
import { useIsMobile } from '../hooks/useIsMobile'
import CloudMark from './CloudMark'
import { IconArrowRight } from './Icons'

export default function Nav() {
  const { t, lang, setLang } = useLang()
  const { openContact } = useContact()
  const isMobile = useIsMobile()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // En móvil, los CTA de contacto abren el bottom-sheet; en desktop navegan a /contacto.
  const onContact = (e) => {
    if (isMobile) {
      e.preventDefault()
      openContact()
    }
    setMenuOpen(false)
  }

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link className="brand" to="/" aria-label="NIMBO" onClick={closeMenu}>
            <CloudMark />
          </Link>
          <div className="nav-links">
            <Link to={{ pathname: '/', hash: '#servicios' }}>{t('nav.services')}</Link>
            <Link to={{ pathname: '/', hash: '#trabajos' }}>{t('nav.portfolio')}</Link>
            <Link to="/nosotros">{t('nav.about')}</Link>
            <Link to={{ pathname: '/', hash: '#testimonios' }}>{t('nav.testimonials')}</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <div className="nav-right">
            <div className="lang" role="group" aria-label={t('nav.langLabel')}>
              <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>
                ES
              </button>
              <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
                EN
              </button>
            </div>
            <Link to="/contacto" className="btn btn-primary nav-cta" onClick={onContact}>
              {t('nav.cta')}
            </Link>
            <button
              type="button"
              className={`nav-burger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="nav-menu"
              aria-label={menuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div
        id="nav-menu"
        className={`nav-menu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-menu-backdrop" onClick={closeMenu} />
        <div className="nav-menu-panel" role="dialog" aria-modal="true" aria-label={t('nav.menuOpen')}>
          <div className="nav-menu-links">
            <Link to={{ pathname: '/', hash: '#servicios' }} onClick={closeMenu}>
              {t('nav.services')}
            </Link>
            <Link to={{ pathname: '/', hash: '#trabajos' }} onClick={closeMenu}>
              {t('nav.portfolio')}
            </Link>
            <Link to="/nosotros" onClick={closeMenu}>
              {t('nav.about')}
            </Link>
            <Link to={{ pathname: '/', hash: '#testimonios' }} onClick={closeMenu}>
              {t('nav.testimonials')}
            </Link>
            <Link to="/blog" onClick={closeMenu}>Blog</Link>
          </div>
          <div className="nav-menu-foot">
            <div className="lang" role="group" aria-label={t('nav.langLabel')}>
              <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>
                ES
              </button>
              <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
                EN
              </button>
            </div>
            <Link to="/contacto" className="btn btn-primary" onClick={onContact}>
              {t('nav.cta')} <IconArrowRight size={18} className="arr" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

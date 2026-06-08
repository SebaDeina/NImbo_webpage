import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { useTheme } from '../contexts/ThemeContext'
import { useContact } from '../contexts/ContactContext'
import { useIsMobile } from '../hooks/useIsMobile'
import CloudMark from './CloudMark'

export default function Nav() {
  const { t, lang, setLang } = useLang()
  const { theme, toggleTheme } = useTheme()
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
            <span>NIMBO</span>
          </Link>
          <div className="nav-links">
            <Link to={{ pathname: '/', hash: '#trabajos' }}>{t('nav.portfolio')}</Link>
            <Link to={{ pathname: '/', hash: '#servicios' }}>{t('nav.services')}</Link>
            <Link to="/nosotros">{t('nav.about')}</Link>
            <Link to="/contacto" onClick={onContact}>
              {t('nav.contact')}
            </Link>
          </div>
          <div className="nav-right">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M21 14.5A7.5 7.5 0 0 1 9.5 3 6.5 6.5 0 1 0 21 14.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <div className="lang" role="group" aria-label="Idioma">
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
            <Link to={{ pathname: '/', hash: '#trabajos' }} onClick={closeMenu}>
              {t('nav.portfolio')}
            </Link>
            <Link to={{ pathname: '/', hash: '#servicios' }} onClick={closeMenu}>
              {t('nav.services')}
            </Link>
            <Link to="/nosotros" onClick={closeMenu}>
              {t('nav.about')}
            </Link>
            <Link to="/contacto" onClick={onContact}>
              {t('nav.contact')}
            </Link>
          </div>
          <div className="nav-menu-foot">
            <div className="lang" role="group" aria-label="Idioma">
              <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>
                ES
              </button>
              <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
                EN
              </button>
            </div>
            <Link to="/contacto" className="btn btn-primary" onClick={onContact}>
              {t('nav.cta')} <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

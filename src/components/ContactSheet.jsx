import { useEffect } from 'react'
import { useLang } from '../i18n/LangContext'
import ContactForm from './ContactForm'

/* Bottom-sheet para móvil: sube desde abajo. En desktop no se usa
   (el contacto es la página /contacto inline). */
export default function ContactSheet({ open, resetKey, onClose, serviceIcons = false }) {
  const { t } = useLang()

  // Bloquear scroll del fondo mientras está abierto + cerrar con Escape.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div className={`sheet-root${open ? ' open' : ''}`} aria-hidden={!open}>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet-panel" role="dialog" aria-modal="true" aria-label={t('contact.openTitle')}>
        <div className="sheet-handle" />
        <div className="sheet-head">
          <div>
            <p className="eyebrow no-dot">{t('contact.eyebrow')}</p>
            <h2 className="sheet-title">{t('contact.title')}</h2>
          </div>
          <button className="sheet-close" onClick={onClose} aria-label="cerrar">
            ✕
          </button>
        </div>
        <div className="sheet-body">
          {open && (
            <ContactForm key={resetKey} serviceIcons={serviceIcons} onSubmitted={() => setTimeout(onClose, 2000)} />
          )}
        </div>
      </div>
    </div>
  )
}

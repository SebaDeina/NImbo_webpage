import { useEffect, useState } from 'react'
import { WHATSAPP_NUMBER, whatsappUrl } from '../../config/whatsapp'
import { IconWhatsApp } from '../Icons'
import { useDiagnostico } from './DiagnosticoForm'

/*
  Piezas compartidas del diseño blanco "Nimbodata Landing v2" (home y /automatizaciones).
  Los estilos viven en src/styles/automatizaciones.css, todo bajo .nd.
*/

const CLOUD =
  'M271.84,16.97c15.42,12.31,28,33.93,28.55,53.89,13.64-.57,26.09-.17,38.52,5.87,56.51,27.48,43.11,115.68-20.22,122.53l-261.99-.05c-62.34-7.28-77.99-89.68-23.15-121.24,14.02-8.07,30.12-8.07,45.94-6.19,1.71-.48,5.47-10.25,6.98-12.67,10.49-16.9,33.25-31.45,53.83-31.99,3.61-.09,18.6,3.19,19.55,2.91.59-.17,6.77-7.6,8.32-8.95,29.26-25.43,72.35-29.12,103.66-4.12Z'

// 5491124036836 → +54 9 11 2403-6836
export const WA_LABEL = WHATSAPP_NUMBER.replace(/^(\d{2})(\d)(\d{2})(\d{4})(\d{4})$/, '+$1 $2 $3 $4-$5')

export const Cloud = () => (
  <svg viewBox="0 0 374.63 199.26" aria-hidden="true">
    <path d={CLOUD} fill="currentColor" />
  </svg>
)

/* fondo blanco en <html> mientras se ve una página con este diseño (las tipografías se cargan en index.html) */
export function useNdPage(active = true) {
  useEffect(() => {
    if (!active) return
    document.documentElement.classList.add('nd-page')
    return () => document.documentElement.classList.remove('nd-page')
  }, [active])
}

/* línea bajo el encabezado cuando ya hay contenido detrás */
export function useScrolled(min = 8) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > min)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [min])
  return scrolled
}

export function WaLink({ cta, msg, className, children }) {
  return (
    <a className={className} data-cta={cta} href={whatsappUrl(msg)} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export function NdFaq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="nd-faq">
      {items.map(([q, a], i) => (
        <div key={q} className="nd-faq-item">
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{q}</span>
            <span className="nd-faq-sign" aria-hidden="true">
              {open === i ? '−' : '+'}
            </span>
          </button>
          {open === i && <p>{a}</p>}
        </div>
      ))}
    </div>
  )
}

const WA_MSG = '¡Hola! Vi el sitio de Nimbo y me gustaría conversar sobre un proyecto.'

/* Botón flotante de WhatsApp: el logo de WhatsApp en su círculo verde */
export function NdFloat({ cta = 'flotante', msg = WA_MSG }) {
  return (
    <a className="nd-float" data-cta={cta} href={whatsappUrl(msg)} target="_blank" rel="noopener noreferrer" aria-label="Escribinos por WhatsApp">
      <IconWhatsApp size={32} />
    </a>
  )
}

/* Encabezado de las páginas internas */
export function NdPageHero({ eyebrow, title, children, className = '' }) {
  return (
    <section className={`nd-phero ${className}`}>
      <div className="nd-wrap nd-phero-in">
        {eyebrow && <span className="nd-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}

/* Cierre de página: el popup de diagnóstico como formulario y WhatsApp como alternativa */
export function NdFinal({ title = 'Contanos tu idea', cta = 'cierre', msg = WA_MSG }) {
  const openDiagnostico = useDiagnostico()
  return (
    <section className="nd-final">
      <div className="nd-wrap nd-final-in">
        <h2>{title}</h2>
        <p>Te respondemos en menos de 24 horas con un plan para convertirla en algo concreto. Sin compromiso.</p>
        <NdFinalBtns cta={cta} msg={msg} onForm={() => openDiagnostico(cta)} />
      </div>
    </section>
  )
}

export function NdFinalBtns({ cta, msg = WA_MSG, onForm, label = 'Solicitar un diagnóstico' }) {
  return (
    <div className="nd-btns">
      <button type="button" className="nd-btn" onClick={onForm}>
        {label}
      </button>
      <WaLink cta={cta} msg={msg} className="nd-btn nd-btn-soft">
        <IconWhatsApp size={18} />
        Escribinos por WhatsApp
      </WaLink>
    </div>
  )
}

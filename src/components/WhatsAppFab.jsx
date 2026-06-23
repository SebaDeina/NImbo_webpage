import { useLang } from '../i18n/LangContext'
import { IconWhatsApp } from './Icons'
import { whatsappUrl } from '../config/whatsapp'

export default function WhatsAppFab() {
  const { t } = useLang()
  const href = whatsappUrl(t('wa.message'))

  return (
    <div className="wa-root">
      <a
        className="wa-fab"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('wa.fabLabel')}
      >
        <span className="wa-fab-glow" aria-hidden="true" />
        <IconWhatsApp size={28} />
      </a>
    </div>
  )
}

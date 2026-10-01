import { useLang } from '../i18n/LangContext'
import { IconWhatsApp } from './Icons'
import { whatsappUrl } from '../config/whatsapp'

export default function WhatsAppFab() {
  const { t } = useLang()
  return (
    <a
      className="wa-fab"
      href={whatsappUrl(t('wa.message'))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('wa.fabLabel')}
    >
      <IconWhatsApp size={30} />
    </a>
  )
}

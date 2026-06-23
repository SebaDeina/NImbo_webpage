import { useLang } from '../i18n/LangContext'
import { IconStar } from './Icons'

const ITEM_KEYS = [
  'marquee.web',
  'marquee.data',
  'marquee.ai',
  'marquee.branding',
  'marquee.strategy',
  'marquee.automation',
]

export default function Marquee() {
  const { t } = useLang()
  const items = ITEM_KEYS.map((key) => t(key))

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i}>
            {item}
            <IconStar className="marquee-star" />
          </span>
        ))}
      </div>
    </div>
  )
}

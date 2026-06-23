import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LangContext'

export default function StickyScroll() {
  const { t } = useLang()
  const outerRef = useRef(null)
  const lightRef = useRef(null)
  const darkRef = useRef(null)

  useEffect(() => {
    const outer = outerRef.current
    const light = lightRef.current
    const dark = darkRef.current
    if (!outer || !light || !dark) return

    const onScroll = () => {
      const rect = outer.getBoundingClientRect()
      const total = outer.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / total))

      if (progress < 0.4) {
        light.style.opacity = '1'
        dark.style.opacity = '0'
      } else if (progress < 0.6) {
        const tval = (progress - 0.4) / 0.2
        light.style.opacity = String(1 - tval)
        dark.style.opacity = String(tval)
      } else {
        light.style.opacity = '0'
        dark.style.opacity = '1'
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const lightText = t('sticky.light').split('\n')
  const darkText = t('sticky.dark').split('\n')

  return (
    <div className="sticky-outer" ref={outerRef}>
      <div className="sticky-inner">
        <div className="sticky-layer sticky-light" ref={lightRef}>
          <h2 className="sticky-heading">
            {lightText.map((line, i) => (
              <span key={i}>{line}{i < lightText.length - 1 && <br />}</span>
            ))}
          </h2>
        </div>
        <div className="sticky-layer sticky-dark" ref={darkRef}>
          <h2 className="sticky-heading">
            {darkText.map((line, i) => (
              <span key={i}>{line}{i < darkText.length - 1 && <br />}</span>
            ))}
          </h2>
        </div>
      </div>
    </div>
  )
}

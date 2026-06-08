import { useEffect, useRef } from 'react'

const ORBS = [
  { top: '12%', left: '-6%', w: 340, h: 340, speed: 0.07, opacity: 0.55 },
  { top: '28%', left: '82%', w: 260, h: 260, speed: 0.11, opacity: 0.4 },
  { top: '52%', left: '4%', w: 220, h: 220, speed: 0.09, opacity: 0.35 },
  { top: '68%', left: '72%', w: 300, h: 300, speed: 0.06, opacity: 0.45 },
  { top: '86%', left: '38%', w: 380, h: 280, speed: 0.04, opacity: 0.5 },
]

const WISPS = [
  { top: '22%', left: '55%', w: 420, h: 90, speed: 0.13, opacity: 0.28, rot: -8 },
  { top: '44%', left: '-12%', w: 360, h: 72, speed: 0.1, opacity: 0.22, rot: 5 },
  { top: '76%', left: '60%', w: 400, h: 80, speed: 0.08, opacity: 0.25, rot: -4 },
]

const STARS = [
  { top: '18%', left: '22%', speed: 0.16, size: 14 },
  { top: '34%', left: '68%', speed: 0.2, size: 11 },
  { top: '48%', left: '88%', speed: 0.14, size: 16 },
  { top: '61%', left: '14%', speed: 0.18, size: 12 },
  { top: '74%', left: '46%', speed: 0.15, size: 13 },
  { top: '90%', left: '78%', speed: 0.12, size: 10 },
]

export default function ScrollAmbient() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = root.querySelectorAll('[data-speed]')
    let raf = null

    const onScroll = () => {
      if (reduced || raf) return
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        items.forEach((el) => {
          const speed = Number(el.dataset.speed)
          el.style.transform = `${el.dataset.base || ''} translate3d(0, ${y * speed}px, 0)`
        })
        raf = null
      })
    }

    items.forEach((el) => {
      el.dataset.base = el.style.transform || ''
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-ambient" ref={rootRef} aria-hidden="true">
      {ORBS.map((o, i) => (
        <div
          key={`orb-${i}`}
          className="ambient-orb"
          data-speed={o.speed}
          style={{
            top: o.top,
            left: o.left,
            width: o.w,
            height: o.h,
            opacity: o.opacity,
          }}
        />
      ))}
      {WISPS.map((w, i) => (
        <div
          key={`wisp-${i}`}
          className="ambient-wisp"
          data-speed={w.speed}
          style={{
            top: w.top,
            left: w.left,
            width: w.w,
            height: w.h,
            opacity: w.opacity,
            transform: `rotate(${w.rot}deg)`,
          }}
        />
      ))}
      {STARS.map((s, i) => (
        <span
          key={`star-${i}`}
          className="ambient-star"
          data-speed={s.speed}
          style={{ top: s.top, left: s.left, fontSize: s.size }}
        >
          ✳
        </span>
      ))}
    </div>
  )
}

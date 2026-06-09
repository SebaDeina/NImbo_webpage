import { useEffect } from 'react'

const MIN_MS = 420

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      const el = document.getElementById('splash')
      if (el) {
        el.classList.add('done')
        el.setAttribute('aria-busy', 'false')
      }
      onDone()
      return
    }

    const started = Date.now()

    const finish = () => {
      const wait = Math.max(0, MIN_MS - (Date.now() - started))
      window.setTimeout(() => {
        const el = document.getElementById('splash')
        if (el) {
          el.classList.add('done')
          el.setAttribute('aria-busy', 'false')
        }
        window.setTimeout(onDone, 280)
      }, wait)
    }

    if (document.readyState !== 'loading') finish()
    else document.addEventListener('DOMContentLoaded', finish, { once: true })

    return () => document.removeEventListener('DOMContentLoaded', finish)
  }, [onDone])

  return null
}

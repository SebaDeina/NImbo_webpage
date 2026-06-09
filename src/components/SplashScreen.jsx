import { useEffect } from 'react'

const MIN_MS = 750

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const started = Date.now()

    const finish = () => {
      const wait = Math.max(0, MIN_MS - (Date.now() - started))
      window.setTimeout(() => {
        const el = document.getElementById('splash')
        if (el) {
          el.classList.add('done')
          el.setAttribute('aria-busy', 'false')
        }
        window.setTimeout(onDone, 480)
      }, wait)
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    return () => window.removeEventListener('load', finish)
  }, [onDone])

  return null
}

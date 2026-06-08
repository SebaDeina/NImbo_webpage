import { useEffect, useState } from 'react'

/* true cuando el viewport es de teléfono (≤760px). */
export function useIsMobile(query = '(max-width: 760px)') {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [isMobile, setIsMobile] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return isMobile
}

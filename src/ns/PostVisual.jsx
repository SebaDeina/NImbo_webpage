// Portada animada de cada artículo, igual que en nimbodata.com (src/components/nd/PostVisual.jsx): panel con el
// color de la categoría, dos nubes del logo según el slug y la ilustración del tema (BlogScenes del sitio).
// Copiada para no arrastrar el resto de los componentes del sitio; las escenas y su CSS se usan tal cual.
import { useEffect, useRef, useState } from 'react'
import { sceneFor } from '../components/nd/BlogScenes'
import '../styles/blog-scenes.css'

const CLOUD = 'M271.84,16.97c15.42,12.31,28,33.93,28.55,53.89,13.64-.57,26.09-.17,38.52,5.87,56.51,27.48,43.11,115.68-20.22,122.53l-261.99-.05c-62.34-7.28-77.99-89.68-23.15-121.24,14.02-8.07,30.12-8.07,45.94-6.19,1.71-.48,5.47-10.25,6.98-12.67,10.49-16.9,33.25-31.45,53.83-31.99,3.61-.09,18.6,3.19,19.55,2.91.59-.17,6.77-7.6,8.32-8.95,29.26-25.43,72.35-29.12,103.66-4.12Z'

const TONO = {
  'Diseño Web': 'pv-lilac',
  SEO: 'pv-sand',
  'Automatización & IA': 'pv-ink',
  'Inteligencia Artificial': 'pv-brand',
  'Transformación Digital': 'pv-mist',
}

// número estable a partir de un texto
function seed(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

export default function PostVisual({ post, className = '' }) {
  const ref = useRef(null)
  const [run, setRun] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting))
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const rnd = seed(post.slug)
  const clouds = [0, 1].map(() => ({ x: rnd() * 78, y: 4 + rnd() * 74, w: 10 + rnd() * 10 }))
  const Scene = sceneFor(post)
  return (
    <div ref={ref} className={`pv ${TONO[post.category] || 'pv-lilac'}${run ? ' is-run' : ''} ${className}`} aria-hidden="true">
      {clouds.map((c, i) => (
        <span key={i} className="pv-c" style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%` }}>
          <svg viewBox="0 0 374.63 199.26"><path d={CLOUD} fill="currentColor" /></svg>
        </span>
      ))}
      <svg className="pv-scene" viewBox="0 0 400 300"><Scene /></svg>
    </div>
  )
}

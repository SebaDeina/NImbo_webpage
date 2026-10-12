import { useEffect, useRef, useState } from 'react'
import { Cloud } from './Nd'
import { sceneFor } from './BlogScenes'
import '../../styles/blog-scenes.css'

/*
  Portada de cada artículo del blog (los posts no tienen imagen propia): panel con el
  color de la categoría, un par de nubes del logo ubicadas según el slug y una
  ilustración animada del tema del artículo (BlogScenes). La animación corre solo
  mientras la portada está en pantalla.
*/

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

function useOnScreen() {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setOn(true)
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, on]
}

export default function PostVisual({ post, className = '', label = true }) {
  const [ref, run] = useOnScreen()
  const rnd = seed(post.slug)
  const clouds = [0, 1].map(() => ({ x: rnd() * 78, y: 4 + rnd() * 74, w: 10 + rnd() * 10 }))
  const Scene = sceneFor(post)
  return (
    <div ref={ref} className={`pv ${TONO[post.category] || 'pv-lilac'}${run ? ' is-run' : ''} ${className}`} aria-hidden="true">
      {clouds.map((c, i) => (
        <span key={i} className="pv-c" style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%` }}>
          <Cloud />
        </span>
      ))}
      <svg className="pv-scene" viewBox="0 0 400 300">
        <Scene />
      </svg>
      {label && <span className="pv-k nd-mono">{post.category}</span>}
    </div>
  )
}

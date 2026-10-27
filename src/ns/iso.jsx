// Kit isométrico para las figuras: proyección, cajas con sus tres caras visibles y texto apoyado en una cara.
// Mundo: x hacia abajo a la derecha, y hacia abajo a la izquierda, z hacia arriba (px de pantalla).
import { Easing, interpolate, spring } from 'remotion'

export const C = Math.cos(Math.PI / 6)
export const S = 0.5

export const INK = '#26253f'
export const ACC = '#4f4fd5'
export const ACC_2 = '#6665ff'
export const FACE = { top: '#ffffff', left: '#f2f2f7', right: '#e3e3ec' }
export const FACE_ACC = { top: '#8d8dff', left: '#6665ff', right: '#4f4fd5' }
export const MONO = "'JetBrains Mono', ui-monospace, monospace"

export const P = (x, y, z = 0) => [(x - y) * C, (x + y) * S - z]
export const pts = (list) => list.map((p) => P(...p).map((n) => n.toFixed(2)).join(',')).join(' ')

// matrices para dibujar en 2D sobre una cara: el eje x del dibujo sigue la cara y el eje y baja por z
export const onLeft = (x, y, z) => { const [e, f] = P(x, y, z); return `matrix(${C},${S},0,1,${e},${f})` } // cara +y (frente izq.)
export const onRight = (x, y, z) => { const [e, f] = P(x, y, z); return `matrix(${C},${-S},0,1,${e},${f})` } // cara +x (frente der.)
export const onTop = (x, y, z) => { const [e, f] = P(x, y, z); return `matrix(${C},${S},${-C},${S},${e},${f})` }

export function Box({ x = 0, y = 0, z = 0, w, d, h, faces = FACE, stroke = INK, sw = 1.3, children }) {
  const t = z + h
  return (
    <g strokeLinejoin="round" stroke={stroke} strokeWidth={sw}>
      <polygon points={pts([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, t], [x, y + d, t]])} fill={faces.left} />
      <polygon points={pts([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, t], [x + w, y, t]])} fill={faces.right} />
      <polygon points={pts([[x, y, t], [x + w, y, t], [x + w, y + d, t], [x, y + d, t]])} fill={faces.top} />
      {children}
    </g>
  )
}

// rectángulo plano sobre la tapa (z fijo), útil para ranuras, etiquetas y sombras
export const TopRect = ({ x, y, z, w, d, ...rest }) => (
  <polygon points={pts([[x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z]])} {...rest} />
)

export const FaceText = ({ transform, x = 0, y = 0, size = 9, fill = INK, children, weight = 500, anchor }) => (
  <text transform={transform} x={x} y={y} fontFamily={MONO} fontSize={size} fontWeight={weight} fill={fill} stroke="none"
    letterSpacing="0.06em" textAnchor={anchor}>{children}</text>
)

// la nube de Nimbo (brand-assets/logo/nimbo-nube.svg), mide ~375×200; `w` es el ancho final
const CLOUD_D = 'M271.84,16.97c15.42,12.31,28,33.93,28.55,53.89,13.64-.57,26.09-.17,38.52,5.87,56.51,27.48,43.11,115.68-20.22,122.53l-261.99-.05c-62.34-7.28-77.99-89.68-23.15-121.24,14.02-8.07,30.12-8.07,45.94-6.19,1.71-.48,5.47-10.25,6.98-12.67,10.49-16.9,33.25-31.45,53.83-31.99,3.61-.09,18.6,3.19,19.55,2.91.59-.17,6.77-7.6,8.32-8.95,29.26-25.43,72.35-29.12,103.66-4.12Z'
export const Cloud = ({ w = 100, x = 0, y = 0, stroke = INK, fill = 'none', sw = 1.3, ...rest }) => {
  const k = w / 375
  return (
    <path d={CLOUD_D} transform={`translate(${x} ${y}) scale(${k})`} fill={fill} stroke={stroke}
      strokeWidth={sw / k} strokeLinejoin="round" {...rest} />
  )
}

// utilidades de tiempo
export const sp = (frame, fps, at, cfg = {}) =>
  spring({ frame: frame - at, fps, config: { damping: 12, stiffness: 140, mass: 0.7, ...cfg } })
export const ramp = (frame, a, b, from = 0, to = 1, ease = Easing.inOut(Easing.cubic)) =>
  interpolate(frame, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease })

// marco común de las figuras: SVG centrado de 800×600
export const Stage = ({ children, dx = 0, dy = 0, k = 1 }) => (
  <svg viewBox="-400 -300 800 600" width="100%" height="100%" style={{ display: 'block' }}>
    <g transform={`translate(${dx} ${dy}) scale(${k})`}>{children}</g>
  </svg>
)

// sombra suave en el piso para objetos que caen o flotan
export const Shadow = ({ x, y, w, d, z = 0, lift = 0 }) => (
  <TopRect x={x + lift * 0.15} y={y + lift * 0.15} z={z} w={w} d={d} fill={INK} stroke="none"
    opacity={Math.max(0, 0.12 - lift / 2200)} />
)

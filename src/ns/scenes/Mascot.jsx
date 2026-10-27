// Nimbo, la nube del logo con vida: línea fina como las figuras isométricas, rayado de grabado abajo como
// el cielo del hero y una cara simple (ojos ovalados y sonrisa en U). El carácter está en el movimiento: flota,
// respira estirándose y aplastándose, parpadea, sigue el mouse con la mirada, rebota al saludar y abre la
// boca solo mientras habla. Si lo tocan muchas veces se enoja: frunce las cejas, tiembla, se pone rosado y
// le sale vapor. Composición de Remotion en loop; el estado llega por inputProps.
import { interpolate, useCurrentFrame } from 'remotion'

export const MASCOT = { fps: 30, durationInFrames: 120, width: 220, height: 190 }

const INK = '#26248a'
const CLOUD = 'M271.84,16.97c15.42,12.31,28,33.93,28.55,53.89,13.64-.57,26.09-.17,38.52,5.87,56.51,27.48,43.11,115.68-20.22,122.53l-261.99-.05c-62.34-7.28-77.99-89.68-23.15-121.24,14.02-8.07,30.12-8.07,45.94-6.19,1.71-.48,5.47-10.25,6.98-12.67,10.49-16.9,33.25-31.45,53.83-31.99,3.61-.09,18.6,3.19,19.55,2.91.59-.17,6.77-7.6,8.32-8.95,29.26-25.43,72.35-29.12,103.66-4.12Z'
const K = 150 / 375 // la nube mide 150 de ancho
const HATCH = [144, 156, 167, 177, 186, 194] // rayas del grabado, en coordenadas de la nube

export function Mascot({ look = [0, 0], talking = false, wave = false, happy = false, angry = false }) {
  const f = useCurrentFrame()
  const t = (f / 120) * Math.PI * 2
  // al saludar da dos saltitos; si no, flota
  const hop = wave ? Math.abs(Math.sin(f / 5)) * -9 : 0
  const float = Math.sin(t) * 4 + hop
  const breathe = Math.sin(t + Math.PI / 2) * 0.022
  const squash = wave ? (Math.abs(Math.sin(f / 5)) < 0.25 ? 0.07 : -0.03) : 0
  const sy = 1 + breathe - squash + (happy ? Math.sin(f / 2.4) * 0.03 : 0)
  const sx = 2 - sy
  const tilt = wave ? Math.sin(f / 7) * 4 : Math.sin(t) * 1.2
  const shake = angry ? Math.sin(f * 2.6) * 2.2 : 0
  const blink = (f >= 52 && f < 56) || (f >= 98 && f < 101) ? 0.1 : 1
  const [lx, ly] = look
  const ex = Math.max(-1, Math.min(1, lx)) * 4
  const ey = Math.max(-1, Math.min(1, ly)) * 2.6
  const mouth = talking ? [1.2, 4.2, 2.6][Math.floor(f / 4) % 3] : 0
  const shadow = interpolate(float, [-13, 4], [0.78, 1.05], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <svg viewBox="0 0 220 190" width="100%" height="100%" style={{ display: 'block', overflow: 'visible' }}>
      <ellipse cx={110} cy={174} rx={56 * shadow} ry={5 * shadow} fill={INK} opacity={0.1} />
      {angry && <Steam f={f} />}
      <g transform={`translate(${110 + shake} ${146 + float}) rotate(${tilt + shake * 0.6}) scale(${sx} ${sy}) translate(-110 -146)`}>
        <g transform={`translate(35 64) scale(${K})`}>
          <defs>
            <clipPath id="nimbo-cloud-clip"><path d={CLOUD} /></clipPath>
          </defs>
          <path d={CLOUD} fill={angry ? '#ffe4e8' : '#fff'} />
          <g clipPath="url(#nimbo-cloud-clip)" stroke="#8d8dff" strokeWidth={1.4 / K} strokeLinecap="round">
            {HATCH.map((y, i) => (
              <line key={y} x1={-20} x2={400} y1={y + Math.sin(t + i) * 2} y2={y + Math.sin(t + i) * 2} opacity={0.25 + i * 0.12} />
            ))}
          </g>
          <path d={CLOUD} fill="none" stroke={INK} strokeWidth={3 / K} strokeLinejoin="round" />
        </g>
        {/* cara: ojos ovalados grandes (los dos iguales) y una sonrisa chiquita en U entre los dos */}
        <g transform={`translate(${angry ? 0 : ex} ${angry ? 0 : ey})`}>
          {angry ? <Angry /> : [93, 127].map((x) => (happy
            ? <path key={x} d={`M${x - 6.5} 109 q6.5 -8 13 0`} stroke={INK} strokeWidth={3.4} fill="none" strokeLinecap="round" />
            : <ellipse key={x} cx={x} cy={107} rx={6.2} ry={8.6 * blink} fill={INK} />))}
          {angry ? null : mouth > 0
            ? <path d={`M103.5 116 q6.5 ${2.4 + mouth * 1.7} 13 0 z`} fill={INK} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
            : <path d="M104.5 115 q5.5 7.5 11 0" stroke={INK} strokeWidth={3.8} fill="none" strokeLinecap="round" />}
        </g>
      </g>
    </svg>
  )
}

// cejas fruncidas, ojos achinados y boca en zigzag
function Angry() {
  return (
    <g stroke={INK} strokeWidth={3} strokeLinecap="round" fill="none">
      <line x1={89} y1={98} x2={101} y2={103} />
      <line x1={131} y1={98} x2={119} y2={103} />
      <rect x={93} y={106} width={6} height={7} rx={3} fill={INK} stroke="none" />
      <rect x={121} y={106} width={6} height={7} rx={3} fill={INK} stroke="none" />
      <path d="M102 125 l3 -3 l3 3 l3 -3 l3 3 l3 -3" strokeWidth={2.4} strokeLinejoin="round" />
    </g>
  )
}

// vapor de enojo saliendo de la cabeza
function Steam({ f }) {
  return [[150, 52, 0], [166, 64, 9], [140, 46, 18]].map(([x, y, d], i) => {
    const t = ((f + d * 2) % 24) / 24
    return (
      <path key={i} d={`M${x} ${y} q4 -6 0 -12 q-4 -6 0 -12`} transform={`translate(${t * 6} ${-t * 14})`} fill="none"
        stroke="#e5484d" strokeWidth={2.6} strokeLinecap="round" opacity={1 - t} />
    )
  })
}

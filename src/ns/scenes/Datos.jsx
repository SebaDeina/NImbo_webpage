// Fig 3 · Datos: barras isométricas que crecen, cambian de mes con resorte, una línea que las une,
// la pantalla de ventas que rueda el número y una bandera cuando aparece el récord.
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { ACC, Box, FaceText, FACE_ACC, INK, MONO, onLeft, onRight, onTop, P, ramp, Shadow, Stage } from '../iso'

export const DATOS = { durationInFrames: 240, fps: 30 }

const A = [62, 104, 80, 128, 150]
const B = [88, 76, 118, 112, 196]
const MESES = ['JUL', 'AGO', 'SEP', 'OCT', 'NOV']
const BW = 34
const BY = -100
const bx = (i) => -178 + i * 56
const SWAP = 112
const OUT = 220

export function Datos() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const heights = A.map((a, i) => {
    const up = spring({ frame: frame - 4 - i * 4, fps, config: { damping: 11, stiffness: 110, mass: 0.8 } })
    const sw = spring({ frame: frame - SWAP - i * 4, fps, config: { damping: 10, stiffness: 120, mass: 0.8 } })
    const out = ramp(frame, OUT + i * 2, OUT + 12 + i * 2, 1, 0)
    return Math.max(1, (a * up + (B[i] - a) * sw) * out)
  })
  const tops = heights.map((h, i) => P(bx(i) + BW / 2, BY + BW / 2, 10 + h))
  const reveal = ramp(frame, 24, 56) * ramp(frame, OUT - 6, OUT + 6, 1, 0)
  const value = interpolate(frame, [SWAP, SWAP + 26], [18.4, 21.7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const pct = frame < SWAP + 13 ? '+12%' : '+18%'
  const flag = spring({ frame: frame - SWAP - 24, fps, config: { damping: 9, stiffness: 160 } }) * ramp(frame, OUT - 4, OUT + 4, 1, 0)

  return (
    <Stage dx={0} dy={84} k={1.08}>
      <Box x={-210} y={-136} z={0} w={390} d={262} h={10} />
      {MESES.map((m, i) => (
        <FaceText key={m} transform={onTop(bx(i) + 6, BY + BW + 8, 10)} y={6} size={8} fill="#5c5a7a">{m}</FaceText>
      ))}
      {[-122, -40].map((y) => (
        <line key={y} {...seg(-200, y, 172, y)} stroke="#e3e3ec" strokeWidth={1} />
      ))}

      {heights.map((h, i) => (
        <g key={i}>
          <Shadow x={bx(i) + 5} y={BY + 5} z={10} w={BW} d={BW} />
          <Box x={bx(i)} y={BY} z={10} w={BW} d={BW} h={h} faces={i === 4 ? FACE_ACC : undefined} />
        </g>
      ))}

      <polyline points={tops.map((p) => `${p[0]},${p[1] - 14}`).join(' ')} fill="none" stroke={ACC} strokeWidth={2}
        strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - reveal} />
      {tops.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1] - 14} r={3.4} fill="#fff" stroke={ACC} strokeWidth={1.6}
          opacity={reveal > i / 5 ? 1 : 0} />
      ))}

      <Alarm frame={frame} k={flag} />
      <Flag at={tops[4]} k={flag} />
      <Display value={value} pct={pct} frame={frame} />
    </Stage>
  )
}

const seg = (x1, y1, x2, y2) => {
  const a = P(x1, y1, 10)
  const b = P(x2, y2, 10)
  return { x1: a[0], y1: a[1], x2: b[0], y2: b[1] }
}

function Flag({ at, k }) {
  if (k <= 0.01) return null
  return (
    <g transform={`translate(${at[0]} ${at[1] - 20}) scale(${k}) `}>
      <line x1={0} y1={0} x2={0} y2={-46} stroke={INK} strokeWidth={1.4} />
      <path d="M0 -46h58l-8 9 8 9H0z" fill="#fff" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <text x={6} y={-34} fontFamily={MONO} fontSize={7.5} fontWeight={500} fill={ACC} letterSpacing="0.06em">RÉCORD</text>
    </g>
  )
}

function Display({ value, pct, frame }) {
  // pantalla de pie a la derecha, con la cara del número mirando al frente derecho
  const D = { x: 126, y: -6, z: 10, w: 46, d: 134, h: 74 }
  const top = D.z + D.h
  const blink = Math.floor(frame / 15) % 2 === 0
  return (
    <g>
      <Shadow x={D.x + 6} y={D.y + 6} z={10} w={D.w} d={D.d} />
      <Box {...D} />
      <g transform={onRight(D.x + D.w, D.y + D.d, top)} stroke={INK} strokeWidth={1.2}>
        <rect x={8} y={10} width={118} height={50} rx={4} fill={INK} />
        <text x={16} y={24} fontFamily={MONO} fontSize={7} fill="#b9b8ff" stroke="none" letterSpacing="0.08em">VENTAS DEL MES</text>
        <text x={16} y={49} fontFamily="'Hanken Grotesk', sans-serif" fontSize={19} fontWeight={500} fill="#fff" stroke="none"
          letterSpacing="-0.02em">$ {value.toFixed(1).replace('.', ',')} M</text>
        <text x={94} y={24} fontFamily={MONO} fontSize={8} fill="#7fe0a8" stroke="none">{pct}</text>
        <circle cx={118} cy={38} r={2.4} fill={blink ? '#2fbf71' : '#1c7a47'} stroke="none" />
      </g>
      <g transform={onLeft(D.x, D.y + D.d, top)} stroke={INK} strokeWidth={1.2}>
        {[14, 21, 28].map((v) => <line key={v} x1={10} x2={36} y1={v} y2={v} />)}
        <FaceText x={8} y={60} size={5.5} fill="#5c5a7a">BI</FaceText>
      </g>
    </g>
  )
}

// aviso: una cajita con lámpara que se enciende y vibra cuando aparece el récord
function Alarm({ frame, k }) {
  const B = { x: -176, y: 40, z: 10, w: 56, d: 56, h: 36 }
  const on = k > 0.5
  const shake = on && frame < SWAP + 60 ? Math.sin(frame * 1.9) * 2.2 : 0
  const top = B.z + B.h
  return (
    <g transform={`translate(${shake} 0)`}>
      <Shadow x={B.x + 4} y={B.y + 4} z={10} w={B.w} d={B.d} />
      <Box {...B} />
      <Box x={B.x + 16} y={B.y + 16} z={top} w={24} d={24} h={14} faces={on ? FACE_ACC : undefined} />
      <g transform={onLeft(B.x, B.y + B.d, top)}>
        <text x={8} y={14} fontFamily={MONO} fontSize={6.5} fill={INK} letterSpacing="0.06em">ALERTA</text>
        <text x={8} y={27} fontFamily={MONO} fontSize={6} fill={on ? ACC : '#9b99b8'} letterSpacing="0.06em">{on ? 'AVISADO ✓' : 'EN ESPERA'}</text>
      </g>
    </g>
  )
}

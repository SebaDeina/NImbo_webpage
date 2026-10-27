// BETA · un encuentro, con el kit isométrico de Nimbo: una pantalla que pasa las charlas, sillas que se van
// llenando con gente que cae a su lugar y una silla vacía punteada que dice "tu lugar". Al final del loop
// la gente se levanta y vuelve a empezar.
import { spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { ACC, Box, FaceText, FACE_ACC, INK, MONO, onLeft, P, ramp, Shadow, Stage, TopRect } from '../iso'

export const ENCUENTRO = { durationInFrames: 300, fps: 30 }

const SLIDES = [['ENCUENTRO #1', 'Conocernos'], ['CASO REAL', 'IA en la práctica'], ['CIERRE', 'Networking']]
const FACES = [
  { top: '#3b39b8', left: '#26248a', right: '#1d1c6e' },
  FACE_ACC,
  { top: '#efedfc', left: '#dcd8f5', right: '#c9c4ef' },
]
const COLS = 4
const ROWS = 3
const EMPTY = 6 // índice de la silla libre
const seat = (i) => ({ x: -128 + (i % COLS) * 54, y: -26 + Math.floor(i / COLS) * 52 })
const LEAVE = 268

export function Encuentro() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const slide = SLIDES[Math.min(SLIDES.length - 1, Math.floor(frame / 90))]
  const swap = frame % 90 < 8 && frame > 8 ? (frame % 90) / 8 : 1

  const seats = Array.from({ length: COLS * ROWS }, (_, i) => i)
  // de atrás hacia adelante para que se tapen bien
  const order = [...seats].sort((a, b) => seat(a).x + seat(a).y - (seat(b).x + seat(b).y))

  return (
    <Stage dx={20} dy={62} k={1.04}>
      <Box x={-230} y={-160} z={0} w={366} d={270} h={10} />
      <FaceText transform={onLeft(-220, 110, 8)} y={0} size={6.5}>BETA · BERAZATEGUI</FaceText>

      {/* pantalla */}
      <Shadow x={-196} y={-148} z={10} w={250} d={12} />
      <Box x={-200} y={-152} z={10} w={250} d={10} h={128} />
      <g transform={onLeft(-200, -142, 138)} stroke={INK} strokeWidth={1.2}>
        <rect x={10} y={10} width={230} height={92} rx={4} fill={INK} />
        <g opacity={swap} stroke="none">
          <text x={24} y={34} fontFamily={MONO} fontSize={8} fill="#b9b8ff" letterSpacing="0.1em">{slide[0]}</text>
          <text x={24} y={68} fontFamily="'Hanken Grotesk', sans-serif" fontSize={24} fontWeight={500} fill="#fff" letterSpacing="-0.02em">{slide[1]}</text>
          <rect x={24} y={80} width={60} height={3} rx={1.5} fill={ACC} />
        </g>
      </g>
      {/* atril */}
      <Box x={-190} y={-112} z={10} w={30} d={24} h={44} />
      <TopRect x={-188} y={-110} z={54} w={26} d={20} fill="#f2f2f7" stroke={INK} strokeWidth={1} />

      {order.map((i) => <Seat key={i} i={i} frame={frame} fps={fps} />)}
    </Stage>
  )
}

function Seat({ i, frame, fps }) {
  const { x, y } = seat(i)
  const chair = <Box x={x} y={y} z={10} w={24} d={24} h={14} />
  if (i === EMPTY) {
    const bob = Math.sin((frame / 300) * Math.PI * 4) * 3
    const [lx, ly] = P(x + 12, y + 12, 96 + bob)
    return (
      <g>
        <Box x={x} y={y} z={10} w={24} d={24} h={14} faces={{ top: '#fff', left: '#fff', right: '#fff' }} stroke={ACC} sw={1.2} />
        <TopRect x={x - 3} y={y - 3} z={24} w={30} d={30} fill="none" stroke={ACC} strokeWidth={1.4} strokeDasharray="4 4" strokeDashoffset={-frame * 0.4} />
        <line x1={P(x + 12, y + 12, 26)[0]} y1={P(x + 12, y + 12, 26)[1]} x2={lx} y2={ly + 6} stroke={ACC} strokeWidth={1} strokeDasharray="2 3" />
        <g transform={`translate(${lx} ${ly})`}>
          <rect x={-31} y={-12} width={62} height={18} rx={5} fill="#fff" stroke={ACC} strokeWidth={1.2} />
          <text x={0} y={1} textAnchor="middle" fontFamily={MONO} fontSize={8} fontWeight={500} fill={ACC} letterSpacing="0.06em">TU LUGAR</text>
        </g>
      </g>
    )
  }
  const arrive = spring({ frame: frame - 6 - ((i * 7) % 12) * 6, fps, config: { damping: 11, stiffness: 140, mass: 0.7 } })
  const leave = ramp(frame, LEAVE + (i % 4) * 4, LEAVE + 18 + (i % 4) * 4, 0, 1, (t) => t * t)
  const air = (1 - arrive) * 220 + leave * 260
  const faces = FACES[(i * 5) % FACES.length]
  const z = 24 + air
  const [hx, hy] = P(x + 12, y + 12, z + 34)
  const nod = Math.sin(frame / 9 + i) * 0.8
  return (
    <g>
      {chair}
      {air > 1 && <TopRect x={x + 3} y={y + 3} z={24} w={18} d={18} fill={INK} stroke="none" opacity={Math.max(0, 0.12 - air / 2000)} />}
      <g opacity={1 - leave}>
        <Box x={x + 4} y={y + 4} z={z} w={16} d={16} h={24} faces={faces} />
        <circle cx={hx} cy={hy + nod} r={9} fill={faces.top} stroke={INK} strokeWidth={1.3} />
      </g>
    </g>
  )
}

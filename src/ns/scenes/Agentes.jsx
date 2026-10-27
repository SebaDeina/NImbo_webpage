// Fig 1 · Agentes de IA: una máquina con la nube de Nimbo que se traga los mensajes de la madrugada,
// suma al contador, se ilumina e imprime el ticket con la respuesta.
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { ACC, ACC_2, Box, Cloud, FaceText, FACE_ACC, INK, MONO, onLeft, onRight, onTop, P, ramp, Shadow, sp, Stage, TopRect } from '../iso'

export const AGENTES = { durationInFrames: 240, fps: 30 }

const MSGS = [
  { t: '¿Tienen turno mañana?', h: '02:14', ticket: ['TURNO OK', 'JUE 10:30'] },
  { t: 'Quiero 2 cajas de velas', h: '02:31', ticket: ['PEDIDO #1042', 'CONFIRMADO'] },
  { t: '¿Hacen envíos a Rosario?', h: '03:07', ticket: ['RESPUESTA', 'ENVIADA ✓'] },
]
const GAP = 75
const START = 8

// máquina: x -110..60, y -90..40, z 10..130
const M = { x: -110, y: -90, z: 10, w: 170, d: 130, h: 120 }
const TOP = M.z + M.h
const SLOT = P(-25, -49, TOP)

export function Agentes() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const eaten = MSGS.filter((_, i) => frame >= START + i * GAP + 30).length
  const last = eaten - 1
  const sinceEat = last >= 0 ? frame - (START + last * GAP + 30) : 999

  // la máquina se aplasta un poco al tragar y rebota
  const b = sinceEat
  const squash = b >= 0 && b < 22 ? 1 - 0.045 * Math.sin((b / 22) * Math.PI * 2) * (1 - b / 22) : 1
  const [bx, by] = P(M.x + M.w / 2, M.y + M.d / 2, M.z)
  const lampOn = sinceEat < 24 && Math.floor(sinceEat / 4) % 2 === 0

  return (
    <Stage dy={36} k={1.16}>
      {/* base */}
      <Box x={-180} y={-140} z={0} w={330} d={260} h={10} />
      {[[-170, -130], [140, -130], [140, 110], [-170, 110]].map(([x, y]) => (
        <ellipse key={`${x}${y}`} cx={P(x, y, 10)[0]} cy={P(x, y, 10)[1]} rx={3.2} ry={1.8} fill="#fff" stroke={INK} strokeWidth={1} />
      ))}
      <FaceText transform={onLeft(-160, 120, 8)} y={0} size={6.5}>AGENTE · 24/7</FaceText>
      <Shadow x={M.x + 6} y={M.y + 6} z={10} w={M.w} d={M.d} />

      <g transform={`translate(${bx} ${by}) scale(1 ${squash}) translate(${-bx} ${-by})`}>
        <Box {...M} />
        {/* ranura de entrada */}
        <TopRect x={-62} y={-55} z={TOP} w={74} d={12} fill={INK} stroke={INK} />
        <FaceText transform={onTop(-62, -36, TOP)} size={6.5} y={4}>MENSAJES</FaceText>
        {/* lámpara */}
        <Box x={22} y={-78} z={TOP} w={24} d={24} h={6} />
        <Box x={26} y={-74} z={TOP + 6} w={16} d={16} h={12} faces={lampOn ? FACE_ACC : undefined} />
        {/* frente: pantalla con contador y ranura de impresión */}
        <g transform={onLeft(M.x, M.y + M.d, TOP)} stroke={INK} strokeWidth={1.2}>
          <FaceText x={16} y={13} size={6.5}>RESPONDIDAS</FaceText>
          <rect x={16} y={18} width={88} height={28} rx={3} fill={INK} />
          <Counter frame={frame} value={141 + eaten} since={sinceEat} />
          <circle cx={128} cy={32} r={9} fill="#fff" />
          <circle cx={128} cy={32} r={3} fill={ACC} stroke="none" />
          <circle cx={150} cy={24} r={3} fill="#2fbf71" stroke="none" />
          <FaceText x={142} y={42} size={5.5} fill="#5c5a7a">ONLINE</FaceText>
          <rect x={34} y={78} width={84} height={6} rx={2} fill={INK} />
          {[8, 162].map((u) => [8, 112].map((v) => <circle key={`${u}${v}`} cx={u} cy={v} r={1.8} fill="#fff" />))}
        </g>
        {/* lateral: rejilla y la nube */}
        <g transform={onRight(M.x + M.w, M.y + M.d, TOP)} stroke={INK} strokeWidth={1.2}>
          {[18, 26, 34, 42].map((v) => <line key={v} x1={22} x2={108} y1={v} y2={v} />)}
          <Cloud x={34} y={60} w={64} sw={1.6} fill="#fff" />
        </g>
      </g>

      <Ticket frame={frame} />
      <Clock frame={frame} eaten={eaten} since={sinceEat} />

      {MSGS.map((m, i) => (
        <Bubble key={m.h} frame={frame} fps={fps} start={START + i * GAP} text={m.t} hour={m.h} />
      ))}
    </Stage>
  )
}

function Counter({ value, since }) {
  const roll = since < 10 ? interpolate(since, [0, 10], [1, 0], { extrapolateRight: 'clamp' }) : 0
  const txt = String(value).padStart(4, '0')
  const prev = String(value - 1).padStart(4, '0')
  return (
    <g>
      <clipPath id="ctr"><rect x={16} y={18} width={88} height={28} rx={3} /></clipPath>
      <g clipPath="url(#ctr)" fontFamily={MONO} fontSize={17} fontWeight={500} fill="#dcd8f5" stroke="none">
        {[0, 1, 2].map((i) => <text key={i} x={27 + i * 17} y={38}>{txt[i]}</text>)}
        <text x={78} y={38 + roll * 22} fill="#b9b8ff">{txt[3]}</text>
        <text x={78} y={38 - (1 - roll) * 22} fill="#b9b8ff" opacity={roll > 0 ? 1 : 0}>{prev[3]}</text>
      </g>
    </g>
  )
}

function Ticket({ frame }) {
  const i = Math.floor((frame - START - 40) / GAP)
  if (i < 0 || i >= MSGS.length) return null
  const s = START + i * GAP + 40
  const len = ramp(frame, s, s + 18, 0, 64, (t) => t) + ramp(frame, s + 30, s + 40, 0, 60)
  const op = ramp(frame, s + 32, s + 40, 1, 0)
  if (len <= 0.5) return null
  const x = -74
  const y = M.y + M.d
  const z = 50
  return (
    <g opacity={op}>
      <Box x={x} y={y} z={z} w={68} d={len} h={1.2} />
      <g clipPath={undefined}>
        {len > 30 && <FaceText transform={onTop(x + 8, y + len - 26, z + 1.2)} size={7}>{MSGS[i].ticket[0]}</FaceText>}
        {len > 46 && <FaceText transform={onTop(x + 8, y + len - 14, z + 1.2)} size={7} fill={ACC}>{MSGS[i].ticket[1]}</FaceText>}
      </g>
    </g>
  )
}

function Clock({ eaten, since }) {
  const hour = eaten > 0 ? MSGS[eaten - 1].h : '02:09'
  const pop = since < 12 ? 1 + 0.15 * Math.sin((since / 12) * Math.PI) : 1
  const B = { x: 84, y: 8, z: 10, w: 64, d: 52, h: 42 }
  const [cx, cy] = P(B.x + 30, B.y + B.d, B.z + 20)
  return (
    <g>
      <Shadow x={B.x + 4} y={B.y + 4} z={10} w={B.w} d={B.d} />
      <Box {...B} />
      <g transform={onLeft(B.x, B.y + B.d, B.z + B.h)} stroke={INK} strokeWidth={1.2}>
        <FaceText x={8} y={10} size={5.5}>HORA</FaceText>
        <rect x={7} y={14} width={50} height={20} rx={2} fill={INK} />
      </g>
      <g transform={`translate(${cx} ${cy}) scale(${pop}) translate(${-cx} ${-cy})`}>
        <FaceText transform={onLeft(B.x, B.y + B.d, B.z + B.h)} x={12} y={29} size={12} fill="#dcd8f5">{hour}</FaceText>
      </g>
      <FaceText transform={onRight(B.x + B.w, B.y + B.d, B.z + B.h)} x={10} y={14} size={5.5} fill="#5c5a7a">AM</FaceText>
    </g>
  )
}

function Bubble({ frame, fps, start, text, hour }) {
  const f = frame - start
  if (f < 0 || f > 36) return null
  const fall = sp(frame, fps, start, { damping: 14, stiffness: 120 })
  const yTop = interpolate(fall, [0, 1], [-360, SLOT[1] - 44])
  const squash = f >= 16 && f < 26 ? interpolate(f, [16, 20, 26], [1, 0.78, 0.9]) : 1
  const swallow = ramp(frame, start + 24, start + 34, 1, 0, (t) => t * t)
  const wob = Math.sin(f / 3) * (1 - fall) * 6
  const W = 132
  return (
    <g transform={`translate(${SLOT[0]} ${yTop + 44 * (1 - swallow)}) rotate(${wob}) scale(${(2 - squash) * swallow} ${squash * swallow}) translate(-29 -44)`}>
      <path d={`M10 0h${W - 20}a10 10 0 0 1 10 10v18a10 10 0 0 1-10 10H34l-10 8 1-8H10A10 10 0 0 1 0 28V10A10 10 0 0 1 10 0z`}
        fill="#fff" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <text x={12} y={17} fontFamily="'Hanken Grotesk', sans-serif" fontSize={11} fill={INK}>{text}</text>
      <text x={12} y={30} fontFamily={MONO} fontSize={7} fill="#5c5a7a" letterSpacing="0.06em">WHATSAPP · {hour}</text>
      <circle cx={W - 12} cy={28} r={2.6} fill={ACC_2} />
    </g>
  )
}

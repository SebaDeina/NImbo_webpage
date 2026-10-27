// Fig 2 · Automatización: papeles sueltos entran por una cinta a la máquina y salen como bloques ordenados
// que caen en la caja de la planilla. La chimenea larga nubes (la marca) mientras procesa.
import { interpolate, useCurrentFrame } from 'remotion'
import { ACC, Box, Cloud, FaceText, FACE_ACC, INK, onLeft, onRight, onTop, P, pts, Shadow, Stage, TopRect } from '../iso'

export const AUTOMATIZACION = { durationInFrames: 240, fps: 30 }

const LOOP = 240
const EVERY = 30
const X0 = -300
const X1 = 250
const SPEED = (X1 - X0) / (LOOP - 16)
const BELT = { y: -30, d: 60, z: 34, h: 14 }
const BELT_TOP = BELT.z + BELT.h
const M = { x: -70, y: -72, z: 8, w: 124, d: 132, h: 142 }
const BIN = { x: 262, y: -48, z: 8, w: 76, d: 96, h: 48 }

function items(frame) {
  return Array.from({ length: LOOP / EVERY }, (_, k) => {
    const ph = (frame - k * EVERY + LOOP * 4) % LOOP
    const travel = Math.min(ph, LOOP - 16)
    const x = X0 + travel * SPEED
    const fall = ph > LOOP - 16 ? interpolate(ph, [LOOP - 16, LOOP], [0, 1]) : 0
    return { k, ph, x, fall, paper: x < M.x + M.w / 2, jitter: [(k * 7) % 11 - 5, (k * 5) % 9 - 4] }
  })
}

export function Automatizacion() {
  const frame = useCurrentFrame()
  const list = items(frame)
  // lo que está antes de la boca de salida se dibuja detrás de la máquina, que lo tapa
  const before = list.filter((it) => it.x < M.x + M.w - 12)
  const after = list.filter((it) => it.x >= M.x + M.w - 12 && it.fall === 0)
  const falling = list.filter((it) => it.fall > 0)
  const busy = list.some((it) => it.x > M.x - 10 && it.x < M.x + M.w)

  return (
    <Stage dx={-22} dy={22} k={0.92}>
      <Box x={-320} y={-120} z={0} w={680} d={230} h={8} />
      <FaceText transform={onLeft(-300, 110, 6)} size={6.5}>AUTOMATIZACIÓN · SIN CARGA MANUAL</FaceText>

      <Legs xs={[-290, -150]} />
      <Belt x={X0 - 10} w={M.x - X0 + 10} frame={frame} />
      {before.map((it) => <Item key={it.k} it={it} />)}

      <Machine frame={frame} busy={busy} />

      <Legs xs={[120, 228]} />
      <Belt x={M.x + M.w} w={X1 + 10 - M.x - M.w} frame={frame} />
      <Bin falling={falling} />
      {/* los bloques de la cinta nunca quedan detrás de la caja */}
      {after.map((it) => <Item key={it.k} it={it} />)}
    </Stage>
  )
}

function Legs({ xs }) {
  return xs.map((x) => (
    <g key={x}>
      <Box x={x} y={BELT.y + 4} z={8} w={10} d={8} h={BELT.z - 8} />
      <Box x={x} y={BELT.y + BELT.d - 12} z={8} w={10} d={8} h={BELT.z - 8} />
    </g>
  ))
}

function Belt({ x, w, frame }) {
  const step = 26
  const off = (frame * SPEED) % step
  const lines = []
  for (let u = off; u < w; u += step) lines.push(x + u)
  return (
    <g>
      <Box x={x} y={BELT.y} z={BELT.z} w={w} d={BELT.d} h={BELT.h} />
      {lines.map((lx) => (
        <line key={lx} x1={P(lx, BELT.y + 3, BELT_TOP)[0]} y1={P(lx, BELT.y + 3, BELT_TOP)[1]}
          x2={P(lx, BELT.y + BELT.d - 3, BELT_TOP)[0]} y2={P(lx, BELT.y + BELT.d - 3, BELT_TOP)[1]}
          stroke="#c9c8d9" strokeWidth={1} />
      ))}
    </g>
  )
}

function Item({ it }) {
  const y = BELT.y + 14 + (it.paper ? it.jitter[0] : 0)
  if (it.paper) {
    const op = Math.min(1, it.ph / 8)
    return (
      <g opacity={op}>
        <Box x={it.x + it.jitter[1]} y={y + 3} z={BELT_TOP} w={34} d={26} h={1.5} />
        <Box x={it.x} y={y} z={BELT_TOP + 1.5} w={34} d={26} h={1.5} />
        {[6, 11, 16].map((v, i) => {
          const a = P(it.x + 6, y + v, BELT_TOP + 3)
          const b = P(it.x + (i === 2 ? 18 : 27), y + v, BELT_TOP + 3)
          return <line key={v} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#9b99b8" strokeWidth={1} />
        })}
      </g>
    )
  }
  return (
    <g>
      <Shadow x={it.x} y={BELT.y + 15} z={BELT_TOP} w={30} d={30} />
      <Box x={it.x} y={BELT.y + 15} z={BELT_TOP} w={30} d={30} h={20} faces={FACE_ACC} />
      <FaceText transform={onTop(it.x + 5, BELT.y + 22, BELT_TOP + 20)} size={6} fill="#fff">OK</FaceText>
    </g>
  )
}

function Machine({ frame, busy }) {
  const top = M.z + M.h
  const gear = frame * (busy ? 4 : 1.2)
  return (
    <g>
      <Shadow x={M.x + 8} y={M.y + 8} z={8} w={M.w} d={M.d} />
      <Box {...M} />
      {/* chimenea con nubes */}
      <Box x={-4} y={-52} z={top} w={26} d={26} h={34} />
      <Puffs frame={frame} />
      <TopRect x={-50} y={-50} z={top} w={30} d={30} fill="#fff" stroke={INK} strokeWidth={1.2} />
      <FaceText transform={onTop(-48, 2, top)} size={6}>NIMBO-01</FaceText>
      {/* frente: ventana con engranaje y leds */}
      <g transform={onLeft(M.x, M.y + M.d, top)} stroke={INK} strokeWidth={1.2}>
        <rect x={20} y={18} width={84} height={70} rx={6} fill="#fff" />
        <g transform={`translate(62 53) rotate(${gear})`}><Gear r={24} /></g>
        <g transform={`translate(88 30) rotate(${-gear * 1.6})`}><Gear r={10} teeth={8} /></g>
        <FaceText x={20} y={106} size={6.5}>PROCESANDO</FaceText>
        {[0, 1, 2, 3].map((i) => {
          const on = busy && Math.floor(frame / 5) % 4 === i
          return <rect key={i} x={20 + i * 14} y={114} width={9} height={5} rx={1} fill={on ? ACC : '#fff'} />
        })}
        {[8, 116].map((u) => [8, 134].map((v) => <circle key={`${u}${v}`} cx={u} cy={v} r={1.8} fill="#fff" />))}
      </g>
      {/* lateral: boca de salida de la cinta y rejilla */}
      <g transform={onRight(M.x + M.w, M.y + M.d, top)} stroke={INK} strokeWidth={1.2}>
        {[16, 23, 30, 37].map((v) => <line key={v} x1={26} x2={106} y1={v} y2={v} />)}
        <rect x={M.y + M.d - (BELT.y + BELT.d) - 6} y={top - BELT_TOP - 44} width={BELT.d + 12} height={46} rx={3} fill={INK} />
      </g>
    </g>
  )
}

function Gear({ r, teeth = 12 }) {
  const d = []
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2
    const rr = i % 2 === 0 ? r : r * 0.78
    const a2 = a + Math.PI / (teeth * 2)
    d.push(`${i === 0 ? 'M' : 'L'}${(Math.cos(a) * rr).toFixed(2)},${(Math.sin(a) * rr).toFixed(2)}`)
    d.push(`L${(Math.cos(a2) * rr).toFixed(2)},${(Math.sin(a2) * rr).toFixed(2)}`)
  }
  return (
    <g>
      <path d={`${d.join('')}Z`} fill="#f2f2f7" />
      <circle r={r * 0.32} fill="#fff" />
      <circle r={r * 0.1} fill={INK} />
    </g>
  )
}

function Puffs({ frame }) {
  const [cx, cy] = P(9, -39, M.z + M.h + 34)
  return [0, 1, 2, 3].map((i) => {
    const t = ((frame + i * 30) % 120) / 120
    const w = 18 + t * 34
    return (
      <Cloud key={i} w={w} x={cx - w / 2 + t * 26} y={cy - 12 - t * 120} fill="#fff" sw={1.2}
        opacity={t < 0.1 ? t * 10 : 1 - (t - 0.1) / 0.9} />
    )
  })
}

function Bin({ falling }) {
  const { x, y, z, w, d, h } = BIN
  const t = z + h
  return (
    <g>
      <Shadow x={x + 6} y={y + 6} z={8} w={w} d={d} />
      {/* interior visible por la boca */}
      <polygon points={pts([[x, y, t], [x + w, y, t], [x + w, y + d, t], [x, y + d, t]])} fill="#e9e9f1" stroke={INK} strokeWidth={1.3} />
      <polygon points={pts([[x, y, z + 10], [x, y, t], [x, y + d, t], [x, y + d, z + 10]])} fill="#dcdce6" stroke="none" />
      {[0, 1, 2].map((i) => (
        <Box key={i} x={x + 10 + i * 20} y={y + 50 - i * 14} z={z + 4} w={26} d={26} h={16} faces={FACE_ACC} />
      ))}
      {falling.map((it) => {
        const drop = it.fall * it.fall
        return (
          <g key={it.k} opacity={1 - Math.max(0, it.fall - 0.8) * 5}>
            <Box x={X1 + it.fall * 30} y={BELT.y + 15} z={BELT_TOP - drop * 40} w={30} d={30} h={20} faces={FACE_ACC} />
          </g>
        )
      })}
      {/* frentes de la caja por delante de lo que cae */}
      <polygon points={pts([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, t], [x, y + d, t]])} fill="#f2f2f7" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <polygon points={pts([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, t], [x + w, y, t]])} fill="#e3e3ec" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <FaceText transform={onLeft(x, y + d, t)} x={10} y={16} size={7}>PLANILLA</FaceText>
      <FaceText transform={onLeft(x, y + d, t)} x={10} y={28} size={6} fill="#5c5a7a">+ CRM</FaceText>
    </g>
  )
}

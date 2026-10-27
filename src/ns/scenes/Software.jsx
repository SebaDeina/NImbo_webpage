// Fig 4 · Software a medida: un gabinete con ranuras donde caen, uno por uno, los módulos que el negocio
// necesita (stock, pedidos, turnos, clientes). Cada módulo encastra y prende su luz; la pantallita confirma
// que el sistema quedó listo. Después los módulos salen y vuelve a empezar.
import { spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { ACC, Box, FaceText, FACE_ACC, INK, MONO, onLeft, onRight, P, ramp, Shadow, Stage, TopRect } from '../iso'

export const SOFTWARE = { durationInFrames: 240, fps: 30 }

const CH = { x: -150, y: -66, z: 10, w: 262, d: 108, h: 70 }
const TOP = CH.z + CH.h
const MODS = ['STOCK', 'PEDIDOS', 'TURNOS', 'CLIENTES']
const SLOT = { w: 42, d: 64, y: -50 }
const slotX = (i) => -136 + i * 62
const H = 62 // alto del módulo
const SINK = 38 // cuánto entra en el gabinete
const AT = (i) => 8 + i * 30
const READY = AT(3) + 34
const OUT = 198

export function Software() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const mods = MODS.map((name, i) => {
    const fall = spring({ frame: frame - AT(i), fps, config: { damping: 13, stiffness: 150, mass: 0.8 } })
    const sink = ramp(frame, AT(i) + 16, AT(i) + 24, 0, SINK, (t) => 1 - (1 - t) * (1 - t))
    // salen de a uno, hacia arriba y fuera de cuadro
    const eject = ramp(frame, OUT + (3 - i) * 6, OUT + 16 + (3 - i) * 6, 0, 1, (t) => t * t)
    const air = (1 - fall) * 300 + eject * 520
    const inside = Math.min(sink, SINK * (1 - Math.min(1, eject * 4)))
    return { name, i, air, vis: H - Math.max(0, inside), on: sink >= SINK - 1 && eject === 0, op: eject >= 1 ? 0 : 1 }
  })
  const count = mods.filter((m) => m.on).length
  const ready = frame >= READY && frame < OUT
  const bump = frame >= READY && frame < READY + 18 ? 1 - 0.035 * Math.sin(((frame - READY) / 18) * Math.PI * 2) * (1 - (frame - READY) / 18) : 1
  const [bx, by] = P(CH.x + CH.w / 2, CH.y + CH.d / 2, CH.z)

  return (
    <Stage dy={40} k={1.14}>
      <Box x={-190} y={-110} z={0} w={330} d={200} h={10} />
      <FaceText transform={onLeft(-180, 90, 8)} y={0} size={6.5}>A MEDIDA · MÓDULO POR MÓDULO</FaceText>
      <Shadow x={CH.x + 6} y={CH.y + 6} z={10} w={CH.w} d={CH.d} />

      <g transform={`translate(${bx} ${by}) scale(1 ${bump}) translate(${-bx} ${-by})`}>
        <Box {...CH} />
        {MODS.map((_, i) => (
          <TopRect key={i} x={slotX(i) - 2} y={SLOT.y - 2} z={TOP} w={SLOT.w + 4} d={SLOT.d + 4} fill={INK} stroke={INK} strokeWidth={1} />
        ))}
        {/* frente: una luz por ranura */}
        <g transform={onLeft(CH.x, CH.y + CH.d, TOP)} stroke={INK} strokeWidth={1.2}>
          <FaceText x={14} y={16} size={6.5}>NIMBO · SISTEMA</FaceText>
          {mods.map((m) => (
            <g key={m.i}>
              <rect x={slotX(m.i) - CH.x + 6} y={34} width={30} height={8} rx={2} fill={m.on ? ACC : '#fff'} />
              <FaceText x={slotX(m.i) - CH.x + 6} y={56} size={5.5} fill="#5c5a7a">{`0${m.i + 1}`}</FaceText>
            </g>
          ))}
          {[8, 254].map((u) => [8, 62].map((v) => <circle key={`${u}${v}`} cx={u} cy={v} r={1.8} fill="#fff" />))}
        </g>
        <Display count={count} ready={ready} frame={frame} />
        {mods.map((m) => <Module key={m.i} m={m} />)}
      </g>

    </Stage>
  )
}

function Module({ m }) {
  if (m.op <= 0.01) return null
  const x = slotX(m.i)
  const z = TOP + m.air
  const top = z + m.vis
  const acc = m.i === 1
  return (
    <g opacity={m.op}>
      {m.air > 2 && (
        <TopRect x={x + m.air * 0.06} y={SLOT.y + m.air * 0.06} z={TOP} w={SLOT.w} d={SLOT.d} fill={INK} stroke="none"
          opacity={Math.max(0, 0.1 - m.air / 3000)} />
      )}
      <Box x={x} y={SLOT.y} z={z} w={SLOT.w} d={SLOT.d} h={m.vis} faces={acc ? FACE_ACC : undefined} />
      {/* agarre en la tapa */}
      <TopRect x={x + 12} y={SLOT.y + 22} z={top} w={18} d={20} fill={acc ? '#6665ff' : '#f2f2f7'} stroke={INK} strokeWidth={1} />
      <FaceText transform={onLeft(x, SLOT.y + SLOT.d, top)} x={5} y={11} size={6} fill={acc ? '#fff' : INK}>{m.name}</FaceText>
    </g>
  )
}

// contador en la cara derecha del gabinete
function Display({ count, ready, frame }) {
  const pop = ready && frame < READY + 12 ? 1 + 0.1 * Math.sin(((frame - READY) / 12) * Math.PI) : 1
  return (
    <g transform={onRight(CH.x + CH.w, CH.y + CH.d, TOP)} stroke={INK} strokeWidth={1.2}>
      <rect x={12} y={12} width={84} height={34} rx={3} fill={INK} />
      <g transform={`translate(54 29) scale(${pop}) translate(-54 -29)`} stroke="none">
        <text x={20} y={25} fontFamily={MONO} fontSize={6} fill="#b9b8ff" letterSpacing="0.08em">MÓDULOS</text>
        <text x={20} y={39} fontFamily={MONO} fontSize={10} fontWeight={500} fill={ready ? '#7fe0a8' : '#fff'} letterSpacing="0.06em">
          {ready ? 'LISTO ✓' : `${count} / 4`}
        </text>
      </g>
      {[54, 60].map((v) => <line key={v} x1={12} x2={96} y1={v} y2={v} />)}
    </g>
  )
}

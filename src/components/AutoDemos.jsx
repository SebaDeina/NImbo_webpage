import { useEffect, useRef, useState } from 'react'

/*
  Demos animadas de las tarjetas de servicios de /automatizaciones.
  Cada una recorre sus pasos en loop mientras está en pantalla (se pausa fuera
  de pantalla) y, con "reducir movimiento", queda quieta en el último paso.
*/

function useSteps(durations) {
  const ref = useRef(null)
  const [state, setState] = useState({ step: 0, loop: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setState({ step: durations.length - 1, loop: 0 })
      return
    }
    let timer = null
    let cur = 0
    let loop = 0
    const run = () => {
      timer = setTimeout(() => {
        cur = (cur + 1) % durations.length
        if (cur === 0) loop++
        setState({ step: cur, loop })
        run()
      }, durations[cur])
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!timer) run()
      } else {
        clearTimeout(timer)
        timer = null
      }
    })
    io.observe(el)
    return () => {
      io.disconnect()
      clearTimeout(timer)
    }
    // las duraciones son constantes por demo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [ref, state.step, state.loop]
}

const on = (cond) => (cond ? ' is-on' : '')

/* Agente 24/7: llega la consulta, escribe, responde y agenda */
const CANALES = ['WhatsApp', 'Web', 'Instagram']
export function AgentDemo() {
  const [ref, s, loop] = useSteps([700, 900, 1100, 1300, 1000, 2600])
  const canal = loop % CANALES.length
  return (
    <div className="nd-mini dm-agent" ref={ref}>
      <div className="dm-chan nd-mono">
        {CANALES.map((c, i) => (
          <span key={c} className={i === canal ? 'is-on' : ''}>
            {c}
          </span>
        ))}
      </div>
      <div className="dm-thread">
        <div className={`nd-msg in sm dm-pop${on(s >= 1)}`}>¿Tienen turno el jueves?</div>
        <div className={`dm-typing${on(s === 2)}`} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className={`nd-msg out sm dm-pop${on(s >= 3)}`}>Sí, a las 10 o a las 16. ¿Cuál te queda mejor?</div>
        <div className={`nd-msg in sm dm-pop${on(s >= 4)}`}>A las 10</div>
      </div>
      <div className={`dm-done nd-mono${on(s >= 5)}`}>✓ Turno agendado · jueves 10 h</div>
    </div>
  )
}

/* OpenClaw: organigrama. Vos le pedís algo al coordinador y él reparte el trabajo entre los agentes */
const AGENTES = [
  ['Atención', 'responde', 52],
  ['Pedidos', 'carga el pedido', 149],
  ['Equipo', 'asigna tareas', 251],
  ['Mails', 'confirma', 348],
]
export function OrchestraDemo() {
  const [ref, s] = useSteps([1400, 1400, 1400, 1400, 2600])
  const fin = s >= AGENTES.length
  return (
    <div className="dm-org" ref={ref}>
      <svg viewBox="0 0 400 300" role="img" aria-label="Organigrama: vos le pedís al coordinador de OpenClaw y él reparte el trabajo entre los agentes de atención, pedidos, equipo y mails">
        {/* vos */}
        <g className={`dm-org-you${fin ? ' is-done' : ''}`}>
          <rect x="70" y="12" width="260" height="30" rx="15" />
          <text x="200" y="32" textAnchor="middle">
            {fin ? 'Vos: ✓ pedido #1043 resuelto' : 'Vos: “Encargate del pedido #1043”'}
          </text>
        </g>
        <path d="M200 42V64" className="dm-org-wire" />
        {/* coordinador */}
        <rect x="105" y="64" width="190" height="48" rx="12" className="dm-org-boss" />
        <text x="200" y="85" textAnchor="middle" className="dm-org-boss-t">
          Coordinador
        </text>
        <text x="200" y="102" textAnchor="middle" className="dm-org-boss-k">
          OpenClaw
        </text>
        {/* ramas */}
        <path d="M200 112V140M52 140H348M52 140V168M149 140V168M251 140V168M348 140V168" className="dm-org-wire" />
        {/* el trabajo bajando al agente activo */}
        {!fin && (
          <circle key={s} r="5" className="dm-packet">
            <animateMotion dur=".7s" fill="freeze" path={`M200 112V140H${AGENTES[s][2]}V168`} />
          </circle>
        )}
        {fin && (
          <circle key="up" r="5" className="dm-packet">
            <animateMotion dur=".8s" fill="freeze" path="M200 112V42" />
          </circle>
        )}
        {AGENTES.map(([n, what, x], i) => {
          const st = i < s ? 'done' : i === s ? 'work' : 'wait'
          return (
            <g key={n} className={`dm-org-ag is-${st}`}>
              <rect x={x - 44} y="168" width="88" height="86" rx="12" />
              <text x={x} y="194" textAnchor="middle" className="dm-org-n">
                {n}
              </text>
              <text x={x} y="212" textAnchor="middle" className="dm-org-w">
                {what}
              </text>
              <text x={x} y="240" textAnchor="middle" className="dm-org-st">
                {st === 'done' ? '✓ listo' : st === 'work' ? '● trabajando' : 'en espera'}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* Integraciones: los datos viajan entre tus sistemas pasando por n8n */
const HUB = [200, 150]
const NODOS = [
  ['WhatsApp', 80, 58, 'in'],
  ['Gmail', 320, 58, 'in'],
  ['CRM', 200, 30, 'out'],
  ['Google Sheets', 92, 246, 'out'],
  ['Factura electrónica', 300, 246, 'out'],
]
export function IntegrationsDemo() {
  return (
    <div className="dm-int">
      <svg viewBox="0 0 400 300" role="img" aria-label="WhatsApp y Gmail envían datos a n8n, que los reparte a CRM, Google Sheets y factura electrónica">
        {NODOS.map(([n, x, y, dir], i) => {
          const d = dir === 'in' ? `M${x} ${y}L${HUB[0]} ${HUB[1]}` : `M${HUB[0]} ${HUB[1]}L${x} ${y}`
          return (
            <g key={n}>
              <path d={d} className="dm-wire" />
              <circle r="5" className="dm-packet">
                <animateMotion dur="2.4s" begin={`${dir === 'in' ? i * 0.6 : 1.2 + i * 0.35}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          )
        })}
        <circle cx={HUB[0]} cy={HUB[1]} r="44" className="dm-ring" />
        <circle cx={HUB[0]} cy={HUB[1]} r="32" className="dm-hub" />
        <text x={HUB[0]} y={HUB[1] + 6} textAnchor="middle" className="dm-hub-t">
          n8n
        </text>
        {NODOS.map(([n, x, y]) => {
          const w = n.length * 7.4 + 26
          return (
            <g key={n} className="dm-node">
              <rect x={x - w / 2} y={y - 15} width={w} height="30" rx="15" />
              <text x={x} y={y + 5} textAnchor="middle">
                {n}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* Diagnóstico: se llenan las horas que te devuelve cada automatización */
const PRIORIDADES = [
  ['Atención WhatsApp', 12],
  ['Carga de pedidos', 6],
  ['Facturación', 4],
]
export function DiagnosisDemo() {
  const [ref, s] = useSteps([700, 900, 900, 900, 2600])
  return (
    <div className="nd-panel dm-diag" ref={ref}>
      <span className="nd-mono nd-panel-k">TU DIAGNÓSTICO · EJEMPLO</span>
      {PRIORIDADES.map(([t, h], i) => (
        <div key={t} className="dm-prio">
          <div>
            <span>
              {i + 1}. {t}
            </span>
            <b className={on(s > i)}>−{h} h/sem</b>
          </div>
          <span className="dm-bar">
            <i style={{ width: s > i ? `${(h / 12) * 100}%` : 0 }} />
          </span>
        </div>
      ))}
      <div className={`dm-done nd-mono${on(s >= 4)}`}>✓ Plan y presupuesto en pesos</div>
    </div>
  )
}

/* Capacitación: el equipo avanza en el taller */
const CLASES = ['Qué es un agente y qué no', 'Pedirle bien las cosas a la IA', 'Usarla en tu trabajo real']
export function TrainingDemo() {
  const [ref, s] = useSteps([800, 1000, 1000, 1000, 2600])
  return (
    <div className="nd-panel dm-train" ref={ref}>
      <span className="nd-mono nd-panel-k">TALLER · MARTES 10 H</span>
      <b className="nd-panel-t">IA para el día a día</b>
      <ul>
        {CLASES.map((c, i) => (
          <li key={c} className={on(s > i)}>
            <span className="dm-check" aria-hidden="true">
              ✓
            </span>
            {c}
          </li>
        ))}
      </ul>
      <span className="dm-bar">
        <i style={{ width: `${(Math.min(s, 3) / 3) * 100}%` }} />
      </span>
      <div className={`dm-done nd-mono${on(s >= 4)}`}>✓ Equipo usando IA</div>
    </div>
  )
}

/*
  Demo del hero: la charla de WhatsApp y, al costado, lo que el agente hace en los
  sistemas mientras tanto (pedido en el CRM, stock en Sheets, tarea al depósito y
  el pago que entra). Datos de ejemplo de una ferretería ficticia.
*/
//  paso: 0 vacío · 1 consulta · 2 escribe · 3 respuesta · 4 "dale" · 5 escribe ·
//        6 pedido en CRM + stock · 7 confirmación + tarea · 8 pago recibido · 9 pausa
function Arrow({ n, active, flow, children }) {
  return (
    <span className={`hd-arrow${on(active)}${flow ? ' is-flow' : ''}`}>
      <span className="hd-arrow-t">
        <b>{n}</b>
        {children}
      </span>
    </span>
  )
}

const HERO_STEPS = [250, 850, 650, 1150, 650, 450, 1000, 1050, 1100, 2300]
export function HeroDemo({ avatar }) {
  const [ref, s] = useSteps(HERO_STEPS)
  const typing = s === 2 || s === 5
  const pagado = s >= 8
  return (
    <div className="hd" ref={ref}>
      <div className="nd-chat hd-chat">
        <div className="nd-chat-head">
          <div className="nd-avatar">{avatar}</div>
          <div className="nd-chat-who">
            <b>Ferretería Del Sur</b>
            <span className={typing ? 'hd-typing' : ''}>{typing ? 'Agente · escribiendo…' : 'Agente · en línea'}</span>
          </div>
          <span className="nd-mono nd-chat-time">03:12</span>
        </div>
        <div className="nd-msgs hd-msgs">
          <div className={`nd-msg in dm-pop${on(s >= 1)}`}>Hola, ¿tienen taladro percutor Bosch? ¿Envían a Quilmes?</div>
          <div className={`nd-msg out dm-pop${on(s >= 3)}`}>
            ¡Hola! Sí, el GSB 13 RE a $189.900. Enviamos a Quilmes mañana de 10 a 14 h. ¿Te lo reservo?
          </div>
          <div className={`nd-msg in dm-pop${on(s >= 4)}`}>Dale, reservalo</div>
          <div className={`nd-msg out dm-pop${on(s >= 7)}`}>Listo. Te mandé el link de pago y avisé al depósito.</div>
          <div className={`hd-event nd-mono dm-pop${on(pagado)}`}>Pago recibido · $189.900 ✓</div>
        </div>
      </div>

      {/* cada sistema aparece con su flecha rotulada recién cuando el agente lo usa */}
      <div className="hd-side">
        <div className={`hd-step${on(s >= 6)}`}>
          <Arrow n="1" active={s >= 6} flow={s === 6}>
            Carga el pedido
          </Arrow>
          <div className={`hd-card${s === 6 || s === 8 ? ' is-hot' : ''}`}>
            <div className="hd-card-k nd-mono">
              <span>CRM · Pedidos</span>
              <span className={`hd-live${on(s >= 6 && s <= 8)}`}>actualizando</span>
            </div>
            <div className={`hd-row hd-new${on(s >= 6)}`}>
              <span className="nd-mono">#1044</span>
              <span className="hd-what">
                Lucía M. · Taladro GSB 13 RE
                <small>WhatsApp · envío a Quilmes</small>
              </span>
              <span className={`hd-pill${pagado ? ' is-paid' : ''}`}>{pagado ? 'Pagado' : 'Reservado'}</span>
            </div>
            <div className="hd-row is-old">
              <span className="nd-mono">#1043</span>
              <span className="hd-what">Marta G. · Amoladora</span>
              <span className="hd-pill is-done">Entregado</span>
            </div>
          </div>
        </div>

        <div className={`hd-step hd-later${on(s >= 6)}`}>
          <Arrow n="2" active={s >= 6} flow={s === 6}>
            Descuenta el stock
          </Arrow>
          <div className={`hd-card hd-line${s === 6 ? ' is-hot' : ''}`}>
            <span className="hd-card-k nd-mono">Sheets · Stock</span>
            <span className="hd-line-in">
              <span className="hd-what">Taladro GSB 13 RE</span>
              <span className="hd-stock">
                <b key={s >= 6 ? 'a' : 'b'} className={s >= 6 ? 'hd-tick' : ''}>
                  {s >= 6 ? 3 : 4}
                </b>{' '}
                unidades
              </span>
            </span>
          </div>
        </div>

        <div className={`hd-step${on(s >= 7)}`}>
          <Arrow n="3" active={s >= 7} flow={s === 7}>
            Avisa al depósito
          </Arrow>
          <div className={`hd-card hd-line${s === 7 ? ' is-hot' : ''}`}>
            <span className="hd-card-k nd-mono">Tarea · Depósito</span>
            <span className={`hd-task dm-pop${on(s >= 7)}`}>
              <i aria-hidden="true">□</i> Preparar envío a Quilmes
              <small>mañana · 10 a 14 h</small>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

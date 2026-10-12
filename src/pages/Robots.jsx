import { useEffect, useRef, useState } from 'react'
import { CloudBand, Stars, LogoMedallion, useRevealAll } from '../components/g/Art'
import { RoutePlanner } from '../components/RobotsDrone'
import RobotsDashboard from '../components/RobotsDashboard'
import { whatsappUrl } from '../config/whatsapp'
import { useSeo } from '../hooks/useSeo'
import CloudMark from '../components/CloudMark'
import '../styles/robots.css'

const WA_MSG = '¡Hola Seba! Vi el informe de computer vision y automatización y quiero charlar.'

const CLOUD_ROWS = [
  { base: 0.5, rmin: 0.12, rmax: 0.24, seed: 13, fade: 'dark' },
  { base: 0.98, rmin: 0.16, rmax: 0.32, seed: 47, fade: 'light' },
]

/* Secciones del informe (también arman el índice lateral de la vista de PC). */
const SECTIONS = [
  ['funciona', 'Qué ya funciona'],
  ['como', 'Cómo funciona'],
  ['aire', 'Desde el aire'],
  ['auto', 'Automatización'],
  ['precision', 'Qué tan preciso es'],
  ['falta', 'Qué falta'],
]
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI']

const BARS = [
  ['Tracker por defecto', '960 px · 8 cuadros', 88, 'bad'],
  ['Tracker ajustado', '960 px · 8 cuadros', 50],
  ['Tracker ajustado', '960 px · 30 cuadros', 46],
  ['Tracker ajustado', '1280 px · 30 cuadros', 62],
  ['Elegida', '1280 px · 60 cuadros', 57, 'hi'],
]

const LIMITS = [
  ['Vista oblicua o a nivel del suelo', 'Funciona'],
  ['Hacienda densa, animales tapados', 'Se pierden animales del fondo'],
  ['Vista oblicua de dron (unos 30 a 45°)', 'Funciona; el grupo denso del fondo se pierde en parte'],
  ['Vista cenital de dron (a 90°)', 'No probado: se espera que rinda peor'],
  ['Ubicar a los animales en un mapa del campo', 'No existe: falta la telemetría (GPS) del dron'],
  ['Razas locales, contraluz, polvo', 'Sin evaluar'],
  ['Detectar animales caídos o aislados', 'No existe todavía'],
  ['Envío real por WhatsApp', 'Maqueta: falta conectarlo'],
]

const NEXT = [
  ['Juntar imágenes', 'Vuelos de dron y cámaras fijas en uno o más campos, a distintas horas y con distinta hacienda.'],
  ['Etiquetar y entrenar', 'Etiquetado asistido por el modelo actual, corrección a mano y ajuste fino del detector, empezando por vista cenital.'],
  ['Medir contra la realidad', 'Comparar el conteo del modelo con un conteo manual del mismo lote y publicar el porcentaje de error.'],
  ['Piloto con un productor', 'Reportes por WhatsApp al dueño y alertas simples, como “faltan animales respecto de ayer”.'],
]

const FIELD_FLOW = [
  { t: 'Cámara o dron', d: 'Graba la recorrida o toma fotos del lote.', tag: ['solo', 'Solo con videos'] },
  { t: 'Detección y conteo', d: 'YOLO y un tracker cuentan cada animal una sola vez.', tag: ['ok', 'Funciona'] },
  { t: 'Mensaje al dueño', d: 'El número y una foto llegan por WhatsApp.', tag: ['maq', 'Maqueta'] },
  { t: 'Registro y tablero', d: 'El conteo y sus métricas quedan guardados y se ven en un tablero (Fig. 10).', tag: ['maq', 'Maqueta'] },
  { t: 'Alerta', d: 'Avisa si el conteo baja respecto de ayer.', tag: ['prop', 'Propuesto'] },
]

const MISSION_FLOW = [
  { t: 'La orden', d: '“Contá los animales del potrero norte”, por WhatsApp o desde un panel.', tag: ['prop', 'Propuesto'] },
  { t: 'Plan de vuelo', d: 'La IA lo traduce a zona, altura y pasadas. El cálculo de cobertura ya funciona (Fig. 7).', tag: ['ok', 'Cálculo funciona'] },
  { t: 'Vuelo autónomo', d: 'El dron ejecuta la lista de puntos de ruta y toma las fotos.', tag: ['prop', 'Falta el dron'] },
  { t: 'Reconocimiento', d: 'El modelo cuenta los animales desde el aire. Probado en vista oblicua (Fig. 6).', tag: ['ok', 'Probado en video'] },
  { t: 'Reporte', d: 'El número, una foto y el mapa vuelven por WhatsApp.', tag: ['maq', 'Maqueta'] },
]

const OBRA_FLOW = [
  { t: 'Recorrida', d: 'Un perro robot o un dron camina la obra con su cámara.', tag: ['prop', 'Idea'] },
  { t: 'Reconstrucción 3D', d: 'LingBot-Map arma la nube de puntos y la trayectoria de la cámara.', tag: ['prop', 'No probado'] },
  { t: 'Detección', d: 'El modelo marca personas y elementos de interés en cada cuadro.', tag: ['ok', 'Personas: funciona'] },
  { t: 'Comparación', d: 'Se compara el mapa con el de la visita anterior para medir el avance.', tag: ['prop', 'Propuesto'] },
  { t: 'Reporte', d: 'El avance por sector llega por mail o por WhatsApp.', tag: ['maq', 'Maqueta'] },
]

const REC360_FLOW = [
  { t: 'Video del recorrido', d: 'Se camina el lugar grabando con el celular o con la cámara.', tag: ['prop', 'Idea'] },
  { t: 'Reconstrucción 3D', d: 'LingBot-Map devuelve la trayectoria de la cámara por el lugar.', tag: ['prop', 'No probado'] },
  { t: 'Flechas y plano automáticos', d: 'Cada ambiente queda ubicado y orientado, sin acomodar flechas a mano.', tag: ['prop', 'Propuesto'] },
]

const FLOWS = [
  {
    t: 'Patrullaje de seguridad',
    con: 'Perro robot o dron',
    base: 'Detección de personas en producción y avisos por WhatsApp.',
    falta: 'Probarlo sobre una plataforma móvil y en exteriores.',
    steps: ['Ronda programada', 'Detecta personas y vehículos', 'Foto y alerta por WhatsApp', 'Registro de la ronda'],
  },
  {
    t: 'Inspección de obra',
    con: 'Dron o perro robot',
    base: 'Visión por computadora y reportes automáticos.',
    falta: 'La comparación entre visitas, con una reconstrucción 3D (figura siguiente).',
    steps: ['Recorrida por zonas', 'Fotos ordenadas por sector', 'Compara con la visita anterior', 'Reporte por mail'],
  },
  {
    t: 'Inventario en depósito',
    con: 'Dron o robot con ruedas',
    base: 'Conteo con visión por computadora y tableros con alertas.',
    falta: 'Entrenar el detector para cajas y pallets.',
    steps: ['Recorrida por góndolas', 'Cuenta cajas y pallets', 'Tablero de stock', 'Alerta de faltantes'],
  },
  {
    t: 'Pedirle tareas por WhatsApp',
    con: 'Cualquier plataforma',
    base: 'Un asistente de WhatsApp con IA.',
    falta: 'Conectarlo al robot.',
    steps: ['“Recorré el sector B”', 'El asistente entiende la orden', 'El robot hace la tarea', 'Devuelve foto y resultado'],
  },
]

/* Esta página es un informe para compartir por link: no se indexa. */
function useNoIndex() {
  useEffect(() => {
    let m = document.head.querySelector('meta[name="robots"]')
    const prev = m ? m.content : null
    if (!m) {
      m = document.createElement('meta')
      m.name = 'robots'
      document.head.appendChild(m)
    }
    m.content = 'noindex, nofollow'
    return () => {
      if (prev === null) m.remove()
      else m.content = prev
    }
  }, [])
}

/* true cuando la pantalla es de PC (el encabezado lleva un video a la derecha). */
function useWide(px = 1000) {
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(min-width:${px}px)`)
    const on = () => setWide(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [px])
  return wide
}

/* Video real que se reproduce solo mientras está en pantalla. */
function AutoVideo({ src, poster }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.45 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return <video ref={ref} src={src} poster={poster} controls muted loop playsInline preload="metadata" />
}

/* Panel de figura: título entre filetes, contenido y epígrafe. */
function Fig({ n, title, children, cap }) {
  return (
    <figure className="rb-fig rv">
      <div className="rb-fig-t">
        <span>{n}</span> {title}
      </div>
      {children}
      {cap && <figcaption>{cap}</figcaption>}
    </figure>
  )
}

function Plates({ items }) {
  return (
    <div className="rb-plates">
      {items.map(([n, a, b]) => (
        <div className="rb-plate" key={a}>
          <b>{n}</b>
          <span>{a}</span>
          <i>{b}</i>
        </div>
      ))}
    </div>
  )
}

/* Maqueta realista de WhatsApp: el mensaje que recibiría el dueño del campo. */
const Ticks = () => (
  <svg className="wa-ticks" viewBox="0 0 16 11" width="16" height="11" aria-hidden="true">
    <path d="M11.07.65 5.47 6.9 3.2 4.64l-.9.9 3.2 3.2L12.03 1.6zM15.1.65 9.5 6.9 8.9 6.3l-.9.9 1.5 1.5L16.06 1.6z" fill="#53bdeb" />
  </svg>
)

function PhoneMock() {
  return (
    <div className="wa-phone" role="img" aria-label="Mensaje de WhatsApp con la foto del rebaño: 57 vacas contadas, recorrida de la tarde">
      <div className="wa-notch" />
      <div className="wa-screen">
        <div className="wa-status">
          <span>18:43</span>
          <span className="wa-sys" aria-hidden="true">
            <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx=".6" /><rect x="4.5" y="5" width="3" height="6" rx=".6" /><rect x="9" y="2.5" width="3" height="8.5" rx=".6" /><rect x="13.5" y="0" width="3" height="11" rx=".6" /></svg>
            <svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 2.2c2 0 3.9.8 5.3 2.1l1-1.1A9.6 9.6 0 0 0 7.5.7 9.6 9.6 0 0 0 1.2 3.2l1 1.1a7.6 7.6 0 0 1 5.3-2.1zm0 3.2c1.2 0 2.3.5 3.2 1.2l1-1.1a6.2 6.2 0 0 0-8.4 0l1 1.1c.9-.7 2-1.2 3.2-1.2zm0 3.1c-.6 0-1.1.2-1.5.6L7.5 11l1.5-1.9c-.4-.4-.9-.6-1.5-.6z" /></svg>
            <svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity=".5" /><rect x="2" y="2" width="16" height="8" rx="1.6" /><rect x="22.5" y="4" width="1.8" height="4" rx=".9" opacity=".5" /></svg>
          </span>
        </div>
        <div className="wa-top">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z" fill="currentColor" /></svg>
          <span className="wa-av" aria-hidden="true">🐄</span>
          <span className="wa-name">
            <b>Asistente de campo</b>
            <small>en línea</small>
          </span>
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" fill="currentColor" /></svg>
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="currentColor" /></svg>
        </div>
        <div className="wa-chat">
          <div className="wa-day">HOY</div>
          <div className="wa-msg in photo">
            <img src="/robots/chat-frame.jpg" alt="" loading="lazy" />
            <p>
              <b>🐄 57 vacas contadas</b>
              <br />
              Recorrida de la tarde
            </p>
            <span className="wa-time">18:42</span>
          </div>
          <div className="wa-msg out">
            Gracias! Revisá si falta alguna 👍
            <span className="wa-time">
              18:43 <Ticks />
            </span>
          </div>
        </div>
        <div className="wa-input" aria-hidden="true">
          <span className="wa-pill">
            <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-3.5-9a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6zm7 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6zM12 17.5a5 5 0 0 0 4.5-3h-9a5 5 0 0 0 4.5 3z" fill="currentColor" /></svg>
            <em>Mensaje</em>
          </span>
          <span className="wa-mic">
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11z" fill="#fff" /></svg>
          </span>
        </div>
        <div className="wa-home" />
      </div>
    </div>
  )
}

/* Flujo de pasos con conectores; cada paso puede llevar una etiqueta de estado. */
function Flow({ steps }) {
  return (
    <ol className="rb-flow">
      {steps.map((s, i) => (
        <li className="rb-node" key={s.t}>
          <span className="rb-n">{i + 1}</span>
          <b>{s.t}</b>
          <span className="rb-d">{s.d}</span>
          {s.tag && <em className={`rb-tag t-${s.tag[0]}`}>{s.tag[1]}</em>}
        </li>
      ))}
    </ol>
  )
}

/* Ficha de un proyecto externo: se muestra tal como lo declara su README, sin atribuirle resultados nuestros. */
const Spec = ({ rows }) => (
  <dl className="rb-spec">
    {rows.map(([k, v]) => (
      <div key={k}>
        <dt>{k}</dt>
        <dd>{v}</dd>
      </div>
    ))}
  </dl>
)

const Sect = ({ id, children }) => (
  <div className="rb-sect rv" id={id}>
    <span>{children}</span>
  </div>
)

/* Índice lateral de la vista de PC: marca la sección que se está leyendo. */
function SectionIndex() {
  const [cur, setCur] = useState(SECTIONS[0][0])
  useEffect(() => {
    const els = SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean)
    if (!els.length || !('IntersectionObserver' in window)) return
    const onScroll = () => {
      // la sección actual es la última cuyo título ya pasó el tercio superior de la pantalla
      let active = els[0].id
      for (const el of els) if (el.getBoundingClientRect().top < window.innerHeight * 0.4) active = el.id
      setCur(active)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return (
    <nav className="ch-index show rb-index" aria-label="Secciones del informe">
      {SECTIONS.map(([id, label], i) => (
        <a key={id} href={`#${id}`} className={cur === id ? 'on' : ''} title={label} aria-label={label}>
          {ROMAN[i]}
          <span>{label}</span>
        </a>
      ))}
    </nav>
  )
}

export default function Robots() {
  useSeo({
    title: 'Robots · Computer vision y automatización — Nimbo',
    description:
      'Informe técnico: computer vision para contar hacienda desde una cámara o un dron, programación de recorridos y las automatizaciones que lo rodean (WhatsApp, registro, alertas). Lo que ya funciona, con números reales, y lo que falta.',
    path: '/robots',
  })
  useNoIndex()
  useRevealAll('.rv,.viz')
  const wide = useWide(1000)

  // numeración automática de figuras, en el orden en que aparecen
  let n = 0
  const fig = () => `Fig. ${++n}`

  return (
    <main className="g-main robots rb-report">
      <header className="rb-head">
        <Stars count={45} seed={13} />
        <div className="rb-col rb-head-in">
          <a className="rb-brand" href="https://www.nimbodata.com" aria-label="Nimbo">
            <span className="rb-cloud">
              <CloudMark />
            </span>
            nimbo
          </a>
          <div className="rb-head-grid">
            <div className="rb-head-text">
              <p className="rb-by">Por Sebastian Deina · Octubre 2026</p>
              <h1>
                Computer vision <em>y automatización</em>
              </h1>
              <p className="rb-sub">Contar hacienda desde una cámara o un dron, programar el recorrido, avisarle al dueño por WhatsApp y automatizar lo que sigue.</p>
              <p className="rb-intro">
                Una cámara o un dron mira el campo, un modelo cuenta los animales y el dueño recibe el número por WhatsApp. Este informe
                muestra lo que ya funciona hoy, con números reales, y dice con la misma claridad lo que todavía no.
              </p>
            </div>
            {wide && (
              <figure className="rb-hero-card" aria-label="Detección sobre un video real">
                <div className="rb-hero-frame">
                  <video src="/robots/stage-detect.mp4" poster="/robots/vacas.jpg" autoPlay muted loop playsInline preload="auto" />
                </div>
                <figcaption>Detección sobre un video real</figcaption>
              </figure>
            )}
          </div>
        </div>
        <CloudBand className="clouds band" rows={CLOUD_ROWS} layers={[]} line={3.5} />
      </header>

      <SectionIndex />

      <article className="rb-body">
        <div className="rb-col">
          <Sect id="funciona">Qué ya funciona</Sect>
          <h2 className="rv">
            Un modelo sin entrenar <em>ya cuenta vacas y ovejas</em>
          </h2>
          <p className="rv">
            Usamos un detector YOLO preentrenado y un tracker (ByteTrack) que le da un ID a cada animal para no contarlo dos veces. Corre en
            una laptop y procesa un video corto en unos 20 segundos.
          </p>

          <div className="rb-pair">
            <Fig
              n={fig()}
              title="Tropa arreada · vista oblicua"
              cap="Cada caja lleva el ID del animal. El contador suma los IDs que se sostuvieron al menos 60 cuadros."
            >
              <div className="rb-video">
                <AutoVideo src="/robots/vacas.mp4" poster="/robots/vacas.jpg" />
              </div>
              <Plates
                items={[
                  ['57', 'vacas por ID único', 'rango 46–62'],
                  ['40', 'visibles a la vez', 'como máximo'],
                  ['16 s', 'de video', '768 × 432'],
                ]}
              />
            </Fig>

            <Fig
              n={fig()}
              title="Ovejas pastando · cámara fija"
              cap="Una cerca tapa parte del rebaño y a veces el tracker le cambia el ID a una oveja, así que el número puede quedar algo por encima del real."
            >
              <div className="rb-video">
                <AutoVideo src="/robots/ovejas.mp4" poster="/robots/ovejas.jpg" />
              </div>
              <Plates
                items={[
                  ['32', 'ovejas por ID único', 'rango 32–37'],
                  ['29', 'visibles a la vez', 'como máximo'],
                  ['8 s', 'de video', '1280 × 720'],
                ]}
              />
            </Fig>
          </div>

          <aside className="rb-note rv">
            <b>En producción hoy.</b> El mismo pipeline (cámara, detección, tracking, conteo, base de datos) ya corre sobre una cámara real
            en un servidor, contando personas, entradas y salidas, mapas de calor y permanencia por zona. Es lo que se adapta al campo.
          </aside>

          <Sect id="como">Cómo funciona</Sect>
          <h2 className="rv">
            De la imagen <em>al mensaje</em>
          </h2>
          <p className="rv">Son tres pasos, y esto es el mismo video real procesado de tres maneras, no una animación.</p>

          <div className="rb-pair">
            <Fig n={fig()} title="1 · Detecta" cap="El detector reconoce cada vaca en el cuadro, aunque estén juntas, y marca dónde está y con qué confianza.">
              <div className="rb-video">
                <AutoVideo src="/robots/stage-detect.mp4" poster="/robots/vacas.jpg" />
              </div>
            </Fig>

            <Fig n={fig()} title="2 · Sigue" cap="El tracker le da un ID a cada animal y dibuja su recorrido, para no contarlo dos veces mientras camina.">
              <div className="rb-video">
                <AutoVideo src="/robots/stage-track.mp4" poster="/robots/vacas.jpg" />
              </div>
            </Fig>
          </div>

          <Fig
            n={fig()}
            title="3 · Cuenta y avisa"
            cap="Maqueta del mensaje. El envío real todavía no está conectado a este modelo, aunque ya tenemos un asistente de WhatsApp funcionando en otros proyectos."
          >
            <div className="rb-split">
              <div className="rb-split-txt">
                <p>Lo que le llega al dueño del campo, sin que nadie tenga que mirar el video:</p>
                <ul className="rb-list">
                  <li>La foto de la recorrida con los animales marcados.</li>
                  <li>El número de animales únicos.</li>
                  <li>La hora de la recorrida.</li>
                </ul>
              </div>
              <PhoneMock />
            </div>
          </Fig>

          <Sect id="aire">Desde el aire</Sect>
          <h2 className="rv">
            Lo mismo, <em>desde un dron</em>
          </h2>
          <p className="rv">
            Un dron cubre un campo entero en una sola salida. Probamos el mismo modelo, sin entrenar, sobre un video de dron en un campo
            argentino y ya funciona en vista oblicua. Lo difícil viene después: los animales lejanos y apiñados, y la vista cenital a 90°,
            donde una vaca es un óvalo chico.
          </p>

          <Fig
            n={fig()}
            title="Reconocimiento desde un dron · vista oblicua"
            cap="Video de dron sobre un campo argentino, procesado sin entrenar. Marca bien a las vacas cercanas y se pierde en parte el grupo denso del fondo. El contador sube de a poco porque cada ID tiene que sostenerse 60 cuadros. No hay conteo manual de referencia."
          >
            <div className="rb-video">
              <AutoVideo src="/robots/dron.mp4" poster="/robots/dron.jpg" />
            </div>
            <Plates
              items={[
                ['87', 'vacas por ID único', '63 si se procesa a 1280 px'],
                ['60', 'visibles a la vez', 'como máximo'],
                ['19 s', 'de video', '2560 × 1440'],
              ]}
            />
          </Fig>

          <p className="rv">
            Antes de volar hay que decidir por dónde. Esta calculadora arma la ruta para cubrir un potrero con pasadas paralelas y muestra algo
            clave: <b>a qué altura una vaca todavía se ve lo bastante grande para el detector.</b> Si el dron vuela muy alto, hace menos
            pasadas pero cada animal queda en pocos píxeles.
          </p>

          <Fig
            n={fig()}
            title="Programación del recorrido"
            cap="Es un cálculo de cobertura real, no una animación decorativa: cambiá la altura y mirá cómo cambian las pasadas, los minutos, las baterías y el tamaño de la vaca. Supuestos: cámara de 75° y 4000 px de ancho, detector a 1280 px, vaca de 2,4 m, 20 min de vuelo por batería y 70 % de solapamiento entre fotos."
          >
            <RoutePlanner />
          </Fig>

          <p className="rv">
            <b>Dónde entra la IA.</b> Alguien dice qué revisar, por WhatsApp o desde un panel. La IA traduce la orden a zona, altura y pasadas.
            El dron vuela la lista de puntos de ruta, el modelo cuenta los animales y el resultado vuelve por WhatsApp. El cálculo de la
            figura anterior ya funciona; lo demás son piezas que hay que conectar.
          </p>

          <Fig
            n={fig()}
            title="De la orden al reporte"
            cap="Cada paso dice en qué estado está. Falta el dron con vuelo autónomo y probar la vista cenital, además de medir contra un conteo manual."
          >
            <Flow steps={MISSION_FLOW} />
          </Fig>

          <Sect id="auto">Automatización</Sect>
          <h2 className="rv">
            Contar es la mitad.
            <br />
            <em>El resto es lo que pasa después</em>
          </h2>
          <p className="rv">
            Un número solo no le sirve a nadie. Lo útil es que alguien se entere, que quede registrado y que salte una alerta cuando algo no
            cuadra. Eso es automatización, y es lo que hacemos en Nimbo. Si además un robot (dron, perro, brazo) sale a capturar los datos,
            los mismos flujos se pueden aplicar a otros trabajos.
          </p>

          <Fig
            n={fig()}
            title="El flujo completo del conteo"
            cap="Hoy existen las piezas de conteo y la maqueta del mensaje. Conectarlas y sumar el registro y la alerta es el trabajo que sigue."
          >
            <Flow steps={FIELD_FLOW} />
          </Fig>

          <p className="rv">
            Además de avisar, el conteo deja datos. Con ellos se puede armar un tablero para el dueño del campo: cuántos animales hay, cómo
            avanza el recorrido, dónde están y, cuando haya vuelos repetidos, cómo evoluciona el rodeo y cuándo falta alguno.
          </p>

          <Fig
            n={fig()}
            title="Tablero de métricas · datos reales del video de dron"
            cap="Todo sale del conteo del video de la Fig. 6, sin números inventados. Lo que falta para que sea un tablero de verdad es guardar cada vuelo y compararlos entre días; las dos tarjetas punteadas son eso."
          >
            <RobotsDashboard />
          </Fig>

          <Fig
            n={fig()}
            title="Automatizaciones posibles con robots"
            cap="Cada ejemplo combina piezas que ya construimos (visión por computadora, WhatsApp, tableros) con una plataforma robótica de uso general. Son ideas para conversar, no productos terminados."
          >
            <div className="rb-cards">
              {FLOWS.map((f) => (
                <div className="rb-card" key={f.t}>
                  <div className="rb-card-top">
                    <h3>{f.t}</h3>
                    <em className="rb-tag t-prop">Idea</em>
                  </div>
                  <p className="rb-con">{f.con}</p>
                  <ol className="rb-chain">
                    {f.steps.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ol>
                  <p className="rb-base">
                    <b>Ya tenemos:</b> {f.base}
                    <br />
                    <b>Falta:</b> {f.falta}
                  </p>
                </div>
              ))}
            </div>
            <a className="rb-more" href="https://www.nimbodata.com/#servicios">
              Lo que ya hacemos hoy en automatización: nimbodata.com →
            </a>
          </Fig>

          <p className="rv">
            Donde la reconstrucción 3D sí encaja es en interiores: edificios, obras y nuestros Recorridos 360. Hay un proyecto abierto,{' '}
            <a href="https://github.com/Robbyant/lingbot-map" target="_blank" rel="noopener noreferrer">
              LingBot-Map
            </a>
            , que toma un video y devuelve una nube de puntos 3D y la trayectoria de la cámara; su README muestra un recorrido interior de
            unos 25.000 cuadros.
          </p>

          <Fig
            n={fig()}
            title="Reconstrucción 3D en interiores · ideas"
            cap="Ideas para conversar. Los datos de la ficha son los que declara el README del proyecto; nosotros todavía no lo probamos."
          >
            <figure className="rb-shot">
              <img
                src="/robots/lingbot-map.webp"
                alt="Un edificio reconstruido en 3D como nube de puntos, visto desde arriba, con la trayectoria de la cámara dibujada en colores"
                loading="lazy"
              />
              <figcaption>
                Ejemplo del proyecto LingBot-Map (equipo Robbyant): un edificio reconstruido en 3D, visto desde arriba, con la trayectoria de la
                cámara en colores. No es un resultado nuestro.{' '}
                <a href="https://technology.robbyant.com/lingbot-map" target="_blank" rel="noopener noreferrer">
                  Ver su página ↗
                </a>
              </figcaption>
            </figure>

            <h5 className="rb-subt">Inspección de obra</h5>
            <p className="rb-subp">
              Un robot que camina una obra puede dejar un mapa 3D por visita, y comparar una visita con la anterior es medir el avance.
            </p>
            <Flow steps={OBRA_FLOW} />

            <h5 className="rb-subt">Recorridos 360</h5>
            <p className="rb-subp">
              Hoy las flechas se acomodan a mano y el mapa no tiene escala; deducir las puertas comparando fotos acertó 1 de 4. Una trayectoria
              de cámara reconstruida podría ubicar y orientar cada ambiente. Duda abierta: el README habla de videos y fotos comunes, no de
              fotos 360.
            </p>
            <Flow steps={REC360_FLOW} />

            <h5 className="rb-subt">Ficha del proyecto</h5>
            <Spec
              rows={[
                ['Proyecto', 'LingBot-Map, del equipo Robbyant (github.com/Robbyant/lingbot-map)'],
                ['Licencia', 'Apache-2.0, de código abierto'],
                ['Qué hace', 'Reconstrucción 3D en streaming a partir de un video o de una carpeta de fotos'],
                ['Qué devuelve', 'Una nube de puntos 3D y la trayectoria de la cámara'],
                ['Qué pide', 'Una placa de video NVIDIA (CUDA); el README no menciona Mac ni CPU'],
                ['Qué no dice', 'Escala métrica: para hablar de metros haría falta una referencia, como una medida conocida del lugar'],
                ['Dónde lo vemos', 'En interiores. En un potrero de pasto parejo hay pocos rasgos para reconstruir; es una expectativa nuestra, no un ensayo'],
                ['Estado acá', 'No probado por nosotros'],
              ]}
            />
          </Fig>

          <Sect id="precision">Qué tan preciso es</Sect>
          <h2 className="rv">
            El número depende <em>de cómo se configure</em>
          </h2>
          <p className="rv">
            No hay un conteo manual de referencia, así que no podemos hablar de porcentaje de acierto. Lo que sí medimos es cuánto cambia el
            resultado al ajustar el tracker: cuando una vaca queda tapada por otra, puede recibir un ID nuevo y contarse dos veces.
          </p>

          <figure className="viz rb-viz rb-fig">
            <div className="rb-fig-t">
              <span>{fig()}</span> Vacas contadas en el mismo video
            </div>
            <div className="bars">
              {BARS.map(([a, b, v, k]) => (
                <div className={`row ${k || ''}`} key={a + b} style={{ '--v': v }}>
                  <span>
                    {a} <small>· {b}</small>
                  </span>
                  <div className="track">
                    <div className="fill" />
                  </div>
                  <span className="val">{v}</span>
                </div>
              ))}
            </div>
            <figcaption>
              Máximo de vacas visibles al mismo tiempo: 40. Ajustar el tracker bajó el conteo de 88 a 57. La cifra real está en algún punto
              del rango, y la forma de acotarla es tener animales contados a mano.
            </figcaption>
          </figure>

          <div className="tbl rv rb-tbl">
            <table>
              <thead>
                <tr>
                  <th>Caso</th>
                  <th>Estado hoy</th>
                </tr>
              </thead>
              <tbody>
                {LIMITS.map(([a, b]) => (
                  <tr key={a}>
                    <td>{a}</td>
                    <td>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Sect id="falta">Qué falta</Sect>
          <h2 className="rv">
            Dataset propio y <em>un piloto en un campo</em>
          </h2>
          <p className="rv">El modelo actual no fue entrenado con campos argentinos. Lo que lo mejora no es más código sino datos.</p>
          <ol className="rb-steps">
            {NEXT.map(([t, d]) => (
              <li className="rv" key={t}>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="rb-end rv">
            <LogoMedallion />
            <p className="rb-end-lead">Me gusta esta idea y quiero trabajar con robots. Si te interesa pensar estos casos juntos, escribime.</p>
            <a className="btn btn-solid" href={whatsappUrl(WA_MSG)} target="_blank" rel="noopener noreferrer">
              Escribime por WhatsApp <span className="arr">→</span>
            </a>
            <p className="rb-fine">Los clips de la tropa y de las ovejas son material de stock con marca de agua.</p>
          </div>
        </div>
      </article>
    </main>
  )
}

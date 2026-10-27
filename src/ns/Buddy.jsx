// Nimbo, la nube que acompaña: aparece abajo a la derecha, saluda, habla con un globo y, si la tocás, abre un
// chat guiado. Sabe en qué página está el visitante y arranca distinto en cada una:
//   home → tres preguntas (rubro, qué les come tiempo) y una propuesta con un caso real
//   servicio → ya sabe el tema: pregunta el rubro y cuenta cómo aplicaría ese servicio, con su caso
//   casos → "¿cuál se parece a lo tuyo?" · blog → recomienda por qué artículo empezar
//   BETA → qué es, anotarse, presentar algo o ser partner · contacto → completa el contacto por chat
// También comenta una vez al llegar a ciertas secciones ([data-buddy]) y, si cambiás de página con la charla
// empezada, la sigue desde donde estás. Recuerda al visitante (localStorage) y lo saluda por su nombre.
// El chat es guionado (no usa /api/chat). Cuando deja su WhatsApp o mail, la charla se manda por submitContact
// (/api/contact, origen "nube"): llega como cualquier consulta, con el rubro, el problema y la página.
import { Player } from '@remotion/player'
import { useCallback, useEffect, useRef, useState } from 'react'
import { POST_URL } from './Blog'
import { getPost, POSTS } from './blog-posts'
import { submitContact } from '../lib/cms'
import { AREAS } from './data'
import { Mascot, MASCOT } from './scenes/Mascot'
import { Arrow, Logo } from './ui'

const WA_NUM = '5491124036836'
const KEY = 'nimbo-nube'
const INSCRIPCION = 'https://somosbeta.net/eventos/encuentro-1/inscripcion/'

const RUBROS = ['Inmobiliaria', 'Distribuidora', 'Comercio', 'Servicios profesionales', 'Salud o consultorio', 'Otro']
const PLURAL = { Comercio: 'comercios', 'Salud o consultorio': 'consultorios', 'Servicios profesionales': 'servicios profesionales', Distribuidora: 'distribuidoras', Inmobiliaria: 'inmobiliarias' }
const DOLORES = {
  whatsapp: { l: 'Responder WhatsApp', to: '/agentes-de-ia',
    p: 'Lo resuelve un agente de IA: contesta WhatsApp e Instagram a cualquier hora con la información de tu negocio y te pasa solo lo que necesita una persona. Lo hicimos para unos locales de entretenimiento: el bot atiende de madrugada y a la mañana el equipo encuentra todo derivado.' },
  carga: { l: 'Cargar datos a mano', to: '/automatizacion-e-integracion',
    p: 'Se puede automatizar: conectamos las herramientas que ya usás para que cada dato se cargue una sola vez y llegue solo a la planilla, al CRM o a la factura. Con Nimbo Tax, por ejemplo, las facturas recurrentes se emiten y se mandan solas.' },
  reportes: { l: 'Armar reportes', to: '/datos-y-tableros',
    p: 'Se arregla con un tablero que se actualiza solo: ventas, stock y cobranzas a la vista, con aviso cuando algo se sale de lo normal. Lo armamos para unas salas: indicadores por sala y alertas que dicen qué hacer.' },
  turnos: { l: 'Turnos y agenda', to: '/agentes-de-ia',
    p: 'Lo resuelve un agente que da turnos por WhatsApp: ofrece los horarios libres, agenda, recuerda el día anterior y reprograma si cancelan.' },
  pedidos: { l: 'Pedidos y stock', to: '/software-a-medida',
    p: 'Lo resuelve un sistema a medida para pedidos y stock: cada venta descuenta stock y te avisa antes de quedarte sin mercadería. Hicimos algo así con El Reencuentro: ventas, encargos y fiado desde el celular.' },
}
// qué problema representa cada página de servicio (para no volver a preguntarlo)
const SERVICIO_DOLOR = { 'agentes-de-ia': 'whatsapp', automatizaciones: 'carga', 'datos-y-tableros': 'reportes', 'software-a-medida': 'pedidos' }
// cómo nombrarlo en una frase ("cómo andaría un agente de IA…")
const SERVICIO_FRASE = { 'agentes-de-ia': 'un agente de IA', automatizaciones: 'una automatización', 'datos-y-tableros': 'un tablero', 'software-a-medida': 'un sistema a medida' }
// en un artículo, el problema que más se parece a su tema (si no hay, pregunta)
const ARTICULO_DOLOR = { 'Inteligencia Artificial': 'whatsapp', 'Automatización & IA': 'carga', 'Transformación Digital': 'pedidos' }
// el tema con el que llega la consulta según lo que contó
const TEMA_DOLOR = { whatsapp: 'agentes-de-ia', turnos: 'agentes-de-ia', carga: 'automatizaciones', reportes: 'datos-y-tableros', pedidos: 'software-a-medida' }
const KEYWORDS = [[/whats|mensaj|chat|instagram|consulta|respond/i, 'whatsapp'], [/planilla|excel|cargar|carga|copiar|factur/i, 'carga'],
  [/report|número|numero|tablero|dashboard|venta/i, 'reportes'], [/turno|agenda|reserva|cita/i, 'turnos'], [/pedido|stock|inventario|encargo/i, 'pedidos']]
const CATEGORIAS = [...new Set(POSTS.map((p) => p.category))]

const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} } }
const save = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)) } catch { /* sin storage, sigue igual */ } }

// qué sabe la nube de cada página: cómo se llama, qué dice el globo y cómo arranca el chat
function pageCtx(path) {
  const area = AREAS.find((a) => a.path === path)
  if (area) return {
    kind: 'servicio', name: area.t, area: area.slug, dolor: SERVICIO_DOLOR[area.slug],
    bubble: `¿Te muestro cómo andaría ${SERVICIO_FRASE[area.slug]} en tu negocio?`,
    intro: [`Estás viendo ${area.t}.`, '¿Te cuento cómo lo aplicaríamos en tu negocio? Son dos preguntas.'], step: 'intro',
  }
  if (path === '/casos') return {
    kind: 'casos', name: 'los casos', bubble: '¿Cuál se parece a lo que necesitás?',
    intro: ['Estás viendo nuestros casos.', '¿Cuál se parece más a lo que necesitás?'], step: 'caso',
  }
  if (path === '/blog') return {
    kind: 'blog', name: 'el blog', bubble: '¿Te digo por cuál artículo empezar?',
    intro: ['Estás en el blog.', '¿Sobre qué querés leer? Te recomiendo por dónde empezar.'], step: 'blog',
  }
  const post = path.startsWith('/blog/') && getPost(path.slice(6))
  if (post) return {
    kind: 'articulo', name: 'el blog', dolor: ARTICULO_DOLOR[post.category],
    bubble: '¿Querés ver cómo aplicarlo en tu negocio?',
    intro: [`Estás leyendo «${post.title}».`, '¿Te cuento cómo lo aplicaríamos en tu negocio? Son dos preguntas.'], step: 'intro',
  }
  if (path === '/beta') return {
    kind: 'beta', name: 'BETA', bubble: '¿Venís al Encuentro #1? Te cuento cómo anotarte.',
    intro: ['Estás en BETA, la comunidad que armamos en Berazategui.', '¿Qué querés saber?'], step: 'beta',
  }
  if (path === '/contacto') return {
    kind: 'contacto', name: 'el formulario de contacto', bubble: null,
    intro: ['Estás en el formulario de contacto.', 'Si te resulta más cómodo, lo hacemos por acá. ¿Cómo te llamás?'], step: 'nombre',
  }
  return {
    kind: 'home', name: 'el inicio', bubble: '¡Hola! Soy Nimbo. ¿Te cuento qué podemos automatizar?',
    intro: ['¡Hola! Soy Nimbo, el asistente de este equipo.', 'En tres preguntas te digo qué podríamos automatizar en tu negocio. ¿Arrancamos?'], step: 'intro',
  }
}

export default function Buddy({ path }) {
  const [mem, setMem] = useState(load)
  const [shown, setShown] = useState(false)
  const [client, setClient] = useState(false) // la nube animada se dibuja recién en el navegador
  useEffect(() => setClient(true), [])
  const [bubble, setBubble] = useState('')
  const [typed, setTyped] = useState('')
  const [wave, setWave] = useState(false)
  const [happy, setHappy] = useState(false)
  const [open, setOpen] = useState(false)
  const [look, setLook] = useState([0, 0])
  const [msgs, setMsgs] = useState([])
  const [step, setStep] = useState(null)
  const [botTyping, setBotTyping] = useState(false)
  const [text, setText] = useState('')
  const [angry, setAngry] = useState(false)
  const taps = useRef([])
  const calm = useRef(0)
  const self = useRef(null)
  const root = useRef(null)
  const list = useRef(null)
  const chatPath = useRef(null) // página en la que se presentó el chat por última vez
  const begun = useRef(false) // ya se presentó (se marca enseguida: los mensajes tardan en llegar y dos toques rápidos lo duplicaban)
  const lastBubble = useRef(0)
  const ctx = pageCtx(path)
  const remember = (patch) => setMem((m) => { const n = { ...m, ...patch }; save(n); return n })

  const showBubble = useCallback((t, ms = 9000) => {
    lastBubble.current = Date.now()
    setBubble(t)
    clearTimeout(showBubble.t)
    showBubble.t = setTimeout(() => setBubble(''), ms)
  }, [])

  // al entrar a una página: aparece, saluda y dice algo de esa página; a los 30 s, un empujoncito
  useEffect(() => {
    if (open) return
    const c = pageCtx(path)
    const first = c.bubble && (mem.name ? `¡Hola, ${mem.name}! ${c.bubble}` : c.bubble)
    const timers = [
      setTimeout(() => { setShown(true); setWave(true) }, 1400),
      setTimeout(() => setWave(false), 3600),
      setTimeout(() => first && showBubble(first), 2000),
      setTimeout(() => c.kind !== 'contacto' && c.kind !== 'beta' && !mem.done && showBubble('Psst… la primera charla es sin cargo.', 8000), 30000),
    ]
    return () => timers.forEach(clearTimeout)
    // solo al cambiar de página
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  // comenta una sola vez al llegar a ciertas secciones (data-buddy="texto"), sin pisar otro globo reciente
  useEffect(() => {
    const said = new Set()
    let io
    const t = setTimeout(() => {
      io = new IntersectionObserver((list) => list.forEach((e) => {
        const msg = e.target.dataset.buddy
        if (!e.isIntersecting || said.has(msg)) return
        if (Date.now() - lastBubble.current < 12000 || root.current?.classList.contains('open')) return
        said.add(msg)
        showBubble(msg, 8000)
      }), { threshold: 0.35 })
      document.querySelectorAll('[data-buddy]').forEach((el) => io.observe(el))
    }, 800)
    return () => { clearTimeout(t); io?.disconnect() }
  }, [path, showBubble])

  // efecto máquina de escribir; mientras escribe, la nube mueve la boca
  useEffect(() => {
    if (!bubble) { setTyped(''); return }
    let i = 0
    const id = setInterval(() => { i += 1; setTyped(bubble.slice(0, i)); if (i >= bubble.length) clearInterval(id) }, 26)
    return () => clearInterval(id)
  }, [bubble])

  // los ojos siguen el mouse (o miran el chat cuando está abierto)
  useEffect(() => {
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = self.current?.getBoundingClientRect()
        if (!r) return
        setLook([(e.clientX - (r.left + r.width / 2)) / 320, (e.clientY - (r.top + r.height / 2)) / 320])
      })
    }
    addEventListener('pointermove', onMove)
    return () => { removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [])

  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' }) }, [msgs, botTyping])

  // tocar fuera del chat (o Escape) lo cierra; la conversación queda para cuando se vuelva a abrir
  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!root.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open])

  const say = useCallback((items, nextStep) => {
    setBotTyping(true)
    const arr = Array.isArray(items) ? items : [items]
    arr.forEach((m, i) => setTimeout(() => {
      setMsgs((x) => [...x, { from: 'bot', ...(typeof m === 'string' ? { text: m } : m) }])
      if (i === arr.length - 1) { setBotTyping(false); setStep(nextStep) }
    }, 650 + i * 900))
  }, [])

  const start = () => {
    setOpen(true)
    setBubble('')
    setHappy(true)
    setTimeout(() => setHappy(false), 900)
    // charla ya empezada en otra página: la sigue desde donde está ahora
    if (begun.current) {
      if (chatPath.current !== path) {
        chatPath.current = path
        say([`Ahora estás en ${ctx.name}.`, ...ctx.intro.slice(1)], ctx.step)
      }
      return
    }
    begun.current = true
    chatPath.current = path
    if (mem.done && ctx.kind !== 'beta' && ctx.kind !== 'blog') {
      return say([`¡Volviste, ${mem.name}! Ya tenemos tu contacto y te escribimos pronto.`, `Estás en ${ctx.name}. ¿Querés ver algo más mientras tanto?`], 'extra')
    }
    if (mem.name && mem.dolor && ctx.kind === 'home') {
      return say([`¡Volviste, ${mem.name}! La otra vez hablamos de ${DOLORES[mem.dolor].l.toLowerCase()}.`, '¿Querés que lo veamos para tu caso? La primera charla es de 20 minutos y sin cargo.'], 'oferta')
    }
    const hola = mem.name ? [`¡Hola de nuevo, ${mem.name}!`] : []
    say([...hola, ...(mem.name && ctx.kind === 'contacto' ? ['Estás en el formulario de contacto.', 'Si querés, lo terminamos por acá. ¿Por dónde te escribimos? Dejame tu WhatsApp o tu mail.'] : ctx.intro)],
      mem.name && ctx.kind === 'contacto' ? 'contacto' : ctx.step)
  }

  // los artículos del blog que traían el asistente embebido ahora tienen un botón que abre esta charla
  const startRef = useRef(start)
  startRef.current = start
  useEffect(() => {
    const on = () => startRef.current()
    addEventListener('nimbo:charlar', on)
    return () => removeEventListener('nimbo:charlar', on)
  }, [])

  // si la tocan muchas veces seguidas se enoja un rato: cierra el chat, se queja y después se le pasa
  const ENOJOS = ['¡Ey! Pará, me mareás.', '¡Che! Tocar no es charlar.', 'Ya está, me enojé.', '¡Cosquillas no!']
  const tap = () => {
    const now = Date.now()
    taps.current = [...taps.current.filter((t) => now - t < 2200), now]
    if (angry || taps.current.length >= 5) {
      taps.current = []
      setAngry(true)
      setOpen(false)
      showBubble(ENOJOS[Math.floor(Math.random() * ENOJOS.length)], 7500)
      clearTimeout(calm.current)
      // el enojo dura unos 8 s y cada toque mientras está enojado lo vuelve a empezar
      calm.current = setTimeout(() => { setAngry(false); showBubble('Bueno… ya se me pasó. ¿Charlamos?', 6000) }, 8000)
      return
    }
    open ? setOpen(false) : start()
  }

  const me = (t) => setMsgs((x) => [...x, { from: 'me', text: t }])

  // propuesta concreta para un problema, con su caso y el enlace al servicio
  // `rubroAhora`: el rubro recién elegido (todavía no llegó al estado `mem`)
  const pitch = (key, rubroAhora = mem.rubro) => {
    remember({ dolor: key })
    const d = DOLORES[key]
    const rubro = rubroAhora && rubroAhora !== 'Otro' ? `Pasa mucho en ${PLURAL[rubroAhora] || rubroAhora.toLowerCase()}. ` : ''
    const enEsta = `/${Object.keys(SERVICIO_DOLOR).find((k) => SERVICIO_DOLOR[k] === key)}` === path
    return say([{ text: rubro + d.p, link: enEsta ? ['#ejemplos', 'Ver los ejemplos'] : [d.to, 'Ver cómo funciona'] }, mem.done
      ? `Ya tenemos tu contacto, ${mem.name}: lo sumamos a la charla.`
      : '¿Querés que lo veamos para tu caso? La primera charla es de 20 minutos y sin cargo.'], mem.done ? 'extra' : 'oferta')
  }

  // `at` permite responder como si estuviéramos en otro paso (cuando el texto libre ya nombra el problema)
  const pick = (value, label, at = step) => {
    if (label) me(label)
    if (at === 'intro' || at === 'mirar') {
      if (value === 'mirar') {
        return ctx.kind === 'servicio'
          ? say({ text: `¡Todo bien! Más abajo tenés ejemplos reales de ${ctx.name.toLowerCase()}. Cuando quieras, seguimos.`, link: ['#ejemplos', 'Ver ejemplos'] }, 'mirar')
          : say({ text: '¡Todo bien! Te dejo los casos para chusmear. Cuando quieras, seguimos.', link: ['/casos', 'Ver casos'] }, 'mirar')
      }
      return say('¿De qué es tu negocio?', 'rubro')
    }
    if (at === 'rubro') {
      remember({ rubro: value })
      // en una página de servicio el tema ya se sabe: va directo a la propuesta
      if (ctx.dolor) return pitch(ctx.dolor, value)
      return say('¿Qué es lo que más tiempo les come hoy?', 'dolor')
    }
    if (at === 'caso') {
      if (value === 'otro') return say('¿Qué es lo que más tiempo les come hoy?', 'dolor')
      return pitch(value)
    }
    if (at === 'blog' || at === 'blogmas') {
      if (value === 'aplicar') return say('¡Dale! ¿De qué es tu negocio?', 'rubro')
      if (value === 'otro-blog') return say('¿Sobre qué otro tema?', 'blog')
      const post = POSTS.find((p) => p.category === value)
      return say([{ text: `Sobre ${value}, empezá por «${post.title}». Son ${post.readTime} de lectura.`, link: [POST_URL(post.slug), 'Leer el artículo'] },
        'Si querés, también te cuento cómo aplicarlo en tu negocio.'], 'blogmas')
    }
    if (at === 'beta') {
      if (value === 'que') return say(['BETA es una comunidad de innovación: nos juntamos en Bera a contar qué está probando cada uno con IA y tecnología, y a conocer gente de la zona. Gente que hace cosas.',
        'El primero es el Encuentro #1: conocernos y conectar. Lugar y fecha a definir, ya se puede anotar.'], 'beta')
      if (value === 'anotarme') return say([{ text: '¡Genial! Las inscripciones al Encuentro #1 ya están abiertas.', link: [INSCRIPCION, 'Anotarme'] }, 'Cuando haya fecha y lugar, te avisamos.'], 'beta')
      if (value === 'presentar') return say({ text: '¡Buenísimo! Contá qué hiciste, qué problema resuelve y cómo te funcionó. Con IA o sin IA.', link: [`${INSCRIPCION}?presentar`, 'Proponer una charla'] }, 'beta')
      if (value === 'partner') return say({ text: '¡Gracias! Buscamos espacios, sponsors, una mano organizando o café para los encuentros.', link: ['/contacto?s=beta', 'Escribinos'] }, 'beta')
    }
    if (at === 'dolor' || at === 'extra') {
      if (value === 'casos') return say({ text: 'Acá están todos los proyectos que tenemos funcionando.', link: ['/casos', 'Ver casos'] }, 'extra')
      if (value === 'otro-tema') return say('¿Qué otra cosa les come tiempo?', 'dolor')
      return pitch(value)
    }
    if (at === 'oferta') {
      if (value === 'casos') return say({ text: 'Dale. Acá están los proyectos que tenemos funcionando.', link: ['/casos', 'Ver casos'] }, 'oferta')
      return mem.name
        ? say(`Genial, ${mem.name}. ¿Por dónde te escribimos? Dejame tu WhatsApp o tu mail.`, 'contacto')
        : say('¡Genial! ¿Cómo te llamás?', 'nombre')
    }
  }

  const submitText = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t || botTyping) return
    setText('')
    me(t)
    if (step === 'nombre') {
      const name = t.split(/\s+/)[0].replace(/^./, (c) => c.toUpperCase())
      remember({ name })
      return say(`Un gusto, ${name}. ¿Por dónde te escribimos? Dejame tu WhatsApp o tu mail.`, 'contacto')
    }
    if (step === 'contacto') {
      const ok = /@.+\./.test(t) || (t.match(/\d/g) || []).length >= 8
      if (!ok) return say('Mmm, no me parece un WhatsApp ni un mail. ¿Me lo pasás de nuevo?', 'contacto')
      const mail = /@/.test(t) ? t.trim() : ''
      const [firstName, ...rest] = (mem.name || 'Visitante').trim().split(/\s+/)
      const topic = TEMA_DOLOR[mem.dolor] || ctx.area || 'otro'
      submitContact({
        firstName, lastName: rest.join(' '), email: mail, countryCode: '', phone: mail ? '' : t.trim(),
        topics: [topic], topic, source: 'nube', page: path, rubro: mem.rubro || '', lang: 'es',
        message: [mem.dolor && `Le come tiempo: ${DOLORES[mem.dolor].l}`, 'Dejó su contacto en el chat de la nube.'].filter(Boolean).join('\n'),
      }).then(() => {
        remember({ contacto: t, done: true })
        say([`¡Listo, ${mem.name || ''}! Te escribimos en menos de 24 h para coordinar la charla.`.replace(' !', '!'),
          { text: 'Si querés adelantar, mandanos el resumen por WhatsApp.', wa: true }], 'extra')
      }).catch(() => say({ text: 'Uy, no se me envió. ¿Me lo mandás por WhatsApp así no se pierde?', wa: true }, 'extra'))
      return
    }
    // texto libre en un paso de opciones: si nombra un problema conocido, seguimos por ahí
    const hit = KEYWORDS.find(([re]) => re.test(t))
    if (hit && ['intro', 'rubro', 'dolor', 'extra', 'mirar', 'caso', 'blogmas'].includes(step)) return pitch(hit[1])
    // sitio real: acá respondería /api/chat, pasándole también la página (`path`) como contexto
    if (ctx.kind === 'beta') return say({ text: '¡Buena pregunta! Escribinos y te responde alguien de BETA.', link: ['/contacto?s=beta', 'Escribinos'] }, 'beta')
    return say('¡Buena pregunta! Esa te la respondo mejor en una charla con el equipo. ¿Querés que la coordinemos?', 'oferta')
  }

  const resumen = `¡Hola! Soy ${mem.name || ''}${mem.rubro && mem.rubro !== 'Otro' ? ` (${mem.rubro.toLowerCase()})` : ''}. Hablé con la nube del sitio sobre ${mem.dolor ? `«${DOLORES[mem.dolor].l}»` : 'automatizar procesos'}.`
  const chips = {
    intro: [['dale', 'Dale'], ['mirar', 'Solo estoy mirando']],
    mirar: [['dale', 'Mejor arranquemos']],
    rubro: RUBROS.map((r) => [r, r]),
    dolor: Object.entries(DOLORES).map(([k, d]) => [k, d.l]),
    caso: [['whatsapp', 'El bot para locales'], ['pedidos', 'El Reencuentro'], ['reportes', 'El asistente o el tablero'], ['otro', 'Otra cosa']],
    blog: CATEGORIAS.map((c) => [c, c]),
    blogmas: [['aplicar', 'Dale, contame'], ['otro-blog', 'Otro tema']],
    beta: [['que', '¿Qué es BETA?'], ['anotarme', 'Quiero anotarme'], ['presentar', 'Quiero presentar algo'], ['partner', 'Quiero ser partner']],
    oferta: [['si', 'Sí, dale'], ['casos', 'Primero quiero ver casos']],
    extra: [['otro-tema', 'Contame de otro tema'], ['casos', 'Ver casos']],
  }[step] || []
  const placeholder = step === 'nombre' ? 'Tu nombre' : step === 'contacto' ? 'WhatsApp o mail' : 'Escribile a Nimbo…'
  const talking = botTyping || (!!bubble && typed.length < bubble.length)

  return (
    <div ref={root} className={`buddy${shown ? ' in' : ''}${open ? ' open' : ''}`}>
      {open && (
        <div className="bchat" role="dialog" aria-label="Chat con Nimbo">
          <header>
            <span className="bchat-av"><Logo /></span>
            <div><b>Nimbo</b><span><i />En línea · {ctx.kind === 'home' ? 'te responde al toque' : `en ${ctx.name}`}</span></div>
            <button type="button" aria-label="Cerrar chat" onClick={() => setOpen(false)}>×</button>
          </header>
          <div className="bchat-list" ref={list}>
            {msgs.map((m, i) => (
              <div key={i} className={`bmsg ${m.from}`}>
                {m.text && <p>{m.text}</p>}
                {m.link && (
                  <a href={m.link[0]} onClick={() => setOpen(false)} {...(m.link[0].startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
                    {m.link[1]} <Arrow />
                  </a>
                )}
                {m.wa && <a href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent(resumen)}`} className="wa">Seguir por WhatsApp <Arrow /></a>}
              </div>
            ))}
            {botTyping && <div className="bmsg bot dots"><span /><span /><span /></div>}
          </div>
          {!botTyping && chips.length > 0 && (
            <div className="bchips">
              {chips.map(([v, l]) => <button key={v} type="button" onClick={() => pick(v, l)}>{l}</button>)}
            </div>
          )}
          <form className="bchat-input" onSubmit={submitText}>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} aria-label="Mensaje" />
            <button type="submit" aria-label="Enviar"><Arrow /></button>
          </form>
        </div>
      )}

      {!open && typed && (
        <div className={`bbubble${angry ? ' mad' : ''}`} role="status">
          {/* la forma va en su capa: el contorno sale de un drop-shadow que no debe tocar el texto */}
          <span className="bb-shape" aria-hidden="true"><i /><em /><em /></span>
          <p onClick={() => !angry && start()}>{typed}</p>
          <button type="button" aria-label="Cerrar" onClick={() => setBubble('')}>×</button>
        </div>
      )}

      <button ref={self} type="button" className="bself" onClick={tap}
        onPointerEnter={() => setHappy(true)} onPointerLeave={() => setHappy(false)} aria-label={open ? 'Cerrar el chat' : 'Abrir el chat con Nimbo'}>
        {client && <Player numberOfSharedAudioTags={0} component={Mascot} inputProps={{ look: open ? [-0.7, -0.9] : look, talking: talking && !angry, wave, happy: happy && !angry, angry }}
          durationInFrames={MASCOT.durationInFrames} fps={MASCOT.fps} compositionWidth={MASCOT.width} compositionHeight={MASCOT.height}
          autoPlay loop controls={false} clickToPlay={false} doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false}
          style={{ width: '100%', height: '100%' }} />}
      </button>
    </div>
  )
}

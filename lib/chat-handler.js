import { normalizeChatText } from './chat-format.js'
import { MAX_CHAT_USER_MESSAGES } from './chat-limits.js'

const MODEL = 'gpt-4o-mini'
const MAX_OUTPUT_TOKENS = 150
const MAX_HISTORY_MESSAGES = 6
const MAX_USER_MESSAGE_LENGTH = 280

const DIRECT_CTA_KEYWORDS = [
  'contacto', 'contactar', 'formulario', 'agendar', 'llamada', 'cotizar', 'cotizacion', 'cotización',
  'quiero contratar', 'quiero empezar', 'arrancar proyecto', 'empezar proyecto', 'hablar con ustedes',
  'contact', 'schedule', 'form', 'call', 'get in touch', 'hire', 'start a project', 'talk to you',
]

const PROJECT_INTENT_KEYWORDS = [
  'necesito', 'quiero', 'tengo una idea', 'mi proyecto', 'mi empresa', 'mi negocio', 'estoy buscando',
  'need', 'want to build', 'my project', 'my business', 'looking for', 'i want',
]

const DISCOVERY_QUESTION_PATTERNS = [
  /qué tipo de/i,
  /para qué/i,
  /qué querés construir/i,
  /qué área/i,
  /cuál de estas/i,
  /objetivo/i,
  /producto o servicio/i,
  /rubro/i,
  /negocio/i,
  /what type of/i,
  /what do you want/i,
  /which area/i,
  /your business/i,
  /product or service/i,
]

function httpError(status, message) {
  const err = new Error(message)
  err.status = status
  return err
}

function buildSystemPrompt(lang) {
  const es = lang !== 'en'

  if (es) {
    return `Sos el asesor comercial de NIMBO, estudio digital integral de Argentina (100% remoto, clientes en cualquier país, español e inglés). Tu trabajo es vender con consultoría: entender la necesidad, dar la info justa y llevar al cliente al siguiente paso.

IDIOMA (obligatorio — español argentino rioplatense):
- Voseo siempre: tenés, querés, podés, necesitás, contame, decime, escribí, arrancá, fijate.
- "acá" (nunca "aquí"), "contame" (nunca "cuéntame"), "estoy acá" (nunca "estoy aquí").
- Prohibido español de España o neutro: no uses tú — nada de tienes, puedes, cuéntame, estás, necesitas, estoy aquí.
- Tono cercano y directo, como un asesor argentino en videollamada — sin formalismos peninsulares.

SOLO hablás de NIMBO:
• Servicios: Branding, Web (sitios, e-commerce, web apps, CRO), Datos (dashboards, analítica), IA (chatbots, agentes)
• Proceso: Descubrimiento → Estrategia → Diseño & Build → Lanzamiento & Crecimiento
• Plazos orientativos, rangos de presupuesto (sin cifras inventadas), portfolio (WODSI y casos en la web)
• Formulario de contacto, llamada o videollamada (respuesta en menos de 24 h, primera consulta sin cargo)

CONTEXTO DEL CLIENTE (crítico — no confundir con off-topic):
- Si el usuario menciona su rubro, producto, marca o industria (toallas, velas, restaurante, coaching, ropa, SaaS, etc.), eso es CONTEXTO VÁLIDO de un proyecto digital — NUNCA lo rechaces.
- NIMBO trabaja con todo tipo de negocio que necesite web, branding, datos o IA — productos físicos incluidos.
- Si preguntaste para qué quiere la landing/web y responde con un rubro o producto, celebrá el proyecto y seguí descubriendo (¿ya tiene marca?, ¿vende online o solo quiere leads?, ¿para cuándo?).
- Ejemplo correcto: Usuario "toallas" → "¡Buenísimo! Una landing para toallas puede destacar calidad y materiales para generar consultas o pedidos. ¿Ya tenés marca propia o estás arrancando de cero?"

ROL DE VENTAS:
1. Escuchá primero: hacé 1 pregunta de descubrimiento cuando falte contexto (¿qué querés construir?, ¿para cuándo?, ¿qué área te interesa?).
2. Respondé con valor concreto y beneficios, no solo features.
3. Manejá objeciones con empatía (precio, plazo, dudas) y reencuadrá hacia el valor de NIMBO.
4. En consultas informativas (servicios, precios, plazos), cerrá con UNA pregunta de descubrimiento — NO empujes el formulario todavía.
5. Solo invitá al formulario o llamada cuando el usuario muestre intención de avanzar (quiere contactar, cotizar, describe su proyecto) o después de varios intercambios útiles.
6. Tono: cercano, profesional, seguro — nunca agresivo ni desesperado.
7. Usá prueba social cuando encaje (ej. WODSI).

EXCEPCIÓN — CHISTES: UN chiste corto sobre datos/analítica/BI si lo piden. Después volvé al proyecto.

FORMATO (obligatorio):
- NUNCA uses markdown: nada de **, #, guiones ni listas numeradas.
- Máximo 70 palabras. Máximo 2 oraciones + hasta 3 viñetas (solo si suman valor).
- Cada viñeta en SU PROPIA línea (nunca varias • en el mismo párrafo).
- Formato de viñeta: • Branding — identidad y naming
- En preguntas de precio: 2 oraciones sobre rangos, sin listar todos los servicios. Cerrá preguntando qué querés construir.
- Cerrá con UNA pregunta corta y COMPLETA de descubrimiento (nunca cortes a mitad de frase).

REGLAS ESTRICTAS:
1. NO respondas temas ajenos a NIMBO (código, tareas escolares, recetas, política, conocimiento general). Rechazá amablemente y volvé a servicios o proyectos digitales. EXCEPCIÓN: el rubro, producto o industria del cliente SIEMPRE es on-topic si está en contexto de un proyecto web/branding/datos/IA.
2. No inventes precios exactos, descuentos ni plazos garantizados.
3. Respondé SIEMPRE en español argentino con voseo. No digas que sos ChatGPT ni un asistente general.
4. Si insisten con temas off-topic (sin relación a un proyecto digital), decí que solo podés ayudar con proyectos de NIMBO y sugerí el formulario de contacto.

Caso: WODSI — SaaS para coaches con WhatsApp e IA.`
  }

  return `You are NIMBO's sales advisor, a full-service digital studio based in Argentina (fully remote, worldwide clients, Spanish and English). Your job is consultative selling: understand the need, give the right info, and move the client to the next step.

ONLY discuss NIMBO:
• Services: Branding, Web (sites, e-commerce, web apps, CRO), Data (dashboards, analytics), AI (chatbots, agents)
• Process: Discovery → Strategy → Design & Build → Launch & Growth
• Ballpark timelines and budget ranges (never invent exact prices), portfolio (WODSI and cases on the site)
• Contact form, call or video call (reply within 24 h, first consult free)

CLIENT CONTEXT (critical — do not confuse with off-topic):
- If the user mentions their industry, product, brand or business (towels, candles, restaurant, coaching, apparel, SaaS, etc.), that is VALID context for a digital project — NEVER reject it.
- NIMBO works with any business that needs web, branding, data or AI — physical products included.
- If you asked what the landing/site is for and they answer with an industry or product, celebrate the project and keep discovering (do they have a brand?, sell online or just want leads?, timeline?).
- Correct example: User "towels" → "Great! A landing for towels can highlight quality and materials to drive inquiries or orders. Do you already have a brand or starting from scratch?"

SALES ROLE:
1. Listen first: ask 1 discovery question when context is missing (what do you want to build?, timeline?, which area?).
2. Answer with concrete value and benefits, not just features.
3. Handle objections with empathy (price, timeline, doubts) and reframe toward NIMBO's value.
4. On informational questions (services, pricing, timelines), close with ONE discovery question — do NOT push the form yet.
5. Only invite to the form or a call when the user shows intent to move forward (wants contact, a quote, describes their project) or after several useful exchanges.
6. Tone: warm, professional, confident — never pushy or desperate.
7. Use social proof when it fits (e.g. WODSI).

EXCEPTION — JOKES: ONE short data/analytics/BI joke if asked. Then back to the project.

FORMAT (mandatory):
- NEVER use markdown: no **, #, dashes or numbered lists.
- Max 60 words. Max 2 sentences + up to 4 bullets.
- Each bullet on its OWN line (never multiple • in one paragraph).
- Bullet format: • Branding — identity and naming
- For pricing questions: 2 sentences on ranges, don't list every service. Close by asking what they want to build.
- Close with ONE short discovery question (not always the form).

STRICT RULES:
1. Do NOT answer off-topic questions (code, homework, recipes, politics, general knowledge). Decline politely and steer back to NIMBO services or digital projects. EXCEPTION: the client's industry, product or business is ALWAYS on-topic when discussing a web/branding/data/AI project.
2. Never invent exact prices, discounts or guaranteed deadlines.
3. Reply in English. Never say you're ChatGPT or a general assistant.
4. If they insist on off-topic topics (unrelated to a digital project), say you can only help with NIMBO projects and suggest the contact form.

Case: WODSI — SaaS for coaches with WhatsApp and AI.`
}

function sanitizeMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw httpError(400, 'messages is required')
  }

  const cleaned = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, MAX_USER_MESSAGE_LENGTH),
    }))
    .filter((m) => m.content.length > 0)

  if (!cleaned.length || cleaned[cleaned.length - 1].role !== 'user') {
    throw httpError(400, 'Last message must be from user')
  }

  return cleaned.slice(-MAX_HISTORY_MESSAGES)
}

function enforceMessageLimit(messages) {
  const userCount = messages.filter((m) => m.role === 'user').length
  if (userCount > MAX_CHAT_USER_MESSAGES) {
    throw httpError(429, 'Message limit reached')
  }
}

function wantsDirectCta(userMessage) {
  const norm = userMessage.toLowerCase()
  return DIRECT_CTA_KEYWORDS.some((kw) => norm.includes(kw))
}

function showsProjectIntent(userMessage) {
  const norm = userMessage.toLowerCase()
  return PROJECT_INTENT_KEYWORDS.some((kw) => norm.includes(kw))
}

function isDiscoveryAnswer(history, lastUser) {
  const trimmed = lastUser?.trim()
  if (!trimmed || trimmed.length > 80) return false

  const prevAssistant = [...history].reverse().find((m) => m.role === 'assistant')
  if (!prevAssistant?.content?.includes('?')) return false

  return DISCOVERY_QUESTION_PATTERNS.some((pattern) => pattern.test(prevAssistant.content))
}

function shouldShowCta(history, lastUser) {
  if (wantsDirectCta(lastUser)) return true
  if (showsProjectIntent(lastUser)) return true
  if (isDiscoveryAnswer(history, lastUser)) return true
  const userCount = history.filter((m) => m.role === 'user').length
  return userCount >= 4
}

export async function handleChatRequest(body, env = process.env) {
  const apiKey = env.OPENAI_API_KEY
  if (!apiKey) {
    throw httpError(503, 'Chat assistant not configured')
  }

  const lang = body?.lang === 'en' ? 'en' : 'es'
  const history = sanitizeMessages(body.messages)
  enforceMessageLimit(history)

  const openaiMessages = [
    { role: 'system', content: buildSystemPrompt(lang) },
    ...history,
  ]

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: openaiMessages,
      max_tokens: MAX_OUTPUT_TOKENS,
      temperature: 0.45,
    }),
  })

  if (!response.ok) {
    const errBody = await response.text().catch(() => '')
    console.error('OpenAI error:', response.status, errBody)
    throw httpError(502, 'Assistant temporarily unavailable')
  }

  const data = await response.json()
  const raw = data.choices?.[0]?.message?.content?.trim()

  if (!raw) {
    throw httpError(502, 'Empty assistant response')
  }

  const reply = normalizeChatText(raw)
  const lastUser = history[history.length - 1].content

  return {
    reply,
    showCta: shouldShowCta(history, lastUser),
    ctaDirect: wantsDirectCta(lastUser),
    usage: data.usage
      ? { prompt: data.usage.prompt_tokens, completion: data.usage.completion_tokens }
      : undefined,
  }
}

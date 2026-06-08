/* Matcher local de FAQs — sin API, sin costo. */

const INTENTS = [
  {
    id: 'services',
    keywords: [
      'servicio', 'servicios', 'hacen', 'hace', 'ofrecen', 'ofrece', 'que hacen',
      'service', 'services', 'what do you do', 'what you do', 'offer',
    ],
  },
  {
    id: 'branding',
    keywords: ['branding', 'marca', 'identidad', 'logo', 'naming', 'brand', 'identity'],
  },
  {
    id: 'web',
    keywords: [
      'web', 'sitio', 'pagina', 'página', 'ecommerce', 'e-commerce', 'tienda',
      'website', 'site', 'landing', 'shop', 'store',
    ],
  },
  {
    id: 'data',
    keywords: ['dato', 'datos', 'dashboard', 'analitica', 'analítica', 'reporte', 'data', 'analytics'],
  },
  {
    id: 'ai',
    keywords: [
      'ia', 'inteligencia artificial', 'chatbot', 'agente', 'automatizacion', 'automatización',
      'ai', 'artificial intelligence', 'agent', 'automation', 'bot',
    ],
  },
  {
    id: 'pricing',
    keywords: [
      'precio', 'precios', 'costo', 'costos', 'presupuesto', 'cuanto', 'cuánto', 'vale', 'tarifa',
      'price', 'pricing', 'cost', 'budget', 'how much', 'rate',
    ],
  },
  {
    id: 'process',
    keywords: [
      'proceso', 'como trabajan', 'cómo trabajan', 'metodo', 'método', 'pasos', 'etapas',
      'process', 'how do you work', 'workflow', 'steps',
    ],
  },
  {
    id: 'timeline',
    keywords: [
      'tiempo', 'plazo', 'plazos', 'demora', 'tarda', 'cuanto tarda', 'cuánto tarda', 'duracion', 'duración',
      'timeline', 'how long', 'deadline', 'duration', 'weeks', 'months',
    ],
  },
  {
    id: 'location',
    keywords: [
      'donde', 'dónde', 'ubicacion', 'ubicación', 'argentina', 'remoto', 'oficina', 'pais', 'país',
      'where', 'location', 'remote', 'based', 'office',
    ],
  },
  {
    id: 'portfolio',
    keywords: [
      'trabajo', 'trabajos', 'proyecto', 'proyectos', 'portfolio', 'portafolio', 'casos', 'wodsi',
      'work', 'projects', 'case studies', 'examples',
    ],
  },
  {
    id: 'about',
    keywords: [
      'quienes', 'quiénes', 'nosotros', 'estudio', 'equipo', 'nimbo', 'sobre ustedes',
      'who are you', 'about you', 'about us', 'team', 'studio',
    ],
  },
  {
    id: 'schedule',
    keywords: [
      'agendar', 'agenda', 'agendame', 'agendá', 'agendanos', 'agendános',
      'llamada', 'llamadas', 'llamar', 'me llaman', 'me llamen', 'por telefono', 'por teléfono',
      'videollamada', 'videollamadas', 'zoom', 'meet', 'google meet', 'cita', 'turno', 'coordinar',
      'schedule', 'book a call', 'book call', 'arrange a call', 'set up a call', 'video call',
      'phone call', 'speak with', 'talk to someone',
    ],
  },
  {
    id: 'contact',
    keywords: [
      'contacto', 'contactar', 'hablar', 'reunion', 'reunión', 'email', 'mail', 'consulta', 'escribir',
      'contact', 'talk', 'reach', 'quote', 'proposal', 'get in touch', 'write to',
    ],
  },
  {
    id: 'greeting',
    keywords: [
      'hola', 'buenas', 'buen dia', 'buen día', 'hey', 'que tal', 'qué tal', 'saludos',
      'hello', 'hi', 'good morning', 'good afternoon', 'hey there',
    ],
  },
]

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
}

export function matchFaq(message) {
  const norm = normalize(message)
  if (!norm.trim()) return 'fallback'

  let best = { id: 'fallback', score: 0 }

  for (const intent of INTENTS) {
    let score = 0
    for (const kw of intent.keywords) {
      const nkw = normalize(kw)
      if (nkw.includes(' ') ? norm.includes(nkw) : new RegExp(`\\b${nkw}\\b`).test(norm)) {
        score += nkw.includes(' ') ? 3 : 1
      }
    }
    if (score > best.score) best = { id: intent.id, score }
  }

  return best.score > 0 ? best.id : 'fallback'
}

export const SUGGESTIONS = ['services', 'pricing', 'schedule', 'contact']

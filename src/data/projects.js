/* ============================================================
   NIMBO — proyectos del portfolio.
   Editá este archivo y pusheá; Vercel redeploya automáticamente.

   Campos:
   - slug:      identificador en la URL (/trabajos/<slug>)
   - title, client, year
   - cover:     imagen de portada en /public (o null → placeholder)
   - gallery:   imágenes de la página de detalle (rutas en /public)
   - live:      URL del proyecto vivo (o null → "Próximamente")
   - category / summary / description / placeholder: objetos { es, en }
     · summary  = una línea para la tarjeta
     · description = array de párrafos para la página de detalle
   - services:  qué hicimos (array de strings)
   - tags:      stack técnico (array de strings)
   ============================================================ */
export const PROJECTS = [
  {
    slug: 'wodsi',
    title: 'WODSI',
    client: 'WODSI',
    year: '2025',
    cover: '/wodsi-cover.png',
    gallery: ['/wodsi-cover.png'],
    live: 'https://wodsi.com.ar/',
    category: { es: 'Aplicación SaaS', en: 'SaaS App' },
    summary: {
      es: 'Plataforma para coaches: gestión de atletas, planificación y automatización por WhatsApp.',
      en: 'Platform for coaches: athlete management, scheduling and WhatsApp automation.',
    },
    description: {
      es: [
        'WODSI es una plataforma SaaS para coaches y entrenadores: centraliza la gestión de atletas, la planificación semanal de entrenamientos y la comunicación, todo en un solo lugar.',
        'Diseñamos y construimos el producto de punta a punta —interfaz, base de datos y automatizaciones— integrando WhatsApp para que el seguimiento de cada atleta sea automático y sin fricción.',
      ],
      en: [
        'WODSI is a SaaS platform for coaches and trainers: it centralizes athlete management, weekly workout scheduling and communication, all in one place.',
        'We designed and built the product end to end —interface, database and automations— integrating WhatsApp so that follow-up with each athlete is automatic and frictionless.',
      ],
    },
    services: ['Producto digital', 'Web App', 'Automatización', 'IA'],
    tags: ['React', 'Firebase', 'WhatsApp API', 'IA'],
    placeholder: { es: 'captura de la app WODSI', en: 'WODSI app screenshot' },
  },
  {
    slug: 'psifrantadioli',
    title: 'psi.frantadioli',
    client: 'Francisca Dioli',
    year: '2026',
    cover: '/psifrantadioli-cover.png',
    gallery: ['/psifrantadioli-hero.png', '/psifrantadioli-cover.png'],
    live: 'https://www.psifrantadioli.com/',
    category: { es: 'Web · Salud', en: 'Web · Health' },
    summary: {
      es: 'Sitio para psicóloga: contención, turnos online y presencia profesional en mobile.',
      en: 'Psychologist website: emotional care, online booking and a professional mobile presence.',
    },
    description: {
      es: [
        'Sitio web para Francisca Dioli, psicóloga: un espacio digital de contención y bienestar profesional, con identidad cálida y clara.',
        'Diseñamos y desarrollamos la experiencia mobile-first —hero, servicios, testimonios y flujo de agendamiento de turnos— pensada para convertir visitas en primeras sesiones.',
      ],
      en: [
        'Website for Francisca Dioli, psychologist: a digital space for emotional care and professional wellbeing, with a warm and clear identity.',
        'We designed and built a mobile-first experience —hero, services, testimonials and appointment booking— built to turn visits into first sessions.',
      ],
    },
    services: ['Diseño web', 'UI/UX', 'Desarrollo', 'CRO'],
    tags: ['React', 'UI/UX', 'Mobile-first', 'Agendamiento'],
    placeholder: { es: 'captura del sitio psi.frantadioli', en: 'psi.frantadioli site screenshot' },
  },
  {
    slug: 'velas-artesanales',
    title: 'M.e.H',
    client: 'Velas artesanales',
    year: '2026',
    cover: '/meh-velas-cover.png',
    gallery: ['/meh-velas-cover.png'],
    live: null,
    category: { es: 'Branding · Producto', en: 'Branding · Product' },
    summary: {
      es: 'Identidad y packaging para velas de cera de soja 100% naturales — estética artesanal y premium.',
      en: 'Identity and packaging for 100% natural soy wax candles — artisan and premium aesthetic.',
    },
    description: {
      es: [
        'M.e.H es una marca de velas artesanales de cera de soja, 100% naturales. Diseñamos la identidad visual completa: logotipo, etiquetas, paleta y dirección de arte para un producto que se siente hecho a mano y cuidado.',
        'La estética combina minimalismo cálido —ilustración de cerezo en acuarela, tipografía serif elegante y tonos crema y rosa suave— pensada para destacar en fotografía de producto y en punto de venta.',
      ],
      en: [
        'M.e.H is a handmade brand of 100% natural soy wax candles. We designed the full visual identity: logo, labels, palette and art direction for a product that feels handcrafted and cared for.',
        'The aesthetic blends warm minimalism —watercolor cherry blossom illustration, elegant serif typography and soft cream and pink tones— built to stand out in product photography and at point of sale.',
      ],
    },
    services: ['Branding', 'Packaging', 'Dirección de arte'],
    tags: ['Branding', 'Packaging', 'Producto', 'Artesanal'],
    placeholder: { es: 'foto de producto / packaging', en: 'product photo / packaging' },
  },
  {
    slug: 'dashboard-a-medida',
    title: 'Dashboard a medida',
    client: 'Salas de juego',
    year: '2026',
    cover: '/dashboard-cover.png',
    gallery: ['/dashboard-cover.png'],
    live: 'https://app.nimbodata.com/',
    category: { es: 'Datos · Dashboards', en: 'Data · Dashboards' },
    summary: {
      es: 'Panel con métricas del negocio en tiempo real: clientes, retención, ritmo por sala y alertas accionables.',
      en: 'Panel with real-time business metrics: customers, retention, pace by venue and actionable alerts.',
    },
    description: {
      es: [
        'Un dashboard conectado a los datos operativos del negocio. KPIs clave —fidelización, clientes activos, retención, ritmo del mes— visibles de un vistazo, con filtros por sala o unidad.',
        'Incluye alertas automáticas (clientes dormidos, comparativas entre salas), desglose por ubicación con sparklines de evolución y datos actualizados en tiempo real desde la base existente.',
      ],
      en: [
        'A dashboard connected to the business operational data. Key KPIs —loyalty, active customers, retention, monthly pace— visible at a glance, with filters by venue or unit.',
        'Includes automatic alerts (dormant customers, cross-venue comparisons), breakdown by location with trend sparklines and data updated in real time from the existing database.',
      ],
    },
    services: ['Dashboards', 'Analítica', 'Datos', 'Automatización'],
    tags: ['Dashboards', 'KPIs', 'Analítica', 'Tiempo real'],
    placeholder: { es: 'dashboard / gráfico de datos', en: 'dashboard / data chart' },
  },
  {
    slug: 'asistente-ia',
    title: 'Asistente con IA',
    client: 'Salas de juego',
    year: '2026',
    cover: '/nimbo-chatbot-cover.png',
    gallery: ['/nimbo-chatbot-cover.png', '/nimbo-chatbot-response.png'],
    live: 'https://app.nimbodata.com/',
    category: { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
    summary: {
      es: 'Chatbot conectado a los datos del negocio: preguntás en lenguaje natural y la IA responde con gráficos y números reales.',
      en: 'Chatbot connected to your business data: ask in natural language and the AI answers with charts and real numbers.',
    },
    description: {
      es: [
        'Un asistente con IA conectado directamente a la base de datos del negocio. Cualquier persona del equipo puede hacer preguntas reales —ventas, rendimiento, clientes, comparativas— en español, sin saber SQL ni depender de IT.',
        'La IA interpreta la consulta, genera la query correcta y devuelve la respuesta con gráficos, tablas y KPIs en tiempo real. Incluye historial de conversaciones, exportación a Excel/CSV y acceso controlado por organización.',
      ],
      en: [
        'An AI assistant connected directly to the business database. Anyone on the team can ask real questions —sales, performance, customers, comparisons— in plain language, without SQL or IT dependency.',
        'The AI interprets the query, generates the correct SQL and returns the answer with charts, tables and real-time KPIs. Includes conversation history, Excel/CSV export and organization-controlled access.',
      ],
    },
    services: ['Agentes IA', 'Chatbots', 'Datos', 'Integraciones'],
    tags: ['Text-to-SQL', 'Chatbots', 'Dashboards', 'IA'],
    placeholder: { es: 'interfaz de chat / agente IA', en: 'chat interface / AI agent' },
  },
]

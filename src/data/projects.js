/* ============================================================
   NIMBO — proyectos del portfolio (fallback / seed local).
   Esta es la MISMA forma que entrega Strapi (ver src/lib/cms.js).
   Si Strapi está disponible (VITE_STRAPI_URL), la web lee de ahí;
   si no, usa este archivo. Para editar sin CMS, tocá este array.

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
    cover: null,
    gallery: [],
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
    slug: 'proximo-sitio',
    title: 'Tu próximo sitio',
    client: 'Reservado',
    year: '2026',
    cover: null,
    gallery: [],
    live: null,
    category: { es: 'Web · E-commerce', en: 'Web · E-commerce' },
    summary: {
      es: 'Un sitio o tienda que carga rápido y convierte visitas en clientes.',
      en: 'A fast site or store that turns visits into customers.',
    },
    description: {
      es: ['Espacio reservado para tu próximo proyecto web. Reemplazá este contenido desde Strapi cuando esté listo.'],
      en: ['Reserved for your next web project. Replace this content from Strapi when ready.'],
    },
    services: ['Diseño web', 'Desarrollo', 'CRO', 'SEO'],
    tags: ['Next.js', 'UI/UX', 'CRO', 'SEO'],
    placeholder: { es: 'mockup de sitio / e-commerce', en: 'site / e-commerce mockup' },
  },
  {
    slug: 'dashboard-a-medida',
    title: 'Dashboard a medida',
    client: 'Reservado',
    year: '2026',
    cover: null,
    gallery: [],
    live: null,
    category: { es: 'Datos · Dashboards', en: 'Data · Dashboards' },
    summary: {
      es: 'Paneles que convierten números dispersos en decisiones.',
      en: 'Dashboards that turn scattered numbers into decisions.',
    },
    description: {
      es: ['Espacio reservado para un caso de datos. Métricas en vivo, alertas y reporting automático.'],
      en: ['Reserved for a data case study. Live metrics, alerts and automated reporting.'],
    },
    services: ['Dashboards', 'Analítica', 'Automatización'],
    tags: ['Dashboards', 'Analítica', 'Automatización'],
    placeholder: { es: 'dashboard / gráfico de datos', en: 'dashboard / data chart' },
  },
  {
    slug: 'asistente-ia',
    title: 'Asistente con IA',
    client: 'Reservado',
    year: '2026',
    cover: null,
    gallery: [],
    live: null,
    category: { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
    summary: {
      es: 'Agentes y chatbots a medida que atienden y automatizan 24/7.',
      en: 'Custom agents and chatbots that serve and automate 24/7.',
    },
    description: {
      es: ['Espacio reservado para un caso de IA: agentes, chatbots e integraciones a medida.'],
      en: ['Reserved for an AI case study: custom agents, chatbots and integrations.'],
    },
    services: ['Agentes IA', 'Chatbots', 'Integraciones'],
    tags: ['Agentes IA', 'Chatbots', 'Integraciones'],
    placeholder: { es: 'interfaz de chat / agente IA', en: 'chat interface / AI agent' },
  },
]

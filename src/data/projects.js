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
   - type:      qué es ("App · SaaS", "Sitio web", "Agente de IA"…) — etiqueta visible
   - areas:     filtros de /proyectos (Apps y plataformas, Webs, Automatización,
                IA y agentes, Datos, Visión, Marketing)
   - status:    texto opcional cuando no hay link en vivo ("En desarrollo"…)
   - isNew:     muestra la etiqueta Nuevo
   ============================================================ */
export const PROJECTS = [
  {
    "slug": "nimbo-display",
    "title": "Nimbo Display",
    "client": "Producto propio de Nimbo",
    "year": "2026",
    "cover": "/proyectos/nimbo-display.jpg",
    "live": null,
    "status": "Online · demo a pedido",
    "category": {
      "es": "Cartelería digital",
      "en": "Cartelería digital"
    },
    "summary": {
      "es": "Manejá qué se ve en cada pantalla de cada sucursal desde un solo panel, aunque se corte internet.",
      "en": "Manejá qué se ve en cada pantalla de cada sucursal desde un solo panel, aunque se corte internet."
    },
    "description": {
      "es": [
        "Panel web para administrar imágenes, videos, playlists y campañas con horarios por pantalla y sucursal, con estado en vivo de cada dispositivo. El reproductor guarda el contenido localmente y sigue funcionando sin conexión."
      ],
      "en": [
        "Panel web para administrar imágenes, videos, playlists y campañas con horarios por pantalla y sucursal, con estado en vivo de cada dispositivo. El reproductor guarda el contenido localmente y sigue funcionando sin conexión."
      ]
    },
    "services": [
      "Producto digital",
      "Automatización",
      "Web App"
    ],
    "tags": [
      "SaaS",
      "Android",
      "Offline-first"
    ],
    "type": "App · SaaS propio",
    "areas": [
      "Apps y plataformas",
      "Automatización"
    ],
    "gallery": [
      "/proyectos/nimbo-display.jpg"
    ]
  },
  {
    "slug": "wodsi",
    "title": "WODSI",
    "client": "WODSI",
    "year": "2025",
    "cover": "/wodsi-cover.jpg",
    "gallery": [
      "/wodsi-cover.jpg"
    ],
    "live": "https://wodsi.com.ar/",
    "category": {
      "es": "Aplicación SaaS",
      "en": "SaaS App"
    },
    "summary": {
      "es": "Plataforma para coaches: gestión de atletas, planificación y automatización por WhatsApp.",
      "en": "Platform for coaches: athlete management, scheduling and WhatsApp automation."
    },
    "description": {
      "es": [
        "WODSI es una plataforma SaaS para coaches y entrenadores: centraliza la gestión de atletas, la planificación semanal de entrenamientos y la comunicación, todo en un solo lugar.",
        "Diseñamos y construimos el producto de punta a punta —interfaz, base de datos y automatizaciones— integrando WhatsApp para que el seguimiento de cada atleta sea automático y sin fricción."
      ],
      "en": [
        "WODSI is a SaaS platform for coaches and trainers: it centralizes athlete management, weekly workout scheduling and communication, all in one place.",
        "We designed and built the product end to end —interface, database and automations— integrating WhatsApp so that follow-up with each athlete is automatic and frictionless."
      ]
    },
    "services": [
      "Producto digital",
      "Web App",
      "Automatización",
      "IA"
    ],
    "tags": [
      "React",
      "Firebase",
      "WhatsApp API",
      "IA"
    ],
    "placeholder": {
      "es": "captura de la app WODSI",
      "en": "WODSI app screenshot"
    },
    "type": "App · SaaS",
    "areas": [
      "Apps y plataformas",
      "Automatización",
      "IA y agentes"
    ]
  },
  {
    "slug": "analitica-video",
    "title": "Analítica de video",
    "client": "Salas de entretenimiento",
    "year": "2026",
    "cover": "/proyectos/analitica-video.jpg",
    "live": null,
    "status": "En desarrollo",
    "isNew": true,
    "category": {
      "es": "Visión por computadora",
      "en": "Visión por computadora"
    },
    "summary": {
      "es": "IA sobre las cámaras que ya existen: conteo de personas, recorridos, mapas de calor y ocupación por zona.",
      "en": "IA sobre las cámaras que ya existen: conteo de personas, recorridos, mapas de calor y ocupación por zona."
    },
    "description": {
      "es": [
        "Detectamos y seguimos personas en las cámaras IP del local para medir entradas y salidas, permanencia y zonas calientes. Sin guardar video y sin reconocimiento facial."
      ],
      "en": [
        "Detectamos y seguimos personas en las cámaras IP del local para medir entradas y salidas, permanencia y zonas calientes. Sin guardar video y sin reconocimiento facial."
      ]
    },
    "services": [
      "Visión por computadora",
      "Datos",
      "Dashboards"
    ],
    "tags": [
      "YOLO",
      "Tracking",
      "Mapas de calor"
    ],
    "type": "Sistema a medida",
    "areas": [
      "Visión",
      "Datos"
    ],
    "gallery": [
      "/proyectos/analitica-video.jpg"
    ]
  },
  {
    "slug": "marketing-automatico",
    "title": "Marketing automático",
    "client": "Sistema propio de Nimbo",
    "year": "2026",
    "cover": "/proyectos/marketing.jpg",
    "live": null,
    "status": "En uso",
    "category": {
      "es": "Sistema de agentes",
      "en": "Sistema de agentes"
    },
    "summary": {
      "es": "Agentes que producen el contenido de la marca solos: reels, carruseles y artículos de blog, listos para aprobar y publicar.",
      "en": "Agentes que producen el contenido de la marca solos: reels, carruseles y artículos de blog, listos para aprobar y publicar."
    },
    "description": {
      "es": [
        "Un equipo de agentes planifica el calendario, escribe guiones y textos, genera los creativos y arma reels animados en video. Cada pieza queda lista para revisar y aprobar, y el blog se actualiza solo cada semana."
      ],
      "en": [
        "Un equipo de agentes planifica el calendario, escribe guiones y textos, genera los creativos y arma reels animados en video. Cada pieza queda lista para revisar y aprobar, y el blog se actualiza solo cada semana."
      ]
    },
    "services": [
      "Agentes IA",
      "Automatización",
      "Contenido"
    ],
    "tags": [
      "Reels",
      "Calendario",
      "Blog"
    ],
    "type": "Sistema de agentes",
    "areas": [
      "Marketing",
      "IA y agentes",
      "Automatización"
    ],
    "gallery": [
      "/proyectos/marketing.jpg"
    ]
  },
  {
    "slug": "psifrantadioli",
    "title": "psi.frantadioli",
    "client": "Francisca Dioli",
    "year": "2026",
    "cover": "/psifrantadioli-cover.jpg",
    "gallery": [
      "/psifrantadioli-hero.jpg",
      "/psifrantadioli-cover.jpg"
    ],
    "live": "https://www.psifrantadioli.com/",
    "category": {
      "es": "Web · Salud",
      "en": "Web · Health"
    },
    "summary": {
      "es": "Sitio para psicóloga: contención, turnos online y presencia profesional en mobile.",
      "en": "Psychologist website: emotional care, online booking and a professional mobile presence."
    },
    "description": {
      "es": [
        "Sitio web para Francisca Dioli, psicóloga: un espacio digital de contención y bienestar profesional, con identidad cálida y clara.",
        "Diseñamos y desarrollamos la experiencia mobile-first —hero, servicios, testimonios y flujo de agendamiento de turnos— pensada para convertir visitas en primeras sesiones."
      ],
      "en": [
        "Website for Francisca Dioli, psychologist: a digital space for emotional care and professional wellbeing, with a warm and clear identity.",
        "We designed and built a mobile-first experience —hero, services, testimonials and appointment booking— built to turn visits into first sessions."
      ]
    },
    "services": [
      "Diseño web",
      "UI/UX",
      "Desarrollo",
      "CRO"
    ],
    "tags": [
      "React",
      "UI/UX",
      "Mobile-first",
      "Agendamiento"
    ],
    "placeholder": {
      "es": "captura del sitio psi.frantadioli",
      "en": "psi.frantadioli site screenshot"
    },
    "type": "Sitio web",
    "areas": [
      "Webs"
    ]
  },
  {
    "slug": "tour360",
    "title": "Recorridos 360",
    "client": "Producto propio de Nimbo",
    "year": "2026",
    "cover": "/proyectos/tour360.jpg",
    "live": null,
    "status": "Online · demo a pedido",
    "category": {
      "es": "Recorridos virtuales",
      "en": "Recorridos virtuales"
    },
    "summary": {
      "es": "Recorridos virtuales navegables con fotos 360, listos para embeber en cualquier web.",
      "en": "Recorridos virtuales navegables con fotos 360, listos para embeber en cualquier web."
    },
    "description": {
      "es": [
        "Subís las fotos 360 desde el celular y se arma un recorrido con flechas entre ambientes, etiquetas y plano del lugar. Se integra en tu sitio con una línea de código."
      ],
      "en": [
        "Subís las fotos 360 desde el celular y se arma un recorrido con flechas entre ambientes, etiquetas y plano del lugar. Se integra en tu sitio con una línea de código."
      ]
    },
    "services": [
      "Producto digital",
      "Web App"
    ],
    "tags": [
      "360",
      "Embebible",
      "Mobile"
    ],
    "type": "App · Producto propio",
    "areas": [
      "Apps y plataformas",
      "Webs"
    ],
    "gallery": [
      "/proyectos/tour360.jpg"
    ]
  },
  {
    "slug": "asistente-ia",
    "title": "Asistente con IA",
    "client": "Salas de juego",
    "year": "2026",
    "cover": "/nimbo-chatbot-cover.jpg",
    "gallery": [
      "/nimbo-chatbot-cover.jpg",
      "/nimbo-chatbot-response.jpg"
    ],
    "live": "https://app.nimbodata.com/",
    "category": {
      "es": "Inteligencia Artificial",
      "en": "Artificial Intelligence"
    },
    "summary": {
      "es": "Chatbot conectado a los datos del negocio: preguntás en lenguaje natural y la IA responde con gráficos y números reales.",
      "en": "Chatbot connected to your business data: ask in natural language and the AI answers with charts and real numbers."
    },
    "description": {
      "es": [
        "Un asistente con IA conectado directamente a la base de datos del negocio. Cualquier persona del equipo puede hacer preguntas reales —ventas, rendimiento, clientes, comparativas— en español, sin saber SQL ni depender de IT.",
        "La IA interpreta la consulta, genera la query correcta y devuelve la respuesta con gráficos, tablas y KPIs en tiempo real. Incluye historial de conversaciones, exportación a Excel/CSV y acceso controlado por organización."
      ],
      "en": [
        "An AI assistant connected directly to the business database. Anyone on the team can ask real questions —sales, performance, customers, comparisons— in plain language, without SQL or IT dependency.",
        "The AI interprets the query, generates the correct SQL and returns the answer with charts, tables and real-time KPIs. Includes conversation history, Excel/CSV export and organization-controlled access."
      ]
    },
    "services": [
      "Agentes IA",
      "Chatbots",
      "Datos",
      "Integraciones"
    ],
    "tags": [
      "Text-to-SQL",
      "Chatbots",
      "Dashboards",
      "IA"
    ],
    "placeholder": {
      "es": "interfaz de chat / agente IA",
      "en": "chat interface / AI agent"
    },
    "type": "Agente de IA",
    "areas": [
      "IA y agentes",
      "Datos"
    ]
  },
  {
    "slug": "dashboard-a-medida",
    "title": "Dashboard a medida",
    "client": "Salas de juego",
    "year": "2026",
    "cover": "/dashboard-cover.jpg",
    "gallery": [
      "/dashboard-cover.jpg"
    ],
    "live": "https://app.nimbodata.com/",
    "category": {
      "es": "Datos · Dashboards",
      "en": "Data · Dashboards"
    },
    "summary": {
      "es": "Panel con métricas del negocio en tiempo real: clientes, retención, ritmo por sala y alertas accionables.",
      "en": "Panel with real-time business metrics: customers, retention, pace by venue and actionable alerts."
    },
    "description": {
      "es": [
        "Un dashboard conectado a los datos operativos del negocio. KPIs clave —fidelización, clientes activos, retención, ritmo del mes— visibles de un vistazo, con filtros por sala o unidad.",
        "Incluye alertas automáticas (clientes dormidos, comparativas entre salas), desglose por ubicación con sparklines de evolución y datos actualizados en tiempo real desde la base existente."
      ],
      "en": [
        "A dashboard connected to the business operational data. Key KPIs —loyalty, active customers, retention, monthly pace— visible at a glance, with filters by venue or unit.",
        "Includes automatic alerts (dormant customers, cross-venue comparisons), breakdown by location with trend sparklines and data updated in real time from the existing database."
      ]
    },
    "services": [
      "Dashboards",
      "Analítica",
      "Datos",
      "Automatización"
    ],
    "tags": [
      "Dashboards",
      "KPIs",
      "Analítica",
      "Tiempo real"
    ],
    "placeholder": {
      "es": "dashboard / gráfico de datos",
      "en": "dashboard / data chart"
    },
    "type": "Dashboard a medida",
    "areas": [
      "Datos"
    ]
  },
  {
    "slug": "nimbo-tax",
    "title": "Nimbo Tax",
    "client": "Producto propio de Nimbo",
    "year": "2026",
    "cover": "/proyectos/nimbo-tax.jpg",
    "live": "https://tax.nimbodata.com",
    "status": "En pruebas",
    "category": {
      "es": "Facturación automática",
      "en": "Facturación automática"
    },
    "summary": {
      "es": "Facturación para monotributistas conectada a ARCA, con facturas recurrentes que se mandan solas.",
      "en": "Facturación para monotributistas conectada a ARCA, con facturas recurrentes que se mandan solas."
    },
    "description": {
      "es": [
        "Emite Factura C y notas de crédito, programa facturas mensuales recurrentes y se las envía por mail a cada cliente. Varias cuentas y acceso con Google."
      ],
      "en": [
        "Emite Factura C y notas de crédito, programa facturas mensuales recurrentes y se las envía por mail a cada cliente. Varias cuentas y acceso con Google."
      ]
    },
    "services": [
      "Producto digital",
      "Automatización"
    ],
    "tags": [
      "ARCA",
      "Facturación",
      "SaaS"
    ],
    "type": "App · SaaS propio",
    "areas": [
      "Apps y plataformas",
      "Automatización"
    ],
    "gallery": [
      "/proyectos/nimbo-tax.jpg"
    ]
  },
  {
    "slug": "gestion-agro",
    "title": "Gestión agropecuaria",
    "client": "Establecimiento ovino",
    "year": "2026",
    "cover": "/proyectos/gestion-agro.jpg",
    "live": null,
    "status": "Online · uso privado",
    "category": {
      "es": "Web App · Datos",
      "en": "Web App · Datos"
    },
    "summary": {
      "es": "App para el campo: animales, sanidad, lluvias, clima, tareas y stock de alimento en un solo lugar.",
      "en": "App para el campo: animales, sanidad, lluvias, clima, tareas y stock de alimento en un solo lugar."
    },
    "description": {
      "es": [
        "Registro de producción, reproducción y sanidad de la majada, lluvias y pronóstico, tareas y stock, con permisos por campo. La migramos a servidor propio conservando todos los datos."
      ],
      "en": [
        "Registro de producción, reproducción y sanidad de la majada, lluvias y pronóstico, tareas y stock, con permisos por campo. La migramos a servidor propio conservando todos los datos."
      ]
    },
    "services": [
      "Web App",
      "Datos",
      "Migración"
    ],
    "tags": [
      "React",
      "Clima",
      "Roles"
    ],
    "type": "App web",
    "areas": [
      "Apps y plataformas",
      "Datos"
    ],
    "gallery": [
      "/proyectos/gestion-agro.jpg"
    ]
  },
  {
    "slug": "prospeccion-ia",
    "title": "Prospección con agentes",
    "client": "Sistema interno de Nimbo",
    "year": "2026",
    "cover": "/proyectos/prospeccion.jpg",
    "live": null,
    "status": "Sistema interno",
    "category": {
      "es": "Agentes IA · Automatización",
      "en": "Agentes IA · Automatización"
    },
    "summary": {
      "es": "Agentes que encuentran negocios, diagnostican su web y generan una propuesta personalizada lista para enviar.",
      "en": "Agentes que encuentran negocios, diagnostican su web y generan una propuesta personalizada lista para enviar."
    },
    "description": {
      "es": [
        "Un equipo de agentes busca negocios por rubro, analiza su presencia digital, arma una landing a medida con sus datos reales y prepara el mensaje, que una persona aprueba antes de enviarse."
      ],
      "en": [
        "Un equipo de agentes busca negocios por rubro, analiza su presencia digital, arma una landing a medida con sus datos reales y prepara el mensaje, que una persona aprueba antes de enviarse."
      ]
    },
    "services": [
      "Agentes IA",
      "Automatización",
      "Web"
    ],
    "tags": [
      "Multi-agente",
      "Landings",
      "Aprobación humana"
    ],
    "type": "Sistema de agentes",
    "areas": [
      "IA y agentes",
      "Automatización",
      "Marketing"
    ],
    "gallery": [
      "/proyectos/prospeccion.jpg"
    ]
  }
]

// Contenido del sitio nuevo: home y una página por servicio, con proyectos reales de Nimbo como ejemplos
// (src/data/projects.js del sitio). Las imágenes están copiadas en public/.

export const WA = 'https://wa.me/5491124036836?text=' + encodeURIComponent('¡Hola! Vi el sitio de Nimbo y quiero contarles un proceso de mi empresa.')
export const PROYECTOS_URL = '/proyectos'

// `url` solo en los que tienen ficha en nimbodata.com/proyectos; los mockups de apps (public/mockups) no
const P = {
  locales: { t: 'Panel y bot para varios locales', client: 'Salas de entretenimiento',
    imgs: [['Hoy', '/mockups/panel-hoy.jpg'], ['Calendario', '/mockups/calendario.jpg'], ['Bot', '/mockups/bot-whatsapp.jpg']],
    d: 'Un solo panel para todos los locales: lo que hay que hacer hoy, el calendario de eventos, métricas, pauta y el bot de WhatsApp. Se usa igual en la compu y en el celular.' },
  derivaciones: { t: 'Bot de WhatsApp con derivaciones', client: 'Salas de entretenimiento',
    imgs: [['Bot', '/mockups/bot-whatsapp.jpg'], ['Derivaciones', '/mockups/derivaciones.jpg'], ['En el celular', '/mockups/bot-celular.jpg']],
    d: 'Atiende las consultas de varios locales a cualquier hora. Lo que no sabe responder se lo pasa al equipo con un resumen, y cada uno la toma o la marca resuelta desde el panel.' },
  reencuentro: { t: 'El Reencuentro', client: 'App de ventas para un productor',
    imgs: [['App', '/mockups/el-reencuentro.jpg']],
    d: 'Vender, encargos y fiado desde el celular, en dos toques. Muestra qué encargos hay en la semana, si alcanza el stock para cumplirlos y quién debe cuánto.' },
  asistente: { slug: 'asistente-ia', url: true, t: 'Asistente con IA', client: 'Salas de juego', imgs: [['Chat', '/nimbo-chatbot-cover.jpg'], ['Respuesta con gráficos', '/nimbo-chatbot-response.jpg']],
    d: 'Un chat conectado a los datos del negocio: el gerente pregunta en lenguaje natural y la IA responde con números y gráficos reales, sin SQL ni pedirle nada al equipo técnico.' },
  prospeccion: { slug: 'prospeccion-ia', url: true, t: 'Prospección con agentes', client: 'Sistema interno de Nimbo', imgs: [['Panel', '/proyectos/prospeccion.jpg']],
    d: 'Agentes que encuentran negocios, revisan su web y arman una propuesta personalizada lista para mandar. Una persona aprueba antes de que salga.' },
  marketing: { slug: 'marketing-automatico', url: true, t: 'Marketing automático', client: 'Sistema propio de Nimbo', imgs: [['Contenido', '/proyectos/marketing.jpg']],
    d: 'Agentes que producen reels, carruseles y artículos de blog con la voz de la marca, listos para aprobar y publicar.' },
  mandarina: { slug: 'mandarina', url: true, t: 'Mandarina', client: 'Producto propio de Nimbo',
    imgs: [['Calendario', '/proyectos/mandarina-calendario.jpg'], ['Mandi', '/proyectos/mandarina-mandi.jpg']],
    d: 'Gestor de redes sociales con IA: el calendario de todas las marcas en un lugar y Mandi, un asistente que encuentra huecos, propone piezas y arma los informes.' },
  dashboard: { slug: 'dashboard-a-medida', url: true, t: 'Dashboard a medida', client: 'Salas de juego', imgs: [['Tablero', '/dashboard-cover.jpg']],
    d: 'Métricas del negocio en tiempo real: clientes, retención, ritmo por sala y alertas que dicen qué hacer, no solo qué pasó.' },
  video: { slug: 'analitica-video', url: true, t: 'Analítica de video', client: 'Salas de entretenimiento', imgs: [['Cámaras', '/proyectos/analitica-video-v2.jpg']],
    d: 'IA sobre las cámaras que ya estaban instaladas: cuenta personas, arma mapas de calor y mide la ocupación por zona y por hora.' },
  agro: { slug: 'gestion-agro', url: true, t: 'Gestión agropecuaria', client: 'Establecimiento ovino', imgs: [['App', '/proyectos/gestion-agro.jpg']],
    d: 'Animales, sanidad, lluvias, clima, tareas y stock de alimento en una app que el equipo usa todos los días desde el campo.' },
  wodsi: { slug: 'wodsi', url: true, t: 'WODSI', client: 'Coaches y boxes', imgs: [['Plataforma', '/wodsi-cover.jpg']],
    d: 'Plataforma para coaches: gestión de atletas, planificación de entrenamientos y avisos automáticos por WhatsApp.' },
  display: { slug: 'nimbo-display', url: true, t: 'Nimbo Display', client: 'Producto propio de Nimbo', imgs: [['Panel', '/proyectos/nimbo-display.jpg']],
    d: 'Cartelería digital: qué se ve en cada pantalla de cada sucursal, desde un solo panel y aunque se corte internet.' },
}

export const PASOS_SERVICIO = [
  ['Una charla de 20 minutos', 'Qué se hace hoy, quién lo hace y dónde se traba. Sin cargo y sin compromiso.'],
  ['Una propuesta por escrito', 'Qué incluye, la puesta en marcha, el abono mensual y los tiempos. Antes de arrancar.'],
  ['Entregas por partes', 'Empezamos por lo que más te duele. Cada semana ves algo funcionando y lo probás con tu equipo.'],
  ['Puesta en marcha', 'Lo dejamos andando con tu equipo y lo seguimos ajustando con el uso real.'],
]

export const AREAS = [
  {
    slug: 'agentes-de-ia', fig: 'agentes',
    icon: 'M7 4h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-6l-4 3.5V17a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z M8.5 9.5h7 M8.5 12.5h4',
    t: 'Agentes de IA',
    d: 'Atienden WhatsApp e Instagram a cualquier hora, toman pedidos y turnos, y te avisan cuando hace falta una persona.',
    checks: ['Turnos y pedidos sin estar pegado al celular', 'Asistentes internos para tu equipo'],
    page: {
      title: 'Agentes de IA que atienden por vos.',
      lead: 'Responden WhatsApp e Instagram a cualquier hora, toman pedidos y turnos, y te pasan la conversación cuando hace falta una persona.',
      resolvemos: 'Un agente que conoce tu negocio: precios, horarios, stock y políticas. Atiende en los canales que ya usás y deja todo registrado. Si le preguntan algo que no sabe, avisa a tu equipo en vez de inventar.',
      tags: ['WhatsApp', 'Instagram', 'Turnos', 'Pedidos', 'Asistente interno'],
      ejemplos: [P.derivaciones, P.asistente, P.prospeccion],
      para: [
        ['Comercios que venden por chat', 'Las mismas preguntas todo el día y los pedidos se pierden entre conversaciones.'],
        ['Consultorios y servicios con turnos', 'La agenda depende de que alguien conteste el teléfono a tiempo.'],
        ['Equipos que buscan información', 'Para saber un número hay que pedírselo a quien arma el Excel.'],
      ],
      negocios: [
        ['Distribuidora', 'El cliente pide por WhatsApp a las 23 h. El agente confirma precio y stock, arma el pedido y lo deja cargado para que lo preparen a la mañana.'],
        ['Consultorio', 'El paciente escribe para sacar turno. El agente ofrece los horarios libres, agenda, manda el recordatorio el día anterior y reprograma si cancela.'],
        ['Locales de entretenimiento', 'Preguntan por eventos, promos y reservas a la madrugada. El bot responde con la información de cada local y lo que no sabe queda como derivación para el equipo a la mañana.'],
      ],
      precio: 'Una puesta en marcha y un abono mensual que cubre operación, monitoreo y ajustes. El consumo de IA y los cargos de Meta van aparte y te los mostramos antes de arrancar.',
    },
  },
  {
    slug: 'automatizaciones', fig: 'automatizacion',
    icon: 'M6 6m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0 M18 18m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0 M8.5 6H14a4 4 0 0 1 4 4v5.5',
    t: 'Automatización e integración',
    d: 'Lo que hoy se copia a mano de un lado a otro pasa solo: WhatsApp, Gmail, planillas, CRM y facturación conectados.',
    checks: ['Cargás una vez y aparece donde tiene que estar', 'ERP, CRM y Google Workspace'],
    page: {
      title: 'Automatizaciones que sacan el trabajo repetido.',
      lead: 'Conectamos WhatsApp, Gmail, planillas, CRM y facturación para que lo que hoy se copia a mano pase solo.',
      resolvemos: 'Primero vemos qué se carga, dónde y cuántas veces. Después conectamos las herramientas para que cada dato se cargue una sola vez y llegue a donde tiene que estar: la planilla, el CRM, la factura o el aviso al equipo.',
      tags: ['Planillas', 'CRM', 'Facturación', 'Gmail', 'Avisos'],
      ejemplos: [P.mandarina, P.prospeccion, P.marketing],
      para: [
        ['Administración que copia y pega', 'Los mismos datos se cargan en tres lugares distintos, a mano.'],
        ['Equipos comerciales', 'Los contactos quedan en el celular de cada vendedor y nadie hace el seguimiento.'],
        ['Negocios que facturan todos los meses', 'Las facturas recurrentes se hacen una por una.'],
      ],
      negocios: [
        ['Estudio contable', 'Los comprobantes llegan por mail. Se leen solos, se cargan en la planilla de cada cliente y el equipo revisa solo lo que no cierra.'],
        ['Comercio', 'Cada venta confirmada descuenta stock, emite la factura en ARCA y le manda el comprobante al cliente por WhatsApp.'],
        ['Equipo de ventas', 'Cada consulta nueva entra al CRM con su origen, se asigna a un vendedor y, si nadie responde en 24 h, llega un aviso.'],
      ],
      precio: 'Una puesta en marcha según cuántos sistemas haya que conectar y un abono mensual que cubre el monitoreo y los ajustes cuando cambia alguna de tus herramientas.',
    },
  },
  {
    slug: 'datos-y-tableros', fig: 'datos',
    icon: 'M5 19V11 M12 19V5 M19 19v-6',
    t: 'Datos y tableros',
    d: 'Tus ventas, stock y cobranzas en un tablero que se actualiza solo, con alertas para decidir a tiempo y no a fin de mes.',
    checks: ['Indicadores en vivo', 'Avisos cuando algo se sale de lo normal'],
    page: {
      title: 'Tus números claros, sin esperar a fin de mes.',
      lead: 'Juntamos ventas, stock, cobranzas y lo que tengas disperso en un tablero que se actualiza solo, con avisos cuando algo se sale de lo normal.',
      resolvemos: 'Conectamos lo que ya usás (sistema de gestión, planillas, facturación, incluso las cámaras) y armamos indicadores que tu equipo entiende de un vistazo. Cuando algo cambia, el tablero avisa.',
      tags: ['Ventas', 'Stock', 'Cobranzas', 'Alertas', 'Cámaras'],
      ejemplos: [P.dashboard, P.video, P.asistente],
      para: [
        ['Dueños que deciden con intuición', 'Los números llegan tarde y cada uno tiene una versión distinta.'],
        ['Negocios con varias sucursales', 'Cada local reporta a su manera y comparar lleva días.'],
        ['Equipos que arman reportes a mano', 'Todos los lunes alguien pierde la mañana juntando planillas.'],
      ],
      negocios: [
        ['Cadena de locales', 'Ventas por sucursal, ticket promedio y horarios pico en un solo tablero. Si un local cae más de lo normal, llega un aviso.'],
        ['Distribuidora', 'Stock, rotación y cobranzas pendientes por cliente, con alerta cuando un producto está por quedarse sin stock.'],
        ['Salas de entretenimiento', 'Las cámaras que ya estaban cuentan personas y miden la ocupación por zona; el tablero muestra qué horarios y sectores rinden más.'],
      ],
      precio: 'Una puesta en marcha según cuántas fuentes haya que conectar y cuántos tableros armemos, y un abono mensual que mantiene los datos al día y suma indicadores nuevos.',
    },
  },
  {
    slug: 'software-a-medida', fig: 'software',
    icon: 'M6 4h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z M3 8.5h18 M9 21h6',
    t: 'Software a medida',
    d: 'Sistemas de gestión, portales y webs con lógica de negocio cuando lo que necesitás no existe hecho. Se cotiza por proyecto.',
    checks: ['Stock, pedidos y turnos en un solo lugar', 'Pensado para cómo trabaja tu equipo'],
    page: {
      title: 'Software a medida para cómo trabaja tu equipo.',
      lead: 'Sistemas de gestión, portales y apps internas cuando lo que necesitás no existe hecho, o lo que existe te obliga a trabajar distinto.',
      resolvemos: 'Stock, pedidos, turnos, clientes o lo que hoy se reparte entre planillas y chats, en un solo sistema. Lo armamos alrededor de tu operación y lo entregamos por partes, empezando por lo que más duele.',
      tags: ['Gestión', 'Portales', 'Apps internas', 'Webs'],
      ejemplos: [P.locales, P.reencuentro, P.agro, P.wodsi],
      para: [
        ['Pymes que crecieron con Excel', 'La planilla ya no da abasto y un error se paga caro.'],
        ['Negocios con un proceso propio', 'Ningún sistema enlatado se adapta a cómo trabajan.'],
        ['Profesionales y comercios', 'Necesitan una web clara, con turnos o catálogo, que se vea bien en el celular.'],
      ],
      negocios: [
        ['Campo', 'Animales, sanidad, lluvias y stock de alimento cargados desde el celular, con el historial de cada lote a mano. Es lo que hicimos en Gestión agropecuaria.'],
        ['Gimnasio o box', 'Atletas, planes y cuotas en un solo lugar, con avisos automáticos por WhatsApp cuando vence una cuota. Es lo que resuelve WODSI.'],
        ['Productor que vende por encargo', 'Ventas del mostrador, encargos de la semana y fiado anotados desde el celular, con aviso cuando el stock no alcanza para cumplir. Es El Reencuentro.'],
      ],
      precio: 'Un desarrollo con entregas parciales y un abono mensual que cubre hosting, soporte y mejoras. Si ya tenés hosting o servicios contratados, los usamos; si no, nos encargamos y te cobramos su costo más la gestión.',
    },
  },
]
// la página de cada servicio; automatizaciones va aparte porque /automatizaciones es la landing de campañas
AREAS.forEach((a) => { a.path = a.slug === 'automatizaciones' ? '/automatizacion-e-integracion' : `/${a.slug}` })

// /casos: primero los mockups de apps, después el resto del portfolio (src/data/projects.js del sitio)
export const CASOS = [
  { ...P.locales, img: '/mockups/panel-hoy.jpg', tags: ['Agente de IA', 'Panel'], href: '/agentes-de-ia' },
  { ...P.reencuentro, img: '/mockups/el-reencuentro.jpg', tags: ['App de ventas', 'Software a medida'], href: '/software-a-medida' },
  { ...P.asistente, tags: ['IA', 'Datos'] },
  { ...P.dashboard, tags: ['Tableros'] },
  { ...P.agro, tags: ['Software a medida', 'Campo'] },
  { ...P.video, tags: ['Visión por computadora'] },
  { ...P.mandarina, tags: ['Redes sociales', 'Agente de IA'] },
  { ...P.prospeccion, tags: ['Agentes', 'Ventas'] },
  { ...P.wodsi, tags: ['Plataforma', 'WhatsApp'] },
  { ...P.marketing, tags: ['Agentes', 'Contenido'] },
  { ...P.display, tags: ['Cartelería digital'] },
].map((c) => ({ ...c, img: c.img || c.imgs[0][1], href: c.href || `${PROYECTOS_URL}#${c.slug}` }))

export const EQUIPO = [
  { photo: '/seba.jpg', name: 'Sebastian Deina', role: 'IA, automatización y software', pos: '20% 30%',
    bio: 'Es con quien hablás primero. Entiende cómo opera tu negocio, diseña la solución y la deja funcionando.' },
  { initials: 'SB', name: 'Sol Bogner', role: 'Diseño y branding', pos: '80% 70%',
    bio: 'Identidad, interfaces y piezas de marca para que cada sistema se vea claro y se use sin manual.' },
]

// "Para quién trabajamos" (inicio): los rubros prioritarios de Nimbo, con lo que les resolvemos. Cada tarjeta lleva
// al contacto con el rubro marcado (/contacto?r=…).
export const RUBROS = [
  {
    slug: 'inmobiliaria', t: 'Inmobiliarias',
    icon: 'M4 10.5 12 4l8 6.5 M6 9v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9 M10 20v-4a2 2 0 0 1 4 0v4',
    d: 'Consultas por portales, WhatsApp e Instagram a toda hora, visitas que coordinar y contratos que vencen.',
    checks: [
      'Un agente responde por cada propiedad y te pasa solo a los interesados en serio',
      'Las visitas quedan agendadas en el calendario de cada asesor',
      'Avisos automáticos de vencimientos, renovaciones y cobros de alquileres',
      'Un tablero con consultas, visitas y operaciones por asesor',
    ],
  },
  {
    slug: 'distribuidora', t: 'Distribuidoras y mayoristas',
    icon: 'M5 6h7a2 2 0 0 1 2 2v8H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z M14 10h3.2a2 2 0 0 1 1.6.8l1.8 2.4a2 2 0 0 1 .4 1.2V16h-7 M7 19.5a1.5 1.5 0 1 0 0-.01 M17 19.5a1.5 1.5 0 1 0 0-.01',
    d: 'Pedidos por WhatsApp a cualquier hora, listas de precios que cambian y cobranzas que se escapan.',
    checks: [
      'Pedidos tomados por WhatsApp con precio y stock, listos para preparar',
      'Listas de precios actualizadas que les llegan solas a tus clientes',
      'Stock, rotación y cuentas corrientes por cliente, con alertas',
      'El pedido pasa al sistema de gestión y a la factura sin cargarlo dos veces',
    ],
  },
]

export const PASOS = [
  ['Diagnóstico', 'Entendemos el proceso y dónde se pierde tiempo.'],
  ['Propuesta', 'Alcance, tiempos, puesta en marcha y abono mensual, por escrito.'],
  ['Implementación', 'Lo construimos y lo probamos con casos reales.'],
  ['Evolución', 'Medimos, mantenemos y ajustamos cada mes.'],
]

export const FAQ = [
  ['¿El diagnóstico tiene costo?', 'La primera reunión es sin cargo. Si hace falta un relevamiento técnico detallado, lo cotizamos antes de avanzar.'],
  ['¿Cuánto cuesta?', 'Trabajamos con un abono mensual: una puesta en marcha al principio y después una cuota por mes que cubre la operación, el soporte y las mejoras. Después del diagnóstico te mandamos la propuesta en pesos, con lo que incluye y los tiempos.'],
  ['¿Qué incluye el abono mensual?', 'La operación del servicio, monitoreo, soporte y ajustes. Integraciones nuevas y costos de terceros (modelos de IA, Meta, licencias) se proponen aparte.'],
  ['¿Funciona con lo que ya usamos?', 'En la mayoría de los casos sí: WhatsApp, Gmail, Google Sheets, CRMs y sistemas de gestión con facturación electrónica.'],
  ['No sé qué necesito, ¿igual podemos hablar?', 'Sí. Para eso es el diagnóstico: nos contás cómo trabajan y te decimos qué conviene automatizar primero, y qué no.'],
]

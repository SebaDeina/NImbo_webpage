const BA = { '@type': 'AdministrativeArea', name: 'Provincia de Buenos Aires' }

export default {
  path: '/zona-sur',
  title: 'IA, automatización y páginas web en zona sur (GBA) | Nimbo',
  description: 'Automatización, IA y páginas web para pymes de zona sur: Berazategui, Quilmes y Avellaneda. Diagnóstico gratis, trabajo remoto y abono mensual con soporte.',
  crumb: 'Zona sur',
  h1: 'Tecnología para pymes de zona sur: Berazategui, Quilmes y Avellaneda',
  answer: 'Nimbo ayuda a pymes de zona sur del Gran Buenos Aires a ordenar sus procesos, automatizar tareas repetitivas, sumar agentes de IA y tener una página web que traiga consultas. Organizamos BETA, los encuentros de tecnología en Berazategui, y trabajamos de forma remota con el equipo y las herramientas que ya tenés.',
  service: {
    name: 'Automatización, IA y páginas web para pymes de zona sur',
    type: 'Consultoría en automatización e inteligencia artificial',
    description: 'Mejora de procesos, automatización, agentes de IA, tableros y páginas web para pymes de Berazategui, Quilmes, Avellaneda y el resto de la zona sur del Gran Buenos Aires.',
    areaServed: [
      { '@type': 'City', name: 'Berazategui', containedInPlace: BA },
      { '@type': 'City', name: 'Quilmes', containedInPlace: BA },
      { '@type': 'City', name: 'Avellaneda', containedInPlace: BA },
    ],
  },
  sections: [
    {
      id: 'por-que',
      h2: 'Por qué una página para zona sur.',
      paras: [
        'Porque es donde organizamos BETA. Muchas pymes de la zona crecieron a fuerza de trabajo y de WhatsApp: el dueño atiende, cotiza, persigue cobranzas y arma los números el domingo a la noche. No les falta voluntad, les falta tiempo. Y cuando buscan ayuda con tecnología, casi siempre la oferta está pensada para empresas grandes de Capital, con otros tiempos y otros presupuestos.',
        'Nosotros trabajamos con pymes chicas y medianas, con el equipo que ya tienen y las herramientas que ya usan. Si estás en Berazategui, Quilmes o Avellaneda, esta página es para vos.',
      ],
    },
    {
      id: 'que-hacemos',
      h2: 'Qué hacemos para pymes de la zona.',
      paras: ['Son cuatro frentes que se combinan según lo que necesite cada negocio. No hace falta arrancar por todos: casi siempre conviene empezar por uno, ver cómo funciona y recién después sumar el siguiente.'],
      items: [
        ['Automatización e integración', 'Que los pedidos, los avisos, la carga de datos y los recordatorios pasen solos entre WhatsApp, Gmail, planillas, CRM y tu sistema de gestión. Lo contamos en [automatización de procesos](/automatizacion-de-procesos).'],
        ['Agentes de IA', 'Un asistente que responde las consultas repetidas a cualquier hora, toma datos y le pasa a una persona lo que necesita criterio. Más en [agentes de IA](/agentes-de-ia).'],
        ['Datos y tableros', 'Ventas, stock y cobranzas en un tablero que se actualiza solo, con alertas para decidir a tiempo. Más en [datos y tableros](/datos-y-tableros).'],
        ['Páginas web y sistemas', 'Una web rápida, pensada para el celular y conectada a tus procesos, o un sistema a medida cuando lo que existe no alcanza. Más en [software a medida](/software-a-medida).'],
      ],
      after: ['Antes de cualquiera de estas cosas, miramos el proceso. Automatizar algo desordenado solo hace que el desorden vaya más rápido.'],
    },
    {
      id: 'rubros',
      h2: 'Rubros que vemos seguido en el sur del conurbano.',
      paras: ['La zona tiene de todo: industria, comercio de barrio, servicios y mucho movimiento de mercadería. Estos son los negocios donde más rápido se nota ordenar y automatizar:'],
      items: [
        ['Distribuidoras y mayoristas', 'Pedidos que entran por WhatsApp a cualquier hora, listas de precios que cambian seguido y cuentas corrientes difíciles de seguir. Automatizamos la toma del pedido con precio y stock, y el paso al sistema y a la factura.'],
        ['Talleres, fábricas e industria liviana', 'Órdenes de trabajo en papel, presupuestos que se arman a mano y poco control de lo que entra y sale. Un tablero simple y un formulario bien hecho cambian mucho el día a día.'],
        ['Comercios con una o varias sucursales', 'Precios distintos en cada local, promociones que no llegan a tiempo y stock que no coincide. Para las pantallas del local tenemos [Nimbo Display](/display).'],
        ['Servicios profesionales y salud', 'Estudios, consultorios y centros que viven de los turnos y las consultas. Agenda online, recordatorios y respuestas automáticas a las preguntas de siempre.'],
        ['Inmobiliarias', 'Consultas que llegan de portales, WhatsApp e Instagram, visitas para coordinar y vencimientos de contratos para no olvidar.'],
      ],
    },
    {
      id: 'beta',
      h2: 'BETA: los encuentros de tecnología en Berazategui.',
      paras: [
        'Además de trabajar con pymes, armamos [BETA](/beta), una comunidad de innovación en Berazategui. La idea es simple: que no haya que ir hasta Capital para hablar de IA, automatización y herramientas con gente que las está usando.',
        'Los encuentros son abiertos y combinan networking, charlas cortas de gente de la zona contando qué le funcionó y qué no, talleres con la compu abierta y noches para mostrar proyectos. Si tenés un espacio, querés dar una charla o sumarte como partner, en la página de BETA está cómo hacerlo.',
      ],
    },
    {
      id: 'como',
      h2: 'Cómo trabajamos: de forma remota y por partes.',
      paras: [
        'El trabajo se hace a distancia: videollamadas cortas, acceso a las herramientas que ya usás y avances que ves en un link de prueba. Así no le sacamos horas a tu equipo con reuniones largas.',
        'Estamos en Buenos Aires y trabajamos de forma remota con toda Argentina, así que una pyme de zona sur tiene el mismo servicio que una de cualquier otra provincia.',
      ],
      steps: true,
      items: [
        ['Diagnóstico gratis de 20 minutos', 'Nos contás qué te come el tiempo y te decimos por dónde empezaríamos.'],
        ['Propuesta por escrito', 'Qué vamos a hacer, en qué orden y cuánto cuesta. Las páginas web tienen precio fijo; las automatizaciones se cotizan según el proyecto.'],
        ['Entregas por partes', 'Empezamos por lo que más impacto tiene y lo vas usando desde la primera semana que está listo.'],
        ['Abono mensual', 'Operación, soporte y mejoras continuas. Si algo falla o cambia tu negocio, lo ajustamos.'],
      ],
    },
  ],
  faq: [
    ['¿Trabajan con pymes de Berazategui, Quilmes y Avellaneda?', 'Sí. Trabajamos con pymes de Berazategui, Quilmes y Avellaneda, de forma remota y con el mismo método que en el resto del país.'],
    ['¿Tienen oficina en la zona?', 'Trabajamos de forma remota y vamos a tu empresa cuando hace falta.'],
    ['¿Mi negocio es muy chico para esto?', 'Probablemente no. Trabajamos con pymes chicas y medianas, y muchas veces lo que más rinde es una automatización simple sobre las herramientas que ya usás. En el diagnóstico te decimos con honestidad si vale la pena.'],
    ['¿Solo trabajan con pymes de zona sur?', 'No. Trabajamos de forma remota con pymes de toda Argentina. Esta página existe porque es la zona donde armamos la comunidad BETA, pero el servicio es el mismo para un negocio de Córdoba, Rosario o Capital.'],
    ['¿Qué es BETA?', 'Es la comunidad de tecnología e IA que organizamos en Berazategui: encuentros abiertos con networking, charlas y talleres. No es un servicio pago ni hace falta ser cliente para ir.'],
    ['¿Cuánto cuesta?', 'Las páginas web tienen precio fijo. Las automatizaciones se cotizan según el proyecto, después del [diagnóstico gratis de 20 minutos](/diagnostico), y se mantienen con un abono mensual que cubre soporte y mejoras.'],
  ],
  related: ['/automatizacion-de-procesos', '/consultoria-inteligencia-artificial', '/mejora-de-procesos-pymes', '/paginas-web-pymes', '/caba', '/agentes-de-ia', '/datos-y-tableros'],
  posts: ['transformacion-digital-pymes-argentina', 'seo-local-argentina-como-aparecer-en-google', 'automatizar-pyme-ia-chatbot-whatsapp'],
  final: 'Contanos qué pasa en tu negocio.',
}

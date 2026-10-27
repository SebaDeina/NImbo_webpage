export default {
  path: '/automatizacion-de-procesos',
  title: 'Automatización de procesos para pymes en Argentina | Nimbo',
  description: 'Automatización de procesos para pymes en Argentina: pedidos, cobranzas, WhatsApp y reportes conectados con tu CRM, planillas y facturación. Con abono mensual.',
  crumb: 'Automatización de procesos',
  h1: 'Automatización de procesos para pymes en Argentina',
  answer: 'Automatizar un proceso es lograr que las tareas repetitivas, como cargar pedidos, mandar avisos, pasar datos de una planilla al sistema o armar reportes, se hagan solas. En Nimbo automatizamos procesos de pymes argentinas conectando WhatsApp, Gmail, planillas, CRM y facturación, con IA donde suma y un abono mensual que cubre operación y mejoras.',
  service: {
    name: 'Automatización de procesos para pymes',
    type: 'Automatización de procesos',
    description: 'Automatización de procesos de ventas, pedidos, administración, cobranzas, atención por WhatsApp y reportes para pymes de Argentina, integrando WhatsApp, Gmail, Google Sheets, CRM, ERP y facturación electrónica.',
  },
  sections: [
    {
      id: 'procesos',
      h2: 'Qué procesos se automatizan.',
      paras: ['Casi cualquier tarea que alguien hace igual todos los días, siguiendo los mismos pasos, se puede automatizar. Estos son los procesos donde más trabajo repetido encontramos en pymes:'],
      items: [
        ['Ventas y pedidos', 'El pedido que llega por WhatsApp, mail o formulario se carga solo con precio y stock, pasa al sistema de gestión y le avisa a quien lo prepara. Nadie lo vuelve a tipear.'],
        ['Administración y cobranzas', 'Facturas que se emiten y se mandan solas, recordatorios de pago antes del vencimiento y un listado al día de quién debe cuánto y desde cuándo.'],
        ['Atención por WhatsApp', 'Las preguntas de siempre (precios, horarios, estado del pedido) se responden al instante, y las que necesitan criterio le llegan a una persona con el contexto armado.'],
        ['Reportes', 'Los números que hoy alguien arma a mano en una planilla aparecen solos cada mañana en un tablero o en tu mail, con alertas cuando algo se sale de lo normal.'],
      ],
      after: ['Antes de automatizar, miramos si el proceso está ordenado. Si no lo está, empezamos por la [mejora de procesos](/mejora-de-procesos-pymes): automatizar el desorden solo lo hace más rápido.'],
    },
    {
      id: 'integraciones',
      h2: 'Con qué se conecta.',
      paras: [
        'No hace falta cambiar las herramientas que ya usás. La automatización se apoya en ellas y hace que hablen entre sí, para que cada dato se cargue una sola vez y llegue a donde tiene que estar.',
      ],
      items: [
        ['WhatsApp', 'Mensajes entrantes, respuestas automáticas, avisos y recordatorios, con la API oficial de WhatsApp Business.'],
        ['Gmail y Google Workspace', 'Mails que se leen y se clasifican solos, adjuntos que se guardan en Drive y calendarios compartidos.'],
        ['Planillas', 'Google Sheets o Excel como fuente o destino de los datos, mientras sigan siendo útiles para tu equipo.'],
        ['CRM', 'Cada consulta y cada cliente en un solo lugar, con el historial completo y el próximo paso a la vista.'],
        ['ERP y sistemas de gestión', 'Pedidos, stock y clientes que entran y salen del sistema que ya usás, si tiene una forma de conectarse.'],
        ['Facturación electrónica', 'Comprobantes emitidos en ARCA a partir de los datos del pedido o de la venta, sin cargarlos dos veces.'],
      ],
      after: ['Qué se puede conectar depende de cada sistema. Lo revisamos en el diagnóstico y te lo decimos antes de proponer nada. Si querés ver ejemplos de procesos que ya automatizamos, están en [casos](/casos).'],
    },
    {
      id: 'como',
      h2: 'Cómo trabajamos.',
      steps: true,
      items: [
        ['Diagnóstico', 'Una charla gratis de 20 minutos para entender qué se hace hoy, quién lo hace y dónde se traba. Sin compromiso.'],
        ['Propuesta por escrito', 'Qué vamos a automatizar, en qué orden, con qué herramientas, cuánto cuesta la puesta en marcha y cuánto el abono mensual.'],
        ['Implementación por partes', 'Empezamos por el proceso que más te duele. Lo probás con tu equipo con casos reales antes de pasar al siguiente.'],
        ['Evolución mensual', 'Monitoreamos que todo funcione, ajustamos lo que cambia y sumamos mejoras a medida que tu negocio las pide.'],
      ],
    },
    {
      id: 'costo',
      h2: 'Cuánto cuesta.',
      paras: [
        'Trabajamos con un abono mensual. Hay una puesta en marcha, que cubre el relevamiento, la configuración y las primeras automatizaciones, y una cuota mensual que cubre la operación, el soporte y las mejoras. No es un proyecto que se entrega y se olvida: las automatizaciones necesitan mantenimiento cuando cambia una herramienta, un proveedor o la forma de trabajar.',
        'El monto depende de cuántos procesos y sistemas haya que conectar. Si se usa IA o la API de WhatsApp, esos consumos van aparte y te los mostramos antes de arrancar. Todo queda por escrito en la propuesta, después del [diagnóstico gratis](/diagnostico).',
      ],
    },
    {
      id: 'rubros',
      h2: 'Ejemplos por rubro.',
      items: [
        ['Distribuidoras y mayoristas', 'El cliente pide por WhatsApp a cualquier hora. El pedido se arma con la lista de precios vigente y el stock real, pasa al sistema y a la factura, y las excepciones las revisa una persona.'],
        ['Inmobiliarias', 'Las consultas de portales, WhatsApp e Instagram entran a un solo lugar, se filtran los interesados en serio y las visitas quedan en el calendario de cada asesor.'],
        ['Servicios profesionales', 'Estudios y consultorios con turnos que se confirman solos, recordatorios el día anterior, documentación que se pide y se guarda sin perseguir a nadie y facturas recurrentes que salen solas.'],
      ],
    },
    {
      id: 'caso-bz',
      h2: 'Caso: BZ, salas de entretenimiento.',
      paras: [
        'BZ es una empresa de entretenimiento con dos salas que recibía consultas por WhatsApp a toda hora y anotaba las reservas de eventos a mano en planillas. Implementamos un agente de IA que responde con el tono de la marca, toma reservas y, cuando hace falta, le pasa la conversación al equipo con un resumen del caso.',
        'Detrás del agente armamos un CRM con eventos, reservas, listas de invitados y una bandeja de derivaciones, y migramos las planillas a una base de datos. También automatizamos los reportes diarios que antes se exportaban a mano. El agente solo usa unas pocas acciones definidas y nunca toca la base de datos libremente.',
      ],
    },
  ],
  faq: [
    ['¿Necesito cambiar mi sistema?', 'Casi nunca. Automatizamos sobre las herramientas que ya usás: WhatsApp, planillas, tu CRM o tu sistema de gestión. Si alguna no permite conectarse, te lo decimos en el diagnóstico y vemos alternativas.'],
    ['¿Cuánto tarda?', 'Depende del proceso. Arrancamos por uno solo y lo dejamos funcionando antes de seguir. En la propuesta te damos los tiempos por escrito, y desde las primeras entregas ya ves algo andando.'],
    ['¿Qué pasa si algo falla?', 'Para eso está el abono mensual: monitoreamos las automatizaciones, nos enteramos si algo se corta y lo arreglamos. Además, cada flujo tiene un plan B para que una falla no frene tu operación.'],
    ['¿Bot o agente?', 'Un bot sigue un guion fijo de opciones. Un agente de IA entiende lo que le escriben, consulta tus datos y puede hacer tareas, como tomar un pedido. Según el caso conviene uno u otro; lo explicamos en [agentes de IA vs. chatbots](/blog/agentes-de-ia-vs-chatbots).'],
    ['¿Hace falta IA para automatizar?', 'No. Muchas automatizaciones son reglas simples: si llega esto, hacé aquello. La IA suma cuando hay que entender texto libre, leer documentos o responder consultas. Si querés ver por dónde empezar con IA, mirá la [consultoría en inteligencia artificial](/consultoria-inteligencia-artificial).'],
    ['¿Trabajan con pymes de todo el país?', 'Sí. Estamos en Buenos Aires y trabajamos de forma remota con toda Argentina.'],
  ],
  related: ['/consultoria-inteligencia-artificial', '/agentes-de-ia', '/mejora-de-procesos-pymes', '/paginas-web-pymes', '/datos-y-tableros', '/software-a-medida'],
  posts: ['como-medir-el-roi-de-una-automatizacion', 'automatizar-pyme-ia-chatbot-whatsapp', 'automatiza-tu-negocio-con-ia'],
  final: 'Contanos qué tarea querés sacarte de encima.',
  contacto: '/contacto?s=automatizaciones',
}

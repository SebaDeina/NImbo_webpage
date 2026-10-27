export default {
  path: '/rubros/inmobiliarias',
  title: 'Agente de IA para inmobiliarias en Argentina | Nimbo',
  description: 'Agente de IA para inmobiliarias: responde consultas de portales, WhatsApp e Instagram, agenda visitas por asesor y avisa vencimientos y cobros. Abono mensual.',
  crumb: 'Inmobiliarias',
  h1: 'Agente de IA para inmobiliarias: consultas, visitas y vencimientos en orden',
  answer: 'Un agente de IA para inmobiliarias responde al instante las consultas que llegan por portales, WhatsApp e Instagram, filtra a los interesados en serio, agenda las visitas en el calendario de cada asesor y avisa vencimientos, renovaciones y cobros. En Nimbo lo implementamos sobre tus herramientas, con un abono mensual que cubre operación y mejoras.',
  service: {
    name: 'Agente de IA y automatización para inmobiliarias',
    type: 'Agentes de IA',
    description: 'Agente de IA que responde consultas de portales inmobiliarios como Zonaprop y Argenprop, WhatsApp e Instagram, califica interesados, agenda visitas por asesor, envía avisos de vencimientos, renovaciones y cobros de alquileres, y tablero de gestión por asesor para inmobiliarias de Argentina.',
  },
  sections: [
    {
      id: 'consultas',
      h2: 'Consultas de portales, WhatsApp e Instagram.',
      paras: [
        'Una inmobiliaria recibe consultas por todos lados: los portales, el WhatsApp de la oficina, el de cada asesor, Instagram y el mail. Muchas llegan a la noche o el fin de semana, y la mayoría pregunta lo mismo: si la propiedad sigue disponible, cuánto sale, cuánto son las expensas, si acepta mascotas o si se puede visitar.',
        'Cuando la respuesta tarda, el interesado ya le escribió a otras tres inmobiliarias. Y cuando llega rápido, muchas veces es a costa de que un asesor esté pegado al celular respondiendo consultas que no van a ningún lado. Las consultas se pierden entre chats, nadie sabe quién atendió a quién y el seguimiento depende de la memoria de cada uno.',
      ],
    },
    {
      id: 'agente',
      h2: 'Un agente que responde y filtra a los interesados.',
      paras: [
        'El [agente de IA](/agentes-de-ia) conoce cada propiedad publicada: precio, expensas, ambientes, requisitos y disponibilidad. Responde al instante y con información correcta, a cualquier hora, en WhatsApp e Instagram, y reúne en un solo lugar las consultas que llegan de portales como Zonaprop y Argenprop.',
        'Además, hace las preguntas que haría un asesor para saber si el interés es real: para cuándo se necesita, con qué garantía cuenta, si es para vivir o invertir, cuál es el presupuesto. Con esas respuestas, el asesor recibe solo a los interesados en serio, con un resumen de la conversación, y no pierde tiempo con quien estaba mirando por curiosidad.',
        'Si el agente no sabe algo o la consulta necesita criterio, como una negociación o un reclamo, le pasa la conversación a una persona. Nunca inventa datos de una propiedad.',
      ],
    },
    {
      id: 'visitas',
      h2: 'Visitas en el calendario de cada asesor.',
      paras: [
        'Cuando un interesado quiere ver la propiedad, el agente le ofrece los horarios libres del asesor que la tiene a cargo y agenda la visita directamente en su calendario. El día anterior manda un recordatorio con la dirección y, si el interesado cancela, libera el horario y ofrece otro.',
        'Cada asesor ve su agenda al día sin intercambiar diez mensajes para coordinar, y la oficina sabe cuántas visitas tiene cada propiedad.',
      ],
    },
    {
      id: 'vencimientos',
      h2: 'Avisos de vencimientos, renovaciones y cobros.',
      paras: ['La administración de alquileres tiene fechas que no se pueden pasar. Las automatizamos para que nadie tenga que acordarse:'],
      items: [
        ['Vencimientos de contratos', 'Aviso al propietario, al inquilino y al asesor con la anticipación que definas, para negociar la renovación a tiempo.'],
        ['Renovaciones y actualizaciones', 'Recordatorio de cada actualización según lo que diga el contrato, con el detalle para revisar antes de enviarlo.'],
        ['Cobros de alquileres', 'Recordatorio de pago antes del vencimiento, aviso si se atrasa y registro de lo que ya se cobró.'],
        ['Documentación', 'Pedido automático de papeles a interesados e inquilinos, con aviso cuando falta algo.'],
      ],
      after: ['Todo se apoya en las herramientas que ya usás. El método general está en [automatización de procesos](/automatizacion-de-procesos).'],
    },
    {
      id: 'tablero',
      h2: 'Tablero por asesor.',
      paras: [
        'Con las consultas y las visitas registradas, el tablero aparece solo: cuántas consultas entraron por cada canal, cuántas se convirtieron en visitas y en operaciones, qué propiedades generan más interés y cómo le va a cada asesor. Se actualiza todos los días, sin que nadie tenga que armar planillas. Más sobre cómo los hacemos en [datos y tableros](/datos-y-tableros).',
      ],
    },
    {
      id: 'como',
      h2: 'Cómo lo implementamos.',
      steps: true,
      items: [
        ['Diagnóstico gratis de 20 minutos', 'Nos contás por dónde entran las consultas, cómo se reparten entre los asesores y qué se te escapa hoy.'],
        ['Propuesta por escrito', 'Qué canales conectamos, qué preguntas hace el agente, qué avisos se automatizan, la puesta en marcha y el abono mensual.'],
        ['Puesta en marcha por partes', 'Arrancamos por las consultas de WhatsApp, lo probás con casos reales y después sumamos visitas, vencimientos y tablero.'],
        ['Seguimiento mensual', 'Revisamos conversaciones, ajustamos respuestas y preguntas de filtro, y actualizamos el agente cuando cambia tu cartera.'],
      ],
    },
    {
      id: 'abono',
      h2: 'Cómo se cobra: abono mensual.',
      paras: [
        'Hay una puesta en marcha, que cubre la carga de propiedades, la conexión con tus canales y calendarios y la configuración del agente, y una cuota mensual que cubre la operación, el soporte y las mejoras. Entran y salen propiedades todo el tiempo y el agente tiene que estar al día: el abono incluye esos ajustes.',
        'El monto depende de cuántos canales, asesores y procesos haya que conectar. El consumo del modelo de IA y los cargos de Meta por WhatsApp van aparte y te los mostramos antes de arrancar. Todo por escrito después del [diagnóstico gratis de 20 minutos](/diagnostico).',
      ],
    },
  ],
  faq: [
    ['¿El agente puede dar información equivocada de una propiedad?', 'Responde solo con los datos que cargamos de cada propiedad. Si le preguntan algo que no figura, lo dice y le pasa la consulta a un asesor en vez de inventar.'],
    ['¿Sirve para las consultas que llegan de Zonaprop y Argenprop?', 'Sí. Integramos Zonaprop y Argenprop, así las consultas que llegan de esos portales entran al mismo lugar que las de WhatsApp e Instagram y el agente las responde y las filtra igual. Si usás otro portal, lo revisamos en el diagnóstico.'],
    ['¿Cada asesor sigue atendiendo a sus clientes?', 'Sí. El agente hace la primera respuesta y el filtro, y después le pasa el interesado al asesor que corresponde, con el resumen de la conversación.'],
    ['¿Funciona para alquileres y para ventas?', 'Sí. Las preguntas de filtro y los avisos se configuran según el tipo de operación: no se le pregunta lo mismo a quien busca alquilar que a quien quiere comprar.'],
    ['¿Qué pasa con los datos de los clientes?', 'Usamos solo los datos necesarios para la gestión, limitamos los accesos y te explicamos qué información pasa por cada servicio, teniendo en cuenta la Ley 25.326 de protección de datos personales.'],
    ['¿Necesito tener un CRM?', 'No es obligatorio. Si ya usás uno, conectamos el agente ahí. Si no, las consultas y los interesados pueden quedar en una planilla o en un CRM simple que armamos con vos.'],
    ['¿Trabajan con inmobiliarias de todo el país?', 'Sí. Estamos en Buenos Aires y trabajamos de forma remota con toda Argentina.'],
  ],
  related: ['/agentes-de-ia', '/automatizacion-de-procesos', '/datos-y-tableros', '/rubros/distribuidoras', '/caba', '/consultoria-inteligencia-artificial'],
  posts: ['agentes-de-ia-para-pymes-como-implementarlos', 'agentes-de-ia-vs-chatbots', 'que-es-un-crm-y-por-que-tu-pyme-lo-necesita'],
  final: 'Contanos cómo te llegan las consultas.',
  contacto: '/contacto?r=inmobiliaria',
}

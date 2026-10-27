export default {
  path: '/rubros/distribuidoras',
  title: 'Automatización para distribuidoras y mayoristas | Nimbo',
  description: 'Automatización para distribuidoras y mayoristas: pedidos por WhatsApp con precio y stock, listas que llegan solas, cuentas corrientes y tablero de rotación.',
  crumb: 'Distribuidoras y mayoristas',
  h1: 'Automatización para distribuidoras y mayoristas: pedidos por WhatsApp sin cargarlos dos veces',
  answer: 'Automatizar una distribuidora es lograr que el pedido que llega por WhatsApp se arme solo con la lista de precios vigente y el stock real, pase al sistema de gestión y a la factura, y que una persona revise solo las excepciones. En Nimbo lo implementamos sobre tus herramientas, con un abono mensual que cubre operación y mejoras.',
  service: {
    name: 'Automatización para distribuidoras y mayoristas',
    type: 'Automatización de procesos',
    description: 'Toma de pedidos por WhatsApp con precio y stock, envío automático de listas de precios, integración con el sistema de gestión y la facturación, seguimiento de cuentas corrientes y tableros de stock y rotación para distribuidoras y mayoristas de Argentina.',
  },
  sections: [
    {
      id: 'problema',
      h2: 'El problema: pedidos a toda hora y todo cargado a mano.',
      paras: [
        'En una distribuidora el día empieza con el celular lleno. Los clientes mandan el pedido por WhatsApp a la noche, el domingo o mientras el vendedor está en la calle. Cada uno lo escribe a su manera: con códigos, con nombres de producto inventados, con fotos de una lista vieja o con un audio. Alguien tiene que leer todo, traducirlo, fijarse si hay stock y cargarlo en el sistema. Después, otra vez para la factura.',
        'A eso se suman las listas de precios que cambian seguido y que nunca le llegan a todos a tiempo, y las cuentas corrientes que se siguen en una planilla aparte. Resultado: errores en los pedidos, precios desactualizados, clientes que preguntan tres veces por el mismo envío y cobranzas que se escapan porque nadie tiene tiempo de mirarlas.',
      ],
      items: [
        ['Pedidos a toda hora', 'Llegan por WhatsApp, mail o llamada, en cualquier formato, y se pierden entre conversaciones.'],
        ['Listas de precios', 'Cambian seguido, se mandan a mano y el cliente pide con la vieja.'],
        ['Cuentas corrientes', 'Saldos en una planilla que se actualiza cuando se puede, y reclamos de pago que dependen de la memoria de alguien.'],
        ['Doble carga', 'El mismo pedido se escribe en el chat, en el sistema y en la factura. Cada paso es una oportunidad de error.'],
      ],
    },
    {
      id: 'que-automatizamos',
      h2: 'Qué automatizamos.',
      paras: ['No se trata de cambiar tu sistema de gestión ni de obligar a tus clientes a usar una aplicación. Seguimos trabajando con WhatsApp, que es donde ya te piden, y conectamos lo que pasa ahí con el resto:'],
      items: [
        ['Toma de pedidos por WhatsApp', 'Un [agente de IA](/agentes-de-ia) entiende el pedido aunque venga escrito a la ligera, lo arma con los productos correctos, confirma precio y stock con el cliente y lo deja listo para preparar.'],
        ['Listas de precios que llegan solas', 'Cuando actualizás la lista, se manda sola a cada cliente o segmento, y el agente siempre responde con los precios vigentes.'],
        ['Pedido al sistema y a la factura', 'El pedido confirmado pasa a tu sistema de gestión y a la facturación electrónica sin que nadie lo vuelva a tipear.'],
        ['Avisos al cliente', 'Confirmación del pedido, aviso de despacho y recordatorio de pago, sin que tu equipo tenga que escribir uno por uno.'],
        ['Cuentas corrientes al día', 'Saldos por cliente actualizados y recordatorios automáticos antes y después del vencimiento.'],
        ['Reportes que se arman solos', 'Ventas por cliente, por vendedor y por producto todos los días en tu mail o en un tablero.'],
      ],
      after: ['Cada pieza se puede implementar por separado. Casi siempre arrancamos por la toma de pedidos, que es donde más horas se van. El método general está en [automatización de procesos](/automatizacion-de-procesos).'],
    },
    {
      id: 'excepciones',
      h2: 'Revisión humana de las excepciones.',
      paras: [
        'Automatizar no significa que nadie mire. La mayoría de los pedidos son repetidos y simples, y esos pasan solos. Pero hay casos que necesitan criterio: un producto sin stock, un precio especial que no está en la lista, un cliente con deuda vencida o un pedido mucho más grande que lo habitual.',
        'Para esos casos definimos reglas junto con vos. Cuando un pedido cae en alguna, no se carga solo: queda en una bandeja de revisión con el detalle y el motivo, y una persona de tu equipo lo aprueba, lo corrige o llama al cliente. Así se automatiza lo que se puede sin perder el control de lo que importa.',
      ],
    },
    {
      id: 'tablero',
      h2: 'Tablero de stock y rotación.',
      paras: [
        'Con los pedidos entrando ordenados, los datos aparecen solos. Armamos un tablero que se actualiza todos los días con lo que vendés, lo que tenés y lo que te deben, para decidir a tiempo y no a fin de mes.',
      ],
      items: [
        ['Stock y quiebres', 'Qué productos están por agotarse según cómo se venden, con alertas antes de quedarte sin mercadería.'],
        ['Rotación', 'Qué se mueve rápido, qué está parado en el depósito y qué conviene dejar de comprar.'],
        ['Clientes', 'Quién compra menos que antes, quién dejó de pedir y quién está atrasado con los pagos.'],
        ['Vendedores y zonas', 'Ventas y pedidos por vendedor, por zona y por período, sin pedirle a nadie que arme un Excel.'],
      ],
      after: ['Más sobre cómo los armamos en [datos y tableros](/datos-y-tableros).'],
    },
    {
      id: 'abono',
      h2: 'Cómo se cobra: abono mensual.',
      paras: [
        'Trabajamos con un abono mensual. Hay una puesta en marcha, que cubre el relevamiento, la conexión con tus sistemas y la configuración de los primeros procesos, y una cuota mensual que cubre la operación, el soporte y las mejoras. En una distribuidora las cosas cambian seguido: productos nuevos, listas, clientes y reglas comerciales. El abono hace que esos ajustes estén incluidos.',
        'El monto depende de cuántos procesos y sistemas haya que conectar. Si se usa IA o la API de WhatsApp, esos consumos van aparte y te los mostramos antes de arrancar. Te lo pasamos todo por escrito después del [diagnóstico gratis de 20 minutos](/diagnostico).',
      ],
    },
  ],
  faq: [
    ['¿Mis clientes tienen que cambiar su forma de pedir?', 'No. Siguen pidiendo por WhatsApp como hasta ahora. El agente entiende pedidos escritos de distintas formas y, si algo no queda claro, le pregunta al cliente o lo pasa a tu equipo.'],
    ['¿Funciona con mi sistema de gestión?', 'En la mayoría de los casos sí, si el sistema permite conectarse o exportar e importar datos. Lo revisamos en el diagnóstico y te decimos qué se puede antes de proponer nada.'],
    ['¿Qué pasa si el agente se equivoca con un pedido?', 'Antes de cargar el pedido, el agente le confirma al cliente el detalle con precios. Los pedidos fuera de lo normal van a revisión humana, y cada conversación queda registrada para revisar y ajustar.'],
    ['¿Puedo seguir usando mis planillas?', 'Sí. Si tu equipo trabaja con planillas, pueden seguir siendo la fuente de datos mientras te sirvan. Con el tiempo, si conviene, se pasan a algo más sólido.'],
    ['¿Sirve para una distribuidora chica?', 'Sí. Si recibís pedidos por WhatsApp todos los días y alguien los carga a mano, ya hay tiempo para ahorrar. En el diagnóstico te decimos con honestidad si vale la pena.'],
    ['¿Trabajan con distribuidoras de todo el país?', 'Sí. Estamos en Buenos Aires y trabajamos de forma remota con toda Argentina.'],
  ],
  related: ['/automatizacion-de-procesos', '/agentes-de-ia', '/datos-y-tableros', '/rubros/inmobiliarias', '/mejora-de-procesos-pymes', '/consultoria-inteligencia-artificial'],
  posts: ['automatizar-pyme-ia-chatbot-whatsapp', 'como-medir-el-roi-de-una-automatizacion', 'que-es-un-crm-y-por-que-tu-pyme-lo-necesita'],
  final: 'Contanos cómo te llegan los pedidos.',
  contacto: '/contacto?r=distribuidora',
}

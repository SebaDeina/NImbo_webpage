/*
  Páginas de automatización por rubro (/automatizacion-<rubro>). Las renderiza src/pages/RubroPage.jsx.
  Textos aprobados por Seba (oct. 2026) a partir de los borradores de Contenido.
  Cada FAQ alimenta a la vez la lista visible y el FAQPage del JSON-LD: el texto es el mismo, no duplicar.
  Datos de mercado con fuente y fecha; no hay casos de clientes ni cifras propias sin validar.
*/

export const RUBRO_UPDATED = '2026-10-24'

const WA_CRONISTA =
  '[El Cronista (18 de mayo de 2026)](https://www.cronista.com/infotechnology/it-business/asi-funciona-la-novedad-de-whatsapp-que-usan-las-pymes-para-vender-mas-sin-sumar-personal/)'

const COSTO =
  'Depende del alcance. Después del diagnóstico entregamos una propuesta cerrada, en pesos y a precio fijo. El mantenimiento se cobra con un abono mensual según el alcance.'

export const rubros = {
  inmobiliarias: {
    slug: 'inmobiliarias',
    path: '/automatizacion-inmobiliarias',
    nav: 'Inmobiliarias',
    title: 'Automatización para inmobiliarias en Argentina | Nimbo',
    description:
      'Agentes de IA para WhatsApp, agenda de visitas, seguimiento de interesados y tableros para inmobiliarias argentinas. Diagnóstico sin cargo de 20 minutos.',
    eyebrow: 'Automatización por rubro · Inmobiliarias',
    h1: 'Automatización e IA para inmobiliarias en Argentina',
    resumen:
      'En Nimbo automatizamos lo que más tiempo le saca a una inmobiliaria: responder consultas de portales y WhatsApp al instante, calificar a cada interesado, agendar visitas, hacer el seguimiento y mantener ordenada la cartera, con un agente de IA que deriva a tu equipo lo que necesita criterio. Empezamos con un diagnóstico sin cargo de 20 minutos y, si hay caso, te mandamos una propuesta cerrada en pesos.',
    card: 'Consultas de portales y WhatsApp respondidas al instante, visitas agendadas solas y seguimiento de cada interesado.',
    service: {
      name: 'Automatización e IA para inmobiliarias',
      serviceType: 'Automatización de procesos e implementación de agentes de IA',
      description:
        'Agentes de IA para WhatsApp y redes, calificación de interesados, agenda de visitas, seguimiento, CRM integrado y tableros para inmobiliarias en Argentina.',
      audience: 'Inmobiliarias',
    },
    mercado: {
      title: '¿Cómo está el mercado inmobiliario en 2026?',
      md: `
El mercado se mueve, pero con márgenes de error chicos para quien no contesta rápido:

- En la Ciudad de Buenos Aires se firmaron **6.612 escrituras de compraventa en septiembre de 2026**, 5,5% menos que en septiembre de 2025 y 9,2% más que en agosto. En el acumulado de enero a septiembre se registraron 48.195 escrituras, 2,7% menos que en el mismo período del año anterior. Fuente: [Colegio de Escribanos de la Ciudad de Buenos Aires, 22 de octubre de 2026](https://www.colegio-escribanos.org.ar/2026/10/22/cantidad-de-escrituras-de-compraventa-realizadas-en-septiembre-2026/).
- Las operaciones con hipoteca fueron **1.256 en septiembre (−15,5% interanual)** y acumulan 7.426 en el año, 31,4% menos que en 2025 (misma fuente).
- El monto promedio de las escrituras de septiembre fue de **US$ 120.106** (misma fuente).
- **8 de cada 10 argentinos** prefieren WhatsApp para comunicarse con empresas, según datos de Meta citados por ${WA_CRONISTA}.

Con menos crédito hipotecario empujando y operaciones de alto valor, cada consulta cuenta: el interesado que no recibe respuesta suele escribirle a la inmobiliaria de al lado.
`,
    },
    problemas: {
      title: '¿Qué problemas tiene hoy una inmobiliaria?',
      items: [
        ['Consultas que llegan por todos lados y a cualquier hora', 'Portales, WhatsApp, Instagram, la web y llamadas. Muchas llegan de noche o el fin de semana, cuando no hay nadie para contestar, y se enfrían.'],
        ['Las mismas preguntas, todo el día', '“¿Sigue disponible?”, “¿Cuánto son las expensas?”, “¿Acepta mascotas?”, “¿Es apto crédito?”, “¿Cuándo se puede ver?”. Tu equipo repite respuestas en lugar de mostrar propiedades y cerrar.'],
        ['Interesados sin calificar', 'Se agendan visitas con personas que no tienen el presupuesto, la garantía o el plazo que la propiedad requiere, y se pierden horas de traslado.'],
        ['Agenda de visitas a mano', 'Coordinar horarios entre interesados, propietarios y agentes por mensajes cruzados genera ausencias, superposiciones y visitas que se caen sin aviso.'],
        ['Seguimiento que depende de la memoria', 'Después de la visita, el seguimiento queda en la cabeza de cada agente. Si se va de vacaciones o deja la inmobiliaria, la información se va con él.'],
        ['Cartera y datos dispersos', 'Fichas en el portal, fotos en el celular, contratos en carpetas, datos de propietarios en una planilla. Saber qué propiedades tienen más consultas, cuáles llevan meses sin moverse o qué agente convierte mejor lleva horas.'],
      ],
    },
    soluciones: {
      title: '¿Qué automatiza Nimbo en una inmobiliaria?',
      items: [
        ['Agente de IA para WhatsApp y redes', 'Responde al instante, a cualquier hora, con la información real de cada propiedad: precio, expensas, superficie, requisitos, disponibilidad. Entiende mensajes escritos como sea y deriva a un agente humano lo que requiere negociación o criterio.'],
        ['Calificación de interesados', 'Antes de agendar, pregunta lo que tu equipo necesita saber: qué busca, en qué zona, con qué presupuesto, si es con crédito, qué garantía tiene, para cuándo. Registra todo y prioriza a los interesados más avanzados.'],
        ['Agenda de visitas automática', 'Ofrece horarios disponibles según el calendario del agente y la propiedad, confirma, manda recordatorios y avisa si alguien cancela, para liberar el turno.'],
        ['Seguimiento después de la visita', 'Mensaje de seguimiento programado, recordatorio al agente para llamar y registro de la respuesta. Ningún interesado queda sin contestar.'],
        ['CRM ordenado e integrado', 'Cada consulta, visita y respuesta queda registrada en un CRM o en una planilla conectada, con la propiedad y el agente asignados. Si ya usás un CRM inmobiliario, en el diagnóstico vemos cómo integrarlo en lugar de cambiarlo.'],
        ['Tablero de la cartera', 'Consultas por propiedad, visitas, conversión por agente, días en cartera y alertas cuando una propiedad lleva demasiado tiempo sin consultas.'],
      ],
    },
    flujos: {
      title: '¿Cómo es un flujo automatizado de una consulta?',
      items: [
        {
          t: 'Ejemplo: consulta por un departamento en alquiler',
          steps: [
            'Un interesado escribe por WhatsApp a las 23 h: “Hola, ¿sigue disponible el 2 ambientes de Palermo?”.',
            'El agente de IA identifica la propiedad, confirma disponibilidad y responde precio, expensas y requisitos.',
            'Pregunta fecha de mudanza, tipo de garantía y cantidad de personas.',
            'Si cumple los requisitos, ofrece tres horarios de visita según la agenda del agente asignado.',
            'El interesado elige uno; queda agendado en el calendario y registrado en el CRM.',
            'El día anterior y dos horas antes llega un recordatorio automático.',
            'Después de la visita, el sistema le pregunta qué le pareció y le avisa al agente para que siga.',
            'Si en cualquier momento pide negociar o hace una pregunta fuera de lo previsto, el agente de IA deriva la conversación a una persona con el resumen.',
          ],
        },
        {
          t: 'Ejemplo: captación de propietarios para tasación',
          steps: [
            'Un propietario completa el formulario de tasación en la web o escribe por Instagram.',
            'El agente pide dirección, tipo de propiedad, superficie y si quiere vender o alquilar.',
            'Asigna la consulta al agente de la zona y le propone al propietario horarios para la visita de tasación.',
            'Todo queda en el CRM con la fuente de la consulta, para saber qué canal trae más propietarios.',
          ],
        },
      ],
    },
    diagnostico: [
      ['Diagnóstico sin cargo', '20 minutos por videollamada. Revisamos cómo entran las consultas, cómo se agendan las visitas, qué sistemas usan y dónde se pierde tiempo o se pierden interesados.'],
      ['Estimación del costo actual', 'Calculamos cuánto te cuesta hoy el problema: horas del equipo, consultas sin respuesta, visitas que no convierten.'],
      ['Propuesta cerrada', 'Si hay caso, en 48 horas te mandamos una propuesta en pesos, a precio fijo, con alcance, plazos y resultados esperados. Si no hay caso, te lo decimos.'],
      ['Implementación', 'Pruebas con casos reales, con pagos por hitos.'],
      ['Servicio gestionado', 'Operación, monitoreo, soporte, ajustes y un reporte mensual, con un abono según el alcance.'],
    ],
    faq: [
      ['¿Un agente de IA puede responder las consultas de los portales inmobiliarios?', 'Sí, siempre que el portal permita conectar las consultas (por mail, WhatsApp o integración). Lo verificamos en el diagnóstico para cada portal que uses.'],
      ['¿El agente de IA puede dar información equivocada sobre una propiedad?', 'Responde solo con la información cargada de cada propiedad. Si algo no está o la pregunta sale de lo previsto, deriva a una persona. Por eso es clave mantener actualizada la ficha de cada propiedad.'],
      ['¿Tengo que cambiar el CRM o el sistema que ya uso?', 'No necesariamente. Si tu sistema permite integraciones, lo conectamos. Si no tenés CRM, podemos armar uno simple o empezar con una planilla conectada.'],
      ['¿Los clientes se dan cuenta de que les responde una IA?', 'Recomendamos decirlo con transparencia y ofrecer siempre la opción de hablar con una persona. El valor está en la respuesta inmediata y correcta, no en esconder que es automática.'],
      ['¿Sirve para una inmobiliaria chica?', 'Sí, siempre que reciba un volumen de consultas que el equipo no llega a contestar rápido. En el diagnóstico vemos si el volumen justifica la inversión.'],
      ['¿Cuánto cuesta?', `${COSTO} Los costos de terceros (por ejemplo, cargos de Meta por WhatsApp o consumo de modelos de IA) se presupuestan aparte.`],
      ['¿Cuánto tarda en estar funcionando?', 'Un agente de atención suele quedar funcionando entre la segunda y la cuarta semana después del diagnóstico y la propuesta, según el alcance.'],
    ],
    fuentes: `
- Colegio de Escribanos de la Ciudad de Buenos Aires: [Cantidad de escrituras de compraventa realizadas en septiembre 2026](https://www.colegio-escribanos.org.ar/2026/10/22/cantidad-de-escrituras-de-compraventa-realizadas-en-septiembre-2026/), 22 de octubre de 2026.
- El Cronista: [Así funciona la novedad de WhatsApp que usan las pymes para vender más sin sumar personal](https://www.cronista.com/infotechnology/it-business/asi-funciona-la-novedad-de-whatsapp-que-usan-las-pymes-para-vender-mas-sin-sumar-personal/), 18 de mayo de 2026 (datos de Meta).
`,
    relacionados: [
      ['/blog/que-es-un-crm-y-por-que-tu-pyme-lo-necesita', 'Qué es un CRM y por qué tu pyme lo necesita'],
      ['/blog/agentes-de-ia-vs-chatbots', 'Agentes de IA vs. chatbots'],
    ],
  },

  'distribuidoras-mayoristas': {
    slug: 'distribuidoras-mayoristas',
    path: '/automatizacion-distribuidoras-mayoristas',
    nav: 'Distribuidoras y mayoristas',
    title: 'Automatización para distribuidoras y mayoristas | Nimbo',
    description:
      'Pedidos por WhatsApp que se cargan solos, stock y facturación integrados y tableros con alertas para distribuidoras argentinas. Diagnóstico sin cargo.',
    eyebrow: 'Automatización por rubro · Distribuidoras y mayoristas',
    h1: 'Automatización para distribuidoras y mayoristas en Argentina',
    resumen:
      'En Nimbo automatizamos el circuito que más errores genera en una distribuidora: el pedido que llega por WhatsApp, se tipea a mano, se cruza con el stock y termina en una factura. Lo conectamos de punta a punta (pedido, stock, facturación, cobranza) y sumamos un tablero con alertas para que veas ventas, márgenes y deudas sin armar planillas. Empezamos con un diagnóstico sin cargo de 20 minutos.',
    card: 'Pedidos por WhatsApp que se cargan solos, stock y facturación conectados y un tablero que avisa.',
    service: {
      name: 'Automatización para distribuidoras y mayoristas',
      serviceType: 'Automatización de pedidos, integración de sistemas y tableros de datos',
      description:
        'Toma de pedidos por WhatsApp con IA, integración con stock y facturación electrónica, recordatorios de cobranza y tableros con alertas para distribuidoras y mayoristas en Argentina.',
      audience: 'Distribuidoras y mayoristas',
    },
    mercado: {
      title: '¿Cómo viene el sector mayorista en 2026?',
      md: `
- Las ventas de los autoservicios mayoristas cayeron **3,6% interanual a precios constantes en agosto de 2026** y acumulan una baja de 2,9% entre enero y agosto. El ticket promedio fue de **$ 47.067** y el personal ocupado bajó 6,8% interanual, a 12.863 personas. Fuente: [INDEC, Encuesta de autoservicios mayoristas, agosto de 2026 (publicado el 22 de octubre de 2026)](https://www.indec.gob.ar/uploads/informesdeprensa/autoservicios_mayoristas_10_26AFB69B25A5.pdf).
- Del lado de sus clientes, las ventas minoristas pyme subieron 0,3% interanual en septiembre y acumulan −2,1% en el año, según la [CAME (4 de octubre de 2026)](https://www.redcame.org.ar/prensa/574311162/las-ventas-minoristas-pyme-aumentaron-03-interanual-en-septiembre).
- **8 de cada 10 argentinos** prefieren WhatsApp para comunicarse con empresas, según datos de Meta citados por ${WA_CRONISTA}.

Con volúmenes que no crecen y equipos más chicos, la eficiencia operativa pasa a ser margen: menos errores de carga, menos horas de tipeo y cobranzas al día.
`,
    },
    problemas: {
      title: '¿Qué problemas tiene hoy una distribuidora?',
      items: [
        ['Pedidos por WhatsApp que alguien tiene que tipear', 'Comercios, preventistas y clientes mandan pedidos por WhatsApp, audio o foto de una lista. Alguien los pasa a mano al sistema, con errores de producto, cantidad o precio.'],
        ['Listas de precios que cambian seguido', 'Cada actualización hay que mandarla a todos los clientes y cargarla en el sistema. Si un vendedor usa la lista vieja, se pierde margen o hay reclamos.'],
        ['Stock que no coincide', 'El sistema dice una cosa, el depósito otra. Se venden productos que no hay o se dejan de vender productos que sí hay.'],
        ['Facturación y remitos manuales', 'Pasar del pedido confirmado a la factura electrónica y al remito lleva tiempo y suma otra oportunidad de error.'],
        ['Cobranzas que se persiguen a mano', 'Saber quién debe, cuánto y desde cuándo requiere cruzar planillas. Los recordatorios dependen de que alguien se acuerde.'],
        ['Información para decidir que llega tarde', 'Qué producto deja más margen, qué cliente dejó de comprar, qué zona cae: los números existen, pero armarlos lleva días.'],
      ],
    },
    soluciones: {
      title: '¿Qué automatiza Nimbo en una distribuidora?',
      items: [
        ['Toma de pedidos por WhatsApp con IA', 'Un agente de IA interpreta el pedido escrito como sea (texto o lista), lo cruza con el catálogo, la lista de precios del cliente y el stock, arma el resumen y pide confirmación. Lo que no entiende o lo que sale de lo normal se deriva a una persona.'],
        ['Pedido cargado solo en el sistema o la planilla', 'El pedido confirmado entra directo al sistema de gestión o a la planilla, se descuenta el stock y se genera la tarea para el depósito.'],
        ['Facturación electrónica integrada', 'Desde el pedido confirmado se emite la factura electrónica de ARCA y se le envía al cliente, cuando el sistema lo permite.'],
        ['Listas de precios y avisos automáticos', 'Cuando cambia la lista, se actualiza en el agente y se envía a los clientes que corresponda.'],
        ['Recordatorios de cobranza', 'Avisos automáticos por vencimiento, con el detalle de la deuda, y alerta interna cuando un cliente supera un plazo o un monto.'],
        ['Tablero comercial con alertas', 'Ventas por cliente, producto, zona y vendedor; márgenes; stock y días de cobertura; deudas por antigüedad. Alertas como “este cliente lleva 30 días sin comprar” o “este producto alcanza para 5 días”.'],
        ['Software a medida cuando hace falta', 'Si lo que necesitás no existe hecho o no se integra, lo desarrollamos.'],
      ],
    },
    flujos: {
      title: '¿Cómo es un flujo automatizado de un pedido?',
      items: [
        {
          t: 'Ejemplo: pedido de un almacén por WhatsApp',
          steps: [
            'Un almacén escribe a las 7 h: “Mandame 10 cajas de galletitas surtidas, 6 de aceite de 1,5 y 2 bultos de yerba”.',
            'El agente de IA reconoce los productos del catálogo, aplica la lista de precios de ese cliente y consulta el stock.',
            'Responde con el detalle, el total y la fecha de entrega según la zona; si falta algo, ofrece un reemplazo.',
            'El cliente confirma.',
            'El pedido se carga en el sistema, se descuenta el stock y se genera la orden para el depósito y el reparto.',
            'Se emite la factura electrónica y se le envía al cliente por WhatsApp o mail.',
            'Si el cliente tiene deuda vencida, el pedido queda en espera y se le avisa al responsable de cobranzas.',
            'Todo alimenta el tablero de ventas, stock y cobranzas.',
          ],
        },
      ],
    },
    diagnostico: [
      ['Diagnóstico sin cargo', '20 minutos por videollamada. Revisamos cómo entran los pedidos, qué sistema de gestión y facturación usan, cómo se maneja el stock y las cobranzas, y dónde se pierde tiempo o plata.'],
      ['Estimación del costo actual', 'Calculamos cuánto te cuestan hoy la carga manual, los errores y las demoras.'],
      ['Propuesta cerrada', 'Si hay caso, en 48 horas te mandamos una propuesta en pesos, a precio fijo, con alcance, plazos y resultados esperados. Si no hay caso, te lo decimos.'],
      ['Implementación', 'Pruebas con pedidos reales, con pagos por hitos.'],
      ['Servicio gestionado', 'Operación, monitoreo, soporte, ajustes y reporte mensual, con un abono según el alcance.'],
    ],
    faq: [
      ['¿Se puede conectar WhatsApp con mi sistema de gestión?', 'En la mayoría de los casos sí, si el sistema tiene una forma de integrarse (API, base de datos o exportaciones). Si no la tiene, se puede trabajar con una planilla intermedia. Lo revisamos en el diagnóstico.'],
      ['¿Qué pasa si el cliente escribe el pedido con errores o nombres informales?', 'El agente de IA se configura con los nombres que usan tus clientes y los asocia con los productos del catálogo. Si no está seguro, pregunta o deriva a una persona antes de confirmar.'],
      ['¿Mis preventistas pueden seguir trabajando como siempre?', 'Sí. Pueden mandar los pedidos por WhatsApp como ya lo hacen, y el sistema los carga. Se ahorra el tipeo, no se cambia la forma de vender.'],
      ['¿Se puede automatizar la factura electrónica?', 'Sí, cuando el sistema de facturación permite integrarse con ARCA o ya lo hace. El pedido confirmado genera la factura y se envía al cliente.'],
      ['¿Necesito cambiar de sistema?', 'No necesariamente. Preferimos integrar lo que ya usás. Si el sistema actual no permite integrarse y es un freno, te lo decimos en el diagnóstico y vemos alternativas.'],
      ['¿Cuánto cuesta?', `${COSTO} Los costos de terceros (por ejemplo, cargos de Meta por WhatsApp o licencias) se presupuestan aparte.`],
      ['¿Hay ayudas para financiar la digitalización?', 'El Ministerio de Economía lanzó el programa Kit 4.0, que cubre hasta el 50% del valor de kits de CRM, comercio digital, analítica e IA comercial y sistemas de gestión, con topes, según la Cámara Argentina de Comercio y Servicios (13 de octubre de 2026).'],
    ],
    fuentes: `
- INDEC: [Encuesta de autoservicios mayoristas, agosto de 2026](https://www.indec.gob.ar/uploads/informesdeprensa/autoservicios_mayoristas_10_26AFB69B25A5.pdf), publicada el 22 de octubre de 2026.
- CAME: [Las ventas minoristas pyme aumentaron 0,3% interanual en septiembre](https://www.redcame.org.ar/prensa/574311162/las-ventas-minoristas-pyme-aumentaron-03-interanual-en-septiembre), 4 de octubre de 2026.
- El Cronista: [Así funciona la novedad de WhatsApp que usan las pymes para vender más sin sumar personal](https://www.cronista.com/infotechnology/it-business/asi-funciona-la-novedad-de-whatsapp-que-usan-las-pymes-para-vender-mas-sin-sumar-personal/), 18 de mayo de 2026 (datos de Meta).
- Cámara Argentina de Comercio y Servicios: [Kit 4.0: un programa de apoyo a la digitalización de las pymes](https://www.cac.com.ar/noticias/kit-4-0-un-programa-de-apoyo-a-la-digitalizacion-de-las-pymes), 13 de octubre de 2026.
`,
    relacionados: [
      ['/blog/como-medir-el-roi-de-una-automatizacion', 'Cómo medir el retorno de una automatización'],
      ['/blog/automatizar-pyme-ia-chatbot-whatsapp', 'Automatizar una pyme con IA y WhatsApp'],
    ],
  },

  'servicios-profesionales': {
    slug: 'servicios-profesionales',
    path: '/automatizacion-servicios-profesionales',
    nav: 'Estudios y servicios profesionales',
    title: 'Automatización para estudios profesionales | Nimbo',
    description:
      'Turnos, recordatorios, pedido de documentación, seguimiento de vencimientos y asistentes internos con IA para estudios argentinos. Diagnóstico sin cargo.',
    eyebrow: 'Automatización por rubro · Estudios y servicios profesionales',
    h1: 'Automatización e IA para estudios y servicios profesionales en Argentina',
    resumen:
      'En Nimbo automatizamos el trabajo repetitivo de estudios contables, jurídicos, consultorios y otros servicios profesionales: la atención y los turnos por WhatsApp, el pedido y la organización de documentación, los recordatorios de vencimientos y la carga de datos entre sistemas. Sumamos asistentes internos con IA que consultan la información del estudio, siempre con un profesional que revisa. Empezamos con un diagnóstico sin cargo de 20 minutos.',
    card: 'Turnos y consultas por WhatsApp, pedido de documentación y vencimientos que se recuerdan solos.',
    service: {
      name: 'Automatización e IA para estudios y servicios profesionales',
      serviceType: 'Automatización de procesos e implementación de agentes y asistentes de IA',
      description:
        'Atención y turnos por WhatsApp, pedido y organización de documentación, recordatorios de vencimientos, extracción de datos y asistentes internos con IA para estudios y servicios profesionales en Argentina.',
      audience: 'Estudios contables, jurídicos, consultorios y servicios profesionales',
    },
    mercado: {
      title: '¿Cómo usan la IA los profesionales en Argentina?',
      md: `
Los profesionales ya usan IA, pero mayormente de forma individual y para tareas puntuales. La [encuesta 2026 de Contadores Argentinos (3 de septiembre de 2026)](https://contadoresargentinos.com.ar/noticia/12975/adopcion-de-inteligencia-artificial-entre-contadores-en-argentina-resultados-de-encuesta-2026), con 513 contadores, muestra que:

- El **89,1%** probó o usa IA, y el **69,4%** la usa con frecuencia.
- Los usos principales son la **consulta normativa (67,3%)**, la **redacción de informes (51,7%)** y el **análisis de documentos (48%)**.
- Tareas como la **carga de datos en portales** y la **preparación de estados contables** siguen siendo mayormente manuales.
- El **28,7%** dice ahorrar entre 1 y 3 horas por semana.

En las pymes en general pasa algo parecido: según [nadIA (abril de 2026)](https://nadia.ar/extras/nadia_encuesta_pymesARG2026.pdf), el 57% de las empresas que usan IA no mide su impacto y el 72,5% no tiene pautas de uso. (Esa encuesta relevó empresas industriales y de software; la citamos como referencia general.)

La oportunidad está en pasar del uso individual de un chat a procesos del estudio que funcionen solos y con control.
`,
    },
    problemas: {
      title: '¿Qué problemas tiene hoy un estudio o un servicio profesional?',
      items: [
        ['WhatsApp que no para', 'Clientes que consultan por cualquier cosa, a cualquier hora: “¿Me mandaste la factura?”, “¿Cuándo vence?”, “¿Tenés turno el jueves?”. Interrumpe el trabajo técnico todo el día.'],
        ['Turnos y reuniones coordinados a mano', 'Idas y vueltas para encontrar horario, olvidos y ausencias sin aviso.'],
        ['Pedir documentación una y otra vez', 'Cada mes o cada trámite hay que pedir los mismos comprobantes, extractos o formularios, perseguir a quien no los manda y ordenar lo que llega por mail, WhatsApp y carpetas.'],
        ['Vencimientos que dependen de la memoria', 'Vencimientos impositivos, renovaciones, audiencias, controles: si el recordatorio depende de una persona, el riesgo de que se pase uno existe.'],
        ['Carga de datos repetitiva', 'Pasar datos de comprobantes, PDFs o planillas a sistemas y portales, una y otra vez. Según la encuesta de Contadores Argentinos, es de lo que más sigue siendo manual.'],
        ['El conocimiento del estudio en la cabeza de cada uno', 'Criterios, modelos de escritos, respuestas a consultas frecuentes: si no está ordenado, cada persona nueva arranca de cero.'],
      ],
    },
    soluciones: {
      title: '¿Qué automatiza Nimbo en un estudio o servicio profesional?',
      items: [
        ['Agente de atención por WhatsApp', 'Responde consultas frecuentes (horarios, requisitos, honorarios publicados, estado de un trámite si está disponible en el sistema), toma los datos de nuevos clientes y deriva al profesional lo que requiere criterio.'],
        ['Turnos automáticos', 'Ofrece horarios según la agenda de cada profesional, confirma, manda recordatorios y libera el turno si alguien cancela.'],
        ['Pedido de documentación y organización', 'Recordatorios automáticos a cada cliente con la lista de lo que falta, recepción por WhatsApp o mail y guardado ordenado en la carpeta del cliente. Aviso al profesional cuando está todo.'],
        ['Recordatorios de vencimientos', 'Calendario de vencimientos por cliente con avisos automáticos al cliente y al equipo.'],
        ['Extracción y carga de datos', 'La IA lee comprobantes, PDFs y mails, extrae los datos y los carga en planillas o sistemas, con revisión humana antes de confirmar.'],
        ['Asistente interno con IA', 'Un asistente que responde con la información del propio estudio (procedimientos, modelos, criterios), para que el equipo encuentre rápido lo que necesita.'],
        ['Tablero del estudio', 'Clientes activos, trámites en curso, vencimientos próximos, documentación pendiente y horas por cliente.'],
        ['Facturación de honorarios', 'Emisión de facturas electrónicas recurrentes y recordatorios de pago, cuando el sistema de facturación lo permite.'],
      ],
    },
    flujos: {
      title: '¿Cómo es un flujo automatizado?',
      items: [
        {
          t: 'Ejemplo: pedido mensual de documentación en un estudio contable',
          steps: [
            'El día 1 de cada mes, cada cliente recibe por WhatsApp la lista de lo que tiene que mandar.',
            'El cliente envía fotos o PDFs por el mismo chat.',
            'El sistema identifica cada documento, lo guarda en la carpeta del cliente y tilda lo recibido.',
            'A los cinco días, quien no completó recibe un recordatorio con lo que falta.',
            'Si el día 10 sigue incompleto, se le avisa al profesional a cargo.',
            'Cuando está todo, el profesional recibe un aviso para empezar a trabajar, con los datos ya extraídos para revisar.',
          ],
        },
        {
          t: 'Ejemplo: turno en un consultorio o estudio',
          steps: [
            'Un cliente escribe: “Quiero una consulta por un tema laboral”.',
            'El agente pregunta los datos básicos y el tipo de consulta.',
            'Ofrece horarios del profesional que corresponde y agenda.',
            'Envía confirmación, ubicación o link de la videollamada, y recordatorios.',
            'Si el cliente pregunta algo técnico, el agente no lo responde: lo anota para el profesional.',
          ],
        },
      ],
    },
    diagnostico: [
      ['Diagnóstico sin cargo', '20 minutos por videollamada. Revisamos cómo entran las consultas, cómo se coordinan los turnos, cómo se pide y se guarda la documentación, qué sistemas usan y dónde se pierden horas.'],
      ['Estimación del costo actual', 'Calculamos cuántas horas del equipo se van en tareas repetitivas.'],
      ['Propuesta cerrada', 'Si hay caso, en 48 horas te mandamos una propuesta en pesos, a precio fijo, con alcance, plazos y resultados esperados. Si no hay caso, te lo decimos.'],
      ['Implementación', 'Pruebas con casos reales, con pagos por hitos.'],
      ['Servicio gestionado', 'Operación, monitoreo, soporte, ajustes y reporte mensual, con un abono según el alcance.'],
    ],
    faq: [
      ['¿La IA puede responder consultas técnicas a mis clientes?', 'No lo recomendamos. El agente responde lo administrativo y lo frecuente, y deriva lo técnico al profesional. El asistente interno ayuda al equipo, pero siempre revisa una persona.'],
      ['¿Qué pasa con la confidencialidad de los datos de mis clientes?', 'Se define en el diagnóstico qué datos se procesan, dónde se guardan y quién accede.'],
      ['¿Sirve para un estudio chico?', 'Sí, si hay tareas repetitivas que consumen horas todas las semanas, como pedir documentación o coordinar turnos. En el diagnóstico vemos si el ahorro justifica la inversión.'],
      ['¿Puedo seguir usando mi sistema contable o de gestión?', 'Sí. Preferimos integrar lo que ya usás. Si el sistema no permite integrarse, buscamos una alternativa intermedia, como planillas conectadas.'],
      ['¿Mis clientes tienen que instalar algo?', 'No. Usan WhatsApp o el mail como siempre.'],
      ['¿Cuánto cuesta?', `${COSTO} Los costos de terceros se presupuestan aparte.`],
    ],
    fuentes: `
- Contadores Argentinos: [Adopción de inteligencia artificial entre contadores en Argentina: resultados de encuesta 2026](https://contadoresargentinos.com.ar/noticia/12975/adopcion-de-inteligencia-artificial-entre-contadores-en-argentina-resultados-de-encuesta-2026), 3 de septiembre de 2026.
- nadIA (Fundar y CEPE Di Tella): [Encuesta nacional sobre adopción de IA en pymes de la Argentina](https://nadia.ar/extras/nadia_encuesta_pymesARG2026.pdf), abril de 2026.
`,
    relacionados: [
      ['/blog/que-es-un-crm-y-por-que-tu-pyme-lo-necesita', 'Qué es un CRM y por qué tu pyme lo necesita'],
      ['/desarrollo-web-pymes', 'Desarrollo web para pymes'],
    ],
  },
}

export const RUBROS = Object.values(rubros)

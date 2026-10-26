import { NdPageHero } from '../components/nd/Nd'
import { useSeo } from '../hooks/useSeo'

const EMAIL = 'contacto@nimbodata.com'

const SECCIONES = [
  {
    t: 'Quiénes somos',
    p: [
      'Nimbo (nimbodata.com) es una consultora argentina de transformación digital para pymes: páginas web, automatización de procesos, agentes de IA, análisis de datos y visión por computadora. Esta política explica qué datos tratamos cuando visitás nuestro sitio, nos escribís o interactuás con nuestra cuenta de Instagram @nimbodata, con nuestro WhatsApp o con el asistente del blog.',
      'Contacto para todo lo que tenga que ver con tus datos: contacto@nimbodata.com.',
    ],
  },
  {
    t: 'Qué datos tratamos',
    l: [
      'Sitio web: con nuestro contador propio medimos visitas sin cookies y sin guardar tu dirección IP. Registramos qué páginas se ven, de qué sitio llegaste (y los parámetros utm del link, si los tiene), si tocaste un botón de contacto (WhatsApp, mail o agenda) y cuál de los botones de la página fue (por ejemplo, el del inicio o el de un servicio), el tipo de dispositivo (móvil o escritorio) y un identificador que cambia todos los días y no permite reconocerte de un día para el otro. Respetamos la opción «No rastrear» de tu navegador.',
      'En tu dispositivo: el idioma y el tema (claro u oscuro) que elegís quedan guardados solo en tu navegador. Las tipografías del sitio se cargan desde Google Fonts, por lo que Google recibe tu dirección IP cuando abrís una página.',
      'Publicidad en Meta (Facebook e Instagram): el sitio usa el Píxel de Meta, que guarda cookies propias (como _fbp y, si llegaste desde un anuncio, _fbc) y le informa a Meta qué páginas visitás. Cuando agendás una llamada le avisamos a Meta que hubo una reserva, junto con tu mail, tu teléfono y tu nombre convertidos en un código irreversible (hash SHA-256), tu dirección IP y tu navegador, para saber qué anuncio la generó. En las páginas de nuestros anuncios en ChatGPT se usa además el píxel de anuncios de OpenAI, que registra la visita y si tocaste el botón de WhatsApp.',
      'Agenda de llamadas (/agendar): nombre, mail, WhatsApp y empresa (opcionales), el tema y el horario elegido, y de qué anuncio o link llegaste (parámetros utm, fbclid o gclid y la página de entrada). Se guardan en nuestro Google Calendar y nos llegan a un canal interno de avisos del equipo.',
      'Formulario y chat de contacto: nombre, mail, teléfono y empresa (opcionales), tema, rango de presupuesto y tu mensaje. Nos llegan por mail y a un canal interno de avisos del equipo.',
      'WhatsApp y mail: lo que nos escribís (tu nombre o número y tu mensaje) para poder responderte.',
      'Instagram (@nimbodata): los comentarios y mensajes directos que nos enviás, tu nombre de usuario, tu identificador de usuario de Instagram, la fecha y el texto, más una nota interna con el motivo por el que respondimos (o no) y las respuestas que enviamos, para poder atenderte.',
    ],
  },
  {
    t: 'Para qué los usamos',
    p: ['Para responder tus consultas, atender pedidos de información sobre nuestros servicios, mejorar el sitio y medir qué anuncios nos traen consultas. Los datos que compartimos con Meta y OpenAI son solo para medir y optimizar nuestras campañas; no vendemos tus datos ni los cedemos a terceros para sus propios fines. Sí usamos proveedores de servicios que tratan datos por cuenta nuestra y solo para prestarnos el servicio (por ejemplo, de inteligencia artificial, de alojamiento y de avisos al equipo, como se describe más abajo).'],
  },
  {
    t: 'Cookies y cómo desactivarlas',
    p: [
      'Usamos cookies de Meta (_fbp, _fbc y las que Meta pone desde facebook.com) para medir nuestros anuncios. Meta las trata según su propia política (facebook.com/privacy/policy) y puede usarlas para mostrarte publicidad. Podés borrarlas o bloquearlas desde la configuración de tu navegador, usar un bloqueador de rastreo o configurar tus preferencias de anuncios en tu cuenta de Facebook o Instagram (Centro de cuentas → Preferencias de anuncios). Si las bloqueás, el sitio y la agenda funcionan igual.',
    ],
  },
  {
    t: 'Respuestas con asistentes virtuales',
    p: [
      'Algunas respuestas las redacta un asistente virtual de inteligencia artificial: en los comentarios y mensajes de Instagram, en el WhatsApp de Nimbo y en el asistente del blog. Cuando alguien pregunta si habla con un robot, el asistente lo aclara. Para redactar la respuesta enviamos el texto a un proveedor de inteligencia artificial que actúa por cuenta nuestra:',
    ],
    l: [
      'Instagram: el texto de tu comentario o mensaje, tu nombre de usuario, el título de la publicación en la que comentaste y los últimos mensajes de esa conversación.',
      'WhatsApp de Nimbo: el texto de tus mensajes y, si nos mandás imágenes, esas imágenes. Cuando hace falta que intervenga el equipo, se nos avisa por WhatsApp o Telegram y una persona retoma la conversación.',
      'Asistente del blog: lo que escribís en el chat y los últimos mensajes de esa conversación.',
    ],
    p2: [
      'El asistente sigue reglas (algunas las controla nuestro código y otras son instrucciones al asistente) y deriva a una persona lo que no le corresponde. Para los avisos al responsable de la cuenta de Instagram (por ejemplo, ante un posible cliente o algo que requiere atención humana) se envía un extracto de la conversación a su chat de Telegram, también como servicio que usamos por cuenta nuestra.',
      'En Instagram, el equipo puede revisar la actividad del asistente y pausarlo en cualquier momento. En algunos períodos una persona aprueba cada respuesta antes de que salga; en otros, el asistente responde solo dentro de esas reglas, y una persona revisa lo que hizo y se encarga de lo que deriva. No prometemos que una persona lea cada mensaje. Si preferís hablar con una persona, escribinos a contacto@nimbodata.com.',
    ],
  },
  {
    t: 'Cuánto tiempo los conservamos',
    p: ['A los 90 días borramos de nuestra base de datos el texto de los comentarios y mensajes de Instagram y de nuestras respuestas, tu nombre de usuario, tu identificador de usuario de Instagram y la nota interna con el motivo de cada decisión. Lo que queda es un registro anónimo (identificadores de la plataforma del comentario, estado y fechas), sin datos personales. Dos aclaraciones: las copias de seguridad pueden conservar ese texto hasta 14 días más, y los avisos que le llegan al responsable por Telegram quedan en ese chat. Lo que nos escribís por WhatsApp, por mail, por formulario o al asistente del blog se conserva mientras dure la conversación comercial.'],
  },
  {
    t: 'Tus derechos',
    p: ['Podés pedirnos acceso a tus datos, que los corrijamos o que los eliminemos. Si sos de Argentina, la Ley 25.326 de Protección de los Datos Personales te reconoce esos derechos y la Agencia de Acceso a la Información Pública es el organismo de control.'],
  },
  {
    t: 'Cómo pedir que eliminemos tus datos',
    p: ['Escribinos a contacto@nimbodata.com desde el mismo mail o indicando tu usuario de Instagram o tu número de WhatsApp, con el asunto «Eliminar mis datos». Borramos de nuestros sistemas lo que guardamos sobre vos (tus comentarios y mensajes y nuestras respuestas) y te lo confirmamos dentro de los 10 días hábiles. Podemos eliminar de Instagram nuestras respuestas a tus comentarios; en cambio, las respuestas enviadas por mensaje directo no se pueden retirar desde Instagram y quedan en tu bandeja de entrada. Las copias de seguridad y los avisos de Telegram se eliminan según lo explicado en la sección de conservación.'],
  },
  {
    t: 'Instagram, WhatsApp y Meta',
    p: ['Instagram y WhatsApp son servicios de Meta Platforms, Inc. Lo que publicás o enviás a través de ellos también se rige por las políticas de Meta. Nuestro acceso a los comentarios y mensajes de la cuenta @nimbodata se limita a los que recibe esa cuenta y se otorga con permisos que el titular de la cuenta @nimbodata concede a nuestra aplicación y puede revocar en cualquier momento. Vos podés borrar tus comentarios, dejar de escribirnos o bloquear la cuenta, y pedirnos la eliminación (ver arriba).'],
  },
  {
    t: 'Cambios en esta política',
    p: ['Si la modificamos, publicamos la versión nueva en esta página con su fecha de actualización.'],
  },
]

/* Convierte el mail en un enlace mailto: sin cambiar el resto del texto. */
function conMail(texto) {
  return texto.split(EMAIL).flatMap((parte, i, arr) =>
    i < arr.length - 1
      ? [parte, <a key={i} href={`mailto:${EMAIL}`}>{EMAIL}</a>]
      : [parte],
  )
}

export default function Privacidad() {
  useSeo({
    title: 'Política de privacidad — Nimbo',
    description: 'Qué datos trata Nimbo en su sitio web (incluidas las cookies de Meta), en la agenda y en Instagram, para qué, cuánto tiempo los conserva y cómo pedir que los eliminemos.',
    path: '/privacidad',
  })

  return (
    <main className="nd-page-main">
      <NdPageHero eyebrow="Legal" title="Política de privacidad">
        <p>Última actualización: 26 de octubre de 2026.</p>
      </NdPageHero>
      <div className="nd-wrap">
        <article className="nd-art">
          {SECCIONES.map(s => (
            <section key={s.t}>
              <h2>{s.t}</h2>
              {(s.p || []).map(x => <p key={x}>{conMail(x)}</p>)}
              {s.l && <ul>{s.l.map(x => <li key={x}>{conMail(x)}</li>)}</ul>}
              {(s.p2 || []).map(x => <p key={x}>{conMail(x)}</p>)}
            </section>
          ))}
        </article>
      </div>
    </main>
  )
}

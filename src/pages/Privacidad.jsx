import PageHero from '../components/g/PageHero'
import { useSeo } from '../hooks/useSeo'

const SECCIONES = [
  {
    t: 'Quiénes somos',
    p: [
      'Nimbo (nimbodata.com) es una consultora argentina de transformación digital para pymes: páginas web, automatización de procesos, agentes de IA, análisis de datos y visión por computadora. Esta política explica qué datos tratamos cuando visitás nuestro sitio, nos escribís o interactuás con nuestra cuenta de Instagram @nimbodata.',
      'Contacto para todo lo que tenga que ver con tus datos: contacto@nimbodata.com.',
    ],
  },
  {
    t: 'Qué datos tratamos',
    l: [
      'Sitio web: medimos visitas de forma anónima, sin cookies y sin guardar tu dirección IP ni tu navegador. Solo contamos páginas vistas, de qué sitio llegaste y si tocaste un botón de contacto.',
      'Formulario, WhatsApp y mail: lo que nos escribís (nombre, medio de contacto y tu mensaje) para poder responderte.',
      'Instagram (@nimbodata): los comentarios y mensajes directos que nos enviás, tu nombre de usuario, tu identificador de usuario de Instagram, la fecha y el texto, más una nota interna con el motivo por el que respondimos (o no) y las respuestas que enviamos, para poder atenderte.',
    ],
  },
  {
    t: 'Para qué los usamos',
    p: ['Para responder tus consultas, atender pedidos de información sobre nuestros servicios y mejorar el sitio. No usamos tus datos para publicidad ni los vendemos ni los cedemos a terceros para sus propios fines. Sí usamos proveedores de servicios que tratan datos por cuenta nuestra y solo para prestarnos el servicio (por ejemplo, el de inteligencia artificial y el de avisos por Telegram, que se describen más abajo).'],
  },
  {
    t: 'Respuestas con un asistente virtual',
    p: [
      'Algunas respuestas a comentarios y mensajes de Instagram las redacta un asistente virtual de inteligencia artificial, siempre dentro de reglas fijas (no da precios ni promete plazos, y deriva a una persona lo que no le corresponde). Cuando alguien pregunta si habla con un robot, el asistente lo aclara.',
      'Para redactar la respuesta, enviamos a un proveedor de servicios de inteligencia artificial que actúa por cuenta nuestra el texto de tu comentario o mensaje, tu nombre de usuario, el título de la publicación en la que comentaste y los últimos mensajes de esa conversación. Además, cuando hay que avisarle al responsable de la cuenta (por ejemplo, ante un posible cliente o algo que requiere atención humana), se envía un extracto de la conversación a su chat de Telegram, también como servicio que usamos por cuenta nuestra.',
      'El equipo puede revisar la actividad del asistente y pausarlo en cualquier momento. En algunos períodos una persona aprueba cada respuesta antes de que salga; en otros, el asistente responde solo dentro de esas reglas, y una persona revisa lo que hizo y se encarga de lo que deriva. No prometemos que una persona lea cada mensaje. Si preferís hablar con una persona, escribinos a contacto@nimbodata.com.',
    ],
  },
  {
    t: 'Cuánto tiempo los conservamos',
    p: ['A los 90 días borramos de nuestra base de datos el texto de los comentarios y mensajes de Instagram y de nuestras respuestas, tu nombre de usuario, tu identificador de usuario de Instagram y la nota interna con el motivo de cada decisión. Lo que queda es un registro anónimo (identificadores de la plataforma del comentario, estado y fechas), sin datos personales. Dos aclaraciones: las copias de seguridad pueden conservar ese texto hasta 14 días más, y los avisos que le llegan al responsable por Telegram quedan en ese chat. Los mensajes por mail o formulario se conservan mientras dure la conversación comercial.'],
  },
  {
    t: 'Tus derechos',
    p: ['Podés pedirnos acceso a tus datos, que los corrijamos o que los eliminemos. Si sos de Argentina, la Ley 25.326 de Protección de los Datos Personales te reconoce esos derechos y la Agencia de Acceso a la Información Pública es el organismo de control.'],
  },
  {
    t: 'Cómo pedir que eliminemos tus datos',
    p: ['Escribinos a contacto@nimbodata.com desde el mismo mail o indicando tu usuario de Instagram, con el asunto «Eliminar mis datos». Borramos de nuestros sistemas lo que guardamos sobre vos (tus comentarios y mensajes y nuestras respuestas) y te lo confirmamos dentro de los 10 días hábiles. Podemos eliminar de Instagram nuestras respuestas a tus comentarios; en cambio, las respuestas enviadas por mensaje directo no se pueden retirar desde Instagram y quedan en tu bandeja de entrada. Las copias de seguridad y los avisos de Telegram se eliminan según lo explicado en la sección de conservación.'],
  },
  {
    t: 'Instagram y Meta',
    p: ['Instagram es un servicio de Meta Platforms, Inc. Lo que publicás o enviás a través de Instagram también se rige por las políticas de Meta. Nuestro acceso a los comentarios y mensajes de la cuenta @nimbodata se limita a los que recibe esa cuenta y se otorga con permisos que podés revocar en cualquier momento desde la configuración de Instagram.'],
  },
  {
    t: 'Cambios en esta política',
    p: ['Si la modificamos, publicamos la versión nueva en esta página con su fecha de actualización.'],
  },
]

export default function Privacidad() {
  useSeo({
    title: 'Política de privacidad — Nimbo',
    description: 'Qué datos trata Nimbo en su sitio web y en Instagram, para qué, cuánto tiempo los conserva y cómo pedir que los eliminemos.',
    path: '/privacidad',
  })

  return (
    <main className="g-main">
      <PageHero>
        <div className="eyebrow">Legal</div>
        <h1>
          Política de <em>privacidad</em>
        </h1>
        <p className="hero-sub">Última actualización: 2 de octubre de 2026.</p>
      </PageHero>
      <section className="paper">
        <div className="wrap">
          <article className="art">
            {SECCIONES.map(s => (
              <section key={s.t}>
                <h2>{s.t}</h2>
                {(s.p || []).map(x => <p key={x}>{x}</p>)}
                {s.l && <ul>{s.l.map(x => <li key={x}>{x}</li>)}</ul>}
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  )
}

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
      'Instagram (@nimbodata): los comentarios y mensajes directos que nos enviás, tu nombre de usuario, la fecha y el texto, para poder responderte.',
    ],
  },
  {
    t: 'Para qué los usamos',
    p: ['Para responder tus consultas, atender pedidos de información sobre nuestros servicios y mejorar el sitio. No usamos tus datos para publicidad ni los vendemos o cedemos a terceros.'],
  },
  {
    t: 'Respuestas con un asistente virtual',
    p: [
      'Algunas respuestas a comentarios y mensajes de Instagram las redacta un asistente virtual de inteligencia artificial, siempre dentro de reglas fijas (no da precios ni promete plazos, y deriva a una persona lo que no le corresponde). Cuando alguien pregunta si habla con un robot, el asistente lo aclara.',
      'Para redactar la respuesta, el texto de tu comentario o mensaje es procesado por un proveedor de servicios de inteligencia artificial que actúa por cuenta nuestra. Una persona del equipo revisa las conversaciones y puede intervenir en cualquier momento; si preferís hablar con una persona, escribinos a contacto@nimbodata.com.',
    ],
  },
  {
    t: 'Cuánto tiempo los conservamos',
    p: ['El texto de los comentarios y mensajes de Instagram, y de nuestras respuestas, se borra de nuestros sistemas a los 90 días. Después quedan solo datos agregados (por ejemplo, cuántas conversaciones hubo), sin tu texto. Los mensajes por mail o formulario se conservan mientras dure la conversación comercial.'],
  },
  {
    t: 'Tus derechos',
    p: ['Podés pedirnos acceso a tus datos, que los corrijamos o que los eliminemos. Si sos de Argentina, la Ley 25.326 de Protección de los Datos Personales te reconoce esos derechos y la Agencia de Acceso a la Información Pública es el organismo de control.'],
  },
  {
    t: 'Cómo pedir que eliminemos tus datos',
    p: ['Escribinos a contacto@nimbodata.com desde el mismo mail o indicando tu usuario de Instagram, con el asunto «Eliminar mis datos». Borramos tus comentarios, mensajes y respuestas asociados y te lo confirmamos dentro de los 10 días hábiles. También podés pedirnos que borremos una respuesta nuestra a un comentario tuyo.'],
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

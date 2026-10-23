import { DisplayDemo } from '../components/HomeDemos'
import { NdFaq, NdFinal, WaLink } from '../components/nd/Nd'
import { useSeo } from '../hooks/useSeo'
import '../styles/automatizaciones.css'
import '../styles/home.css'

/*
  Nimbo Display (producto propio de Nimbo Consulting): cartelería digital que ya se vende.
  Problema → cómo funciona → planes → demo por WhatsApp. Precios confirmados por Seba (oct. 2026):
  $70.000 por dispositivo y un abono mensual que depende de la cantidad de pantallas.
*/

const MSG = '¡Hola! Vi Nimbo Display en el sitio y me gustaría ver una demo.'
const planMsg = (p) => `¡Hola! Me interesa Nimbo Display, plan ${p}. ¿Me pasan el abono mensual?`

const PROBLEMAS = [
  ['Pendrives y archivos por WhatsApp', 'Cada cambio de promo es alguien yendo pantalla por pantalla.'],
  ['Promos vencidas en la pantalla', 'La oferta del mes pasado sigue al aire y nadie se dio cuenta.'],
  ['Cada sucursal muestra otra cosa', 'No sabés qué está viendo el cliente en cada local.'],
  ['Una PC o un Smart TV que se cuelga', 'Si se corta internet o se reinicia, la pantalla queda en negro.'],
]

const PASOS = [
  ['01', 'Conectás', 'El dispositivo Nimbo va a la tele por HDMI y a la corriente. Nada más.'],
  ['02', 'Escaneás el QR', 'Le cargás el WiFi desde el celular y le asignás la pantalla y la sucursal.'],
  ['03', 'Cargás el contenido', 'Desde el panel en la nube: imágenes, videos, playlists, fechas y horarios.'],
  ['04', 'Se reproduce solo', 'El contenido se descarga al equipo y sigue andando aunque se corte internet.'],
]

const DATOS = ['Promociones', 'Precios', 'Stock', 'Horarios', 'Menús', 'Varias sucursales', 'Contenido con IA']

const PLANES = [
  {
    t: 'Local',
    n: '1 a 2 pantallas',
    d: 'Para un comercio, un consultorio o un local gastronómico.',
    incluye: ['Panel en la nube', 'Promos y horarios programados', 'Soporte por WhatsApp'],
  },
  {
    t: 'Sucursales',
    n: '3 a 10 pantallas',
    d: 'Para negocios con más de un local que quieren mostrar lo mismo en todos.',
    incluye: ['Todo lo del plan Local', 'Contenido por sucursal', 'Estado en vivo de cada pantalla'],
  },
  {
    t: 'Cadena',
    n: 'Más de 10 pantallas',
    d: 'Para cadenas y franquicias, con precios y stock conectados a sus sistemas.',
    incluye: ['Todo lo del plan Sucursales', 'Precios y stock desde tus planillas o sistema', 'Acompañamiento en la puesta en marcha'],
  },
]

const FAQ = [
  ['¿Funciona con cualquier televisor?', 'Sí, con cualquier tele o monitor que tenga entrada HDMI. No hace falta que sea Smart TV.'],
  ['¿Qué pasa si se corta internet?', 'La pantalla sigue mostrando la última campaña descargada. Cuando vuelve la conexión, se actualiza sola.'],
  ['¿Qué dispositivo es?', 'Un equipo chico basado en Raspberry Pi o Android, administrado desde la nube. Llega listo: el cliente nunca ve configuraciones ni sistemas operativos.'],
  ['¿Cuánto cuesta?', 'El dispositivo sale $70.000 por pantalla, pago único. Después hay un abono mensual que depende de cuántas pantallas tengas: te lo cotizamos en el día.'],
  ['¿Puedo verlo antes?', 'Sí. Escribinos por WhatsApp y te mostramos una demo en vivo del panel y de una pantalla funcionando.'],
]

export default function Display() {
  useSeo({
    title: 'Nimbo Display — Cartelería digital para negocios y sucursales | Nimbo',
    description:
      'Pantallas conectadas a tus promociones, precios, stock y horarios, administradas desde la nube. Sigue andando sin internet. Dispositivo desde $70.000 más abono mensual.',
    path: '/display',
    image: '/proyectos/nimbo-display.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://www.nimbodata.com/display#page',
          name: 'Nimbo Display — Cartelería digital para negocios y sucursales',
          description:
            'Cartelería digital para administrar promociones, precios, stock y horarios de locales y sucursales desde un panel en la nube.',
          url: 'https://www.nimbodata.com/display',
          inLanguage: 'es-AR',
          isPartOf: { '@id': 'https://www.nimbodata.com/#website' },
          about: { '@id': 'https://www.nimbodata.com/#business' },
          mainEntity: { '@id': 'https://www.nimbodata.com/display#product' },
          breadcrumb: { '@id': 'https://www.nimbodata.com/display#breadcrumb' },
        },
        {
          '@type': 'Product',
          '@id': 'https://www.nimbodata.com/display#product',
          name: 'Nimbo Display',
          description:
            'Sistema de cartelería digital centralizada: un dispositivo por pantalla, conectado por HDMI y administrado desde un panel en la nube.',
          brand: { '@type': 'Brand', name: 'Nimbo' },
          image: 'https://www.nimbodata.com/proyectos/nimbo-display.jpg',
          url: 'https://www.nimbodata.com/display',
          offers: {
            '@type': 'Offer',
            price: '70000',
            priceCurrency: 'ARS',
            description: 'Dispositivo por pantalla, más abono mensual según la cantidad de pantallas.',
            availability: 'https://schema.org/InStock',
            seller: { '@id': 'https://www.nimbodata.com/#business' },
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.nimbodata.com/display#faq',
          mainEntity: FAQ.map(([name, text]) => ({
            '@type': 'Question',
            name,
            acceptedAnswer: { '@type': 'Answer', text },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.nimbodata.com/display#breadcrumb',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: 'https://www.nimbodata.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Nimbo Display',
              item: 'https://www.nimbodata.com/display',
            },
          ],
        },
      ],
    },
  })

  return (
    <div className="nd nd-home">
      <section className="nd-hero dp-hero">
        <div className="nd-wrap nd-hero-in">
          <div className="nd-hero-copy">
            <span className="nd-eyebrow">Producto propio · Nimbo Display</span>
            <h1>
              Tus pantallas, <span className="hm-l">conectadas a tu negocio.</span>
            </h1>
            <p>
              Cartelería digital para locales y cadenas: promociones, precios, stock y horarios en cada pantalla,
              administrados desde un solo panel en la nube.
            </p>
            <div className="nd-btns">
              <WaLink cta="display" msg={MSG} className="nd-btn">
                Pedí una demo por WhatsApp
              </WaLink>
              <a href="#planes" className="nd-btn nd-btn-soft">
                Ver planes
              </a>
            </div>
          </div>
          <div className="nd-stage">
            <DisplayDemo />
          </div>
        </div>
      </section>

      <section id="problema" className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">Cambiar lo que muestra una pantalla no debería llevar una mañana.</h2>
          <div className="nd-cols">
            {PROBLEMAS.map(([t, d]) => (
              <div key={t} className="nd-col">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="nd-sec">
        <div className="nd-wrap">
          <h2 className="nd-h2">Cómo funciona</h2>
          <div className="nd-cols nd-steps">
            {PASOS.map(([k, t, d]) => (
              <div key={t} className="nd-col">
                <span className="nd-mono nd-step-k">{k}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nd-sec">
        <div className="nd-wrap dp-split">
          <div>
            <h2 className="nd-h2">Más que una tele pasando videos</h2>
            <p>
              La pantalla se vuelve un canal conectado a tu negocio: los precios salen de tu planilla, la promo se
              apaga sola cuando termina y cada sucursal muestra lo que le corresponde. Con IA, el contenido se arma a
              partir de tus datos.
            </p>
            <div className="dp-feats">
              {DATOS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
          <div className="dp-precio">
            <span>Dispositivo Nimbo, por pantalla</span>
            <b>$70.000</b>
            <p>
              Pago único por cada pantalla. Después, un abono mensual que depende de cuántas pantallas tengas, que te
              cotizamos en el día.
            </p>
          </div>
        </div>
      </section>

      <section id="planes" className="nd-sec">
        <div className="nd-wrap">
          <div className="nd-sec-top">
            <h2 className="nd-h2">Planes</h2>
            <p className="of-lead">Todos llevan el dispositivo a $70.000 por pantalla. El abono mensual se cotiza según la cantidad.</p>
          </div>
          <div className="of-grid">
            {PLANES.map((p) => (
              <article key={p.t} className="of-card">
                <div className="of-head">
                  <span className="nd-mono dp-plan-n">{p.n}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
                <div className="of-price">
                  <span className="of-desde">Dispositivo</span>
                  <b>$70.000</b>
                  <span className="of-unit">por pantalla</span>
                </div>
                <p className="of-nota">+ abono mensual según la cantidad de pantallas.</p>
                <ul className="of-list">
                  {p.incluye.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <div className="of-foot">
                  <WaLink cta="display-plan" msg={planMsg(p.t)} className="nd-btn">
                    Cotizar este plan
                  </WaLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="nd-sec">
        <div className="nd-wrap nd-narrow">
          <h2 className="nd-h2 nd-center">Preguntas frecuentes</h2>
          <NdFaq items={FAQ} />
        </div>
      </section>

      <NdFinal title="Mirá Nimbo Display funcionando" cta="display" msg={MSG} />
    </div>
  )
}

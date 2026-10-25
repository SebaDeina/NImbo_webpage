import { useEffect } from 'react'
import { NdPageHero, WA_LABEL, WaLink } from '../components/nd/Nd'
import { useAgendar } from '../components/nd/AgendarPopup'
import { useSeo } from '../hooks/useSeo'

/*
  /agendar: link directo para redes y mails. Al entrar se abre el agendador (popup estilo Cal.com,
  components/nd/AgendarPopup.jsx); si lo cierran, la página explica la llamada y lo vuelve a abrir.
*/

const WA_MSG = '¡Hola! Quiero agendar una llamada con Nimbo.'

export default function Agendar() {
  useSeo({
    title: 'Agendá una llamada — Nimbo Consulting',
    description:
      'Elegí día y horario para una videollamada de 30 minutos sin cargo con Nimbo. Te llega la invitación con el link de Google Meet.',
    path: '/agendar',
  })

  const agendar = useAgendar()
  useEffect(() => {
    agendar('pagina-agendar')
  }, [agendar])

  return (
    <main className="nd-page-main">
      <NdPageHero eyebrow="Llamada sin cargo" title="Agendá una llamada con Nimbo">
        <p>Elegí el día y el horario que te quede cómodo. Son 30 minutos por videollamada para ver tu caso.</p>
      </NdPageHero>

      <section className="nd-wrap ct-grid">
        <div className="ct-aside">
          <h2>Qué vemos en la llamada</h2>
          <ol className="dg-steps">
            <li>
              <b>Cómo trabajás hoy.</b> Cómo llega un cliente, un pedido o un turno, y quién hace cada paso.
            </li>
            <li>
              <b>Dónde se pierde tiempo.</b> Las tareas que se repiten y lo que cuestan por semana.
            </li>
            <li>
              <b>Qué se puede hacer.</b> Si hay caso, te mandamos una propuesta en pesos. Si no, te lo decimos.
            </li>
          </ol>
          <dl className="ct-list">
            <div>
              <dt>Duración</dt>
              <dd>30 minutos</dd>
            </div>
            <div>
              <dt>Modalidad</dt>
              <dd>Google Meet</dd>
            </div>
            <div>
              <dt>Costo</dt>
              <dd>Sin cargo</dd>
            </div>
          </dl>
        </div>

        <div className="ct-card ag-page-card">
          <h2>Elegí día y horario</h2>
          <p>Ves los horarios libres de nuestra agenda y la llamada queda confirmada al instante, con el link de Meet en tu mail.</p>
          <button type="button" className="nd-btn" onClick={() => agendar('pagina-agendar')}>
            Ver horarios disponibles
          </button>
          <WaLink cta="agendar" msg={WA_MSG} className="nd-more">
            ¿Preferís WhatsApp? {WA_LABEL} →
          </WaLink>
        </div>
      </section>
    </main>
  )
}

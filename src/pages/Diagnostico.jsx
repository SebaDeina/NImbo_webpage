import { NdPageHero, WA_LABEL, WaLink } from '../components/nd/Nd'
import { DiagnosticoForm } from '../components/nd/DiagnosticoForm'
import { useSeo } from '../hooks/useSeo'

/*
  Pedido de reunión de diagnóstico como página (para links directos y buscadores).
  En la home el mismo formulario se abre como popup (DiagnosticoForm).
*/

const WA_MSG = '¡Hola! Quiero agendar una reunión de diagnóstico para mi empresa.'

export default function Diagnostico() {
  useSeo({
    title: 'Agendá un diagnóstico gratis — Nimbo Consulting',
    description:
      'Una reunión sin cargo de 30 a 45 minutos para entender tus procesos, cuánto te cuesta el problema y si la IA o la automatización lo pueden resolver.',
    path: '/diagnostico',
  })

  return (
    <main className="nd-page-main">
      <NdPageHero eyebrow="Diagnóstico gratis" title="Contanos qué te frena y lo vemos juntos">
        <p>
          Una reunión por videollamada, sin cargo, para entender cómo trabaja tu empresa y dónde pierde tiempo. Si tiene
          solución, te decimos cómo la resolveríamos y cuánto costaría.
        </p>
      </NdPageHero>

      <section className="nd-wrap ct-grid">
        <div className="ct-aside">
          <h2>Qué pasa en la reunión</h2>
          <ol className="dg-steps">
            <li>
              <b>Tu proceso actual.</b> Cómo llega un cliente, un pedido o un turno, y quién hace cada paso.
            </li>
            <li>
              <b>Cuánto te cuesta.</b> Horas por semana y ventas que se pierden: el número que justifica (o no) invertir.
            </li>
            <li>
              <b>Qué se puede hacer.</b> Si hay caso, en 48 h te mandamos una propuesta en pesos. Si no, te lo decimos.
            </li>
          </ol>
          <dl className="ct-list">
            <div>
              <dt>Duración</dt>
              <dd>30 a 45 minutos</dd>
            </div>
            <div>
              <dt>Modalidad</dt>
              <dd>Videollamada</dd>
            </div>
            <div>
              <dt>Costo</dt>
              <dd>Sin cargo</dd>
            </div>
          </dl>
          <WaLink cta="diagnostico" msg={WA_MSG} className="nd-more">
            ¿Preferís WhatsApp? {WA_LABEL} →
          </WaLink>
        </div>

        <div className="ct-card">
          <DiagnosticoForm source="pagina" />
        </div>
      </section>
    </main>
  )
}

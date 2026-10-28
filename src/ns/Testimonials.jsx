// Lo que dicen los clientes: las reseñas reales que ya están en el sitio (src/components/Testimonios.jsx), en una cinta
// que corre sola y se frena al pasar el mouse. Primero las de empresas con equipo (salas de juego y WODSI), que es el
// cliente al que apunta Nimbo; después las de negocios chicos. La cinta va dentro del ancho del contenido: así una
// vuelta completa es más ancha que lo visible y nunca se ve la misma tarjeta dos veces a la vez.
// El Reencuentro y Zip mandan sus comentarios: van acá cuando lleguen (no publicar textos inventados).
const REVIEWS = [
  { name: 'Christina B.', role: 'Gerente · Salas de juego',
    text: 'El dashboard cambió cómo tomamos decisiones: vemos retención y rendimiento por sala en tiempo real, sin esperar reportes de nadie.' },
  { name: 'Leo', role: 'Coach · WODSI',
    text: 'WODSI quedó sólido y las automatizaciones por WhatsApp nos ahorran horas cada semana. Mis atletas tienen todo en un solo lugar.' },
  { name: 'Patricia', role: 'Fundadora · M.e.H Velas',
    text: 'La página está funcionando de diez: mostramos el catálogo, recibimos pedidos y en estos meses notamos más ventas que cuando solo vendíamos por Instagram.' },
  { name: 'Francisca Dioli', role: 'Psicóloga · psi.frantadioli',
    text: 'Estoy muy contenta con la página. Los pacientes me dicen que se sienten contenidas apenas entran, y el agendamiento de turnos nos simplificó el día a día.' },
  { name: 'Esteban Keklikian', role: 'Emprendedor',
    text: 'Con tu página por fin tenemos algo que nos representa de verdad. Se ve profesional, carga rápido y ya nos escribieron clientes que nos encontraron por Google.' },
]

export default function Testimonials() {
  // la cinta se duplica para que el loop no tenga corte; la copia queda oculta para lectores de pantalla
  const card = (r, copy) => (
    <figure key={`${copy ? 'c-' : ''}${r.name}`} className="tm-card" aria-hidden={copy || undefined}>
      <span className="tm-quote" aria-hidden="true">“</span>
      <blockquote>{r.text}</blockquote>
      <figcaption>
        <span className="tm-av">{r.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
        <span><b>{r.name}</b><small>{r.role}</small></span>
      </figcaption>
    </figure>
  )
  return (
    <section className="sec wrap tm" id="clientes">
      <div className="sec-head" data-reveal>
        <div>
          <h2>Lo que dicen nuestros clientes.</h2>
          <p className="lead">Negocios reales que hoy trabajan con lo que armamos.</p>
        </div>
      </div>
      <div className="tm-track" data-reveal>
        <div className="tm-row">
          {REVIEWS.map((r) => card(r, false))}
          {REVIEWS.map((r) => card(r, true))}
        </div>
      </div>
    </section>
  )
}

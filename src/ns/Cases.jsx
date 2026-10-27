// /casos · "Últimos proyectos": página aparte con todo lo que está funcionando, como shipperslab.tech/casos.
import { CASOS } from './data'
import Testimonials from './Testimonials'
import { Arrow } from './ui'
import { Words } from './motion'

export default function Cases() {
  return (
    <>
      <section className="cs-hero wrap">
        <h1 data-reveal>Últimos proyectos.</h1>
        <p className="lead words" data-reveal style={{ '--d': '80ms' }}><Words>Una selección de lo que construimos y hoy está funcionando en negocios reales.</Words></p>
      </section>

      <div className="frame">
        <section className="sec wrap">
          <div className="cs-grid">
            {CASOS.map((c, i) => (
              <a key={c.t} href={c.href} className="cs-card" data-reveal style={{ '--d': `${(i % 2) * 90}ms` }}>
                <ul className="cs-tags">{c.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <div className="cs-img"><img src={c.img} alt={`Captura de ${c.t}`} loading={i < 2 ? 'eager' : 'lazy'} /></div>
                <div className="cs-copy">
                  <div>
                    <h2>{c.t}</h2>
                    <p>{c.d}</p>
                  </div>
                  <span className="cs-go" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M3.5 8.5l5-5M4.5 3.5h4v4" /></svg></span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <Testimonials />

        <section className="wrap">
          <div className="cs-next" data-reveal>
            <h2>Acá va tu caso.</h2>
            <p className="lead">Cada proyecto empezó con una charla de 20 minutos. El próximo puede ser el tuyo.</p>
            <a className="btn btn-acc" href="/contacto">Contanos tu caso <Arrow /></a>
          </div>
        </section>
      </div>
    </>
  )
}

// /beta · los encuentros de la comunidad que arma Nimbo en Berazategui, con la estructura de
// shipperslab.tech/eventos (qué queremos armar, así se va a ver, buscamos partners) y el estilo de Nimbo.
// Desde acá se sigue a somosbeta.net.
import Fig from './Fig'
import { FIGS } from './scenes'
import { Arrow, Icon } from './ui'
import { Words } from './motion'

const SITE = 'https://somosbeta.net'
const INSCRIPCION = `${SITE}/eventos/encuentro-1/inscripcion/`

const IDEAS = [
  { icon: 'M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4', t: 'Encuentro #1: conocernos y conectar', open: true,
    d: 'El primero. Nos presentamos, contamos qué hace cada uno y armamos una dinámica para conectar. Lugar y fecha a definir en Bera.' },
  { icon: 'M12 3v3 M12 18v3 M3 12h3 M18 12h3 M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6', t: 'IA en la práctica',
    d: 'Charlas cortas de gente de la zona: qué está usando, qué le funcionó y qué no. Casos reales, contados por ellos.' },
  { icon: 'M14 4l6 6-9 9H5v-6z M12 6l6 6', t: 'Workshops',
    d: 'Talleres para armar algo paso a paso: un agente, una automatización o un tablero, con la compu abierta.' },
  { icon: 'M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z M6 11a6 6 0 0 0 12 0 M12 17v4', t: 'Demo nights',
    d: 'Noches para mostrar lo que estás armando y recibir feedback de gente que también construye.' },
  { icon: 'M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z M16 10h1.5a2.5 2.5 0 0 1 0 5H16 M8 3v3 M11 3v3', t: 'Café y networking',
    d: 'Un rato para conocer gente de Bera que hace cosas, sin agenda ni corbata.' },
]
// mockups de la identidad de BETA (public/beta). Van en filas que se ajustan a la proporción de cada foto,
// así ninguna se recorta: [archivo, nombre, ancho/alto, inclinación]
const PIEZAS = [
  [['afiche', 'Afiche', 1.833, -1], ['botella', 'Botella', 0.597, 1.5]],
  [['ropa', 'Remeras y buzos', 1.346, 1], ['stickers', 'Stickers', 1.5, -1.2]],
]
const PARTNERS = [
  ['M4 20V8l8-5 8 5v12 M9 20v-6h6v6', 'Espacios', 'Una oficina, un local, un cowork o cualquier lugar de la zona donde juntarnos.'],
  ['M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z', 'Sponsors', 'Herramientas, créditos o premios para la gente que presenta y participa.'],
  ['M8 11a3 3 0 1 0 0-6a3 3 0 1 0 0 6 M16 11a3 3 0 1 0 0-6a3 3 0 1 0 0 6 M3 20c0-3 2.5-5 5-5s5 2 5 5 M11 20c0-3 2.5-5 5-5s5 2 5 5', 'Una mano organizando', 'Difusión, logística o tiempo para que cada encuentro salga bien.'],
  ['M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z M16 10h1.5a2.5 2.5 0 0 1 0 5H16', 'Comida y café', 'Café, algo para comer, merch o lo que quieras ofrecer en el encuentro.'],
]

export default function Beta() {
  return (
    <>
      <section className="bt-hero wrap">
        <a className="bt-badge" href={INSCRIPCION} target="_blank" rel="noopener" data-reveal>
          <i />Encuentro #1 · inscripciones abiertas <Arrow />
        </a>
        <h1 data-reveal>Encuentros para toda la comunidad.</h1>
        <p className="lead words" data-reveal style={{ '--d': '80ms' }}>
          <Words>BETA es la comunidad de innovación que armamos desde Nimbo: networking, charlas sobre IA y herramientas, abiertos a todos. Arrancamos en Berazategui, sin ir hasta Capital.</Words>
        </p>
        <div className="fig sv-fig" data-reveal style={{ '--d': '160ms' }}>
          <Fig component={FIGS.encuentro.C} meta={FIGS.encuentro.meta} className="fig-player" />
        </div>
      </section>

      <div className="frame">
        <section className="sec wrap">
          <div className="sec-head" data-reveal>
            <div>
              <h2>Lo que queremos armar.</h2>
              <p className="lead">El primero ya tiene inscripciones abiertas. El resto son las ideas que vienen después.</p>
            </div>
          </div>
          <div className="ev-grid">
            {IDEAS.map((e, i) => {
              const card = (
                <>
                  <div className="ev-top">
                    <span className="ev-icon"><Icon d={e.icon} /></span>
                    <span className={`ev-tag${e.open ? ' open' : ''}`}>{e.open ? 'Inscripciones abiertas' : 'Próximamente'}</span>
                  </div>
                  <h4>{e.t}</h4>
                  <p>{e.d}</p>
                  {e.open && <span className="other-go">Anotarme <Arrow /></span>}
                </>
              )
              return e.open
                ? <a key={e.t} className="ev-card" href={INSCRIPCION} target="_blank" rel="noopener" data-reveal>{card}</a>
                : <div key={e.t} className="ev-card" data-reveal style={{ '--d': `${(i % 3) * 80}ms` }}>{card}</div>
            })}
          </div>
        </section>

        <section className="sec wrap">
          <div className="sec-head" data-reveal>
            <div>
              <h2>Así se va a ver.</h2>
              <p className="lead">Un primer vistazo a la identidad que vamos a llevar a los encuentros.</p>
            </div>
          </div>
          <div className="polas">
            {PIEZAS.map((fila, f) => (
              <div key={f} className="polas-row">
                {fila.map(([k, l, ar, r], i) => (
                  <figure key={k} className={`pola${ar < 1 ? ' pola-tall' : ''}`} style={{ '--r': `${r}deg`, '--d': `${i * 90}ms`, flexGrow: ar }} data-reveal>
                    <div className="pola-img" style={{ aspectRatio: ar }}><img src={`/beta/${k}.jpg`} alt={`${l} con la identidad de BETA`} loading="lazy" /></div>
                    <figcaption><b>{l}</b><span>Mockup</span></figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="sec wrap" data-buddy="¿Tenés un espacio en Bera? Nos vendría bárbaro.">
          <div className="sec-head" data-reveal>
            <div>
              <h2>Buscamos partners.</h2>
              <p className="lead">Queremos armar estos encuentros con empresas y personas de la zona. No hace falta ser una marca grande: estas son algunas formas de sumarse, y si se te ocurre otra, también suma.</p>
            </div>
          </div>
          <div className="ev-grid ev-grid-4">
            {PARTNERS.map(([icon, t, d], i) => (
              <div key={t} className="ev-card" data-reveal style={{ '--d': `${i * 70}ms` }}>
                <div className="ev-top"><span className="ev-icon"><Icon d={icon} /></span></div>
                <h4>{t}</h4>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="bt-actions" data-reveal>
            <a className="btn btn-acc" href="/contacto?s=beta">Enviar un mensaje <Arrow /></a>
            <a className="btn" href={SITE} target="_blank" rel="noopener">Conocer BETA <Arrow /></a>
          </div>
        </section>
      </div>
    </>
  )
}

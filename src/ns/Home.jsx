import Fig from './Fig'
import { PostRow } from './Blog'
import { POSTS } from './blog-posts'
import { AREAS, EQUIPO, FAQ, PASOS, RUBROS } from './data'
import { FIGS } from './scenes'
import Showcase from './Showcase'
import Testimonials from './Testimonials'
import Trust, { Tecnologias } from './Trust'
import { Arrow, Final, Icon, LiveEngraving } from './ui'
import { Words } from './motion'
import { LANDINGS } from '../lib/landings'

export default function Home() {
  return (
    <>
      <section className="hero wrap" id="top">
        <LiveEngraving className="hero-art" />
        <div className="hero-row">
          <h1 data-reveal>Automatizamos lo que frena a tu empresa.</h1>
          <div data-reveal style={{ '--d': '120ms' }}>
            <p className="lead"><Words>Agentes de IA, automatizaciones, tableros y software a medida para pymes de Argentina.</Words></p>
            <div className="btns">
              <a className="btn btn-acc" href="/contacto">Empecemos <Arrow /></a>
              <a className="btn" href="/casos">Ver casos <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      <div className="frame">
        <section id="servicios" className="sec wrap">
          <div className="sec-head" data-reveal>
            <div>
              <h2>Qué hacemos.</h2>
              <p className="lead">Sacamos el trabajo repetido de tu equipo y lo ponemos a andar solo, todos los días.</p>
            </div>
            <a className="btn" href="/casos">Ver casos <Arrow /></a>
          </div>
          {AREAS.map((a) => (
            <article className="row" key={a.slug}>
              <a className="fig" href={a.path} data-reveal aria-label={a.t}>
                <Fig component={FIGS[a.fig].C} meta={FIGS[a.fig].meta} className="fig-player" onTap={false} />
              </a>
              <div className="row-copy" data-reveal style={{ '--d': '100ms' }}>
                <div className="row-title">
                  <span className="chip"><Icon d={a.icon} /></span>
                  <h3>{a.t}</h3>
                </div>
                <p>{a.d}</p>
                <ul className="checks">{a.checks.map((c) => <li key={c}>{c}</li>)}</ul>
                <a className="btn" href={a.path}>Ver más <Arrow /></a>
              </div>
            </article>
          ))}
          {LANDINGS.some((l) => l.home) && (
            <div className="others ld-home">
              {LANDINGS.filter((l) => l.home).map((l, i) => (
                <a key={l.path} href={l.path} className="other ld-other" data-reveal style={{ '--d': `${i * 80}ms` }}>
                  <h4>{l.name}</h4>
                  <p>{l.summary}</p>
                  <span className="other-go">Ver más <Arrow /></span>
                </a>
              ))}
            </div>
          )}
        </section>

        <section id="rubros" className="sec wrap" data-buddy="¿Tu negocio es de estos? Te cuento qué le automatizaríamos.">
          <div className="sec-head" data-reveal>
            <div>
              <h2>Para quién trabajamos.</h2>
              <p className="lead">Pymes de 15 a 70 personas, con mucho ida y vuelta por WhatsApp y planillas. Estos son los rubros donde más rinde.</p>
            </div>
          </div>
          <div className="rubros">
            {RUBROS.map((r, i) => (
              <a key={r.slug} className="rubro" href={`/contacto?r=${r.slug}`} data-reveal style={{ '--d': `${i * 100}ms` }}>
                <div className="row-title">
                  <span className="chip"><Icon d={r.icon} /></span>
                  <h3>{r.t}</h3>
                </div>
                <p>{r.d}</p>
                <ul className="checks">{r.checks.map((c) => <li key={c}>{c}</li>)}</ul>
                <span className="btn btn-acc">Contanos tu caso <Arrow /></span>
              </a>
            ))}
          </div>
          <p className="rubros-more" data-reveal>También trabajamos con estudios y servicios profesionales, comercios y salud. <a href="/contacto">Contanos tu caso →</a></p>
        </section>

        <Showcase />

        <Testimonials />

        <Trust />

        <section id="equipo" className="sec wrap">
          <div className="sec-head" data-reveal>
            <div>
              <h2>¿Quiénes somos?</h2>
              <p className="lead">Un equipo chico de Buenos Aires. Hablás directo con quien construye tu sistema.</p>
            </div>
          </div>
          <div className="team">
            {EQUIPO.map((p, i) => (
              <article className="person" key={p.name} data-reveal style={{ '--d': `${i * 90}ms` }}>
                <div className="person-cover" style={{ backgroundPosition: p.pos }} />
                <div className="person-body">
                  {p.photo ? <img className="avatar" src={p.photo} alt={p.name} /> : <span className="avatar avatar-i">{p.initials}</span>}
                  <h4>{p.name}</h4>
                  <span className="mono">{p.role}</span>
                  <p>{p.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="proceso" className="sec wrap">
          <div className="sec-head" data-reveal><div><h2>Primero entendemos. Después construimos.</h2></div></div>
          <ol className="steps" data-reveal>
            {PASOS.map(([t, d], i) => (
              <li key={t}><span className="mono">0{i + 1}</span><h4>{t}</h4><p>{d}</p></li>
            ))}
          </ol>
        </section>

        <Tecnologias />

        <section id="blog" className="sec wrap">
          <div className="sec-head" data-reveal>
            <div>
              <h2>Del blog.</h2>
              <p className="lead">Web, automatización e IA explicadas sin rodeos.</p>
            </div>
            <a className="btn" href="/blog">Todos los artículos <Arrow /></a>
          </div>
          <ul className="bl-list" data-reveal>
            {POSTS.slice(0, 3).map((p) => <PostRow key={p.slug} p={p} />)}
          </ul>
        </section>

        <section id="faq" className="sec wrap" data-buddy="¿Otra duda? Preguntame a mí.">
          <div className="faq-grid">
            <div data-reveal>
              <span className="pill"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01" /></svg>Preguntas frecuentes</span>
              <h2 className="faq-title">Lo que nos preguntan antes de escribir.</h2>
              <div className="ask">
                <span className="chip chip-sq"><Icon d="M4 5h16v11H9l-5 4z" /></span>
                <div><b>¿Te quedó alguna duda?</b><span>Escribinos y te responde alguien del equipo.</span></div>
                <a className="btn btn-wide" href="/contacto">Hablemos <Arrow /></a>
              </div>
            </div>
            <div className="faq" data-reveal style={{ '--d': '100ms' }}>
              {FAQ.map(([q, a], i) => (
                <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
              ))}
            </div>
          </div>
        </section>

        <Final />
      </div>
    </>
  )
}

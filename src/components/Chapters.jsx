import { useEffect, useRef } from 'react'
import { CH } from '../lib/grabado/scenes'
import FX from '../lib/grabado/fx'
import { clamp } from '../lib/grabado/engine'

/* Índice de servicios (salta a cada capítulo). */
export function ServicesToc() {
  return (
    <section className="paper toc-sec" id="servicios">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Lo que hacemos</div>
          <h2>
            Cinco súper poderes, <em>una sola mesa</em>
          </h2>
          <p className="lead">Bajá y descubrí cada servicio funcionando. O saltá directo al que te interesa.</p>
        </div>
        <div className="toc">
          {CH.map((c) => (
            <a key={c.n} className="toc-row" href={`#cap-${c.n}`}>
              <span className="toc-n">{c.n}</span>
              <span className="toc-t">
                {c.t}
                {c.tag && <em className="tag-new">{c.tag}</em>}
              </span>
              <span className="toc-dots" />
              <span className="toc-c">{c.steps.length} casos</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/*
  Un capítulo por servicio: los pasos (casos de uso) se activan al scrollear y el
  escenario fijo reproduce la escena animada del paso activo. En móvil manda el
  texto que está en el centro de la zona libre bajo el escenario.
*/
export default function Chapters() {
  const root = useRef(null)

  useEffect(() => {
    const host = root.current
    if (!host) return
    const chapters = [...host.querySelectorAll('.chapter')]
    const idx = document.getElementById('chIndex')
    const ticks = new Map()

    const activate = (ch, i) => {
      if (ch._cur === i) return
      ch._cur = i
      const scenes = [...ch.querySelectorAll('.scene')]
      scenes.forEach((s) => s.classList.remove('on'))
      void ch.offsetWidth
      const sc = scenes[i]
      sc.classList.add('on')
      ch.querySelectorAll('.step').forEach((s) => s.classList.toggle('on', +s.dataset.i === i))
      ch.querySelectorAll('.stage-dots i').forEach((d) => d.classList.toggle('on', +d.dataset.i === i))
      sc.querySelectorAll('[data-count]').forEach((el) => {
        const to = +el.dataset.count
        const pre = el.dataset.prefix || ''
        const t0 = performance.now() + 700
        const step = (t) => {
          const k = clamp((t - t0) / 1600, 0, 1)
          const e = 1 - Math.pow(1 - k, 3)
          el.textContent = pre + Math.round(to * e).toLocaleString('es-AR')
          if (k < 1 && sc.classList.contains('on')) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      })
      sc.querySelectorAll('[data-tick]').forEach((el) => {
        clearInterval(ticks.get(el))
        let v = +el.dataset.tick
        el.textContent = v
        ticks.set(
          el,
          setInterval(() => {
            if (!sc.classList.contains('on')) return clearInterval(ticks.get(el))
            el.textContent = ++v
          }, 2200),
        )
      })
    }

    const onScroll = () => {
      const VH = document.documentElement.clientHeight
      const VW = document.documentElement.clientWidth
      const mid = VH * (VW < 900 ? 0.8 : 0.55)
      let curCh = null
      for (const ch of chapters) {
        const r = ch.getBoundingClientRect()
        if (r.top < mid && r.bottom > mid) curCh = ch
        if (r.top < VH * 0.8) ch.classList.add('seen')
        const steps = ch.querySelectorAll('.step')
        let best = 0
        if (VW < 900) {
          const zt = Math.max(0, ch.querySelector('.ch-stage').getBoundingClientRect().bottom)
          const zm = (zt + VH) / 2
          let dmin = 1e9
          steps.forEach((s) => {
            const t = s.querySelector('h3').getBoundingClientRect().top
            const b = s.querySelector('p').getBoundingClientRect().bottom
            const c = (t + b) / 2
            if (b > zt + 36 && t < VH - 60 && Math.abs(c - zm) < dmin) {
              dmin = Math.abs(c - zm)
              best = +s.dataset.i
            }
          })
          if (dmin === 1e9)
            steps.forEach((s) => {
              if (s.querySelector('h3').getBoundingClientRect().top < VH - 60) best = +s.dataset.i
            })
        } else {
          steps.forEach((s) => {
            if (s.getBoundingClientRect().top < mid) best = +s.dataset.i
          })
        }
        if (r.top < VH * 0.85 && r.bottom > VH * 0.15) activate(ch, best)
        else ch._cur = -1
        // bandada que cruza el capítulo según el avance
        const p = clamp((window.innerHeight - r.top) / (window.innerHeight + r.height * 0.5), 0, 1)
        const f = ch.querySelector('.ch-flock')
        if (f) f.style.transform = `translate(${(p * 1.3 - 0.15) * VW}px,${-p * 120}px)`
      }
      if (idx) {
        idx.classList.toggle('show', !!curCh)
        idx.querySelectorAll('a').forEach((a) => a.classList.toggle('on', !!curCh && a.dataset.n === curCh.dataset.n))
        if (curCh) idx.classList.toggle('on-ink', curCh.classList.contains('inkbg'))
      }
    }

    // ojos del búho siguen al mouse
    const onMove = (e) => {
      host.querySelectorAll('.emblem .pupil').forEach((p, i) => {
        const sv = p.ownerSVGElement.getBoundingClientRect()
        const k = sv.width / 240
        const cx = sv.left + (i % 2 ? 140 : 100) * k
        const cy = sv.top + 110 * k
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const d = Math.hypot(dx, dy) || 1
        const m = Math.min(4.5, d / 40)
        p.setAttribute('transform', `translate(${((dx / d) * m).toFixed(2)} ${((dy / d) * m).toFixed(2)})`)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('mousemove', onMove, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('mousemove', onMove)
      ticks.forEach((t) => clearInterval(t))
    }
  }, [])

  return (
    <div ref={root}>
      {CH.map((c, ci) => (
        <section
          key={c.n}
          className={`chapter ${ci % 2 ? 'paper flip' : 'inkbg'}`}
          id={`cap-${c.n}`}
          data-n={c.n}
        >
          <div className="flock ch-flock" aria-hidden="true">
            <svg viewBox="-10 -16 200 60" dangerouslySetInnerHTML={{ __html: FX.flock(5, ci * 7 + 3) }} />
          </div>
          <div className="wrap">
            <header className="ch-head">
              <div className="ch-emblem" aria-hidden="true" dangerouslySetInnerHTML={{ __html: FX.E[c.n] }} />
              <div className="eyebrow">
                Servicio {c.n}
                {c.tag && (
                  <>
                    {' · '}
                    <b>{c.tag}</b>
                  </>
                )}
              </div>
              <h2>{c.t}</h2>
              <p className="lead">{c.lead}</p>
            </header>
            <div className="ch-body">
              <div className="steps">
                {c.steps.map((s, i) => (
                  <article className="step" data-i={i} key={s.t}>
                    <span className="step-k">
                      {c.n}.{i + 1}
                    </span>
                    <h3>{s.t}</h3>
                    <p>{s.p}</p>
                  </article>
                ))}
              </div>
              <div className="ch-stage">
                <div className="stage">
                  <span className="corner a" />
                  <div className="stage-in">
                    <svg
                      viewBox="0 0 800 470"
                      role="img"
                      aria-label={`${c.t}: ${c.steps.map((s) => s.t).join(', ')}`}
                      dangerouslySetInnerHTML={{
                        __html: c.steps.map((s, i) => `<g class="scene" data-i="${i}">${s.svg}</g>`).join(''),
                      }}
                    />
                  </div>
                  <div className="stage-dots">
                    {c.steps.map((s, i) => (
                      <i key={i} data-i={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
      <div className="ch-index" id="chIndex" aria-label="Servicios">
        {CH.map((c) => (
          <a key={c.n} href={`#cap-${c.n}`} data-n={c.n}>
            {c.n}
          </a>
        ))}
      </div>
    </div>
  )
}

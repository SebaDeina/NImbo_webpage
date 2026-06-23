import { useLang } from '../i18n/LangContext'
import Reveal from './Reveal'

const REVIEWS = [
  {
    name: 'Francisca Dioli',
    role: { es: 'Psicóloga · psi.frantadioli', en: 'Psychologist · psi.frantadioli' },
    stars: 5,
    text: {
      es: 'Estoy muy contenta con la página. Los pacientes me dicen que se sienten contenidas apenas entran, y el agendamiento de turnos nos simplificó el día a día.',
      en: 'I\'m really happy with the website. Patients tell me they feel welcomed as soon as they land on it, and online booking made our daily routine much easier.',
    },
  },
  {
    name: 'Esteban Keklikian',
    role: { es: 'Emprendedor', en: 'Entrepreneur' },
    stars: 5,
    text: {
      es: 'Con tu página por fin tenemos algo que nos representa de verdad. Se ve profesional, carga rápido y ya nos escribieron clientes que nos encontraron por Google.',
      en: 'With the site you built we finally have something that truly represents us. It looks professional, loads fast, and we\'ve already had clients reach out after finding us on Google.',
    },
  },
  {
    name: 'Patricia',
    role: { es: 'Fundadora · M.e.H Velas', en: 'Founder · M.e.H Candles' },
    stars: 5,
    text: {
      es: 'La página está funcionando de diez: mostramos el catálogo, recibimos pedidos y en estos meses notamos más ventas que cuando solo vendíamos por Instagram.',
      en: 'The site is working great: we showcase the catalog, take orders, and these past months we\'ve seen more sales than when we only sold through Instagram.',
    },
  },
  {
    name: 'Leo',
    role: { es: 'Coach · WODSI', en: 'Coach · WODSI' },
    stars: 5,
    text: {
      es: 'WODSI quedó sólido y las automatizaciones por WhatsApp nos ahorran horas cada semana. Mis atletas tienen todo en un solo lugar.',
      en: 'WODSI turned out rock solid and the WhatsApp automations save us hours every week. My athletes have everything in one place.',
    },
  },
  {
    name: 'Christina B.',
    role: { es: 'Gerente · Salas de juego', en: 'Manager · Entertainment venues' },
    stars: 5,
    text: {
      es: 'El dashboard cambió cómo tomamos decisiones: vemos retención y rendimiento por sala en tiempo real, sin esperar reportes de nadie.',
      en: 'The dashboard changed how we make decisions: we see retention and performance per venue in real time, without waiting on anyone for reports.',
    },
  },
]

function Stars({ n = 5, label }) {
  return (
    <div className="review-stars" aria-label={label}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ name }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2)
  return <div className="review-avatar" aria-hidden="true">{initials}</div>
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

export default function Testimonios() {
  const { t, lang } = useLang()
  const l = lang === 'en' ? 'en' : 'es'

  return (
    <section className="section testimonios" id="testimonios" data-screen-label="Testimonios">
      <div className="wrap">
        <div className="shead">
          <Reveal as="p" className="eyebrow">{t('test.eyebrow')}</Reveal>
          <Reveal as="h2" delay={1} className="display">{t('test.title')}</Reveal>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} className="review-card" delay={i % 3}>
              <div className="review-head">
                <Avatar name={r.name} />
                <div>
                  <p className="review-name">{r.name}</p>
                  <p className="review-role">{r.role[l]}</p>
                </div>
                <div className="review-google"><GoogleIcon /></div>
              </div>
              <Stars n={r.stars} label={t('test.starsLabel').replace('{n}', String(r.stars))} />
              <p className="review-text">"{r.text[l]}"</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

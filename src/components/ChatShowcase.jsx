import { lazy, Suspense } from 'react'
import { useLang } from '../i18n/LangContext'
import Reveal from './Reveal'

const Chatbot = lazy(() => import('./Chatbot'))

export default function ChatShowcase() {
  const { t, lang } = useLang()

  return (
    <section className="section chat-showcase chat-showcase--open" id="asistente" data-screen-label="Asistente IA">
      <div className="wrap">
        <div className="chat-showcase-layout">
          <div className="chat-showcase-intro">
            <Reveal as="p" className="eyebrow">{t('chatShow.eyebrow')}</Reveal>
            <Reveal as="h2" delay={1} className="display">{t('chatShow.title')}</Reveal>
            <Reveal as="p" delay={2} className="lead">{t('chatShow.lead')}</Reveal>
            <Reveal as="ul" delay={3} className="chat-showcase-points">
              <li>{t('chatShow.p1')}</li>
              <li>{t('chatShow.p2')}</li>
              <li>{t('chatShow.p3')}</li>
            </Reveal>
          </div>
          <Reveal delay={2} className="chat-showcase-demo">
            <Suspense fallback={<div className="chat-embed chat-embed--loading" aria-hidden="true" />}>
              <Chatbot variant="embed" key={lang} />
            </Suspense>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { useContact } from '../contexts/ContactContext'
import { useIsMobile } from '../hooks/useIsMobile'

const CARD_IDS = ['workflow', 'voice', 'data', 'chat', 'web', 'agents']
const MONTH_KEYS = ['month.jan', 'month.feb', 'month.mar', 'month.apr', 'month.may', 'month.jun']

function WorkflowMockup({ t }) {
  const steps = [
    { icon: '📋', label: t('svc.bento.workflow.s1'), status: 'done' },
    { icon: '🗂️', label: t('svc.bento.workflow.s2'), status: 'done' },
    { icon: '📧', label: t('svc.bento.workflow.s3'), status: 'active' },
    { icon: '💰', label: t('svc.bento.workflow.s4'), status: 'pending' },
  ]
  return (
    <div className="svc-mock svc-mock--workflow">
      {steps.map((s, i) => (
        <div key={i} className={`wf-step wf-step--${s.status}`} style={{ animationDelay: `${i * 0.6}s` }}>
          <div className="wf-icon">{s.icon}</div>
          <div className="wf-label">{s.label}</div>
          <div className={`wf-dot wf-dot--${s.status}`} />
          {i < steps.length - 1 && <div className="wf-connector" />}
        </div>
      ))}
    </div>
  )
}

function VoiceMockup({ t }) {
  const bars = [3, 6, 9, 5, 12, 8, 4, 11, 7, 5, 10, 6, 3, 8, 11, 4, 7, 9, 5, 6]
  return (
    <div className="svc-mock svc-mock--voice">
      <div className="voice-icon">📞</div>
      <div className="voice-wave">
        {bars.map((h, i) => (
          <div
            key={i}
            className="voice-bar"
            style={{ animationDelay: `${(i * 0.08).toFixed(2)}s`, '--h': `${h * 4}px` }}
          />
        ))}
      </div>
      <div className="voice-label">{t('svc.bento.voice.status')}</div>
    </div>
  )
}

function DataMockup({ t }) {
  const bars = [
    { key: MONTH_KEYS[0], h: 55, color: '#3a9de8' },
    { key: MONTH_KEYS[1], h: 72, color: '#3a9de8' },
    { key: MONTH_KEYS[2], h: 48, color: '#3a9de8' },
    { key: MONTH_KEYS[3], h: 88, color: '#1460c0' },
    { key: MONTH_KEYS[4], h: 65, color: '#3a9de8' },
    { key: MONTH_KEYS[5], h: 94, color: '#1460c0' },
  ]
  return (
    <div className="svc-mock svc-mock--data">
      <div className="data-header">
        <span className="data-title">{t('svc.bento.data.chart')}</span>
        <span className="data-badge">+38%</span>
      </div>
      <div className="data-chart">
        {bars.map((b, i) => (
          <div key={b.key} className="data-col">
            <div
              className="data-bar"
              style={{ height: `${b.h}%`, background: b.color, animationDelay: `${i * 0.15}s` }}
            />
            <div className="data-lbl">{t(b.key)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChatMockup({ t }) {
  const typingRef = useRef(null)
  const responseRef = useRef(null)

  useEffect(() => {
    let timer
    function showTyping() {
      typingRef.current?.classList.add('is-visible')
      typingRef.current?.classList.remove('is-hidden')
      responseRef.current?.classList.add('is-hidden')
      responseRef.current?.classList.remove('is-visible')
    }
    function showResponse() {
      typingRef.current?.classList.add('is-hidden')
      typingRef.current?.classList.remove('is-visible')
      responseRef.current?.classList.add('is-visible')
      responseRef.current?.classList.remove('is-hidden')
    }
    function cycle() {
      showTyping()
      timer = setTimeout(() => {
        showResponse()
        timer = setTimeout(cycle, 3500)
      }, 2000)
    }
    timer = setTimeout(cycle, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="svc-mock svc-mock--chat">
      <div className="svc-chat-header">
        <div className="svc-chat-dot" />
        <span>{t('svc.bento.chat.header')}</span>
      </div>
      <div className="svc-chat-messages">
        <div className="svc-bubble bot">{t('svc.bento.chat.bot1')}</div>
        <div className="svc-bubble user">{t('svc.bento.chat.user1')}</div>
        <div className="svc-chat-last">
          <div className="svc-bubble bot is-visible" ref={typingRef}>
            <span className="dot-typing"><span /><span /><span /></span>
          </div>
          <div className="svc-bubble bot is-hidden" ref={responseRef}>
            {t('svc.bento.chat.bot2')}
          </div>
        </div>
      </div>
    </div>
  )
}

function WebMockup() {
  return (
    <div className="svc-mock svc-mock--web">
      <div className="web-browser">
        <div className="web-bar">
          <div className="web-dots"><span /><span /><span /></div>
          <div className="web-url">nimbo.com.ar</div>
        </div>
        <div className="web-content">
          <div className="web-hero-block">
            <div className="web-hero-h" />
            <div className="web-hero-sub" />
            <div className="web-cta-btn" />
          </div>
          <div className="web-grid">
            <div className="web-card" /><div className="web-card" /><div className="web-card" />
          </div>
        </div>
      </div>
    </div>
  )
}

function AgentsMockup({ t }) {
  const agents = [
    { initials: 'S1', color: '#4f46e5', nameKey: 'svc.bento.agents.a1.name', taskKey: 'svc.bento.agents.a1.task', active: true },
    { initials: 'M2', color: '#0891b2', nameKey: 'svc.bento.agents.a2.name', taskKey: 'svc.bento.agents.a2.task', active: true },
    { initials: 'A3', color: '#059669', nameKey: 'svc.bento.agents.a3.name', taskKey: 'svc.bento.agents.a3.task', active: false },
  ]
  return (
    <div className="svc-mock svc-mock--agents">
      <div className="agents-label">{t('svc.bento.agents.label')}</div>
      {agents.map((a, i) => (
        <div key={i} className="agent-row">
          <div className="agent-av" style={{ background: a.color }}>{a.initials}</div>
          <div className="agent-info">
            <div className="agent-name">{t(a.nameKey)}</div>
            <div className="agent-task">{t(a.taskKey)}</div>
          </div>
          <div className={`agent-status ${a.active ? 'agent-status--on' : ''}`} />
        </div>
      ))}
    </div>
  )
}

const MOCKS = {
  workflow: WorkflowMockup,
  voice: VoiceMockup,
  data: DataMockup,
  chat: ChatMockup,
  web: WebMockup,
  agents: AgentsMockup,
}

export default function Services() {
  const { t } = useLang()
  const { openContact } = useContact()
  const isMobile = useIsMobile()

  const onContact = (e) => {
    if (isMobile) { e.preventDefault(); openContact() }
  }

  return (
    <section className="section svc-bento-section" id="servicios">
      <div className="wrap">
        <div className="svc-bento-head">
          <div>
            <p className="svc-bento-eyebrow">{t('svc.eyebrow')}</p>
            <h2 className="svc-bento-title">{t('svc.bento.title')}</h2>
            <p className="svc-bento-sub">{t('svc.bento.sub')}</p>
          </div>
          <Link to="/contacto" className="btn-svc-cta" onClick={onContact}>
            {t('svc.bento.cta')}
          </Link>
        </div>

        <div className="svc-bento-grid">
          {CARD_IDS.map((id) => {
            const Mock = MOCKS[id]
            return (
              <div key={id} className="svc-bento-card">
                <div className="svc-bento-visual">
                  <Mock t={t} />
                </div>
                <div className="svc-bento-text">
                  <h3>{t(`svc.bento.${id}.title`)}</h3>
                  <p>{t(`svc.bento.${id}.desc`)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

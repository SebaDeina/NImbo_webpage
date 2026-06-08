import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { useContact } from '../contexts/ContactContext'
import { useIsMobile } from '../hooks/useIsMobile'
import CloudMark from './CloudMark'
import { matchFaq, SUGGESTIONS } from '../lib/chatbot'

function typingDelay(text) {
  return Math.min(1400, 500 + text.length * 12)
}

export default function Chatbot() {
  const { t } = useLang()
  const { openContact } = useContact()
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([])
  const [booted, setBooted] = useState(false)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  const scrollDown = () => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }

  useEffect(() => {
    scrollDown()
  }, [messages, typing, open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    if (isMobile) document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, isMobile])

  const botReply = async (intentId) => {
    const text = t(`chat.ans.${intentId}`)
    setTyping(true)
    await new Promise((r) => setTimeout(r, typingDelay(text)))
    setTyping(false)
    setMessages((m) => [...m, { role: 'bot', text, intent: intentId }])
  }

  const greet = async () => {
    if (booted) return
    setBooted(true)
    await botReply('welcome')
  }

  const openChat = () => {
    setOpen(true)
    greet()
    setTimeout(() => inputRef.current?.focus(), 300)
  }

  const send = async (text) => {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    setMessages((m) => [...m, { role: 'user', text: trimmed }])
    setInput('')
    await botReply(matchFaq(trimmed))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    send(input)
  }

  const onContact = (e) => {
    if (isMobile) {
      e.preventDefault()
      setOpen(false)
      openContact()
    }
  }

  return (
    <div className={`chat-root${open ? ' open' : ''}`}>
      {open && (
        <div
          className="chat-panel"
          role="dialog"
          aria-label={t('chat.title')}
          aria-modal="true"
        >
          <header className="chat-head">
            <div className="chat-avatar" aria-hidden="true">
              <CloudMark />
            </div>
            <div className="chat-head-text">
              <strong>{t('chat.title')}</strong>
              <span>{t('chat.subtitle')}</span>
            </div>
            <button
              type="button"
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label={t('chat.close')}
            >
              ×
            </button>
          </header>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble chat-bubble--${msg.role}`}>
                <p>{msg.text}</p>
                {msg.role === 'bot' && msg.intent === 'contact' && (
                  <Link to="/contacto" className="chat-cta" onClick={onContact}>
                    {t('chat.contactCta')}
                  </Link>
                )}
              </div>
            ))}

            {typing && (
              <div className="chat-bubble chat-bubble--bot chat-typing" aria-live="polite">
                <span />
                <span />
                <span />
              </div>
            )}

            {messages.length <= 1 && !typing && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className="chat-chip"
                    onClick={() => send(t(`chat.suggest.${id}`))}
                  >
                    {t(`chat.suggest.${id}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className="chat-input" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chat.placeholder')}
              autoComplete="off"
              maxLength={280}
              disabled={typing}
            />
            <button type="submit" disabled={!input.trim() || typing} aria-label={t('chat.send')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={`chat-fab${open ? ' open' : ''}`}
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-expanded={open}
        aria-label={open ? t('chat.close') : t('chat.open')}
      >
        <span className="chat-fab-glow" aria-hidden="true" />
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
            <path
              d="M8 10h.01M12 10h.01M16 10h.01M21 14.5a3.5 3.5 0 0 1-3.5 3.5H9l-4 2.5V7.5A3.5 3.5 0 0 1 8.5 4h11A3.5 3.5 0 0 1 23 7.5v7Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  )
}

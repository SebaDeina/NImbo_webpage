import { useCallback, useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { useIsMobile } from '../hooks/useIsMobile'
import CloudMark from './CloudMark'
import { normalizeChatText } from '../../lib/chat-format.js'
import {
  INTAKE_BEAT_MS,
  INTAKE_TYPING_MAX_MS,
  INTAKE_TYPING_MIN_MS,
  MIN_TYPING_MS,
} from '../../lib/chat-limits.js'
import { submitContact } from '../lib/cms'
import {
  BUDGETS,
  buildSummary,
  budgetLabel,
  emptyIntake,
  inferTopicFromText,
  isConfirm,
  isDeny,
  isReadyForIntake,
  isSkip,
  nextIntakeStep,
  parseBudget,
  parseTopic,
  splitName,
  TOPICS,
  toContactPayload,
  topicLabel,
  validateEmail,
} from '../lib/chat-intake'
import {
  IDLE_NUDGE_MS,
  localIntentShowsCta,
  matchFaq,
  MAX_CHAT_USER_MESSAGES,
  MAX_IDLE_NUDGES,
  NUDGE_READ_GRACE_MS,
  pickInsultVariant,
  pickJokeVariant,
  pickNudgeVariant,
  SUGGESTIONS,
  TEASER_DELAY_MS,
  TEASER_STORAGE_KEY,
} from '../lib/chatbot'

function localTypingDelay(text, intentId) {
  if (intentId === 'welcome') return 120
  return Math.min(450, 180 + text.length * 4)
}

function intakeTypingDelay(text) {
  const range = INTAKE_TYPING_MAX_MS - INTAKE_TYPING_MIN_MS
  const variable = Math.min(range, (text?.length ?? 0) * 6)
  return INTAKE_TYPING_MIN_MS + variable
}

async function ensureMinTyping(started) {
  const elapsed = Date.now() - started
  if (elapsed < MIN_TYPING_MS) {
    await new Promise((r) => setTimeout(r, MIN_TYPING_MS - elapsed))
  }
}

function renderInline(text) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((part, i) =>
    part.startsWith('*') && part.endsWith('*')
      ? <strong key={i}>{part.slice(1, -1)}</strong>
      : part
  )
}

function ChatBubbleText({ text }) {
  const lines = normalizeChatText(text).split('\n').map((l) => l.trim()).filter(Boolean)
  const nodes = []
  let bullets = []

  const flushBullets = () => {
    if (!bullets.length) return
    nodes.push(
      <ul key={`ul-${nodes.length}`} className="chat-ul">
        {bullets.map((line, j) => (
          <li key={j}>{renderInline(line.replace(/^•\s*/, ''))}</li>
        ))}
      </ul>
    )
    bullets = []
  }

  for (const line of lines) {
    if (line.startsWith('•')) {
      bullets.push(line)
    } else {
      flushBullets()
      nodes.push(
        <p key={`p-${nodes.length}`}>{renderInline(line)}</p>
      )
    }
  }
  flushBullets()

  return nodes
}

const INTAKE_INTENTS = new Set(['contact', 'schedule'])

export default function Chatbot() {
  const { t, lang } = useLang()
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([])
  const [booted, setBooted] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)
  const [intakeStep, setIntakeStep] = useState(null)
  const [intakeData, setIntakeData] = useState(() => emptyIntake())
  const [intakeDone, setIntakeDone] = useState(false)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const nudgeCountRef = useRef(0)
  const idleTimerRef = useRef(null)
  const lastBotAtRef = useRef(0)

  const userMessageCount = messages.filter((m) => m.role === 'user').length
  const locked = !intakeStep && userMessageCount >= MAX_CHAT_USER_MESSAGES
  const inputDisabled = typing || intakeDone || locked

  const scrollDown = () => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }

  useEffect(() => {
    scrollDown()
  }, [messages, typing, open])

  useEffect(() => {
    if (sessionStorage.getItem(TEASER_STORAGE_KEY)) return undefined
    const timer = window.setTimeout(() => setShowTeaser(true), TEASER_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) {
      nudgeCountRef.current = 0
      setIntakeStep(null)
      setIntakeData(emptyIntake())
      setIntakeDone(false)
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current)
        idleTimerRef.current = null
      }
    }
  }, [open])

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      window.clearTimeout(idleTimerRef.current)
      idleTimerRef.current = null
    }
  }, [])

  const sendIdleNudge = useCallback(async () => {
    if (nudgeCountRef.current >= MAX_IDLE_NUDGES) return
    nudgeCountRef.current += 1
    const text = t(`chat.ans.nudge.${pickNudgeVariant()}`)
    setTyping(true)
    await new Promise((r) => setTimeout(r, localTypingDelay(text, 'nudge')))
    setTyping(false)
    lastBotAtRef.current = Date.now()
    setMessages((m) => [...m, { role: 'bot', text, intent: 'nudge', showCta: false }])
  }, [t])

  useEffect(() => {
    clearIdleTimer()
    if (!open || typing || input.trim() || locked || intakeStep || intakeDone) return undefined
    if (nudgeCountRef.current >= MAX_IDLE_NUDGES) return undefined

    const last = messages[messages.length - 1]
    if (!last || last.role !== 'bot' || last.intent === 'nudge' || last.intent === 'limit') {
      return undefined
    }

    const sinceBot = Date.now() - lastBotAtRef.current
    const graceRemaining = Math.max(0, NUDGE_READ_GRACE_MS - sinceBot)
    const delay = graceRemaining + IDLE_NUDGE_MS

    idleTimerRef.current = window.setTimeout(() => {
      sendIdleNudge()
    }, delay)

    return clearIdleTimer
  }, [open, typing, messages, input, locked, intakeStep, intakeDone, clearIdleTimer, sendIdleNudge])

  const dismissTeaser = () => {
    setShowTeaser(false)
    sessionStorage.setItem(TEASER_STORAGE_KEY, '1')
  }

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

  const pushBot = (text, intent, showCta = localIntentShowsCta(intent)) => {
    lastBotAtRef.current = Date.now()
    setMessages((m) => [...m, { role: 'bot', text, intent, showCta }])
  }

  const localBotReply = async (intentId) => {
    const text =
      intentId === 'insult'
        ? t(`chat.ans.insult.${pickInsultVariant()}`)
        : intentId === 'joke'
          ? t(`chat.ans.joke.${pickJokeVariant()}`)
          : t(`chat.ans.${intentId}`)
    setTyping(true)
    await new Promise((r) => setTimeout(r, localTypingDelay(text, intentId)))
    setTyping(false)
    pushBot(text, intentId)
  }

  const toApiHistory = (history) =>
    history
      .filter((m) => m.role === 'user' || m.role === 'bot')
      .map((m) => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.text,
      }))

  const showLimitReply = useCallback(() => {
    lastBotAtRef.current = Date.now()
    setMessages((m) => {
      if (m.some((msg) => msg.intent === 'limit')) return m
      return [...m, { role: 'bot', text: t('chat.ans.limit'), intent: 'limit', showCta: true }]
    })
  }, [t])

  const intakeQuestionText = useCallback((step, data) => {
    if (step === 'confirm') {
      return t('chat.intake.confirm').replace('{summary}', buildSummary(data, t, lang))
    }
    if (step === 'firstName') return t('chat.intake.start')
    return t(`chat.intake.${step}`)
  }, [t, lang])

  const askIntakeStep = useCallback(async (step, data) => {
    const text = intakeQuestionText(step, data)
    await new Promise((r) => setTimeout(r, INTAKE_BEAT_MS))
    setTyping(true)
    await new Promise((r) => setTimeout(r, intakeTypingDelay(text)))
    setTyping(false)
    pushBot(text, 'intake', false)
  }, [intakeQuestionText])

  const intakeTriggerLabels = useCallback(() => new Set([
    t('chat.convertCta'),
    t('chat.contactCta'),
    t('chat.suggest.contact'),
    t('chat.suggest.schedule'),
  ]), [t])

  const startIntake = useCallback(async (userLabel, { skipUserBubble = false, contextText = '' } = {}) => {
    const label = userLabel ?? t('chat.convertCta')
    if (!skipUserBubble) {
      setMessages((m) => [...m, { role: 'user', text: label }])
    }

    const triggers = intakeTriggerLabels()
    const userTexts = messages
      .filter((msg) => msg.role === 'user')
      .map((msg) => msg.text)
      .filter((text) => !triggers.has(text) && text !== label)
    if (skipUserBubble && contextText && !userTexts.includes(contextText)) {
      userTexts.push(contextText)
    }
    const prefilled = userTexts.length ? userTexts.join('\n') : ''
    const topic = inferTopicFromText(prefilled) ?? ''
    const data = { ...emptyIntake(), message: prefilled, topic }

    setIntakeData(data)
    setIntakeStep('firstName')
    setIntakeDone(false)
    nudgeCountRef.current = MAX_IDLE_NUDGES
    await askIntakeStep('firstName', data)
  }, [messages, t, askIntakeStep, intakeTriggerLabels])

  const submitIntake = useCallback(async (data) => {
    await new Promise((r) => setTimeout(r, INTAKE_BEAT_MS))
    setTyping(true)
    try {
      await submitContact(toContactPayload(data, lang))
      const sent = t('chat.intake.sent')
        .replace('{name}', data.firstName)
        .replace('{email}', data.email)
      await new Promise((r) => setTimeout(r, intakeTypingDelay(sent)))
      setTyping(false)
      setIntakeStep(null)
      setIntakeDone(true)
      pushBot(sent, 'intake_done', false)
    } catch {
      setTyping(false)
      pushBot(t('chat.intake.fail'), 'intake', false)
      setIntakeStep('confirm')
    }
  }, [lang, t])

  const processIntakeAnswer = useCallback(async (text, chipValue) => {
    const answer = (chipValue ?? text).trim()
    if (!answer && chipValue !== 'skip') return

    const step = intakeStep
    if (!step) return

    if (step === 'confirm') {
      if (chipValue === 'yes' || isConfirm(answer)) {
        setMessages((m) => [...m, { role: 'user', text: t('chat.intake.confirmYes') }])
        setInput('')
        await submitIntake(intakeData)
        return
      }
      if (chipValue === 'no' || isDeny(answer)) {
        setMessages((m) => [...m, { role: 'user', text: t('chat.intake.confirmNo') }])
        setInput('')
        const fresh = emptyIntake()
        setIntakeData(fresh)
        setIntakeStep('firstName')
        await askIntakeStep('firstName', fresh)
        return
      }
      setMessages((m) => [...m, { role: 'user', text: answer }])
      setInput('')
      await askIntakeStep('confirm', intakeData)
      return
    }

    let label = answer
    if (step === 'topic' && chipValue) label = topicLabel(chipValue, lang)
    if (step === 'budget' && chipValue) label = budgetLabel(chipValue, lang)
    if (isSkip(answer) && (step === 'phone' || step === 'company' || step === 'budget')) {
      label = t('chat.intake.skipped')
    }

    setMessages((m) => [...m, { role: 'user', text: label }])
    setInput('')

    let updates = {}
    let errKey = null

    switch (step) {
      case 'firstName': {
        const name = splitName(answer)
        if (!name) errKey = 'firstName'
        else updates = name
        break
      }
      case 'email':
        if (!validateEmail(answer)) errKey = 'email'
        else updates = { email: answer.trim() }
        break
      case 'phone':
        updates = { phone: isSkip(answer) ? '' : answer.trim() }
        break
      case 'company':
        updates = { company: isSkip(answer) ? '' : answer.trim() }
        break
      case 'topic': {
        const topic = chipValue ?? parseTopic(answer)
        if (!topic) errKey = 'topic'
        else updates = { topic }
        break
      }
      case 'message':
        if (answer.length < 3) errKey = 'message'
        else updates = { message: answer }
        break
      case 'budget': {
        if (isSkip(answer)) updates = { budget: '' }
        else {
          const budget = chipValue ?? parseBudget(answer)
          if (!budget) errKey = 'budget'
          else updates = { budget }
        }
        break
      }
      default:
        break
    }

    if (errKey) {
      const errText = t(`chat.intake.err.${errKey}`)
      await new Promise((r) => setTimeout(r, INTAKE_BEAT_MS))
      setTyping(true)
      await new Promise((r) => setTimeout(r, intakeTypingDelay(errText)))
      setTyping(false)
      pushBot(errText, 'intake', false)
      return
    }

    const newData = { ...intakeData, ...updates }
    const following = nextIntakeStep(step, newData)

    setIntakeData(newData)
    setIntakeStep(following)
    await askIntakeStep(following, newData)
  }, [intakeStep, intakeData, lang, t, askIntakeStep, submitIntake])

  const aiBotReply = async (userText, priorMessages) => {
    setTyping(true)
    const started = Date.now()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang,
          messages: [...toApiHistory(priorMessages), { role: 'user', content: userText }],
        }),
      })

      if (res.status === 429) {
        await ensureMinTyping(started)
        setTyping(false)
        showLimitReply()
        return
      }

      if (!res.ok) throw new Error('chat api failed')

      const data = await res.json()
      await ensureMinTyping(started)

      setTyping(false)
      pushBot(data.reply, data.ctaDirect ? 'contact' : 'ai_reply', Boolean(data.showCta))
    } catch {
      setTyping(false)
      await localBotReply(matchFaq(userText))
    }
  }

  const greet = async () => {
    if (booted) return
    setBooted(true)
    await localBotReply('welcome')
  }

  const openChat = () => {
    setShowTeaser(false)
    setOpen(true)
    greet()
    setTimeout(() => inputRef.current?.focus(), 300)
  }

  const send = async (text) => {
    const trimmed = text.trim()
    if (!trimmed || typing || intakeDone) return

    if (intakeStep) {
      await processIntakeAnswer(trimmed)
      return
    }

    if (locked) return

    const prior = messages
    setMessages((m) => [...m, { role: 'user', text: trimmed }])
    setInput('')
    nudgeCountRef.current = 0

    const isLastAllowed = userMessageCount + 1 >= MAX_CHAT_USER_MESSAGES

    const localIntent = matchFaq(trimmed)
    if (localIntent === 'insult' || localIntent === 'joke' || localIntent === 'greeting') {
      await localBotReply(localIntent === 'greeting' ? 'greeting' : localIntent)
      if (isLastAllowed) showLimitReply()
      return
    }
    if (INTAKE_INTENTS.has(localIntent)) {
      await startIntake(trimmed, { skipUserBubble: true, contextText: trimmed })
      return
    }

    if (isReadyForIntake(trimmed)) {
      await startIntake(trimmed, { skipUserBubble: true, contextText: trimmed })
      return
    }

    await aiBotReply(trimmed, prior)
    if (isLastAllowed) showLimitReply()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    send(input)
  }

  const onSuggest = (id) => {
    if (INTAKE_INTENTS.has(id)) {
      const label = t(`chat.suggest.${id}`)
      setMessages((m) => [...m, { role: 'user', text: label }])
      startIntake(label, { skipUserBubble: true, contextText: label })
      return
    }
    send(t(`chat.suggest.${id}`))
  }

  const onIntakeChip = (value) => {
    if (typing || !intakeStep) return
    processIntakeAnswer('', value)
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
                <ChatBubbleText text={msg.text} />
                {msg.role === 'bot' && msg.showCta && !intakeStep && !intakeDone && (
                  <button type="button" className="chat-cta" onClick={() => startIntake(t('chat.convertCta'))}>
                    {t('chat.convertCta')}
                  </button>
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

            {messages.length <= 1 && !typing && !locked && !intakeStep && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className="chat-chip"
                    onClick={() => onSuggest(id)}
                  >
                    {t(`chat.suggest.${id}`)}
                  </button>
                ))}
              </div>
            )}

            {intakeStep === 'topic' && !typing && (
              <div className="chat-suggestions">
                {TOPICS.map((o) => (
                  <button key={o.v} type="button" className="chat-chip" onClick={() => onIntakeChip(o.v)}>
                    {o[lang]}
                  </button>
                ))}
              </div>
            )}

            {intakeStep === 'budget' && !typing && (
              <div className="chat-suggestions">
                {BUDGETS.map((o) => (
                  <button key={o.v} type="button" className="chat-chip" onClick={() => onIntakeChip(o.v)}>
                    {o[lang]}
                  </button>
                ))}
                <button type="button" className="chat-chip" onClick={() => onIntakeChip('skip')}>
                  {t('chat.intake.skip')}
                </button>
              </div>
            )}

            {intakeStep === 'confirm' && !typing && (
              <div className="chat-suggestions">
                <button type="button" className="chat-chip" onClick={() => onIntakeChip('yes')}>
                  {t('chat.intake.confirmYes')}
                </button>
                <button type="button" className="chat-chip" onClick={() => onIntakeChip('no')}>
                  {t('chat.intake.confirmNo')}
                </button>
              </div>
            )}
          </div>

          <form className="chat-input" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t(
                intakeDone
                  ? 'chat.placeholderDone'
                  : intakeStep
                    ? 'chat.intake.placeholder'
                    : locked
                      ? 'chat.placeholderLocked'
                      : 'chat.placeholder'
              )}
              autoComplete="off"
              maxLength={280}
              disabled={inputDisabled}
            />
            <button type="submit" disabled={!input.trim() || inputDisabled} aria-label={t('chat.send')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {!open && showTeaser && (
        <div className="chat-teaser" role="status">
          <button
            type="button"
            className="chat-teaser-close"
            onClick={dismissTeaser}
            aria-label={t('chat.teaserDismiss')}
          >
            ×
          </button>
          <p className="chat-teaser-text">{t('chat.teaser')}</p>
          <button type="button" className="chat-teaser-cta" onClick={openChat}>
            {t('chat.teaserCta')}
          </button>
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

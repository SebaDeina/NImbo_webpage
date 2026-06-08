import { createContext, useContext, useCallback, useEffect, useState } from 'react'
import { I18N } from './translations'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('nimbo_lang') || 'es'
    } catch {
      return 'es'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('nimbo_lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const t = useCallback(
    (key) => {
      const dict = I18N[lang] || I18N.es
      return dict[key] != null ? dict[key] : key
    },
    [lang]
  )

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}

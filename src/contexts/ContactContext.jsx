import { createContext, useCallback, useContext, useState } from 'react'
import ContactSheet from '../components/ContactSheet'

const ContactCtx = createContext(null)

export function ContactProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0) // remonta el form en cada apertura → reset limpio

  const openContact = useCallback(() => {
    setCount((c) => c + 1)
    setOpen(true)
  }, [])
  const closeContact = useCallback(() => setOpen(false), [])

  return (
    <ContactCtx.Provider value={{ openContact, closeContact }}>
      {children}
      <ContactSheet open={open} resetKey={count} onClose={closeContact} />
    </ContactCtx.Provider>
  )
}

export function useContact() {
  const ctx = useContext(ContactCtx)
  if (!ctx) throw new Error('useContact must be used within ContactProvider')
  return ctx
}

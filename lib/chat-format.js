/** Normaliza respuestas de IA: sin markdown, viñetas en líneas propias. */
export function normalizeChatText(text) {
  if (!text || typeof text !== 'string') return ''

  let t = text
    .replace(/\r\n/g, '\n')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')

  // Viñetas pegadas en el mismo párrafo → una por línea
  t = t.replace(/,\s*•\s*/g, '\n• ')
  t = t.replace(/\s+o\s+•\s*/gi, '\n• ')
  t = t.replace(/\s+como\s+•\s*/gi, '\n• ')
  t = t.replace(/:\s*•\s*/g, ':\n• ')
  t = t.replace(/(?<=[^\n])\s+•\s+/g, '\n• ')

  const rawLines = t.split('\n').map((l) => l.trim()).filter(Boolean)
  const lines = []

  for (let line of rawLines) {
    if (!line.startsWith('•')) {
      line = line.replace(/,?\s*como\s*$/i, '').replace(/,\s*$/, '').trim()
      if (line) lines.push(line)
      continue
    }

    // Texto suelto después del último ítem de una viñeta
    const tail = line.match(/^•\s+(.+?)\.\s+([A-ZÁÉÍÓÚÑ¿].+)$/)
    if (tail) {
      lines.push(`• ${tail[1].trim()}.`)
      lines.push(tail[2].trim())
      continue
    }

    lines.push(line.replace(/,\s*$/, ''))
  }

  return lines
    .map((line) => {
      if (line.startsWith('•')) return line.replace(/,\s*$/, '')
      if (/^[-*]\s+/.test(line)) return `• ${line.replace(/^[-*]\s+/, '')}`
      if (/^\d+\.\s+/.test(line)) return `• ${line.replace(/^\d+\.\s+/, '')}`

      const labeled = line.match(/^([^:]{2,28}):\s+(.+)$/)
      if (labeled && !line.startsWith('•')) {
        return `• ${labeled[1].trim()} — ${labeled[2].trim()}`
      }
      return line
    })
    .filter(Boolean)
    .join('\n')
}

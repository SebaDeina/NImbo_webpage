/*
  Encierra los estilos del sitio nuevo (src/ns/styles.css) bajo `.ns`. Lo usa un plugin de vite.config.js al
  importar ese archivo, así que styles.css se escribe normal y llega al navegador ya encerrado.

  El sitio nuevo convive con las páginas viejas (propuesta, links, agendar, landings…) en la misma app, y su
  CSS usa nombres genéricos (.btn, .wrap, h1, body…). Sin esto, al pasar de una página nueva a una vieja los
  estilos nuevos quedarían cargados y la romperían. Reglas:
    :root / html / body  → .ns  (el contenedor del sitio nuevo hace de raíz)
    html.clase …         → html.clase .ns …  (clases que pone el cursor en <html>)
    cualquier otro       → .ns <selector>
    @keyframes x         → @keyframes ns-x  (los nombres globales chocaban con los del sitio viejo)
*/
const SCOPE = '.ns'
const GUARD = ':where(:not(.ns *))'
let frames = []
let mode = 'scope'

export function scopeNsCss(css) {
  // nombres de @keyframes, para renombrarlos también donde se usan
  frames = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1])
  mode = 'scope'
  return scope(css)
}

/*
  Lo inverso, para el CSS del sitio viejo (grabado.css, nd-site.css…): muchos de esos estilos son globales
  (.lead, .page, .nav-links a…) y se metían en el sitio nuevo. Cada selector pasa a aplicar solo fuera de `.ns`:
    .lead → .lead:where(:not(.ns *))      (:where no suma especificidad: el sitio viejo se ve igual)
  html, body y :root quedan como están.
*/
export function guardOldCss(css) {
  frames = []
  mode = 'guard'
  return scope(css)
}

function guard(sel) {
  if (/^(:root|html|body)\b[^\s>+~]*$/.test(sel)) return sel
  // el sujeto es el último compuesto (después del último combinador fuera de paréntesis)
  let depth = 0
  let start = 0
  for (let i = 0; i < sel.length; i++) {
    const ch = sel[i]
    if (ch === '(' || ch === '[') depth++
    else if (ch === ')' || ch === ']') depth--
    else if (depth === 0 && /[\s>+~]/.test(ch)) start = i + 1
  }
  const subject = sel.slice(start)
  if (/^(html|body)\b/.test(subject) || /^:root\b/.test(subject)) return sel
  const pe = subject.indexOf('::')
  const at = pe === -1 ? sel.length : start + pe
  return sel.slice(0, at) + GUARD + sel.slice(at)
}

function splitTop(list) {
  const out = []
  let depth = 0
  let cur = ''
  for (const ch of list) {
    if (ch === '(' || ch === '[') depth++
    if (ch === ')' || ch === ']') depth--
    if (ch === ',' && depth === 0) {
      out.push(cur)
      cur = ''
    } else cur += ch
  }
  out.push(cur)
  return out.map((s) => s.trim()).filter(Boolean)
}

function prefix(sel) {
  if (/^:root\b/.test(sel)) return SCOPE + sel.slice(5)
  if (/^(html|body)$/.test(sel)) return SCOPE
  const m = sel.match(/^(html[.:[][^\s>+~]*)(.*)$/)
  if (m) return m[2].trim() ? `${m[1]} ${SCOPE} ${m[2].trim()}` : m[1]
  if (/^(html|body)\s/.test(sel)) return `${SCOPE} ${sel.replace(/^(html|body)\s+/, '')}`
  return `${SCOPE} ${sel}`
}

function renameFrames(block) {
  return block.replace(/(animation(?:-name)?\s*:)([^;}]*)/g, (_, k, v) =>
    k + v.replace(/[\w-]+/g, (w) => (frames.includes(w) ? `ns-${w}` : w)),
  )
}

// recorre bloques { } respetando comentarios y strings
function scope(text) {
  let i = 0
  let out = ''
  while (i < text.length) {
    const ws = text.slice(i).match(/^\s+/)
    if (ws) {
      out += ws[0]
      i += ws[0].length
      continue
    }
    // comentario
    if (text.startsWith('/*', i)) {
      const end = text.indexOf('*/', i + 2) + 2
      out += text.slice(i, end)
      i = end
      continue
    }
    const open = findNext(text, i, '{')
    const semi = findNext(text, i, ';')
    if (open === -1) {
      out += text.slice(i)
      break
    }
    if (semi !== -1 && semi < open && text.slice(i, semi).trim().startsWith('@')) {
      out += text.slice(i, semi + 1) // @import / @charset
      i = semi + 1
      continue
    }
    const lead = text.slice(i, open).match(/^\s*/)[0]
    const prelude = text.slice(i, open).trim()
    const close = matching(text, open)
    const body = text.slice(open + 1, close)
    if (/^@(media|supports|container)\b/.test(prelude)) {
      out += `${lead}${prelude} {${scope(body)}}`
    } else if (/^@(-webkit-)?keyframes\b/.test(prelude)) {
      out += mode === 'scope'
        ? `${lead}${prelude.replace(/@keyframes\s+([\w-]+)/, '@keyframes ns-$1')} {${body}}`
        : `${lead}${prelude} {${body}}`
    } else if (prelude.startsWith('@')) {
      out += `${lead}${prelude} {${body}}`
    } else {
      out += mode === 'scope'
        ? `${lead}${splitTop(prelude).map(prefix).join(', ')} {${renameFrames(body)}}`
        : `${lead}${splitTop(prelude).map(guard).join(', ')} {${body}}`
    }
    i = close + 1
  }
  return out
}

function findNext(text, from, ch) {
  for (let i = from; i < text.length; i++) {
    if (text.startsWith('/*', i)) {
      i = text.indexOf('*/', i + 2) + 1
      continue
    }
    if (text[i] === '"' || text[i] === "'") {
      i = text.indexOf(text[i], i + 1)
      continue
    }
    if (text[i] === ch) return i
  }
  return -1
}

function matching(text, open) {
  let depth = 0
  for (let i = open; i < text.length; i++) {
    if (text.startsWith('/*', i)) {
      i = text.indexOf('*/', i + 2) + 1
      continue
    }
    if (text[i] === '"' || text[i] === "'") {
      i = text.indexOf(text[i], i + 1)
      continue
    }
    if (text[i] === '{') depth++
    if (text[i] === '}' && --depth === 0) return i
  }
  throw new Error('llave sin cerrar')
}

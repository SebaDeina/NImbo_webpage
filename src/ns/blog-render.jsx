// Contenido de los artículos: el mismo markdown y las mismas directivas (:::bar, :::line, :::flow, :::chatbot)
// que src/lib/blog-render.jsx del sitio real. Los gráficos son los componentes del sitio, con estilos nuevos en
// styles.css; :::chatbot (que en el sitio embebe el asistente viejo) acá es una tarjeta que abre la nube.
// Los links internos se abren en la misma pestaña; los externos, en otra.
import BarChart from '../components/blog/BarChart'
import LineChart from '../components/blog/LineChart'
import FlowDiagram from '../components/blog/FlowDiagram'
import { Arrow } from './ui'

function Charlar({ title, intro }) {
  return (
    <figure className="blog-viz bp-charlar">
      <span className="mono">Probalo acá</span>
      {title && <b>{title}</b>}
      {intro && <p>{intro}</p>}
      <button type="button" className="btn btn-acc" onClick={() => dispatchEvent(new Event('nimbo:charlar'))}>Charlar con Nimbo <Arrow /></button>
    </figure>
  )
}

const DIRECTIVE_RE = /^:::(\w+)\r?\n([\s\S]*?)\r?\n:::[ \t]*$/gm
const CHART_COMPONENTS = { bar: BarChart, line: LineChart, flow: FlowDiagram, chatbot: Charlar }

function parseContent(content) {
  const parts = []
  let lastIndex = 0
  let match
  DIRECTIVE_RE.lastIndex = 0
  while ((match = DIRECTIVE_RE.exec(content)) !== null) {
    const before = content.slice(lastIndex, match.index)
    if (before.trim()) parts.push({ kind: 'md', text: before })
    let spec = null
    try { spec = JSON.parse(match[2]) } catch { spec = null }
    if (spec && CHART_COMPONENTS[match[1]]) parts.push({ kind: 'chart', type: match[1], spec })
    lastIndex = match.index + match[0].length
  }
  const rest = content.slice(lastIndex)
  if (rest.trim()) parts.push({ kind: 'md', text: rest })
  return parts
}

export function headingId(text) {
  return text.replace(/[*_`[\]()]/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// subtítulos (## …) del contenido, en orden, para el índice
export function headings(content) {
  return [...content.matchAll(/^## (.+)$/gm)].map((m) => {
    const t = m[1].replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').trim()
    return { id: headingId(t), t }
  })
}

const link = (_, text, href) => {
  // links al sitio (nimbodata.com/... o /...) quedan adentro del sitio
  const local = href.replace(/^https?:\/\/(www\.)?nimbodata\.com/, '') || '/'
  return local.startsWith('/')
    ? `<a href="${local}">${text}</a>`
    : `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
}

const inline = (text) => text
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.+?)\*/g, '<em>$1</em>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, link)

const splitRow = (row) => row.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim())

function renderTable(block) {
  const rows = block.split('\n').filter((l) => l.trim())
  const head = splitRow(rows[0]).map((c) => `<th>${inline(c)}</th>`).join('')
  const body = rows.slice(2).map((r) => `<tr>${splitRow(r).map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')
  return `<div class="blog-table-wrap"><table class="blog-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`
}

function renderMarkdown(md) {
  return md.trim().split(/\n{2,}/).map((raw) => {
    const block = raw.trim()
    if (!block) return ''
    const lines = block.split('\n')
    if (lines.length >= 2 && /^\|.*\|$/.test(lines[0]) && /^\|[\s:|-]+\|$/.test(lines[1])) return renderTable(block)
    if (block === '---') return '<hr />'
    if (/^### /.test(block)) return `<h3>${inline(block.slice(4))}</h3>`
    if (/^## /.test(block)) {
      const t = block.slice(3).replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').trim()
      return `<h2 id="${headingId(t)}">${inline(block.slice(3))}</h2>`
    }
    if (lines.every((l) => /^>\s?/.test(l))) {
      const ls = lines.map((l) => l.replace(/^>\s?/, ''))
      const who = /^[—–-]\s/.test(ls[ls.length - 1]) ? ls.pop() : null
      return `<blockquote><p>${inline(ls.join(' '))}</p>${who ? `<cite>${inline(who)}</cite>` : ''}</blockquote>`
    }
    if (lines.every((l) => /^\d+\.\s/.test(l))) return `<ol>${lines.map((l) => `<li>${inline(l.replace(/^\d+\.\s/, ''))}</li>`).join('')}</ol>`
    if (lines.every((l) => /^-\s/.test(l))) return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^-\s/, ''))}</li>`).join('')}</ul>`
    return `<p>${inline(block.replace(/\n/g, ' '))}</p>`
  }).join('\n')
}

export function BlogContent({ content }) {
  return parseContent(content).map((part, i) => {
    if (part.kind === 'chart') {
      const Chart = CHART_COMPONENTS[part.type]
      return <Chart key={i} {...part.spec} />
    }
    return <div key={i} className="blog-md" dangerouslySetInnerHTML={{ __html: renderMarkdown(part.text) }} />
  })
}

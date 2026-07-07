import { lazy, Suspense } from 'react'
import BarChart from '../components/blog/BarChart'
import LineChart from '../components/blog/LineChart'
import FlowDiagram from '../components/blog/FlowDiagram'
import { useLang } from '../i18n/LangContext'

// El asistente de IA es pesado: se carga en diferido y solo si un post lo usa.
const Chatbot = lazy(() => import('../components/Chatbot'))

function BlogChatbot({ title, intro }) {
  const { lang } = useLang()
  return (
    <figure className="blog-viz blog-chatbot">
      {title && <figcaption className="blog-viz-title">{title}</figcaption>}
      {intro && <p className="blog-chatbot-intro">{intro}</p>}
      <Suspense fallback={<div className="chat-embed chat-embed--loading" aria-hidden="true" />}>
        <Chatbot variant="embed" key={lang} />
      </Suspense>
    </figure>
  )
}

/*
  Renderizado del contenido del blog.

  El contenido de cada post es un string de markdown. Además del markdown básico
  soporta bloques directiva para visuales, delimitados por `:::tipo` ... `:::`
  (a propósito NO usamos fences de triple backtick: el contenido vive dentro de
  un template literal y un backtick lo rompería). Ejemplo:

    :::bar
    { "title": "...", "data": [["A", 10], ["B", 20]] }
    :::

  parseContent() separa el texto en partes (markdown y directivas) en orden, y
  <BlogContent> renderiza cada markdown como HTML y cada directiva con su
  componente React (BarChart / LineChart / FlowDiagram).
*/

const DIRECTIVE_RE = /^:::(\w+)\r?\n([\s\S]*?)\r?\n:::[ \t]*$/gm

const CHART_COMPONENTS = {
  bar: BarChart,
  line: LineChart,
  flow: FlowDiagram,
  chatbot: BlogChatbot,
}

export function parseContent(content) {
  const parts = []
  let lastIndex = 0
  let match

  DIRECTIVE_RE.lastIndex = 0
  while ((match = DIRECTIVE_RE.exec(content)) !== null) {
    const before = content.slice(lastIndex, match.index)
    if (before.trim()) parts.push({ kind: 'md', text: before })

    const type = match[1]
    let spec = null
    try {
      spec = JSON.parse(match[2])
    } catch {
      spec = null
    }
    if (spec && CHART_COMPONENTS[type]) {
      parts.push({ kind: 'chart', type, spec })
    } else {
      // Directiva desconocida o JSON inválido: no romper, dejar el texto crudo.
      parts.push({ kind: 'md', text: before ? '' : match[0] })
    }
    lastIndex = match.index + match[0].length
  }

  const rest = content.slice(lastIndex)
  if (rest.trim()) parts.push({ kind: 'md', text: rest })
  return parts
}

// --- Markdown → HTML (inline + bloques) --------------------------------------

function inline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    )
}

function splitRow(row) {
  return row
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim())
}

function renderTable(block) {
  const rows = block.split('\n').filter((l) => l.trim())
  const head = splitRow(rows[0])
  const body = rows.slice(2).map(splitRow)
  const thead =
    '<thead><tr>' + head.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead>'
  const tbody =
    '<tbody>' +
    body
      .map((r) => '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>')
      .join('') +
    '</tbody>'
  return `<div class="blog-table-wrap"><table class="blog-table">${thead}${tbody}</table></div>`
}

export function renderMarkdown(md) {
  return md
    .trim()
    .split(/\n{2,}/)
    .map((raw) => {
      const block = raw.trim()
      if (!block) return ''
      const lines = block.split('\n')

      // Tabla: primera fila con pipes y segunda fila separadora (|---|).
      if (lines.length >= 2 && /^\|.*\|$/.test(lines[0]) && /^\|[\s:|-]+\|$/.test(lines[1])) {
        return renderTable(block)
      }
      if (block === '---') return '<hr />'
      if (/^### /.test(block)) return `<h3>${inline(block.slice(4))}</h3>`
      if (/^## /.test(block)) return `<h2>${inline(block.slice(3))}</h2>`
      if (lines.every((l) => /^\d+\.\s/.test(l))) {
        return (
          '<ol>' +
          lines.map((l) => `<li>${inline(l.replace(/^\d+\.\s/, ''))}</li>`).join('') +
          '</ol>'
        )
      }
      if (lines.every((l) => /^-\s/.test(l))) {
        return (
          '<ul>' + lines.map((l) => `<li>${inline(l.replace(/^-\s/, ''))}</li>`).join('') + '</ul>'
        )
      }
      return `<p>${inline(block.replace(/\n/g, ' '))}</p>`
    })
    .join('\n')
}

// --- Componente ---------------------------------------------------------------

export function BlogContent({ content }) {
  const parts = parseContent(content)
  return parts.map((part, i) => {
    if (part.kind === 'chart') {
      const Chart = CHART_COMPONENTS[part.type]
      return <Chart key={i} {...part.spec} />
    }
    return (
      <div
        key={i}
        className="blog-md"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(part.text) }}
      />
    )
  })
}

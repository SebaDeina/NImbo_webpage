import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Writable } from 'node:stream'
import App from './App.jsx'
import { SeoContext } from './hooks/useSeo'

/*
  Entrada de servidor para el prerender del build (scripts/prerender.mjs).
  Renderiza una ruta a HTML y devuelve lo que la página pidió para su <head> con useSeo.
  Se usa renderToPipeableStream + onAllReady (y no renderToString) para esperar las
  páginas cargadas con lazy(): así el HTML trae el contenido y no el fallback del Suspense.
*/
export function render(url) {
  const sink = { seo: null }
  const app = (
    <StrictMode>
      <SeoContext.Provider value={sink}>
        <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App />
        </StaticRouter>
      </SeoContext.Provider>
    </StrictMode>
  )

  return new Promise((resolve, reject) => {
    let html = ''
    const out = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString()
        cb()
      },
    })
    out.on('finish', () => resolve({ html, seo: sink.seo }))
    const stream = renderToPipeableStream(app, {
      onAllReady() {
        stream.pipe(out)
      },
      onShellError: reject,
      onError(err) {
        reject(err)
      },
    })
  })
}

/* Las rutas de los artículos salen de los datos del blog: un artículo nuevo se prerenderiza solo. */
export { posts } from './data/blog'
export { seoTags } from './hooks/useSeo'

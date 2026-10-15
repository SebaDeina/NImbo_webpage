import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/grabado.css'

document.documentElement.dataset.theme = 'light'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// El build prerenderiza el HTML de cada ruta (scripts/prerender.mjs); hydrateRoot lo activa sin
// re-renderizar. Si el HTML era de otra ruta u otro host, el script en línea que agrega el prerender ya lo vació.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}

# Diario de SEO/GEO

Lo escribe la rutina diaria `seo-diario` (OpenClaw, repo Openclaw, carpeta `seo/`): una entrada por día con cambios, la más nueva arriba. No editar a mano lo de abajo de esta línea.

## 2026-10-17
- **Publicar una guía sobre agentes de IA para pymes** (articulo) — Cubre de forma directa una búsqueda objetivo donde hoy aparecen guías y comparativas de competidores, sin superponerse con el artículo que solo compara agentes y chatbots. También enlaza la guía con la landing comercial y otros contenidos relacionados.  
  Archivos: `public/sitemap.xml`, `src/data/blog.js`
- **Describir la landing de automatizaciones con Service y FAQPage** (datos-estructurados) — La página ya contiene un servicio definido y preguntas frecuentes visibles. Relacionarlos con la entidad de Nimbo y generar las preguntas desde la misma fuente mejora su interpretación sin duplicar ni inventar contenido.  
  Archivos: `src/pages/Automatizaciones.jsx`
- **Relacionar cada artículo con Nimbo y sus migas de pan** (datos-estructurados) — El marcado actual identifica el artículo, pero no enlaza de forma estable autor, editor, sitio y navegación. Un grafo con BlogPosting y BreadcrumbList mejora la comprensión de todos los artículos, incluido el nuevo.  
  Archivos: `src/pages/BlogPost.jsx`

## 2026-10-16
- **Publicar archivos llms.txt para asistentes de IA** (geo) — Les da a los asistentes un resumen autocontenido y verificable de qué es Nimbo, para quién trabaja, dónde está y cuáles son sus páginas principales.  
  Archivos: `public/llms-full.txt`, `public/llms.txt`
- **Relacionar el sitio y el negocio con JSON-LD** (datos-estructurados) — El WebSite y el ProfessionalService quedan conectados mediante identificadores estables, con correo e imagen oficiales. Esto facilita que buscadores y asistentes reconozcan a Nimbo como la entidad responsable del sitio.  
  Archivos: `index.html`


# Diario de SEO/GEO

Lo escribe la rutina diaria `seo-diario` (OpenClaw, repo Openclaw, carpeta `seo/`): una entrada por día con cambios, la más nueva arriba. No editar a mano lo de abajo de esta línea.

## 2026-10-24
- **Crear una landing de desarrollo web para pymes en Buenos Aires** (pagina) — Una página comercial específica permite competir por la búsqueda local con un título, un h1, contenido y datos estructurados propios. También separa con claridad páginas web, aplicaciones internas, portales y sistemas a medida sin inventar servicios.  
  Archivos: `public/llms-full.txt`, `public/llms.txt`, `public/sitemap.xml`, `src/App.jsx`, `src/components/Footer.jsx`, `src/pages/Home.jsx`, `src/pages/ServicioDesarrolloWeb.jsx`

## 2026-10-23
- **Completar los datos estructurados de Nimbo Display** (datos-estructurados) — WebPage, Product, FAQPage y BreadcrumbList permiten relacionar el producto, sus respuestas visibles, Nimbo y la navegación sin cambiar precios ni agregar afirmaciones.  
  Archivos: `public/sitemap.xml`, `src/pages/Display.jsx`
- **Enlazar IA y automatización desde la navegación principal** (enlaces) — Un enlace interno descriptivo y presente en las páginas principales refuerza la landing que compite por automatización con IA y agentes para pymes, actualmente visible solo desde zonas menos prominentes.  
  Archivos: `src/components/nd/NdHeader.jsx`

## 2026-10-22
- **Aclarar la oferta y el equipo de Nimbo para asistentes de IA** (geo) — El resumen actual agrega un rango de empleados que no está respaldado por el sitio. Las respuestas directas y la identificación del equipo mejoran la comprensión de la entidad y de sus servicios sin inventar atributos.  
  Archivos: `public/llms-full.txt`, `public/llms.txt`
- **Completar la identidad local de Nimbo en los datos estructurados** (datos-estructurados) — La ubicación, el teléfono y el perfil oficial ya están publicados, pero no forman parte de ProfessionalService. Incorporarlos ayuda a relacionar a Nimbo con Buenos Aires y sus canales oficiales.  
  Archivos: `index.html`
- **Identificar el diagnóstico como servicio y página de conversión** (datos-estructurados) — La página explica un servicio concreto, su modalidad y qué ocurre durante la reunión, pero hoy no tiene datos estructurados propios. WebPage, Service y BreadcrumbList permiten interpretar su propósito y su relación con Nimbo.  
  Archivos: `public/sitemap.xml`, `src/pages/Diagnostico.jsx`

## 2026-10-21
- **Bloquear el rastreo de propuestas privadas** (tecnico) — Las rutas /propuesta contienen material privado y robots.txt actualmente permite rastrear todo el sitio. El bloqueo reduce el riesgo de que buscadores descubran estas páginas por enlaces externos o historiales compartidos.  
  Archivos: `public/robots.txt`
- **Reforzar la guía para desarrollo web de pymes en Buenos Aires** (contenido) — La búsqueda de desarrollo web necesita una respuesta comercial específica, pero no se puede crear una landing esta semana. La guía existente ahora conecta esa intención con la oferta verificable de Nimbo y declara correctamente su fecha de actualización.  
  Archivos: `public/sitemap.xml`, `src/data/blog.js`, `src/pages/BlogPost.jsx`
- **Identificar la página de contacto y sus migas de pan** (datos-estructurados) — ContactPage y BreadcrumbList conectan la ruta de conversión con la entidad Nimbo y el sitio principal. Esto facilita que buscadores y asistentes interpreten correctamente el propósito de la página.  
  Archivos: `public/sitemap.xml`, `src/pages/Contacto.jsx`

## 2026-10-20
- **Alinear la landing con «automatización con IA para pymes Argentina»** (meta) — El título y el h1 actuales priorizan agentes, pero la búsqueda más amplia usa «automatización con IA». Incorporar esa frase y Argentina mejora la correspondencia temática sin cambiar la oferta.  
  Archivos: `public/sitemap.xml`, `src/pages/Automatizaciones.jsx`
- **Identificar al equipo de Nimbo como entidades Person** (datos-estructurados) — La página Nosotros ya publica nombres, funciones y biografías verificables. Declararlos como personas vinculadas al negocio ayuda a buscadores y asistentes a entender quién integra Nimbo.  
  Archivos: `index.html`, `public/sitemap.xml`, `src/pages/Nosotros.jsx`
- **Reforzar los enlaces internos hacia automatizaciones y agentes** (enlaces) — La landing principal recibe un enlace desde el área de automatización, pero no desde la tarjeta específica de IA ni desde el enlace equivalente del pie. Estos enlaces descriptivos consolidan la página para las dos búsquedas objetivo.  
  Archivos: `public/sitemap.xml`, `src/components/Footer.jsx`, `src/pages/Home.jsx`

## 2026-10-19
- **Describir el índice del blog con CollectionPage e ItemList** (datos-estructurados) — Declara cada artículo, su tema y fecha dentro de un índice conectado con Nimbo. Ayuda a buscadores que ejecutan JavaScript a descubrir y relacionar las guías que compiten en búsquedas informativas.  
  Archivos: `src/pages/Blog.jsx`
- **Convertir el portfolio en una colección de proyectos legible por máquinas** (datos-estructurados) — Los proyectos publicados son evidencia concreta de las capacidades de Nimbo. Un ItemList con entidades CreativeWork permite interpretar esa evidencia sin inventar clientes, resultados ni métricas.  
  Archivos: `src/pages/Proyectos.jsx`
- **Actualizar las fechas reales de las páginas modificadas** (tecnico) — La home todavía declara julio pese a los cambios del 18 de octubre. Actualizar home, blog y proyectos evita señales de antigüedad incorrectas y ayuda a priorizar el rastreo de las páginas modificadas.  
  Archivos: `public/sitemap.xml`

## 2026-10-18
- **Explicitar el servicio de desarrollo web para pymes** (contenido) — La oferta actual queda escondida bajo «Software a medida», aunque el sitio sí declara que Nimbo diseña páginas web. Nombrarla de forma directa mejora la relevancia para búsquedas de desarrollo web sin crear un servicio nuevo.  
  Archivos: `index.html`, `src/components/Footer.jsx`, `src/pages/Home.jsx`
- **Marcar las preguntas frecuentes de la home** (datos-estructurados) — La home ya muestra preguntas y respuestas completas sobre diagnóstico, costos, integración y ubicación. Declararlas como FAQPage ayuda a buscadores y asistentes a interpretar esas respuestas sin agregar contenido ni modificar precios.  
  Archivos: `src/pages/Home.jsx`
- **Conectar la nueva guía con la landing de agentes** (enlaces) — La búsqueda está dominada por guías, y el artículo publicado ayer todavía necesita señales internas. El enlace bidireccional entre la guía y la landing consolida el tema, mientras que llms-full.txt permite que asistentes encuentren la lectura nueva.  
  Archivos: `public/llms-full.txt`, `public/sitemap.xml`, `src/pages/Automatizaciones.jsx`

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


// /blog del sitio nuevo: el índice de artículos (src/ns/Blog.jsx).
import { useSeo } from '../hooks/useSeo'
import { posts } from '../data/blog'
import Blog from '../ns/Blog'

const SITE = 'https://www.nimbodata.com'
const DESCRIPTION =
  'Guías prácticas sobre automatización, inteligencia artificial, páginas web y transformación digital para dueños de negocios en Argentina.'

export default function BlogIndice() {
  useSeo({
    title: 'Blog Nimbo — Automatización e IA para pymes',
    description: DESCRIPTION,
    path: '/blog',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${SITE}/blog#page`,
          name: 'Blog de Nimbo',
          description: DESCRIPTION,
          url: `${SITE}/blog`,
          inLanguage: 'es-AR',
          isPartOf: { '@id': `${SITE}/#website` },
          about: { '@id': `${SITE}/#business` },
          mainEntity: { '@id': `${SITE}/blog#articles` },
        },
        {
          '@type': 'ItemList',
          '@id': `${SITE}/blog#articles`,
          numberOfItems: posts.length,
          itemListElement: posts.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE}/blog/${p.slug}`,
            item: {
              '@type': 'BlogPosting',
              '@id': `${SITE}/blog/${p.slug}#article`,
              headline: p.title,
              description: p.description,
              datePublished: p.date,
              articleSection: p.category,
              inLanguage: 'es-AR',
              author: { '@id': `${SITE}/#business` },
              publisher: { '@id': `${SITE}/#business` },
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${SITE}/blog#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
          ],
        },
      ],
    },
  })
  return <Blog />
}

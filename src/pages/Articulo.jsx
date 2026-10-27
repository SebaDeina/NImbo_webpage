// /blog/<slug> del sitio nuevo (src/ns/BlogPost.jsx), con el mismo SEO que tenía el artículo.
import { useParams } from 'react-router-dom'
import { getPost } from '../data/blog'
import { useSeo } from '../hooks/useSeo'
import BlogPost from '../ns/BlogPost'
import NotFound from './NotFound'

const SITE = 'https://www.nimbodata.com'

// un slug que no existe muestra la 404 (en Vercel ya llega con estado 404: no hay archivo prerenderado)
export default function Articulo() {
  const { slug } = useParams()
  return getPost(slug) ? <Post key={slug} slug={slug} /> : <NotFound ns />
}

function Post({ slug }) {
  const post = getPost(slug)
  const url = `${SITE}/blog/${slug}`
  useSeo(
    post
      ? {
          // <title> de 60 caracteres como máximo: seoTitle (src/data/blog.js); el H1 sigue siendo title
          title: `${post.seoTitle || post.title} | Nimbo`,
          description: post.description,
          path: `/blog/${post.slug}`,
          type: 'article',
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BlogPosting',
                '@id': `${url}#article`,
                headline: post.title,
                description: post.description,
                datePublished: post.date,
                dateModified: post.updated || post.date,
                articleSection: post.category,
                inLanguage: 'es-AR',
                image: `${SITE}/og-nimbo-v3.jpg`,
                author: { '@id': `${SITE}/#business` },
                publisher: { '@id': `${SITE}/#business` },
                isPartOf: { '@id': `${SITE}/#website` },
                mainEntityOfPage: { '@type': 'WebPage', '@id': url },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': `${url}#breadcrumb`,
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
                  { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
                  { '@type': 'ListItem', position: 3, name: post.title, item: url },
                ],
              },
            ],
          },
        }
      : {},
  )
  return <BlogPost slug={slug} />
}

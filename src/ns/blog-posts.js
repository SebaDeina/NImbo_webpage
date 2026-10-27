// Los artículos del blog salen directo de src/data/blog.js del sitio real (título, fecha, categoría y contenido),
// así el índice, los artículos y la nube usan siempre los mismos datos.
export { posts as POSTS, getPost } from '../data/blog.js'

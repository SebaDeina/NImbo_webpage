/* Portada de proyecto: versión chica en móvil, full en desktop. */
export default function ProjectCover({
  src,
  alt,
  eager = false,
  priority = false,
  className = '',
}) {
  if (!src) return null

  const base = src.replace(/\.(png|jpe?g|webp)$/i, '')
  const sm = `${base}-sm.jpg`
  const full = src.endsWith('.jpg') ? src : `${base}.jpg`

  return (
    <picture>
      <source media="(max-width: 760px)" srcSet={sm} type="image/jpeg" />
      <img
        src={full}
        alt={alt}
        className={className}
        width={1024}
        height={682}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        sizes="(max-width: 760px) 100vw, 50vw"
      />
    </picture>
  )
}

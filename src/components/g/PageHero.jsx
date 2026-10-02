import { CloudBand, Flock, Stars, SHIP_LAYER } from './Art'

const ROWS = [
  { base: 0.42, rmin: 0.09, rmax: 0.18, seed: 13, fade: 'dark' },
  { base: 0.68, rmin: 0.11, rmax: 0.22, seed: 29, fade: 'dark' },
  { base: 0.97, rmin: 0.13, rmax: 0.27, seed: 47, fade: 'light' },
]

/* Encabezado índigo de las páginas internas: texto + nubes grabadas + dirigible. */
export default function PageHero({ className = '', children }) {
  return (
    <header className={`phero ${className}`}>
      <Stars count={55} seed={13} />
      <Flock n={6} seed={21} className="hero-flock" />
      <div className="wrap phero-in">{children}</div>
      <CloudBand className="clouds band" rows={ROWS} layers={[SHIP_LAYER(1, 1.5)]} line={3.5} />
    </header>
  )
}

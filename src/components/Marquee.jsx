const ITEMS = ['Web', 'Datos', 'Inteligencia Artificial', 'Branding', 'Estrategia', 'Automatización']

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}

export default function Divider({ variant = 'wave' }) {
  return (
    <div className={`sec-divider sec-divider--${variant}`} aria-hidden="true">
      {variant === 'wave' && (
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,32 Q180,4 360,32 T720,32 T1080,32 T1440,32" />
        </svg>
      )}
      {variant === 'zigzag' && (
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="0,20 90,4 180,20 270,36 360,20 450,4 540,20 630,36 720,20 810,4 900,20 990,36 1080,20 1170,4 1260,20 1350,36 1440,20" />
        </svg>
      )}
      {variant === 'dots' && (
        <svg viewBox="0 0 1440 24" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 24 }).map((_, i) => (
            <circle key={i} cx={i * 62 + 12} cy="12" r="2" />
          ))}
        </svg>
      )}
    </div>
  )
}

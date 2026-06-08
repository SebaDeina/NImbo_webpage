import { useId } from 'react'

/* Nube orgánica — textura turbulenta + vapores animados, tinte sutil por servicio. */
export default function ServiceCloud({ variant = 'svc1', shape = 'pill' }) {
  const uid = useId().replace(/:/g, '')
  const filterId = `svc-turb-${uid}`

  return (
    <span
      className={`svc-cloud svc-cloud--${shape}`}
      data-variant={variant}
      aria-hidden="true"
    >
      <svg className="svc-cloud__svg" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.038 0.065"
              numOctaves="4"
              seed="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="14s"
                values="0.032 0.055;0.048 0.078;0.036 0.062;0.032 0.055"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>
      </svg>

      <span className="svc-cloud__sky" />
      <span className="svc-cloud__body" style={{ filter: `url(#${filterId})` }} />
      <span className="svc-cloud__wisp svc-cloud__wisp--1" />
      <span className="svc-cloud__wisp svc-cloud__wisp--2" />
      <span className="svc-cloud__wisp svc-cloud__wisp--3" />
      <span className="svc-cloud__wisp svc-cloud__wisp--4" />
      <span className="svc-cloud__glow" />
      <span className="svc-cloud__grain" />
    </span>
  )
}

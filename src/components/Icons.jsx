/* Iconos SVG — mismo aspecto en todos los dispositivos (sin emoji ni fuentes del sistema). */

function Svg({ size = 18, className = '', viewBox = '0 0 24 24', children, fill = 'none' }) {
  return (
    <span
      className={`ui-icon${className ? ` ${className}` : ''}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        width="100%"
        height="100%"
        fill={fill}
      >
        {children}
      </svg>
    </span>
  )
}

export function IconArrowRight({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function IconArrowLeft({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function IconArrowUpRight({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function IconCheck({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M5 12.5 9.5 17 19 7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function IconPlus({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export function IconMinus({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  )
}

export function IconSun({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export function IconMoon({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M21 14.5A7.5 7.5 0 0 1 9.5 3 6.5 6.5 0 1 0 21 14.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

/** Asterisco de 8 puntas (sustituto del carácter ✳ — mismo aspecto en iOS/Android/desktop). */
export function IconStar({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M12 2v20M2 12h20M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  )
}

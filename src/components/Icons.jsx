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
        d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
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

/* ——— Iconos de servicios (para selección con iconos en la landing) ——— */

export function IconGlobe({ size = 24, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  )
}

export function IconBolt({ size = 24, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  )
}

export function IconCalendar({ size = 24, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 9.5h17M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="14.5" r="1.4" fill="currentColor" />
    </Svg>
  )
}

export function IconChat({ size = 24, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H9l-4.5 4v-4H4A1.5 1.5 0 0 1 2.5 15V7A1.5 1.5 0 0 1 4 5.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M8 10.5h8M8 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
  )
}

export function IconBrush({ size = 24, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M15.5 4.5 19.5 8.5 9.8 18.2a3 3 0 0 1-1.6.84l-3.6.66.66-3.6a3 3 0 0 1 .84-1.6L15.5 4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="m14 6 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
  )
}

export function IconBrowser({ size = 24, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6.5" cy="7.25" r=".75" fill="currentColor" />
      <circle cx="8.75" cy="7.25" r=".75" fill="currentColor" />
    </Svg>
  )
}

export function IconChart({ size = 24, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M5 19V11M10 19V5M15 19v-7M20 19V9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export function IconWhatsApp({ size = 20, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"
      />
    </Svg>
  )
}

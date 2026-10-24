/* Equipo NIMBO — editá nombres, roles y fotos (/public/team/). */
export const TEAM = [
  {
    id: 'seba',
    initials: 'SD',
    photo: null,
    name: { es: 'Sebastian Deina', en: 'Sebastian Deina' },
    // perfiles públicos (JSON-LD Person.sameAs en /nosotros; mismos que el founder de index.html)
    sameAs: ['https://x.com/sebadeina', 'https://github.com/SebaDeina'],
    role: { es: 'IA, automatización y software', en: 'AI, automation & software' },
    bio: {
      es: 'Diseña e implementa agentes de IA, integraciones y sistemas a medida, desde el diagnóstico hasta que quedan funcionando en la operación.',
      en: 'Designs and implements AI agents, integrations and custom systems, from the assessment until they run in day-to-day operations.',
    },
  },
  {
    id: 'sol',
    initials: 'SB',
    photo: null,
    name: { es: 'Sol Bogner', en: 'Sol Bogner' },
    role: { es: 'Diseño y branding', en: 'Design & branding' },
    bio: {
      es: 'Identidad visual, interfaces y piezas de marca para que cada proyecto se vea claro, cuidado y profesional.',
      en: 'Visual identity, interfaces and brand assets so every project looks clear, polished and professional.',
    },
  },
]

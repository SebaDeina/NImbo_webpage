// import type { Core } from '@strapi/strapi';
import { sendContactNotification } from './lib/contact-email';

const SEED = [
  {
    title: 'WODSI',
    slug: 'wodsi',
    client: 'WODSI',
    year: '2025',
    accent: '#f97316',
    live: 'https://wodsi.com.ar/',
    category: { es: 'Aplicación SaaS', en: 'SaaS App' },
    summary: {
      es: 'Plataforma para coaches: gestión de atletas, planificación y automatización por WhatsApp.',
      en: 'Platform for coaches: athlete management, scheduling and WhatsApp automation.',
    },
    description: {
      es: [
        'WODSI es una plataforma SaaS para coaches y entrenadores: centraliza la gestión de atletas, la planificación semanal de entrenamientos y la comunicación, todo en un solo lugar.',
        'Diseñamos y construimos el producto de punta a punta —interfaz, base de datos y automatizaciones— integrando WhatsApp para que el seguimiento de cada atleta sea automático y sin fricción.',
      ],
      en: [
        'WODSI is a SaaS platform for coaches and trainers: it centralizes athlete management, weekly workout scheduling and communication, all in one place.',
        'We designed and built the product end to end —interface, database and automations— integrating WhatsApp so follow-up with each athlete is automatic and frictionless.',
      ],
    },
    services: ['Producto digital', 'Web App', 'Automatización', 'IA'],
    tags: ['React', 'Firebase', 'WhatsApp API', 'IA'],
    placeholder: { es: 'captura de la app WODSI', en: 'WODSI app screenshot' },
  },
  {
    title: 'Tu próximo sitio',
    slug: 'proximo-sitio',
    client: 'Reservado',
    year: '2026',
    accent: '#7aa2ff',
    live: null,
    category: { es: 'Web · E-commerce', en: 'Web · E-commerce' },
    summary: {
      es: 'Un sitio o tienda que carga rápido y convierte visitas en clientes.',
      en: 'A fast site or store that turns visits into customers.',
    },
    description: {
      es: ['Espacio reservado para tu próximo proyecto web.'],
      en: ['Reserved for your next web project.'],
    },
    services: ['Diseño web', 'Desarrollo', 'CRO', 'SEO'],
    tags: ['Next.js', 'UI/UX', 'CRO', 'SEO'],
    placeholder: { es: 'mockup de sitio / e-commerce', en: 'site / e-commerce mockup' },
  },
  {
    title: 'Dashboard a medida',
    slug: 'dashboard-a-medida',
    client: 'Reservado',
    year: '2026',
    accent: '#5be0c8',
    live: null,
    category: { es: 'Datos · Dashboards', en: 'Data · Dashboards' },
    summary: {
      es: 'Paneles que convierten números dispersos en decisiones.',
      en: 'Dashboards that turn scattered numbers into decisions.',
    },
    description: {
      es: ['Espacio reservado para un caso de datos. Métricas en vivo, alertas y reporting automático.'],
      en: ['Reserved for a data case study. Live metrics, alerts and automated reporting.'],
    },
    services: ['Dashboards', 'Analítica', 'Automatización'],
    tags: ['Dashboards', 'Analítica', 'Automatización'],
    placeholder: { es: 'dashboard / gráfico de datos', en: 'dashboard / data chart' },
  },
  {
    title: 'Asistente con IA',
    slug: 'asistente-ia',
    client: 'Reservado',
    year: '2026',
    accent: '#6665ff',
    live: null,
    category: { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
    summary: {
      es: 'Agentes y chatbots a medida que atienden y automatizan 24/7.',
      en: 'Custom agents and chatbots that serve and automate 24/7.',
    },
    description: {
      es: ['Espacio reservado para un caso de IA: agentes, chatbots e integraciones a medida.'],
      en: ['Reserved for an AI case study: custom agents, chatbots and integrations.'],
    },
    services: ['Agentes IA', 'Chatbots', 'Integraciones'],
    tags: ['Agentes IA', 'Chatbots', 'Integraciones'],
    placeholder: { es: 'interfaz de chat / agente IA', en: 'chat interface / AI agent' },
  },
];

async function grantPublicPermission(strapi, action) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) return;
  const existing = await strapi.db
    .query('plugin::users-permissions.permission')
    .findOne({ where: { action, role: publicRole.id } });
  if (!existing) {
    await strapi.db
      .query('plugin::users-permissions.permission')
      .create({ data: { action, role: publicRole.id } });
  }
}

async function grantPublicAccess(strapi) {
  const actions = [
    'api::proyecto.proyecto.find',
    'api::proyecto.proyecto.findOne',
    'api::contacto.contacto.create',
  ];
  for (const action of actions) {
    await grantPublicPermission(strapi, action);
  }
}

async function createProject(strapi, data) {
  await strapi.documents('api::proyecto.proyecto').create({
    data,
    status: 'published',
  });
}

/* Strapi 5 con Draft & Publish: el admin edita el borrador.
   El seed viejo (db.query) solo creaba la versión publicada → formulario vacío. */
async function seedProjects(strapi) {
  const published = await strapi.documents('api::proyecto.proyecto').findMany({
    status: 'published',
  });
  const drafts = await strapi.documents('api::proyecto.proyecto').findMany({
    status: 'draft',
  });
  const hasBrokenSeed = published.length > 0 && drafts.length === 0;

  if (published.length > 0 && !hasBrokenSeed) return;

  if (hasBrokenSeed) {
    strapi.log.warn('[seed] Reparando proyectos (faltaban borradores para el admin).');
    for (const doc of published) {
      await strapi.documents('api::proyecto.proyecto').delete({
        documentId: doc.documentId,
      });
    }
  }

  for (const data of SEED) {
    await createProject(strapi, data);
  }
  strapi.log.info(`[seed] ${SEED.length} proyectos creados.`);
}

export default {
  register({ strapi }) {
    strapi.documents.use(async (context, next) => {
      const result = await next();
      if (context.uid !== 'api::contacto.contacto' || context.action !== 'create') {
        return result;
      }
      sendContactNotification(result)
        .then(() => strapi.log.info(`[contacto] Email enviado para ${result.email}`))
        .catch((err) => strapi.log.error(`[contacto] Error al enviar email: ${err.message}`));
      return result;
    });
  },

  async bootstrap({ strapi }) {
    await grantPublicAccess(strapi);
    await seedProjects(strapi);
  },
};

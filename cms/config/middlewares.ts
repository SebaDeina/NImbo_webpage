import type { Core } from '@strapi/strapi';

const LOCAL_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:4173',
];

export default ({ env }: Core.Config.Shared.ConfigParams) => {
  const origins = (env('CORS_ORIGINS', LOCAL_ORIGINS.join(',')) as string)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
      name: 'strapi::cors',
      config: { origin: origins },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};

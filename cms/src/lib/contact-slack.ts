import {
  BUDGET_LABELS,
  TOPIC_LABELS,
  type ContactEntry,
} from './contact-email';

function field(label: string, value?: string | null) {
  if (!value?.trim()) return null;
  return { type: 'mrkdwn', text: `*${label}:*\n${value}` };
}

function buildBlocks(entry: ContactEntry) {
  const name = [entry.firstName, entry.lastName].filter(Boolean).join(' ');
  const phone = [entry.countryCode, entry.phone].filter(Boolean).join(' ').trim();
  const topic = TOPIC_LABELS[entry.topic] ?? entry.topic;
  const budget = entry.budget ? (BUDGET_LABELS[entry.budget] ?? entry.budget) : null;

  const fields = [
    field('Nombre', name),
    field('Email', entry.email),
    field('Teléfono', phone),
    field('Empresa', entry.company),
    field('Tema', topic),
    field('Presupuesto', budget),
    field('Idioma', entry.lang === 'en' ? 'English' : 'Español'),
  ].filter(Boolean);

  return [
    {
      type: 'header',
      text: { type: 'plain_text', text: 'Nueva consulta — NIMBO', emoji: true },
    },
    {
      type: 'section',
      fields: fields.slice(0, 10),
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Mensaje:*\n${entry.message}`,
      },
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Responder a <mailto:${entry.email}|${entry.email}>`,
        },
      ],
    },
  ];
}

export async function sendContactSlackNotification(entry: ContactEntry) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const name = [entry.firstName, entry.lastName].filter(Boolean).join(' ');
  const topic = TOPIC_LABELS[entry.topic] ?? entry.topic;

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `Nueva consulta: ${name} — ${topic}`,
      blocks: buildBlocks(entry),
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(body || `Slack webhook responded with ${response.status}`);
  }
}

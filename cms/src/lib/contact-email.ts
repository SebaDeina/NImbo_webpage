import { Resend } from 'resend';

const TOPIC_LABELS: Record<string, string> = {
  branding: 'Branding',
  web: 'Web / E-commerce',
  datos: 'Datos / Dashboards',
  ia: 'Inteligencia Artificial',
  otro: 'Otro',
};

const BUDGET_LABELS: Record<string, string> = {
  u10: 'Menos de $10K',
  '10-25': '$10K - $25K',
  '25-50': '$25K - $50K',
  '50-100': '$50K - $100K',
  '100-500': '$100K - $500K',
  '500+': '$500K+',
  na: 'N/A',
};

type ContactEntry = {
  firstName: string;
  lastName?: string | null;
  email: string;
  countryCode?: string | null;
  phone?: string | null;
  company?: string | null;
  topic: string;
  budget?: string | null;
  message: string;
  lang?: string | null;
};

function row(label: string, value?: string | null) {
  if (!value?.trim()) return '';
  return `<tr><td style="padding:8px 12px 8px 0;color:#666;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:8px 0">${value}</td></tr>`;
}

function buildHtml(entry: ContactEntry) {
  const name = [entry.firstName, entry.lastName].filter(Boolean).join(' ');
  const phone = [entry.countryCode, entry.phone].filter(Boolean).join(' ').trim();
  const topic = TOPIC_LABELS[entry.topic] ?? entry.topic;
  const budget = entry.budget ? (BUDGET_LABELS[entry.budget] ?? entry.budget) : null;

  return `
    <h2 style="margin:0 0 16px;font-size:20px">Nueva consulta — NIMBO</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;line-height:1.5">
      ${row('Nombre', name)}
      ${row('Email', `<a href="mailto:${entry.email}">${entry.email}</a>`)}
      ${row('Teléfono', phone)}
      ${row('Empresa', entry.company)}
      ${row('Tema', topic)}
      ${row('Presupuesto', budget)}
      ${row('Idioma', entry.lang === 'en' ? 'English' : 'Español')}
    </table>
    <h3 style="margin:24px 0 8px;font-size:16px">Mensaje</h3>
    <p style="margin:0;white-space:pre-wrap">${entry.message}</p>
  `;
}

export async function sendContactNotification(entry: ContactEntry) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_NOTIFY_EMAIL || 'contacto@nimbodata.com';
  const from = process.env.RESEND_FROM || 'NIMBO <onboarding@resend.dev>';
  const name = [entry.firstName, entry.lastName].filter(Boolean).join(' ');

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: entry.email,
    subject: `Nueva consulta: ${name} — ${TOPIC_LABELS[entry.topic] ?? entry.topic}`,
    html: buildHtml(entry),
  });

  if (error) throw new Error(error.message);
}

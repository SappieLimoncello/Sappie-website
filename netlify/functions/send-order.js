import * as React from 'react';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { OrderNotificationEmail } from '../../emails/OrderNotificationEmail.jsx';
import { OrderConfirmationEmail } from '../../emails/OrderConfirmationEmail.jsx';

const BTW_RATE = 0.21;

// Prijzen worden hier server-side herberekend (i.p.v. vertrouwd vanuit de
// browser) zodat een aangepast bedrag in de aanvraag niet in de mails belandt.
// Bij een prijswijziging in Bestelformulier.jsx moet deze lijst ook worden bijgewerkt.
const PRODUCTS = {
  klein: { name: 'Klein Sappie', ml: '100ml', price: 5.50 },
  klassiek: { name: 'Klassiek Sappie', ml: '500ml', price: 18.50 },
  groot: { name: 'Groot Sappie', ml: '1000ml', price: 32.95 },
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function isValidKvk(value) {
  return /^\d{8}$/.test(String(value || '').trim());
}

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse(400, { error: 'Ongeldige aanvraag.' });
  }

  const { qty, form } = payload || {};

  const cartItems = Object.entries(PRODUCTS)
    .map(([key, p]) => ({ ...p, qty: Number(qty?.[key]) || 0 }))
    .filter((p) => p.qty > 0);

  if (!cartItems.length) {
    return jsonResponse(400, { error: 'Er is geen bestelling geselecteerd.' });
  }
  if (
    !form
    || !isValidEmail(form.email)
    || !String(form.naam || '').trim()
    || !String(form.bedrijf || '').trim()
    || !isValidKvk(form.kvk)
  ) {
    return jsonResponse(400, { error: 'Vul alle verplichte gegevens in.' });
  }

  const subtotal = cartItems.reduce((sum, p) => sum + p.qty * p.price, 0);
  const order = { cartItems, subtotal, btwRate: BTW_RATE, form };

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error('send-order: RESEND_API_KEY ontbreekt in de environment variables.');
    return jsonResponse(500, { error: 'E-mail is nog niet geconfigureerd.' });
  }

  const resend = new Resend(resendApiKey);
  const notifyEmail = process.env.ORDER_NOTIFY_EMAIL || 'info@sappie-limoncello.nl';
  const fromEmail = process.env.ORDER_FROM_EMAIL || 'info@sappie-limoncello.nl';

  const [notificationHtml, confirmationHtml] = await Promise.all([
    render(React.createElement(OrderNotificationEmail, { order })),
    render(React.createElement(OrderConfirmationEmail, { order })),
  ]);

  const results = await Promise.allSettled([
    resend.emails.send({
      from: `Sappie Limoncello <${fromEmail}>`,
      to: notifyEmail,
      replyTo: form.email,
      subject: `Nieuwe bestelling van ${form.bedrijf}`,
      html: notificationHtml,
    }),
    resend.emails.send({
      from: `Sappie Limoncello <${fromEmail}>`,
      to: form.email,
      subject: 'Bevestiging van je bestelling bij Sappie Limoncello',
      html: confirmationHtml,
    }),
  ]);

  const failed = results.some((r) => r.status === 'rejected' || r.value?.error);
  if (failed) {
    console.error('send-order: verzenden mislukt', JSON.stringify(results));
    return jsonResponse(502, { error: 'Bestelling kon niet worden verstuurd. Probeer het later opnieuw.' });
  }

  return jsonResponse(200, { ok: true });
};

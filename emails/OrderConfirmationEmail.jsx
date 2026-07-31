import * as React from 'react';
import { Body, Column, Container, Head, Heading, Hr, Html, Preview, Row, Section, Text } from '@react-email/components';
import { PREVIEW_ORDER } from './previewOrder.js';

const ink = '#3A3E2C';
const bg = '#FAF4E6';
const rood = '#C1443B';

function formatPrice(value) {
  return value.toFixed(2).replace('.', ',');
}

export function OrderConfirmationEmail({ order = PREVIEW_ORDER }) {
  const { cartItems, subtotal, btwRate, form } = order;
  const totalIncl = subtotal * (1 + btwRate);

  return (
    <Html>
      <Head />
      <Preview>Bevestiging van je bestelling bij Sappie Limoncello</Preview>
      <Body style={{ backgroundColor: bg, fontFamily: 'Arial, sans-serif', color: ink, margin: 0, padding: '24px' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: '#ffffff', border: `2px solid ${ink}` }}>
          <Section style={{ padding: '28px 32px' }}>
            <Heading as="h1" style={{ fontSize: '20px', margin: '0 0 4px' }}>Sappie Limoncello.</Heading>
            <Text style={{ fontSize: '14px', margin: '0 0 20px' }}>
              Bedankt voor je bestelling, {form.naam || 'daar'}. Hieronder een overzicht.
            </Text>

            <Heading as="h2" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 10px' }}>
              Jouw bestelling
            </Heading>
            {cartItems.map((item) => (
              <Row key={item.name} style={{ fontSize: '14px', marginBottom: '4px' }}>
                <Column>{item.qty}&times; {item.name} ({item.ml})</Column>
                <Column align="right">&euro;{formatPrice(item.qty * item.price)}</Column>
              </Row>
            ))}
            <Hr style={{ borderColor: ink, margin: '14px 0' }} />
            <Row style={{ fontSize: '14px' }}>
              <Column>Totaal excl. btw</Column>
              <Column align="right">&euro;{formatPrice(subtotal)}</Column>
            </Row>
            <Row style={{ fontSize: '14px', fontWeight: 700 }}>
              <Column>Totaal incl. btw</Column>
              <Column align="right">&euro;{formatPrice(totalIncl)}</Column>
            </Row>

            <Hr style={{ borderColor: ink, margin: '20px 0' }} />
            <Text style={{ fontSize: '13px', fontWeight: 700, color: rood, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 6px' }}>
              Levering
            </Text>
            <Text style={{ fontSize: '14px', margin: '0 0 20px' }}>
              We nemen binnen twee werkdagen persoonlijk contact met je op over de levering.
            </Text>

            <Hr style={{ borderColor: ink, margin: '20px 0' }} />
            <Text style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>
              Vragen? Mail naar{' '}
              <a href="mailto:info@sappie-limoncello.nl" style={{ color: ink }}>info@sappie-limoncello.nl</a>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default OrderConfirmationEmail;

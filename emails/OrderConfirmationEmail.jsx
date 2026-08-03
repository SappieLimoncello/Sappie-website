import * as React from 'react';
import { Body, Column, Container, Head, Heading, Hr, Html, Preview, Row, Section, Text } from '@react-email/components';
import { PREVIEW_ORDER } from './previewOrder.js';

const ink = '#3A3E2C';
const bg = '#FAF4E6';
const geelFooter = '#F0CE4A';
const groen = '#5E6A3A';
const blauw = '#AFCBDD';
const inkSoft = 'rgba(58, 62, 44, 0.72)';

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
      <Body style={{ backgroundColor: '#FFFFFF', fontFamily: 'Arial, Helvetica, sans-serif', color: ink, margin: 0, padding: '24px' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: bg }}>
          <Section style={{ backgroundColor: blauw, padding: '18px 32px' }}>
            <Text style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.01em', textTransform: 'uppercase', color: ink, margin: 0, whiteSpace: 'nowrap' }}>
              Bestelbevestiging - Sappie Limoncello
            </Text>
          </Section>
          <Section style={{ padding: '28px 32px' }}>
            <Text style={{ fontSize: '14px', color: inkSoft, margin: '0 0 20px' }}>
              Bedankt voor je bestelling, {form.naam || 'daar'}. Hieronder een overzicht.
            </Text>

            <Heading as="h2" style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: ink, margin: '0 0 10px' }}>
              Jouw kassabon
            </Heading>
            {cartItems.map((item) => (
              <Row key={item.name} style={{ fontSize: '14px', marginBottom: '4px' }}>
                <Column>{item.qty}&times; {item.name} ({item.ml})</Column>
                <Column align="right">&euro;{formatPrice(item.qty * item.price)}</Column>
              </Row>
            ))}
            <Hr style={{ borderColor: ink, margin: '10px 0' }} />
            <Row style={{ fontSize: '14px' }}>
              <Column>Totaal excl. btw</Column>
              <Column align="right">&euro;{formatPrice(subtotal)}</Column>
            </Row>
            <Row style={{ fontSize: '14px', fontWeight: 700 }}>
              <Column>Totaal incl. btw</Column>
              <Column align="right">&euro;{formatPrice(totalIncl)}</Column>
            </Row>

            <Hr style={{ borderColor: ink, margin: '20px 0' }} />
            <Text style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>
              Levering
            </Text>
            <Text style={{ fontSize: '14px', margin: 0 }}>
              We nemen persoonlijk contact met je op voor de bevestiging van je bestelling en de levering, uiterlijk binnen twee werkdagen.
            </Text>
          </Section>
          <Section style={{ backgroundColor: geelFooter, padding: '16px 32px' }}>
            <Text style={{ fontSize: '12px', color: ink, margin: 0 }}>
              Vragen? Mail naar{' '}
              <a href="mailto:info@sappie-limoncello.nl" style={{ color: groen, fontWeight: 700 }}>info@sappie-limoncello.nl</a>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default OrderConfirmationEmail;

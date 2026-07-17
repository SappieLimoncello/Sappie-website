import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Highlight, Eyebrow, Chip, Card } from '../../components/core';
import { PhotoPlaceholder } from '../../components/PhotoPlaceholder.jsx';
import { Logo } from '../../components/Logo.jsx';

const COCKTAILS = [
  { name: 'De Donderstraol', tone: 'blue', note: "Sappie ijskoud op een paar grote klontjes, scheutje bruiswater, schil van citroen. Recht voor z'n raap.", tags: ['On the rocks', '2 min'] },
  { name: 'Sappie & Co-co', tone: 'green', note: 'Sappie met kokos, geschud en in een coupe. Zacht, romig en bloemig — borrel op niveau.', tags: ['Coupe', 'Kokos'] },
];

const VALUES = [
  { t: 'Ambachtelijk', d: 'Handgeschilde citroenen, geen schil-bitter. Met de hand, met geduld.' },
  { t: 'Eerlijk', d: 'Geen toevoegingen, geen poespas. Wat erop staat zit erin.' },
  { t: 'Uteregs', d: 'Gemaakt in de Domstad door Hygge Utrecht. Met een nuchtere blik.' },
];

export default function OverSappie() {
  const navigate = useNavigate();

  return (
    <main>
      <section style={{ background: 'var(--olijfgroen)', color: 'var(--warm-wit)', borderBottom: '2px solid var(--olijf-zwart)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--space-9) var(--gutter)', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }}>
          <div>
            <Eyebrow color="light">Over Sappie</Eyebrow>
            <h1 style={{ margin: '0.5rem 0 1rem', fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>
              Trots uit de Domstad
            </h1>
            <p style={{ margin: 0, fontSize: 'var(--fs-lead)', lineHeight: 1.6, maxWidth: '48ch', opacity: 0.95 }}>
              Twee jochies kwamen langs de Vecht op het idee om de Uteregse trots in een
              flesje te stoppen. Geen nonna, geen Amalfi — gewoon een Nederlands bedrijf
              uit Utrecht. Ambachtelijk, eerlijk, nuchter.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Logo light mark style={{ width: 'clamp(160px, 22vw, 280px)', height: 'clamp(160px, 22vw, 280px)' }} />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--space-9) var(--gutter)' }}>
        <Eyebrow>Aan de borrel</Eyebrow>
        <h2 style={{ margin: '0.4rem 0 var(--space-6)', fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', fontSize: 'var(--fs-h2)', letterSpacing: '-0.01em' }}>Twee Sappie-serves</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
          {COCKTAILS.map((c) => (
            <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', border: '2px solid var(--olijf-zwart)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--warm-wit)' }}>
              <PhotoPlaceholder label={c.name} tone={c.tone} aspect="1 / 1" style={{ borderRight: '2px solid var(--olijf-zwart)', border: 'none' }} />
              <div style={{ padding: 'var(--space-5)' }}>
                <h3 style={{ margin: '0 0 0.4rem', fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', fontSize: '1.4rem', lineHeight: 1 }}>{c.name}</h3>
                <p style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--fs-small)', lineHeight: 1.5, color: 'var(--ink-80)' }}>{c.note}</p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {c.tags.map((t) => <Chip key={t} tone="paper">{t}</Chip>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--zand)', borderTop: '2px solid var(--olijf-zwart)', borderBottom: '2px solid var(--olijf-zwart)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--space-8) var(--gutter)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-5)' }}>
          {VALUES.map((v, i) => (
            <Card key={v.t} tone="paper" corner={['yellow', 'blue', 'green'][i]}>
              <h3 style={{ margin: '0 0 0.4rem', fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', fontSize: '1.2rem' }}>{v.t}</h3>
              <p style={{ margin: 0, fontSize: 'var(--fs-small)', lineHeight: 1.5, color: 'var(--ink-80)' }}>{v.d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--space-9) var(--gutter)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-5)' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', fontSize: 'var(--fs-h2)', letterSpacing: '-0.01em' }}>
          Tijd voor een <Highlight color="yellow">Sappie</Highlight>
        </h2>
        <Button variant="primary" size="lg" onClick={() => navigate('/bestellen')}>Bestel via het formulier</Button>
      </section>
    </main>
  );
}

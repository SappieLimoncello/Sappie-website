import React from 'react';

/**
 * Stand-in for a brand photo. The real assets (hero canal shot, cocktail
 * illustrations, packaging) are too large to fetch from the design system
 * (256KB cap there) — swap the background for a real <img> once supplied.
 * tone matches the photo-derived palette so the De Stijl blocks stay coherent.
 */
export function PhotoPlaceholder({ label, tone = 'blue', aspect = '4 / 3', style = {}, ...rest }) {
  const tones = {
    blue:  'var(--lucht-blauw)',
    green: 'var(--water-groen)',
    brick: 'var(--baksteen)',
    zand:  'var(--zand)',
  };
  return (
    <div
      role="img"
      aria-label={label || 'Sappie foto'}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        aspectRatio: aspect,
        width: '100%',
        background: tones[tone] || tones.blue,
        border: 'var(--line-weight) solid var(--line)',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {label && (
        <span style={{
          margin: 'var(--space-3)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-small)',
          fontWeight: 'var(--fw-semibold)',
          color: 'var(--olijf-zwart)',
          background: 'rgba(250, 244, 230, 0.75)',
          padding: '0.2rem 0.5rem',
        }}>{label}</span>
      )}
    </div>
  );
}

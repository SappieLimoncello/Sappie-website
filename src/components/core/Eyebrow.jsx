import React from 'react';

/**
 * Eyebrow — a small uppercase, letter-spaced label. Optional leading druppel
 * (the red drop from the logo) as a tiny brand tick.
 */
export function Eyebrow({ children, druppel = false, color = 'soft', as = 'p', style = {}, ...rest }) {
  const colors = {
    soft: 'var(--text-soft)',
    ink:  'var(--olijf-zwart)',
    green:'var(--olijfgroen)',
    light:'var(--warm-wit)',
  };
  const Tag = as;
  return (
    <Tag
      className="sappie-eyebrow"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        margin: 0,
        fontFamily: 'var(--font-body)', fontWeight: 'var(--fw-bold)',
        fontSize: 'var(--fs-eyebrow)', letterSpacing: 'var(--ls-eyebrow)',
        textTransform: 'uppercase', color: colors[color] || colors.soft,
        ...style,
      }}
      {...rest}
    >
      {druppel && (
        <span aria-hidden="true" style={{
          width: '0.5rem', height: '0.5rem', borderRadius: '0 50% 50% 50%',
          transform: 'rotate(45deg)', background: 'var(--utrecht-rood)', flex: '0 0 auto',
        }} />
      )}
      {children}
    </Tag>
  );
}

import React from 'react';

/**
 * Chip — a stamped proof-point, like the callouts on the label
 * ("Geen toevoegingen", "Handgeschilde citroenen"). Flat colour block,
 * dead-square corners, no border.
 * tone: paper | yellow | blue | green | red
 */
export function Chip({ children, tone = 'paper', ...rest }) {
  const tones = {
    paper:  { background: 'var(--zand)',        color: 'var(--olijf-zwart)' },
    yellow: { background: 'var(--citroengeel)', color: 'var(--olijf-zwart)' },
    blue:   { background: 'var(--lucht-blauw)', color: 'var(--olijf-zwart)' },
    green:  { background: 'var(--olijfgroen)',  color: 'var(--warm-wit)' },
    red:    { background: 'var(--utrecht-rood)', color: 'var(--warm-wit)' },
  };

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.34rem 0.7rem',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-semibold)',
    fontSize: 'var(--fs-small)',
    lineHeight: 1.1,
    border: 'none',
    borderRadius: 0,
    ...tones[tone],
  };

  return (
    <span className={`sappie-chip sappie-chip--${tone}`} style={style} {...rest}>
      {children}
    </span>
  );
}

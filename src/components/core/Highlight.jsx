import React from 'react';

/**
 * Highlight — the marker-swab behind a word, straight off the Sappie label.
 * A translucent swab of brand colour sits behind inline text.
 * colour: yellow | blue | green | red
 */
export function Highlight({ children, color = 'yellow', solid = false, ...rest }) {
  const swatches = {
    yellow: 'var(--citroengeel)',
    blue:   'var(--lucht-blauw)',
    green:  'var(--sappie-sage)',
    red:    'var(--utrecht-rood)',
  };
  const isRed = color === 'red';
  const bg = swatches[color] || swatches.yellow;

  const style = {
    background: solid || isRed ? bg : `color-mix(in srgb, ${bg} 62%, transparent)`,
    color: 'var(--olijf-zwart)',
    padding: '0.04em 0.28em',
    borderRadius: 'var(--radius-sm)',
    boxDecorationBreak: 'clone',
    WebkitBoxDecorationBreak: 'clone',
    fontWeight: 'var(--fw-semibold)',
  };
  if (isRed) style.color = 'var(--warm-wit)';

  return (
    <mark className={`sappie-highlight sappie-highlight--${color}`} style={style} {...rest}>
      {children}
    </mark>
  );
}

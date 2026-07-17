import React from 'react';

/**
 * Card — a flat framed paper panel. Square corners, 2px olive keyline.
 * tone: paper | creme | zand | green (dark)
 * A De Stijl corner block can be enabled with `corner`.
 */
export function Card({ children, tone = 'creme', corner = null, lift = false, style = {}, ...rest }) {
  const tones = {
    paper: { background: 'var(--warm-wit)', color: 'var(--olijf-zwart)' },
    creme: { background: 'var(--creme)', color: 'var(--olijf-zwart)' },
    zand:  { background: 'var(--zand)', color: 'var(--olijf-zwart)' },
    green: { background: 'var(--olijfgroen)', color: 'var(--warm-wit)' },
  };
  const cornerColor = {
    yellow: 'var(--citroengeel)', blue: 'var(--lucht-blauw)',
    green: 'var(--sappie-sage)', red: 'var(--utrecht-rood)',
  };

  const base = {
    position: 'relative',
    border: 'var(--line-weight) solid var(--line)',
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--space-6)',
    overflow: 'hidden',
    boxShadow: lift ? 'var(--shadow-md)' : 'none',
    transition: 'box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease)',
    ...tones[tone],
    ...style,
  };

  return (
    <div className={`sappie-card sappie-card--${tone}`} style={base} {...rest}>
      {corner && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, right: 0,
            width: '2.75rem', height: '2.75rem',
            background: cornerColor[corner] || cornerColor.yellow,
            borderLeft: 'var(--line-weight) solid var(--line)',
            borderBottom: 'var(--line-weight) solid var(--line)',
          }}
        />
      )}
      {children}
    </div>
  );
}

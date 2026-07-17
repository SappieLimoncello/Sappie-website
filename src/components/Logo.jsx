import React from 'react';

/**
 * CSS-drawn placeholder for the Sappie word-lock-up, used until the real
 * sappie-logo.png / sappie-mark.png assets are supplied (too large to fetch
 * from the design system, capped at 256KB there).
 */
export function Logo({ light = false, mark = false, style = {}, ...rest }) {
  const ink = light ? 'var(--warm-wit)' : 'var(--olijf-zwart)';

  if (mark) {
    return (
      <span
        aria-hidden="true"
        style={{
          display: 'inline-grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          width: '2rem',
          height: '2rem',
          border: `var(--line-weight) solid ${ink}`,
          flex: '0 0 auto',
          ...style,
        }}
        {...rest}
      >
        <span style={{ background: 'var(--citroengeel)' }} />
        <span style={{ background: 'var(--lucht-blauw)' }} />
        <span style={{ background: 'var(--sappie-sage)' }} />
        <span style={{ background: 'var(--utrecht-rood)' }} />
      </span>
    );
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--fw-black)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--ls-tight)',
        fontSize: '1.375rem',
        lineHeight: 1,
        color: ink,
        ...style,
      }}
      {...rest}
    >
      Sappie
    </span>
  );
}

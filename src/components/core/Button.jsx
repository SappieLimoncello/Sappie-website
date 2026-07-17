import React from 'react';

/**
 * Sappie Button — flat colour blocks, dead-square corners (no rounding),
 * uppercase display type, calm dim on hover.
 * Variants: primary (citroengeel), order (utrecht-rood), discover (lucht-blauw),
 * ghost (lined, no fill), link (underlined text).
 */

const FILLS = {
  primary:  { background: 'var(--citroengeel)', color: 'var(--olijf-zwart)' },
  order:    { background: 'var(--utrecht-rood)', color: 'var(--warm-wit)' },
  discover: { background: 'var(--lucht-blauw)', color: 'var(--olijf-zwart)' },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  full = false,
  disabled = false,
  tile = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  ...rest
}) {
  const isFilled = variant === 'primary' || variant === 'order' || variant === 'discover';

  if (tile) {
    const Tile = as;
    const tileStyle = {
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: full ? '100%' : '8.25rem',
      minHeight: '6rem',
      padding: '0.9rem',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-black)',
      fontSize: '1.0625rem',
      lineHeight: 0.95,
      letterSpacing: 'var(--ls-tight)',
      textTransform: 'uppercase',
      border: 'none',
      borderRadius: 0,
      textDecoration: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'filter var(--dur-fast) var(--ease)',
      ...(FILLS[variant] || FILLS.primary),
    };
    const arrowColor = variant === 'primary' ? 'var(--utrecht-rood)' : 'currentColor';
    return (
      <Tile
        className={`sappie-btn sappie-btn--tile sappie-btn--${variant}`}
        style={tileStyle}
        disabled={as === 'button' ? disabled : undefined}
        onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = 'brightness(0.96)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}
        {...rest}
      >
        <span style={{ maxWidth: '100%' }}>{children}</span>
        <span style={{ alignSelf: 'flex-end', fontSize: '1.2rem', lineHeight: 1, color: arrowColor }}>
          {iconRight || '→'}
        </span>
      </Tile>
    );
  }

  const sizes = {
    sm: { padding: '0.6rem 1.1rem',  fontSize: '0.78rem',  letterSpacing: '0.09em' },
    md: { padding: '0.85rem 1.45rem', fontSize: '0.875rem', letterSpacing: '0.07em' },
    lg: { padding: '1.05rem 1.85rem', fontSize: '1rem',     letterSpacing: '0.06em' },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: full ? 'space-between' : 'center',
    gap: '0.75rem',
    width: full ? '100%' : 'auto',
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--fw-bold)',
    textTransform: 'uppercase',
    lineHeight: 1,
    border: 'var(--line-weight) solid transparent',
    borderRadius: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'filter var(--dur-fast) var(--ease), background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)',
    textDecoration: 'none',
    ...sizes[size],
  };

  const variants = {
    ...FILLS,
    ghost: { background: 'transparent', color: 'var(--olijf-zwart)', borderColor: 'var(--line)' },
    link: {
      background: 'transparent', color: 'var(--olijf-zwart)', border: 'none',
      borderRadius: 0, padding: '0.3rem 0', borderBottom: 'var(--line-weight) solid var(--line)',
      textTransform: 'none', letterSpacing: '0.01em', fontWeight: 'var(--fw-semibold)',
      gap: '0.4rem',
    },
  };

  const Tag = as;
  return (
    <Tag
      className={`sappie-btn sappie-btn--${variant}`}
      style={{ ...base, ...variants[variant] }}
      disabled={as === 'button' ? disabled : undefined}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (isFilled) e.currentTarget.style.filter = 'brightness(0.95)';
        else if (variant === 'ghost') e.currentTarget.style.background = 'var(--creme)';
        const arr = e.currentTarget.querySelector('[data-arrow]');
        if (arr) arr.style.transform = 'translateX(3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'none';
        if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
        const arr = e.currentTarget.querySelector('[data-arrow]');
        if (arr) arr.style.transform = 'translateX(0)';
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight ? (
        <span data-arrow style={{ display: 'inline-flex', transition: 'transform var(--dur-fast) var(--ease)' }}>
          {iconRight}
        </span>
      ) : null}
    </Tag>
  );
}

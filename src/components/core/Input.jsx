import React from 'react';

/**
 * Input — a text field with an uppercase eyebrow label. 2px frame, square.
 */
export function Input({ label, hint, id, type = 'text', textarea = false, style = {}, ...rest }) {
  const fieldId = id || `sappie-input-${Math.random().toString(36).slice(2, 8)}`;

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-bold)',
    fontSize: 'var(--fs-eyebrow)',
    letterSpacing: 'var(--ls-eyebrow)',
    textTransform: 'uppercase',
    color: 'var(--text-soft)',
    marginBottom: 'var(--space-2)',
  };

  const fieldStyle = {
    width: '100%',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fs-body)',
    fontWeight: 'var(--fw-medium)',
    color: 'var(--olijf-zwart)',
    background: 'var(--warm-wit)',
    border: 'var(--line-weight) solid var(--line)',
    borderRadius: 'var(--radius-sm)',
    padding: '0.7rem 0.85rem',
    outline: 'none',
    resize: textarea ? 'vertical' : undefined,
    minHeight: textarea ? '6rem' : undefined,
    transition: 'box-shadow var(--dur-fast) var(--ease)',
    ...style,
  };

  const onFocus = (e) => { e.currentTarget.style.boxShadow = 'inset 0 0 0 2px var(--citroengeel)'; };
  const onBlur = (e) => { e.currentTarget.style.boxShadow = 'none'; };

  return (
    <div className="sappie-field">
      {label && <label htmlFor={fieldId} style={labelStyle}>{label}</label>}
      {textarea
        ? <textarea id={fieldId} style={fieldStyle} onFocus={onFocus} onBlur={onBlur} {...rest} />
        : <input id={fieldId} type={type} style={fieldStyle} onFocus={onFocus} onBlur={onBlur} {...rest} />}
      {hint && (
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--fs-small)', color: 'var(--text-soft)' }}>
          {hint}
        </p>
      )}
    </div>
  );
}

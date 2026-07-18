import { useState } from 'react';

const MARK_VARIANTS = ['', 'blue', 'green-light', 'green-dark'];

/** Random ph__mark modifier class, rolled once per mount (so every page load gets a fresh color). */
export function useRandomMark() {
  const [variant] = useState(() => MARK_VARIANTS[Math.floor(Math.random() * MARK_VARIANTS.length)]);
  return variant ? `ph__mark--${variant}` : '';
}

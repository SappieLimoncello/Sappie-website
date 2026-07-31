// Voorbeeldgegevens, alleen gebruikt door de lokale preview-server (`npm run email`).
// De echte Netlify Function geeft altijd een eigen `order`-object mee.
export const PREVIEW_ORDER = {
  cartItems: [
    { name: 'Klassiek Sappie', ml: '500ml', price: 18.50, qty: 2 },
    { name: 'Klein Sappie', ml: '100ml', price: 5.50, qty: 3 },
  ],
  subtotal: 2 * 18.50 + 3 * 5.50,
  btwRate: 0.21,
  form: {
    naam: 'Jan Jansen',
    email: 'jan@voorbeeldbedrijf.nl',
    telefoon: '06 12 34 56 90',
    bedrijf: 'Voorbeeldbedrijf B.V.',
    kvk: '12345678',
    btw: 'NL123456789B01',
    opmerkingen: 'Graag voor vrijdag leveren als dat kan.',
  },
};

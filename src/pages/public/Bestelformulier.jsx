import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown, Instagram, Menu, X } from 'lucide-react';
import { useRandomMark } from '../../hooks/useRandomMark';
import '../../styles/forms.css';

const productBottle = '/images/product-bottle.jpg';
const productBottleKlassiek = '/images/product-bottle-klassiek.jpg';
import iwsc93 from '../../assets/badges/iwsc-93.png';

const PRODUCTS = [
  {
    key: 'klein',
    variant: 'geel',
    name: 'Klein Sappie',
    ml: '100ml',
    text: 'De kleinste van onze flesjes, ideaal voor in cadeau- of kerstpakketten.',
    price: '5,50',
  },
  {
    key: 'klassiek',
    variant: 'blauw',
    name: 'Klassiek Sappie',
    ml: '500ml',
    text: 'Onze klassieke halve liter fles, zoals verkrijgbaar bij de winkels en slijterijen.',
    price: '18,50',
    badge: true,
    img: productBottleKlassiek,
  },
  {
    key: 'groot',
    variant: 'sage',
    name: 'Groot Sappie',
    ml: '1000ml',
    text: 'Een liter Sappie, voor jezelf of om uit te delen aan vrienden en familie.',
    price: '32,95',
  },
];

const navLinkClass = ({ isActive }) =>
  `nav__link${isActive ? ' nav__link--active' : ''}`;

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <div className="nav-float nav-float--sub">
      <nav className="nav">
        <NavLink to="/" className="nav__word" onClick={closeMenu}>Sappie Limoncello<span className="drop">.</span></NavLink>
        <div className="nav__right">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/productie" className={navLinkClass}>Productie</NavLink>
          <NavLink to="/winkels-en-restaurants" className={navLinkClass}>Verkooppunten</NavLink>
          <NavLink to="/reviews" className={navLinkClass}>Reviews</NavLink>
          <NavLink to="/welkom" className={navLinkClass}>Welkom</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          <button
            type="button"
            className="nav__burger"
            aria-label={menuOpen ? 'Sluit menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="nav__order">
            <button type="button" className="nav__bestellen">
              Bestellen <ChevronDown size={14} className="nav__order-chevron" />
            </button>
            <div className="nav__order-menu">
              <NavLink to="/bestellen" className="nav__order-link">Limoncello</NavLink>
              <NavLink to="/siroop-bestellen" className="nav__order-link">Siroop</NavLink>
            </div>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="nav__mobile">
          <NavLink to="/" end className="nav__mobile-link" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/productie" className="nav__mobile-link" onClick={closeMenu}>Productie</NavLink>
          <NavLink to="/winkels-en-restaurants" className="nav__mobile-link" onClick={closeMenu}>Verkooppunten</NavLink>
          <NavLink to="/reviews" className="nav__mobile-link" onClick={closeMenu}>Reviews</NavLink>
          <NavLink to="/welkom" className="nav__mobile-link" onClick={closeMenu}>Welkom</NavLink>
          <NavLink to="/siroop-bestellen" className="nav__mobile-link" onClick={closeMenu}>Siroop</NavLink>
          <NavLink to="/contact" className="nav__mobile-link" onClick={closeMenu}>Contact</NavLink>
          <NavLink to="/bestellen" className="nav__mobile-link nav__mobile-link--active" onClick={closeMenu}>Bestelformulier</NavLink>
        </div>
      )}
    </div>
  );
}

function PageHead() {
  const markColor = useRandomMark();
  return (
    <header className="ph ph--statement">
      <span className="ph__eyebrow">Bestelformulier</span>
      <h1 className="ph__title ph__title--big">
        Zakelijk <span className={`ph__mark ${markColor}`}>bestellen?</span> Dat kan direct bij ons!
      </h1>
      <p className="ph__body ph__body--medium">
        Als bedrijf kun je direct bij ons bestellen, kies hieronder je welke Sappies je graag wilt
        bestellen! We nemen daarna persoonlijk contact met je op om de bezorging met je af te stemmen.
        Ben je particulier, dan kun je terecht bij een van onze{' '}
        <Link to="/winkels-en-restaurants" className="ph__link">verkooppunten</Link>.
      </p>
    </header>
  );
}

const BTW_RATE = 0.21;

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value) {
  return /^\+?\d{9,13}$/.test(value.replace(/[\s-]/g, ''));
}

function isValidKvk(value) {
  return /^\d{8}$/.test(value.trim());
}

function parsePrice(price) {
  return parseFloat(price.replace(',', '.'));
}

function formatPrice(value) {
  return value.toFixed(2).replace('.', ',');
}

function ProductGrid({ qty, onChange }) {
  return (
    <div className="shop__grid">
      {PRODUCTS.map((p) => (
        <div key={p.key} className={`prod prod--${p.variant}`}>
          <div className="prod__photo">
            <img src={p.img || productBottle} alt={p.name} className="prod__img" />
            {p.badge && <img src={iwsc93} alt="IWSC 93 punten, iwsc.net 2026" className="prod__badge" />}
          </div>
          <div className={`prod__body prod__body--${p.variant}`}>
            <h3 className="prod__name">{p.name} <span className="prod__ml">- {p.ml}</span></h3>
            <p className="prod__text">{p.text}</p>
            <div className="prod__pricerow">
              <button
                type="button"
                className="qty__btn qty__btn--sm"
                onClick={() => onChange(p.key, -1)}
                disabled={qty[p.key] === 0}
                aria-label={`Minder ${p.name}`}
              >
                &minus;
              </button>
              <p className="prod__price">&euro;{p.price}</p>
              <button
                type="button"
                className="qty__btn qty__btn--sm"
                onClick={() => onChange(p.key, 1)}
                aria-label={`Meer ${p.name}`}
              >
                +
              </button>
            </div>
            <p className="prod__vat">(exclusief BTW)</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Kassabon({ qty, cartItems, subtotal, onContinue, showSubmit, canReview, onReview }) {
  const [label, setLabel] = useState('Verder met bestellen');
  const [fading, setFading] = useState(false);
  const holdRef = useRef(null);
  const fadeRef = useRef(null);

  const [reviewLabel, setReviewLabel] = useState('Laatste controle...');
  const [reviewInvalid, setReviewInvalid] = useState(false);
  const reviewHoldRef = useRef(null);

  useEffect(() => () => {
    clearTimeout(holdRef.current);
    clearTimeout(fadeRef.current);
    clearTimeout(reviewHoldRef.current);
  }, []);

  const handleContinue = () => {
    if (cartItems.length === 0) {
      clearTimeout(holdRef.current);
      clearTimeout(fadeRef.current);
      setLabel('Nog niks geselecteerd');
      setFading(false);
      holdRef.current = setTimeout(() => {
        setFading(true);
        fadeRef.current = setTimeout(() => {
          setLabel('Verder met bestellen');
          setFading(false);
        }, 220);
      }, 1800);
      return;
    }
    onContinue();
  };

  const handleReviewClick = () => {
    if (!canReview) {
      clearTimeout(reviewHoldRef.current);
      setReviewInvalid(true);
      setReviewLabel('Vul de laatste gegevens in');
      reviewHoldRef.current = setTimeout(() => {
        setReviewInvalid(false);
        setReviewLabel('Laatste controle...');
      }, 1800);
      return;
    }
    onReview();
  };

  return (
    <div className="cart-col">
      <aside className="cart">
        <h3 className="cart__title">Jouw kassabon</h3>
        {cartItems.length === 0 ? (
          <p className="cart__empty">Nog niets geselecteerd.</p>
        ) : (
          <ul className="cart__list">
            {cartItems.map((p) => (
              <li key={p.key} className="cart__item">
                <span className="cart__item-name">{qty[p.key]}&times; {p.name}</span>
                <span className="cart__item-price">&euro;{formatPrice(qty[p.key] * parsePrice(p.price))}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="reviewmodal__totals">
          <div className="reviewmodal__total-row">
            <span>Totaal excl. btw</span>
            <span>&euro;{formatPrice(subtotal)}</span>
          </div>
          <div className="reviewmodal__total-row reviewmodal__total-row--incl">
            <span>Totaal incl. btw</span>
            <span>&euro;{formatPrice(subtotal * (1 + BTW_RATE))}</span>
          </div>
        </div>
      </aside>
      {onContinue && (
        <button type="button" className="cart__cta" onClick={handleContinue}>
          <span className={`cart__cta-label${fading ? ' is-fading' : ''}`}>{label}</span>
        </button>
      )}
      {showSubmit && (
        <button
          type="button"
          className={`cart__cta${reviewInvalid ? ' cart__cta--invalid' : ''}`}
          onClick={handleReviewClick}
        >
          {reviewLabel}
        </button>
      )}
    </div>
  );
}

function ReviewModal({ open, onClose, qty, cartItems, subtotal, form, sendStatus, sendError }) {
  if (!open) return null;
  return (
    <div className="reviewmodal" role="dialog" aria-modal="true" aria-label="Laatste controle van je bestelling">
      <div className="reviewmodal__panel">
        <button type="button" className="reviewmodal__close" onClick={onClose} aria-label="Sluiten">
          <X size={22} />
        </button>
        <div className="reviewmodal__cart">
          <h3 className="reviewmodal__title">Jouw kassabon</h3>
          {cartItems.length === 0 ? (
            <p className="cart__empty">Nog niets geselecteerd.</p>
          ) : (
            <ul className="reviewmodal__list">
              {cartItems.map((p) => (
                <li key={p.key} className="reviewmodal__item">
                  <span className="cart__item-name">{qty[p.key]}&times; {p.name}</span>
                  <span className="cart__item-price">&euro;{formatPrice(qty[p.key] * parsePrice(p.price))}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="reviewmodal__totals">
            <div className="reviewmodal__total-row">
              <span>Totaal excl. btw</span>
              <span>&euro;{formatPrice(subtotal)}</span>
            </div>
            <div className="reviewmodal__total-row reviewmodal__total-row--incl">
              <span>Totaal incl. btw</span>
              <span>&euro;{formatPrice(subtotal * (1 + BTW_RATE))}</span>
            </div>
          </div>
          <button
            type="submit"
            className="reviewmodal__confirm"
            disabled={sendStatus === 'sending' || sendStatus === 'success'}
          >
            {sendStatus === 'sending' && 'Bezig met versturen…'}
            {sendStatus === 'success' && 'Bestelling verstuurd!'}
            {(sendStatus === 'idle' || sendStatus === 'error') && 'Bestelling versturen'}
          </button>
          {sendStatus === 'error' && <p className="reviewmodal__feedback reviewmodal__feedback--error">{sendError}</p>}
          {sendStatus === 'success' && (
            <p className="reviewmodal__feedback reviewmodal__feedback--success">
              We hebben je bestelling ontvangen en een bevestiging gestuurd naar {form.email}.
            </p>
          )}
        </div>
        <div className="reviewmodal__info">
          <h3 className="reviewmodal__info-title">Jouw gegevens</h3>
          <div className="cinfo cinfo--panel">
            <div className="cinfo__row">
              <div className="cinfo__block">
                <p className="cinfo__label">Naam</p>
                <p className="cinfo__text">{form.naam || '–'}</p>
              </div>
              <div className="cinfo__block">
                <p className="cinfo__label">E-mail</p>
                <p className="cinfo__text">{form.email || '–'}</p>
              </div>
            </div>
            <div className="cinfo__row">
              <div className="cinfo__block">
                <p className="cinfo__label">Telefoon</p>
                <p className="cinfo__text">{form.telefoon || '–'}</p>
              </div>
              <div className="cinfo__block">
                <p className="cinfo__label">Bedrijf</p>
                <p className="cinfo__text">{form.bedrijf || '–'}</p>
              </div>
            </div>
            <div className="cinfo__row">
              <div className="cinfo__block">
                <p className="cinfo__label">KVK-nummer</p>
                <p className="cinfo__text">{form.kvk || '–'}</p>
              </div>
              <div className="cinfo__block">
                <p className="cinfo__label">BTW-nummer</p>
                <p className="cinfo__text">{form.btw || '–'}</p>
              </div>
            </div>
            <div className="cinfo__block">
              <p className="cinfo__label">Opmerkingen</p>
              <p className="cinfo__text">{form.opmerkingen || '–'}</p>
            </div>
            <div className="cinfo__block">
              <p className="cinfo__label cinfo__label--rood">Levering</p>
              <p className="cinfo__text">We nemen binnen twee werkdagen persoonlijk contact met je op over de levering!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderFormFields({ values, onChange, errors, consent, onConsentChange }) {
  return (
    <div className="cform__grid">
      <label className="field">
        <span className="field__label">Voor- &amp; achternaam *</span>
        <input className="field__input" type="text" placeholder="Je voor- en achternaam" value={values.naam} onChange={(e) => onChange('naam', e.target.value)} />
      </label>
      <label className="field">
        <span className="field__label">E-mail *</span>
        <input className={`field__input${errors.email ? ' field__input--error' : ''}`} type="email" placeholder="jij@bedrijf.nl" value={values.email} onChange={(e) => onChange('email', e.target.value)} />
        {errors.email && <span className="field__error">{errors.email}</span>}
      </label>
      <label className="field">
        <span className="field__label">Telefoonnummer</span>
        <input className={`field__input${errors.telefoon ? ' field__input--error' : ''}`} type="tel" placeholder="06 12 34 56 90" value={values.telefoon} onChange={(e) => onChange('telefoon', e.target.value)} />
        {errors.telefoon && <span className="field__error">{errors.telefoon}</span>}
      </label>
      <label className="field">
        <span className="field__label">Bedrijfsnaam *</span>
        <input className="field__input" type="text" placeholder="Naam van je bedrijf" value={values.bedrijf} onChange={(e) => onChange('bedrijf', e.target.value)} />
      </label>
      <label className="field">
        <span className="field__label">KVK-nummer *</span>
        <input className={`field__input${errors.kvk ? ' field__input--error' : ''}`} type="text" placeholder="12345690" value={values.kvk} onChange={(e) => onChange('kvk', e.target.value)} />
        {errors.kvk && <span className="field__error">{errors.kvk}</span>}
      </label>
      <label className="field">
        <span className="field__label">BTW-nummer</span>
        <input className="field__input" type="text" placeholder="NL0000.00.000.B01" value={values.btw} onChange={(e) => onChange('btw', e.target.value)} />
      </label>
      <label className="field">
        <span className="field__label">Opmerkingen</span>
        <textarea className="field__input field__textarea" rows="4" placeholder="Wil je nog iets kwijt over je bestelling? Is het een cadeautje? Wil je het snel geleverd hebben?" value={values.opmerkingen} onChange={(e) => onChange('opmerkingen', e.target.value)}></textarea>
      </label>
      <div className="field cform__consent-group">
        <span className="field__label cform__consent-spacer" aria-hidden="true">&nbsp;</span>
        <label className="consent">
          <input type="checkbox" className="consent__box" checked={consent.terms} onChange={(e) => onConsentChange('terms', e.target.checked)} />
          <span className="consent__text">
            Ik ga akkoord met de{' '}
            <Link to="/algemene-voorwaarden" target="_blank" rel="noreferrer" className="consent__link" onClick={(e) => e.stopPropagation()}>algemene voorwaarden</Link>{' '}
            van Sappie Limoncello*
          </span>
        </label>
        <label className="consent">
          <input type="checkbox" className="consent__box" checked={consent.dataUse} onChange={(e) => onConsentChange('dataUse', e.target.checked)} />
          <span className="consent__text">
            Ik ga akkoord met het{' '}
            <Link to="/privacy-statement" target="_blank" rel="noreferrer" className="consent__link" onClick={(e) => e.stopPropagation()}>privacy statement</Link>*
          </span>
        </label>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="foot foot--home">
      <div className="foot__in">
        <div className="foot__brand">
          <p className="foot__word">Sappie Limoncello<span className="drop">.</span></p>
          <p className="foot__text foot__kvk">KVK 98649167<br className="foot__kvk-break" /><span className="foot__dot"> &bull; </span>BTW NL868584344B01</p>
          <div className="foot__legal">
            <Link to="/algemene-voorwaarden" className="foot__legal-link">Algemene voorwaarden</Link>
            <span className="foot__legal-sep">&bull;</span>
            <Link to="/privacy-statement" className="foot__legal-link">Privacy statement</Link>
          </div>
        </div>
        <div className="foot__col foot__col--contact">
          <p className="foot__col-title">Contact</p>
          <a href="mailto:info@sappie-limoncello.nl" className="foot__link">info@sappie-limoncello.nl</a>
          <a href="tel:+31657966718" className="foot__link">Jesse: 06 57 96 67 18</a>
          <a href="tel:+31619365416" className="foot__link">Oscar: 06 19 36 54 16</a>
        </div>
        <div className="foot__col foot__col--menu">
          <p className="foot__col-title">Menu</p>
          <Link to="/" className="foot__link">Home</Link>
          <Link to="/productie" className="foot__link">Productie</Link>
          <Link to="/winkels-en-restaurants" className="foot__link">Verkooppunten</Link>
          <Link to="/reviews" className="foot__link">Reviews</Link>
          <Link to="/contact" className="foot__link">Contact</Link>
        </div>
        <div className="foot__col foot__col--social">
          <div className="foot__social-wrap">
            <p className="foot__col-title">Volg ons</p>
            <a
              href="https://www.instagram.com/sappie_limoncello/"
              className="foot__social"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={44} strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Bestelformulier() {
  const [showForm, setShowForm] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [qty, setQty] = useState({ klein: 0, klassiek: 0, groot: 0 });
  const [form, setForm] = useState({
    naam: '', email: '', telefoon: '', bedrijf: '', kvk: '', btw: '', opmerkingen: '',
  });
  const [consent, setConsent] = useState({ terms: false, dataUse: false });
  const [sendStatus, setSendStatus] = useState('idle');
  const [sendError, setSendError] = useState('');

  const change = (key, delta) => {
    setQty((prev) => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
  };

  const updateConsent = (field, value) => {
    setConsent((prev) => ({ ...prev, [field]: value }));
  };

  const errors = {
    email: form.email.trim() && !isValidEmail(form.email) ? 'Vul een geldig e-mailadres in.' : '',
    telefoon: form.telefoon.trim() && !isValidPhone(form.telefoon) ? 'Vul een geldig telefoonnummer in.' : '',
    kvk: form.kvk.trim() && !isValidKvk(form.kvk) ? 'Een KVK-nummer bestaat uit 8 cijfers.' : '',
  };

  // TIJDELIJK: check uitgeschakeld om te testen. Origineel staat hieronder in commentaar.
  const canReview = true;
  // const canReview = Boolean(
  //   form.naam.trim() && form.email.trim() && form.bedrijf.trim() && form.kvk.trim()
  //   && consent.terms && consent.dataUse
  //   && !errors.email && !errors.telefoon && !errors.kvk
  // );

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const cartItems = PRODUCTS.filter((p) => qty[p.key] > 0);
  const subtotal = cartItems.reduce((sum, p) => sum + qty[p.key] * parsePrice(p.price), 0);

  const formSectionRef = useRef(null);
  useEffect(() => {
    if (showForm && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showForm]);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (sendStatus === 'sending' || sendStatus === 'success') return;
    setSendStatus('sending');
    setSendError('');
    try {
      const res = await fetch('/.netlify/functions/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qty, form }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Er ging iets mis bij het versturen.');
      setSendStatus('success');
    } catch (err) {
      setSendStatus('error');
      setSendError(err.message || 'Er ging iets mis bij het versturen.');
    }
  };

  return (
    <>
      <Nav />
      <PageHead />
      <form className="cform cform--contact" onSubmit={handleSubmitOrder}>
        <section className="shop shop--compact" ref={formSectionRef}>
          <div className="shop__row">
            <div className="shop__col">
              <ProductGrid qty={qty} onChange={change} />
              {showForm && (
                <div className="contact contact--tight contact--nested">
                  <div className="contact__form-wrap">
                    <OrderFormFields values={form} onChange={updateForm} errors={errors} consent={consent} onConsentChange={updateConsent} />
                  </div>
                </div>
              )}
            </div>
            <Kassabon
              qty={qty}
              cartItems={cartItems}
              subtotal={subtotal}
              onContinue={showForm ? undefined : () => setShowForm(true)}
              showSubmit={showForm}
              canReview={canReview}
              onReview={() => setShowReview(true)}
            />
          </div>
        </section>
        <ReviewModal
          open={showReview}
          onClose={() => setShowReview(false)}
          qty={qty}
          cartItems={cartItems}
          subtotal={subtotal}
          form={form}
          sendStatus={sendStatus}
          sendError={sendError}
        />
      </form>
      <SiteFooter />
    </>
  );
}

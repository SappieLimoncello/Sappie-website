import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import { useRandomMark } from '../../hooks/useRandomMark';
import '../../styles/siroop.css';

const PRIJS_PER_FLES = 8.99;

const navLinkClass = ({ isActive }) =>
  `nav__link${isActive ? ' nav__link--active' : ''}`;

function euro(bedrag) {
  return bedrag.toFixed(2).replace('.', ',');
}

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
          <NavLink to="/siroop-bestellen" className={navLinkClass}>Siroop</NavLink>
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
          <NavLink to="/bestellen" className="nav__bestellen">Bestellen</NavLink>
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
          <NavLink to="/bestellen" className="nav__mobile-link" onClick={closeMenu}>Bestelformulier</NavLink>
        </div>
      )}
    </div>
  );
}

function PageHead() {
  const markColor = useRandomMark();
  return (
    <header className="ph ph--statement">
      <span className="ph__eyebrow">Bestellen</span>
      <h1 className="ph__title ph__title--big">
        Hoeveel <span className={`ph__mark ${markColor}`}>siroop</span> wil je bestellen?
      </h1>
      <p className="ph__body ph__body--medium">
        Kies hieronder je aantal flessen. Je bestelling wordt persoonlijk door ons bevestigd
        voordat er iets verzonden wordt.
      </p>
    </header>
  );
}

function SiroopCard() {
  const [aantal, setAantal] = useState(1);
  const minder = () => setAantal((n) => Math.max(1, n - 1));
  const meer = () => setAantal((n) => Math.min(24, n + 1));
  const totaal = PRIJS_PER_FLES * aantal;

  return (
    <div className="siroop">
      <div className="siroop__card">
        <div className="siroop__info">
          <h2 className="siroop__title">Sappie Siroop</h2>
          <p className="siroop__desc">
            Eén fles maakt zeven liter frisse limonade van echte Utrechtse citroenen.
          </p>
          <p className="siroop__price">
            <span className="siroop__price-amount">&euro; {euro(PRIJS_PER_FLES)}</span>
            <span className="siroop__price-unit">per fles</span>
          </p>
          <div className="siroop__stepper" role="group" aria-label="Aantal flessen">
            <button type="button" className="siroop__step-btn" onClick={minder} aria-label="Minder">&minus;</button>
            <span className="siroop__qty">{aantal}</span>
            <button type="button" className="siroop__step-btn" onClick={meer} aria-label="Meer">+</button>
          </div>
          <button type="button" className="siroop__cart-btn">
            In mandje <span className="siroop__cart-dot">&middot;</span> &euro; {euro(totaal)}
          </button>
        </div>
        <div className="siroop__photo">
          <span className="siroop__photo-label">Foto siroopfles</span>
        </div>
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

export default function SiroopBestellen() {
  return (
    <>
      <Nav />
      <PageHead />
      <SiroopCard />
      <SiteFooter />
    </>
  );
}

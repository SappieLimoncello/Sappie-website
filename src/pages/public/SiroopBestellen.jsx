import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown, Instagram, Menu, X } from 'lucide-react';
import { useRandomMark } from '../../hooks/useRandomMark';
import '../../styles/siroop.css';

const siroopFles = '/images/siroop-fles.jpg';
const lekkerBootjeVaren = '/images/lekker-bootje-varen.png';

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

function SiroopCard({ aantal, onMinder, onMeer }) {
  return (
    <div className="siroop__prod">
      <div className="siroop__prod-photo">
        <img src={siroopFles} alt="Sappie Siroop" className="siroop__prod-img" />
      </div>
      <div className="siroop__prod-body">
        <h2 className="siroop__prod-name">Sappie Siroop <span className="siroop__prod-ml">- 700ml</span></h2>
        <p className="siroop__prod-text">
          Onze huisgemaakte limonadesiroop, gemaakt met het citroensap van onze Amalficitroenen.
        </p>
        <div className="siroop__prod-pricerow">
          <button type="button" className="siroop__prod-qtybtn" onClick={onMinder} disabled={aantal === 0} aria-label="Minder">&minus;</button>
          <p className="siroop__prod-price">&euro;{euro(PRIJS_PER_FLES)}</p>
          <button type="button" className="siroop__prod-qtybtn" onClick={onMeer} aria-label="Meer">+</button>
        </div>
      </div>
    </div>
  );
}

function SiroopInfo() {
  return (
    <div className="siroop__info">
      <h3 className="siroop__info-title">Belangrijk om te weten</h3>
      <ul className="siroop__info-list">
        <li>Let op! Sappie siroop bezorgen we niet thuis.</li>
        <li>
          Na bestellen krijg je een unieke afhaalcode. Hiermee kun je de siroop afhalen bij Lekkerbootjevaren
          (<a href="https://www.google.com/maps/search/?api=1&query=Wittevrouwensingel+95%2C+3514+AL+Utrecht" target="_blank" rel="noreferrer" className="siroop__info-link">Wittevrouwensingel 95, 3514 AL Utrecht</a>).
        </li>
        <li>Ophalen kan op maandag tussen xx:xx en xx:xx, en op woensdag tussen xx:xx en xx:xx.</li>
      </ul>
      <img src={lekkerBootjeVaren} alt="" className="siroop__info-boat" />
    </div>
  );
}

function SiroopKassabon({ aantal, totaal }) {
  return (
    <div className="siroop__cart-col">
      <aside className="siroop__cart">
        <h3 className="siroop__cart-title">Jouw kassabon</h3>
        {aantal === 0 ? (
          <p className="siroop__cart-empty">Nog niets geselecteerd.</p>
        ) : (
          <ul className="siroop__cart-list">
            <li className="siroop__cart-item">
              <span className="siroop__cart-item-name">{aantal}&times; Sappie Siroop</span>
              <span>&euro;{euro(totaal)}</span>
            </li>
          </ul>
        )}
        <div className="siroop__cart-subtotal">
          <span>Totaal excl. btw</span>
          <span>&euro;{euro(totaal)}</span>
        </div>
      </aside>
      <button type="button" className="siroop__cart-cta">Verder met bestellen</button>
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
  const [aantal, setAantal] = useState(0);
  const minder = () => setAantal((n) => Math.max(0, n - 1));
  const meer = () => setAantal((n) => Math.min(24, n + 1));
  const totaal = PRIJS_PER_FLES * aantal;

  return (
    <>
      <Nav />
      <PageHead />
      <div className="siroop">
        <div className="siroop__row">
          <SiroopCard aantal={aantal} onMinder={minder} onMeer={meer} />
          <SiroopInfo />
          <SiroopKassabon aantal={aantal} totaal={totaal} />
        </div>
      </div>
      <SiteFooter />
    </>
  );
}

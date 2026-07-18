import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import { useRandomMark } from '../../hooks/useRandomMark';
import oscarEnJesseFoto from '../../assets/photos/oscar-en-jesse.jpg';
import '../../styles/welkom.css';

const navLinkClass = ({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`;

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
          <NavLink to="/winkels-en-restaurants" className={navLinkClass}>Verkoop</NavLink>
          <NavLink to="/reviews" className={navLinkClass}>Reviews</NavLink>
          <div className="nav__item nav__item--menu">
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            <div className="nav__menu">
              <NavLink to="/bestellen" className="nav__menu-link">Bestelformulier</NavLink>
            </div>
          </div>
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
          <NavLink to="/winkels-en-restaurants" className="nav__mobile-link" onClick={closeMenu}>Verkoop</NavLink>
          <NavLink to="/reviews" className="nav__mobile-link" onClick={closeMenu}>Reviews</NavLink>
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
      <span className="ph__eyebrow">Welkom bij Sappie</span>
      <h1 className="ph__title ph__title--big">Hoe zorg je het beste voor jouw <span className={`ph__mark ${markColor}`}>Sappie?</span></h1>
      <p className="ph__body">
        Wij (Oscar &amp; Jesse) zijn superblij dat jij een Sappie hebt gekocht!
        Op deze pagina vind je alles wat bij jouw mooie flesje hoort.
      </p>
    </header>
  );
}

const TIPS = [
  { nr: '01', titel: 'Uit het licht', tekst: 'Houd je Sappie uit direct (zon)licht. Dat tast de kleur, geur en smaak aan.', bg: 'var(--sappie-sage)', fg: 'var(--warm-wit)' },
  { nr: '02', titel: 'Koel bewaren', tekst: 'Zet de fles bij voorkeur rechtop in de vriezer, of anders op een koele en donkere plek.', bg: 'var(--citroengeel)', fg: 'var(--olijf-zwart)' },
  { nr: '03', titel: 'IJskoud serveren', tekst: 'Het lekkerst bij -10 tot -5 °C, dus recht uit de vriezer in je glas.', bg: 'var(--lucht-blauw)', fg: 'var(--olijf-zwart)' },
];

function ZorgSectie() {
  return (
    <section className="wc-care">
      <p className="wc-care__lead">Je Sappie is binnen! Nu mag z&rsquo;n beschermjasje (de papieren wikkel) eraf. Maar let op:</p>
      <div className="wc-tips">
        {TIPS.map((t) => (
          <div key={t.nr} className="wc-tip" style={{ background: t.bg, color: t.fg }}>
            <span className="wc-tip__nr">{t.nr}</span>
            <div className="wc-tip__body">
              <p className="wc-tip__title">{t.titel}</p>
              <p className="wc-tip__text">{t.tekst}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Verhaal() {
  return (
    <section className="wc-story">
      <h2 className="wc-story__title">Wie heeft jouw <span className="hl-blauw">Sappie</span> gemaakt?</h2>
      <div className="wc-story__photo">
        <img src={oscarEnJesseFoto} alt="Oscar en Jesse van Sappie" className="wc-story__img" />
      </div>
      <div className="wc-story__text">
        <p>Elke fles Sappie wordt met de hand gemaakt door Oscar &amp; Jesse, hier in Utrecht. Wij schillen de citroenen, bottelen, labelen en bezorgen alles zelf.</p>
        <p>De basis is bewust simpel: <strong>Amalficitroenen, suiker, alcohol en water</strong>. Geen fabriek, geen tussenpersonen. Gewoon Sappie.</p>
      </div>
    </section>
  );
}

function ReviewCta() {
  return (
    <section className="wc-cta">
      <span className="eyebrow">Nog één ding</span>
      <h2 className="wc-cta__title">Vond je &rsquo;m <span className="hl-geel">lekker?</span></h2>
      <p className="wc-cta__lead">Vind jij jouw Sappie nou écht lekker? Dan waarderen wij het enorm als je voor ons een review achterlaat.</p>
      <a className="btn btn--order" href="https://g.page/r/CbZKNCG-3TEgEBE/review" target="_blank" rel="noreferrer">
        Review achterlaten <span className="arr">&rarr;</span>
      </a>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="foot foot--home">
      <div className="foot__in">
        <div className="foot__brand">
          <p className="foot__word">Sappie Limoncello<span className="drop">.</span></p>
          <p className="foot__text foot__kvk">KVK 98649167<br />BTW NL868584344B01</p>
        </div>
        <div className="foot__col">
          <p className="foot__col-title">Contact</p>
          <a href="mailto:info@sappie-limoncello.nl" className="foot__link">info@sappie-limoncello.nl</a>
          <a href="tel:+31657966718" className="foot__link">Jesse: 06 57 96 67 18</a>
          <a href="tel:+31619365416" className="foot__link">Oscar: 06 19 36 54 16</a>
        </div>
        <div className="foot__col">
          <p className="foot__col-title">Menu</p>
          <Link to="/" className="foot__link">Home</Link>
          <Link to="/productie" className="foot__link">Productie</Link>
          <Link to="/winkels-en-restaurants" className="foot__link">Verkoop</Link>
          <Link to="/reviews" className="foot__link">Reviews</Link>
          <Link to="/contact" className="foot__link">Contact</Link>
        </div>
        <div className="foot__col">
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
    </footer>
  );
}

export default function Welkom() {
  return (
    <>
      <Nav />
      <PageHead />
      <ZorgSectie />
      <Verhaal />
      <ReviewCta />
      <SiteFooter />
    </>
  );
}

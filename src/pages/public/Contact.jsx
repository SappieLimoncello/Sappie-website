import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import { useRandomMark } from '../../hooks/useRandomMark';
import '../../styles/forms.css';

const navLinkClass = ({ isActive }) =>
  `nav__link${isActive ? ' nav__link--active' : ''}`;

const CONTACT = {
  email: 'info@sappie-limoncello.nl',
  contacts: [
    { name: 'Jesse', tel: '06 57 96 67 18' },
    { name: 'Oscar', tel: '06 19 36 54 16' },
  ],
};

const FIELDS = [
  { id: 'naam', label: 'Naam', type: 'text', ph: 'Je naam' },
  { id: 'email', label: 'E-mail', type: 'email', ph: 'jij@voorbeeld.nl' },
  { id: 'onderwerp', label: 'Onderwerp', type: 'text', ph: 'Waar gaat het over?' },
];

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
      <span className="ph__eyebrow">Contact</span>
      <h1 className="ph__title ph__title--big">
        Welke vraag heb je aan <span className={`ph__mark ${markColor}`}>Jesse &amp; Oscar?</span>
      </h1>
      <p className="ph__body">
        Een vraag over een bestelling, een samenwerking of gewoon een goed idee?
        We lezen alles zelf en reageren meestal binnen drie werkdagen.
      </p>
    </header>
  );
}

function ContactForm() {
  return (
    <form className="cform" onSubmit={(e) => e.preventDefault()}>
      <div className="cform__grid">
        {FIELDS.map((f) => (
          <label key={f.id} className={`field ${f.id === 'onderwerp' ? 'field--full' : ''}`}>
            <span className="field__label">{f.label}</span>
            <input className="field__input" type={f.type} placeholder={f.ph} />
          </label>
        ))}
        <label className="field field--full">
          <span className="field__label">Bericht</span>
          <textarea className="field__input field__textarea" rows="5" placeholder="Je vraag of bericht..."></textarea>
        </label>
        <label className="consent field--full">
          <input type="checkbox" className="consent__box" />
          <span className="consent__text">Ik ga akkoord met het gebruik van mijn persoonsgegevens volgens de algemene voorwaarden.</span>
        </label>
      </div>
      <button type="submit" className="cform__submit">Verstuur bericht</button>
      <p className="cform__note">We gebruiken je gegevens alleen om te reageren.</p>
    </form>
  );
}

function ContactInfo() {
  return (
    <div className="cinfo cinfo--panel">
      <div className="cinfo__block">
        <p className="cinfo__label">Mail</p>
        <a href={`mailto:${CONTACT.email}`} className="cinfo__link">{CONTACT.email}</a>
      </div>
      <div className="cinfo__block">
        <p className="cinfo__label">Bel</p>
        {CONTACT.contacts.map((c) => (
          <a key={c.name} href={`tel:${c.tel.replace(/\s/g, '')}`} className="cinfo__link cinfo__tel">
            <span className="cinfo__tel-name">{c.name}</span>{c.tel}
          </a>
        ))}
      </div>
      <div className="cinfo__block">
        <p className="cinfo__label">Snel regelen</p>
        <Link to="/bestellen" className="cinfo__link">Bestelformulier</Link>
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

export default function Contact() {
  return (
    <>
      <Nav />
      <PageHead />
      <div className="contact contact--split">
        <div className="contact__form-wrap">
          <ContactForm />
        </div>
        <aside className="contact__aside">
          <h2 className="contact__aside-title">Liever direct contact?</h2>
          <ContactInfo />
        </aside>
      </div>
      <SiteFooter />
    </>
  );
}

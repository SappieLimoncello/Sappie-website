import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
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
              <NavLink to="/bestellen" className="nav__menu-link nav__menu-link--active">Bestelformulier</NavLink>
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
          <NavLink to="/bestellen" className="nav__mobile-link nav__mobile-link--active" onClick={closeMenu}>Bestelformulier</NavLink>
        </div>
      )}
    </div>
  );
}

function PageHead() {
  return (
    <header className="ph ph--statement">
      <span className="ph__eyebrow">Bestelformulier</span>
      <h1 className="ph__title ph__title--big">
        Hoeveel <span className="ph__mark ph__mark--blue">Sappies</span> mogen we bij je langsbrengen?
      </h1>
      <p className="ph__body">
        Vul hieronder je bestelling in. We nemen daarna persoonlijk contact met je op
        om de bezorging met je af te stemmen.
      </p>
    </header>
  );
}

function OrderForm() {
  return (
    <form className="cform" onSubmit={(e) => e.preventDefault()}>
      <div className="cform__grid">
        <label className="field field--full">
          <span className="field__label">Voor- &amp; achternaam *</span>
          <input className="field__input" type="text" placeholder="Je voor- en achternaam" />
        </label>
        <label className="field">
          <span className="field__label">E-mail *</span>
          <input className="field__input" type="email" placeholder="jij@bedrijf.nl" />
        </label>
        <label className="field">
          <span className="field__label">Telefoonnummer</span>
          <input className="field__input" type="tel" placeholder="06 12 34 56 78" />
        </label>
        <label className="field">
          <span className="field__label">Bedrijfsnaam *</span>
          <input className="field__input" type="text" placeholder="Naam van je bedrijf" />
        </label>
        <label className="field">
          <span className="field__label">KVK-nummer *</span>
          <input className="field__input" type="text" placeholder="12345678" />
        </label>
        <label className="field">
          <span className="field__label">BTW-nummer</span>
          <input className="field__input" type="text" placeholder="NL0000.00.000.B01" />
        </label>
        <label className="field field--full">
          <span className="field__label">Bestelling *</span>
          <textarea className="field__input field__textarea" rows="4" placeholder="Welke producten en welk aantal wil je bestellen?"></textarea>
        </label>
        <label className="consent field--full">
          <input type="checkbox" className="consent__box" />
          <span className="consent__text">Ik ga akkoord met de algemene voorwaarden van Sappie Limoncello. *</span>
        </label>
        <label className="consent field--full">
          <input type="checkbox" className="consent__box" />
          <span className="consent__text">Ik ga ermee akkoord dat deze gegevens worden opgeslagen en verwerkt om contact met mij op te nemen. Ik kan mijn toestemming op elk moment intrekken. *</span>
        </label>
      </div>
      <button type="submit" className="cform__submit">Bestelling bevestigen</button>
      <p className="cform__note">* Verplichte velden. Je zit nog nergens aan vast, we bevestigen alles eerst persoonlijk.</p>
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
        <p className="cinfo__label">Levering</p>
        <p className="cinfo__text">Bezorging in overleg.</p>
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

export default function Bestelformulier() {
  return (
    <>
      <Nav />
      <PageHead />
      <div className="contact contact--split">
        <div className="contact__form-wrap">
          <OrderForm />
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

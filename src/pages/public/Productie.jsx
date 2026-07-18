import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import { useRandomMark } from '../../hooks/useRandomMark';
import '../../styles/productie.css';

const navLinkClass = ({ isActive }) =>
  `nav__link${isActive ? ' nav__link--active' : ''}`;

const SECTIONS = [
  {
    id: 'ingredienten', num: '01', eyebrow: 'Stap 1', title: 'Ingrediënten',
    accent: 'sappie-sage', dark: true,
    body: ['Basis zijn biologische Amalfi citroenen uit Zuid-Italië. Goede citroenen zijn essentieel: de dikke, aromatische schil bevat de oliën die de volle, zachte en bloemige smaak geven. Slechte schil betekent een vlakke limoncello.'],
    photo: 'citroenen in de hand',
  },
  {
    id: 'schillen', num: '02', eyebrow: 'Stap 2', title: 'Schillen',
    accent: 'lucht-blauw', dark: false,
    body: ['Alleen de schil van de citroen wordt gebruikt, met de hand geschild. Het vruchtvlees blijft achter voor iets anders, zoals de limonadesiroop.'],
    photo: 'met de hand schillen',
  },
  {
    id: 'maceratie', num: '03', eyebrow: 'Stap 3', title: 'Maceratie en filtratie',
    accent: 'citroengeel', dark: false,
    body: ['De schillen gaan in een bad van pure alcohol en trekken daar wekenlang in. Zo geven ze hun geur, kleur en smaak af. Daarna wordt alles gezeefd, zodat een heldere basis overblijft zonder schilresten.'],
    photo: 'maceratie / zeven',
  },
  {
    id: 'mengen', num: '04', eyebrow: 'Stap 4', title: 'Mengen',
    accent: 'sappie-sage', dark: true,
    body: ['De gefilterde drank wordt gemengd met suiker en water tot de juiste balans in zoetheid en sterkte.'],
    photo: 'mengen: suiker & water',
  },
  {
    id: 'bottelen', num: '05', eyebrow: 'Stap 5', title: 'Bottelen en etiketteren',
    accent: 'lucht-blauw', dark: false,
    body: ['De flessen worden één voor één met de hand gevuld en de etiketten worden met de hand geplakt. Zo blijft elke fles persoonlijk.'],
    photo: 'bottelen & etiketteren',
  },
  {
    id: 'kwaliteit', num: '06', eyebrow: 'Stap 6', title: 'Kwaliteitscontrole',
    accent: 'citroengeel', dark: false,
    body: ['Elke batch wordt gecontroleerd op kleur, geur en smaak, zodat alle flessen dezelfde kwaliteit hebben.'],
    photo: 'kwaliteitscontrole',
  },
];

function Photo({ data, className }) {
  return (
    <div className={`prodphoto ${className || ''}`}>
      <div style={{
        width: '100%', height: '100%', minHeight: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: "'Courier New', monospace", fontSize: '0.75rem',
          color: 'rgba(58,62,44,0.35)', textTransform: 'uppercase', letterSpacing: '0.12em',
        }}>
          {data.photo}
        </span>
      </div>
    </div>
  );
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
      <span className="ph__eyebrow">Productie</span>
      <h1 className="ph__title ph__title--big">Hoe wordt <span className={`ph__mark ${markColor}`}>Sappie</span> gemaakt?</h1>
      <p className="ph__body">
        Onze ambachtelijke limoncello wordt gewoon hier in Utrecht geproduceerd.
        Ons Sappie is een handgemaakt product, zonder poespas. Gewoon, goed, Sappie!
        Hieronder vind je een uitleg over onze ingredi&euml;nten, ons productieproces en meer.
      </p>
    </header>
  );
}

function LayoutTimeline() {
  return (
    <ol className="prodtl prodtl--zigzag">
      {SECTIONS.map((s, i) => (
        <li
          key={s.id}
          className={`tlstep ${s.dark ? 'is-dark' : ''} ${i % 2 ? 'is-odd' : 'is-even'}`}
          style={{ '--acc': `var(--${s.accent})` }}
        >
          <div className="tlstep__marker">
            <span className="tlstep__num">{s.num}</span>
          </div>
          <div className="tlstep__card">
            <div className="tlstep__head">
              <span className="tlstep__headnum">{s.num}</span>
              <div className="tlstep__headtext">
                <p className="tlstep__eyebrow">{s.eyebrow}</p>
                <h2 className="tlstep__title">{s.title}</h2>
              </div>
            </div>
            <div className="tlstep__media">
              <Photo data={s} className="tlstep__photo" />
            </div>
            <div className="tlstep__body">
              {s.body.map((p, j) => <p key={j} className="tlstep__p">{p}</p>)}
            </div>
          </div>
        </li>
      ))}
    </ol>
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

export default function Productie() {
  return (
    <>
      <Nav />
      <PageHead />
      <LayoutTimeline />
      <SiteFooter />
    </>
  );
}

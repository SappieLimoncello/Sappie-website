import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import '../../styles/winkels.css';

const navLinkClass = ({ isActive }) =>
  `nav__link${isActive ? ' nav__link--active' : ''}`;

const DAY_ORDER = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
const DAY_LABELS = {
  ma: 'Maandag', di: 'Dinsdag', wo: 'Woensdag', do: 'Donderdag',
  vr: 'Vrijdag', za: 'Zaterdag', zo: 'Zondag',
};
// Date.getDay(): 0 = zondag ... 6 = zaterdag
const JS_DAY_TO_KEY = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];

const LOCATIONS = [
  {
    id: 'una-ibb', category: 'slijterij', name: 'Una Más IBB hof',
    addr: 'Ina Boudier-Bakkerhof 68, 3582 VX Utrecht', tel: '030 259 94 48',
    hours: { ma: ['13:00', '20:00'], di: ['10:00', '20:00'], wo: ['10:00', '20:00'], do: ['10:00', '20:00'], vr: ['10:00', '20:00'], za: ['09:00', '20:00'], zo: ['13:00', '18:00'] },
    x: 44, y: 20,
  },
  {
    id: 'una-draaiweg', category: 'slijterij', name: 'Una Más Draaiweg',
    addr: 'Draaiweg 65, 3514 CN Utrecht', tel: '030 271 82 11',
    hours: { ma: ['13:00', '20:00'], di: ['10:00', '20:00'], wo: ['10:00', '20:00'], do: ['10:00', '20:00'], vr: ['10:00', '20:00'], za: ['09:00', '20:00'], zo: ['13:00', '18:00'] },
    x: 63, y: 45,
  },
  {
    id: 'una-terwijde', category: 'slijterij', name: 'Una Más Terwijde',
    addr: 'Ella Fitzgeraldplein 16, 3543 EP Utrecht', tel: '030 303 20 07',
    hours: { ma: ['13:00', '18:00'], di: ['10:00', '18:00'], wo: ['10:00', '18:00'], do: ['10:00', '18:00'], vr: ['09:00', '20:00'], za: ['09:00', '18:00'], zo: null },
    x: 13, y: 55,
  },
  {
    id: 'una-rokade', category: 'slijterij', name: 'Una Más Rokade',
    addr: 'Doornburglaan 7, 3554 GK Utrecht', tel: '030 244 78 38',
    hours: { ma: ['13:00', '18:00'], di: ['10:00', '18:00'], wo: ['10:00', '18:00'], do: ['10:00', '18:00'], vr: ['10:00', '19:00'], za: ['09:00', '18:00'], zo: null },
    x: 30, y: 78,
  },
  {
    id: 'una-handel', category: 'slijterij', name: 'Una Más Händelstraat',
    addr: 'Händelstraat 102, 3533 GM Utrecht', tel: '030 294 33 70',
    hours: { ma: ['13:00', '18:00'], di: ['10:00', '18:00'], wo: ['10:00', '18:00'], do: ['10:00', '19:00'], vr: ['10:00', '19:00'], za: ['09:00', '18:00'], zo: null },
    x: 21, y: 66,
  },
  {
    id: 'una-muntplein', category: 'slijterij', name: 'Una Más Muntplein',
    addr: 'Muntplein 35, 3437 AW Nieuwegein', tel: '030 603 74 19',
    hours: { ma: ['13:00', '18:00'], di: ['09:00', '18:00'], wo: ['09:00', '18:00'], do: ['09:00', '18:00'], vr: ['09:00', '20:00'], za: ['09:00', '17:00'], zo: null },
    x: 62, y: 93,
  },
  {
    id: 'una-cs', category: 'slijterij', name: 'Una Más CS',
    addr: 'Stationspassage 3, 3511 ED Utrecht', tel: '030 307 84 45',
    hours: { ma: ['11:00', '19:00'], di: ['11:00', '19:00'], wo: ['11:00', '19:00'], do: ['11:00', '19:00'], vr: ['11:00', '19:00'], za: ['11:00', '19:00'], zo: null },
    x: 50, y: 52,
  },
  {
    id: 'besselings-booze', category: 'slijterij', name: "Besselings' Booze",
    addr: 'Damstraat 43, 3531 BS Utrecht', tel: '030 785 97 25',
    hours: { ma: null, di: ['11:00', '19:00'], wo: ['11:00', '19:00'], do: ['11:00', '19:00'], vr: ['11:00', '19:00'], za: ['11:00', '18:00'], zo: null },
    x: 38, y: 60,
  },
  {
    id: 'biltstraat', category: 'slijterij', name: 'Biltstraat Wijn & Whisky',
    addr: 'Biltstraat 36, 3572 BC Utrecht', tel: '030 233 34 23',
    hours: { ma: ['12:00', '18:00'], di: ['10:00', '18:00'], wo: ['10:00', '18:00'], do: ['10:00', '20:00'], vr: ['10:00', '20:00'], za: ['10:00', '18:00'], zo: ['12:00', '18:00'] },
    x: 58, y: 38,
  },
  {
    id: 'hygge', category: 'restaurant', name: 'Hygge Utrecht',
    addr: 'Goeman Borgesiuslaan 77, 3515 ET Utrecht', tel: '030 755 15 50',
    hours: { ma: null, di: ['10:30', '22:00'], wo: ['10:30', '22:00'], do: ['10:30', '22:00'], vr: ['10:30', '23:00'], za: ['10:30', '23:00'], zo: ['10:30', '22:00'] },
    x: 52, y: 30,
  },
];

function toMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function getOpenStatus(hours) {
  const now = new Date();
  const todayKey = JS_DAY_TO_KEY[now.getDay()];
  const range = hours[todayKey];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  if (range) {
    const [start, end] = range;
    if (nowMinutes >= toMinutes(start) && nowMinutes < toMinutes(end)) {
      return { isOpen: true, text: `Nu open · sluit om ${end}`, todayKey };
    }
    if (nowMinutes < toMinutes(start)) {
      return { isOpen: false, text: `Nu gesloten · opent om ${start}`, todayKey };
    }
  }
  return { isOpen: false, text: 'Nu gesloten', todayKey };
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
  return (
    <header className="ph ph--statement">
      <span className="ph__eyebrow">Verkooppunten</span>
      <h1 className="ph__title ph__title--big">Waar vind je ons <span className="ph__mark">sappie?</span></h1>
      <p className="ph__body">
        Onze limoncello is verkrijgbaar bij winkels, slijterijen en caf&eacute;s in en rondom Utrecht.
        Hieronder staan alle plekken op de kaart. Ben je een bedrijf? Bestel dan rechtstreeks bij
        ons via het bestelformulier.
      </p>
    </header>
  );
}

function MapPanel({ activeId, setActiveId }) {
  return (
    <div className="locator__map" style={{ background: 'var(--creme)' }}>
      <div className="mapgrid"></div>
      <div className="mapriver"></div>
      <div className="mapriver--b"></div>
      <div className="locator__legend">
        <span className="legend__item"><span className="legend__dot" style={{ background: 'var(--citroengeel)' }}></span>Slijterijen</span>
        <span className="legend__item"><span className="legend__dot" style={{ background: 'var(--lucht-blauw)' }}></span>Restaurants</span>
      </div>
      {LOCATIONS.map((loc) => (
        <div
          key={loc.id}
          className={`pin pin--${loc.category} ${activeId === loc.id ? 'pin--active' : ''}`}
          style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          onMouseEnter={() => setActiveId(loc.id)}
          onMouseLeave={() => setActiveId(null)}
        >
          <span className="pin__dot">{loc.category === 'slijterij' ? 'S' : 'R'}</span>
          <span className="pin__stem"></span>
        </div>
      ))}
      <p className="mapnote">Illustratieve stijlkaart &mdash; vervangen door<br />Google Maps / Mapbox in productie</p>
    </div>
  );
}

function LocationList({ activeId, setActiveId, expandedId, setExpandedId }) {
  const groups = [
    { label: 'Slijterijen', items: LOCATIONS.filter((l) => l.category === 'slijterij') },
    { label: 'Restaurants', items: LOCATIONS.filter((l) => l.category === 'restaurant') },
  ];

  return (
    <div className="locator__list">
      {groups.map((g) => (
        <React.Fragment key={g.label}>
          <p className="list__group-title">{g.label}</p>
          {g.items.map((loc) => {
            const open = expandedId === loc.id;
            const status = open ? getOpenStatus(loc.hours) : null;
            return (
              <div
                key={loc.id}
                className={`list__item ${activeId === loc.id ? 'list__item--active' : ''} ${open ? 'list__item--open' : ''}`}
                onMouseEnter={() => setActiveId(loc.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => setExpandedId(open ? null : loc.id)}
              >
                <span className={`list__dot list__dot--${loc.category}`}></span>
                <div className="list__body">
                  <p className="list__name">{loc.name}<span className="list__chev" aria-hidden="true">{open ? '–' : '+'}</span></p>
                  <p className="list__addr">{loc.addr}</p>
                  <p className="list__tel">{loc.tel}</p>
                  {open && (
                    <div className="list__detail">
                      <p className={`list__status ${status.isOpen ? 'list__status--open' : 'list__status--closed'}`}>
                        {status.text}
                      </p>
                      <ul className="list__hours">
                        {DAY_ORDER.map((key) => (
                          <li key={key} className={key === status.todayKey ? 'is-today' : ''}>
                            <span className="list__hours-day">{DAY_LABELS[key]}</span>
                            <span className="list__hours-range">
                              {loc.hours[key] ? `${loc.hours[key][0]}–${loc.hours[key][1]}` : 'Gesloten'}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="list__actions">
                        <a href={`https://maps.google.com/?q=${encodeURIComponent(loc.addr)}`} className="list__btn" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>Route</a>
                        <a href={`tel:${loc.tel.replace(/\s/g, '')}`} className="list__btn list__btn--ghost" onClick={(e) => e.stopPropagation()}>Bel</a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </React.Fragment>
      ))}
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

export default function WinkelsEnRestaurants() {
  const [activeId, setActiveId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  return (
    <>
      <Nav />
      <PageHead />
      <div className="locator locator--split">
        <MapPanel activeId={activeId} setActiveId={setActiveId} />
        <LocationList
          activeId={activeId}
          setActiveId={setActiveId}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
        />
      </div>
      <SiteFooter />
    </>
  );
}

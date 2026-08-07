import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const navLinkClass = ({ isActive }) =>
  `nav__link${isActive ? ' nav__link--active' : ''}`;
const mobileLinkClass = ({ isActive }) =>
  `nav__mobile-link${isActive ? ' nav__mobile-link--active' : ''}`;

// Welkom staat bewust niet in dit menu: die pagina is alleen bereikbaar via
// een directe link, niet via de site-brede navigatie.
const LINKS = [
  { to: '/', end: true, label: 'Home' },
  { to: '/productie', label: 'Productie' },
  { to: '/winkels-en-restaurants', label: 'Verkooppunten' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
];

export function SiteNav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const variant = pathname === '/' ? 'home' : 'sub';

  return (
    <div className={`nav-float nav-float--${variant}`}>
      <nav className="nav">
        <NavLink to="/" className="nav__word" onClick={closeMenu}>Sappie Limoncello<span className="drop">.</span></NavLink>
        <div className="nav__right">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClass}>{link.label}</NavLink>
          ))}
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
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={mobileLinkClass} onClick={closeMenu}>{link.label}</NavLink>
          ))}
          <NavLink to="/siroop-bestellen" className={mobileLinkClass} onClick={closeMenu}>Siroop</NavLink>
          <NavLink to="/bestellen" className={mobileLinkClass} onClick={closeMenu}>Bestelformulier</NavLink>
        </div>
      )}
    </div>
  );
}

export default SiteNav;

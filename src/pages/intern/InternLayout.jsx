import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../../styles/public.css';
import '../../styles/intern.css';

const navLinkClass = ({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`;

export default function InternLayout() {
  return (
    <>
      <div className="nav-float">
        <nav className="nav">
          <NavLink to="/intern/overzicht" className="nav__word">Sappie Limoncello<span className="drop">.</span></NavLink>
          <div className="nav__right">
            <NavLink to="/intern/overzicht" className={navLinkClass}>Overzicht</NavLink>
            <NavLink to="/intern/taken" className={navLinkClass}>Taken</NavLink>
            <NavLink to="/intern/potentiele-klanten" className={navLinkClass}>Prospects</NavLink>
            <NavLink to="/intern/verkoop-per-relatie" className={navLinkClass}>Verkoop</NavLink>
          </div>
        </nav>
      </div>
      <Outlet />
      <SiteFooter />
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="foot">
      <div className="foot__in">
        <div className="foot__brand">
          <p className="foot__word">Sappie Limoncello<span className="drop">.</span></p>
          <p className="foot__text foot__kvk">KVK 12345678<br />BTW NL0012.34.567.B01</p>
        </div>
        <div className="foot__col">
          <p className="foot__col-title">Contact</p>
          <a href="mailto:hallo@sappie.nl" className="foot__link">hallo@sappie.nl</a>
          <a href="tel:+31307370000" className="foot__link">030 737 00 00</a>
        </div>
        <div className="foot__col">
          <p className="foot__col-title">Menu</p>
          <NavLink to="/intern/overzicht" className="foot__link">Overzicht</NavLink>
          <NavLink to="/intern/taken" className="foot__link">Taken</NavLink>
          <NavLink to="/intern/potentiele-klanten" className="foot__link">Prospects</NavLink>
          <NavLink to="/intern/verkoop-per-relatie" className="foot__link">Verkoop</NavLink>
        </div>
      </div>
    </footer>
  );
}

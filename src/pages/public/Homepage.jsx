import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import '../../styles/homepage.css';

const heroImg = '/images/hero-gracht.jpg';
const beeldmerk9 = '/images/beeldmerk-9.png';
const beeldmerk8 = '/images/beeldmerk-8.png';
const productBottle = '/images/product-bottle.jpg';

const HEADLINES = [
  [{ text: 'Jochie' }, { text: 'Wijfie' }, { text: 'Sappie', dot: true }],
  [{ text: 'Gewoon' }, { text: 'Goed' }, { text: 'Sappie', dot: true }],
  [{ text: 'Sappie' }, { text: 'Doen', accentMark: '?' }],
  [{ text: 'Geen' }, { text: 'Gedoe' }, { text: 'Gewoon' }, { text: 'Sappie', dot: true }],
];
const HEADLINE_INTERVAL = 4000;

const navLinkClass = ({ isActive }) =>
  `nav__link${isActive ? ' nav__link--active' : ''}`;

function Nav() {
  return (
    <div className="nav-float nav-float--home">
      <nav className="nav">
        <NavLink to="/" className="nav__word">Sappie Limoncello<span className="drop">.</span></NavLink>
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
          <NavLink to="/bestellen" className="nav__bestellen">Bestellen</NavLink>
        </div>
      </nav>
    </div>
  );
}

function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((i) => (i + 1) % HEADLINES.length);
    }, HEADLINE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const lines = HEADLINES[headlineIndex];

  return (
    <section className="hero">
      <img
        className="hero__img"
        src={heroImg}
        alt="Utrechtse gracht met de Dom op de achtergrond"
      />
      <div className="hero__overlay">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__headline" key={headlineIndex}>
              {lines.map((line, i) => (
                <React.Fragment key={i}>
                  {line.text}
                  {line.dot && <span style={{ color: 'var(--citroengeel)' }}>.</span>}
                  {line.accentMark && (
                    <span className="qmark">
                      {line.accentMark}
                      <span className="qmark__dot" aria-hidden="true">.</span>
                    </span>
                  )}
                  {i < lines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
          </div>
          <div className="tiles">
            <Link to="/winkels-en-restaurants" className="tile tile--mark tile--mark-geel">
              <img src={beeldmerk9} alt="" className="tile__bg" />
              <span className="tile__text">Koop<br />hier</span>
              <span className="arr">&rarr;</span>
            </Link>
            <Link to="/productie" className="tile tile--mark tile--mark-blauw">
              <img src={beeldmerk8} alt="" className="tile__bg" />
              <span className="tile__text">Ontdek</span>
              <span className="arr">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Waterline() {
  return (
    <div className="waterline" aria-hidden="true">
      <i className="a"></i>
      <i className="b"></i>
      <i className="c"></i>
      <i className="d"></i>
      <i className="e"></i>
    </div>
  );
}

function VariantWerf() {
  return (
    <>
      <section className="intro">
        <h2 className="intro__title">De beste van <span className="hl-red">Utereg</span> en omstreken.</h2>
        <p className="intro__body">
          In 2026 behaalde Sappie maar liefst 93/100 punten bij de International
          Wine &amp; Spirit Competition. Hiermee zijn we niet alleen de beste van
          Utrecht en omstreken, maar de twee na beste van Nederland!
        </p>
      </section>

      <div className="stack">
        <div className="panel panel--sage">
          <span className="panel__num">01</span>
          <div className="panel__body panel__body--wide">
            <h3 className="panel__title">Bereiding</h3>
            <p className="panel__text">
              Sappie Limoncello wordt volledig met de hand gemaakt, wij schillen,
              bottelen, labelen &amp; bezorgen alles zelf! Zo garanderen we kwaliteit
              en blijven we persoonlijk betrokken bij ons product.
            </p>
          </div>
        </div>
        <div className="panel panel--blauw">
          <span className="panel__num">02</span>
          <div className="panel__body panel__body--wide">
            <h3 className="panel__title">Ingredi&euml;nten</h3>
            <p className="panel__text">
              Voor ons Sappie gebruiken wij slechts vier ingredi&euml;nten, zo houden we
              het zo natuurlijk mogelijk! Amalficitroenen, suiker, alcohol &amp; water.
            </p>
          </div>
        </div>
        <div className="panel panel--olijf">
          <span className="panel__num">03</span>
          <div className="panel__body panel__body--wide">
            <h3 className="panel__title">Duurzaamheid</h3>
            <p className="panel__text">
              We proberen zo veel mogelijk van onze grondstoffen te gebruiken, zo
              maken we van het citroensap heerlijke limonade! Ook leveren wij alle
              Sappies met elektrisch vervoer, zo houden we onze impact laag.
            </p>
          </div>
        </div>
        <div className="panel panel--geel">
          <span className="panel__num">04</span>
          <div className="panel__body panel__body--wide">
            <h3 className="panel__title">Waarom kiezen voor Sappie?</h3>
            <p className="panel__text">
              Omdat je kiest voor lokale Uteregse ondernemers! Elke fles wordt
              door ons (Jesse &amp; Oscar) gemaakt, zonder fabriek of tussenpersonen.
              Daardoor houden we het simpel en puur: <strong>Geen gedoe, gewoon Sappie!</strong>
            </p>
          </div>
        </div>
      </div>

      <section className="shop">
        <h2 className="shop__title">Welke <span className="hl-blauw">Sappies</span> kan ik kopen?</h2>
        <div className="shop__grid">
          <article className="prod">
            <div className="prod__photo">
              <img src={productBottle} alt="Klein Sappie" className="prod__img" />
            </div>
            <div className="prod__body prod__body--geel">
              <h3 className="prod__name">Klein Sappie <span className="prod__ml">100 ml</span></h3>
              <p className="prod__text">De kleinste van onze flesjes, ideaal voor in cadeau- of kerstpakketten.</p>
              <p className="prod__price">&euro;5,50</p>
            </div>
          </article>
          <article className="prod">
            <div className="prod__photo">
              <img src={productBottle} alt="Klassiek Sappie" className="prod__img" />
            </div>
            <div className="prod__body prod__body--blauw">
              <h3 className="prod__name">Klassiek Sappie <span className="prod__ml">500 ml</span></h3>
              <p className="prod__text">Onze klassieke halve liter fles, zoals verkrijgbaar bij de winkels en slijterijen.</p>
              <p className="prod__price">&euro;18,50</p>
            </div>
          </article>
          <article className="prod">
            <div className="prod__photo">
              <img src={productBottle} alt="Groot Sappie" className="prod__img" />
            </div>
            <div className="prod__body prod__body--sage">
              <h3 className="prod__name">Groot Sappie <span className="prod__ml">1000 ml</span></h3>
              <p className="prod__text">Een liter Sappie, voor jezelf of om uit te delen aan vrienden en familie.</p>
              <p className="prod__price">&euro;32,95</p>
            </div>
          </article>
        </div>
      </section>
    </>
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

export default function Homepage() {
  return (
    <>
      <Nav />
      <Hero />
      <Waterline />
      <VariantWerf />
      <SiteFooter />
    </>
  );
}

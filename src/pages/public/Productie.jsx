import React, { useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Instagram, Menu, Pause, Play, X } from 'lucide-react';
import { useRandomMark } from '../../hooks/useRandomMark';
import '../../styles/welkom.css';
import '../../styles/productie.css';
import amalfiLemons from '../../assets/photos/amalfi-lemons.jpg';

const navLinkClass = ({ isActive }) =>
  `nav__link${isActive ? ' nav__link--active' : ''}`;

const SECTIONS = [
  {
    id: 'ingredienten', num: '01', eyebrow: 'Stap 1', title: 'Ingrediënten',
    accent: 'sappie-sage', dark: true,
    body: ['De reis van ons Sappie begint met het juiste hoofdingrediënt, de Amalfi-citroenen. Deze citroenen zijn bij uitstek geschikt voor het maken van een klassieke limoncello. De dikke, aromatische schil bevat de oliën die de volle en zachte smaak geven aan ons heerlijke Sappie!'],
    photo: 'Amalfi-citroenen',
  },
  {
    id: 'schillen', num: '02', eyebrow: 'Stap 2', title: 'Schillen (en persen)',
    accent: 'lucht-blauw', dark: false,
    body: [
      'De volgende stap is het schillen van de citroen, alleen het dunne buitenste laagje van de schil wordt gebruikt voor de limoncello. Na het schillen worden de restanten van de citroenen geperst, zodat er zo min mogelijk verloren gaat.',
      'Van het sap maken we een heerlijke limonadesiroop, deze kun je gewoon op onze website bestellen!',
    ],
    photo: 'Uiteraard, handgemaakt!',
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
    body: ['De gefilterde alcohol wordt in deze stap voorzichtig gemengd met een suikerwater mengsel, in deze stap wordt het Sappie echt tot leven gebracht. Door de twee vloeistoffen langzaam met elkaar te laten mengen, ontstaat de typische troebele kleur van Sappie!'],
    photo: 'mengen: suiker & water',
  },
  {
    id: 'bottelen', num: '05', eyebrow: 'Stap 5', title: 'Bottelen & labelen',
    accent: 'lucht-blauw', dark: false,
    body: ['Nadat het suikerwater en de alcohol volledig gemengd is worden de flessen stuk voor stuk gevuld, voorzien van dop met waxlaag en als allerlaatste gelabeld. We proberen zo veel mogelijk met de hand te doen, om het een echt ambachtelijk product te kunnen noemen!'],
    photo: 'bottelen & labelen',
  },
  {
    id: 'leveren', num: '06', eyebrow: 'Stap 6', title: 'Leveren',
    accent: 'citroengeel', dark: false,
    body: ['De allerlaatste stap is het leveren van onze Sappies! We brengen al onze bestellingen zelf langs en proberen dit zo veel mogelijk met elektrisch vervoer te doen, of soms gewoon op de fiets. Zo houden we onze voetafdruk zo laag mogelijk, proost!'],
    photo: 'leveren',
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

// Zelfde polaroid-stijl als de foto van Oscar & Jesse op de Welkom-pagina
// (.wc-story__photo-klassen, gedeeld via welkom.css). Zonder src valt hij
// terug op de plaatshouder. Met video speelt hij pas af na een tik van de
// bezoeker (preload="none"), zodat het bestand niet ongevraagd meelaadt.
function PolaroidPhoto({ data, src, video, kleur = 'geel', richting = 'links' }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={`wc-story__photo wc-story__photo--polaroid wc-story__photo--${kleur} prodpolaroid prodpolaroid--${richting}`}>
      {video ? (
        <div className="prodpolaroid__videowrap">
          <video
            ref={videoRef}
            className="wc-story__img"
            poster={src}
            preload="none"
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onClick={() => (videoRef.current?.paused ? videoRef.current?.play() : videoRef.current?.pause())}
          >
            <source src={video} type="video/mp4" />
          </video>
          {!playing && (
            <button
              type="button"
              className="prodpolaroid__play"
              onClick={() => videoRef.current?.play()}
              aria-label="Video afspelen"
            >
              <Play size={26} fill="currentColor" />
            </button>
          )}
          {playing && (
            <div className="prodpolaroid__pause" aria-hidden="true">
              <Pause size={26} fill="currentColor" />
            </div>
          )}
        </div>
      ) : src ? (
        <img src={src} alt={data.photo} className="wc-story__img" />
      ) : (
        <div className="prodpolaroid__placeholder">
          <span className="prodpolaroid__label">{data.photo}</span>
        </div>
      )}
      <figcaption className="wc-story__cap"></figcaption>
    </figure>
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
      <span className="ph__eyebrow">Productie</span>
      <h1 className="ph__title ph__title--big">Hoe wordt <span className={`ph__mark ${markColor}`}>Sappie</span> gemaakt?</h1>
      <p className="ph__body ph__body--medium">
        Onze ambachtelijke limoncello wordt gewoon hier in Utrecht geproduceerd.
        Ons Sappie is een handgemaakt product, zonder poespas. Gewoon, goed, Sappie!
        Hieronder vind je een uitleg over onze ingredi&euml;nten, ons productieproces en meer.
      </p>
    </header>
  );
}

function LayoutTimeline() {
  // Tijdelijk alleen de eerste zes stappen tonen, zodat we die eerst goed
  // kunnen afmaken voor de rest weer terugkomt. SECTIONS zelf blijft compleet.
  const zichtbareSecties = SECTIONS.slice(0, 6);
  return (
    <ol className="prodtl prodtl--zigzag">
      {zichtbareSecties.map((s, i) => (
        <li
          key={s.id}
          className={`tlstep tlstep--bare ${s.dark ? 'is-dark' : ''} ${i % 2 ? 'is-odd' : 'is-even'}`}
          style={{ '--acc': `var(--${s.accent})` }}
        >
          <div className="tlstep__marker">
            <span className="tlstep__num">{s.num}</span>
          </div>
          <div className="tlstep__card">
            <div className="tlstep__textcol">
              <div className="tlstep__head">
                <span className="tlstep__headnum">{s.num}</span>
                <div className="tlstep__headtext">
                  <p className="tlstep__eyebrow">{s.eyebrow}</p>
                  <h2 className="tlstep__title">{s.title}</h2>
                </div>
              </div>
              <div className="tlstep__body">
                {s.body.map((p, j) => <p key={j} className="tlstep__p">{p}</p>)}
              </div>
            </div>
            <div className="tlstep__media">
              {i === 0 && <PolaroidPhoto data={s} src={amalfiLemons} video="/videos/Video%20test%201.mp4" kleur="geel" richting="links" />}
              {i === 1 && <PolaroidPhoto data={s} kleur="blauw" richting="rechts" />}
              {i === 2 && <PolaroidPhoto data={s} kleur="sage" richting="links" />}
              {i === 3 && <PolaroidPhoto data={s} kleur="donkergroen" richting="rechts" />}
              {i === 4 && <PolaroidPhoto data={s} kleur="geel" richting="links" />}
              {i === 5 && <PolaroidPhoto data={s} kleur="blauw" richting="rechts" />}
              {i > 5 && <Photo data={s} className="tlstep__photo" />}
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

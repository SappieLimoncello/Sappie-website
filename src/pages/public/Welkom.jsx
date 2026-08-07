import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { SiteNav } from '../../components/SiteNav.jsx';
import { useRandomMark } from '../../hooks/useRandomMark';
import oscarEnJesseFoto from '../../assets/photos/oscar-en-jesse.jpg';
import iwsc93 from '../../assets/badges/iwsc-93.png';
import '../../styles/reviews.css';
import '../../styles/welkom.css';

function StoryPhoto() {
  return (
    <figure className="wc-story__photo wc-story__photo--polaroid wc-story__photo--blauw">
      <img src={iwsc93} alt="IWSC 93 punten, iwsc.net 2026" className="wc-story__badge" />
      <img src={oscarEnJesseFoto} alt="Oscar &amp; Jesse met een fles Sappie" className="wc-story__img" />
      <figcaption className="wc-story__cap">Oscar &amp; Jesse</figcaption>
    </figure>
  );
}

function Verhaal() {
  return (
    <section className="wc-sec wc-story">
      <span className="ph__eyebrow">Bedankt voor je aankoop</span>
      <h2 className="wc-sec__title wc-story__title">Welkom bij <span className="hl-blauw">Sappie!</span></h2>
      <StoryPhoto />
      <div className="wc-story__body">
        <p>
          Wij (Oscar &amp; Jesse) zijn superblij dat jij ons mooie Sappie hebt gekocht!
          Op deze pagina vind je alle belangrijke informatie die bij jouw mooie flesje hoort.
        </p>
        <p>
          In de zomer van 2025 kwamen we langs de Vecht op het idee om de Uteregse trots in
          een flesje te stoppen. Samen zijn we op zoek gegaan naar de beste ingredi&euml;nten
          en de perfecte balans in smaak. Ook viel ons Sappie in smaak bij de jury van de
          IWSC (International Wine &amp; Spirit competition), in 2026 hebben we hier maar
          liefst <a href="https://www.iwsc.net/results/detail/173259/limoncello" target="_blank" rel="noreferrer" className="wc-link">93/100 punten</a> behaald!
        </p>
        <p>
          Hiermee zijn we niet alleen de beste van Utrecht en omstreken, maar de twee na
          beste van Nederland!
        </p>
        <p>
          Met trots presenteren we dit gele Sappie. Een volzoete, frisse en bloemige
          limoncello uit de Domstad. Ambachtelijk gemaakt van handgeschilde
          amalficitroenen, met een nuchtere Uteregse blik.
        </p>
      </div>
    </section>
  );
}

function PageHead() {
  const markColor = useRandomMark();
  return (
    <header className="ph ph--statement ph--welkom">
      <h1 className="ph__title ph__title--big">Hoe zorg je het beste voor je <span className={`ph__mark ${markColor}`}>Sappie?</span></h1>
      <p className="ph__body ph__body--medium">
        Hieronder vind je tips om zo goed en lang mogelijk van jouw Sappie te kunnen genieten,
        voor de uitgebreide tip kun je op de blokken klikken! Namens Oscar &amp; Jesse, proost!
      </p>
    </header>
  );
}

const TIPS = [
  { nr: '01', titel: 'Bewaren', tekst: 'Houd je Sappie te allen tijde uit het directe (zon)licht. Dit tast de kleur, geur en smaak aan. Sla de fles bij voorkeur rechtop in de vriezer op, of anders op een koele en donkere plek.', variant: 'sage' },
  { nr: '02', titel: 'Schenken', tekst: 'Dit Sappie smaakt het lekkerste bij -10 tot -5 graden, dat betekent dat je hem direct uit de vriezer kan serveren om te genieten!', variant: 'blauw' },
  { nr: '03', titel: 'Genieten', tekst: 'Je kan op vele manieren van je Sappie genieten: direct geserveerd uit de vriezer als aperitief, als borrel na het diner of gewoon omdat het kan!', variant: 'olijf' },
  {
    nr: '04', titel: 'Delen', variant: 'geel',
    tekst: (
      <>
        Vind jij jouw Sappie nou écht lekker, dan waarderen wij het enorm als je voor ons een{' '}
        <a href="https://g.page/r/CbZKNCG-3TEgEBE/review" target="_blank" rel="noreferrer" className="wc-link" onClick={(e) => e.stopPropagation()}>review</a> achter laat!
      </>
    ),
  },
];

function ZorgSectie({ onOpenTip }) {
  return (
    <div className="stack stack--tips">
      {TIPS.map((t) => (
        <div
          key={t.nr}
          role="button"
          tabIndex={0}
          className={`panel panel--${t.variant}`}
          onClick={() => onOpenTip(t)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenTip(t); }
          }}
        >
          <span className="panel__num">{t.nr}</span>
          <h3 className="panel__title">{t.titel}</h3>
          <div className="panel__body panel__body--wide">
            <p className="panel__text">{t.tekst}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TipModal({ tip, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!tip) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className={`modal__card modal__card--${tip.variant}`} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Sluiten">&times;</button>
        <h3 className="modal__title">{tip.titel}</h3>
        <p className="modal__text">{tip.tekst}</p>
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
          <p className="foot__text foot__kvk">KVK 98649167<br className="foot__kvk-break" /><span className="foot__dot"> &bull; </span>BTW NL868584344B01</p>
          <div className="foot__legal">
            <Link to="/algemene-voorwaarden" className="foot__legal-link">Algemene voorwaarden</Link>
            <span className="foot__legal-sep">&bull;</span>
            <Link to="/privacy-statement" className="foot__legal-link">Privacy statement</Link>
          </div>
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

export default function Welkom() {
  const [openTip, setOpenTip] = useState(null);
  return (
    <>
      <SiteNav />
      <Verhaal />
      <PageHead />
      <ZorgSectie onOpenTip={setOpenTip} />
      <SiteFooter />
      <TipModal tip={openTip} onClose={() => setOpenTip(null)} />
    </>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import '../../styles/reviews.css';

const navLinkClass = ({ isActive }) =>
  `nav__link${isActive ? ' nav__link--active' : ''}`;

const THEMES = ['geel', 'blauw', 'creme', 'sage', 'groen'];
const SIZES = ['normal', 'tall', 'short'];

const RAW_REVIEWS = [
  { name: 'niels seriere', when: 'een maand geleden', text: 'Ik heb meerdere keren zelf limoncello gemaakt maar deze was echt lekker. Ik heb met de maker gepraat en ik was echt onder de indruk. Hij wist alles en ik ga zeker vaker kopen' },
  { name: 'Martijn Sterk', when: 'een maand geleden', text: 'Smaakt goed, en een leuk lokaal product!' },
  { name: 'Timothy Davis', when: 'een maand geleden', text: "Best limoncello I've had in the Netherlands" },
  { name: 'Andrea Kenter', when: '8 maanden geleden', text: 'Delicious limoncello, perfectly balanced between tart and fresh. Made in Utrecht of real Amalfi lemons!' },
  { name: 'Lauren Magcalas', when: '5 maanden geleden', text: 'Very easy to drink!' },
  { name: 'nicole el murr', when: '8 maanden geleden', text: 'great limoncello from utrecht!!' },
  { name: 'Jochem van Iterson', when: '2 maanden geleden', text: 'Deze limoncello is echt top! Lekker fris en goed in balans. Ik raad dit lokale product uit Utrecht zeker aan!' },
  { name: 'Marco Jonkers', when: 'een maand geleden', text: 'De beste limoncello uit de regio!' },
  { name: 'Evert ten Ham', when: 'een maand geleden', text: 'Eindelijk een limoncello, die niet alcoholisch proeft.' },
  { name: 'Jeffrey de Boer', when: '17 uur geleden', text: 'Hadden in een kwartier een fles op. Lekker fris en zacht. Waren er zeer over te spreken.' },
  { name: 'Algernon Yearwood', when: 'een week geleden', text: 'Vandaag fles open gebroken. Heerlijk bij de bbq! Lekker fris en smaakvol!' },
  { name: 'Rob Jansen', when: 'een maand geleden', text: 'Na jaren zoeken naar een echte goeie limoncello, heb ik er eindelijk een gevonden. Zacht van smaak, een mooie balans van zoet en zuur!' },
  { name: 'Vera ten', when: '8 maanden geleden', text: 'Limoncello gemaakt van echte Amalfi citroenen, erg lekker!' },
  { name: 'Theo van den Broek', when: '7 maanden geleden', text: 'Deze is de moeite wel waard' },
  { name: 'Jacobien Taheij', when: '7 maanden geleden', text: 'Heerlijke, unieke smaak!' },
  { name: 'Hester Schneider', when: '7 maanden geleden', text: 'Boem! Wat een smaakexplosie' },
  { name: 'Cami Tak', when: '8 maanden geleden', text: 'Dit noem ik nou genieten' },
  { name: 'tygo nieuwveen', when: 'een maand geleden', text: 'Vorige week ontkurkt toen het erg warm was en ik was blij verrast! Hij is erg fris en zoet! Erg lekker als die ijskoud gedronken wordt.' },
  { name: 'Chris Overduin', when: 'een maand geleden', text: 'Ambachtelijk en puur, precies hoe limoncello hoort te zijn.' },
  { name: 'Felix Maas', when: '7 maanden geleden', text: 'Heerlijke Limoncello, heb er al een hoop glaasjes van op!' },
  { name: 'Norine El Ghazi', when: '6 maanden geleden', text: 'Lekker drankje, niets meer aan doen!' },
  { name: 'Lynke Hemstra', when: '7 maanden geleden', text: 'Hele lekkere limoncello, echt een aanrader!' },
  { name: 'Josephine W', when: '8 maanden geleden', text: 'Heerlijk zachte, lokaal geproduceerde limoncello die het beste smaakt als je hem ijskoud drinkt. Ook origineel om cadeau te geven!' },
  { name: 'Wendy Disseldorp', when: '7 maanden geleden', text: 'Mooie smaak, Sappie limoncello! Zacht, vol, tintelend.' },
  { name: 'Josephine Hilberink', when: '7 maanden geleden', text: 'Mijn favoriete limoncello-merk! :)' },
  { name: 'Muriël Maas', when: '6 maanden geleden', text: 'Heerlijk! Ik heb gelijk zin in de zomer!' },
  { name: 'Diederik Roest', when: '7 maanden geleden', text: 'Echte handgemaakte limoncello, met een heerlijke, complexe smaak! En dat lokaal en met passie geproduceerd.' },
  { name: 'Max Nierkes', when: '5 maanden geleden', text: 'Ontzettend lekkere limoncello, het brandt niet en heerlijk om te nippen' },
  { name: 'Joris Liesveld', when: '7 maanden geleden', text: 'Erg lekkere en stroperige limoncello. Ook leuk dat het echt in Utrecht gemaakt wordt.' },
  { name: 'Iris Dijksman', when: '7 maanden geleden', text: 'Heerlijke limoncello van Utrechtse bodem. Je proeft dat het handgemaakt is! Enorm lekker.' },
  { name: 'Mine Pagie', when: '7 maanden geleden', text: 'Heerlijk, nog nooit zulke lekkere limoncello gedronken' },
  { name: 'Gert-Jan van de Veen', when: '7 maanden geleden', text: 'Nog niet eerder zo’n lekkere limoncello gedronken. Je moet er nu nog wel even voor naar het mooie "Utereg" rijden, maar dat is het zeker waard.' },
  { name: 'Niek van Engelen', when: '7 maanden geleden', text: 'Ik heb wel eens eerder limoncello gehad, maar dit slaat alles. Maar serieus, echt heerlijke limoncello. Drinkt heerlijk zacht, als lekker borreltje of gewoon...' },
  { name: 'Hein van den brink', when: '7 maanden geleden', text: 'Lekkerste limoncello van Utereg! Ik hou al van limoncello, maar zo zacht als deze heb ik niet eens in Italië gehad!' },
  { name: 'Lotte Jansen', when: '7 maanden geleden', text: 'Zacht in het keeltje en een smaak waar je u tegen zegt. Lang geleden dat ik zo’n lekkere limoncello heb gedronken! Als ik een limoncello moest aanraden is het deze. Prijs kwaliteit verhouding, die is hier goed, die is hier top!' },
  { name: 'ouasman', when: '2 maanden geleden', text: 'De siroop gekocht. Deze wordt gemaakt van dezelfde citroenen. Zeer lekker, was erg tevreden. Best duurzaam zo.' },
  { name: 'margot Nexus2015', when: '5 maanden geleden', text: 'Heerlijke limoncello, echt een aanrader!' },
  { name: 'Amy', when: '6 maanden geleden', text: 'Lekkerste limoncello ooit! Ik zou het iedereen aanraden.' },
  { name: 'daan sleijpen', when: 'een maand geleden', text: 'Zalig en echt Utregs... Heerlijke limoncello!' },
  { name: 'Henk Glaudemans', when: '7 maanden geleden', text: 'Deze limoncello is erg verrassend. Wordt met de hand gemaakt in Utrecht en dat proef je.' },
  { name: 'Tijmen Vis', when: 'een maand geleden', text: 'Oprecht echt ontzettend goeie limoncello :))' },
  { name: 'Niek Yra', when: '6 maanden geleden', text: 'Hele fijne zachte limoncello met een prachtige natuurlijke kleur, en óók tof is de focus op duurzaamheid met bonus hun biologische limonade. Doe maar een doosje, van beide!' },
  { name: 'Tim Pijnenburg', when: 'een maand geleden', text: 'Hele lekkere limoncello, smaakt echt naar limoenen, goed zoet, goed sappig en perfect niveau alcohol, sterk staaltje vakmanschap!' },
  { name: 'Puck Feitz', when: 'een maand geleden', text: 'Ge wel dig. Geen andere woorden voor. Ik hou niet van limoncello maar dit... echt top! Ik denk vanaf nu alleen maar dit.. echt holy moly' },
  { name: 'Mick Dingemans', when: 'een maand geleden', text: 'Heerlijke frisse smaak! Aanrader om in je restaurant te schenken!' },
  { name: 'Laura Henrar', when: '7 maanden geleden', text: 'Wat een heerlijk zachte limoncello! Overwint alle verwachtingen en nog meer. Raad deze likeur zeker aan.' },
  { name: 'Kyra van Zeeland', when: '2 maanden geleden', text: 'Lekkere frisse limoncello! Als ik nog eens in Utrecht kom, gaat hier zeker een flesje van mee!! De siroop die gemaakt wordt van de overgebleven citroenen is overigens ook echt een aanrader en lekker milieubewust. :)' },
  { name: 'Puck Roos', when: '2 maanden geleden', text: 'Met Sappie voelt zelfs een regenachtige dag aan als zomer! Heerlijke limoncello, ik kan het iedereen aanraden.' },
];

const REVIEWS = RAW_REVIEWS.map((r, i) => ({
  ...r,
  stars: 5,
  theme: THEMES[i % THEMES.length],
  size: SIZES[i % SIZES.length],
}));

function Star({ on }) {
  return (
    <span className={`rev__star rev__star--${on ? 'on' : 'off'}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.86-5-4.87 7.1-1.01z" />
      </svg>
    </span>
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
          <NavLink to="/reviews" className="nav__mobile-link nav__mobile-link--active" onClick={closeMenu}>Reviews</NavLink>
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
      <span className="ph__eyebrow">Reviews</span>
      <h1 className="ph__title ph__title--big">Wat vindt men van <span className="ph__mark">Sappie?</span></h1>
      <p className="ph__body">
        Alles wat je hier leest komt van onze Google-reviews. Klik op een blokje
        om de volledige review te lezen.
      </p>
    </header>
  );
}

function ReviewCard({ r, onOpen }) {
  const ref = useRef(null);
  const raf = useRef(0);

  const measure = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const grid = el.parentElement;
      const rowH = parseFloat(getComputedStyle(grid).gridAutoRows) || 6;
      const gap = parseFloat(getComputedStyle(grid).rowGap) || 0;
      el.style.gridRowEnd = 'auto';
      const h = el.getBoundingClientRect().height;
      el.style.gridRowEnd = 'span ' + Math.ceil((h + gap) / (rowH + gap));
    });
  };

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    return () => { cancelAnimationFrame(raf.current); ro.disconnect(); window.removeEventListener('resize', measure); };
  });

  return (
    <button
      ref={ref}
      type="button"
      className={`rev rev--${r.theme} rev--${r.size}`}
      onClick={onOpen}
      aria-label={`Lees de review van ${r.name}`}
    >
      <div className="rev__stars" aria-label={`${r.stars} van 5 sterren`}>
        {[1, 2, 3, 4, 5].map((n) => <Star key={n} on={n <= r.stars} />)}
      </div>
      <p className="rev__text">{r.text}</p>
      <div className="rev__foot">
        <span className="rev__name">{r.name}</span>
      </div>
    </button>
  );
}

function ReviewModal({ list, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  if (index == null) return null;
  const r = list[index];
  return (
    <div className="modal" onClick={onClose}>
      <button type="button" className="modal__nav modal__nav--prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Vorige review">&lsaquo;</button>
      <div className={`modal__card modal__card--${r.theme}`} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Sluiten">&times;</button>
        <div className="rev__stars" aria-label={`${r.stars} van 5 sterren`}>
          {[1, 2, 3, 4, 5].map((n) => <Star key={n} on={n <= r.stars} />)}
        </div>
        <p className="modal__text">{r.text}</p>
        <div className="modal__meta">
          <span className="modal__name">{r.name}</span>
          <span className="modal__when">Review van Google &middot; {r.when}</span>
        </div>
      </div>
      <button type="button" className="modal__nav modal__nav--next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Volgende review">&rsaquo;</button>
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

export default function Reviews() {
  const [open, setOpen] = useState(null);
  const list = REVIEWS;
  const go = (d) => setOpen((i) => (i == null ? i : (i + d + list.length) % list.length));

  return (
    <>
      <Nav />
      <PageHead />
      <div className="wall">
        {list.map((r, i) => <ReviewCard key={i} r={r} onOpen={() => setOpen(i)} />)}
      </div>
      <SiteFooter />
      <ReviewModal list={list} index={open} onClose={() => setOpen(null)} onPrev={() => go(-1)} onNext={() => go(1)} />
    </>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRandomMark } from '../../hooks/useRandomMark';
import aanduidingGeel from '../../assets/marks/aanduiding-geel.png';
import aanduidingBlauw from '../../assets/marks/aanduiding-blauw.png';
import '../../styles/winkels.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

// Sappie-kleurenpalet toegepast op de Mapbox "light"-basisstijl, zodat de
// kaart aansluit bij de rest van de site i.p.v. een los standaardblok.
const BRAND_MAP_COLORS = {
  background: '#FAF4E6',
  water: '#AFCBDD',
  landuse: '#E8DEBE',
  building: '#EDE3C8',
  road: '#3A3E2C',
  text: '#3A3E2C',
  textHalo: '#FAF4E6',
};

// Lagen die we helemaal verbergen om de kaart rustiger/minder gedetailleerd
// te maken: gebouwen, wandel-/fietspaden, spoor, en straatnaam-labels.
// Alleen de hoofd-wegenlijnen (road-simple/bridge-simple/tunnel-simple) en
// de buurt-/plaatsnamen (place_label) blijven staan voor herkenbaarheid.
const HIDDEN_LAYER_IDS = new Set([
  'building',
  'tunnel-path-trail', 'tunnel-path-cycleway-piste', 'tunnel-path', 'tunnel-steps', 'tunnel-pedestrian',
  'road-path-trail', 'road-path-cycleway-piste', 'road-path', 'road-steps', 'road-pedestrian', 'road-rail',
  'bridge-path-trail', 'bridge-path-cycleway-piste', 'bridge-path', 'bridge-steps', 'bridge-pedestrian', 'bridge-rail',
  'road-label-simple',
]);
const HIDDEN_SOURCE_LAYERS = new Set(['natural_label', 'airport_label', 'poi_label']);

function applyBrandMapStyle(map) {
  const layers = map.getStyle()?.layers || [];
  layers.forEach((layer) => {
    const sl = layer['source-layer'];
    try {
      if (HIDDEN_LAYER_IDS.has(layer.id) || HIDDEN_SOURCE_LAYERS.has(sl)) {
        map.setLayoutProperty(layer.id, 'visibility', 'none');
      } else if (layer.type === 'background') {
        map.setPaintProperty(layer.id, 'background-color', BRAND_MAP_COLORS.background);
      } else if (sl === 'water' && layer.type === 'fill') {
        map.setPaintProperty(layer.id, 'fill-color', BRAND_MAP_COLORS.water);
      } else if (sl === 'landuse' && layer.type === 'fill') {
        map.setPaintProperty(layer.id, 'fill-color', BRAND_MAP_COLORS.landuse);
      } else if (sl === 'road' && layer.type === 'line') {
        map.setPaintProperty(layer.id, 'line-color', BRAND_MAP_COLORS.road);
        map.setPaintProperty(layer.id, 'line-opacity', 0.55);
      } else if (layer.type === 'symbol') {
        map.setPaintProperty(layer.id, 'text-color', BRAND_MAP_COLORS.text);
        map.setPaintProperty(layer.id, 'text-halo-color', BRAND_MAP_COLORS.textHalo);
        map.setPaintProperty(layer.id, 'text-halo-width', 1.2);
      }
    } catch (e) {
      // Sommige paint-properties bestaan niet voor elk laagtype — negeren.
    }
  });
}

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
    lat: 52.082617, lng: 5.134421,
  },
  {
    id: 'una-draaiweg', category: 'slijterij', name: 'Una Más Draaiweg',
    addr: 'Draaiweg 65, 3514 CN Utrecht', tel: '030 271 82 11',
    hours: { ma: ['13:00', '20:00'], di: ['10:00', '20:00'], wo: ['10:00', '20:00'], do: ['10:00', '20:00'], vr: ['10:00', '20:00'], za: ['09:00', '20:00'], zo: ['13:00', '18:00'] },
    lat: 52.100861, lng: 5.115066,
  },
  {
    id: 'una-terwijde', category: 'slijterij', name: 'Una Más Terwijde',
    addr: 'Ella Fitzgeraldplein 16, 3543 EP Utrecht', tel: '030 303 20 07',
    hours: { ma: ['13:00', '18:00'], di: ['10:00', '18:00'], wo: ['10:00', '18:00'], do: ['10:00', '18:00'], vr: ['09:00', '20:00'], za: ['09:00', '18:00'], zo: null },
    lat: 52.101513, lng: 5.044943,
  },
  {
    id: 'una-rokade', category: 'slijterij', name: 'Una Más Rokade',
    addr: 'Doornburglaan 7, 3554 GK Utrecht', tel: '030 244 78 38',
    hours: { ma: ['13:00', '18:00'], di: ['10:00', '18:00'], wo: ['10:00', '18:00'], do: ['10:00', '18:00'], vr: ['10:00', '19:00'], za: ['09:00', '18:00'], zo: null },
    lat: 52.11369, lng: 5.08915,
  },
  {
    id: 'una-handel', category: 'slijterij', name: 'Una Más Händelstraat',
    addr: 'Händelstraat 102, 3533 GM Utrecht', tel: '030 294 33 70',
    hours: { ma: ['13:00', '18:00'], di: ['10:00', '18:00'], wo: ['10:00', '18:00'], do: ['10:00', '19:00'], vr: ['10:00', '19:00'], za: ['09:00', '18:00'], zo: null },
    lat: 52.08713, lng: 5.084912,
  },
  {
    id: 'una-muntplein', category: 'slijterij', name: 'Una Más Muntplein',
    addr: 'Muntplein 35, 3437 AW Nieuwegein', tel: '030 603 74 19',
    hours: { ma: ['13:00', '18:00'], di: ['09:00', '18:00'], wo: ['09:00', '18:00'], do: ['09:00', '18:00'], vr: ['09:00', '20:00'], za: ['09:00', '17:00'], zo: null },
    lat: 52.041586, lng: 5.076406,
  },
  {
    id: 'una-cs', category: 'slijterij', name: 'Una Más CS',
    addr: 'Stationspassage 3, 3511 ED Utrecht', tel: '030 307 84 45',
    hours: { ma: ['11:00', '19:00'], di: ['11:00', '19:00'], wo: ['11:00', '19:00'], do: ['11:00', '19:00'], vr: ['11:00', '19:00'], za: ['11:00', '19:00'], zo: null },
    lat: 52.089975, lng: 5.110255,
  },
  {
    id: 'besselings-booze', category: 'slijterij', name: "Besselings' Booze",
    addr: 'Damstraat 43, 3531 BS Utrecht', tel: '030 785 97 25',
    hours: { ma: null, di: ['11:00', '19:00'], wo: ['11:00', '19:00'], do: ['11:00', '19:00'], vr: ['11:00', '19:00'], za: ['11:00', '18:00'], zo: null },
    lat: 52.092443, lng: 5.103496,
  },
  {
    id: 'biltstraat', category: 'slijterij', name: 'Biltstraat Wijn & Whisky',
    addr: 'Biltstraat 36, 3572 BC Utrecht', tel: '030 233 34 23',
    hours: { ma: ['12:00', '18:00'], di: ['10:00', '18:00'], wo: ['10:00', '18:00'], do: ['10:00', '20:00'], vr: ['10:00', '20:00'], za: ['10:00', '18:00'], zo: ['12:00', '18:00'] },
    lat: 52.09527, lng: 5.128329,
  },
  {
    id: 'hygge', category: 'restaurant', name: 'Hygge Utrecht',
    addr: 'Goeman Borgesiuslaan 77, 3515 ET Utrecht', tel: '030 755 15 50',
    hours: { ma: null, di: ['10:30', '22:00'], wo: ['10:30', '22:00'], do: ['10:30', '22:00'], vr: ['10:30', '23:00'], za: ['10:30', '23:00'], zo: ['10:30', '22:00'] },
    lat: 52.103055, lng: 5.114158,
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
      <span className="ph__eyebrow">Verkooppunten</span>
      <h1 className="ph__title ph__title--big">Waar vind je <span className={`ph__mark ${markColor}`}>ons Sappie</span> allemaal?</h1>
      <p className="ph__body ph__body--medium">
        Onze limoncello is verkrijgbaar bij winkels, slijterijen en caf&eacute;s in en rondom Utrecht,
        op de kaart hieronder kun je alle plekken vinden! Mis je nog plekken waar je ons heerlijke
        Sappie kunt krijgen? Laat het ons dan vooral weten!
      </p>
    </header>
  );
}

function MapPanel({ activeId, setActiveId, setExpandedId }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerElsRef = useRef({});

  useEffect(() => {
    if (!containerRef.current || mapRef.current || !mapboxgl.accessToken) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [5.108, 52.093],
      zoom: 11.3,
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
    map.on('style.load', () => applyBrandMapStyle(map));

    // Zuidelijkste (dichtstbijzijnde, onderaan op het scherm) locaties
    // krijgen de hoogste z-index, zodat ze over de noordelijkere pins heen
    // vallen i.p.v. eronder — net als bij een echte kaart met diepte.
    const noordNaarZuid = [...LOCATIONS].sort((a, b) => b.lat - a.lat);

    noordNaarZuid.forEach((loc, i) => {
      const el = document.createElement('div');
      el.className = `pin pin--${loc.category}`;
      el.style.zIndex = String(i + 1);
      const markerSrc = loc.category === 'slijterij' ? aanduidingGeel : aanduidingBlauw;
      el.innerHTML = `<img class="pin__marker" src="${markerSrc}" alt="" />`;
      el.addEventListener('mouseenter', () => setActiveId(loc.id));
      el.addEventListener('mouseleave', () => setActiveId(null));
      el.addEventListener('click', () => {
        setExpandedId((prev) => (prev === loc.id ? null : loc.id));
        // setTimeout ipv direct meten: setExpandedId werkt de lijst pas na
        // deze call bij (React-render), dus meteen meten geeft nog de oude,
        // ingeklapte hoogte. Met setTimeout(...,0) wachten we tot na die render.
        setTimeout(() => {
          const item = document.getElementById(`loc-${loc.id}`);
          const list = item?.closest('.locator__list');
          const header = list?.querySelector('.list__group-title');
          if (item && list) {
            const headerHeight = header ? header.getBoundingClientRect().height : 0;
            const itemTop = item.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop;
            list.scrollTo({ top: Math.max(0, itemTop - headerHeight), behavior: 'smooth' });
          }
        }, 0);
      });

      new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([loc.lng, loc.lat])
        .addTo(map);

      markerElsRef.current[loc.id] = el;
    });

    // Geen map.remove() hier: React 18 Strict Mode voert deze effect in
    // development bewust twee keer snel na elkaar uit (mount-cleanup-mount).
    // Mapbox GL's WebGL-canvas overleeft dat direct-afbreken-en-opnieuw-
    // opbouwen niet betrouwbaar. De kaart leeft daarom gewoon door zolang
    // de component bestaat; bij echt verlaten van de pagina ruimt de browser
    // de losgekoppelde canvas vanzelf op.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Object.entries(markerElsRef.current).forEach(([id, el]) => {
      el.classList.toggle('pin--active', id === activeId);
    });
  }, [activeId]);

  return (
    <div className="locator__map">
      {mapboxgl.accessToken ? (
        <div ref={containerRef} className="mapbox-container" />
      ) : (
        <p className="mapnote">Mapbox-token ontbreekt (VITE_MAPBOX_TOKEN).</p>
      )}
      <div className="locator__legend">
        <span className="legend__item"><span className="legend__dot" style={{ background: 'var(--citroengeel)' }}></span>Slijterijen</span>
        <span className="legend__item"><span className="legend__dot" style={{ background: 'var(--lucht-blauw)' }}></span>Restaurants</span>
      </div>
    </div>
  );
}

function LocationList({ activeId, setActiveId, expandedId, setExpandedId }) {
  const groups = [
    { label: 'Slijterijen', key: 'slijterij', items: LOCATIONS.filter((l) => l.category === 'slijterij') },
    { label: 'Restaurants', key: 'restaurant', items: LOCATIONS.filter((l) => l.category === 'restaurant') },
  ];

  return (
    <div className="locator__list">
      {groups.map((g) => (
        <React.Fragment key={g.label}>
          <p className={`list__group-title list__group-title--${g.key}`}>{g.label}</p>
          {g.items.map((loc) => {
            const open = expandedId === loc.id;
            const status = open ? getOpenStatus(loc.hours) : null;
            return (
              <div
                key={loc.id}
                id={`loc-${loc.id}`}
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

export default function WinkelsEnRestaurants() {
  const [activeId, setActiveId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  return (
    <>
      <Nav />
      <PageHead />
      <div className="locator locator--split">
        <MapPanel activeId={activeId} setActiveId={setActiveId} setExpandedId={setExpandedId} />
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

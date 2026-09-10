import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SiteNav } from '../../components/SiteNav.jsx';
import { useRandomMark } from '../../hooks/useRandomMark';
import { applyBrandMapStyle } from '../../lib/mapboxBrandStyle.js';
import aanduidingGeel from '../../assets/marks/aanduiding-geel.png';
import domtuinUtrecht from '../../assets/photos/domtuin-utrecht.jpg';
import whitbyAbbey from '../../assets/photos/whitby-abbey.jpg';
import '../../styles/winkels.css';
import '../../styles/reviews.css';
import '../../styles/welkom.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

// Vaste lijst in de code, net als bij Verkooppunten: nieuwe foto's voegen we
// hier gewoon toe.
const WORLD_PHOTOS = [
  {
    id: 'utrecht',
    place: 'Nederland, Utrecht',
    lat: 52.0907,
    lng: 5.1214,
    photo: domtuinUtrecht,
    caption: 'Waar het allemaal begon: in de Domtuin.',
  },
  {
    id: 'whitby-abbey',
    place: 'Verenigd Koninkrijk, Whitby Abbey',
    lat: 54.4869,
    lng: -0.6068,
    photo: whitbyAbbey,
    caption: 'Sappie op bezoek bij Whitby Abbey.',
  },
];

function PageHead() {
  const markColor = useRandomMark();
  return (
    <header className="ph ph--statement">
      <span className="ph__eyebrow">Around the world</span>
      <h1 className="ph__title ph__title--big">
        Waar reist <span className={`ph__mark ${markColor}`}>ons Sappie</span> naartoe?
      </h1>
      <p className="ph__body ph__body--medium">
        Draai de aardbol rond en klik op een citroen om te zien waar Sappie al is geweest.
        Heb jij een foto met Sappie op een bijzondere plek? <a href="mailto:info@sappie-limoncello.nl" className="ph__link">Stuur</a> deze naar ons op.
        Als ons Sappie nog niet in het land is geweest krijg je van ons een mini flesje cadeau!
      </p>
    </header>
  );
}

function GlobePanel({ onOpenPhoto, activeId }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerElsRef = useRef({});

  useEffect(() => {
    if (!containerRef.current || mapRef.current || !mapboxgl.accessToken) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      center: [10, 48],
      zoom: 2.3,
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
    map.on('style.load', () => {
      applyBrandMapStyle(map);
      map.setFog({
        color: 'rgb(250, 244, 230)',
        'high-color': 'rgb(175, 203, 221)',
        'horizon-blend': 0.02,
        'space-color': 'rgb(58, 62, 44)',
        'star-intensity': 0.15,
      });
    });

    WORLD_PHOTOS.forEach((item) => {
      const el = document.createElement('div');
      el.className = 'pin';
      const markerImg = document.createElement('img');
      markerImg.className = 'pin__marker';
      markerImg.src = aanduidingGeel;
      markerImg.alt = item.place;
      el.appendChild(markerImg);
      el.addEventListener('click', () => onOpenPhoto(item));

      new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([item.lng, item.lat])
        .addTo(map);
      markerElsRef.current[item.id] = el;
    });

    // Geen map.remove() hier: React 18 Strict Mode voert deze effect in
    // development bewust twee keer snel na elkaar uit, en Mapbox GL's
    // WebGL-canvas overleeft dat niet betrouwbaar. Zie WinkelsEnRestaurants.jsx.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Object.entries(markerElsRef.current).forEach(([id, el]) => {
      el.classList.toggle('pin--active', id === activeId);
    });
  }, [activeId]);

  return (
    <figure className="mappolaroid">
      <div className="locator__map">
        {mapboxgl.accessToken ? (
          <div ref={containerRef} className="mapbox-container" />
        ) : (
          <p className="mapnote">Mapbox-token ontbreekt (VITE_MAPBOX_TOKEN).</p>
        )}
      </div>
      <figcaption className="wc-story__cap">Sappie around the world.</figcaption>
    </figure>
  );
}

function WorldList({ activeId, setActiveId, onOpenPhoto }) {
  return (
    <div className="locator__list">
      <p className="list__group-title list__group-title--wereld">Waar Sappie is geweest</p>
      {WORLD_PHOTOS.map((item) => (
        <div
          key={item.id}
          className={`list__item ${activeId === item.id ? 'list__item--active' : ''}`}
          onMouseEnter={() => setActiveId(item.id)}
          onMouseLeave={() => setActiveId(null)}
          onClick={() => onOpenPhoto(item)}
        >
          <span className="list__dot list__dot--wereld"></span>
          <div className="list__body">
            <p className="list__name list__name--wereld"><span className="list__name-text">{item.place}</span></p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PhotoModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!item) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__card modal__card--creme" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Sluiten">&times;</button>
        <img src={item.photo} alt={item.place} style={{ width: '100%', height: 'auto', display: 'block', marginBottom: '1rem' }} />
        <div className="modal__meta">
          <span className="modal__name">{item.place}</span>
          <span className="modal__when">{item.caption}</span>
        </div>
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

export default function AroundTheWorld() {
  const [openPhoto, setOpenPhoto] = useState(null);
  const [activeId, setActiveId] = useState(null);
  return (
    <>
      <SiteNav />
      <PageHead />
      <div className="locator locator--split">
        <GlobePanel onOpenPhoto={setOpenPhoto} activeId={activeId} />
        <WorldList activeId={activeId} setActiveId={setActiveId} onOpenPhoto={setOpenPhoto} />
      </div>
      <SiteFooter />
      <PhotoModal item={openPhoto} onClose={() => setOpenPhoto(null)} />
    </>
  );
}

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from './pages/public/PublicLayout.jsx';
import Homepage from './pages/public/Homepage.jsx';
import Productie from './pages/public/Productie.jsx';
import Contact from './pages/public/Contact.jsx';
import Bestelformulier from './pages/public/Bestelformulier.jsx';
import Reviews from './pages/public/Reviews.jsx';
import Welkom from './pages/public/Welkom.jsx';
import SiroopBestellen from './pages/public/SiroopBestellen.jsx';
import AlgemeneVoorwaarden from './pages/public/AlgemeneVoorwaarden.jsx';
import PrivacyStatement from './pages/public/PrivacyStatement.jsx';
import AroundTheWorld from './pages/public/AroundTheWorld.jsx';

// Lazy geladen: bevat mapbox-gl, een zware library die alleen nodig is
// op deze pagina — niet meesturen in het hoofdbundle van de site.
const WinkelsEnRestaurants = lazy(() => import('./pages/public/WinkelsEnRestaurants.jsx'));

// Fallback tijdens het laden van die mapbox-gl-chunk: zonder dit voelt de
// pagina aan alsof de site vastloopt (leeg wit scherm terwijl er wordt gewacht).
function RouteLoading() {
  return (
    <div style={{
      minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--warm-wit)', color: 'var(--olijf-zwart)',
    }}>
      <style>{'@keyframes sappie-spin { to { transform: rotate(360deg); } }'}</style>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 32, height: 32, margin: '0 auto 16px',
          border: '3px solid var(--ink-16)', borderTopColor: 'var(--citroengeel)',
          borderRadius: '50%', animation: 'sappie-spin 0.8s linear infinite',
        }} />
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: '0.8125rem', fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0,
        }}>
          Even geduld&hellip;
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/productie" element={<Productie />} />
          <Route path="/winkels-en-restaurants" element={<Suspense fallback={null}><WinkelsEnRestaurants /></Suspense>} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bestellen" element={<Bestelformulier />} />
          {/* Deze URL staat op een fysieke QR-code van de oude website — moet exact kloppen. */}
          <Route path="/welkom-bij-sappie" element={<Welkom />} />
          {/* Vorige interne route: laten doorverwijzen i.p.v. verwijderen. */}
          <Route path="/welkom" element={<Navigate to="/welkom-bij-sappie" replace />} />
          <Route path="/siroop-bestellen" element={<SiroopBestellen />} />
          <Route path="/algemene-voorwaarden" element={<AlgemeneVoorwaarden />} />
          <Route path="/privacy-statement" element={<PrivacyStatement />} />
          <Route path="/around-the-world" element={<AroundTheWorld />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

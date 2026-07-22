import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from './pages/public/PublicLayout.jsx';
import Homepage from './pages/public/Homepage.jsx';
import Productie from './pages/public/Productie.jsx';
import Contact from './pages/public/Contact.jsx';
import Bestelformulier from './pages/public/Bestelformulier.jsx';
import Reviews from './pages/public/Reviews.jsx';
import Welkom from './pages/public/Welkom.jsx';
import SiroopBestellen from './pages/public/SiroopBestellen.jsx';

// Lazy geladen: bevat mapbox-gl, een zware library die alleen nodig is
// op deze ene pagina — niet meesturen in het hoofdbundle van de site.
const WinkelsEnRestaurants = lazy(() => import('./pages/public/WinkelsEnRestaurants.jsx'));

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
          <Route path="/welkom" element={<Welkom />} />
          <Route path="/siroop-bestellen" element={<SiroopBestellen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

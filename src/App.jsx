import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from './pages/public/PublicLayout.jsx';
import Homepage from './pages/public/Homepage.jsx';
import Productie from './pages/public/Productie.jsx';
import Contact from './pages/public/Contact.jsx';
import Bestelformulier from './pages/public/Bestelformulier.jsx';
import WinkelsEnRestaurants from './pages/public/WinkelsEnRestaurants.jsx';
import Reviews from './pages/public/Reviews.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/productie" element={<Productie />} />
          <Route path="/winkels-en-restaurants" element={<WinkelsEnRestaurants />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bestellen" element={<Bestelformulier />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

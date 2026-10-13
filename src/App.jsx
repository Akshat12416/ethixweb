import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import IndustriesPage from './pages/IndustriesPage';
import ServicesPage from './pages/ServicesPage';
import OurWorkPage from './pages/OurWorkPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/our-work" element={<OurWorkPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

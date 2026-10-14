import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { TransitionProvider } from './context/TransitionContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import IndustriesPage from './pages/IndustriesPage';
import ServicesPage from './pages/ServicesPage';
import OurWorkPage from './pages/OurWorkPage';
import ContactPage from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

function ScrollSync() {
  const location = useLocation();

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);

    // Refresh ScrollTrigger calculations after route rendering
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth momentum scrolling (matching akshatg-portfolio)
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    window.lenis = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <BrowserRouter>
      <TransitionProvider>
        <ScrollSync />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </TransitionProvider>
    </BrowserRouter>
  );
}

import React, { useState, useEffect, useRef } from 'react';
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
import './styles/landing.css';

gsap.registerPlugin(ScrollTrigger);

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isHomeTransitioning, setIsHomeTransitioning] = useState(false);
  const pendingLocation = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const isSameLocation =
      location.pathname === displayLocation.pathname &&
      location.search === displayLocation.search &&
      location.hash === displayLocation.hash;

    if (isSameLocation || isHomeTransitioning) return;

    const isReturningHome = location.pathname === '/' && displayLocation.pathname !== '/';

    if (!isReturningHome) {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
      setDisplayLocation(location);

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
      return () => clearTimeout(timer);
    }

    // Immediately reset scroll and Lenis to prevent offset when transitioning back to home
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);

    pendingLocation.current = location;
    setIsHomeTransitioning(true);
  }, [displayLocation, isHomeTransitioning, location]);

  useEffect(() => {
    if (!isHomeTransitioning || !overlayRef.current) return;

    const overlay = overlayRef.current;
    const chars = overlay.querySelectorAll('.home-transition-char');

    const revealHome = () => {
      sessionStorage.setItem('skipPreloader', 'true');
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
      setDisplayLocation(pendingLocation.current || location);
    };

    const tl = gsap.timeline({
      onComplete: () => {
        pendingLocation.current = null;
        setIsHomeTransitioning(false);
        gsap.set(overlay, { autoAlpha: 0, scaleY: 0, height: '16vh' });
      },
    });

    tl.set(overlay, {
      autoAlpha: 1,
      height: '16vh',
      scaleY: 0,
      y: 0,
      yPercent: -50,
      top: '50%',
      transformOrigin: 'center center',
    });

    tl.set(chars, {
      y: 60,
      opacity: 0,
      scale: 1,
      color: 'rgb(70, 70, 70)',
    });

    tl.to(
      overlay,
      {
        scaleY: 1,
        duration: 0.55,
        ease: 'power3.inOut',
      },
      0
    );

    tl.to(
      chars,
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.05,
        ease: 'power4.out',
      },
      0.12
    );

    tl.to(
      chars,
      {
        color: '#ffffff',
        scale: 1.1,
        duration: 0.45,
        ease: 'power3.inOut',
      },
      0.4
    );

    tl.to(
      overlay,
      {
        height: '100vh',
        duration: 0.9,
        ease: 'power3.inOut',
      },
      0.62
    );

    tl.add(revealHome, 1.55);

    tl.to(
      overlay,
      {
        height: '16vh',
        duration: 0.75,
        ease: 'power3.inOut',
      },
      1.65
    );

    tl.to(
      overlay,
      {
        scaleY: 0,
        duration: 0.45,
        ease: 'power3.inOut',
      },
      2.3
    );

    return () => tl.kill();
  }, [isHomeTransitioning, location]);

  return (
    <>
      <Routes location={displayLocation}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/our-work" element={<OurWorkPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <div className="home-transition-overlay" ref={overlayRef} aria-hidden="true">
        <div className="home-transition-text">
          {'Home'.split('').map((char, i) => (
            <span
              key={`home-${i}`}
              className="home-transition-char"
              style={{ '--char-index': i, '--char-total': 4 }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </>
  );
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
        <AnimatedRoutes />
      </TransitionProvider>
    </BrowserRouter>
  );
}

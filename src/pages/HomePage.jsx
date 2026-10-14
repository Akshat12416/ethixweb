import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { useTransition } from '../context/TransitionContext';
import InteractiveWeb from '../components/InteractiveWeb';
import '../styles/landing.css';

export default function HomePage() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [displayHover, setDisplayHover] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hasAnimated = useRef(false);
  const { navigateWithTransition, isTransitioning } = useTransition();

  useEffect(() => {
    if (hoveredItem && !isTransitioning) {
      setDisplayHover(hoveredItem);
    }
  }, [hoveredItem, isTransitioning]);

  // ── ENTRANCE ANIMATIONS (huyml.co / portfolio style) ──
  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;

      const tl = gsap.timeline({ delay: 0.05 });

      // 1. Giant Marquee Title — per-character curtain reveal with center-out wave
      tl.fromTo(
        '.hello-title-char',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.85,
          stagger: { each: 0.03, from: 'center' },
          ease: 'power4.out',
        },
        0
      );

      // 2. Top nav — slide down with fade
      tl.fromTo(
        '.landing-root .nav-left',
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        0.15
      );
      tl.fromTo(
        '.landing-root .nav-center',
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        0.2
      );
      tl.fromTo(
        '.landing-root .nav-right',
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        0.15
      );

      // 3. Bottom side texts — split from center outward
      tl.fromTo(
        '.person-col2-left',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
        0.25
      );
      tl.fromTo(
        '.person-col2-right',
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
        0.25
      );

      // 4. Nav row — slides up from below
      tl.fromTo(
        '.landing-root .nav-row',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        0.3
      );

      // 5. Bottom center spiderweb & tagline
      tl.fromTo(
        '.person-col-center',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        0.35
      );
    }
  }, []);

  const handleNavClick = (e, path, label) => {
    e.preventDefault();
    if (isTransitioning) return;
    setIsMobileMenuOpen(false);
    navigateWithTransition(path, label.toUpperCase());
  };

  return (
    <div className="landing-root">
      {/* ── TOP NAV (Matching Portfolio Layout) ── */}
      <header className="nav">
        <div className="nav-left">
          {/* Vector 8-pointed star matching portfolio asterisk */}
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 shrink-0 text-[#1c1c1c] stroke-[#1c1c1c]"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
            aria-hidden="true"
          >
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
          </svg>
          <span>
            DIGITAL OPERATIONS<br />
            FOR US TEAMS<br />
            &amp; FOUNDERS
          </span>
        </div>

        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="nav-center"
        >
          ETHIXWEB.COM
        </a>

        <div className="nav-right">
          USA LLC<br />
          VOL. 26
        </div>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          {isMobileMenuOpen ? <X size={32} strokeWidth={1.8} /> : <Menu size={36} strokeWidth={1.7} />}
        </button>
      </header>

      {/* ── MOBILE SLIDE-OUT MENU ── */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <button
          className="mobile-menu-scrim"
          type="button"
          aria-label="Close navigation menu"
          tabIndex={isMobileMenuOpen ? 0 : -1}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="mobile-menu-panel">
          <div className="mobile-menu-header">
            <span>MENU</span>
            <button
              className="mobile-menu-close"
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={30} strokeWidth={1.8} />
            </button>
          </div>
          <a href="/our-work" onClick={(e) => handleNavClick(e, '/our-work', 'Work')}>
            <span>01</span> {/* taste-skill-ignore */}
            Work
          </a>
          <a href="/services" onClick={(e) => handleNavClick(e, '/services', 'Services')}>
            <span>02</span> {/* taste-skill-ignore */}
            Services
          </a>
          <a href="/industries" onClick={(e) => handleNavClick(e, '/industries', 'Industries')}>
            <span>03</span> {/* taste-skill-ignore */}
            Industries
          </a>
          <a href="/about" onClick={(e) => handleNavClick(e, '/about', 'About')}>
            <span>04</span> {/* taste-skill-ignore */}
            About
          </a>
          <a href="/contact" onClick={(e) => handleNavClick(e, '/contact', 'Contact')}>
            <span>05</span> {/* taste-skill-ignore */}
            Contact
          </a>
          <p>©2026 Ethixweb USA LLC</p>
        </div>
      </div>

      {/* ── GIANT HERO TITLE MARQUEE (Matching Akshat Gour(DEV)) ── */}
      <section className="hello">
        <h1 className="hello-title">
          {/* "Ethix" in Roxborough CF Italic */}
          {'Ethix'.split('').map((char, i, arr) => (
            <span
              className={`hello-title-mask${i === arr.length - 1 ? ' hello-title-mask-space' : ''}`}
              key={`e-${i}`}
            >
              <span className="hello-title-char font-sec">{char}</span>
            </span>
          ))}

          {/* "Web" in Roxborough CF Regular */}
          {'Web'.split('').map((char, i) => (
            <span className="hello-title-mask" key={`w-${i}`}>
              <span className="hello-title-char font-bold">{char}</span>
            </span>
          ))}

          {/* "(OPS)" badge in Roobert superscript */}
          <span className="hello-title-mask hello-title-mask-badge">
            <span className="hello-title-char badge">(OPS)</span>
          </span>
        </h1>
      </section>

      {/* ── NUMBERED NAV ROW WITH FULL-WIDTH HOVER BANNER ── */}
      <nav
        data-ui="nav"
        className={`nav-row ${hoveredItem || isTransitioning ? 'has-hover' : ''}`}
        onMouseLeave={() => {
          if (!isTransitioning) setHoveredItem(null);
        }}
      >
        <div className={`nav-hover-banner ${hoveredItem || isTransitioning ? 'active' : ''}`}>
          <div className="nav-hover-text">
            {displayHover &&
              displayHover.split('').map((char, i) => (
                <span
                  key={`${displayHover}-${i}`}
                  className="hover-char"
                  style={{ '--char-index': i, '--char-total': displayHover.length }}
                >
                  {char}
                </span>
              ))}
          </div>
        </div>

        <a
          className="nav-row-item"
          href="/our-work"
          onClick={(e) => handleNavClick(e, '/our-work', 'Work')}
          onMouseEnter={() => {
            if (!isTransitioning) setHoveredItem('Work');
          }}
        >
          <span className="num">01</span> {/* taste-skill-ignore */}
          <span className="label">Work</span>
        </a>

        <a
          className="nav-row-item"
          href="/services"
          onClick={(e) => handleNavClick(e, '/services', 'Services')}
          onMouseEnter={() => {
            if (!isTransitioning) setHoveredItem('Services');
          }}
        >
          <span className="num">02</span> {/* taste-skill-ignore */}
          <span className="label">Services</span>
        </a>

        <a
          className="nav-row-item"
          href="/industries"
          onClick={(e) => handleNavClick(e, '/industries', 'Industries')}
          onMouseEnter={() => {
            if (!isTransitioning) setHoveredItem('Industries');
          }}
        >
          <span className="num">03</span> {/* taste-skill-ignore */}
          <span className="label">Industries</span>
        </a>

        <a
          className="nav-row-item"
          href="/about"
          onClick={(e) => handleNavClick(e, '/about', 'About')}
          onMouseEnter={() => {
            if (!isTransitioning) setHoveredItem('About');
          }}
        >
          <span className="num">04</span> {/* taste-skill-ignore */}
          <span className="label">About</span>
        </a>

        <a
          className="nav-row-item"
          href="/contact"
          onClick={(e) => handleNavClick(e, '/contact', 'Contact')}
          onMouseEnter={() => {
            if (!isTransitioning) setHoveredItem('Contact');
          }}
        >
          <span className="num">05</span> {/* taste-skill-ignore */}
          <span className="label">Contact</span>
        </a>

        <div className="nav-row-item copyright">
          ©2026
        </div>
      </nav>

      {/* ── BOTTOM THREE-COLUMN TIER: LEFT STATEMENT, CENTER WEB, RIGHT STATEMENT ── */}
      <footer className="person-wrap">
        {/* LEFT COLUMN */}
        <div className="person-col2 person-col2-left">
          {/* Vector 4-point sparkle matching portfolio star */}
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 mb-8 text-[#1c1c1c] fill-current"
            aria-hidden="true"
          >
            <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
          </svg>
          <p className="person-copy">
            ETHIXWEB IS A SENIOR-LED<br />
            DIGITAL OPERATIONS AGENCY<br />
            FROM KENT, WA.
          </p>
        </div>

        {/* CENTER COLUMN: INTERACTIVE SPIDERWEB NETWORK (Replaces Retro Computer) */}
        <div className="person-col-center">
          <InteractiveWeb />
          <p className="tagline">WE RUN THE TECH. YOU RUN THE BUSINESS.</p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="person-col2 person-col2-right">
          {/* Vector 4-point sparkle matching portfolio star */}
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 mb-8 text-[#1c1c1c] fill-current"
            aria-hidden="true"
          >
            <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
          </svg>
          <p className="person-copy">
            DELIVERING HEADLESS CLOUD<br />
            PLATFORMS, AI BOOKINGS AND<br />
            DIRECT REVENUE SYSTEMS.
          </p>
        </div>
      </footer>
    </div>
  );
}

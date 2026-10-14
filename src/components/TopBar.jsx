import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTransition } from '../context/TransitionContext';
import '../styles/landing.css';

/**
 * Shared top bar across all pages matching akshatg-portfolio.
 * Features 3-part layout: Left info, Center branding, Right volume tag.
 * The numbered navbar is rendered via MiddleNav at its original center position.
 */
export default function TopBar({ className = '' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { navigateWithTransition } = useTransition();

  const navLinks = [
    { label: 'Work', to: '/our-work' },
    { label: 'Services', to: '/services' },
    { label: 'Industries', to: '/industries' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: false });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    navigate('/');
  };

  const handleMobileNavClick = (e, to) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname === to) return;
    navigateWithTransition(to);
  };

  return (
    <>
      <header className={`nav ${className}`}>
        {/* LEFT */}
        <div className="nav-left">
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

        {/* CENTER */}
        <a
          href="/"
          onClick={handleHomeClick}
          className="nav-center cursor-pointer"
        >
          ETHIXWEB.COM
        </a>

        {/* RIGHT */}
        <div className="nav-right">
          USA LLC<br />
          VOL. 26
        </div>

        {/* MOBILE TOGGLE (Visible only on mobile viewports < 768px) */}
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={32} strokeWidth={1.8} /> : <Menu size={36} strokeWidth={1.7} />}
        </button>
      </header>

      {/* MOBILE FLYOUT MENU */}
      <div className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
        <div
          className="mobile-menu-scrim"
          onClick={() => setMobileOpen(false)}
        />
        <div className="mobile-menu-panel">
          <div className="mobile-menu-header">
            <span>NAVIGATION</span>
            <button
              className="mobile-menu-close"
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMobileOpen(false)}
            >
              <X size={28} strokeWidth={1.8} />
            </button>
          </div>
          {navLinks.map((item, idx) => (
            <a
              key={item.to}
              href={item.to}
              onClick={(e) => handleMobileNavClick(e, item.to)}
            >
              <span>{`0${idx + 1}`}</span>
              {item.label}
            </a>
          ))}
          <p>©2026 Ethixweb USA LLC</p>
        </div>
      </div>
    </>
  );
}

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import emblemImg from '../assets/emblem-64w.webp';
import { useTransition } from '../context/TransitionContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import '../styles/landing.css';

/**
 * Shared top bar across all pages.
 * Features 3-part layout: Left info, Center branding, Right edition & Language Switcher.
 */
export default function TopBar({ className = '' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { navigateWithTransition } = useTransition();
  const { lang, t } = useLanguage();

  const navLinks = [
    { label: t('navWork', 'Work'), to: '/our-work', code: 'WORK' },
    { label: t('navServices', 'Services'), to: '/services', code: 'SERVICES' },
    { label: t('navIndustries', 'Industries'), to: '/industries', code: 'INDUSTRIES' },
    { label: t('navAbout', 'About'), to: '/about', code: 'ABOUT' },
    { label: t('navContact', 'Contact'), to: '/contact', code: 'CONTACT' },
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

  const handleMobileNavClick = (e, to, code) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname === to) return;
    navigateWithTransition(to, code);
  };

  return (
    <>
      <header className={`nav ${className}`}>
        {/* LEFT */}
        <div className="nav-left flex items-center gap-2.5">
          <img src={emblemImg} alt="Ethixweb" className="w-6 h-6 object-contain shrink-0" />
          <span className="leading-tight">
            {lang === 'hi' ? (
              <>
                डिजिटल ऑपरेशंस<br />
                फाउंडर्स एवं टीमों<br />
                के लिए
              </>
            ) : (
              <>
                DIGITAL OPERATIONS<br />
                FOR FOUNDERS<br />
                &amp; US TEAMS
              </>
            )}
          </span>
        </div>

        {/* CENTER */}
        <a
          href="/"
          onClick={handleHomeClick}
          className="nav-center cursor-pointer flex items-center gap-2"
        >
          <img src={emblemImg} alt="Ethixweb" className="w-5 h-5 object-contain inline-block md:hidden shrink-0" />
          <span>{lang === 'hi' ? 'ETHIXWEB.COM' : 'ETHIXWEB.COM'}</span>
        </a>

        {/* RIGHT */}
        <div className="nav-right flex items-center gap-3.5">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <div className="text-right">
            {lang === 'hi' ? 'यूएसए एलएलसी' : 'USA LLC'}<br />
            {t('volTag', 'VOL. 26')}
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex items-center gap-2 sm:hidden">
          <LanguageSwitcher />
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} strokeWidth={1.8} /> : <Menu size={30} strokeWidth={1.7} />}
          </button>
        </div>
      </header>

      {/* MOBILE FLYOUT MENU */}
      <div className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
        <div
          className="mobile-menu-scrim"
          onClick={() => setMobileOpen(false)}
        />
        <div className="mobile-menu-panel">
          <div className="mobile-menu-header flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span>{lang === 'hi' ? 'नेविगेशन' : 'NAVIGATION'}</span>
              <LanguageSwitcher />
            </div>
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
              onClick={(e) => handleMobileNavClick(e, item.to, item.code)}
            >
              <span>{`0${idx + 1}`}</span>
              {item.label}
            </a>
          ))}
          <p>©2026 Ethixweb USA LLC · Kent, WA &amp; Bangalore</p>
        </div>
      </div>
    </>
  );
}

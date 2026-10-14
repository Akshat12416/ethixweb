import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import '../styles/landing.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared middle navigation menu with interactive hover banner.
 * Fixed in the original center position (top: 50%) across all destination pages.
 * Fades out smoothly on scroll down and reappears on scroll up or at top.
 */
export default function MiddleNav({ className = '' }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [displayHover, setDisplayHover] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, t } = useLanguage();

  const items = [
    { num: '01', path: '/our-work', label: t('navWork', 'Work'), hover: 'WORK' },
    { num: '02', path: '/services', label: t('navServices', 'Services'), hover: 'SERVICES' },
    { num: '03', path: '/industries', label: t('navIndustries', 'Industries'), hover: 'INDUSTRIES' },
    { num: '04', path: '/about', label: t('navAbout', 'About'), hover: 'ABOUT' },
    { num: '05', path: '/contact', label: t('navContact', 'Contact'), hover: 'CONTACT' },
  ];

  useEffect(() => {
    if (hoveredItem && !isTransitioning) {
      setDisplayHover(hoveredItem);
    }
  }, [hoveredItem, isTransitioning]);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (self.direction === 1 && self.scroll() > 50) {
            gsap.to('.middle-nav-container', { opacity: 0, duration: 0.3, pointerEvents: 'none' });
          } else if (self.direction === -1 || self.scroll() <= 50) {
            gsap.to('.middle-nav-container', { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e, path, hoverLabel) => {
    e.preventDefault();
    if (isTransitioning || location.pathname === path) return;
    setIsTransitioning(true);
    if (hoverLabel) setDisplayHover(hoverLabel);

    const containerSelector = className ? `.${className.split(' ')[0]}` : '.middle-nav-container';
    const banner = document.querySelector(`${containerSelector} .nav-hover-banner`) || document.querySelector('.nav-hover-banner');

    if (banner) {
      banner.classList.add('is-transitioning');
      gsap.to(banner, {
        height: '100vh',
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          sessionStorage.setItem('showCurtain', 'true');
          navigate(path);
        },
      });

      gsap.to(`${containerSelector} .hover-char`, {
        color: '#ffffff',
        scale: 1.1,
        duration: 0.8,
        ease: 'power3.inOut',
      });
    } else {
      sessionStorage.setItem('showCurtain', 'true');
      navigate(path);
    }
  };

  return (
    <div className={`middle-nav-container ${isTransitioning ? 'is-transitioning' : ''} ${className}`}>
      <nav
        data-ui="nav"
        className={`nav-row ${hoveredItem || isTransitioning ? 'has-hover' : ''} ${isTransitioning ? 'is-transitioning' : ''}`}
        onMouseLeave={() => {
          if (!isTransitioning) setHoveredItem(null);
        }}
      >
        <div className={`nav-hover-banner ${hoveredItem || isTransitioning ? 'active' : ''} ${isTransitioning ? 'is-transitioning' : ''}`}>
          <div className="nav-hover-text font-display">
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

        {items.map((it) => (
          <a
            key={it.path}
            className="nav-row-item"
            href={it.path}
            onClick={(e) => handleNavClick(e, it.path, it.hover)}
            onMouseEnter={() => setHoveredItem(it.hover)}
          >
            <span className="num">{it.num}</span>
            <span className="label">{it.label}</span>
          </a>
        ))}

        <div className="nav-row-item copyright">
          ©2026
        </div>
      </nav>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

  useEffect(() => {
    if (hoveredItem && !isTransitioning) {
      setDisplayHover(hoveredItem);
    }
  }, [hoveredItem, isTransitioning]);

  // Smooth scroll listener via GSAP ScrollTrigger to hide MiddleNav on scroll down, show on scroll up
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

  const handleNavClick = (e, path, label) => {
    e.preventDefault();
    if (isTransitioning || location.pathname === path) return;
    setIsTransitioning(true);
    if (label) setDisplayHover(label);

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
          onMouseEnter={() => setHoveredItem('Work')}
        >
          <span className="num">01</span> {/* taste-skill-ignore */}
          <span className="label">Work</span>
        </a>

        <a
          className="nav-row-item"
          href="/services"
          onClick={(e) => handleNavClick(e, '/services', 'Services')}
          onMouseEnter={() => setHoveredItem('Services')}
        >
          <span className="num">02</span> {/* taste-skill-ignore */}
          <span className="label">Services</span>
        </a>

        <a
          className="nav-row-item"
          href="/industries"
          onClick={(e) => handleNavClick(e, '/industries', 'Industries')}
          onMouseEnter={() => setHoveredItem('Industries')}
        >
          <span className="num">03</span> {/* taste-skill-ignore */}
          <span className="label">Industries</span>
        </a>

        <a
          className="nav-row-item"
          href="/about"
          onClick={(e) => handleNavClick(e, '/about', 'About')}
          onMouseEnter={() => setHoveredItem('About')}
        >
          <span className="num">04</span> {/* taste-skill-ignore */}
          <span className="label">About</span>
        </a>

        <a
          className="nav-row-item"
          href="/contact"
          onClick={(e) => handleNavClick(e, '/contact', 'Contact')}
          onMouseEnter={() => setHoveredItem('Contact')}
        >
          <span className="num">05</span> {/* taste-skill-ignore */}
          <span className="label">Contact</span>
        </a>

        <div className="nav-row-item copyright">
          ©2026
        </div>
      </nav>
    </div>
  );
}

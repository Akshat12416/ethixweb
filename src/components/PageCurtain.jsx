import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/landing.css';

/**
 * Destination page shutter closing animation matching portfolio.
 * The black shutters start at 100vh (fullscreen black seamlessly connected from the opening page),
 * then close vertically inward down to the 16vh center strip, and collapse scaleY: 0
 * into the middle nav row, exactly mirroring how they opened on the home page.
 */
export default function PageCurtain() {
  const curtainRef = useRef(null);
  const isTransition = typeof window !== 'undefined' && sessionStorage.getItem('showCurtain') === 'true';

  useEffect(() => {
    if (!isTransition || !curtainRef.current) return;
    const el = curtainRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.removeItem('showCurtain');
          if (el) el.style.display = 'none';
        },
      });

      // Shutter starts fully covering the viewport in #0a0a0a
      tl.set(el, {
        height: '100vh',
        scaleY: 1,
        yPercent: -50,
        top: '50%',
        left: 0,
        width: '100vw',
        autoAlpha: 1,
        display: 'flex',
      });

      // 1. Shutters close vertically inward from 100vh down to the 16vh center strip
      tl.to(el, {
        height: '16vh',
        duration: 0.75,
        ease: 'power3.inOut',
      });

      // 2. Center strip collapses scaleY: 0 into the middle nav row
      tl.to(el, {
        scaleY: 0,
        duration: 0.45,
        ease: 'power3.inOut',
      });
    });

    return () => ctx.revert();
  }, [isTransition]);

  if (!isTransition) return null;

  return (
    <div
      ref={curtainRef}
      data-ui="page-curtain"
      className="page-transition-curtain"
      style={{
        position: 'fixed',
        top: '50%',
        left: 0,
        width: '100vw',
        height: '100vh',
        transform: 'translateY(-50%)',
        transformOrigin: 'center center',
        backgroundColor: '#0a0a0a',
        zIndex: 99999,
        display: 'flex',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

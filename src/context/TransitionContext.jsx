import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState('');
  const overlayRef = useRef(null);
  const textCharsRef = useRef(null);

  const navigateWithTransition = useCallback((targetPath, label) => {
    // If already on the same path or currently transitioning, ignore
    if (location.pathname === targetPath || isTransitioning) return;

    const overlay = overlayRef.current;
    if (!overlay) {
      navigate(targetPath);
      return;
    }

    const displayText = label || (
      targetPath === '/' ? 'HOME' :
      targetPath === '/about' ? 'ABOUT' :
      targetPath === '/industries' ? 'INDUSTRIES' :
      targetPath === '/services' ? 'SERVICES' :
      targetPath === '/our-work' ? 'WORK' :
      targetPath === '/contact' ? 'CONTACT' : 'ETHIXWEB'
    );

    setTransitionText(displayText);
    setIsTransitioning(true);

    // GSAP Timeline matching akshatg-portfolio transition
    const chars = overlay.querySelectorAll('.transition-char');

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        gsap.set(overlay, { autoAlpha: 0 });
      },
    });

    // Initial setup: center bar 16vh, zero vertical scale
    tl.set(overlay, {
      autoAlpha: 1,
      height: '16vh',
      scaleY: 0,
      transformOrigin: 'center center',
    });

    tl.set(chars, {
      y: 50,
      opacity: 0,
      scale: 1,
      color: 'rgb(80, 80, 80)',
    });

    // Phase 1: Reveal center bar
    tl.to(overlay, {
      scaleY: 1,
      duration: 0.45,
      ease: 'power3.inOut',
    }, 0);

    // Phase 2: Stagger in characters from below
    tl.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.04,
      ease: 'power4.out',
    }, 0.1);

    // Phase 3: Characters illuminate and scale subtly
    tl.to(chars, {
      color: '#ffffff',
      scale: 1.06,
      duration: 0.35,
      ease: 'power3.inOut',
    }, 0.35);

    // Phase 4: Expand banner to full screen height
    tl.to(overlay, {
      height: '100vh',
      duration: 0.65,
      ease: 'power3.inOut',
    }, 0.48);

    // Phase 5: Swap route and reset scroll
    tl.add(() => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
      navigate(targetPath);
    }, 1.15);

    // Phase 6: Slide out / collapse smoothly upwards
    tl.to(overlay, {
      height: '0vh',
      duration: 0.6,
      ease: 'power4.inOut',
    }, 1.3);

  }, [isTransitioning, location.pathname, navigate]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}

      {/* Cinematic Fullscreen Expanding Transition Overlay */}
      <div
        ref={overlayRef}
        data-ui="page-transition"
        className="page-transition-overlay"
        aria-hidden={!isTransitioning}
        style={{
          position: 'fixed',
          top: '50%',
          left: 0,
          width: '100vw',
          height: '16vh',
          backgroundColor: '#1c1c1c',
          transform: 'translateY(-50%) scaleY(0)',
          transformOrigin: 'center center',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          pointerEvents: isTransitioning ? 'auto' : 'none',
          visibility: 'hidden',
        }}
      >
        <div
          ref={textCharsRef}
          className="page-transition-text"
          style={{
            fontFamily: '"Harmond", serif',
            fontStyle: 'normal',
            fontSize: 'clamp(2.8rem, 8.5vw, 8rem)',
            fontWeight: 400,
            color: 'rgb(80, 80, 80)',
            whiteSpace: 'nowrap',
            lineHeight: 1,
            letterSpacing: '0.04em',
            marginTop: '2vh',
            userSelect: 'none',
          }}
        >
          {transitionText.split('').map((char, i) => (
            <span
              key={`${transitionText}-${i}`}
              className="transition-char"
              style={{
                display: 'inline-block',
                opacity: 0,
                transform: 'translateY(50px)',
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}

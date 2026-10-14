import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook providing GSAP ScrollTrigger animations matching akshatg-portfolio:
 * 1. Scroll-triggered element reveals with smooth easing
 * 2. Parallax float on image and case-study containers
 * 3. Scroll-direction aware TopBar hiding/revealing
 */
export function useScrollAnimations(containerRef) {
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    let ctx;
    let refreshTimer;

    const setupAnimations = () => {
      ctx = gsap.context(() => {
        // 1. Reveal animations for data-rise elements that enter the viewport
        const riseElements = gsap.utils.toArray('[data-rise]');
        riseElements.forEach((el) => {
          // Only attach ScrollTrigger if element starts below the initial fold
          const rect = el.getBoundingClientRect();
          if (rect.top > window.innerHeight * 0.85) {
            gsap.fromTo(
              el,
              { y: 35, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.85,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 88%',
                  once: true,
                },
              }
            );
          }
        });

        // 2. Parallax on case-study images
        const parallaxImages = gsap.utils.toArray('.parallax-image, [data-parallax]');
        parallaxImages.forEach((img) => {
          gsap.to(img, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement || img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          });
        });

        // 3. Stage Curtain Wipe Reveal on elements with [data-curtain] (matching portfolio curtain effect)
        const curtainElements = gsap.utils.toArray('[data-curtain]');
        curtainElements.forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(100% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.1,
              ease: 'power4.inOut',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
              },
            }
          );
        });

        // 4. Scroll direction aware TopBar
        const topBar = document.querySelector('header');
        if (topBar) {
          ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => {
              if (self.direction === 1 && self.scroll() > 120) {
                // Scrolling down: subtle slide-up
                gsap.to(topBar, {
                  y: -10,
                  opacity: 0.4,
                  duration: 0.35,
                  ease: 'power2.out',
                });
              } else if (self.direction === -1) {
                // Scrolling up: restore
                gsap.to(topBar, {
                  y: 0,
                  opacity: 1,
                  duration: 0.35,
                  ease: 'power2.out',
                });
              }
            },
          });
        }
      }, containerRef);

      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };

    // Defer animations initialization to idle callback so initial paint has absolute priority
    const idleId =
      typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback(setupAnimations, { timeout: 1200 })
        : setTimeout(setupAnimations, 250);

    return () => {
      if (typeof cancelIdleCallback !== 'undefined') {
        cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
      if (refreshTimer) clearTimeout(refreshTimer);
      if (ctx) ctx.revert();
    };
  }, [containerRef]);
}

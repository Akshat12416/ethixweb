import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGsap } from '../utils/gsapLoader';
import {
  Menu,
  X,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Star,
  ExternalLink,
  Plus,
  Volume2,
  Activity,
  ShieldCheck,
  Zap,
  Check,
} from 'lucide-react';
import InteractiveWeb from '../components/InteractiveWeb';
import emblemImg from '../assets/emblem-64w.webp';
import { useScrollAnimations } from '../hooks/useScrollAnimations';
import '../styles/landing.css';

const HOME_SERVICES = [
  {
    num: '01',
    title: 'AI Voice & Booking Agents',
    titleHighlight: 'Autonomous 24/7',
    kicker: 'AI Telephony & CRM Dispatch',
    headline: 'Zero missed calls. Direct appointment booking into ServiceTitan & HubSpot.',
    desc: 'Our conversational voice and chat agents qualify emergency inquiries, capture caller intent in natural dialogue, verify service addresses, and book directly onto your team calendar without human friction.',
    metrics: [
      { label: 'Missed Calls', val: '0' },
      { label: 'Response SLA', val: '<800ms' },
      { label: 'Booking Sync', val: '100%' },
    ],
    stack: ['Twilio Voice', 'ServiceTitan', 'HubSpot CRM', 'Instant SMS Auto-Dispatch'],
  },
  {
    num: '02',
    title: 'Headless Web Platforms',
    titleHighlight: 'Engineered in React',
    kicker: 'Sub-Second Infrastructure',
    headline: 'Engineered in React and TypeScript. No WordPress templates or fragile plugins.',
    desc: 'Bespoke web architecture engineered for sub-second page loads, accessible UI systems, and zero security vulnerabilities. We build custom frontends that turn search and paid ad traffic into signed contracts.',
    metrics: [
      { label: 'Lighthouse Score', val: '100/100' },
      { label: 'LCP Speed', val: '<0.9s' },
      { label: 'Code Ownership', val: '100%' },
    ],
    stack: ['Next.js & React 19', 'Tailwind CSS', 'GSAP & Lenis', 'Global Edge CDN'],
  },
  {
    num: '03',
    title: 'Precision Search & Ads',
    titleHighlight: 'Direct Revenue Engine',
    kicker: 'Closed-Loop Acquisition',
    headline: 'Local Google Maps pack, Google Guaranteed LSA, and targeted Meta campaigns.',
    desc: 'Compounding organic search authority and high-converting paid search funnels connected directly into lead scoring. We measure verified booked jobs and direct revenue, not vanity impressions.',
    metrics: [
      { label: 'Average ROI', val: '2.4x' },
      { label: 'Organic Pipeline', val: '+140%' },
      { label: 'Reporting', val: 'Weekly' },
    ],
    stack: ['Google Guaranteed LSA', 'Local Schema SEO', 'Meta Retargeting', 'Multi-Touch GA4'],
  },
  {
    num: '04',
    title: 'Mission-Critical CRM Pipelines',
    titleHighlight: 'Unified Data Workflows',
    kicker: 'Zero Data Friction',
    headline: 'Unifying phone lines, booking forms, and customer databases into one source of truth.',
    desc: 'Automating the entire lead journey. From first form fill or phone ring to dispatch notifications, automated SMS reminders, and post-service review sequences without manual data entry.',
    metrics: [
      { label: 'Webhook Latency', val: '<1s' },
      { label: 'Pipeline Uptime', val: '99.99%' },
      { label: 'Data Redundancy', val: 'Active' },
    ],
    stack: ['HubSpot & GoHighLevel', 'Jobber / ServiceTitan', 'Stripe Billing', 'Bi-Directional Webhooks'],
  },
];

const HOME_PROCESS = [
  {
    step: '01',
    phase: 'Audit & Teardown',
    timing: 'Week 1',
    headline: 'Uncover conversion leakage',
    desc: 'We inspect your current traffic, page speed, tracking holes, and lead drop-offs before writing a single line of code.',
    deliverable: 'Full teardown report & architectural blueprint',
  },
  {
    step: '02',
    phase: 'Scope & Architecture',
    timing: 'Week 1–2',
    headline: 'Approve clear priorities',
    desc: 'A fixed-scope written agreement with guaranteed delivery milestones, transparent pricing, and component specifications.',
    deliverable: 'Approved scope & technical specifications',
  },
  {
    step: '03',
    phase: 'High-Velocity Build',
    timing: 'Weeks 2–4',
    headline: 'Ship in weeks, not quarters',
    desc: 'Senior hands write clean code, configure AI agent reasoning, and wire CRM webhooks with continuous staging previews.',
    deliverable: 'Live headless platform & connected automations',
  },
  {
    step: '04',
    phase: '24/7 Monitored Ops',
    timing: 'Continuous',
    headline: 'Measure verified revenue',
    desc: 'Continuous uptime monitoring, sub-hour support SLAs, weekly revenue reconciliation, and regular AI knowledge updates.',
    deliverable: 'Live executive telemetry & direct Slack line',
  },
];

const HOME_FEATURED_WORK = [
  {
    id: 'all-phase-plumbing',
    client: 'All Phase Plumbing',
    location: 'Seattle Metro, WA',
    category: 'Full Platform Redesign & Local SEO Engine',
    metric: '+140%',
    metricLabel: 'Organic Booked Jobs',
    desc: 'Complete re-architecture of outdated web presence with high-converting mobile dispatch flows and localized service pages across King & Pierce counties.',
    tags: ['Headless Next.js', 'Local SEO', 'CRM Dispatch', 'Lighthouse 100'],
    image: '/images/case-studies/all-phase-plumbing/after-screenshot-1024w.webp',
  },
  {
    id: 'garys-pipeline',
    client: "Gary's Pipeline & Drain",
    location: 'Kent, WA',
    category: 'AI Voice Receptionist & Emergency Dispatch',
    metric: '0',
    metricLabel: 'Calls Missed After Hours',
    desc: 'Integrated intelligent AI voice agent to qualify emergency drain and flood inquiries, booking technician visits directly into ServiceTitan.',
    tags: ['Voice AI Agent', 'Twilio Telephony', 'ServiceTitan', 'Instant SMS'],
    image: '/images/case-studies/garys-pipeline/after-screenshot-1024w.webp',
  },
  {
    id: 'preventive-home',
    client: 'Preventive Home Solutions',
    location: 'Tacoma, WA',
    category: 'High-Ticket Funnels & Paid Acquisition',
    metric: '2.4x',
    metricLabel: 'Ad Spend ROI Multiplier',
    desc: 'Engineered high-intent landing funnels with qualification scoring, driving homeowners to high-ticket crawlspace and insulation upgrades.',
    tags: ['Conversion Funnels', 'Google Ads', 'Zapier Sync', 'Analytics GA4'],
    image: '/images/case-studies/preventive-home-solutions/after-screenshot-1024w.webp',
  },
];

const HOME_COMPARISON = [
  {
    topic: 'Who builds your systems',
    us: 'The senior engineers on your kickoff call',
    them: 'Junior grads learning behind an account manager',
  },
  {
    topic: 'Pricing transparency',
    us: 'Fixed scope agreed in writing upfront',
    them: 'Open-ended retainers and surprise billing',
  },
  {
    topic: 'Reported metrics',
    us: 'Direct phone calls, bookings, and verified revenue',
    them: 'Impressions, clicks, and vanity dashboards',
  },
  {
    topic: 'Speed to launch',
    us: '2 to 4 weeks to live production',
    them: 'A full quarter of discovery theater',
  },
  {
    topic: 'Technical support',
    us: 'Direct line to the builders (<1h response SLA)',
    them: 'Support ticket queues and message relays',
  },
];

const HOME_REVIEWS = [
  {
    quote: "Within that first year my business had doubled. The second year it doubled again... The folks at Ethixweb are very professional, schedule meetings via video when I need something fixed and are on top of it.",
    author: 'Ryan Taylor',
    role: 'Business Owner',
    source: 'Verified Trustpilot Review',
    rating: 5,
  },
  {
    quote: "Not only did they do it extremely professional, but they did it extremely fast and it came out fabulous... I would highly recommend this company to create your next website.",
    author: 'Clinton Mcculloch',
    role: 'General Contractor',
    source: 'Verified Trustpilot Review',
    rating: 5,
  },
  {
    quote: "Ethixweb did an incredible job on our business website. It is very sharp, modern looking and has all the extra bells and whistles we need. Great communication and done in efficient time.",
    author: 'Kayla Kjl',
    role: 'Healthcare Director',
    source: 'Verified Trustpilot Review',
    rating: 5,
  },
];

function DualClocks() {
  const [clocks, setClocks] = useState(() => {
    const now = new Date();
    return {
      seattle: now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
      bangalore: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setClocks({
        seattle: now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
        bangalore: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10 border-b border-white/10">
      <div className="flex items-center justify-between p-5 bg-white/[0.03] rounded-xl border border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-xl" role="img" aria-label="US Flag">🇺🇸</span>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">SEATTLE HQ (PACIFIC)</span>
            <span className="font-serif text-2xl font-normal text-white">{clocks.seattle}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ACTIVE</span>
        </div>
      </div>

      <div className="flex items-center justify-between p-5 bg-white/[0.03] rounded-xl border border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-xl" role="img" aria-label="India Flag">🇮🇳</span>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">BANGALORE HUB (IST)</span>
            <span className="font-serif text-2xl font-normal text-white">{clocks.bangalore}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CORE HUB</span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [displayHover, setDisplayHover] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPreloading, setIsPreloading] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 768;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const navigate = useNavigate();

  const hasAnimated = useRef(false);
  const webAnimTargetRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const landingRef = useRef(null);

  useScrollAnimations(landingRef);

  useEffect(() => {
    if (hoveredItem && !isTransitioning) {
      setDisplayHover(hoveredItem);
    }
  }, [hoveredItem, isTransitioning]);

  // ── ENTRANCE ANIMATIONS (huyml.co / portfolio style with preloader drop) ──
  useEffect(() => {
    // If returning from another page, skip preloader animation
    const shouldSkip = sessionStorage.getItem('skipPreloader') === 'true';
    if (shouldSkip) {
      sessionStorage.removeItem('skipPreloader');
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
      setIsPreloading(false);
      hasAnimated.current = true;

      const webEl = webAnimTargetRef.current;
      const leftColEl = leftColRef.current;
      const rightColEl = rightColRef.current;

      getGsap().then(({ gsap }) => {
        if (webEl) gsap.set(webEl, { y: 0 });
        if (leftColEl) gsap.set(leftColEl, { x: 0, y: 0, scale: 1, opacity: 1 });
        if (rightColEl) gsap.set(rightColEl, { x: 0, y: 0, scale: 1, opacity: 1 });

        gsap.set('.hello-title-char', { yPercent: 0 });
        gsap.set('.landing-root .nav-left, .landing-root .nav-center, .landing-root .nav-right', { opacity: 1, y: 0 });
        gsap.set('.landing-root .nav-row', { opacity: 1, y: 0, yPercent: -50 });
        gsap.set('.tagline', { opacity: 1 });
      });
      return;
    }

    if (!hasAnimated.current) {
      hasAnimated.current = true;

      const webEl = webAnimTargetRef.current;
      const leftColEl = leftColRef.current;
      const rightColEl = rightColRef.current;

      if (!webEl || !leftColEl || !rightColEl) return;

      const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768;

      if (!isDesktop) {
        // Fast-path mobile rendering: Skip preloader animation delay and stagger
        // Elements are already naturally styled and visible in CSS
        setIsPreloading(false);
        return;
      }

      // Compute geometric offsets for preloader centering and emergence
      const webRect = webEl.getBoundingClientRect();
      const viewportCenterY = window.innerHeight / 2;
      const webCenterY = webRect.top + webRect.height / 2;
      const deltaY = viewportCenterY - webCenterY;

      const webCenterX = webRect.left + webRect.width / 2;
      const leftRect = leftColEl.getBoundingClientRect();
      const rightRect = rightColEl.getBoundingClientRect();

      // Shift side columns behind the center web
      const leftOffsetX = isDesktop ? webCenterX - (leftRect.left + leftRect.width / 2) : 0;
      const rightOffsetX = isDesktop ? webCenterX - (rightRect.left + rightRect.width / 2) : 0;
      const initialY = isDesktop ? 0 : 25;

      getGsap().then(({ gsap }) => {
        // 1. Initial Preloader State:
        // Web is dead-centered vertically on the blank white canvas
        gsap.set(webEl, { y: deltaY });

        // Side columns start tucked directly behind the web with opacity 0
        gsap.set(leftColEl, { x: leftOffsetX, y: initialY, scale: 0.92, opacity: 0 });
        gsap.set(rightColEl, { x: rightOffsetX, y: initialY, scale: 0.92, opacity: 0 });

        // All other hero elements start hidden
        gsap.set('.hello-title-char', { yPercent: 110 });
        gsap.set('.landing-root .nav-left, .landing-root .nav-center, .landing-root .nav-right', { opacity: 0 });
        gsap.set('.landing-root .nav-row', { opacity: 0, yPercent: -50 });
        gsap.set('.tagline', { opacity: 0 });

        // 2. Preloader finishes after 1.0s, starting the fall and emergence choreography
        const PRELOADER_DURATION = 1.0;

        const tl = gsap.timeline({
          delay: PRELOADER_DURATION,
          onStart: () => {
            setIsPreloading(false);
          },
        });

        // 1. The web falls down to its current place in hero section
        tl.to(
          webEl,
          {
            y: 0,
            duration: 0.9,
            ease: 'power4.out',
          },
          0
        );

      // 2. Bottom left and right texts come from behind it moving to their respective places with a little fade in
      tl.to(
        leftColEl,
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
        },
        0.12
      );

      tl.to(
        rightColEl,
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
        },
        0.12
      );

      // 3. Tagline fades in below the web as it settles
      tl.to(
        '.tagline',
        {
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
        },
        0.45
      );

      // 4. REST ALL ANIMATIONS REMAIN EXACTLY THE SAME:
      // Giant Marquee Title — per-character curtain reveal with center-out wave
      tl.fromTo(
        '.hello-title-char',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.85,
          stagger: { each: 0.03, from: 'center' },
          ease: 'power4.out',
        },
        0.15
      );

      // Top nav — slide down with fade
      tl.fromTo(
        '.landing-root .nav-left',
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        0.25
      );
      tl.fromTo(
        '.landing-root .nav-center',
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        0.3
      );
      tl.fromTo(
        '.landing-root .nav-right',
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        0.25
      );

      // Nav row — slides up from below while maintaining vertical centering (yPercent: -50)
      tl.fromTo(
        '.landing-root .nav-row',
        { y: 30, yPercent: -50, opacity: 0 },
        { y: 0, yPercent: -50, opacity: 1, duration: 0.7, ease: 'power3.out' },
        0.35
      );
      });
    }
  }, []);

  const handleNavClick = (e, path, label) => {
    e.preventDefault();
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsMobileMenuOpen(false);

    if (label) setDisplayHover(label);

    const banner = document.querySelector('.nav-hover-banner');
    if (banner) {
      banner.classList.add('is-transitioning');
      getGsap().then(({ gsap }) => {
        gsap.to(banner, {
          height: '100vh',
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            sessionStorage.setItem('showCurtain', 'true');
            navigate(path);
          },
        });

        gsap.to('.hover-char', {
          color: '#ffffff',
          scale: 1.1,
          duration: 0.8,
          ease: 'power3.inOut',
        });
      });
    } else {
      sessionStorage.setItem('showCurtain', 'true');
      navigate(path);
    }
  };

  return (
    <div className={`landing-root ${isPreloading ? 'is-preloading' : ''}`}>
      {/* ── HERO VIEWPORT STAGE ── */}
      <div className="landing-hero-stage">
        {/* ── TOP NAV (Matching Portfolio Layout) ── */}
        <header className="nav">
        <div className="nav-left flex items-center gap-2.5">
          <img src={emblemImg} alt="Ethixweb" className="w-6 h-6 object-contain shrink-0" />
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
          className="nav-center flex items-center gap-2"
        >
          <img src={emblemImg} alt="Ethixweb" className="w-5 h-5 object-contain inline-block md:hidden shrink-0" />
          <span>ETHIXWEB.COM</span>
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
        className={`nav-row ${hoveredItem || isTransitioning ? 'has-hover' : ''} ${isTransitioning ? 'is-transitioning' : ''}`}
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
        <div ref={leftColRef} className="person-col2 person-col2-left">
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
          <div ref={webAnimTargetRef} className="web-anim-target w-full flex justify-center">
            <InteractiveWeb isPreloading={isPreloading} />
          </div>
          <p className="tagline">WE RUN THE TECH. YOU RUN THE BUSINESS.</p>
        </div>

        {/* RIGHT COLUMN */}
        <div ref={rightColRef} className="person-col2 person-col2-right">
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

      {/* ── RICH LANDING CONTENT BELOW HERO (Architectural Editorial System) ── */}
      <div className="landing-content" ref={landingRef}>
        {/* ── HIGH-ENERGY BRAND TICKER TAPE (Curtain Pull Header) ── */}
        <div className="landing-marquee-strip" aria-hidden="true">
          <div className="landing-marquee-track">
            <span>⚡ 24/7 AUTONOMOUS AI VOICE AGENTS</span>
            <span className="marquee-dot">✦</span>
            <span>&lt;800MS VOICE DISPATCH SLA</span>
            <span className="marquee-dot">✦</span>
            <span>100/100 LIGHTHOUSE CORE WEB VITALS</span>
            <span className="marquee-dot">✦</span>
            <span>100% PRODUCTION CODE OWNERSHIP</span>
            <span className="marquee-dot">✦</span>
            <span>ZERO VENDOR LOCK-IN</span>
            <span className="marquee-dot">✦</span>
            <span>SEATTLE HQ ⇄ BANGALORE DEV VELOCITY</span>
            <span className="marquee-dot">✦</span>
            <span>WYOMING LLC REGISTERED</span>
            <span className="marquee-dot">✦</span>
            <span>⚡ 24/7 AUTONOMOUS AI VOICE AGENTS</span>
            <span className="marquee-dot">✦</span>
            <span>&lt;800MS VOICE DISPATCH SLA</span>
            <span className="marquee-dot">✦</span>
            <span>100/100 LIGHTHOUSE CORE WEB VITALS</span>
            <span className="marquee-dot">✦</span>
            <span>100% PRODUCTION CODE OWNERSHIP</span>
            <span className="marquee-dot">✦</span>
            <span>ZERO VENDOR LOCK-IN</span>
            <span className="marquee-dot">✦</span>
            <span>SEATTLE HQ ⇄ BANGALORE DEV VELOCITY</span>
            <span className="marquee-dot">✦</span>
            <span>WYOMING LLC REGISTERED</span>
            <span className="marquee-dot">✦</span>
          </div>
        </div>

        {/* ── SECTION 1: EDITORIAL SERVICES & INTERACTIVE SIMULATORS ── */}
        <section id="services" className="editorial-section w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end" data-rise>
            <div className="lg:col-span-8 flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c0272d] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c0272d] animate-pulse" />
                01 / CORE CAPABILITIES &amp; OPERATIONS
              </span>
              <h2 className="font-display text-[32px] sm:text-[46px] md:text-[58px] font-normal text-[#1c1c1c] leading-[1.04] tracking-tight">
                Full-stack digital operations. <br />
                <span className="font-serif italic font-normal text-[#1c1c1c]">Senior-led execution.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 pb-2">
              <p className="text-sm md:text-base text-[#555555] leading-relaxed">
                We manage your complete digital footprint so you can focus on running your business. No layers of non-technical account reps—just senior engineers shipping production systems.
              </p>
            </div>
          </div>

          {/* Interactive Service Accordion Rows with Live Demonstrations */}
          <div className="flex flex-col w-full">
            {HOME_SERVICES.map((srv, idx) => {
              const isActive = activeService === idx;
              return (
                <div
                  key={srv.num}
                  className={`editorial-service-row ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveService(isActive ? -1 : idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveService(isActive ? -1 : idx);
                    }
                  }}
                  data-rise
                >
                  <div className="flex items-start md:items-center justify-between gap-4 py-2">
                    <div className="flex items-baseline gap-6 md:gap-10">
                      <span className="font-mono text-sm md:text-base font-semibold text-[#c0272d] tracking-wider">
                        {srv.num}
                      </span>
                      <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                        <h3 className="editorial-service-title">
                          {srv.title}
                        </h3>
                        <span className="font-serif italic text-lg sm:text-xl text-[#666666] font-normal">
                          — {srv.titleHighlight}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-wider text-[#777777] px-3 py-1 bg-black/[0.04] rounded-full">
                        {srv.kicker}
                      </span>
                      <div className="editorial-service-icon">
                        <Plus size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content Area with Interactive Live Simulators */}
                  <div
                    className="editorial-service-details"
                    style={{
                      maxHeight: isActive ? '900px' : '0px',
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <div className="pt-6 pb-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pl-0 md:pl-16">
                      {/* Left: Narrative & Stack */}
                      <div className="lg:col-span-6 flex flex-col gap-4">
                        <p className="font-serif italic text-lg md:text-xl text-[#222222] leading-snug">
                          {srv.headline}
                        </p>
                        <p className="text-sm md:text-base text-[#555555] leading-relaxed">
                          {srv.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {srv.stack.map((item) => (
                            <span
                              key={item}
                              className="font-mono text-xs px-3 py-1 bg-black/[0.04] border border-black/[0.06] rounded-md text-[#333333]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        {/* Metric Callouts */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#1c1c1c]/10 mt-2">
                          {srv.metrics.map((m) => (
                            <div key={m.label} className="flex flex-col">
                              <span className="font-serif italic text-3xl sm:text-4xl text-[#1c1c1c] font-normal leading-none mb-1">
                                {m.val}
                              </span>
                              <span className="font-mono text-[11px] uppercase tracking-wider text-[#c0272d] font-semibold">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Live Interactive Visual Simulator Card (Brings color and life) */}
                      <div className="lg:col-span-6">
                        {/* Simulator 01: AI Voice Receptionist */}
                        {srv.num === '01' && (
                          <div className="simulator-card bg-[#ffffff] border border-black/[0.08] rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
                            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1c1c1c]">
                                  Live Voice Telemetry
                                </span>
                              </div>
                              <span className="font-mono text-[11px] px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-medium">
                                Active · &lt;800ms SLA
                              </span>
                            </div>

                            {/* Live Audio Waveform Animation */}
                            <div className="flex items-center justify-between p-3 bg-[#fafafa] rounded-xl border border-black/[0.04]">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-[#c0272d]/10 flex items-center justify-center text-[#c0272d]">
                                  <Volume2 size={16} />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs font-mono font-bold text-[#1c1c1c]">206-555-0192 (Kent, WA)</span>
                                  <span className="text-[10px] text-[#777777]">Autonomous Voice Channel #1</span>
                                </div>
                              </div>
                              <div className="voice-audio-wave">
                                <span className="voice-wave-bar" style={{ animationDelay: '0.1s' }} />
                                <span className="voice-wave-bar" style={{ animationDelay: '0.35s' }} />
                                <span className="voice-wave-bar" style={{ animationDelay: '0.15s' }} />
                                <span className="voice-wave-bar" style={{ animationDelay: '0.5s' }} />
                                <span className="voice-wave-bar" style={{ animationDelay: '0.25s' }} />
                                <span className="voice-wave-bar" style={{ animationDelay: '0.4s' }} />
                                <span className="voice-wave-bar" style={{ animationDelay: '0.2s' }} />
                                <span className="voice-wave-bar" style={{ animationDelay: '0.45s' }} />
                              </div>
                            </div>

                            {/* Live Dialogue Card */}
                            <div className="flex flex-col gap-2 text-xs">
                              <div className="p-2.5 bg-neutral-100 rounded-lg text-[#333333]">
                                <span className="font-semibold text-[#1c1c1c] block text-[11px] font-mono mb-0.5">CALLER (HOMEOWNER)</span>
                                &ldquo;Our main pipe burst under the crawlspace, we need emergency dispatch today.&rdquo;
                              </div>
                              <div className="p-2.5 bg-[#c0272d]/5 border border-[#c0272d]/15 rounded-lg text-[#1c1c1c]">
                                <span className="font-semibold text-[#c0272d] block text-[11px] font-mono mb-0.5">ETHIX VOICE AGENT</span>
                                &ldquo;Understood. Priority technician arrival set for 11:30 AM today. Direct SMS sent.&rdquo;
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-black/[0.05] text-[11px] font-mono text-[#555555]">
                              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                                <CheckCircle2 size={13} className="text-emerald-600" />
                                Synced to ServiceTitan CRM
                              </span>
                              <span>340ms Latency</span>
                            </div>
                          </div>
                        )}

                        {/* Simulator 02: Headless Web Platform */}
                        {srv.num === '02' && (
                          <div className="simulator-card bg-[#ffffff] border border-black/[0.08] rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
                            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                              <div className="flex items-center gap-2">
                                <Activity size={16} className="text-emerald-600" />
                                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1c1c1c]">
                                  Core Web Vitals Benchmark
                                </span>
                              </div>
                              <span className="font-mono text-[11px] px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-medium">
                                100/100 Lighthouse
                              </span>
                            </div>

                            {/* Visual Score Grid */}
                            <div className="grid grid-cols-4 gap-2 text-center">
                              <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-xl flex flex-col items-center">
                                <span className="font-serif italic text-2xl text-emerald-700 font-semibold leading-none">100</span>
                                <span className="text-[10px] font-mono text-emerald-900 mt-1 uppercase font-semibold">Performance</span>
                              </div>
                              <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-xl flex flex-col items-center">
                                <span className="font-serif italic text-2xl text-emerald-700 font-semibold leading-none">0.68s</span>
                                <span className="text-[10px] font-mono text-emerald-900 mt-1 uppercase font-semibold">LCP Speed</span>
                              </div>
                              <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-xl flex flex-col items-center">
                                <span className="font-serif italic text-2xl text-emerald-700 font-semibold leading-none">0ms</span>
                                <span className="text-[10px] font-mono text-emerald-900 mt-1 uppercase font-semibold">TBT Blocking</span>
                              </div>
                              <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-xl flex flex-col items-center">
                                <span className="font-serif italic text-2xl text-emerald-700 font-semibold leading-none">100</span>
                                <span className="text-[10px] font-mono text-emerald-900 mt-1 uppercase font-semibold">SEO &amp; A11y</span>
                              </div>
                            </div>

                            <div className="p-3 bg-[#fafafa] rounded-xl border border-black/[0.04] flex items-center justify-between text-xs">
                              <span className="font-mono text-[#555555]">Zero Bloat Architecture</span>
                              <span className="font-mono font-semibold text-[#1c1c1c] bg-white px-2 py-1 rounded border border-black/[0.06]">
                                React 19 Edge · TypeScript · Global CDN
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Simulator 03: Precision Search & Ads */}
                        {srv.num === '03' && (
                          <div className="simulator-card bg-[#ffffff] border border-black/[0.08] rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
                            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                              <div className="flex items-center gap-2">
                                <ShieldCheck size={16} className="text-blue-600" />
                                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1c1c1c]">
                                  Closed-Loop Acquisition
                                </span>
                              </div>
                              <span className="font-mono text-[11px] px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded font-medium">
                                Google Guaranteed ✓
                              </span>
                            </div>

                            <div className="p-3 bg-gradient-to-r from-blue-50/60 to-indigo-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-xs font-mono font-bold text-blue-900">Seattle Metro 3-Pack</span>
                                <div className="flex items-center gap-1 text-amber-500 mt-0.5 text-xs">
                                  <span>★★★★★</span>
                                  <span className="text-[#333333] font-semibold text-[11px] font-mono ml-1">Rank #1 Organically</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="font-serif italic text-2xl text-[#1c1c1c] font-semibold leading-none">2.4x</span>
                                <span className="block text-[10px] font-mono text-[#c0272d] font-bold uppercase">ROI Multiplier</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                              <div className="p-2 bg-neutral-50 rounded-lg border border-black/[0.04]">
                                <span className="block font-bold text-[#1c1c1c]">1,420</span>
                                <span className="text-[10px] font-mono text-[#777777]">Paid Clicks</span>
                              </div>
                              <div className="p-2 bg-neutral-50 rounded-lg border border-black/[0.04]">
                                <span className="block font-bold text-[#1c1c1c]">318</span>
                                <span className="text-[10px] font-mono text-[#777777]">Qualified Calls</span>
                              </div>
                              <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                                <span className="block font-bold text-emerald-800">86 Jobs</span>
                                <span className="text-[10px] font-mono text-emerald-700 font-semibold">$148k Rev</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Simulator 04: Mission-Critical CRM Pipelines */}
                        {srv.num === '04' && (
                          <div className="simulator-card bg-[#ffffff] border border-black/[0.08] rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
                            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                              <div className="flex items-center gap-2">
                                <Zap size={16} className="text-amber-500" />
                                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1c1c1c]">
                                  Bi-Directional Pipeline
                                </span>
                              </div>
                              <span className="font-mono text-[11px] px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded font-medium">
                                0 Data Leakage
                              </span>
                            </div>

                            <div className="flex flex-col gap-2">
                              <div className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-lg border border-black/[0.04] text-xs">
                                <span className="font-mono font-semibold text-[#1c1c1c]">1. Inbound Ring / Form</span>
                                <span className="text-[11px] font-mono text-neutral-500">Twilio Telephony</span>
                              </div>
                              <div className="flex justify-center text-neutral-400 -my-1 text-xs font-mono">↓ &lt;45ms</div>
                              <div className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-lg border border-black/[0.04] text-xs">
                                <span className="font-mono font-semibold text-[#1c1c1c]">2. AI Intent &amp; Address Parser</span>
                                <span className="text-[11px] font-mono text-[#c0272d] font-semibold">&lt;400ms Reasoning</span>
                              </div>
                              <div className="flex justify-center text-neutral-400 -my-1 text-xs font-mono">↓ &lt;20ms</div>
                              <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs">
                                <span className="font-mono font-semibold text-emerald-900">3. ServiceTitan Job &amp; Tech Calendar</span>
                                <span className="text-[11px] font-mono text-emerald-700 font-semibold">✓ Auto-Dispatched</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#1c1c1c]/10 mt-6" data-rise>
            <span className="text-xs sm:text-sm font-mono text-[#666666]">
              22+ production integrations · Twilio · ServiceTitan · HubSpot · Next.js Edge
            </span>
            <a
              href="/services"
              onClick={(e) => handleNavClick(e, '/services', 'Services')}
              className="inline-flex items-center gap-2 text-sm font-mono font-semibold text-[#1c1c1c] hover:text-[#c0272d] transition-colors group"
            >
              <span>EXPLORE ALL 22 SERVICES</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </section>

        {/* ── SECTION 2: THE 4-PHASE SYSTEM (Sticky Split Progression & Roadmap) ── */}
        <section id="process" className="editorial-section w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 border-t border-[#1c1c1c]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Sticky Column with Rotating Stamp */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-6" data-rise>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c0272d] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c0272d] animate-pulse" />
                02 / THE 4-PHASE SYSTEM
              </span>
              <h2 className="font-display text-[32px] sm:text-[46px] md:text-[54px] font-normal text-[#1c1c1c] leading-[1.05] tracking-tight">
                From architecture to production in <br />
                <span className="font-serif italic font-normal text-[#1c1c1c]">2 to 4 weeks.</span>
              </h2>
              <p className="text-base text-[#555555] leading-relaxed">
                No endless discovery meetings or quarterly delays. We run a fixed-scope, battle-tested engineering sprint built around revenue velocity and sub-second page performance.
              </p>

              {/* Rotating Stamp Emblem */}
              <div className="flex items-center gap-4 pt-2">
                <div className="w-16 h-16 rounded-full border border-dashed border-[#c0272d] flex items-center justify-center p-1 rotating-badge-stamp shrink-0">
                  <div className="w-full h-full rounded-full bg-[#c0272d]/10 flex items-center justify-center text-[9px] font-mono font-bold text-[#c0272d] text-center uppercase tracking-tighter">
                    14-DAY<br />SPRINT
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-[#1c1c1c] uppercase">Guaranteed Milestones</span>
                  <span className="text-xs text-[#666666]">Fixed-scope written agreement. No overrun fees.</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="/contact"
                  onClick={(e) => handleNavClick(e, '/contact', 'Contact')}
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#1c1c1c] text-[#ffffff] rounded-full text-xs font-mono font-semibold tracking-wider hover:bg-[#333333] transition-all group"
                >
                  <span>INITIATE A BUILD SPRINT</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Roadmap Bar & Step Progression */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Visual Sprint Milestone Tracker */}
              <div className="sprint-milestone-track mb-8 pb-6 border-b border-[#1c1c1c]/10" data-rise>
                <div className="sprint-milestone-chip active">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#c0272d] font-bold">Week 1</span>
                  <span className="text-xs font-display font-medium text-[#1c1c1c]">Audit &amp; Teardown</span>
                </div>
                <div className="sprint-milestone-chip">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-bold">Week 1–2</span>
                  <span className="text-xs font-display font-medium text-[#1c1c1c]">Architecture Scope</span>
                </div>
                <div className="sprint-milestone-chip">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-600 font-bold">Weeks 2–4</span>
                  <span className="text-xs font-display font-medium text-[#1c1c1c]">High-Velocity Build</span>
                </div>
                <div className="sprint-milestone-chip">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold">Continuous</span>
                  <span className="text-xs font-display font-medium text-[#1c1c1c]">24/7 Monitored Ops</span>
                </div>
              </div>

              {HOME_PROCESS.map((proc) => (
                <div key={proc.step} className="editorial-process-step" data-rise>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-semibold text-[#c0272d]">
                        PHASE {proc.step}
                      </span>
                      <span className="font-mono text-xs px-2.5 py-0.5 bg-black/[0.04] text-[#444444] rounded">
                        {proc.timing}
                      </span>
                    </div>
                    <div className="editorial-watermark-num">
                      {proc.step}
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#1c1c1c] mb-1">
                    {proc.phase}
                  </h3>
                  <p className="font-serif italic text-base text-[#444444] mb-3">
                    {proc.headline}
                  </p>
                  <p className="text-sm md:text-base text-[#555555] leading-relaxed mb-4 max-w-xl">
                    {proc.desc}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#1c1c1c] font-medium pt-2 border-t border-[#1c1c1c]/5">
                    <Sparkles size={14} className="text-[#c0272d] shrink-0" />
                    <span>Deliverable: {proc.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: FEATURED WORK (Curtain Reveal Exhibits & Proof Badges) ── */}
        <section id="work" className="editorial-section w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 border-t border-[#1c1c1c]/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" data-rise>
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c0272d] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c0272d] animate-pulse" />
                03 / FEATURED WORK &amp; CLIENT PROOF
              </span>
              <h2 className="font-display text-[32px] sm:text-[46px] md:text-[58px] font-normal text-[#1c1c1c] leading-[1.04] tracking-tight">
                Real systems. <br />
                <span className="font-serif italic font-normal text-[#1c1c1c]">Verified business revenue.</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-[#555555] max-w-md pb-2 leading-relaxed">
              Direct outcomes from businesses that replaced generic templates with custom-built React platforms and automated AI voice dispatch.
            </p>
          </div>

          <div className="flex flex-col">
            {HOME_FEATURED_WORK.map((work, idx) => (
              <div key={work.id} className="editorial-case-exhibit" data-rise>
                <div className="flex items-center justify-between text-xs font-mono text-[#777777] mb-6">
                  <span>EXHIBIT 0{idx + 1} / 03</span>
                  <span className="text-[#c0272d] font-semibold">{work.location}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Left Specs & Narrative */}
                  <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
                    <div>
                      <h3 className="font-display text-3xl sm:text-4xl font-normal text-[#1c1c1c]">
                        {work.client}
                      </h3>
                      <p className="font-serif italic text-base sm:text-lg text-[#555555] mt-1">
                        {work.category}
                      </p>
                    </div>

                    {/* Massive Metric Display */}
                    <div className="py-4 border-y border-[#1c1c1c]/10 flex items-baseline gap-4">
                      <span className="font-serif italic text-5xl sm:text-6xl text-[#1c1c1c] font-normal leading-none">
                        {work.metric}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#c0272d] font-semibold">
                        {work.metricLabel}
                      </span>
                    </div>

                    <p className="text-sm md:text-base text-[#555555] leading-relaxed">
                      {work.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {work.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs px-3 py-1 bg-black/[0.04] text-[#333333] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Sleek Browser Mockup Frame with Stage Curtain Reveal */}
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div className="editorial-browser-frame relative" data-curtain>
                      {/* Floating Proof Stickers on Browser Frame */}
                      <div className="absolute top-12 right-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                        {work.id === 'all-phase-plumbing' && (
                          <>
                            <span className="font-mono text-xs px-3 py-1 bg-emerald-600 text-white font-bold rounded-full shadow-lg">
                              +140% Booked Jobs
                            </span>
                            <span className="font-mono text-[11px] px-2.5 py-0.5 bg-black/80 text-white font-medium rounded-full backdrop-blur-sm self-end">
                              100/100 Lighthouse
                            </span>
                          </>
                        )}
                        {work.id === 'garys-pipeline' && (
                          <>
                            <span className="font-mono text-xs px-3 py-1 bg-[#c0272d] text-white font-bold rounded-full shadow-lg">
                              0 Calls Missed
                            </span>
                            <span className="font-mono text-[11px] px-2.5 py-0.5 bg-black/80 text-white font-medium rounded-full backdrop-blur-sm self-end">
                              24/7 AI Phone Agent
                            </span>
                          </>
                        )}
                        {work.id === 'preventive-home' && (
                          <>
                            <span className="font-mono text-xs px-3 py-1 bg-amber-500 text-black font-bold rounded-full shadow-lg">
                              2.4x ROAS Multiplier
                            </span>
                            <span className="font-mono text-[11px] px-2.5 py-0.5 bg-black/80 text-white font-medium rounded-full backdrop-blur-sm self-end">
                              High-Intent Funnels
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2 px-4 py-3 bg-[#e8e8e8] border-b border-black/[0.06]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                        </div>
                        <span className="text-[11px] font-mono text-[#777777] ml-2 truncate">
                          https://{work.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                        </span>
                      </div>
                      <div className="aspect-[16/10] overflow-hidden bg-[#dedede]">
                        <img
                          src={work.image}
                          alt={`${work.client} production platform`}
                          className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-10 flex justify-center" data-rise>
            <a
              href="/our-work"
              onClick={(e) => handleNavClick(e, '/our-work', 'Work')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#ffffff] border border-[#1c1c1c]/20 hover:border-[#1c1c1c] text-[#1c1c1c] rounded-full text-xs font-mono font-semibold tracking-wider transition-all shadow-sm hover:shadow"
            >
              <span>EXPLORE ALL CLIENT CASE STUDIES</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* ── SECTION 4: WHY ETHIXWEB (Comparison Matrix & Trust Badges) ── */}
        <section id="why-us" className="editorial-section w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 border-t border-[#1c1c1c]/10">
          <div className="flex flex-col gap-4 max-w-3xl mb-14" data-rise>
            <span className="text-xs font-mono uppercase tracking-widest text-[#c0272d] font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c0272d] animate-pulse" />
              04 / WHY ETHIXWEB
            </span>
            <h2 className="font-display text-[32px] sm:text-[46px] md:text-[58px] font-normal text-[#1c1c1c] leading-[1.04] tracking-tight">
              Why senior builders make the <br />
              <span className="font-serif italic font-normal text-[#1c1c1c]">decisive difference.</span>
            </h2>
            <p className="text-base text-[#555555] leading-relaxed">
              Traditional agencies sell you with senior directors, then assign junior interns. Here is how Ethixweb is engineered differently from the ground up.
            </p>
          </div>

          {/* Comparison Matrix with Visual Badges */}
          <div className="flex flex-col mb-16" data-rise>
            <div className="editorial-comparison-row font-mono text-xs uppercase tracking-wider text-[#777777] font-semibold pb-3 border-b-2 border-[#1c1c1c]">
              <span>AREA OF EXECUTION</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                ETHIXWEB SENIOR BUILDERS
              </span>
              <span className="text-[#888888]">TRADITIONAL AGENCIES</span>
            </div>

            {HOME_COMPARISON.map((row) => (
              <div key={row.topic} className="editorial-comparison-row">
                <span className="font-display font-medium text-base text-[#1c1c1c]">
                  {row.topic}
                </span>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-[#1c1c1c] leading-snug">
                    {row.us}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-[#777777] leading-snug flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0 mt-0.5 text-xs font-bold">
                    ✕
                  </span>
                  <span>{row.them}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Authentic Editorial Testimonial Strip with Client Initials Badges */}
          <div className="border-t border-[#1c1c1c]/10 pt-12" data-rise>
            <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#1c1c1c]/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-emerald-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="font-display font-medium text-sm text-[#1c1c1c]">Verified 5.0 / 5.0 Rating on Trustpilot</span>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#666666]">INDEPENDENT REVIEWS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {HOME_REVIEWS.map((rev, rIdx) => {
                const colors = ['bg-[#c0272d]', 'bg-emerald-700', 'bg-blue-700'];
                const initials = rev.author.split(' ').map((n) => n[0]).join('');
                return (
                  <div key={rev.author} className="flex flex-col justify-between gap-4 p-5 bg-white/60 rounded-2xl border border-black/[0.04]">
                    <p className="font-serif italic text-lg sm:text-xl text-[#222222] leading-relaxed">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-[#1c1c1c]/5 text-xs font-mono">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full ${colors[rIdx % colors.length]} text-white flex items-center justify-center font-bold text-[10px]`}>
                          {initials}
                        </div>
                        <span className="font-bold text-[#1c1c1c]">{rev.author}</span>
                      </div>
                      <span className="text-[#777777]">{rev.role} · {rev.source}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* ── DARK CURTAIN FINALE: CALL TO ACTION & TELEMETRY FOOTER ── */}
      {/* Pulls over the light sections with a deep theatrical curtain shadow */}
      <div className="editorial-dark-curtain">
        {/* ── SECTION 5: DARK-MODE FINALE CTA ── */}
        <section id="cta" className="w-full text-[#ffffff] py-24 px-6 md:px-10 lg:px-14">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8" data-rise>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              START A PROJECT TODAY
            </span>

            <h2 className="font-display text-[36px] sm:text-[54px] md:text-[68px] font-normal text-[#ffffff] leading-[1.02] tracking-tight">
              Ready for a sharper, <br />
              <span className="font-serif italic font-normal text-white">high-velocity digital operation?</span>
            </h2>

            <p className="text-base md:text-lg text-[#aaaaaa] max-w-2xl leading-relaxed">
              Bring us your messy tech stack, missed after-hours leads, slow site, or stalled automations. We will turn it into a high-converting system in 2 to 4 weeks.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact', 'Contact')}
                className="px-8 py-4 bg-[#ffffff] text-[#111111] rounded-full font-mono font-semibold text-xs tracking-wider hover:bg-[#e5e5e5] transition-all"
              >
                START A PROJECT
              </a>
              <a
                href="https://calendly.com/ethixweb-agency/30min?month=2026-06"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 bg-transparent border border-white/20 hover:border-white text-white rounded-full font-mono font-semibold text-xs tracking-wider transition-all"
              >
                <span>BOOK 30-MIN STRATEGY CALL</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-10 text-xs text-[#777777] font-mono border-t border-white/10 w-full max-w-2xl">
              <span>50+ Projects Delivered</span>
              <span>·</span>
              <span>&lt;1h Response SLA</span>
              <span>·</span>
              <span>Wyoming LLC Registered</span>
              <span>·</span>
              <span>100% Code Ownership</span>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: MODERNIST EDITORIAL FOOTER ── */}
        <footer className="w-full text-[#ffffff] pt-16 pb-12 px-6 md:px-10 lg:px-14 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            {/* Dual Clocks & Telemetry Row */}
            <DualClocks />

            {/* Directory Links & Legal */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-xs font-mono">
              <div className="flex flex-col gap-2">
                <span className="font-bold text-sm tracking-wider text-white">ETHIXWEB USA LLC</span>
                <span className="text-neutral-400">Registered in Wyoming, United States · Operating Nationwide</span>
                <span className="text-neutral-500">Kent, WA · info@ethixweb.com</span>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-neutral-300">
                <a href="/our-work" onClick={(e) => handleNavClick(e, '/our-work', 'Work')} className="hover:text-white transition-colors">WORK</a>
                <a href="/services" onClick={(e) => handleNavClick(e, '/services', 'Services')} className="hover:text-white transition-colors">SERVICES</a>
                <a href="/industries" onClick={(e) => handleNavClick(e, '/industries', 'Industries')} className="hover:text-white transition-colors">INDUSTRIES</a>
                <a href="/about" onClick={(e) => handleNavClick(e, '/about', 'About')} className="hover:text-white transition-colors">ABOUT</a>
                <a href="/contact" onClick={(e) => handleNavClick(e, '/contact', 'Contact')} className="hover:text-white transition-colors">CONTACT</a>
                <a href="/admin" onClick={(e) => handleNavClick(e, '/admin', 'Admin')} className="text-neutral-500 hover:text-white transition-colors">ADMIN</a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/5 text-[11px] text-neutral-500 font-mono">
              <span>© 2026 Ethixweb USA LLC. All rights reserved.</span>
              <span>We run the tech. You run the business.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

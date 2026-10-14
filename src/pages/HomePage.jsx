import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import {
  Menu,
  X,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Star,
  ExternalLink,
} from 'lucide-react';
import InteractiveWeb from '../components/InteractiveWeb';
import '../styles/landing.css';

const HOME_SERVICES = [
  {
    num: '01',
    category: 'AI Agents & Voice Receptionists',
    badge: '24/7 Autonomous',
    headline: 'Zero missed calls. Direct appointment booking.',
    desc: 'Autonomous voice and chat agents that answer, qualify, and book inbound leads around the clock. Synchronized directly into ServiceTitan, HubSpot, and GoHighLevel with seamless human escalation.',
    deliverable: 'Custom LLM reasoning & sub-second phone dispatch',
    tags: ['AI Voice Agents', 'Smart SMS Dispatch', 'CRM Sync', '24/7 Coverage'],
  },
  {
    num: '02',
    category: 'Headless Web & Cloud Systems',
    badge: 'Sub-Second LCP',
    headline: 'Engineered in React and TypeScript. No page builders.',
    desc: 'We replace sluggish, fragile WordPress sites with bespoke headless cloud platforms. Blazing fast, 100/100 Lighthouse performance, zero security vulnerabilities, and full code ownership.',
    deliverable: 'Sub-second load times & conversion-optimized UI',
    tags: ['Headless Next.js', 'Clean TypeScript', 'Enterprise Security', 'Tailored UI/UX'],
  },
  {
    num: '03',
    category: 'Precision Search & Direct Revenue',
    badge: 'High-Intent Demand',
    headline: 'Local SEO, Google LSA, and Meta ads as one revenue engine.',
    desc: 'Compounding organic search authority and high-converting paid search campaigns wired straight into lead scoring and revenue attribution. We measure booked revenue, not vanity impressions.',
    deliverable: 'Top 3 Google Maps pack & closed-loop attribution',
    tags: ['Local Map Pack SEO', 'Google Guaranteed LSA', 'Meta Ads', 'Lead Tracking'],
  },
  {
    num: '04',
    category: 'Mission-Critical CRM & Pipelines',
    badge: 'Real-Time Sync',
    headline: 'Connected pipelines. No manual data entry.',
    desc: 'Unifying forms, calls, payments, scheduling, and customer data into a single source of truth. Your team gets instantaneous notifications and automated follow-ups that close deals faster.',
    deliverable: 'Bi-directional webhooks & automated deal stages',
    tags: ['HubSpot & GHL', 'ServiceTitan / Jobber', 'Stripe Billing', 'Automated Workflows'],
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

export default function HomePage() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [displayHover, setDisplayHover] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const navigate = useNavigate();

  const [clocks, setClocks] = useState(() => {
    const now = new Date();
    return {
      seattle: now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
      bangalore: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
    };
  });

  const hasAnimated = useRef(false);
  const webAnimTargetRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      if (webEl) gsap.set(webEl, { y: 0 });
      if (leftColEl) gsap.set(leftColEl, { x: 0, y: 0, scale: 1, opacity: 1 });
      if (rightColEl) gsap.set(rightColEl, { x: 0, y: 0, scale: 1, opacity: 1 });

      gsap.set('.hello-title-char', { yPercent: 0 });
      gsap.set('.landing-root .nav-left, .landing-root .nav-center, .landing-root .nav-right', { opacity: 1, y: 0 });
      gsap.set('.landing-root .nav-row', { opacity: 1, y: 0, yPercent: -50 });
      gsap.set('.tagline', { opacity: 1 });
      return;
    }

    if (!hasAnimated.current) {
      hasAnimated.current = true;

      const webEl = webAnimTargetRef.current;
      const leftColEl = leftColRef.current;
      const rightColEl = rightColRef.current;

      if (!webEl || !leftColEl || !rightColEl) return;

      // Compute geometric offsets for preloader centering and emergence
      const webRect = webEl.getBoundingClientRect();
      const viewportCenterY = window.innerHeight / 2;
      const webCenterY = webRect.top + webRect.height / 2;
      const deltaY = viewportCenterY - webCenterY;

      const isDesktop = window.innerWidth > 768;
      const webCenterX = webRect.left + webRect.width / 2;
      const leftRect = leftColEl.getBoundingClientRect();
      const rightRect = rightColEl.getBoundingClientRect();

      // Shift side columns behind the center web
      const leftOffsetX = isDesktop ? webCenterX - (leftRect.left + leftRect.width / 2) : 0;
      const rightOffsetX = isDesktop ? webCenterX - (rightRect.left + rightRect.width / 2) : 0;
      const initialY = isDesktop ? 0 : 25;

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
    } else {
      sessionStorage.setItem('showCurtain', 'true');
      navigate(path);
    }
  };

  return (
    <div className={`landing-root ${isPreloading ? 'is-preloading' : ''}`}>
      {/* ── TOP FLOATING BAR (Appears on scroll down past hero) ── */}
      {showFloatingBar && (
        <aside
          aria-label="Quick navigation bar"
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#1c1c1c]/90 backdrop-blur-md text-[#ffffff] px-4 sm:px-6 py-2.5 rounded-full shadow-2xl flex items-center gap-3 sm:gap-6 border border-white/10 text-xs font-mono tracking-wider transition-all duration-300"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-bold hover:text-white/80 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            ETHIXWEB
          </button>
          <div className="h-3 w-px bg-white/20 hidden sm:block" />
          <nav className="flex items-center gap-3 sm:gap-4 text-[11px] uppercase">
            <a href="#services" className="hover:text-[#c0272d] transition-colors">Services</a>
            <a href="#process" className="hover:text-[#c0272d] transition-colors">Process</a>
            <a href="#work" className="hover:text-[#c0272d] transition-colors">Work</a>
            <a href="#why-us" className="hover:text-[#c0272d] transition-colors">Why Us</a>
            <a
              href="/contact"
              onClick={(e) => handleNavClick(e, '/contact', 'Contact')}
              className="px-3 py-1 bg-white text-[#1c1c1c] rounded-full font-medium hover:bg-neutral-200 transition-colors ml-1"
            >
              Start Project
            </a>
          </nav>
        </aside>
      )}

      {/* ── HERO VIEWPORT STAGE ── */}
      <div className="landing-hero-stage">
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

      {/* ── RICH LANDING CONTENT BELOW HERO (Scrollable, consistent design system) ── */}
      <div className="landing-content">
        {/* ── SECTION 1: SERVICES & VALUE PROPOSITION ── */}
        <section id="services" className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-24 pb-16 flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c0272d] font-semibold">
              01 / DIGITAL OPERATIONS &amp; TECH
            </span>
            <h2 className="font-display text-[28px] sm:text-[40px] md:text-[50px] font-normal text-[#1c1c1c] leading-[1.05] tracking-tight">
              Full-stack digital operations. <span className="font-serif italic font-normal">Senior-led execution.</span>
            </h2>
            <p className="text-base md:text-lg text-[#555555] leading-relaxed">
              We manage your complete digital footprint so you can focus on running your business. No layers of non-technical account reps—just senior engineers shipping production systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HOME_SERVICES.map((srv) => (
              <div
                key={srv.num}
                className="bg-[#ffffff] rounded-2xl p-7 md:p-9 flex flex-col justify-between border border-[#1c1c1c]/5 hover:border-[#1c1c1c]/20 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#c0272d]">{srv.num}</span>
                    <span className="font-mono text-[11px] px-2.5 py-1 bg-[#ebebeb] text-[#1c1c1c] rounded font-medium">
                      {srv.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-normal text-[#1c1c1c] group-hover:text-[#c0272d] transition-colors">
                      {srv.category}
                    </h3>
                    <p className="font-serif italic text-base text-[#2c2c2c] mt-1">
                      {srv.headline}
                    </p>
                  </div>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f0f0f0] flex flex-col gap-3">
                  <div className="text-xs font-medium text-[#1c1c1c] bg-[#f8f8f8] p-3 rounded-lg flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#c0272d] shrink-0" />
                    <span>{srv.deliverable}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {srv.tags.map((t) => (
                      <span key={t} className="text-[11px] font-mono px-2 py-0.5 bg-[#f0f0f0] text-[#555555] rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-[#ffffff] rounded-2xl border border-[#1c1c1c]/5 gap-4">
            <div>
              <span className="font-display font-medium text-[#1c1c1c] block">Need custom CRM integrations, automated dispatch, or a full rebuild?</span>
              <span className="text-xs text-[#666666]">Explore our comprehensive 22-service operating catalog.</span>
            </div>
            <a
              href="/services"
              onClick={(e) => handleNavClick(e, '/services', 'Services')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1c1c1c] text-[#ffffff] rounded-lg text-sm font-semibold hover:bg-[#333333] transition-colors shrink-0"
            >
              View all services
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* ── SECTION 2: THE 4-PHASE PROCESS ── */}
        <section id="process" className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-20 flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c0272d] font-semibold">
              02 / THE 4-PHASE SYSTEM
            </span>
            <h2 className="font-display text-[28px] sm:text-[40px] md:text-[50px] font-normal text-[#1c1c1c] leading-[1.05] tracking-tight">
              From architecture to production in <span className="font-serif italic font-normal">2 to 4 weeks.</span>
            </h2>
            <p className="text-base md:text-lg text-[#555555] leading-relaxed">
              No endless discovery meetings or quarterly delays. We follow a battle-tested 4-stage engineering sprint built around revenue velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOME_PROCESS.map((proc) => (
              <div
                key={proc.step}
                className="bg-[#ffffff] rounded-2xl p-6 flex flex-col justify-between border border-[#1c1c1c]/5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-[#c0272d]">{proc.step}</span>
                    <span className="font-mono text-[11px] px-2 py-0.5 bg-[#ebebeb] text-[#333333] rounded">
                      {proc.timing}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#1c1c1c]">{proc.phase}</h3>
                    <p className="font-serif italic text-xs text-[#444444] mt-0.5">{proc.headline}</p>
                  </div>
                  <p className="text-xs text-[#555555] leading-relaxed">{proc.desc}</p>
                </div>

                <div className="pt-4 mt-5 border-t border-[#f0f0f0]">
                  <div className="flex items-start gap-1.5 text-xs text-[#1c1c1c] font-medium">
                    <Sparkles size={14} className="text-[#c0272d] shrink-0 mt-0.5" />
                    <span>{proc.deliverable}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: FEATURED WORK & CASE STUDIES ── */}
        <section id="work" className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-20 flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c0272d] font-semibold">
              03 / FEATURED WORK &amp; CLIENT PROOF
            </span>
            <h2 className="font-display text-[28px] sm:text-[40px] md:text-[50px] font-normal text-[#1c1c1c] leading-[1.05] tracking-tight">
              Real systems. <span className="font-serif italic font-normal">Verified business revenue.</span>
            </h2>
            <p className="text-base md:text-lg text-[#555555] leading-relaxed">
              Direct outcomes from businesses that replaced generic templates with custom-built React platforms and automated AI voice dispatch.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {HOME_FEATURED_WORK.map((work, idx) => (
              <div
                key={work.id}
                className={`bg-[#ffffff] rounded-3xl p-6 md:p-10 border border-[#1c1c1c]/5 flex flex-col ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-8 lg:gap-12 items-center`}
              >
                {/* Simulated Browser Frame with Screenshot */}
                <div className="w-full lg:w-3/5 bg-[#f0f0f0] p-2 rounded-2xl border border-[#e0e0e0] shadow-sm">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#e5e5e5] mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    <span className="text-[11px] font-mono text-[#888888] ml-2 truncate">
                      https://{work.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                    </span>
                  </div>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#e0e0e0]">
                    <img
                      src={work.image}
                      alt={`${work.client} production platform`}
                      className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Case Details */}
                <div className="w-full lg:w-2/5 flex flex-col gap-5">
                  <div>
                    <span className="text-xs font-mono text-[#c0272d] font-semibold uppercase tracking-wider block">
                      {work.location}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#1c1c1c] mt-1">
                      {work.client}
                    </h3>
                    <p className="text-xs font-medium text-[#666666] mt-0.5">{work.category}</p>
                  </div>

                  {/* Big Metric Display */}
                  <div className="py-4 px-5 bg-[#f9f9f9] rounded-xl border border-[#f0f0f0] flex items-baseline gap-3">
                    <span className="font-serif italic text-4xl sm:text-5xl text-[#1c1c1c] font-normal leading-none">
                      {work.metric}
                    </span>
                    <span className="text-xs uppercase font-mono tracking-wider text-[#c0272d] font-semibold">
                      {work.metricLabel}
                    </span>
                  </div>

                  <p className="text-sm text-[#555555] leading-relaxed">
                    {work.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {work.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-2.5 py-1 bg-[#ebebeb] text-[#333333] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <a
              href="/our-work"
              onClick={(e) => handleNavClick(e, '/our-work', 'Work')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ffffff] border border-[#1c1c1c]/20 hover:border-[#1c1c1c] text-[#1c1c1c] rounded-xl font-semibold text-sm transition-all"
            >
              Explore all client case studies
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* ── SECTION 4: WHY ETHIXWEB & TRUST PROOF ── */}
        <section id="why-us" className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-20 flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c0272d] font-semibold">
              04 / WHY ETHIXWEB
            </span>
            <h2 className="font-display text-[28px] sm:text-[40px] md:text-[50px] font-normal text-[#1c1c1c] leading-[1.05] tracking-tight">
              Why senior builders make the <span className="font-serif italic font-normal">decisive difference.</span>
            </h2>
            <p className="text-base md:text-lg text-[#555555] leading-relaxed">
              Traditional agencies sell you with senior directors, then assign junior interns. Here is how Ethixweb is engineered differently.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Comparison Table */}
            <div className="lg:col-span-7 bg-[#ffffff] rounded-2xl p-6 sm:p-8 border border-[#1c1c1c]/5">
              <h3 className="font-display text-lg font-semibold text-[#1c1c1c] mb-6">
                Ethixweb compared to typical agencies
              </h3>
              
              <div className="flex flex-col divide-y divide-[#f0f0f0]">
                {HOME_COMPARISON.map((row) => (
                  <div key={row.topic} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                    <span className="sm:w-1/3 font-medium text-xs sm:text-sm text-[#1c1c1c]">{row.topic}</span>
                    <div className="sm:w-2/3 flex flex-col gap-1 text-xs sm:text-sm">
                      <div className="flex items-start gap-1.5 text-[#1c1c1c] font-medium">
                        <CheckCircle2 size={16} className="text-[#c0272d] shrink-0 mt-0.5" />
                        <span>{row.us}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-[#777777] pl-5 sm:pl-5 text-xs">
                        <span>vs. {row.them}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trustpilot & Reviews Panel */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-[#ffffff] rounded-2xl p-6 sm:p-8 border border-[#1c1c1c]/5 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0]">
                  <div>
                    <div className="flex items-center gap-1 text-emerald-600 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="font-display font-medium text-sm text-[#1c1c1c]">Verified 4.0 / 5.0 Rating</span>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 bg-[#ebebeb] text-[#333333] rounded">Trustpilot Verified</span>
                </div>

                {HOME_REVIEWS.map((rev) => (
                  <div key={rev.author} className="py-3 first:pt-1 last:pb-1 flex flex-col gap-2">
                    <p className="text-xs sm:text-sm text-[#333333] leading-relaxed italic">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#777777]">
                      <span className="font-semibold text-[#1c1c1c]">{rev.author}</span>
                      <span>{rev.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: STRONG CALL TO ACTION ── */}
        <section id="cta" className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-16">
          <div className="bg-[#1c1c1c] text-[#ffffff] rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col items-center text-center gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/[0.03] pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-white/[0.03] pointer-events-none" />

            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              START A PROJECT TODAY
            </span>

            <h2 className="font-display text-[30px] sm:text-[44px] md:text-[54px] font-normal text-[#ffffff] max-w-3xl leading-[1.05] tracking-tight">
              Ready for a sharper, <span className="font-serif italic font-normal text-white">high-velocity digital operation?</span>
            </h2>

            <p className="text-base md:text-lg text-[#bbbbbb] max-w-2xl leading-relaxed">
              Bring us your messy tech stack, missed after-hours leads, slow site, or stalled automations. We will turn it into a high-converting system in 2 to 4 weeks.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 z-10">
              <a
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact', 'Contact')}
                className="px-8 py-4 bg-[#ffffff] text-[#1c1c1c] rounded-xl font-semibold text-sm hover:bg-[#e5e5e5] transition-colors"
              >
                Start a project
              </a>
              <a
                href="https://calendly.com/ethixweb-agency/30min?month=2026-06"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 bg-transparent border border-white/20 hover:border-white text-white rounded-xl font-semibold text-sm transition-colors"
              >
                Book 30-min strategy call
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-[#888888] font-mono border-t border-white/10 w-full max-w-2xl">
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
        <footer className="w-full bg-[#141414] text-[#ffffff] pt-16 pb-12 px-6 md:px-10 lg:px-14 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            {/* Dual Clocks & Telemetry Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10 border-b border-white/10">
              <div className="flex items-center justify-between p-5 bg-white/[0.04] rounded-xl border border-white/10">
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

              <div className="flex items-center justify-between p-5 bg-white/[0.04] rounded-xl border border-white/10">
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

import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import TopBar from '../components/TopBar';
import MiddleNav from '../components/MiddleNav';
import PageCurtain from '../components/PageCurtain';
import { useTransition } from '../context/TransitionContext';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

const DUAL_SHORE_STAGES = [
  {
    step: '01',
    time: '09:00 – 17:00 PST',
    hub: 'Seattle, WA (HQ)',
    title: 'High-Touch US Leadership',
    desc: 'You work directly with executive leadership in Washington. We clarify architecture, finalize requirements, and maintain tight roadmap alignment without telephone games.',
  },
  {
    step: '02',
    time: '17:00 – 18:00 PST',
    hub: 'Trans-Pacific Handover',
    title: 'Seamless Context Transfer',
    desc: 'Daily asynchronous debriefs, recorded Loom walkthroughs, and automated GitHub sprint handovers. Bangalore engineers take over with full technical clarity.',
  },
  {
    step: '03',
    time: '18:00 – 04:00 PST',
    hub: 'Bangalore Core Hub',
    title: 'Deep Engineering Night Shift',
    desc: 'While your team sleeps, Bangalore’s senior engineers write clean React and TypeScript, train AI booking models, run security audits, and deploy to staging environments.',
  },
  {
    step: '04',
    time: '08:30 PST',
    hub: 'Production Delivery',
    title: 'Wake Up to Shipped Code',
    desc: 'You wake up to tested pull requests, live preview links, and documented progress ready for immediate customer deployment.',
  },
];

const INDIA_ADVANTAGES = [
  {
    title: 'Silicon Valley of Asia',
    tag: 'Bangalore Density',
    desc: 'Bangalore is the global capital of software engineering. Our hub taps into senior engineers who architected high-throughput infrastructure at top tech companies.',
  },
  {
    title: 'Zero Junior Subcontracting',
    tag: 'Strict Senior Bar',
    desc: 'We never outsource to anonymous low-cost commodity shops. Every engineer in our Bangalore office is a full-time, senior core team member with 6+ years in production.',
  },
  {
    title: 'US Legal Protection',
    tag: 'Wyoming LLC',
    desc: 'All contracts, NDAs, intellectual property assignments, and invoicing are governed under US corporate law through Ethixweb USA LLC.',
  },
];

const COMPARISON = [
  {
    topic: 'Who builds your project',
    us: 'The senior engineers on your kickoff call',
    them: 'Juniors learning behind an account manager',
  },
  {
    topic: 'Pricing structure',
    us: 'Fixed scope agreed in writing upfront',
    them: 'Open-ended retainers and surprise invoices',
  },
  {
    topic: 'What gets reported',
    us: 'Direct phone calls, bookings, and verified revenue',
    them: 'Impressions, clicks, and vanity dashboards',
  },
  {
    topic: 'Time to launch',
    us: '2 to 4 weeks to live production',
    them: 'A full quarter of discovery theater',
  },
  {
    topic: 'Getting answers',
    us: 'A direct line to the people writing the code',
    them: 'Support ticket queues and message relays',
  },
];

const STATS = [
  {
    value: '2–4 wks',
    label: 'Typical time to launch',
    detail: 'Full-stack systems shipped in weeks, not months of discovery.',
  },
  {
    value: '100%',
    label: 'Senior-led delivery',
    detail: 'Direct access to senior developers, designers, and strategists.',
  },
  {
    value: '<1h',
    label: 'Average response SLA',
    detail: 'Fast turnaround and rapid resolutions during active operations.',
  },
  {
    value: '4.0 / 5',
    label: 'Verified client rating',
    detail: 'Independent Trustpilot rating earned across 50+ delivered projects.',
  },
];

const FEATURED_TESTIMONIAL = {
  quote: 'The team was easy to work with, great communication and done in efficient time.',
  author: 'Kayla Kjl',
  role: 'Verified Client',
  source: 'Trustpilot Review',
};

const OTHER_TESTIMONIALS = [
  {
    quote: 'Great communication and very efficient work. Handled our technical requirements without delays.',
    author: 'Ryan Taylor',
    role: 'Verified Client',
    source: 'Trustpilot Review',
  },
  {
    quote: 'Professional team that delivered our platform on schedule with clear milestones throughout.',
    author: 'Leslie Whitehurst-Manners',
    role: 'Verified Client',
    source: 'Trustpilot Review',
  },
  {
    quote: 'Direct access to developers who understood our business model immediately.',
    author: 'Clinton Mcculloch',
    role: 'Verified Client',
    source: 'Trustpilot Review',
  },
];

const TEAM_PHOTOS = [
  {
    src: '/images/careers/real-client-impact.webp',
    alt: 'Ethixweb engineering team reviewing client production metrics',
  },
  {
    src: '/images/careers/direct-collaboration.webp',
    alt: 'Technical architecture planning session',
  },
  {
    src: '/images/careers/modern-engineering-stack.webp',
    alt: 'Full-stack application development and deployment',
  },
  {
    src: '/images/careers/ownership-responsibility.webp',
    alt: 'Senior developers managing client digital infrastructure',
  },
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const { navigateWithTransition } = useTransition();

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

  useScrollAnimations(containerRef);

  return (
    <div ref={containerRef} className="min-h-[100svh] bg-[#ebebeb] text-[#1c1c1c] flex flex-col justify-between">
      <PageCurtain />
      {/* Perimeter top navigation */}
      <TopBar />
      <MiddleNav />

      <main className="w-full flex flex-col gap-16 md:gap-20 pt-24 md:pt-32 pb-16 flex-1">
        {/* ── SECTION 1: ABOUT (HERO, NARRATIVE, COLLABORATION EVIDENCE, COMPARISON) ── */}
        <section className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 flex flex-col gap-12">
          {/* Hero statement */}
          <div className="flex flex-col gap-5 max-w-4xl">
            <h1
              className="font-display text-[32px] sm:text-[48px] md:text-[clamp(4.2rem,5.6vw,5.5rem)] leading-[0.96] md:leading-[0.94] tracking-tight text-[#1c1c1c] font-normal"
              data-rise="1"
            >
              <span className="block">Direct <span className="font-serif italic font-normal">senior craft.</span></span>
              <span className="block text-[#1c1c1c]">No <span className="font-serif italic font-normal">account managers.</span></span>
            </h1>

            <p
              className="text-base md:text-lg text-[#444444] leading-relaxed max-w-2xl font-normal"
              data-rise="2"
            >
              Ethixweb is a digital marketing and web engineering agency built for US businesses that demand
              measurable revenue, not agency theater. We replace layers of account reps and juniors with the
              exact senior engineers and strategists building your systems.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-14" data-rise="3">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition('/contact', 'CONTACT');
                }}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-[#1c1c1c] text-[#ffffff] font-medium rounded-lg text-base hover:bg-[#333333] transition-colors duration-150"
              >
                Start a project
              </a>
              <a
                href="/our-work"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition('/our-work', 'WORK');
                }}
                className="inline-flex items-center gap-1.5 px-5 py-3.5 text-base font-semibold text-[#1c1c1c] hover:text-[#c0272d] transition-colors duration-150"
              >
                See our work
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Real narrative & legal entity card */}
          <div
            className="bg-[#ffffff] rounded-2xl p-6 md:p-10 flex flex-col lg:flex-row gap-10 items-center justify-between"
            data-rise="4"
          >
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <h2 className="font-display text-[22px] sm:text-[28px] font-normal text-[#1c1c1c] leading-tight">
                Built for businesses tired of <span className="font-serif italic font-normal">agency theater.</span>
              </h2>
              <p className="text-base text-[#444444] leading-relaxed">
                We started Ethixweb in 2020 because we watched business owners get handed off to junior coordinators
                after signing five-figure retainers. When you work with Ethixweb, you work directly with
                senior builders who understand both software architecture and customer acquisition economics.
              </p>
              <p className="text-base text-[#444444] leading-relaxed">
                We operate nationwide through <strong className="font-semibold text-[#1c1c1c]">Ethixweb USA LLC</strong>,
                a Wyoming-registered business entity based in Kent, WA and Wyoming. You contract directly with an accountable US organization
                backed by clear milestones and verified outcomes.
              </p>
            </div>

            {/* 4 Real Collaboration Photos */}
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3.5" data-rise="5">
              {TEAM_PHOTOS.map((photo, pIdx) => (
                <div
                  key={photo.src}
                  className="aspect-[4/3] rounded-xl overflow-hidden bg-[#e5e5e5]"
                  data-rise={String(pIdx + 6)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Signature Comparison Block */}
          <div className="bg-[#ffffff] rounded-2xl p-6 md:p-10 flex flex-col gap-6" data-rise="10">
            <h2 className="font-display text-[22px] sm:text-[28px] font-normal text-[#1c1c1c] leading-tight">
              Ethixweb compared to <span className="font-serif italic font-normal">traditional agencies.</span>
            </h2>

            {/* Desktop / Tablet Semantic Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-base">
                <thead>
                  <tr className="bg-[#f4f4f4] text-[#1c1c1c]">
                    <th className="p-4 rounded-l-lg font-semibold">Operational Area</th>
                    <th className="p-4 font-semibold text-[#c0272d]">Ethixweb Approach</th>
                    <th className="p-4 rounded-r-lg font-semibold text-[#666666]">Typical Agency</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.topic} className="even:bg-[#f9f9f9] hover:bg-[#f0f0f0] transition-colors">
                      <td className="p-4 font-medium text-[#1c1c1c] align-top">{row.topic}</td>
                      <td className="p-4 text-[#1c1c1c] align-top">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#c0272d] shrink-0 mt-0.5" />
                          <span>{row.us}</span>
                        </div>
                      </td>
                      <td className="p-4 text-[#555555] align-top">
                        <div className="flex items-start gap-2">
                          <X className="w-4 h-4 text-[#888888] shrink-0 mt-0.5" />
                          <span>{row.them}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Container (Single block, zero side-scroll) */}
            <div className="sm:hidden flex flex-col gap-4 bg-[#f9f9f9] rounded-xl p-5">
              {COMPARISON.map((row) => (
                <div key={row.topic} className="flex flex-col gap-1.5">
                  <span className="font-semibold text-base text-[#1c1c1c]">{row.topic}</span>
                  <div className="text-[13px] text-[#1c1c1c]">
                    <span className="font-semibold text-[#c0272d]">Ethixweb:</span> {row.us}
                  </div>
                  <div className="text-[13px] text-[#555555]">
                    <span className="font-semibold text-[#666666]">Typical:</span> {row.them}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 2: THE INDIA STORY & DUAL-SHORE SUPERPOWER ── */}
        <section className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-4xl" data-rise="10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c0272d] font-semibold">
              02 / DUAL-SHORE VELOCITY ENGINE
            </span>
            <h2 className="font-display text-[26px] sm:text-[36px] md:text-[44px] font-normal text-[#1c1c1c] leading-tight">
              The India story: <span className="font-serif italic font-normal">Our 24-hour engineering engine.</span>
            </h2>
            <p className="text-base md:text-lg text-[#444444] leading-relaxed">
              Why the most agile US businesses pair high-touch local executive accountability with Bangalore’s elite engineering density.
              We turned timezones from a coordination hurdle into an around-the-clock delivery advantage.
            </p>
          </div>

          {/* Real-time Dual-Timezone Clocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-rise="11">
            {/* Seattle HQ Clock */}
            <div className="bg-[#ffffff] rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-[#1c1c1c]/5 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0]">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label="United States">🇺🇸</span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-[#1c1c1c]">Seattle, WA (Operations HQ)</h3>
                    <p className="text-xs text-[#666666]">Pacific Time (PST/PDT) · Client Leadership</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-[#555555]">ACTIVE</span>
                </div>
              </div>
              <div className="py-6 flex flex-col gap-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#888888]">Current Local Time</span>
                <span className="font-serif text-3xl sm:text-4xl text-[#1c1c1c] font-normal tracking-tight">
                  {clocks.seattle}
                </span>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed pt-2">
                Strategic kickoffs, architecture planning, US contracts via <strong>Ethixweb USA LLC</strong>, and direct phone/video line with executive partners.
              </p>
            </div>

            {/* Bangalore Core Hub Clock */}
            <div className="bg-[#ffffff] rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-[#1c1c1c]/5 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0]">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label="India">🇮🇳</span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-[#1c1c1c]">Bangalore Hub (Engineering Capital)</h3>
                    <p className="text-xs text-[#666666]">India Standard Time (IST) · Deep Architecture</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-[#555555]">CORE HUB</span>
                </div>
              </div>
              <div className="py-6 flex flex-col gap-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#888888]">Current Local Time</span>
                <span className="font-serif text-3xl sm:text-4xl text-[#1c1c1c] font-normal tracking-tight">
                  {clocks.bangalore}
                </span>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed pt-2">
                Distributed cloud infrastructure, full-stack React systems, autonomous AI agents, automated CI/CD pipelines, and 24/7 uptime monitoring.
              </p>
            </div>
          </div>

          {/* Follow-the-Sun 24/7 Timeline */}
          <div className="bg-[#ffffff] rounded-2xl p-6 md:p-10 flex flex-col gap-8" data-rise="12">
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-xl sm:text-2xl font-normal text-[#1c1c1c]">
                How follow-the-sun development <span className="font-serif italic font-normal">accelerates your launch.</span>
              </h3>
              <p className="text-sm md:text-base text-[#444444]">
                While typical agencies halt all progress when the clock hits 5:00 PM, our dual-shore workflow keeps your codebase advancing 24 hours a day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {DUAL_SHORE_STAGES.map((stage) => (
                <div key={stage.step} className="flex flex-col gap-3 p-5 rounded-xl bg-[#f9f9f9] border border-[#f0f0f0]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#c0272d]">{stage.step}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 bg-[#ebebeb] text-[#333333] rounded">{stage.time}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] block">{stage.hub}</span>
                    <h4 className="font-display text-base font-semibold text-[#1c1c1c] mt-0.5">{stage.title}</h4>
                  </div>
                  <p className="text-xs text-[#555555] leading-relaxed">{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Three Non-Negotiable Tenets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-rise="13">
            {INDIA_ADVANTAGES.map((adv) => (
              <div key={adv.title} className="bg-[#ffffff] rounded-2xl p-6 flex flex-col gap-3">
                <span className="text-xs font-mono text-[#c0272d] uppercase tracking-wider font-semibold">{adv.tag}</span>
                <h4 className="font-display text-lg font-semibold text-[#1c1c1c]">{adv.title}</h4>
                <p className="text-xs md:text-sm text-[#444444] leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: STATS (TYPOGRAPHIC SET PIECE, NOT IDENTICAL BOXED CARDS) ── */}
        <section className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 flex flex-col gap-10">
          <div className="flex flex-col gap-3 max-w-3xl" data-rise="14">
            <h2 className="font-display text-[22px] sm:text-[28px] font-normal text-[#1c1c1c] leading-tight">
              The metrics that <span className="font-serif italic font-normal">govern how we ship.</span>
            </h2>
            <p className="text-base text-[#444444] leading-relaxed">
              Every client engagement is measured by concrete turnaround times, senior execution, and direct business results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-2" data-rise="12">
            {STATS.map((item, idx) => (
              <div
                key={item.label}
                className="flex flex-col gap-2"
                data-rise={String(idx + 13)}
              >
                <p className="font-serif italic text-[56px] font-normal text-[#1c1c1c] tracking-tight leading-none">
                  {item.value}
                </p>
                <p className="text-base font-semibold text-[#c0272d]">
                  {item.label}
                </p>
                <p className="text-[13px] text-[#444444] leading-relaxed mt-1">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: TESTIMONIALS (ASYMMETRICAL EDITORIAL COMPOSITION) ── */}
        <section className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 flex flex-col gap-10">
          <div className="flex flex-col gap-3 max-w-3xl" data-rise="17">
            <h2 className="font-display text-[22px] sm:text-[28px] font-normal text-[#1c1c1c] leading-tight">
              What clients say when the <span className="font-serif italic font-normal">tech works.</span>
            </h2>
            <p className="text-base text-[#444444] leading-relaxed">
              Direct statements from real client reviews published independently on Trustpilot.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" data-rise="18">
            {/* Featured quote panel (size <= 24px so it is treated as a quotation, not a headline) */}
            <div className="lg:col-span-6 bg-[#ffffff] rounded-2xl p-6 md:p-10 flex flex-col justify-between gap-6">
              <blockquote className="text-lg md:text-2xl text-[#1c1c1c] leading-relaxed font-normal">
                &ldquo;The team was easy to work with, <span className="font-serif italic font-normal">great communication</span> and done in <span className="font-serif italic font-normal">efficient time.</span>&rdquo;
              </blockquote>

              <div className="flex items-center justify-between pt-4 text-[13px]">
                <div>
                  <span className="font-semibold text-[#1c1c1c] block">{FEATURED_TESTIMONIAL.author}</span>
                  <span className="text-[#555555]">{FEATURED_TESTIMONIAL.role}</span>
                </div>
                <span className="px-2.5 py-1 bg-[#ebebeb] text-[#1c1c1c] rounded-md font-medium">
                  {FEATURED_TESTIMONIAL.source}
                </span>
              </div>
            </div>

            {/* Secondary reviews list */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {OTHER_TESTIMONIALS.map((t, idx) => (
                <div
                  key={t.author}
                  className="bg-[#ffffff] rounded-2xl p-5 md:p-6 flex flex-col justify-between gap-3"
                  data-rise={String(idx + 19)}
                >
                  <p className="text-base text-[#1c1c1c] leading-relaxed font-normal">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-semibold text-[#1c1c1c]">{t.author}</span>
                    <span className="text-[#555555]">{t.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: CALL TO ACTION ── */}
        <section className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-8">
          <div
            className="bg-[#1c1c1c] text-[#ffffff] rounded-3xl p-8 md:p-14 flex flex-col items-center text-center gap-6"
            data-rise="22"
          >
            <h2 className="font-display text-[24px] sm:text-[36px] md:text-[44px] font-normal text-[#ffffff] max-w-3xl leading-tight">
              Ready for a sharper digital operation?
            </h2>

            <p className="text-base md:text-lg text-[#bbbbbb] max-w-2xl leading-relaxed">
              Bring us the messy stack, missed leads, slow site, or stalled automation.
              We will turn it into a high-converting system in 2 to 4 weeks.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition('/contact', 'CONTACT');
                }}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#ffffff] text-[#1c1c1c] font-semibold rounded-lg text-base hover:bg-[#e5e5e5] transition-colors duration-150"
              >
                Start a project
              </a>
              <a
                href="/our-work"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition('/our-work', 'WORK');
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-[#ffffff] hover:text-[#c0272d] transition-colors duration-150"
              >
                See our work
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Perimeter bottom metrics and status */}
      <footer className="w-full px-6 md:px-10 lg:px-14 py-5 bg-[#dcdcdc] text-[#333333] text-[13px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 font-medium text-[#1c1c1c] text-[13px]">
            <span>50+ Projects Delivered</span>
            <span>&lt;1h Response Time</span>
            <span>24/7 Global Availability</span>
            <span>Trustpilot 4.0 / 5 Stars</span>
          </div>

          <div className="text-[#333333] text-[13px] font-medium">
            Ethixweb USA LLC · Kent, WA &amp; Wyoming
          </div>
        </div>
      </footer>
    </div>
  );
}

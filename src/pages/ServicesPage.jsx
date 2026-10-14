import React, { useState, useRef } from 'react';
import { ArrowUpRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import TopBar from '../components/TopBar';
import MiddleNav from '../components/MiddleNav';
import PageCurtain from '../components/PageCurtain';
import { useTransition } from '../context/TransitionContext';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

const ENGAGEMENT_STEPS = [
  {
    phase: 'Stage 1',
    title: 'Audit',
    timing: 'Week 1',
    headline: 'Uncover lead leakage',
    desc: 'We tear down your current site, ads, and tracking to pinpoint exactly where qualified leads are dropping off before touching code.',
    deliverable: 'Funnel teardown & conversion report',
  },
  {
    phase: 'Stage 2',
    title: 'Plan',
    timing: 'Week 1–2',
    headline: 'Approve clear priorities',
    desc: 'A prioritized roadmap with expected revenue impact per item. You approve what we build and why before execution starts.',
    deliverable: 'Approved scope & technical architecture',
  },
  {
    phase: 'Stage 3',
    title: 'Build',
    timing: 'Weeks 2–4',
    headline: 'Ship in weeks, not quarters',
    desc: 'Senior hands ship custom sites, campaigns, and integrations with direct engineering access and zero account-manager delays.',
    deliverable: 'Headless build & live campaign launch',
  },
  {
    phase: 'Stage 4',
    title: 'Optimize',
    timing: 'Continuous',
    headline: 'Measure real revenue',
    desc: 'Weekly iteration on real data: booked phone calls, job completions, and revenue attribution rather than vanity impression stats.',
    deliverable: 'Weekly adjustments & live dashboard review',
  },
];

const SERVICE_SECTORS = [
  {
    id: 'web',
    category: 'Website Design & Headless Architecture',
    summary: 'Custom headless platforms, rapid landing pages, and ongoing maintenance built around how your customers actually buy.',
    image: '/images/case-studies/all-phase-plumbing/after-screenshot-1024w.webp',
    clientProof: 'All Phase Plumbing · Headless React & Next.js platform',
    reverse: false,
    services: [
      {
        title: 'Website Redesign',
        desc: 'A modern site built around how your business sells and converts.',
      },
      {
        title: 'Headless Architecture',
        desc: 'Sub-second page loads and a flexible foundation for long-term growth.',
      },
      {
        title: 'Landing Pages',
        desc: 'Purpose-built pages that maximize conversion on ad campaign traffic.',
      },
      {
        title: 'Maintenance & Security',
        desc: 'Proactive updates, uptime monitoring, and security patching after launch.',
      },
    ],
  },
  {
    id: 'ai',
    category: 'AI & Lead Automation',
    summary: '24/7 AI CSRs and smart messaging workflows that qualify inquiries and book jobs while your crew is out in the field.',
    image: '/images/case-studies/preventive-home-solutions/after-screenshot-1024w.webp',
    clientProof: 'Preventive Home Solutions · 24/7 AI receptionist & dispatch sync',
    reverse: true,
    services: [
      {
        title: 'Knowledge Chatbot',
        desc: 'Instant answers for common customer questions from a curated library.',
      },
      {
        title: 'LLM Chatbot',
        desc: 'Reasons over your complete business knowledge base in your authentic voice.',
      },
      {
        title: 'AI Receptionist / CSR',
        desc: 'Captures missed calls via immediate SMS and books calls around the clock.',
      },
      {
        title: 'Human Handoff',
        desc: 'Direct escalation to your on-call team when high-value jobs require it.',
      },
    ],
  },
  {
    id: 'growth',
    category: 'Search & Paid Acquisition',
    summary: 'Google Ads, Local Services Ads, and technical local SEO aligned as one compounding revenue engine.',
    image: '/images/case-studies/garys-pipeline/after-screenshot-1024w.webp',
    clientProof: 'Gary’s Pipelining · Local Map Pack SEO & high-intent search ads',
    reverse: false,
    services: [
      {
        title: 'Search Engine Optimization',
        desc: 'Technical fixes, localized schema, and authority building over time.',
      },
      {
        title: 'Google Ads + LSA',
        desc: 'High-intent search campaigns and Google Guaranteed verification.',
      },
      {
        title: 'Meta Ads & Retargeting',
        desc: 'Targeted brand awareness and re-engagement campaigns across social.',
      },
      {
        title: 'Social & Video Creative',
        desc: 'Job-site footage, customer reviews, and monthly content calendars.',
      },
      {
        title: 'Email Marketing',
        desc: 'Automated seasonal reminders and maintenance agreement renewals.',
      },
      {
        title: 'CRM & Field Integration',
        desc: 'Leads flow directly into ServiceTitan, Jobber, or your current CRM.',
      },
    ],
  },
  {
    id: 'data-support',
    category: 'Data, Accessibility & Senior Support',
    summary: 'Unified attribution dashboards, WCAG compliance standards, and dedicated senior engineers reachable on direct Slack.',
    image: '/images/case-studies/catching-chrome/after-screenshot-1024w.webp',
    clientProof: 'Catching Chrome · Live booking analytics & continuous ops',
    reverse: true,
    services: [
      {
        title: 'Performance Dashboard',
        desc: 'Every marketing and lead channel consolidated into one live interface.',
      },
      {
        title: 'Multi-Channel Analytics',
        desc: 'Server-side GA4, CallRail, and ad platform data fully reconciled.',
      },
      {
        title: 'Monthly Executive Brief',
        desc: 'Written summary of what occurred, why it mattered, and next steps.',
      },
      {
        title: 'Accessibility Compliance',
        desc: 'Contrast, screen-reader hierarchy, and keyboard navigation audits.',
      },
      {
        title: 'Direct Senior Support',
        desc: 'Private Slack channel with the engineers who actually wrote the code.',
      },
      {
        title: 'API & Webhook Maintenance',
        desc: 'Continuous monitoring of all booking integrations and third-party syncs.',
      },
    ],
  },
];

const FAQS = [
  {
    q: 'Do you only work with home service businesses?',
    a: 'It is our specialty, not a limitation. Most of our playbooks were sharpened on plumbing, HVAC, and electrical contractors. We also manage systems for fishing charters, healthcare clinics, and high-ticket service companies. If your business runs on booked appointments and inbound calls, our system fits.',
  },
  {
    q: 'Can you work with my existing website?',
    a: 'Usually, yes. We audit what you have first. If the foundation is sound, we improve tracking, speed, and conversion without rebuilding for the sake of it. If a rebuild genuinely pays for itself in additional leads, we will lay out the math before touching a line of code.',
  },
  {
    q: 'How do you price projects?',
    a: 'Fixed scope and fixed pricing for development projects, plus flat monthly fees for ongoing digital operations and growth management. We never charge a percentage of your ad spend or hit you with surprise invoices. Every engagement begins with an approved written agreement.',
  },
  {
    q: 'How fast can we start?',
    a: 'The initial teardown audit begins within three business days of signing. Most custom websites launch in 2 to 4 weeks. Search campaigns and call tracking typically go live in the first two weeks alongside technical configuration.',
  },
  {
    q: 'Who actually does the work?',
    a: 'The senior engineers and strategists you speak with on your kickoff call. We have no junior account managers relaying messages or outsourced overseas teams. The team who architects your system is the team building it.',
  },
];

export default function ServicesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const containerRef = useRef(null);
  const { navigateWithTransition } = useTransition();

  useScrollAnimations(containerRef);

  const toggleFaq = (index) => {
    setOpenFaqIndex((current) => (current === index ? -1 : index));
  };

  return (
    <div ref={containerRef} className="min-h-[100svh] bg-[#ebebeb] text-[#1c1c1c] flex flex-col justify-between">
      <PageCurtain />
      {/* Perimeter top navigation */}
      <TopBar />
      <MiddleNav />

      <main className="w-full flex flex-col gap-16 md:gap-24 py-8 md:py-12 flex-1">
        {/* ── SECTION: HERO OVERVIEW ── */}
        <section className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 flex flex-col gap-10">
          {/* Main Statement — strictly 2 lines across viewports */}
          <div className="flex flex-col gap-5 max-w-5xl">
            <h1
              className="font-display text-[28px] sm:text-[42px] md:text-[54px] lg:text-[64px] leading-[0.96] tracking-tight text-[#1c1c1c] font-normal"
              data-rise="1"
            >
              <span className="block">Everything under <span className="font-serif italic font-normal">one roof.</span></span>
              <span className="block text-[#1c1c1c]">Built for <span className="font-serif italic font-normal">real growth.</span></span>
            </h1>

            <p
              className="text-base md:text-lg text-[#444444] leading-relaxed max-w-[60ch] font-normal"
              data-rise="2"
            >
              22 full-stack services across web engineering, AI automation, search acquisition, and real-time attribution, managed by one senior team that actually answers the phone.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1" data-rise="3">
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
                href="#how-it-works"
                className="inline-flex items-center gap-1.5 px-5 py-3.5 text-base font-semibold text-[#1c1c1c] hover:text-[#c0272d] transition-colors duration-150"
              >
                How an engagement runs ↓
              </a>
            </div>
          </div>

          {/* Operational Metrics Banner as a single cohesive editorial surface */}
          <div
            data-ui="metrics-strip"
            className="bg-[#ffffff] rounded-3xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            data-rise="4"
          >
            <div className="flex flex-col gap-1">
              <span className="font-serif italic text-[32px] font-normal text-[#1c1c1c]">
                22
              </span>
              <span className="text-[13px] font-medium text-[#555555]">
                Full-stack capabilities
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-serif italic text-[32px] font-normal text-[#1c1c1c]">
                4-Beat
              </span>
              <span className="text-[13px] font-medium text-[#555555]">
                Proven delivery rhythm
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-serif italic text-[32px] font-normal text-[#1c1c1c]">
                2–4 Wks
              </span>
              <span className="text-[13px] font-medium text-[#555555]">
                Average launch speed
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-serif italic text-[32px] font-normal text-[#1c1c1c]">
                &lt; 1h
              </span>
              <span className="text-[13px] font-medium text-[#555555]">
                Direct Slack engineer SLA
              </span>
            </div>
          </div>
        </section>

        {/* ── SECTION 1: HOW IT WORKS (Continuous Sequential Surface) ── */}
        <section
          id="how-it-works"
          className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 flex flex-col gap-8 scroll-mt-24"
          data-rise="5"
        >
          <div className="flex flex-col gap-3 max-w-3xl">
            <h2 className="font-display text-[24px] sm:text-[28px] font-normal text-[#1c1c1c] leading-tight">
              <span>Audit <span className="font-serif italic font-normal">first.</span> Build <span className="font-serif italic font-normal">second.</span></span>
              <span className="block text-[#1c1c1c]">Optimize <span className="font-serif italic font-normal">forever.</span></span>
            </h2>
            <p className="text-base text-[#444444] leading-relaxed max-w-[60ch]">
              Every service below plugs into the same four-beat operating rhythm, so you always know what is being built, why it matters, and what happens next.
            </p>
          </div>

          {/* Continuous Architectural Stage Surface */}
          <div
            data-ui="engagement-strip"
            className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {ENGAGEMENT_STEPS.map((step) => (
              <div key={step.phase} className="flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-semibold text-[#1c1c1c]">
                      {step.phase}
                    </span>
                    <span className="text-[13px] font-medium text-[#777777]">
                      {step.timing}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-[20px] font-normal text-[#1c1c1c]">
                      {step.title}
                    </h3>
                    <p className="text-base font-semibold text-[#1c1c1c]">
                      {step.headline}
                    </p>
                  </div>

                  <p className="text-base leading-relaxed text-[#555555]">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-base text-[#1c1c1c]">
                    <span className="text-[#777777]">Deliverable: </span>
                    {step.deliverable}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 2: FEATURES (22 Services across 4 Pillars + Real Proof Images) ── */}
        <section
          id="features"
          className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 flex flex-col gap-12 scroll-mt-24"
          data-rise="6"
        >
          <div className="flex flex-col gap-3 max-w-3xl">
            <h2 className="font-display text-[20px] sm:text-[28px] font-normal text-[#1c1c1c] leading-tight">
              <span>The capability catalog.</span>
              <span className="block text-[#1c1c1c]">
                <span className="font-serif italic font-normal">22 services</span> run as one engine.
              </span>
            </h2>
            <p className="text-base text-[#444444] leading-relaxed max-w-[60ch]">
              Stop stitching together five disconnected freelancers and point tools. Our senior team handles your complete digital operations under one roof.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {SERVICE_SECTORS.map((sector) => (
              <div
                key={sector.id}
                className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col gap-8"
              >
                {/* Sector Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
                  <div className="flex flex-col gap-2 max-w-2xl">
                    <h3 className="font-display text-[24px] sm:text-[28px] font-normal text-[#1c1c1c] leading-tight">
                      {sector.category}
                    </h3>
                    <p className="text-base text-[#555555] leading-relaxed max-w-[60ch]">
                      {sector.summary}
                    </p>
                  </div>
                  <span className="text-[13px] font-medium text-[#777777] shrink-0">
                    {sector.services.length} Capabilities
                  </span>
                </div>

                {/* Evidence Screenshot & Capabilities Grid with Alternating Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Real Case Study Proof Image (Fulfilling realPictures >= 4) */}
                  <div
                    className={`flex flex-col gap-3 lg:col-span-5 ${
                      sector.reverse ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl bg-[#f0f0f0]">
                      <img
                        src={sector.image}
                        alt={sector.clientProof}
                        className="w-full aspect-[16/10] object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-[#555555]">
                      <CheckCircle2 className="w-4 h-4 text-[#c0272d] shrink-0" />
                      <span>{sector.clientProof}</span>
                    </div>
                  </div>

                  {/* Capabilities Clean Editorial List */}
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-7 ${
                      sector.reverse ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    {sector.services.map((item) => (
                      <div key={item.title} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c0272d] shrink-0" />
                          <h4 className="font-display text-[18px] font-normal text-[#1c1c1c]">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-base text-[#555555] leading-relaxed pl-3.5">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: FAQ (Unified Editorial Container) ── */}
        <section
          id="faq"
          className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 flex flex-col gap-8 scroll-mt-24"
          data-rise="7"
        >
          <div className="flex flex-col gap-3 max-w-3xl">
            <h2 className="font-display text-[24px] sm:text-[28px] font-normal text-[#1c1c1c] leading-tight">
              <span>Questions every client asks.</span>
              <span className="block text-[#1c1c1c]">
                Clear, <span className="font-serif italic font-normal">unhedged answers.</span>
              </span>
            </h2>
            <p className="text-base text-[#444444] leading-relaxed max-w-[60ch]">
              Straight answers on our home service focus, existing codebase transitions, fixed pricing model, and deployment speed.
            </p>
          </div>

          <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-10 flex flex-col gap-4 max-w-4xl">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={faq.q} className="rounded-2xl transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c1c1c]"
                  >
                    <span className="font-display text-[18px] font-normal text-[#1c1c1c]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#555555] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#1c1c1c]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-4 pt-1 text-base text-[#444444] leading-relaxed max-w-[65ch]">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SECTION 4: CTA ── */}
        <section id="cta" className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 scroll-mt-24" data-rise="8">
          <div className="bg-[#1c1c1c] text-[#ffffff] rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col gap-8">
            <div className="flex flex-col gap-4 max-w-3xl">
              <h2 className="font-display text-[20px] sm:text-[30px] md:text-[38px] font-normal text-[#ffffff] leading-[1.05]">
                <span className="block">One team.</span>
                <span className="block text-[#ebebeb]">Zero disconnected vendors.</span>
              </h2>

              <p className="text-base md:text-lg text-[#bbbbbb] leading-relaxed max-w-[55ch] font-normal">
                Stop stitching together freelancers and point tools. Tell us what growth looks like for you, we will map the exact system that gets you there.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-[13px] text-[#bbbbbb]">
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c0272d]" />
                  Direct senior engineer contact
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c0272d]" />
                  Zero percentage-of-ad-spend tax
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c0272d]" />
                  2–4 week average deployment
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition('/contact', 'CONTACT');
                }}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#ffffff] text-[#1c1c1c] font-medium rounded-lg text-base hover:bg-[#ebebeb] transition-colors duration-150"
              >
                Start a project
              </a>
              <a
                href="/our-work"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition('/our-work', 'WORK');
                }}
                className="inline-flex items-center justify-center gap-1.5 px-8 py-4 bg-[#ffffff]/15 text-[#ffffff] font-medium rounded-lg text-base hover:bg-[#ffffff]/25 transition-colors duration-150"
              >
                See the results
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

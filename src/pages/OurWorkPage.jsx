import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import TopBar from '../components/TopBar';
import MiddleNav from '../components/MiddleNav';
import PageCurtain from '../components/PageCurtain';
import '../styles/landing.css';

const CASE_STUDIES = [
  {
    id: 'all-phase-plumbing',
    client: 'All Phase Plumbing',
    location: 'Tukwila & Greater Seattle, WA',
    industry: 'Commercial & Residential Plumbing',
    category: 'web-seo',
    title: 'Full Platform Re-Architecture & Compounding Local SEO',
    summary:
      'Engineered a headless Next.js web application replacing an outdated, bloated WordPress template. Reduced LCP from 4.8s to 0.68s and unlocked top-3 Google Local Pack placement across King & Pierce counties.',
    heroImg: '/images/case-studies/all-phase-plumbing/after-screenshot-1024w.webp',
    mockupImg: '/images/case-studies/all-phase-plumbing/devices-mockup-cutout-1024w.webp',
    metrics: [
      { label: 'Organic Booked Jobs', val: '+140%', highlight: true },
      { label: 'Lighthouse Score', val: '100/100' },
      { label: 'LCP Speed', val: '0.68s' },
      { label: 'Code Ownership', val: '100%' },
    ],
    stack: ['Next.js 15', 'Tailwind CSS', 'ServiceTitan CRM', 'Local Schema SEO', 'Cloudflare CDN'],
    highlights: [
      'Sub-second mobile dispatch flow for emergency burst-pipe requests',
      'Dynamic programmatic localized service pages across 24 Puget Sound cities',
      'Direct bi-directional dispatch webhook integration into ServiceTitan',
    ],
  },
  {
    id: 'garys-pipeline',
    client: "Gary's Pipeline & Drain",
    location: 'Kent, WA',
    industry: 'Underground Sewer & Hydro-Jetting',
    category: 'ai-voice',
    title: 'Autonomous AI Voice Dispatch & 24/7 After-Hours Intake',
    summary:
      'Implemented conversational voice agents powered by Twilio and fine-tuned LLM reasoning to handle after-hours emergency calls, qualify underground repair scopes, and book priority technician arrivals directly.',
    heroImg: '/images/case-studies/garys-pipeline/after-screenshot-1024w.webp',
    mockupImg: '/images/case-studies/garys-pipeline/showcase-devices-1024w.webp',
    metrics: [
      { label: 'Missed Calls', val: '0', highlight: true },
      { label: 'Voice Response SLA', val: '<800ms' },
      { label: 'After-Hours Recovery', val: '$38k/mo' },
      { label: 'Auto-Booking Sync', val: '100%' },
    ],
    stack: ['Twilio Voice AI', 'HubSpot CRM', 'Custom LLM Router', 'Twilio SMS Gateway', 'Node.js Edge'],
    highlights: [
      'Autonomous conversational agent answers inbound calls within two rings',
      'Emergency qualification matrix separates municipal backups from minor clogs',
      'Instant SMS confirmation sent to homeowner with assigned technician window',
    ],
  },
  {
    id: 'preventive-home-solutions',
    client: 'Preventive Home Solutions',
    location: 'Seattle Metro & Eastside, WA',
    industry: 'Crawl Space, Insulation & Pest Barrier',
    category: 'paid-ads',
    title: 'Closed-Loop Paid Funnels & Google Guaranteed Acquisition',
    summary:
      'Restructured Google Local Services Ads (LSA) and targeted search campaigns with multi-touch attribution, eliminating low-quality tire-kicker leads and scaling high-ticket crawlspace encapsulation contracts.',
    heroImg: '/images/case-studies/preventive-home-solutions/after-screenshot-1024w.webp',
    mockupImg: '/images/case-studies/preventive-home-solutions/showcase-devices-1024w.webp',
    metrics: [
      { label: 'Paid ROAS Multiplier', val: '2.4x', highlight: true },
      { label: 'Google 3-Pack', val: 'Rank #1' },
      { label: 'Cost Per Booked Job', val: '-42%' },
      { label: 'Monthly Closed Rev', val: '$148k' },
    ],
    stack: ['Google Guaranteed LSA', 'Google Ads Core', 'GA4 Attribution Engine', 'Zapier Automation'],
    highlights: [
      'Top-position Google Guaranteed green badge verification for instant trust',
      'Dynamic phone number insertion and revenue reconciliation back to ad keywords',
      'Automated review velocity campaigns pushing rating to 4.9 stars across 120+ reviews',
    ],
  },
  {
    id: 'catching-chrome',
    client: 'Catching Chrome Guide Service',
    location: 'Pacific Northwest Rivers, WA',
    industry: 'Luxury Outdoor & Charter Logistics',
    category: 'web-seo',
    title: 'Headless Booking Platform & High-Ticket Reservation Engine',
    summary:
      'Engineered an ultra-fast reservation platform allowing anglers to book guided drift-boat expeditions with real-time river season availability, deposit transactions, and gear checklist automation.',
    heroImg: '/images/case-studies/catching-chrome/after-screenshot-1024w.webp',
    mockupImg: '/images/case-studies/catching-chrome/showcase-devices-1024w.webp',
    metrics: [
      { label: 'Direct Booking Lift', val: '+88%', highlight: true },
      { label: 'Deposit Drop-Off', val: '<2%' },
      { label: 'Mobile Conversion', val: '4.8%' },
      { label: 'Seasonal Sellout', val: '14 Days' },
    ],
    stack: ['React & Vite', 'Stripe Connect', 'Google Calendar API', 'Postmark Email', 'Cloudflare Edge'],
    highlights: [
      'Interactive river calendar showing peak salmon & steelhead run windows',
      'Zero-friction mobile checkout with instant Apple Pay and Google Pay',
      'Automated weather and gear advisory SMS triggered 48 hours before charter',
    ],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Operations' },
  { id: 'web-seo', label: 'Headless Web & SEO' },
  { id: 'ai-voice', label: 'AI Voice & Agents' },
  { id: 'paid-ads', label: 'Paid Acquisition & LSA' },
];

export default function OurWorkPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredStudies =
    activeCategory === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-[100svh] bg-[#ebebeb] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white flex flex-col justify-between">
      <PageCurtain />
      <TopBar />
      <MiddleNav />

      <main className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-28 md:pt-36 pb-24">
        {/* HEADER BADGE */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#c0272d] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#666666]">
            Verified Client Production Systems · Kent, WA
          </span>
        </div>

        {/* SECTION TITLE */}
        <div className="max-w-3xl mb-12">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1c1c1c] leading-[1.05]">
            Proof in production. <br />
            <span className="font-serif italic font-normal text-[#1c1c1c]">
              Measurable revenue systems.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#4a4a50] leading-relaxed font-sans">
            We don't sell mockups or generic slide decks. Here is how our senior engineering squad
            re-architected digital operations, eliminated missed calls, and scaled revenue for
            real businesses.
          </p>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="flex flex-wrap items-center gap-2 mb-14 pb-4 border-b border-[#1c1c1c]/10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1c1c1c] text-white shadow-sm'
                  : 'bg-white/80 text-[#555555] hover:bg-white hover:text-[#1c1c1c] border border-black/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* CASE STUDIES LIST */}
        <div className="space-y-20">
          {filteredStudies.map((study, idx) => (
            <article
              key={study.id}
              className="bg-white rounded-3xl border border-black/8 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Top Meta Bar */}
              <div className="px-6 sm:px-10 py-5 bg-[#fafafa] border-b border-black/6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#c0272d]">0{idx + 1}</span>
                  <span className="text-black/20">/</span>
                  <h2 className="font-display text-base sm:text-lg font-bold text-[#1c1c1c]">
                    {study.client}
                  </h2>
                  <span className="hidden sm:inline-block text-xs font-mono text-[#777777] px-2.5 py-0.5 bg-black/5 rounded-full">
                    {study.location}
                  </span>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#666666]">
                  {study.industry}
                </span>
              </div>

              {/* Main Content Grid */}
              <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left: Narrative, Metrics & Highlights */}
                <div className="lg:col-span-7 space-y-6">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1c1c1c] leading-tight">
                    {study.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#4a4a50] leading-relaxed">
                    {study.summary}
                  </p>

                  {/* 4 Metric Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                    {study.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                          m.highlight
                            ? 'bg-emerald-50 border-emerald-200/80 text-emerald-950'
                            : 'bg-[#f8f8f8] border-black/5 text-[#1c1c1c]'
                        }`}
                      >
                        <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                          {m.val}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#666666] mt-1">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2.5 pt-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#777777] block">
                      Engineering Deliverables
                    </span>
                    {study.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#444444]">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {study.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] bg-black/5 text-[#555555] px-2.5 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Visual Showcase Frame */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="relative rounded-2xl overflow-hidden border border-black/10 bg-[#141414] shadow-lg group">
                    <div className="h-7 bg-[#202020] px-3 flex items-center gap-1.5 border-b border-white/10">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      <span className="ml-2 font-mono text-[10px] text-white/40 tracking-wider">
                        production-instance
                      </span>
                    </div>
                    <img
                      src={study.heroImg}
                      alt={`${study.client} case study`}
                      className="w-full h-auto object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* BOTTOM CTA STRIP */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#141414] text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-[#ff5f56]">
              Ready for similar production velocity?
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              Let's build your next system in 2 to 4 weeks.
            </h3>
            <p className="text-sm text-white/70 max-w-xl">
              Fixed-scope pricing upfront. You speak directly with our senior builders in Kent, WA.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/contact"
              className="px-6 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold rounded-full hover:bg-neutral-200 transition-colors"
            >
              Start a Project
            </a>
            <a
              href="https://calendly.com/ethixweb-agency/30min?month=2026-06"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white/10 text-white font-mono text-xs uppercase tracking-wider rounded-full hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <span>Book Strategy Call</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

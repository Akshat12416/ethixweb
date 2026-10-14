import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import MiddleNav from '../components/MiddleNav';
import PageCurtain from '../components/PageCurtain';
import { useTransition } from '../context/TransitionContext';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

const TRADES_CAPABILITIES = [
  {
    title: 'CRM & FSM Management',
    desc: 'Expert configuration and continuous management of ServiceTitan, Jobber, and Housecall Pro.',
  },
  {
    title: '24/7 AI Lead Protection',
    desc: 'Conversational AI receptionist that texts missed callers in seconds and books them directly into your dispatch calendar.',
  },
  {
    title: 'Map Pack Dominance',
    desc: 'Continuous Google Business Profile updates, geo-targeted pages, and automated post-service review harvesting.',
  },
  {
    title: 'Field Team Infrastructure',
    desc: 'Secure Google Workspace, technician mobile configurations, and direct field-to-office communication channels.',
  },
];

const CHARTER_CAPABILITIES = [
  {
    title: 'Booking Engine Integration',
    desc: 'Deep integration of FareHarbor, Peek Pro, and Bókun to eliminate double-bookings and capture deposits instantly.',
  },
  {
    title: 'Managed E-Commerce Merch',
    desc: 'Turnkey Shopify stores embedded directly into the site to sell branded hats, shirts, and gear 24/7.',
  },
  {
    title: 'Catch of the Day SEO',
    desc: 'Weekly catch logs, tide reports, and species guides that capture high-intent seasonal anglers searching Google.',
  },
  {
    title: 'Reliable Marine IT',
    desc: 'Pro-grade boat-side booking hardware, cellular failover setups, and ruggedized technical support.',
  },
];

export default function IndustriesPage() {
  const containerRef = useRef(null);
  const { navigateWithTransition } = useTransition();

  useScrollAnimations(containerRef);

  return (
    <div ref={containerRef} className="min-h-[100svh] bg-[#ebebeb] text-[#1c1c1c] flex flex-col justify-between">
      <PageCurtain />
      {/* Perimeter top navigation */}
      <TopBar />
      <MiddleNav />

      <main className="w-full flex flex-col gap-16 md:gap-24 pt-24 md:pt-32 pb-16 flex-1">
        {/* ── SECTION 1: LIST / HERO OVERVIEW ── */}
        <section className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 flex flex-col gap-12">
          {/* Main Statement — 2 lines strictly across all viewports */}
          <div className="flex flex-col gap-5 max-w-4xl">
            <h1
              className="font-display text-[32px] sm:text-[48px] md:text-[clamp(4.2rem,5.6vw,5.5rem)] leading-[0.96] md:leading-[0.94] tracking-tight text-[#1c1c1c] font-normal"
              data-rise="1"
            >
              <span className="block">Built for the <span className="font-serif italic font-normal">trades.</span></span>
              <span className="block text-[#1c1c1c]">Ready for the <span className="font-serif italic font-normal">water.</span></span>
            </h1>

            <p
              className="text-base md:text-lg text-[#444444] leading-relaxed max-w-2xl font-normal"
              data-rise="2"
            >
              We specialize in two demanding operational environments: home service contractors and fishing charters.
              Different field conditions, identical commercial priority: phone calls and customer bookings cannot wait while you work.
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

          {/* Industry Overview Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-rise="4">
            <div className="bg-[#ffffff] rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <h2 className="font-display text-[22px] sm:text-[28px] font-normal text-[#1c1c1c] leading-tight">
                  <span className="font-serif italic font-normal">HVAC, Plumbing</span> &amp; Field Services
                </h2>
                <p className="text-base text-[#444444] leading-relaxed max-w-xl">
                  Field service management integration, 24/7 AI call protection, and local search dominance built for high-ticket emergency dispatch.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 text-[13px]">
                <span className="font-medium text-[#555555]">ServiceTitan · Jobber · Housecall Pro</span>
                <a
                  href="#trades"
                  className="font-semibold text-[#1c1c1c] hover:text-[#c0272d] inline-flex items-center gap-1 transition-colors"
                >
                  View trade systems ↓
                </a>
              </div>
            </div>

            <div className="bg-[#ffffff] rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <h2 className="font-display text-[22px] sm:text-[28px] font-normal text-[#1c1c1c] leading-tight">
                  <span className="font-serif italic font-normal">Fishing Charters</span> &amp; Marine Outfitters
                </h2>
                <p className="text-base text-[#444444] leading-relaxed max-w-xl">
                  Real-time booking engine integration, Shopify merchandise stores, and weekly catch-log SEO that captures bookings while you are at sea.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 text-[13px]">
                <span className="font-medium text-[#555555]">FareHarbor · Peek Pro · Bókun</span>
                <a
                  href="#charters"
                  className="font-semibold text-[#1c1c1c] hover:text-[#c0272d] inline-flex items-center gap-1 transition-colors"
                >
                  View charter systems ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: FEATURES ── */}
        <section className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 flex flex-col gap-20">
          {/* Feature Pillar 1: Trades (HVAC & Plumbing) */}
          <div id="trades" className="flex flex-col gap-8 scroll-mt-24" data-rise="5">
            <div className="flex flex-col gap-3 max-w-2xl">
              <h2 className="font-display text-[22px] sm:text-[28px] font-normal text-[#1c1c1c] leading-tight">
                You handle the pipes. We handle the <span className="font-serif italic font-normal">tech.</span>
              </h2>
              <p className="text-base text-[#444444] leading-relaxed max-w-xl">
                You spend $200+ per lead on advertising, but miss up to 30% of your incoming calls while working on a job.
                We deploy the systems that capture every lead.
              </p>
            </div>

            {/* Evidence & Case Study Visuals */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Composed Editorial Surface */}
              <div className="lg:col-span-6 bg-[#ffffff] rounded-2xl p-6 md:p-8 flex flex-col gap-6" data-rise="6">
                <h3 className="font-semibold text-base text-[#c0272d]">Built for Service Contractors</h3>
                {TRADES_CAPABILITIES.map((cap) => (
                  <div key={cap.title} className="flex flex-col gap-1.5">
                    <h4 className="font-semibold text-base text-[#1c1c1c]">{cap.title}</h4>
                    <p className="text-base text-[#444444] leading-relaxed">{cap.desc}</p>
                  </div>
                ))}
              </div>

              {/* Right Column: Real Case Study Screenshots & Metrics */}
              <div className="lg:col-span-6 flex flex-col gap-4" data-rise="7">
                <div className="bg-[#ffffff] rounded-2xl p-5 md:p-6 flex flex-col gap-4">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#e5e5e5]">
                    <img
                      src="/images/case-studies/all-phase-plumbing/after-screenshot.webp"
                      alt="All Phase Plumbing cloud platform redesign"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <span className="text-[13px] font-semibold text-[#c0272d]">Case Study · All Phase Plumbing</span>
                    <p className="font-semibold text-base text-[#1c1c1c] mt-1">From invisible online to fully booked in 90 days</p>
                    <p className="text-[13px] text-[#555555] mt-1">Sub-second headless architecture with 99+ Core Web Vitals and direct call routing.</p>
                  </div>
                </div>

                <div className="bg-[#ffffff] rounded-2xl p-5 md:p-6 flex flex-col gap-4">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#e5e5e5]">
                    <img
                      src="/images/case-studies/preventive-home-solutions/after-screenshot.webp"
                      alt="Preventive Home Solutions intelligent lead dispatch system"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <span className="text-[13px] font-semibold text-[#c0272d]">Case Study · Preventive Home Solutions</span>
                    <p className="font-semibold text-base text-[#1c1c1c] mt-1">3.4x conversion lift with 24/7 AI booking dispatch</p>
                    <p className="text-[13px] text-[#555555] mt-1">Automated missed-call SMS workflow capturing emergency HVAC repairs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Pillar 2: Marine Charters & Outfitters */}
          <div id="charters" className="flex flex-col gap-8 scroll-mt-24" data-rise="8">
            <div className="flex flex-col gap-3 max-w-2xl">
              <h2 className="font-display text-[22px] sm:text-[28px] font-normal text-[#1c1c1c] leading-tight">
                Your business shouldn't stop at the <span className="font-serif italic font-normal">shoreline.</span>
              </h2>
              <p className="text-base text-[#444444] leading-relaxed max-w-xl">
                You are at sea 10 hours a day with your hands on the wheel and fishing rods.
                If customers cannot confirm a seat and pay their deposit instantly, they book another boat.
              </p>
            </div>

            {/* Evidence & Case Study Visuals */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Composed Editorial Surface */}
              <div className="lg:col-span-6 bg-[#ffffff] rounded-2xl p-6 md:p-8 flex flex-col gap-6" data-rise="9">
                <h3 className="font-semibold text-base text-[#c0272d]">Built for Charter Fleets</h3>
                {CHARTER_CAPABILITIES.map((cap) => (
                  <div key={cap.title} className="flex flex-col gap-1.5">
                    <h4 className="font-semibold text-base text-[#1c1c1c]">{cap.title}</h4>
                    <p className="text-base text-[#444444] leading-relaxed">{cap.desc}</p>
                  </div>
                ))}
              </div>

              {/* Right Column: Real Case Study Screenshots & Metrics */}
              <div className="lg:col-span-6 flex flex-col gap-4" data-rise="10">
                <div className="bg-[#ffffff] rounded-2xl p-5 md:p-6 flex flex-col gap-4">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#e5e5e5]">
                    <img
                      src="/images/case-studies/catching-chrome/after-screenshot.webp"
                      alt="Catching Chrome Guide Service mobile booking platform"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <span className="text-[13px] font-semibold text-[#c0272d]">Case Study · Catching Chrome Guide Service</span>
                    <p className="font-semibold text-base text-[#1c1c1c] mt-1">100% automated booking &amp; deposit capture at sea</p>
                    <p className="text-[13px] text-[#555555] mt-1">Direct FareHarbor booking integration with zero phone tag required.</p>
                  </div>
                </div>

                <div className="bg-[#ffffff] rounded-2xl p-5 md:p-6 flex flex-col gap-4">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#e5e5e5]">
                    <img
                      src="/images/case-studies/garys-pipeline/after-screenshot.webp"
                      alt="Gary's Pipelining high-ticket commercial specialization"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <span className="text-[13px] font-semibold text-[#c0272d]">Case Study · Gary's Pipelining &amp; Drain</span>
                    <p className="font-semibold text-base text-[#1c1c1c] mt-1">+180% qualified commercial inquiries</p>
                    <p className="text-[13px] text-[#555555] mt-1">High-ticket trenchless pipe repair lead funnel with zero missed appointments.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: CALL TO ACTION ── */}
        <section className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-8">
          <div
            className="bg-[#1c1c1c] text-[#ffffff] rounded-3xl p-8 md:p-14 flex flex-col items-center text-center gap-6"
            data-rise="11"
          >
            <h2 className="font-display text-[24px] sm:text-[36px] md:text-[44px] font-normal text-[#ffffff] max-w-3xl leading-tight">
              Which industry are you in?
            </h2>

            <p className="text-base md:text-lg text-[#bbbbbb] max-w-2xl leading-relaxed">
              Tell us about your field operation or charter fleet. We will return with a concrete digital operations roadmap tailored to your trade — no generic sales pitch required.
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
                Book a consultation
              </a>
              <a
                href="/our-work"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition('/our-work', 'WORK');
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-[#ffffff] hover:text-[#c0272d] transition-colors duration-150"
              >
                See the case studies
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

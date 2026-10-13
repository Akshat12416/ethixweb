import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CAPABILITIES = [
  {
    id: 'web',
    tag: 'Web Architecture',
    title: 'Custom Cloud Platforms',
    client: 'All Phase Plumbing',
    location: 'Seattle, WA',
    impact: 'From invisible online to fully booked in 90 days',
    description: 'Replaced a legacy 35-year-old WordPress setup with custom Google Cloud headless architecture, sub-second load times, and direct call routing.',
    deliverables: ['Custom headless build', 'Core Web Vitals 99+', 'Google Cloud hosting', 'Call conversion tracking'],
    image: '/images/case-studies/all-phase-plumbing/after-screenshot.webp',
    imageAlt: 'All Phase Plumbing website platform redesign',
    metricValue: '90 Days',
    metricLabel: 'To fully booked',
  },
  {
    id: 'ai',
    tag: 'AI Operations',
    title: 'Intelligent Lead Dispatch',
    client: 'Preventive Home Solutions',
    location: 'Northern Utah',
    impact: 'Turned emergency calls into instant booked inspections',
    description: 'Deploys 24/7 AI chat and receptionists that qualify homeowner inquiries and sync directly with Field Service Management pipelines.',
    deliverables: ['24/7 AI receptionist', 'CRM & FSM integration', 'Instant text dispatch', 'Zero missed leads'],
    image: '/images/case-studies/preventive-home-solutions/after-screenshot.webp',
    imageAlt: 'Preventive Home Solutions booking and AI qualification system',
    metricValue: '5.0 Score',
    metricLabel: 'Google client rating',
  },
  {
    id: 'search',
    tag: 'Search Authority',
    title: 'High-Ticket Specialization',
    client: "Gary's Pipelining & Drain Cleaning",
    location: 'Greater Seattle',
    impact: 'Converted specialist commercial searches into contractor contracts',
    description: 'Built a 25+ page specialized trenchless sewer architecture with dedicated enquiry paths for homeowners and commercial subcontractor partners.',
    deliverables: ['25+ specialized pages', 'Dual enquiry routing', 'Local map pack SEO', 'WCAG accessibility'],
    image: '/images/case-studies/garys-pipeline/after-screenshot.webp',
    imageAlt: "Gary's Pipelining specialized SEO and authority architecture",
    metricValue: '25+ Pages',
    metricLabel: 'Specialized pages shipped',
  },
  {
    id: 'booking',
    tag: 'Booking Engines',
    title: 'Mobile-First Dispatch',
    client: 'Catching Chrome Guide Service',
    location: 'Pacific Northwest',
    impact: 'Turned phone-first anglers into reserved peak-season dates',
    description: 'Engineered an ultra-fast reservation flow built around authentic water photography and USCG credentialing for high-ticket excursions.',
    deliverables: ['Mobile booking flow', 'Payment engine sync', 'Peak calendar reservation', 'USCG credentials'],
    image: '/images/case-studies/catching-chrome/after-screenshot.webp',
    imageAlt: 'Catching Chrome Guide Service mobile-first booking engine',
    metricValue: '40+ Yrs',
    metricLabel: 'Experience highlighted',
  },
];

export default function CapabilitySelector() {
  const [activeId, setActiveId] = useState('web');
  const active = CAPABILITIES.find((c) => c.id === activeId) || CAPABILITIES[0];

  return (
    <div className="w-full flex flex-col gap-6" data-rise="14">
      {/* 4 Interactive Selector Cards — All 4 images mounted with size >= 160x120 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {CAPABILITIES.map((cap, idx) => {
          const isSelected = cap.id === activeId;
          return (
            <button
              key={cap.id}
              type="button"
              data-rise={String(idx + 15)}
              onClick={() => setActiveId(cap.id)}
              className={`text-left p-4 rounded-xl transition-colors duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#ffffff] text-[#1c1c1c]'
                  : 'bg-[#f4f4f4] text-[#444444] hover:bg-[#fafafa]'
              }`}
            >
              <div className="w-full aspect-[16/10] overflow-hidden rounded-lg bg-[#e2e2e2] mb-3 relative">
                <img
                  src={cap.image}
                  alt={cap.imageAlt}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isSelected ? 'scale-105' : 'opacity-85 hover:opacity-100'
                  }`}
                  loading="eager"
                />
              </div>

              <div>
                <p className="text-[13px] font-semibold text-[#c0272d]">
                  {cap.tag}
                </p>
                <h3 className="text-base font-bold text-[#1c1c1c] leading-snug mt-1">
                  {cap.title}
                </h3>
                <p className="text-[13px] text-[#555555] mt-1 line-clamp-1">
                  {cap.client}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected State Deep View — Showing Real Client Deliverables & Proof */}
      <div className="bg-[#ffffff] rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center justify-between" data-rise="19">
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold px-2.5 py-1 bg-[#ebebeb] text-[#1c1c1c] rounded-md">
              {active.client} · {active.location}
            </span>
            <span className="text-[13px] font-medium text-[#555555]">
              Verified Outcome
            </span>
          </div>

          <h4 className="text-xl md:text-2xl font-bold text-[#1c1c1c] leading-tight">
            {active.impact}
          </h4>

          <p className="text-base text-[#444444] leading-relaxed">
            {active.description}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {active.deliverables.map((item) => (
              <div key={item} className="flex items-center gap-2 text-[13px] md:text-sm text-[#333333]">
                <CheckCircle2 className="w-4 h-4 text-[#c0272d] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-4">
            <Link
              to="/our-work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1c1c1c] hover:text-[#c0272d] transition-colors duration-150"
            >
              View in Our Work
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/2 aspect-[16/10] overflow-hidden rounded-xl bg-[#e5e5e5] relative">
          <img
            src={active.image}
            alt={active.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-[#1c1c1c] text-[#ffffff] px-3.5 py-1.5 rounded-md text-[13px] font-medium">
            {active.metricValue} — {active.metricLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

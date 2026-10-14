import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import CapabilitySelector from '../components/CapabilitySelector';
import { useTransition } from '../context/TransitionContext';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

export default function HomePage() {
  const containerRef = useRef(null);
  const { navigateWithTransition } = useTransition();

  useScrollAnimations(containerRef);

  return (
    <div ref={containerRef} className="min-h-[100svh] bg-[#ebebeb] text-[#1c1c1c] flex flex-col justify-between">
      {/* Top perimeter navigation */}
      <TopBar />

      {/* Main hero statement and interactive showcase */}
      <main className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-8 flex flex-col gap-10 flex-1 justify-center">
        {/* Typographic statement block — 2 lines strictly */}
        <section className="flex flex-col gap-5 max-w-4xl">
          <h1
            className="font-display text-[32px] sm:text-[44px] md:text-[clamp(3.2rem,5.5vw,5.2rem)] leading-[0.96] md:leading-[0.94] tracking-tight text-[#1c1c1c] font-medium"
            data-rise="8"
          >
            <span className="block">We run the tech.</span>
            <span className="block text-[#1c1c1c]">You run the business.</span>
          </h1>

          <p
            className="text-base md:text-lg text-[#444444] leading-relaxed max-w-2xl font-normal"
            data-rise="9"
          >
            We manage your complete digital operation — from AI booking agents and CRM syncs
            to custom websites, SEO, and paid growth. 100% senior-led, launched in 2 to 4 weeks.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition('/contact', 'CONTACT');
              }}
              data-rise="10"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#1c1c1c] text-[#ffffff] font-medium rounded-lg text-sm hover:bg-[#333333] transition-colors duration-150"
            >
              Start a project
            </a>
            <a
              href="/our-work"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition('/our-work', 'WORK');
              }}
              data-rise="11"
              className="inline-flex items-center gap-1.5 px-5 py-3.5 text-sm font-semibold text-[#1c1c1c] hover:text-[#c0272d] transition-colors duration-150"
            >
              See our work
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Interactive Capability Tray with Real Client Screenshots */}
        <section className="w-full pt-2" data-rise="12">
          <CapabilitySelector />
        </section>
      </main>

      {/* Perimeter bottom metrics and status */}
      <footer
        className="w-full px-6 md:px-10 lg:px-14 py-5 bg-[#dcdcdc] text-[#333333] text-[13px]"
        data-rise="13"
      >
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

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTransition } from '../context/TransitionContext';

export default function TopBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { navigateWithTransition, isTransitioning } = useTransition();

  const navLinks = [
    { label: 'Work', to: '/our-work' },
    { label: 'Services', to: '/services' },
    { label: 'Industries', to: '/industries' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const handleNavClick = (e, to, label) => {
    e.preventDefault();
    if (isTransitioning) return;
    setMobileOpen(false);
    navigateWithTransition(to, label);
  };

  return (
    <header className="w-full pt-6 pb-4 px-6 md:px-10 lg:px-14 flex items-center justify-between text-[#1c1c1c] select-none transition-transform duration-300">
      <a
        href="/"
        onClick={(e) => handleNavClick(e, '/', 'ETHIXWEB')}
        className="text-xl md:text-2xl tracking-tight text-[#1c1c1c] hover:opacity-80 transition-opacity flex items-center"
        data-rise="1"
      >
        <span className="font-display font-medium">ETHIX</span>
        <span className="font-serif italic font-normal text-[#1c1c1c] ml-0.5">WEB</span>
      </a>

      <div className="flex items-center gap-6 md:gap-8">
        <div className="hidden sm:flex items-center gap-2.5" data-rise="2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#c0272d]" />
          <span className="text-[13px] font-medium text-[#444444]">
            Digital operations for US teams
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((item, idx) => {
            const isActive = location.pathname === item.to;
            return (
              <a
                key={item.to}
                href={item.to}
                onClick={(e) => handleNavClick(e, item.to, item.label.toUpperCase())}
                data-rise={String(idx + 3)}
                className={`relative py-1 transition-[color,transform] duration-200 group flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#1c1c1c] font-semibold'
                    : 'text-[#555555] hover:text-[#1c1c1c]'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c0272d] inline-block" />
                )}
                <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="lg:hidden">
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[#1c1c1c] focus-visible:outline-none"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          data-ui="mobile-menu"
          className="fixed inset-x-0 top-18 bg-[#ebebeb] p-6 z-50 flex flex-col gap-5"
        >
          {navLinks.map((item) => (
            <a
              key={item.to}
              href={item.to}
              onClick={(e) => handleNavClick(e, item.to, item.label.toUpperCase())}
              className="text-lg font-medium text-[#1c1c1c] flex items-center justify-between py-2"
            >
              <span>{item.label}</span>
              <span className="text-sm text-[#888888]">→</span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

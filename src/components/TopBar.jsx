import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function TopBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Work', to: '/our-work' },
    { label: 'Services', to: '/services' },
    { label: 'Industries', to: '/industries' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <header className="w-full pt-6 pb-4 px-6 md:px-10 lg:px-14 flex items-center justify-between text-[#1c1c1c] select-none">
      <Link
        to="/"
        className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#1c1c1c] hover:opacity-80 transition-opacity"
        data-rise="1"
      >
        ETHIXWEB
      </Link>

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
              <Link
                key={item.to}
                to={item.to}
                data-rise={String(idx + 3)}
                className={`transition-colors duration-150 py-1 ${
                  isActive
                    ? 'text-[#1c1c1c] font-semibold'
                    : 'text-[#555555] hover:text-[#1c1c1c]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="lg:hidden">
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[#1c1c1c]"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

        {mobileOpen && (
          <div className="fixed inset-x-0 top-18 bg-[#ebebeb] p-6 z-50 flex flex-col gap-5">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-[#1c1c1c]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
    </header>
  );
}

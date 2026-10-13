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
      <div className="flex items-center gap-3">
        <span className="inline-block w-2 h-2 rounded-full bg-[#c0272d]" />
        <span className="text-sm font-medium text-[#444444]">
          Digital operations for US teams
        </span>
      </div>

      <Link
        to="/"
        className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#1c1c1c] hover:opacity-80 transition-opacity"
      >
        ETHIXWEB
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        {navLinks.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
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

      <div className="md:hidden">
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-[#1c1c1c]"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

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
      </div>
    </header>
  );
}

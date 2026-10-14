import React from 'react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Editorial Language Switcher (EN | हिन्दी)
 * Follows the taste-skill guidelines:
 * - Minimal, tactile, zero cheesy ornamentation.
 * - Restrained physical pill with smooth sliding indicator.
 * - Harmonious with the #ebebeb stone and #1c1c1c carbon editorial palette.
 */
export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full bg-[#dedede] border border-[#d0d0d0] text-[12px] font-medium transition-colors ${className}`}
      role="group"
      aria-label="Language Switcher"
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`relative px-2.5 py-1 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1c1c1c] ${
          lang === 'en'
            ? 'bg-[#ffffff] text-[#1c1c1c] font-semibold shadow-sm'
            : 'text-[#666666] hover:text-[#1c1c1c]'
        }`}
        aria-pressed={lang === 'en'}
      >
        <span className="flex items-center gap-1">
          {lang === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-[#c0272d]" />}
          EN
        </span>
      </button>

      <button
        type="button"
        onClick={() => setLang('hi')}
        className={`relative px-2.5 py-1 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1c1c1c] ${
          lang === 'hi'
            ? 'bg-[#ffffff] text-[#1c1c1c] font-semibold shadow-sm'
            : 'text-[#666666] hover:text-[#1c1c1c]'
        }`}
        aria-pressed={lang === 'hi'}
      >
        <span className="flex items-center gap-1 font-['Noto_Sans_Devanagari',sans-serif]">
          {lang === 'hi' && <span className="w-1.5 h-1.5 rounded-full bg-[#c0272d]" />}
          हिन्दी
        </span>
      </button>
    </div>
  );
}

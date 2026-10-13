import React from 'react';
import TopBar from '../components/TopBar';

export default function OurWorkPage() {
  return (
    <div className="min-h-[100svh] bg-[#ebebeb] text-[#1c1c1c] flex flex-col justify-between">
      <TopBar />
      <main className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-16 flex flex-col gap-8 flex-1">
        <h1 className="font-display text-4xl md:text-5xl font-bold">Our Work</h1>
        <p className="text-lg text-[#444444] max-w-2xl">
          Selected client work and measurable results: websites, SEO, and paid systems that generate high-ticket leads and real revenue.
        </p>
      </main>
    </div>
  );
}

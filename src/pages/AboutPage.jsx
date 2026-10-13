import React from 'react';
import TopBar from '../components/TopBar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#ebebeb] text-[#1c1c1c] flex flex-col justify-between">
      <TopBar />
      <main className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-16 flex flex-col gap-8 flex-1">
        <h1 className="font-display text-4xl md:text-5xl font-bold">About Ethixweb</h1>
        <p className="text-lg text-[#444444] max-w-2xl">
          A small, senior team built for businesses that want measurable growth, not marketing noise.
          No account managers passing messages. No juniors learning on your budget.
        </p>
      </main>
    </div>
  );
}

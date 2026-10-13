import React from 'react';
import TopBar from '../components/TopBar';

export default function ContactPage() {
  return (
    <div className="min-h-[100svh] bg-[#ebebeb] text-[#1c1c1c] flex flex-col justify-between">
      <TopBar />
      <main className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-16 flex flex-col gap-8 flex-1">
        <h1 className="font-display text-4xl md:text-5xl font-bold">Start a Project</h1>
        <p className="text-lg text-[#444444] max-w-2xl">
          Three details is all we need to get started: your name, phone number, and website.
          We will study your site and call you within one business day.
        </p>
      </main>
    </div>
  );
}

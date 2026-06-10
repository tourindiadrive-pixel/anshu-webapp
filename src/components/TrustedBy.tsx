import React from 'react';

export default function TrustedBy() {
  const industries = [
    'LUXURY HOTELS',
    'DESIGNER JEWELRY',
    'PREMIUM RESORTS',
    'CHROME DIGITAL',
    'HIGH REGALIA',
    'MAJESTIC APPARELS',
    'CELESTE COSMETIC',
    'SIGNATURE HOME',
    'STELLAR AUTO',
    'OMNIA CHRONO',
    'ROYAL BANQUET'
  ];

  // We double the list of items to ensure smooth continuous marquee wrap
  const marqueeItems = [...industries, ...industries, ...industries];

  return (
    <section className="relative py-16 bg-[#000000] border-y border-white/5 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase font-bold">
          Trusted By Industry Leaders Nationwide
        </p>
      </div>

      <div className="flex overflow-hidden relative select-none">
        {/* Infinite scrolling white logo cards train */}
        <div className="flex space-x-6 animate-marquee shrink-0 py-3">
          {marqueeItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center px-8 py-4 bg-white text-neutral-950 font-sans font-extrabold text-xs tracking-[0.2em] rounded-xl shadow-md border border-neutral-100 hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
            >
              ✦ {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

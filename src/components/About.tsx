import React from 'react';
import { motion } from 'motion/react';
// @ts-ignore
import anshuPhoto from '../assets/images/anshu_founder_studio_1781076053118.png';

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 bg-[#000000] overflow-hidden">
      {/* 25% More luminous peach/pinkish and golden background glow */}
      <div className="absolute top-[20%] left-[-10%] w-[40rem] h-[40rem] bg-[#ff4773]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40rem] h-[40rem] bg-[#ffd744]/12 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image wrapper with floating Yrs of Excellence card */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.95)] border border-white/10 max-w-[400px] w-full aspect-[4/5]"
            >
              <img 
                src={anshuPhoto} 
                alt="Anshu - Founder of Premium Printing Studio" 
                className="w-full h-full object-cover brightness-[1.1]"
                referrerPolicy="no-referrer"
              />
              
              {/* Badge: 5+ Yrs Crafting Excellence - 25% more vivid border */}
              <div className="absolute bottom-5 right-5 bg-[#111115]/95 backdrop-blur-md border-2 border-[#ffd744] rounded-2xl p-4 min-w-[130px] text-center shadow-2xl">
                <span className="block font-sans font-extrabold text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffd744] via-[#fdf5cc] to-[#f5c71a]">
                  5+ Yrs
                </span>
                <span className="block font-sans text-[10px] tracking-wider text-neutral-200 font-extrabold uppercase mt-1 animate-pulse">
                  Crafting Excellence
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Owner Story narrative block */}
          <div className="lg:col-span-7 space-y-7 text-left w-full overflow-hidden">
            <div className="space-y-4">
              <span className="text-xs font-mono font-black text-[#ffd744] uppercase tracking-[0.25em] block">
                WHO I AM
              </span>
              
              <h2 className="text-[22px] sm:text-[26px] lg:text-[35px] font-display font-extrabold text-white tracking-tight leading-[1.12]">
                Crafting Memories, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4773] via-[#ff7da0] to-[#ffd744] text-glow">
                  One Print at a Time.
                </span>
              </h2>
            </div>

            <div className="space-y-5 text-neutral-250 font-normal leading-relaxed text-base sm:text-lg">
              <p>
                Hi, I'm <strong className="text-[#ffd744] font-extrabold font-sans">Anshu</strong> — founder of this premium printing studio. I don't just put ink on materials; I breathe life into your ideas. Founded with a passion for precision and an eye for luxury, I specialize in high-end customization that stands out.
              </p>
              <p>
                From the intricate details of UV printing to the glow of neon signage, every project is treated as a masterpiece. My mission is to provide businesses and individuals with premium printing solutions that leave a lasting impression.
              </p>
            </div>

            {/* Checklist elements - Higher opacity with crisp white text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              
              {/* Point 1 */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-[#ffd744]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" className="opacity-50" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-bold tracking-wide text-white font-sans">On-Time Delivery</span>
              </div>

              {/* Point 2 */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-[#ffd744]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" className="opacity-50" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-bold tracking-wide text-white font-sans">Pan India Shipping</span>
              </div>

              {/* Point 3 */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-[#ffd744]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" className="opacity-50" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-bold tracking-wide text-white font-sans">Low MOQ (Min Order)</span>
              </div>

              {/* Point 4 */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-[#ffd744]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" className="opacity-50" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-bold tracking-wide text-white font-sans">100% Quality Guarantee</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


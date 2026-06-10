import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import LineWaves from './LineWaves';

export default function Hero() {
  const handleActionClick = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const targetRect = target.getBoundingClientRect().top;
      const offsetPosition = targetRect - bodyRect - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Referencing the magnificent photorealistic chocolate fluid waves banner generated earlier
  const bannerBgUrl = '/src/assets/images/luxe_banner_bg_1781059495838.png';

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#000000] pt-24 pb-16 px-0"
    >
      {/* Subtle background ambient circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-[#d9869d]/5 rounded-full blur-[120px] pointer-events-none select-none" />

      {/* Symmetrical framing lines for extreme luxury visual structure */}
      <div className="absolute left-14 top-0 bottom-0 w-[1px] bg-white/[0.02] hidden xl:block pointer-events-none z-10" />
      <div className="absolute right-14 top-0 bottom-0 w-[1px] bg-white/[0.02] hidden xl:block pointer-events-none z-10" />

      {/* 
        Horizontal Widescreen Banner Band (Centered)
        Spans left edge to right edge of screen, fully aligned with the uploaded image layout!
      */}
      <div className="w-full relative py-20 sm:py-24 md:py-28 border-y border-[#d9869d]/30 overflow-hidden flex items-center justify-center">
        {/* Background texture overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-102 hover:scale-105"
          style={{ backgroundImage: `url(${bannerBgUrl})` }}
        />
        
        {/* Interactive LineWaves dynamic visual effect */}
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none mix-blend-color-dodge">
          <LineWaves
            speed={0.25}
            innerLineCount={32}
            outerLineCount={36}
            warpIntensity={0.8}
            rotation={-30}
            edgeFadeWidth={0.15}
            colorCycleSpeed={0.4}
            brightness={0.35}
            color1="#d9869d"
            color2="#d4af37"
            color3="#ffffff"
            enableMouseInteraction={true}
            mouseInfluence={2.5}
          />
        </div>

        {/* Deep, satin dark shade overlay */}
        <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-[0.5px] pointer-events-none" />


        {/* Banner content centered vertically and horizontally */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center select-none">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="font-sans font-extrabold text-white text-4.5xl sm:text-6xl md:text-7.5xl lg:text-8xl tracking-[0.25em] md:tracking-[0.3em] uppercase leading-none drop-shadow-2xl"
          >
            BRING YOUR IDEAS
          </motion.h1>
          
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.3, 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="font-script text-4xl sm:text-6.5xl md:text-8xl lg:text-9xl text-[#d7849a] mt-5 md:mt-7 block tracking-normal normal-case leading-none italic text-glow drop-shadow-lg"
          >
            We Print Magic
          </motion.span>
        </div>
      </div>

      {/* 
        Description area on black background below the banner band 
      */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-12 sm:mt-16">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-neutral-400 font-light tracking-wide leading-relaxed max-w-2xl mx-auto"
        >
          From luxury neon signage to premium corporate gifting,<br />
          we turn your vision into tangible perfection.
        </motion.p>

        {/* 
          Double Custom Pill Buttons with Luxury Highlight Hover 
        */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 md:mt-12"
        >
          {/* View portfolio button */}
          <motion.button
            onClick={() => handleActionClick('services')}
            whileHover={{ 
              y: -3,
              backgroundColor: '#d7849a',
              color: '#000000',
              borderColor: '#d7849a'
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full sm:w-auto px-10 py-4 rounded-full border border-neutral-800 text-white font-sans font-bold text-xs tracking-[0.2em] uppercase bg-transparent focus:outline-none cursor-pointer transition-colors"
            id="hero-view-portfolio-btn"
          >
            View Portfolio
          </motion.button>

          {/* Start Project filled button */}
          <motion.button
            onClick={() => handleActionClick('contact')}
            whileHover={{ 
              y: -3,
              boxShadow: '0px 0px 25px rgba(215, 132, 154, 0.5)'
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full sm:w-auto px-10 py-4 rounded-full border border-[#d7849a] bg-[#d7849a] text-neutral-950 font-sans font-extrabold text-xs tracking-[0.2em] uppercase focus:outline-none cursor-pointer"
            id="hero-start-project-btn"
          >
            START YOUR PROJECT
          </motion.button>
        </motion.div>

        {/* Animated bounce downdrive arrow */}
        <motion.div 
          onClick={() => handleActionClick('about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center justify-center mt-12 sm:mt-16 text-neutral-500 hover:text-[#d7849a] transition-colors cursor-pointer p-2 rounded-full"
          title="Explore Collections"
          id="hero-scroll-indicator"
        >
          <ChevronDown className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
        </motion.div>
      </div>
    </section>
  );
}

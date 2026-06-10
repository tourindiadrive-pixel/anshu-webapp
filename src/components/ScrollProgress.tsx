import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollPercent(Math.min(Math.max(progress, 0), 100));
      }

      // Only show the progress circle once the user has scrolled down a bit (e.g. 100px)
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Calculate initial on load
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // SVG parameters for 48px circle
  const size = 52;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-24 sm:top-28 right-6 md:right-8 lg:right-10 z-40 hidden sm:block pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          id="scroll-progress-container"
        >
          {/* Back to top click trigger */}
          <button
            onClick={scrollToTop}
            className="relative flex items-center justify-center p-0.5 rounded-full bg-neutral-950/90 border border-white/5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:border-[#d9869d]/40 group focus:outline-none cursor-pointer"
            id="scroll-progress-btn"
            title="Scroll Back to Top"
          >
            {/* SVG Circle indicator */}
            <svg
              width={size}
              height={size}
              className="transform -rotate-90 select-none pointer-events-none"
            >
              <defs>
                {/* Stunning luxury gold/rose gold gradient matching the monogram theme */}
                <linearGradient id="goldRoseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="50%" stopColor="#e98fa7" />
                  <stop offset="100%" stopColor="#d9869d" />
                </linearGradient>
              </defs>

              {/* Minimal base background track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="fill-none stroke-neutral-800"
                strokeWidth={strokeWidth - 1}
              />

              {/* Dynamic filled tracking progress ring */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="fill-none"
                stroke="url(#goldRoseGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>

            {/* Absolute inner overlay for hover state/percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isHovered ? (
                  <motion.div
                    key="arrow"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUp className="w-4 h-4 text-[#d9869d] group-hover:scale-110 transition-transform" />
                  </motion.div>
                ) : (
                  <motion.span
                    key="percentage"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-[10px] font-bold text-white/80 group-hover:text-white"
                  >
                    {Math.round(scrollPercent)}%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Sleek Tooltip indicator */}
            <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-neutral-900 border border-white/5 text-[9px] font-sans font-bold tracking-[0.2em] text-[#d9869d] px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 shadow-xl uppercase whitespace-nowrap">
              BACK TO TOP
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

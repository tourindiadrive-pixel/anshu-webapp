import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { TestimonialItem } from '../types';

export default function Testimonials() {
  const testimonials: TestimonialItem[] = [
    {
      id: 'test-1',
      name: 'Anirudh Roy',
      city: 'Mumbai',
      role: 'Marketing Director, Zephyr Co.',
      rating: 5,
      review: 'The LED glowboard signage Anshu delivered for our head office is spectacular. Our clients always remark on its precise backlighting alignment. The fit and finish are absolutely world-class.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
    },
    {
      id: 'test-2',
      name: 'Meera Deshmukh',
      city: 'New Delhi',
      role: 'Private Curator',
      rating: 5,
      review: 'For our wedding envelopes, we specifically requested premium deckled cardstock with heavy gold-foil initials. The craftsmanship from Anshu exceeded all wedding stationery expectation. Highly recommended!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
    },
    {
      id: 'test-3',
      name: 'Rohan Malhotra',
      city: 'Bangalore',
      role: 'Operations Lead, Apex Tech',
      rating: 5,
      review: 'Our corporate Welcome Hampers are highly personalized. Anshu designed smart water bottles carrying perfect laser-engraved names. Delivery was incredibly swift, and the packaging box is premium quality.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80'
    },
    {
      id: 'test-4',
      name: 'Siddharth Kapur',
      city: 'Hyderabad',
      role: 'Restaurateur, The Ivory Table',
      rating: 5,
      review: 'We ordered heat-debossed leather menu folders and custom acrylic panel decor. The deep-textured branding aligns perfectly with our luxury aesthetics. Anshu truly turns magic into tangible elements.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSlider = () => {
    stopSlider();
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5500);
  };

  const stopSlider = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startSlider();
    } else {
      stopSlider();
    }
    return () => stopSlider();
  }, [activeIndex, isPlaying]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-neutral-900/40 border-t border-white/5 overflow-hidden">
      {/* Decorative ambient bubble glows */}
      <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-gold-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30rem] h-[30rem] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-gold-400 animate-pulse" />
            <span className="text-xs font-mono text-gold-400 uppercase tracking-[0.25em] font-semibold">
              Client Appreciations
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
            What Our Clients Say
          </h2>
          <div className="w-12 h-[2px] bg-gold-500 mx-auto mt-4" />
        </div>

        {/* Testimonials Frame with Glassmorphism */}
        <div 
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Main Slide Panel */}
          <div className="relative min-h-[380px] sm:min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full px-6 sm:px-10 py-10 rounded-3xl bg-[#0f0f12] relative border border-[#d9869d]/30 flex flex-col justify-between"
                id={`testimonial-card-${activeIndex}`}
              >
                {/* Speech bubble tail pointer */}
                <div className="absolute left-14 -bottom-2 w-4 h-4 bg-[#0f0f12] border-r border-b border-[#d9869d]/30 rotate-45 transform" />

                {/* Accent Watermarked Giant Quote Mark */}
                <Quote className="absolute right-8 top-6 w-24 h-24 text-white/[0.02] transform pointer-events-none" />

                {/* Stars review block */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Review Copy (White Quote) */}
                <p className="text-lg sm:text-xl text-white font-light leading-relaxed mb-8 italic">
                  "{testimonials[activeIndex].review}"
                </p>

                {/* Reviewer Details Card */}
                <div className="flex items-center space-x-4 border-t border-white/5 pt-6">
                  {/* Avatar Frame */}
                  <div className="relative w-12 h-12 rounded-full p-[1.5px] bg-[#d9869d] shadow-[0_0_10px_rgba(217,134,157,0.2)]">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full bg-neutral-900"
                    />
                  </div>

                  <div>
                    {/* Pink Name */}
                    <h4 className="text-gold-500 font-sans font-bold text-base tracking-wide">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      {testimonials[activeIndex].role && `${testimonials[activeIndex].role} • `}
                      <span className="text-neutral-500">{testimonials[activeIndex].city}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Left/Right Selectors */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-16 z-20">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-neutral-950 border border-white/5 text-neutral-400 hover:text-gold-400 hover:border-gold-500/25 hover:bg-neutral-900 transition-all cursor-pointer focus:outline-none"
              aria-label="Previous Slide"
              id="testimonial-prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-16 z-20">
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-neutral-950 border border-white/5 text-neutral-400 hover:text-gold-400 hover:border-gold-500/25 hover:bg-neutral-900 transition-all cursor-pointer focus:outline-none"
              aria-label="Next Slide"
              id="testimonial-next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dot Bar Indicators */}
          <div className="flex justify-center space-x-2.5 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex 
                    ? 'w-6 bg-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.4)]' 
                    : 'bg-neutral-800 hover:bg-neutral-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                id={`testimonial-dot-${idx}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

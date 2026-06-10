import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Image as ImageIcon, MapPin, ExternalLink } from 'lucide-react';
import { ServiceItem, GalleryItem } from '../types';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem | null;
}

export default function GalleryModal({ isOpen, onClose, service }: GalleryModalProps) {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Block scroll on body when gallery modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!service) return null;

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => 
      prev === 0 ? service.gallery.length - 1 : prev! - 1
    );
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => 
      prev === service.gallery.length - 1 ? 0 : prev! + 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex !== null) {
        if (e.key === 'ArrowLeft') handlePrevImage();
        if (e.key === 'ArrowRight') handleNextImage();
        if (e.key === 'Escape') setActiveLightboxIndex(null);
      } else if (isOpen) {
        if (e.key === 'Escape') onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, isOpen]);

  // Touch Swipe Handlers for mobile swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // swipe threshold
    if (diff > 50) {
      handleNextImage();
    } else if (diff < -50) {
      handlePrevImage();
    }
    setTouchStart(null);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#000000]/98 backdrop-blur-xl z-50 overflow-y-auto scrollbar-thin flex flex-col justify-between"
            id="gallery-modal-overlay"
          >
            {/* Top Bar Navigation */}
            <div className="sticky top-0 bg-gradient-to-b from-[#000000] to-transparent z-10 px-6 py-5 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-wide text-white">
                    {service.title}
                  </h3>
                  <p className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">
                    Portfolio Exhibition
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer focus:outline-none"
                aria-label="Close modal"
                id="gallery-modal-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="px-6 py-12 max-w-7xl mx-auto w-full flex-grow">
              
              {/* Long description briefing */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mb-12"
              >
                <h4 className="text-xs font-mono text-gold-400 uppercase tracking-[0.2em] mb-2">
                  Precision Craft Description
                </h4>
                <p className="text-neutral-300 font-light leading-relaxed text-base sm:text-lg">
                  {service.longDescription}
                </p>
              </motion.div>

              {/* Luxury Masonry Layout */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 [column-fill:_balance] box-border"
              >
                {service.gallery.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="break-inside-avoid relative rounded-xl border border-white/5 bg-neutral-900 group overflow-hidden cursor-pointer shadow-md hover:border-gold-500/30 transition-all duration-300 transform-gpu"
                    onClick={() => setActiveLightboxIndex(index)}
                  >
                    {/* Zoom / View Overlay */}
                    <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-between p-5">
                      <div className="flex justify-end">
                        <span className="p-2.5 rounded-full bg-neutral-950/80 border border-white/10 text-gold-400 scale-90 group-hover:scale-100 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                          <ZoomIn className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h5 className="text-white font-semibold text-sm tracking-wide">
                          {item.title}
                        </h5>
                        <p className="text-xs text-neutral-300 font-light mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Image block */}
                    <img
                      src={item.url}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 origin-center"
                    />
                  </motion.div>
                ))}
              </motion.div>
              
              {service.gallery.length === 0 && (
                <div className="text-center py-20 text-neutral-500 font-mono">
                  No showcase project items currently seeded. Check back soon.
                </div>
              )}
            </div>

            {/* Footer Sign-off Branding */}
            <div className="border-t border-white/5 bg-[#000000] py-8 text-center text-xs text-neutral-500 font-mono">
              ANSHU EXCLUSIVE EXHIBITIONS • ALL RIGHTS RESERVED
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal (For zooming in individual images) */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/98 z-[60] flex flex-col items-center justify-between py-10 px-4 md:px-6 select-none"
            onClick={() => setActiveLightboxIndex(null)}
          >
            {/* Lightbox Header Bar */}
            <div className="w-full max-w-6xl flex justify-between items-center text-white z-10">
              <div>
                <p className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">
                  Exhibition Showcase {activeLightboxIndex + 1} of {service.gallery.length}
                </p>
                <h4 className="font-display font-medium text-lg leading-snug">
                  {service.gallery[activeLightboxIndex].title}
                </h4>
              </div>
              
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 transition-colors focus:outline-none cursor-pointer"
                id="lightbox-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Viewer Area with Swiping */}
            <div 
              className="relative w-full max-w-5xl flex-grow flex items-center justify-center my-6 touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Arrow Button */}
              <button
                onClick={handlePrevImage}
                className="absolute left-0 md:-left-4 p-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 hover:text-gold-400 transition-colors focus:outline-none cursor-pointer z-10"
                aria-label="Previous image"
                id="lightbox-prev-btn"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Large Image Frame with Zoom effect */}
              <motion.div
                key={activeLightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative max-h-[70vh] flex justify-center items-center rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/5"
              >
                <img
                  src={service.gallery[activeLightboxIndex].url}
                  alt={service.gallery[activeLightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-full object-contain cursor-zoom-in"
                  style={{ pointerEvents: 'auto' }}
                />
              </motion.div>

              {/* Right Arrow Button */}
              <button
                onClick={handleNextImage}
                className="absolute right-0 md:-right-4 p-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 hover:text-gold-400 transition-colors focus:outline-none cursor-pointer z-10"
                aria-label="Next image"
                id="lightbox-next-btn"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Caption block */}
            <div className="text-center z-10 w-full max-w-2xl px-6">
              <p className="text-neutral-400 font-light text-sm italic">
                "{service.gallery[activeLightboxIndex].description}"
              </p>
              
              {/* Tiny Dot Navigation Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {service.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveLightboxIndex(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeLightboxIndex ? 'w-4 bg-gold-400' : 'bg-neutral-700'
                    }`}
                    id={`lightbox-dot-${idx}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X, MessageSquare, Phone, MapPin, Mail, ClipboardList, Send, Trash2 } from 'lucide-react';
import { Enquiry } from '../types';

interface NavbarProps {
  onOpenEnquiries: () => void;
  enquiriesCount: number;
}

export default function Navbar({ onOpenEnquiries, enquiriesCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 120;
      const aboutEl = document.getElementById('about');

      if (aboutEl) {
        const aboutTop = aboutEl.offsetTop;
        if (scrollPos >= aboutTop) {
          setActiveSection('about');
          return;
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const centerItems = [
    { label: 'Home', sectionId: 'home' },
    { label: 'About Us', sectionId: 'about' },
  ];

  const menuItems = [
    { label: 'Home', sectionId: 'home' },
    { label: 'About Us', sectionId: 'about' },
    { label: 'Services', sectionId: 'services' },
    { label: 'Process', sectionId: 'process' },
    { label: 'Testimonials', sectionId: 'testimonials' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#000000]/95 backdrop-blur-md border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
            : 'bg-transparent border-b border-transparent'
        }`}
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-24 flex items-center justify-between">
          {/* Custom Styled Luxury Monogram Badge Logo (Compact Row on mobile, standard on desktop) */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-row items-center gap-2.5 bg-black border border-white/5 px-2.5 py-1.5 hover:border-[#d9869d]/40 transition-all duration-300 rounded-lg group focus:outline-none cursor-pointer"
            id="nav-logo-btn"
          >
            {/* Monogram Box and graphic */}
            <div className="relative w-8 h-8 md:w-11 md:h-11 flex items-center justify-center rounded-md bg-neutral-950 border border-[#d9869d]/30 group-hover:border-[#d9869d]/70 transition-colors shadow-inner overflow-hidden shrink-0">
              <span className="font-sans font-black text-sm md:text-md tracking-wider bg-gradient-to-br from-[#d9869d] via-[#e98fa7] to-white bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300 text-glow">
                AP
              </span>
            </div>
            
            {/* Branding names block */}
            <div className="text-left">
              <span className="font-sans text-[8px] md:text-[9px] font-extrabold tracking-[0.2em] text-white block uppercase leading-none">
                ANSHU
              </span>
              <span className="font-script text-[11px] md:text-sm text-[#d9869d] block mt-0.5 tracking-normal normal-case leading-none">
                Prints
              </span>
            </div>
          </button>

          {/* Desktop Navigation Centered */}
          <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-10">
              {centerItems.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.sectionId)}
                    className={`text-xs tracking-[0.2em] font-sans font-bold uppercase transition-all duration-300 relative py-2 px-1 focus:outline-none cursor-pointer ${
                      isActive 
                        ? 'text-white' 
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                    id={`nav-link-${item.sectionId}`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#d9869d] shadow-[0_0_12px_rgba(217,134,157,0.7)]" 
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Social Icons & Vault Triggers on Right */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <a 
                href="https://wa.me/919999999999?text=Hi%20Anshu!%20I'm%25interested%20in%20your%20printing%20services." 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-neutral-800 text-neutral-400 bg-neutral-950/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-115 hover:border-[#25D366] hover:text-[#25D366] hover:shadow-[0_0_15px_rgba(37,211,102,0.4)]"
                title="WhatsApp"
                id="social-wa-desktop"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.424 2.5 1.134 3.471L6.5 20.5l5.22-.95c.92.51 1.97.8 3.09.8 3.185-.001 5.77-2.587 5.77-5.768 0-3.18-2.584-5.764-5.764-5.765l-.585.005zm0 1.061c2.597 0 4.704 2.107 4.704 4.704 0 2.597-2.107 4.704-4.704 4.704-1.01 0-1.944-.325-2.715-.873l-.292-.208-1.554.283.288-1.523-.227-.318a4.678 4.678 0 0 1-.7-2.469c0-2.597 2.107-4.704 4.704-4.704z" />
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-neutral-800 text-neutral-400 bg-neutral-950/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-115 hover:border-[#d9869d] hover:text-[#d9869d] hover:shadow-[0_0_15px_rgba(217,134,157,0.4)]"
                title="Instagram"
                id="social-ig-desktop"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-neutral-800 text-neutral-400 bg-neutral-950/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-115 hover:border-[#FF0000] hover:text-[#FF0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.4)]"
                title="YouTube"
                id="social-yt-desktop"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.519 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.869.508 9.388.508 9.388.508s7.519 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            <div className="w-[1px] h-6 bg-white/10 mx-2" />

            <button
              onClick={onOpenEnquiries}
              className="relative flex items-center space-x-2 px-4 py-2 rounded-full bg-neutral-950 border border-white/10 hover:border-[#d9869d]/50 hover:bg-neutral-900 transition-all duration-300 text-xs font-bold tracking-wider text-[#d9869d] cursor-pointer focus:outline-none"
              id="btn-open-enquiries"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>INQUIRIES</span>
              {enquiriesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#d9869d] text-neutral-950 font-black px-2 py-0.5 rounded-full text-[9px] flex items-center justify-center animate-bounce">
                  {enquiriesCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Block (Inquiries button & Hamburger) */}
          <div className="flex lg:hidden items-center space-x-3.5">
            <button
              onClick={onOpenEnquiries}
              className="relative p-2.5 rounded-full bg-neutral-900 border border-white/10 text-gold-400 focus:outline-none"
              title="View Inquiries"
              id="mobile-vault-trigger"
            >
              <ClipboardList className="w-4 h-4" />
              {enquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d9869d] text-neutral-950 font-bold px-1.5 py-0.2 rounded-full text-[8px] flex items-center justify-center animate-pulse">
                  {enquiriesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-lg bg-neutral-900 border border-white/5 text-neutral-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
              id="nav-mobile-toggle"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-neutral-950/95 backdrop-blur-lg z-40 lg:hidden flex flex-col justify-between pt-24 pb-8 px-6"
          >
            {/* Nav Menu Links */}
            <div className="flex flex-col space-y-5 my-auto">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-2xl font-light tracking-wide text-left text-neutral-200 hover:text-gold-400 transition-colors duration-300 py-2 focus:outline-none"
                  id={`nav-mobile-link-${item.sectionId}`}
                >
                  <span className="text-xs font-mono text-gold-500 mr-4">0{index + 1}</span>
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Quick Contact & Socials at Bottom */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="border-t border-white/10 pt-6 space-y-4"
            >
              <div className="flex justify-start space-x-6">
                <a 
                  href="https://wa.me/919999999999" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-neutral-400 hover:text-gold-400 transition-colors flex items-center space-x-2 text-sm"
                  id="mobile-social-wa"
                >
                  <span>WhatsApp</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-neutral-400 hover:text-gold-400 transition-colors flex items-center space-x-2 text-sm"
                  id="mobile-social-ig"
                >
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-neutral-400 hover:text-gold-400 transition-colors flex items-center space-x-2 text-sm"
                  id="mobile-social-yt"
                >
                  <span>YouTube</span>
                </a>
              </div>
              <p className="text-xs text-neutral-500 font-mono">
                ANSHU • Handcrafting Divine Prints
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

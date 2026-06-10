import React from 'react';
import { Sparkles, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    alert(`"${text}" is shown for compliance & illustrative purposes in this showcase exhibition.`);
  };

  const handleSectionScroll = (id: string) => {
    const target = document.getElementById(id);
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

  return (
    <footer className="bg-neutral-950 border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle gold grid backdrop */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(circle_at_bottom,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/5">
          
          {/* Column 1: Brand details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2.5">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-500">
                <Sparkles className="w-4 h-4 text-neutral-950" />
              </div>
              <span className="font-sans text-xl font-extrabold tracking-widest text-white">ANSHU</span>
            </div>
            
            <p className="text-2xl text-gold-400 font-script normal-case tracking-normal text-glow">
              "Where Creativity Meets Precision"
            </p>
            
            <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-sm">
              We employ state-of-the-art curing UV machinery and heavy industrial lasers to ensure only absolute perfection reaches your storefronts, offices, and homes.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
              RESOURCES
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
              <li>
                <button 
                  onClick={() => handleSectionScroll('home')}
                  className="hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionScroll('about')}
                  className="hover:text-gold-400 transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionScroll('services')}
                  className="hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Services Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionScroll('process')}
                  className="hover:text-gold-400 transition-colors cursor-pointer"
                >
                  How We Work
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionScroll('contact')}
                  className="hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Contact Console
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Custom Services summary links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
              FEATURED CRAFTS
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <li><button onClick={() => handleSectionScroll('services')} className="hover:text-gold-400 text-left">UV Printing</button></li>
              <li><button onClick={() => handleSectionScroll('services')} className="hover:text-gold-400 text-left">LED Signage</button></li>
              <li><button onClick={() => handleSectionScroll('services')} className="hover:text-gold-400 text-left">Apparel Print</button></li>
              <li><button onClick={() => handleSectionScroll('services')} className="hover:text-gold-400 text-left">Laser Marking</button></li>
              <li><button onClick={() => handleSectionScroll('services')} className="hover:text-gold-400 text-left">Luxe Gifting</button></li>
              <li><button onClick={() => handleSectionScroll('services')} className="hover:text-gold-400 text-left">Crystal Awards</button></li>
              <li><button onClick={() => handleSectionScroll('services')} className="hover:text-gold-400 text-left">Wedding Invite</button></li>
              <li><button onClick={() => handleSectionScroll('services')} className="hover:text-gold-400 text-left">Home Decor</button></li>
            </ul>
          </div>

          {/* Column 4: Contact details summary */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
              VISIT US
            </h4>
            <ul className="space-y-3.5 text-xs text-neutral-400 font-light">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="leading-relaxed">G-15 Industrial Area, New Delhi, 110015, India</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>contact@anshuprints.com</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 99999 99999</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 font-mono gap-4">
          <p>© {currentYear} ANSHU PRINTS. CRAFTED TO PERFECTION.</p>
          
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              onClick={(e) => handleLinkClick(e, 'Privacy Policy')}
              className="hover:text-white transition-colors"
              id="footer-privacy-link"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              onClick={(e) => handleLinkClick(e, 'Terms & Conditions')}
              className="hover:text-white transition-colors"
              id="footer-terms-link"
            >
              Terms & Conditions
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

import React, { useState, useEffect } from 'react';
import { Home, Palette, Bot, MessageCircle, Phone } from 'lucide-react';

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 200;
      
      const servicesEl = document.getElementById('services');
      const contactEl = document.getElementById('contact');
      
      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveTab('contact');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveTab('services');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleTabClick = (tab: string) => {
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveTab('home');
    } else if (tab === 'services') {
      // Find offset position for the services element
      const el = document.getElementById('services');
      if (el) {
        const offset = 80; // offset for the sticky header
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
      setActiveTab('services');
    } else if (tab === 'ai') {
      window.dispatchEvent(new CustomEvent('open-ai-chat'));
    } else if (tab === 'whatsapp') {
      window.open("https://wa.me/919999999999?text=Hi%20Anshu!%20I'm%20interested%20in%2520your%2520premium%2520printing%2520services.%2520Can%2520we%2520connect?", "_blank");
    } else if (tab === 'contact') {
      const el = document.getElementById('contact');
      if (el) {
        const offset = 80;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
      setActiveTab('contact');
    }
  };

  const menuItems = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'services', label: 'Services', icon: Palette },
    { key: 'ai', label: 'AI Support', icon: Bot, highlight: true },
    { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { key: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[99999] bg-[#0D0D0F]/95 backdrop-blur-3xl border-t border-[#D7849A]/30 rounded-t-[20px] shadow-[0_-10px_40px_rgba(0,0,0,0.95)] md:hidden block"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        paddingBottom: '12px'
      }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;
          
          return (
            <button
              key={item.key}
              onClick={() => handleTabClick(item.key)}
              className="flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all active:scale-95 focus:outline-none relative group h-12"
              style={{ minWidth: '48px', minHeight: '48px' }}
              id={`mobile-tab-${item.key}`}
            >
              {item.highlight ? (
                <div className="relative -top-3.5 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#d7849a] text-black shadow-[0_4px_15px_rgba(215,132,154,0.55)] border border-white/20 transition-transform duration-300 group-hover:scale-105 active:scale-90">
                  <Icon className="w-5.5 h-5.5" />
                </div>
              ) : (
                <Icon 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-[#D7849A]' : 'text-[#888888] hover:text-[#D7849A]'
                  }`} 
                />
              )}
              
              <span 
                className={`text-[9px] font-sans font-medium tracking-wide mt-1 transition-colors duration-200 ${
                  item.highlight ? 'relative -top-2.5 text-[#D7849A]' : isActive ? 'text-[#D7849A]' : 'text-[#888888]'
                }`}
              >
                {item.label}
              </span>

              {isActive && !item.highlight && (
                <span className="absolute bottom-0 w-1 h-1 bg-[#D7849A] rounded-full shadow-[0_0_8px_rgba(215,132,154,1)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

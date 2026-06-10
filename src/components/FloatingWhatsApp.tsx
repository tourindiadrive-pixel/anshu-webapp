import React from 'react';
import { motion } from 'motion/react';
import { MessageSquareCode } from 'lucide-react';

export default function FloatingWhatsApp() {
  const playHoverSound = () => {
    try {
      // Access AudioContext dynamically
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Define ultra-premium dual chime oscillators for a physical glass/crystal micro-tap click sound
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1800, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.06);
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(900, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.06);
      
      // Extremely low volume envelope (0.015 weight) to ensure a subtle, tactile background note
      gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.07);
      osc2.stop(ctx.currentTime + 0.07);
    } catch (error) {
      // Blocked autoplay issues or browser security limits are ignored gracefully
    }
  };

  return (
    <motion.a
      initial={{ x: 80, y: 80, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={playHoverSound}
      href="https://wa.me/919999999999?text=Hi%20Anshu!%20I'm%20interested%20in%20your%20premium%20printing%20services.%20Can%20we%20connect?"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 group flex items-center justify-center p-4 rounded-full bg-[#d9869d] text-white hover:bg-[#ca5e7e] hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(217,134,157,0.5)] focus:outline-none focus:ring-2 focus:ring-[#d9869d] focus:ring-offset-2 focus:ring-offset-[#000000]"
      title="Contact on WhatsApp"
      id="floating-whatsapp"
    >
      {/* Outer Pulse rings */}
      <span className="absolute inset-0 rounded-full bg-[#d9869d] opacity-35 animate-ping scale-105 pointer-events-none group-hover:animate-none" />
      
      {/* WhatsApp SVG logo in white */}
      <svg 
        className="w-6 h-6 fill-white transition-transform duration-300 group-hover:rotate-12 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" 
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.022-.04-.085-.063-.177-.11-.093-.047-.547-.27-6.326-3.13-.092-.047-.16-.07-.22-.03-.06.04-.23.27-.28.33-.05.06-.1.07-.19.02-.09-.05-.38-.14-.73-.45-.27-.24-.46-.54-.51-.62-.05-.09-.01-.13.04-.18.04-.04.09-.1.13-.15.04-.05.06-.08.09-.14.03-.06.01-.11-.01-.16-.02-.05-.17-.4-.23-.55-.06-.15-.12-.13-.17-.13h-.15c-.05 0-.14.02-.21.1-.08.08-.29.28-.29.69 0 .41.3 1.13.34 1.18.04.05.59.9 1.43 1.26.2.09.36.14.48.18.2.06.38.05.52.03.16-.02.54-.22.62-.43.08-.21.08-.39.06-.43-.02-.04-.08-.06-.17-.1zM12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.9 5.86L2.5 22.5l4.74-1.37C8.84 21.8 10.37 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.58-.5-5.07-1.37l-.36-.21-3 .87.89-2.92-.23-.37C3.41 14.94 3 13.52 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9z" />
      </svg>
      
      {/* Sliding Expand indicator on Desktop */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out flex items-center whitespace-nowrap pl-0 group-hover:pl-2.5 text-xs text-neutral-950 font-mono tracking-wider font-bold">
        CHAT WITH US
      </span>
    </motion.a>
  );
}

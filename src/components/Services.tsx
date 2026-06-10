import React from 'react';
import { motion } from 'motion/react';
import { servicesData } from '../data/servicesData';
import { ServiceItem } from '../types';
import { 
  Sparkles,
  Printer, 
  Tv, 
  Shirt, 
  Zap, 
  Gift, 
  Trophy, 
  FileText, 
  Package, 
  IdCard, 
  Home, 
  Mail, 
  Camera, 
  Smartphone, 
  Palette, 
  Utensils 
} from 'lucide-react';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  // Map service IDs to corresponding icons
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'uv-printing':
        return <Printer className="w-8 h-8" />;
      case 'led-signage':
        return <Tv className="w-8 h-8" />;
      case 'custom-apparel':
        return <Shirt className="w-8 h-8" />;
      case 'laser-marking':
        return <Zap className="w-8 h-8" />;
      case 'corporate-gifting':
        return <Gift className="w-8 h-8" />;
      case 'trophies-awards':
        return <Trophy className="w-8 h-8" />;
      case 'digital-printing':
        return <FileText className="w-8 h-8" />;
      case 'custom-packaging':
        return <Package className="w-8 h-8" />;
      case 'id-lanyards':
        return <IdCard className="w-8 h-8" />;
      case 'home-decor':
        return <Home className="w-8 h-8" />;
      case 'wedding-stationery':
        return <Mail className="w-8 h-8" />;
      case 'photo-gifts':
        return <Camera className="w-8 h-8" />;
      case 'skins-wraps':
        return <Smartphone className="w-8 h-8" />;
      case 'canvas-art':
        return <Palette className="w-8 h-8" />;
      case 'restaurant-branding':
        return <Utensils className="w-8 h-8" />;
      default:
        return <Sparkles className="w-8 h-8" />;
    }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#000000]">
      {/* Decorative ambiance glow background */}
      <div className="absolute top-[30%] left-[-10%] w-[35rem] h-[35rem] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[-10%] w-[35rem] h-[35rem] bg-gold-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-mono text-gold-400 uppercase tracking-[0.25em] font-semibold">
              Exquisite Craft Catalog
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight uppercase"
          >
            Premium Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm font-mono text-neutral-400 max-w-lg mx-auto uppercase tracking-wide"
          >
            Click on any service to view custom print showcase.
          </motion.p>
          
          <div className="w-12 h-[2px] bg-gold-500 mx-auto mt-6" />
        </div>

        {/* Services Grid (15 services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.1 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
              }}
              onClick={() => onSelectService(service)}
              className="group relative rounded-[28px] overflow-hidden border border-white/10 hover:border-[#ff4773]/80 hover:shadow-[0_0_35px_rgba(255,71,115,0.45)] transition-all duration-500 ease-out cursor-pointer flex flex-col justify-center h-[360px] shadow-[0_15px_35px_rgba(0,0,0,0.95)]"
              id={`service-card-${service.id}`}
            >
              {/* Category Visual Identity Background */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover opacity-35 group-hover:opacity-55 transition-all duration-[800ms] scale-100 group-hover:scale-110 ease-[0.16, 1, 0.3, 1] brightness-[1.1]"
                  referrerPolicy="no-referrer"
                />
                {/* Precision Rich Dark Gradient Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-[#000000]/92 via-black/60 to-black/35 z-[1]" />
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 space-y-6 h-full">
                {/* Center Aligned Icon with brighter colors */}
                <div className="w-16 h-16 rounded-full bg-[#ff4773]/15 border-2 border-[#ff4773]/55 flex items-center justify-center text-[#ff4773] shadow-[0_0_20px_rgba(255,71,115,0.35)] group-hover:scale-110 group-hover:bg-[#ff4773]/25 transition-all duration-300">
                  {getServiceIcon(service.id)}
                </div>

                {/* Service Name & Higher contrast Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-sans font-bold text-white group-hover:text-[#ff4773] tracking-wide transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm font-normal text-neutral-200 group-hover:text-white leading-relaxed line-clamp-3 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Vivid Crimson/Pink Outline Button with high visual resonance */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(service);
                  }}
                  className="px-6 py-2.5 rounded-full border border-[#ff4773] text-[#ff4773] bg-[#000000]/60 backdrop-blur-md font-mono font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-[#ff4773] hover:text-[#000000] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,71,115,0.55)] focus:outline-none focus:ring-2 focus:ring-[#ff4773] focus:ring-offset-2 focus:ring-offset-[#0f0f12] transform scale-100 opacity-95 group-hover:opacity-100"
                >
                  Open Gallery
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

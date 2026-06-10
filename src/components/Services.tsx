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
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              onClick={() => onSelectService(service)}
              className="group relative rounded-[28px] bg-[#0f0f12] border border-[#d9869d]/20 hover:border-[#d9869d]/60 hover:shadow-[0_0_30px_rgba(217,134,157,0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-center h-[360px] shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
              id={`service-card-${service.id}`}
            >
              <div className="flex flex-col items-center justify-center text-center p-8 space-y-6 h-full">
                {/* Center Aligned Icon */}
                <div className="w-16 h-16 rounded-full bg-[#d9869d]/5 border border-[#d9869d]/30 flex items-center justify-center text-[#d9869d] shadow-[0_0_15px_rgba(217,134,157,0.15)] group-hover:scale-110 group-hover:bg-[#d9869d]/10 transition-all duration-300">
                  {getServiceIcon(service.id)}
                </div>

                {/* Service Name & Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-sans font-bold text-white group-hover:text-[#d9869d] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm font-light text-neutral-450 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Pink Outline Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(service);
                  }}
                  className="px-6 py-2.5 rounded-full border border-[#d9869d] text-[#d9869d] bg-transparent font-mono font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-[#d9869d] hover:text-[#000000] hover:shadow-[0_0_15px_rgba(217,134,157,0.4)] focus:outline-none focus:ring-2 focus:ring-[#d9869d] focus:ring-offset-2 focus:ring-offset-[#0f0f12] transform scale-95 group-hover:scale-100 opacity-80 group-hover:opacity-100"
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

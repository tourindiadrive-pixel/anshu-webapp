import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Truck, 
  FileCheck, 
  Box, 
  Play, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ExternalLink, 
  Sparkles, 
  Heart, 
  ChevronRight, 
  Locate, 
  CheckCircle2,
  Users
} from 'lucide-react';

// Import our beautiful local high-res client project assets
// @ts-ignore
import uvImg from '../assets/images/uv_printing_showcase_1781058351498.png';
// @ts-ignore
import ledImg from '../assets/images/luxe_acrylic_neon_1781058369397.png';
// @ts-ignore
import giftImg from '../assets/images/corporate_gift_box_1781058383737.png';
// @ts-ignore
import wedImg from '../assets/images/wedding_invitation_luxe_1781058397753.png';
// @ts-ignore
import awardImg from '../assets/images/trophy_awards_luxe_1781058415275.png';

interface Project {
  id: string;
  category: string;
  title: string;
  client: string;
  specs: string[];
  image: string;
  badge: string;
  details: string;
}

export default function TrustPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVideoProject, setActiveVideoProject] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [videoLikes, setVideoLikes] = useState<number>(312);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const trustBadges = [
    {
      id: "badge-iso",
      icon: FileCheck,
      title: "ISO 9001:2015 Certified Production",
      description: "Adhering to strict international standard audits for color fidelity, dimensional accuracy, and material lifespan guarantee."
    },
    {
      id: "badge-packaging",
      icon: Box,
      title: "Secure Multi-Layer Transit Cargo Packaging",
      description: "Encased in 12-ply honeycomb robust outer boxes, shock-absorbent customizable foam slots, and hermetic anti-moisture shielding."
    },
    {
      id: "badge-insurance",
      icon: ShieldCheck,
      title: "100% Pan-India Transit Insured",
      description: "Fully covered freight transit logistics. If any item is compromised in air priority transit, we manufacture and dispatch replacements first day."
    },
    {
      id: "badge-logistics",
      icon: Truck,
      title: "Priority Luxury Air Shipping",
      description: "Direct tie-ups with premium cargo express streams ensuring secure container cargo delivery inside 48 hours for top tier metros."
    }
  ];

  const clientProjects: Project[] = [
    {
      id: "proj-1",
      category: "corporate",
      title: "Executive B2B VIP Welcome Suite",
      client: "Innovtech Global Headquarters",
      image: giftImg,
      badge: "Completed",
      specs: [
        "Soft-touch leather magnetic clasp storage trunk",
        "Heat-debossed signature logs and laser etched metal tags",
        "Gold hot-stamped vacuum insulated steel smart thermos",
        "Fine matching 10,000mAh metal bound fast-charging powerbanks"
      ],
      details: "A comprehensive turnkey welcome experience crafted for newly inducted board members. Features precise physical box compartmentalization with velvet-lined protective grooves for an premium unboxing sound."
    },
    {
      id: "proj-2",
      category: "signage",
      title: "Luminous Halo Dual-Lit LED Signage",
      client: "Elysian Signature Salon & Medispa",
      image: ledImg,
      badge: "Installed",
      specs: [
        "Laser profile cut architectural stainless steel frame",
        "Dual-lit golden floating 3D halo visual base plate",
        "Dynamic IP67 weatherproof sealing for intense monsoon rain",
        "Samsung solid state 50k Hour highly economic LED chips"
      ],
      details: "An premium multi-tier outdoor glow signage board that casts heavy ambient light onto modern stone tiling. Designed for continuous outdoor operations and highly praised for its uniform luminance distribution."
    },
    {
      id: "proj-3",
      category: "packaging",
      title: "Tactile High-Density Raised-Ink Cartons",
      client: "Grand Nawab Oud Perfumeries",
      image: uvImg,
      badge: "Delivered",
      specs: [
        "Thick structural 450GSM virgin pulp board",
        "High-density raised direct UV dimensional ink laying",
        "Fine brush metallic hot brass leaf foil heat seal transfer",
        "Fingerprint resistant silk matte overall base coating"
      ],
      details: "Engineered specifically to elevate retail presence. By printing raised patterns representing royal Mughal architecture, customers can feel the intricate curves and patterns upon lifting the fragrance carton."
    },
    {
      id: "proj-4",
      category: "awards",
      title: "Optical Pillar Crystal Achievement Accolade",
      client: "National B2B FinTech Summit 2026",
      image: awardImg,
      badge: "Completed",
      specs: [
        "Optical crystal structure blocks with 120-facet hand polish",
        "High-contrast subsurface 3D internal laser microscopic vaporization",
        "Genuine CNC-profiled dense walnut wooden base insert",
        "Heavy anodized gold brass plaque custom monogrammed"
      ],
      details: "Turned dynamic vector concepts directly into a holographic internal crystal structure. Custom presented in solid satin storage boxes to celebrate state level executive leadership."
    },
    {
      id: "proj-5",
      category: "stationery",
      title: "Imperial Hand-Laid Wax Seal Wedding Suite",
      client: "Sood Royal Estates Marriage",
      image: wedImg,
      badge: "Shipped",
      specs: [
        "Custom handmade deckled cotton pulp card bases (360GSM)",
        "Precision multi-stroke gold leaf hot foil calligraphic stamp",
        "Emerald forest-green premium wax seal custom initialed casting",
        "Ultra-luxury velvet lined envelope sleeves"
      ],
      details: "Unparalleled social invitations shipped on organic material with rich texture. Combining medieval hot-wax sealing styles with high-contrast screen highlighting for absolute excellence."
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'corporate', label: 'Corporate Suites' },
    { id: 'signage', label: 'Storefront Signage' },
    { id: 'packaging', label: 'Luxe Packaging' },
    { id: 'awards', label: 'Awards & Crystal' },
    { id: 'stationery', label: 'Royal Stationery' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? clientProjects 
    : clientProjects.filter(p => p.category === selectedCategory);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked) {
      setVideoLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setVideoLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <section id="trust-portfolio" className="relative py-24 bg-[#030303] overflow-hidden border-t border-white/[0.04]">
      {/* Absolute Ambient Background Lights for Luxury Visual Balance */}
      <div className="absolute top-[10%] right-[15%] w-[35rem] h-[35rem] bg-[#ff4773]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[35rem] h-[35rem] bg-[#ffd744]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4773] animate-pulse" />
              <span className="text-[10px] font-mono font-black text-[#ffd744] uppercase tracking-[0.3em]">
                B2B VERIFIED PORTFOLIO
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight text-white uppercase leading-none">
              Client Craft <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4773] via-[#ff7da0] to-[#ffd744] text-glow">
                & Architectural Proof.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-xl">
              Take an exclusive close-up look at actual premium physical deliveries completed for major enterprises, discerning brands, and luxury milestone requests.
            </p>
          </div>

          {/* Core Trust Seal Stats */}
          <div className="flex items-center gap-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 backdrop-blur-md self-start lg:self-auto shadow-xl">
            <div className="text-center pr-6 border-r border-white/5">
              <span className="block font-sans font-black text-2xl text-[#ffd744]">100%</span>
              <span className="block text-[8px] font-mono text-neutral-450 uppercase tracking-widest mt-0.5">Transit Safe</span>
            </div>
            <div className="text-center pr-6 border-r border-white/5">
              <span className="block font-sans font-black text-2xl text-[#ff4773]">ISO</span>
              <span className="block text-[8px] font-mono text-neutral-450 uppercase tracking-widest mt-0.5">Compliant Layouts</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Users className="w-4 h-4 text-white/65" />
                <span className="font-sans font-black text-2xl">4.9/5</span>
              </div>
              <span className="block text-[8px] font-mono text-neutral-450 uppercase tracking-widest mt-0.5">B2B Satisfaction Rating</span>
            </div>
          </div>
        </div>

        {/* 1. Client Portfolio Interactive Grid Component */}
        <div className="space-y-10" id="client-verified-section">
          
          {/* Custom Horizontal Smooth Category Scroller Nav */}
          <div className="flex overflow-x-auto pb-4 gap-2.5 invisible-scrollbar mask-gradient select-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCategory === cat.id 
                    ? 'bg-gradient-to-tr from-[#ff4773] to-[#ffd744] text-black font-black shadow-[0_4px_15px_rgba(255,71,115,0.30)] scale-102 border-transparent'
                    : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06] hover:bg-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* DYNAMIC CASE: Interactive Video Unboxing Experience Card */}
            <motion.div 
              layout
              className="group relative md:col-span-2 lg:col-span-1 rounded-[28px] overflow-hidden border border-white/10 bg-[#09090b] h-[480px] shadow-2xl flex flex-col justify-end"
              id="portfolio-unboxing-interactive-box"
            >
              {/* Background Cover Overlay */}
              <div className="absolute inset-0 z-0">
                {!activeVideoProject ? (
                  <img 
                    src={giftImg} 
                    alt="Anshu Premium Unboxing Showcase" 
                    className="w-full h-full object-cover opacity-35 group-hover:opacity-20 transition-all duration-700 scale-102"
                  />
                ) : (
                  <video
                    key="unboxing-video-player"
                    src="https://assets.mixkit.co/videos/preview/mixkit-gift-box-with-a-red-bow-41843-large.mp4"
                    className="w-full h-full object-cover animate-fade-in"
                    autoPlay
                    loop
                    muted={isVideoMuted}
                    playsInline
                  />
                )}
                
                {/* Interactive Video Playback Overlay State controls */}
                {activeVideoProject && (
                  <div className="absolute inset-0 bg-black/40 z-10 flex flex-col justify-between p-6">
                    {/* Top audio status bar */}
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono tracking-widest text-[#ffd744] uppercase font-black bg-black/80 px-2 py-0.5 rounded-full border border-white/10 shadow-md">
                        PLAYING: VIP_UNBOXING_HQ.MP4
                      </span>
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    </div>

                    {/* Audio status warning badge inside player */}
                    {isVideoMuted && (
                      <div className="self-center bg-black/75 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
                        <VolumeX className="w-3.5 h-3.5 text-[#ff4773]" />
                        <span className="text-[10px] font-mono text-white tracking-wider">AUDIO MUTED — CLICK SPEAKER ICON TO UNMUTE</span>
                      </div>
                    )}
                    
                    <div className="space-y-2 text-left">
                      <p className="text-xs font-sans text-white/95 font-medium drop-shadow bg-black/50 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm">
                        "Uncompromising structural lock layers. You can hear the premium cardboard clasp seal perfectly upon opening."
                      </p>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/85 via-black/40 to-transparent z-[1]" />
              </div>

              {/* Tag Overlays */}
              <div className="absolute top-5 left-5 z-20 flex gap-2">
                <span className="text-[8px] font-mono tracking-widest text-[#ffd744] uppercase font-black bg-black/80 px-3 py-1.5 rounded-full border border-white/15 shadow-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live Showroom Video
                </span>
                <span className="text-[8px] font-mono tracking-widest text-neutral-300 uppercase font-black bg-black/60 px-3 py-1.5 rounded-full border border-white/5">
                  Unboxing Clip
                </span>
              </div>

              {/* Main Content Layout */}
              <div className="relative z-10 p-8 space-y-4 text-left">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono tracking-widest text-[#ff4773] uppercase font-black">Interactive Cinematic Demo</span>
                  <h3 className="text-2xl font-sans font-black text-white leading-tight uppercase">
                    Unboxing Tactility <br />
                    Experience Loop
                  </h3>
                </div>
                
                <p className="text-xs text-neutral-300 font-normal leading-relaxed">
                  Hover or prompt our player control to engage the premium sound mechanics and pristine geometric box closures utilized in custom rigid hampers.
                </p>

                {/* Simulated Media Controls Panel */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-4">
                  <button 
                    onClick={() => setActiveVideoProject(!activeVideoProject)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-tr from-[#ff4773] to-[#ff7da0] text-black font-sans font-black text-[10px] tracking-widest uppercase hover:scale-102 transition-all cursor-pointer shadow-lg"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    {activeVideoProject ? "RESET PREVIEW" : "PLAY VIDEO REVIEW"}
                  </button>

                  <div className="flex items-center gap-1.5">
                    {/* Audio Status */}
                    <button 
                      onClick={() => setIsVideoMuted(!isVideoMuted)}
                      className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
                      title={isVideoMuted ? "Unmute Sound" : "Mute Sound"}
                    >
                      {isVideoMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5 text-[#ffd744]" />}
                    </button>

                    {/* Social Like Heart Icon */}
                    <button 
                      onClick={handleLike}
                      className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 bg-white/5 ${
                        hasLiked 
                          ? 'border-[#ff4773]/40 text-[#ff4773] bg-[#ff4773]/5' 
                          : 'border-white/10 text-neutral-300 hover:text-white'
                      }`}
                      title="Mark as Inspiring"
                    >
                      <Heart className={`w-4.5 h-4.5 ${hasLiked ? 'fill-current' : ''}`} />
                      <span className="text-[10px] font-mono font-bold">{videoLikes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Render Filtered Completed Project Grid Items */}
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className="group relative rounded-[28px] overflow-hidden border border-white/10 h-[480px] shadow-2xl flex flex-col justify-end bg-[#0a0a0c] cursor-pointer hover:border-[#ff4773]/50 transition-all duration-300"
                  id={`proven-case-${proj.id}`}
                >
                  {/* Heavy Luxury Image Background */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={proj.image} 
                      alt={proj.title}
                      className="w-full h-full object-cover opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 via-black/35 to-transparent z-[1]" />
                  </div>

                  {/* Top Badge Overlay */}
                  <div className="absolute top-5 left-5 z-10 flex items-center gap-1.5 bg-[#000000]/80 border border-white/15 px-3 py-1.5 rounded-full shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff4773]" />
                    <span className="text-[8px] font-mono tracking-widest text-[#ff4773] uppercase font-black">
                      {proj.badge}
                    </span>
                  </div>

                  <div className="absolute top-5 right-5 z-10">
                    <span className="text-[8px] font-mono tracking-widest text-[#ffd744] uppercase font-black bg-black/60 px-3 py-1.5 rounded-full border border-white/5">
                      {proj.category}
                    </span>
                  </div>

                  {/* Inside Text Context Grid */}
                  <div className="relative z-10 p-8 space-y-4">
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-mono tracking-wider font-light text-neutral-400 block">
                        Client: {proj.client}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-white uppercase tracking-tight group-hover:text-[#ffd744] transition-colors duration-300">
                        {proj.title}
                      </h3>
                    </div>

                    {/* Miniature Preview Specs Highlights bullet (max 3) */}
                    <ul className="space-y-1.5 pt-3 border-t border-white/10 text-left">
                      {proj.specs.slice(0, 3).map((spec, sidx) => (
                        <li key={sidx} className="flex items-start gap-2 text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4773] mt-0.5 flex-shrink-0" />
                          <span className="text-[11px] font-sans font-medium line-clamp-1 leading-normal">
                            {spec}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* View Micro details trigger */}
                    <div className="pt-2 flex items-center justify-between text-[#ff4773] group-hover:text-white transition-all text-[10px] font-mono font-black uppercase tracking-widest">
                      <span>Explore Production Specs</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

          </div>

        </div>

        {/* 2. Industry-Standard Titled Premium B2B Trust Badges Grid */}
        <div className="mt-28 border-t border-white/10 pt-20" id="trustbadge-verified-framework">
          <div className="text-center space-y-3 mb-16 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-[#ffd744]/10 border border-[#ffd744]/35 px-4 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffd744]" />
              <span className="text-[9px] font-mono font-black text-[#ffd744] uppercase tracking-widest">B2B Commercial Guarantee</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-sans font-black text-white uppercase tracking-tight">
              Safety, Standards, Integrity.
            </h3>
            <p className="text-xs text-neutral-450 leading-relaxed font-normal">
              Corporate operations demand absolute reliability. Anshu guarantees flawless delivery, robust packing safeguards, and certified oversight across your print journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge, bidx) => {
              const IconComp = badge.icon;
              return (
                <div 
                  key={badge.id}
                  className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#ff4773]/30 hover:bg-white/[0.04] transition-all duration-350 text-left flex flex-col justify-between h-[210px] shadow-lg"
                  id={`secure-badge-${badge.id}`}
                >
                  <div className="space-y-4">
                    {/* Glowing circular icon header */}
                    <div className="w-10 h-10 rounded-xl bg-[#ff4773]/10 border border-[#ff4773]/30 flex items-center justify-center text-[#ff4773] group-hover:scale-105 transition-all">
                      <IconComp className="w-5 h-5" />
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-xs font-sans font-extrabold text-neutral-100 group-hover:text-[#ffd744] transition-colors leading-tight uppercase tracking-wider">
                        {badge.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 group-hover:text-neutral-300 leading-relaxed font-normal">
                        {badge.description}
                      </p>
                    </div>
                  </div>

                  {/* Micro state verification note */}
                  <span className="text-[8px] font-mono text-neutral-550 uppercase tracking-widest mt-2 block border-t border-white/[0.03] pt-2">
                    Verified Commercial Spec // 2026
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. Fully Interactive Portfolio Specification Details Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10" id="spec-detail-overlay-portal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="relative w-full max-w-4xl bg-[#0e0e11] rounded-[32px] border border-white/15 overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto"
            >
              {/* Left Picture Pane container */}
              <div className="w-full md:w-1/2 relative h-[250px] md:h-auto min-h-[300px] md:min-h-[500px]">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 to-transparent z-[1]" />
                
                {/* Branding Badge floating */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-1.5 bg-[#000000]/80 border border-white/15 px-3 py-1.5 rounded-full shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping animate-pulse-slow" />
                  <span className="text-[8px] font-mono tracking-widest text-emerald-450 uppercase font-black">
                    Verified Craft Exhibit
                  </span>
                </div>
              </div>

              {/* Right text layout pane */}
              <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-between text-left space-y-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-[#ffd744] uppercase font-black bg-white/[0.04] px-3 py-1 rounded-full border border-white/5 inline-block">
                      Client: {selectedProject.client}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-sans font-black text-white uppercase tracking-tight mt-2 leading-none">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-350 leading-relaxed font-normal">
                    {selectedProject.details}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-white/5">
                    <h4 className="text-[10px] font-mono tracking-[0.2em] text-[#ff4773] uppercase font-black">
                      Material & Technical Specifications:
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.specs.map((item, id) => (
                        <li key={id} className="flex items-start gap-2.5 text-neutral-200 text-xs font-normal">
                          <CheckCircle2 className="w-4 h-4 text-[#ffd744] mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Modal Action Buttons */}
                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center gap-3">
                  <a 
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="w-full sm:flex-1 text-center py-3 px-6 rounded-xl bg-gradient-to-tr from-[#ff4773] to-[#ffd744] text-black font-sans font-black text-[10px] tracking-widest uppercase hover:scale-102 transition-all cursor-pointer shadow-md"
                  >
                    Inquire For Custom Pricing
                  </a>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-[10px] uppercase tracking-widest border border-white/10 transition-colors cursor-pointer text-center"
                  >
                    Close Sheet
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

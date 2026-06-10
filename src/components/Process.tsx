import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, LayoutTemplate, Truck, GitCommit, ArrowRight, Sparkles } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Share Your Idea',
      description: 'Tell us your vision and specific design requirements. Upload any branding files or reference themes.',
      icon: <MessageSquare className="w-6 h-6 text-[#d9869d]" />,
      color: 'from-[#d9869d]/20 to-neutral-500/5'
    },
    {
      num: '02',
      title: 'Approve Design',
      description: 'We will create high-fidelity, photorealistic digital mockups. Review, polish, and approve the details with our designers.',
      icon: <LayoutTemplate className="w-6 h-6 text-[#d9869d]" />,
      color: 'from-[#d9869d]/20 to-neutral-500/5'
    },
    {
      num: '03',
      title: 'Get Delivered',
      description: 'Your project moves to state-of-the-art curing presses. We ship your premium order with trackable cargo protection.',
      icon: <Truck className="w-6 h-6 text-[#d9869d]" />,
      color: 'from-[#d9869d]/20 to-neutral-500/5'
    }
  ];

  return (
    <section id="process" className="relative py-24 sm:py-32 bg-[#000000] overflow-hidden">
      {/* Decorative linear grid elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,transparent_60%,#000000_100%),linear-gradient(rgba(217,134,157,0.01)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-[#d9869d]" />
            <span className="text-xs font-mono text-[#d9869d] uppercase tracking-[0.25em] font-bold">
              PERFECT EXECUTION WORKFLOW
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-sans font-extrabold text-white tracking-tight uppercase"
          >
            OUR LUXURY PRINT METHOD
          </motion.h2>
          <div className="w-12 h-[2px] bg-[#d9869d] mx-auto mt-4" />
        </div>

        {/* Chronological Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Subtle connecting lines on large desktop screen */}
          <div className="hidden lg:block absolute top-[28%] left-[25%] right-[25%] h-[1px] bg-gradient-to-r from-[#d9869d]/10 via-neutral-800 to-[#d9869d]/10 -z-10" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              className="group relative rounded-[28px] p-8 bg-[#0f0f12] border border-[#d9869d]/20 hover:border-[#d9869d]/60 hover:shadow-[0_0_30px_rgba(217,134,157,0.12)] transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden"
              id={`process-card-${idx}`}
            >
              {/* Background gradient corner glow on hover */}
              <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              {/* Card Step Number in luxury font */}
              <div className="absolute top-6 right-8 text-6xl font-sans font-black text-white/[0.02] group-hover:text-[#d9869d]/[0.05] select-none transition-colors duration-500">
                {step.num}
              </div>

              {/* Icon framework representation */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 flex items-center justify-center mb-8 shadow-inner group-hover:border-[#d9869d]/40 group-hover:shadow-[0_0_15px_rgba(217,134,157,0.15)] transition-all duration-300">
                {step.icon}
              </div>

              {/* Title & Desc */}
              <div className="space-y-3.5">
                <span className="text-xs font-mono font-bold text-[#d9869d] tracking-[0.2em] uppercase">
                  STEP {step.num}
                </span>
                <h3 className="text-xl font-sans font-bold text-white tracking-wide uppercase">
                  {step.title}
                </h3>
                <p className="text-sm font-light text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connect Arrow inside step cards */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500 group-hover:text-[#d9869d] transition-colors">
                <span>Phase Progress Completed</span>
                {idx < 2 ? (
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300 text-[#d9869d]" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-[#d9869d] shadow-[0_0_8px_rgba(217,134,157,0.8)]" />
                )}
              </div>
            </motion.div>
          ))}
          
        </div>

      </div>
    </section>
  );
}

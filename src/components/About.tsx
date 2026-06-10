import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Truck, Sparkles, Check, BookmarkCheck, Inbox, ShieldCheck } from 'lucide-react';

interface CounterProps {
  end: number;
  suffix?: string;
}

function Counter({ end, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    let timer: NodeJS.Timeout;

    const updateCounter = () => {
      start += increment;
      if (start >= end) {
        setCount(end);
      } else {
        setCount(Math.floor(start));
        timer = setTimeout(updateCounter, 16);
      }
    };

    updateCounter();
    return () => clearTimeout(timer);
  }, [isInView, end]);

  return (
    <span ref={ref} className="font-display font-bold text-4xl sm:text-5xl text-glow bg-gradient-to-r from-gold-300 to-amber-500 bg-clip-text text-transparent">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const features = [
    {
      icon: <Truck className="w-5 h-5 text-gold-400" />,
      title: 'Pan India Shipping',
      description: 'Fully tracked direct cargo dispatch systems nationwide.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-gold-400" />,
      title: 'On-Time Delivery',
      description: 'Rigorous job schedules ensure no project delay.'
    },
    {
      icon: <Inbox className="w-5 h-5 text-gold-400" />,
      title: 'Low MOQ',
      description: 'Unlocking custom manufacturing even for singular items.'
    }
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-neutral-900/50 overflow-hidden">
      {/* Decorative accent backgrounds */}
      <div className="absolute top-[10%] right-[-10%] w-[30rem] h-[30rem] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[30rem] h-[30rem] bg-gold-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-2"
              >
                <div className="h-[1px] w-8 bg-gold-500" />
                <span className="text-xs font-mono text-gold-400 uppercase tracking-[0.25em] font-semibold">
                  Who We Are
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight leading-tight"
              >
                Crafting Memories, <br />
                <span className="font-script text-3xl sm:text-5xl text-gold-400 block mt-2 tracking-normal normal-case text-glow">"One Print at a Time"</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-neutral-400 font-light leading-relaxed text-base sm:text-lg"
            >
              <p>
                At <span className="text-white font-medium">Anshu</span>, we believe printing isn’t just about applying ink to a surface — it's about giving your thoughts shape, texture, and brilliance. We treat each signage piece, box layer, and custom fabric like a masterpiece.
              </p>
              <p>
                Whether you are an ambitious brand looking to establish architectural LED presence, or custom ordering personalized stationery for your high-profile event, we employ state-of-the-art curing and laser routing engines to maintain absolute precision.
              </p>
            </motion.div>

            {/* Feature Highlights List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4"
            >
              {features.map((feat, index) => (
                <div 
                  key={index} 
                  className="p-5 rounded-xl bg-neutral-950/60 border border-white/5 hover:border-gold-500/20 hover:bg-neutral-950/90 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center mb-3">
                    {feat.icon}
                  </div>
                  <h4 className="text-white font-semibold text-sm tracking-wide mb-1">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Cards Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative space-y-6 z-10">
              
              {/* Card 1: Years of Executing excellence */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="p-8 rounded-2xl glass-card-gold relative overflow-hidden group shadow-xl"
              >
                {/* Accent pattern background inside Card */}
                <span className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-gold-500/10 transition-colors" />
                
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center border border-gold-500/25">
                    <BookmarkCheck className="w-7 h-7 text-gold-400" />
                  </div>
                  <div>
                    <div className="flex items-baseline space-x-1">
                      <Counter end={5} suffix="+" />
                    </div>
                    <p className="text-sm font-medium text-neutral-400 tracking-wider uppercase mt-1">
                      YEARS OF EXCELLENCE
                    </p>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 font-light mt-4 leading-relaxed">
                  Deep technical expertise matching global standard substrates and custom neon layouts.
                </p>
              </motion.div>

              {/* Card 2: 100% Quality Guarantee */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="p-8 rounded-2xl glass-card relative overflow-hidden group shadow-xl"
              >
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center border border-white/10">
                    <ShieldCheck className="w-7 h-7 text-gold-400" />
                  </div>
                  <div>
                    <div className="flex items-baseline space-x-1">
                      <Counter end={100} suffix="%" />
                    </div>
                    <p className="text-sm font-medium text-neutral-400 tracking-wider uppercase mt-1">
                      QUALITY GUARANTEE
                    </p>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 font-light mt-4 leading-relaxed">
                  Rigorous spot-checks and luxury finish ensures only absolute perfection reaches you.
                </p>
              </motion.div>

              {/* Luxury Stamp/Slogan badge underneath */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-neutral-950/40 border border-white/5"
              >
                <Check className="w-4 h-4 text-gold-400" />
                <span className="text-xs font-mono text-neutral-400 tracking-wider">
                  Guaranteed compliance with Pantone Color Standards
                </span>
              </motion.div>
            </div>

            {/* Glowing background bubble behind stats cards */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-gold-500/10 to-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}

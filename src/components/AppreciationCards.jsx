import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smile, Heart, Zap, Shield, Sparkles, Compass, 
  Flame, Award, Star, MessageSquareQuote 
} from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

const iconMap = {
  Smile: Smile,
  Heart: Heart,
  Zap: Zap,
  Shield: Shield,
  Sparkles: Sparkles,
  Compass: Compass,
  Flame: Flame,
  Award: Award,
  Star: Star,
};

export default function AppreciationCards({ appreciationMessages }) {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (idx) => {
    soundEngine.playSparkle();
    setActiveCard(activeCard === idx ? null : idx);
  };

  return (
    <section className="py-20 px-4 relative z-10 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium glass-pill text-pink-200 border border-pink-300/40 mb-3 shadow-glow-babypink"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>Chapter 02 • Honest Words</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4"
        >
          Things I Appreciate About You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-pink-100/80 text-sm sm:text-base max-w-xl mx-auto font-light"
        >
          A few reminders of the unique qualities that make you so irreplaceable.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appreciationMessages.map((item, idx) => {
          const IconComponent = iconMap[item.icon] || Sparkles;
          const isSelected = activeCard === idx;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => handleCardClick(idx)}
              className={`glass-card p-6 rounded-2xl cursor-pointer relative overflow-hidden transition-all duration-300 border ${
                isSelected
                  ? 'border-pink-300/50 shadow-glow-babypink bg-[#220E28]/95'
                  : 'border-white/15 hover:border-pink-300/35 hover:shadow-xl bg-[#1A0B20]/60'
              }`}
            >
              {/* Subtle background glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.accent || 'from-pink-500/10 to-transparent'} rounded-full blur-2xl pointer-events-none`} />

              <div className="flex items-start justify-between mb-5">
                <div className="p-3 rounded-xl bg-pink-500/15 border border-pink-300/30 text-pink-300 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-pink-300/60">
                  #{String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-pink-100/90 font-light leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 pt-3 border-t border-pink-300/15 flex items-center justify-between text-xs text-pink-200/70">
                <span className="text-[11px] text-pink-300/70 italic">Click to highlight</span>
                <Heart className={`w-3.5 h-3.5 transition-colors ${isSelected ? 'text-pink-400 fill-pink-400' : 'text-pink-300/40'}`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

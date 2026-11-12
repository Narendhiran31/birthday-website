import React from 'react';
import { motion } from 'framer-motion';
import { Clapperboard, Film, Sparkles } from 'lucide-react';

export default function MovieCredits({ credits, name }) {
  return (
    <section className="py-24 px-4 relative z-10 max-w-4xl mx-auto text-center">
      <div className="glass-card p-10 sm:p-16 rounded-3xl border border-pink-300/35 shadow-2xl relative overflow-hidden bg-[#1C0B22]/95 shadow-glow-babypink">
        <div className="flex items-center justify-center gap-2 text-pink-300 text-xs uppercase font-mono tracking-widest mb-6">
          <Clapperboard className="w-4 h-4 text-pink-300" />
          <span>Cinematic Epilogue</span>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-2xl sm:text-4xl font-extrabold tracking-widest text-white mb-12 uppercase"
        >
          {credits.title}
        </motion.h3>

        {/* Roles Credits Grid */}
        <div className="space-y-6 max-w-lg mx-auto mb-16">
          {credits.roles.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col sm:flex-row items-center justify-between py-2 border-b border-pink-300/15 gap-1 sm:gap-4"
            >
              <span className="text-xs uppercase font-mono tracking-widest text-pink-300/60 font-medium">
                {item.role}
              </span>
              <span className="font-serif text-sm sm:text-base font-semibold text-pink-100">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Big Ending Stamp */}
        <div className="pt-8 border-t border-pink-300/20">
          <p className="text-xs uppercase font-mono tracking-widest text-pink-300 mb-2 font-semibold">
            The Journey Continues
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-white gradient-babypink text-glow-babypink">
            HAPPY BIRTHDAY, {name} 🎂
          </h2>
        </div>
      </div>
    </section>
  );
}

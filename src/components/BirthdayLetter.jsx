import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Heart, Sparkles } from 'lucide-react';

export default function BirthdayLetter({ letter, name }) {
  return (
    <section className="py-24 px-4 relative z-10 max-w-4xl mx-auto">
      {/* Decorative Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium glass-pill text-pink-200 border border-pink-300/40 mb-3 shadow-glow-babypink"
        >
          <Feather className="w-3.5 h-3.5 text-pink-300" />
          <span>Chapter 05 • The Heartfelt Note</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4"
        >
          {letter.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-pink-100/80 text-sm sm:text-base max-w-lg mx-auto font-light"
        >
          Some thoughts are meant to be preserved in writing.
        </motion.p>
      </div>

      {/* Parchment / Cinematic Letter Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card p-8 sm:p-14 rounded-3xl border border-pink-300/35 shadow-2xl relative bg-[#1C0B22]/95 shadow-glow-babypink"
      >
        <div className="space-y-6 text-pink-100 font-sans leading-relaxed font-light text-base sm:text-lg">
          <p className="font-serif text-xl sm:text-2xl font-bold gradient-babypink">
            {letter.salutation}
          </p>

          {letter.paragraphs.map((para, idx) => {
            const isLast = idx === letter.paragraphs.length - 1;
            return (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={
                  isLast
                    ? "text-pink-200 font-serif text-lg sm:text-xl font-semibold italic pt-3 border-t border-pink-300/10 drop-shadow-sm"
                    : "text-pink-100/90 leading-relaxed"
                }
              >
                {para}
              </motion.p>
            );
          })}

          {/* Letter Ending Tribute */}
          <div className="pt-8 mt-8 border-t border-pink-300/20 space-y-3 font-serif">
            <p className="text-xl sm:text-2xl font-bold text-white gradient-babypink">
              Happy Birthday, {name}. ❤️
            </p>
            <p className="text-sm sm:text-base text-pink-200/80 font-light italic">
              Here's to another chapter,<br />
              another thousand memories,<br />
              and countless reasons to smile.
            </p>
          </div>

          {/* Closing & Signature */}
          <div className="pt-6 text-right">
            <p className="text-xs text-pink-300/60 uppercase tracking-widest font-mono mb-1">
              {letter.closing}
            </p>
            <p className="font-handwriting text-3xl sm:text-4xl text-pink-300">
              {letter.signature}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

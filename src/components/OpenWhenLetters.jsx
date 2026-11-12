import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, X, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export default function OpenWhenLetters({ letters }) {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const openLetter = (letter) => {
    soundEngine.playChime();
    setSelectedLetter(letter);
  };

  const closeLetter = () => {
    setSelectedLetter(null);
  };

  return (
    <section className="py-20 px-4 relative z-10 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium glass-pill text-pink-200 border border-pink-300/40 mb-3 shadow-glow-babypink"
        >
          <Mail className="w-3.5 h-3.5 text-pink-300" />
          <span>Timeless Keepsakes</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4"
        >
          "Open When..." Letters 💌
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-pink-100/80 text-sm sm:text-base max-w-xl mx-auto font-light"
        >
          Five sealed digital envelopes for different moods and seasons of life. Open whichever one you need today.
        </motion.p>
      </div>

      {/* Envelopes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {letters.map((letter, idx) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => openLetter(letter)}
            className="glass-card p-6 rounded-2xl cursor-pointer border border-pink-300/25 hover:border-pink-300/60 hover:shadow-glow-babypink transition-all duration-300 relative group flex flex-col justify-between min-h-[190px] bg-[#1C0B22]/70"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-300/30 flex items-center justify-center text-pink-300 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-200 border border-pink-300/20">
                  Envelope #{letter.id}
                </span>
              </div>

              <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-1">
                {letter.title}
              </h3>
              <p className="text-xs text-pink-200/70 font-light">
                {letter.subtitle}
              </p>
            </div>

            <div className="pt-4 border-t border-pink-300/15 flex items-center justify-between text-xs text-pink-300 group-hover:text-pink-200">
              <span className="font-medium">Break wax seal</span>
              <span>→</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Letter Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLetter}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl w-full glass-card p-8 sm:p-10 rounded-3xl border border-pink-300/40 shadow-glow-babypink relative bg-[#200D26]/95"
            >
              <button
                onClick={closeLetter}
                className="absolute top-5 right-5 p-2 rounded-full glass-pill text-pink-200 hover:text-white transition-colors cursor-pointer border border-pink-300/30"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <MailOpen className="w-4 h-4 text-pink-300" />
                <span>Letter Unsealed</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
                {selectedLetter.title}
              </h3>

              <div className="p-6 rounded-2xl bg-pink-950/40 border border-pink-300/20 mb-6">
                <p className="font-sans text-pink-100 text-base sm:text-lg leading-relaxed font-light whitespace-pre-line">
                  {selectedLetter.content}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-pink-300/70">
                <span className="flex items-center gap-1.5 text-pink-300">
                  <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                  Written with love
                </span>
                <button
                  onClick={closeLetter}
                  className="px-4 py-1.5 rounded-full glass-pill text-pink-200 hover:text-white cursor-pointer border border-pink-300/30"
                >
                  Close & Keep Safe
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

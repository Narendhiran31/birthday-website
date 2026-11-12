import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Check, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';

export default function GiftBoxes({ giftBoxes }) {
  const [openedBox, setOpenedBox] = useState(null);

  const handleOpenBox = (box) => {
    soundEngine.playChime();
    soundEngine.playFanfare();
    setOpenedBox(box);

    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#FBCFE8', '#FFFFFF', '#FB7185', '#FFF0F5']
    });
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
          <Gift className="w-3.5 h-3.5 text-pink-300" />
          <span>Interactive Surprise</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4"
        >
          Choose Your Birthday Gift Box 🎁
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-pink-100/80 text-sm sm:text-base max-w-xl mx-auto font-light"
        >
          Three digital gift boxes specially wrapped for you. Pick one to unwrap your surprise!
        </motion.p>
      </div>

      {/* Gift Boxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {giftBoxes.map((box, idx) => {
          const isOpened = openedBox?.id === box.id;

          return (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenBox(box)}
              className={`glass-card p-6 sm:p-8 rounded-3xl cursor-pointer relative overflow-hidden transition-all duration-300 border flex flex-col items-center text-center ${
                isOpened
                  ? 'border-pink-300/60 shadow-glow-babypink bg-[#220E28]/95'
                  : 'border-white/15 hover:border-pink-300/40 bg-[#1A0B20]/60'
              }`}
            >
              {/* Floating Gift Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-pink-500/30 via-pink-300/20 to-white/20 flex items-center justify-center border border-pink-200/40 shadow-xl group-hover:rotate-6 transition-transform">
                  <Gift className="w-10 h-10 text-pink-300 animate-bounce" style={{ animationDuration: '3s' }} />
                </div>
                <div className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md uppercase">
                  {box.badge}
                </div>
              </div>

              <h3 className="font-serif text-xl font-bold text-white mb-2">
                {box.title}
              </h3>

              <p className="text-xs text-pink-200/70 mb-6">
                {isOpened ? 'Box Unwrapped!' : 'Tap to open the ribbon & inspect contents'}
              </p>

              <button className="px-5 py-2 rounded-full glass-pill text-xs font-semibold text-pink-200 hover:text-white border border-pink-300/30 transition-colors flex items-center gap-2 bg-pink-500/15">
                <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                <span>{isOpened ? 'View Again' : 'Unwrap Box'}</span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Unwrapped Box Modal Display */}
      <AnimatePresence>
        {openedBox && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-12 glass-card p-8 rounded-3xl border border-pink-300/40 shadow-glow-babypink max-w-2xl mx-auto text-center relative overflow-hidden bg-[#200D26]/95"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-pink-500/20 text-pink-200 mb-4 border border-pink-300/30">
              <PartyPopper className="w-4 h-4 text-pink-300" />
              <span>Surprise Unlocked: {openedBox.badge}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              {openedBox.unlockedContent.title}
            </h3>

            <p className="text-pink-100 text-base sm:text-lg font-light leading-relaxed mb-6">
              {openedBox.unlockedContent.text}
            </p>

            <div className="p-4 rounded-2xl bg-pink-950/40 border border-pink-300/20 font-mono text-xs text-pink-200 italic">
              "{openedBox.unlockedContent.quote}"
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BirthdayHero({ name, subtitle, heroImage, onScrollToJourney }) {
  const triggerConfettiBlast = () => {
    confetti({
      particleCount: 85,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#F472B6', '#FBCFE8', '#FFFFFF', '#FB7185', '#FFF0F5']
    });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-16 text-center z-10">
      {/* Floating decorative elements in baby pink and white */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [-10, 20, -10], rotate: [-2, 3, -2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-[12%] opacity-30 hidden md:block text-5xl"
        >
          🌸
        </motion.div>
        <motion.div
          animate={{ y: [15, -25, 15], rotate: [3, -3, 3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-28 right-[14%] opacity-35 hidden md:block text-6xl"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [-4, 4, -4] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-20 left-[18%] opacity-30 hidden md:block text-4xl"
        >
          💖
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle Baby Pink & White badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold glass-pill text-pink-200 border border-pink-300/40 mb-8 shadow-glow-babypink"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>A Celebration of Grace, Beauty & Joy</span>
        </motion.div>

        {/* Profile Photo Showcase with Glowing Baby Pink & White Ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-8 cursor-pointer group"
          onClick={triggerConfettiBlast}
          title="Tap to shower with birthday confetti!"
        >
          {/* Soft Glow Border */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-pink-400 via-white to-pink-500 opacity-70 group-hover:opacity-90 transition duration-300" />

          {/* Floating Orbital Hearts */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-7 pointer-events-none will-change-transform"
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl">💖</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl">🌸</span>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xl">✨</span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl">💕</span>
          </motion.div>
          
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-b from-[#2A0E2E] via-[#1A0820] to-[#120517] p-2 flex items-center justify-center">
            <img
              src={heroImage}
              alt={name}
              className="w-full h-full object-contain rounded-full group-hover:scale-105 transition duration-500 ease-out"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="absolute bottom-2 right-2 bg-gradient-to-tr from-pink-500 to-pink-400 text-white p-2.5 rounded-full shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform">
            <Heart className="w-4 h-4 fill-white" />
          </div>
        </motion.div>

        {/* Hero Title in Baby Pink and White */}
        <motion.h1
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
        >
          Happy Birthday, <br />
          <span className="gradient-babypink font-serif text-glow-babypink">
            {name}
          </span>{' '}
          <span className="inline-block text-pink-400 animate-pulse">❤️</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-pink-100/90 text-base sm:text-xl font-light max-w-2xl mb-10 leading-relaxed px-4"
        >
          {subtitle}
        </motion.p>

        {/* CTA Button in Baby Pink & White */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onScrollToJourney}
          className="px-8 py-4 rounded-full text-white font-semibold text-sm sm:text-base flex items-center gap-3 bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 border border-white/40 shadow-glow-babypink cursor-pointer transition-all duration-300 hover:shadow-xl"
        >
          <span>Start the Journey</span>
          <ChevronDown className="w-4 h-4 text-white animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}

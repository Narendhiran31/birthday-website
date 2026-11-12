import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, RefreshCw, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';

export default function WishGenerator({ wishes }) {
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);

  // Typewriter effect when index changes
  useEffect(() => {
    const textToType = wishes[currentWishIndex] || wishes[0];
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;

    const timer = setInterval(() => {
      if (index < textToType.length) {
        setDisplayedText(textToType.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [currentWishIndex, wishes]);

  const generateNewWish = () => {
    soundEngine.playChime();
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * wishes.length);
    } while (nextIdx === currentWishIndex && wishes.length > 1);

    setCurrentWishIndex(nextIdx);

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#F472B6', '#FBCFE8', '#FFFFFF', '#FB7185', '#FFF0F5']
    });
  };

  const copyWish = () => {
    soundEngine.playSparkle();
    navigator.clipboard.writeText(wishes[currentWishIndex]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-4 relative z-10 max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium glass-pill text-pink-200 border border-pink-300/40 mb-3 shadow-glow-babypink"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>The Oracle of Blessings</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4"
        >
          Birthday Wish Generator ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-pink-100/80 text-sm sm:text-base max-w-lg mx-auto font-light"
        >
          Need a spark of inspiration? Click below to generate heartfelt blessings custom-curated for this year.
        </motion.p>
      </div>

      {/* Interactive Display Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-card p-8 sm:p-12 rounded-3xl border border-pink-300/35 shadow-glow-babypink relative overflow-hidden max-w-2xl mx-auto min-h-[260px] flex flex-col justify-between bg-[#1C0B22]/90"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-200/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header badge */}
        <div className="flex items-center justify-between text-xs text-pink-300/80 font-mono mb-6">
          <span>WISH #{String(currentWishIndex + 1).padStart(2, '0')}</span>
          <span className="flex items-center gap-1.5 text-pink-300 font-sans">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            Live Blessing
          </span>
        </div>

        {/* Typewritten Wish */}
        <div className="my-auto py-4">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-medium leading-relaxed">
            "{displayedText}"
            {isTyping && <span className="inline-block w-1.5 h-6 bg-pink-300 ml-1 animate-pulse" />}
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-pink-300/20 flex flex-wrap items-center justify-between gap-4 mt-6">
          <button
            onClick={generateNewWish}
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-500 via-pink-400 to-rose-400 hover:from-pink-600 hover:to-rose-500 shadow-glow-babypink flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 border border-white/30"
          >
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            <span>Give Me A Wish ✨</span>
          </button>

          <button
            onClick={copyWish}
            className="px-4 py-2.5 rounded-full glass-pill hover:bg-pink-500/20 text-xs font-medium text-pink-200 hover:text-white flex items-center gap-2 border border-pink-300/30 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-pink-300" />
                <span className="text-pink-300 font-semibold">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-pink-300/70" />
                <span>Copy Wish</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
}

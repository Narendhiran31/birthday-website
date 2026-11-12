import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, Send, Star, Flame, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';
import { birthdayData } from '../birthdayData';

export default function BirthdayCake() {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [hasBlownAll, setHasBlownAll] = useState(false);
  const [wishText, setWishText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wishSent, setWishSent] = useState(false);
  const [shootingStar, setShootingStar] = useState(false);

  const extinguishCandle = (idx) => {
    if (!candles[idx]) return;
    soundEngine.playBlowOut();

    const newCandles = [...candles];
    newCandles[idx] = false;
    setCandles(newCandles);

    if (newCandles.every((c) => !c)) {
      triggerAllBlown();
    }
  };

  const blowAllCandles = () => {
    soundEngine.playBlowOut();
    setCandles([false, false, false, false, false]);
    triggerAllBlown();
  };

  const triggerAllBlown = () => {
    setHasBlownAll(true);
    soundEngine.playFanfare();

    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#FBCFE8', '#FFFFFF', '#FB7185', '#FFF0F5'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 55,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F472B6', '#FFFFFF', '#FBCFE8'],
      });
      confetti({
        particleCount: 55,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F472B6', '#FFFFFF', '#FBCFE8'],
      });
    }, 400);
  };

  const handleSendWish = async (e) => {
    e.preventDefault();
    if (!wishText.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const targetEmail = 'narendhiran972@gmail.com';
    const currentWish = wishText.trim();

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: "✨ Priya Dharsini made a Secret Birthday Wish! 🎂💌",
          _template: 'table',
          _captcha: 'false',
          'Name': 'Priya Dharsini',
          'Secret Birthday Wish': currentWish,
          'Sent Date & Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }),
      });

      if (!response.ok) {
        // Fallback using FormData with no-cors to bypass any browser restrictions
        const formData = new FormData();
        formData.append('_subject', "✨ Priya Dharsini made a Secret Birthday Wish! 🎂💌");
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');
        formData.append('Name', 'Priya Dharsini');
        formData.append('Secret Birthday Wish', currentWish);
        formData.append('Sent Date & Time', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
        fetch(`https://formsubmit.co/${targetEmail}`, {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        }).catch(() => {});
      }
    } catch (err) {
      console.warn('FormSubmit notice:', err);
      try {
        const formData = new FormData();
        formData.append('_subject', "✨ Priya Dharsini made a Secret Birthday Wish! 🎂💌");
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');
        formData.append('Name', 'Priya Dharsini');
        formData.append('Secret Birthday Wish', currentWish);
        formData.append('Sent Date & Time', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
        fetch(`https://formsubmit.co/${targetEmail}`, {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        }).catch(() => {});
      } catch (e2) {}
    } finally {
      setIsSubmitting(false);
      soundEngine.playSparkle();
      setWishSent(true);
      setShootingStar(true);

      confetti({
        particleCount: 50,
        spread: 75,
        origin: { y: 0.3 },
        colors: ['#F472B6', '#FBCFE8', '#FFFFFF'],
      });

      setTimeout(() => {
        setShootingStar(false);
      }, 3000);
    }
  };

  const reignite = () => {
    soundEngine.playChime();
    setCandles([true, true, true, true, true]);
    setHasBlownAll(false);
    setWishSent(false);
    setWishText('');
  };

  return (
    <section className="py-20 px-4 relative z-10 max-w-4xl mx-auto text-center">
      {/* Shooting Star Animation */}
      <AnimatePresence>
        {shootingStar && (
          <motion.div
            initial={{ x: '-10%', y: '80%', opacity: 1, scale: 0.6 }}
            animate={{ x: '120%', y: '-20%', opacity: 0, scale: 1.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
            className="fixed top-0 left-0 pointer-events-none z-50 flex items-center gap-2"
          >
            <div className="w-6 h-6 rounded-full bg-white shadow-glow-babypink flex items-center justify-center">
              <Star className="w-4 h-4 text-pink-500 fill-pink-500" />
            </div>
            <div className="w-36 h-1.5 bg-gradient-to-r from-white via-pink-400 to-transparent blur-xs" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold glass-pill text-pink-200 border border-pink-300/40 mb-3 shadow-glow-babypink"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>Chapter 04 • The Ritual</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4"
        >
          Make A Birthday Wish, Priya 🎂
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-pink-100/90 text-sm sm:text-base max-w-lg mx-auto font-light"
        >
          Tap the candle flames to extinguish them, or take a deep breath and blow them all out together!
        </motion.p>
      </div>

      {/* Birthday Cake Container in Baby Pink & White */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border-2 border-pink-300/40 max-w-xl mx-auto shadow-2xl relative bg-[#1C0B22]/90 shadow-glow-babypink">
        <div className="relative flex flex-col items-center justify-center pt-8 pb-4">
          {/* Candles Row in Baby Pink & White */}
          <div className="flex items-end justify-center gap-6 sm:gap-8 mb-[-4px] z-20">
            {candles.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => extinguishCandle(idx)}
                className="flex flex-col items-center cursor-pointer group"
                title="Tap to extinguish candle"
              >
                {/* Flame */}
                {isLit ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 0.95, 1.1, 1],
                      rotate: [-2, 3, -3, 2, -2],
                      opacity: [0.9, 1, 0.85, 1, 0.9],
                    }}
                    transition={{
                      duration: 1.2 + idx * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-4 h-6 sm:w-5 sm:h-7 rounded-full bg-gradient-to-t from-pink-500 via-pink-300 to-white shadow-glow-babypink mb-1"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
                    animate={{ opacity: 0, y: -18, scale: 1.4 }}
                    transition={{ duration: 0.8 }}
                    className="w-3 h-5 text-pink-200 text-xs flex items-center justify-center font-mono"
                  >
                    💨
                  </motion.div>
                )}

                {/* Candle Wick */}
                <div className="w-0.5 h-2 bg-pink-300" />

                {/* Candle Stick */}
                <div
                  className={`w-3.5 h-12 sm:w-4 sm:h-14 rounded-t-sm shadow-md transition-colors ${
                    idx % 2 === 0
                      ? 'bg-gradient-to-b from-pink-300 to-pink-500 border border-white/60'
                      : 'bg-gradient-to-b from-white to-pink-200 border border-pink-300/60'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Top Cake Tier - Pastel Strawberry Cream */}
          <div className="w-52 sm:w-64 h-16 rounded-t-2xl bg-gradient-to-r from-pink-400 via-pink-300 to-pink-400 border-2 border-white shadow-lg flex items-center justify-around px-4 relative z-10">
            <span className="text-white text-xs font-serif font-bold tracking-widest drop-shadow-md">🌸 ★ PRIYA ★ 🌸</span>
          </div>

          {/* Baby pink & white frosting drips */}
          <div className="w-52 sm:w-64 flex justify-around -mt-1 z-10 px-2 pointer-events-none">
            <div className="w-4 h-3.5 rounded-b-full bg-white shadow-sm" />
            <div className="w-5 h-4.5 rounded-b-full bg-pink-200 shadow-sm" />
            <div className="w-3.5 h-3 rounded-b-full bg-white shadow-sm" />
            <div className="w-5 h-4.5 rounded-b-full bg-pink-200 shadow-sm" />
          </div>

          {/* Bottom Cake Tier - Radiant Baby Pink */}
          <div className="w-64 sm:w-80 h-20 rounded-2xl bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 border-2 border-white shadow-2xl flex items-center justify-center relative">
            <span className="text-white font-serif text-sm sm:text-base font-bold tracking-wider drop-shadow-md">
              {hasBlownAll ? '✨ WISH UNLOCKED ✨' : 'HAPPY BIRTHDAY PRIYA 💖'}
            </span>
          </div>

          {/* Cake Stand / Plate */}
          <div className="w-72 sm:w-96 h-4 rounded-full bg-gradient-to-r from-pink-200/50 via-white to-pink-200/50 border-t-2 border-white shadow-xl mt-[-2px]" />
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {!hasBlownAll ? (
            <button
              onClick={blowAllCandles}
              className="px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 hover:from-pink-600 hover:to-pink-500 border border-white/40 shadow-glow-babypink flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <Wind className="w-4 h-4" />
              <span>Blow Out All Candles 💨</span>
            </button>
          ) : (
            <button
              onClick={reignite}
              className="px-6 py-2.5 rounded-full glass-pill hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-2 transition-colors cursor-pointer border border-white/30"
            >
              <Flame className="w-3.5 h-3.5 text-pink-300" />
              <span>Light Candles Again</span>
            </button>
          )}
        </div>

        {/* Revealed Wish Area */}
        <AnimatePresence>
          {hasBlownAll && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 pt-8 border-t border-white/20"
            >
              <h3 className="font-serif text-xl sm:text-2xl text-white font-bold mb-2">
                Make A Wish... ✨
              </h3>
              <p className="text-xs sm:text-sm text-pink-200 font-light mb-6">
                May this year bring you endless happiness, good health, and sweet surprises.
              </p>

              {!wishSent ? (
                <form onSubmit={handleSendWish} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="Type your secret birthday wish, Priya..."
                    disabled={isSubmitting}
                    className="flex-1 bg-[#18091E]/90 border border-pink-300/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-pink-200/50 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition-all disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-pink-400 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/30 disabled:opacity-60 disabled:cursor-not-allowed shadow-glow-babypink"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending... ✨</span>
                      </>
                    ) : (
                      <>
                        <span>Launch Wish</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-2xl bg-pink-500/20 border border-pink-300/40 text-pink-100 font-medium text-sm flex items-center justify-center gap-2 animate-fade-in shadow-glow-babypink">
                  <Star className="w-4 h-4 fill-pink-300 text-pink-300" />
                  <span>Wish received ✨ Your wish has become a shining star in the sky! 💌</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

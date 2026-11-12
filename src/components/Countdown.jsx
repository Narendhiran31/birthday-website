import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Countdown({ birthdayDate, name }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthdayToday, setIsBirthdayToday] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const parts = String(birthdayDate).split('-');
      const bMonth = parseInt(parts[1], 10) - 1;
      const bDay = parseInt(parts[2], 10);

      const isToday =
        now.getMonth() === bMonth &&
        now.getDate() === bDay;

      if (isToday) {
        setIsBirthdayToday(true);
        return;
      }

      let targetYear = now.getFullYear();
      let nextBirthday = new Date(targetYear, bMonth, bDay, 0, 0, 0);

      if (now.getTime() > nextBirthday.getTime()) {
        nextBirthday = new Date(targetYear + 1, bMonth, bDay, 0, 0, 0);
      }

      const diff = nextBirthday.getTime() - now.getTime();

      if (diff <= 0) {
        setIsBirthdayToday(true);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
        setIsBirthdayToday(false);
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [birthdayDate]);

  const triggerCheer = () => {
    confetti({
      particleCount: 70,
      spread: 85,
      origin: { y: 0.5 },
      colors: ['#F472B6', '#FBCFE8', '#FFFFFF', '#FB7185']
    });
  };

  return (
    <section className="py-12 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtitle intro */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm uppercase tracking-widest text-pink-300 font-semibold mb-3 flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4 text-pink-300" />
          Today isn't just another day...
        </motion.p>

        {isBirthdayToday ? (
          /* Live Birthday Mode in Baby Pink & White */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 sm:p-12 rounded-3xl border-2 border-white/50 shadow-glow-babypink relative overflow-hidden bg-[#1A0B22]/90"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-pink-500/25 text-pink-200 border border-white/40 mb-4 animate-bounce">
                <PartyPopper className="w-4 h-4 text-pink-300" />
                CELEBRATION TIME
              </span>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-white mb-4">
                IT'S YOUR DAY, PRIYA! <span className="inline-block animate-pulse">🎉</span>
              </h2>

              <p className="text-pink-100/90 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed mb-6">
                The universe paused to celebrate the wonderful human you are.
                Today is all about you, {name}!
              </p>

              <button
                onClick={triggerCheer}
                className="px-6 py-2.5 rounded-full glass-pill hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 border border-white/40 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-pink-300" />
                Tap For Birthday Cheers
              </button>
            </div>
          </motion.div>
        ) : (
          /* Countdown Mode */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-6 sm:p-10 rounded-3xl border border-pink-300/30 bg-[#1D0C22]/85 shadow-glow-babypink"
          >
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-8">
              Counting Down To The Big Moment ✨
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-pink-950/40 border border-pink-300/20 p-4 rounded-2xl flex flex-col items-center justify-center backdrop-blur-md shadow-sm"
                >
                  <span className="text-3xl sm:text-4xl font-bold font-serif text-white gradient-babypink mb-1">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-pink-200 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

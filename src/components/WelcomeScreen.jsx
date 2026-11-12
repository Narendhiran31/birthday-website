import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Lock, Unlock, Clock, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';

export default function WelcomeScreen({ onEnter, name, birthdayDate, unlockPasscode = "Open143" }) {
  const [isEntering, setIsEntering] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [bypassClicks, setBypassClicks] = useState(0);
  const [isBypassed, setIsBypassed] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [passcodeSuccess, setPasscodeSuccess] = useState(false);

  // Check URL query parameters and local storage for saved unlock state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if (localStorage.getItem('nsp_unlocked') === 'true') {
          setIsBypassed(true);
          setIsUnlocked(true);
        }
      } catch (e) {}

      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('unlock') === 'true' || searchParams.get('preview') === 'true' || searchParams.get('passcode') === unlockPasscode) {
        setIsBypassed(true);
        setIsUnlocked(true);
      }
    }
  }, [unlockPasscode]);

  // Target date: November 14, 12:00 AM (00:00:00)
  const targetUnlockDate = useMemo(() => {
    const now = new Date();
    let year = now.getFullYear();
    if (birthdayDate) {
      const parts = String(birthdayDate).split('-');
      if (parts[0] && parts[0].length === 4) {
        year = parseInt(parts[0], 10);
      }
    }
    // Month is 10 for November (0-indexed: 0=Jan ... 10=Nov), Day is 14, Time is 00:00:00 (12:00 AM)
    return new Date(year, 10, 14, 0, 0, 0);
  }, [birthdayDate]);

  // Live timer tick every second
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetUnlockDate.getTime() - now.getTime();

      if (diff <= 0 || isBypassed) {
        setIsUnlocked(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsUnlocked(false);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetUnlockDate, isBypassed]);

  // Handle clicking the unlock / start button
  const handleButtonClick = () => {
    if (!isUnlocked) {
      // Trigger wiggle animation and gentle notice
      setShakeKey((prev) => prev + 1);
      setShowNotice(true);
      soundEngine.playTone(320, 'triangle', 0.2, 0, 0.08);

      setTimeout(() => {
        setShowNotice(false);
      }, 4000);
      return;
    }

    // Unlocked! Enter the website
    setIsEntering(true);
    soundEngine.playChime();
    soundEngine.playBGM();

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#FBCFE8', '#FFFFFF', '#FB7185', '#FFF0F5']
    });

    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  // Secret bypass toggle for creator testing: click the lock badge 5 times
  const handleSecretBypass = () => {
    const next = bypassClicks + 1;
    setBypassClicks(next);
    if (next >= 5) {
      setIsBypassed(true);
      setIsUnlocked(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#38BDF8', '#F472B6', '#FFFFFF']
      });
    }
  };

  // Handle secret password submit to unlock
  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    if (passcode.trim().toLowerCase() === String(unlockPasscode).trim().toLowerCase()) {
      setIsBypassed(true);
      setIsUnlocked(true);
      setPasscodeSuccess(true);
      setPasscodeError(false);

      try {
        localStorage.setItem('nsp_unlocked', 'true');
      } catch (err) {}

      soundEngine.playFanfare();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F472B6', '#FBCFE8', '#FFFFFF', '#FB7185', '#FFF0F5']
      });
    } else {
      setPasscodeError(true);
      soundEngine.playTone(280, 'sawtooth', 0.25, 0, 0.08);
      setTimeout(() => setPasscodeError(false), 3500);
    }
  };

  return (
    <AnimatePresence>
      {!isEntering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-[#140A18]/98 overflow-y-auto"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(244,114,182,0.18) 0%, transparent 60%)'
          }}
        >

          {/* Lock / Unlock Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            onClick={handleSecretBypass}
            title={isBypassed ? "Preview mode active" : "Tap to inspect"}
            className={`mb-5 p-3.5 sm:p-4 rounded-full glass-card border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
              isUnlocked
                ? 'border-pink-300 shadow-glow-babypink bg-pink-500/20 scale-105'
                : 'border-pink-300/30 bg-pink-950/40 text-pink-300/70'
            }`}
          >
            {isUnlocked ? (
              <Unlock className="w-7 h-7 sm:w-8 sm:h-8 text-pink-300 animate-pulse" />
            ) : (
              <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-pink-300/70" />
            )}
          </motion.div>

          {/* Status pill indicator */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4"
          >
            {isUnlocked ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-pink-500/25 text-pink-200 border border-pink-300/40 shadow-sm animate-bounce">
                <PartyPopper className="w-3.5 h-3.5 text-pink-300" />
                UNLOCKED • IT'S TIME TO CELEBRATE!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-pink-950/60 text-pink-300/80 border border-pink-400/20 shadow-sm">
                <Clock className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
                LOCKED UNTIL NOV 14, 12:00 AM
              </span>
            )}
          </motion.div>

          {/* Personalized gentle welcome message */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg font-light text-pink-200 tracking-wide mb-2"
          >
            Hey {name ? name : 'there'}... 🌸
          </motion.p>

          <motion.h1
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 max-w-2xl leading-tight"
          >
            A Special Birthday Experience <br className="hidden sm:inline" />
            <span className="gradient-babypink font-serif text-glow-babypink">
              {isUnlocked ? 'Is Ready For You ✨' : 'Locked Until Your Special Day 🔒'}
            </span>
          </motion.h1>

          {/* LIVE COUNTDOWN TIMER CARD */}
          {!isUnlocked && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="w-full max-w-md mx-auto mb-8 p-4 sm:p-6 rounded-3xl glass-card border border-pink-300/30 bg-[#1A0B22]/85 shadow-glow-babypink"
            >
              <div className="flex items-center justify-center gap-2 mb-4 text-xs uppercase tracking-wider text-pink-200/90 font-medium">
                <Clock className="w-3.5 h-3.5 text-pink-300" />
                <span>Time Remaining Until Unlock</span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.minutes },
                  { label: 'Secs', value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-pink-950/60 border border-pink-300/25 p-2 sm:p-3 rounded-2xl flex flex-col items-center justify-center backdrop-blur-md shadow-inner"
                  >
                    <span className="text-xl sm:text-3xl font-bold font-serif text-white gradient-babypink tabular-nums">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-pink-200/80 font-medium mt-0.5">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[11px] sm:text-xs text-pink-300/70 font-light">
                Opens sharply on <span className="text-pink-200 font-semibold">November 14, 12:00 AM</span> 🕛
              </p>
            </motion.div>
          )}

          {/* Notice Banner when clicking while locked */}
          <AnimatePresence>
            {showNotice && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mb-6 px-4 py-2.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-medium flex items-center gap-2 shadow-lg max-w-md mx-auto"
              >
                <Lock className="w-4 h-4 text-pink-300 flex-shrink-0" />
                <span>Patience, Priya! 🌸 Unlocks strictly on Nov 14 at 12:00 AM ✨</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button: Dull & disabled when locked, Glowing & vibrant when unlocked */}
          <motion.div
            key={shakeKey}
            animate={shakeKey > 0 ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              whileHover={isUnlocked ? { scale: 1.04, boxShadow: '0 0 35px rgba(244, 114, 182, 0.6)' } : {}}
              whileTap={isUnlocked ? { scale: 0.98 } : {}}
              onClick={handleButtonClick}
              className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 overflow-hidden ${
                isUnlocked
                  ? 'text-white bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 border border-white/50 shadow-xl cursor-pointer hover:brightness-110'
                  : 'text-pink-300/40 bg-white/5 border border-white/10 opacity-60 cursor-not-allowed shadow-none'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isUnlocked ? (
                  <>
                    Enter Your Birthday Experience
                    <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-pink-300/50" />
                    Locked • Opens Nov 14, 12:00 AM
                  </>
                )}
              </span>

              {isUnlocked && (
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </motion.button>
          </motion.div>

          {/* Secret Birthday Passcode Form */}
          {!isUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              className="mt-6 w-full max-w-sm mx-auto"
            >
              <form onSubmit={handlePasscodeSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPasscodeError(false);
                  }}
                  placeholder="Enter passcode (Open143)..."
                  className="w-full sm:flex-1 px-4 py-2.5 rounded-full bg-pink-950/70 border border-pink-300/40 text-white placeholder-pink-300/40 text-xs sm:text-sm text-center sm:text-left focus:outline-none focus:border-pink-300 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!passcode.trim()}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-pink-400 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white text-xs font-semibold shadow-md transition-all hover:scale-105 cursor-pointer whitespace-nowrap border border-white/30 disabled:opacity-50"
                >
                  Unlock ✨
                </button>
              </form>

              {passcodeError && (
                <p className="mt-2 text-xs text-rose-300">
                  Incorrect passcode! Try <span className="font-semibold text-white">Open143</span> 🌸
                </p>
              )}
            </motion.div>
          )}

          {/* Passcode success banner */}
          {passcodeSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 px-4 py-1.5 rounded-full bg-pink-500/25 border border-pink-300/40 text-pink-200 text-xs font-medium"
            >
              🎉 Passcode Verified! Welcome, Priya! Tap the button above to enter ✨
            </motion.div>
          )}

          {/* Subtle note / hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-8 flex items-center gap-2 text-xs text-pink-300/70"
          >
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/40" />
            <span>
              {isUnlocked
                ? 'Best experienced with sound enabled 🎵'
                : 'Turn on sound & get ready for the countdown ⏳'}
            </span>
          </motion.div>

          {/* Creator bypass indicator (only visible if bypassed) */}
          {isBypassed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-[11px] text-blue-200"
            >
              🔓 Creator Preview Mode Active (Unlocked)
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

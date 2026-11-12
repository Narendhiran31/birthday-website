import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ShieldAlert, Cpu, Sparkles, Terminal } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export default function FutureCapsule({ futureCapsule }) {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [decrypting, setDecrypting] = useState(false);

  const handleDecrypt = () => {
    soundEngine.playChime();
    setDecrypting(true);
    setTimeout(() => {
      setDecrypting(false);
      setIsDecrypted(true);
      soundEngine.playFanfare();
    }, 1800);
  };

  return (
    <section className="py-20 px-4 relative z-10 max-w-4xl mx-auto">
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-pink-300/35 shadow-2xl relative overflow-hidden bg-[#1C0B22]/90 shadow-glow-babypink">
        {/* Soft pink ambient light */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-pink-500/15 text-pink-200 border border-pink-300/30 mb-3 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-pink-300" />
              TEMPORAL TIME CAPSULE • LOCK: {futureCapsule.unlockYear}
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              {futureCapsule.title}
            </h3>
          </div>

          <div className="p-3 rounded-2xl bg-pink-500/15 border border-pink-300/30 text-pink-300">
            <Cpu className="w-7 h-7" />
          </div>
        </div>

        {/* Status / preview box */}
        {!isDecrypted ? (
          <div className="p-6 rounded-2xl bg-pink-950/35 border border-pink-300/25 mb-8 space-y-4 font-mono text-xs text-pink-200/80">
            <div className="flex items-center gap-2 text-pink-300">
              <Terminal className="w-4 h-4" />
              <span className="font-semibold">TRANSMISSION METADATA:</span>
            </div>
            <p>From: <span className="text-white">{futureCapsule.sender}</span></p>
            <p>Status: <span className="text-pink-300">Sealed birthday message pending authorization</span></p>
            <p className="text-pink-200/90 italic font-sans text-sm">"{futureCapsule.preview}"</p>

            <button
              onClick={handleDecrypt}
              disabled={decrypting}
              className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-pink-400 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-sans font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-glow-babypink transition-transform hover:scale-105 cursor-pointer disabled:opacity-50 border border-white/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>{decrypting ? 'Unsealing Future Transmission...' : 'Unseal Message & Read Now 💌'}</span>
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl bg-[#220E28]/95 border border-pink-300/40 mb-6 text-left relative shadow-glow-babypink"
          >
            <div className="flex items-center gap-2 text-pink-300 text-xs font-mono uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
              <span>Decryption Complete • Direct Birthday Link</span>
            </div>

            <p className="font-serif text-base sm:text-lg text-pink-50 leading-relaxed font-light mb-6">
              "{futureCapsule.message}"
            </p>

            <div className="text-xs text-pink-300 font-mono flex items-center gap-2">
              <span>Timestamp: October 2030, Neo Earth</span>
              <span>• Transmitted with 100% Love</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

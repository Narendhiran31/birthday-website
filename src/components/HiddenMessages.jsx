import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Sparkles, Key, Eye } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export default function HiddenMessages({ hiddenMessages }) {
  const [unlockedCards, setUnlockedCards] = useState({});

  const toggleUnlock = (id) => {
    soundEngine.playChime();
    setUnlockedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
          <Key className="w-3.5 h-3.5 text-pink-300" />
          <span>Chapter 03 • The Vault</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4"
        >
          There are a few things I never say enough...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-pink-100/80 text-sm sm:text-base max-w-xl mx-auto font-light"
        >
          Encrypted thoughts locked in the vault. Tap any card to decrypt and reveal the truth.
        </motion.p>
      </div>

      {/* Grid of Flip / Unlock Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {hiddenMessages.map((item, idx) => {
          const isRevealed = !!unlockedCards[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => toggleUnlock(item.id)}
              className="cursor-pointer group perspective-1000 min-h-[220px]"
            >
              <div
                className={`relative w-full h-full p-7 rounded-2xl transition-all duration-500 border ${
                  isRevealed
                    ? 'glass-card border-pink-300/50 shadow-glow-babypink bg-[#220E28]/95'
                    : 'glass-card border-white/15 hover:border-pink-300/35 bg-[#1A0B20]/60 hover:bg-[#1E0D25]/80'
                }`}
              >
                {/* Background aura */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-pink-500/10 via-pink-300/5 to-transparent rounded-2xl opacity-20 transition-opacity duration-300 ${
                    isRevealed ? 'opacity-40' : 'group-hover:opacity-30'
                  }`}
                />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Header bar */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-widest font-mono text-pink-300/70">
                        Vault #{item.id} • {item.hint}
                      </span>
                      <div
                        className={`p-2 rounded-full transition-colors ${
                          isRevealed
                            ? 'bg-pink-500/25 text-pink-200'
                            : 'bg-white/10 text-pink-200/70 group-hover:text-white'
                        }`}
                      >
                        {isRevealed ? (
                          <Unlock className="w-4 h-4 text-pink-300 animate-spin" style={{ animationIterationCount: 1, animationDuration: '0.4s' }} />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    {/* Content Area */}
                    {isRevealed ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-3"
                      >
                        <p className="font-serif text-lg sm:text-xl text-white font-medium leading-relaxed">
                          "{item.secret}"
                        </p>
                      </motion.div>
                    ) : (
                      <div className="py-6 flex flex-col items-center justify-center text-center">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                          <span className="text-xs font-mono text-pink-300 uppercase tracking-wider">
                            Encrypted Message
                          </span>
                        </div>
                        <p className="text-xs text-pink-300/50 font-mono tracking-widest">
                          •••••••• •••••••• ••••••••
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-pink-300/15 flex items-center justify-between text-xs text-pink-300/60">
                    <span>{isRevealed ? 'Unlocked & Preserved' : 'Click to decrypt message'}</span>
                    <Sparkles className={`w-3.5 h-3.5 ${isRevealed ? 'text-pink-300' : 'text-pink-400/40'}`} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Moon, Compass } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export default function Constellation({ constellation }) {
  const [selectedStar, setSelectedStar] = useState(null);

  const handleStarClick = (star) => {
    soundEngine.playSparkle();
    setSelectedStar(star);
  };

  return (
    <section className="py-20 px-4 relative z-10 max-w-5xl mx-auto text-center">
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium glass-pill text-pink-200 border border-pink-300/40 mb-3 shadow-glow-babypink"
        >
          <Moon className="w-3.5 h-3.5 text-pink-300" />
          <span>Celestial Map</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4"
        >
          {constellation.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-pink-100/80 text-sm sm:text-base max-w-lg mx-auto font-light"
        >
          {constellation.description} Tap any shining star in the cluster to inspect its meaning.
        </motion.p>
      </div>

      {/* Constellation Canvas Viewport */}
      <div className="relative glass-card p-6 sm:p-10 rounded-3xl border border-pink-300/30 shadow-2xl max-w-3xl mx-auto overflow-hidden bg-[#1B0B21]/85 shadow-glow-babypink">
        {/* Soft pink nebula backdrop */}
        <div className="absolute inset-0 bg-radial from-pink-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative w-full aspect-[16/10] sm:aspect-[2/1] flex items-center justify-center">
          {/* SVG Connecting Lines between Stars in Baby Pink */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <polyline
              points={constellation.stars.map((s) => `${s.x}%,${s.y}%`).join(' ')}
              fill="none"
              stroke="rgba(244, 114, 182, 0.5)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Cross connection for constellation network */}
            {constellation.stars.length > 4 && (
              <line
                x1={`${constellation.stars[1].x}%`}
                y1={`${constellation.stars[1].y}%`}
                x2={`${constellation.stars[4].x}%`}
                y2={`${constellation.stars[4].y}%`}
                stroke="rgba(255, 182, 193, 0.35)"
                strokeWidth="1"
              />
            )}
          </svg>

          {/* Stars */}
          {constellation.stars.map((star) => {
            const isSelected = selectedStar?.id === star.id;

            return (
              <button
                key={star.id}
                onClick={() => handleStarClick(star)}
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
              >
                {/* Glow ring */}
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-pink-400/40 scale-125 border-2 border-white shadow-glow-babypink'
                      : 'bg-pink-500/15 hover:bg-pink-500/30 border border-pink-300/30 hover:scale-110'
                  }`}
                >
                  <Star
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                      isSelected
                        ? 'text-white fill-pink-300 animate-spin-slow'
                        : 'text-pink-200 group-hover:text-white'
                    }`}
                  />
                </div>

                {/* Star label */}
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap text-[10px] sm:text-xs text-pink-100 font-medium group-hover:text-white transition-colors bg-pink-950/80 px-2 py-0.5 rounded-full border border-pink-300/30">
                  {star.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Star Details Card */}
        <AnimatePresence>
          {selectedStar && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-8 p-5 rounded-2xl glass-card border border-pink-300/40 bg-[#220E28]/95 text-left flex items-center justify-between gap-4 shadow-glow-babypink"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-pink-300" />
                  <span className="text-xs font-mono text-pink-300 uppercase tracking-wider font-semibold">
                    {selectedStar.name}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-pink-100 font-light">
                  {selectedStar.trait}
                </p>
              </div>

              <button
                onClick={() => setSelectedStar(null)}
                className="text-xs text-pink-200 hover:text-white px-3 py-1.5 rounded-full glass-pill cursor-pointer border border-pink-300/30"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

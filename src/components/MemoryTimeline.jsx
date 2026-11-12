import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, MapPin, Sparkles, BookOpen, Eye, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export default function MemoryTimeline({ memories, title = "The Journey We've Shared" }) {
  const [expandedId, setExpandedId] = useState(0); // First one expanded by default
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const toggleExpand = (idx) => {
    soundEngine.playChime();
    setExpandedId(expandedId === idx ? -1 : idx);
  };

  return (
    <section id="journey" className="py-20 px-4 relative z-10 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium glass-pill text-pink-200 border border-pink-300/40 mb-3 shadow-glow-babypink"
        >
          <BookOpen className="w-3.5 h-3.5 text-pink-300" />
          <span>Chapter 01 • Memory Lane</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-light"
        >
          Click any chapter to unlock the full story behind the moment.
        </motion.p>
      </div>

      {/* Vertical Timeline Tree - responsive and perfectly aligned */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-pink-300/30 ml-6 sm:ml-10 space-y-10 sm:space-y-12">
        {memories.map((mem, idx) => {
          const isExpanded = expandedId === idx;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Year Pill / Timeline Node */}
              <div
                onClick={() => toggleExpand(idx)}
                className={`absolute -left-[38px] sm:-left-[46px] top-1.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold cursor-pointer transition-all duration-300 border-2 ${
                  isExpanded
                    ? 'bg-pink-500 border-white text-white shadow-glow-babypink scale-110'
                    : 'bg-[#1D0C22] border-pink-300/40 text-pink-200 hover:border-pink-300 hover:scale-105'
                }`}
              >
                {mem.year.slice(-2)}
              </div>

              {/* Memory Card */}
              <div
                onClick={() => toggleExpand(idx)}
                className={`glass-card p-5 sm:p-7 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isExpanded
                    ? 'border-pink-300/50 shadow-glow-babypink bg-[#1F0D25]/90'
                    : 'border-white/15 hover:border-pink-300/30 bg-[#1A0B20]/60'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-pink-300">
                      {mem.year}
                    </span>
                    <span className="text-pink-400/40 text-xs">•</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/15 text-pink-200 border border-pink-300/25">
                      {mem.tag}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-pink-300"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2">
                  {mem.title}
                </h3>

                {/* Teaser leading into full story reveal */}
                <p className="text-sm text-pink-200/80 font-light italic mb-2">
                  "{mem.teaser}"
                </p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden pt-4 border-t border-pink-300/20 mt-4 space-y-4"
                    >
                      {/* Emoji Banner Showcase (No photos, pure emoji emotion) */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-500/15 via-pink-400/10 to-pink-500/15 border border-pink-300/25 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-pink-500/20 border border-pink-300/40 flex items-center justify-center text-3xl shadow-glow-babypink shrink-0 animate-bounce" style={{ animationDuration: '3s' }}>
                          {mem.emoji || '🌸'}
                        </div>
                        <div className="space-y-2 text-center sm:text-left flex-1">
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                            {(mem.emojis || ['🌸', '✨', '💖']).map((emo, eIdx) => (
                              <span key={eIdx} className="text-xl filter drop-shadow">
                                {emo}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm sm:text-base text-pink-50 leading-relaxed font-light">
                            {mem.fullStory}
                          </p>
                        </div>
                      </div>

                      {/* 3 Zoom-Outted Photos Grid */}
                      {mem.photos && mem.photos.length > 0 && (
                        <div className="pt-2">
                          <p className="text-xs uppercase tracking-wider font-semibold text-pink-300 mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3" />
                            <span>Memory Photos (Full Frame)</span>
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {mem.photos.map((photoSrc, pIdx) => (
                              <div
                                key={pIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPhoto(photoSrc);
                                  soundEngine.playSparkle();
                                }}
                                className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-black/60 border border-pink-300/30 p-1.5 flex items-center justify-center group cursor-pointer hover:border-pink-300 shadow-md transition-all hover:scale-[1.02]"
                                title="Click to view full photo"
                              >
                                <img
                                  src={photoSrc}
                                  alt={`${mem.title} - photo ${pIdx + 1}`}
                                  className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                  decoding="async"
                                />
                                <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-pink-200 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                  <Eye className="w-3 h-3 text-pink-300" />
                                  <span>View</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Story Highlights with Emojis */}
                      {mem.highlights && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {mem.highlights.map((h, hIdx) => (
                            <span
                              key={hIdx}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-pink-950/40 border border-pink-300/25 text-pink-200 flex items-center gap-1.5 shadow-sm"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      )}

                      {mem.location && (
                        <div className="flex items-center gap-1.5 text-xs text-pink-300/70 pt-2 border-t border-pink-300/10">
                          <MapPin className="w-3.5 h-3.5 text-pink-400" />
                          <span>{mem.location}</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl max-h-[85vh] w-full p-2 bg-[#1A0B20] rounded-3xl border-2 border-pink-300/50 shadow-glow-babypink flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-pink-500/30 hover:bg-pink-500/50 text-white border border-white/30 transition-colors z-10 cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-full h-full max-h-[75vh] flex items-center justify-center p-2">
                <img
                  src={selectedPhoto}
                  alt="Expanded Memory"
                  className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

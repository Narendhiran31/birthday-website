import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ChevronLeft, ChevronRight, Play, Pause, 
  Maximize2, X, Heart, Eye 
} from 'lucide-react';
import { localImages } from '../localImages';
import { soundEngine } from '../utils/soundEffects';

export default function SpiralPhotoVortex({ title = "The 3D Gallery of Memories" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Curate 24 vibrant photos for the interactive 3D showcase
  const galleryImages = React.useMemo(() => {
    if (!localImages || localImages.length === 0) return [];
    const step = Math.max(1, Math.floor(localImages.length / 24));
    const list = [];
    for (let i = 0; i < localImages.length && list.length < 24; i += step) {
      list.push({
        id: i,
        src: `/images/${localImages[i]}`,
        name: `Memory #${list.length + 1}`,
      });
    }
    return list;
  }, []);

  const total = galleryImages.length;

  const nextPhoto = () => {
    soundEngine.playChime();
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevPhoto = () => {
    soundEngine.playChime();
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const jumpToPhoto = (idx) => {
    soundEngine.playChime();
    setActiveIndex(idx);
  };

  // Autoplay progression (glides neatly one by one)
  useEffect(() => {
    if (!isPlaying || total === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPlaying, total]);

  // Keyboard arrow listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total]);

  if (total === 0) return null;

  const currentPhoto = galleryImages[activeIndex];

  return (
    <section className="py-20 px-4 relative z-10 max-w-6xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold glass-pill text-pink-200 border border-pink-300/40 mb-3 shadow-glow-babypink"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>3D Cinematic Showcase</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
        >
          {title} 🌸
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-pink-100/90 text-sm sm:text-base max-w-xl mx-auto font-light mb-6"
        >
          Browse every memory one by one in 3D. Click any photo to view in high definition.
        </motion.p>

        {/* Top Controls Bar */}
        <div className="flex items-center justify-center gap-3 text-xs">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-full glass-pill hover:bg-pink-500/20 text-white font-medium flex items-center gap-2 border border-pink-300/35 transition-all cursor-pointer shadow-md"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-pink-300" /> : <Play className="w-3.5 h-3.5 text-white" />}
            <span>{isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}</span>
          </button>

          <div className="px-3.5 py-1.5 rounded-full glass-pill text-pink-200 border border-pink-300/30 font-mono">
            <span>{activeIndex + 1} / {total}</span>
          </div>
        </div>
      </div>

      {/* 3D Viewport Stage - Perfectly Spaced with Zero Overlap */}
      <div 
        className="relative w-full h-[460px] sm:h-[560px] md:h-[620px] flex items-center justify-center overflow-hidden select-none"
        style={{ perspective: '1200px' }}
      >
        {/* Soft Ambient Baby Pink Backdrop Aura */}
        <div className="absolute w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-pink-400/15 blur-3xl pointer-events-none" />

        {/* Navigation Buttons (Left & Right) */}
        <button
          onClick={prevPhoto}
          aria-label="Previous photo"
          className="absolute left-2 sm:left-6 z-40 p-3 sm:p-4 rounded-full glass-pill text-white hover:text-pink-200 border border-pink-300/40 hover:border-pink-300 bg-[#1D0C22]/85 shadow-glow-babypink cursor-pointer hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextPhoto}
          aria-label="Next photo"
          className="absolute right-2 sm:right-6 z-40 p-3 sm:p-4 rounded-full glass-pill text-white hover:text-pink-200 border border-pink-300/40 hover:border-pink-300 bg-[#1D0C22]/85 shadow-glow-babypink cursor-pointer hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* 3D Stage Container */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {galleryImages.map((img, idx) => {
            // Compute shortest circular offset from activeIndex
            let offset = idx - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Compute clean, non-overlapping 3D coordinates based on offset
            // Distinct translation so side cards never collide with the center card!
            let xOffset = 0;
            let zOffset = 0;
            let yRot = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 10;

            if (isCenter) {
              xOffset = 0;
              zOffset = 40;
              yRot = 0;
              scale = 1.02;
              opacity = 1;
              zIndex = 30;
            } else if (offset === -1) {
              xOffset = -290;
              zOffset = -140;
              yRot = 28;
              scale = 0.86;
              opacity = 0.72;
              zIndex = 20;
            } else if (offset === 1) {
              xOffset = 290;
              zOffset = -140;
              yRot = -28;
              scale = 0.86;
              opacity = 0.72;
              zIndex = 20;
            } else if (offset === -2) {
              xOffset = -490;
              zOffset = -280;
              yRot = 45;
              scale = 0.72;
              opacity = 0.35;
              zIndex = 10;
            } else if (offset === 2) {
              xOffset = 490;
              zOffset = -280;
              yRot = -45;
              scale = 0.72;
              opacity = 0.35;
              zIndex = 10;
            }

            return (
              <motion.div
                key={img.id}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  rotateY: yRot,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => {
                  if (isCenter) {
                    soundEngine.playSparkle();
                    setSelectedImage(img);
                  } else {
                    jumpToPhoto(idx);
                  }
                }}
                className={`absolute w-60 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[430px] rounded-3xl p-2.5 glass-card cursor-pointer border-2 transition-shadow duration-300 ${
                  isCenter
                    ? 'border-pink-300/80 shadow-glow-babypink bg-[#1E0D25]/95'
                    : 'border-pink-200/40 hover:border-pink-300/60 bg-[#160A1C]/80 shadow-lg'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: zIndex,
                }}
              >
                {/* Photo Frame */}
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-black/70 border border-pink-200/30 group">
                  <img
                    src={img.src}
                    alt={img.name}
                    className="w-full h-full object-cover filter brightness-105 contrast-105"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-pink-500/40 backdrop-blur-md border border-white/30 text-[11px] text-white font-medium flex items-center gap-1.5 shadow-md">
                    <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
                    <span>Priya #{idx + 1}</span>
                  </div>

                  {/* Zoom Action on Active Card */}
                  {isCenter && (
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-pink-500/60 backdrop-blur-md text-white border border-white/40 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs text-white">
                    <span className="font-serif tracking-wide drop-shadow-md text-pink-100 font-semibold truncate">
                      {isCenter ? 'Tap to Zoom Fullscreen ✨' : 'Click to bring forward'}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mini Thumbnails Selector Strip Below */}
      <div className="mt-8 flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto py-2 scrollbar-none px-4">
        {galleryImages.map((img, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={img.id}
              onClick={() => jumpToPhoto(idx)}
              className={`relative rounded-xl overflow-hidden shrink-0 transition-all duration-300 border-2 cursor-pointer ${
                isCurrent
                  ? 'w-12 h-14 sm:w-14 sm:h-16 border-pink-400 shadow-glow-babypink scale-110'
                  : 'w-8 h-10 sm:w-10 sm:h-12 border-pink-300/30 opacity-60 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img
                src={img.src}
                alt={`Thumb ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          );
        })}
      </div>

      {/* High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full glass-card p-4 sm:p-6 rounded-3xl border-2 border-pink-300/50 shadow-glow-babypink relative flex flex-col items-center bg-[#1E0D25]"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full glass-pill text-white hover:bg-pink-500/20 transition-colors cursor-pointer z-10 border border-pink-300/40"
              >
                <X className="w-5 h-5 text-pink-200" />
              </button>

              <div className="w-full max-h-[72vh] rounded-2xl overflow-hidden bg-black/70 flex items-center justify-center mb-4 border border-pink-300/30">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.name}
                  className="w-full h-full max-h-[70vh] object-contain"
                />
              </div>

              <div className="w-full flex items-center justify-between text-xs text-pink-200 pt-2 border-t border-pink-300/20">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                  <span className="font-serif font-semibold text-white text-sm">Priya Dharsini</span>
                </div>
                <span className="font-mono text-pink-300">High Definition Memory</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

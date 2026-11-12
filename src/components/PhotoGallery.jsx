import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Maximize2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export default function PhotoGallery({ gallery, title = "Moments Captured in Time" }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    soundEngine.playChime();
    setCurrentIndex(index);
    setSelectedImage(gallery[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    soundEngine.playChime();
    const nextIdx = (currentIndex + 1) % gallery.length;
    setCurrentIndex(nextIdx);
    setSelectedImage(gallery[nextIdx]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    soundEngine.playChime();
    const prevIdx = (currentIndex - 1 + gallery.length) % gallery.length;
    setCurrentIndex(prevIdx);
    setSelectedImage(gallery[prevIdx]);
  };

  return (
    <section className="py-20 px-4 relative z-10 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium glass-pill text-pink-200 border border-pink-300/40 mb-3 shadow-glow-babypink"
        >
          <Camera className="w-3.5 h-3.5 text-pink-300" />
          <span>The Visual Archive</span>
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
          className="text-pink-100/80 text-sm sm:text-base max-w-xl mx-auto font-light"
        >
          A visual journey through smiles, candid conversations, and golden memories.
        </motion.p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -5 }}
            onClick={() => openLightbox(idx)}
            className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden glass-card cursor-pointer border border-pink-200/30 hover:border-pink-300/70 shadow-lg hover:shadow-glow-babypink transition-all duration-300"
          >
            {/* Image */}
            <img
              src={item.url}
              alt={item.caption}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Floating Tag */}
            <div className="absolute top-4 left-4 z-10">
              <span className="glass-pill px-3 py-1 rounded-full text-[11px] text-pink-100 font-medium border border-pink-300/30 bg-pink-950/60">
                {item.tag}
              </span>
            </div>

            {/* Zoom Icon */}
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full glass-pill text-white border border-pink-300/30">
              <Maximize2 className="w-3.5 h-3.5 text-pink-300" />
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-0 inset-x-0 p-5 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <h4 className="text-white font-serif font-semibold text-lg mb-1 drop-shadow-md">
                {item.caption}
              </h4>
              <p className="text-xs text-pink-100/90 font-light line-clamp-2">
                {item.fullText}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-screen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full glass-pill text-white/80 hover:text-white hover:bg-white/10 z-50 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full glass-pill text-white/80 hover:text-white hover:bg-white/10 z-50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full glass-pill text-white/80 hover:text-white hover:bg-white/10 z-50 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] w-full flex flex-col md:flex-row glass-card rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            >
              {/* Image */}
              <div className="md:w-3/5 bg-black/50 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="w-full h-full max-h-[60vh] md:max-h-[80vh] object-contain"
                />
              </div>

              {/* Story Sidebar */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#1F0E25]/95 border-t md:border-t-0 md:border-l border-pink-300/25">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="glass-pill px-3 py-1 rounded-full text-xs text-pink-300 font-medium border border-pink-300/30 bg-pink-500/15">
                      {selectedImage.tag}
                    </span>
                    <span className="text-xs text-pink-300/60 font-mono">
                      {currentIndex + 1} / {gallery.length}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-4">
                    {selectedImage.caption}
                  </h3>

                  <p className="text-pink-100/90 text-sm sm:text-base font-light leading-relaxed mb-6">
                    {selectedImage.fullText}
                  </p>
                </div>

                <div className="pt-4 border-t border-pink-300/20 flex items-center gap-2 text-xs text-pink-300">
                  <Sparkles className="w-4 h-4 text-pink-300" />
                  <span>A memory that never fades</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { localImages } from '../localImages';

export default function BackgroundSpiralCards({ opacity = 0.85 }) {
  const [rotation, setRotation] = useState(0);
  const [currentBatch, setCurrentBatch] = useState(0);
  const animRef = useRef(null);

  // Pick 14 large, clear photos for the left-side spiral stream
  const bgCards = React.useMemo(() => {
    if (!localImages || localImages.length === 0) return [];
    const count = 14;
    const start = (currentBatch * count) % Math.max(1, localImages.length - count);
    return localImages.slice(start, start + count).map((img, i) => ({
      id: i,
      src: `/images/${img}`,
    }));
  }, [currentBatch]);

  // Periodic subtle transition to fresh photo batch every 20 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBatch((prev) => prev + 1);
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  // Continuous smooth 3D rotation
  useEffect(() => {
    let rot = 0;
    const step = () => {
      rot = (rot + 0.15) % 360;
      setRotation(rot);
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const total = bgCards.length;

  return (
    <div
      className="fixed left-0 sm:left-4 md:left-8 top-0 bottom-0 w-[300px] sm:w-[420px] md:w-[480px] pointer-events-none z-0 overflow-hidden flex items-center justify-center transition-opacity duration-1000"
      style={{
        perspective: '1400px',
        opacity: opacity,
      }}
    >
      {/* Soft baby pink & white ambient back-glow on the left */}
      <div className="absolute w-[400px] h-[700px] bg-gradient-to-r from-pink-400/20 via-pink-200/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(14deg) rotateY(${rotation}deg)`,
        }}
      >
        {bgCards.map((card, idx) => {
          // Large 3D Spiral Helix positioned on the left side
          const turns = 2.2;
          const theta = (idx / total) * (360 * turns);
          const rad = (theta * Math.PI) / 180;
          // Radius tailored for the left column
          const radius = 240 + (idx / total) * 80;
          const x = Math.sin(rad) * radius;
          const z = Math.cos(rad) * radius;
          const y = (idx - total / 2) * 85; // vertical spread

          return (
            <div
              key={idx}
              className="absolute w-44 h-64 sm:w-56 sm:h-80 rounded-3xl p-2 bg-[#1A0E22]/90 border-2 border-white/50 shadow-2xl shadow-pink-500/20 backdrop-blur-md transition-all duration-700 overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${theta + 90}deg)`,
                backfaceVisibility: 'visible',
              }}
            >
              {/* Photo Card with Baby Pink Glowing Accent */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/60 border border-pink-200/40">
                <img
                  src={card.src}
                  alt="Memory"
                  className="w-full h-full object-cover rounded-xl filter brightness-105 contrast-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Glossy highlight layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-white/10 pointer-events-none" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-pink-500/40 backdrop-blur-md text-[10px] text-white font-medium border border-white/20">
                  ✨ Priya
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

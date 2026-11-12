import React, { useEffect, useState, useRef } from 'react';

export default function FloatingHeartsAndPetals() {
  const [clickBursts, setClickBursts] = useState([]);
  const burstIdRef = useRef(0);

  // Click/tap listener to spawn flying hearts wherever the user clicks
  useEffect(() => {
    const handleClick = (e) => {
      // Don't trigger on interactive inputs
      if (['INPUT', 'BUTTON', 'TEXTAREA'].includes(e.target.tagName)) return;

      const newBurst = {
        id: burstIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        hearts: Array.from({ length: 6 }).map((_, i) => ({
          dx: (Math.random() - 0.5) * 120,
          dy: -Math.random() * 90 - 40,
          scale: Math.random() * 0.7 + 0.6,
          rotate: Math.random() * 60 - 30,
          emoji: ['💖', '💕', '🌸', '✨', '🤍', '💗'][Math.floor(Math.random() * 6)],
        })),
      };

      setClickBursts((prev) => [...prev.slice(-8), newBurst]);

      setTimeout(() => {
        setClickBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
      }, 1400);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Predefined steady stream of floating hearts and petals (optimized for 60fps)
  const floatingItems = React.useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${(i * 8.2 + 3) % 94}%`,
      size: Math.floor(Math.random() * 14) + 14, // 14px to 28px
      duration: Math.random() * 8 + 14, // 14s to 22s float time
      delay: Math.random() * 10,
      symbol: ['💖', '💕', '🌸', '🤍', '💗', '✨', '🌷'][i % 7],
      swayDuration: Math.random() * 3 + 3,
      opacity: Math.random() * 0.35 + 0.45,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden transform-gpu">
      {/* 1. Continuous Floating Flying Hearts Stream */}
      {floatingItems.map((item) => (
        <div
          key={item.id}
          className="absolute bottom-[-10%] will-change-transform"
          style={{
            left: item.left,
            animation: `floatUp ${item.duration}s linear infinite`,
            animationDelay: `${item.delay}s`,
            opacity: item.opacity,
          }}
        >
          <div
            style={{
              fontSize: `${item.size}px`,
              animation: `swayHeart ${item.swayDuration}s ease-in-out infinite alternate`,
            }}
          >
            {item.symbol}
          </div>
        </div>
      ))}

      {/* 2. Interactive Click/Tap Hearts Explosion */}
      {clickBursts.map((burst) => (
        <div
          key={burst.id}
          className="fixed pointer-events-none"
          style={{ left: burst.x, top: burst.y }}
        >
          {burst.hearts.map((h, idx) => (
            <span
              key={idx}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ease-out"
              style={{
                fontSize: `${18 * h.scale}px`,
                animation: 'burstFade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                transform: `translate(${h.dx}px, ${h.dy}px) rotate(${h.rotate}deg)`,
              }}
            >
              {h.emoji}
            </span>
          ))}
        </div>
      ))}

      {/* CSS Animations */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-115vh) scale(1.15) rotate(25deg);
            opacity: 0;
          }
        }

        @keyframes swayHeart {
          0% {
            transform: translateX(-18px) rotate(-10deg);
          }
          100% {
            transform: translateX(18px) rotate(10deg);
          }
        }

        @keyframes burstFade {
          0% {
            opacity: 1;
            transform: scale(0.4) translate(0, 0);
          }
          50% {
            opacity: 1;
            transform: scale(1.3) translate(var(--tw-translate-x, 0), var(--tw-translate-y, 0));
          }
          100% {
            opacity: 0;
            transform: scale(1.6) translate(var(--tw-translate-x, 0), -60px);
          }
        }
      `}</style>
    </div>
  );
}

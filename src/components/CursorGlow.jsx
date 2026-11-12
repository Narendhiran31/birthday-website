import React, { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop/mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const el = glowRef.current;
    if (!el) return;

    let rafId;
    let targetX = -200;
    let targetY = -200;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (el) {
            el.style.opacity = '1';
            el.style.transform = `translate3d(${targetX - 160}px, ${targetY - 160}px, 0)`;
          }
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      if (el) el.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none z-50 w-[320px] h-[320px] rounded-full blur-[70px] opacity-0 transition-opacity duration-300 will-change-transform"
      style={{
        background: 'radial-gradient(circle, rgba(244,114,182,0.18) 0%, rgba(251,207,232,0.10) 50%, transparent 80%)',
      }}
    />
  );
}

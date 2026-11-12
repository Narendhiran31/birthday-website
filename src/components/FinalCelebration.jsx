import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, RotateCcw, Image, Sparkles, Camera, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';

export default function FinalCelebration({ name, onReplay, onViewMemories }) {
  const canvasRef = useRef(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    // Trigger celebration fanfare and flash
    soundEngine.playFanfare();
    soundEngine.setMood('celebration');

    // Camera flash effect
    setFlash(true);
    const flashTimer = setTimeout(() => setFlash(false), 300);

    // Initial confetti burst
    const duration = 4.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F472B6', '#FBCFE8', '#FFFFFF', '#FB7185', '#FFF0F5']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F472B6', '#FBCFE8', '#FFFFFF', '#FB7185', '#FFF0F5']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Canvas Fireworks Simulation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    class FireworkParticle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // gravity
        this.alpha -= this.decay;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    let particles = [];
    const colors = ['#F472B6', '#FBCFE8', '#FFFFFF', '#FB7185', '#FFF0F5', '#F43F5E'];

    const spawnFirework = () => {
      const x = Math.random() * (width * 0.8) + width * 0.1;
      const y = Math.random() * (height * 0.5) + height * 0.1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 40; i++) {
        particles.push(new FireworkParticle(x, y, color));
      }
    };

    let lastSpawn = Date.now();
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (Date.now() - lastSpawn > 800) {
        spawnFirework();
        lastSpawn = Date.now();
      }

      particles.forEach((p, idx) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(idx, 1);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearTimeout(flashTimer);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const triggerCameraFlash = () => {
    soundEngine.playSparkle();
    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#F472B6', '#FBCFE8', '#FFFFFF', '#FB7185']
    });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 text-center z-10 overflow-hidden">
      {/* Camera Flash Overlay */}
      {flash && (
        <div className="fixed inset-0 z-50 bg-white pointer-events-none transition-opacity duration-300 opacity-90" />
      )}

      {/* Fireworks Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-0" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Celebration Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold glass-pill text-pink-200 border border-pink-300/40 mb-8 shadow-glow-babypink"
        >
          <PartyPopper className="w-4 h-4 text-pink-300" />
          <span>The Grand Finale</span>
        </motion.div>

        {/* Big Birthday Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
        >
          Happy Birthday, <br />
          <span className="gradient-babypink font-serif text-glow-babypink">
            {name}
          </span> 🎂
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-pink-100/90 text-base sm:text-xl font-light max-w-xl mb-12 leading-relaxed"
        >
          May your days ahead be filled with laughter, adventures that leave you breathless, and memories worth holding onto forever.
        </motion.p>

        {/* Interactive Flash Button */}
        <button
          onClick={triggerCameraFlash}
          className="mb-10 px-5 py-2.5 rounded-full glass-pill hover:bg-pink-500/20 text-xs sm:text-sm font-medium text-pink-200 hover:text-white border border-pink-300/40 flex items-center gap-2 transition-all cursor-pointer shadow-glow-babypink hover:scale-105"
        >
          <Camera className="w-4 h-4 text-pink-300" />
          <span>Snap A Memory Flash 📸</span>
        </button>

        {/* Replay and View Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onReplay}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-white font-medium text-sm sm:text-base bg-gradient-to-r from-pink-500 via-pink-400 to-rose-400 hover:from-pink-600 hover:to-rose-500 shadow-glow-babypink flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 border border-white/40"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Experience</span>
          </button>

          <button
            onClick={onViewMemories}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-pink-100 font-medium text-sm sm:text-base glass-card hover:bg-pink-500/15 border border-pink-300/30 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
          >
            <Image className="w-4 h-4 text-pink-300" />
            <span>View Memories Again</span>
          </button>
        </div>

        {/* Closing credit watermark */}
        <div className="mt-16 text-xs text-pink-300/60 flex items-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          <span>exclusively for {name}</span>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Sparkles } from 'lucide-react';

export default function ChapterProgress({ chapters, activeChapterId }) {
  return (
    <div className="sticky top-4 z-40 max-w-2xl mx-auto px-4 mb-10">
      <div className="glass-card px-4 py-2 rounded-full border border-pink-300/35 flex items-center justify-between gap-2 shadow-2xl backdrop-blur-xl bg-[#1E0E24]/90 shadow-pink-500/10">
        <div className="flex items-center gap-2 text-xs font-semibold text-white pl-2">
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span className="hidden sm:inline">Story Chapters:</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto py-1 scrollbar-none">
          {chapters.map((chap) => {
            const isUnlocked = chap.id <= activeChapterId;
            const isCurrent = chap.id === activeChapterId;

            return (
              <div
                key={chap.id}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs transition-all duration-300 whitespace-nowrap ${
                  isCurrent
                    ? 'bg-pink-500/30 text-white border border-pink-300 font-bold shadow-sm'
                    : isUnlocked
                    ? 'bg-white/10 text-pink-100 border border-white/10'
                    : 'bg-black/30 text-gray-500 opacity-60'
                }`}
              >
                {isUnlocked ? (
                  <Unlock className="w-3 h-3 text-pink-300" />
                ) : (
                  <Lock className="w-3 h-3 text-gray-500" />
                )}
                <span className="font-medium">Ch. 0{chap.id}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

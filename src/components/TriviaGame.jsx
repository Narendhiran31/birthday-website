import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';

export default function TriviaGame({ questions }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [completed, setCompleted] = useState(false);

  const handleSelectOption = (idx) => {
    soundEngine.playChime();
    setSelectedOption(idx);

    setTimeout(() => {
      if (currentQIndex + 1 < questions.length) {
        setCurrentQIndex(currentQIndex + 1);
        setSelectedOption(null);
      } else {
        setCompleted(true);
        soundEngine.playFanfare();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F472B6', '#FBCFE8', '#FFFFFF', '#FB7185', '#FFF0F5']
        });
      }
    }, 900);
  };

  const restartQuiz = () => {
    soundEngine.playChime();
    setCurrentQIndex(0);
    setSelectedOption(null);
    setCompleted(false);
  };

  const currentQ = questions[currentQIndex];

  return (
    <section className="py-20 px-4 relative z-10 max-w-4xl mx-auto">
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-pink-300/35 shadow-2xl relative overflow-hidden bg-[#1C0B22]/90 shadow-glow-babypink">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium glass-pill text-pink-200 border border-pink-300/40 mb-3 shadow-glow-babypink">
            <HelpCircle className="w-3.5 h-3.5 text-pink-300" />
            <span>Interactive Mini-Game</span>
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-2">
            How Well Do You Know Yourself? 🫶
          </h3>
          <p className="text-xs sm:text-sm text-pink-100/80 font-light">
            Answer honestly to calibrate your birthday character stats!
          </p>
        </div>

        {!completed ? (
          <div>
            {/* Progress Bar in Baby Pink */}
            <div className="w-full bg-pink-950/60 h-2 rounded-full overflow-hidden mb-8 border border-pink-300/20">
              <div
                className="bg-gradient-to-r from-pink-500 via-pink-400 to-pink-200 h-full transition-all duration-300 shadow-sm"
                style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="mb-6 text-center">
              <span className="text-xs font-mono text-pink-300 uppercase tracking-widest block mb-2 font-semibold">
                Question {currentQIndex + 1} of {questions.length}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-semibold text-white">
                {currentQ.question}
              </h4>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all duration-200 border cursor-pointer ${
                      isSelected
                        ? 'bg-pink-500/25 text-white border-pink-300 shadow-glow-babypink scale-102 font-semibold'
                        : 'bg-pink-950/30 hover:bg-pink-900/40 text-pink-100 border-pink-300/20 hover:border-pink-300/40'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <p className="text-center text-xs text-pink-200 animate-fade-in font-medium">
                {currentQ.commentary}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-pink-500/20 text-pink-300 border border-pink-300/40 flex items-center justify-center mx-auto mb-4 shadow-glow-babypink">
              <Award className="w-8 h-8" />
            </div>

            <h4 className="font-serif text-2xl font-bold text-white mb-2">
              Character Analysis Complete: 100% Certified Legend 👑
            </h4>
            <p className="text-sm text-pink-100 font-light max-w-md mx-auto mb-6 leading-relaxed">
              Result: High charisma, unstoppable resilience, top-tier humor, and a heart of gold.
              The perfect combination for another incredible year!
            </p>

            <button
              onClick={restartQuiz}
              className="px-6 py-2.5 rounded-full glass-pill hover:bg-pink-500/20 text-xs font-semibold text-pink-200 hover:text-white transition-colors cursor-pointer border border-pink-300/30"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

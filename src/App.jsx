import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import FloatingHeartsAndPetals from './components/FloatingHeartsAndPetals';
import CursorGlow from './components/CursorGlow';
import MusicPlayer from './components/MusicPlayer';
import WelcomeScreen from './components/WelcomeScreen';
import BirthdayHero from './components/BirthdayHero';
import Countdown from './components/Countdown';
import ChapterProgress from './components/ChapterProgress';
import MemoryTimeline from './components/MemoryTimeline';
import AppreciationCards from './components/AppreciationCards';
import PhotoGallery from './components/PhotoGallery';
import HiddenMessages from './components/HiddenMessages';
import GiftBoxes from './components/GiftBoxes';
import OpenWhenLetters from './components/OpenWhenLetters';
import Constellation from './components/Constellation';
import FutureCapsule from './components/FutureCapsule';
import TriviaGame from './components/TriviaGame';
import BirthdayCake from './components/BirthdayCake';
import WishGenerator from './components/WishGenerator';
import BirthdayLetter from './components/BirthdayLetter';
import MovieCredits from './components/MovieCredits';
import FinalCelebration from './components/FinalCelebration';

import { birthdayData } from './birthdayData';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState(1);
  const [currentMood, setCurrentMood] = useState('calm');

  // Track scroll position to update active chapter and music mood dynamically (debounced to avoid re-renders)
  useEffect(() => {
    if (!hasEntered) return;

    let currentChapter = 1;
    let mood = 'calm';

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      const docHeight = document.documentElement.scrollHeight || 1;
      const progress = scrollPos / docHeight;

      let nextChapter = 1;
      let nextMood = 'calm';

      if (progress < 0.22) {
        nextChapter = 1;
        nextMood = 'calm';
      } else if (progress < 0.45) {
        nextChapter = 2;
        nextMood = 'nostalgic';
      } else if (progress < 0.68) {
        nextChapter = 3;
        nextMood = 'nostalgic';
      } else if (progress < 0.86) {
        nextChapter = 4;
        nextMood = 'celebration';
      } else {
        nextChapter = 5;
        nextMood = 'emotional';
      }

      if (nextChapter !== currentChapter) {
        currentChapter = nextChapter;
        setActiveChapterId(nextChapter);
      }
      if (nextMood !== mood) {
        mood = nextMood;
        setCurrentMood(nextMood);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  const scrollToJourney = () => {
    const journeyEl = document.getElementById('journey');
    if (journeyEl) {
      journeyEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHasEntered(false);
  };

  const handleViewMemories = () => {
    scrollToJourney();
  };

  return (
    <div className="relative min-h-screen bg-background text-pink-50 overflow-x-hidden selection:bg-pink-300 selection:text-black">
      {/* 1. Background Particles & Ambient Lighting in Baby Pink & White */}
      <ParticleBackground />

      {/* Desktop Cursor Glow Follower */}
      <CursorGlow />

      {/* Welcome Screen Modal / Gate */}
      {!hasEntered ? (
        <WelcomeScreen
          name={birthdayData.name}
          birthdayDate={birthdayData.birthdayDate}
          unlockPasscode={birthdayData.unlockPasscode}
          onEnter={() => setHasEntered(true)}
        />
      ) : (
        <>
          {/* 2. Flying Hearts, Petals & Sparkles Animation Layer */}
          <FloatingHeartsAndPetals />

          {/* Floating Soundscape & Music Player */}
          <MusicPlayer />

          {/* Main Content Layout - perfectly centered and responsive on all screen sizes */}
          <main className="relative z-10 space-y-16 sm:space-y-24 px-4 sm:px-6 max-w-5xl mx-auto py-10 transition-all duration-500">
            {/* 1. Countdown / Birthday Reveal */}
            <Countdown
              birthdayDate={birthdayData.birthdayDate}
              name={birthdayData.name}
            />

            {/* 2. Hero Birthday Section with Priya Dharsini's Profile */}
            <BirthdayHero
              name={birthdayData.name}
              subtitle={birthdayData.subtitle}
              heroImage={birthdayData.heroImage}
              onScrollToJourney={scrollToJourney}
            />

            {/* Sticky Story Chapter Progress Tracker */}
            <ChapterProgress
              chapters={birthdayData.chapters}
              activeChapterId={activeChapterId}
            />

            {/* 3. Interactive Memory Timeline (Chapter 01) */}
            <MemoryTimeline
              memories={birthdayData.memories}
            />

            {/* 4. "Things I Appreciate About You" Section (Chapter 02) */}
            <AppreciationCards
              appreciationMessages={birthdayData.appreciationMessages}
            />

            {/* 6. Photo Memory Gallery */}
            <PhotoGallery
              gallery={birthdayData.gallery}
            />

            {/* 7. Hidden Messages / Vault Flip Cards (Chapter 03) */}
            <HiddenMessages
              hiddenMessages={birthdayData.hiddenMessages}
            />

            {/* 8. Innovation: Digital Birthday Gift Boxes */}
            <GiftBoxes
              giftBoxes={birthdayData.giftBoxes}
            />

            {/* 9. Innovation: "Open When..." Sealed Letters */}
            <OpenWhenLetters
              letters={birthdayData.openWhenLetters}
            />

            {/* 10. Innovation: Interactive Constellation Star Map */}
            <Constellation
              constellation={birthdayData.constellation}
            />

            {/* 11. Innovation: Temporal Time Capsule (Message from 2030) */}
            <FutureCapsule
              futureCapsule={birthdayData.futureCapsule}
            />

            {/* 12. Innovation: "How Well Do You Know Yourself?" Mini-Quiz */}
            <TriviaGame
              questions={birthdayData.triviaQuestions}
            />

            {/* 13. Birthday Cake Interaction (Chapter 04) */}
            <BirthdayCake />

            {/* 14. Birthday Wish Generator */}
            <WishGenerator
              wishes={birthdayData.wishes}
            />

            {/* 15. Final Letter (Chapter 05) */}
            <BirthdayLetter
              letter={birthdayData.finalLetter}
              name={birthdayData.name}
            />

            {/* 16. Innovation: Movie-Style Ending Credits */}
            <MovieCredits
              credits={birthdayData.credits}
              name={birthdayData.name}
            />

            {/* 17. Final Celebration & Fireworks */}
            <FinalCelebration
              name={birthdayData.name}
              onReplay={handleReplay}
              onViewMemories={handleViewMemories}
            />
          </main>
        </>
      )}
    </div>
  );
}

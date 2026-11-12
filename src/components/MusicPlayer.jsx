import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sliders, Disc3 } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [showControls, setShowControls] = useState(false);

  // Auto-check status
  useEffect(() => {
    // If sound engine already playing, sync state
    setIsPlaying(soundEngine.isPlayingMusic);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      soundEngine.pauseBGM();
      setIsPlaying(false);
    } else {
      soundEngine.playBGM();
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-2">
        {/* Expanded Controls Panel */}
        {showControls && (
          <div className="glass-card p-4 rounded-2xl flex flex-col gap-3 shadow-2xl border-2 border-white/30 animate-fade-in text-xs w-68 backdrop-blur-xl bg-[#1A0C22]/95 shadow-glow-babypink">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-pink-300" />
                Background Track
              </span>
              <span className="text-[10px] uppercase tracking-wider text-pink-300 font-mono font-bold bg-pink-500/20 px-2 py-0.5 rounded-full border border-pink-300/30">
                ACTIVE
              </span>
            </div>

            {/* Now Playing Track Info */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 border border-white/10">
              <Disc3 className={`w-5 h-5 text-pink-300 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              <div className="truncate">
                <p className="text-white font-medium text-[11px] truncate">
                  Happy Birthday Score
                </p>
                <p className="text-[10px] text-pink-200">
                  Custom Birthday Audio
                </p>
              </div>
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/15">
              <button
                onClick={handleMuteToggle}
                className="text-pink-200 hover:text-white transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-pink-400" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full accent-pink-400 h-1.5 bg-white/20 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] font-mono text-pink-200 w-7 text-right">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Mini Floating Button in Baby Pink & White */}
        <div className="flex items-center glass-pill rounded-full p-1.5 pl-3.5 shadow-xl backdrop-blur-xl border-2 border-white/40 hover:border-pink-300 transition-all duration-300 bg-[#1A0B22]/90 shadow-pink-500/20">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2.5 text-xs font-semibold text-white hover:text-pink-200 transition-colors pr-2 cursor-pointer"
          >
            {isPlaying ? (
              <>
                <span className="flex items-end gap-0.5 h-3.5">
                  <span className="w-1 h-3.5 bg-pink-400 animate-pulse" />
                  <span className="w-1 h-2 bg-white animate-pulse delay-75" />
                  <span className="w-1 h-4 bg-pink-300 animate-pulse delay-150" />
                  <span className="w-1 h-2.5 bg-pink-500 animate-pulse delay-100" />
                </span>
                <span className="hidden sm:inline">Playing Music</span>
                <Pause className="w-3.5 h-3.5 text-white" />
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5 text-pink-300" />
                <span className="hidden sm:inline">Play Music</span>
                <Play className="w-3.5 h-3.5 text-white" />
              </>
            )}
          </button>

          <button
            onClick={() => setShowControls(!showControls)}
            className="p-1.5 rounded-full hover:bg-white/15 text-white hover:text-pink-200 transition-colors cursor-pointer border-l border-white/15 pl-2"
            title="Music Settings"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

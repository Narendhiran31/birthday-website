/**
 * Web Audio API Sound Generator & Background Music Player
 * Plays the user's added background music file (/bgm.mp3) with loop and controls,
 * plus synthesizes magic chimes, candle puffs, and celebration fanfare!
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.6;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.currentMood = 'calm';
    this.masterGain = null;

    // HTML5 Background Audio Player for user's music file
    this.bgAudio = null;
    this.initAudioPlayer();
  }

  initAudioPlayer() {
    try {
      this.bgAudio = new Audio('/bgm.mp3');
      this.bgAudio.loop = true;
      this.bgAudio.volume = this.volume;
      this.bgAudio.preload = 'auto';

      this.bgAudio.addEventListener('error', (e) => {
        console.warn('Custom audio playback error, falling back to ambient synth:', e);
      });
    } catch (err) {
      console.warn('Audio element init error:', err);
    }
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.bgAudio) {
      this.bgAudio.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgAudio) {
      this.bgAudio.muted = this.isMuted;
      this.bgAudio.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Play the user's background music
  playBGM() {
    this.init();
    this.isPlayingMusic = true;
    if (this.bgAudio) {
      this.bgAudio.volume = this.isMuted ? 0 : this.volume;
      this.bgAudio.play().catch((err) => {
        console.warn('Autoplay prevented or failed:', err);
        // Fallback to ambient synth
        this.startAmbientMusic('celebration');
      });
    } else {
      this.startAmbientMusic('celebration');
    }
  }

  pauseBGM() {
    this.isPlayingMusic = false;
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    this.stopAmbientMusic();
  }

  // Play a gentle musical note
  playTone(freq, type = 'sine', duration = 1.2, delay = 0, gainVal = 0.15) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainVal * this.volume, startTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // Chime sound effect
  playChime() {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 1.0, idx * 0.08, 0.12);
    });
  }

  // Sparkle magical sound
  playSparkle() {
    const notes = [659.25, 783.99, 987.77, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.8, idx * 0.06, 0.08);
    });
  }

  // Soft whoosh (blowing out candle)
  playBlowOut() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.7);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25 * this.volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
    whiteNoise.stop(this.ctx.currentTime + 0.8);
  }

  // Celebration fanfare / chords
  playFanfare() {
    const chord = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
    chord.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 2.0, idx * 0.1, 0.15);
    });
  }

  // Ambient synthesizer fallback
  startAmbientMusic(mood = 'calm') {
    this.currentMood = mood;
    this.init();

    if (this.musicTimer) clearInterval(this.musicTimer);

    const scales = {
      calm: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25],
      nostalgic: [220.00, 261.63, 293.66, 329.63, 392.00, 440.00],
      celebration: [293.66, 369.99, 440.00, 587.33, 659.25, 739.99],
      emotional: [174.61, 220.00, 261.63, 329.63, 349.23, 440.00]
    };

    let step = 0;
    this.musicTimer = setInterval(() => {
      if (!this.isPlayingMusic || this.isMuted) return;

      const currentScale = scales[this.currentMood] || scales.calm;
      const note = currentScale[step % currentScale.length];
      const octNote = currentScale[(step + 2) % currentScale.length] * 2;

      this.playTone(note, 'sine', 3.5, 0, 0.07);
      if (step % 2 === 0) {
        this.playTone(octNote, 'triangle', 2.5, 0.4, 0.04);
      }
      step++;
    }, 1800);
  }

  stopAmbientMusic() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  setMood(mood) {
    this.currentMood = mood;
  }
}

export const soundEngine = new SoundEngine();

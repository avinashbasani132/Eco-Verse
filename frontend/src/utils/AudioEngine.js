// frontend/src/utils/AudioEngine.js
class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.oscillators = [];
    this.gainNode = null;
    this.isPlaying = false;
  }

  init() {
    if (this.audioContext) return;
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  playDarkAmbient() {
    if (!this.audioContext) this.init();
    if (this.isPlaying || !this.audioContext) return;
    
    // Check if context is suspended (browser autoplay policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    this.isPlaying = true;
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);

    // Fade in
    this.gainNode.gain.linearRampToValueAtTime(0.08, this.audioContext.currentTime + 5);

    // Create a deep, dark drone using multiple oscillators
    const frequencies = [43.65, 65.41, 87.31]; // F1, C2, F2 (Dark, brooding chord)
    
    frequencies.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const panNode = this.audioContext.createStereoPanner ? this.audioContext.createStereoPanner() : this.audioContext.createGain();
      
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freq;
      
      // Auto-pan slowly
      if (panNode.pan) {
        panNode.pan.setValueAtTime(i % 2 === 0 ? -0.5 : 0.5, this.audioContext.currentTime);
      }
      
      // LFO for subtle pitch modulation (creates a wavering "glitchy/mystical" effect)
      const lfo = this.audioContext.createOscillator();
      const lfoGain = this.audioContext.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 0.1 + (i * 0.05); // Very slow
      lfoGain.gain.value = 1.0; 
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(panNode);
      panNode.connect(this.gainNode);
      osc.start();

      this.oscillators.push({ osc, lfo, lfoGain });
    });
  }

  stop() {
    if (!this.isPlaying || !this.gainNode) return;
    this.isPlaying = false;
    
    // Fade out
    this.gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 2);
    
    setTimeout(() => {
      this.oscillators.forEach(({ osc, lfo }) => {
        osc.stop();
        osc.disconnect();
        lfo.stop();
        lfo.disconnect();
      });
      this.oscillators = [];
      if (this.gainNode) this.gainNode.disconnect();
    }, 2000);
  }
}

const engine = new AudioEngine();
export default engine;

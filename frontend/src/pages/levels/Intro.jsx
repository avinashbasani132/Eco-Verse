// frontend/src/pages/levels/Intro.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';
import API_BASE_URL from '../../config/api';

export default function Intro() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/levels/intro`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Failed to load intro prologue:", err);
        // Fallback default intro data if backend is offline
        setData({
          title: "Prologue: The Fall of Asterveil",
          scenes: [
            { speaker: "Royal Sorcerer", text: "The Demon King Vharzul has broken the realm. Our only hope is the ancient summoning ritual..." },
            { speaker: "Royal Sorcerer", text: "You must awaken, Hero! The kingdom of Asterveil commands you!" }
          ]
        });
      });
      
    AudioEngine.playDarkAmbient();
    return () => AudioEngine.stop();
  }, []);

  if (!data) return <div className="text-white flex justify-center items-center h-screen font-mono">Loading Prologue...</div>;

  const handleNext = () => {
    AudioEngine.playDarkAmbient();
    if (sceneIndex < data.scenes.length - 1) {
      setSceneIndex(s => s + 1);
    } else {
      const current = parseInt(localStorage.getItem('ecoVerseUnlocked') || '1', 10);
      localStorage.setItem('ecoVerseUnlocked', Math.max(current, 1));
      navigate('/map');
    }
  };

  const scene = data.scenes[sceneIndex] || data.scenes[0];
  
  const getSceneImage = () => {
    switch (sceneIndex) {
      case 0: return '/images/prologue_fall_1774588314457.png';
      case 1: return '/images/prologue_2_1774589568898.png';
      case 2: return '/images/prologue_3_1774589596673.png';
      default: return '/images/level1_intro_1774589620194.png';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-end overflow-hidden">
      {/* Background Image layer */}
      <AnimatePresence mode="crossfade">
        <motion.img
           key={sceneIndex}
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1.5 }}
           src={getSceneImage()}
           alt="Prologue Scene"
           className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Top Navigation */}
      <div className="absolute top-6 left-6 z-50">
        <button onClick={() => navigate('/map')} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 uppercase font-mono tracking-widest text-xs cursor-pointer">
          <ArrowLeft size={16} /> Hub
        </button>
      </div>

      {/* Cinematic Dialogue Area */}
      <div className="relative z-40 w-full max-w-5xl px-6 pb-12 cursor-pointer" onClick={handleNext}>
        <StoryDialogue 
          speaker={scene.speaker} 
          text={scene.text} 
        />
        
        <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">
            {sceneIndex < data.scenes.length - 1 ? 'CLICK ANYWHERE TO CONTINUE' : 'CLICK ANYWHERE TO AWAKEN'}
        </p>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';

export default function Intro() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/levels/intro')
      .then(res => setData(res.data))
      .catch(console.error);
      
    AudioEngine.playDarkAmbient();
    return () => AudioEngine.stop();
  }, []);

  if (!data) return <div className="text-white flex justify-center items-center h-screen font-mono">Loading Prologue...</div>;

  const handleNext = () => {
    AudioEngine.playDarkAmbient(); // ensure it plays if blocked initially
    if (sceneIndex < data.scenes.length - 1) {
      setSceneIndex(s => s + 1);
    } else {
      navigate('/map');
    }
  };

  const scene = data.scenes[sceneIndex];
  
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
      {/* Background Image layer mapping to scenes */}
      <AnimatePresence mode="crossfade">
        <motion.img
           key={sceneIndex}
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 2 }}
           src={getSceneImage()}
           alt="Prologue Scene"
           className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Top Bar for Navigation */}
      <div className="absolute top-6 left-6 z-50">
        <button onClick={() => navigate('/story/map')} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 uppercase font-mono tracking-widest text-xs">
          <ArrowLeft size={16} /> Hub
        </button>
      </div>

      {/* Cinematic Dialogue Area */}
      <div className="relative z-40 w-full max-w-5xl px-6 pb-12 cursor-pointer" onClick={handleNext}>
        <StoryDialogue 
          speaker={scene.speaker} 
          text={scene.text} 
          // Do not pass onComplete to wait for click to advance
        />
        
        <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse">
            {sceneIndex < data.scenes.length - 1 ? 'CLICK ANYWHERE TO CONTINUE' : 'CLICK ANYWHERE TO AWAKEN'}
        </p>
      </div>
    </div>
  );
}

// frontend/src/pages/levels/Level6.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { UserPlus, Hammer, ArrowLeft } from 'lucide-react';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';
import API_BASE_URL from '../../config/api';

export default function Level6() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [phase, setPhase] = useState('intro');
  const [taskIndex, setTaskIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [hasInstance, setHasInstance] = useState(false);
  const [methodCalled, setMethodCalled] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/levels/6`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Failed to load Level 6:", err);
        setData({
          title: "The Guild of Living Armor",
          intro_text: "At the warrior guild, companions and tools are not just raw numbers; they are living systems with properties and behaviors. Here, you learn Object-Oriented creation.",
          scenes: [
            { speaker: "Guildmaster", text: "Everything is a blueprint. Create a Hero class to ascend to True Commander status." }
          ]
        });
      });
    AudioEngine.playDarkAmbient();
    return () => AudioEngine.stop();
  }, []);

  if (!data) return <div className="text-white text-center mt-20 font-mono">Loading Guild...</div>;

  const handleLogic = (isCorrect, msg, advanceDelay = 1500) => {
    setFeedback({ isCorrect, msg });
    if (isCorrect) {
      setTimeout(() => {
        setFeedback(null);
        if (taskIndex === 2) {
          const current = parseInt(localStorage.getItem('ecoVerseUnlocked') || '1', 10);
          localStorage.setItem('ecoVerseUnlocked', Math.max(current, 7));
        }
        setTaskIndex(t => t + 1);
      }, advanceDelay);
    } else {
      setTimeout(() => { setFeedback(null); }, 2000);
    }
  };

  const renderTask = () => {
    switch(taskIndex) {
      case 0:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-amber-500 font-bold flex items-center gap-2"><Hammer/> Task 1: The Blueprint</h3>
            <p className="text-gray-300">What is a `Class` in object-oriented programming?</p>
            <div className="flex flex-col gap-4">
               {['A blueprint for creating objects with attributes and methods', 'An error handling subroutine', 'A variable type that can only hold integers'].map(opt => (
                 <button key={opt} onClick={() => handleLogic(opt.includes('blueprint'), opt.includes('blueprint') ? 'Yes. You are the architect forging blueprints.' : 'Incorrect definition.')} className="p-4 rounded border border-amber-600/30 hover:bg-amber-900/40 text-left font-bold text-white cursor-pointer">{opt}</button>
               ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-amber-500 font-bold flex items-center gap-2"><UserPlus/> Task 2: Instantiation</h3>
            <p className="text-gray-300">When you create an actual concrete hero from the `Hero` blueprint class, what is that called?</p>
            <div className="flex gap-4">
              {['Method', 'Instance (Object)', 'Parameter'].map(opt => (
                 <button key={opt} onClick={() => {
                   if(opt.includes('Instance')) { setHasInstance(true); handleLogic(true, "An Instance is forged in memory!"); }
                   else handleLogic(false, 'Incorrect terminology.');
                 }} className={`flex-1 py-4 border rounded font-bold uppercase tracking-widest text-white cursor-pointer ${hasInstance && opt.includes('Instance') ? 'bg-amber-600' : 'border-amber-600/50 hover:bg-white/10'}`}>{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-amber-500 font-bold">Task 3: Calling Class Methods</h3>
            <pre className="p-4 bg-black rounded text-amber-300 font-mono text-sm">
{`class Hero:
    def __init__(self, name):
        self.name = name

    def activate_shield(self):
        return f"{self.name} raised Aegis Barrier!"

player = Hero("ArchiveRunner")`}
            </pre>
            <p className="text-gray-300">How do you invoke the `activate_shield` method on `player`?</p>
            <div className="flex gap-4">
              {['player.activate_shield()', 'Hero.activate_shield(player)', 'player->activate_shield', 'activate_shield(player)'].map(opt => (
                <button key={opt} onClick={() => {
                  if (opt === 'player.activate_shield()') {
                    setMethodCalled(true);
                    handleLogic(true, "Method invoked on player instance! Aegis Barrier online.");
                  } else {
                    handleLogic(false, "Syntax error for calling instance methods.");
                  }
                }} className="flex-1 p-4 border border-amber-500/50 rounded hover:bg-amber-900/40 text-white font-mono cursor-pointer">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="end" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mb-10 w-full cursor-pointer" onClick={() => navigate('/map')}>
            <StoryDialogue speaker="SYSTEM" text="You have synthesized Object-Oriented Mastery! The Final Boss Sector (Demon King Vharzul) is now unlocked." />
            <p className="text-center text-amber-500 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO RETURN TO MAP</p>
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-end overflow-hidden">
      <AnimatePresence mode="crossfade">
        <motion.img
           key={phase}
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: phase === 'tasks' ? 0.2 : 0.6, scale: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1 }}
           src="/images/boss_intro_1774588338360.png"
           className="absolute inset-0 w-full h-full object-cover object-center hue-rotate-45 brightness-75 contrast-125"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

      {/* Top Navigation */}
      <div className="absolute top-6 left-6 z-50">
        <button onClick={() => navigate('/map')} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 uppercase font-mono tracking-widest text-xs cursor-pointer">
          <ArrowLeft size={16} /> Hub
        </button>
      </div>

      <div className="relative z-40 w-full max-w-5xl px-6 pb-12">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div key="intro" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('scene')} className="cursor-pointer">
              <h1 className="text-4xl text-amber-500 font-black mb-4 drop-shadow-md px-6">{data.title}</h1>
              <StoryDialogue speaker="NARRATOR" text={data.intro_text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO ENTER GUILD GROUNDS</p>
            </motion.div>
          )}

          {phase === 'scene' && (
            <motion.div key="scene" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('tasks')} className="cursor-pointer">
              <StoryDialogue speaker={data.scenes[0].speaker} text={data.scenes[0].text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">BEGIN BLUEPRINT FORGING</p>
            </motion.div>
          )}

          {phase === 'tasks' && (
            <motion.div key="tasks" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.15)] mb-10 w-full">
              {renderTask()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

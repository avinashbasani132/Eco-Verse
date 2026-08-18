// frontend/src/pages/levels/Level5.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Library, Zap, ArrowLeft } from 'lucide-react';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';
import API_BASE_URL from '../../config/api';

export default function Level5() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [phase, setPhase] = useState('intro');
  const [taskIndex, setTaskIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // States
  const [manaReturn, setManaReturn] = useState('');
  const [funcDefined, setFuncDefined] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/levels/5`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Failed to load Level 5:", err);
        setData({
          title: "The Spellcraft Library",
          intro_text: "In the ancient library, spells are written once and used many times. Repeating actions manually is wasteful. It is time to forge reusable magical functions.",
          scenes: [
            { speaker: "Archmage", text: "Encapsulate your logic, Hero! Spells require parameters and return powerful results." }
          ]
        });
      });
    AudioEngine.playDarkAmbient();
    return () => AudioEngine.stop();
  }, []);

  if (!data) return <div className="text-white text-center mt-20 font-mono">Parsing Tomes...</div>;

  const handleLogic = (isCorrect, msg, advanceDelay = 1500) => {
    setFeedback({ isCorrect, msg });
    if (isCorrect) {
      setTimeout(() => {
        setFeedback(null);
        if (taskIndex === 3) {
          const current = parseInt(localStorage.getItem('ecoVerseUnlocked') || '1', 10);
          localStorage.setItem('ecoVerseUnlocked', Math.max(current, 6));
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
            <h3 className="text-2xl text-cyan-400 font-bold flex items-center gap-2"><Library/> Task 1: The Core of Magic</h3>
            <p className="text-gray-300">Why do we encapsulate code into a Function (`def`) in Python?</p>
            <div className="flex flex-col gap-3">
               {['To run and reuse the code dynamically', 'To hide underlying errors', 'To make files larger naturally'].map(opt => (
                 <button key={opt} onClick={() => handleLogic(opt.includes('reuse'), opt.includes('reuse') ? 'Exactly! Reusability and modularity are the essence of functions.' : 'False.')} className="p-4 rounded border border-cyan-500/30 hover:bg-cyan-900/30 text-left text-lg font-mono text-white cursor-pointer">{opt}</button>
               ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-cyan-400 font-bold flex items-center gap-2"><Zap/> Task 2: Function Definition</h3>
            <p className="text-gray-300">Assemble the spell by defining the heal block. Click the keyword needed to declare a Python function.</p>
            <div className="flex gap-4">
              {['function', 'def', 'create', 'void'].map(opt => (
                 <button key={opt} onClick={() => {
                   if(opt === 'def') { setFuncDefined(true); handleLogic(true, "'def' declares the function block!"); }
                   else handleLogic(false, 'Incorrect keyword. In Python, use `def`.');
                 }} className={`flex-1 py-4 border rounded font-bold text-white cursor-pointer font-mono ${funcDefined && opt === 'def' ? 'bg-cyan-600 text-white' : 'border-gray-500 hover:bg-white/10'}`}>{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-cyan-400 font-bold">Task 3: Parameters & Arguments</h3>
            <pre className="p-4 bg-black rounded text-cyan-300 font-mono text-sm">
{`def cast_fireball(power_level, targets):
    total_damage = power_level * targets
    return total_damage

# If power_level=50 and targets=3:
cast_fireball(50, 3)`}
            </pre>
            <p className="text-gray-300">What value does `cast_fireball(50, 3)` return?</p>
            <div className="flex gap-4">
              {['50', '3', '150', 'None'].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt==='150', opt==='150'?'Arithmetic and parameters computed perfectly (50 * 3 = 150)!':'Incorrect computation.') } className="flex-1 p-4 border border-cyan-500/50 rounded hover:bg-cyan-900/40 text-white font-mono cursor-pointer">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-cyan-400 font-bold">Task 4: The Return Value</h3>
            <p className="text-gray-300">A spell calculates the restoration balance and must hand it back to the caster. Which keyword sends data back?</p>
            <input type="text" value={manaReturn} onChange={e=>setManaReturn(e.target.value)} placeholder="Type python keyword (e.g. return)..." className="p-4 bg-black/60 border border-cyan-500/50 rounded font-mono text-white text-lg focus:outline-none focus:border-cyan-400" />
            <button onClick={() => handleLogic(manaReturn.trim().toLowerCase() === 'return', manaReturn.trim().toLowerCase() === 'return' ? "'return' hands the value back to the caller!" : "Need the exact 'return' statement.")} className="p-4 bg-cyan-600 hover:bg-cyan-500 rounded font-bold text-white cursor-pointer uppercase">
              BIND RETURN STATEMENT
            </button>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="end" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mb-10 w-full cursor-pointer" onClick={() => navigate('/map')}>
            <StoryDialogue speaker="SYSTEM" text="You have mastered functions, parameters, and return values! Sector 06 (Classes & Objects) is now unlocked on your map." />
            <p className="text-center text-cyan-400 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO RETURN TO MAP</p>
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
           src="/images/level1_intro_1774589620194.png"
           className="absolute inset-0 w-full h-full object-cover object-center hue-rotate-270 brightness-75 contrast-125"
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
              <h1 className="text-4xl text-cyan-400 font-black mb-4 drop-shadow-md px-6">{data.title}</h1>
              <StoryDialogue speaker="NARRATOR" text={data.intro_text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO ENTER SPELLCRAFT ARCHIVE</p>
            </motion.div>
          )}

          {phase === 'scene' && (
            <motion.div key="scene" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('tasks')} className="cursor-pointer">
              <StoryDialogue speaker={data.scenes[0].speaker} text={data.scenes[0].text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">BEGIN FUNCTION TRANSMUTATION</p>
            </motion.div>
          )}

          {phase === 'tasks' && (
            <motion.div key="tasks" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.15)] mb-10 w-full">
              {renderTask()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

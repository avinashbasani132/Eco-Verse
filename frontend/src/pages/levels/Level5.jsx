import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Sparkles, Library, Zap, Activity, ArrowLeft } from 'lucide-react';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';

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
    axios.get('http://localhost:5000/api/levels/5').then(res => setData(res.data)).catch(console.error);
    AudioEngine.playDarkAmbient();
    return () => AudioEngine.stop();
  }, []);

  if (!data) return <div className="text-white text-center mt-20 font-mono">Parsing Tomes...</div>;

  const handleLogic = (isCorrect, msg, advanceDelay = 1500) => {
    setFeedback({ isCorrect, msg });
    if (isCorrect) setTimeout(() => { setFeedback(null); setTaskIndex(t=>t+1); }, advanceDelay);
    else setTimeout(() => { setFeedback(null); }, 2000);
  };

  const renderTask = () => {
    switch(taskIndex) {
      case 0:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-cyan-400 font-bold flex items-center gap-2"><Library/> Task 1: The Core of Magic</h3>
            <p className="text-gray-300">Why do we encapsulate code into a Function (`def`)?</p>
            <div className="flex flex-col gap-3">
               {['To run and reuse the code dynamically', 'To hide underlying errors', 'To make files larger naturally'].map(opt => (
                 <button key={opt} onClick={() => handleLogic(opt.includes('reuse'), opt.includes('reuse') ? 'Exactly! Reusability is magic.' : 'False.')} className="p-4 rounded border border-cyan-500/30 hover:bg-cyan-900/30 text-left text-lg font-mono text-white">{opt}</button>
               ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-cyan-400 font-bold flex items-center gap-2"><Zap/> Task 2: Function Definition</h3>
            <p className="text-gray-300">Assemble the spell by defining the heal block. Click the keyword needed to start a Python function.</p>
            <div className="flex gap-4">
              {['function', 'def', 'create', 'void'].map(opt => (
                 <button key={opt} onClick={() => {
                   if(opt === 'def') { setFuncDefined(true); handleLogic(true, "'def' defines the boundary!"); }
                   else handleLogic(false, 'Incorrect keyword in Python.');
                 }} className={`flex-1 py-4 border rounded font-bold text-white ${funcDefined && opt === 'def' ? 'bg-cyan-600 text-white' : 'border-gray-500 hover:bg-white/10'}`}>{opt}</button>
              ))}
            </div>
            <div className="p-4 bg-black rounded font-mono text-gray-400 border border-gray-800">
              <span className={funcDefined ? "text-cyan-400" : "opacity-0"}>def</span> heal():<br/>
              &nbsp;&nbsp;hp = hp + 20
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-cyan-400 font-bold flex items-center gap-2"><Sparkles/> Task 3: The Target Variable</h3>
            <p className="text-gray-300">You want your fire spell to accept a `target` dynamically across uses. What is the passed variable `target` called?</p>
            <div className="bg-black p-4 rounded font-mono text-orange-400 border border-orange-900/50">def fire_spell(target):</div>
            <div className="flex gap-4">
              {['Index', 'Parameter', 'Key'].map(opt => (
                 <button key={opt} onClick={() => handleLogic(opt==='Parameter', opt==='Parameter'?'Correct! Parameters map to arguments passed!':'Incorrect term.')} className="flex-1 py-4 border border-cyan-500/50 rounded font-bold hover:bg-cyan-900/40 text-white">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-cyan-400 font-bold flex items-center gap-2"><Activity/> Task 4: Feedback Loop</h3>
            <p className="text-gray-300">Your spell cast is complete, but it needs to give back remaining mana directly to the caster's active scope! What keyword pushes data back?</p>
            <div className="flex gap-4 items-center">
              <input type="text" value={manaReturn} onChange={e=>setManaReturn(e.target.value)} placeholder="Type keyword..." className="bg-black border border-cyan-500/50 p-4 rounded focus:outline-none text-white text-xl" />
              <span className="font-mono text-cyan-300 text-xl font-bold"> remaining_mana</span>
            </div>
            <button onClick={() => {
              if(manaReturn.trim().toLowerCase() === 'return') handleLogic(true, "RETURN sends the value back to the caller!");
              else handleLogic(false, "Unknown keyword. Use 'return'.");
            }} className="py-4 bg-cyan-600 rounded font-bold text-black uppercase tracking-widest mt-2 hover:bg-cyan-500">INVOKE KEYWORD</button>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-cyan-400 font-bold">Task 5: Infinite Mirrors</h3>
            <p className="text-gray-300">"Can a function call itself from within its own code block?"</p>
            <div className="flex gap-4">
              {['No, forbidden', 'Yes, called Recursion', 'Yes, called Iteration'].map(opt => (
                 <button key={opt} onClick={() => handleLogic(opt.includes('Recursion'), opt.includes('Recursion') ? 'Recursion! A dangerous but powerful art.' : 'Incorrect.')} className="flex-1 py-4 border border-teal-500/50 rounded font-bold hover:bg-teal-900/40 text-white">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="end" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mb-10 w-full cursor-pointer" onClick={() => navigate('/story/map')}>
            <StoryDialogue speaker="SYSTEM" text="You have mastered Reusability and the power of dynamic spell parameters! The Spellbound Runner title is yours." />
            <p className="text-center text-cyan-400 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO ASCEND THE MOUNTAIN</p>
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-end overflow-hidden">
      
      {/* Background Image Layer */}
      <AnimatePresence mode="crossfade">
        <motion.img
           key={phase}
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: phase === 'tasks' ? 0.3 : 0.6, scale: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1 }}
           src="/images/prologue_2_1774589568898.png" // The Oracle Cyber-Nature figure
           className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

      {/* Top Bar for Navigation */}
      <div className="absolute top-6 left-6 z-50">
        <button onClick={() => navigate('/story/map')} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 uppercase font-mono tracking-widest text-xs">
          <ArrowLeft size={16} /> Hub
        </button>
      </div>

      <div className="relative z-40 w-full max-w-5xl px-6 pb-12">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div key="intro" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('scene')} className="cursor-pointer">
              <h1 className="text-4xl text-cyan-400 font-black mb-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)] px-6">{data.title}</h1>
              <StoryDialogue speaker="NARRATOR" text={data.intro_text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO OPEN THE TOMES</p>
            </motion.div>
          )}

          {phase === 'scene' && (
            <motion.div key="scene1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('tasks')} className="cursor-pointer">
              <StoryDialogue speaker={data.scenes[0].speaker} text={data.scenes[0].text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">BEGIN SPELLCRAFTING</p>
            </motion.div>
          )}

          {phase === 'tasks' && (
            <motion.div key="tasks" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="bg-black/70 backdrop-blur-xl p-8 rounded-2xl border border-cyan-800 shadow-[0_0_50px_rgba(6,182,212,0.1)] mb-10 w-full">
              {renderTask()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

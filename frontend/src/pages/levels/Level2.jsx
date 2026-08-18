import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Compass, Shield, Heart, Skull, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';

export default function Level2() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [phase, setPhase] = useState('intro');
  const [taskIndex, setTaskIndex] = useState(0);

  // States
  const [stats, setStats] = useState({ str: 30, agi: 30, courage: 50, hp: 100, mana: 50 });
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/levels/2').then(res => setData(res.data)).catch(console.error);
    AudioEngine.playDarkAmbient();
    return () => AudioEngine.stop();
  }, []);

  if (!data) return <div className="text-white text-center mt-20 font-mono">Loading Trial...</div>;

  const handleLogic = (isCorrect, msg, advanceDelay = 1500) => {
    setFeedback({ isCorrect, msg });
    if (isCorrect) setTimeout(() => { setFeedback(null); setTaskIndex(t=>t+1); }, advanceDelay);
    else setTimeout(() => { setFeedback(null); setStats(s => ({...s, hp: s.hp-20})); }, 2000);
  };

  const renderTask = () => {
    switch(taskIndex) {
      case 0:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-blue-400 font-bold">Task 1: The First Condition</h3>
            <p className="text-gray-300">"If you hold a shield AND a sword..." what logical condition is required to pass?</p>
            <div className="flex flex-col gap-3">
              {['OR condition', 'AND condition', 'NOT condition'].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt === 'AND condition', opt === 'AND condition' ? 'Correct. `and` requires both.' : 'Incorrect logic.')} className="p-4 bg-blue-900/20 border border-blue-500/30 hover:bg-blue-800 rounded text-left text-white">
                  {opt}
                </button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-blue-400 font-bold">Task 2: Stat Comparison</h3>
            <p className="text-gray-300">If `strength &gt; 50`, you can fight. If not, run. Your strength is {stats.str}. What happens?</p>
            <div className="flex gap-4">
              <button onClick={() => handleLogic(false, 'You lack the strength! (Damage taken)')} className="flex-1 p-4 border border-red-500/50 hover:bg-red-900/50 rounded font-bold text-white">Fight</button>
              <button onClick={() => handleLogic(true, 'Logically sound. You retreated safely.')} className="flex-1 p-4 border border-blue-500/50 hover:bg-blue-900/50 rounded font-bold text-white">Run</button>
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-blue-400 font-bold">Task 3: Threshold of Courage</h3>
            <p className="text-gray-300">The refugee cries out! Do you help them? Condition: `courage &gt;= 60`. Your courage is {stats.courage}.</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <button onClick={() => setStats({...stats, courage: stats.courage + 20})} className="px-4 py-2 bg-yellow-600 rounded text-sm font-bold text-white">BOOST COURAGE (+20)</button>
                <span className="text-yellow-400 font-mono">Current: {stats.courage}</span>
              </div>
              <button onClick={() => {
                if(stats.courage >= 60) handleLogic(true, "Courage threshold met! They are saved.");
                else handleLogic(false, "Courage test failed. (Condition evaluates to False)");
              }} className="p-4 bg-emerald-600 rounded font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.5)] border border-emerald-400 text-black">
                Attempt Rescue
              </button>
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-blue-400 font-bold">Task 4: The Nested Strategy</h3>
            <p className="text-gray-300 font-mono text-sm bg-black p-4 rounded border border-gray-700">
              if hp &gt; 30:<br/>
              &nbsp;&nbsp;rescue()<br/>
              elif mana &gt; 20:<br/>
              &nbsp;&nbsp;spell()<br/>
              else:<br/>
              &nbsp;&nbsp;retreat()
            </p>
            <p className="text-gray-200">Your Stats: HP({stats.hp}) | MANA({stats.mana}). What block executes?</p>
            <div className="flex gap-4">
              {['rescue()', 'spell()', 'retreat()'].map(opt => (
                <button key={opt} onClick={() => {
                  let correct = '';
                  if(stats.hp > 30) correct = 'rescue()';
                  else if(stats.mana > 20) correct = 'spell()';
                  else correct = 'retreat()';
                  handleLogic(opt === correct, opt === correct ? 'Execution predicted perfectly!' : 'Incorrect branch executed.');
                }} className="flex-1 py-3 border border-gray-500 rounded hover:bg-gray-800 text-white">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 4:
        return (
           <motion.div 
              key="end" 
              initial={{opacity:0, y:20}} 
              animate={{opacity:1, y:0}} 
              className="mb-10 w-full cursor-pointer" 
              onClick={() => navigate('/story/map')}
           >
              <StoryDialogue speaker="SYSTEM" text="You have mastered logic gating. The branching paths hold no fear over you. The Title: Apprentice of the Blade is yours." />
              <p className="text-center text-blue-400 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO RETURN TO MAP</p>
           </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-end overflow-hidden">
      {stats.hp <= 0 && (
        <div className="fixed inset-0 z-[100] bg-red-950 flex flex-col justify-center items-center">
          <Skull size={80} className="text-red-500 mb-6 animate-pulse" />
          <h1 className="text-6xl font-black text-white mb-4">LOGIC FAILED</h1>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-600 hover:bg-white hover:text-red-600 transition-colors rounded font-bold text-white tracking-widest uppercase">RETRY LEVEL</button>
        </div>
      )}

      {/* Cinematic Background with Hue Rotate to fake a new blue/steampunk level */}
      <AnimatePresence mode="crossfade">
        <motion.img
           key={phase}
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: phase === 'tasks' ? 0.2 : 0.6, scale: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1 }}
           src="/images/level1_intro_1774589620194.png"
           className="absolute inset-0 w-full h-full object-cover object-center hue-rotate-180 brightness-75 constrast-125"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

      {/* Top Bar for Navigation */}
      <div className="absolute top-6 left-6 z-50">
        <button onClick={() => navigate('/story/map')} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 uppercase font-mono tracking-widest text-xs">
          <ArrowLeft size={16} /> Hub
        </button>
      </div>

      {/* STAT BAR */}
      <div className="absolute top-6 right-6 flex gap-4 text-sm font-bold font-mono z-50">
         <div className="bg-red-900/40 text-red-400 px-4 py-2 rounded-full flex items-center gap-2 border border-red-500/30 backdrop-blur-md"><Heart size={16}/> {stats.hp} HP</div>
         <div className="bg-blue-900/40 text-blue-400 px-4 py-2 rounded-full flex items-center gap-2 border border-blue-500/30 backdrop-blur-md"><Compass size={16}/> {stats.mana} MP</div>
      </div>

      <div className="relative z-40 w-full max-w-5xl px-6 pb-12">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div key="intro" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('scene')} className="cursor-pointer">
              <h1 className="text-4xl text-blue-400 font-black mb-4 drop-shadow-md px-6">{data.title}</h1>
              <StoryDialogue speaker="NARRATOR" text={data.intro_text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO ENTER TRAINING GROUNDS</p>
            </motion.div>
          )}

          {phase === 'scene' && (
            <motion.div key="scene1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('tasks')} className="cursor-pointer">
              <StoryDialogue speaker={data.scenes[0].speaker} text={data.scenes[0].text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse">BEGIN CONDITIONAL TRIAL</p>
            </motion.div>
          )}

          {phase === 'tasks' && (
            <motion.div key="tasks" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.15)] mb-10 w-full">
              {renderTask()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

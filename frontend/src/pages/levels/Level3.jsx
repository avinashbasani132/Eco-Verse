// frontend/src/pages/levels/Level3.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Swords, ArrowLeft } from 'lucide-react';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';
import API_BASE_URL from '../../config/api';

export default function Level3() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [phase, setPhase] = useState('intro');
  const [taskIndex, setTaskIndex] = useState(0);

  // States
  const [goblinHp, setGoblinHp] = useState(10);
  const [loopCount, setLoopCount] = useState(0);
  const [isStriking, setIsStriking] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/levels/3`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Failed to load Level 3:", err);
        setData({
          title: "The Endless Horde",
          intro_text: "Outside the capital, thousands of enemies flood the plains. A hero cannot manually strike each one by one. You must harness the power of repetitive action: Loops.",
          scenes: [
            { speaker: "Commander", text: "They just keep coming! Automate your strikes with loops or we are lost!" }
          ]
        });
      });
    AudioEngine.playDarkAmbient();
    return () => AudioEngine.stop();
  }, []);

  if (!data) return <div className="text-white text-center mt-20 font-mono">Simulating Horde...</div>;

  const handleLogic = (isCorrect, msg, advanceDelay = 1500) => {
    setFeedback({ isCorrect, msg });
    if (isCorrect) {
      setTimeout(() => {
        setFeedback(null);
        if (taskIndex === 4) {
          const current = parseInt(localStorage.getItem('ecoVerseUnlocked') || '1', 10);
          localStorage.setItem('ecoVerseUnlocked', Math.max(current, 4));
        }
        setTaskIndex(t => t + 1);
      }, advanceDelay);
    } else {
      setTimeout(() => { setFeedback(null); }, 2000);
    }
  };

  const executeForLoop = () => {
    if (loopCount !== 10) return handleLogic(false, `You set the range to ${loopCount}. Exactly 10 iterations required!`);
    setIsStriking(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setGoblinHp(prev => Math.max(0, prev - 1));
      if (count === 10) {
        clearInterval(interval);
        setIsStriking(false);
        handleLogic(true, "All 10 enemy units eliminated via loop iteration!");
      }
    }, 200);
  };

  const renderTask = () => {
    switch(taskIndex) {
      case 0:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-red-400 font-bold flex items-center gap-2"><Swords/> Task 1: Repetition</h3>
            <p className="text-gray-300">"Which loop is best if you know exactly that 10 enemies are attacking?"</p>
            <div className="flex gap-4">
              {['while loop', 'for loop', 'infinite loop'].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt==='for loop', opt==='for loop'?'Correct! Use for loops for known counts.':'Wrong context.') } className="p-4 border border-red-500/30 rounded flex-1 hover:bg-red-900/30 text-white font-mono cursor-pointer">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-red-400 font-bold">Task 2: Range Execution</h3>
            <p className="text-gray-300">Target: 10 enemy vanguard units. Set `range(count)` to 10 and execute the loop.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setLoopCount(c => c + 1)} className="px-4 py-2 bg-red-800 hover:bg-red-700 rounded text-white font-bold cursor-pointer">+1 Strike</button>
              <button onClick={() => setLoopCount(0)} className="px-4 py-2 bg-gray-800 rounded text-white font-bold cursor-pointer">Reset</button>
              <span className="font-mono text-xl text-yellow-400">for i in range({loopCount}): strike()</span>
            </div>
            <div className="bg-gray-900 h-6 w-full rounded-full overflow-hidden border border-red-500/30">
              <div className="bg-red-500 h-full transition-all duration-300" style={{ width: `${(goblinHp / 10) * 100}%` }}></div>
            </div>
            <button disabled={isStriking} onClick={executeForLoop} className="p-4 bg-red-600 hover:bg-red-500 rounded font-black tracking-widest text-white cursor-pointer disabled:opacity-50">
              {isStriking ? "ITERATING..." : "EXECUTE LOOP STRIKE"}
            </button>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-red-400 font-bold">Task 3: While Condition Caution</h3>
            <p className="text-gray-300">What happens if a `while` loop condition NEVER becomes `False`?</p>
            <div className="flex flex-col gap-3">
              {['The program runs forever (Infinite Loop / Crash)', 'It automatically stops after 100 tries', 'Python converts it to a For loop'].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt.includes('forever'), opt.includes('forever') ? 'True! Guard against infinite loops.' : 'False.')} className="p-4 border border-red-500/30 rounded hover:bg-red-900/30 text-left text-white cursor-pointer">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-red-400 font-bold">Task 4: Flow Control: Skipping</h3>
            <p className="text-gray-300">A civilian disguised in enemy armor is spotted in iteration #5. Which keyword SKIPS the current iteration without ending the entire loop?</p>
            <div className="flex gap-4">
              {['break', 'continue', 'pass', 'return'].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt==='continue', opt==='continue'?'`continue` skips the rest of the current iteration!':'Wrong keyword.') } className="px-4 py-2 border border-gray-500 rounded hover:bg-white/10 font-bold text-white font-mono cursor-pointer">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-red-400 font-bold">Task 5: Loop Termination</h3>
            <p className="text-gray-300">The boss has been defeated. Which keyword immediately BREAKS out of the loop?</p>
            <div className="flex gap-4">
              {['break', 'return', 'exit', 'stop'].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt==='break', opt==='break'?'`break` immediately terminates the loop!':'Incorrect termination keyword.') } className="px-4 py-2 border border-red-500/50 rounded hover:bg-red-600/50 text-white shadow-md uppercase font-bold cursor-pointer font-mono">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="end" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mb-10 w-full cursor-pointer" onClick={() => navigate('/map')}>
            <StoryDialogue speaker="SYSTEM" text="You decimated the horde with iterative loops! Sector 04 (Lists & Data Structures) is now unlocked." />
            <p className="text-center text-red-500 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO RETURN TO MAP</p>
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
           className="absolute inset-0 w-full h-full object-cover object-center brightness-75 contrast-125"
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
              <h1 className="text-4xl text-red-400 font-black mb-4 drop-shadow-md px-6">{data.title}</h1>
              <StoryDialogue speaker="NARRATOR" text={data.intro_text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO ENGAGE HORDE</p>
            </motion.div>
          )}

          {phase === 'scene' && (
            <motion.div key="scene" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('tasks')} className="cursor-pointer">
              <StoryDialogue speaker={data.scenes[0].speaker} text={data.scenes[0].text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">COMMENCE LOOP PROTOCOL</p>
            </motion.div>
          )}

          {phase === 'tasks' && (
            <motion.div key="tasks" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.15)] mb-10 w-full">
              {renderTask()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

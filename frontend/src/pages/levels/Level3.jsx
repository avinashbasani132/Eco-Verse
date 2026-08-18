import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Swords, Skull, ShieldBan, ArrowLeft } from 'lucide-react';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';

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
    axios.get('http://localhost:5000/api/levels/3').then(res => setData(res.data)).catch(console.error);
    AudioEngine.playDarkAmbient();
    return () => AudioEngine.stop();
  }, []);

  if (!data) return <div className="text-white text-center mt-20 font-mono">Simulating Horde...</div>;

  const handleLogic = (isCorrect, msg, advanceDelay = 1500) => {
    setFeedback({ isCorrect, msg });
    if (isCorrect) setTimeout(() => { setFeedback(null); setTaskIndex(t=>t+1); }, advanceDelay);
    else setTimeout(() => { setFeedback(null); }, 2000);
  };

  const executeForLoop = () => {
    if(loopCount != 10) return handleLogic(false, `You struck ${loopCount} times. Need exactly 10!`);
    setIsStriking(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setGoblinHp(prev => Math.max(0, prev - 1));
      if(count === 10) { clearInterval(interval); setIsStriking(false); handleLogic(true, "All 10 goblins slain via iteration!"); }
    }, 200);
  };

  const renderTask = () => {
    switch(taskIndex) {
      case 0:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-red-400 font-bold flex items-center gap-2"><Swords/> Task 1: Repetition</h3>
            <p className="text-gray-300">"Which loop is best if you know exactly that 10 goblins are attacking?"</p>
            <div className="flex gap-4">
              {['while loop', 'for loop', 'infinite loop'].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt==='for loop', opt==='for loop'?'Correct! Use For loops for known counts.':'Wrong context.') } className="p-4 border border-red-500/30 rounded flex-1 hover:bg-red-900/30 text-white font-mono">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-red-400 font-bold flex items-center gap-2"><Swords/> Task 2: Strike Iteration</h3>
            <p className="text-gray-300">Set the loop range to match the 10 goblins, then execute the block.</p>
            <div className="bg-black p-4 rounded border border-gray-700 font-mono text-lg text-gray-200">
              for i in range(<input type="number" value={loopCount} onChange={(e)=>setLoopCount(e.target.value)} className="w-16 bg-gray-800 text-center border border-gray-600 mx-2 text-white"/>):<br/>
              &nbsp;&nbsp;strike_goblin()
            </div>
            <button disabled={isStriking} onClick={executeForLoop} className={`py-4 rounded font-bold tracking-widest text-white ${isStriking ? 'bg-red-900/50 pointer-events-none text-white/50' : 'bg-red-600 hover:bg-red-500'}`}>EXECUTE LOOP</button>
            <div className="flex gap-1 mt-4">
               {Array.from({length: goblinHp}).map((_, i) => <Skull key={i} className="text-green-500 w-8 h-8" />)}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-red-400 font-bold">Task 3: Infinite Siege</h3>
            <p className="text-gray-300">A gate keeps spawning enemies. What condition makes a `while` loop run forever?</p>
            <div className="flex gap-4">
              {['while (False)', 'while (True)', 'while (0)'].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt==='while (True)', opt==='while (True)'?'Accurate. An infinite loop forms!':'Incorrect.') } className="p-4 bg-red-900/20 border border-red-500/30 font-mono rounded flex-1 hover:bg-red-800 text-white">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-red-400 font-bold">Task 4: The Skip Action</h3>
            <p className="text-gray-300">An exploding goblin appears in the horde list! Type the keyword to SKIP the current iteration to avoid it.</p>
            <div className="bg-black p-4 rounded border border-gray-700 font-mono text-lg text-gray-200">
              for enemy in horde:<br/>
              &nbsp;&nbsp;if enemy.type == 'exploding':<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;[INSERT KEYWORD]
            </div>
            <div className="flex gap-4">
              {['break', 'continue', 'pass', 'return'].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt==='continue', opt==='continue'?'CONTINUE skips the rest of the loop block!':'WRONG KEYWORD! Boom!') } className="px-4 py-2 border border-gray-500 rounded hover:bg-white/10 font-bold text-white">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-red-400 font-bold">Task 5: Boss Engagement</h3>
            <p className="text-gray-300">The Boss finally spawned while you were farming. Type the keyword to completely EXIT the loop.</p>
            <div className="flex gap-4">
              {['break', 'return', 'exit', 'stop'].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt==='break', opt==='break'?'BREAK annihilates the loop!':'Incorrect termination.') } className="px-4 py-2 border border-red-500/50 rounded hover:bg-red-600/50 text-white shadow-md uppercase font-bold">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="end" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mb-10 w-full cursor-pointer" onClick={() => navigate('/story/map')}>
            <StoryDialogue speaker="SYSTEM" text="You decimated the horde manually without tiring, thanks to iterators! The Banner of Repetition is secured." />
            <p className="text-center text-red-500 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO RETURN TO MAP</p>
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
           animate={{ opacity: phase === 'tasks' ? 0.2 : 0.6, scale: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1 }}
           src="/images/prologue_fall_1774588314457.png" // Dark fantasy / red hue image fit for horde
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
              <h1 className="text-4xl text-red-500 font-black mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)] px-6">{data.title}</h1>
              <StoryDialogue speaker="NARRATOR" text={data.intro_text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO ENGAGE THE HORDE</p>
            </motion.div>
          )}

          {phase === 'scene' && (
            <motion.div key="scene1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('tasks')} className="cursor-pointer">
              <StoryDialogue speaker={data.scenes[0].speaker} text={data.scenes[0].text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">DEPLOY SETTINGS</p>
            </motion.div>
          )}

          {phase === 'tasks' && (
            <motion.div key="tasks" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-red-900/50 shadow-[0_0_50px_rgba(153,27,27,0.3)] mb-10 w-full">
              {renderTask()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

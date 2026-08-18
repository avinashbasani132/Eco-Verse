import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Crown, UserPlus, Zap, Swords, Hammer, ArrowLeft } from 'lucide-react';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';

export default function Level6() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [phase, setPhase] = useState('intro');
  const [taskIndex, setTaskIndex] = useState(0);

  const [feedback, setFeedback] = useState(null);
  const [hasInstance, setHasInstance] = useState(false);
  const [methodCalled, setMethodCalled] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/levels/6').then(res => setData(res.data)).catch(console.error);
    AudioEngine.playDarkAmbient();
    return () => AudioEngine.stop();
  }, []);

  if (!data) return <div className="text-white text-center mt-20 font-mono">Loading Guild...</div>;

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
            <h3 className="text-2xl text-amber-500 font-bold flex items-center gap-2"><Hammer/> Task 1: The Blueprint</h3>
            <p className="text-gray-300">What is a `Class` in object-oriented programming?</p>
            <div className="flex flex-col gap-4">
               {['A blueprint to create objects', 'An error handling method', 'A new variable type'].map(opt => (
                 <button key={opt} onClick={() => handleLogic(opt.includes('blueprint'), opt.includes('blueprint') ? 'Yes. You are the architect.' : 'No.')} className="p-4 rounded border border-amber-600/30 hover:bg-amber-900/40 text-left font-bold text-white">{opt}</button>
               ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-amber-500 font-bold flex items-center gap-2"><UserPlus/> Task 2: Manifestation</h3>
            <p className="text-gray-300">When you create an actual hero from the `Hero` blueprint class, what is that called?</p>
            <div className="flex gap-4">
              {['Method', 'Instance', 'Property'].map(opt => (
                 <button key={opt} onClick={() => {
                   if(opt === 'Instance') { setHasInstance(true); handleLogic(true, "An Instance is born!"); }
                   else handleLogic(false, 'Incorrect terminology.');
                 }} className={`flex-1 py-4 border rounded font-bold uppercase tracking-widest text-white ${hasInstance && opt === 'Instance' ? 'bg-amber-600' : 'border-amber-600/50 hover:bg-white/10'}`}>{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
             <h3 className="text-2xl text-amber-500 font-bold flex items-center gap-2"><Swords/> Task 3: Behaviors</h3>
            <p className="text-gray-300">Inside your Hero class, you define a function to 'attack'. What is a function inside a class called?</p>
            <div className="flex gap-4">
              {['Property', 'Static', 'Method'].map(opt => (
                 <button key={opt} onClick={() => {
                   if(opt === 'Method') { setMethodCalled(true); handleLogic(true, "Methods define an object's behavior."); }
                   else handleLogic(false, 'Incorrect.');
                 }} className={`flex-1 py-4 border rounded font-bold uppercase tracking-widest text-white ${methodCalled && opt === 'Method' ? 'bg-amber-600' : 'border-amber-600/50 hover:bg-white/10'}`}>{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
             <h3 className="text-2xl text-amber-500 font-bold flex items-center gap-2"><Zap/> Task 4: Subclassing the System</h3>
            <p className="text-gray-300">You want a `Paladin` who shares all traits of a `Hero` but with healing abilities. What principle allows a class to derive from another?</p>
            <div className="flex gap-4">
              {['Polymorphism', 'Inheritance', 'Encapsulation'].map(opt => (
                 <button key={opt} onClick={() => handleLogic(opt === 'Inheritance', opt === 'Inheritance' ? 'Correct! Paladin inherits from Hero.' : 'Wrong OOPS concept.')} className="flex-1 py-4 border rounded font-bold uppercase tracking-widest border-amber-600/50 hover:bg-white/10 text-xs md:text-sm text-white">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="end" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mb-10 w-full cursor-pointer" onClick={() => navigate('/story/map')}>
            <StoryDialogue speaker="SYSTEM" text="You now command life. Instances bow to your blueprints! The Crown of Objects is secured." />
            <p className="text-center text-amber-400 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO MARCH TO THE THRONE</p>
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
           src="/images/ending_victory_1774588389553.png" // Golden hue image
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
              <h1 className="text-4xl text-amber-500 font-black mb-4 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)] px-6">{data.title}</h1>
              <StoryDialogue speaker="NARRATOR" text={data.intro_text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO ENTER THE GUILD</p>
            </motion.div>
          )}

          {phase === 'scene' && (
            <motion.div key="scene1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('tasks')} className="cursor-pointer">
              <StoryDialogue speaker={data.scenes[0].speaker} text={data.scenes[0].text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">BEGIN FORGING SEQUENCE</p>
            </motion.div>
          )}

          {phase === 'tasks' && (
            <motion.div key="tasks" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-amber-600/50 shadow-[0_0_50px_rgba(251,191,36,0.1)] mb-10 w-full">
              {renderTask()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

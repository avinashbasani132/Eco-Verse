import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowLeft, Box } from 'lucide-react';
import axios from 'axios';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';

export default function Level1() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [phase, setPhase] = useState('intro'); // intro, scene1, tasks, end
  
  // Tasks State
  const [heroName, setHeroName] = useState('');
  const [validNameChoice, setValidNameChoice] = useState(null);
  const [heroAge, setHeroAge] = useState('');
  const [heroStatus, setHeroStatus] = useState(null); // boolean
  const [sortedItems, setSortedItems] = useState({ name: null, age: null, status: null });
  const [taskIndex, setTaskIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/levels/1').then(res => setData(res.data)).catch(console.error);
    AudioEngine.playDarkAmbient();
    return () => AudioEngine.stop();
  }, []);

  if (!data) return <div className="text-white text-center mt-20 font-mono">Summoning Reality...</div>;

  const nextTask = () => setTaskIndex(t => t + 1);

  const renderTask = () => {
    switch(taskIndex) {
      case 0:
        return (
          <motion.div initial={{opacity: 0, y:20}} animate={{opacity:1, y:0}} className="flex flex-col gap-4">
            <h3 className="text-2xl text-emerald-400 font-bold mb-2">Task 1: The Essence of Naming</h3>
            <p className="text-gray-300">The Scribe asks for your designated identifier. The kingdom calls this a 'variable value'.</p>
            <input type="text" value={heroName} onChange={e=>setHeroName(e.target.value)} placeholder="Enter Hero Name..." className="bg-black/50 border border-emerald-500/50 p-4 rounded text-xl focus:outline-none focus:border-emerald-400 text-white" />
            <button disabled={!heroName.trim()} onClick={nextTask} className="mt-4 bg-emerald-600 p-3 rounded font-bold disabled:opacity-50 text-white">BIND NAME</button>
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{opacity: 0, x:20}} animate={{opacity:1, x:0}} className="flex flex-col gap-4">
            <h3 className="text-2xl text-emerald-400 font-bold mb-2">Task 2: The Rules of Identity</h3>
            <p className="text-gray-300">Which of these is a valid variable identifier to store your name in Python?</p>
            <div className="grid grid-cols-2 gap-4">
              {['1hero', 'hero name', 'hero_name', 'hero-name'].map((opt, i) => (
                <button key={opt} onClick={() => {
                  if(opt === 'hero_name') { setValidNameChoice(opt); setTimeout(nextTask, 1000); }
                  else alert("A dark logic prevents this! Try again.");
                }} className={`p-4 border rounded font-mono text-white ${validNameChoice === opt ? 'bg-emerald-500/30 border-emerald-400' : 'border-gray-600 hover:border-white bg-black/40'}`}>{opt}</button>
              ))}
            </div>
            {validNameChoice && <p className="text-emerald-400 mt-2 font-bold flex items-center gap-2"><ShieldCheck/> Correct. Identifiers cannot start with numbers, spaces, or hyphens.</p>}
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{opacity: 0, scale:0.95}} animate={{opacity:1, scale:1}} className="flex flex-col gap-4">
            <h3 className="text-2xl text-emerald-400 font-bold mb-2">Task 3: Storing Time</h3>
            <p className="text-gray-300">The court must record your years in Asterveil terms. (Enter as a whole Integer).</p>
            <input type="number" value={heroAge} onChange={e=>setHeroAge(e.target.value)} placeholder="Age..." className="bg-black/50 border border-emerald-500/50 p-4 rounded text-xl text-white outline-none focus:border-emerald-400" />
            <button disabled={!heroAge} onClick={() => { if(Number.isInteger(Number(heroAge))) nextTask(); else alert("Must be an integer!"); }} className="mt-4 bg-emerald-600 p-3 rounded font-bold disabled:opacity-50 text-white">RECORD AGE</button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{opacity: 0, y:20}} animate={{opacity:1, y:0}} className="flex flex-col gap-4">
            <h3 className="text-2xl text-emerald-400 font-bold mb-2">Task 4: The Truth Status</h3>
            <p className="text-gray-300">The Oracle questions your aura. Are you the chosen one? In this reality, such truths are Booleans.</p>
            <div className="flex gap-4">
              <button onClick={() => { setHeroStatus('True'); setTimeout(nextTask, 1000); }} className={`flex-1 p-6 border rounded font-bold text-xl ${heroStatus==='True'?'bg-emerald-500 text-black border-emerald-500':'border-gray-500 hover:bg-white/10 text-white'}`}>True</button>
              <button onClick={() => { setHeroStatus('False'); setTimeout(nextTask, 1000); }} className={`flex-1 p-6 border rounded font-bold text-xl ${heroStatus==='False'?'bg-red-500 text-black border-red-500':'border-gray-500 hover:bg-white/10 text-white'}`}>False</button>
            </div>
          </motion.div>
        );
      case 4:
        const checkSort = (field, type) => { setSortedItems(prev => ({...prev, [field]: type})); };
        const isAllSorted = sortedItems.name === 'string' && sortedItems.age === 'integer' && sortedItems.status === 'boolean';
        return (
          <motion.div initial={{opacity: 0, y:20}} animate={{opacity:1, y:0}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-emerald-400 font-bold mb-2">Task 5: The Grand Classification</h3>
            <p className="text-gray-300">Connect the structural types to your variables before the seal locks.</p>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center p-4 bg-black/50 border border-gray-700 rounded">
                <span className="font-mono text-xl text-yellow-300">name = "{heroName}"</span>
                <div className="flex gap-2">
                  {['string', 'integer', 'boolean'].map(t => (
                    <button key={t} onClick={()=>checkSort('name', t)} className={`px-4 py-1 text-sm rounded ${sortedItems.name === t ? t==='string'?'bg-green-500 text-black':'bg-red-500 text-white' : 'bg-gray-800 text-gray-300'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-black/50 border border-gray-700 rounded">
                <span className="font-mono text-xl text-pink-300">age = {heroAge}</span>
                <div className="flex gap-2">
                  {['string', 'integer', 'boolean'].map(t => (
                    <button key={t} onClick={()=>checkSort('age', t)} className={`px-4 py-1 text-sm rounded ${sortedItems.age === t ? t==='integer'?'bg-green-500 text-black':'bg-red-500 text-white' : 'bg-gray-800 text-gray-300'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-black/50 border border-gray-700 rounded">
                <span className="font-mono text-xl text-blue-300">is_chosen = {heroStatus}</span>
                <div className="flex gap-2">
                  {['string', 'integer', 'boolean'].map(t => (
                    <button key={t} onClick={()=>checkSort('status', t)} className={`px-4 py-1 text-sm rounded ${sortedItems.status === t ? t==='boolean'?'bg-green-500 text-black':'bg-red-500 text-white' : 'bg-gray-800 text-gray-300'}`}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
            {isAllSorted && <button onClick={() => setPhase('end')} className="mt-4 px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded font-black tracking-widest text-lg shadow-lg text-white">FINAL BINDING</button>}
          </motion.div>
        );
      default: return null;
    }
  };

  const getBackgroundImage = () => {
    switch(phase) {
      case 'intro': case 'scene1': return '/images/level1_intro_1774589620194.png';
      default: return '/images/level1_intro_1774589620194.png';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-end overflow-hidden">
      <AnimatePresence mode="crossfade">
        <motion.img
           key={phase}
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: phase === 'tasks' ? 0.3 : 0.6, scale: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1 }}
           src={getBackgroundImage()}
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
            <motion.div key="intro" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('scene1')} className="cursor-pointer">
              <h1 className="text-4xl text-emerald-400 font-black mb-4 drop-shadow-md px-6">{data.title}</h1>
              <StoryDialogue speaker="NARRATOR" text={data.intro_text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse">CLICK TO CONTINUE</p>
            </motion.div>
          )}

          {phase === 'scene1' && (
            <motion.div key="scene1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('tasks')} className="cursor-pointer">
              <StoryDialogue speaker={data.scenes[0].speaker} text={data.scenes[0].text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse">COMMENCE RITUAL</p>
            </motion.div>
          )}

          {phase === 'tasks' && (
            <motion.div key="tasks" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="bg-black/70 backdrop-blur-xl p-8 rounded-2xl border border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.1)] mb-10 w-full">
              {renderTask()}
            </motion.div>
          )}

          {phase === 'end' && (
            <motion.div key="end" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mb-10 w-full cursor-pointer" onClick={() => navigate('/story/map')}>
              <StoryDialogue speaker="SYSTEM" text={`Your essence (${heroName}, ${heroAge}) is firmly locked in Asterveil's memory. The Data structures are stable! The Summoning Crest is obtained.`} />
              <p className="text-center text-emerald-400 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO CONTINUE ADVENTURE</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

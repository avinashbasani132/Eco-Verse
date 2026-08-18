import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { BookMarked, Box, Key, Layers, PackagePlus, ArrowLeft } from 'lucide-react';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';

export default function Level4() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [phase, setPhase] = useState('intro');
  const [taskIndex, setTaskIndex] = useState(0);

  const [feedback, setFeedback] = useState(null);

  // States for mini-games
  const [partyList, setPartyList] = useState([]);
  const [inventoryList, setInventoryList] = useState(['potion']);

  useEffect(() => {
    axios.get('http://localhost:5000/api/levels/4').then(res => setData(res.data)).catch(console.error);
    AudioEngine.playDarkAmbient();
    return () => AudioEngine.stop();
  }, []);

  if (!data) return <div className="text-white text-center mt-20 font-mono">Unlocking Vault...</div>;

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
            <h3 className="text-2xl text-purple-400 font-bold flex items-center gap-2"><Layers/> Task 1: The Party Roster</h3>
            <p className="text-gray-300">You need a collection of dynamic, ordered items. Click to add members to your Party `List` (Array). You need 3 members.</p>
            <div className="flex gap-4">
               {['Mage', 'Knight', 'Healer', 'Rogue'].map(ally => (
                 <button disabled={partyList.includes(ally)} key={ally} onClick={() => {
                   const newList = [...partyList, ally];
                   setPartyList(newList);
                   if (newList.length === 3) handleLogic(true, "List populated! Notice how the order is preserved.");
                 }} className={`px-4 py-2 rounded font-bold border text-white ${partyList.includes(ally) ? 'bg-purple-900/50 border-purple-900 opacity-50' : 'border-purple-500 hover:bg-purple-500/20'}`}>{ally}</button>
               ))}
            </div>
            <div className="p-4 bg-black rounded font-mono text-purple-300">party = [ {partyList.map(p => `"${p}"`).join(', ')} ]</div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-purple-400 font-bold flex items-center gap-2"><PackagePlus/> Task 2: Inventory Mutability</h3>
            <p className="text-gray-300">A List can change (mutate) during runtime. Add the `Key` to your inventory!</p>
            <div className="flex gap-4">
              <button onClick={() => {
                setInventoryList(prev => [...prev, 'key']);
                handleLogic(true, ".append() successful!");
              }} className="px-6 py-3 bg-purple-700 text-white rounded font-bold uppercase transition hover:bg-purple-600">inventory.append("key")</button>
            </div>
            <div className="p-4 bg-black rounded font-mono text-pink-300">inventory = [ {inventoryList.map(i => `"${i}"`).join(', ')} ]</div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-purple-400 font-bold flex items-center gap-2"><BookMarked/> Task 3: The Unbreakable Prophecy</h3>
            <p className="text-gray-300">The ancient prophecy scroll cannot be changed. Which immutable structure holds it?</p>
            <div className="flex gap-4">
              {['List', 'Tuple', 'Set'].map(opt => (
                 <button key={opt} onClick={() => handleLogic(opt==='Tuple', opt==='Tuple'?'Correct. Tuples cannot be mutated.':'Incorrect.')} className="flex-1 py-4 border border-purple-500/50 text-white rounded font-bold hover:bg-purple-900/40">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-purple-400 font-bold flex items-center gap-2"><Key/> Task 4: The Kingdom Map</h3>
            <p className="text-gray-300">You need to map Region Names (Keys) to Threat Levels (Values). What structure relies on Key-Value pairs?</p>
            <div className="flex gap-4">
              {['Tuple', 'Dictionary', 'Set'].map(opt => (
                 <button key={opt} onClick={() => handleLogic(opt==='Dictionary', opt==='Dictionary'?'Correct. Dictionaries (or Maps) map keys to values.':'Incorrect.')} className="flex-1 py-4 border border-purple-500/50 text-white rounded font-bold hover:bg-white/10">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-purple-400 font-bold">Task 5: Unique Runes</h3>
            <p className="text-gray-300">You found a duplicate 'Fire Rune'. Which data structure automatically ensures all items remain unique, skipping duplicates?</p>
            <div className="flex gap-4">
              {['Set', 'List', 'Tuple'].map(opt => (
                 <button key={opt} onClick={() => handleLogic(opt==='Set', opt==='Set'?'Sets guarantee mathematical uniqueness!':'Incorrect.')} className="flex-1 py-4 border border-teal-500/50 text-white rounded font-bold hover:bg-teal-900/40">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="end" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mb-10 w-full cursor-pointer" onClick={() => navigate('/story/map')}>
            <StoryDialogue speaker="SYSTEM" text="You have perfectly organized the chaotic data into structured memory! The Relic Ledger is acquired." />
            <p className="text-center text-purple-400 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO ASCEND THE TOWER</p>
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
           src="/images/prologue_3_1774589596673.png" // The Code Atlas image
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
              <h1 className="text-4xl text-purple-400 font-black mb-4 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] px-6">{data.title}</h1>
              <StoryDialogue speaker="NARRATOR" text={data.intro_text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO DESCEND INTO VAULT</p>
            </motion.div>
          )}

          {phase === 'scene' && (
            <motion.div key="scene1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('tasks')} className="cursor-pointer">
              <StoryDialogue speaker={data.scenes[0].speaker} text={data.scenes[0].text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">ORGANIZE VAULT</p>
            </motion.div>
          )}

          {phase === 'tasks' && (
            <motion.div key="tasks" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="bg-black/70 backdrop-blur-xl p-8 rounded-2xl border border-purple-900 shadow-[0_0_50px_rgba(168,85,247,0.1)] mb-10 w-full">
              {renderTask()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

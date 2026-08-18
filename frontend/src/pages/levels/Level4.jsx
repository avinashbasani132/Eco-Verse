// frontend/src/pages/levels/Level4.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Layers, PackagePlus, ArrowLeft } from 'lucide-react';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';
import API_BASE_URL from '../../config/api';

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
    axios.get(`${API_BASE_URL}/api/levels/4`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Failed to load Level 4:", err);
        setData({
          title: "The Vault of Relics",
          intro_text: "Deep below the castle lies the Vault of Relics. You must sort your party, organize supplies, and decode the immutable prophecy.",
          scenes: [
            { speaker: "Vault Keeper", text: "Organization is the key to survival. Master your Lists, Tuples, and Dictionaries." }
          ]
        });
      });
    AudioEngine.playDarkAmbient();
    return () => AudioEngine.stop();
  }, []);

  if (!data) return <div className="text-white text-center mt-20 font-mono">Unlocking Vault...</div>;

  const handleLogic = (isCorrect, msg, advanceDelay = 1500) => {
    setFeedback({ isCorrect, msg });
    if (isCorrect) {
      setTimeout(() => {
        setFeedback(null);
        if (taskIndex === 3) {
          const current = parseInt(localStorage.getItem('ecoVerseUnlocked') || '1', 10);
          localStorage.setItem('ecoVerseUnlocked', Math.max(current, 5));
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
            <h3 className="text-2xl text-purple-400 font-bold flex items-center gap-2"><Layers/> Task 1: The Party Roster</h3>
            <p className="text-gray-300">You need an ordered collection of companions. Click to add members to your Party `List` (Array). You need 3 members.</p>
            <div className="flex gap-4">
               {['Mage', 'Knight', 'Healer', 'Rogue'].map(ally => (
                 <button disabled={partyList.includes(ally)} key={ally} onClick={() => {
                   const newList = [...partyList, ally];
                   setPartyList(newList);
                   if (newList.length === 3) handleLogic(true, "List populated! Notice how the order is preserved.");
                 }} className={`px-4 py-2 rounded font-bold border text-white cursor-pointer ${partyList.includes(ally) ? 'bg-purple-900/50 border-purple-900 opacity-50' : 'border-purple-500 hover:bg-purple-500/20'}`}>{ally}</button>
               ))}
            </div>
            <div className="p-4 bg-black rounded font-mono text-purple-300">party = [ {partyList.map(p => `"${p}"`).join(', ')} ]</div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-purple-400 font-bold flex items-center gap-2"><PackagePlus/> Task 2: List Mutability</h3>
            <p className="text-gray-300">A List can change (mutate) during runtime. Append the `Key` to your inventory!</p>
            <div className="flex gap-4">
              <button disabled={inventoryList.includes('crystal_key')} onClick={() => {
                setInventoryList(prev => [...prev, 'crystal_key']);
                handleLogic(true, "inventory.append('crystal_key') executed successfully!");
              }} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded font-bold text-white cursor-pointer">
                inventory.append("crystal_key")
              </button>
            </div>
            <div className="p-4 bg-black rounded font-mono text-purple-300">inventory = [ {inventoryList.map(i => `"${i}"`).join(', ')} ]</div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-purple-400 font-bold">Task 3: Zero-Indexed Access</h3>
            <p className="text-gray-300">If `party = ["Mage", "Knight", "Healer"]`, how do you access the first party member ("Mage")?</p>
            <div className="flex gap-4">
              {['party[1]', 'party[0]', 'party.first()', 'party[first]'].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt==='party[0]', opt==='party[0]'?'Correct! Python uses 0-based indexing.':'Incorrect index.') } className="flex-1 p-4 border border-purple-500/50 rounded hover:bg-purple-900/40 text-white font-mono cursor-pointer">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-6">
            <h3 className="text-2xl text-purple-400 font-bold">Task 4: Immutability of Tuples</h3>
            <p className="text-gray-300">The Ancient Relic coordinates are etched in stone and must NEVER change. Which data structure guarantees immutability?</p>
            <div className="flex gap-4">
              {['List [ ]', 'Tuple ( )', 'Dictionary { }', 'Set { }'].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt.includes('Tuple'), opt.includes('Tuple') ? 'True! Tuples cannot be modified after creation.' : 'False.')} className="flex-1 p-4 border border-purple-500/50 rounded hover:bg-purple-900/40 text-white font-mono cursor-pointer">{opt}</button>
              ))}
            </div>
            {feedback && <p className={`mt-2 font-bold ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{feedback.msg}</p>}
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="end" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mb-10 w-full cursor-pointer" onClick={() => navigate('/map')}>
            <StoryDialogue speaker="SYSTEM" text="The Vault bows to your data organization! Sector 05 (Functions & Modularity) is now unlocked on your map." />
            <p className="text-center text-purple-400 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO RETURN TO MAP</p>
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
           src="/images/ending_victory_1774588389553.png"
           className="absolute inset-0 w-full h-full object-cover object-center hue-rotate-90 brightness-75 contrast-125"
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
              <h1 className="text-4xl text-purple-400 font-black mb-4 drop-shadow-md px-6">{data.title}</h1>
              <StoryDialogue speaker="NARRATOR" text={data.intro_text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO ENTER VAULT</p>
            </motion.div>
          )}

          {phase === 'scene' && (
            <motion.div key="scene" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('tasks')} className="cursor-pointer">
              <StoryDialogue speaker={data.scenes[0].speaker} text={data.scenes[0].text} />
              <p className="text-center text-white/40 font-mono text-xs tracking-[0.3em] mt-4 animate-pulse uppercase">OPEN STORAGE REPOSITORIES</p>
            </motion.div>
          )}

          {phase === 'tasks' && (
            <motion.div key="tasks" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.15)] mb-10 w-full">
              {renderTask()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

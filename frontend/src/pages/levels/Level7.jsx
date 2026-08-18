// frontend/src/pages/levels/Level7.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Flame, Shield, Award, ArrowLeft } from 'lucide-react';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';
import API_BASE_URL from '../../config/api';

export default function Level7() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [phase, setPhase] = useState('intro_title'); // intro_title -> intro_image -> scene -> battle -> end
  const [bossPhase, setBossPhase] = useState(0);

  const [heroHp, setHeroHp] = useState(100);
  const [heroMana, setHeroMana] = useState(100);
  const [bossHp, setBossHp] = useState(100);
  
  const [feedback, setFeedback] = useState(null);
  const [screenShake, setScreenShake] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/levels/7`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Failed to load Level 7:", err);
        setData({
          title: "Final Siege: The Demon King's Throne",
          intro_text: "The Demon King Vharzul waits in the shattered core room. You must combine all previous lessons—variables, conditionals, loops, structures, and functions—to survive his multi-phase siege.",
          scenes: [
            { speaker: "Demon King Vharzul", text: "YOU DARE CHALLENGE MY LOGIC? I WILL DELETE YOU FROM MEMORY!" }
          ]
        });
      });
    AudioEngine.playDarkAmbient();
    return () => AudioEngine.stop();
  }, []);

  // Sync bossPhase 4 to phase 'end'
  useEffect(() => {
    if (bossPhase === 4 && phase !== 'end') {
      localStorage.setItem('ecoVerseUnlocked', '8');
      setPhase('end');
    }
  }, [bossPhase, phase]);

  if (!data) return <div className="text-red-500 text-center mt-20 font-black text-2xl animate-pulse tracking-widest">CONNECTING TO THE VOID...</div>;

  const triggerShake = () => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 500);
  };

  const handleLogic = (isCorrect, damageToBoss, msg, healHero = 0) => {
    if (isCorrect) {
      setBossHp(prev => Math.max(0, prev - damageToBoss));
      if (healHero > 0) setHeroHp(prev => prev + healHero);
      setFeedback({ type: 'success', text: msg });
      setTimeout(() => { setFeedback(null); setBossPhase(p=>p+1); }, 2000);
    } else {
      triggerShake();
      setHeroHp(prev => Math.max(10, prev - 20));
      setFeedback({ type: 'error', text: 'FATAL LOGIC ERROR! Corruption struck your shields.' });
      setTimeout(() => setFeedback(null), 1800);
    }
  };

  const renderBattleUI = () => {
    switch(bossPhase) {
      case 0:
        return (
          <motion.div initial={{opacity:0, scale: 0.9}} animate={{opacity:1, scale: 1}} className="flex flex-col gap-6">
            <h3 className="text-xl md:text-2xl text-red-400 font-bold">Phase 1: Memory Desync (Variables & Scope)</h3>
            <p className="text-gray-300">Vharzul attempts to redefine core system state. Identify which statement executes correctly without crashing.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'def fix():\n    global status\n    status = "Active"',
                'status = "Active"\n2status = "Active"',
                'status = "Active"\nstatus + 100',
                'const status = "Active"'
              ].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt.includes('global'), 25, "GLOBAL RE-ANCHOR APPLIED! 25% Corruption Purged.")} className="p-4 border border-red-500/50 hover:bg-red-900/50 rounded font-mono text-left text-white whitespace-pre-wrap cursor-pointer text-sm">{opt}</button>
              ))}
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{opacity:0, scale: 0.9}} animate={{opacity:1, scale: 1}} className="flex flex-col gap-6">
            <h3 className="text-xl md:text-2xl text-red-400 font-bold">Phase 2: The Void Loop (Break Condition)</h3>
            <p className="text-gray-300">The Demon King locks the atmosphere in a loop: `while True: drain_atmosphere()`. How do you break it when `restored == True`?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'if restored == True:\n    break',
                'if restored == True:\n    continue',
                'if restored == True:\n    pass',
                'stop loop'
              ].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt.includes('break'), 25, "BREAK STATEMENT EXECUTED! Void loop shattered.")} className="p-4 border border-red-500/50 hover:bg-red-900/50 rounded font-mono text-left text-white whitespace-pre-wrap cursor-pointer text-sm">{opt}</button>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{opacity:0, scale: 0.9}} animate={{opacity:1, scale: 1}} className="flex flex-col gap-6">
            <h3 className="text-xl md:text-2xl text-red-400 font-bold">Phase 3: Reusable Healing Matrix (Functions)</h3>
            <p className="text-gray-300">Assemble the restoration pulse function to recover vitality and purge boss corruption.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'def heal(shield, power):\n    return shield + power',
                'function heal(shield, power) { return shield + power; }',
                'def heal(shield, power):\n    print(shield)',
                'create heal(shield, power)'
              ].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt.includes('return shield + power'), 25, "MATRIX DEPLOYED! 25% Purge + Vitality Restored.", 30)} className="p-4 border border-red-500/50 hover:bg-red-900/50 rounded font-mono text-left text-white whitespace-pre-wrap cursor-pointer text-sm">{opt}</button>
              ))}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{opacity:0, scale: 0.9}} animate={{opacity:1, scale: 1}} className="flex flex-col gap-6">
            <h3 className="text-xl md:text-2xl text-red-400 font-bold">Phase 4: The Final Integration (Object Instantiation)</h3>
            <p className="text-gray-300">Vharzul launches his ultimate attack. Instantiate the `GrandArchitect` class and invoke `restore_world()`!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'champion = GrandArchitect("Runner")\nchampion.restore_world()',
                'GrandArchitect.restore_world()',
                'runner = new GrandArchitect()',
                'call GrandArchitect()'
              ].map(opt => (
                <button key={opt} onClick={() => handleLogic(opt.includes('champion = GrandArchitect'), 25, "WORLD RESTORATION MATRIX ONLINE! DEMON KING OVERWRITTEN.")} className="p-4 border border-red-500/50 hover:bg-red-900/50 rounded font-mono text-left text-white whitespace-pre-wrap cursor-pointer text-sm">{opt}</button>
              ))}
            </div>
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden ${screenShake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
      {/* Background Image Layer */}
      <AnimatePresence mode="crossfade">
        <motion.img
           key={phase}
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: phase === 'battle' ? 0.35 : 0.65, scale: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1.2 }}
           src={phase === 'end' ? '/images/ending_victory_1774588389553.png' : '/images/boss_intro_1774588338360.png'}
           className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

      {/* Top Bar */}
      <div className="absolute top-6 left-6 z-50">
        <button onClick={() => navigate('/map')} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 uppercase font-mono tracking-widest text-xs cursor-pointer">
          <ArrowLeft size={16} /> Hub
        </button>
      </div>

      <div className="relative z-40 w-full max-w-5xl mx-auto px-6 pt-20 pb-12 flex-1 flex flex-col justify-end">
        <AnimatePresence mode="wait">
          {phase === 'intro_title' && (
            <motion.div key="intro_title" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('scene')} className="cursor-pointer text-center">
              <h1 className="text-4xl md:text-6xl text-red-500 font-black mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)] tracking-tighter uppercase">{data.title}</h1>
              <StoryDialogue speaker="NARRATOR" text={data.intro_text} />
              <p className="text-center text-red-400 font-mono text-xs tracking-[0.3em] mt-6 animate-pulse uppercase">CLICK TO ENTER THE THRONE OF THE VOID</p>
            </motion.div>
          )}

          {phase === 'scene' && (
            <motion.div key="scene" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('battle')} className="cursor-pointer">
              <StoryDialogue speaker={data.scenes?.[0]?.speaker || "DEMON KING VHARZUL"} text={data.scenes?.[0]?.text || "YOU DARE CHALLENGE MY LOGIC? I WILL DELETE YOU FROM MEMORY!"} pitch={0.2} rate={0.7} />
              <p className="text-center text-red-500 font-mono text-xs tracking-[0.3em] mt-6 animate-pulse uppercase">INITIATE FINAL BATTLE</p>
            </motion.div>
          )}

          {phase === 'battle' && (
            <motion.div key="battle" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="w-full">
               {/* BOSS HUD */}
               <div className="flex flex-col items-center mb-6">
                  <h1 className="text-2xl md:text-3xl text-white font-black tracking-[0.3em] uppercase z-10 relative">DEMON KING VHARZUL</h1>
                  <div className="w-full max-w-2xl bg-gray-900 h-6 mt-3 rounded-full overflow-hidden border border-red-900 relative shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 transition-all duration-500" style={{ width: `${bossHp}%` }}></div>
                    <span className="absolute inset-0 flex justify-center items-center font-black text-xs text-white drop-shadow-md">{bossHp}% SYSTEM CORRUPTION</span>
                  </div>
               </div>

               {/* HERO HUD */}
               <div className="flex justify-between w-full max-w-2xl mx-auto mb-3 font-mono font-bold text-sm">
                  <div className="flex items-center gap-2 text-green-400 bg-green-950/60 px-4 py-2 border border-green-500/50 rounded-full shadow-lg"><Shield size={16} /> HP: {heroHp}</div>
                  <div className="flex items-center gap-2 text-blue-400 bg-blue-950/60 px-4 py-2 border border-blue-500/50 rounded-full shadow-lg"><Flame size={16} /> MP: {heroMana}</div>
               </div>

               {/* BATTLE INTERFACE */}
               <div className="bg-black/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-red-900/50 shadow-[0_0_50px_rgba(220,38,38,0.2)] min-h-[280px] flex flex-col justify-center">
                 <AnimatePresence mode="wait">
                    {feedback ? (
                      <motion.div key="feedback" initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0}} className={`text-center font-black tracking-widest text-lg md:text-xl uppercase p-8 border rounded-xl ${feedback.type === 'success' ? 'text-green-400 border-green-500/50 bg-green-900/50 shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'text-red-500 border-red-500/50 bg-red-900/80 shadow-[0_0_30px_rgba(220,38,38,0.8)]'}`}>
                        {feedback.text}
                      </motion.div>
                    ) : (
                      <React.Fragment key={bossPhase}>{renderBattleUI()}</React.Fragment>
                    )}
                 </AnimatePresence>
               </div>
            </motion.div>
          )}

          {phase === 'end' && (
            <motion.div key="end" initial={{opacity:0, y: 50}} animate={{opacity:1, y: 0}} className="w-full max-w-4xl mx-auto p-8 bg-black/90 backdrop-blur-xl rounded-2xl border border-yellow-500 shadow-[0_0_60px_rgba(234,179,8,0.4)] flex flex-col items-center">
               <div className="flex items-center gap-4 mb-6">
                 <Award size={40} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
                 <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 tracking-tighter uppercase">COMPILER'S BLESSING — VICTORY</h2>
                 <Award size={40} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
               </div>
               
               <div className="mb-6 w-full max-h-[40vh] overflow-y-auto">
                 <StoryDialogue speaker="SYSTEM" text="The Demon King has suffered a Fatal Exception. You have flawlessly integrated variables, logic, loops, sequences, functions, and objects to restore Asterveil's source code! The sky clears as corrupted nodes compile perfectly. The world breathes life once again as golden light flows through the data streams of the planet. Your legend as the Grand Architect is etched eternally into the core registry." pitch={1.2} rate={0.9} />
               </div>

               <button onClick={() => navigate('/map')} className="px-10 py-4 bg-yellow-500 text-black font-black tracking-widest rounded-xl shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:bg-white transition-all text-lg uppercase hover:scale-105 cursor-pointer">
                 RETURN AS A CHAMPION (TO MAP)
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

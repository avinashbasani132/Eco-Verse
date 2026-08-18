import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ShieldAlert, Crosshair, Hexagon, Flame, Shield, Award, ArrowLeft } from 'lucide-react';
import AudioEngine from '../../utils/AudioEngine';
import StoryDialogue from '../../components/StoryDialogue';

export default function Level7() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [phase, setPhase] = useState('intro_title'); // intro_title -> intro_image -> scene -> battle -> end
  const [bossPhase, setBossPhase] = useState(0);

  const [heroHp, setHeroHp] = useState(10);
  const [heroMana, setHeroMana] = useState(10);
  const [bossHp, setBossHp] = useState(100);
  
  const [feedback, setFeedback] = useState(null);
  const [screenShake, setScreenShake] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/levels/7').then(res => setData(res.data)).catch(console.error);
    AudioEngine.playDarkAmbient(); // Play ambient boss theme
    return () => AudioEngine.stop();
  }, []);

  // Sync bossPhase 4 to phase 'end'
  useEffect(() => {
    if (bossPhase === 4 && phase !== 'end') {
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
      setTimeout(() => { setFeedback(null); setBossPhase(p=>p+1); }, 2500);
    } else {
      triggerShake();
      setHeroHp(prev => prev - 10);
      setFeedback({ type: 'error', text: 'FATAL LOGIC ERROR! You took massive damage.' });
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const renderBattleUI = () => {
    switch(bossPhase) {
      case 0:
        return (
          <motion.div initial={{opacity:0, scale: 0.9}} animate={{opacity:1, scale: 1}} className="flex flex-col gap-6">
            <h3 className="text-xl font-bold font-mono text-red-400">Phase 1: Conditions</h3>
            <p className="text-white text-lg">The void strikes instantly for 10 damage! Your HP is {heroHp}. Choose the correct condition block!</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={() => handleLogic(true, 10, 'Logic executed! You healed before the strike hit!', 20)} className="bg-gray-800 p-4 font-mono text-white hover:bg-red-900 border border-gray-600 rounded text-left">if (hp &lt;= 10): heal()</button>
              <button onClick={() => handleLogic(false, 0, '')} className="bg-gray-800 p-4 font-mono text-white hover:bg-gray-700 border border-gray-600 rounded text-left">attack()</button>
              <button onClick={() => handleLogic(false, 0, '')} className="bg-gray-800 p-4 font-mono text-white hover:bg-gray-700 border border-gray-600 rounded text-left">run()</button>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{opacity:0, x: 50}} animate={{opacity:1, x:0}} className="flex flex-col gap-6">
            <h3 className="text-xl font-bold font-mono text-red-400">Phase 2: Loops</h3>
            <p className="text-white text-lg">The Null Pointer spawns an array of 100 corrupted minions!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => handleLogic(false, 0, '')} className="bg-gray-800 text-white p-6 border-red-900 border hover:bg-red-900/30 rounded font-bold">Defeat them manually 100 times</button>
              <button onClick={() => handleLogic(true, 40, 'The automated loop cleared the horde!', 0)} className="bg-gray-800 text-white p-6 border-green-900 border hover:bg-green-900/30 rounded font-bold">Use a `for` loop to cast AoE</button>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{opacity:0, scale: 0.8}} animate={{opacity:1, scale:1}} className="flex flex-col gap-6">
            <h3 className="text-xl font-bold font-mono text-red-400">Phase 3: Functions</h3>
            <p className="text-white text-lg">"I AM SHIFTING MY TYPE DYNAMICALLY!" What built-in function reveals data types?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={() => handleLogic(true, 40, 'Type exposed! His vulnerability is open!', 0)} className="bg-gray-800 text-white p-4 font-mono hover:bg-purple-900 border border-purple-500 rounded text-center">type()</button>
              <button onClick={() => handleLogic(false, 0, '')} className="bg-gray-800 text-white p-4 font-mono hover:bg-gray-700 border border-gray-600 rounded text-center">find()</button>
              <button onClick={() => handleLogic(false, 0, '')} className="bg-gray-800 text-white p-4 font-mono hover:bg-gray-700 border border-gray-600 rounded text-center">get_identity()</button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{opacity:0, y: 50}} animate={{opacity:1, y:0}} className="flex flex-col gap-6">
            <h3 className="text-xl font-bold font-mono text-red-400">Phase 4: Classes & Objects</h3>
            <p className="text-white text-lg font-black tracking-widest text-center text-red-500">"I WILL DELETE YOUR HERO OBJECT FROM MEMORY!"</p>
            <p className="text-center text-gray-400">The Null pointer purges your instance. You have only milliseconds to survive!</p>
            <div className="flex flex-col gap-4">
              <button onClick={() => handleLogic(true, 10, 'You re-instantiated yourself! The Boss crashes fatally!', 0)} className="bg-red-900 text-white p-6 tracking-widest font-black uppercase shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:bg-red-700 rounded text-center text-2xl border-4 border-red-500 transition-transform hover:scale-105">
                Hero()  /* Re-Instantiate Object */
              </button>
            </div>
          </motion.div>
        );
      case 4:
         return null; // Handled in main render to clear the battle interface
      default: return null;
    }
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black flex flex-col justify-end items-center overflow-hidden ${screenShake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
      
      {/* Dynamic Background Image */}
      <AnimatePresence mode="crossfade">
        {phase !== 'intro_title' && (
          <motion.img
             key={phase}
             initial={{ opacity: 0, scale: 1.05 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 1 }}
             src={phase === 'end' ? "/images/ending_victory_1774588389553.png" : "/images/boss_intro_1774588338360.png"}
             className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className={`absolute inset-0 pointer-events-none ${phase === 'intro_title' ? 'bg-black' : (phase === 'end' ? 'bg-gradient-to-t from-black via-black/40 to-transparent' : 'bg-gradient-to-t from-black via-black/40 to-transparent')}`} />

      {/* Top Bar Navigation */}
      <div className="absolute top-6 left-6 z-50">
        <button onClick={() => navigate('/story/map')} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 uppercase font-mono tracking-widest text-xs">
          <ArrowLeft size={16} /> Hub
        </button>
      </div>

      {heroHp <= 0 && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <h1 className="text-red-600 text-4xl md:text-6xl font-black tracking-[0.5em] mb-8 drop-shadow-[0_0_30px_rgba(220,38,38,1)] text-center">SYS_FAILURE</h1>
          <button onClick={() => window.location.reload()} className="text-white border border-red-600 bg-red-900/20 px-8 py-3 font-mono tracking-widest transition hover:bg-red-600 hover:text-black">REBOOT KERNEL</button>
        </div>
      )}

      <div className="relative z-40 w-full max-w-5xl px-4 md:px-6 pb-12">
        <AnimatePresence mode="wait">
          {phase === 'intro_title' && (
            <motion.div key="intro_title" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('intro_image')} className="fixed inset-0 z-[100] cursor-pointer bg-black flex flex-col justify-center items-center px-4">
              <h1 className="text-5xl md:text-7xl text-red-600 font-black tracking-tighter mb-8 drop-shadow-[0_0_50px_rgba(220,38,38,1)] uppercase text-center">FINAL BOSS: THE DEMON KING'S THRONE</h1>
              <p className="text-center text-red-500/60 font-mono text-xs md:text-sm tracking-[0.3em] mt-8 animate-pulse uppercase">CLICK TO APPROACH THRONE</p>
            </motion.div>
          )}

          {phase === 'intro_image' && (
            <motion.div key="intro_image" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('scene')} className="cursor-pointer w-full text-center">
              <div className="max-w-3xl mx-auto mb-10 w-full shadow-[0_0_50px_rgba(220,38,38,0.3)]">
                <StoryDialogue speaker="NARRATOR" text={data?.intro_text || "The void calls..."} />
              </div>
              <p className="text-center text-red-500/60 font-mono text-xs md:text-sm tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO CONFRONT VHARZUL</p>
            </motion.div>
          )}

          {phase === 'scene' && (
            <motion.div key="scene" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setPhase('battle')} className="cursor-pointer w-full text-center">
              <div className="max-w-3xl mx-auto mb-10 w-full shadow-[0_0_50px_rgba(220,38,38,0.6)]">
                 <StoryDialogue speaker={data.scenes?.[0]?.speaker || "VHARZUL"} text={data.scenes?.[0]?.text || "NO ESCAPE FROM THE VOID."} />
              </div>
              <p className="text-center text-red-500/60 font-mono text-xs md:text-sm tracking-[0.3em] mt-4 animate-pulse uppercase">CLICK TO INITIATE BATTLE SEQUENCE</p>
            </motion.div>
          )}

          {phase === 'battle' && bossPhase < 4 && (
            <motion.div key="battle" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="flex flex-col gap-6 w-full max-w-4xl mx-auto relative mt-10">
               
               {/* BOSS HUD */}
               <div className="flex flex-col items-center mb-6 relative">
                  <Hexagon size={60} className={`text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] mb-2 ${bossHp <= 0 ? 'opacity-0 scale-50 transition-all duration-1000' : 'animate-pulse'}`} />
                  <h1 className="text-2xl md:text-3xl text-red-500 font-black tracking-[0.3em] uppercase absolute -top-4 opacity-50 blur-[2px]">THE NULL POINTER</h1>
                  <h1 className="text-2xl md:text-3xl text-white font-black tracking-[0.3em] uppercase z-10 relative">THE NULL POINTER</h1>
                  
                  <div className="w-full max-w-2xl bg-gray-900 h-6 mt-4 rounded-full overflow-hidden border border-red-900 relative shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                    <div className="absolute inset-0 bg-red-600 transition-all duration-500" style={{ width: `${bossHp}%` }}></div>
                    <span className="absolute inset-0 flex justify-center items-center font-black text-xs text-white drop-shadow-md">{bossHp}% CORRUPTION</span>
                  </div>
               </div>

               {/* HERO HUD */}
               <div className="flex justify-between w-full max-w-2xl mx-auto mb-2 font-mono font-bold text-sm md:text-base">
                  <div className="flex items-center gap-2 text-green-400 bg-green-900/50 px-4 py-2 border border-green-500/50 rounded shadow-[0_0_15px_rgba(34,197,94,0.3)]"><Shield size={16} /> HP: {heroHp}</div>
                  <div className="flex items-center gap-2 text-blue-400 bg-blue-900/50 px-4 py-2 border border-blue-500/50 rounded shadow-[0_0_15px_rgba(59,130,246,0.3)]"><Flame size={16} /> MP: {heroMana}</div>
               </div>

               {/* BATTLE INTERFACE */}
               <div className="bg-black/80 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-red-900/50 shadow-[0_0_50px_rgba(220,38,38,0.15)] min-h-[300px] flex flex-col justify-center">
                 <AnimatePresence mode="wait">
                    {feedback ? (
                      <motion.div key="feedback" initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0}} className={`text-center font-black tracking-widest text-xl md:text-2xl uppercase p-10 border rounded ${feedback.type === 'success' ? 'text-green-400 border-green-500/50 bg-green-900/50' : 'text-red-500 border-red-500/50 bg-red-900/80 shadow-[0_0_30px_rgba(220,38,38,0.8)]'}`}>
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
            <motion.div key="end" initial={{opacity:0, y: 50}} animate={{opacity:1, y: 0}} className="w-full max-w-4xl mx-auto p-6 md:p-8 bg-black/80 backdrop-blur-md rounded-2xl border border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)] flex flex-col items-center mt-auto">
               <div className="flex items-center gap-4 mb-6">
                 <Award size={40} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
                 <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-600 tracking-tighter uppercase">COMPILER'S BLESSING</h2>
                 <Award size={40} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
               </div>
               
               <div className="mb-6 w-full max-h-[40vh] overflow-y-auto">
                 <StoryDialogue speaker="SYSTEM" text="The Demon King has suffered a Fatal Exception. You have flawlessly integrated variables, logic, loops, sequences, functions, and objects to restore Asterveil's source code! The sky clears as corrupted nodes compile perfectly. The world breathes life once again as golden light flows through the data streams of the planet. Your legend as the Grand Architect is etched eternally into the core registry." pitch={1.2} rate={0.9} />
               </div>

               <button onClick={() => navigate('/story/map')} className="px-8 py-4 bg-yellow-500 text-black font-black tracking-widest rounded shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:bg-white transition-all text-lg uppercase hover:scale-105">RETURN AS A CHAMPION</button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Tailwind specific shake animation needs to be in global css, but React state manages it here */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
      `}} />
    </div>
  );
}

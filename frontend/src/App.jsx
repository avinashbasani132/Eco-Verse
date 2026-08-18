import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, BookOpen, Zap, Map as MapIcon, Lock, PlayCircle,
  ShieldCheck, Search, Loader2, Download, CheckCircle,
  AlertTriangle, Code2, ArrowLeft, Crown, Skull, Star
} from 'lucide-react';
import axios from 'axios';

import Intro from './pages/levels/Intro';
import Level1 from './pages/levels/Level1';
import Level2 from './pages/levels/Level2';
import Level3 from './pages/levels/Level3';
import Level4 from './pages/levels/Level4';
import Level5 from './pages/levels/Level5';
import Level6 from './pages/levels/Level6';
import Level7 from './pages/levels/Level7';
// ==========================================
// SHARED UI COMPONENTS
// ==========================================

const AnimatedCard = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: delay }}
      className={`glass-panel p-6 md:p-8 bg-black/40 border-t border-white/10 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const TypewriterText = ({ text, delay = 0, speed = 20, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          if (onComplete) onComplete();
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return (
    <div className="relative inline-block font-mono leading-relaxed">
      {displayedText}
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 bg-emerald-400 ml-1 h-[1em] align-middle"
        />
      )}
    </div>
  );
};

const renderLessonText = (text) => {
  if (!text) return null;
  const parts = text.split(/```/);

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      const lines = part.trim().split('\n');
      const lang = lines[0].match(/^[a-z]+$/i) ? lines.shift() : 'CODE';
      return (
        <div key={index} className="bg-[#0d1117] rounded-xl my-6 border border-gray-700 overflow-hidden shadow-2xl">
          <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
            <Code2 size={16} className="text-cyan-400" />
            <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">{lang}</span>
          </div>
          <pre className="p-5 overflow-x-auto text-green-400 font-mono text-sm leading-relaxed">
            <code>{lines.join('\n')}</code>
          </pre>
        </div>
      );
    }
    return <p key={index} className="mb-4 text-gray-200 leading-relaxed text-lg whitespace-pre-wrap">{part}</p>;
  });
};

// ==========================================
// PAGES
// ==========================================

const Home = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-[70vh] gap-12"
    >
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-500 to-cyan-400 drop-shadow-md">
          SYSTEM RESTORATION
        </h2>
        <p className="text-xl text-gray-400 font-medium tracking-wide">Select your deployment sequence</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 z-10">
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/map')}
          className="relative group bg-black/40 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 overflow-hidden rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-20 h-20 mb-6 rounded-full bg-gray-900 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all">
            <BookOpen className="text-emerald-400 w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">STORY MODE</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Follow the 7-level campaign to repair corrupted ecosystem nodes.</p>
        </motion.button>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/scan')}
          className="relative group bg-black/40 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 overflow-hidden rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-20 h-20 mb-6 rounded-full bg-gray-900 border border-cyan-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all">
            <Zap className="text-cyan-400 w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">DYNAMIC SCAN</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Input any anomaly. The AI neural net compiles custom lessons.</p>
        </motion.button>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/roadmap')}
          className="relative group bg-black/40 backdrop-blur-xl border border-white/10 hover:border-purple-400/50 overflow-hidden rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-20 h-20 mb-6 rounded-full bg-gray-900 border border-purple-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all">
            <MapIcon className="text-purple-400 w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">ROLE ROADMAP</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Generate and download a career pathway for any tech role.</p>
        </motion.button>
      </div>
    </motion.div>
  );
};

const StoryMap = () => {
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unlockedLevel, setUnlockedLevel] = useState(1);

  useEffect(() => {
    const savedProgress = localStorage.getItem('ecoVerseUnlocked');
    if (savedProgress) setUnlockedLevel(parseInt(savedProgress, 10));

    const fetchCampaign = async () => {
      try {
        const hardcodedCampaign = [
          { id: 'intro', title: 'Prologue: The Fall of Asterveil', environmental_theme: 'Intro', programming_concept: 'Cinematic' },
          { id: 1, title: 'The Summoning of the Hero', environmental_theme: 'Chapter 1', programming_concept: 'Variables & Data Types' },
          { id: 2, title: 'The Trial of Weapons', environmental_theme: 'Chapter 2', programming_concept: 'If / Elif / Else' },
          { id: 3, title: 'The Endless Horde', environmental_theme: 'Chapter 3', programming_concept: 'Loops' },
          { id: 4, title: 'The Vault of Relics', environmental_theme: 'Chapter 4', programming_concept: 'Data Structures' },
          { id: 5, title: 'The Spellcraft Library', environmental_theme: 'Chapter 5', programming_concept: 'Functions' },
          { id: 6, title: 'The Guild of Living Armor', environmental_theme: 'Chapter 6', programming_concept: 'Classes and Objects' },
          { id: 7, title: 'Final Siege: The Demon King’s Throne', environmental_theme: 'Chapter 7', programming_concept: 'Full Integration' }
        ];
        setCampaign(hardcodedCampaign);
      } catch (error) {
        console.error("Failed to load map:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[60vh]">
        <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mb-4" />
        <p className="text-emerald-500 font-mono tracking-widest animate-pulse">Scanning Grid...</p>
      </div>
    );
  }

  // Fixed positions for 8 nodes to create a beautiful sweeping kingdom map!
  const mapPositions = [
    { x: 150, y: 300 }, // Prologue
    { x: 450, y: 150 }, // L1
    { x: 750, y: 350 }, // L2
    { x: 1050, y: 150 }, // L3
    { x: 1350, y: 300 }, // L4
    { x: 1650, y: 150 }, // L5
    { x: 1950, y: 350 }, // L6
    { x: 2300, y: 250 }, // Boss
  ];

  const totalWidth = 2600;

  const generatePath = () => {
    if (mapPositions.length === 0) return '';
    let d = `M ${mapPositions[0].x} ${mapPositions[0].y}`;
    for (let i = 1; i < mapPositions.length; i++) {
        const prev = mapPositions[i - 1];
        const curr = mapPositions[i];
        const midX = (prev.x + curr.x) / 2;
        d += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center w-full min-h-screen relative pt-10"
    >
      <div className="absolute top-10 text-center z-20 bg-black/50 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
        <h2 className="text-3xl md:text-5xl font-black mb-2 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] tracking-wider">
          ASTERVEIL KINGDOM
        </h2>
        <p className="text-cyan-400 font-mono font-bold tracking-[0.3em] uppercase">Sector {Math.min(unlockedLevel, 7)} Cleared</p>
      </div>

      {/* Map Container - Full custom scrollable viewport */}
      <div className="w-[95vw] md:w-[90vw] h-[550px] overflow-x-auto overflow-y-hidden relative mt-40 shadow-[inset_0_0_100px_rgba(0,0,0,1)] border-y border-white/5 bg-gray-950/80 rounded-xl" style={{ scrollbarWidth: 'none' }}>
        
        {/* Inner SVG/Map Layer */}
        <div className="relative h-full" style={{ width: `${totalWidth}px` }}>

          {/* SVG Road Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0px 0px 10px rgba(6,182,212,0.3))'}}>
            <path 
              d={generatePath()} 
              fill="transparent" 
              stroke="#1f2937" 
              strokeWidth="12" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="opacity-70"
            />
            {/* Overlay a glowing active line */}
             <path 
              d={generatePath()} 
              fill="transparent" 
              stroke="url(#gradient)" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeDasharray="20, 10"
              className="animate-[dash_30s_linear_infinite]"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>

          {/* Render Nodes */}
          {campaign.map((level, i) => {
             const isIntro = level.id === 'intro';
             const levelNum = isIntro ? 0 : parseInt(level.id);
             const isUnlocked = isIntro ? true : levelNum <= unlockedLevel;
             const isCompleted = isIntro ? unlockedLevel >= 1 : levelNum < unlockedLevel;
             const isCurrent = isIntro ? false : levelNum === unlockedLevel;
             const isBoss = level.id === 7;
             const pos = mapPositions[i];

             return (
               <motion.div
                 key={level.id}
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                 className={`absolute z-10 flex flex-col items-center group cursor-pointer origin-center -translate-x-1/2 -translate-y-1/2`}
                 style={{ left: pos.x, top: pos.y }}
                 onClick={() => { if (isUnlocked) navigate(`/level/${level.id}`); }}
               >
                 
                 {/* Tooltip on Hover */}
                 <div className="absolute bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/95 p-4 rounded-xl border border-white/20 whitespace-nowrap z-50 pointer-events-none shadow-2xl flex flex-col items-center backdrop-blur-md">
                    <div className="font-black text-white text-lg drop-shadow">{level.title}</div>
                    <div className="text-xs font-mono text-cyan-400 mt-1">{level.programming_concept}</div>
                 </div>

                 {/* Node Graphic */}
                 <div className={`
                    relative flex items-center justify-center rounded-full transition-all duration-300
                    ${isBoss ? 'w-24 h-24' : 'w-16 h-16'}
                    ${isUnlocked 
                       ? (isBoss 
                            ? 'bg-red-950 border-4 border-red-500 shadow-[0_0_50px_rgba(220,38,38,0.8)] hover:scale-110' 
                            : (isCompleted 
                                ? 'bg-zinc-900 border-4 border-emerald-500 hover:scale-110 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                                : 'bg-cyan-950 border-4 border-cyan-400 hover:scale-110 shadow-[0_0_30px_rgba(6,182,212,0.8)] animate-pulse'
                              )
                         )
                       : 'bg-gray-900 border-4 border-gray-700 grayscale brightness-50 hover:scale-105'
                    }
                 `}>
                   {isBoss ? (
                      isUnlocked ? <Skull size={40} className="text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,1)]" /> : <Lock size={30} className="text-gray-500" />
                   ) : (
                      isCompleted ? <Star size={24} className="text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,1)]" /> 
                      : (isCurrent ? <PlayCircle size={30} className="text-cyan-300" /> : <Lock size={24} className="text-gray-500" />)
                   )}
                   
                   {/* Node Label underneath */}
                   <div className={`absolute top-[110%] font-black text-sm whitespace-nowrap px-4 py-1.5 rounded-full shadow-lg border border-white/10 tracking-widest ${isUnlocked ? (isBoss ? 'bg-red-950/90 text-red-500' : 'bg-black/80 text-white') : 'bg-black/80 text-gray-500'}`}>
                     {isIntro ? 'PROLOGUE' : (isBoss ? 'FINAL BOSS' : `SECTOR 0${level.id}`)}
                   </div>
                 </div>
               </motion.div>
             );
          })}
        </div>
      </div>

      <button
        onClick={() => navigate('/')}
        className="fixed bottom-6 left-6 z-50 text-white/50 hover:text-white bg-black/50 px-6 py-3 rounded-full border border-white/10 transition backdrop-blur-md cursor-pointer font-mono tracking-widest flex gap-2 items-center"
      >
        <ArrowLeft size={16} /> RETURN TO HUB
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
      `}} />
    </motion.div>
  );
};

const DynamicScanner = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setIsScanning(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/generate-dynamic', { topic });
      navigate('/level/dynamic', { state: { levelData: response.data } });
    } catch (err) {
      console.error(err);
      setError("Scanner Interference Detected. Please try another query.");
      setIsScanning(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh]"
    >
      <div className="text-center mb-12 w-full">
        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
          DYNAMIC SCANNER
        </h2>
        <p className="text-gray-400 text-lg md:text-xl">Input any anomaly. The system will compile a custom diagnostic protocol.</p>
      </div>

      <AnimatedCard className="w-full relative overflow-hidden ring-1 ring-cyan-400/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] rounded-2xl bg-black/60 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-6 h-6" />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isScanning}
              placeholder="e.g. Python Loops, Arrays, Object Oriented Programming..."
              className="w-full bg-black/80 border-2 border-cyan-400/40 rounded-xl py-5 pl-14 pr-6 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
            />
          </div>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-400 text-center font-mono text-sm bg-red-900/20 py-2 rounded"
              >
                [ ERROR: {error} ]
              </motion.div>
            )}
          </AnimatePresence>
          <button
            type="submit"
            disabled={!topic.trim() || isScanning}
            className={`w-full py-4 rounded-xl font-bold text-lg tracking-widest transition-all ${isScanning
              ? "bg-cyan-400/20 text-cyan-400/50 cursor-not-allowed border-2 border-cyan-400/30"
              : "bg-cyan-400 hover:bg-white hover:text-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)]"
              }`}
          >
            {isScanning ? (
              <span className="flex items-center justify-center gap-3">
                <Loader2 className="animate-spin" /> COMPILING PROTOCOL...
              </span>
            ) : "INITIATE SCAN"}
          </button>
        </form>

        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center pointer-events-none"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full mb-6"
              />
              <p className="text-cyan-400 font-mono tracking-[0.3em] animate-pulse">ACCESSING NEURAL NET...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatedCard>

      <button onClick={() => navigate('/')} className="mt-12 text-gray-500 hover:text-white transition cursor-pointer font-mono tracking-widest group">
        <span className="group-hover:-translate-x-2 inline-block transition-transform">←</span> RETURN TO HUB
      </button>
    </motion.div>
  );
};

const Roadmap = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [downloaded, setDownloaded] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!role.trim()) return;
    setLoading(true);
    setRoadmap(null);
    setDownloaded(false);

    try {
      const res = await axios.post('http://localhost:5000/api/generate-roadmap', { role });
      setRoadmap(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate roadmap. System error.");
    } finally {
      setLoading(false);
    }
  };

  const downloadRoadmapPDF = () => {
    if (!roadmap) return;

    // Leverage the browser's native window.print() functionality for PDF generation 
    // to bypass missing third-party module dependencies.
    const printWindow = window.open('', '', 'width=900,height=700');

    const htmlContent = `
      <html>
        <head>
          <title>${roadmap.role} Roadmap</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1f2937; line-height: 1.6; padding: 40px; max-width: 800px; margin: auto; }
            h1 { color: #7e22ce; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; font-size: 28px; text-transform: uppercase; letter-spacing: 1px;}
            h2 { color: #374151; margin-top: 35px; font-size: 20px; }
            ul { list-style-type: none; padding-left: 0; }
            li { margin-bottom: 12px; padding-left: 24px; position: relative; font-size: 15px; }
            li:before { content: "▹"; color: #9333ea; position: absolute; left: 0; font-weight: bold; font-size: 18px; line-height: 1; }
            .desc { font-size: 16px; color: #4b5563; font-style: italic; background-color: #f3f4f6; padding: 15px; border-left: 4px solid #9333ea; border-radius: 4px;}
            .footer { margin-top: 60px; font-size: 12px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; text-transform: uppercase; letter-spacing: 2px; }
            @media print {
              body { padding: 0; }
              .page-break { page-break-before: always; }
            }
          </style>
        </head>
        <body>
          <h1>TECH ROADMAP: ${roadmap.role}</h1>
          <p class="desc">${roadmap.description}</p>
          ${roadmap.phases.map((phase, i) => `
            <div style="page-break-inside: avoid;">
              <h2>Phase ${i + 1}: ${phase.phase_name}</h2>
              <ul>
                ${phase.concepts.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
          <div class="footer">Generated by Eco-Verse Core Intelligence</div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();

    // Slight delay ensures the styles render before the print dialog opens
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-[70vh] items-center">
      <div className="text-center mb-10 w-full">
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center gap-4">
          <MapIcon className="text-purple-400" size={40} /> ROADMAP ARCHITECT
        </h2>
        <p className="text-gray-400 text-lg">Input a technology role to compile a step-by-step career logic sequence.</p>
      </div>

      {!roadmap && (
        <AnimatedCard className="w-full max-w-xl p-8 border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.1)]">
          <form onSubmit={handleGenerate} className="flex flex-col gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-6 h-6" />
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
                placeholder="e.g. Full Stack Developer, Data Scientist..."
                className="w-full bg-black/60 border-2 border-purple-500/40 rounded-xl py-4 pl-14 pr-6 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={!role.trim() || loading}
              className={`w-full py-4 rounded-xl font-bold text-lg tracking-widest transition-all ${loading ? "bg-purple-900/50 text-purple-300 border-2 border-purple-500/30" : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <Loader2 className="animate-spin" /> COMPILING...
                </span>
              ) : "GENERATE PATHWAY"}
            </button>
          </form>
        </AnimatedCard>
      )}

      <AnimatePresence>
        {roadmap && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 bg-purple-900/20 p-6 rounded-2xl border border-purple-500/30">
              <div>
                <h3 className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-1">Generated Pathway</h3>
                <h2 className="text-3xl font-black text-white">{roadmap.role}</h2>
                <p className="text-gray-300 mt-2 max-w-xl">{roadmap.description}</p>
              </div>
              <button onClick={downloadRoadmapPDF} className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shrink-0">
                {downloaded ? <CheckCircle size={20} className="text-green-600" /> : <Download size={20} />}
                {downloaded ? "PDF READY" : "PRINT AS PDF"}
              </button>
            </div>
            <div className="relative border-l-2 border-purple-500/30 ml-4 pl-8 pb-8 space-y-8">
              {roadmap.phases.map((phase, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[41px] top-4 w-5 h-5 bg-purple-500 rounded-full border-4 border-[#020617] shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                  <AnimatedCard delay={idx * 0.1} className="p-6 border border-gray-800 bg-black/40 hover:border-purple-500/40 transition-colors">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">{phase.phase_name}</h4>
                    <ul className="space-y-3">
                      {phase.concepts.map((concept, i) => (
                        <li key={i} className="text-gray-300 flex items-start gap-3 text-lg">
                          <span className="text-purple-500 mt-1">▹</span> {concept}
                        </li>
                      ))}
                    </ul>
                  </AnimatedCard>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button onClick={() => { setRoadmap(null); setRole(''); }} className="text-gray-500 hover:text-white transition-colors font-mono tracking-widest uppercase">
                ← Generate New Pathway
              </button>
              <button onClick={() => navigate('/')} className="ml-6 text-gray-500 hover:text-white transition-colors font-mono tracking-widest uppercase">
                Return to Hub
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LevelView = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isDynamicRoute = location.pathname.includes('/level/dynamic');

  const [levelData, setLevelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [storyFinished, setStoryFinished] = useState(false);

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameState, setGameState] = useState('playing');

  useEffect(() => {
    if (isDynamicRoute || id === 'dynamic') {
      if (location.state?.levelData) {
        setLevelData(location.state.levelData);
        setLoading(false);
      } else {
        navigate('/scan');
      }
      return;
    }

    const fetchLevel = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaign');
        const level = response.data.find(l => parseInt(l.id) === parseInt(id));
        if (level) {
          setLevelData(level);
        } else {
          navigate('/map');
        }
      } catch (err) {
        console.error("Failed to load level", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLevel();
  }, [id, location.state, navigate]);

  useEffect(() => {
    if (levelData && !levelData.story_text) {
      setStoryFinished(true);
    }
  }, [levelData]);

  const handleOptionSelect = (index) => {
    if (!levelData?.quizzes || gameState !== 'playing') return;

    setSelectedOption(index);
    const currentQuiz = levelData.quizzes[currentQuizIndex];

    if (index === currentQuiz.correct_index) {
      if (currentQuizIndex < levelData.quizzes.length - 1) {
        setTimeout(() => {
          setCurrentQuizIndex(prev => prev + 1);
          setSelectedOption(null);
        }, 1000);
      } else {
        setTimeout(() => {
          setGameState('restored');
          if (!isDynamicRoute && id !== 'dynamic') {
            const unlocked = parseInt(localStorage.getItem('ecoVerseUnlocked')) || 1;
            if (parseInt(id) >= unlocked) {
              localStorage.setItem('ecoVerseUnlocked', parseInt(id) + 1);
            }
          }
        }, 800);
      }
    } else {
      setTimeout(() => {
        setGameState('glitched');
      }, 800);
    }
  };

  if (loading || !levelData) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[60vh]">
        <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mb-4" />
        <p className="font-mono text-emerald-500 tracking-widest">DECRYPTING SECTOR DATA...</p>
      </div>
    );
  }

  const isDynamic = isDynamicRoute || id === 'dynamic';
  const themeColor = isDynamic ? 'cyan-400' : 'emerald-500';
  const currentQuiz = levelData?.quizzes ? levelData.quizzes[currentQuizIndex] : null;

  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-[70vh] pb-24 relative pt-16 mt-4">
      {/* Top Bar for Navigation */}
      <div className="absolute top-0 left-0 z-50 mb-4">
        <button onClick={() => navigate(isDynamic ? '/scan' : '/map')} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 uppercase font-mono tracking-widest text-xs">
          <ArrowLeft size={16} /> {isDynamic ? 'Scanner' : 'Hub'}
        </button>
      </div>

      <AnimatedCard delay={0.1} className={`mb-8 border-t-2 border-${themeColor}`}>
        <div className="flex justify-between items-start flex-col md:flex-row gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs font-mono font-bold tracking-widest text-${themeColor}`}>
                {isDynamic ? "DYNAMIC DIAGNOSTIC" : `SECTOR 0${levelData.id}`}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white">{levelData.title}</h2>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            {!isDynamic && (
              <span className={`bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded font-bold text-sm outline outline-1 outline-emerald-500/30`}>
                {levelData.environmental_theme}
              </span>
            )}
            <span className="bg-purple-900/40 text-purple-400 px-3 py-1 rounded font-bold text-sm outline outline-1 outline-purple-500/30">
              {levelData.programming_concept}
            </span>
          </div>
        </div>
      </AnimatedCard>

      {levelData.story_text && (
        <AnimatedCard delay={0.2} className="mb-8 p-8 bg-black/60 shadow-xl border border-gray-800">
          <div className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
            <TypewriterText text={levelData.story_text} speed={25} delay={300} onComplete={() => setStoryFinished(true)} />
          </div>
        </AnimatedCard>
      )}

      <AnimatePresence>
        {storyFinished && levelData.lesson_text && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-8 bg-blue-950/30 rounded-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-blue-500/20 pb-4">
              <ShieldCheck className="text-blue-400" size={24} />
              <h3 className="text-blue-400 font-bold tracking-widest text-sm uppercase">AI Core Tutor Analysis</h3>
            </div>
            <div className="space-y-2">
              {renderLessonText(levelData.lesson_text)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {storyFinished && currentQuiz && gameState === 'playing' && (
          <motion.div
            key={currentQuizIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="flex justify-between items-center bg-gray-900/80 p-4 rounded-xl border border-gray-700 shadow-inner">
              <span className="text-gray-400 font-mono text-sm tracking-widest">DIAGNOSTIC PUZZLE</span>
              <div className="flex items-center gap-2">
                {levelData.quizzes.map((_, idx) => (
                  <div key={idx} className={`w-3 h-3 rounded-full ${idx === currentQuizIndex ? `bg-${themeColor} shadow-[0_0_10px_currentColor]` : idx < currentQuizIndex ? 'bg-green-500' : 'bg-gray-700'}`} />
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-snug">
              {currentQuiz.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuiz.options.map((option, index) => {
                let buttonStyle = "bg-black/60 border-gray-700 hover:border-white text-gray-300 hover:text-white";
                if (selectedOption !== null) {
                  if (index === currentQuiz.correct_index) buttonStyle = "bg-green-900/60 border-green-500 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.3)]";
                  else if (index === selectedOption) buttonStyle = "bg-red-900/60 border-red-500 text-red-300";
                  else buttonStyle = "bg-black/40 border-gray-800 text-gray-600 opacity-50";
                }

                return (
                  <button
                    key={index}
                    disabled={selectedOption !== null}
                    onClick={() => handleOptionSelect(index)}
                    className={`p-6 text-left border-2 rounded-xl text-lg transition-all flex items-center gap-4 group ${buttonStyle}`}
                  >
                    <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${selectedOption !== null && index === currentQuiz.correct_index ? 'border-green-500 bg-green-500/20' : 'border-gray-600 group-hover:border-white'}`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {gameState === 'restored' && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md">
          <div className="absolute inset-0 bg-green-500/10 animate-pulse pointer-events-none" />
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="text-center flex flex-col items-center p-6 relative z-50"
          >
            <div className="w-40 h-40 bg-green-500/20 rounded-full flex items-center justify-center border-4 border-green-500 mb-8 shadow-[0_0_150px_rgba(34,197,94,0.8)]">
              <ShieldCheck size={80} className="text-green-500" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">SYSTEM RESTORED</h1>
            <p className="text-green-500 text-2xl font-mono tracking-widest uppercase mb-12">All anomalies resolved.</p>

            <button
              onClick={() => navigate(isDynamic ? '/scan' : '/map')}
              className="px-12 py-5 bg-green-500 text-black font-black tracking-widest rounded-xl hover:bg-white transition-colors text-xl shadow-[0_0_30px_rgba(34,197,94,0.5)] cursor-pointer"
            >
              RETURN TO HUB
            </button>
          </motion.div>
        </div>
      )}

      {gameState === 'glitched' && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md">
          <div className="absolute inset-0 bg-red-900/10 animate-pulse pointer-events-none" />
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
            className="text-center flex flex-col items-center p-6 relative z-50"
          >
            <div className="w-40 h-40 bg-red-900/20 rounded-full flex items-center justify-center border-4 border-red-500 mb-8 shadow-[0_0_150px_rgba(239,68,68,0.8)]">
              <AlertTriangle size={80} className="text-red-500" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">GLITCH DETECTED</h1>
            <p className="text-red-400 text-2xl font-mono tracking-widest uppercase mb-12">Logic mismatch. System integrity failing.</p>

            <div className="flex gap-6">
              <button
                onClick={() => { setGameState('playing'); setSelectedOption(null); }}
                className="px-10 py-5 bg-red-600 text-white font-black tracking-widest rounded-xl hover:bg-red-500 transition-colors shadow-[0_0_30px_rgba(239,68,68,0.5)] cursor-pointer"
              >
                RETRY PUZZLE
              </button>
              <button
                onClick={() => navigate(isDynamic ? '/scan' : '/map')}
                className="px-10 py-5 border-2 border-red-900 text-red-500 font-bold tracking-widest rounded-xl hover:bg-red-900/30 transition-colors cursor-pointer"
              >
                ABORT
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<StoryMap />} />
        <Route path="/story/map" element={<Navigate to="/map" replace />} />
        <Route path="/scan" element={<DynamicScanner />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/level/dynamic" element={<LevelView />} />
        <Route path="/level/intro" element={<Intro />} />
        <Route path="/level/1" element={<Level1 />} />
        <Route path="/level/2" element={<Level2 />} />
        <Route path="/level/3" element={<Level3 />} />
        <Route path="/level/4" element={<Level4 />} />
        <Route path="/level/5" element={<Level5 />} />
        <Route path="/level/6" element={<Level6 />} />
        <Route path="/level/7" element={<Level7 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

const GlobalHeader = () => {
  const location = useLocation();
  const isLevelRoute = location.pathname.startsWith('/level/');
  if (isLevelRoute) return null;

  return (
    <header className="absolute top-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none border-b border-white/5 bg-black/10 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        >
          <Leaf className="text-emerald-400" size={26} />
        </motion.div>
        <div>
          <h1 className="font-black text-2xl tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 uppercase drop-shadow">
            Eco-Verse
          </h1>
          <p className="text-xs text-cyan-400 tracking-[0.2em] uppercase font-bold">Node Initialization</p>
        </div>
      </div>
    </header>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative selection:bg-cyan-400/30 selection:text-white">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        </div>

        <GlobalHeader />

        <main className="relative z-10 pt-32 pb-12 px-6 flex justify-center min-h-screen align-middle">
          <div className="w-full max-w-7xl">
            <AnimatedRoutes />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
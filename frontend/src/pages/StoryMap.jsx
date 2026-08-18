// frontend/src/pages/StoryMap.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, PlayCircle, Star, Skull, ArrowLeft } from 'lucide-react';

const StoryMap = () => {
  const navigate = useNavigate();
  const [unlockedLevel, setUnlockedLevel] = useState(1);

  const campaign = [
    { id: 'intro', title: 'Prologue: The Fall of Asterveil', chapter: 'Prologue', programming_concept: 'Cinematic Introduction' },
    { id: '1', title: 'The Summoning of the Hero', chapter: 'Sector 01', programming_concept: 'Variables & Data Types' },
    { id: '2', title: 'The Trial of Weapons', chapter: 'Sector 02', programming_concept: 'If / Elif / Else Conditions' },
    { id: '3', title: 'The Endless Horde', chapter: 'Sector 03', programming_concept: 'Loops & Iteration' },
    { id: '4', title: 'The Vault of Relics', chapter: 'Sector 04', programming_concept: 'Lists & Data Structures' },
    { id: '5', title: 'The Spellcraft Library', chapter: 'Sector 05', programming_concept: 'Functions & Modularity' },
    { id: '6', title: 'The Guild of Living Armor', chapter: 'Sector 06', programming_concept: 'Classes & Objects' },
    { id: '7', title: 'Final Siege: The Demon King', chapter: 'Final Boss', programming_concept: 'Full Logic Integration' }
  ];

  useEffect(() => {
    const savedProgress = localStorage.getItem('ecoVerseUnlocked');
    if (savedProgress) {
      setUnlockedLevel(parseInt(savedProgress, 10));
    }
  }, []);

  // Fixed coordinates across map plane for smooth flowing SVG paths
  const mapPositions = [
    { x: 150, y: 280 },  // Prologue
    { x: 450, y: 150 },  // L1
    { x: 750, y: 340 },  // L2
    { x: 1050, y: 160 }, // L3
    { x: 1350, y: 300 }, // L4
    { x: 1650, y: 150 }, // L5
    { x: 1950, y: 340 }, // L6
    { x: 2300, y: 240 }, // Boss
  ];

  const totalWidth = 2500;

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
      className="flex flex-col items-center w-full min-h-screen relative pt-6"
    >
      <div className="text-center z-20 bg-black/50 p-6 rounded-2xl border border-white/10 backdrop-blur-md mb-8">
        <h2 className="text-3xl md:text-5xl font-black mb-2 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] tracking-wider uppercase">
          ASTERVEIL KINGDOM MAP
        </h2>
        <p className="text-cyan-400 font-mono font-bold tracking-[0.3em] uppercase">
          Clearance Status: {unlockedLevel >= 8 ? "All Sectors Cleared (Champion)" : `Sector ${Math.min(unlockedLevel, 7)} / 07`}
        </p>
      </div>

      {/* Map Viewport */}
      <div
        className="w-[95vw] md:w-[90vw] h-[520px] overflow-x-auto overflow-y-hidden relative shadow-[inset_0_0_100px_rgba(0,0,0,1)] border-y border-white/10 bg-gray-950/80 rounded-2xl"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="relative h-full" style={{ width: `${totalWidth}px` }}>
          {/* Connecting SVG Road */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0px 0px 10px rgba(6,182,212,0.3))' }}>
            <path
              d={generatePath()}
              fill="transparent"
              stroke="#1f2937"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70"
            />
            <path
              d={generatePath()}
              fill="transparent"
              stroke="url(#mapGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="20, 10"
              className="animate-[dash_30s_linear_infinite]"
            />
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>

          {/* Interactive Nodes */}
          {campaign.map((level, i) => {
            const isIntro = level.id === 'intro';
            const levelNum = isIntro ? 0 : parseInt(level.id, 10);
            const isUnlocked = isIntro ? true : levelNum <= unlockedLevel;
            const isCompleted = isIntro ? unlockedLevel >= 1 : levelNum < unlockedLevel;
            const isCurrent = isIntro ? false : levelNum === unlockedLevel;
            const isBoss = level.id === '7';
            const pos = mapPositions[i];

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                className="absolute z-10 flex flex-col items-center group cursor-pointer origin-center -translate-x-1/2 -translate-y-1/2"
                style={{ left: pos.x, top: pos.y }}
                onClick={() => {
                  if (isUnlocked) navigate(`/level/${level.id}`);
                }}
              >
                {/* Hover Tooltip */}
                <div className="absolute bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/95 p-4 rounded-xl border border-white/20 whitespace-nowrap z-50 pointer-events-none shadow-2xl flex flex-col items-center backdrop-blur-md">
                  <div className="font-black text-white text-lg drop-shadow">{level.title}</div>
                  <div className="text-xs font-mono text-cyan-400 mt-1">{level.programming_concept}</div>
                </div>

                {/* Node Icon */}
                <div
                  className={`
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
                  `}
                >
                  {isBoss ? (
                    isUnlocked ? (
                      <Skull size={40} className="text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,1)]" />
                    ) : (
                      <Lock size={30} className="text-gray-500" />
                    )
                  ) : isCompleted ? (
                    <Star size={24} className="text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,1)]" />
                  ) : isCurrent ? (
                    <PlayCircle size={30} className="text-cyan-300" />
                  ) : (
                    <Lock size={24} className="text-gray-500" />
                  )}

                  {/* Level Label Badge */}
                  <div
                    className={`absolute top-[110%] font-black text-xs whitespace-nowrap px-3 py-1 rounded-full shadow-lg border border-white/10 tracking-widest ${
                      isUnlocked
                        ? (isBoss ? 'bg-red-950/90 text-red-400' : 'bg-black/80 text-white')
                        : 'bg-black/80 text-gray-500'
                    }`}
                  >
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
        className="fixed bottom-6 left-6 z-50 text-white/50 hover:text-white bg-black/50 px-6 py-3 rounded-full border border-white/10 transition backdrop-blur-md cursor-pointer font-mono tracking-widest flex gap-2 items-center text-sm shadow-xl hover:border-cyan-400"
      >
        <ArrowLeft size={16} /> RETURN TO HUB
      </button>
    </motion.div>
  );
};

export default StoryMap;

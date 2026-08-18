// frontend/src/pages/StoryMap.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Unlock, PlayCircle, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const StoryMap = () => {
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unlockedLevel, setUnlockedLevel] = useState(1);

  useEffect(() => {
    // Read local progress
    const savedProgress = localStorage.getItem('ecoVerseUnlocked');
    if (savedProgress) {
      setUnlockedLevel(parseInt(savedProgress, 10));
    }

    // Fetch the campaign map
    const fetchCampaign = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaign');
        setCampaign(response.data);
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
      <div className="flex flex-col flex-1 items-center justify-center">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 border-4 border-nature-leaf border-t-transparent rounded-full mb-4"
        />
        <p className="text-nature-leaf font-mono tracking-widest animate-pulse">Scanning Grid...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black mb-2 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
          CAMPAIGN LOG
        </h2>
        <p className="text-nature-accent font-mono">Current Clearance: Sector {Math.min(unlockedLevel, 7)}</p>
      </div>

      <div className="space-y-6 w-full">
        {campaign.map((level, index) => {
          const isUnlocked = level.id <= unlockedLevel;
          const isCompleted = level.id < unlockedLevel;
          const isCurrent = level.id === unlockedLevel;

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden group rounded-xl border flex flex-col md:flex-row items-center p-6 transition-all duration-300 ${isUnlocked
                  ? isCompleted
                    ? "bg-nature-green/10 border-nature-green/30 hover:bg-nature-green/20"
                    : "bg-black/60 border-nature-accent backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transform hover:-translate-y-1 cursor-pointer"
                  : "bg-gray-900/40 border-gray-700 opacity-60 grayscale cursor-not-allowed"
                }`}
              onClick={() => {
                if (isUnlocked) navigate(`/level/${level.id}`);
              }}
            >
              {isCurrent && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-nature-accent/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              )}

              {/* Icon Status */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 mb-4 md:mb-0 md:mr-6 border ${isCompleted ? "bg-nature-green/20 border-nature-green text-nature-green" :
                  isCurrent ? "bg-nature-accent/20 border-nature-accent text-nature-accent shadow-[0_0_15px_rgba(6,182,212,0.6)]" :
                    "bg-gray-800 border-gray-600 text-gray-500"
                }`}>
                {isCompleted ? <ShieldCheck size={32} /> :
                  isCurrent ? <PlayCircle size={32} /> :
                    <Lock size={30} />}
              </div>

              {/* Text Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                  <span className="text-xs font-bold font-mono tracking-widest text-gray-400">SECTOR 0{level.id}</span>
                  {!isUnlocked && <Lock size={12} className="text-gray-500" />}
                </div>
                <h3 className={`text-2xl font-black ${isUnlocked ? "text-white" : "text-gray-500"}`}>
                  {level.title}
                </h3>
                {isUnlocked ? (
                  <p className="text-sm font-medium mt-1 text-gray-300 flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-nature-leaf/20 text-nature-leaf px-2 py-0.5 rounded text-xs">{level.environmental_theme}</span>
                    <span className="bg-nature-accent/20 text-nature-accent px-2 py-0.5 rounded text-xs">{level.programming_concept}</span>
                  </p>
                ) : (
                  <p className="text-sm mt-1 text-gray-600 font-mono">ENCRYPTED NODE</p>
                )}
              </div>

              {/* Action Button */}
              <div className="hidden md:flex ml-4 shrink-0">
                {isUnlocked && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`px-6 py-3 rounded-lg font-bold tracking-wider transition-colors ${isCompleted
                        ? "bg-nature-green/10 text-nature-green hover:bg-nature-green hover:text-white"
                        : "bg-nature-accent hover:bg-white hover:text-nature-accent text-black"
                      }`}
                  >
                    {isCompleted ? "REPLAY" : "ENGAGE"}
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-12 text-gray-400 hover:text-white transition cursor-pointer font-mono tracking-widest relative group flex flex-col items-center"
      >
        <span>← RETURN TO HUB</span>
        <span className="h-[1px] w-0 group-hover:w-full bg-white transition-all duration-300 mt-1" />
      </button>
    </motion.div>
  );
};

export default StoryMap;

// frontend/src/pages/DynamicScanner.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import axios from 'axios';
import AnimatedCard from '../components/AnimatedCard';

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
      // Pass the generated level data through state to LevelView
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
        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-nature-accent via-blue-400 to-purple-400">
          DYNAMIC SCANNER
        </h2>
        <p className="text-gray-400 text-lg md:text-xl">
          Input any environmental anomaly. The system will compile a custom diagnostic protocol.
        </p>
      </div>

      <AnimatedCard className="w-full relative overflow-hidden ring-1 ring-nature-accent/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] rounded-2xl">
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-nature-accent w-6 h-6" />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isScanning}
              placeholder="e.g. Coral Reef Bleaching, E-Waste Management, Microplastics..."
              className="w-full bg-black/60 border-2 border-nature-accent/40 rounded-xl py-5 pl-14 pr-6 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-nature-accent focus:ring-4 focus:ring-nature-accent/20 transition-all disabled:opacity-50"
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
            className={`
              w-full py-4 rounded-xl font-bold text-lg tracking-widest transition-all
              ${isScanning
                ? "bg-nature-accent/20 text-nature-accent/50 cursor-not-allowed border-2 border-nature-accent/30"
                : "bg-nature-accent hover:bg-white hover:text-nature-accent text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)]"
              }
            `}
          >
            {isScanning ? (
              <span className="flex items-center justify-center gap-3">
                <Loader2 className="animate-spin" /> COMPIILING PROTOCOL...
              </span>
            ) : (
              "INITIATE SCAN"
            )}
          </button>
        </form>

        {/* Scanning Overlay Animation */}
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
                className="w-24 h-24 border-4 border-nature-accent/30 border-t-nature-accent rounded-full mb-6"
              />
              <p className="text-nature-accent font-mono tracking-[0.3em] animate-pulse">
                ACCESSING NEURAL NET...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatedCard>

      <button
        onClick={() => navigate('/')}
        className="mt-12 text-gray-500 hover:text-white transition cursor-pointer font-mono tracking-widest group"
      >
        <span className="group-hover:-translate-x-2 inline-block transition-transform">←</span> RETURN TO HUB
      </button>
    </motion.div>
  );
};

export default DynamicScanner;

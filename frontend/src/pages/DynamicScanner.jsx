// frontend/src/pages/DynamicScanner.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Zap } from 'lucide-react';
import axios from 'axios';
import AnimatedCard from '../components/AnimatedCard';
import API_BASE_URL from '../config/api';

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
      const response = await axios.post(`${API_BASE_URL}/api/generate-dynamic`, { topic: topic.trim() });
      navigate('/level/dynamic', { state: { levelData: response.data } });
    } catch (err) {
      console.error("Scanner error:", err);
      const serverMessage = err.response?.data?.error || "Scanner Interference Detected. Please check your backend connection & Gemini API key.";
      setError(serverMessage);
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
      <div className="text-center mb-10 w-full">
        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 uppercase flex items-center justify-center gap-3">
          <Zap className="text-cyan-400 w-10 h-10" /> DYNAMIC SCANNER
        </h2>
        <p className="text-gray-400 text-lg md:text-xl">
          Input any programming anomaly. The AI neural engine synthesizes a customized lesson & logic challenge on the fly.
        </p>
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
              placeholder="e.g. Recursion, Binary Search, Graph BFS, Async/Await..."
              className="w-full bg-black/80 border-2 border-cyan-400/40 rounded-xl py-5 pl-14 pr-6 text-white text-lg placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-400 text-center font-mono text-sm bg-red-900/20 border border-red-500/30 py-3 px-4 rounded-xl"
              >
                [ ERROR: {error} ]
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={!topic.trim() || isScanning}
            className={`w-full py-4 rounded-xl font-bold text-lg tracking-widest transition-all ${
              isScanning
                ? "bg-cyan-400/20 text-cyan-400/50 cursor-not-allowed border-2 border-cyan-400/30"
                : "bg-cyan-400 hover:bg-white hover:text-cyan-900 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] cursor-pointer"
            }`}
          >
            {isScanning ? (
              <span className="flex items-center justify-center gap-3">
                <Loader2 className="animate-spin" /> COMPILING AI PROTOCOL...
              </span>
            ) : (
              "INITIATE SCAN"
            )}
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
              <p className="text-cyan-400 font-mono tracking-[0.3em] animate-pulse">
                ACCESSING GEMINI AI NEURAL NET...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatedCard>

      <button
        onClick={() => navigate('/')}
        className="mt-10 text-gray-500 hover:text-white transition cursor-pointer font-mono tracking-widest group text-sm"
      >
        <span className="group-hover:-translate-x-2 inline-block transition-transform">←</span> RETURN TO HUB
      </button>
    </motion.div>
  );
};

export default DynamicScanner;

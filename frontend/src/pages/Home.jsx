import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Zap, Map } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
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
        <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-nature-leaf via-nature-green to-nature-accent drop-shadow-md">
          SYSTEM RESTORATION
        </h2>
        <p className="text-xl text-gray-400 font-medium tracking-wide">Select your deployment sequence</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 z-10">

        {/* Story Mode */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/map')}
          className="relative group glass-panel border border-white/10 hover:border-nature-leaf/50 overflow-hidden rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-nature-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-20 h-20 mb-6 rounded-full bg-nature-dark border border-nature-leaf/30 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.2)] group-hover:shadow-[0_0_40px_rgba(52,211,153,0.5)] transition-all">
            <BookOpen className="text-nature-leaf w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">STORY MODE</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Follow the 7-level campaign to repair corrupted ecosystem nodes.</p>
        </motion.button>

        {/* Dynamic Scanner */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/scan')}
          className="relative group glass-panel border border-white/10 hover:border-nature-accent/50 overflow-hidden rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-nature-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-20 h-20 mb-6 rounded-full bg-nature-dark border border-nature-accent/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all">
            <Zap className="text-nature-accent w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">DYNAMIC SCAN</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Input any anomaly. The AI neural net compiles custom lessons.</p>
        </motion.button>

        {/* NEW: Role Roadmap */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/roadmap')}
          className="relative group glass-panel border border-white/10 hover:border-purple-400/50 overflow-hidden rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-20 h-20 mb-6 rounded-full bg-nature-dark border border-purple-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all">
            <Map className="text-purple-400 w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">ROLE ROADMAP</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Generate and download a career pathway for any tech role.</p>
        </motion.button>

      </div>
    </motion.div>
  );
};

export default Home;
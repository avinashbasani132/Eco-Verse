import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';

import Home from './pages/Home';
import StoryMap from './pages/StoryMap';
import DynamicScanner from './pages/DynamicScanner';
import Roadmap from './pages/Roadmap';
import LevelView from './pages/LevelView';

import Intro from './pages/levels/Intro';
import Level1 from './pages/levels/Level1';
import Level2 from './pages/levels/Level2';
import Level3 from './pages/levels/Level3';
import Level4 from './pages/levels/Level4';
import Level5 from './pages/levels/Level5';
import Level6 from './pages/levels/Level6';
import Level7 from './pages/levels/Level7';

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
          <h1 className="font-black text-2xl tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 uppercase drop-shadow">
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
        {/* Ambient Gradient Glows */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        </div>

        <GlobalHeader />

        <main className="relative z-10 pt-28 pb-12 px-6 flex justify-center min-h-screen align-middle">
          <div className="w-full max-w-7xl">
            <AnimatedRoutes />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
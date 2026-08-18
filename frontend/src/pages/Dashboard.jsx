// frontend/src/pages/Dashboard.jsx
import React from 'react';
import WorldMap from '../components/WorldMap';
import { Shield, Zap, Target } from 'lucide-react';

const Dashboard = ({ user, fetchUser }) => {
  const xpNeeded = user.level * 100;
  const progressPercent = (user.xp / xpNeeded) * 100;

  return (
    <div className="space-y-8 animate-[fade-in_0.5s_ease-out]">
      <div className="glass-panel p-6 flex flex-col md:flex-row items-center justify-between gap-6 transform transition-all hover:border-nature-accent/30 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-nature-leaf/5 rounded-full filter blur-[50px] pointer-events-none"></div>

        <div className="flex items-center gap-6 z-10">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-nature-dark to-nature-earth border-2 border-nature-green/50 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Shield className="text-nature-leaf w-10 h-10 animate-pulse-glow" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-nature-accent text-nature-dark text-xs font-bold px-2 py-1 rounded-lg border border-black shadow-lg">
              LVL {user.level}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-1 drop-shadow-sm">
              {user.username}
            </h2>
            <p className="text-nature-leaf font-medium flex items-center gap-2 text-sm tracking-wide">
              <span>BIO-ARCHITECT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-nature-leaf animate-pulse"></span>
              <span>ACTIVE</span>
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/3 space-y-3 z-10 bg-black/20 p-4 rounded-xl border border-white/5 shadow-inner">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
              <span className="text-sm font-semibold text-gray-300">CORE XP</span>
            </div>
            <span className="text-sm font-bold bg-white/10 px-2 py-0.5 rounded text-white shadow-sm">
              {user.xp} / {xpNeeded}
            </span>
          </div>
          <div className="w-full bg-nature-dark rounded-full h-3 overflow-hidden border border-white/10 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-nature-green via-nature-leaf to-nature-accent rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(52,211,153,0.8)] relative"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 skew-x-[-20deg] animate-[shine_2s_infinite]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 relative">
        <div className="flex items-center gap-3 mb-8">
          <Target className="text-nature-accent w-6 h-6" />
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nature-leaf to-nature-green tracking-tight">Mission Map</h3>
        </div>

        <p className="text-gray-400 mb-8 max-w-2xl font-medium leading-relaxed">
          Select an available region to deploy logic algorithms and restore the ecosystem. Complete missions to unlock new areas.
        </p>

        <WorldMap currentWorld={user.currentWorld} />
      </div>

    </div>
  );
};

export default Dashboard;

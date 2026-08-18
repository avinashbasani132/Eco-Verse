// frontend/src/components/WorldMap.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Navigation } from 'lucide-react';

const worlds = [
  { id: 1, name: "Biodiversity Basics", pos: "top-[10%] left-[10%]" },
  { id: 2, name: "Sustainable Steps", pos: "top-[30%] left-[30%]" },
  { id: 3, name: "Renewable Loops", pos: "top-[10%] left-[60%]" },
  { id: 4, name: "Ocean Functions", pos: "top-[50%] left-[70%]" },
  { id: 5, name: "Forest Arrays", pos: "top-[80%] left-[50%]" },
  { id: 6, name: "Climate Objects", pos: "top-[70%] left-[20%]" },
  { id: 7, name: "Eco-Restoration", pos: "top-[40%] left-[45%]" },
];

const WorldMap = ({ currentWorld }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full aspect-video bg-nature-dark/80 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>

      {/* Connecting lines SVG (stylized) */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" preserveAspectRatio="none">
        <path d="M 10 10 Q 20 20 30 30 T 60 10 T 70 50 T 50 80 T 20 70 T 45 40" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
      </svg>

      {/* Render Worlds */}
      {worlds.map((world, index) => {
        const isUnlocked = world.id <= currentWorld;
        const isCurrentTarget = world.id === currentWorld;

        return (
          <div
            key={world.id}
            className={`absolute ${world.pos} transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group`}
          >
            <button
              disabled={!isUnlocked}
              onClick={() => navigate(`/mission/${world.id}`)}
              className={`
                 relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300
                 ${isUnlocked
                  ? 'bg-gradient-to-br from-nature-green to-nature-accent shadow-[0_0_20px_rgba(52,211,153,0.5)] border-2 border-white/50 cursor-pointer hover:scale-110 hover:-translate-y-2'
                  : 'bg-nature-earth border-2 border-white/10 opacity-60 cursor-not-allowed hover:bg-nature-dark'}
                 ${isCurrentTarget ? 'ring-4 ring-offset-4 ring-offset-nature-dark ring-nature-accent animate-[bounce_3s_infinite]' : ''}
                 group
               `}
            >
              {/* Internal Glow for Unlocked */}
              {isUnlocked && <div className="absolute inset-2 bg-black/20 rounded-full shadow-inner blur-sm"></div>}

              {isUnlocked ? (
                <span className="text-2xl font-black text-white drop-shadow-md z-10 relative">{world.id}</span>
              ) : (
                <Lock className="text-gray-500 w-8 h-8 z-10 relative opacity-70" />
              )}

              {/* Hover Effect Tooltip */}
              <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg border border-white/20 whitespace-nowrap shadow-xl pointer-events-none z-50 flex items-center gap-2">
                {isUnlocked && <Navigation size={12} className="text-nature-leaf" />}
                {world.name}
                {!isUnlocked && " (Locked)"}
              </div>
            </button>
          </div>
        );
      })}

    </div>
  );
};

export default WorldMap;

// frontend/src/pages/LevelView.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ArrowLeft, Code2 } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';

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

const LevelView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const levelData = location.state?.levelData;

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'restored' | 'glitched'
  const [correctAnswers, setCorrectAnswers] = useState(0);

  if (!levelData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <p className="text-xl text-gray-400 font-mono">No active dynamic scan detected.</p>
        <button
          onClick={() => navigate('/scan')}
          className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-white transition"
        >
          Go to Scanner
        </button>
      </div>
    );
  }

  const currentQuiz = levelData.quizzes && levelData.quizzes[currentQuizIndex];

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    if (!currentQuiz) return;

    if (index === currentQuiz.correct_index) {
      setCorrectAnswers((prev) => prev + 1);
      setTimeout(() => {
        if (currentQuizIndex < levelData.quizzes.length - 1) {
          setCurrentQuizIndex((prev) => prev + 1);
          setSelectedOption(null);
        } else {
          setGameState('restored');
        }
      }, 1000);
    } else {
      setTimeout(() => {
        setGameState('glitched');
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <button
          onClick={() => navigate('/scan')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition font-mono text-sm tracking-wider"
        >
          <ArrowLeft size={16} /> ABORT SCAN
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            QUIZ {currentQuizIndex + 1} OF {levelData.quizzes?.length || 1}
          </span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        </div>
      </div>

      {/* Lesson Content Section */}
      <AnimatedCard className="mb-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          {levelData.title}
        </h1>
        <div className="prose prose-invert max-w-none">
          {renderLessonText(levelData.lesson_text)}
        </div>
      </AnimatedCard>

      {/* Interactive Quiz Area */}
      <AnimatePresence mode="wait">
        {currentQuiz && gameState === 'playing' && (
          <motion.div
            key={currentQuizIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AnimatedCard className="bg-black/60 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white tracking-wide">
                {currentQuiz.question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuiz.options?.map((option, idx) => {
                  let buttonStyle = "border-white/10 hover:border-cyan-400/50 bg-white/5 hover:bg-white/10 text-gray-200";

                  if (selectedOption !== null) {
                    if (idx === currentQuiz.correct_index) {
                      buttonStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/40";
                    } else if (idx === selectedOption) {
                      buttonStyle = "border-red-500 bg-red-500/20 text-red-300 ring-2 ring-red-500/40";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedOption !== null}
                      onClick={() => handleOptionSelect(idx)}
                      className={`p-5 rounded-xl border text-left font-mono text-base transition-all duration-200 flex items-start gap-4 cursor-pointer ${buttonStyle}`}
                    >
                      <span className="w-8 h-8 rounded-lg bg-black/40 border border-white/20 flex items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="pt-1">{option}</span>
                    </button>
                  );
                })}
              </div>
            </AnimatedCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Restored Modal */}
      {gameState === 'restored' && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-6">
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="text-center flex flex-col items-center max-w-lg"
          >
            <div className="w-32 h-32 bg-emerald-500/20 rounded-full flex items-center justify-center border-4 border-emerald-500 mb-6 shadow-[0_0_100px_rgba(16,185,129,0.6)]">
              <ShieldCheck size={64} className="text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">SYSTEM RESTORED</h1>
            <p className="text-emerald-400 text-lg font-mono tracking-widest uppercase mb-8">
              Protocol Synthesized Successfully ({correctAnswers} / {levelData.quizzes?.length || 0})
            </p>

            <button
              onClick={() => navigate('/scan')}
              className="px-10 py-4 bg-emerald-500 text-black font-black tracking-widest rounded-xl hover:bg-white transition-colors text-lg shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer"
            >
              SCAN ANOTHER TOPIC
            </button>
          </motion.div>
        </div>
      )}

      {/* Glitched Modal */}
      {gameState === 'glitched' && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-6">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
            className="text-center flex flex-col items-center max-w-lg"
          >
            <div className="w-32 h-32 bg-red-900/20 rounded-full flex items-center justify-center border-4 border-red-500 mb-6 shadow-[0_0_100px_rgba(239,68,68,0.6)]">
              <AlertTriangle size={64} className="text-red-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">GLITCH DETECTED</h1>
            <p className="text-red-400 text-lg font-mono tracking-widest uppercase mb-8">Logic mismatch. Protocol execution failed.</p>

            <div className="flex gap-4">
              <button
                onClick={() => { setGameState('playing'); setSelectedOption(null); }}
                className="px-8 py-4 bg-red-600 text-white font-black tracking-widest rounded-xl hover:bg-red-500 transition-colors cursor-pointer text-base shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              >
                RETRY PUZZLE
              </button>
              <button
                onClick={() => navigate('/scan')}
                className="px-8 py-4 border-2 border-red-900 text-red-400 font-bold tracking-widest rounded-xl hover:bg-red-900/30 transition-colors cursor-pointer text-base"
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

export default LevelView;
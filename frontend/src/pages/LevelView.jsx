// frontend/src/pages/LevelView.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Loader2, Code2 } from 'lucide-react';
import axios from 'axios';

// Inline AnimatedCard to resolve missing component dependency
const AnimatedCard = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: delay
      }}
      className={`glass-panel p-6 md:p-8 bg-black/40 border-t border-white/10 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Inline TypewriterText to resolve missing component dependency
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
          className="inline-block w-2 bg-nature-leaf ml-1 h-[1em] align-middle"
        />
      )}
    </div>
  );
};

// Helper function to beautifully render AI markdown code blocks
const renderLessonText = (text) => {
  if (!text) return null;
  const parts = text.split(/```/);

  return parts.map((part, index) => {
    // Odd indexes are inside the ``` code blocks
    if (index % 2 === 1) {
      const lines = part.trim().split('\n');
      const lang = lines[0].match(/^[a-z]+$/i) ? lines.shift() : 'CODE';
      return (
        <div key={index} className="bg-[#0d1117] rounded-xl my-6 border border-gray-700 overflow-hidden shadow-2xl">
          <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
            <Code2 size={16} className="text-nature-accent" />
            <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">{lang}</span>
          </div>
          <pre className="p-5 overflow-x-auto text-green-400 font-mono text-sm leading-relaxed">
            <code>{lines.join('\n')}</code>
          </pre>
        </div>
      );
    }
    // Even indexes are normal text
    return <p key={index} className="mb-4 text-gray-200 leading-relaxed text-lg">{part}</p>;
  });
};

const LevelView = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [levelData, setLevelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [storyFinished, setStoryFinished] = useState(false);

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameState, setGameState] = useState('playing'); // playing, restored, glitched

  useEffect(() => {
    if (id === 'dynamic') {
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

  // If there is no story_text, skip directly to the lesson/quiz
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
      // CORRECT ANSWER
      if (currentQuizIndex < levelData.quizzes.length - 1) {
        // More questions left
        setTimeout(() => {
          setCurrentQuizIndex(prev => prev + 1);
          setSelectedOption(null);
        }, 1000);
      } else {
        // ALL QUESTIONS FINISHED - TRIGGER GREEN SCREEN
        setTimeout(() => {
          setGameState('restored');
          if (id !== 'dynamic') {
            const unlocked = parseInt(localStorage.getItem('ecoVerseUnlocked')) || 1;
            if (parseInt(id) >= unlocked) {
              localStorage.setItem('ecoVerseUnlocked', parseInt(id) + 1);
            }
          }
        }, 800);
      }
    } else {
      // WRONG ANSWER
      setTimeout(() => {
        setGameState('glitched');
      }, 800);
    }
  };

  if (loading || !levelData) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[60vh]">
        <Loader2 className="w-16 h-16 text-nature-leaf animate-spin mb-4" />
        <p className="font-mono text-nature-leaf tracking-widest">DECRYPTING SECTOR DATA...</p>
      </div>
    );
  }

  const isDynamic = id === 'dynamic';
  const themeColor = isDynamic ? 'nature-accent' : 'nature-leaf';
  const currentQuiz = levelData?.quizzes ? levelData.quizzes[currentQuizIndex] : null;

  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-[70vh] pb-24 relative">
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
              <span className={`bg-${themeColor}/20 text-${themeColor} px-3 py-1 rounded font-bold text-sm outline outline-1 outline-${themeColor}/30`}>
                {levelData.environmental_theme}
              </span>
            )}
            <span className="bg-purple-900/40 text-purple-400 px-3 py-1 rounded font-bold text-sm outline outline-1 outline-purple-500/30">
              {levelData.programming_concept}
            </span>
          </div>
        </div>
      </AnimatedCard>

      {/* Story Narrative */}
      {levelData.story_text && (
        <AnimatedCard delay={0.2} className="mb-8 p-8 bg-black/60 shadow-xl border border-gray-800">
          <div className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
            <TypewriterText text={levelData.story_text} speed={25} delay={300} onComplete={() => setStoryFinished(true)} />
          </div>
        </AnimatedCard>
      )}

      {/* AI Conversational Lesson UI Upgrade */}
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

      {/* Quiz Section Upgrade */}
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

      {/* Guaranteed Green Screen / Red Screen Overlays */}
      <AnimatePresence>
        {gameState === 'restored' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-nature-green/10 animate-pulse pointer-events-none" />
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="text-center flex flex-col items-center p-6 relative z-50"
            >
              <div className="w-40 h-40 bg-nature-green/20 rounded-full flex items-center justify-center border-4 border-nature-green mb-8 shadow-[0_0_150px_rgba(16,185,129,0.8)]">
                <ShieldCheck size={80} className="text-nature-green" />
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">SYSTEM RESTORED</h1>
              <p className="text-nature-green text-2xl font-mono tracking-widest uppercase mb-12">All anomalies resolved.</p>

              <button
                onClick={() => navigate(isDynamic ? '/scan' : '/map')}
                className="px-12 py-5 bg-nature-green text-black font-black tracking-widest rounded-xl hover:bg-white transition-colors text-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer"
              >
                RETURN TO HUB
              </button>
            </motion.div>
          </motion.div>
        )}

        {gameState === 'glitched' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LevelView;
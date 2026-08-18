//frontend/src/pages/StoryLevel.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Droplet, Shield, Swords, Sparkles } from 'lucide-react';
import axios from 'axios';

// VN-Style Typewriter Component
const VNTypewriter = ({ text, speed = 25, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText('');
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return <span>{displayedText}</span>;
};

const StoryLevel = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [levelData, setLevelData] = useState(null);
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    // RPG State
    const [playerState, setPlayerState] = useState({ heroName: "Unknown", heroAge: 0, hp: 100, mana: 50, xp: 0 });
    const [inputValue, setInputValue] = useState('');
    const [damageFlash, setDamageFlash] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState(null);

    useEffect(() => {
        const fetchLevel = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/levels/${id}`);
                setLevelData(response.data);
                setCurrentSceneIndex(0);
            } catch (err) {
                console.error("Failed to load level", err);
            }
        };
        fetchLevel();
    }, [id]);

    if (!levelData) return <div className="min-h-screen bg-zinc-950 text-amber-500 flex items-center justify-center font-mono">Summoning Reality...</div>;

    const currentScene = levelData.scenes[currentSceneIndex];

    // Helper: Replace {heroName} in text with actual state
    const parseText = (text) => text.replace(/\{heroName\}/g, playerState.heroName !== "Unknown" ? playerState.heroName : "Hero");

    // --- Progression Handlers ---
    const progressScene = (goNextContext = false) => {
        setFeedbackMsg(null);
        if (currentSceneIndex < levelData.scenes.length - 1) {
            setCurrentSceneIndex(prev => prev + 1);
            setIsTyping(true);
        } else {
            // Level Complete!
            const unlocked = parseInt(localStorage.getItem('ecoVerseUnlocked')) || 1;
            if (parseInt(id) >= unlocked) {
                localStorage.setItem('ecoVerseUnlocked', parseInt(id) + 1);
            }
            if (goNextContext && parseInt(id) < 7) {
                navigate(`/story/${parseInt(id) + 1}`);
            } else {
                navigate('/map');
            }
        }
    };

    const handleNextDialogue = () => {
        if (isTyping) return;
        if (currentScene.type === 'dialogue') {
            progressScene();
        }
    };

    const handleInputSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        setPlayerState(prev => ({ ...prev, [currentScene.variable_target]: inputValue }));
        setInputValue('');
        progressScene();
    };

    const handleChoice = (index, logicConditionMet = false) => {
        // If it's a task_logic, we might just evaluate logicConditionMet instead of correct_index
        // or support generic index check.
        const isCorrect = (currentScene.type === 'task_logic') ? logicConditionMet : (index === currentScene.correct_index);

        if (isCorrect) {
            setFeedbackMsg({ type: 'success', text: currentScene.success_text || "Right!" });
            setTimeout(() => progressScene(), 2000);
        } else {
            // Take Damage
            setPlayerState(prev => ({ ...prev, hp: Math.max(0, prev.hp - 15) }));
            setDamageFlash(true);
            setTimeout(() => setDamageFlash(false), 300);
            setFeedbackMsg({ type: 'error', text: currentScene.fail_text || "Wrong!" });

            if (playerState.hp - 15 <= 0) {
                alert("Your soul shattered in the void. Game Over.");
                navigate('/map');
            }
        }
    };

    return (
        <div className={`min-h-screen flex flex-col relative overflow-hidden font-sans transition-colors duration-100 ${damageFlash ? 'bg-red-900' : 'bg-zinc-950'}`}>

            {/* Background Layer */}
            <div className="absolute inset-0 z-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url(${currentScene.background || ''})` }} />

            {/* RPG HUD */}
            <header className="relative z-20 p-4 flex justify-between items-center bg-black/80 border-b border-amber-900/50 backdrop-blur-md">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-amber-500 font-black tracking-widest uppercase">{playerState.heroName}</span>
                        <span className="text-gray-400 text-xs tracking-wider">Level 1 Novice | XP: {playerState.xp}</span>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-red-500 font-bold bg-red-950/40 px-3 py-1 rounded border border-red-900">
                            <Heart size={16} /> {playerState.hp}/100
                        </div>
                        <div className="flex items-center gap-2 text-blue-500 font-bold bg-blue-950/40 px-3 py-1 rounded border border-blue-900">
                            <Droplet size={16} /> {playerState.mana}/50
                        </div>
                    </div>
                </div>
                <div className="text-gray-500 text-sm font-mono uppercase hidden md:block">
                    Chapter {levelData.id}: {levelData.title}
                </div>
            </header>

            {/* Main Play Area */}
            <main className="flex-1 relative z-10 flex flex-col justify-end p-4 md:p-8 max-w-4xl mx-auto w-full pb-12">
                <AnimatePresence mode="wait">

                    {/* LESSON UI */}
                    {currentScene.type === 'lesson' && (
                        <motion.div
                            key={`lesson-${currentSceneIndex}`}
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                            className="bg-zinc-900/95 border border-blue-900/50 rounded-xl p-8 shadow-2xl mx-auto w-full mb-12"
                        >
                            <h3 className="text-2xl font-black text-blue-400 mb-6 border-b border-blue-900/50 pb-4 flex items-center gap-3">
                                <Shield className="text-blue-500" /> {currentScene.title}
                            </h3>
                            <div className="text-lg text-gray-300 whitespace-pre-wrap leading-relaxed">
                                {parseText(currentScene.text)}
                            </div>
                            <button
                                onClick={progressScene}
                                className="mt-8 w-full bg-blue-900/40 hover:bg-blue-800 border border-blue-500/30 text-blue-300 py-4 rounded font-bold tracking-widest transition-all"
                            >
                                COMMIT TO MEMORY
                            </button>
                        </motion.div>
                    )}

                    {/* VISUAL NOVEL & TASK UI */}
                    {['dialogue', 'task_input', 'task_choice', 'task_logic', 'reward'].includes(currentScene.type) && (
                        <motion.div
                            key={`scene-${currentSceneIndex}`}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                            className="w-full flex flex-col gap-4"
                        >
                            {/* VN Text Box */}
                            <div
                                className={`bg-black/85 border-2 rounded-lg p-6 md:p-8 shadow-2xl backdrop-blur-md cursor-pointer relative ${currentScene.type === 'reward' ? 'border-yellow-500/50' : 'border-amber-900/50'}`}
                                onClick={currentScene.type === 'dialogue' ? handleNextDialogue : null}
                            >
                                {/* Speaker Tag */}
                                {(currentScene.speaker) && (
                                    <div className="absolute -top-4 left-6 bg-gradient-to-r from-amber-800 to-amber-950 px-4 py-1 rounded text-white font-bold tracking-wider text-sm border border-amber-600/30">
                                        {currentScene.speaker}
                                    </div>
                                )}

                                {/* Dialogue Text */}
                                <p className={`text-xl leading-relaxed min-h-[80px] ${currentScene.type === 'reward' ? 'text-yellow-100' : 'text-gray-200'}`}>
                                    <VNTypewriter text={parseText(currentScene.text || "")} onComplete={() => setIsTyping(false)} />
                                </p>

                                {/* TASK: TEXT/NUMBER INPUT */}
                                {currentScene.type === 'task_input' && !isTyping && (
                                    <form onSubmit={handleInputSubmit} className="mt-8 flex gap-4">
                                        <input
                                            type={currentScene.input_type === 'number' ? 'number' : 'text'}
                                            autoFocus
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder={currentScene.placeholder}
                                            className="flex-1 bg-zinc-900 border border-amber-700/50 rounded p-4 text-xl text-white focus:outline-none focus:border-amber-500 transition-all font-mono"
                                        />
                                        <button type="submit" className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-4 rounded font-bold tracking-widest transition-colors">
                                            BIND DATA
                                        </button>
                                    </form>
                                )}

                                {/* TASK: MULTIPLE CHOICE */}
                                {currentScene.type === 'task_choice' && !isTyping && !feedbackMsg && (
                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {currentScene.options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleChoice(idx)}
                                                className="bg-zinc-900/80 border border-zinc-700 hover:border-amber-500 hover:bg-zinc-800 text-left p-4 rounded text-gray-300 hover:text-white transition-all font-mono"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* TASK: FEEDBACK OVERLAY */}
                                {feedbackMsg && (
                                    <div className={`mt-6 p-4 rounded font-bold tracking-widest text-center ${feedbackMsg.type === 'success' ? 'bg-green-900/40 text-green-400 border border-green-500/30' : 'bg-red-900/40 text-red-400 border border-red-500/30'}`}>
                                        {feedbackMsg.text}
                                    </div>
                                )}

                                {/* TASK: LOGIC (Minimal Support) */}
                                {currentScene.type === 'task_logic' && !isTyping && !feedbackMsg && (
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        // For minimal logic, let's assume validation string is standard javascript string or substring match.
                                        let isMet = false;
                                        if (currentScene.validation) {
                                            isMet = inputValue.trim() === currentScene.validation;
                                        } else {
                                            isMet = true; // Fallback to auto pass
                                        }
                                        handleChoice(-1, isMet);
                                        setInputValue('');
                                    }} className="mt-8 flex flex-col gap-4">
                                        <input
                                            type="text"
                                            autoFocus
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder={currentScene.placeholder || "Execute logic statement..."}
                                            className="flex-1 bg-zinc-900 border border-purple-700/50 rounded p-4 text-xl text-white focus:outline-none focus:border-purple-500 transition-all font-mono"
                                        />
                                        <button type="submit" className="bg-purple-700 hover:bg-purple-600 text-white px-8 py-4 rounded font-bold tracking-widest transition-colors">
                                            EXECUTE LOGIC
                                        </button>
                                    </form>
                                )}

                                {/* REWARD SCREEN */}
                                {currentScene.type === 'reward' && !isTyping && (
                                    <div className="mt-8 flex flex-col items-center justify-center gap-4 bg-yellow-900/20 p-6 rounded border border-yellow-500/30">
                                        <Sparkles className="text-yellow-500 w-12 h-12" />
                                        <p className="text-yellow-400 font-bold tracking-widest">OBTAINED: {currentScene.item}</p>
                                        <button onClick={() => progressScene(true)} className="mt-4 bg-yellow-600 hover:bg-yellow-500 text-black px-12 py-3 rounded font-black tracking-widest transition-colors">
                                            NEXT CHAPTER
                                        </button>
                                        <button onClick={() => progressScene(false)} className="mt-2 bg-transparent border border-yellow-600/50 hover:bg-yellow-900/30 text-yellow-500 px-6 py-2 rounded font-black tracking-widest transition-colors text-sm">
                                            RETURN TO MAP
                                        </button>
                                    </div>
                                )}

                                {/* Blinking Arrow for pure dialogue */}
                                {currentScene.type === 'dialogue' && !isTyping && (
                                    <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="absolute bottom-4 right-6 text-amber-500 text-2xl">
                                        ▼
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>
        </div>
    );
};

export default StoryLevel;
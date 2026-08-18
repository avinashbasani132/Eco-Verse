//frontend/src/pages/IntroView.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Ghost } from 'lucide-react';

const IntroView = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [isGlitching, setIsGlitching] = useState(false);

    // The Prologue Data
    const script = [
        { type: "narration", speaker: "System", text: "In the beginning, there was the Code Atlas. It held the logic of all existence.", bg: "bg-slate-950" },
        { type: "dialogue", speaker: "Narrator", text: "But the Demon King Vharzul did not want to rule the world... he wanted to rewrite it.", bg: "bg-red-950" },
        { type: "glitch", speaker: "Vharzul", text: "Syntax error, little mortals. Your lives are but unhandled exceptions in my new world.", bg: "bg-zinc-900" },
        { type: "dialogue", speaker: "High Sorcerer", text: "The barriers are failing! We must find a 'Codebender' from the Other World!", bg: "bg-indigo-950" },
        { type: "dialogue", speaker: "Royal Scribe", text: "Initiating Summoning Protocol... Anchoring soul... Stand by.", bg: "bg-emerald-950" }
    ];

    const current = script[step];

    // Trigger glitch effect for the Demon King
    useEffect(() => {
        if (current.type === "glitch") {
            const interval = setInterval(() => {
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 50);
            }, 500);
            return () => clearInterval(interval);
        }
    }, [step, current.type]);

    const next = () => {
        if (step < script.length - 1) {
            setStep(step + 1);
        } else {
            navigate('/level/1'); // Seamlessly transition to Level 1
        }
    };

    return (
        <div className={`fixed inset-0 z-[200] flex items-center justify-center transition-colors duration-1000 ${current.bg}`}>

            {/* Glitch Overlay for the Demon King */}
            <AnimatePresence>
                {isGlitching && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white mix-blend-difference z-[210] pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <div className="max-w-4xl w-full p-8 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        {/* Icon/Visual for the speaker */}
                        <div className="flex justify-center mb-8">
                            {current.type === 'glitch' ? (
                                <Ghost className="w-16 h-16 text-red-500 animate-bounce" />
                            ) : (
                                <Zap className="w-16 h-16 text-amber-500 animate-pulse" />
                            )}
                        </div>

                        {/* Speaker Name */}
                        <h2 className={`font-mono tracking-[0.5em] uppercase mb-4 text-sm ${current.type === 'glitch' ? 'text-red-500' : 'text-amber-500/60'}`}>
                            {current.speaker}
                        </h2>

                        {/* Main Text */}
                        <p className={`text-2xl md:text-4xl font-light leading-relaxed mb-12 ${current.type === 'glitch' ? 'font-mono text-red-400' : 'text-white'}`}>
                            {current.text}
                        </p>

                        {/* Interaction */}
                        <button
                            onClick={next}
                            className="px-12 py-4 border border-white/20 hover:border-white/80 rounded-full text-white/50 hover:text-white transition-all tracking-widest text-xs uppercase"
                        >
                            [ CLICK TO CONTINUE ]
                        </button>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Skip Button */}
            <button
                onClick={() => navigate('/level/1')}
                className="absolute bottom-8 right-8 text-white/20 hover:text-white/60 text-xs font-mono uppercase tracking-widest"
            >
                Skip Prologue »
            </button>
        </div>
    );
};

export default IntroView;
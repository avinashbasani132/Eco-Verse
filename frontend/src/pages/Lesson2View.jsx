// frontend/src/pages/Level2View.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Ghost } from 'lucide-react';

const Level2View = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [isGlitching, setIsGlitching] = useState(false);

    const script = [
        {
            type: "narration",
            speaker: "System",
            text: "The Summoning Crest glows once more. The hero has survived the first night in Asterveil.",
            bg: "bg-slate-950"
        },
        {
            type: "dialogue",
            speaker: "Guard Captain",
            text: "The Demon King does not need to break walls anymore. He only needs to break the choices of the people inside them.",
            bg: "bg-zinc-900"
        },
        {
            type: "dialogue",
            speaker: "High Sorcerer",
            text: "Then we will forge a mind sharper than steel. Today, the hero enters the Trial of Weapons.",
            bg: "bg-indigo-950"
        },
        {
            type: "glitch",
            speaker: "Vharzul's Echo",
            text: "Choose wrongly, hero... and even your sword will betray you.",
            bg: "bg-red-950"
        },
        {
            type: "dialogue",
            speaker: "Armorer of the Crown",
            text: "Sword, bow, axe... each weapon answers a different condition. Learn the law of the battlefield, and the battlefield may yet spare you.",
            bg: "bg-emerald-950"
        }
    ];

    const current = script[step];

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
            navigate('/level/2');
        }
    };

    return (
        <div className={`fixed inset-0 z-[200] flex items-center justify-center transition-colors duration-1000 ${current.bg}`}>
            <AnimatePresence>
                {isGlitching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
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
                        <div className="flex justify-center mb-8">
                            {current.type === 'glitch' ? (
                                <Ghost className="w-16 h-16 text-red-500 animate-bounce" />
                            ) : (
                                <Zap className="w-16 h-16 text-amber-500 animate-pulse" />
                            )}
                        </div>

                        <h2 className={`font-mono tracking-[0.5em] uppercase mb-4 text-sm ${current.type === 'glitch' ? 'text-red-500' : 'text-amber-500/60'}`}>
                            {current.speaker}
                        </h2>

                        <p className={`text-2xl md:text-4xl font-light leading-relaxed mb-12 ${current.type === 'glitch' ? 'font-mono text-red-400' : 'text-white'}`}>
                            {current.text}
                        </p>

                        <button
                            onClick={next}
                            className="px-12 py-4 border border-white/20 hover:border-white/80 rounded-full text-white/50 hover:text-white transition-all tracking-widest text-xs uppercase"
                        >
                            [ CLICK TO CONTINUE ]
                        </button>
                    </motion.div>
                </AnimatePresence>
            </div>

            <button
                onClick={() => navigate('/level/2')}
                className="absolute bottom-8 right-8 text-white/20 hover:text-white/60 text-xs font-mono uppercase tracking-widest"
            >
                Skip Trial »
            </button>
        </div>
    );
};

export default Level2View;
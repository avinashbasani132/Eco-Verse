// frontend/src/components/StoryDialogue.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function StoryDialogue({ speaker, text, onComplete, autoAdvanceDelay, pitch, rate }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const utteranceRef = useRef(null);
  
  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    
    // Configure Web Speech API
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop anything playing
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (pitch !== undefined && rate !== undefined) {
          utterance.pitch = pitch;
          utterance.rate = rate;
      } else if (speaker?.toUpperCase() === 'VHARZUL' || speaker?.toUpperCase()?.includes('DEMON')) {
        utterance.pitch = 0.1;
        utterance.rate = 0.6;
      } else if (speaker?.toUpperCase() === 'ORACLE') {
        utterance.pitch = 1.8;
        utterance.rate = 0.9;
      } else if (speaker?.toUpperCase() === 'NARRATOR') {
        utterance.pitch = 0.8;
        utterance.rate = 0.9;
      } else {
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
      }
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          if (onComplete) {
             if (autoAdvanceDelay) {
                setTimeout(onComplete, autoAdvanceDelay);
             } else {
                onComplete();
             }
          }
        }
      }, 30); // ~30ms per character typing speed
      return () => {
        clearInterval(interval);
        window.speechSynthesis.cancel();
      }
    }, 100);

    return () => {
      clearTimeout(startTimeout);
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text, speaker, onComplete, autoAdvanceDelay]);

  return (
    <motion.div 
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: 10 }}
       className="w-full bg-black/80 backdrop-blur-md border border-gray-600/50 rounded-lg p-6 relative shadow-[0_0_30px_rgba(0,0,0,0.8)]"
    >
      {speaker && (
        <div className="absolute -top-4 left-6 bg-gradient-to-r from-gray-800 to-black px-6 py-1.5 font-bold tracking-widest text-sm rounded border border-gray-500 text-white uppercase shadow-lg">
          {speaker}
        </div>
      )}
      <p className="text-xl md:text-2xl leading-relaxed text-gray-200 mt-2 font-serif min-h-[80px]">
        {displayedText}
        {isTyping && (
           <motion.span
             animate={{ opacity: [1, 0] }}
             transition={{ repeat: Infinity, duration: 0.6 }}
             className="inline-block w-2 bg-white ml-2 h-[1em] align-middle"
           />
        )}
      </p>
    </motion.div>
  );
}

// frontend/src/components/AnimatedCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

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

export default AnimatedCard;

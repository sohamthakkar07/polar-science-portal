import React from 'react';
import { motion } from 'framer-motion';

interface AuroraLayerProps {
  className?: string;
}

export const AuroraLayer: React.FC<AuroraLayerProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Primary Aurora Glow Stream (Top-Right Polar Ribbon) */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -25, 20, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.35, 0.55, 0.35, 0.35]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-ice-500/25 via-teal-500/20 to-transparent blur-[120px]"
      />

      {/* Secondary Cyan Ribbon (Central Backdrop Glow) */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 35, -20, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.25, 0.45, 0.25, 0.25]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] rounded-full bg-gradient-to-r from-teal-400/15 via-ice-400/20 to-sky-600/15 blur-[140px]"
      />

      {/* Deep Space Dark Aurora Wave (Bottom Accent) */}
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.2, 0.35, 0.2, 0.2]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -bottom-32 left-10 w-[550px] h-[450px] rounded-full bg-gradient-to-tr from-cyan-900/30 via-ice-600/15 to-transparent blur-[110px]"
      />
    </div>
  );
};

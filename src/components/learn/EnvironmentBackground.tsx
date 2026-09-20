import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type EnvironmentTheme = 'sea-ice' | 'ozone-atmosphere' | 'ocean-climate' | 'space-satellite';

interface EnvironmentBackgroundProps {
  theme: EnvironmentTheme;
  stageIndex?: number;
}

const THEME_CONFIGS: Record<
  EnvironmentTheme,
  {
    bgImage: string;
    secondaryImage?: string;
    overlayGradient: string;
    accentGlow: string;
    label: string;
  }
> = {
  'sea-ice': {
    bgImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    overlayGradient: 'linear-gradient(to bottom, rgba(4, 9, 20, 0.72), rgba(7, 19, 38, 0.85), rgba(4, 9, 20, 0.94))',
    accentGlow: 'radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.15), transparent 70%)',
    label: 'Polar Cryosphere & Ice Floes Environment'
  },
  'ozone-atmosphere': {
    bgImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1920&q=80',
    overlayGradient: 'linear-gradient(to bottom, rgba(4, 9, 20, 0.65), rgba(10, 25, 48, 0.88), rgba(4, 9, 20, 0.95))',
    accentGlow: 'radial-gradient(ellipse at 50% 15%, rgba(20, 184, 166, 0.18), rgba(99, 102, 241, 0.1) 60%, transparent 80%)',
    label: 'High Stratosphere & Ozone Layer Environment'
  },
  'ocean-climate': {
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80',
    overlayGradient: 'linear-gradient(to bottom, rgba(3, 10, 24, 0.78), rgba(6, 21, 46, 0.9), rgba(4, 9, 20, 0.96))',
    accentGlow: 'radial-gradient(ellipse at 50% 80%, rgba(14, 116, 144, 0.22), transparent 75%)',
    label: 'Southern Ocean Depth & Circulation Environment'
  },
  'space-satellite': {
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
    overlayGradient: 'linear-gradient(to bottom, rgba(2, 6, 15, 0.75), rgba(5, 14, 30, 0.88), rgba(4, 9, 20, 0.96))',
    accentGlow: 'radial-gradient(circle at 30% 20%, rgba(56, 189, 248, 0.12), transparent 60%)',
    label: 'Orbital Space Telemetry Environment'
  }
};

export const EnvironmentBackground: React.FC<EnvironmentBackgroundProps> = ({
  theme,
  stageIndex = 0
}) => {
  const config = THEME_CONFIGS[theme] || THEME_CONFIGS['sea-ice'];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Background Image with Slow Camera Drift */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{
            opacity: 1,
            scale: [1.05, 1.08, 1.05],
            y: stageIndex % 2 === 0 ? [0, -12, 0] : [0, 12, 0]
          }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeInOut' },
            scale: { duration: 35, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 25, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter contrast-105 brightness-75"
          style={{ backgroundImage: `url(${config.bgImage})` }}
        />
      </AnimatePresence>

      {/* Volumetric Radial Glow Accent */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: config.accentGlow }}
      />

      {/* Volumetric Dark Readability Vignette Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: config.overlayGradient }}
      />

      {/* Atmospheric Cloud / Ice Texture Layer (Midground Drift) */}
      <motion.div
        animate={{ x: [-20, 20, -20], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ice-400/10 via-transparent to-transparent pointer-events-none"
      />

      {/* Subtle Environmental Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />
    </div>
  );
};

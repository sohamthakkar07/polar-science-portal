import React from 'react';
import { EnvironmentBackground, EnvironmentTheme } from './EnvironmentBackground';
import { AtmosphericParticles } from './AtmosphericParticles';

interface LearningEnvironmentProps {
  theme: EnvironmentTheme;
  stageIndex?: number;
  children: React.ReactNode;
  className?: string;
}

export const LearningEnvironment: React.FC<LearningEnvironmentProps> = ({
  theme,
  stageIndex = 0,
  children,
  className = ''
}) => {
  return (
    <div className={`relative w-full min-h-screen text-slate-100 overflow-x-hidden ${className}`}>
      {/* Multi-depth Background Layer (Slowest) */}
      <EnvironmentBackground theme={theme} stageIndex={stageIndex} />

      {/* Atmospheric Canvas Particles Layer */}
      <AtmosphericParticles theme={theme} />

      {/* Main Readable Content Layer (Foreground) */}
      <div className="relative z-20 w-full">{children}</div>
    </div>
  );
};

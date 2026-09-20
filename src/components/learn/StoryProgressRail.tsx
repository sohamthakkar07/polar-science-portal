import React from 'react';
import { motion } from 'framer-motion';
import { Check, Radio, ChevronRight } from 'lucide-react';

interface Stage {
  stepNumber: number;
  phaseTitle: string;
}

interface StoryProgressRailProps {
  stages: Stage[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
  className?: string;
}

const STAGE_ICONS: Record<number, string> = {
  1: '🛰️',
  2: '📊',
  3: '📈',
  4: '🔎',
  5: '⚡',
  6: '📄',
  7: '🏆',
  8: '🔗'
};

export const StoryProgressRail: React.FC<StoryProgressRailProps> = ({
  stages,
  currentStepIndex,
  onSelectStep,
  className = ''
}) => {
  return (
    <div className={`hidden lg:flex flex-col space-y-2 p-4 rounded-2xl bg-polar-900/80 border border-polar-750 backdrop-blur-xl shadow-2xl select-none ${className}`}>
      <div className="text-3xs font-mono font-bold uppercase tracking-widest text-ice-400 mb-1 flex items-center gap-1.5 px-2">
        <Radio className="w-3 h-3 text-teal-400 animate-pulse" />
        <span>Expedition Rail</span>
      </div>

      <div className="relative space-y-1.5">
        {/* Connecting Vertical Progress Line */}
        <div className="absolute left-[17px] top-3 bottom-3 w-[2px] bg-polar-800 -z-0">
          <motion.div
            className="w-full bg-gradient-to-b from-ice-400 to-teal-400"
            initial={{ height: 0 }}
            animate={{
              height: `${(currentStepIndex / Math.max(1, stages.length - 1)) * 100}%`
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>

        {stages.map((stg, idx) => {
          const isActive = currentStepIndex === idx;
          const isCompleted = currentStepIndex > idx;
          const icon = STAGE_ICONS[stg.stepNumber] || '📍';

          return (
            <motion.button
              key={idx}
              type="button"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectStep(idx)}
              className={`relative z-10 w-full flex items-center gap-3 p-2 rounded-xl text-xs font-mono transition-all text-left cursor-pointer border ${
                isActive
                  ? 'bg-ice-500/20 border-ice-400/80 text-white font-bold shadow-md ring-1 ring-ice-400/30'
                  : isCompleted
                  ? 'bg-polar-950/60 border-polar-800 text-slate-300 hover:text-white'
                  : 'bg-polar-950/30 border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-2xs transition-colors ${
                  isActive
                    ? 'bg-ice-400 text-polar-950 font-bold shadow'
                    : isCompleted
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : 'bg-polar-950 border border-polar-800 text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : <span>{icon}</span>}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-slate-400 font-normal uppercase tracking-wider">
                  Phase 0{stg.stepNumber}
                </div>
                <div className="text-xs font-semibold truncate leading-tight">
                  {stg.phaseTitle}
                </div>
              </div>

              {isActive && <ChevronRight className="w-3.5 h-3.5 text-ice-300 shrink-0" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

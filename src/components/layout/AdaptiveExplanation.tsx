import React, { useState } from 'react';
import { Sparkles, Zap, ChevronDown, ChevronUp, BookOpen, Microscope } from 'lucide-react';

interface AdaptiveExplanationProps {
  studentSummary: string;
  studentAnalogy?: string;
  scientificDetail: string;
  governingMechanism?: string;
  topicTitle?: string;
  className?: string;
}

export const AdaptiveExplanation: React.FC<AdaptiveExplanationProps> = ({
  studentSummary,
  studentAnalogy,
  scientificDetail,
  governingMechanism,
  topicTitle,
  className = ''
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(true);

  return (
    <div className={`rounded-2xl border border-polar-800 bg-polar-900/90 shadow-panel overflow-hidden transition-all duration-200 ${className}`}>
      {/* Header Banner */}
      <div className="px-4 py-2 border-b border-polar-800 bg-polar-950/80 flex items-center justify-between text-2xs font-mono font-semibold text-ice-300">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-ice-400" />
          <span>SCIENTIFIC INSIGHT & MECHANISM</span>
        </div>
        {topicTitle && <span className="opacity-70 truncate max-w-[200px]">{topicTitle}</span>}
      </div>

      <div className="p-5 space-y-4">
        {/* Primary Takeaway */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-ice-300 flex items-center gap-1.5 font-mono">
            <Sparkles className="w-4 h-4 text-ice-400" />
            <span>Key Scientific Summary:</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-sans">
            {studentSummary}
          </p>

          {studentAnalogy && (
            <div className="p-3.5 rounded-xl bg-polar-950/80 border border-ice-500/20 text-xs text-slate-300 space-y-1">
              <span className="text-2xs font-mono uppercase text-ice-400 font-bold tracking-wider">
                💡 Real-World Analogy:
              </span>
              <p className="italic text-slate-300 leading-relaxed">
                "{studentAnalogy}"
              </p>
            </div>
          )}

          {/* Technical Detail & Mechanism */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="text-2xs font-mono text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Microscope className="w-3.5 h-3.5 text-teal-400" />
              <span>{showTechnicalDetails ? 'Hide Quantitative Details' : 'View Scientific Mechanism & Equations'}</span>
              {showTechnicalDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showTechnicalDetails && (
              <div className="mt-3 p-4 rounded-xl bg-polar-950 border border-polar-800 text-xs text-slate-300 space-y-2.5 animate-in fade-in duration-150">
                <div className="font-semibold text-teal-300 flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-teal-400" />
                  <span>Governing Mechanism & Data Record:</span>
                </div>
                <p className="leading-relaxed text-slate-200 font-sans">{scientificDetail}</p>
                {governingMechanism && (
                  <div className="font-mono text-2xs text-teal-300 bg-polar-900 p-2.5 rounded-lg border border-polar-800/80">
                    <span className="text-slate-400 block mb-1 font-bold">FORMULA / REGISTRY:</span>
                    <code>{governingMechanism}</code>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

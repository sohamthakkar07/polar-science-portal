import React, { useState } from 'react';
import { GraduationCap, Microscope, Sparkles, Zap, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { useAudience } from '../../context/AudienceContext';

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
  const { isStudent } = useAudience();
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  return (
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
      isStudent
        ? 'bg-polar-900/90 border-ice-500/30 shadow-panel'
        : 'bg-polar-900/95 border-teal-500/30 shadow-panel'
    } ${className}`}>
      
      {/* Mode Header Banner */}
      <div className={`px-4 py-2 border-b flex items-center justify-between text-2xs font-mono font-semibold ${
        isStudent
          ? 'bg-ice-500/10 border-ice-500/20 text-ice-300'
          : 'bg-teal-500/10 border-teal-500/20 text-teal-300'
      }`}>
        <div className="flex items-center gap-2">
          {isStudent ? (
            <>
              <GraduationCap className="w-3.5 h-3.5 text-ice-400" />
              <span>STUDENT DISCOVERY VIEW</span>
            </>
          ) : (
            <>
              <Microscope className="w-3.5 h-3.5 text-teal-400" />
              <span>RESEARCHER DATA PERSPECTIVE</span>
            </>
          )}
        </div>
        {topicTitle && <span className="opacity-70 truncate max-w-[200px]">{topicTitle}</span>}
      </div>

      <div className="p-5 space-y-4">
        {/* Primary Perspective Display */}
        {isStudent ? (
          <div className="space-y-3">
            <div className="text-xs font-semibold text-ice-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-ice-400" />
              <span>Key Takeaway:</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
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

            {/* Expandable Technical Detail Button for Curious Students */}
            <div className="pt-2">
              <button
                onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                className="text-2xs font-mono text-ice-400 hover:text-ice-300 flex items-center gap-1 transition-colors"
              >
                <span>{showTechnicalDetails ? 'Hide Quantitative Details' : 'Expand Scientific Detail & Equations'}</span>
                {showTechnicalDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showTechnicalDetails && (
                <div className="mt-3 p-3.5 rounded-xl bg-polar-950 border border-polar-800 text-xs text-slate-300 space-y-2 animate-in fade-in duration-150">
                  <div className="font-semibold text-teal-300 flex items-center gap-1 font-mono text-2xs uppercase">
                    <Zap className="w-3 h-3" />
                    <span>Scientific Mechanism:</span>
                  </div>
                  <p className="leading-relaxed text-slate-300">{scientificDetail}</p>
                  {governingMechanism && (
                    <div className="font-mono text-2xs text-teal-400 bg-polar-900 p-2 rounded border border-polar-800">
                      {governingMechanism}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Researcher Perspective */
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-teal-300 flex items-center gap-1.5">
              <Microscope className="w-4 h-4 text-teal-400" />
              <span>Scientific Mechanism & Quantitative Record:</span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              {scientificDetail}
            </p>

            {governingMechanism && (
              <div className="p-3.5 rounded-xl bg-polar-950 border border-teal-500/30 font-mono text-xs text-teal-300 space-y-1">
                <span className="text-2xs uppercase tracking-wider text-slate-400 block font-bold">
                  Technical Specification / Formula:
                </span>
                <code>{governingMechanism}</code>
              </div>
            )}

            <div className="p-3 rounded-lg bg-polar-950/60 border border-polar-800 text-2xs text-slate-400 font-mono">
              <span className="font-bold text-slate-300">Plain Language Summary: </span>
              <span>{studentSummary}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

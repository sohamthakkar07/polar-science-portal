import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  BarChart2,
  FileText,
  ShieldCheck,
  Award,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { DATA_STORIES } from '../../data/dataStories';
import { DataStory, DataStoryStep } from '../../types/polar';
import { DataVisualizer } from './DataVisualizer';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { RESEARCH_PAPERS } from '../../data/researchPapers';
import { QUIZ_QUESTIONS } from '../../data/quizzes';
import { useQuiz } from '../../context/QuizContext';
import { useAudience } from '../../context/AudienceContext';
import { NavTab } from '../layout/Navbar';

interface DataStoriesProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialStorySlug?: string;
}

export const DataStories: React.FC<DataStoriesProps> = ({ onNavigate, initialStorySlug }) => {
  const { isStudent } = useAudience();
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(() => {
    if (initialStorySlug) {
      const idx = DATA_STORIES.findIndex((s) => s.slug === initialStorySlug);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<string | null>(null);

  const { recordAnswer } = useQuiz();

  const story: DataStory = DATA_STORIES[selectedStoryIndex];
  const step: DataStoryStep = story.steps[currentStepIndex];
  const totalSteps = story.steps.length;

  const connectedPaper = RESEARCH_PAPERS.find((p) => p.id === story.concludingResearchId);
  const connectedQuiz = QUIZ_QUESTIONS.find((q) => q.id === story.relatedQuizId);

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(null);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setSelectedOptionId(null);
    }
  };

  const handleSelectStory = (idx: number) => {
    setSelectedStoryIndex(idx);
    setCurrentStepIndex(0);
    setSelectedOptionId(null);
    setQuizAnswerSelected(null);
  };

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-polar-900 border border-ice-500/30 text-ice-300 text-2xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider font-semibold">Guided Data Scrollytelling</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Interactive Data Stories
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Guided scientific discovery journeys connecting measurements to climate mechanisms, research papers, and interactive comprehension checks.
          </p>
        </div>

        {/* Story Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {DATA_STORIES.map((s, idx) => {
            const isActive = selectedStoryIndex === idx;
            return (
              <button
                key={s.id}
                onClick={() => handleSelectStory(idx)}
                className={`px-4 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
                  isActive
                    ? 'bg-ice-500 text-polar-950 border-ice-400 shadow-sm font-bold'
                    : 'bg-polar-900/80 border-polar-800 text-slate-300 hover:text-white hover:bg-polar-850'
                }`}
              >
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Story Container */}
        <div className="bg-polar-900/90 rounded-2xl border border-polar-800 p-6 sm:p-8 shadow-panel backdrop-blur-xl space-y-6">
          {/* Progress Steps Indicator */}
          <div className="space-y-2 border-b border-polar-800 pb-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="font-bold text-ice-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ice-400 animate-pulse" />
                Step {step.stepNumber} of {totalSteps}: {step.phaseTitle}
              </span>
              <span className="bg-polar-950 border border-polar-750 px-2.5 py-0.5 rounded text-2xs text-ice-300">
                {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% Complete
              </span>
            </div>

            {/* Segmented reading progress bar */}
            <div className="w-full h-2 bg-polar-950 rounded-full overflow-hidden flex p-0.5 border border-polar-800 shadow-inner">
              {story.steps.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-full rounded-sm transition-all duration-300 ${
                    i <= currentStepIndex ? 'bg-ice-400 shadow-sm' : 'bg-polar-800/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step Main Content */}
          <div className="space-y-6">
            <div>
              <span className="text-2xs font-mono font-semibold uppercase tracking-widest text-teal-400">
                {step.phaseTitle}
              </span>
              <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                {step.headline}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-polar-950/70 p-5 rounded-xl border border-polar-800">
              {step.content}
            </p>

            {/* Embedded Visualizer during Step 2 and 3 */}
            {(step.stepNumber === 2 || step.stepNumber === 3) && (
              <div className="space-y-2 pt-2">
                <DataVisualizer datasetKey={story.timeSeriesKey} title={story.title} />
              </div>
            )}

            {/* Reflection Question in Step 4 */}
            {step.stepNumber === 4 && step.interactiveOptions && (
              <div className="space-y-3 p-5 rounded-xl bg-polar-950 border border-ice-500/30">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-ice-400 uppercase">
                  <HelpCircle className="w-4 h-4" />
                  <span>Scientific Observation Check</span>
                </div>
                <p className="text-sm font-semibold text-slate-100">{step.promptQuestion}</p>
                <div className="space-y-2 pt-2">
                  {step.interactiveOptions.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedOptionId(opt.id)}
                        className={`w-full text-left p-3.5 rounded-lg text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-polar-800 border-ice-400 text-white font-semibold'
                            : 'bg-polar-900 border-polar-800 text-slate-300 hover:bg-polar-850'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>

                {selectedOptionId && (
                  <div className="p-3.5 rounded-lg bg-polar-900 border border-teal-500/40 text-xs text-teal-300 space-y-1">
                    <span className="font-bold font-mono">Mechanism Explanation: </span>
                    <span>
                      {step.interactiveOptions.find((o) => o.id === selectedOptionId)?.isCorrectReason}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Scientific Insight Box */}
            <div className="p-4 rounded-xl bg-polar-950/80 border border-polar-800 text-xs text-slate-300 flex items-start gap-3">
              <span className="text-base">🔬</span>
              <div>
                <strong className="text-slate-100 block mb-0.5 font-mono">Scientific Principle:</strong>
                <span>{step.scientificInsight}</span>
              </div>
            </div>

            {/* Peer Reviewed Research Card in Step 6 */}
            {step.stepNumber === 6 && connectedPaper && (
              <div className="p-5 rounded-xl bg-polar-950 border border-polar-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xs font-mono font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Supporting Peer-Reviewed Research
                  </span>
                  <span className="text-2xs font-mono text-slate-400">DOI: {connectedPaper.doi}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{connectedPaper.title}</h3>
                <p className="text-xs text-slate-400 italic">
                  {connectedPaper.authors.join(', ')} ({connectedPaper.year}) • <em>{connectedPaper.journal}</em>
                </p>
                <p className="text-xs text-slate-300 bg-polar-900 p-3 rounded-lg border border-polar-800">
                  {connectedPaper.abstract}
                </p>
                <button
                  onClick={() => onNavigate('research', connectedPaper.id)}
                  className="text-xs font-mono text-ice-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Read full record in Research Discovery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Interactive Quiz Check in Step 7 */}
            {step.stepNumber === 7 && connectedQuiz && (
              <div className="p-5 rounded-xl bg-polar-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-2xs font-mono font-semibold text-amber-400 uppercase">
                  <Award className="w-4 h-4" />
                  <span>Comprehension Check</span>
                </div>
                <p className="text-sm font-bold text-white">{connectedQuiz.question}</p>
                <div className="space-y-2 pt-2">
                  {connectedQuiz.options.map((opt) => {
                    const isSelected = quizAnswerSelected === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setQuizAnswerSelected(opt.id);
                          recordAnswer(connectedQuiz.id, opt.isCorrect, connectedQuiz.topic, connectedQuiz.badgeRewardId);
                        }}
                        className={`w-full text-left p-3 rounded-lg text-xs font-medium border transition-all ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-polar-900 border-polar-800 text-slate-300 hover:bg-polar-850'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
                {quizAnswerSelected && (
                  <div className="p-3 rounded-lg bg-polar-900 border border-polar-800 text-xs text-slate-200">
                    <span className="font-mono font-bold text-teal-400">Explanation: </span>
                    <span>{connectedQuiz.whyExplanation}</span>
                  </div>
                )}
              </div>
            )}

            {/* Provenance Card in Step 8 */}
            {step.stepNumber === 8 && (
              <div className="space-y-3">
                <ProvenanceBadge provenance={story.provenance} />
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-polar-800 font-mono text-xs">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                currentStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-polar-950 text-slate-600'
                  : 'bg-polar-950 hover:bg-polar-850 text-slate-300 border border-polar-800'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            {currentStepIndex < totalSteps - 1 ? (
              <button
                onClick={handleNextStep}
                className="px-5 py-2 rounded-lg bg-ice-500 hover:bg-ice-400 text-polar-950 font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <span>Next: {story.steps[currentStepIndex + 1]?.phaseTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate(isStudent ? 'quiz' : 'data', story.datasetId)}
                className="px-5 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-polar-950 font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <span>{isStudent ? 'Take Polar Quiz Challenge 🏆' : 'Inspect Raw Datasets & DOIs 📊'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
import { NavTab } from '../layout/Navbar';

interface DataStoriesProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialStorySlug?: string;
}

export const DataStories: React.FC<DataStoriesProps> = ({ onNavigate, initialStorySlug }) => {
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
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-frost-cyan/20 border border-frost-cyan/50 text-frost-cyan text-xs font-semibold shadow-polar-glow">
            <Sparkles className="w-4 h-4 text-frost-teal" />
            <span>Signature Interactive Experience</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
            📊 Interactive Data Stories
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Transforming real polar scientific datasets into an 8-step guided discovery journey: Measure &rarr; Visualize &rarr; Observe &rarr; Explain &rarr; Research &rarr; Quiz &rarr; Verify.
          </p>
        </div>

        {/* Story Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {DATA_STORIES.map((s, idx) => {
            const isActive = selectedStoryIndex === idx;
            return (
              <button
                key={s.id}
                onClick={() => handleSelectStory(idx)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                  isActive
                    ? 'bg-polar-800 border-frost-cyan text-frost-cyan shadow-polar-glow'
                    : 'bg-polar-900 border-polar-800 text-slate-400 hover:text-slate-200 hover:bg-polar-850'
                }`}
              >
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Story Card with 8-Step Progress Indicator */}
        <div className="bg-polar-900/90 rounded-3xl border border-polar-750 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Progress Steps Indicator */}
          <div className="space-y-2 border-b border-polar-800 pb-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-frost-cyan">
                Step {step.stepNumber} of {totalSteps}: {step.phaseTitle}
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% Complete
              </span>
            </div>

            <div className="w-full h-2 bg-polar-950 rounded-full overflow-hidden flex">
              {story.steps.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-full border-r border-polar-900 transition-all ${
                    i <= currentStepIndex ? 'bg-gradient-to-r from-frost-cyan to-frost-teal' : 'bg-polar-850'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step Main Content */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-frost-teal font-mono">
                {step.phaseTitle}
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white font-mono mt-1">
                {step.headline}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-polar-950/60 p-5 rounded-2xl border border-polar-800">
              {step.content}
            </p>

            {/* Embedded Visualizer during Step 2 and 3 */}
            {(step.stepNumber === 2 || step.stepNumber === 3) && (
              <div className="space-y-2 pt-2">
                <DataVisualizer datasetKey={story.timeSeriesKey} title={story.title} />
              </div>
            )}

            {/* Interactive Reflection Question in Step 4 */}
            {step.stepNumber === 4 && step.interactiveOptions && (
              <div className="space-y-3 p-5 rounded-2xl bg-polar-950 border border-frost-cyan/30">
                <div className="flex items-center gap-2 text-xs font-bold text-frost-cyan uppercase">
                  <HelpCircle className="w-4 h-4" />
                  <span>Student Observation Question</span>
                </div>
                <p className="text-sm font-semibold text-slate-100">{step.promptQuestion}</p>
                <div className="space-y-2 pt-2">
                  {step.interactiveOptions.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedOptionId(opt.id)}
                        className={`w-full text-left p-3.5 rounded-xl text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-polar-800 border-frost-cyan text-white shadow-sm'
                            : 'bg-polar-900 border-polar-800 text-slate-300 hover:bg-polar-850'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>

                {selectedOptionId && (
                  <div className="p-3.5 rounded-xl bg-polar-900 border border-frost-teal/40 text-xs text-frost-teal space-y-1 animate-in fade-in">
                    <span className="font-bold">Explanation: </span>
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
                <strong className="text-slate-100 block mb-0.5">Scientific Principle:</strong>
                <span>{step.scientificInsight}</span>
              </div>
            </div>

            {/* Peer Reviewed Research Card in Step 6 */}
            {step.stepNumber === 6 && connectedPaper && (
              <div className="p-5 rounded-2xl bg-polar-950 border border-indigo-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Grounding Research Paper
                  </span>
                  <span className="text-[11px] font-mono text-frost-cyan">DOI: {connectedPaper.doi}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{connectedPaper.title}</h3>
                <p className="text-xs text-slate-400 italic">
                  {connectedPaper.authors.join(', ')} ({connectedPaper.year}) • <em>{connectedPaper.journal}</em>
                </p>
                <p className="text-xs text-slate-300 bg-polar-900 p-3 rounded-xl border border-polar-800">
                  {connectedPaper.abstract}
                </p>
                <button
                  onClick={() => onNavigate('research', connectedPaper.id)}
                  className="text-xs font-bold text-frost-cyan hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore in Research Discovery</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Interactive Quiz Check in Step 7 */}
            {step.stepNumber === 7 && connectedQuiz && (
              <div className="p-5 rounded-2xl bg-polar-950 border border-amber-500/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                  <Award className="w-4 h-4" />
                  <span>Knowledge Check</span>
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
                        className={`w-full text-left p-3 rounded-xl text-xs font-medium border transition-all ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                              : 'bg-rose-950 border-rose-500 text-rose-200'
                            : 'bg-polar-900 border-polar-800 text-slate-300 hover:bg-polar-850'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
                {quizAnswerSelected && (
                  <div className="p-3 rounded-xl bg-polar-900 border border-polar-800 text-xs text-slate-200 animate-in fade-in">
                    <span className="font-bold text-frost-teal">Why? </span>
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
          <div className="flex items-center justify-between pt-6 border-t border-polar-800">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
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
                className="px-6 py-2.5 rounded-xl bg-frost-cyan hover:bg-sky-300 text-polar-950 font-bold text-xs flex items-center gap-2 shadow-polar-glow transition-all"
              >
                <span>Next: {story.steps[currentStepIndex + 1]?.phaseTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate('quiz')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-frost-cyan to-frost-teal hover:opacity-95 text-polar-950 font-bold text-xs flex items-center gap-2 shadow-polar-glow transition-all"
              >
                <span>Take Polar Quiz &rarr;</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

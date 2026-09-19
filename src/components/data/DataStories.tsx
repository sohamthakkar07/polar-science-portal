import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  BookOpen,
  Radio,
  Compass,
  Zap,
  Globe2,
  Layers
} from 'lucide-react';
import { DATA_STORIES } from '../../data/dataStories';
import { DataStory, DataStoryStep } from '../../types/polar';
import { DataVisualizer } from './DataVisualizer';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { RESEARCH_PAPERS } from '../../data/researchPapers';
import { QUIZ_QUESTIONS } from '../../data/quizzes';
import { useQuiz } from '../../context/QuizContext';
import { NavTab } from '../layout/Navbar';
import { LearningEnvironment } from '../learn/LearningEnvironment';
import { EnvironmentTheme } from '../learn/EnvironmentBackground';
import { StoryProgressRail } from '../learn/StoryProgressRail';

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

  const story: DataStory = DATA_STORIES[selectedStoryIndex] || DATA_STORIES[0];
  const step: DataStoryStep = story.steps[currentStepIndex] || story.steps[0];
  const totalSteps = story.steps.length;

  const connectedPaper = RESEARCH_PAPERS.find((p) => p.id === story.concludingResearchId);
  const connectedQuiz = QUIZ_QUESTIONS.find((q) => q.id === story.relatedQuizId);

  // Map story topic to environment theme
  const getThemeForStory = (s: DataStory): EnvironmentTheme => {
    if (s.id.includes('sea-ice') || s.topic === 'Cryosphere') return 'sea-ice';
    if (s.id.includes('ozone') || s.topic === 'Atmosphere') return 'ozone-atmosphere';
    if (s.topic === 'Ocean') return 'ocean-climate';
    return 'space-satellite';
  };

  const activeTheme = getThemeForStory(story);

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
    <LearningEnvironment theme={activeTheme} stageIndex={currentStepIndex}>
      <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* EDITORIAL HEADER TITLE */}
        <div className="text-center space-y-3 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-polar-900/90 border border-ice-400/40 text-ice-300 text-xs font-mono backdrop-blur-md shadow-lg">
            <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span className="uppercase tracking-widest font-bold">CINEMATIC GUIDED SCROLLYTELLING</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-md font-sans">
            Interactive Polar Science Stories
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Travel through satellite observations, polar ice sheets, atmospheric chemistry, and ground-truth climate evidence.
          </p>
        </div>

        {/* REDESIGNED STORY SELECTOR CARDS WITH ENVIRONMENT PREVIEWS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {DATA_STORIES.map((s, idx) => {
            const isActive = selectedStoryIndex === idx;
            const cardTheme = getThemeForStory(s);
            return (
              <motion.button
                key={s.id}
                type="button"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectStory(idx)}
                className={`relative overflow-hidden rounded-2xl p-5 text-left transition-all border cursor-pointer group shadow-xl ${
                  isActive
                    ? 'bg-polar-900/95 border-ice-400 ring-2 ring-ice-400/40'
                    : 'bg-polar-950/80 border-polar-800 hover:border-polar-700 hover:bg-polar-900/80'
                }`}
              >
                {/* Background Environment Image Preview */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-30 group-hover:opacity-40 transition-opacity">
                  <img
                    src={s.heroImage}
                    alt={s.title}
                    className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-polar-950 via-polar-950/80 to-transparent" />
                </div>

                <div className="relative z-10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-2xs font-mono font-bold bg-ice-500/20 border border-ice-400/50 text-ice-300">
                      {s.topic} • {s.region}
                    </span>
                    {isActive && (
                      <span className="flex items-center gap-1 text-2xs font-mono text-teal-300 font-bold bg-teal-500/20 px-2 py-0.5 rounded border border-teal-500/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                        ACTIVE JOURNEY
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-ice-200 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {s.subtitle}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* MAIN EDITORIAL STORY WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Expedition Progress Rail (Desktop) */}
          <div className="lg:col-span-4 sticky top-24">
            <StoryProgressRail
              stages={story.steps}
              currentStepIndex={currentStepIndex}
              onSelectStep={(idx) => setCurrentStepIndex(idx)}
            />

            {/* Scientific Telemetry Metadata Box */}
            <div className="mt-4 p-4 rounded-2xl bg-polar-900/80 border border-polar-750 backdrop-blur-xl text-xs space-y-2 shadow-lg">
              <div className="text-2xs font-mono font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-ice-400" />
                <span>Observed Metric Overview</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono bg-polar-950/80 p-3 rounded-xl border border-polar-800">
                {story.whatAreWeMeasuring}
              </p>
            </div>
          </div>

          {/* Main Editorial Content Card (Desktop lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Mobile Progress Bar */}
            <div className="lg:hidden bg-polar-900/90 border border-polar-800 rounded-2xl p-4 space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="font-bold text-ice-300">
                  Step {step.stepNumber} of {totalSteps}: {step.phaseTitle}
                </span>
                <span className="text-2xs text-teal-300 font-bold">
                  {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% Complete
                </span>
              </div>
              <div className="w-full h-2 bg-polar-950 rounded-full overflow-hidden flex p-0.5 border border-polar-800">
                {story.steps.map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-full rounded-sm transition-all duration-300 ${
                      i <= currentStepIndex ? 'bg-ice-400' : 'bg-polar-800/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* EDITORIAL LESSON CARD */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-polar-900/90 border border-polar-750 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8 relative overflow-hidden"
              >
                {/* Step Telemetry Badge Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-polar-800 pb-5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-2xs font-mono font-bold bg-ice-500/20 border border-ice-400/40 text-ice-300 uppercase tracking-wider">
                      PHASE 0{step.stepNumber} · {step.phaseTitle}
                    </span>
                    <span className="text-2xs font-mono text-slate-400">
                      {story.title.split(':')[0]}
                    </span>
                  </div>
                  <span className="text-2xs font-mono text-teal-300 font-bold bg-polar-950 px-2.5 py-1 rounded-lg border border-polar-750">
                    Step {step.stepNumber} of {totalSteps}
                  </span>
                </div>

                {/* Main Headline & Lead Content */}
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {step.headline}
                  </h2>
                  <p className="text-sm sm:text-lg text-slate-200 leading-relaxed font-sans bg-polar-950/80 p-6 rounded-2xl border border-polar-800 shadow-inner">
                    {step.content}
                  </p>
                </div>

                {/* Embedded Visualizer during Step 2 and 3 ("You have now reached the evidence") */}
                {(step.stepNumber === 2 || step.stepNumber === 3) && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-300 uppercase tracking-widest">
                      <BarChart2 className="w-4 h-4 text-teal-400" />
                      <span>Scientific Evidence · Grounded Time Series</span>
                    </div>
                    <DataVisualizer datasetKey={story.timeSeriesKey} title={story.title} />
                  </div>
                )}

                {/* Reflection Question in Step 4 */}
                {step.stepNumber === 4 && step.interactiveOptions && (
                  <div className="space-y-4 p-6 rounded-2xl bg-polar-950 border border-ice-500/30 shadow-xl">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-ice-400 uppercase tracking-widest">
                      <HelpCircle className="w-4 h-4" />
                      <span>Scientific Observation Check</span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-white">{step.promptQuestion}</p>
                    <div className="space-y-2.5 pt-1">
                      {step.interactiveOptions.map((opt) => {
                        const isSelected = selectedOptionId === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedOptionId(opt.id)}
                            className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-polar-850 border-ice-400 text-white font-semibold shadow-md ring-1 ring-ice-400/30'
                                : 'bg-polar-900 border-polar-800 text-slate-300 hover:bg-polar-850 hover:text-white'
                            }`}
                          >
                            {opt.text}
                          </button>
                        );
                      })}
                    </div>

                    {selectedOptionId && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-polar-900 border border-teal-500/40 text-xs sm:text-sm text-teal-300 space-y-1"
                      >
                        <span className="font-bold font-mono text-teal-400">Mechanism Explanation: </span>
                        <span>
                          {step.interactiveOptions.find((o) => o.id === selectedOptionId)?.isCorrectReason}
                        </span>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Scientific Insight Box (Field Notebook Entry Style) */}
                <div className="p-5 rounded-2xl bg-polar-950/90 border border-polar-750 text-xs sm:text-sm text-slate-300 flex items-start gap-3.5 shadow-md">
                  <div className="p-2 rounded-xl bg-teal-500/15 border border-teal-400/30 text-teal-300 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-white block font-mono uppercase tracking-wider text-xs">
                      Governing Scientific Principle
                    </strong>
                    <p className="text-slate-300 leading-relaxed">{step.scientificInsight}</p>
                  </div>
                </div>

                {/* Supporting Peer-Reviewed Paper Card in Step 6 */}
                {step.stepNumber === 6 && connectedPaper && (
                  <div className="p-6 rounded-2xl bg-polar-950 border border-polar-750 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-polar-800 pb-3">
                      <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-4 h-4" /> Grounding Peer-Reviewed Publication
                      </span>
                      <span className="text-2xs font-mono text-ice-300">DOI: {connectedPaper.doi}</span>
                    </div>
                    <h3 className="text-base sm:text-xl font-extrabold text-white leading-snug">
                      {connectedPaper.title}
                    </h3>
                    <div className="text-xs font-mono text-slate-400">
                      {connectedPaper.authors.join(', ')} ({connectedPaper.year}) • <em>{connectedPaper.journal}</em>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 bg-polar-900 p-4 rounded-xl border border-polar-800 leading-relaxed font-sans">
                      {connectedPaper.abstract}
                    </p>
                    <button
                      type="button"
                      onClick={() => onNavigate('research', connectedPaper.id)}
                      className="px-4 py-2.5 rounded-xl bg-ice-400 hover:bg-ice-300 text-polar-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                    >
                      <span>Read full publication in Research Archive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Interactive Quiz Check in Step 7 */}
                {step.stepNumber === 7 && connectedQuiz && (
                  <div className="p-6 rounded-2xl bg-polar-950 border border-amber-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                      <Award className="w-4 h-4" />
                      <span>Story Comprehension Assessment</span>
                    </div>
                    <p className="text-base font-bold text-white">{connectedQuiz.question}</p>
                    <div className="space-y-2.5 pt-1">
                      {connectedQuiz.options.map((opt) => {
                        const isSelected = quizAnswerSelected === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setQuizAnswerSelected(opt.id);
                              recordAnswer(connectedQuiz.id, opt.isCorrect, connectedQuiz.topic, connectedQuiz.badgeRewardId);
                            }}
                            className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                              isSelected
                                ? opt.isCorrect
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                                  : 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md'
                                : 'bg-polar-900 border-polar-800 text-slate-300 hover:bg-polar-850 hover:text-white'
                            }`}
                          >
                            {opt.text}
                          </button>
                        );
                      })}
                    </div>
                    {quizAnswerSelected && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-polar-900 border border-polar-800 text-xs sm:text-sm text-slate-200 space-y-1"
                      >
                        <span className="font-mono font-bold text-teal-400">Explanation: </span>
                        <span>{connectedQuiz.whyExplanation}</span>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Provenance Card in Step 8 */}
                {step.stepNumber === 8 && (
                  <div className="space-y-3 pt-2">
                    <ProvenanceBadge provenance={story.provenance} />
                  </div>
                )}

                {/* TACTILE NAVIGATION CONTROLS */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-polar-800 font-mono text-xs">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={currentStepIndex === 0}
                    className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      currentStepIndex === 0
                        ? 'opacity-30 cursor-not-allowed bg-polar-950 text-slate-600 border border-polar-850'
                        : 'bg-polar-950 hover:bg-polar-850 text-slate-300 border border-polar-750 hover:text-white'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Step</span>
                  </button>

                  {currentStepIndex < totalSteps - 1 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 rounded-xl bg-ice-400 hover:bg-ice-300 text-polar-950 font-extrabold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
                    >
                      <span>Next Phase: {story.steps[currentStepIndex + 1]?.phaseTitle}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNavigate('data', story.datasetId)}
                      className="px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-polar-950 font-extrabold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
                    >
                      <span>Inspect Telemetry & DOIs 📊</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>
    </LearningEnvironment>
  );
};

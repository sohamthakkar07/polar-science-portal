import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** Strip emoji characters from text */
const stripEmoji = (str: string): string =>
  str.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2B50}\u{1F300}-\u{1F9FF}\u{FE00}-\u{FEFF}\u{200D}]+/gu, '').trim();

import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  Lock,
  Award,
  X,
  Flame,
  ChevronRight,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Microscope,
  Compass,
  Database,
  Sparkles,
  Trophy,
  Radio,
  Zap,
  Terminal
} from 'lucide-react';
import { QUIZ_QUESTIONS, POLAR_BADGES } from '../../data/quizzes';
import { QuizQuestion, QuizType } from '../../types/polar';
import { useQuiz } from '../../context/QuizContext';
import { DataVisualizer } from '../data/DataVisualizer';
import { NavTab } from '../layout/Navbar';
import { LearningEnvironment } from '../learn/LearningEnvironment';

interface QuizCenterProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialQuestionId?: string;
}

const MODE_LABELS: Record<QuizType | 'all', string> = {
  'all':                  'All Challenges',
  'quick-mcq':            'Multiple Choice',
  'myth-fact':            'Myth vs. Fact',
  'guess-the-chart':      'Read the Data',
  'scenario-challenge':   'Scientific Dilemma',
};

export const QuizCenter: React.FC<QuizCenterProps> = ({ onNavigate }) => {
  const { score, streak, recordAnswer, isBadgeUnlocked, resetProgress } = useQuiz();
  const [selectedType, setSelectedType] = useState<QuizType | 'all'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [showBadgesPanel, setShowBadgesPanel] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const modes: (QuizType | 'all')[] = ['all', 'quick-mcq', 'myth-fact', 'guess-the-chart', 'scenario-challenge'];

  const filteredQuestions = useMemo(() => {
    return QUIZ_QUESTIONS.filter((q) => selectedType === 'all' || q.type === selectedType);
  }, [selectedType]);

  const currentQuestion: QuizQuestion =
    filteredQuestions[currentQuestionIndex] || filteredQuestions[0] || QUIZ_QUESTIONS[0];

  const handleOptionClick = (optionId: string, isCorrect: boolean) => {
    if (hasAnsweredCurrent) return;
    setSelectedOptionId(optionId);
    setHasAnsweredCurrent(true);
    recordAnswer(currentQuestion.id, isCorrect, currentQuestion.topic, currentQuestion.badgeRewardId);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasAnsweredCurrent(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setHasAnsweredCurrent(false);
    setIsCompleted(false);
  };

  const handleModeChange = (mode: QuizType | 'all') => {
    setSelectedType(mode);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setHasAnsweredCurrent(false);
    setIsCompleted(false);
  };

  return (
    <LearningEnvironment theme="space-satellite">
      <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">

        {/* EXPEDITION COMMAND ROOM HEADER */}
        <div className="bg-polar-900/90 border border-amber-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-2xs font-bold uppercase tracking-widest">
                <Terminal className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>EXPEDITION COMMAND // ASSESSMENT MODE ONLINE</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
                Polar Scientific Challenge Room
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Test your understanding of polar climate teleconnections, station physics, and satellite records.
              </p>
            </div>

            {/* Score & Streak Counters HUD */}
            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-polar-950 border border-polar-750 text-center min-w-[90px] shadow-inner">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Score</div>
                <div className="text-xl font-bold text-amber-400">{score} pts</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-polar-950 border border-polar-750 text-center min-w-[90px] shadow-inner">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Streak</div>
                <div className="text-xl font-bold text-orange-400 flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>{streak}x</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowBadgesPanel(true)}
                className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-300 hover:bg-amber-500/25 transition-colors cursor-pointer text-center min-w-[90px]"
              >
                <Award className="w-5 h-5 mx-auto text-amber-400 mb-0.5" />
                <div className="text-[10px] font-bold">Badges</div>
              </button>
            </div>
          </div>

          {/* 3-Step Journey Indicator */}
          <div className="flex items-center gap-2 font-mono text-2xs sm:text-xs pt-3 border-t border-polar-800">
            <div
              onClick={() => onNavigate('learn')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-polar-950/80 border border-polar-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <span>1. Understand 🎓</span>
            </div>
            <span className="text-slate-600">→</span>
            <div
              onClick={() => onNavigate('explore')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-polar-950/80 border border-polar-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <span>2. Explore 🗺️</span>
            </div>
            <span className="text-slate-600">→</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>3. Test 🏆</span>
            </div>
          </div>
        </div>

        {/* CHALLENGE TYPE FILTER BAR */}
        <div className="bg-polar-900/90 border border-polar-800 rounded-2xl p-2.5 backdrop-blur-xl flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-xs shadow-lg">
          {modes.map((mode) => {
            const isActive = selectedType === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => handleModeChange(mode)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-polar-950 shadow-md'
                    : 'bg-polar-950 border border-polar-800 text-slate-400 hover:text-white hover:border-polar-750'
                }`}
              >
                {MODE_LABELS[mode]}
              </button>
            );
          })}
        </div>

        {/* MAIN QUESTION DISPLAY OR COMPLETION SCREEN */}
        {!isCompleted && currentQuestion ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-polar-900/90 border border-polar-750 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6"
            >
              {/* Question Telemetry Header */}
              <div className="flex items-center justify-between border-b border-polar-800 pb-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-2xs font-bold bg-amber-500/15 border border-amber-400/30 text-amber-300">
                    {currentQuestion.topic}
                  </span>
                  <span className="text-2xs text-slate-400">
                    {MODE_LABELS[currentQuestion.type]}
                  </span>
                </div>
                <span className="text-2xs text-slate-400">
                  Question {currentQuestionIndex + 1} of {filteredQuestions.length}
                </span>
              </div>

              {/* Question Text */}
              <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                {currentQuestion.question}
              </h2>

              {/* Embedded Chart if question type is 'guess-the-chart' */}
              {currentQuestion.type === 'guess-the-chart' && currentQuestion.chartConfigKey && (
                <div className="p-4 rounded-2xl bg-polar-950 border border-polar-800">
                  <DataVisualizer datasetKey={currentQuestion.chartConfigKey} title={currentQuestion.topic} />
                </div>
              )}

              {/* Options Grid */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  const showState = hasAnsweredCurrent;

                  let borderStyle = 'border-polar-800 bg-polar-950 text-slate-200 hover:bg-polar-850 hover:border-polar-700';
                  if (showState) {
                    if (opt.isCorrect) {
                      borderStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md';
                    } else if (isSelected && !opt.isCorrect) {
                      borderStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md';
                    }
                  } else if (isSelected) {
                    borderStyle = 'bg-polar-850 border-amber-400 text-white font-semibold';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={hasAnsweredCurrent}
                      onClick={() => handleOptionClick(opt.id, opt.isCorrect)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between gap-3 border ${borderStyle}`}
                    >
                      <span className="leading-relaxed">{opt.text}</span>
                      {showState && opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {showState && isSelected && !opt.isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card upon answering */}
              {hasAnsweredCurrent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-polar-950 border border-amber-500/30 text-xs sm:text-sm text-slate-200 space-y-2"
                >
                  <div className="font-mono font-bold text-amber-400 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span>Scientific Explanation</span>
                  </div>
                  <p className="leading-relaxed font-sans text-slate-300">
                    {currentQuestion.whyExplanation}
                  </p>
                </motion.div>
              )}

              {/* Action Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-polar-800 font-mono text-xs">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="px-4 py-2.5 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-800 text-slate-400 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Session</span>
                </button>

                {hasAnsweredCurrent && (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-polar-950 font-extrabold flex items-center gap-2 cursor-pointer transition-all shadow-lg"
                  >
                    <span>
                      {currentQuestionIndex < filteredQuestions.length - 1 ? 'Next Question' : 'Complete Assessment'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          /* COMPLETION SCREEN */
          <div className="bg-polar-900/90 border border-amber-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center mx-auto text-amber-300">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
                Assessment Completed!
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                You've successfully tested your understanding of polar climate systems, station observations, and satellite records.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto font-mono text-xs">
              <div className="p-4 rounded-2xl bg-polar-950 border border-polar-750">
                <div className="text-slate-400 text-[10px] uppercase">Final Score</div>
                <div className="text-2xl font-bold text-amber-400 mt-1">{score} pts</div>
              </div>
              <div className="p-4 rounded-2xl bg-polar-950 border border-polar-750">
                <div className="text-slate-400 text-[10px] uppercase">Best Streak</div>
                <div className="text-2xl font-bold text-orange-400 mt-1">{streak}x</div>
              </div>
            </div>

            {/* Contextual Next Actions */}
            <div className="pt-6 border-t border-polar-800 space-y-4 max-w-xl mx-auto">
              <div className="text-xs font-mono text-slate-400">
                What would you like to explore next across PolarVerse?
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => onNavigate('learn')}
                  className="px-5 py-3.5 bg-ice-400 hover:bg-ice-300 text-polar-950 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Concepts 🎓</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('data')}
                  className="px-5 py-3.5 bg-teal-400 hover:bg-teal-300 text-polar-950 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Database className="w-4 h-4" />
                  <span>Inspect Data Evidence 🔬</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleRestartQuiz}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto pt-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Challenge Mode</span>
              </button>
            </div>
          </div>
        )}

        {/* BADGES GALLERY MODAL */}
        {showBadgesPanel && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-polar-950/85 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Polar Science Badges"
          >
            <div className="w-full max-w-xl bg-polar-900 border border-polar-750 rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-polar-800 bg-polar-950">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-bold text-white font-mono">Polar Science Achievement Badges</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBadgesPanel(false)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close badges panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="divide-y divide-polar-800 max-h-96 overflow-y-auto">
                {POLAR_BADGES.map((badge) => {
                  const unlocked = isBadgeUnlocked(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`flex items-start gap-4 p-5 ${unlocked ? 'bg-polar-900/60' : 'opacity-40 bg-polar-950/50'}`}
                    >
                      <div className="w-10 h-10 rounded-2xl bg-polar-950 border border-polar-800 flex items-center justify-center shrink-0">
                        {unlocked ? (
                          <Award className="w-5 h-5 text-amber-400" />
                        ) : (
                          <Lock className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white">{badge.title}</span>
                          {unlocked && (
                            <span className="text-2xs font-mono text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                              Unlocked
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{badge.description}</p>
                        <span className="text-3xs font-mono text-slate-500 uppercase tracking-wider block mt-1">
                          {badge.category}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </LearningEnvironment>
  );
};

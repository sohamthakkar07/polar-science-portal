import React, { useState, useMemo } from 'react';

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
  Trophy
} from 'lucide-react';
import { QUIZ_QUESTIONS, POLAR_BADGES } from '../../data/quizzes';
import { QuizQuestion, QuizType } from '../../types/polar';
import { useQuiz } from '../../context/QuizContext';
import { useAudience } from '../../context/AudienceContext';
import { DataVisualizer } from '../data/DataVisualizer';
import { NavTab } from '../layout/Navbar';

interface QuizCenterProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialQuestionId?: string;
}

const MODE_LABELS: Record<QuizType | 'all', string> = {
  'all':                  'All Questions',
  'quick-mcq':            'Multiple Choice',
  'myth-fact':            'Myth or Fact',
  'guess-the-chart':      'Read the Data',
  'scenario-challenge':   'Scientific Dilemma',
};

export const QuizCenter: React.FC<QuizCenterProps> = ({ onNavigate }) => {
  const { isStudent } = useAudience();
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
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Compact Learning Journey Progress Header (Stage 3) */}
        <div className="bg-polar-900/90 border border-polar-800 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                Polar Science Learning Checkpoint
              </div>
              <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                Polar Knowledge Challenge
              </h1>
            </div>
          </div>

          {/* 3-Step Journey Indicator (Highlighter Stage 3) */}
          <div className="flex items-center gap-2 font-mono text-2xs sm:text-xs">
            <div
              onClick={() => onNavigate('learn')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-polar-950/80 border border-polar-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
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
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/50 text-amber-300 font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>3. Test 🏆</span>
            </div>
          </div>
        </div>

        {/* Header Stats Bar */}
        <div className="border-b border-polar-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-polar-900 border border-ice-500/30 text-ice-300 text-2xs font-mono mb-2">
              <Award className="w-3.5 h-3.5 text-ice-400" />
              <span className="uppercase tracking-wider font-semibold">Grounded Scientific Assessment</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Test your understanding of polar climate teleconnections, station physics, and satellite records. Answers reveal peer-reviewed scientific mechanisms.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
            <div className="p-3 rounded-xl bg-polar-900 border border-polar-800 text-center">
              <div className="text-[10px] uppercase font-semibold text-slate-400">Score</div>
              <div className="text-base font-bold text-amber-400 mt-0.5">{score} pts</div>
            </div>
            {streak > 1 && (
              <div className="p-3 rounded-xl bg-polar-900 border border-polar-800 text-center">
                <div className="text-[10px] uppercase font-semibold text-slate-400">Streak</div>
                <div className="text-base font-bold text-orange-400 flex items-center justify-center gap-1 mt-0.5">
                  <Flame className="w-3.5 h-3.5" />
                  {streak}x
                </div>
              </div>
            )}
            <button
              onClick={() => setShowBadgesPanel(true)}
              className="px-4 py-3 bg-polar-900 border border-polar-750 hover:border-ice-400 text-slate-200 hover:text-white rounded-xl transition-all font-semibold cursor-pointer"
            >
              Badges
            </button>
          </div>
        </div>

        {/* Quiz Mode Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-xs">
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => handleModeChange(mode)}
              className={`px-4 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all border ${
                selectedType === mode
                  ? 'bg-ice-500 text-polar-950 border-ice-400 font-bold shadow-sm'
                  : 'bg-polar-900/80 border-polar-800 text-slate-300 hover:text-white hover:bg-polar-850'
              }`}
              aria-pressed={selectedType === mode}
            >
              {MODE_LABELS[mode]}
            </button>
          ))}
        </div>

        {/* Main Quiz View or Results Card */}
        {!isCompleted ? (
          <div className="space-y-4">
            {/* Question Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs text-slate-300">
                <span className="font-semibold text-ice-300">
                  Question <span className="text-white font-bold">{currentQuestionIndex + 1}</span> of {filteredQuestions.length}
                </span>
                <span className="text-2xs text-slate-400">
                  {Math.round(((currentQuestionIndex + 1) / filteredQuestions.length) * 100)}% Complete
                </span>
              </div>

              {/* Segmented visual progress bar */}
              <div className="w-full h-2 bg-polar-950 rounded-full overflow-hidden flex p-0.5 border border-polar-800 shadow-inner">
                {filteredQuestions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 h-full rounded-sm transition-all duration-300 ${
                      idx === currentQuestionIndex
                        ? 'bg-ice-400 shadow-sm'
                        : idx < currentQuestionIndex
                        ? 'bg-teal-400'
                        : 'bg-polar-800/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-polar-900/90 rounded-2xl border border-polar-800 overflow-hidden backdrop-blur-xl shadow-panel space-y-0">
              {/* Metadata Banner */}
              <div className="p-4 bg-polar-950/80 border-b border-polar-800 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-2xs font-semibold bg-ice-500/20 text-ice-300 border border-ice-500/30">
                    {currentQuestion.topic}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-2xs text-slate-300 bg-polar-900 border border-polar-750">
                    {currentQuestion.difficulty}
                  </span>
                </div>
                <span className="text-slate-400 text-2xs">{MODE_LABELS[currentQuestion.type]}</span>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Question Text */}
                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {currentQuestion.question}
                </h2>

                {/* Embedded Chart if applicable */}
                {currentQuestion.visualType === 'chart' && currentQuestion.chartConfigKey && (
                  <div className="border border-polar-800 rounded-xl overflow-hidden">
                    <DataVisualizer datasetKey={currentQuestion.chartConfigKey} compact />
                  </div>
                )}

                {/* Answer Options */}
                <div className="space-y-3" role="group" aria-label="Answer options">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedOptionId === option.id;
                    const showCorrectness = hasAnsweredCurrent;

                    let optionStyle = 'bg-polar-950/80 border-polar-800 hover:border-ice-500/40 hover:bg-polar-850 text-slate-200';
                    let icon = null;

                    if (showCorrectness) {
                      if (option.isCorrect) {
                        optionStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-100 font-semibold shadow-sm';
                        icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-label="Correct answer" />;
                      } else if (isSelected && !option.isCorrect) {
                        optionStyle = 'bg-rose-950/90 border-rose-500 text-rose-100 font-semibold shadow-sm';
                        icon = <XCircle className="w-4 h-4 text-rose-400 shrink-0" aria-label="Incorrect answer" />;
                      } else {
                        optionStyle = 'bg-polar-950/40 border-polar-800/40 text-slate-600 opacity-40';
                      }
                    }

                    return (
                      <button
                        key={option.id}
                        disabled={hasAnsweredCurrent}
                        onClick={() => handleOptionClick(option.id, option.isCorrect)}
                        className={`w-full text-left p-4 rounded-xl border text-xs font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                      >
                        <span>{stripEmoji(option.text)}</span>
                        {icon}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {hasAnsweredCurrent && (
                  <div className="border-t border-polar-800 pt-6 space-y-4 font-sans animate-in fade-in duration-150">
                    <div className="p-4 rounded-xl bg-polar-950/80 border border-polar-800 space-y-1">
                      <div className="text-2xs font-mono font-semibold uppercase tracking-wider text-ice-400 mb-1">
                        Scientific Explanation & Mechanism
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {currentQuestion.whyExplanation}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-2xs font-mono text-slate-400 pt-2 border-t border-polar-800">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                        <span>Source: {currentQuestion.provenance.sourceOrganization}</span>
                      </div>
                      <a
                        href={currentQuestion.provenance.originalSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ice-400 hover:underline flex items-center gap-1"
                      >
                        <span>Verify Record</span>
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Controls */}
              <div className="p-4 sm:p-6 bg-polar-950 border-t border-polar-800 flex items-center justify-between font-mono text-xs">
                <button
                  onClick={resetProgress}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Score</span>
                </button>

                {hasAnsweredCurrent && (
                  <button
                    onClick={handleNextQuestion}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-ice-500 hover:bg-ice-400 text-polar-950 font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <span>{currentQuestionIndex < filteredQuestions.length - 1 ? 'Next Question' : 'View Challenge Results'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Polished Results Experience & Audience-Aware Gateway */
          <div className="bg-polar-900/90 rounded-2xl border border-polar-800 p-8 shadow-panel backdrop-blur-xl text-center space-y-6 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 flex items-center justify-center mx-auto shadow-sm">
              <Trophy className="w-8 h-8 text-amber-400" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Polar Knowledge Challenge Completed!
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                You've successfully tested your understanding of polar climate systems, station observations, and satellite records.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto font-mono text-xs">
              <div className="p-4 rounded-xl bg-polar-950 border border-polar-800">
                <div className="text-slate-400 text-[10px] uppercase">Final Score</div>
                <div className="text-2xl font-bold text-amber-400 mt-1">{score} pts</div>
              </div>
              <div className="p-4 rounded-xl bg-polar-950 border border-polar-800">
                <div className="text-slate-400 text-[10px] uppercase">Best Streak</div>
                <div className="text-2xl font-bold text-orange-400 mt-1">{streak}x</div>
              </div>
            </div>

            {/* Audience-Aware Next Action Gateway */}
            <div className="pt-4 border-t border-polar-800 space-y-4 max-w-xl mx-auto">
              <div className="text-xs font-mono text-slate-400">
                {isStudent ? 'What would you like to explore next?' : 'Inspect the underlying datasets and scientific publications:'}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {isStudent ? (
                  <>
                    <button
                      onClick={() => onNavigate('learn')}
                      className="px-5 py-3 bg-ice-500 hover:bg-ice-400 text-polar-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Explore Learning Modules 🎓</span>
                    </button>
                    <button
                      onClick={() => onNavigate('explore')}
                      className="px-5 py-3 bg-polar-950 border border-polar-750 hover:border-ice-400 text-slate-200 hover:text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Compass className="w-4 h-4 text-ice-400" />
                      <span>Explore Station Map 🗺️</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onNavigate('data')}
                      className="px-5 py-3 bg-teal-500 hover:bg-teal-400 text-polar-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                    >
                      <Database className="w-4 h-4" />
                      <span>Inspect Datasets & Evidence 🔬</span>
                    </button>
                    <button
                      onClick={() => onNavigate('research')}
                      className="px-5 py-3 bg-polar-950 border border-polar-750 hover:border-teal-400 text-slate-200 hover:text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-teal-400" />
                      <span>View Research DOIs 📑</span>
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={handleRestartQuiz}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto pt-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Challenge Mode</span>
              </button>
            </div>
          </div>
        )}

        {/* Badges Modal */}
        {showBadgesPanel && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-polar-950/85 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Polar Science Badges"
          >
            <div className="w-full max-w-xl bg-polar-900 border border-polar-800 rounded-2xl shadow-elevated overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-polar-800 bg-polar-950">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-bold text-white font-mono">Polar Science Achievement Badges</h3>
                </div>
                <button
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
                      <div className="w-9 h-9 rounded-xl bg-polar-950 border border-polar-800 flex items-center justify-center shrink-0">
                        {unlocked
                          ? <Award className="w-5 h-5 text-amber-400" />
                          : <Lock className="w-4 h-4 text-slate-500" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white">{badge.title}</span>
                          {unlocked && (
                            <span className="text-2xs font-mono text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                              Unlocked
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{badge.description}</p>
                        <span className="text-3xs font-mono text-slate-500 uppercase tracking-wider block mt-1">{badge.category}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

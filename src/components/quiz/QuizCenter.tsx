import React, { useState, useMemo } from 'react';

/** Strip emoji characters from text — data files use them but the UI should not */
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
  ChevronRight
} from 'lucide-react';
import { QUIZ_QUESTIONS, POLAR_BADGES } from '../../data/quizzes';
import { QuizQuestion, QuizType } from '../../types/polar';
import { useQuiz } from '../../context/QuizContext';
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
  const { score, streak, bestStreak, recordAnswer, isBadgeUnlocked, resetProgress } = useQuiz();
  const [selectedType, setSelectedType] = useState<QuizType | 'all'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [showBadgesPanel, setShowBadgesPanel] = useState(false);

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
    const nextIndex = currentQuestionIndex < filteredQuestions.length - 1
      ? currentQuestionIndex + 1
      : 0;
    setCurrentQuestionIndex(nextIndex);
    setSelectedOptionId(null);
    setHasAnsweredCurrent(false);
  };

  const handleModeChange = (mode: QuizType | 'all') => {
    setSelectedType(mode);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setHasAnsweredCurrent(false);
  };

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Page header */}
        <div className="border-b border-ink-700 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-px bg-ice-400" aria-hidden="true" />
            <span className="text-2xs font-medium tracking-widest uppercase text-ice-400">
              Polar Science Assessment
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                Polar Quiz &amp; Challenges
              </h1>
              <p className="text-sm text-slate-400 mt-1.5 max-w-2xl">
                Test your understanding of real polar science. Every answer reveals the underlying mechanism 
                and links to authoritative sources.
              </p>
            </div>

            {/* Score + streak — quiet, not game-UI prominent */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <div className="text-2xs uppercase tracking-widest text-slate-500">Score</div>
                <div className="text-lg font-semibold text-amber-400">{score} pts</div>
              </div>
              {streak > 1 && (
                <div className="text-right">
                  <div className="text-2xs uppercase tracking-widest text-slate-500">Streak</div>
                  <div className="text-lg font-semibold text-orange-400 flex items-center gap-1">
                    <Flame className="w-4 h-4" aria-hidden="true" />
                    {streak}×
                  </div>
                </div>
              )}
              <button
                onClick={() => setShowBadgesPanel(true)}
                className="text-xs text-slate-400 hover:text-white border border-ink-700 hover:border-ice-500 px-3 py-1.5 rounded-md transition-colors"
              >
                Badges
              </button>
            </div>
          </div>
        </div>

        {/* Mode selector — underline tabs, not emoji cards */}
        <div className="flex items-center gap-0 border-b border-ink-700 overflow-x-auto no-scrollbar">
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => handleModeChange(mode)}
              className={`
                px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors duration-100
                ${selectedType === mode
                  ? 'text-white border-ice-400'
                  : 'text-slate-500 border-transparent hover:text-slate-300 hover:border-ink-600'
                }
              `}
              aria-pressed={selectedType === mode}
            >
              {MODE_LABELS[mode]}
            </button>
          ))}
        </div>

        {/* Question count */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Question {currentQuestionIndex + 1} of {filteredQuestions.length}
          </span>
          <div className="flex items-center gap-1">
            {filteredQuestions.slice(0, Math.min(filteredQuestions.length, 10)).map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  idx === currentQuestionIndex
                    ? 'bg-ice-400'
                    : idx < currentQuestionIndex
                    ? 'bg-teal-500'
                    : 'bg-ink-600'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Question panel */}
        <div className="border border-ink-700 rounded-lg overflow-hidden">
          {/* Question metadata */}
          <div className="px-6 py-4 bg-ink-800 border-b border-ink-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="tag">{currentQuestion.topic}</span>
              <span className="tag">{currentQuestion.difficulty}</span>
              <span className="tag">{MODE_LABELS[currentQuestion.type]}</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Question text */}
            <h2 className="text-lg sm:text-xl font-semibold text-white leading-snug">
              {currentQuestion.question}
            </h2>

            {/* Embedded chart if applicable */}
            {currentQuestion.visualType === 'chart' && currentQuestion.chartConfigKey && (
              <div className="border border-ink-700 rounded-md overflow-hidden">
                <DataVisualizer datasetKey={currentQuestion.chartConfigKey} compact />
              </div>
            )}

            {/* Answer options */}
            <div className="space-y-2" role="group" aria-label="Answer options">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const showCorrectness = hasAnsweredCurrent;

                let optionStyle = 'border-ink-700 hover:border-ice-500 hover:bg-ink-800 text-slate-300';
                let icon = null;

                if (showCorrectness) {
                  if (option.isCorrect) {
                    optionStyle = 'border-teal-500 bg-teal-500/10 text-teal-200';
                    icon = <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" aria-label="Correct answer" />;
                  } else if (isSelected && !option.isCorrect) {
                    optionStyle = 'border-red-500 bg-red-500/10 text-red-200';
                    icon = <XCircle className="w-4 h-4 text-red-400 shrink-0" aria-label="Incorrect answer" />;
                  } else {
                    optionStyle = 'border-ink-700 text-slate-600 opacity-50';
                  }
                }

                return (
                  <button
                    key={option.id}
                    disabled={hasAnsweredCurrent}
                    onClick={() => handleOptionClick(option.id, option.isCorrect)}
                    className={`w-full text-left px-4 py-3 border rounded-md text-sm font-medium transition-colors duration-100 flex items-center justify-between gap-3 ${optionStyle}`}
                  >
                    <span>{stripEmoji(option.text)}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Explanation — shown after answering */}
            {hasAnsweredCurrent && (
              <div className="border-t border-ink-700 pt-6 space-y-4">
                <div>
                  <div className="text-2xs font-semibold uppercase tracking-wider text-ice-400 mb-2">
                    Scientific Explanation
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentQuestion.whyExplanation}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-ink-700">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
                    <span>Source: {currentQuestion.provenance.sourceOrganization}</span>
                  </div>
                  <a
                    href={currentQuestion.provenance.originalSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ice-400 hover:underline"
                  >
                    Verify →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer controls */}
          <div className="px-6 py-4 bg-ink-800 border-t border-ink-700 flex items-center justify-between">
            <button
              onClick={resetProgress}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              Reset score
            </button>

            {hasAnsweredCurrent && (
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 px-5 py-2 bg-ice-500 hover:bg-ice-400 text-polar-950 font-semibold text-sm rounded-md transition-colors"
              >
                Next question
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Badges modal */}
        {showBadgesPanel && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-polar-950/80"
            role="dialog"
            aria-modal="true"
            aria-label="Polar Science Badges"
          >
            <div className="w-full max-w-xl bg-polar-900 border border-ink-700 rounded-lg shadow-elevated overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-ink-700">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-white">Polar Science Badges</h3>
                </div>
                <button
                  onClick={() => setShowBadgesPanel(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Close badges panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-ink-700 max-h-96 overflow-y-auto">
                {POLAR_BADGES.map((badge) => {
                  const unlocked = isBadgeUnlocked(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`flex items-start gap-4 px-6 py-4 ${unlocked ? '' : 'opacity-40'}`}
                    >
                      <div className="w-8 flex items-center justify-center shrink-0">
                        {unlocked
                          ? <Award className="w-5 h-5 text-amber-400" aria-hidden="true" />
                          : <Lock className="w-4 h-4 text-slate-600" aria-hidden="true" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-slate-200">{badge.title}</span>
                          {unlocked && (
                            <span className="text-2xs text-amber-400 font-medium shrink-0">Unlocked</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{badge.description}</p>
                        <span className="text-2xs font-mono text-slate-600 uppercase">{badge.category}</span>
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

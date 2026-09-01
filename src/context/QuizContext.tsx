import React, { createContext, useContext, useState, useEffect } from 'react';
import { POLAR_BADGES } from '../data/quizzes';

interface QuizProgressState {
  score: number;
  streak: number;
  bestStreak: number;
  answeredQuestionIds: string[];
  correctQuestionIds: string[];
  unlockedBadgeIds: string[];
  topicMastery: Record<string, number>;
}

interface QuizContextType {
  score: number;
  streak: number;
  bestStreak: number;
  answeredCount: number;
  unlockedBadgeIds: string[];
  topicMastery: Record<string, number>;
  recordAnswer: (questionId: string, isCorrect: boolean, topic: string, badgeRewardId?: string) => void;
  resetProgress: () => void;
  isBadgeUnlocked: (badgeId: string) => boolean;
}

const STORAGE_KEY = 'polarverse_quiz_progress_v1';

const DEFAULT_STATE: QuizProgressState = {
  score: 0,
  streak: 0,
  bestStreak: 0,
  answeredQuestionIds: [],
  correctQuestionIds: [],
  unlockedBadgeIds: [],
  topicMastery: {},
};

const triggerConfetti = () => {
  try {
    const win = window as any;
    if (typeof win.confetti === 'function') {
      win.confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#2dd4bf', '#88d5f7', '#fbbf24']
      });
    }
  } catch (e) {
    // Ignore optional visual particle burst
  }
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuizProgressState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Failed to load quiz progress:', e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save quiz progress:', e);
    }
  }, [state]);

  const recordAnswer = (questionId: string, isCorrect: boolean, topic: string, badgeRewardId?: string) => {
    setState((prev) => {
      const alreadyAnswered = prev.answeredQuestionIds.includes(questionId);
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newBestStreak = Math.max(prev.bestStreak, newStreak);
      const pointsEarned = isCorrect ? 10 + newStreak * 2 : 0;
      const newScore = prev.score + pointsEarned;

      const newAnswered = alreadyAnswered ? prev.answeredQuestionIds : [...prev.answeredQuestionIds, questionId];
      const newCorrect = isCorrect && !prev.correctQuestionIds.includes(questionId)
        ? [...prev.correctQuestionIds, questionId]
        : prev.correctQuestionIds;

      const currentMastery = prev.topicMastery[topic] || 0;
      const updatedTopicMastery = {
        ...prev.topicMastery,
        [topic]: isCorrect ? Math.min(100, currentMastery + 25) : currentMastery,
      };

      const newBadges = [...prev.unlockedBadgeIds];
      if (badgeRewardId && isCorrect && !newBadges.includes(badgeRewardId)) {
        newBadges.push(badgeRewardId);
        triggerConfetti();
      }

      return {
        score: newScore,
        streak: newStreak,
        bestStreak: newBestStreak,
        answeredQuestionIds: newAnswered,
        correctQuestionIds: newCorrect,
        unlockedBadgeIds: newBadges,
        topicMastery: updatedTopicMastery,
      };
    });
  };

  const resetProgress = () => {
    setState(DEFAULT_STATE);
  };

  const isBadgeUnlocked = (badgeId: string) => state.unlockedBadgeIds.includes(badgeId);

  return (
    <QuizContext.Provider
      value={{
        score: state.score,
        streak: state.streak,
        bestStreak: state.bestStreak,
        answeredCount: state.answeredQuestionIds.length,
        unlockedBadgeIds: state.unlockedBadgeIds,
        topicMastery: state.topicMastery,
        recordAnswer,
        resetProgress,
        isBadgeUnlocked,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

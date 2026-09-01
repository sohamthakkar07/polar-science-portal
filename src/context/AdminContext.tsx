import React, { createContext, useContext, useState, useEffect } from 'react';
import { PolarDataset, ResearchStation, ResearchPaper, QuizQuestion } from '../types/polar';
import { POLAR_DATASETS } from '../data/datasets';
import { RESEARCH_STATIONS } from '../data/stations';
import { RESEARCH_PAPERS } from '../data/researchPapers';
import { QUIZ_QUESTIONS } from '../data/quizzes';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  datasets: PolarDataset[];
  stations: ResearchStation[];
  papers: ResearchPaper[];
  quizzes: QuizQuestion[];
  addDataset: (dataset: PolarDataset) => void;
  addStation: (station: ResearchStation) => void;
  addPaper: (paper: ResearchPaper) => void;
  addQuiz: (quiz: QuizQuestion) => void;
  verifyItem: (type: 'dataset' | 'station' | 'paper' | 'quiz', id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('polarverse_admin_auth') === 'true';
  });

  const [datasets, setDatasets] = useState<PolarDataset[]>(POLAR_DATASETS);
  const [stations, setStations] = useState<ResearchStation[]>(RESEARCH_STATIONS);
  const [papers, setPapers] = useState<ResearchPaper[]>(RESEARCH_PAPERS);
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);

  const login = (password: string): boolean => {
    if (password === 'polarverse2026' || password === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('polarverse_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('polarverse_admin_auth');
  };

  const addDataset = (dataset: PolarDataset) => {
    setDatasets((prev) => [dataset, ...prev]);
  };

  const addStation = (station: ResearchStation) => {
    setStations((prev) => [station, ...prev]);
  };

  const addPaper = (paper: ResearchPaper) => {
    setPapers((prev) => [paper, ...prev]);
  };

  const addQuiz = (quiz: QuizQuestion) => {
    setQuizzes((prev) => [quiz, ...prev]);
  };

  const verifyItem = (type: 'dataset' | 'station' | 'paper' | 'quiz', id: string) => {
    if (type === 'dataset') {
      setDatasets((prev) =>
        prev.map((d) => (d.id === id ? { ...d, provenance: { ...d.provenance, isVerified: true } } : d))
      );
    } else if (type === 'station') {
      setStations((prev) =>
        prev.map((s) => (s.id === id ? { ...s, provenance: { ...s.provenance, isVerified: true } } : s))
      );
    } else if (type === 'paper') {
      setPapers((prev) =>
        prev.map((p) => (p.id === id ? { ...p, provenance: { ...p.provenance, isVerified: true } } : p))
      );
    } else if (type === 'quiz') {
      setQuizzes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, provenance: { ...q.provenance, isVerified: true } } : q))
      );
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        datasets,
        stations,
        papers,
        quizzes,
        addDataset,
        addStation,
        addPaper,
        addQuiz,
        verifyItem,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

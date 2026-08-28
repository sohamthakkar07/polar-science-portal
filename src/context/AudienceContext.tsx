import React, { createContext, useContext, useState, useEffect } from 'react';

export type AudienceMode = 'student' | 'researcher';

interface AudienceContextType {
  mode: AudienceMode;
  setMode: (mode: AudienceMode) => void;
  isStudent: boolean;
  isResearcher: boolean;
  toggleMode: () => void;
}

const AudienceContext = createContext<AudienceContextType | undefined>(undefined);

export const AudienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<AudienceMode>(() => {
    const saved = localStorage.getItem('polarverse_audience_mode');
    return (saved === 'researcher' || saved === 'student') ? saved : 'student';
  });

  const setMode = (newMode: AudienceMode) => {
    setModeState(newMode);
    localStorage.setItem('polarverse_audience_mode', newMode);
  };

  const toggleMode = () => {
    setMode(mode === 'student' ? 'researcher' : 'student');
  };

  return (
    <AudienceContext.Provider
      value={{
        mode,
        setMode,
        isStudent: mode === 'student',
        isResearcher: mode === 'researcher',
        toggleMode,
      }}
    >
      {children}
    </AudienceContext.Provider>
  );
};

export const useAudience = (): AudienceContextType => {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error('useAudience must be used within an AudienceProvider');
  }
  return context;
};

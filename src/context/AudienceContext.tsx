import React, { createContext, useContext } from 'react';

export type AudienceMode = 'student' | 'researcher';

interface AudienceContextType {
  mode: AudienceMode;
  setMode: (mode: AudienceMode) => void;
  setAudienceMode: (mode: AudienceMode) => void;
  isStudent: boolean;
  isResearcher: boolean;
  toggleMode: () => void;
}

const defaultContext: AudienceContextType = {
  mode: 'student',
  setMode: () => {},
  setAudienceMode: () => {},
  isStudent: true,
  isResearcher: false,
  toggleMode: () => {},
};

const AudienceContext = createContext<AudienceContextType>(defaultContext);

export const AudienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AudienceContext.Provider value={defaultContext}>
      {children}
    </AudienceContext.Provider>
  );
};

export const useAudience = (): AudienceContextType => {
  const context = useContext(AudienceContext);
  return context || defaultContext;
};
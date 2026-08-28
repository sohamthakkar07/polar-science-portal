import React, { useState } from 'react';
import {
  MapPin,
  BookOpen,
  BarChart3,
  BookMarked,
  CircleHelp,
  Brain,
  Microscope,
  Globe,
  Image,
  GraduationCap,
  Search,
  Menu,
  X,
  Shield,
  ChevronDown,
  Flame
} from 'lucide-react';
import { useAudience } from '../../context/AudienceContext';
import { useQuiz } from '../../context/QuizContext';

export type NavTab =
  | 'home'
  | 'explore'
  | 'learn'
  | 'data'
  | 'stories'
  | 'quiz'
  | 'ai'
  | 'research'
  | 'india'
  | 'biodiversity'
  | 'media'
  | 'admin';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenSearch: () => void;
}

const navItems: { id: NavTab; label: string }[] = [
  { id: 'explore',     label: 'Explore' },
  { id: 'learn',       label: 'Learn' },
  { id: 'data',        label: 'Data' },
  { id: 'quiz',        label: 'Quiz' },
  { id: 'ai',          label: 'Polar AI' },
  { id: 'research',    label: 'Research' },
  { id: 'india',       label: 'India & Polar Science' },
  { id: 'biodiversity',label: 'Wildlife' },
  { id: 'media',       label: 'Media' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenSearch }) => {
  const { mode, toggleMode, isStudent } = useAudience();
  const { score, streak } = useQuiz();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-polar-900 border-b border-ink-700">
      {/* Thin top status bar */}
      <div className="w-full border-b border-ink-700 bg-polar-950 px-4 py-1.5 flex items-center justify-between">
        <p className="text-2xs text-slate-500 tracking-wide hidden sm:block">
          Scientific data from NCPOR · NSIDC · NASA · BAS · SCAR · COMNAP
        </p>
        <div className="flex items-center gap-4 ml-auto">
          <button
            onClick={toggleMode}
            className="flex items-center gap-1.5 text-2xs text-slate-400 hover:text-slate-200 transition-colors"
            title={`Switch to ${isStudent ? 'Researcher' : 'Student'} mode`}
          >
            {isStudent
              ? <GraduationCap className="w-3 h-3" />
              : <Microscope className="w-3 h-3" />
            }
            <span>{isStudent ? 'Student Mode' : 'Researcher Mode'}</span>
            <span className="text-slate-600">·</span>
            <span className="text-ice-400 hover:underline">Switch</span>
          </button>

          {score > 0 && (
            <div className="hidden lg:flex items-center gap-1.5 text-2xs text-slate-400">
              <span className="text-amber-400 font-semibold">{score} pts</span>
              {streak > 1 && (
                <span className="flex items-center gap-0.5 text-orange-400">
                  <Flame className="w-2.5 h-2.5" />
                  {streak}×
                </span>
              )}
            </div>
          )}

          <button
            onClick={() => handleNavClick('admin')}
            className="text-2xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
            title="Admin Portal"
          >
            <Shield className="w-3 h-3" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Brand wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus-visible:outline-none"
          >
            {/* Minimal geometric mark */}
            <div
              className="w-7 h-7 border border-ice-500 flex items-center justify-center shrink-0"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            >
              <div className="w-3 h-3 bg-ice-500" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-semibold tracking-widest text-white uppercase">
                PolarVerse
              </span>
              <span className="text-2xs text-slate-500 tracking-widest uppercase hidden sm:block">
                Polar Science Platform
              </span>
            </div>
          </button>

          {/* Desktop navigation links */}
          <nav className="hidden xl:flex items-center" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    px-3 py-5 text-xs font-medium tracking-wide border-b-2 transition-colors duration-150
                    ${isActive
                      ? 'text-white border-ice-400'
                      : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-ink-600'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Search + mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 border border-ink-700 hover:border-ice-500 text-slate-400 hover:text-slate-200 text-xs rounded-md transition-colors duration-150"
              title="Search (Ctrl+K)"
              aria-label="Open search"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-slate-500">Search...</span>
              <kbd className="hidden sm:inline-block px-1 py-0.5 text-2xs bg-polar-950 text-slate-500 rounded border border-ink-700">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 text-slate-400 hover:text-white border border-ink-700 rounded-md transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-polar-900 border-t border-ink-700">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-0.5" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors duration-100
                    ${isActive
                      ? 'text-white bg-ink-700 border-l-2 border-ice-400 pl-2.5'
                      : 'text-slate-400 hover:text-white hover:bg-ink-800'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-ink-700 flex items-center justify-between px-3">
              <span className="text-xs text-slate-500">
                Mode: {isStudent ? 'Student' : 'Researcher'}
              </span>
              <button
                onClick={toggleMode}
                className="text-xs text-ice-400 font-medium hover:underline"
              >
                Switch Mode
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

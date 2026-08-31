import React, { useState } from 'react';
import {
  GraduationCap,
  Microscope,
  Search,
  Menu,
  X,
  Shield,
  Flame,
  ChevronDown
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
  { id: 'explore',      label: 'Explore' },
  { id: 'learn',        label: 'Learn' },
  { id: 'data',         label: 'Data' },
  { id: 'stories',      label: 'Stories' },
  { id: 'quiz',         label: 'Quiz' },
  { id: 'ai',           label: 'Polar AI' },
  { id: 'research',     label: 'Research' },
  { id: 'india',        label: 'India & Polar' },
  { id: 'biodiversity', label: 'Wildlife' },
  { id: 'media',        label: 'Media' },
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

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Brand wordmark — clean, no subtitle */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus-visible:outline-none shrink-0"
            aria-label="PolarVerse — Home"
          >
            {/* Hexagonal geometric mark */}
            <div
              className="w-7 h-7 border border-ice-500 flex items-center justify-center shrink-0 transition-colors group-hover:border-ice-400"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            >
              <div
                className="w-3 h-3 bg-ice-500 transition-colors group-hover:bg-ice-400"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              />
            </div>
            <span className="text-base font-bold tracking-widest text-white uppercase">
              PolarVerse
            </span>
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

          {/* Right controls */}
          <div className="flex items-center gap-2">

            {/* Score indicator */}
            {score > 0 && (
              <div className="hidden lg:flex items-center gap-1.5 text-2xs text-slate-400 px-2">
                <span className="text-amber-400 font-semibold">{score} pts</span>
                {streak > 1 && (
                  <span className="flex items-center gap-0.5 text-orange-400">
                    <Flame className="w-2.5 h-2.5" />
                    {streak}×
                  </span>
                )}
              </div>
            )}

            {/* Mode switcher — prominent pill */}
            <button
              onClick={toggleMode}
              className={`
                hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold 
                border transition-colors duration-200 
                ${isStudent
                  ? 'bg-teal-500/10 border-teal-500/40 text-teal-400 hover:bg-teal-500/20'
                  : 'bg-ice-500/10 border-ice-500/40 text-ice-400 hover:bg-ice-500/20'
                }
              `}
              title={`Switch to ${isStudent ? 'Researcher' : 'Student'} mode`}
              aria-label={`Current mode: ${isStudent ? 'Student' : 'Researcher'}. Click to switch.`}
            >
              {isStudent
                ? <GraduationCap className="w-3.5 h-3.5" />
                : <Microscope className="w-3.5 h-3.5" />
              }
              <span>{isStudent ? 'Student' : 'Researcher'}</span>
            </button>

            {/* Search */}
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

            {/* Admin */}
            <button
              onClick={() => handleNavClick('admin')}
              className="hidden sm:flex text-2xs text-slate-600 hover:text-slate-400 p-1.5 transition-colors"
              title="Admin Portal"
              aria-label="Admin portal"
            >
              <Shield className="w-3.5 h-3.5" />
            </button>

            {/* Mobile toggle */}
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
                Mode: <span className={isStudent ? 'text-teal-400' : 'text-ice-400'}>
                  {isStudent ? 'Student' : 'Researcher'}
                </span>
              </span>
              <button
                onClick={toggleMode}
                className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors
                  ${isStudent
                    ? 'bg-teal-500/10 border-teal-500/40 text-teal-400'
                    : 'bg-ice-500/10 border-ice-500/40 text-ice-400'
                  }`}
              >
                {isStudent ? <GraduationCap className="w-3 h-3" /> : <Microscope className="w-3 h-3" />}
                Switch Mode
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

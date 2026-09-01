import React, { useState } from 'react';
import {
  Search,
  Menu,
  X,
  Shield,
  GraduationCap,
  Microscope,
  Flame,
  Globe2,
  Compass,
  Database,
  BookOpen,
  Brain,
  Award,
  Layers,
  Sparkles,
  ChevronDown,
  Camera
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

export type PrimaryPillar = 'home' | 'explore' | 'learn' | 'research';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenSearch }) => {
  const { mode, toggleMode, isStudent } = useAudience();
  const { score, streak } = useQuiz();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Map sub-tabs to their primary pillar
  const getPillarForTab = (tab: NavTab): PrimaryPillar => {
    if (tab === 'home') return 'home';
    if (['explore', 'india', 'media'].includes(tab)) return 'explore';
    if (['stories', 'learn', 'quiz', 'biodiversity'].includes(tab)) return 'learn';
    return 'research'; // 'data', 'research', 'ai', 'admin'
  };

  const activePillar = getPillarForTab(currentTab);

  const pillars: { id: PrimaryPillar; label: string; defaultTab: NavTab; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', defaultTab: 'home', icon: Globe2 },
    { id: 'explore', label: 'Explore & Expeditions', defaultTab: 'explore', icon: Compass },
    { id: 'learn', label: 'Learn & Challenge', defaultTab: isStudent ? 'stories' : 'learn', icon: GraduationCap },
    { id: 'research', label: 'Research & Datasets', defaultTab: 'data', icon: Database },
  ];

  const subNavMap: Record<PrimaryPillar, { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[]> = {
    home: [],
    explore: [
      { id: 'explore', label: 'Polar Map Explorer', icon: Compass },
      { id: 'india', label: "India's Polar Journey", icon: Layers },
      { id: 'media', label: 'Photo & Media Archive', icon: Camera },
    ],
    learn: [
      { id: 'stories', label: 'Guided Scrollytelling', icon: Sparkles },
      { id: 'learn', label: 'Educational Modules', icon: BookOpen },
      { id: 'quiz', label: 'Quiz Challenges', icon: Award },
      { id: 'biodiversity', label: 'Polar Species Directory', icon: Globe2 },
    ],
    research: [
      { id: 'data', label: 'Scientific Datasets', icon: Database },
      { id: 'research', label: 'Research Literature (DOIs)', icon: BookOpen },
      { id: 'ai', label: 'Grounded AI Assistant', icon: Brain },
    ]
  };

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-polar-950/90 border-b border-polar-800/80 transition-all duration-200">
      {/* Top Status Bar */}
      <div className="w-full border-b border-polar-800/60 bg-polar-950/95 px-4 py-1.5 flex items-center justify-between text-2xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" aria-hidden="true" />
          <span className="font-mono text-slate-400 hidden sm:inline">
            POLAR SCIENCE REPOSITORY · PROVENANCE LINKED (NCPOR · NSIDC · NASA · BAS · SCAR)
          </span>
          <span className="font-mono text-slate-400 sm:hidden">
            POLAR SCIENCE REPOSITORY
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Meaningful Student vs Researcher Mode Toggle */}
          <button
            onClick={toggleMode}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all shadow-sm ${
              isStudent
                ? 'bg-ice-500/15 border-ice-400/50 text-ice-300 hover:bg-ice-500/25'
                : 'bg-teal-500/15 border-teal-400/50 text-teal-300 hover:bg-teal-500/25'
            }`}
            title={`Switch to ${isStudent ? 'Researcher' : 'Student'} mode`}
          >
            {isStudent ? <GraduationCap className="w-3.5 h-3.5 text-ice-400" /> : <Microscope className="w-3.5 h-3.5 text-teal-400" />}
            <span className="font-bold">{isStudent ? 'Student Mode 🎓' : 'Researcher Mode 🔬'}</span>
            <span className="opacity-40">|</span>
            <span className="text-[10px] uppercase font-mono tracking-wider opacity-80">Switch</span>
          </button>

          {/* Quiz Score Badge */}
          {score > 0 && (
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-polar-900/80 border border-polar-800 text-slate-300">
              <span className="text-amber-300 font-mono font-semibold">{score} pts</span>
              {streak > 1 && (
                <span className="flex items-center gap-0.5 text-orange-400 font-mono">
                  <Flame className="w-2.5 h-2.5" />
                  {streak}x
                </span>
              )}
            </div>
          )}

          {/* Auxiliary Admin link */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`flex items-center gap-1 transition-colors px-2 py-0.5 rounded text-2xs ${
              currentTab === 'admin' ? 'text-ice-300 bg-polar-800 border border-ice-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Admin Curation Gateway"
          >
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline font-mono">Admin</span>
          </button>
        </div>
      </div>

      {/* Main 4-Pillar Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand Mark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus-visible:outline-none text-left"
          >
            <div className="relative w-8 h-8 rounded-lg bg-polar-900 border border-ice-500/40 flex items-center justify-center overflow-hidden group-hover:border-ice-400 transition-colors shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-br from-ice-500/20 via-transparent to-teal-500/10" />
              <Compass className="w-4 h-4 text-ice-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-wider text-white uppercase font-sans">
                  PolarVerse
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono uppercase bg-ice-500/15 border border-ice-400/30 text-ice-300 rounded">
                  Portal
                </span>
              </div>
            </div>
          </button>

          {/* Simplified 4-Pillar Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {pillars.map((pillar) => {
              const isPillarActive = activePillar === pillar.id;
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => handleNavClick(pillar.defaultTab)}
                  className={`
                    flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-150
                    ${isPillarActive
                      ? 'text-white bg-polar-850 border border-ice-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-polar-900/70 border border-transparent'
                    }
                  `}
                  aria-current={isPillarActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 ${isPillarActive ? 'text-ice-400' : 'text-slate-400'}`} />
                  <span>{pillar.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Universal Search & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 bg-polar-900/90 border border-polar-750 hover:border-ice-400/60 text-slate-300 hover:text-white text-xs rounded-lg transition-all duration-150 shadow-inner group"
              title="Search Portal (Cmd+K)"
              aria-label="Open search modal"
            >
              <Search className="w-3.5 h-3.5 text-ice-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-slate-400 font-mono">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-polar-950 text-slate-400 rounded border border-polar-750">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white bg-polar-900 border border-polar-750 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-ice-400" /> : <Menu className="w-5 h-5 text-slate-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Secondary Sub-Navigation Pill Bar */}
      {activePillar !== 'home' && subNavMap[activePillar]?.length > 0 && (
        <div className="w-full bg-polar-900/80 border-t border-polar-800/60 py-2 px-4 backdrop-blur-md animate-in fade-in duration-150">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-2xs font-mono uppercase text-slate-400 tracking-wider mr-2 hidden sm:inline">
              {pillars.find(p => p.id === activePillar)?.label}:
            </span>
            {subNavMap[activePillar].map((sub) => {
              const isSubActive = currentTab === sub.id;
              const SubIcon = sub.icon;
              return (
                <button
                  key={sub.id}
                  onClick={() => handleNavClick(sub.id)}
                  className={`
                    px-3 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-all border
                    ${isSubActive
                      ? 'bg-ice-500/20 border-ice-400 text-ice-300 font-semibold shadow-sm'
                      : 'bg-polar-950/60 border-polar-800 text-slate-300 hover:text-white hover:bg-polar-850'
                    }
                  `}
                >
                  <SubIcon className={`w-3 h-3 ${isSubActive ? 'text-ice-400' : 'text-slate-400'}`} />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Grouped Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-polar-950/98 backdrop-blur-2xl border-t border-b border-polar-800/80 shadow-panel animate-in fade-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="p-4 space-y-5">
            {/* Mobile Audience Mode Switch */}
            <div className="p-3 rounded-xl bg-polar-900 border border-polar-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isStudent ? <GraduationCap className="w-4 h-4 text-ice-400" /> : <Microscope className="w-4 h-4 text-teal-400" />}
                <span className="text-xs font-bold text-white">
                  {isStudent ? 'Student Mode 🎓' : 'Researcher Mode 🔬'}
                </span>
              </div>
              <button
                onClick={toggleMode}
                className="px-3 py-1 rounded bg-polar-950 border border-polar-750 text-xs font-mono text-ice-300 hover:bg-polar-850"
              >
                Switch
              </button>
            </div>

            {/* Mobile Pillar Groups */}
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              const subItems = subNavMap[pillar.id] || [];
              return (
                <div key={pillar.id} className="space-y-2 border-b border-polar-850 pb-3">
                  <button
                    onClick={() => handleNavClick(pillar.defaultTab)}
                    className="w-full flex items-center justify-between font-bold text-sm text-white text-left py-1"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-ice-400" />
                      <span>{pillar.label}</span>
                    </span>
                  </button>

                  {subItems.length > 0 && (
                    <div className="grid grid-cols-1 gap-1.5 pl-6">
                      {subItems.map((sub) => {
                        const isSubActive = currentTab === sub.id;
                        const SubIcon = sub.icon;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleNavClick(sub.id)}
                            className={`
                              flex items-center gap-2 px-3 py-2.5 text-xs font-medium rounded-lg transition-colors text-left min-h-[44px]
                              ${isSubActive
                                ? 'text-white bg-polar-800 border border-ice-500/40 font-semibold'
                                : 'text-slate-300 hover:text-white hover:bg-polar-900'
                              }
                            `}
                          >
                            <SubIcon className={`w-3.5 h-3.5 ${isSubActive ? 'text-ice-400' : 'text-slate-400'}`} />
                            <span>{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

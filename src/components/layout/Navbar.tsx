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
import { useQuiz } from '../../context/QuizContext';
import { useAudience } from '../../context/AudienceContext';

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

export type PrimaryPillar = 'home' | 'explore' | 'learn' | 'research' | 'admin';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenSearch }) => {
  const { isStudent } = useAudience();
  const { score, streak } = useQuiz();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Map sub-tabs to their primary pillar
  const getPillarForTab = (tab: NavTab): PrimaryPillar => {
    if (tab === 'home') return 'home';
    if (['explore', 'india', 'media'].includes(tab)) return 'explore';
    if (['stories', 'learn', 'quiz', 'biodiversity'].includes(tab)) return 'learn';
    if (tab === 'admin') return 'admin';
    return 'research'; // 'data', 'research', 'ai'
  };

  const activePillar = getPillarForTab(currentTab);

  const pillars: { id: PrimaryPillar; label: string; defaultTab: NavTab; icon: React.FC<any> }[] = [
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
    ],
    admin: []
  };

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-polar-950/90 border-b border-polar-800/80 transition-all duration-200">
      {/* Main 4-Pillar Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Mark */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/50 focus-visible:ring-offset-4 focus-visible:ring-offset-polar-950 rounded-lg text-left cursor-pointer"
          >
            <div className="relative w-8 h-8 rounded-lg bg-polar-900 border border-ice-500/40 flex items-center justify-center overflow-hidden group-hover:border-ice-400 transition-colors shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-br from-ice-500/20 via-transparent to-teal-500/10" />
              <Compass className="w-4 h-4 text-ice-400 group-hover:rotate-45 transition-transform duration-300 relative z-10" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold tracking-wider text-white uppercase font-sans">
                  PolarVerse
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-ice-500/20 text-ice-300 border border-ice-400/30">
                  PORTAL
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono hidden xl:block">
                MoES · NCPOR Science Gateway
              </span>
            </div>
          </button>

          {/* Desktop Primary Pillars */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              const isPillarActive = activePillar === pillar.id;

              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => handleNavClick(pillar.defaultTab)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/50 ${
                    isPillarActive
                      ? 'bg-polar-900 text-ice-300 border-ice-500/40 shadow-sm'
                      : 'text-slate-300 border-transparent hover:text-white hover:bg-polar-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isPillarActive ? 'text-ice-400' : 'text-slate-400'}`} />
                  <span>{pillar.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Actions Right */}
          <div className="flex items-center gap-3">
            {/* Global Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-polar-900/90 border border-polar-800 hover:border-ice-500/40 text-slate-300 hover:text-white text-xs font-mono transition-all shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/50"
              title="Search datasets, DOIs, stations (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-ice-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-polar-950 border border-polar-750 text-slate-400 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Quiz Score Badge */}
            {score > 0 && (
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-polar-900/80 border border-polar-800 text-slate-300 text-xs">
                <span className="text-amber-300 font-mono font-semibold">{score} pts</span>
                {streak > 1 && (
                  <span className="flex items-center gap-0.5 text-orange-400 font-mono">
                    <Flame className="w-3 h-3" />
                    {streak}x
                  </span>
                )}
              </div>
            )}

            {/* Auxiliary Admin link */}
            <button
              type="button"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 transition-colors px-2.5 py-1 rounded-lg text-2xs font-mono border focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/50 ${
                currentTab === 'admin' ? 'text-ice-300 bg-polar-800 border-ice-500/40' : 'text-slate-400 hover:text-slate-200 border-polar-800'
              }`}
              title="Admin Curation Gateway"
            >
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-polar-900 border border-polar-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/50 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Strip (Desktop only, when pillar has sub-items) */}
      {subNavMap[activePillar] && subNavMap[activePillar].length > 0 && (
        <div className="hidden md:block w-full border-t border-polar-800/60 bg-polar-950/80 px-4 sm:px-6 lg:px-8 py-1.5">
          <div className="max-w-7xl mx-auto flex items-center space-x-6 text-xs font-mono">
            {subNavMap[activePillar].map((sub) => {
              const SubIcon = sub.icon;
              const isSubActive = currentTab === sub.id;

              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => handleNavClick(sub.id)}
                  className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer border-b focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/50 ${
                    isSubActive
                      ? 'text-ice-300 font-bold border-ice-400'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  <SubIcon className={`w-3.5 h-3.5 ${isSubActive ? 'text-ice-400' : 'text-slate-400'}`} />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full max-h-[calc(100vh-4rem)] overflow-y-auto shadow-2xl bg-polar-950 border-b border-polar-800 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              const isPillarActive = activePillar === pillar.id;

              return (
                <div key={pillar.id} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => handleNavClick(pillar.defaultTab)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors border focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/50 ${
                      isPillarActive
                        ? 'bg-polar-900 text-ice-300 border-ice-500/30'
                        : 'text-slate-300 border-transparent hover:bg-polar-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-ice-400" />
                      <span>{pillar.label}</span>
                    </div>
                  </button>

                  {/* Sub-items for mobile */}
                  {subNavMap[pillar.id] && subNavMap[pillar.id].length > 0 && (
                    <div className="pl-6 space-y-1 py-1">
                      {subNavMap[pillar.id].map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = currentTab === sub.id;

                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleNavClick(sub.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-mono transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/50 ${
                              isSubActive
                                ? 'text-ice-300 font-bold bg-polar-900'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-polar-800/50'
                            }`}
                          >
                            <SubIcon className="w-3.5 h-3.5 text-slate-400" />
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

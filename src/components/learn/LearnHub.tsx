import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  GraduationCap,
  Microscope,
  HelpCircle,
  Sparkles,
  Layers,
  Award,
  Database,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Target,
  Check
} from 'lucide-react';
import { LEARNING_MODULES } from '../../data/learningModules';
import { LearningModule } from '../../types/polar';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { useAudience } from '../../context/AudienceContext';
import { NavTab } from '../layout/Navbar';

interface LearnHubProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialModuleId?: string;
}

export const LearnHub: React.FC<LearnHubProps> = ({ onNavigate, initialModuleId }) => {
  const { isStudent } = useAudience();
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    initialModuleId || LEARNING_MODULES[0].id
  );
  const [learningTab, setLearningTab] = useState<'eli15' | 'deep'>(isStudent ? 'eli15' : 'deep');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Local exploration tracking
  const [exploredModuleIds, setExploredModuleIds] = useState<Set<string>>(() => {
    return new Set([initialModuleId || LEARNING_MODULES[0].id]);
  });

  const activeModule = LEARNING_MODULES.find((m) => m.id === selectedModuleId) || LEARNING_MODULES[0];

  useEffect(() => {
    setLearningTab(isStudent ? 'eli15' : 'deep');
  }, [isStudent]);

  // Mark active module as explored
  const markExplored = (id: string) => {
    setExploredModuleIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleModuleSelect = (id: string) => {
    setSelectedModuleId(id);
    setOpenFaqIndex(null);
    markExplored(id);
  };

  const handleTabSwitch = (tab: 'eli15' | 'deep') => {
    setLearningTab(tab);
    markExplored(selectedModuleId);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
    markExplored(selectedModuleId);
  };

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Compact Learning Journey Progress Header */}
        <div className="bg-polar-900/90 border border-polar-800 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-ice-500/15 border border-ice-400/30 text-ice-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xs font-mono uppercase tracking-widest text-ice-400 font-bold">
                Polar Science Learning Journey
              </div>
              <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                Understand Core Polar Concepts
              </h1>
            </div>
          </div>

          {/* 3-Step Journey Steps Indicator */}
          <div className="flex items-center gap-2 font-mono text-2xs sm:text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ice-500/20 border border-ice-400/50 text-ice-300 font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-ice-400 animate-pulse" />
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
            <div
              onClick={() => onNavigate('quiz')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-polar-950/80 border border-polar-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <span>3. Test 🏆</span>
            </div>
          </div>
        </div>

        {/* Module Selection Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-ice-400" />
              Choose a Learning Module ({LEARNING_MODULES.length} Available)
            </span>
            <span className="text-2xs text-slate-400">
              {exploredModuleIds.size} of {LEARNING_MODULES.length} Explored
            </span>
          </div>

          {/* Horizontal Module Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {LEARNING_MODULES.map((mod) => {
              const isSelected = selectedModuleId === mod.id;
              const isExplored = exploredModuleIds.has(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => handleModuleSelect(mod.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-ice-500 text-polar-950 border-ice-400 font-bold shadow-sm'
                      : 'bg-polar-900/80 border-polar-800 text-slate-300 hover:text-white hover:bg-polar-850'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{mod.title.split(':')[0]}</span>
                  {isExplored && (
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isSelected ? 'bg-polar-950 text-ice-300' : 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                      }`}
                      title="Explored"
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Module Card */}
        <div className="bg-polar-900/90 rounded-2xl border border-polar-800 overflow-hidden backdrop-blur-xl shadow-panel space-y-0">
          {/* Module Banner Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 bg-polar-950/80 border-b border-polar-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-2xs font-mono font-semibold bg-ice-500/20 text-ice-300 border border-ice-500/30">
                  {activeModule.topic}
                </span>
                <span className="text-2xs text-slate-400 font-mono">
                  {activeModule.readingTimeMinutes} min read
                </span>
                {exploredModuleIds.has(activeModule.id) && (
                  <span className="px-2 py-0.5 rounded text-2xs font-mono bg-teal-500/15 border border-teal-500/30 text-teal-300">
                    ✓ Explored
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {activeModule.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {activeModule.tagline}
              </p>
            </div>

            {/* Explanation Mode Switcher */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <div className="flex items-center bg-polar-900 p-1 rounded-xl border border-polar-800 font-mono text-xs">
                <button
                  onClick={() => handleTabSwitch('eli15')}
                  className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                    learningTab === 'eli15'
                      ? 'bg-ice-500 text-polar-950 shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  aria-pressed={learningTab === 'eli15'}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Plain Language</span>
                </button>

                <button
                  onClick={() => handleTabSwitch('deep')}
                  className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                    learningTab === 'deep'
                      ? 'bg-teal-500 text-polar-950 shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  aria-pressed={learningTab === 'deep'}
                >
                  <Microscope className="w-4 h-4" />
                  <span>Scientific Detail</span>
                </button>
              </div>

              {/* Contextual Mode Explanation Label */}
              <span className="text-[11px] font-mono text-slate-400 text-right max-w-xs">
                {learningTab === 'eli15'
                  ? 'Build intuition with simple explanations and real-world analogies.'
                  : 'Explore mechanisms, instruments and scientific principles.'}
              </span>
            </div>
          </div>

          {/* Compact "What You'll Learn" Section */}
          <div className="p-6 bg-polar-950/50 border-b border-polar-800/80 space-y-3">
            <div className="text-2xs font-mono font-semibold uppercase tracking-widest text-ice-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ice-400" />
              What You'll Learn in This Module
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-polar-900/90 border border-polar-800 text-xs text-slate-300 flex items-start gap-2">
                <span className="font-bold text-ice-300 font-mono">1.</span>
                <span>Understand {activeModule.topic.toLowerCase()} mechanisms in {activeModule.region}.</span>
              </div>
              <div className="p-3 rounded-xl bg-polar-900/90 border border-polar-800 text-xs text-slate-300 flex items-start gap-2">
                <span className="font-bold text-teal-300 font-mono">2.</span>
                <span>{activeModule.eli15.keyTakeaway}</span>
              </div>
              <div className="p-3 rounded-xl bg-polar-900/90 border border-polar-800 text-xs text-slate-300 flex items-start gap-2">
                <span className="font-bold text-amber-300 font-mono">3.</span>
                <span>Examine sensors like {activeModule.goDeeper.instrumentsUsed[0] || 'satellite sensors'}.</span>
              </div>
            </div>
          </div>

          {/* Plain Language Tier */}
          {learningTab === 'eli15' && (
            <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
              {/* Analogy Card */}
              <div className="p-5 border-l-2 border-ice-400 bg-polar-950/60 rounded-r-xl space-y-2">
                <div className="text-2xs font-mono font-semibold text-ice-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-ice-400" />
                  Intuitive Real-World Analogy
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeModule.eli15.analogy}
                </p>
              </div>

              {/* Simple Explanation */}
              <div>
                <h3 className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-2">How It Works</h3>
                <p className="text-sm text-slate-300 leading-relaxed bg-polar-950/40 p-4 rounded-xl border border-polar-800">
                  {activeModule.eli15.simpleExplanation}
                </p>
              </div>

              {/* Key Takeaway & Fun Fact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-teal-500/30 bg-teal-500/10 space-y-1">
                  <div className="text-2xs font-mono font-semibold text-teal-400 uppercase tracking-wider">Key Takeaway</div>
                  <p className="text-xs text-slate-200 leading-relaxed">{activeModule.eli15.keyTakeaway}</p>
                </div>

                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-1">
                  <div className="text-2xs font-mono font-semibold text-amber-400 uppercase tracking-wider">Did You Know?</div>
                  <p className="text-xs text-slate-200 leading-relaxed">{activeModule.eli15.didYouKnow}</p>
                </div>
              </div>
            </div>
          )}

          {/* Scientific Detail Tier */}
          {learningTab === 'deep' && (
            <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
              {/* Scientific Principles */}
              <div className="space-y-2">
                <h3 className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-2">Governing Principles & Dynamics</h3>
                <div className="space-y-2">
                  {activeModule.goDeeper.scientificPrinciples.map((principle, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-slate-300 flex items-start gap-2 bg-polar-950/40 p-3 rounded-lg border border-polar-800"
                    >
                      <span className="text-teal-400 font-bold">—</span>
                      <span>{principle}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Governing Equations */}
              <div className="border border-polar-800 bg-polar-950 p-4 rounded-xl space-y-2">
                <div className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400">
                  Mathematical & Thermodynamic Formulation
                </div>
                <p className="text-xs text-slate-200 font-mono leading-relaxed">
                  {activeModule.goDeeper.governingEquationsOrMechanisms}
                </p>
              </div>

              {/* Active Research Frontiers & Instruments */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-polar-800 bg-polar-950/60 space-y-2">
                  <div className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400">Active Research Frontier</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeModule.goDeeper.activeResearchFrontiers}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-polar-800 bg-polar-950/60 space-y-2">
                  <div className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400">Sensors & Instruments</div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-2xs">
                    {activeModule.goDeeper.instrumentsUsed.map((inst, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded bg-polar-900 border border-polar-750 text-slate-300"
                      >
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Questions — FAQ Accordion */}
          <div className="p-6 sm:p-8 border-t border-polar-800 space-y-4">
            <div className="text-2xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-ice-400" />
              Key Scientific Questions Answered
            </div>

            <div className="space-y-2">
              {activeModule.keyQuestionsAnswered.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="border border-polar-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left text-xs font-semibold text-slate-200 hover:text-white bg-polar-950/60 hover:bg-polar-850 flex items-center justify-between gap-2 transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-ice-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                    </button>

                    {isOpen && (
                      <div className="p-4 text-xs text-slate-300 leading-relaxed border-t border-polar-800 bg-polar-900/40">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Audience-Aware Learning Journey Footer */}
          <div className="p-6 sm:p-8 border-t border-polar-800 bg-polar-950/80 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">
                {isStudent ? 'Ready to check what you understood?' : 'Continue from concepts to observations and evidence.'}
              </span>
              <span className="text-ice-400 font-bold">
                {isStudent ? 'Next Stage: Test Knowledge 🏆' : 'Next Stage: Inspect Datasets 📊'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {isStudent ? (
                <>
                  <button
                    onClick={() => onNavigate('quiz')}
                    className="inline-flex items-center justify-between gap-2 px-5 py-3.5 bg-ice-500 hover:bg-ice-400 text-polar-950 font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>Continue to Quiz Challenge →</span>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('data', activeModule.connectedDatasetId)}
                    className="inline-flex items-center justify-between gap-2 px-5 py-3.5 bg-polar-900 hover:bg-polar-850 border border-polar-750 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-ice-400" />
                      <span>Explore Related Dataset</span>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onNavigate('data', activeModule.connectedDatasetId)}
                    className="inline-flex items-center justify-between gap-2 px-5 py-3.5 bg-teal-500 hover:bg-teal-400 text-polar-950 font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      <span>Inspect Dataset & Evidence →</span>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('quiz')}
                    className="inline-flex items-center justify-between gap-2 px-5 py-3.5 bg-polar-900 hover:bg-polar-850 border border-polar-750 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Test Knowledge in Quiz</span>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Provenance Footer */}
          <div className="p-6 border-t border-polar-800">
            <ProvenanceBadge provenance={activeModule.provenance} />
          </div>
        </div>
      </div>
    </div>
  );
};

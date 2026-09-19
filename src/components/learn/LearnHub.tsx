import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Check,
  Radio,
  Zap
} from 'lucide-react';
import { LEARNING_MODULES } from '../../data/learningModules';
import { LearningModule } from '../../types/polar';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { NavTab } from '../layout/Navbar';
import { LearningEnvironment } from './LearningEnvironment';
import { EnvironmentTheme } from './EnvironmentBackground';
import { ImmersiveMediaGallery } from '../media/ImmersiveMediaGallery';

interface LearnHubProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialModuleId?: string;
}

export const LearnHub: React.FC<LearnHubProps> = ({ onNavigate, initialModuleId }) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    initialModuleId || LEARNING_MODULES[0].id
  );
  const [learningTab, setLearningTab] = useState<'eli15' | 'deep'>('eli15');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Exploration tracking
  const [exploredModuleIds, setExploredModuleIds] = useState<Set<string>>(() => {
    return new Set([initialModuleId || LEARNING_MODULES[0].id]);
  });

  const activeModule: LearningModule = LEARNING_MODULES.find((m) => m.id === selectedModuleId) || LEARNING_MODULES[0];

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

  // Determine environment theme from active module topic
  const getThemeForModule = (mod: LearningModule): EnvironmentTheme => {
    if (mod.topic === 'Cryosphere' || mod.id.includes('ice') || mod.id.includes('glacier')) return 'sea-ice';
    if (mod.topic === 'Atmosphere' || mod.id.includes('ozone')) return 'ozone-atmosphere';
    if (mod.topic === 'Ocean' || mod.id.includes('ocean')) return 'ocean-climate';
    return 'space-satellite';
  };

  const activeTheme = getThemeForModule(activeModule);

  const moduleImages = activeModule.imageGallery && activeModule.imageGallery.length > 0
    ? activeModule.imageGallery
    : [activeModule.coverImage];

  return (
    <LearningEnvironment theme={activeTheme}>
      <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* COMPACT LEARNING JOURNEY PROGRESS HEADER */}
        <div className="bg-polar-900/90 border border-polar-750 rounded-2xl p-5 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-ice-500/20 border border-ice-400/40 text-ice-300 shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xs font-mono uppercase tracking-widest text-ice-400 font-bold flex items-center gap-2">
                <Radio className="w-3 h-3 text-teal-400 animate-pulse" />
                <span>STAGE 01 · CONCEPT EXPLORER</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                Polar Systems Concept Explorer
              </h1>
            </div>
          </div>

          {/* 3-Step Journey Indicator */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ice-400 text-polar-950 font-bold shadow-md">
              <span className="w-2 h-2 rounded-full bg-polar-950 animate-pulse" />
              <span>1. Understand 🎓</span>
            </div>
            <span className="text-slate-600">→</span>
            <div
              onClick={() => onNavigate('explore')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-polar-950/80 border border-polar-750 text-slate-300 hover:text-white cursor-pointer transition-colors"
            >
              <span>2. Explore 🗺️</span>
            </div>
            <span className="text-slate-600">→</span>
            <div
              onClick={() => onNavigate('quiz')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-polar-950/80 border border-polar-750 text-slate-300 hover:text-white cursor-pointer transition-colors"
            >
              <span>3. Test 🏆</span>
            </div>
          </div>
        </div>

        {/* MODULE SELECTION BAR WITH ENVIRONMENT THUMBNAILS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-ice-400" />
              Select Polar Science Module ({LEARNING_MODULES.length} Available)
            </span>
            <span className="text-2xs text-slate-300 font-bold">
              {exploredModuleIds.size} of {LEARNING_MODULES.length} Explored
            </span>
          </div>

          {/* Module Cards Carousel Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {LEARNING_MODULES.map((mod) => {
              const isSelected = selectedModuleId === mod.id;
              const isExplored = exploredModuleIds.has(mod.id);
              return (
                <motion.button
                  key={mod.id}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleModuleSelect(mod.id)}
                  className={`p-3 rounded-2xl text-xs font-mono text-left transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-ice-400 text-polar-950 border-ice-300 font-bold shadow-lg ring-2 ring-ice-400/40'
                      : isExplored
                      ? 'bg-polar-900/90 border-polar-750 text-slate-200 hover:bg-polar-850'
                      : 'bg-polar-950/70 border-polar-800 text-slate-400 hover:text-slate-200 hover:bg-polar-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-75">
                    <span>{mod.topic}</span>
                    {isExplored && <span>✓</span>}
                  </div>
                  <div className="font-bold truncate mt-1 text-xs">
                    {mod.title.split(':')[0]}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE MODULE FEATURED DISPLAY */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-polar-900/90 border border-polar-750 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            {/* Header Rotating Interactive Media Gallery Banner */}
            <ImmersiveMediaGallery
              images={moduleImages}
              title={activeModule.title}
              subtitle={`${activeModule.topic} • ${activeModule.region} • ${activeModule.tagline}`}
              badgeText={`SCIENTIFIC VISUALIZATION · ${activeModule.topic}`}
              autoPlayInterval={5000}
              aspectRatioClassName="h-72 sm:h-96 w-full rounded-none"
            />

            {/* Depth Selector Tabs (ELI15 vs Deep Technical) */}
            <div className="p-6 border-b border-polar-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-polar-950 p-1.5 rounded-2xl border border-polar-750">
                <button
                  type="button"
                  onClick={() => handleTabSwitch('eli15')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    learningTab === 'eli15'
                      ? 'bg-ice-400 text-polar-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🎓 Conceptual Overview
                </button>
                <button
                  type="button"
                  onClick={() => handleTabSwitch('deep')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    learningTab === 'deep'
                      ? 'bg-teal-400 text-polar-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🔬 Deep Physics & Equations
                </button>
              </div>

              <span className="text-2xs font-mono text-slate-400 hidden sm:inline-block">
                Reading Time: <strong className="text-white uppercase">{activeModule.readingTimeMinutes} min</strong>
              </span>
            </div>

            {/* Tab Content Display */}
            <div className="p-6 sm:p-8 space-y-6">
              {learningTab === 'eli15' ? (
                /* CONCEPTUAL OVERVIEW (ELI15) */
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-polar-950/80 border border-polar-800 space-y-2">
                    <div className="text-2xs font-mono font-bold uppercase tracking-widest text-ice-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-ice-300" />
                      <span>Core Idea in Plain English</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                      {activeModule.eli15.simpleExplanation}
                    </p>
                  </div>

                  {/* Real World Analogy */}
                  <div className="p-6 rounded-2xl bg-polar-950/60 border border-polar-800 space-y-2">
                    <div className="text-2xs font-mono font-bold uppercase tracking-widest text-teal-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-teal-400" />
                      <span>Real-World Physical Analogy</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed italic font-serif">
                      "{activeModule.eli15.analogy}"
                    </p>
                  </div>
                </div>
              ) : (
                /* DEEP PHYSICS & EQUATIONS */
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-polar-950 border border-polar-750 space-y-3">
                    <div className="text-2xs font-mono font-bold uppercase tracking-widest text-teal-400 flex items-center gap-2">
                      <Microscope className="w-4 h-4" />
                      <span>Thermodynamic & Fluid Dynamic Formulation</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed bg-polar-900 p-4 rounded-xl border border-polar-800">
                      {activeModule.goDeeper.governingEquationsOrMechanisms}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-polar-950/60 border border-polar-800 space-y-2">
                      <div className="text-2xs font-mono font-bold uppercase tracking-widest text-slate-400">
                        Active Research Frontier
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeModule.goDeeper.activeResearchFrontiers}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-polar-950/60 border border-polar-800 space-y-2">
                      <div className="text-2xs font-mono font-bold uppercase tracking-widest text-slate-400">
                        Sensors & Instruments
                      </div>
                      <div className="flex flex-wrap gap-2 font-mono text-xs">
                        {activeModule.goDeeper.instrumentsUsed.map((inst: string, i: number) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-polar-900 border border-polar-750 text-slate-200">
                            {inst}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Scientific Questions (FAQ Accordion) */}
              <div className="pt-4 border-t border-polar-800 space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-ice-400" />
                  <span>Key Scientific Questions Answered</span>
                </div>

                <div className="space-y-2.5">
                  {activeModule.keyQuestionsAnswered.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="border border-polar-800 rounded-2xl overflow-hidden bg-polar-950/60">
                        <button
                          type="button"
                          onClick={() => toggleFaq(idx)}
                          className="w-full p-4 text-left text-xs sm:text-sm font-bold text-slate-200 hover:text-white bg-polar-950 hover:bg-polar-850 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-ice-400 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="p-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-polar-800 bg-polar-900/40 font-sans">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* UNIFIED CONTEXTUAL NEXT ACTIONS */}
              <div className="pt-6 border-t border-polar-800 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('quiz')}
                  className="px-5 py-4 bg-ice-400 hover:bg-ice-300 text-polar-950 font-extrabold rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Test Knowledge in Quiz Challenge</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('data', activeModule.connectedDatasetId)}
                  className="px-5 py-4 bg-polar-950 hover:bg-polar-850 border border-polar-750 text-slate-200 hover:text-white font-bold rounded-2xl transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-teal-400" />
                    <span>Inspect Connected Telemetry Data</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Provenance Badge */}
              <div className="pt-4 border-t border-polar-800">
                <ProvenanceBadge provenance={activeModule.provenance} />
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </LearningEnvironment>
  );
};

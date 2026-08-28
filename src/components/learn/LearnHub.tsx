import React, { useState } from 'react';
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
  ChevronUp
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

  const activeModule = LEARNING_MODULES.find((m) => m.id === selectedModuleId) || LEARNING_MODULES[0];

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-frost-cyan/20 border border-frost-cyan/50 text-frost-cyan text-xs font-semibold shadow-polar-glow">
            <BookOpen className="w-4 h-4 text-frost-teal" />
            <span>Dual-Level Polar Science Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
            🧠 Learn Polar Science
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Grounded in real scientific observations with two accessible levels: intuitive analogies in <strong>Explain Like I'm 15</strong> or quantitative rigor in <strong>Go Deeper</strong>.
          </p>
        </div>

        {/* Module Selection Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {LEARNING_MODULES.map((mod) => {
            const isSelected = selectedModuleId === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  setSelectedModuleId(mod.id);
                  setOpenFaqIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-frost-cyan text-polar-950 border-frost-cyan shadow-polar-glow'
                    : 'bg-polar-900 border-polar-800 text-slate-300 hover:bg-polar-850 hover:text-white'
                }`}
              >
                <span>{mod.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Module Card */}
        <div className="bg-polar-900/90 rounded-3xl border border-polar-750 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Module Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-polar-800 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-polar-800 border border-polar-700 text-frost-cyan">
                  {activeModule.topic}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeModule.readingTimeMinutes} min read
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-mono">
                {activeModule.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 italic">
                "{activeModule.tagline}"
              </p>
            </div>

            {/* Mode Switch Tabs: ELI15 vs Go Deeper */}
            <div className="flex items-center bg-polar-950 p-1.5 rounded-2xl border border-polar-800 shadow-inner self-start md:self-auto">
              <button
                onClick={() => setLearningTab('eli15')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  learningTab === 'eli15'
                    ? 'bg-gradient-to-r from-frost-cyan to-sky-400 text-polar-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Explain Like I'm 15</span>
              </button>

              <button
                onClick={() => setLearningTab('deep')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  learningTab === 'deep'
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Microscope className="w-4 h-4" />
                <span>🔬 Go Deeper</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Explain Like I'm 15 Content */}
          {learningTab === 'eli15' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Analogy Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-frost-cyan/10 via-polar-950 to-polar-950 border border-frost-cyan/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-frost-cyan uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-frost-teal" />
                  <span>The Real-World Analogy</span>
                </div>
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
                  {activeModule.eli15.analogy}
                </p>
              </div>

              {/* Simple Explanation */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  How It Actually Works
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-polar-950/60 p-5 rounded-2xl border border-polar-800">
                  {activeModule.eli15.simpleExplanation}
                </p>
              </div>

              {/* Key Takeaway & Fun Fact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <span>💡 Key Takeaway</span>
                  </div>
                  <p className="text-xs text-emerald-200 leading-relaxed">
                    {activeModule.eli15.keyTakeaway}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <span>✨ Did You Know?</span>
                  </div>
                  <p className="text-xs text-amber-200 leading-relaxed">
                    {activeModule.eli15.didYouKnow}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Go Deeper Content */}
          {learningTab === 'deep' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Scientific Principles */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Governing Principles & Dynamics</span>
                </h3>
                <ul className="space-y-2">
                  {activeModule.goDeeper.scientificPrinciples.map((principle, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-xl bg-polar-950 border border-polar-800 text-xs text-slate-200 flex items-start gap-2"
                    >
                      <span className="text-indigo-400 font-bold">•</span>
                      <span>{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Governing Equations / Thermodynamic Mechanisms */}
              <div className="p-5 rounded-2xl bg-polar-950 border border-indigo-500/40 space-y-2">
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Thermodynamic & Mathematical Formulation
                </div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed bg-polar-900/80 p-3 rounded-xl border border-polar-800">
                  {activeModule.goDeeper.governingEquationsOrMechanisms}
                </p>
              </div>

              {/* Active Research Frontiers & Instruments */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-polar-950 border border-polar-800 space-y-1">
                  <div className="text-xs font-bold text-slate-200">🔬 Research Frontier</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeModule.goDeeper.activeResearchFrontiers}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-polar-950 border border-polar-800 space-y-2">
                  <div className="text-xs font-bold text-slate-200">🛰️ Sensors & Instruments</div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModule.goDeeper.instrumentsUsed.map((inst, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-polar-900 border border-polar-750 text-[10px] font-mono text-frost-cyan"
                      >
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Questions Answered (Interactive Accordion) */}
          <div className="space-y-3 pt-4 border-t border-polar-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-frost-cyan" />
              <span>Key Scientific Questions Answered</span>
            </h3>

            <div className="space-y-2">
              {activeModule.keyQuestionsAnswered.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl bg-polar-950 border border-polar-800 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-3.5 text-left text-xs font-bold text-slate-200 hover:text-frost-cyan flex items-center justify-between gap-2 transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>

                    {isOpen && (
                      <div className="p-3.5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-polar-900 animate-in fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connected Datasets & Quizzes Link Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {activeModule.connectedDatasetId && (
              <button
                onClick={() => onNavigate('data', activeModule.connectedDatasetId)}
                className="p-3.5 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-800 text-xs font-bold text-frost-cyan flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-frost-cyan" />
                  <span>Inspect Real Dataset</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onNavigate('quiz')}
              className="p-3.5 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-800 text-xs font-bold text-amber-300 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Test Knowledge in Quiz</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Provenance Card */}
          <ProvenanceBadge provenance={activeModule.provenance} />
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Microscope,
  HelpCircle,
  Zap,
  Layers,
  Award,
  Database,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Clock,
  FlaskConical,
  Sparkles,
  CheckCircle2,
  Target,
  Lightbulb,
  Brain
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
  const [learningTab, setLearningTab] = useState<'student' | 'researcher'>(
    isStudent ? 'student' : 'researcher'
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const activeModule = LEARNING_MODULES.find((m) => m.id === selectedModuleId) || LEARNING_MODULES[0];

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Sync tab when audience mode changes
  React.useEffect(() => {
    setLearningTab(isStudent ? 'student' : 'researcher');
  }, [isStudent]);

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100">
      {/* Page header */}
      <div className="border-b border-ink-700 bg-polar-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-px bg-ice-400" aria-hidden="true" />
                <span className="text-2xs font-medium tracking-widest uppercase text-ice-400">
                  Learning Hub
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-3 tracking-tight">
                Learn Polar Science
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                Grounded in real scientific observations. Two access levels: quick intuitive explanations 
                for students, quantitative detail for researchers.
              </p>
            </div>

            {/* Mode toggle — prominent */}
            <div className="hidden md:flex flex-col gap-2 shrink-0">
              <div className="text-2xs text-slate-500 uppercase tracking-widest mb-1">View mode</div>
              <div className="flex border border-ink-700 rounded-md overflow-hidden">
                <button
                  onClick={() => setLearningTab('student')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors duration-150
                    ${learningTab === 'student'
                      ? 'bg-teal-500/20 text-teal-400 border-r border-teal-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-ink-800 border-r border-ink-700'
                    }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Student
                </button>
                <button
                  onClick={() => setLearningTab('researcher')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors duration-150
                    ${learningTab === 'researcher'
                      ? 'bg-ice-500/20 text-ice-400'
                      : 'text-slate-400 hover:text-white hover:bg-ink-800'
                    }`}
                >
                  <Microscope className="w-3.5 h-3.5" />
                  Researcher
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Left: Module list */}
          <div className="lg:col-span-1">
            <div className="text-2xs font-medium tracking-widest uppercase text-slate-500 mb-3">
              Topics
            </div>
            <nav aria-label="Learning modules" className="border border-ink-700 divide-y divide-ink-700">
              {LEARNING_MODULES.map((mod) => {
                const isSelected = selectedModuleId === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setSelectedModuleId(mod.id);
                      setOpenFaqIndex(null);
                    }}
                    className={`
                      w-full text-left px-4 py-4 border-l-2 transition-colors duration-100
                      ${isSelected
                        ? 'bg-ink-800 border-l-ice-400'
                        : 'hover:bg-ink-800/50 border-l-transparent'
                      }
                    `}
                    aria-pressed={isSelected}
                  >
                    <div className={`text-xs font-medium leading-snug mb-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {mod.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-2xs font-mono ${isSelected ? 'text-ice-400' : 'text-slate-600'}`}>
                        {mod.topic}
                      </span>
                      <span className="text-slate-700">·</span>
                      <span className="text-2xs text-slate-600 flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        {mod.readingTimeMinutes}m
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Mobile mode toggle */}
            <div className="md:hidden mt-4 flex border border-ink-700 rounded-md overflow-hidden">
              <button
                onClick={() => setLearningTab('student')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors
                  ${learningTab === 'student' ? 'bg-teal-500/20 text-teal-400 border-r border-teal-500/30' : 'text-slate-400 border-r border-ink-700'}`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Student
              </button>
              <button
                onClick={() => setLearningTab('researcher')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors
                  ${learningTab === 'researcher' ? 'bg-ice-500/20 text-ice-400' : 'text-slate-400'}`}
              >
                <Microscope className="w-3.5 h-3.5" />
                Researcher
              </button>
            </div>
          </div>

          {/* Right: Module content */}
          <div className="lg:col-span-3 space-y-6">

            {/* Module header */}
            <div className="border border-ink-700 bg-polar-900 p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="discipline-tag">{activeModule.topic}</span>
                <span className="tag">{activeModule.region}</span>
                <span className="flex items-center gap-1 text-2xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {activeModule.readingTimeMinutes} min read
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 leading-tight">
                {activeModule.title}
              </h2>
              <p className="text-sm text-slate-400 italic leading-relaxed">
                "{activeModule.tagline}"
              </p>
            </div>

            {/* STUDENT MODE */}
            {learningTab === 'student' && (
              <div className="space-y-5 animate-fade-in">

                {/* 30-second version */}
                <div className="border border-teal-600/30 bg-teal-950/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-teal-400" aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">
                      The 30-Second Version
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
                    {activeModule.eli15.simpleExplanation}
                  </p>
                </div>

                {/* Analogy */}
                <div className="border border-ink-700 bg-polar-900 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-400" aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                      Real-World Analogy
                    </span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {activeModule.eli15.analogy}
                  </p>
                </div>

                {/* Key takeaway + Did you know — 2-col */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-emerald-600/30 bg-emerald-950/10 p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Target className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-2xs font-semibold uppercase tracking-wider text-emerald-400">
                        Key Takeaway
                      </span>
                    </div>
                    <p className="text-sm text-emerald-100 leading-relaxed">
                      {activeModule.eli15.keyTakeaway}
                    </p>
                  </div>

                  <div className="border border-amber-600/30 bg-amber-950/10 p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-2xs font-semibold uppercase tracking-wider text-amber-400">
                        Did You Know?
                      </span>
                    </div>
                    <p className="text-sm text-amber-100 leading-relaxed">
                      {activeModule.eli15.didYouKnow}
                    </p>
                  </div>
                </div>

                {/* Fun fact */}
                {activeModule.eli15.funFact && (
                  <div className="border-l-2 border-ice-400 pl-4 py-1 bg-polar-900 border border-l-ice-400 border-t-ink-700 border-r-ink-700 border-b-ink-700 p-4">
                    <div className="text-2xs font-semibold uppercase tracking-widest text-ice-400 mb-1.5">
                      Fun Fact
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {activeModule.eli15.funFact}
                    </p>
                  </div>
                )}

                {/* FAQ accordion */}
                {activeModule.keyQuestionsAnswered.length > 0 && (
                  <div className="border border-ink-700">
                    <div className="px-5 py-3 border-b border-ink-700 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-ice-400" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                        Quick Questions
                      </span>
                    </div>
                    <div className="divide-y divide-ink-700">
                      {activeModule.keyQuestionsAnswered.map((faq, idx) => {
                        const isOpen = openFaqIndex === idx;
                        return (
                          <div key={idx}>
                            <button
                              onClick={() => toggleFaq(idx)}
                              className="w-full px-5 py-4 text-left text-sm font-medium text-slate-200 hover:text-white flex items-start justify-between gap-3 transition-colors"
                            >
                              <span className="leading-snug">{faq.question}</span>
                              {isOpen
                                ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              }
                            </button>
                            {isOpen && (
                              <div className="px-5 pb-4 text-sm text-slate-300 leading-relaxed border-t border-ink-700 bg-polar-950/40 animate-fade-in">
                                <p className="pt-4">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Go deeper prompt */}
                <div className="border border-ink-700 bg-polar-900 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-300 mb-1">Want the real science?</div>
                    <p className="text-xs text-slate-500">Switch to Researcher view for governing equations, instruments, and research frontiers.</p>
                  </div>
                  <button
                    onClick={() => setLearningTab('researcher')}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-ink-700 hover:border-ice-500 text-slate-300 hover:text-white text-xs font-medium rounded-md transition-colors shrink-0"
                  >
                    <Microscope className="w-3.5 h-3.5" />
                    Go Deeper
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

            {/* RESEARCHER MODE */}
            {learningTab === 'researcher' && (
              <div className="space-y-5 animate-fade-in">

                {/* Scientific principles */}
                <div className="border border-ink-700 bg-polar-900">
                  <div className="px-5 py-3 border-b border-ink-700 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-ice-400" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                      Governing Principles & Dynamics
                    </span>
                  </div>
                  <ul className="divide-y divide-ink-700">
                    {activeModule.goDeeper.scientificPrinciples.map((principle, idx) => (
                      <li key={idx} className="px-5 py-4 flex items-start gap-3">
                        <span className="text-ice-400 font-semibold text-sm shrink-0 mt-0.5">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm text-slate-300 leading-relaxed">{principle}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mathematical formulation */}
                <div className="border border-polar-700 bg-polar-900 p-5">
                  <div className="text-2xs font-semibold uppercase tracking-widest text-ice-400 mb-3">
                    Thermodynamic & Mathematical Formulation
                  </div>
                  <pre className="text-xs text-slate-300 font-mono leading-relaxed bg-polar-950 p-4 border border-ink-700 overflow-x-auto whitespace-pre-wrap">
                    {activeModule.goDeeper.governingEquationsOrMechanisms}
                  </pre>
                </div>

                {/* Research frontier + Instruments */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-ink-700 bg-polar-900 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <FlaskConical className="w-4 h-4 text-purple-400" />
                      <span className="text-2xs font-semibold uppercase tracking-widest text-slate-300">
                        Active Research Frontiers
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {activeModule.goDeeper.activeResearchFrontiers}
                    </p>
                  </div>

                  <div className="border border-ink-700 bg-polar-900 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4 text-teal-400" />
                      <span className="text-2xs font-semibold uppercase tracking-widest text-slate-300">
                        Sensors & Instruments
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeModule.goDeeper.instrumentsUsed.map((inst, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 border border-ink-700 bg-polar-950 text-2xs font-mono text-ice-400 rounded-sm"
                        >
                          {inst}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* FAQ — full context */}
                {activeModule.keyQuestionsAnswered.length > 0 && (
                  <div className="border border-ink-700">
                    <div className="px-5 py-3 border-b border-ink-700 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-ice-400" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                        Key Scientific Questions
                      </span>
                    </div>
                    <div className="divide-y divide-ink-700">
                      {activeModule.keyQuestionsAnswered.map((faq, idx) => {
                        const isOpen = openFaqIndex === idx;
                        return (
                          <div key={idx}>
                            <button
                              onClick={() => toggleFaq(idx)}
                              className="w-full px-5 py-4 text-left text-sm font-medium text-slate-200 hover:text-white flex items-start justify-between gap-3 transition-colors"
                            >
                              <span className="leading-snug">{faq.question}</span>
                              {isOpen
                                ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              }
                            </button>
                            {isOpen && (
                              <div className="px-5 pb-4 text-sm text-slate-300 leading-relaxed border-t border-ink-700 bg-polar-950/40 animate-fade-in">
                                <p className="pt-4">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Student view prompt */}
                <div className="border border-ink-700 bg-polar-900 p-4 flex items-center justify-between gap-4">
                  <p className="text-xs text-slate-500">Need a simpler overview? Switch to Student view for analogies and key takeaways.</p>
                  <button
                    onClick={() => setLearningTab('student')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-teal-600/40 text-teal-400 text-xs font-medium rounded-md transition-colors hover:bg-teal-500/10 shrink-0"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    Student View
                  </button>
                </div>

              </div>
            )}

            {/* Connected resources — always visible */}
            <div className="border border-ink-700 p-5">
              <div className="text-2xs font-medium tracking-widest uppercase text-slate-500 mb-4">
                Connected Resources
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(activeModule.connectedDatasetIds?.length || activeModule.connectedDatasetId) && (
                  <button
                    onClick={() => onNavigate('data', activeModule.connectedDatasetIds?.[0] || activeModule.connectedDatasetId)}
                    className="flex items-center gap-2 px-4 py-3 border border-ink-700 hover:border-ice-500 text-slate-300 hover:text-white text-xs font-medium rounded-md transition-colors text-left"
                  >
                    <Database className="w-4 h-4 text-ice-400 shrink-0" />
                    <span>Inspect Dataset</span>
                    <ArrowRight className="w-3 h-3 ml-auto" />
                  </button>
                )}
                <button
                  onClick={() => onNavigate('quiz')}
                  className="flex items-center gap-2 px-4 py-3 border border-ink-700 hover:border-amber-500/50 text-slate-300 hover:text-white text-xs font-medium rounded-md transition-colors text-left"
                >
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Test Knowledge</span>
                  <ArrowRight className="w-3 h-3 ml-auto" />
                </button>
                <button
                  onClick={() => onNavigate('research')}
                  className="flex items-center gap-2 px-4 py-3 border border-ink-700 hover:border-purple-500/50 text-slate-300 hover:text-white text-xs font-medium rounded-md transition-colors text-left"
                >
                  <BookOpen className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Read Research</span>
                  <ArrowRight className="w-3 h-3 ml-auto" />
                </button>
              </div>
            </div>

            {/* Provenance */}
            <ProvenanceBadge provenance={activeModule.provenance} />

          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { FileText, Search, ExternalLink, Copy, Check, ShieldCheck, BookOpen, Database, Compass, Award, Sparkles, Layers, Zap, ArrowRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESEARCH_PAPERS } from '../../data/researchPapers';
import { ResearchPaper } from '../../types/polar';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { NavTab } from '../layout/Navbar';

interface ResearchDiscoveryProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialPaperId?: string;
}

export const ResearchDiscovery: React.FC<ResearchDiscoveryProps> = ({ onNavigate, initialPaperId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(initialPaperId || null);

  const filteredPapers = useMemo(() => {
    return RESEARCH_PAPERS.filter((p) => {
      if (selectedTopic !== 'all' && p.topic !== selectedTopic) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesAuthor = p.authors.some((a) => a.toLowerCase().includes(q));
        const matchesJournal = p.journal.toLowerCase().includes(q);
        const matchesDoi = p.doi.toLowerCase().includes(q);
        const matchesAbstract = p.abstract.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAuthor && !matchesJournal && !matchesDoi && !matchesAbstract) {
          return false;
        }
      }
      return true;
    });
  }, [selectedTopic, searchQuery]);

  const copyCitation = (paper: ResearchPaper) => {
    const bibtex = `@article{${paper.id},
  title = {${paper.title}},
  author = {${paper.authors.join(' and ')}},
  journal = {${paper.journal}},
  year = {${paper.year}},
  doi = {${paper.doi}}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedDoi(paper.id);
    setTimeout(() => setCopiedDoi(null), 2200);
  };

  const topics = ['all', 'Atmosphere', 'Cryosphere', 'Climate', 'Glaciers', 'Ocean'];

  // High-impact featured research paper
  const featuredPaper = RESEARCH_PAPERS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full min-h-screen bg-polar-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-10"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-polar-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-2xs font-mono font-bold uppercase tracking-widest text-ice-300 mb-2 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-ice-400" />
              <span>STAGE 03 · PEER-REVIEWED KNOWLEDGE ARCHIVE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Polar Research Literature
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
              Explore ground-truth scientific publications registered with Crossref DOIs. Grounding all platform observations in peer-reviewed research from Nature, JGR, and Polar Science.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="font-bold text-white text-base font-mono">{filteredPapers.length}</span>
            <span>peer-reviewed papers indexed</span>
          </div>
        </div>

        {/* FEATURED ARCHIVE PAPER SPOTLIGHT */}
        {featuredPaper && (
          <div className="bg-gradient-to-r from-polar-900 via-polar-900 to-polar-950 border border-teal-500/40 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-polar-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-mono font-bold">
                  FEATURED HIGH-IMPACT PUBLICATION
                </span>
                <span className="text-2xs font-mono text-slate-400">
                  {featuredPaper.journal} ({featuredPaper.year})
                </span>
              </div>
              <span className="text-2xs font-mono text-ice-300">
                DOI: {featuredPaper.doi}
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {featuredPaper.title}
              </h2>
              <div className="text-xs font-mono text-slate-400">
                Lead Authors: <span className="text-slate-200">{featuredPaper.authors.join(', ')}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {featuredPaper.abstract}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-polar-800">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => copyCitation(featuredPaper)}
                  className="px-4 py-2.5 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-750 text-slate-200 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all"
                >
                  {copiedDoi === featuredPaper.id ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5 text-ice-400" />}
                  <span>{copiedDoi === featuredPaper.id ? '✓ Citation Copied' : 'Copy BibTeX Citation'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                {featuredPaper.connectedDatasetIds?.[0] && (
                  <button
                    type="button"
                    onClick={() => onNavigate('data', featuredPaper.connectedDatasetIds[0])}
                    className="px-5 py-2.5 rounded-xl bg-ice-400 hover:bg-ice-300 text-polar-950 font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all"
                  >
                    <Database className="w-4 h-4" />
                    <span>Inspect Grounding Telemetry</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SEARCH & DISCIPLINE FILTER BAR */}
        <div className="bg-polar-900/90 border border-polar-800 rounded-2xl p-4 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-4 h-4 text-ice-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search by author, DOI, journal, or key discovery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-polar-950 border border-polar-750 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-ice-400 font-mono transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-xs">
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTopic(t)}
                className={`px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedTopic === t
                    ? 'bg-ice-400 text-polar-950 font-bold shadow-md'
                    : 'bg-polar-950 border border-polar-800 text-slate-400 hover:text-white hover:border-polar-700'
                }`}
              >
                {t === 'all' ? 'All Disciplines' : t}
              </button>
            ))}
          </div>
        </div>

        {/* PAPERS ARCHIVE LIST */}
        <div className="space-y-6">
          {filteredPapers.map((paper, index) => {
            const isExpanded = expandedPaperId === paper.id;

            return (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.2) }}
                className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 space-y-5 shadow-xl ${
                  isExpanded
                    ? 'bg-polar-900 border-ice-400 ring-1 ring-ice-400/30'
                    : 'bg-polar-900/80 border-polar-800 hover:border-polar-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-polar-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/15 border border-teal-400/30 text-teal-300">
                      {paper.journal} ({paper.year})
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-2xs font-mono bg-polar-950 text-slate-300 border border-polar-800">
                      {paper.topic}
                    </span>
                  </div>

                  <span className="text-2xs font-mono text-ice-300">
                    DOI: {paper.doi}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {paper.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400">
                    Authors: <span className="text-slate-200">{paper.authors.join(', ')}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans pt-1">
                    {paper.abstract}
                  </p>
                </div>

                {/* KEY DISCOVERY HIGHLIGHT */}
                {paper.studentKeyFinding && (
                  <div className="p-4 rounded-2xl bg-polar-950/90 border border-polar-800 space-y-1.5">
                    <div className="text-2xs font-mono font-bold text-teal-300 uppercase tracking-widest flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-teal-400" />
                      <span>Key Scientific Finding</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed">
                      {paper.studentKeyFinding}
                    </p>
                  </div>
                )}

                {/* CROSS-NAVIGATION RELATIONSHIPS */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-polar-800">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyCitation(paper)}
                      className="px-3.5 py-2 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-750 text-slate-200 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      {copiedDoi === paper.id ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5 text-ice-400" />}
                      <span>{copiedDoi === paper.id ? '✓ Copied' : 'BibTeX'}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {paper.connectedDatasetIds?.[0] && (
                      <button
                        type="button"
                        onClick={() => onNavigate('data', paper.connectedDatasetIds[0])}
                        className="px-4 py-2.5 rounded-xl bg-ice-400 hover:bg-ice-300 text-polar-950 font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
                      >
                        <Database className="w-3.5 h-3.5" />
                        <span>Inspect Telemetry Data</span>
                      </button>
                    )}

                    {paper.connectedStationIds?.[0] && (
                      <button
                        type="button"
                        onClick={() => onNavigate('explore', paper.connectedStationIds[0])}
                        className="px-4 py-2.5 rounded-xl bg-polar-950 border border-polar-750 hover:border-ice-400 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <MapPin className="w-3.5 h-3.5 text-ice-400" />
                        <span>Locate Observatory</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CONTEXTUAL NEXT STEPS GATEWAY */}
        <div className="pt-8 border-t border-polar-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate('data')}
            className="p-5 rounded-2xl bg-polar-900/80 border border-polar-750 hover:border-ice-400/60 transition-all cursor-pointer group"
          >
            <div className="text-2xs font-mono text-ice-300 font-bold uppercase tracking-wider mb-1">
              Underlying Evidence
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-ice-300 flex items-center justify-between">
              <span>Inspect Datasets & Charts</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Analyze the raw telemetry data, satellite measurements, and time-series referenced in these publications.
            </p>
          </div>

          <div
            onClick={() => onNavigate('explore')}
            className="p-5 rounded-2xl bg-polar-900/80 border border-polar-750 hover:border-teal-400/60 transition-all cursor-pointer group"
          >
            <div className="text-2xs font-mono text-teal-300 font-bold uppercase tracking-wider mb-1">
              Field Stations
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-teal-300 flex items-center justify-between">
              <span>Explore Research Observatories</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Locate polar stations like Maitri, Bharati, and Himadri where field sampling and radar operations occur.
            </p>
          </div>

          <div
            onClick={() => onNavigate('quiz')}
            className="p-5 rounded-2xl bg-polar-900/80 border border-polar-750 hover:border-orange-400/60 transition-all cursor-pointer group"
          >
            <div className="text-2xs font-mono text-orange-400 font-bold uppercase tracking-wider mb-1">
              Knowledge Check
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-orange-400 flex items-center justify-between">
              <span>Take Scientific Challenge</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Test your understanding of polar physics, ice mass loss, and atmospheric teleconnections in the Quiz Center.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

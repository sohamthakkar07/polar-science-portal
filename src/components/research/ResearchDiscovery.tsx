import React, { useState, useMemo } from 'react';
import { FileText, Search, ExternalLink, Copy, Check, ShieldCheck, Filter, BookOpen, Database, Compass, ArrowRight } from 'lucide-react';
import { RESEARCH_PAPERS } from '../../data/researchPapers';
import { ResearchPaper, PolarTopic, PolarRegion } from '../../types/polar';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { useAudience } from '../../context/AudienceContext';
import { NavTab } from '../layout/Navbar';

interface ResearchDiscoveryProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialPaperId?: string;
}

export const ResearchDiscovery: React.FC<ResearchDiscoveryProps> = ({ onNavigate, initialPaperId }) => {
  const { isStudent } = useAudience();
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
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  const topics = ['all', 'Atmosphere', 'Cryosphere', 'Climate', 'Glaciers', 'Ocean'];

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-polar-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4" />
              <span>Peer-Reviewed Scholarly Knowledge Layer</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              📚 Polar Research Discovery
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Explore ground-truth polar scientific papers registered with Crossref DOIs. Grounding all platform claims in peer-reviewed literature from Nature, JGR, and Polar Science.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-white">{filteredPapers.length}</span>
            <span>peer-reviewed papers indexed</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-polar-900/90 border border-polar-800 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by author, DOI, journal, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-polar-950 border border-polar-750 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTopic === t
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-polar-950 border border-polar-750 text-slate-400 hover:text-white'
                }`}
              >
                {t === 'all' ? 'All Disciplines' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Papers List */}
        <div className="space-y-4">
          {filteredPapers.map((paper) => {
            const isExpanded = expandedPaperId === paper.id;
            return (
              <div
                key={paper.id}
                className="p-6 rounded-2xl bg-polar-900/90 border border-polar-750 hover:border-indigo-500/40 shadow-xl transition-all space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-950 border border-indigo-500/40 text-indigo-300">
                        {paper.topic}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {paper.journal} • {paper.year}
                      </span>
                      {paper.citationsCount && (
                        <span className="text-[10px] text-emerald-400 font-semibold">
                          {paper.citationsCount}+ Citations
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      {paper.title}
                    </h2>

                    <div className="text-xs text-slate-400">
                      {paper.authors.join(', ')}
                    </div>
                  </div>

                  {/* DOI & Citation Button */}
                  <div className="flex items-center gap-2 shrink-0 self-start">
                    <button
                      onClick={() => copyCitation(paper)}
                      className="px-3 py-1.5 rounded-xl bg-polar-950 border border-polar-750 hover:border-indigo-400 text-xs font-semibold text-indigo-300 flex items-center gap-1.5 transition-colors"
                      title="Copy BibTeX Citation"
                    >
                      {copiedDoi === paper.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>BibTeX</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>DOI Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Abstract vs Student Key Finding */}
                <div className="space-y-2">
                  <div className="p-4 rounded-xl bg-polar-950/80 border border-polar-800 text-xs leading-relaxed text-slate-300">
                    <strong className="text-frost-cyan block mb-1">
                      {isStudent ? '🎓 Student Key Finding:' : '🔬 Scientific Abstract:'}
                    </strong>
                    <p>{isStudent ? paper.studentKeyFinding : paper.abstract}</p>
                  </div>
                </div>

                {/* Connected Entities Links */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-polar-800/80 text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    {paper.connectedDatasetIds.length > 0 && (
                      <button
                        onClick={() => onNavigate('data', paper.connectedDatasetIds[0])}
                        className="text-frost-cyan hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Database className="w-3.5 h-3.5" />
                        <span>Connected Dataset</span>
                      </button>
                    )}
                    {paper.connectedStationIds.length > 0 && (
                      <button
                        onClick={() => onNavigate('explore', paper.connectedStationIds[0])}
                        className="text-frost-teal hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Connected Station</span>
                      </button>
                    )}
                  </div>

                  <span className="font-mono text-[10px] text-slate-500">
                    DOI: {paper.doi}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

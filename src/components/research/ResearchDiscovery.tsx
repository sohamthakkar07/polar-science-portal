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
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-polar-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-polar-900 border border-ice-500/30 text-ice-300 text-2xs font-mono mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider font-semibold">Peer-Reviewed Scholarly Knowledge Layer</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Polar Research Literature
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
              Explore ground-truth scientific publications registered with Crossref DOIs. Grounding all platform findings in peer-reviewed research from Nature, JGR, and Polar Science.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="font-bold text-white">{filteredPapers.length}</span>
            <span>indexed publications</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-polar-900/90 border border-polar-800 rounded-xl p-4 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 shadow-glass">
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-4 h-4 text-ice-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search by author, DOI, journal, or key finding..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-polar-950 border border-polar-750 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-ice-400 font-mono"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-xs">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedTopic === t
                    ? 'bg-ice-500 text-polar-950 font-bold shadow-sm'
                    : 'bg-polar-950 border border-polar-800 text-slate-400 hover:text-white'
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
            const isInitialTarget = paper.id === expandedPaperId;
            return (
              <div
                key={paper.id}
                id={`paper-${paper.id}`}
                className={`bg-polar-900/90 border rounded-2xl p-6 shadow-card transition-all duration-200 space-y-4 ${
                  isInitialTarget
                    ? 'border-ice-400 bg-polar-900 shadow-md ring-1 ring-ice-400/40'
                    : 'border-polar-800 hover:border-ice-500/40'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-2xs font-mono font-semibold bg-ice-500/15 border border-ice-400/30 text-ice-300">
                        {paper.topic}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {paper.journal} • {paper.year}
                      </span>
                      {paper.citationsCount && (
                        <span className="text-2xs font-mono text-teal-400 font-semibold">
                          {paper.citationsCount}+ Citations
                        </span>
                      )}
                      {isInitialTarget && (
                        <span className="px-2 py-0.5 rounded text-2xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                          Selected Reference
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
                  <div className="flex items-center gap-2 shrink-0 self-start font-mono text-xs">
                    <button
                      onClick={() => copyCitation(paper)}
                      className="px-3 py-1.5 rounded-lg bg-polar-950 border border-polar-750 hover:border-ice-400 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                      title="Copy BibTeX Citation"
                    >
                      {copiedDoi === paper.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-ice-400" />
                          <span>BibTeX</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-ice-500 hover:bg-ice-400 text-polar-950 font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>DOI Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Abstract vs Student Key Finding */}
                <div className="p-4 rounded-lg bg-polar-950/70 border border-polar-800 text-xs leading-relaxed text-slate-300">
                  <strong className="text-ice-400 block mb-1 font-mono">
                    {isStudent ? '🎓 Student Summary:' : '🔬 Scientific Abstract:'}
                  </strong>
                  <p>{isStudent ? paper.studentKeyFinding : paper.abstract}</p>
                </div>

                {/* Connected Entities Links */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-polar-800 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-3">
                    {paper.connectedDatasetIds.length > 0 && (
                      <button
                        onClick={() => onNavigate('data', paper.connectedDatasetIds[0])}
                        className="text-ice-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        <Database className="w-3.5 h-3.5" />
                        <span>Connected Dataset</span>
                      </button>
                    )}
                    {paper.connectedStationIds.length > 0 && (
                      <button
                        onClick={() => onNavigate('explore', paper.connectedStationIds[0])}
                        className="text-teal-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Connected Station</span>
                      </button>
                    )}
                  </div>

                  <span className="text-2xs text-slate-500">
                    DOI: {paper.doi}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* BibTeX Copy Success Toast */}
        {copiedDoi && (
          <div className="fixed bottom-6 right-6 z-50 bg-polar-900 border border-emerald-500/60 text-emerald-300 px-4 py-3 rounded-xl shadow-panel backdrop-blur-xl text-xs font-mono flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>BibTeX citation copied to clipboard!</span>
          </div>
        )}
      </div>
    </div>
  );
};

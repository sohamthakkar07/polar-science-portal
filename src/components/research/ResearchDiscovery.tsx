import React, { useState, useMemo } from 'react';
import {
  FileText, Search, ExternalLink, Copy, Check, ShieldCheck,
  BookOpen, Database, Compass, ArrowRight, GraduationCap, Microscope,
  Calendar, Users, Hash
} from 'lucide-react';
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
    <div className="w-full min-h-screen bg-polar-950 text-slate-100">

      {/* Page header */}
      <div className="border-b border-ink-700 bg-polar-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-px bg-purple-400" aria-hidden="true" />
                <span className="text-2xs font-medium tracking-widest uppercase text-purple-400">
                  Peer-Reviewed Literature
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-3 tracking-tight">
                Polar Research Discovery
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                Explore ground-truth polar scientific papers registered with Crossref DOIs.
                All platform claims grounded in peer-reviewed literature from Nature, JGR, and Polar Science.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-400 shrink-0">
              <span className="text-2xl font-semibold text-white">{filteredPapers.length}</span>
              <span className="text-xs text-slate-500">papers indexed</span>
            </div>
          </div>

          {/* Mode indicator */}
          <div className="mt-4 flex items-center gap-2">
            {isStudent
              ? <div className="mode-student"><GraduationCap className="w-3 h-3" /> Student View — simplified summaries</div>
              : <div className="mode-researcher"><Microscope className="w-3 h-3" /> Researcher View — full abstracts & metadata</div>
            }
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-3 p-4 border border-ink-700 bg-polar-900">
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search by author, DOI, journal, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-polar-950 border border-ink-700 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-ice-500 rounded-md"
              aria-label="Search research papers"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors
                  ${selectedTopic === t
                    ? 'bg-ice-600/20 border-ice-600/50 text-ice-400'
                    : 'border-ink-700 text-slate-400 hover:text-white hover:border-ink-600'
                  }`}
              >
                {t === 'all' ? 'All' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Papers list */}
        <div className="space-y-4">
          {filteredPapers.length === 0 ? (
            <div className="text-center py-16 border border-ink-700 bg-polar-900">
              <FileText className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No papers match your search. Try different keywords.</p>
            </div>
          ) : (
            filteredPapers.map((paper) => {
              const isExpanded = expandedPaperId === paper.id;
              return (
                <article
                  key={paper.id}
                  className="border border-ink-700 hover:border-polar-600 bg-polar-900 transition-colors"
                  aria-label={`Research paper: ${paper.title}`}
                >
                  <div className="p-5">
                    {/* Top metadata row */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="discipline-tag">{paper.topic}</span>
                      <span className="tag">{paper.region}</span>
                      <span className="flex items-center gap-1 text-2xs text-slate-500 font-mono">
                        <Calendar className="w-3 h-3" />
                        {paper.journal} · {paper.year}
                      </span>
                      {paper.citationsCount && (
                        <span className="text-2xs text-emerald-400 font-semibold">
                          {paper.citationsCount}+ citations
                        </span>
                      )}
                    </div>

                    {/* Title + authors */}
                    <h2 className="text-base sm:text-lg font-semibold text-white leading-snug mb-2">
                      {paper.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                      <Users className="w-3 h-3 text-slate-500" />
                      <span>{paper.authors.join(', ')}</span>
                    </div>

                    {/* Abstract/key finding */}
                    <div className="p-4 border border-ink-700 bg-polar-950 mb-4">
                      <div className="text-2xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        {isStudent
                          ? <><GraduationCap className="w-3 h-3 text-teal-400" /><span className="text-teal-400">Student Key Finding</span></>
                          : <><Microscope className="w-3 h-3 text-ice-400" /><span className="text-ice-400">Scientific Abstract</span></>
                        }
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {isStudent ? paper.studentKeyFinding : paper.abstract}
                      </p>
                    </div>

                    {/* Footer row — DOI, actions, connections */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-ink-700">
                      {/* Connected entities */}
                      <div className="flex items-center gap-3 text-xs">
                        {paper.connectedDatasetIds.length > 0 && (
                          <button
                            onClick={() => onNavigate('data', paper.connectedDatasetIds[0])}
                            className="flex items-center gap-1 text-ice-400 hover:text-ice-300 transition-colors font-medium"
                          >
                            <Database className="w-3.5 h-3.5" />
                            Dataset
                          </button>
                        )}
                        {paper.connectedStationIds.length > 0 && (
                          <button
                            onClick={() => onNavigate('explore', paper.connectedStationIds[0])}
                            className="flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors font-medium"
                          >
                            <Compass className="w-3.5 h-3.5" />
                            Station
                          </button>
                        )}
                      </div>

                      {/* DOI + actions */}
                      <div className="flex items-center gap-2">
                        <span className="text-2xs text-slate-600 font-mono hidden sm:inline">
                          {paper.doi}
                        </span>
                        <button
                          onClick={() => copyCitation(paper)}
                          className="flex items-center gap-1 px-3 py-1.5 border border-ink-700 hover:border-ice-500 text-slate-400 hover:text-white text-xs font-medium rounded-sm transition-colors"
                          title="Copy BibTeX citation"
                        >
                          {copiedDoi === paper.id
                            ? <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                            : <><Copy className="w-3 h-3" /><span>BibTeX</span></>
                          }
                        </button>
                        <a
                          href={`https://doi.org/${paper.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 bg-polar-700 hover:bg-polar-600 text-white text-xs font-semibold rounded-sm transition-colors"
                          aria-label={`Open DOI for ${paper.title}`}
                        >
                          DOI
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};

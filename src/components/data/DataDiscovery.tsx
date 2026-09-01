import React, { useState, useMemo } from 'react';
import {
  Database,
  Search,
  BarChart2,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  X,
  ChevronDown,
  Filter,
  Layers,
  Globe2,
  LayoutGrid,
  List
} from 'lucide-react';
import { POLAR_DATASETS } from '../../data/datasets';
import { PolarDataset, PolarTopic, PolarRegion } from '../../types/polar';
import { DatasetDetail } from './DatasetDetail';
import { useAudience } from '../../context/AudienceContext';
import { NavTab } from '../layout/Navbar';

interface DataDiscoveryProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialDatasetId?: string;
  initialTopicFilter?: PolarTopic;
}

export const DataDiscovery: React.FC<DataDiscoveryProps> = ({
  onNavigate,
  initialDatasetId,
  initialTopicFilter
}) => {
  const { isStudent } = useAudience();
  const [selectedDatasetId, setSelectedDatasetId] = useState<string | null>(initialDatasetId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState<string>(initialTopicFilter || 'all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const [previewDatasetId, setPreviewDatasetId] = useState<string | null>(null);

  const activeDataset = useMemo(
    () => POLAR_DATASETS.find((d) => d.id === selectedDatasetId) || null,
    [selectedDatasetId]
  );

  if (activeDataset) {
    return (
      <DatasetDetail
        dataset={activeDataset}
        onBack={() => setSelectedDatasetId(null)}
        onNavigate={onNavigate}
      />
    );
  }

  const filteredDatasets = useMemo(() => {
    return POLAR_DATASETS.filter((d) => {
      if (topicFilter !== 'all' && d.topic !== topicFilter) return false;
      if (regionFilter !== 'all' && d.region !== regionFilter) return false;
      if (sourceFilter !== 'all' &&
        !d.provenance.sourceOrgShort.toLowerCase().includes(sourceFilter.toLowerCase())) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = d.title.toLowerCase().includes(q) || d.shortTitle.toLowerCase().includes(q);
        const matchesDesc = d.description.toLowerCase().includes(q);
        const matchesVars = d.variables.some(
          (v) => v.name.toLowerCase().includes(q) || v.standardName.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesDesc && !matchesVars) return false;
      }
      return true;
    });
  }, [topicFilter, regionFilter, sourceFilter, searchQuery]);

  const topics = ['all', 'Cryosphere', 'Climate', 'Ocean', 'Atmosphere', 'Glaciers'];
  const regions = ['all', 'Antarctic', 'Arctic', 'Himalayan / Third Pole', 'Global Ocean'];
  const sources = [
    { id: 'all',   label: 'All Organizations' },
    { id: 'ncpor', label: 'NCPOR / NPDC' },
    { id: 'nsidc', label: 'NSIDC' },
    { id: 'nasa',  label: 'NASA Earthdata' },
    { id: 'bas',   label: 'BAS' },
    { id: 'noaa',  label: 'NOAA / Argo' },
  ];

  const hasActiveFilters =
    topicFilter !== 'all' || regionFilter !== 'all' || sourceFilter !== 'all' || !!searchQuery;

  const clearFilters = () => {
    setTopicFilter('all');
    setRegionFilter('all');
    setSourceFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Page header */}
        <div className="border-b border-polar-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-polar-900 border border-ice-500/30 text-ice-300 text-2xs font-mono mb-3">
              <Database className="w-3.5 h-3.5 text-ice-400" />
              <span className="uppercase tracking-wider font-semibold">Open Scientific Data Repository</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Polar Science Datasets
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
              Open-access polar cryospheric, meteorological, glaciological, and oceanographic datasets from NCPOR, NSIDC, NASA, BAS, and NOAA. Preserved source provenance and DOI linkage.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-polar-900 p-1 rounded-xl border border-polar-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-ice-500 text-polar-950 shadow-sm font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-ice-500 text-polar-950 shadow-sm font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table View</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-polar-900/90 border border-polar-800 rounded-xl p-4 backdrop-blur-xl space-y-4 shadow-glass">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-ice-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                placeholder="Search datasets by variable name, organization, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-polar-950 border border-polar-750 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-ice-400 font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="bg-polar-950 border border-polar-750 rounded-lg px-3 py-2.5 text-xs text-slate-200 font-mono outline-none cursor-pointer hover:border-polar-600"
              >
                <option value="all">All Topics</option>
                {topics.filter(t => t !== 'all').map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="bg-polar-950 border border-polar-750 rounded-lg px-3 py-2.5 text-xs text-slate-200 font-mono outline-none cursor-pointer hover:border-polar-600"
              >
                <option value="all">All Regions</option>
                {regions.filter(r => r !== 'all').map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-polar-800 text-xs font-mono text-slate-400">
            <span>
              Showing <span className="text-white font-bold">{filteredDatasets.length}</span> verified datasets
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-ice-400 hover:underline flex items-center gap-1 text-2xs cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Grid or Table Results */}
        {filteredDatasets.length === 0 ? (
          <div className="py-20 text-center bg-polar-900/60 border border-polar-800 rounded-xl">
            <Database className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-300">No datasets match your filters</p>
            <p className="text-xs text-slate-500 mt-1">Try broadening your search query or choosing another topic</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDatasets.map((dataset) => {
              const isPreviewOpen = previewDatasetId === dataset.id;
              return (
                <div
                  key={dataset.id}
                  className="bg-polar-900/80 hover:bg-polar-850 border border-polar-800 hover:border-ice-500/40 rounded-xl p-5 flex flex-col justify-between transition-all duration-150 group shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded text-2xs font-mono font-semibold bg-ice-500/15 border border-ice-400/30 text-ice-300">
                        {dataset.topic}
                      </span>
                      <span className="text-2xs font-mono text-teal-400 font-semibold">
                        {dataset.provenance.sourceOrgShort}
                      </span>
                    </div>

                    <h3
                      onClick={() => setSelectedDatasetId(dataset.id)}
                      className="text-base font-bold text-white group-hover:text-ice-300 transition-colors leading-snug mb-2 cursor-pointer"
                    >
                      {dataset.shortTitle}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                      {isStudent ? dataset.studentSummary : dataset.description}
                    </p>

                    {/* Quick Specs Preview Drawer */}
                    {isPreviewOpen && (
                      <div className="my-3 p-3 rounded-lg bg-polar-950 border border-polar-800 text-xs font-mono space-y-1.5 animate-in fade-in duration-150">
                        <div className="text-2xs uppercase text-ice-400 font-bold">Quick Metadata Preview</div>
                        <div className="text-slate-300">Coverage: {dataset.temporalCoverage.startDate} to {dataset.temporalCoverage.endDate} ({dataset.temporalCoverage.resolution})</div>
                        <div className="text-slate-300">Variables: {dataset.variables.map(v => v.name).join(', ')}</div>
                        <div className="text-slate-400 text-3xs">Format: {dataset.dataFormats.join(', ')}</div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-3 border-t border-polar-800">
                    <div className="flex items-center justify-between text-2xs font-mono text-slate-400">
                      <span>{dataset.temporalCoverage.startDate.slice(0, 4)}–{dataset.temporalCoverage.endDate.slice(0, 4)}</span>
                      <button
                        onClick={() => setPreviewDatasetId(isPreviewOpen ? null : dataset.id)}
                        className="text-ice-400 hover:underline cursor-pointer"
                      >
                        {isPreviewOpen ? 'Hide Quick Specs' : 'Quick Specs'}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedDatasetId(dataset.id);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-ice-500 hover:bg-ice-400 active:scale-[0.98] text-polar-950 font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer relative z-10 pointer-events-auto"
                      >
                        <BarChart2 className="w-4 h-4" />
                        <span>Inspect Data & Chart</span>
                      </button>
                      <a
                        href={dataset.provenance.originalSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 bg-polar-950 border border-polar-750 hover:border-ice-400 text-slate-400 hover:text-white rounded-xl transition-colors shrink-0"
                        title="Open source repository"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-polar-900/90 border border-polar-800 rounded-xl overflow-hidden shadow-panel">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-polar-950 text-slate-400 font-mono border-b border-polar-800 uppercase text-2xs">
                  <tr>
                    <th className="p-4">Dataset Title</th>
                    <th className="p-4">Topic</th>
                    <th className="p-4">Region</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Temporal Range</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-polar-800/60 font-sans">
                  {filteredDatasets.map((dataset) => (
                    <tr key={dataset.id} className="hover:bg-polar-850/60 transition-colors">
                      <td className="p-4 font-bold text-white">{dataset.shortTitle}</td>
                      <td className="p-4 text-ice-400 font-mono">{dataset.topic}</td>
                      <td className="p-4 text-slate-400">{dataset.region}</td>
                      <td className="p-4 text-teal-400 font-mono">{dataset.provenance.sourceOrgShort}</td>
                      <td className="p-4 text-slate-400 font-mono">{dataset.temporalCoverage.startDate.slice(0, 4)}–{dataset.temporalCoverage.endDate.slice(0, 4)}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedDatasetId(dataset.id)}
                          className="px-3 py-1.5 bg-ice-500 hover:bg-ice-400 text-polar-950 font-bold text-xs rounded-md transition-colors"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Provenance badge footer */}
        <div className="flex items-center gap-2 text-2xs font-mono text-slate-400 pt-4">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span>All datasets carry open licenses and direct DOI references to their originating research agencies.</span>
        </div>
      </div>
    </div>
  );
};

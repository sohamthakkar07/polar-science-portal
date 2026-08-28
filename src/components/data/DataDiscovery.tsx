import React, { useState, useMemo } from 'react';
import {
  Database,
  Search,
  BarChart2,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  X,
  ChevronDown
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
    <div className="w-full min-h-screen bg-polar-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Page header */}
        <div className="border-b border-ink-700 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-px bg-ice-400" aria-hidden="true" />
            <span className="text-2xs font-medium tracking-widest uppercase text-ice-400">
              Scientific Data Catalog
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
            Polar Science Datasets
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl">
            Real, open-access polar cryospheric, meteorological, and oceanographic datasets 
            from NCPOR, NSIDC, NASA, BAS, and NOAA. All records include preserved provenance 
            and original source links.
          </p>
        </div>

        {/* Filter controls */}
        <div className="border border-ink-700 rounded-md overflow-hidden">
          <div className="bg-ink-800 px-4 py-3 border-b border-ink-700 flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search by title, variable, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none"
              aria-label="Search datasets"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-slate-500 hover:text-slate-300 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ink-700">
            <div className="relative">
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="w-full appearance-none bg-transparent px-4 py-3 text-xs text-slate-300 outline-none cursor-pointer hover:bg-ink-800 transition-colors"
                aria-label="Filter by topic"
              >
                <option value="all">All Topics</option>
                {topics.filter(t => t !== 'all').map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" aria-hidden="true" />
            </div>

            <div className="relative">
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full appearance-none bg-transparent px-4 py-3 text-xs text-slate-300 outline-none cursor-pointer hover:bg-ink-800 transition-colors"
                aria-label="Filter by region"
              >
                <option value="all">All Regions</option>
                {regions.filter(r => r !== 'all').map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" aria-hidden="true" />
            </div>

            <div className="relative">
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full appearance-none bg-transparent px-4 py-3 text-xs text-slate-300 outline-none cursor-pointer hover:bg-ink-800 transition-colors"
                aria-label="Filter by organization"
              >
                {sources.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          <div className="px-4 py-2.5 border-t border-ink-700 bg-polar-950 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              <span className="text-slate-300 font-medium">{filteredDatasets.length}</span>
              {' '}dataset{filteredDatasets.length !== 1 ? 's' : ''} found
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-ice-400 hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {filteredDatasets.length === 0 ? (
          <div className="py-20 text-center border border-ink-700 rounded-md">
            <Database className="w-8 h-8 text-slate-700 mx-auto mb-3" aria-hidden="true" />
            <p className="text-sm font-medium text-slate-400">No datasets match your filters</p>
            <p className="text-xs text-slate-600 mt-1">Try broadening your search or clearing filters</p>
          </div>
        ) : (
          <div className="border border-ink-700 rounded-md overflow-hidden">
            {/* Table header */}
            <div className="bg-ink-800 border-b border-ink-700">
              <div className="grid grid-cols-12 px-5 py-3 text-2xs font-semibold uppercase tracking-wider text-slate-500">
                <div className="col-span-4">Dataset</div>
                <div className="col-span-2 hidden md:block">Topic / Region</div>
                <div className="col-span-2 hidden lg:block">Organization</div>
                <div className="col-span-2 hidden lg:block">Temporal Range</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
            </div>

            {/* Table rows */}
            <div className="divide-y divide-ink-700">
              {filteredDatasets.map((dataset) => (
                <div
                  key={dataset.id}
                  className="grid grid-cols-12 px-5 py-4 hover:bg-ink-800 transition-colors items-start group"
                >
                  {/* Title + desc */}
                  <div className="col-span-10 md:col-span-4 space-y-1 pr-4">
                    <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors leading-snug">
                      {dataset.shortTitle}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 hidden sm:block">
                      {isStudent ? dataset.studentSummary : dataset.description}
                    </p>
                    {dataset.provenance.doi && (
                      <div className="text-2xs font-mono text-slate-600">
                        DOI: {dataset.provenance.doi}
                      </div>
                    )}
                  </div>

                  {/* Topic / region */}
                  <div className="col-span-2 hidden md:block pt-0.5">
                    <div className="text-xs font-medium text-ice-400">{dataset.topic}</div>
                    <div className="text-2xs text-slate-600 mt-0.5">{dataset.region}</div>
                  </div>

                  {/* Organization */}
                  <div className="col-span-2 hidden lg:block pt-0.5">
                    <div className="text-xs text-slate-400">{dataset.provenance.sourceOrgShort}</div>
                  </div>

                  {/* Temporal range */}
                  <div className="col-span-2 hidden lg:block pt-0.5">
                    <div className="text-xs font-mono text-slate-400">
                      {dataset.temporalCoverage.startDate.slice(0, 4)} –{' '}
                      {dataset.temporalCoverage.endDate.slice(0, 4)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex items-start justify-end gap-2 pt-0.5">
                    <button
                      onClick={() => setSelectedDatasetId(dataset.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ice-500 hover:bg-ice-400 text-polar-950 font-semibold text-xs rounded-md transition-colors whitespace-nowrap"
                    >
                      <BarChart2 className="w-3 h-3" aria-hidden="true" />
                      Inspect
                    </button>
                    <a
                      href={dataset.provenance.originalSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 border border-ink-700 hover:border-ice-500 text-slate-500 hover:text-white rounded-md transition-colors"
                      title="Open original repository"
                      aria-label={`Open ${dataset.shortTitle} original source`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Provenance notice */}
        <div className="flex items-start gap-2 text-xs text-slate-600 pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            All datasets link directly to their original repositories. PolarVerse preserves source 
            provenance, DOI, organization, license, and access status for every record.
          </p>
        </div>
      </div>
    </div>
  );
};

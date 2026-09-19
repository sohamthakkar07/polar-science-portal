import React, { useState, useMemo, useEffect } from 'react';
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
  List,
  Zap,
  Radio,
  FileText,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { POLAR_DATASETS } from '../../data/datasets';
import { PolarDataset, PolarTopic, PolarRegion } from '../../types/polar';
import { DatasetDetail } from './DatasetDetail';
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
  const [selectedDatasetId, setSelectedDatasetId] = useState<string | null>(initialDatasetId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState<string>(initialTopicFilter || 'all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    if (initialDatasetId) {
      setSelectedDatasetId(initialDatasetId);
    }
  }, [initialDatasetId]);

  const handleInspectDataset = (datasetId: string) => {
    setSelectedDatasetId(datasetId);
    if (onNavigate) {
      onNavigate('data', datasetId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeDataset = useMemo(
    () => POLAR_DATASETS.find((d) => d.id === selectedDatasetId) || null,
    [selectedDatasetId]
  );

  const filteredDatasets = useMemo(() => {
    return POLAR_DATASETS.filter((d) => {
      if (topicFilter !== 'all' && d.topic !== topicFilter) return false;
      if (regionFilter !== 'all' && d.region !== regionFilter) return false;
      if (sourceFilter !== 'all' && !d.provenance.sourceOrgShort.toLowerCase().includes(sourceFilter.toLowerCase())) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = d.title.toLowerCase().includes(q) || d.shortTitle.toLowerCase().includes(q);
        const matchesDesc = d.description.toLowerCase().includes(q);
        const matchesOrg = d.provenance.sourceOrganization.toLowerCase().includes(q);
        const matchesVar = d.variables.some((v) => v.name.toLowerCase().includes(q) || v.standardName?.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesOrg && !matchesVar) return false;
      }
      return true;
    });
  }, [topicFilter, regionFilter, sourceFilter, searchQuery]);

  if (activeDataset) {
    return (
      <DatasetDetail
        dataset={activeDataset}
        onBack={() => {
          setSelectedDatasetId(null);
          if (onNavigate) {
            onNavigate('data', undefined);
          }
        }}
        onNavigate={onNavigate}
      />
    );
  }

  // Featured spotlight dataset (default: Maitri station 34-yr met data)
  const featuredSpotlight = POLAR_DATASETS.find(d => d.id === 'ncpor-maitri-met-daily') || POLAR_DATASETS[0];

  const topics = ['all', 'Cryosphere', 'Atmosphere', 'Oceanography', 'Glaciology', 'Biodiversity', 'Remote Sensing'];
  const regions = ['all', 'Antarctica', 'Arctic', 'Himalayas', 'Global'];
  const sources = [
    { id: 'all',   label: 'All Repositories' },
    { id: 'ncpor', label: 'NCPOR / NPDC' },
    { id: 'nsidc', label: 'NSIDC' },
    { id: 'nasa',  label: 'NASA Earthdata' },
    { id: 'scar',  label: 'SCAR / OBIS' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full min-h-screen bg-polar-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-10"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-polar-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-2xs font-mono font-bold uppercase tracking-widest text-teal-300 mb-2 flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-teal-400" />
              <span>STAGE 02 · OBSERVATIONAL EVIDENCE & DATA LAB</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Scientific Data Catalog & Telemetry
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
              Explore 45+ years of verified observational datasets, NetCDF CF specifications, Crossref DOIs, and native interactive SVG charts.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="font-bold text-white text-base font-mono">{filteredDatasets.length}</span>
            <span>telemetry datasets indexed</span>
          </div>
        </div>

        {/* FEATURED OBSERVATION SPOTLIGHT BOX */}
        {featuredSpotlight && (
          <div className="bg-gradient-to-r from-polar-900 via-polar-900/95 to-polar-950 border border-teal-500/40 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-polar-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-mono font-bold">
                  FEATURED TELEMETRY SPOTLIGHT
                </span>
                <span className="text-2xs font-mono text-slate-400">
                  {featuredSpotlight.provenance.sourceOrganization}
                </span>
              </div>
              <span className="text-2xs font-mono text-teal-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                <span>34-Year Active Series</span>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {featuredSpotlight.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {featuredSpotlight.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                  {featuredSpotlight.variables.slice(0, 3).map((v) => (
                    <span key={v.name} className="px-3 py-1 rounded-lg bg-polar-950 border border-polar-800 text-ice-300">
                      {v.name} ({v.unit})
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-polar-950 rounded-2xl border border-polar-800 p-5 space-y-4">
                <div className="space-y-2">
                  <div className="text-2xs font-mono text-slate-400 uppercase">Coverage Horizon</div>
                  <div className="text-sm font-bold text-white font-mono">
                    {featuredSpotlight.temporalCoverage.startDate} – {featuredSpotlight.temporalCoverage.endDate}
                  </div>
                </div>

                <div className="space-y-2 border-t border-polar-800 pt-3">
                  <div className="text-2xs font-mono text-slate-400 uppercase">Target Domain / Region</div>
                  <div className="text-xs text-teal-300 font-mono">{featuredSpotlight.region} ({featuredSpotlight.topic})</div>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInspectDataset(featuredSpotlight.id)}
                  className="w-full py-3 px-5 rounded-xl bg-ice-400 hover:bg-ice-300 text-polar-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <span>Inspect Interactive Charts & Data</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-polar-900/90 border border-polar-800 rounded-2xl p-4 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-4 h-4 text-ice-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search datasets, NetCDF variables, DOIs, or stations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-polar-950 border border-polar-750 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-ice-400 font-mono transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {/* Topic Filter Selector */}
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-polar-950 border border-polar-750 text-slate-300 focus:outline-none focus:border-ice-400 cursor-pointer"
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All Scientific Topics' : t}
                </option>
              ))}
            </select>

            {/* Region Selector */}
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-polar-950 border border-polar-750 text-slate-300 focus:outline-none focus:border-ice-400 cursor-pointer"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r === 'all' ? 'All Polar Regions' : r}
                </option>
              ))}
            </select>

            {/* View Mode Toggles */}
            <div className="flex items-center gap-1 bg-polar-950 p-1 rounded-xl border border-polar-750">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-ice-400 text-polar-950' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-ice-400 text-polar-950' : 'text-slate-400 hover:text-white'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* DATASETS CATALOG PRESENTATION */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDatasets.map((ds, index) => (
              <motion.div
                key={ds.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.2) }}
                whileHover={{ y: -3 }}
                onClick={() => handleInspectDataset(ds.id)}
                className="bg-polar-900/90 border border-polar-800 hover:border-ice-400/60 rounded-3xl p-6 shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-ice-500/15 border border-ice-400/30 text-ice-300">
                      {ds.topic}
                    </span>
                    <span className="text-3xs font-mono text-slate-400">{ds.region}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-ice-300 transition-colors leading-snug">
                    {ds.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {ds.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-polar-800">
                  <div className="flex items-center justify-between text-2xs font-mono text-slate-400">
                    <span>Org: <strong className="text-slate-200">{ds.provenance.sourceOrgShort}</strong></span>
                    <span>DOI: {ds.provenance.doi ? 'Verified' : 'N/A'}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInspectDataset(ds.id);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-750 hover:border-ice-400 text-xs font-mono font-bold text-ice-300 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Inspect Telemetry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="bg-polar-900/90 border border-polar-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-polar-950 text-slate-400 border-b border-polar-800 uppercase text-3xs tracking-wider">
                    <th className="p-4">Dataset Title</th>
                    <th className="p-4">Domain / Topic</th>
                    <th className="p-4">Region</th>
                    <th className="p-4">Source Organization</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-polar-800">
                  {filteredDatasets.map((ds) => (
                    <tr
                      key={ds.id}
                      onClick={() => handleInspectDataset(ds.id)}
                      className="hover:bg-polar-850/80 transition-colors cursor-pointer"
                    >
                      <td className="p-4 font-bold text-white font-sans">{ds.title}</td>
                      <td className="p-4 text-ice-300">{ds.topic}</td>
                      <td className="p-4 text-slate-300">{ds.region}</td>
                      <td className="p-4 text-teal-300">{ds.provenance.sourceOrganization}</td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInspectDataset(ds.id);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-ice-400 hover:bg-ice-300 text-polar-950 font-bold text-2xs inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CONTEXTUAL NEXT STEPS GATEWAY */}
        <div className="pt-8 border-t border-polar-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate('explore')}
            className="p-5 rounded-2xl bg-polar-900/80 border border-polar-750 hover:border-ice-400/60 transition-all cursor-pointer group"
          >
            <div className="text-2xs font-mono text-ice-300 font-bold uppercase tracking-wider mb-1">
              Spatial Context
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-ice-300 flex items-center justify-between">
              <span>Locate Observatories on Map</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              See geographic origin of these datasets across Antarctic EPSG:3031 and Arctic EPSG:3575 maps.
            </p>
          </div>

          <div
            onClick={() => onNavigate('research')}
            className="p-5 rounded-2xl bg-polar-900/80 border border-polar-750 hover:border-teal-400/60 transition-all cursor-pointer group"
          >
            <div className="text-2xs font-mono text-teal-300 font-bold uppercase tracking-wider mb-1">
              Scientific Literature
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-teal-300 flex items-center justify-between">
              <span>Read Peer-Reviewed Papers</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Discover published DOI research that analyzes and interprets these observational datasets.
            </p>
          </div>

          <div
            onClick={() => onNavigate('learn')}
            className="p-5 rounded-2xl bg-polar-900/80 border border-polar-750 hover:border-orange-400/60 transition-all cursor-pointer group"
          >
            <div className="text-2xs font-mono text-orange-400 font-bold uppercase tracking-wider mb-1">
              Conceptual Foundations
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-orange-400 flex items-center justify-between">
              <span>Understand Polar Systems</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Learn the physical mechanisms behind sea ice decline, albedo feedback, and polar atmospheric circulation.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

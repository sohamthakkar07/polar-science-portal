import React, { useState } from 'react';
import {
  Database,
  ArrowLeft,
  Calendar,
  Compass,
  FileCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  Award,
  Layers,
  FileText,
  Sparkles,
  Info
} from 'lucide-react';
import { PolarDataset } from '../../types/polar';
import { DataVisualizer } from './DataVisualizer';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { RESEARCH_PAPERS } from '../../data/researchPapers';
import { RESEARCH_STATIONS } from '../../data/stations';
import { useAudience } from '../../context/AudienceContext';
import { AdaptiveExplanation } from '../layout/AdaptiveExplanation';
import { NavTab } from '../layout/Navbar';

interface DatasetDetailProps {
  dataset: PolarDataset;
  onBack: () => void;
  onNavigate: (tab: NavTab, detailId?: string) => void;
}

type DetailTab = 'overview' | 'tech-specs' | 'citations';

export const DatasetDetail: React.FC<DatasetDetailProps> = ({ dataset, onBack, onNavigate }) => {
  const { isStudent } = useAudience();
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [copiedCitation, setCopiedCitation] = useState(false);

  const relatedPapers = RESEARCH_PAPERS.filter((p) => dataset.relatedPaperIds.includes(p.id));
  const relatedStations = RESEARCH_STATIONS.filter((s) => dataset.relatedStationIds.includes(s.id));

  // Generate BibTeX citation
  const bibtexCitation = `@misc{${dataset.id},
  title = {${dataset.title}},
  author = {${dataset.provenance.sourceOrganization}},
  year = {${new Date().getFullYear()}},
  doi = {${dataset.provenance.doi || 'N/A'}},
  url = {${dataset.provenance.originalSourceUrl}},
  note = {Accessed via PolarVerse Interoperability Portal}
}`;

  const copyBibtex = () => {
    navigator.clipboard.writeText(bibtexCitation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-ice-300 hover:text-white transition-colors bg-polar-900 px-3.5 py-2 rounded-xl border border-polar-800 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Data Catalog</span>
        </button>

        {/* Dataset Header */}
        <div className="space-y-4 border-b border-polar-800 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-ice-500/20 border border-ice-400/40 text-ice-300">
              {dataset.topic}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-polar-850 border border-polar-750 text-slate-300">
              {dataset.region}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
              {dataset.provenance.accessStatus}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {dataset.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>{dataset.provenance.sourceOrganization}</span>
            </div>
            {dataset.provenance.doi && (
              <div className="text-ice-300">
                DOI: {dataset.provenance.doi}
              </div>
            )}
          </div>
        </div>

        {/* 3 Progressive Tabs Navigation */}
        <div className="flex items-center gap-2 border-b border-polar-800 pb-1 font-mono text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-ice-500 text-polar-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-polar-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Overview & Visualization</span>
          </button>

          <button
            onClick={() => setActiveTab('tech-specs')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'tech-specs'
                ? 'bg-ice-500 text-polar-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-polar-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Technical Specs ({dataset.variables.length} Variables)</span>
          </button>

          <button
            onClick={() => setActiveTab('citations')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'citations'
                ? 'bg-ice-500 text-polar-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-polar-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Citations & Research ({relatedPapers.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & VISUALIZATION */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Adaptive Presentation Tier */}
            <AdaptiveExplanation
              studentSummary={dataset.studentSummary}
              studentAnalogy={`This dataset tracks ${dataset.topic.toLowerCase()} observations collected from ${dataset.temporalCoverage.startDate} to ${dataset.temporalCoverage.endDate} by ${dataset.provenance.sourceOrganization}.`}
              scientificDetail={dataset.description}
              governingMechanism={dataset.variables.map(v => `${v.name} (${v.standardName}): ${v.typicalRange} [${v.unit}]`).join(' | ')}
              topicTitle={dataset.shortTitle}
            />

            {/* Interactive Time Series Visualization */}
            {dataset.timeSeriesKey && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Database className="w-4 h-4 text-ice-400" />
                    <span>Interactive Scientific Visualization</span>
                  </h2>
                  <span className="text-2xs font-mono text-teal-400">
                    Source: {dataset.provenance.sourceOrgShort}
                  </span>
                </div>
                <DataVisualizer
                  datasetKey={dataset.timeSeriesKey}
                  title={dataset.shortTitle}
                  provenanceOrg={dataset.provenance.sourceOrgShort}
                  doi={dataset.provenance.doi}
                />
              </div>
            )}

            {/* Related Research Stations */}
            {relatedStations.length > 0 && (
              <div className="p-6 rounded-2xl bg-polar-900 border border-polar-800 space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-ice-400" /> Related Research Stations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedStations.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => onNavigate('explore', s.id)}
                      className="p-3.5 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-800 cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">
                          {s.isIndianStation && '🇮🇳 '}
                          {s.name}
                        </div>
                        <div className="text-[11px] text-slate-400">{s.operator}</div>
                      </div>
                      <span className="text-xs text-ice-300 font-mono font-semibold">View Map &rarr;</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TECHNICAL SPECS */}
        {activeTab === 'tech-specs' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Student Mode Contextual Intro */}
            {isStudent && (
              <div className="p-4 rounded-xl bg-polar-900 border border-ice-500/30 text-xs text-slate-300 flex items-start gap-3">
                <Info className="w-4 h-4 text-ice-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Student Note:</strong> This section presents the exact NetCDF Climate and Forecast (CF) standard variable definitions, measurement units, and spatial bounding boxes used by climate researchers.
                </span>
              </div>
            )}

            {/* NetCDF CF Measured Variables Table */}
            <div className="p-6 rounded-2xl bg-polar-900 border border-polar-800 space-y-4 shadow-xl">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-400" />
                <span>Measured NetCDF CF Variables & Units</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-polar-950 text-slate-400 font-mono font-semibold border-b border-polar-800">
                    <tr>
                      <th className="p-3">Variable Name</th>
                      <th className="p-3">Standard NetCDF CF Name</th>
                      <th className="p-3">Unit</th>
                      <th className="p-3">Typical Range</th>
                      <th className="p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-polar-800/60 font-mono">
                    {dataset.variables.map((v, i) => (
                      <tr key={i} className="hover:bg-polar-850/50">
                        <td className="p-3 font-bold text-ice-300">{v.name}</td>
                        <td className="p-3 text-slate-400">{v.standardName}</td>
                        <td className="p-3 text-amber-300">{v.unit}</td>
                        <td className="p-3 text-slate-400">{v.typicalRange}</td>
                        <td className="p-3 text-slate-300 font-sans">{v.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Geographic & Temporal Coverage Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-polar-900 border border-polar-800 space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-ice-400" /> Spatial Bounding Box
                </h3>
                {dataset.spatialBoundingBox ? (
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="bg-polar-950 p-3 rounded-xl border border-polar-800 font-mono space-y-1">
                      <div>North Bounding Latitude: {dataset.spatialBoundingBox.northLat}°</div>
                      <div>South Bounding Latitude: {dataset.spatialBoundingBox.southLat}°</div>
                      <div>West Bounding Longitude: {dataset.spatialBoundingBox.westLon}°</div>
                      <div>East Bounding Longitude: {dataset.spatialBoundingBox.eastLon}°</div>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Target Region: {dataset.region} ({dataset.provenance.geographicContext || 'Global High Latitudes'})
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 font-mono">Circumpolar polar spatial extent.</div>
                )}
              </div>

              <div className="p-6 rounded-2xl bg-polar-900 border border-polar-800 space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-400" /> Temporal & Format Specifications
                </h3>
                <div className="space-y-2 text-xs text-slate-300 font-mono">
                  <div className="bg-polar-950 p-3 rounded-xl border border-polar-800 space-y-1">
                    <div>Temporal Resolution: {dataset.temporalCoverage.resolution}</div>
                    <div>Start Date: {dataset.temporalCoverage.startDate}</div>
                    <div>End Date: {dataset.temporalCoverage.endDate}</div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] text-slate-400 font-sans">Formats:</span>
                    {dataset.dataFormats.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-polar-850 text-ice-300 font-mono text-[10px]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CITATIONS & RELATED RESEARCH */}
        {activeTab === 'citations' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Grounding Research Papers with Deep Links */}
            {relatedPapers.length > 0 && (
              <div className="p-6 rounded-2xl bg-polar-900 border border-polar-800 space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-400" /> Peer-Reviewed Grounding Publications ({relatedPapers.length})
                </h3>
                <div className="space-y-3">
                  {relatedPapers.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onNavigate('research', p.id)}
                      className="p-4 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-800 cursor-pointer transition-all space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded text-2xs font-mono font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                          {p.journal} ({p.year})
                        </span>
                        <span className="text-xs text-ice-400 group-hover:underline font-mono flex items-center gap-1">
                          <span>Inspect Literature</span>
                          <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-ice-300 transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {p.authors.join(', ')}
                      </p>
                      <div className="text-2xs font-mono text-ice-400 pt-1">
                        DOI: {p.doi}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BibTeX & Citation Export Card */}
            <div className="p-6 rounded-2xl bg-polar-900 border border-polar-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-ice-400" />
                  <span>Researcher Citation Generator (BibTeX)</span>
                </h3>
                <button
                  onClick={copyBibtex}
                  className="px-3.5 py-2 rounded-xl bg-ice-500 hover:bg-ice-400 text-polar-950 font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  {copiedCitation ? <Check className="w-3.5 h-3.5 text-polar-950" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCitation ? '✓ Copied!' : 'Copy BibTeX'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-polar-950 border border-polar-800 text-[11px] text-slate-300 font-mono overflow-x-auto">
                {bibtexCitation}
              </pre>
            </div>

            {/* Provenance Card */}
            <ProvenanceBadge provenance={dataset.provenance} />

            {/* Direct Link to Official Repository */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-polar-900 border border-polar-800">
              <div className="text-xs text-slate-400">
                For raw NetCDF/GeoTIFF downloads, direct API access, and granule queries, visit the authoritative source.
              </div>
              <a
                href={dataset.provenance.originalSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-ice-500 hover:bg-ice-400 text-polar-950 font-bold text-xs flex items-center gap-2 transition-all shadow-sm whitespace-nowrap"
              >
                <span>Visit {dataset.provenance.sourceOrgShort} Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* BibTeX Copy Success Toast */}
        {copiedCitation && (
          <div className="fixed bottom-6 right-6 z-50 bg-polar-900 border border-emerald-500/60 text-emerald-300 px-4 py-3 rounded-xl shadow-panel backdrop-blur-xl text-xs font-mono flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>BibTeX citation copied to clipboard!</span>
          </div>
        )}
      </div>
    </div>
  );
};

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
  FileText
} from 'lucide-react';
import { PolarDataset } from '../../types/polar';
import { DataVisualizer } from './DataVisualizer';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { RESEARCH_PAPERS } from '../../data/researchPapers';
import { RESEARCH_STATIONS } from '../../data/stations';
import { useAudience } from '../../context/AudienceContext';
import { NavTab } from '../layout/Navbar';

interface DatasetDetailProps {
  dataset: PolarDataset;
  onBack: () => void;
  onNavigate: (tab: NavTab, detailId?: string) => void;
}

export const DatasetDetail: React.FC<DatasetDetailProps> = ({ dataset, onBack, onNavigate }) => {
  const { isStudent } = useAudience();
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
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-frost-cyan hover:text-white transition-colors bg-polar-900 px-3 py-1.5 rounded-lg border border-polar-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Data Catalog</span>
        </button>

        {/* Dataset Header */}
        <div className="space-y-3 border-b border-polar-800 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-frost-cyan/20 border border-frost-cyan/50 text-frost-cyan">
              {dataset.topic}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-polar-800 border border-polar-700 text-slate-300">
              {dataset.region}
            </span>
            <span className="px-2 py-0.5 rounded text-xs bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold">
              {dataset.provenance.accessStatus}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight leading-tight">
            {dataset.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-frost-teal" />
              <span className="text-slate-200 font-medium">{dataset.provenance.sourceOrganization}</span>
            </div>
            {dataset.provenance.doi && (
              <div className="font-mono text-frost-cyan">
                DOI: {dataset.provenance.doi}
              </div>
            )}
          </div>
        </div>

        {/* Dual Explanation Card */}
        <div className="p-6 rounded-2xl bg-polar-900 border border-polar-750 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-polar-800 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-frost-cyan" />
              <span>{isStudent ? '🎓 Student Explanation' : '🔬 Scientific Abstract & Description'}</span>
            </h2>
            <span className="text-xs text-frost-teal font-mono">
              {dataset.temporalCoverage.startDate} to {dataset.temporalCoverage.endDate}
            </span>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed">
            {isStudent ? dataset.studentSummary : dataset.description}
          </p>
        </div>

        {/* Real Data Visualization Section */}
        {dataset.timeSeriesKey && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Database className="w-4 h-4 text-frost-cyan" />
              <span>Interactive Scientific Visualization</span>
            </h2>
            <DataVisualizer
              datasetKey={dataset.timeSeriesKey}
              title={dataset.shortTitle}
              provenanceOrg={dataset.provenance.sourceOrgShort}
              doi={dataset.provenance.doi}
            />
          </div>
        )}

        {/* Variables Table */}
        <div className="p-6 rounded-2xl bg-polar-900 border border-polar-750 space-y-4 shadow-xl">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-frost-teal" />
            <span>Measured Variables & Units</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-polar-950 text-slate-400 font-semibold border-b border-polar-800">
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
                    <td className="p-3 font-bold text-frost-cyan">{v.name}</td>
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

        {/* Spatial & Temporal Coverage Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-polar-900 border border-polar-750 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-frost-cyan" /> Geographic Coverage
            </h3>
            {dataset.spatialBoundingBox ? (
              <div className="space-y-2 text-xs text-slate-300">
                <div className="bg-polar-950 p-3 rounded-xl border border-polar-800 font-mono space-y-1">
                  <div>North Bounding Latitude: {dataset.spatialBoundingBox.northLat}°</div>
                  <div>South Bounding Latitude: {dataset.spatialBoundingBox.southLat}°</div>
                  <div>West Bounding Longitude: {dataset.spatialBoundingBox.westLon}°</div>
                  <div>East Bounding Longitude: {dataset.spatialBoundingBox.eastLon}°</div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Target Region: {dataset.region} ({dataset.provenance.geographicContext || 'Global High Latitudes'})
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400">Circumpolar polar spatial extent.</div>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-polar-900 border border-polar-750 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-400" /> Temporal & Data Formats
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="bg-polar-950 p-3 rounded-xl border border-polar-800 font-mono space-y-1">
                <div>Temporal Resolution: {dataset.temporalCoverage.resolution}</div>
                <div>Start Date: {dataset.temporalCoverage.startDate}</div>
                <div>End Date: {dataset.temporalCoverage.endDate}</div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] text-slate-400 font-sans">Formats:</span>
                {dataset.dataFormats.map((f, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-polar-800 text-frost-cyan font-mono text-[10px]">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Connected Research & Stations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedStations.length > 0 && (
            <div className="p-6 rounded-2xl bg-polar-900 border border-polar-750 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Compass className="w-4 h-4 text-frost-cyan" /> Related Research Stations
              </h3>
              <div className="space-y-2">
                {relatedStations.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => onNavigate('explore', s.id)}
                    className="p-3 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-800 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">
                        {s.isIndianStation && '🇮🇳 '}
                        {s.name}
                      </div>
                      <div className="text-[11px] text-slate-400">{s.operator}</div>
                    </div>
                    <span className="text-xs text-frost-cyan font-semibold">View Map &rarr;</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {relatedPapers.length > 0 && (
            <div className="p-6 rounded-2xl bg-polar-900 border border-polar-750 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" /> Grounding Research Papers
              </h3>
              <div className="space-y-2">
                {relatedPapers.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onNavigate('research', p.id)}
                    className="p-3 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-800 cursor-pointer space-y-1"
                  >
                    <div className="text-xs font-bold text-white">{p.title}</div>
                    <div className="text-[11px] text-slate-400">
                      {p.authors.join(', ')} ({p.year}) • <em>{p.journal}</em>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BibTeX & Citation Export Card */}
        <div className="p-6 rounded-2xl bg-polar-900 border border-polar-750 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-frost-cyan" />
              <span>Researcher Citation Generator (BibTeX)</span>
            </h3>
            <button
              onClick={copyBibtex}
              className="px-3 py-1.5 rounded-lg bg-polar-800 hover:bg-polar-700 text-frost-cyan text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCitation ? 'Copied!' : 'Copy BibTeX'}</span>
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
            className="px-5 py-2.5 rounded-xl bg-frost-cyan hover:bg-sky-300 text-polar-950 font-bold text-xs flex items-center gap-2 transition-all shadow-polar-glow whitespace-nowrap"
          >
            <span>Visit {dataset.provenance.sourceOrgShort} Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

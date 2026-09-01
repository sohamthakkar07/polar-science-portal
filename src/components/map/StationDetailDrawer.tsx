import React from 'react';
import { X, MapPin, Compass, Thermometer, Wind, Users, Calendar, ShieldCheck, ExternalLink, FileText, Database, Layers, ArrowRight } from 'lucide-react';
import { ResearchStation } from '../../types/polar';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { POLAR_DATASETS } from '../../data/datasets';
import { RESEARCH_PAPERS } from '../../data/researchPapers';
import { NavTab } from '../layout/Navbar';
import { useAudience } from '../../context/AudienceContext';

interface StationDetailDrawerProps {
  station: ResearchStation | null;
  onClose: () => void;
  onNavigate: (tab: NavTab, detailId?: string) => void;
}

export const StationDetailDrawer: React.FC<StationDetailDrawerProps> = ({ station, onClose, onNavigate }) => {
  const { isStudent } = useAudience();
  if (!station) return null;

  const connectedDatasets = POLAR_DATASETS.filter((d) => station.connectedDatasetIds.includes(d.id));
  const connectedPapers = RESEARCH_PAPERS.filter((p) => station.connectedPaperIds.includes(p.id));

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-polar-950/95 border-l border-polar-750 shadow-2xl backdrop-blur-xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header with Image & Title */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-polar-900 border-b border-polar-800">
        <img
          src={station.imageUrl}
          alt={station.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-polar-950 via-polar-950/40 to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-polar-950/80 text-slate-300 hover:text-white border border-polar-700 shadow-md backdrop-blur-md cursor-pointer"
          aria-label="Close station drawer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-ice-500/20 border border-ice-400/50 text-ice-300">
                {station.region}
              </span>
              {station.isIndianStation && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-950/80 border border-orange-500/50 text-orange-400">
                  🇮🇳 Indian Station
                </span>
              )}
              <span className="px-2 py-0.5 rounded text-xs bg-polar-800/90 text-slate-300 border border-polar-700">
                Est. {station.establishedYear}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans flex items-center gap-2">
              {station.name}
              {station.nativeName && (
                <span className="text-lg font-normal text-slate-300">({station.nativeName})</span>
              )}
            </h2>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-ice-400" />
              <span>{station.subRegion}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Climate & Geographic Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
              <Compass className="w-3 h-3 text-ice-400" /> Coordinates
            </div>
            <div className="text-xs font-bold text-white font-mono mt-1">
              {Math.abs(station.latitude).toFixed(2)}°{station.latitude < 0 ? 'S' : 'N'}, {Math.abs(station.longitude).toFixed(2)}°{station.longitude < 0 ? 'W' : 'E'}
            </div>
            <div className="text-[10px] text-slate-500">{station.elevationMeters} m elevation</div>
          </div>

          <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-sky-400" /> Avg Annual Temp
            </div>
            <div className="text-xs font-bold text-white font-mono mt-1">
              {station.climateSummary.avgAnnualTempC}°C
            </div>
            <div className="text-[10px] text-slate-500">Min: {station.climateSummary.recordMinTempC}°C</div>
          </div>

          <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
              <Wind className="w-3 h-3 text-teal-400" /> Avg Wind Speed
            </div>
            <div className="text-xs font-bold text-white font-mono mt-1">
              {station.climateSummary.avgWindSpeedKmh} km/h
            </div>
            <div className="text-[10px] text-slate-500">In-situ observations</div>
          </div>

          <div className="p-3 rounded-xl bg-polar-900/80 border border-polar-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
              <Users className="w-3 h-3 text-amber-400" /> Crew Capacity
            </div>
            <div className="text-xs font-bold text-white font-mono mt-1">
              {station.crewCapacityWinter} (Winter) / {station.crewCapacitySummer} (Summer)
            </div>
            <div className="text-[10px] text-slate-500 truncate">{station.status}</div>
          </div>
        </div>

        {/* Overview */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Station Profile & Mission</h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-polar-900/60 p-4 rounded-xl border border-polar-800/80">
            {station.overview}
          </p>
        </div>

        {/* Scientific Disciplines */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Research Thrusts</h3>
          <div className="flex flex-wrap gap-2">
            {station.scientificDisciplines.map((discipline, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-polar-850 border border-polar-750 text-ice-300"
              >
                🔬 {discipline}
              </span>
            ))}
          </div>
        </div>

        {/* Research Highlights */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Research Highlights</h3>
          <ul className="space-y-2">
            {station.researchHighlights.map((highlight, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-polar-900/40 p-2.5 rounded-lg border border-polar-800/50">
                <span className="text-frost-cyan font-bold">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Connected Datasets */}
        {connectedDatasets.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-ice-400" /> Connected Datasets ({connectedDatasets.length})
              </h3>
            </div>
            <div className="space-y-2">
              {connectedDatasets.map((d) => (
                <div
                  key={d.id}
                  className="p-3 rounded-xl bg-polar-900 border border-polar-800 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-200">{d.shortTitle}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{d.description}</div>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('data', d.id);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-polar-800 hover:bg-polar-700 text-ice-300 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
                  >
                    View Dataset
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connected Research Papers */}
        {connectedPapers.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
              <FileText className="w-3.5 h-3.5 text-teal-400" /> Key Research Publications ({connectedPapers.length})
            </h3>
            <div className="space-y-2">
              {connectedPapers.map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-polar-900 border border-polar-800 space-y-1">
                  <div className="text-xs font-bold text-slate-200">{p.title}</div>
                  <div className="text-[11px] text-slate-400">
                    {p.authors.join(', ')} • <em>{p.journal}</em> ({p.year})
                  </div>
                  <div className="text-[11px] text-ice-300 font-mono pt-1">DOI: {p.doi}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Provenance Card */}
        <ProvenanceBadge provenance={station.provenance} />
      </div>

      {/* Audience-Aware Footer CTA Gateway */}
      <div className="p-4 bg-polar-950 border-t border-polar-800 flex flex-wrap items-center justify-between gap-3">
        <a
          href={station.provenance.originalSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-ice-300 hover:underline font-semibold"
        >
          <span>Official {station.operator} Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <div className="flex items-center gap-2">
          {isStudent ? (
            <button
              onClick={() => {
                onNavigate('stories');
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-ice-500 hover:bg-ice-400 text-polar-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <span>Explore Guided Stories 🎓</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                onNavigate('data');
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-polar-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <span>Explore Datasets 🔬</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

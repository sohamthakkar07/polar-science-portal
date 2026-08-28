import React, { useState } from 'react';
import {
  Flag,
  MapPin,
  Calendar,
  Compass,
  Database,
  FileText,
  Award,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Thermometer,
  Wind,
  Layers,
  Sparkles
} from 'lucide-react';
import { RESEARCH_STATIONS } from '../../data/stations';
import { POLAR_EXPEDITIONS } from '../../data/expeditions';
import { POLAR_DATASETS } from '../../data/datasets';
import { RESEARCH_PAPERS } from '../../data/researchPapers';
import { ResearchStation } from '../../types/polar';
import { DataVisualizer } from '../data/DataVisualizer';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { NavTab } from '../layout/Navbar';

interface IndiaPolarJourneyProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialStationId?: string;
}

export const IndiaPolarJourney: React.FC<IndiaPolarJourneyProps> = ({ onNavigate, initialStationId }) => {
  const indianStations = RESEARCH_STATIONS.filter((s) => s.isIndianStation);
  const indianExpeditions = POLAR_EXPEDITIONS.filter((e) => e.isIndianExpedition);

  const [selectedStationId, setSelectedStationId] = useState<string>(
    initialStationId && indianStations.some((s) => s.id === initialStationId)
      ? initialStationId
      : 'maitri'
  );

  const activeStation = indianStations.find((s) => s.id === selectedStationId) || indianStations[0];
  const connectedDatasets = POLAR_DATASETS.filter((d) => activeStation.connectedDatasetIds.includes(d.id));
  const connectedPapers = RESEARCH_PAPERS.filter((p) => activeStation.connectedPaperIds.includes(p.id));

  // Historical milestones
  const timelineMilestones = [
    { year: 1981, title: 'Operation Gangotri', desc: '1st Indian Antarctic Expedition departs Goa under Dr. S. Z. Qasim on MV Polar Circle. Lands in Antarctica Jan 9, 1982.' },
    { year: 1983, title: 'Dakshin Gangotri Built', desc: 'India’s 1st permanent research station built in a record 60 days on the ice shelf during 3rd IAE. India joins Antarctic Treaty as Consultative Member.' },
    { year: 1989, title: 'Maitri Commissioned', desc: 'India’s 2nd station established on ice-free rocky ground in Schirmacher Oasis to replace snow-buried Dakshin Gangotri.' },
    { year: 2008, title: 'Himadri Inaugurated', desc: 'India enters Arctic science by establishing Himadri research station in Ny-Ålesund, Svalbard (79°N).' },
    { year: 2012, title: 'Bharati Commissioned', desc: 'India’s state-of-the-art 3rd station commissioned in Larsemann Hills, Princess Elizabeth Land with direct ISRO satellite telemetry.' },
    { year: 2014, title: 'IndARC Mooring Deployed', desc: 'India deploys its 1st permanent underwater moored observatory at 192m depth in Kongsfjorden, Svalbard.' },
    { year: 2016, title: 'Himansh Observatory', desc: 'NCPOR establishes Himansh in the Western Himalayas (Chandra Basin, 4,080m) to monitor the Third Pole cryosphere.' },
    { year: 2024, title: '43rd Indian Antarctic Expedition', desc: 'Over 80 scientists complete multi-disciplinary deep ice core drilling, space weather observations, and station upgrades.' }
  ];

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-950/50 via-polar-900 to-polar-950 border border-orange-500/30 p-8 sm:p-12 shadow-2xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/80 border border-orange-500/50 text-orange-400 text-xs font-semibold">
              <Flag className="w-3.5 h-3.5" />
              <span>National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight leading-tight">
              🇮🇳 India’s Polar Journey
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore over four decades of Indian high-latitude science. From pioneering Antarctic expeditions in 1981 to year-round permanent bases in Antarctica (Maitri & Bharati), the High Arctic (Himadri & IndARC), and the Third Pole (Himansh).
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('data')}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-polar-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-lg"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Explore Indian Polar Datasets</span>
              </button>
              <a
                href="https://ncpor.res.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-750 text-xs text-slate-300 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Official NCPOR Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Dedicated Station Selector Tabs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-2xl font-black text-white font-mono flex items-center gap-2">
              <span>🏛️ Indian Polar Observatories & Stations</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">4 Permanent Bases + 1 Mooring</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {indianStations.map((station) => {
              const isSelected = selectedStationId === station.id;
              return (
                <button
                  key={station.id}
                  onClick={() => setSelectedStationId(station.id)}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'bg-polar-800 border-orange-500 text-white shadow-lg'
                      : 'bg-polar-900 border-polar-800 text-slate-400 hover:bg-polar-850 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-orange-400 uppercase tracking-wider font-mono">
                    Est. {station.establishedYear}
                  </div>
                  <div className="text-base font-bold text-white mt-1">{station.name}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{station.region}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Station Deep-Dive Dossier */}
        <div className="bg-polar-900/90 rounded-3xl border border-polar-750 p-6 sm:p-8 shadow-2xl space-y-8 backdrop-blur-xl">
          {/* Station Dossier Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-polar-800 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-950 border border-orange-500/50 text-orange-400">
                  {activeStation.region}
                </span>
                <span className="px-2 py-0.5 rounded text-xs bg-polar-950 text-slate-400 border border-polar-800">
                  {activeStation.status}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-mono flex items-center gap-2">
                {activeStation.name}
                {activeStation.nativeName && (
                  <span className="text-xl text-orange-400">({activeStation.nativeName})</span>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-frost-cyan" />
                <span>{activeStation.subRegion}</span>
              </p>
            </div>

            {/* Weather / Elevation Stats */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-polar-950 border border-polar-800 text-center">
                <div className="text-[10px] uppercase font-semibold text-slate-400">Avg Temp</div>
                <div className="text-sm font-bold text-sky-400 font-mono">{activeStation.climateSummary.avgAnnualTempC}°C</div>
              </div>
              <div className="p-3 rounded-2xl bg-polar-950 border border-polar-800 text-center">
                <div className="text-[10px] uppercase font-semibold text-slate-400">Elevation</div>
                <div className="text-sm font-bold text-teal-400 font-mono">{activeStation.elevationMeters}m</div>
              </div>
              <div className="p-3 rounded-2xl bg-polar-950 border border-polar-800 text-center">
                <div className="text-[10px] uppercase font-semibold text-slate-400">Coordinates</div>
                <div className="text-xs font-bold text-slate-200 font-mono">
                  {Math.abs(activeStation.latitude).toFixed(2)}°{activeStation.latitude < 0 ? 'S' : 'N'}
                </div>
              </div>
            </div>
          </div>

          {/* Overview & Scientific Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Station Overview</h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-polar-950/60 p-5 rounded-2xl border border-polar-800">
                  {activeStation.overview}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Research Thrusts</h3>
                <ul className="space-y-2">
                  {activeStation.researchHighlights.map((hl, i) => (
                    <li key={i} className="text-xs text-slate-300 p-3 rounded-xl bg-polar-950 border border-polar-800 flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Side Discipline & Historical Significance */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-polar-950 border border-polar-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Historical Significance
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{activeStation.historicalSignificance}"
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-polar-950 border border-polar-800 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Disciplines & Instruments
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {activeStation.scientificDisciplines.map((d, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-polar-900 border border-polar-750 text-[11px] text-slate-200">
                      🔬 {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Real Weather Data for Maitri if active */}
          {activeStation.id === 'maitri' && (
            <div className="space-y-3 pt-4 border-t border-polar-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Database className="w-4 h-4 text-frost-cyan" />
                <span>Maitri Station 34-Year Surface Meteorological Time Series (1990–2024)</span>
              </h3>
              <DataVisualizer datasetKey="maitri_met" />
            </div>
          )}

          {/* Connected Datasets */}
          {connectedDatasets.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-polar-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Database className="w-4 h-4 text-orange-400" />
                <span>Connected Official NCPOR Datasets</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {connectedDatasets.map((d) => (
                  <div key={d.id} className="p-4 rounded-xl bg-polar-950 border border-polar-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{d.shortTitle}</div>
                      <div className="text-[11px] text-slate-400 font-mono">DOI: {d.provenance.doi}</div>
                    </div>
                    <button
                      onClick={() => onNavigate('data', d.id)}
                      className="px-3 py-1.5 rounded-lg bg-polar-900 hover:bg-polar-800 text-frost-cyan text-xs font-semibold"
                    >
                      Inspect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Station Provenance Card */}
          <ProvenanceBadge provenance={activeStation.provenance} />
        </div>

        {/* Historical Interactive Timeline */}
        <div className="space-y-6">
          <div className="border-b border-polar-800 pb-4">
            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>Historical Chronology</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white font-mono">
              The Indian Polar Timeline (1981–Present)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {timelineMilestones.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-polar-900/80 border border-polar-800 hover:border-orange-500/40 transition-all space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xl font-black text-orange-400 font-mono">{m.year}</div>
                  <h3 className="text-xs font-bold text-white mt-1">{m.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">{m.desc}</p>
                </div>
                <div className="pt-2 text-[10px] text-slate-500 font-mono">
                  Verified NCPOR Archive Record
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

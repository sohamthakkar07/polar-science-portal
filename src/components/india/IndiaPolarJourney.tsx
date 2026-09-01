import React, { useState, useMemo } from 'react';
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
  Sparkles,
  ChevronRight,
  Anchor,
  UserCheck,
  BookOpen,
  Trophy,
  Activity
} from 'lucide-react';
import { RESEARCH_STATIONS } from '../../data/stations';
import { POLAR_EXPEDITIONS } from '../../data/expeditions';
import { POLAR_DATASETS } from '../../data/datasets';
import { RESEARCH_PAPERS } from '../../data/researchPapers';
import { ResearchStation } from '../../types/polar';
import { DataVisualizer } from '../data/DataVisualizer';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { useAudience } from '../../context/AudienceContext';
import { NavTab } from '../layout/Navbar';

interface IndiaPolarJourneyProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialStationId?: string;
}

type StationTab = 'mission' | 'data' | 'datasets';

export const IndiaPolarJourney: React.FC<IndiaPolarJourneyProps> = ({ onNavigate, initialStationId }) => {
  const { isStudent } = useAudience();
  const indianStations = RESEARCH_STATIONS.filter((s) => s.isIndianStation);

  const [selectedStationId, setSelectedStationId] = useState<string>(
    initialStationId && indianStations.some((s) => s.id === initialStationId)
      ? initialStationId
      : 'maitri'
  );
  const [activeStationTab, setActiveStationTab] = useState<StationTab>('mission');
  const [selectedTimelineRegion, setSelectedTimelineRegion] = useState<string>('all');
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(0);

  const activeStation = indianStations.find((s) => s.id === selectedStationId) || indianStations[0];
  const connectedDatasets = POLAR_DATASETS.filter((d) => activeStation.connectedDatasetIds.includes(d.id));
  const connectedPapers = RESEARCH_PAPERS.filter((p) => activeStation.connectedPaperIds.includes(p.id));

  // Authentic Chronological Milestones
  const timelineMilestones = [
    {
      year: 1981,
      title: 'First Indian Antarctic Expedition (Operation Gangotri)',
      region: 'Antarctic',
      leader: 'Dr. Syed Zahoor Qasim',
      vessel: 'MV Polar Circle (Chartered Norwegian Ice Vessel)',
      desc: 'Flagged off from Goa on Dec 6, 1981. Landed on Queen Maud Land on Jan 9, 1982, establishing India’s first scientific presence.',
      discoveries: 'Established Dakshin Gangotri Point 1 refuge; collected baseline Southern Ocean biological & magnetic data.',
      stationId: 'maitri',
      datasetId: 'ncpor-maitri-met-daily'
    },
    {
      year: 1983,
      title: 'Dakshin Gangotri Station Built & Antarctic Treaty Entry',
      region: 'Antarctic',
      leader: 'Dr. Harsh K. Gupta / Lt. Col. S. S. Sharma',
      vessel: 'MV Finnpolaris',
      desc: 'Constructed India’s first permanent year-round station in a record 60 days on the ice shelf. India joined the Antarctic Treaty as a Consultative Party.',
      discoveries: 'Completed first wintering over (1984); conducted continuous meteorological and upper-atmospheric observations.',
      stationId: 'maitri',
      datasetId: 'ncpor-maitri-met-daily'
    },
    {
      year: 1989,
      title: 'Maitri Station Commissioned in Schirmacher Oasis',
      region: 'Antarctic',
      leader: 'NCPOR Antarctic Division',
      vessel: 'Chartered Ice Class Vessel',
      desc: 'Established India’s second permanent station on ice-free rocky terrain in Schirmacher Oasis, replacing the snow-buried Dakshin Gangotri.',
      discoveries: 'Initiated a 34+ year continuous surface meteorological, ozone column, and greenhouse gas observation record.',
      stationId: 'maitri',
      datasetId: 'ncpor-maitri-met-daily'
    },
    {
      year: 2008,
      title: 'Himadri Arctic Station Inaugurated at Ny-Ålesund',
      region: 'Arctic',
      leader: 'NCPOR Arctic Science Programme',
      vessel: 'Svalbard International Logistics',
      desc: 'India expanded to the High Arctic (79°N) by establishing Himadri in Svalbard, Norway, for atmospheric & glaciological studies.',
      discoveries: 'Documented Atlantic water intrusion into Arctic fjords and aerosol radiative forcing in the High Arctic.',
      stationId: 'himadri',
      datasetId: 'ncpor-himadri-kongsfjorden-ctd'
    },
    {
      year: 2012,
      title: 'Bharati Station Commissioned in Larsemann Hills',
      region: 'Antarctic',
      leader: 'NCPOR / MoES Engineering Team',
      vessel: 'MV Ivan Papanin',
      desc: 'Commissioned India’s state-of-the-art 3rd Antarctic station in Princess Elizabeth Land with direct ISRO satellite data telemetry.',
      discoveries: 'Space weather observations, oceanographic sampling in Prydz Bay, and deep ice sheet modeling.',
      stationId: 'bharati',
      datasetId: 'ncpor-bharati-met-series'
    },
    {
      year: 2014,
      title: 'IndARC Subsurface Mooring Deployed in Svalbard',
      region: 'Arctic',
      leader: 'NCPOR Marine Physics Division',
      vessel: 'R/V Lance Observatory Vessel',
      desc: 'Deployed India’s first permanent underwater moored observatory at 192 m depth in Kongsfjorden, Svalbard.',
      discoveries: 'Captured multi-season winter Atlantic water warming intrusions altering fjord stratification.',
      stationId: 'indarc',
      datasetId: 'ncpor-himadri-kongsfjorden-ctd'
    },
    {
      year: 2016,
      title: 'Himansh High-Altitude Observatory Established',
      region: 'Himalayan / Third Pole',
      leader: 'NCPOR Himalayan Cryosphere Group',
      vessel: 'High-Altitude Field Logistics',
      desc: 'Established Himansh at 4,080 m elevation in the Chandra Basin (Himachal Pradesh) to monitor Third Pole glaciers.',
      discoveries: 'Documented specific mass loss of -0.58 m w.e./yr across Chhota Shigri and Sutri Dhaka glaciers.',
      stationId: 'himansh',
      datasetId: 'ncpor-himansh-chandra-glaciers'
    },
    {
      year: 2024,
      title: '43rd Indian Scientific Expedition to Antarctica',
      region: 'Antarctic',
      leader: 'Dr. Rahul Mohan / NCPOR Team',
      vessel: 'MV Vasiliy Golovnin',
      desc: 'Deployed over 80 researchers across Maitri and Bharati for deep ice core drilling, space weather monitoring, and green power upgrades.',
      discoveries: 'Recovered past 2,000-year ice core climate records and upgraded solar-wind power hybridization at Maitri.',
      stationId: 'maitri',
      datasetId: 'ncpor-maitri-met-daily'
    }
  ];

  const filteredMilestones = useMemo(() => {
    return timelineMilestones.filter((m) => {
      if (selectedTimelineRegion === 'all') return true;
      if (selectedTimelineRegion === 'Antarctic' && m.region === 'Antarctic') return true;
      if (selectedTimelineRegion === 'Arctic' && m.region === 'Arctic') return true;
      if (selectedTimelineRegion === 'Himalayan' && m.region === 'Himalayan / Third Pole') return true;
      return false;
    });
  }, [selectedTimelineRegion]);

  const activeMilestone = filteredMilestones[selectedMilestoneIndex] || filteredMilestones[0] || timelineMilestones[0];

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* PART A: CINEMATIC JOURNEY INTRODUCTION */}
        <div className="border-b border-polar-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-ice-500/10 border border-ice-500/30 text-ice-300 text-2xs font-mono mb-3">
              <Flag className="w-3.5 h-3.5 text-ice-400" />
              <span className="uppercase tracking-wider font-semibold">INDIA'S POLAR JOURNEY • NATIONAL POLAR PROGRAMME</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              From Antarctica to the Arctic <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ice-300 via-ice-200 to-teal-300">
                and the Himalayas.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-3 leading-relaxed">
              Over four decades of sustained high-latitude scientific observations — from pioneering Antarctic expeditions in 1981 to permanent observatories monitoring climate dynamics across Antarctica, Svalbard, and the Himalayan Third Pole.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('data')}
              className="inline-flex items-center gap-2 px-4.5 py-2.5 bg-ice-500 hover:bg-ice-400 active:scale-[0.98] text-polar-950 font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <Database className="w-4 h-4" />
              <span>NCPOR Datasets</span>
            </button>
            <a
              href="https://ncpor.res.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-polar-900 border border-polar-750 hover:border-ice-400 text-slate-200 hover:text-white text-xs font-mono rounded-xl transition-colors"
            >
              <span>NCPOR Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-ice-400" />
            </a>
          </div>
        </div>

        {/* PART E: STORY CONNECTION FLOW BREADCRUMB */}
        <div className="bg-polar-900/90 border border-polar-800 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-sm">
          <div className="text-2xs font-mono uppercase tracking-widest text-ice-300 font-bold mb-3">
            National Polar Science Capability Flow
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-2xs sm:text-xs">
            <div className="p-3 rounded-xl bg-polar-950 border border-polar-800 space-y-1">
              <span className="text-ice-300 font-bold block">1. EXPEDITION 🛳️</span>
              <span className="text-slate-300">Pioneering polar sea voyages since 1981</span>
            </div>
            <div className="p-3 rounded-xl bg-polar-950 border border-polar-800 space-y-1">
              <span className="text-teal-300 font-bold block">2. STATION 🏛️</span>
              <span className="text-slate-300">4 permanent research bases built</span>
            </div>
            <div className="p-3 rounded-xl bg-polar-950 border border-polar-800 space-y-1">
              <span className="text-sky-300 font-bold block">3. OBSERVATION 📈</span>
              <span className="text-slate-300">34+ years continuous climate monitoring</span>
            </div>
            <div className="p-3 rounded-xl bg-polar-950 border border-polar-800 space-y-1">
              <span className="text-emerald-300 font-bold block">4. OPEN DATA 📊</span>
              <span className="text-slate-300">NCPOR DOIs & NetCDF parameters</span>
            </div>
          </div>
        </div>

        {/* PART B: INTERACTIVE EXPEDITION TIMELINE */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-polar-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-ice-400 animate-pulse" />
                <span className="text-2xs font-mono font-semibold tracking-widest uppercase text-ice-300">HISTORICAL CHRONOLOGY</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Explore the Journey Through Time (1981–Present)
              </h2>
            </div>

            {/* Region Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {[
                { id: 'all', label: 'All Milestones' },
                { id: 'Antarctic', label: '🇦🇶 Antarctic' },
                { id: 'Arctic', label: '🧊 Arctic' },
                { id: 'Himalayan', label: '🏔️ Himalayas' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => {
                    setSelectedTimelineRegion(pill.id);
                    setSelectedMilestoneIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer border ${
                    selectedTimelineRegion === pill.id
                      ? 'bg-ice-500 text-polar-950 border-ice-400 font-bold shadow-sm'
                      : 'bg-polar-900 text-slate-300 hover:bg-polar-850 border-polar-750'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stepper / Timeline Milestone Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 font-mono text-xs">
            {filteredMilestones.map((m, idx) => {
              const isSelected = selectedMilestoneIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedMilestoneIndex(idx)}
                  className={`px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all border flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-ice-500 text-polar-950 border-ice-400 shadow-sm'
                      : 'bg-polar-900/80 border-polar-800 text-slate-300 hover:text-white hover:bg-polar-850'
                  }`}
                >
                  <span className="text-xs font-extrabold">{m.year}</span>
                  <span className="text-2xs opacity-80 max-w-[140px] truncate">{m.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Card */}
          <div className="bg-polar-900/90 rounded-2xl border border-polar-800 p-6 sm:p-8 space-y-6 shadow-panel backdrop-blur-xl animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-polar-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1 font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded font-bold bg-ice-500/20 text-ice-300 border border-ice-400/30">
                    {activeMilestone.year} Milestone
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-polar-950 text-slate-400 border border-polar-800">
                    {activeMilestone.region}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  {activeMilestone.title}
                </h3>
              </div>

              {activeMilestone.stationId && (
                <button
                  onClick={() => {
                    setSelectedStationId(activeMilestone.stationId);
                    const el = document.getElementById('station-dossier-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-polar-950 hover:bg-polar-850 border border-polar-750 text-ice-300 hover:text-white rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  <span>Inspect Station Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-1">
                    Expedition Overview & Context
                  </h4>
                  <p className="text-slate-300 leading-relaxed bg-polar-950/60 p-4 rounded-xl border border-polar-800">
                    {activeMilestone.desc}
                  </p>
                </div>

                {activeMilestone.leader && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-polar-950 border border-polar-800 font-mono">
                    <UserCheck className="w-4 h-4 text-ice-300 shrink-0" />
                    <div>
                      <span className="text-2xs text-slate-400 block uppercase">Expedition Leadership:</span>
                      <span className="text-xs font-bold text-white">{activeMilestone.leader}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-1">
                    Key Discoveries & Scientific Achievements
                  </h4>
                  <p className="text-slate-300 leading-relaxed bg-polar-950/60 p-4 rounded-xl border border-polar-800">
                    {activeMilestone.discoveries}
                  </p>
                </div>

                {activeMilestone.vessel && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-polar-950 border border-polar-800 font-mono">
                    <Anchor className="w-4 h-4 text-teal-400 shrink-0" />
                    <div>
                      <span className="text-2xs text-slate-400 block uppercase">Vessel / Transport Logistics:</span>
                      <span className="text-xs font-bold text-white">{activeMilestone.vessel}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PART C & D: STATION EXPLORER & TABBED DOSSIER */}
        <div id="station-dossier-section" className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-polar-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-ice-400" />
                <span className="text-2xs font-mono font-semibold tracking-widest uppercase text-ice-300">INDIAN RESEARCH INFRASTRUCTURE</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Indian Polar Research Stations & Observatories
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">4 Permanent Bases + IndARC Mooring</span>
          </div>

          {/* Station Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {indianStations.map((station) => {
              const isSelected = selectedStationId === station.id;
              return (
                <button
                  key={station.id}
                  onClick={() => setSelectedStationId(station.id)}
                  className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-polar-850 border-ice-400 shadow-md ring-1 ring-ice-400/40'
                      : 'bg-polar-900/80 border-polar-800 hover:bg-polar-850 hover:border-polar-700'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div>
                    <div className="text-2xs font-mono text-ice-300 uppercase font-bold">
                      Est. {station.establishedYear}
                    </div>
                    <div className="text-sm font-bold text-white mt-1">🇮🇳 {station.name}</div>
                    <div className="text-2xs text-slate-400 font-mono mt-0.5 truncate">{station.region}</div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-polar-800 text-2xs font-mono text-slate-400 flex items-center justify-between">
                    <span>{station.elevationMeters}m</span>
                    <span className="text-ice-300 font-bold">{station.climateSummary.avgAnnualTempC}°C</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tabbed Station Dossier Panel */}
          <div className="bg-polar-900/90 rounded-2xl border border-polar-800 overflow-hidden backdrop-blur-xl shadow-panel space-y-0">
            {/* Dossier Header */}
            <div className="p-6 sm:p-8 bg-polar-950/80 border-b border-polar-800 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-2xs font-mono font-semibold bg-ice-500/20 text-ice-300 border border-ice-500/40">
                    {activeStation.region}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-2xs font-mono text-slate-300 bg-polar-900 border border-polar-750">
                    {activeStation.status}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeStation.name}
                  {activeStation.nativeName && (
                    <span className="text-base text-ice-300 font-normal ml-2 font-mono">({activeStation.nativeName})</span>
                  )}
                </h3>
                <p className="text-xs text-slate-300 font-mono flex items-center gap-1.5 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-ice-400" />
                  <span>{activeStation.subRegion} • Lat: {Math.abs(activeStation.latitude).toFixed(2)}°{activeStation.latitude < 0 ? 'S' : 'N'}</span>
                </p>
              </div>

              {/* Climate Summary Stats */}
              <div className="grid grid-cols-3 gap-2 font-mono shrink-0">
                <div className="p-3 rounded-xl bg-polar-900 border border-polar-800 text-center">
                  <div className="text-3xs uppercase font-semibold text-slate-400">Avg Temp</div>
                  <div className="text-xs font-bold text-ice-300 mt-1">{activeStation.climateSummary.avgAnnualTempC}°C</div>
                </div>
                <div className="p-3 rounded-xl bg-polar-900 border border-polar-800 text-center">
                  <div className="text-3xs uppercase font-semibold text-slate-400">Elevation</div>
                  <div className="text-xs font-bold text-teal-300 mt-1">{activeStation.elevationMeters}m</div>
                </div>
                <div className="p-3 rounded-xl bg-polar-900 border border-polar-800 text-center">
                  <div className="text-3xs uppercase font-semibold text-slate-400">Capacity</div>
                  <div className="text-xs font-bold text-ice-300 mt-1">{activeStation.crewCapacityWinter}/{activeStation.crewCapacitySummer}</div>
                </div>
              </div>
            </div>

            {/* Dossier Tabs */}
            <div className="flex items-center gap-2 border-b border-polar-800 px-6 pt-3 font-mono text-xs overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveStationTab('mission')}
                className={`px-4 py-2.5 rounded-t-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeStationTab === 'mission'
                    ? 'bg-polar-900 text-ice-300 border-t border-x border-polar-800'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Mission & Identity</span>
              </button>

              <button
                onClick={() => setActiveStationTab('data')}
                className={`px-4 py-2.5 rounded-t-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeStationTab === 'data'
                    ? 'bg-polar-900 text-ice-300 border-t border-x border-polar-800'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Observations & Data</span>
              </button>

              <button
                onClick={() => setActiveStationTab('datasets')}
                className={`px-4 py-2.5 rounded-t-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeStationTab === 'datasets'
                    ? 'bg-polar-900 text-ice-300 border-t border-x border-polar-800'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Connected Datasets ({connectedDatasets.length})</span>
              </button>
            </div>

            {/* TAB 1: MISSION & IDENTITY */}
            {activeStationTab === 'mission' && (
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-150">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h4 className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-2">Station Overview & Purpose</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-polar-950/70 p-4 rounded-xl border border-polar-800">
                      {activeStation.overview}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-2">Research Highlights</h4>
                    <div className="space-y-2">
                      {activeStation.researchHighlights.map((hl, i) => (
                        <div key={i} className="text-xs text-slate-300 flex items-start gap-2.5 bg-polar-950/40 p-3 rounded-lg border border-polar-800">
                          <span className="text-ice-400 font-bold">•</span>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h4 className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-2">Historical Significance</h4>
                    <p className="text-xs text-slate-300 leading-relaxed bg-polar-950/70 p-4 rounded-xl border border-polar-800">
                      {activeStation.historicalSignificance}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-2">Research Disciplines</h4>
                    <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {activeStation.scientificDisciplines.map((d, i) => (
                        <span key={i} className="px-2.5 py-1 rounded bg-polar-950 border border-polar-800 text-ice-300">
                          🔬 {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: OBSERVATIONS & DATA */}
            {activeStationTab === 'data' && (
              <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
                {activeStation.id === 'maitri' ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-white flex items-center gap-2">
                        <Database className="w-4 h-4 text-ice-300" />
                        Maitri Station 34-Year Surface Meteorological Time Series (1990–2024)
                      </span>
                      <span className="text-2xs text-ice-300 font-semibold">NCPOR Archived Dataset</span>
                    </div>
                    <DataVisualizer datasetKey="maitri_met" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-polar-950 border border-polar-800 text-xs text-slate-300 space-y-2">
                      <div className="font-mono font-bold text-ice-300 uppercase text-2xs">In-Situ Observational Systems:</div>
                      <p className="leading-relaxed">
                        {activeStation.name} maintains continuous telemetry sensors measuring surface temperature (Avg {activeStation.climateSummary.avgAnnualTempC}°C, Record Min {activeStation.climateSummary.recordMinTempC}°C), katabatic wind velocity (Avg {activeStation.climateSummary.avgWindSpeedKmh} km/h), and atmospheric pressure.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                      <div className="p-4 rounded-xl bg-polar-950 border border-polar-800 space-y-1">
                        <div className="text-2xs text-slate-400 uppercase">Operational Range</div>
                        <div className="font-bold text-white">Established {activeStation.establishedYear} • {activeStation.status}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-polar-950 border border-polar-800 space-y-1">
                        <div className="text-2xs text-slate-400 uppercase">Crew Capacity</div>
                        <div className="font-bold text-white">{activeStation.crewCapacityWinter} Winter / {activeStation.crewCapacitySummer} Summer Researchers</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: CONNECTED DATA & RESEARCH */}
            {activeStationTab === 'datasets' && (
              <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
                {connectedDatasets.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      NCPOR Preserved Repositories ({connectedDatasets.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                      {connectedDatasets.map((d) => (
                        <div key={d.id} className="bg-polar-950 p-4 rounded-xl border border-polar-800 flex items-center justify-between gap-3">
                          <div>
                            <div className="font-bold text-white">{d.shortTitle}</div>
                            <div className="text-2xs text-slate-400">DOI: {d.provenance.doi}</div>
                          </div>
                          <button
                            onClick={() => onNavigate('data', d.id)}
                            className="px-3.5 py-2 rounded-xl bg-ice-500 hover:bg-ice-400 text-polar-950 font-bold text-2xs transition-all cursor-pointer whitespace-nowrap"
                          >
                            Inspect Dataset →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-polar-950 border border-polar-800 text-xs text-slate-400 font-mono text-center">
                    No direct NetCDF dataset is linked for this station in the demo view. Explore full NCPOR repositories.
                  </div>
                )}

                {connectedPapers.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-polar-800">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Connected Peer-Reviewed Publications ({connectedPapers.length})
                    </h4>
                    <div className="space-y-2">
                      {connectedPapers.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => onNavigate('research', p.id)}
                          className="p-3.5 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-800 cursor-pointer transition-all flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="text-xs font-bold text-white">{p.title}</div>
                            <div className="text-2xs text-slate-400 font-mono">
                              {p.authors.join(', ')} • {p.journal} ({p.year})
                            </div>
                          </div>
                          <span className="text-xs font-mono text-ice-300 font-bold whitespace-nowrap">View Paper &rarr;</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Provenance Footer */}
            <div className="p-6 border-t border-polar-800">
              <ProvenanceBadge provenance={activeStation.provenance} />
            </div>
          </div>
        </div>

        {/* PART F: AUDIENCE-AWARE NEXT ACTIONS */}
        <div className="p-6 sm:p-8 rounded-2xl bg-polar-900/90 border border-polar-800 space-y-4 backdrop-blur-xl shadow-panel">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
            <span className="text-slate-400">
              {isStudent
                ? 'Ready to test your knowledge on India’s polar expeditions?'
                : 'Inspect the underlying NCPOR datasets and scholarly literature:'}
            </span>
            <span className="text-ice-300 font-bold">
              {isStudent ? 'Next Stage: Quiz Challenge 🏆' : 'Next Stage: NCPOR Repositories 🔬'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {isStudent ? (
              <>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="px-5 py-3.5 bg-ice-500 hover:bg-ice-400 text-polar-950 font-bold rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>Test Knowledge on India's Polar Programme 🏆</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('explore')}
                  className="px-5 py-3.5 bg-polar-950 hover:bg-polar-850 border border-polar-750 text-slate-200 hover:text-white font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-ice-300" />
                    <span>Explore Stations on Map 🗺️</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('data')}
                  className="px-5 py-3.5 bg-teal-500 hover:bg-teal-400 text-polar-950 font-bold rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    <span>Inspect NCPOR Datasets & Evidence 🔬</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('research')}
                  className="px-5 py-3.5 bg-polar-950 hover:bg-polar-850 border border-polar-750 text-slate-200 hover:text-white font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-ice-300" />
                    <span>Explore Connected Research 📑</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

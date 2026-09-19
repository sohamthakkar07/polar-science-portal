import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Globe,
  Filter,
  Info,
  ShieldCheck,
  Search,
  ExternalLink,
  Radio,
  ArrowRight
} from 'lucide-react';
import { InteractiveGlobe } from './InteractiveGlobe';
import { RESEARCH_STATIONS } from '../../data/stations';
import { ResearchStation, PolarRegion } from '../../types/polar';
import { StationDetailDrawer } from './StationDetailDrawer';
import { NavTab } from '../layout/Navbar';

interface PolarExplorerProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialStationId?: string;
}

type ProjectionMode = 'antarctic' | 'arctic' | 'global';
type ViewMode = 'globe' | 'scientific';

export const PolarExplorer: React.FC<PolarExplorerProps> = ({ onNavigate, initialStationId }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('globe');
  const [projection, setProjection] = useState<ProjectionMode>('antarctic');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');
  const [onlyIndianStations, setOnlyIndianStations] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedStation, setSelectedStation] = useState<ResearchStation | null>(() => {
    if (initialStationId) {
      return RESEARCH_STATIONS.find((s) => s.id === initialStationId) || null;
    }
    return null;
  });
  const [hoveredStation, setHoveredStation] = useState<ResearchStation | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Filter stations
  const filteredStations = useMemo(() => {
    return RESEARCH_STATIONS.filter((station) => {
      if (onlyIndianStations && !station.isIndianStation) return false;
      if (selectedRegionFilter !== 'all' && station.region !== selectedRegionFilter) return false;
      if (viewMode === 'scientific') {
        if (projection === 'antarctic' && station.latitude > 0) return false;
        if (projection === 'arctic' && station.latitude < 0) return false;
      }
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        const matchesName = station.name.toLowerCase().includes(q);
        const matchesOperator = station.operator.toLowerCase().includes(q);
        const matchesRegion = station.subRegion.toLowerCase().includes(q);
        if (!matchesName && !matchesOperator && !matchesRegion) return false;
      }
      return true;
    });
  }, [viewMode, projection, selectedRegionFilter, onlyIndianStations, searchFilter]);

  // Coordinate projection math
  const getCoordinates = (lat: number, lon: number): { x: number; y: number } => {
    const cx = 400;
    const cy = 400;
    const maxRadius = 360 * zoomLevel;

    if (projection === 'antarctic') {
      const poleDist = Math.max(0, (90 + lat) / 30); // 0 at South Pole, 1 at -60°S
      const r = poleDist * maxRadius;
      const rad = ((lon - 90) * Math.PI) / 180;
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      return { x, y };
    } else if (projection === 'arctic') {
      const poleDist = Math.max(0, (90 - lat) / 30); // 0 at North Pole, 1 at +60°N
      const r = poleDist * maxRadius;
      const rad = ((-lon - 90) * Math.PI) / 180;
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      return { x, y };
    } else {
      const x = cx + (lon / 180) * (340 * zoomLevel);
      const y = cy - (lat / 90) * (280 * zoomLevel);
      return { x, y };
    }
  };

  // Pre-calculate non-overlapping label layout and cluster leader lines for SVG scientific projection
  const stationPositions = useMemo(() => {
    const list = filteredStations.map((station) => {
      const coords = getCoordinates(station.latitude, station.longitude);
      return { station, ...coords };
    });

    return list.map((item, index) => {
      const { station, x, y } = item;
      
      // Find nearby stations (within 50px cluster radius)
      const nearby = list.filter((other, idx) => idx !== index && Math.hypot(other.x - x, other.y - y) < 50);

      let offsetX = 14;
      let offsetY = 4;
      let anchor: 'start' | 'end' = 'start';
      let isOffset = false;

      // Edge boundary avoidance
      if (x > 620) {
        offsetX = -14;
        anchor = 'end';
        isOffset = true;
      }
      if (y < 80) {
        offsetY = 18;
        isOffset = true;
      } else if (y > 720) {
        offsetY = -18;
        isOffset = true;
      }

      // Cluster avoidance staggering
      if (nearby.length > 0) {
        isOffset = true;
        if (index % 2 === 1) {
          offsetY = -16;
          offsetX = x > 620 ? -14 : 14;
        } else {
          offsetY = 18;
          offsetX = x > 620 ? -14 : 14;
        }
      }

      const labelX = Math.min(760, Math.max(40, x + offsetX));
      const labelY = Math.min(770, Math.max(30, y + offsetY));

      return {
        station,
        x,
        y,
        labelX,
        labelY,
        anchor,
        isOffset,
        hasCluster: nearby.length > 0
      };
    });
  }, [filteredStations, projection, zoomLevel]);

  const hasActiveFocus = Boolean(hoveredStation || selectedStation);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full min-h-screen bg-polar-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* SPATIAL EXPLORATION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-polar-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-ice-300 text-2xs font-mono font-bold uppercase tracking-widest mb-2">
              <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span>STAGE 01 · GEOGRAPHIC OBSERVATION ROOM</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Polar Explorer & Observatories
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Explore year-round scientific stations across Antarctic ice sheets, Svalbard Arctic observatories, and the High Himalayas.
            </p>
          </div>

          {/* View Mode Switcher (Globe vs Scientific Projection) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-polar-900/90 p-1.5 rounded-2xl border border-polar-750 backdrop-blur-md shadow-lg flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMode('globe')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === 'globe'
                    ? 'bg-gradient-to-r from-ice-400 to-teal-400 text-polar-950 shadow-lg font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-polar-850'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>3D Interactive Globe</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('scientific')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === 'scientific'
                    ? 'bg-ice-400 text-polar-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-polar-850'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Scientific Projection</span>
              </button>
            </div>

            {/* Scientific Projection Sub-Switcher */}
            {viewMode === 'scientific' && (
              <div className="flex items-center gap-1 bg-polar-900/90 p-1.5 rounded-2xl border border-polar-750 backdrop-blur-md shadow-lg animate-in fade-in">
                <button
                  type="button"
                  onClick={() => setProjection('antarctic')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    projection === 'antarctic'
                      ? 'bg-polar-800 text-ice-300 border border-ice-400/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🇦🇶 Antarctic
                </button>
                <button
                  type="button"
                  onClick={() => setProjection('arctic')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    projection === 'arctic'
                      ? 'bg-polar-800 text-ice-300 border border-ice-400/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🧊 Arctic
                </button>
                <button
                  type="button"
                  onClick={() => setProjection('global')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    projection === 'global'
                      ? 'bg-polar-800 text-ice-300 border border-ice-400/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🌐 Global
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Discovery Guidance Badge */}
        {!selectedStation && (
          <div className="bg-polar-900/90 border border-ice-500/30 text-ice-300 px-4 py-3 rounded-2xl text-xs font-mono flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-ice-400 shrink-0" />
              <span>
                {viewMode === 'globe'
                  ? 'Drag to rotate the 3D globe. Click any station beacon to center the view and inspect research datasets.'
                  : 'Select any station beacon on the projection grid to open its scientific expedition profile.'}
              </span>
            </div>
            <span className="text-2xs text-slate-400 font-mono shrink-0">{filteredStations.length} visible</span>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-polar-900/90 border border-polar-800 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md shadow-lg">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search station or operator..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-8 pr-3 py-2 rounded-xl bg-polar-950 border border-polar-750 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-ice-400 font-mono transition-colors"
              />
            </div>

            {/* Indian Station Filter Toggle */}
            <button
              type="button"
              onClick={() => setOnlyIndianStations(!onlyIndianStations)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                onlyIndianStations
                  ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-sm'
                  : 'bg-polar-950 border-polar-750 text-slate-300 hover:text-white'
              }`}
            >
              <span>🇮🇳 Indian Stations Only</span>
              {onlyIndianStations && <span className="w-2 h-2 rounded-full bg-orange-400" />}
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="font-bold text-white text-sm">{filteredStations.length}</span>
            <span>stations visible</span>
            {viewMode === 'scientific' && (
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2, z + 0.2))}
                  className="p-2 rounded-xl bg-polar-950 border border-polar-800 hover:border-polar-600 text-slate-200 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                  className="p-2 rounded-xl bg-polar-950 border border-polar-800 hover:border-polar-600 text-slate-200 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-2 rounded-xl bg-polar-950 border border-polar-800 hover:border-polar-600 text-slate-200 cursor-pointer"
                  title="Reset View"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MAP CANVAS & SIDE DIRECTORY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Map Viewport */}
          <div className="lg:col-span-8">
            {viewMode === 'globe' ? (
              <InteractiveGlobe
                stations={filteredStations}
                selectedStation={selectedStation}
                hoveredStation={hoveredStation}
                onSelectStation={setSelectedStation}
                onHoverStation={setHoveredStation}
                onlyIndianStations={onlyIndianStations}
              />
            ) : (
              <div className="bg-polar-900/90 rounded-3xl border border-polar-750 p-4 relative overflow-hidden shadow-2xl flex items-center justify-center min-h-[520px] sm:min-h-[620px]">
                {/* SVG Map */}
                <svg
                  viewBox="0 0 800 800"
                  className="w-full h-full max-w-[720px] max-h-[720px] select-none"
                  style={{ filter: 'drop-shadow(0 0 24px rgba(4, 9, 20, 0.9))' }}
                >
                  <defs>
                    <radialGradient id="polarOceanGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0a1930" />
                      <stop offset="70%" stopColor="#071326" />
                      <stop offset="100%" stopColor="#040914" />
                    </radialGradient>
                    <radialGradient id="iceCapGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#e0f7ff" stopOpacity="0.85" />
                      <stop offset="40%" stopColor="#bfeaff" stopOpacity="0.65" />
                      <stop offset="85%" stopColor="#88d5f7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
                    </radialGradient>
                    <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Background Ocean Circle */}
                  <circle cx="400" cy="400" r="370" fill="url(#polarOceanGrad)" stroke="#173663" strokeWidth="1.5" />

                  {/* Polar Grid Latitude Circles */}
                  {projection === 'antarctic' && (
                    <>
                      <circle cx="400" cy="400" r={120 * zoomLevel} fill="none" stroke="#224e8a" strokeDasharray="3 3" strokeWidth="1" />
                      <text x="405" y={400 - 120 * zoomLevel + 12} fill="#4d8fe2" fontSize="9" fontFamily="monospace">80°S</text>

                      <circle cx="400" cy="400" r={240 * zoomLevel} fill="none" stroke="#224e8a" strokeDasharray="3 3" strokeWidth="1" />
                      <text x="405" y={400 - 240 * zoomLevel + 12} fill="#4d8fe2" fontSize="9" fontFamily="monospace">70°S</text>

                      <circle cx="400" cy="400" r={350 * zoomLevel} fill="none" stroke="#38bdf8" strokeDasharray="5 5" strokeWidth="1.2" opacity="0.6" />
                      <g pointerEvents="none">
                        <rect x="395" y={400 - 350 * zoomLevel - 2} width="220" height="15" fill="#040914" rx="3" opacity="0.8" />
                        <text x="400" y={400 - 350 * zoomLevel + 10} fill="#38bdf8" fontSize="9.5" fontWeight="bold" fontFamily="monospace">60°S (Polar Front / Treaty Zone)</text>
                      </g>

                      <line x1="400" y1={400 - 360 * zoomLevel} x2="400" y2={400 + 360 * zoomLevel} stroke="#173663" strokeWidth="1" />
                      <line x1={400 - 360 * zoomLevel} y1="400" x2={400 + 360 * zoomLevel} y2="400" stroke="#173663" strokeWidth="1" />
                      <text x="405" y="60" fill="#4d8fe2" fontSize="9" fontFamily="monospace">0° Meridian</text>
                      <text x="660" y="405" fill="#4d8fe2" fontSize="9" fontFamily="monospace">90°E (Indian Ocean)</text>
                      <text x="405" y="755" fill="#4d8fe2" fontSize="9" fontFamily="monospace">180° (Pacific)</text>
                      <text x="40" y="405" fill="#4d8fe2" fontSize="9" fontFamily="monospace">90°W (Atlantic)</text>

                      <path
                        d={`M ${400 + 30 * zoomLevel} ${400 - 220 * zoomLevel} 
                           Q ${400 + 180 * zoomLevel} ${400 - 200 * zoomLevel} ${400 + 220 * zoomLevel} ${400 - 70 * zoomLevel}
                           Q ${400 + 270 * zoomLevel} ${400 + 80 * zoomLevel} ${400 + 170 * zoomLevel} ${400 + 210 * zoomLevel}
                           Q ${400 + 50 * zoomLevel} ${400 + 270 * zoomLevel} ${400 - 70 * zoomLevel} ${400 + 240 * zoomLevel}
                           Q ${400 - 150 * zoomLevel} ${400 + 120 * zoomLevel} ${400 - 210 * zoomLevel} ${400 + 10 * zoomLevel}
                           Q ${400 - 280 * zoomLevel} ${400 - 100 * zoomLevel} ${400 - 180 * zoomLevel} ${400 - 220 * zoomLevel}
                           Q ${400 - 70 * zoomLevel} ${400 - 250 * zoomLevel} ${400 + 30 * zoomLevel} ${400 - 220 * zoomLevel} Z`}
                        fill="url(#iceCapGrad)"
                        stroke="#88d5f7"
                        strokeWidth="2"
                      />

                      <path
                        d={`M ${400 - 140 * zoomLevel} ${400 - 190 * zoomLevel}
                           Q ${400 - 240 * zoomLevel} ${400 - 280 * zoomLevel} ${400 - 270 * zoomLevel} ${400 - 320 * zoomLevel}
                           Q ${400 - 250 * zoomLevel} ${400 - 300 * zoomLevel} ${400 - 110 * zoomLevel} ${400 - 180 * zoomLevel} Z`}
                        fill="#bfeaff"
                        stroke="#88d5f7"
                        strokeWidth="1.5"
                        opacity="0.8"
                      />

                      <text x={400 + 120 * zoomLevel} y={400 - 130 * zoomLevel} fill="#bfeaff" fontSize="11" fontWeight="bold" opacity="0.6">East Antarctica</text>
                      <text x={400 - 160 * zoomLevel} y={400 + 70 * zoomLevel} fill="#bfeaff" fontSize="11" fontWeight="bold" opacity="0.6">West Antarctica</text>
                      <text x={400 - 30 * zoomLevel} y={400 + 20 * zoomLevel} fill="#38bdf8" fontSize="9" fontFamily="monospace">South Pole (2,835m)</text>
                    </>
                  )}

                  {projection === 'arctic' && (
                    <>
                      <circle cx="400" cy="400" r={120 * zoomLevel} fill="none" stroke="#224e8a" strokeDasharray="3 3" strokeWidth="1" />
                      <text x="405" y={400 - 120 * zoomLevel + 12} fill="#4d8fe2" fontSize="9" fontFamily="monospace">80°N</text>

                      <circle cx="400" cy="400" r={270 * zoomLevel} fill="none" stroke="#38bdf8" strokeDasharray="5 5" strokeWidth="1.2" opacity="0.7" />
                      <text x="405" y={400 - 270 * zoomLevel + 12} fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">66.5°N (Arctic Circle)</text>

                      <ellipse cx={400 - 100 * zoomLevel} cy={400 + 130 * zoomLevel} rx={60 * zoomLevel} ry={110 * zoomLevel} fill="url(#iceCapGrad)" stroke="#88d5f7" strokeWidth="1.5" transform={`rotate(-20 ${400 - 100 * zoomLevel} ${400 + 130 * zoomLevel})`} />
                      <text x={400 - 140 * zoomLevel} y={400 + 140 * zoomLevel} fill="#bfeaff" fontSize="10" fontWeight="bold" opacity="0.7">Greenland</text>

                      <circle cx={400 + 10 * zoomLevel} cy={400 + 150 * zoomLevel} r={16 * zoomLevel} fill="#bfeaff" stroke="#88d5f7" strokeWidth="1.5" />
                      <text x={400 + 35 * zoomLevel} y={400 + 155 * zoomLevel} fill="#38bdf8" fontSize="9" fontWeight="bold">Svalbard (Ny-Ålesund / Himadri)</text>

                      <text x="365" y="405" fill="#38bdf8" fontSize="9" fontFamily="monospace">North Pole (0m / Ocean)</text>
                    </>
                  )}

                  {projection === 'global' && (
                    <>
                      <line x1="50" y1="400" x2="750" y2="400" stroke="#173663" strokeWidth="1.5" />
                      <text x="60" y="395" fill="#4d8fe2" fontSize="9" fontFamily="monospace">Equator 0°</text>

                      <line x1="50" y1={400 - (23.5 / 90) * 280 * zoomLevel} x2="750" y2={400 - (23.5 / 90) * 280 * zoomLevel} stroke="#224e8a" strokeDasharray="3 3" />
                      <line x1="50" y1={400 + (23.5 / 90) * 280 * zoomLevel} x2="750" y2={400 + (23.5 / 90) * 280 * zoomLevel} stroke="#224e8a" strokeDasharray="3 3" />

                      <line x1="50" y1={400 + (60 / 90) * 280 * zoomLevel} x2="750" y2={400 + (60 / 90) * 280 * zoomLevel} stroke="#38bdf8" strokeDasharray="4 4" />
                      <text x="60" y={400 + (60 / 90) * 280 * zoomLevel - 5} fill="#38bdf8" fontSize="9">Antarctic Treaty Zone (60°S)</text>

                      <line x1="50" y1={400 - (66.5 / 90) * 280 * zoomLevel} x2="750" y2={400 - (66.5 / 90) * 280 * zoomLevel} stroke="#38bdf8" strokeDasharray="4 4" />
                      <text x="60" y={400 - (66.5 / 90) * 280 * zoomLevel - 5} fill="#38bdf8" fontSize="9">Arctic Circle (66.5°N)</text>
                    </>
                  )}

                  {/* Non-Overlapping Station Markers with Collision Avoidance Leader Lines */}
                  {stationPositions
                    .slice()
                    .sort((a, b) => {
                      const aActive = a.station.id === hoveredStation?.id || a.station.id === selectedStation?.id;
                      const bActive = b.station.id === hoveredStation?.id || b.station.id === selectedStation?.id;
                      if (aActive && !bActive) return 1;
                      if (!aActive && bActive) return -1;
                      if (a.station.isIndianStation && !b.station.isIndianStation) return 1;
                      if (!a.station.isIndianStation && b.station.isIndianStation) return -1;
                      return 0;
                    })
                    .map(({ station, x, y, labelX, labelY, anchor, isOffset, hasCluster }) => {
                      const isSelected = selectedStation?.id === station.id;
                      const isHovered = hoveredStation?.id === station.id;
                      const isActive = isHovered || isSelected;

                      const stationOpacity = hasActiveFocus ? (isActive ? 1 : 0.25) : 1;

                      const shortName = station.name
                        .replace(' Research Station', '')
                        .replace(' Station', '')
                        .replace(' Base', '');

                      const displayLabel = isActive
                        ? (station.isIndianStation ? `🇮🇳 ${station.name}` : station.name)
                        : station.isIndianStation
                        ? `🇮🇳 ${shortName}`
                        : null;

                      return (
                        <g
                          key={station.id}
                          className="cursor-pointer transition-all duration-300"
                          style={{ opacity: stationOpacity }}
                          onClick={() => setSelectedStation(station)}
                          onMouseEnter={() => setHoveredStation(station)}
                          onMouseLeave={() => setHoveredStation(null)}
                        >
                          {/* Leader Line for Clustered / Offset Labels */}
                          {displayLabel && (isOffset || hasCluster || isActive) && (
                            <line
                              x1={x}
                              y1={y}
                              x2={labelX}
                              y2={labelY}
                              stroke={station.isIndianStation ? '#f97316' : '#38bdf8'}
                              strokeWidth={isActive ? '1.5' : '1'}
                              strokeDasharray={isActive ? 'none' : '2 2'}
                              opacity={isActive ? 0.9 : 0.6}
                            />
                          )}

                          {/* Radar Beacon Pulse */}
                          <circle
                            cx={x}
                            cy={y}
                            r={isActive ? 18 : 11}
                            fill="none"
                            stroke={station.isIndianStation ? '#f97316' : isSelected ? '#38bdf8' : '#52a5d7'}
                            strokeWidth="1.5"
                            opacity={isSelected ? '0.9' : isHovered ? '0.8' : '0.4'}
                            className={station.isIndianStation ? 'animate-ping' : 'animate-pulse-subtle'}
                          />

                          {/* Outer Target Ring */}
                          <circle
                            cx={x}
                            cy={y}
                            r={isActive ? 13 : 7}
                            fill={station.isIndianStation ? '#f97316' : isSelected ? '#38bdf8' : '#0f2547'}
                            stroke={station.isIndianStation ? '#fbbf24' : '#88d5f7'}
                            strokeWidth={isSelected ? '2.5' : '1.5'}
                            filter={isActive ? 'url(#glowFilter)' : undefined}
                          />

                          {/* Inner Center Dot */}
                          <circle
                            cx={x}
                            cy={y}
                            r={station.isIndianStation ? 4.5 : 3}
                            fill={station.isIndianStation ? '#ffffff' : '#bfeaff'}
                          />

                          {/* Station Label Tag */}
                          {displayLabel && (
                            <g pointerEvents="none">
                              {isActive && (
                                <rect
                                  x={anchor === 'end' ? labelX - displayLabel.length * 6.5 - 6 : labelX - 4}
                                  y={labelY - 11}
                                  width={displayLabel.length * 6.5 + 10}
                                  height={16}
                                  rx={4}
                                  fill="#040914"
                                  opacity="0.92"
                                  stroke={station.isIndianStation ? '#f97316' : '#38bdf8'}
                                  strokeWidth="1"
                                />
                              )}
                              <text
                                x={labelX}
                                y={labelY}
                                textAnchor={anchor}
                                fill={station.isIndianStation ? '#fbbf24' : isSelected ? '#ffffff' : '#e0f7ff'}
                                fontSize={isActive ? '11' : '9.5'}
                                fontWeight={station.isIndianStation || isActive ? 'bold' : 'normal'}
                                fontFamily="sans-serif"
                                className="drop-shadow"
                              >
                                {displayLabel}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                </svg>

                {/* Hover Tooltip Card */}
                {hoveredStation && (
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-polar-950/95 p-4 rounded-2xl border border-ice-400/60 shadow-2xl backdrop-blur-md text-xs space-y-1.5 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">
                        {hoveredStation.isIndianStation ? '🇮🇳 ' : ''}
                        {hoveredStation.name}
                      </span>
                      <span className="text-[10px] text-teal-300 font-mono">{hoveredStation.establishedYear}</span>
                    </div>
                    <div className="text-[11px] text-slate-300">{hoveredStation.operator}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {Math.abs(hoveredStation.latitude).toFixed(2)}°{hoveredStation.latitude < 0 ? 'S' : 'N'},{' '}
                      {Math.abs(hoveredStation.longitude).toFixed(2)}°{hoveredStation.longitude < 0 ? 'W' : 'E'} • {hoveredStation.elevationMeters}m
                    </div>
                    <div className="pt-1.5 flex items-center justify-between text-[10px] text-ice-300 font-bold border-t border-polar-800">
                      <span>Click to view station profile</span>
                      <span>Mean: {hoveredStation.climateSummary.avgAnnualTempC}°C</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Side Directory & Focus Details */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-3xl bg-polar-900/90 border border-polar-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-polar-800 pb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-ice-400" />
                  <span>Station Observatories</span>
                </h3>
                <span className="text-2xs text-slate-400 font-mono">{filteredStations.length} available</span>
              </div>

              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                {filteredStations.map((s) => {
                  const isSelected = selectedStation?.id === s.id;
                  return (
                    <motion.div
                      key={s.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedStation(s)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-polar-850 border-ice-400 text-white shadow-lg ring-1 ring-ice-400/30'
                          : s.isIndianStation
                          ? 'bg-orange-950/30 border-orange-500/40 hover:bg-orange-950/50 text-slate-200'
                          : 'bg-polar-950/80 border-polar-800 hover:bg-polar-850 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xs flex items-center gap-1.5">
                          {s.isIndianStation && <span>🇮🇳</span>}
                          <span>{s.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{s.climateSummary.avgAnnualTempC}°C</span>
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{s.subRegion}</div>
                      <div className="text-[10px] text-teal-300 font-mono mt-1 flex items-center justify-between">
                        <span>{s.operator}</span>
                        <span>{s.status.includes('Year-Round') ? '● Year-round' : '○ Seasonal'}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Projection Note */}
            <div className="p-4 rounded-2xl bg-polar-900/60 border border-polar-800 text-xs text-slate-400 space-y-1.5">
              <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-ice-400" />
                <span>Stereographic Geometry</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Polar stereographic projections (Antarctic EPSG:3031 and Arctic EPSG:3575) preserve true circular geometries and ice-sheet orientations around the poles.
              </p>
            </div>
          </div>
        </div>

        {/* CONTEXTUAL NEXT STEPS GATEWAY */}
        <div className="pt-8 border-t border-polar-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate('data')}
            className="p-5 rounded-2xl bg-polar-900/80 border border-polar-750 hover:border-ice-400/60 transition-all cursor-pointer group"
          >
            <div className="text-2xs font-mono text-ice-300 font-bold uppercase tracking-wider mb-1">
              Next Scientific Step
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-ice-300 flex items-center justify-between">
              <span>Explore Observation Data</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Inspect NetCDF telemetry, time-series charts, and ice core metrics from these observatories.
            </p>
          </div>

          <div
            onClick={() => onNavigate('research')}
            className="p-5 rounded-2xl bg-polar-900/80 border border-polar-750 hover:border-teal-400/60 transition-all cursor-pointer group"
          >
            <div className="text-2xs font-mono text-teal-300 font-bold uppercase tracking-wider mb-1">
              Linked Publications
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-teal-300 flex items-center justify-between">
              <span>Read Polar Research</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Review peer-reviewed studies and DOI publications produced by polar research programs.
            </p>
          </div>

          <div
            onClick={() => onNavigate('india')}
            className="p-5 rounded-2xl bg-polar-900/80 border border-polar-750 hover:border-orange-500/60 transition-all cursor-pointer group"
          >
            <div className="text-2xs font-mono text-orange-400 font-bold uppercase tracking-wider mb-1">
              National Expedition History
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-orange-400 flex items-center justify-between">
              <span>India's Polar Journey</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Follow India's 40+ year timeline from Dakshin Gangotri (1981) to Bharati & Maitri today.
            </p>
          </div>
        </div>
      </div>

      {/* Station Details Drawer */}
      <StationDetailDrawer
        station={selectedStation}
        onClose={() => setSelectedStation(null)}
        onNavigate={onNavigate}
      />
    </motion.div>
  );
};

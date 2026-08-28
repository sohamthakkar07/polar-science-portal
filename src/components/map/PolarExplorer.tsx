import React, { useState, useMemo } from 'react';
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
  ExternalLink
} from 'lucide-react';
import { RESEARCH_STATIONS } from '../../data/stations';
import { ResearchStation, PolarRegion } from '../../types/polar';
import { StationDetailDrawer } from './StationDetailDrawer';
import { NavTab } from '../layout/Navbar';

interface PolarExplorerProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialStationId?: string;
}

type ProjectionMode = 'antarctic' | 'arctic' | 'global';

export const PolarExplorer: React.FC<PolarExplorerProps> = ({ onNavigate, initialStationId }) => {
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
      if (projection === 'antarctic' && station.latitude > 0) return false;
      if (projection === 'arctic' && station.latitude < 0) return false;
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        const matchesName = station.name.toLowerCase().includes(q);
        const matchesOperator = station.operator.toLowerCase().includes(q);
        const matchesRegion = station.subRegion.toLowerCase().includes(q);
        if (!matchesName && !matchesOperator && !matchesRegion) return false;
      }
      return true;
    });
  }, [projection, selectedRegionFilter, onlyIndianStations, searchFilter]);

  // Coordinate projection math
  // Canvas width/height = 800x800, center at (400, 400)
  const getCoordinates = (lat: number, lon: number): { x: number; y: number } => {
    const cx = 400;
    const cy = 400;
    const maxRadius = 360 * zoomLevel;

    if (projection === 'antarctic') {
      // South Pole at center (lat = -90), outer boundary at lat = -60
      // Radius proportional to distance from -90
      const poleDist = Math.max(0, (90 + lat) / 30); // 0 at South Pole, 1 at -60°S
      const r = poleDist * maxRadius;
      // Lon in degrees, clockwise from Top (0° Meridian)
      const rad = ((lon - 90) * Math.PI) / 180;
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      return { x, y };
    } else if (projection === 'arctic') {
      // North Pole at center (lat = 90), outer boundary at lat = 60
      const poleDist = Math.max(0, (90 - lat) / 30); // 0 at North Pole, 1 at +60°N
      const r = poleDist * maxRadius;
      const rad = ((-lon - 90) * Math.PI) / 180;
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      return { x, y };
    } else {
      // Global Equirectangular
      // Lat -90 to +90 -> Y 700 to 100
      // Lon -180 to +180 -> X 50 to 750
      const x = cx + (lon / 180) * (340 * zoomLevel);
      const y = cy - (lat / 90) * (280 * zoomLevel);
      return { x, y };
    }
  };

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Title & Provenance Indicator */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-polar-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-frost-cyan text-xs font-bold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Interactive Geographic Interoperability Layer</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              🗺️ Polar Explorer & Research Stations
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Accurate, verified polar stereographic cartography connecting Indian and international permanent stations, observatories, and expeditions across the Antarctic continent and Arctic basin.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setProjection('antarctic');
                setSelectedRegionFilter('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                projection === 'antarctic'
                  ? 'bg-frost-cyan text-polar-950 shadow-polar-glow'
                  : 'bg-polar-900 text-slate-300 hover:bg-polar-800 border border-polar-750'
              }`}
            >
              🇦🇶 Antarctic View (EPSG:3031)
            </button>
            <button
              onClick={() => {
                setProjection('arctic');
                setSelectedRegionFilter('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                projection === 'arctic'
                  ? 'bg-frost-cyan text-polar-950 shadow-polar-glow'
                  : 'bg-polar-900 text-slate-300 hover:bg-polar-800 border border-polar-750'
              }`}
            >
              🧊 Arctic View (EPSG:3575)
            </button>
            <button
              onClick={() => {
                setProjection('global');
                setSelectedRegionFilter('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                projection === 'global'
                  ? 'bg-frost-cyan text-polar-950 shadow-polar-glow'
                  : 'bg-polar-900 text-slate-300 hover:bg-polar-800 border border-polar-750'
              }`}
            >
              🌐 Global Network
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-polar-900/90 border border-polar-800 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search station or operator..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-polar-950 border border-polar-750 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-frost-cyan"
              />
            </div>

            {/* Indian Station Toggle */}
            <button
              onClick={() => setOnlyIndianStations(!onlyIndianStations)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border ${
                onlyIndianStations
                  ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-sm'
                  : 'bg-polar-950 border-polar-750 text-slate-300 hover:text-white'
              }`}
            >
              <span>🇮🇳 Indian Stations Only</span>
              {onlyIndianStations && <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />}
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-200">{filteredStations.length}</span>
            <span>stations visible</span>
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={() => setZoomLevel((z) => Math.min(2, z + 0.2))}
                className="p-1.5 rounded bg-polar-950 border border-polar-800 hover:border-polar-600 text-slate-200"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                className="p-1.5 rounded bg-polar-950 border border-polar-800 hover:border-polar-600 text-slate-200"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 rounded bg-polar-950 border border-polar-800 hover:border-polar-600 text-slate-200"
                title="Reset View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Map Canvas + Quick Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Map SVG Viewport */}
          <div className="lg:col-span-8 bg-polar-900/90 rounded-3xl border border-polar-750 p-4 relative overflow-hidden shadow-2xl flex items-center justify-center min-h-[500px] sm:min-h-[600px]">
            {/* SVG Map */}
            <svg
              viewBox="0 0 800 800"
              className="w-full h-full max-w-[720px] max-h-[720px] select-none"
              style={{ filter: 'drop-shadow(0 0 20px rgba(7, 19, 38, 0.8))' }}
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
                  {/* 80°S */}
                  <circle cx="400" cy="400" r={120 * zoomLevel} fill="none" stroke="#224e8a" strokeDasharray="3 3" strokeWidth="1" />
                  <text x="405" y={400 - 120 * zoomLevel + 12} fill="#4d8fe2" fontSize="9" fontFamily="monospace">80°S</text>

                  {/* 70°S */}
                  <circle cx="400" cy="400" r={240 * zoomLevel} fill="none" stroke="#224e8a" strokeDasharray="3 3" strokeWidth="1" />
                  <text x="405" y={400 - 240 * zoomLevel + 12} fill="#4d8fe2" fontSize="9" fontFamily="monospace">70°S</text>

                  {/* 60°S (Antarctic Convergence / Polar Front) */}
                  <circle cx="400" cy="400" r={350 * zoomLevel} fill="none" stroke="#38bdf8" strokeDasharray="5 5" strokeWidth="1.2" opacity="0.6" />
                  <text x="405" y={400 - 350 * zoomLevel + 12} fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">60°S (Polar Front / Treaty Zone)</text>

                  {/* Meridians (Prime Meridian, 90°E, 180°, 90°W) */}
                  <line x1="400" y1={400 - 360 * zoomLevel} x2="400" y2={400 + 360 * zoomLevel} stroke="#173663" strokeWidth="1" />
                  <line x1={400 - 360 * zoomLevel} y1="400" x2={400 + 360 * zoomLevel} y2="400" stroke="#173663" strokeWidth="1" />
                  <text x="405" y="60" fill="#4d8fe2" fontSize="9" fontFamily="monospace">0° Meridian</text>
                  <text x="730" y="405" fill="#4d8fe2" fontSize="9" fontFamily="monospace">90°E (Indian Ocean Sector)</text>
                  <text x="405" y="760" fill="#4d8fe2" fontSize="9" fontFamily="monospace">180° (Pacific Sector)</text>
                  <text x="25" y="405" fill="#4d8fe2" fontSize="9" fontFamily="monospace">90°W (Atlantic/Weddell)</text>

                  {/* Antarctic Continent Realistic Contour (SVG Path) */}
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

                  {/* Antarctic Peninsula finger */}
                  <path
                    d={`M ${400 - 140 * zoomLevel} ${400 - 190 * zoomLevel}
                       Q ${400 - 240 * zoomLevel} ${400 - 280 * zoomLevel} ${400 - 270 * zoomLevel} ${400 - 320 * zoomLevel}
                       Q ${400 - 250 * zoomLevel} ${400 - 300 * zoomLevel} ${400 - 110 * zoomLevel} ${400 - 180 * zoomLevel} Z`}
                    fill="#bfeaff"
                    stroke="#88d5f7"
                    strokeWidth="1.5"
                    opacity="0.8"
                  />

                  {/* Sector Labels */}
                  <text x={400 + 120 * zoomLevel} y={400 - 130 * zoomLevel} fill="#bfeaff" fontSize="11" fontWeight="bold" opacity="0.6">East Antarctica</text>
                  <text x={400 - 160 * zoomLevel} y={400 + 70 * zoomLevel} fill="#bfeaff" fontSize="11" fontWeight="bold" opacity="0.6">West Antarctica</text>
                  <text x={400 - 30 * zoomLevel} y={400 + 20 * zoomLevel} fill="#38bdf8" fontSize="9" fontFamily="monospace">South Pole (2,835m)</text>
                </>
              )}

              {projection === 'arctic' && (
                <>
                  {/* 80°N */}
                  <circle cx="400" cy="400" r={120 * zoomLevel} fill="none" stroke="#224e8a" strokeDasharray="3 3" strokeWidth="1" />
                  <text x="405" y={400 - 120 * zoomLevel + 12} fill="#4d8fe2" fontSize="9" fontFamily="monospace">80°N</text>

                  {/* 70°N (Arctic Circle ~ 66.5°N) */}
                  <circle cx="400" cy="400" r={270 * zoomLevel} fill="none" stroke="#38bdf8" strokeDasharray="5 5" strokeWidth="1.2" opacity="0.7" />
                  <text x="405" y={400 - 270 * zoomLevel + 12} fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">66.5°N (Arctic Circle)</text>

                  {/* Greenland Ice Sheet Representation */}
                  <ellipse cx={400 - 100 * zoomLevel} cy={400 + 130 * zoomLevel} rx={60 * zoomLevel} ry={110 * zoomLevel} fill="url(#iceCapGrad)" stroke="#88d5f7" strokeWidth="1.5" transform={`rotate(-20 ${400 - 100 * zoomLevel} ${400 + 130 * zoomLevel})`} />
                  <text x={400 - 140 * zoomLevel} y={400 + 140 * zoomLevel} fill="#bfeaff" fontSize="10" fontWeight="bold" opacity="0.7">Greenland</text>

                  {/* Svalbard Archipelago */}
                  <circle cx={400 + 10 * zoomLevel} cy={400 + 150 * zoomLevel} r={16 * zoomLevel} fill="#bfeaff" stroke="#88d5f7" strokeWidth="1.5" />
                  <text x={400 + 30 * zoomLevel} y={400 + 155 * zoomLevel} fill="#38bdf8" fontSize="9" fontWeight="bold">Svalbard (Ny-Ålesund / Himadri)</text>

                  <text x="365" y="405" fill="#38bdf8" fontSize="9" fontFamily="monospace">North Pole (0m / Ocean)</text>
                </>
              )}

              {projection === 'global' && (
                <>
                  {/* Equator & Parallels */}
                  <line x1="50" y1="400" x2="750" y2="400" stroke="#173663" strokeWidth="1.5" />
                  <text x="60" y="395" fill="#4d8fe2" fontSize="9" fontFamily="monospace">Equator 0°</text>

                  {/* Tropic of Cancer 23.5°N */}
                  <line x1="50" y1={400 - (23.5 / 90) * 280 * zoomLevel} x2="750" y2={400 - (23.5 / 90) * 280 * zoomLevel} stroke="#224e8a" strokeDasharray="3 3" />
                  {/* Tropic of Capricorn 23.5°S */}
                  <line x1="50" y1={400 + (23.5 / 90) * 280 * zoomLevel} x2="750" y2={400 + (23.5 / 90) * 280 * zoomLevel} stroke="#224e8a" strokeDasharray="3 3" />

                  {/* 60°S & 66.5°N Polar Boundaries */}
                  <line x1="50" y1={400 + (60 / 90) * 280 * zoomLevel} x2="750" y2={400 + (60 / 90) * 280 * zoomLevel} stroke="#38bdf8" strokeDasharray="4 4" />
                  <text x="60" y={400 + (60 / 90) * 280 * zoomLevel - 5} fill="#38bdf8" fontSize="9">Antarctic Treaty Zone (60°S)</text>

                  <line x1="50" y1={400 - (66.5 / 90) * 280 * zoomLevel} x2="750" y2={400 - (66.5 / 90) * 280 * zoomLevel} stroke="#38bdf8" strokeDasharray="4 4" />
                  <text x="60" y={400 - (66.5 / 90) * 280 * zoomLevel - 5} fill="#38bdf8" fontSize="9">Arctic Circle (66.5°N)</text>
                </>
              )}

              {/* Station Markers */}
              {filteredStations.map((station) => {
                const { x, y } = getCoordinates(station.latitude, station.longitude);
                const isSelected = selectedStation?.id === station.id;
                const isHovered = hoveredStation?.id === station.id;

                return (
                  <g
                    key={station.id}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => setSelectedStation(station)}
                    onMouseEnter={() => setHoveredStation(station)}
                    onMouseLeave={() => setHoveredStation(null)}
                  >
                    {/* Glowing Pulse Ring for Indian Stations */}
                    {station.isIndianStation && (
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered || isSelected ? 16 : 11}
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="2"
                        opacity="0.8"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Target Ring */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered || isSelected ? 12 : 7}
                      fill={station.isIndianStation ? '#f97316' : isSelected ? '#38bdf8' : '#0f2547'}
                      stroke={station.isIndianStation ? '#fbbf24' : '#88d5f7'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      filter={isHovered || isSelected ? 'url(#glowFilter)' : undefined}
                    />

                    {/* Inner Center Dot */}
                    <circle
                      cx={x}
                      cy={y}
                      r={station.isIndianStation ? 4.5 : 3}
                      fill={station.isIndianStation ? '#ffffff' : '#bfeaff'}
                    />

                    {/* Station Name Label */}
                    <text
                      x={x + 9}
                      y={y + 3}
                      fill={station.isIndianStation ? '#fbbf24' : isSelected ? '#ffffff' : '#e0f7ff'}
                      fontSize={isHovered || isSelected ? '11' : '9.5'}
                      fontWeight={station.isIndianStation || isSelected ? 'bold' : 'normal'}
                      fontFamily="sans-serif"
                      className="drop-shadow"
                    >
                      {station.isIndianStation ? `🇮🇳 ${station.name}` : station.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Card */}
            {hoveredStation && (
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-polar-950/95 p-3.5 rounded-xl border border-frost-cyan/50 shadow-2xl backdrop-blur-md text-xs space-y-1 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">
                    {hoveredStation.isIndianStation ? '🇮🇳 ' : ''}
                    {hoveredStation.name}
                  </span>
                  <span className="text-[10px] text-frost-teal font-mono">{hoveredStation.establishedYear}</span>
                </div>
                <div className="text-[11px] text-slate-300">{hoveredStation.operator}</div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {Math.abs(hoveredStation.latitude).toFixed(2)}°{hoveredStation.latitude < 0 ? 'S' : 'N'},{' '}
                  {Math.abs(hoveredStation.longitude).toFixed(2)}°{hoveredStation.longitude < 0 ? 'W' : 'E'} • {hoveredStation.elevationMeters}m
                </div>
                <div className="pt-1 flex items-center justify-between text-[10px] text-frost-cyan font-semibold">
                  <span>Click to view full scientific dossier</span>
                  <span>Avg Temp: {hoveredStation.climateSummary.avgAnnualTempC}°C</span>
                </div>
              </div>
            )}
          </div>

          {/* Side Directory / Selected Station Highlights */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-2xl bg-polar-900 border border-polar-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-frost-cyan" />
                  <span>Station Directory</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">{filteredStations.length} available</span>
              </div>

              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                {filteredStations.map((s) => {
                  const isSelected = selectedStation?.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedStation(s)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-polar-800 border-frost-cyan text-white shadow-polar-glow'
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
                      <div className="text-[10px] text-frost-teal font-mono mt-1 flex items-center justify-between">
                        <span>{s.operator}</span>
                        <span>{s.status.includes('Year-Round') ? '● Year-round' : '○ Seasonal'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Educational note on polar projections */}
            <div className="p-4 rounded-2xl bg-polar-900/60 border border-polar-800 text-xs text-slate-400 space-y-1.5">
              <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-frost-cyan" />
                <span>Polar Stereographic Projections</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Standard Mercator maps severely distort polar landmasses. Polar stereographic projections (such as Antarctic EPSG:3031 and Arctic EPSG:3575) preserve true circular geometries and ice-sheet orientations around the poles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Station Details Drawer */}
      <StationDetailDrawer
        station={selectedStation}
        onClose={() => setSelectedStation(null)}
        onNavigate={onNavigate}
      />
    </div>
  );
};

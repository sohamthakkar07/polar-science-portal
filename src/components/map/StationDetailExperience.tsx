import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Compass,
  Thermometer,
  Wind,
  Calendar,
  Users,
  ShieldCheck,
  ExternalLink,
  FileText,
  Database,
  Layers,
  ArrowRight,
  Zap,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Radio,
  Sparkles,
  Info,
  BookOpen,
  Activity,
  CheckCircle2,
  ChevronDown,
  Globe
} from 'lucide-react';
import { ResearchStation, PolarRegion } from '../../types/polar';
import { POLAR_DATASETS } from '../../data/datasets';
import { RESEARCH_PAPERS } from '../../data/researchPapers';
import { RESEARCH_STATIONS } from '../../data/stations';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { NavTab } from '../layout/Navbar';

interface StationDetailExperienceProps {
  station: ResearchStation;
  onSelectStation: (station: ResearchStation) => void;
  onNavigate: (tab: NavTab, detailId?: string) => void;
  onClose?: () => void;
}

// Fallback high-res photographic gallery database per station / region
const STATION_GALLERIES: Record<string, { url: string; caption: string }[]> = {
  maitri: [
    {
      url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80',
      caption: 'Maitri Station in the rocky ice-free terrain of Schirmacher Oasis, East Antarctica'
    },
    {
      url: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1600&q=80',
      caption: 'Lake Priyadarshini freshwater ecosystem and peri-glacial oasis lakes near Maitri'
    },
    {
      url: 'https://images.unsplash.com/photo-1548685913-fe6574346a23?auto=format&fit=crop&w=1600&q=80',
      caption: 'Winter aurora australis illuminated over the East Antarctic ice sheet'
    },
    {
      url: 'https://images.unsplash.com/photo-1517783999520-f068d7431a4b?auto=format&fit=crop&w=1600&q=80',
      caption: 'Meteorological instrumentation array measuring solar radiation and ozone'
    }
  ],
  bharati: [
    {
      url: 'https://images.unsplash.com/photo-1548685913-fe6574346a23?auto=format&fit=crop&w=1600&q=80',
      caption: 'Bharati Station’s futuristic elevated structure overlooking Prydz Bay'
    },
    {
      url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80',
      caption: 'Rocky promontory of Larsemann Hills, Princess Elizabeth Land'
    },
    {
      url: 'https://images.unsplash.com/photo-1517783999520-f068d7431a4b?auto=format&fit=crop&w=1600&q=80',
      caption: 'ISRO Satellite Telemetry Ground Station antenna downloading Earth observation data'
    }
  ],
  himadri: [
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
      caption: 'Himadri Station located in the scientific village of Ny-Ålesund, Svalbard (79°N)'
    },
    {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
      caption: 'Kongsfjorden arctic fjord environment and surrounding glacier fronts'
    },
    {
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
      caption: 'High Arctic glaciology mass balance field observations on Austre Lovénbreen'
    }
  ],
  himansh: [
    {
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
      caption: 'Himansh Cryospheric Observatory at 4,080m elevation in Chandra Basin, Himalayas'
    },
    {
      url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1600&q=80',
      caption: 'Chhota Shigri and Sutri Dhaka glacier mass balance monitoring network'
    },
    {
      url: 'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?auto=format&fit=crop&w=1600&q=80',
      caption: 'High-altitude unmanned aerial vehicle (UAV) thermal mapping across Himalayan ice sheets'
    }
  ],
  indarc: [
    {
      url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80',
      caption: 'IndARC Subsurface Oceanographic Mooring deployed at 192m depth in Kongsfjorden'
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
      caption: 'R/V oceanographic deployment vessel retrieving CTD temperature-salinity sensors'
    }
  ]
};

// Generic fallback images for international stations
const REGION_DEFAULT_GALLERIES: Record<string, { url: string; caption: string }[]> = {
  Antarctic: [
    {
      url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80',
      caption: 'Antarctic polar research station amidst continental ice sheets'
    },
    {
      url: 'https://images.unsplash.com/photo-1548685913-fe6574346a23?auto=format&fit=crop&w=1600&q=80',
      caption: 'Coastal ice shelf and meteorological monitoring towers'
    }
  ],
  Arctic: [
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
      caption: 'High Arctic glaciology observatory and sea ice research outpost'
    },
    {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
      caption: 'Arctic fjord waters and polar mountain background'
    }
  ],
  'Himalayan / Third Pole': [
    {
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
      caption: 'Third Pole high-altitude glaciology research station'
    }
  ]
};

export const StationDetailExperience: React.FC<StationDetailExperienceProps> = ({
  station,
  onSelectStation,
  onNavigate,
  onClose
}) => {
  // Image sequence state
  const images = useMemo(() => {
    if (STATION_GALLERIES[station.id]) return STATION_GALLERIES[station.id];
    if (REGION_DEFAULT_GALLERIES[station.region]) return REGION_DEFAULT_GALLERIES[station.region];
    return [
      {
        url: station.imageUrl || 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80',
        caption: station.imageCaption || station.name
      }
    ];
  }, [station]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreenViewerOpen, setIsFullscreenViewerOpen] = useState(false);
  const [activeDomainIndex, setActiveDomainIndex] = useState(0);
  const [isProvenanceExpanded, setIsProvenanceExpanded] = useState(false);

  // Auto-rotate images every 6 seconds
  useEffect(() => {
    setActiveImageIndex(0);
  }, [station.id]);

  useEffect(() => {
    if (images.length <= 1 || isFullscreenViewerOpen) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length, isFullscreenViewerOpen]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreenViewerOpen) return;
      if (e.key === 'Escape') {
        setIsFullscreenViewerOpen(false);
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenViewerOpen, images.length]);

  // Connected Datasets & Papers
  const connectedDatasets = POLAR_DATASETS.filter((d) => station.connectedDatasetIds.includes(d.id));
  const connectedPapers = RESEARCH_PAPERS.filter((p) => station.connectedPaperIds.includes(p.id));
  const featuredPaper = connectedPapers[0];
  const secondaryPapers = connectedPapers.slice(1);

  // Station route neighbors
  const allStations = RESEARCH_STATIONS;
  const currentStationIndex = allStations.findIndex((s) => s.id === station.id);
  const nextStation = allStations[(currentStationIndex + 1) % allStations.length];
  const prevStation = allStations[(currentStationIndex - 1 + allStations.length) % allStations.length];

  // Group stations by region for Part 1 selector
  const antarcticStations = allStations.filter((s) => s.region === 'Antarctic');
  const arcticStations = allStations.filter((s) => s.region === 'Arctic');
  const himalayanStations = allStations.filter((s) => s.region === 'Himalayan / Third Pole');

  const currentImage = images[activeImageIndex] || images[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full bg-polar-950 text-slate-100 min-h-screen space-y-12 pb-16 font-sans relative select-none"
    >
      {/* Top Fixed / Floating Close Button if presented in modal mode */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-polar-950/90 border border-polar-750 text-slate-200 hover:text-white shadow-2xl backdrop-blur-xl cursor-pointer transition-all hover:scale-105"
          aria-label="Close station detail view"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* PART 1 — EXPEDITION NETWORK STATION ROUTE SELECTOR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-polar-900/80 p-4 rounded-3xl border border-polar-750 backdrop-blur-xl shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-polar-800 pb-2.5">
            <div className="flex items-center gap-2 text-2xs font-mono font-bold uppercase tracking-widest text-ice-300">
              <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span>EXPEDITION NETWORK STATION ROUTE</span>
            </div>
            <span className="text-2xs text-slate-400 font-mono">{allStations.length} Active Observatories</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {/* ANTARCTICA TRACK */}
            <div className="space-y-1.5">
              <div className="text-3xs uppercase font-bold text-ice-300 tracking-wider flex items-center gap-1.5">
                <span>🇦🇶 ANTARCTICA</span>
                <span className="text-slate-500">({antarcticStations.length})</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {antarcticStations.map((s) => {
                  const isActive = s.id === station.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onSelectStation(s)}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border ${
                        isActive
                          ? 'bg-gradient-to-r from-ice-400 to-teal-400 text-polar-950 font-bold border-ice-300 shadow-md scale-105'
                          : s.isIndianStation
                          ? 'bg-orange-950/40 border-orange-500/50 text-orange-300 hover:bg-orange-950/80 hover:text-white'
                          : 'bg-polar-950/90 border-polar-800 text-slate-300 hover:border-polar-600 hover:text-white'
                      }`}
                    >
                      {s.isIndianStation && <span>🇮🇳</span>}
                      <span>{s.name.replace(' Research Station', '').replace(' Station', '')}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ARCTIC TRACK */}
            <div className="space-y-1.5">
              <div className="text-3xs uppercase font-bold text-teal-300 tracking-wider flex items-center gap-1.5">
                <span>🧊 ARCTIC</span>
                <span className="text-slate-500">({arcticStations.length})</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {arcticStations.map((s) => {
                  const isActive = s.id === station.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onSelectStation(s)}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border ${
                        isActive
                          ? 'bg-gradient-to-r from-ice-400 to-teal-400 text-polar-950 font-bold border-ice-300 shadow-md scale-105'
                          : s.isIndianStation
                          ? 'bg-orange-950/40 border-orange-500/50 text-orange-300 hover:bg-orange-950/80 hover:text-white'
                          : 'bg-polar-950/90 border-polar-800 text-slate-300 hover:border-polar-600 hover:text-white'
                      }`}
                    >
                      {s.isIndianStation && <span>🇮🇳</span>}
                      <span>{s.name.replace(' Research Station', '').replace(' Station', '').replace(' Observatory', '')}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* HIMALAYAS TRACK */}
            <div className="space-y-1.5">
              <div className="text-3xs uppercase font-bold text-orange-400 tracking-wider flex items-center gap-1.5">
                <span>🏔️ HIMALAYAS / THIRD POLE</span>
                <span className="text-slate-500">({himalayanStations.length})</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {himalayanStations.map((s) => {
                  const isActive = s.id === station.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onSelectStation(s)}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border ${
                        isActive
                          ? 'bg-gradient-to-r from-ice-400 to-teal-400 text-polar-950 font-bold border-ice-300 shadow-md scale-105'
                          : s.isIndianStation
                          ? 'bg-orange-950/40 border-orange-500/50 text-orange-300 hover:bg-orange-950/80 hover:text-white'
                          : 'bg-polar-950/90 border-polar-800 text-slate-300 hover:border-polar-600 hover:text-white'
                      }`}
                    >
                      {s.isIndianStation && <span>🇮🇳</span>}
                      <span>{s.name.replace(' High-Altitude Cryosphere Observatory', '').replace(' Station', '')}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2 & 3 — CINEMATIC FULL-WIDTH HERO WITH AUTOMATIC ROTATING IMAGES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative w-full h-[520px] sm:h-[640px] rounded-3xl overflow-hidden border border-polar-750 shadow-2xl group">
          {/* Animated Background Imagery with Ken Burns Effect */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage.url}
              src={currentImage.url}
              alt={currentImage.caption}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.75, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover filter contrast-110 brightness-90 cursor-pointer"
              onClick={() => setIsFullscreenViewerOpen(true)}
            />
          </AnimatePresence>

          {/* Environmental Gradient Mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-polar-950 via-polar-950/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-polar-950/80 via-transparent to-polar-950/40 pointer-events-none" />

          {/* Top Left Badge & Image Counter */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-polar-950/90 border border-ice-400/50 text-ice-300 shadow-lg backdrop-blur-md">
              EST. {station.establishedYear}
            </span>
            {station.isIndianStation && (
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-orange-950/90 border border-orange-500/60 text-orange-400 shadow-lg backdrop-blur-md flex items-center gap-1.5">
                <span>🇮🇳</span>
                <span>NATIONAL RESEARCH STATION</span>
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsFullscreenViewerOpen(true)}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-polar-950/90 hover:bg-polar-900 border border-polar-750 text-slate-200 hover:text-white shadow-lg backdrop-blur-md flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5 text-ice-400" />
              <span>{activeImageIndex + 1} / {images.length} GALLERY</span>
            </button>
          </div>

          {/* Top Right Quick Controls */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
            {images.length > 1 && (
              <div className="flex items-center gap-1 bg-polar-950/90 p-1 rounded-full border border-polar-750 backdrop-blur-md">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      idx === activeImageIndex ? 'bg-ice-400 scale-125' : 'bg-polar-700 hover:bg-slate-300'
                    }`}
                    title={`View Image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Hero Main Station Identity Overlay */}
          <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-10 z-20 space-y-4">
            <div className="space-y-2 max-w-3xl">
              <div className="text-2xs font-mono font-bold uppercase tracking-widest text-ice-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 animate-pulse" />
                <span>{station.subRegion}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none drop-shadow-md">
                {station.name}
                {station.nativeName && (
                  <span className="block sm:inline text-2xl sm:text-3xl font-normal text-slate-300 ml-0 sm:ml-3">
                    ({station.nativeName})
                  </span>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl drop-shadow">
                {station.operator} • {station.country}
              </p>
            </div>

            {/* Hero Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  const elem = document.getElementById('station-overview');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-ice-400 to-teal-400 hover:from-ice-300 hover:to-teal-300 text-polar-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xl transition-all hover:scale-102"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Station Profile</span>
              </button>

              {connectedDatasets.length > 0 && (
                <button
                  type="button"
                  onClick={() => onNavigate('data', connectedDatasets[0].id)}
                  className="px-6 py-3 rounded-2xl bg-polar-900/90 hover:bg-polar-850 border border-polar-750 hover:border-ice-400 text-white font-mono font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer backdrop-blur-md transition-all"
                >
                  <Database className="w-4 h-4 text-ice-400" />
                  <span>View Telemetry Data ({connectedDatasets.length})</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsFullscreenViewerOpen(true)}
                className="px-5 py-3 rounded-2xl bg-polar-950/80 hover:bg-polar-900 border border-polar-750 text-slate-300 hover:text-white font-mono font-semibold text-xs flex items-center gap-2 cursor-pointer backdrop-blur-md transition-all"
              >
                <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Full-Screen Gallery</span>
              </button>
            </div>

            {/* Current Image Caption Indicator */}
            <div className="text-2xs font-mono text-slate-400 pt-2 flex items-center gap-2 border-t border-polar-800/80">
              <Sparkles className="w-3 h-3 text-ice-400 shrink-0" />
              <span className="line-clamp-1">{currentImage.caption}</span>
            </div>
          </div>
        </div>
      </div>

      {/* PART 4 — FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isFullscreenViewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-polar-950/98 backdrop-blur-2xl flex flex-col justify-between p-6 select-none"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-polar-800 pb-4">
              <div>
                <div className="text-2xs font-mono font-bold text-ice-300 uppercase tracking-widest">
                  {station.name} · FULLSCREEN GALLERY
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Image {activeImageIndex + 1} of {images.length}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFullscreenViewerOpen(false)}
                className="p-3 rounded-full bg-polar-900 border border-polar-750 text-slate-300 hover:text-white cursor-pointer transition-colors"
                title="Close Viewer (Esc)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Center Image Container with Navigation Arrows */}
            <div className="relative flex-1 flex items-center justify-center py-4 my-auto">
              <button
                type="button"
                onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-4 z-20 p-4 rounded-full bg-polar-900/90 border border-polar-750 text-white hover:border-ice-400 cursor-pointer shadow-2xl backdrop-blur-md transition-all hover:scale-110"
                title="Previous Image (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={currentImage.url}
                src={currentImage.url}
                alt={currentImage.caption}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-polar-800 shadow-2xl"
              />

              <button
                type="button"
                onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                className="absolute right-4 z-20 p-4 rounded-full bg-polar-900/90 border border-polar-750 text-white hover:border-ice-400 cursor-pointer shadow-2xl backdrop-blur-md transition-all hover:scale-110"
                title="Next Image (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="border-t border-polar-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-300">
              <div>{currentImage.caption}</div>
              <div className="text-2xs text-slate-500">Use Left/Right arrows to navigate · Press ESC to close</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PART 6 — EDITORIAL STATION OVERVIEW & KEY STATS */}
      <div id="station-overview" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Editorial Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-polar-800 pb-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-2xs font-mono font-bold uppercase tracking-widest text-ice-300">
              01 · STATION OVERVIEW & HISTORICAL PROFILE
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              {station.name} is situated in {station.subRegion}.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {station.overview}
            </p>
            {station.historicalSignificance && (
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed italic border-l-2 border-ice-400 pl-4 py-1">
                "{station.historicalSignificance}"
              </p>
            )}
          </div>

          {/* Editorial Numbers Grid (No Cards Wall) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 pt-2 font-mono">
            <div className="border-l-2 border-ice-400/60 pl-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">{station.establishedYear}</div>
              <div className="text-2xs text-ice-300 uppercase tracking-widest font-bold">YEAR ESTABLISHED</div>
            </div>

            <div className="border-l-2 border-teal-400/60 pl-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-300">
                {Math.abs(station.latitude).toFixed(2)}°{station.latitude < 0 ? 'S' : 'N'}
              </div>
              <div className="text-2xs text-teal-300 uppercase tracking-widest font-bold">LATITUDE COORDINATE</div>
            </div>

            <div className="border-l-2 border-sky-400/60 pl-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-sky-300">
                {station.climateSummary.avgAnnualTempC}°C
              </div>
              <div className="text-2xs text-sky-300 uppercase tracking-widest font-bold">MEAN ANNUAL TEMP</div>
            </div>

            <div className="border-l-2 border-orange-400/60 pl-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-orange-300">
                {station.elevationMeters !== undefined ? `${station.elevationMeters}m` : '0m'}
              </div>
              <div className="text-2xs text-orange-300 uppercase tracking-widest font-bold">STATION ELEVATION</div>
            </div>
          </div>
        </div>

        {/* PART 8 — WHAT SCIENCE HAPPENS HERE? (INTERACTIVE RESEARCH DOMAINS) */}
        <div className="space-y-6 border-b border-polar-800 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-2xs font-mono font-bold uppercase tracking-widest text-teal-300 mb-1">
                02 · SCIENTIFIC DISCIPLINES & RESEARCH HIGHLIGHTS
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                What Science Happens at {station.name}?
              </h3>
            </div>
            <span className="text-2xs text-slate-400 font-mono">
              {station.scientificDisciplines.length} Scientific Programs Active
            </span>
          </div>

          {/* Asymmetric Interactive Research Domain Switcher */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Domain Tabs List */}
            <div className="lg:col-span-5 space-y-2">
              {station.scientificDisciplines.map((program, idx) => {
                const isActive = idx === activeDomainIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveDomainIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-polar-850 border-ice-400 text-white shadow-xl ring-1 ring-ice-400/40'
                        : 'bg-polar-900/80 border-polar-800 text-slate-300 hover:bg-polar-850 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-ice-400 animate-pulse' : 'bg-slate-600'}`} />
                      <span className="font-mono font-semibold text-xs sm:text-sm">{program}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-ice-400' : 'text-slate-500'}`} />
                  </button>
                );
              })}
            </div>

            {/* Selected Domain Focused View */}
            <div className="lg:col-span-7 bg-polar-900/90 rounded-3xl border border-polar-750 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
              <div className="space-y-2">
                <div className="text-2xs font-mono font-bold text-ice-300 uppercase tracking-widest">
                  FEATURED RESEARCH HIGHLIGHT
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white">
                  {station.scientificDisciplines[activeDomainIndex] || station.scientificDisciplines[0]}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-sans pt-2">
                  {station.researchHighlights[activeDomainIndex] || station.researchHighlights[0] || station.overview}
                </p>
              </div>

              {/* Connected Dataset & Paper Action Buttons */}
              <div className="pt-4 border-t border-polar-800 flex flex-wrap items-center gap-4">
                {connectedDatasets.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onNavigate('data', connectedDatasets[0].id)}
                    className="px-5 py-2.5 rounded-xl bg-ice-400 hover:bg-ice-300 text-polar-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-md"
                  >
                    <span>Inspect Domain Datasets</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {connectedPapers.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onNavigate('research', connectedPapers[0].id)}
                    className="px-5 py-2.5 rounded-xl bg-polar-950 border border-polar-750 hover:border-teal-400 text-teal-300 font-mono text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Read Peer-Reviewed Papers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PART 10 — CONNECTED DATASETS VISUALLY */}
        {connectedDatasets.length > 0 && (
          <div className="space-y-6 border-b border-polar-800 pb-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xs font-mono font-bold uppercase tracking-widest text-sky-300 mb-1">
                  03 · OBSERVATIONAL TELEMETRY & DATASETS
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Long-Term Telemetry Gathered at {station.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('data')}
                className="text-xs font-mono text-ice-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <span>View All Datasets ({connectedDatasets.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {connectedDatasets.map((ds) => (
                <div
                  key={ds.id}
                  className="p-6 rounded-3xl bg-polar-900/90 border border-polar-750 hover:border-ice-400/60 transition-all space-y-4 shadow-xl group"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-2xs font-mono font-bold bg-ice-500/20 text-ice-300 border border-ice-400/40">
                      {ds.topic}
                    </span>
                    <span className="text-2xs font-mono text-teal-300 font-bold">{ds.provenance.sourceOrgShort}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-ice-300 transition-colors line-clamp-1">
                      {ds.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
                      {ds.studentSummary || ds.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-polar-800">
                    <span className="text-2xs text-slate-400 font-mono">DOI: {ds.provenance.doi || '10.5067/NCPOR'}</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('data', ds.id)}
                      className="px-4 py-2 rounded-xl bg-ice-400 hover:bg-ice-300 text-polar-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                    >
                      <span>Explore Telemetry</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PART 11 — FEATURED PEER-REVIEWED RESEARCH */}
        {connectedPapers.length > 0 && (
          <div className="space-y-6 border-b border-polar-800 pb-10">
            <div>
              <div className="text-2xs font-mono font-bold uppercase tracking-widest text-teal-300 mb-1">
                04 · PEER-REVIEWED PUBLICATIONS
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Landmark Publications Produced by {station.name}
              </h3>
            </div>

            {/* Featured Publication Spotlight */}
            {featuredPaper && (
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-polar-900 to-polar-950 border border-teal-500/40 space-y-4 shadow-2xl">
                <div className="flex items-center gap-2 text-2xs font-mono text-teal-300 font-bold uppercase tracking-widest">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <span>FEATURED LANDMARK STUDY ({featuredPaper.year})</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {featuredPaper.title}
                </h4>

                <div className="text-xs text-slate-300 font-mono">
                  {featuredPaper.authors.join(', ')} • <span className="text-teal-300">{featuredPaper.journal}</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
                  {featuredPaper.abstract}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 border-t border-polar-800">
                  <button
                    type="button"
                    onClick={() => onNavigate('research', featuredPaper.id)}
                    className="px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-polar-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-md"
                  >
                    <span>Read Landmark Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-2xs font-mono text-slate-400">
                    DOI: {featuredPaper.doi}
                  </span>
                </div>
              </div>
            )}

            {/* Secondary Papers List */}
            {secondaryPapers.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-2xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Additional Peer-Reviewed Publications ({secondaryPapers.length})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {secondaryPapers.map((paper) => (
                    <div
                      key={paper.id}
                      onClick={() => onNavigate('research', paper.id)}
                      className="p-4 rounded-2xl bg-polar-900/80 border border-polar-800 hover:border-teal-400/50 transition-all cursor-pointer flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-bold text-white line-clamp-1">{paper.title}</div>
                        <div className="text-2xs font-mono text-slate-400 mt-0.5">{paper.journal} ({paper.year})</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PART 12 — EXPANDABLE COMPACT SCIENTIFIC PROVENANCE */}
        {station.provenance && (
          <div className="border-b border-polar-800 pb-10 space-y-4">
            <button
              type="button"
              onClick={() => setIsProvenanceExpanded(!isProvenanceExpanded)}
              className="w-full p-4 rounded-2xl bg-polar-900/60 border border-polar-800 hover:border-polar-700 flex items-center justify-between text-xs font-mono text-slate-300 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SCIENTIFIC SOURCES & PROVENANCE METADATA</span>
              </div>
              <div className="flex items-center gap-2 text-2xs text-ice-300">
                <span>{isProvenanceExpanded ? 'Hide Sources' : 'View Verified Sources & Citations'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isProvenanceExpanded ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {isProvenanceExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <ProvenanceBadge provenance={station.provenance} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* PART 13 — CONTINUE THE EXPEDITION (NEXT DESTINATION CARD) */}
        <div className="pt-4">
          <div
            onClick={() => onSelectStation(nextStation)}
            className="p-8 rounded-3xl bg-gradient-to-r from-polar-900 via-polar-900 to-polar-950 border border-ice-400/50 hover:border-ice-400 shadow-2xl cursor-pointer group transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="text-2xs font-mono text-ice-300 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span>NEXT EXPEDITION DESTINATION</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white group-hover:text-ice-300 transition-colors">
                  {nextStation.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans leading-relaxed">
                  {nextStation.subRegion} • {nextStation.region}
                </p>
              </div>

              <button
                type="button"
                className="px-6 py-3.5 rounded-2xl bg-ice-400 group-hover:bg-ice-300 text-polar-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shrink-0 transition-colors shadow-lg"
              >
                <span>Continue Expedition to {nextStation.name.replace(' Research Station', '').replace(' Station', '')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

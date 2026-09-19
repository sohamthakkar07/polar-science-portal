import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, MapPin, Calendar, Globe2, Compass, Award, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavTab } from '../layout/Navbar';

interface IndiaPolarBannerProps {
  onNavigate: (tab: NavTab) => void;
}

interface Milestone {
  year: string;
  name: string;
  subtitle: string;
  region: 'Antarctic' | 'Arctic' | 'Himalayan';
  coordinates: string;
  details: string;
  achievement: string;
}

const milestones: Milestone[] = [
  {
    year: '1981',
    name: 'First Antarctic Expedition',
    subtitle: 'Expedition led by Dr. S. Z. Qasim',
    region: 'Antarctic',
    coordinates: '70°05′ S, 12°00′ E',
    details: 'M/V Dakshin Gangotri sailed from Goa on Dec 6, 1981, landing on Antarctic ice shelf on Jan 9, 1982.',
    achievement: 'Established India as an Antarctic Treaty Consultative Party member.'
  },
  {
    year: '1983',
    name: 'Dakshin Gangotri Station',
    subtitle: 'First Permanent Station',
    region: 'Antarctic',
    coordinates: '70°05′ S, 12°00′ E',
    details: 'Constructed during the 3rd Antarctic Expedition; operated as India’s first year-round Antarctic station.',
    achievement: 'Initiated continuous meterological and ionospheric observational records.'
  },
  {
    year: '1989',
    name: 'Maitri Station',
    subtitle: 'Schirmacher Oasis Observatory',
    region: 'Antarctic',
    coordinates: '70°45′ S, 11°44′ E',
    details: 'Built on ice-free rocky terrain in Schirmacher Oasis with Priyadarshini freshwater lake supply.',
    achievement: '34+ years of continuous ozone, glaciological, and magnetospheric telemetry.'
  },
  {
    year: '2008',
    name: 'Himadri Station',
    subtitle: 'Svalbard Arctic Observatory',
    region: 'Arctic',
    coordinates: '78°55′ N, 11°56′ E',
    details: 'Established at Ny-Ålesund, Svalbard (78°N) to study Arctic atmospheric dynamics and fjord hydrology.',
    achievement: 'Pioneered Indian Arctic research into marine aerosol chemistry and glacier melt.'
  },
  {
    year: '2012',
    name: 'Bharati Station',
    subtitle: 'Larsemann Hills State-of-the-Art Base',
    region: 'Antarctic',
    coordinates: '69°24′ S, 76°11′ E',
    details: 'Designed with pre-fabricated shipping containers; features a zero-emission thermal recycling plant.',
    achievement: 'Enables oceanographic sampling, ocean current profiling, and space weather studies.'
  },
  {
    year: '2014',
    name: 'IndARC Subsurface Mooring',
    subtitle: 'Kongsfjorden Fjord Observatory',
    region: 'Arctic',
    coordinates: '78°54′ N, 11°53′ E',
    details: 'India’s first multi-sensor underwater mooring deployed at 192m depth in the Arctic Ocean.',
    achievement: 'Collects year-round salinity, temperature, and current profile telemetry.'
  },
  {
    year: '2016',
    name: 'Himansh Observatory',
    subtitle: 'High Himalayas (4,080m Altitude)',
    region: 'Himalayan',
    coordinates: '32°24′ N, 77°38′ E',
    details: 'Stationed at Sutri Dhaka in Lahaul-Spiti, Himachal Pradesh at an elevation of 4,080 meters.',
    achievement: 'Monitors Third Pole glacier mass balance, velocity, and supraglacial melt lakes.'
  }
];

export const IndiaPolarBanner: React.FC<IndiaPolarBannerProps> = ({ onNavigate }) => {
  const [activeYear, setActiveYear] = useState<string>('1989');
  const activeMilestone = milestones.find(m => m.year === activeYear) || milestones[2];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative" aria-label="India Polar Journey">
      <div className="bg-gradient-to-b from-polar-900/90 via-polar-900 to-polar-950 border border-orange-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl space-y-10 relative overflow-hidden">
        
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-polar-lines opacity-10 pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-2 border-orange-400 pl-4 relative z-10">
          <div>
            <div className="text-2xs font-mono font-bold uppercase tracking-widest text-orange-400 flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-400" />
              <span>STAGE 05 · NATIONAL POLAR PROGRAMME · MoES & NCPOR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
              India’s Historic Journey Across Three Polar Frontiers 🇮🇳
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-2 leading-relaxed">
              45+ years of continuous high-latitude observational science spanning Antarctica, Svalbard, and the High Himalayas.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('india')}
              className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-polar-950 font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all"
            >
              <span>Explore India's Polar Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* EXPEDITION TIMELINE TRACK */}
        <div className="space-y-6 relative z-10">
          <div className="text-2xs font-mono text-slate-400 uppercase tracking-widest font-bold">
            HISTORICAL TIMELINE MILESTONES (1981 – 2016):
          </div>

          {/* Timeline Nodes Bar */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-polar-800 -translate-y-1/2 z-0 hidden md:block" />

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 relative z-10">
              {milestones.map((m) => {
                const isSelected = activeYear === m.year;

                return (
                  <motion.button
                    key={m.year}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveYear(m.year)}
                    className={`p-3 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                      isSelected
                        ? 'bg-orange-500 text-polar-950 border-orange-400 font-extrabold shadow-lg shadow-orange-500/20 ring-2 ring-orange-400/40'
                        : 'bg-polar-950 hover:bg-polar-850 text-white border-polar-800 hover:border-orange-500/50'
                    }`}
                  >
                    <span className="text-lg font-mono font-black">{m.year}</span>
                    <span className={`text-[10px] font-mono line-clamp-1 ${isSelected ? 'text-polar-950 font-bold' : 'text-slate-400'}`}>
                      {m.name.split(' ')[0]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE MILESTONE INSPECTOR PANEL */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.year}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-polar-950 rounded-2xl border border-polar-750 p-6 md:p-8 space-y-6 shadow-xl relative"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-polar-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl md:text-3xl font-black font-mono text-orange-400">{activeMilestone.year}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{activeMilestone.name}</h3>
                  </div>
                  <div className="text-xs font-mono text-slate-400">{activeMilestone.subtitle}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-polar-900 border border-polar-750 text-teal-300">
                    📍 {activeMilestone.coordinates}
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
                    {activeMilestone.region}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
                <div className="space-y-2">
                  <span className="text-2xs font-mono text-slate-400 uppercase tracking-widest font-semibold">EXPEDITION & STATION SUMMARY</span>
                  <p className="leading-relaxed font-normal">{activeMilestone.details}</p>
                </div>

                <div className="space-y-2 bg-polar-900/60 p-4 rounded-xl border border-polar-800">
                  <span className="text-2xs font-mono text-orange-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-orange-400" />
                    <span>Key Scientific Breakthrough</span>
                  </span>
                  <p className="text-xs leading-relaxed text-white font-medium">{activeMilestone.achievement}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Verified MoES / NCPOR Historical Archives</span>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="text-xs font-mono font-bold text-ice-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-ice-400" />
                  <span>Locate Station on Stereographic Map →</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ArrowRight, Layers, ThermometerSnowflake, Globe2, Waves, Wind, Compass, Sparkles, BookOpen, ChevronRight, Zap, Database, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PolarTopic } from '../../types/polar';
import { NavTab } from '../layout/Navbar';

interface PolarTopicGridProps {
  onSelectTopic: (topic: PolarTopic) => void;
  onNavigate: (tab: NavTab) => void;
}

interface TopicItem {
  id: PolarTopic;
  title: string;
  tagline: string;
  stats: string;
  domain: string;
  icon: React.FC<{ className?: string }>;
  mechanism: string;
  accentBg: string;
}

const topics: TopicItem[] = [
  {
    id: 'Cryosphere',
    title: 'Cryosphere & Sea Ice Dynamics',
    tagline: 'Sea ice thermodynamics, ice sheet stability, permafrost thaw, and ice-albedo atmospheric feedback loops.',
    stats: '1979–2024 · NSIDC Record',
    domain: 'Antarctic & Arctic Oceans',
    icon: ThermometerSnowflake,
    mechanism: 'Polar sea ice reflects 80%+ of solar radiation. Melting ice exposes dark ocean water, increasing heat absorption by 90%.',
    accentBg: 'from-ice-900/60 via-polar-900 to-polar-950 border-ice-400/60'
  },
  {
    id: 'Climate',
    title: 'Paleoclimate & Atmospheric Physics',
    tagline: 'Polar amplification, jet stream modulation, polar vortex dynamics, and deep ice core paleoclimate records.',
    stats: '800,000-yr Ice Core · EPICA',
    domain: 'Global Polar Atmosphere',
    icon: Wind,
    mechanism: 'Ice cores trap atmospheric bubbles across 800,000 years, providing pristine greenhouse gas concentrations over glacial cycles.',
    accentBg: 'from-teal-900/60 via-polar-900 to-polar-950 border-teal-400/60'
  },
  {
    id: 'Ocean',
    title: 'Polar Oceanography & Currents',
    tagline: 'Antarctic Circumpolar Current, deep ocean water formation, and Kongsfjorden Atlantic ocean water intrusions.',
    stats: 'Argo Floats · IndARC Observatory',
    domain: 'Southern & Arctic Ocean',
    icon: Waves,
    mechanism: 'Freezing sea ice expels dense brine, forming Antarctic Bottom Water (AABW) which drives the global thermohaline conveyor.',
    accentBg: 'from-cyan-900/60 via-polar-900 to-polar-950 border-cyan-400/60'
  },
  {
    id: 'Atmosphere',
    title: 'Stratospheric Chemistry & Ozone',
    tagline: 'Stratospheric ozone depletion chemistry, Dobson spectrophotometry, polar night vortex, and auroral physics.',
    stats: 'Halley VI · Maitri Telemetry',
    domain: 'Antarctic & Arctic Stratosphere',
    icon: Layers,
    mechanism: 'Extreme polar stratospheric clouds (PSCs) trigger catalytic chlorine activation during the dark polar spring night.',
    accentBg: 'from-indigo-900/60 via-polar-900 to-polar-950 border-indigo-400/60'
  },
  {
    id: 'Polar Life',
    title: 'Polar Biology & Extremophiles',
    tagline: 'Emperor penguin fast-ice colonies, polar bear hunting ecology, microbial extremophiles, and krill biomass.',
    stats: 'SCAR · GBIF · OBIS Registry',
    domain: 'Southern & Arctic Ecosystems',
    icon: Globe2,
    mechanism: 'Antarctic krill form the foundation of Southern Ocean food webs, sequestering gigatons of carbon into deep benthic sediments.',
    accentBg: 'from-emerald-900/60 via-polar-900 to-polar-950 border-emerald-400/60'
  },
  {
    id: 'Remote Sensing',
    title: 'Satellite Lidar & Telemetry',
    tagline: 'ICESat-2 photon lidar, passive microwave radiometers, Sentinel SAR, and ISRO polar telemetry.',
    stats: 'NASA Earthdata · ISRO Ground',
    domain: 'Orbital Telemetry / Global',
    icon: Sparkles,
    mechanism: 'ICESat-2 fires 10,000 laser pulses per second to measure polar ice sheet elevation changes down to centimeter precision.',
    accentBg: 'from-sky-900/60 via-polar-900 to-polar-950 border-sky-400/60'
  },
  {
    id: 'Glaciers',
    title: 'Himalayan High-Altitude Glaciology',
    tagline: 'High-altitude Himalayan glacier mass balance, velocity mapping, terminus retreat, and supraglacial lakes.',
    stats: 'NCPOR Himansh · 4,080m Station',
    domain: 'Himalayas / Third Pole',
    icon: Compass,
    mechanism: 'The Third Pole feeds Asia’s 10 major river systems; Himalayan glaciers exhibit distinct debris-cover melt dynamics.',
    accentBg: 'from-orange-900/60 via-polar-900 to-polar-950 border-orange-400/60'
  },
  {
    id: 'Research',
    title: 'Peer-Reviewed DOIs & Literature',
    tagline: 'Open-access peer-reviewed literature, DOI registries, citations, and multi-institutional polar campaigns.',
    stats: 'Nature · JGR · Polar Science',
    domain: 'International Registries',
    icon: BookOpen,
    mechanism: 'Grounded citation indices connect observational datasets directly with high-impact peer-reviewed literature.',
    accentBg: 'from-purple-900/60 via-polar-900 to-polar-950 border-purple-400/60'
  },
];

export const PolarTopicGrid: React.FC<PolarTopicGridProps> = ({ onSelectTopic, onNavigate }) => {
  const [featuredId, setFeaturedId] = useState<PolarTopic>(topics[0].id);
  const featuredTopic = topics.find(t => t.id === featuredId) || topics[0];
  const FeaturedIcon = featuredTopic.icon;

  const supportingTopics = topics.filter(t => t.id !== featuredId);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative" aria-label="Polar Topic Exploration">
      {/* Section Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-2 border-ice-400 pl-4">
        <div>
          <div className="text-2xs font-mono font-bold uppercase tracking-widest text-ice-300">
            STAGE 04 · SCIENTIFIC CORE DOMAINS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Explore Polar Disciplines
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-2 leading-relaxed">
            Eight interconnected research domains bridging satellite telemetry, ice core archives, oceanographic moorings, and high-altitude Himalayan glaciology.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('data')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-polar-900 hover:bg-polar-850 border border-polar-750 text-xs font-mono font-bold text-ice-300 hover:text-white transition-all cursor-pointer shrink-0 shadow-sm"
        >
          <span>View All 34 Datasets</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ASYMMETRIC EDITORIAL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT COLUMN: LARGE FEATURED TOPIC SPOTLIGHT */}
        <div className="lg:col-span-6 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={featuredTopic.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className={`bg-gradient-to-b ${featuredTopic.accentBg} rounded-3xl border p-8 shadow-2xl space-y-6 relative overflow-hidden flex flex-col justify-between`}
              style={{ minHeight: '440px' }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-polar-950/80 border border-polar-750 text-teal-300 text-xs font-mono font-bold">
                    <FeaturedIcon className="w-4 h-4 text-ice-400" />
                    <span>{featuredTopic.domain}</span>
                  </div>
                  <span className="text-2xs font-mono text-slate-400 uppercase tracking-wider">
                    FEATURED DOMAIN
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {featuredTopic.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  {featuredTopic.tagline}
                </p>

                {/* Key Mechanism Detail */}
                <div className="p-4 rounded-2xl bg-polar-950/90 border border-polar-800 space-y-2">
                  <div className="flex items-center gap-2 text-2xs font-mono font-bold text-ice-300 uppercase tracking-wider">
                    <Zap className="w-4 h-4 text-teal-400" />
                    <span>Scientific Mechanism</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {featuredTopic.mechanism}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-polar-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-2xs font-mono text-slate-400">
                  <span>Record: </span>
                  <span className="text-white font-bold">{featuredTopic.stats}</span>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectTopic(featuredTopic.id)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-ice-400 hover:bg-ice-300 text-polar-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <span>Explore {featuredTopic.id} Datasets</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: ASYMMETRIC SUPPORTING DOMAIN CARDS & STRIPES */}
        <div className="lg:col-span-6 space-y-3">
          <div className="text-2xs font-mono text-slate-400 font-bold uppercase tracking-wider mb-2">
            SELECT A SCIENTIFIC DOMAIN TO FEATURE:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topics.map((t) => {
              const Icon = t.icon;
              const isSelected = t.id === featuredId;

              return (
                <motion.div
                  key={t.id}
                  whileHover={{ y: -2 }}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setFeaturedId(t.id);
                      onSelectTopic(t.id);
                    }
                  }}
                  onClick={() => {
                    setFeaturedId(t.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 group ${
                    isSelected
                      ? 'bg-polar-900 border-ice-400 ring-1 ring-ice-400/30 shadow-lg'
                      : 'bg-polar-900/50 hover:bg-polar-850 border-polar-800 hover:border-polar-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-ice-500/20 text-ice-300' : 'bg-polar-950 text-slate-400 group-hover:text-white'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-ice-300 transition-colors leading-snug">
                        {t.id}
                      </h4>
                    </div>

                    <span className="text-3xs font-mono px-2 py-0.5 rounded bg-polar-950 text-teal-400 border border-polar-800">
                      {t.domain.split(' ')[0]}
                    </span>
                  </div>

                  <p className="text-2xs text-slate-300 line-clamp-2 leading-relaxed">
                    {t.tagline}
                  </p>

                  <div className="flex items-center justify-between text-3xs font-mono text-slate-400 pt-2 border-t border-polar-800/60">
                    <span className="truncate max-w-[140px]">{t.stats.split('·')[0]}</span>
                    <span className="text-ice-300 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <span>View</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

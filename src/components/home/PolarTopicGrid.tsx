import React, { useState } from 'react';
import { ArrowRight, Layers, ThermometerSnowflake, Globe2, Waves, Wind, Compass, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
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
}

const topics: TopicItem[] = [
  {
    id: 'Cryosphere',
    title: 'Cryosphere & Sea Ice',
    tagline: 'Sea ice thermodynamics, ice sheet stability, permafrost thaw, and ice-albedo atmospheric feedback loops.',
    stats: '1979–2024 · NSIDC Record',
    domain: 'Antarctic & Arctic Oceans',
    icon: ThermometerSnowflake,
  },
  {
    id: 'Climate',
    title: 'Paleoclimate & Atmospheric Physics',
    tagline: 'Polar amplification, jet stream modulation, polar vortex dynamics, and deep ice core paleoclimate records.',
    stats: '800,000-yr Ice Core · EPICA',
    domain: 'Global Polar Atmosphere',
    icon: Wind,
  },
  {
    id: 'Ocean',
    title: 'Polar Oceanography',
    tagline: 'Antarctic Circumpolar Current, deep ocean water formation, and Kongsfjorden Atlantic ocean water intrusions.',
    stats: 'Argo Floats · IndARC Observatory',
    domain: 'Southern & Arctic Ocean',
    icon: Waves,
  },
  {
    id: 'Atmosphere',
    title: 'Stratospheric Chemistry & Ozone',
    tagline: 'Stratospheric ozone depletion chemistry, Dobson spectrophotometry, polar night vortex, and auroral physics.',
    stats: 'Halley VI · Maitri Telemetry',
    domain: 'Antarctic & Arctic Stratosphere',
    icon: Layers,
  },
  {
    id: 'Polar Life',
    title: 'Polar Biology & Ecology',
    tagline: 'Emperor penguin fast-ice colonies, polar bear hunting ecology, microbial extremophiles, and krill biomass.',
    stats: 'SCAR · GBIF · OBIS Registry',
    domain: 'Southern & Arctic Ecosystems',
    icon: Globe2,
  },
  {
    id: 'Remote Sensing',
    title: 'Satellite Remote Sensing',
    tagline: 'ICESat-2 photon lidar, passive microwave radiometers, Sentinel SAR, and ISRO polar telemetry.',
    stats: 'NASA Earthdata · ISRO Polar Ground',
    domain: 'Orbital Telemetry / Global',
    icon: Sparkles,
  },
  {
    id: 'Glaciers',
    title: 'Himalayan Glaciology',
    tagline: 'High-altitude Himalayan glacier mass balance, velocity mapping, terminus retreat, and supraglacial lakes.',
    stats: 'NCPOR Himansh · 4,080m Station',
    domain: 'Himalayas / Third Pole',
    icon: Compass,
  },
  {
    id: 'Research',
    title: 'Peer-Reviewed Research',
    tagline: 'Open-access peer-reviewed literature, DOI registries, citations, and multi-institutional polar campaigns.',
    stats: 'Nature · JGR · Polar Science',
    domain: 'International Registries',
    icon: BookOpen,
  },
];

export const PolarTopicGrid: React.FC<PolarTopicGridProps> = ({ onSelectTopic, onNavigate }) => {
  const [activeTopicId, setActiveTopicId] = useState<PolarTopic>(topics[0].id);
  const activeTopic = topics.find(t => t.id === activeTopicId) || topics[0];
  const ActiveIcon = activeTopic.icon;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
      {/* Section header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-ice-400" aria-hidden="true" />
            <span className="text-2xs font-mono font-semibold tracking-widest uppercase text-ice-400">
              Scientific Core Domains
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Polar Science by Research Domain
          </h2>
        </div>
        <button
          onClick={() => onNavigate('learn')}
          className="inline-flex items-center gap-2 text-xs font-mono text-ice-400 hover:text-ice-300 transition-colors bg-polar-900 border border-polar-800 hover:border-ice-500/40 px-4 py-2 rounded-lg"
        >
          <span>View All Educational Modules</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Main Bento & Grid card container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-polar-900/60 border border-polar-800 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-glass">

        {/* Left: Domain selectors (Bento list) */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-2 max-h-[500px] overflow-y-auto pr-1 no-scrollbar">
          {topics.map((topic, idx) => {
            const isActive = activeTopicId === topic.id;
            const Icon = topic.icon;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopicId(topic.id)}
                className={`
                  w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 group
                  ${isActive
                    ? 'bg-polar-800 border-ice-500/50 shadow-inner'
                    : 'bg-polar-950/60 border-polar-800/80 hover:bg-polar-850 hover:border-polar-750'
                  }
                `}
                aria-pressed={isActive}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border transition-colors ${isActive ? 'bg-ice-500/20 border-ice-400/40 text-ice-300' : 'bg-polar-900 border-polar-800 text-slate-400 group-hover:text-white'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                      {topic.title}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">{topic.domain}</div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-ice-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Right: Active domain preview panel */}
        <div className="lg:col-span-7 bg-polar-950/80 border border-polar-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle grid accent background */}
          <div className="absolute inset-0 bg-polar-grid opacity-30 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-polar-900 border border-ice-500/30 text-ice-300 text-2xs font-mono">
                <ActiveIcon className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider">{activeTopic.stats}</span>
              </div>
              <span className="text-2xs font-mono text-slate-500">PROVENANCE VERIFIED</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
              {activeTopic.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-8 max-w-reading">
              {activeTopic.tagline}
            </p>

            <div className="p-4 rounded-lg bg-polar-900/90 border border-polar-800 space-y-2 mb-8">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">Primary Observatory:</span>
                <span className="font-semibold text-slate-200">{activeTopic.domain}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">Primary Focus:</span>
                <span className="font-semibold text-teal-400">{activeTopic.stats}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-4 pt-6 border-t border-polar-800">
            <button
              onClick={() => onSelectTopic(activeTopic.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ice-500 hover:bg-ice-400 active:scale-[0.98] text-polar-950 font-bold text-xs rounded-lg transition-all shadow-sm cursor-pointer"
            >
              <span>Explore {activeTopic.title} Datasets</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => onNavigate('learn')}
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Interactive Modules →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

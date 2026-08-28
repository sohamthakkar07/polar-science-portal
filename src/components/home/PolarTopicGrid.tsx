import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
}

const topics: TopicItem[] = [
  {
    id: 'Cryosphere',
    title: 'Cryosphere',
    tagline: 'Sea ice thermodynamics, ice sheet stability, permafrost thaw, and albedo feedbacks.',
    stats: '1979–2024 · NSIDC',
    domain: 'Antarctic & Arctic',
  },
  {
    id: 'Climate',
    title: 'Climate',
    tagline: 'Polar amplification, jet stream modulation, polar vortex dynamics, and paleoclimate ice cores.',
    stats: '800,000-yr record · EPICA',
    domain: 'Global / Antarctic',
  },
  {
    id: 'Ocean',
    title: 'Ocean',
    tagline: 'Antarctic Circumpolar Current, deep water formation, and Kongsfjorden Atlantic water intrusions.',
    stats: 'Argo Floats · IndARC',
    domain: 'Southern & Arctic Ocean',
  },
  {
    id: 'Atmosphere',
    title: 'Atmosphere',
    tagline: 'Stratospheric ozone chemistry, Dobson spectrophotometry, polar night vortex, and auroral physics.',
    stats: 'Halley VI · Maitri',
    domain: 'Antarctic & Arctic',
  },
  {
    id: 'Polar Life',
    title: 'Polar Life',
    tagline: 'Emperor penguin fast-ice colonies, polar bear hunting ecology, and Antarctic krill swarms.',
    stats: 'SCAR · GBIF · OBIS',
    domain: 'Antarctic & Arctic',
  },
  {
    id: 'Remote Sensing',
    title: 'Remote Sensing',
    tagline: 'ICESat-2 photon lidar, passive microwave radiometers, and ISRO polar ground telemetry.',
    stats: 'NASA Earthdata · ISRO',
    domain: 'Satellite / Global',
  },
  {
    id: 'Glaciers',
    title: 'Glaciers',
    tagline: 'High Himalayan glacier mass balances, ice velocity, terminus retreat, and supraglacial lakes.',
    stats: 'NCPOR Himansh · 4,080m',
    domain: 'Himalayan / Third Pole',
  },
  {
    id: 'Research',
    title: 'Research',
    tagline: 'Peer-reviewed polar discoveries, DOI registries, and international polar science collaborations.',
    stats: 'Nature · JGR · Polar Science',
    domain: 'Global',
  },
  {
    id: 'Indian Polar Programme',
    title: 'Indian Polar Programme',
    tagline: 'Historical timeline from Operation Gangotri (1981) to Maitri, Bharati, Himadri, and Himansh.',
    stats: '43 expeditions · 4 stations',
    domain: 'Antarctic · Arctic · Himalaya',
  },
];

export const PolarTopicGrid: React.FC<PolarTopicGridProps> = ({ onSelectTopic, onNavigate }) => {
  const [activeTopicId, setActiveTopicId] = useState<PolarTopic>(topics[0].id);
  const activeTopic = topics.find(t => t.id === activeTopicId) || topics[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Section header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-px bg-ice-400" aria-hidden="true" />
          <span className="text-2xs font-medium tracking-widest uppercase text-ice-400">
            Scientific Domains
          </span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white max-w-lg">
            Explore Polar Science by Domain
          </h2>
          <button
            onClick={() => onNavigate('learn')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors shrink-0"
          >
            All learning modules
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Split layout: topic list + detail panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-ink-700">

        {/* Left: topic index list */}
        <div className="lg:col-span-2 border-r border-ink-700">
          <nav aria-label="Scientific domains">
            {topics.map((topic, idx) => {
              const isActive = activeTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`
                    w-full text-left px-5 py-4 border-b border-ink-700 last:border-b-0 
                    transition-colors duration-100 flex items-start justify-between gap-3 group
                    ${isActive
                      ? 'bg-ink-800 border-l-2 border-l-ice-400 pl-4.5'
                      : 'hover:bg-ink-800/50 border-l-2 border-l-transparent'
                    }
                  `}
                  aria-pressed={isActive}
                >
                  <div>
                    <div className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                      {topic.title}
                    </div>
                    <div className="text-2xs text-slate-600 mt-0.5 font-mono">{topic.domain}</div>
                  </div>
                  <span className={`text-2xs font-mono shrink-0 mt-0.5 transition-colors ${isActive ? 'text-ice-400' : 'text-slate-600'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: detail panel */}
        <div className="lg:col-span-3 p-8 flex flex-col justify-between">
          <div>
            <div className="text-2xs font-mono text-ice-400 tracking-widest uppercase mb-4">
              {activeTopic.stats}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              {activeTopic.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-reading mb-8">
              {activeTopic.tagline}
            </p>
            <div className="text-xs text-slate-500">
              <span className="font-medium text-slate-400">Geographic scope:</span>{' '}
              {activeTopic.domain}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-8 border-t border-ink-700 mt-8">
            <button
              onClick={() => onSelectTopic(activeTopic.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ice-500 hover:bg-ice-400 text-polar-950 font-semibold text-sm rounded-md transition-colors"
            >
              Explore {activeTopic.title} Data
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => onNavigate('learn')}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Learning modules →
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: simple list below */}
      <div className="lg:hidden mt-4">
        <button
          onClick={() => onNavigate('learn')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          View all learning modules
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

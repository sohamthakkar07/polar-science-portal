import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ShieldCheck, MapPin, Heart, AlertTriangle, ExternalLink, ArrowRight, Globe2, Radio, Database } from 'lucide-react';
import { POLAR_SPECIES } from '../../data/biodiversity';
import { Species } from '../../types/polar';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { NavTab } from '../layout/Navbar';
import { LearningEnvironment } from '../learn/LearningEnvironment';
import { ImmersiveMediaGallery } from '../media/ImmersiveMediaGallery';

interface PolarLifeProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialSpeciesId?: string;
}

export const PolarLife: React.FC<PolarLifeProps> = ({ onNavigate, initialSpeciesId }) => {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>(
    initialSpeciesId && POLAR_SPECIES.some((s) => s.id === initialSpeciesId)
      ? initialSpeciesId
      : POLAR_SPECIES[0].id
  );

  useEffect(() => {
    if (initialSpeciesId && POLAR_SPECIES.some((s) => s.id === initialSpeciesId)) {
      setSelectedSpeciesId(initialSpeciesId);
    }
  }, [initialSpeciesId]);

  const activeSpecies: Species = POLAR_SPECIES.find((s) => s.id === selectedSpeciesId) || POLAR_SPECIES[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Least Concern':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Near Threatened':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Vulnerable':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'Endangered':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-polar-800 text-slate-300 border-polar-750';
    }
  };

  const speciesImages = activeSpecies.imageGallery && activeSpecies.imageGallery.length > 0
    ? activeSpecies.imageGallery
    : [activeSpecies.imageUrl];

  return (
    <LearningEnvironment theme="ocean-climate">
      <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* FIELD ARCHIVE HEADER */}
        <div className="border-b border-polar-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-polar-900/90 border border-teal-400/40 text-teal-300 text-2xs font-mono font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
              <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span>SCAR & OBIS BIODIVERSITY FIELD ARCHIVE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Polar Species & Field Archive
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-2 leading-relaxed">
              Documented physiological adaptations, polar habitat distributions, and IUCN Red List conservation statuses across Southern Ocean and High Arctic ecosystems.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400">
            <span className="font-bold text-white text-base font-mono">{POLAR_SPECIES.length}</span>
            <span> species documented</span>
          </div>
        </div>

        {/* SPECIES SELECTION GRID (FIELD TILE CARDS) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {POLAR_SPECIES.map((species) => {
            const isSelected = selectedSpeciesId === species.id;
            return (
              <motion.button
                key={species.id}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSpeciesId(species.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-polar-850 border-ice-400 shadow-xl ring-2 ring-ice-400/40'
                    : 'bg-polar-900/90 border-polar-750 hover:bg-polar-850 hover:border-polar-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>{species.commonName}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-ice-400 animate-ping" />}
                  </div>
                  <div className="text-[11px] text-teal-400 font-mono italic truncate">
                    {species.scientificName}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-polar-800 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">{species.region}</span>
                  <span className={`px-2 py-0.5 rounded border ${getStatusColor(species.conservationStatus)}`}>
                    {species.conservationStatus}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ACTIVE SPECIES DISPLAY CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpecies.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-polar-900/90 border border-polar-750 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Left Column: Rotating Interactive Media Anchor */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-polar-800">
              <ImmersiveMediaGallery
                images={speciesImages}
                title={activeSpecies.commonName}
                subtitle={activeSpecies.scientificName}
                badgeText={`FIELD OBSERVATION · IUCN: ${activeSpecies.conservationStatus}`}
                autoPlayInterval={5000}
                aspectRatioClassName="min-h-[360px] lg:min-h-[520px] h-full w-full rounded-none"
              />
            </div>

            {/* Right Column: Scientific Field Data & Adaptations */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                
                {/* Geographic & Habitat Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-2xl bg-polar-950 border border-polar-800">
                    <div className="text-3xs uppercase font-bold text-slate-400">Primary Habitat</div>
                    <div className="text-xs font-bold text-white mt-1">{activeSpecies.habitat}</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-polar-950 border border-polar-800">
                    <div className="text-3xs uppercase font-bold text-slate-400">Region</div>
                    <div className="text-xs font-bold text-ice-300 mt-1">{activeSpecies.region}</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-polar-950 border border-polar-800 col-span-2 sm:col-span-1">
                    <div className="text-3xs uppercase font-bold text-slate-400">Group / Taxonomy</div>
                    <div className="text-xs font-bold text-teal-300 mt-1">{activeSpecies.group}</div>
                  </div>
                </div>

                {/* Species Overview */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                    Field Description & Ecological Overview
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans bg-polar-950/80 p-5 rounded-2xl border border-polar-800">
                    {activeSpecies.overview}
                  </p>
                </div>

                {/* Key Physiological Adaptations */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                    Key Polar Adaptations
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeSpecies.adaptations.map((adapt: string, idx: number) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-polar-950/90 border border-polar-800 text-xs text-slate-300 flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
                        <span>{adapt}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Provenance Badge */}
              <div className="pt-6 border-t border-polar-800 space-y-4">
                <ProvenanceBadge provenance={activeSpecies.provenance} />
                
                {/* Contextual Gateway */}
                <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => onNavigate('learn')}
                    className="px-4 py-2.5 rounded-xl bg-ice-400 hover:bg-ice-300 text-polar-950 font-bold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                  >
                    <span>Explore Polar Ecosystem Modules</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('data')}
                    className="px-4 py-2.5 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-750 text-slate-300 hover:text-white font-bold flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Database className="w-3.5 h-3.5 text-teal-400" />
                    <span>Inspect Ocean Telemetry</span>
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </LearningEnvironment>
  );
};

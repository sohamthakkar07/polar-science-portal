import React, { useState } from 'react';
import { Compass, ShieldCheck, MapPin, Heart, AlertTriangle, ExternalLink, ArrowRight } from 'lucide-react';
import { POLAR_SPECIES } from '../../data/biodiversity';
import { Species } from '../../types/polar';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';
import { NavTab } from '../layout/Navbar';

interface PolarLifeProps {
  onNavigate: (tab: NavTab, detailId?: string) => void;
  initialSpeciesId?: string;
}

export const PolarLife: React.FC<PolarLifeProps> = ({ onNavigate, initialSpeciesId }) => {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>(
    initialSpeciesId || POLAR_SPECIES[0].id
  );

  const activeSpecies = POLAR_SPECIES.find((s) => s.id === selectedSpeciesId) || POLAR_SPECIES[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Least Concern':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      case 'Near Threatened':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      case 'Vulnerable':
        return 'bg-orange-950/80 text-orange-300 border-orange-500/40';
      case 'Endangered':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/40';
      default:
        return 'bg-polar-800 text-slate-300 border-polar-700';
    }
  };

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-polar-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>SCAR & OBIS Biodiversity Clearing-House</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              🐧 Polar Life & Biodiversity
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Scientifically documented physiological adaptations, habitat distributions, and IUCN conservation statuses across the Arctic and Southern Oceans.
            </p>
          </div>
        </div>

        {/* Species Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {POLAR_SPECIES.map((species) => {
            const isSelected = selectedSpeciesId === species.id;
            return (
              <button
                key={species.id}
                onClick={() => setSelectedSpeciesId(species.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-polar-800 border-emerald-500 text-white shadow-lg'
                    : 'bg-polar-900 border-polar-800 text-slate-400 hover:bg-polar-850 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold text-slate-200">{species.commonName}</div>
                <div className="text-[10px] text-emerald-400 font-mono italic mt-0.5">{species.scientificName}</div>
                <div className="text-[10px] text-slate-500 mt-1">{species.region}</div>
              </button>
            );
          })}
        </div>

        {/* Active Species Detail Card */}
        <div className="bg-polar-900/90 rounded-3xl border border-polar-750 p-6 sm:p-8 shadow-2xl space-y-8 backdrop-blur-xl">
          {/* Header with Title & IUCN Status */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-polar-800 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-polar-800 border border-polar-700 text-frost-cyan">
                  {activeSpecies.group}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-polar-800 border border-polar-700 text-slate-300">
                  {activeSpecies.region}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(activeSpecies.conservationStatus)}`}>
                  IUCN: {activeSpecies.conservationStatus}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-mono">
                {activeSpecies.commonName}
              </h2>
              <p className="text-sm font-serif italic text-emerald-400 mt-0.5">
                {activeSpecies.scientificName}
              </p>
            </div>

            {activeSpecies.estimatedPopulation && (
              <div className="p-3 rounded-2xl bg-polar-950 border border-polar-800 text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Est. Population</div>
                <div className="text-xs font-bold text-slate-200 font-mono mt-0.5">{activeSpecies.estimatedPopulation}</div>
              </div>
            )}
          </div>

          {/* Overview & Adaptations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Ecological Profile</h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-polar-950/60 p-5 rounded-2xl border border-polar-800">
                  {activeSpecies.overview}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Extreme Cold Adaptations</h3>
                <ul className="space-y-2">
                  {activeSpecies.adaptations.map((a, i) => (
                    <li key={i} className="text-xs text-slate-300 p-3 rounded-xl bg-polar-950 border border-polar-800 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Side Ecology & Vulnerability */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Climate Change Vulnerability</span>
                </div>
                <p className="text-xs text-rose-200 leading-relaxed">
                  {activeSpecies.climateVulnerability}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-polar-950 border border-polar-800 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Habitat & Diet</h3>
                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong className="text-slate-400">Habitat: </strong>{activeSpecies.habitat}</div>
                  <div><strong className="text-slate-400">Diet: </strong>{activeSpecies.diet}</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-polar-950 border border-polar-800 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Documented Coordinates</h3>
                <div className="space-y-1.5">
                  {activeSpecies.coordinatesDistribution.map((coord, i) => (
                    <div key={i} className="text-[11px] text-slate-300 font-mono flex items-center justify-between">
                      <span>{coord.name}</span>
                      <span className="text-frost-cyan">
                        {Math.abs(coord.lat).toFixed(1)}°{coord.lat < 0 ? 'S' : 'N'}, {Math.abs(coord.lon).toFixed(1)}°{coord.lon < 0 ? 'W' : 'E'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Species Provenance Card */}
          <ProvenanceBadge provenance={activeSpecies.provenance} />
        </div>
      </div>
    </div>
  );
};

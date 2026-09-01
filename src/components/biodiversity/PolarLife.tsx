import React, { useState, useEffect } from 'react';
import { Compass, ShieldCheck, MapPin, Heart, AlertTriangle, ExternalLink, ArrowRight, Globe2 } from 'lucide-react';
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
    initialSpeciesId && POLAR_SPECIES.some((s) => s.id === initialSpeciesId)
      ? initialSpeciesId
      : POLAR_SPECIES[0].id
  );

  useEffect(() => {
    if (initialSpeciesId && POLAR_SPECIES.some((s) => s.id === initialSpeciesId)) {
      setSelectedSpeciesId(initialSpeciesId);
    }
  }, [initialSpeciesId]);

  const activeSpecies = POLAR_SPECIES.find((s) => s.id === selectedSpeciesId) || POLAR_SPECIES[0];

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

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-polar-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-polar-900 border border-ice-500/30 text-ice-300 text-2xs font-mono mb-3">
              <Globe2 className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider font-semibold">SCAR & OBIS Biodiversity Clearing-House</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Polar Life & Biodiversity
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
              Documented physiological adaptations, polar habitat distributions, and IUCN Red List conservation statuses across Antarctic and Arctic marine and terrestrial ecosystems.
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
                type="button"
                onClick={() => setSelectedSpeciesId(species.id)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-polar-850 border-ice-400 shadow-md ring-1 ring-ice-400/40'
                    : 'bg-polar-900/80 border-polar-800 hover:bg-polar-850 hover:border-polar-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">{species.commonName}</div>
                  <div className="text-2xs text-teal-400 font-mono italic mt-0.5">{species.scientificName}</div>
                </div>
                <div className="text-3xs text-slate-400 font-mono mt-3 pt-2 border-t border-polar-800/60">
                  {species.region}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Species Detail Card */}
        <div className="bg-polar-900/90 rounded-2xl border border-polar-800 p-6 sm:p-8 shadow-panel backdrop-blur-xl space-y-8">
          {/* Header with Title & IUCN Status */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-polar-800 pb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-2xs">
                <span className="px-2.5 py-0.5 rounded bg-ice-500/15 border border-ice-400/30 text-ice-300 font-semibold">
                  {activeSpecies.group}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-polar-950 border border-polar-750 text-slate-300">
                  {activeSpecies.region}
                </span>
                <span className={`px-2.5 py-0.5 rounded border font-semibold ${getStatusColor(activeSpecies.conservationStatus)}`}>
                  IUCN: {activeSpecies.conservationStatus}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {activeSpecies.commonName}
              </h2>
              <p className="text-sm font-mono italic text-teal-400 mt-1">
                {activeSpecies.scientificName}
              </p>
            </div>

            {activeSpecies.estimatedPopulation && (
              <div className="p-3.5 rounded-xl bg-polar-950 border border-polar-800 text-right font-mono shrink-0">
                <div className="text-3xs uppercase font-semibold text-slate-400">Est. Population</div>
                <div className="text-xs font-bold text-white mt-0.5">{activeSpecies.estimatedPopulation}</div>
              </div>
            )}
          </div>

          {/* Species Photography Area */}
          {activeSpecies.imageUrl && (
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-polar-800 bg-polar-950">
              <img
                src={activeSpecies.imageUrl}
                alt={activeSpecies.commonName}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover"
              />
              {activeSpecies.imageCredit && (
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-polar-950/90 border border-polar-750 text-3xs font-mono text-slate-300 backdrop-blur-md">
                  Photo Credit: {activeSpecies.imageCredit}
                </div>
              )}
            </div>
          )}

          {/* Overview & Adaptations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-2">Ecological Profile</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-polar-950/70 p-4 rounded-xl border border-polar-800">
                  {activeSpecies.overview}
                </p>
              </div>

              <div>
                <h3 className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-2">Extreme Cold Adaptations</h3>
                <div className="space-y-2">
                  {activeSpecies.adaptations.map((a, i) => (
                    <div key={i} className="text-xs text-slate-300 p-3 rounded-lg bg-polar-950 border border-polar-800 flex items-start gap-2">
                      <span className="text-teal-400 font-bold">•</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Side Ecology & Vulnerability */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-1.5 text-2xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Climate Change Vulnerability</span>
                </div>
                <p className="text-xs text-rose-200 leading-relaxed">
                  {activeSpecies.climateVulnerability}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-polar-950 border border-polar-800 space-y-2">
                <h3 className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400">Habitat & Diet</h3>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <div><strong className="text-slate-400 font-mono">Habitat: </strong>{activeSpecies.habitat}</div>
                  <div><strong className="text-slate-400 font-mono">Diet: </strong>{activeSpecies.diet}</div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-polar-950 border border-polar-800 space-y-2">
                <h3 className="text-2xs font-mono font-semibold uppercase tracking-widest text-slate-400">Documented Coordinates</h3>
                <div className="space-y-1.5">
                  {activeSpecies.coordinatesDistribution.map((coord, i) => (
                    <div key={i} className="text-xs text-slate-300 font-mono flex items-center justify-between">
                      <span>{coord.name}</span>
                      <span className="text-ice-400">
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

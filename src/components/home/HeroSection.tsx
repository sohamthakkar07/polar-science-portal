import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { NavTab } from '../layout/Navbar';

interface HeroSectionProps {
  onSelectTab: (tab: NavTab) => void;
}

/**
 * Hero section — editorial photography composition.
 * Uses a real NASA/Unsplash polar photograph as the visual anchor.
 * No aurora blobs, no gradient text, no glassmorphism.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  return (
    <section className="relative w-full overflow-hidden" aria-label="Hero">
      {/* Full-bleed polar photography */}
      <div
        className="relative w-full"
        style={{ minHeight: 'clamp(520px, 72vh, 820px)' }}
      >
        {/* Background image — Unsplash Antarctic/polar landscape */}
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format&fit=crop"
          alt="Antarctic ice landscape — polar research environment"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />

        {/* Dark overlay — gradient from bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(8,14,24,0.45) 0%, rgba(8,14,24,0.72) 60%, rgba(8,14,24,0.95) 100%)'
          }}
          aria-hidden="true"
        />

        {/* Content — positioned in bottom third for editorial look */}
        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-24">

            {/* Scientific platform tag */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-px bg-ice-400" aria-hidden="true" />
              <span className="text-2xs font-medium tracking-widest uppercase text-ice-400">
                Integrated Polar Science Platform
              </span>
            </div>

            {/* Primary headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight max-w-3xl mb-5">
              The Polar World<br />
              Is Full of Stories.
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-10 font-light">
              Explore real polar science, datasets, research, expeditions and discoveries 
              through an interactive experience designed for everyone.
            </p>

            {/* CTAs — two, clearly differentiated */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectTab('explore')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-polar-950 font-semibold text-sm rounded-md transition-colors duration-150"
              >
                Start Exploring
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                onClick={() => onSelectTab('data')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 hover:border-white/60 text-white text-sm font-medium rounded-md transition-colors duration-150"
              >
                Explore the Data
              </button>
            </div>

            {/* Provenance line */}
            <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" aria-hidden="true" />
              <span>Data sourced from NCPOR · NSIDC · NASA · BAS · SCAR · COMNAP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial stats bar — below the photo */}
      <div className="bg-polar-900 border-b border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink-700">
            {[
              { value: '11+',    label: 'Verified Research Stations',   note: 'Including Maitri, Bharati, Himadri' },
              { value: '45+',    label: 'Years of Scientific Data',     note: 'NSIDC sea ice record from 1979' },
              { value: '8',      label: 'Scientific Domains',           note: 'Cryosphere · Climate · Ocean · more' },
              { value: '100%',   label: 'Source Provenance',            note: 'Every DOI linked to origin' },
            ].map(({ value, label, note }) => (
              <div key={label} className="px-6 py-5 first:pl-0 last:pr-0">
                <div className="text-2xl font-semibold text-white tracking-tight">{value}</div>
                <div className="text-xs font-medium text-slate-300 mt-0.5">{label}</div>
                <div className="text-2xs text-slate-600 mt-1 hidden sm:block">{note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

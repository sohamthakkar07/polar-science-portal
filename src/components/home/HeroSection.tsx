import React from 'react';
import { ArrowRight, ShieldCheck, GraduationCap, Microscope, MapPin, BarChart3, Brain } from 'lucide-react';
import { NavTab } from '../layout/Navbar';
import { useAudience } from '../../context/AudienceContext';

interface HeroSectionProps {
  onSelectTab: (tab: NavTab) => void;
}

/**
 * Hero section — editorial photography composition.
 * Audience-aware CTAs clearly separate Student vs Researcher paths.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  const { isStudent, setMode } = useAudience();

  const handleStudentPath = () => {
    setMode('student');
    onSelectTab('learn');
  };

  const handleResearcherPath = () => {
    setMode('researcher');
    onSelectTab('research');
  };

  return (
    <section className="relative w-full overflow-hidden" aria-label="Hero">
      {/* Full-bleed polar photography */}
      <div
        className="relative w-full"
        style={{ minHeight: 'clamp(520px, 72vh, 820px)' }}
      >
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format&fit=crop"
          alt="Antarctic ice landscape — polar research environment"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(8,14,24,0.40) 0%, rgba(8,14,24,0.68) 55%, rgba(8,14,24,0.95) 100%)'
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-24">

            {/* Scientific platform tag */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-px bg-ice-400" aria-hidden="true" />
              <span className="text-2xs font-medium tracking-widest uppercase text-ice-400">
                Polar Science Interoperability & Experience Layer
              </span>
            </div>

            {/* Primary headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight max-w-3xl mb-4">
              The Polar World<br />
              Is Full of Stories.
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-3 font-light">
              Explore the science, data, research and discoveries shaping our 
              understanding of the polar regions.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl mb-10">
              PolarVerse connects information from existing polar-science sources — NCPOR, NASA, NSIDC, BAS, SCAR — 
              into one interactive experience for researchers and students.
            </p>

            {/* Two primary audience paths */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                onClick={handleStudentPath}
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm rounded-md transition-colors duration-150"
              >
                <GraduationCap className="w-4 h-4" aria-hidden="true" />
                Explore as a Student
              </button>

              <button
                onClick={handleResearcherPath}
                className="inline-flex items-center gap-2 px-6 py-3 bg-ice-600 hover:bg-ice-500 text-white font-semibold text-sm rounded-md transition-colors duration-150"
              >
                <Microscope className="w-4 h-4" aria-hidden="true" />
                Explore as a Researcher
              </button>
            </div>

            {/* Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectTab('explore')}
                className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-ice-400" />
                Explore the Poles
              </button>
              <span className="text-slate-600 text-xs">·</span>
              <button
                onClick={() => onSelectTab('data')}
                className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <BarChart3 className="w-3.5 h-3.5 text-ice-400" />
                Explore Real Data
              </button>
              <span className="text-slate-600 text-xs">·</span>
              <button
                onClick={() => onSelectTab('quiz')}
                className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <span className="text-xs">🎮</span>
                Take a Quick Quiz
              </button>
              <span className="text-slate-600 text-xs">·</span>
              <button
                onClick={() => onSelectTab('ai')}
                className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Brain className="w-3.5 h-3.5 text-ice-400" />
                Ask Polar AI
              </button>
            </div>

            {/* Provenance line */}
            <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" aria-hidden="true" />
              <span>Data sourced from NCPOR · NSIDC · NASA · BAS · SCAR · COMNAP · GBIF · OBIS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial stats bar — below the photo */}
      <div className="bg-polar-900 border-b border-ink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink-700">
            {[
              { value: '11+',  label: 'Research Stations',      note: 'Including Maitri, Bharati, Himadri' },
              { value: '45+',  label: 'Years of Scientific Data', note: 'NSIDC sea ice record from 1979' },
              { value: '8',    label: 'Scientific Domains',       note: 'Cryosphere · Climate · Ocean · more' },
              { value: '100%', label: 'Source Provenance',        note: 'Every DOI linked to origin' },
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

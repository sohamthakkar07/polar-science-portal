import React from 'react';
import { ArrowDown, Link2, Database, BookOpen, Map, Brain, GraduationCap, BarChart3, CircleHelp, ShieldCheck } from 'lucide-react';

/**
 * Interoperability Architecture Section
 * Makes immediately clear that PolarVerse is an experience/discovery layer,
 * NOT a data repository itself.
 */
export const InteroperabilitySection: React.FC = () => {
  const sources = [
    { name: 'NCPOR', country: 'India', type: 'Polar Research', focus: 'Indian stations, expeditions', color: 'text-amber-400' },
    { name: 'NSIDC', country: 'USA', type: 'Cryosphere Data', focus: 'Sea ice, snow records', color: 'text-ice-400' },
    { name: 'NASA', country: 'USA', type: 'Earth Observation', focus: 'Satellite imagery, ICESat-2', color: 'text-blue-400' },
    { name: 'BAS', country: 'UK', type: 'Antarctic Research', focus: 'Halley VI, atmospheric data', color: 'text-teal-400' },
    { name: 'SCAR', country: 'International', type: 'Antarctic Coordination', focus: 'Scientific standards, databases', color: 'text-purple-400' },
    { name: 'GBIF', country: 'International', type: 'Biodiversity', focus: 'Species occurrence records', color: 'text-emerald-400' },
    { name: 'OBIS', country: 'IOC-UNESCO', type: 'Marine Biodiversity', focus: 'Ocean species data', color: 'text-cyan-400' },
    { name: 'NOAA', country: 'USA', type: 'Oceanography', focus: 'Climate, Argo floats', color: 'text-sky-400' },
  ];

  const outputs = [
    { icon: Map, label: 'Interactive Maps', desc: 'Station & expedition explorer' },
    { icon: BarChart3, label: 'Data Discovery', desc: 'Datasets with provenance' },
    { icon: BookOpen, label: 'Learning Hub', desc: 'Student & researcher modes' },
    { icon: Database, label: 'Data Stories', desc: 'Visualized science narratives' },
    { icon: CircleHelp, label: 'Quizzes', desc: 'Test your polar knowledge' },
    { icon: Brain, label: 'Polar AI', desc: 'Source-grounded answers' },
    { icon: GraduationCap, label: 'Research', desc: 'DOI-linked literature' },
    { icon: ShieldCheck, label: 'Provenance', desc: 'Every claim traced to source' },
  ];

  return (
    <section className="bg-polar-950 border-t border-b border-ink-700 py-20" aria-labelledby="interop-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-px bg-ice-400" aria-hidden="true" />
          <span className="text-2xs font-medium tracking-widest uppercase text-ice-400">
            Architecture
          </span>
        </div>

        {/* Heading */}
        <div className="max-w-2xl mb-14">
          <h2 id="interop-heading" className="text-2xl sm:text-3xl font-semibold text-white mb-4 leading-tight">
            One Polar Knowledge Layer
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            PolarVerse does not compete with existing polar data repositories. 
            It connects and presents authoritative information from established sources 
            into a unified discovery, education and research experience.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="space-y-0">

          {/* Source tier */}
          <div>
            <div className="text-2xs font-semibold tracking-widest uppercase text-slate-500 mb-3">
              Authoritative Source Repositories
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-ink-700 border border-ink-700">
              {sources.map((source) => (
                <div
                  key={source.name}
                  className="bg-polar-900 px-3 py-4 flex flex-col gap-1 hover:bg-polar-800 transition-colors"
                >
                  <span className={`text-sm font-bold ${source.color}`}>{source.name}</span>
                  <span className="text-2xs text-slate-500">{source.country}</span>
                  <span className="text-2xs text-slate-600 leading-snug mt-1 hidden sm:block">{source.focus}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Flow arrow */}
          <div className="flex flex-col items-center py-5">
            <div className="w-px h-8 bg-ink-700" aria-hidden="true" />
            <ArrowDown className="w-4 h-4 text-slate-600 -mt-1" aria-hidden="true" />
          </div>

          {/* PolarVerse layer */}
          <div className="border border-ice-600/40 bg-polar-800 p-6 text-center relative">
            <div className="flex items-center justify-center gap-3 mb-3">
              {/* Hex mark */}
              <div
                className="w-8 h-8 border border-ice-500 flex items-center justify-center shrink-0"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                aria-hidden="true"
              >
                <div className="w-4 h-4 bg-ice-500" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
              </div>
              <div>
                <div className="text-lg font-bold tracking-widest text-white uppercase">PolarVerse</div>
                <div className="text-2xs text-ice-400 tracking-wider uppercase">Interoperability + Experience + Education Layer</div>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Structured metadata · Source attribution · Dual-mode rendering · Connected knowledge graph · Provenance tracking
            </p>
            {/* Side label */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-ice-500" aria-hidden="true" />
          </div>

          {/* Flow arrow */}
          <div className="flex flex-col items-center py-5">
            <div className="w-px h-8 bg-ink-700" aria-hidden="true" />
            <ArrowDown className="w-4 h-4 text-slate-600 -mt-1" aria-hidden="true" />
          </div>

          {/* Output tier */}
          <div>
            <div className="text-2xs font-semibold tracking-widest uppercase text-slate-500 mb-3">
              Unified Discovery Experience
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-ink-700 border border-ink-700">
              {outputs.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="bg-polar-900 px-3 py-4 flex flex-col gap-1 hover:bg-polar-800 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-ice-400 mb-0.5" aria-hidden="true" />
                  <span className="text-xs font-semibold text-slate-200">{label}</span>
                  <span className="text-2xs text-slate-600 leading-snug hidden sm:block">{desc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="mt-10 flex items-start gap-2 p-4 border border-ink-700 bg-polar-900 max-w-3xl">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300">Scientific Integrity Commitment:</span>{' '}
            PolarVerse presents and links to content from authoritative repositories.
            Every dataset, research paper and station profile is attributed to its original source organization.
            PolarVerse does not claim ownership of third-party scientific data.
            Where live API integration is not present, we link directly to the original source.
          </p>
        </div>

      </div>
    </section>
  );
};

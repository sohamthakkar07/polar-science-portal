import React from 'react';
import { ExternalLink, ShieldCheck, Link2 } from 'lucide-react';
import { AUTHORITATIVE_SOURCES } from '../../data/sources';

/**
 * Powered by Polar Knowledge — source ecosystem section.
 * Shows which authoritative organizations PolarVerse draws information from.
 * Replaces the header clutter that was previously under POLARVERSE logo.
 */
export const SourceEcosystem: React.FC = () => {
  // Categorize sources
  const indiaOrgs = AUTHORITATIVE_SOURCES.filter(s => s.country === 'India');
  const usaOrgs = AUTHORITATIVE_SOURCES.filter(s => s.country === 'USA');
  const intlOrgs = AUTHORITATIVE_SOURCES.filter(s => !['India', 'USA', 'United Kingdom'].includes(s.country));
  const ukOrgs = AUTHORITATIVE_SOURCES.filter(s => s.country === 'United Kingdom');

  const categories = [
    { label: 'India', sources: indiaOrgs, color: 'text-amber-400', accent: 'border-amber-600/30 bg-amber-950/20' },
    { label: 'USA', sources: usaOrgs, color: 'text-blue-400', accent: 'border-blue-600/30 bg-blue-950/20' },
    { label: 'United Kingdom', sources: ukOrgs, color: 'text-teal-400', accent: 'border-teal-600/30 bg-teal-950/20' },
    { label: 'International', sources: intlOrgs, color: 'text-purple-400', accent: 'border-purple-600/30 bg-purple-950/20' },
  ].filter(c => c.sources.length > 0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-labelledby="sources-heading">

      {/* Section header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-px bg-teal-400" aria-hidden="true" />
          <span className="text-2xs font-medium tracking-widest uppercase text-teal-400">
            Knowledge Sources
          </span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 id="sources-heading" className="text-2xl sm:text-3xl font-semibold text-white mb-3 leading-tight">
              Connecting Polar Knowledge
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              PolarVerse draws from {AUTHORITATIVE_SOURCES.length} authoritative scientific repositories,
              presenting their information in a unified experience while preserving full source attribution.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <Link2 className="w-3.5 h-3.5 text-teal-500" />
            <span>{AUTHORITATIVE_SOURCES.length} connected sources</span>
          </div>
        </div>
      </div>

      {/* All sources flat grid — clean and consistent */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-10">
        {AUTHORITATIVE_SOURCES.map((source) => (
          <a
            key={source.id}
            href={source.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 p-4 border border-ink-700 hover:border-ice-500/50 bg-polar-900 hover:bg-polar-800 transition-all duration-150"
            aria-label={`${source.name} — ${source.primaryFocus}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-tight">
                  {source.shortName}
                </div>
                <div className="text-2xs text-slate-500 mt-0.5">{source.country}</div>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-ice-400 shrink-0 transition-colors mt-0.5" />
            </div>
            <div className="text-2xs text-teal-500 font-mono uppercase tracking-wider">
              {source.primaryFocus}
            </div>
            <p className="text-2xs text-slate-600 leading-relaxed line-clamp-2 group-hover:text-slate-500 transition-colors">
              {source.description}
            </p>
          </a>
        ))}
      </div>

      {/* Attribution notice */}
      <div className="flex items-start gap-3 p-4 border border-ink-700 bg-polar-950">
        <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-xs text-slate-500 leading-relaxed">
          <span className="font-medium text-slate-400">Open Access Attribution:</span>{' '}
          PolarVerse links directly to original source organizations and does not claim ownership of 
          third-party datasets, research publications, or scientific imagery. 
          All content is attributed and linked to its origin.
          Where live API integration exists, it is noted on relevant pages.
        </p>
      </div>

    </section>
  );
};

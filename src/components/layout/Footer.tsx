import React from 'react';
import { ShieldCheck, ExternalLink, Compass, Database, BookOpen, Layers, Sparkles, Award, Brain, Globe2, Shield } from 'lucide-react';
import { AUTHORITATIVE_SOURCES } from '../../data/sources';
import { NavTab } from './Navbar';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-polar-950/95 border-t border-polar-800/80 mt-24 relative overflow-hidden" role="contentinfo">
      {/* Background subtle grid lines */}
      <div className="absolute inset-0 bg-polar-lines opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Source repositories grid */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" aria-hidden="true" />
            <h3 className="text-xs font-mono font-semibold tracking-widest uppercase text-slate-300">
              Connected Scientific Repositories & Data Sources
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-6 max-w-3xl leading-relaxed">
            PolarVerse functions as an open scientific outreach and interoperability portal — connecting researchers, students, and climate scientists directly to peer-reviewed, verified repositories without modifying source data.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {AUTHORITATIVE_SOURCES.map((source) => (
              <a
                key={source.id}
                href={source.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-polar-900/80 hover:bg-polar-850 border border-polar-800 hover:border-ice-500/40 p-3.5 rounded-lg group transition-all duration-150 flex flex-col justify-between"
                aria-label={`${source.shortName} — ${source.country}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white group-hover:text-ice-300 transition-colors">
                      {source.shortName}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-ice-400 transition-colors" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">{source.country}</span>
                </div>
                <span className="text-[10px] text-teal-400/90 mt-2 font-mono line-clamp-1">{source.primaryFocus}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation & information grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pt-10 border-t border-polar-800/80">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-polar-900 border border-ice-500/40 flex items-center justify-center">
                <Compass className="w-4 h-4 text-ice-400" />
              </div>
              <span className="text-sm font-bold tracking-wider text-white uppercase font-sans">PolarVerse</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Integrated polar science platform, dataset discovery hub, and climate research portal designed with academic rigor and open scientific standards.
            </p>
          </div>

          {/* Core Portals */}
          <div>
            <h4 className="text-2xs font-mono font-semibold tracking-widest uppercase text-slate-400 mb-4">Core Portals</h4>
            <ul className="space-y-2">
              {[
                { tab: 'explore' as NavTab, label: 'Interactive Polar Explorer' },
                { tab: 'data'    as NavTab, label: 'Scientific Dataset Catalog' },
                { tab: 'stories' as NavTab, label: 'Data Stories & Scrollytelling' },
                { tab: 'learn'   as NavTab, label: 'Polar Science Learning Hub' },
              ].map(({ tab, label }) => (
                <li key={tab}>
                  <button
                    onClick={() => onSelectTab(tab)}
                    className="text-xs text-slate-400 hover:text-ice-300 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-ice-500/60" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Special Features */}
          <div>
            <h4 className="text-2xs font-mono font-semibold tracking-widest uppercase text-slate-400 mb-4">Research & Media</h4>
            <ul className="space-y-2">
              {[
                { tab: 'india'       as NavTab, label: "India's Polar Programme" },
                { tab: 'research'    as NavTab, label: 'Peer-Reviewed Research Catalog' },
                { tab: 'ai'          as NavTab, label: 'Grounded Polar AI Assistant' },
                { tab: 'biodiversity'as NavTab, label: 'Polar Biodiversity Catalog' },
                { tab: 'media'       as NavTab, label: 'Scientific Media Gallery' },
              ].map(({ tab, label }) => (
                <li key={tab}>
                  <button
                    onClick={() => onSelectTab(tab)}
                    className="text-xs text-slate-400 hover:text-ice-300 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-teal-500/60" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Scientific Integrity */}
          <div className="space-y-3">
            <h4 className="text-2xs font-mono font-semibold tracking-widest uppercase text-slate-400">Scientific Integrity</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All measurement datasets, station coordinates, species facts, and DOI citations are preserved directly from primary scientific research agencies.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-mono bg-polar-900/60 border border-polar-800 p-2.5 rounded-md">
              <ShieldCheck className="w-4 h-4 shrink-0 text-teal-400" aria-hidden="true" />
              <span>Static & Provenance-Verified Research Datasets</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-polar-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs text-slate-500 font-mono">
          <span>
            © {new Date().getFullYear()} PolarVerse Science & Outreach Platform. Free & Open Access.
          </span>
          <div className="flex items-center gap-4">
            <span>WCAG 2.1 AA Compliant</span>
            <span>·</span>
            <span>Open Data Standard</span>
            <span>·</span>
            <button
              onClick={() => onSelectTab('admin')}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-ice-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

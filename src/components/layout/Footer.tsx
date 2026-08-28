import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { AUTHORITATIVE_SOURCES } from '../../data/sources';
import { NavTab } from './Navbar';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-polar-950 border-t border-ink-700 mt-24" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Source repositories */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" aria-hidden="true" />
            <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-300">
              Connected Scientific Repositories
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-8 max-w-3xl leading-relaxed">
            PolarVerse operates as an interoperability and education layer — linking researchers and students 
            directly to original, peer-reviewed, open-access repositories without replacing them.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-ink-700 border border-ink-700">
            {AUTHORITATIVE_SOURCES.map((source) => (
              <a
                key={source.id}
                href={source.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-polar-950 hover:bg-ink-800 p-4 group transition-colors duration-150 flex flex-col gap-1"
                aria-label={`${source.shortName} — ${source.country}`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {source.shortName}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-ice-400 shrink-0 mt-0.5 transition-colors" aria-hidden="true" />
                </div>
                <span className="text-2xs text-slate-600">{source.country}</span>
                <span className="text-2xs text-teal-500 mt-1 font-mono">{source.primaryFocus}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation + about grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pt-10 border-t border-ink-700">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-sm font-semibold tracking-widest text-white uppercase">PolarVerse</span>
              <p className="text-xs text-slate-500 mt-1">Polar Science Platform</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Integrated polar science outreach, knowledge repository, and media 
              dissemination portal. Built with scientific integrity and open data standards.
            </p>
          </div>

          {/* Core portals */}
          <div>
            <h4 className="text-2xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Core Portals</h4>
            <ul className="space-y-2">
              {[
                { tab: 'explore' as NavTab, label: 'Interactive Polar Explorer' },
                { tab: 'data'    as NavTab, label: 'Scientific Data Catalog' },
                { tab: 'stories' as NavTab, label: 'Data Stories' },
                { tab: 'learn'   as NavTab, label: 'Learning Hub' },
              ].map(({ tab, label }) => (
                <li key={tab}>
                  <button
                    onClick={() => onSelectTab(tab)}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-2xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Features</h4>
            <ul className="space-y-2">
              {[
                { tab: 'india'       as NavTab, label: "India's Polar Programme" },
                { tab: 'ai'          as NavTab, label: 'Source-Grounded Polar AI' },
                { tab: 'quiz'        as NavTab, label: 'Polar Science Quizzes' },
                { tab: 'biodiversity'as NavTab, label: 'Polar Life & Biodiversity' },
                { tab: 'media'       as NavTab, label: 'Scientific Media Archive' },
              ].map(({ tab, label }) => (
                <li key={tab}>
                  <button
                    onClick={() => onSelectTab(tab)}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Integrity */}
          <div>
            <h4 className="text-2xs font-semibold tracking-widest uppercase text-slate-400 mb-4">Scientific Integrity</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Every data point, DOI citation, station coordinate, and time series is grounded 
              in real, verifiable scientific measurements.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Zero fabricated scientific claims</span>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="mt-10 pt-6 border-t border-ink-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-2xs text-slate-600">
          <span>
            © {new Date().getFullYear()} PolarVerse Outreach &amp; Interoperability Portal. 
            For researchers and students.
          </span>
          <div className="flex items-center gap-4">
            <span>WCAG 2.1 AA</span>
            <span>·</span>
            <span>Open Provenance Layer</span>
            <span>·</span>
            <button
              onClick={() => onSelectTab('admin')}
              className="hover:text-slate-400 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

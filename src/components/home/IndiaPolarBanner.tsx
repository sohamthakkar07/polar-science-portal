import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { NavTab } from '../layout/Navbar';

interface IndiaPolarBannerProps {
  onNavigate: (tab: NavTab) => void;
}

/**
 * India in Polar Science — editorial section.
 * Structured layout: left text + station metadata, right CTA.
 * No emojis, no gradient text, no decorative blobs.
 */
export const IndiaPolarBanner: React.FC<IndiaPolarBannerProps> = ({ onNavigate }) => {
  const stations = [
    { name: 'Maitri',   year: '1989', location: 'Schirmacher Oasis, Antarctica',  lat: '70°45′ S', region: 'Antarctic' },
    { name: 'Bharati',  year: '2012', location: 'Larsemann Hills, Antarctica',    lat: '69°24′ S', region: 'Antarctic' },
    { name: 'Himadri',  year: '2008', location: 'Ny-Ålesund, Svalbard',           lat: '78°55′ N', region: 'Arctic' },
    { name: 'Himansh',  year: '2016', location: 'Himachal Pradesh, India',        lat: '4,080 m',  region: 'Himalayan' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="border border-ink-700">
        <div className="grid grid-cols-1 lg:grid-cols-3">

          {/* Left: editorial text */}
          <div className="lg:col-span-2 p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-ink-700">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-px bg-amber-500" aria-hidden="true" />
              <span className="text-2xs font-medium tracking-widest uppercase text-amber-500">
                National Polar Programme · Ministry of Earth Sciences · NCPOR
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 leading-tight">
              India in Polar Science
            </h2>

            <p className="text-sm text-slate-400 leading-relaxed max-w-reading mb-8">
              From the historic First Indian Antarctic Expedition in 1981 led by Dr. S. Z. Qasim 
              to state-of-the-art research stations across three polar regions — India maintains 
              a continuous scientific presence across the Earth's most critical climate systems.
            </p>

            {/* Stations as structured metadata table */}
            <div className="border border-ink-700 divide-y divide-ink-700">
              <div className="grid grid-cols-4 px-4 py-2 bg-ink-800">
                <span className="text-2xs font-semibold uppercase tracking-wider text-slate-500">Station</span>
                <span className="text-2xs font-semibold uppercase tracking-wider text-slate-500">Established</span>
                <span className="text-2xs font-semibold uppercase tracking-wider text-slate-500 col-span-2">Location</span>
              </div>
              {stations.map((station) => (
                <div key={station.name} className="grid grid-cols-4 px-4 py-3 hover:bg-ink-800 transition-colors">
                  <span className="text-sm font-medium text-white">{station.name}</span>
                  <span className="text-xs text-slate-400">{station.year}</span>
                  <span className="text-xs text-slate-400 col-span-2">
                    {station.location}
                    <span className="text-slate-600 ml-2 font-mono">{station.lat}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA + provenance */}
          <div className="p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="text-2xs font-mono text-slate-500 uppercase tracking-widest mb-3">
                43 Antarctic Expeditions · 4 Active Stations
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Explore India's complete polar programme — expeditions, datasets, 
                research publications, and station profiles.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => onNavigate('india')}
                className="w-full inline-flex items-center justify-between px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm rounded-md transition-colors"
              >
                <span>India's Polar Programme</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                onClick={() => onNavigate('explore')}
                className="w-full inline-flex items-center justify-between px-5 py-3 border border-ink-700 hover:border-ice-500 text-slate-300 hover:text-white text-sm font-medium rounded-md transition-colors"
              >
                <span>View Stations on Map</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" aria-hidden="true" />
                <span className="text-2xs text-slate-500">Sourced from NCPOR &amp; NPDC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

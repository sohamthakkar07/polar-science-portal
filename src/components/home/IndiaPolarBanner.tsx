import React from 'react';
import { ArrowRight, ShieldCheck, MapPin, Calendar, Globe2, Compass } from 'lucide-react';
import { NavTab } from '../layout/Navbar';

interface IndiaPolarBannerProps {
  onNavigate: (tab: NavTab) => void;
}

export const IndiaPolarBanner: React.FC<IndiaPolarBannerProps> = ({ onNavigate }) => {
  const stations = [
    { name: 'Maitri',   year: '1989', location: 'Schirmacher Oasis, Antarctica',  lat: '70°45′ S', region: 'Antarctic' },
    { name: 'Bharati',  year: '2012', location: 'Larsemann Hills, Antarctica',    lat: '69°24′ S', region: 'Antarctic' },
    { name: 'Himadri',  year: '2008', location: 'Ny-Ålesund, Svalbard',           lat: '78°55′ N', region: 'Arctic' },
    { name: 'Himansh',  year: '2016', location: 'Himachal Pradesh, India',        lat: '4,080 m',  region: 'Himalayan' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-polar-900/80 border border-polar-800 rounded-2xl overflow-hidden backdrop-blur-xl shadow-glass relative">
        <div className="absolute inset-0 bg-polar-lines opacity-20 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">

          {/* Left: main editorial narrative & station grid */}
          <div className="lg:col-span-8 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-polar-800">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-ice-500/10 border border-ice-500/30 text-ice-300 text-2xs font-mono mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-ice-400" />
              <span className="uppercase tracking-wider font-semibold">National Polar Programme · MoES & NCPOR</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
              India’s Scientific Presence Across Three Polar Frontiers
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed mb-8 max-w-reading">
              From the historic First Indian Antarctic Expedition in 1981 led by Dr. S. Z. Qasim 
              to year-round research stations across Antarctica, Svalbard, and the High Himalayas — 
              India maintains continuous observational science across all three polar realms.
            </p>

            {/* Station Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stations.map((st) => (
                <div key={st.name} className="p-4 rounded-xl bg-polar-950/70 border border-polar-800 hover:border-ice-500/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-ice-400" />
                        <span>🇮🇳 {st.name}</span>
                      </span>
                      <span className="text-2xs font-mono px-2 py-0.5 rounded bg-polar-900 text-teal-400 border border-polar-800">
                        {st.region}
                      </span>
                    </div>
                    <p className="text-2xs text-slate-400 font-mono mb-2">{st.location}</p>
                  </div>
                  <div className="flex items-center justify-between text-2xs font-mono text-slate-500 pt-2 border-t border-polar-800/60">
                    <span>Est. {st.year}</span>
                    <span className="text-slate-400">{st.lat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: call to action column */}
          <div className="lg:col-span-4 p-6 sm:p-10 flex flex-col justify-between bg-polar-950/50">
            <div className="space-y-4">
              <div className="text-2xs font-mono text-ice-400 uppercase tracking-widest font-semibold">
                43 Antarctic Campaigns · 4 Observatories
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Discover Expedition History & Research
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Explore the complete timeline of India’s polar expeditions from 1981 to present, station specifications, research icebreakers, and scientific publications.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={() => onNavigate('india')}
                className="w-full inline-flex items-center justify-between px-5 py-3.5 bg-ice-500 hover:bg-ice-400 active:scale-[0.98] text-polar-950 font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <span>Explore India's Polar Journey 🇮🇳</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('explore')}
                className="w-full inline-flex items-center justify-between px-5 py-3.5 bg-polar-900 border border-polar-750 hover:border-ice-500/40 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-ice-400" />
                  <span>View Stations on Map</span>
                </span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2 pt-2 text-2xs font-mono text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Verified MoES / NCPOR Data Archives</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

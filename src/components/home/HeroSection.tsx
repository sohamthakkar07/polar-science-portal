import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Compass,
  Database,
  Globe,
  Sparkles,
  BookOpen,
  GraduationCap,
  Microscope,
  ChevronDown,
  Layers,
  Activity,
  Award,
  Zap,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { NavTab } from '../layout/Navbar';
import { useAudience } from '../../context/AudienceContext';

interface HeroSectionProps {
  onSelectTab: (tab: NavTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  const { setAudienceMode } = useAudience();
  const [activeConcept, setActiveConcept] = useState<'thermal' | 'conveyor' | 'sealevel'>('thermal');

  const handleChooseStudentJourney = () => {
    setAudienceMode('student');
    onSelectTab('stories');
  };

  const handleChooseResourceJourney = () => {
    setAudienceMode('researcher');
    onSelectTab('data');
  };

  return (
    <div className="w-full space-y-16 pb-12">
      {/* ========================================================================= */}
      {/* SECTION 1: CINEMATIC ENTRY HOOK */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden" aria-label="Cinematic Entry">
        <div
          className="relative w-full flex flex-col justify-between"
          style={{ minHeight: 'clamp(620px, 82vh, 880px)' }}
        >
          {/* Background image — Atmospheric Antarctic polar ice photography */}
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format&fit=crop"
            alt="Antarctic polar ice landscape"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 pointer-events-none"
            loading="eager"
          />

          {/* Dark mineral gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-polar-950/75 via-polar-950/85 to-polar-950 pointer-events-none"
            aria-hidden="true"
          />

          {/* Subtle grid lines background overlay */}
          <div className="absolute inset-0 bg-polar-lines opacity-25 pointer-events-none" aria-hidden="true" />

          {/* Content container */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full my-auto text-center sm:text-left pointer-events-auto">
            {/* Scientific badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-polar-900/90 border border-ice-500/30 text-ice-300 text-xs font-mono mb-8 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="uppercase tracking-widest text-[11px] font-bold">
                Integrated Polar Science Outreach Portal
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 text-[11px]">MoES / NCPOR Grounded Research</span>
            </div>

            {/* Primary emotional & scientific headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight max-w-4xl mb-6">
              The Earth’s poles are <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ice-300 via-ice-200 to-teal-300">
                telling us a story.
              </span>
            </h1>

            {/* Supporting narrative */}
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-10 font-normal">
              From Antarctic ice sheet dynamics to Svalbard Arctic observatories, polar systems govern our global climate, ocean currents, and sea levels. Explore 45+ years of verified scientific discovery.
            </p>

            {/* Primary action gateway */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-12 relative z-30">
              <button
                type="button"
                onClick={handleChooseStudentJourney}
                className="inline-flex items-center gap-3 px-7 py-4 bg-ice-500 hover:bg-ice-400 active:scale-[0.98] text-polar-950 font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-ice-500/20 transition-all duration-200 cursor-pointer relative z-30 pointer-events-auto"
              >
                <Compass className="w-5 h-5" />
                <span>Begin Polar Discovery</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('explore')}
                className="inline-flex items-center gap-2.5 px-6 py-4 bg-polar-900/90 hover:bg-polar-850 border border-polar-750 hover:border-ice-400/50 text-white font-semibold text-sm rounded-xl transition-all duration-200 cursor-pointer backdrop-blur-md relative z-30 pointer-events-auto"
              >
                <Globe className="w-4 h-4 text-ice-400" />
                <span>Explore Interactive Map</span>
              </button>
            </div>

            {/* Provenance seal */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" aria-hidden="true" />
              <span>Grounded Datasets: Ministry of Earth Sciences · NCPOR · NSIDC · NASA · BAS · SCAR</span>
            </div>
          </div>
        </div>

        {/* Ticker Stats Bar */}
        <div className="bg-polar-900/95 border-y border-polar-800 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-polar-800 text-center md:text-left">
              {[
                { value: '11+', label: 'Verified Research Stations', note: 'Maitri, Bharati, Himadri, Himansh' },
                { value: '45+ Yrs', label: 'Continuous Telemetry Record', note: '1979–2024 Cryosphere & Atmosphere' },
                { value: '8 Domains', label: 'Peer-Reviewed Research', note: 'Glaciology, Oceanography, Biodiversity' },
                { value: '100%', label: 'Grounded Data Integrity', note: 'NCPOR & International DOIs' },
              ].map((stat, i) => (
                <div key={i} className="py-5 px-4 sm:px-6">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-ice-300 mt-0.5">{stat.label}</div>
                  <div className="text-2xs text-slate-400 mt-1 font-mono truncate">{stat.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hackathon Judge Roadmap Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-polar-900/90 border border-polar-800 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-panel space-y-3">
            <div className="flex items-center justify-between font-mono text-2xs uppercase tracking-widest text-ice-300 font-bold">
              <span>PolarVerse Platform Roadmap • Hackathon Demo Journey</span>
              <span className="text-slate-400">10-Second Executive Overview</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
              {[
                { step: '1. DISCOVER 📖', label: 'Stories & Context', tab: 'stories' as NavTab, desc: 'Scrollytelling & climate overview' },
                { step: '2. EXPLORE 🗺️', label: 'Stations & Observatories', tab: 'explore' as NavTab, desc: '4 permanent Indian bases on map' },
                { step: '3. ANALYZE 📊', label: 'Datasets & Research', tab: 'data' as NavTab, desc: '34-yr met data & NetCDF specs' },
                { step: '4. LEARN 🏆', label: 'Interactive Quiz', tab: 'quiz' as NavTab, desc: 'Audience-aware knowledge test' },
              ].map((item) => (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => onSelectTab(item.tab)}
                  className="p-3.5 rounded-xl bg-polar-950 hover:bg-polar-850 border border-polar-800 hover:border-ice-400 text-left transition-all cursor-pointer group space-y-1 relative z-30 pointer-events-auto"
                >
                  <div className="text-2xs font-bold text-ice-300 font-mono group-hover:text-ice-200 transition-colors">
                    {item.step}
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-ice-300 transition-colors leading-snug">
                    {item.label}
                  </div>
                  <div className="text-3xs text-slate-400 font-mono line-clamp-1">
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: WHY THE POLES MATTER (PROGRESSIVE CLIMATE TELECONNECTIONS) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" aria-label="Why Poles Matter">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-polar-900 border border-ice-500/30 text-ice-300 text-2xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest font-semibold">Global Teleconnections</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why do the poles matter to the rest of the world?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Polar regions act as the global thermostat. What happens in Antarctica and the Arctic directly dictates ocean currents, monsoons, and sea levels in India and worldwide.
          </p>
        </div>

        {/* 3 Visual Concept Cards with Progressive Disclosure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 'thermal',
              title: "Earth's Thermal Shield",
              subtitle: 'Ice & Albedo Feedback',
              icon: Sparkles,
              summary: 'Polar ice mirrors 80%+ of incoming solar radiation back into space, maintaining global temperature equilibrium.',
              deepDetail: 'When polar sea ice melts, dark ocean water absorbs 90% of solar energy instead of reflecting it. This ice-albedo feedback loop accelerates global ocean warming and disrupts atmospheric polar vortex stability.',
              stat: '80% Solar Reflection',
              color: 'border-ice-500/40 text-ice-300'
            },
            {
              id: 'conveyor',
              title: 'Global Ocean Conveyor',
              subtitle: 'Thermohaline Circulation',
              icon: Activity,
              summary: 'Freezing sea ice expels salt, sinking cold dense water to drive global ocean currents across every ocean basin.',
              deepDetail: 'Antarctic Bottom Water (AABW) and North Atlantic Deep Water drive the global conveyor belt. This ocean circulation redistributes heat planet-wide and heavily influences tropical weather patterns, including the Indian Summer Monsoon.',
              stat: '20M m³/s Flow Rate',
              color: 'border-teal-500/40 text-teal-300'
            },
            {
              id: 'sealevel',
              title: 'Sea Level Regulator',
              subtitle: 'Polar Ice Sheet Mass',
              icon: Layers,
              summary: 'Antarctica and Greenland store 99% of global freshwater ice. Minor mass losses directly elevate global sea levels.',
              deepDetail: 'The East and West Antarctic Ice Sheets contain enough ice to raise global sea level by ~58 meters. Satellite altimetry and gravimetry (GRACE-FO) track cumulative mass loss to forecast coastal inundation risks.',
              stat: '68% World Freshwater',
              color: 'border-cyan-500/40 text-cyan-300'
            }
          ].map((concept) => {
            const isSelected = activeConcept === concept.id;
            const Icon = concept.icon;
            return (
              <div
                key={concept.id}
                onClick={() => setActiveConcept(concept.id as any)}
                className={`bg-polar-900/90 rounded-2xl border p-6 shadow-panel backdrop-blur-xl transition-all duration-300 cursor-pointer space-y-4 ${
                  isSelected
                    ? `${concept.color} ring-1 ring-ice-400/40 bg-polar-850/90 shadow-ice-glow`
                    : 'border-polar-800 hover:border-polar-700 hover:bg-polar-850/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-polar-950 border border-polar-750 text-ice-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xs font-mono font-bold px-2.5 py-1 rounded bg-polar-950 border border-polar-750 text-slate-300">
                    {concept.stat}
                  </span>
                </div>

                <div>
                  <span className="text-2xs font-mono uppercase tracking-widest text-slate-400">
                    {concept.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{concept.title}</h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {concept.summary}
                </p>

                {/* Progressive disclosure expansion */}
                {isSelected ? (
                  <div className="pt-3 border-t border-polar-800/80 text-xs text-slate-300 space-y-2 animate-in fade-in duration-200">
                    <div className="font-semibold text-ice-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-teal-400" />
                      <span>Scientific Mechanism:</span>
                    </div>
                    <p className="leading-relaxed text-slate-300 bg-polar-950/70 p-3 rounded-lg border border-polar-800">
                      {concept.deepDetail}
                    </p>
                  </div>
                ) : (
                  <div className="pt-2 text-2xs font-mono text-ice-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Click to reveal scientific detail</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: JOURNEY SELECTION GATEWAY (STUDENT VS RESOURCE MODE) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" aria-label="Journey Selection">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-polar-900 border border-ice-500/30 text-ice-300 text-2xs font-mono">
            <Compass className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest font-semibold">Choose Your Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How would you like to explore?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Tailor the portal experience to your goals. You can switch modes at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* STUDENT MODE CARD */}
          <div className="bg-gradient-to-b from-polar-900/95 to-polar-950 border border-ice-500/40 rounded-3xl p-8 shadow-panel hover:border-ice-400 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <GraduationCap className="w-32 h-32 text-ice-400" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ice-500/15 border border-ice-400/40 text-ice-300 text-xs font-mono font-bold">
                <GraduationCap className="w-4 h-4 text-ice-400" />
                <span>STUDENT & PUBLIC MODE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Guided & Visual Discovery 🎓
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Designed for students, educators, and curious minds. Discover polar science through guided scrollytelling stories, plain-language concepts, visual data charts, and interactive knowledge challenges.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  '8-Step Scrollytelling Data Stories',
                  'Plain Language ("ELI15") Climate Analogies',
                  'Interactive Quizzes & Streak Counters',
                  'Unlockable Polar Scientist Achievement Badges',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-ice-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleChooseStudentJourney}
              className="w-full py-3.5 px-6 rounded-xl bg-ice-500 hover:bg-ice-400 active:scale-[0.98] text-polar-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer relative z-10"
            >
              <span>Launch Student Guided Path</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* RESOURCE MODE CARD */}
          <div className="bg-gradient-to-b from-polar-900/95 to-polar-950 border border-teal-500/40 rounded-3xl p-8 shadow-panel hover:border-teal-400 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <Microscope className="w-32 h-32 text-teal-400" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/40 text-teal-300 text-xs font-mono font-bold">
                <Microscope className="w-4 h-4 text-teal-400" />
                <span>RESEARCHER & RESOURCE MODE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Scientific Repository Hub 🔬
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Tailored for researchers, climate analysts, and serious investigators. Access 45+ years of verified datasets, Crossref DOIs, NetCDF variable specifications, and station telemetry records.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  'Native SVG Time Series Charts & CSV Exporter',
                  'Crossref DOIs & One-Click BibTeX Citation Generator',
                  'NetCDF CF Standard Variable Specifications',
                  'Passcode-Protected Dataset Registration & Provenance',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleChooseResourceJourney}
              className="w-full py-3.5 px-6 rounded-xl bg-polar-800 hover:bg-polar-750 border border-teal-500/50 text-teal-300 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer relative z-10"
            >
              <span>Access Scientific Resource Hub</span>
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: DISCOVERY PREVIEW (INTERACTIVE SPOTLIGHT) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" aria-label="Discovery Teaser">
        <div className="bg-polar-900/90 rounded-3xl border border-polar-800 p-8 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-polar-950 border border-polar-750 text-teal-300 text-2xs font-mono">
              <Globe className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest font-semibold">Interactive Stereographic Explorer</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore 11+ Permanent Research Bases Across Antarctica & Svalbard
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Navigate polar stereographic map projections (EPSG:3031 Antarctic & EPSG:3575 Arctic) featuring live telemetry radar beacons over Maitri, Bharati, Himadri, Himansh, and international observatories.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectTab('explore')}
                className="px-5 py-2.5 rounded-xl bg-ice-500 hover:bg-ice-400 text-polar-950 font-bold text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>Launch Interactive Explorer</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-polar-950 rounded-2xl border border-polar-750 p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between text-xs font-mono border-b border-polar-800 pb-3">
              <span className="text-slate-400">FEATURED STATION TELEMETRY</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Observatory
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">Maitri Station 🇮🇳</h4>
                  <span className="text-2xs font-mono text-slate-400">Schirmacher Oasis, East Antarctica (70.76°S, 11.73°E)</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-polar-900 border border-polar-750 text-2xs font-mono text-ice-300">
                  Est. 1989
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-polar-900 border border-polar-800">
                  <div className="text-2xs font-mono text-slate-400">Annual Mean Temp</div>
                  <div className="text-lg font-bold text-ice-300 font-mono">-10.5 °C</div>
                </div>
                <div className="p-3 rounded-lg bg-polar-900 border border-polar-800">
                  <div className="text-2xs font-mono text-slate-400">Telemetry History</div>
                  <div className="text-lg font-bold text-teal-300 font-mono">34 Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: INDIA'S POLAR CONTRIBUTION (MoES & NCPOR SPOTLIGHT) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="India Contribution Spotlight">
        <div className="bg-gradient-to-r from-polar-900 via-polar-900/90 to-polar-950 border border-orange-500/30 rounded-3xl p-8 sm:p-10 shadow-panel relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/15 border border-orange-500/40 text-orange-400 text-2xs font-mono font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>INDIAN NATIONAL POLAR PROGRAMME</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              40+ Years of High-Latitude Scientific Exploration
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Under the Ministry of Earth Sciences (MoES) and National Centre for Polar and Ocean Research (NCPOR), India operates year-round stations in Antarctica (Maitri, Bharati), Svalbard (Himadri), the Himalayas (Himansh), and the IndARC underwater mooring.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onSelectTab('india')}
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-polar-950 font-bold text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Explore India’s Polar Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
            {[
              { title: 'Maitri', year: '1989', loc: 'Schirmacher Oasis' },
              { title: 'Bharati', year: '2012', loc: 'Larsemann Hills' },
              { title: 'Himadri', year: '2008', loc: 'Svalbard, Arctic' },
              { title: 'Himansh', year: '2016', loc: 'Himalayas (4080m)' },
            ].map((base, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-polar-950/80 border border-polar-750 text-center">
                <div className="text-xs font-bold text-white">{base.title}</div>
                <div className="text-2xs font-mono text-orange-400">Est. {base.year}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{base.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

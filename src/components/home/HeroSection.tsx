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
  ChevronRight,
  Layers,
  Activity,
  Award,
  Zap,
  MapPin,
  ExternalLink,
  Radio,
  Thermometer,
  Wind
} from 'lucide-react';
import { motion } from 'framer-motion';
import { NavTab } from '../layout/Navbar';

interface HeroSectionProps {
  onSelectTab: (tab: NavTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  const [activeConcept, setActiveConcept] = useState<'thermal' | 'conveyor' | 'sealevel'>('thermal');

  const concepts = {
    thermal: {
      title: "Earth's Thermal Shield",
      subtitle: 'Albedo Feedback & Ice Dynamics',
      summary: 'Polar sea ice mirrors 80%+ of incoming solar radiation back into space, maintaining global atmospheric equilibrium.',
      deepDetail: 'When polar sea ice melts, exposed dark ocean water absorbs 90% of solar energy instead of reflecting it. This ice-albedo feedback loop accelerates global ocean heating and destabilizes polar atmospheric jet streams.',
      stat: '80% Solar Reflection',
      metricLabel: 'Surface Reflectivity',
      metricVal: '0.84 Alpha',
      accentColor: 'border-ice-400 text-ice-300',
      tagBg: 'bg-ice-500/10 text-ice-300 border-ice-400/30'
    },
    conveyor: {
      title: 'Global Ocean Conveyor',
      subtitle: 'Thermohaline Circulation',
      summary: 'Freezing Antarctic sea ice expels salt, driving dense bottom water currents that circulate heat across every ocean basin.',
      deepDetail: 'Antarctic Bottom Water (AABW) and North Atlantic Deep Water power the thermohaline conveyor. This ocean circulation redistributes heat globally and directly influences the Indian Summer Monsoon.',
      stat: '20M m³/s Flow Rate',
      metricLabel: 'AABW Transport Rate',
      metricVal: '21.4 Sverdrups',
      accentColor: 'border-teal-400 text-teal-300',
      tagBg: 'bg-teal-500/10 text-teal-300 border-teal-400/30'
    },
    sealevel: {
      title: 'Sea Level Regulator',
      subtitle: 'Cryospheric Mass Balance',
      summary: 'Antarctica and Greenland store 99% of global freshwater ice. Minor mass losses directly dictate global sea level rise.',
      deepDetail: 'The East and West Antarctic Ice Sheets hold enough water volume to elevate global sea levels by ~58 meters. Satellite radar altimetry and GRACE-FO gravimetry track mass budget changes to forecast coastal inundation.',
      stat: '68% World Freshwater',
      metricLabel: 'Antarctic Ice Mass Volume',
      metricVal: '27.0M km³',
      accentColor: 'border-cyan-400 text-cyan-300',
      tagBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/30'
    }
  };

  const currentConcept = concepts[activeConcept];

  return (
    <div className="w-full space-y-24 pb-16">
      {/* ========================================================================= */}
      {/* SECTION 1: IMMERSIVE POLAR HERO WITH RESTORED CINEMATIC BACKGROUND IMAGE */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden pt-16 pb-24" aria-label="Cinematic Polar Hero Entry">
        
        {/* LAYER 1: RESTORED ORIGINAL POLAR PHOTOGRAPH WITH CINEMATIC DRIFT/ZOOM */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format&fit=crop"
            alt="Antarctic polar ice landscape"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105 opacity-70"
            loading="eager"
            initial={{ scale: 1, x: 0, y: 0 }}
            animate={{
              scale: [1, 1.05, 1],
              x: [0, 10, 0],
              y: [0, -8, 0]
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />

          {/* LAYER 2: ATMOSPHERIC SHIMMER & POLAR AURORA LIGHT */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-teal-900/15 via-transparent to-ice-500/10 opacity-60"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* LAYER 3: BALANCED VIGNETTE OVERLAY (ENSURES TEXT READABILITY WHILE PRESERVING ICE VISIBILITY) */}
          <div className="absolute inset-0 bg-gradient-to-b from-polar-950/45 via-polar-950/65 to-polar-950" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-polar-950/40 to-polar-950" />
          <div className="absolute inset-0 bg-polar-lines opacity-15" />
        </div>

        {/* LAYER 4: HERO CONTENT & EDITORIAL HEADLINE */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Telemetry Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-polar-900/90 border border-polar-750 backdrop-blur-md mb-8 text-2xs font-mono font-bold tracking-widest uppercase text-ice-300 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>INTEGRATED POLAR SCIENCE PORTAL</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-mono">MoES & NCPOR DATASETS</span>
          </motion.div>

          {/* PRIMARY FOCAL POINT: Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl space-y-6"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight drop-shadow-md">
              The Earth’s poles are <br className="hidden sm:inline" />
              <span className="text-ice-300 font-serif italic font-normal drop-shadow">
                telling us a story.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow-sm">
              From Antarctic ice sheet dynamics to Svalbard Arctic observatories, polar systems govern our global climate, ocean currents, and monsoons. Explore 45+ years of verified scientific telemetry.
            </p>

            {/* CLEAR CTA HIERARCHY */}
            <div className="flex flex-wrap items-center gap-4 pt-4 relative z-30">
              {/* PRIMARY CTA */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectTab('stories')}
                className="px-8 py-4 bg-ice-400 hover:bg-ice-300 text-polar-950 font-extrabold text-base rounded-xl shadow-xl shadow-ice-400/25 transition-all cursor-pointer flex items-center gap-3 relative z-30 pointer-events-auto"
              >
                <Compass className="w-5 h-5" />
                <span>Begin Polar Discovery</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* SECONDARY CTA */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectTab('explore')}
                className="px-6 py-4 bg-polar-900/80 hover:bg-polar-850 border border-polar-700 hover:border-ice-400/60 text-slate-200 hover:text-white font-semibold text-sm rounded-xl transition-all cursor-pointer backdrop-blur-md flex items-center gap-2.5 relative z-30 pointer-events-auto"
              >
                <Globe className="w-4 h-4 text-ice-400" />
                <span>Explore Interactive Map</span>
              </motion.button>
            </div>

            {/* Grounded Citation Footer */}
            <div className="flex flex-wrap items-center gap-2 pt-4 text-xs font-mono text-slate-300 drop-shadow-sm">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" aria-hidden="true" />
              <span>Grounded Archives: MoES · NCPOR · NSIDC · NASA · BAS · SCAR</span>
            </div>
          </motion.div>
        </div>

        {/* RESTRAINED TELEMETRY STATS STRIPE */}
        <div className="mt-16 border-y border-polar-800/80 bg-polar-900/85 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-polar-800/80 text-left">
              {[
                { value: '11+', label: 'Research Stations', note: 'Maitri, Bharati, Himadri, Himansh' },
                { value: '45+ Yrs', label: 'Continuous Record', note: '1979–2024 Cryosphere & Atmosphere' },
                { value: '8 Domains', label: 'Peer-Reviewed Science', note: 'Glaciology, Oceanography, Ecology' },
                { value: '100%', label: 'Grounded Telemetry', note: 'NCPOR & International DOIs' },
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

        {/* ROADMAP DEMO QUICK-NAVIGATION STRIP */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-polar-900/70 border border-polar-800/80 rounded-2xl p-5 backdrop-blur-xl space-y-3 shadow-xl">
            <div className="flex items-center justify-between font-mono text-2xs uppercase tracking-widest text-ice-300 font-bold">
              <span>Platform Roadmap • Executive Demo Journey</span>
              <span className="text-slate-400">10-Second Shortcut</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
              {[
                { step: '1. DISCOVER 📖', label: 'Stories & Context', tab: 'stories' as NavTab, desc: 'Scrollytelling & climate' },
                { step: '2. EXPLORE 🗺️', label: 'Stations & Maps', tab: 'explore' as NavTab, desc: '4 Indian permanent bases' },
                { step: '3. ANALYZE 📊', label: 'Datasets & Specs', tab: 'data' as NavTab, desc: '34-yr met data & NetCDF' },
                { step: '4. LEARN 🏆', label: 'Interactive Quiz', tab: 'quiz' as NavTab, desc: 'Knowledge checkpoints' },
              ].map((item) => (
                <motion.button
                  key={item.step}
                  type="button"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectTab(item.tab)}
                  className="p-3.5 rounded-xl bg-polar-950/90 hover:bg-polar-850 border border-polar-800 hover:border-ice-400 text-left transition-all cursor-pointer group space-y-1 relative z-30 pointer-events-auto shadow-sm"
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
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CLIMATE CONNECTIONS — INTERACTIVE SPOTLIGHT SPLIT */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" aria-label="Why Poles Matter">
        {/* Section Header */}
        <div className="space-y-3 border-l-2 border-ice-400 pl-4">
          <div className="text-2xs font-mono font-bold uppercase tracking-widest text-ice-300">
            STAGE 02 · CLIMATE CONNECTIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why do the poles matter to the rest of the world?
          </h2>
          <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
            Polar regions act as Earth's global thermostat. What occurs in Antarctica and the Arctic directly dictates ocean currents, monsoons, and sea levels in India and worldwide.
          </p>
        </div>

        {/* ASYMMETRIC 2-COLUMN SPOTLIGHT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Concept Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {[
              { id: 'thermal', title: "Earth's Thermal Shield", tag: 'Albedo & Ice Dynamics', icon: Thermometer },
              { id: 'conveyor', title: 'Global Ocean Conveyor', tag: 'Thermohaline Flow', icon: Wind },
              { id: 'sealevel', title: 'Sea Level Regulator', tag: 'Cryosphere Volume', icon: Layers },
            ].map((item) => {
              const isSelected = activeConcept === item.id;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveConcept(item.id as any)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-polar-900 border-ice-400 shadow-lg ring-1 ring-ice-400/20'
                      : 'bg-polar-900/50 hover:bg-polar-850 border-polar-800/80 hover:border-polar-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-ice-500/20 text-ice-300' : 'bg-polar-950 text-slate-400 group-hover:text-white'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">{item.title}</h3>
                      <span className="text-2xs font-mono text-slate-400">{item.tag}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'text-ice-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Concept Telemetry Viewer */}
          <div className="lg:col-span-7 bg-polar-900/90 rounded-3xl border border-polar-750 p-8 backdrop-blur-xl space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-polar-800 pb-4">
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${currentConcept.tagBg}`}>
                {currentConcept.subtitle}
              </span>
              <span className="text-2xs font-mono text-slate-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                <span>OBSERVATIONAL TELEMETRY</span>
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">{currentConcept.title}</h3>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                {currentConcept.summary}
              </p>
            </div>

            {/* Telemetry Highlight Metric */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-polar-950/80 border border-polar-800">
              <div>
                <span className="text-2xs font-mono text-slate-400 uppercase tracking-wider">{currentConcept.metricLabel}</span>
                <div className="text-xl sm:text-2xl font-extrabold text-ice-300 font-mono mt-0.5">{currentConcept.metricVal}</div>
              </div>
              <div>
                <span className="text-2xs font-mono text-slate-400 uppercase tracking-wider">Impact Threshold</span>
                <div className="text-xl sm:text-2xl font-extrabold text-teal-300 font-mono mt-0.5">{currentConcept.stat}</div>
              </div>
            </div>

            {/* Deep Mechanism Detail */}
            <div className="p-4 rounded-2xl bg-polar-950/90 border border-polar-800 space-y-2">
              <div className="flex items-center gap-2 text-2xs font-mono font-bold text-teal-300 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-teal-400" />
                <span>Scientific Mechanism Breakdown</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {currentConcept.deepDetail}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: COMMAND CENTER & INTEGRATED DISCOVERY HUB */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" aria-label="Polar Discovery Hub">
        {/* Section Header */}
        <div className="space-y-3 border-l-2 border-teal-400 pl-4">
          <div className="text-2xs font-mono font-bold uppercase tracking-widest text-teal-300">
            STAGE 03 · DISCOVERY REPOSITORIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Explore Science & Research Gateways
          </h2>
          <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
            Connecting visual scrollytelling with 45+ years of verified scientific datasets, peer-reviewed DOIs, and permanent observatories.
          </p>
        </div>

        {/* DUAL GATEWAY PANELS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* GATEWAY 1: VISUAL STORYTELLING */}
          <div className="bg-gradient-to-b from-polar-900/90 to-polar-950 border border-ice-500/40 rounded-3xl p-8 shadow-2xl hover:border-ice-400 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ice-500/15 border border-ice-400/40 text-ice-300 text-xs font-mono font-bold">
                <GraduationCap className="w-4 h-4 text-ice-400" />
                <span>VISUAL STORYTELLING & LEARNING</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Guided Scrollytelling & Climate Challenges 📖
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Explore polar science through interactive scrollytelling stories, clear climate concepts, species directories, and interactive knowledge challenges.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  '8-Step Scrollytelling Data Stories',
                  'Plain-Language Climate Science Analogies',
                  'Interactive Quiz Checkpoints & Progress Tracking',
                  'SCAR & OBIS Biodiversity Directory',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-ice-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTab('stories')}
              className="w-full py-3.5 px-6 rounded-xl bg-ice-400 hover:bg-ice-300 text-polar-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer relative z-10"
            >
              <span>Explore Data Stories</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* GATEWAY 2: SCIENTIFIC REPOSITORY */}
          <div className="bg-gradient-to-b from-polar-900/90 to-polar-950 border border-teal-500/40 rounded-3xl p-8 shadow-2xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/40 text-teal-300 text-xs font-mono font-bold">
                <Microscope className="w-4 h-4 text-teal-400" />
                <span>SCIENTIFIC REPOSITORY & LITERATURE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Datasets & Peer-Reviewed DOIs 🔬
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Access 45+ years of verified scientific telemetry datasets, Crossref DOIs, NetCDF variable specifications, and station observational records.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  'Native SVG Time Series Charts & CSV Exporter',
                  'Crossref DOIs & One-Click Citation Generator',
                  'NetCDF CF Standard Variable Specifications',
                  'NCPOR & MoES Verified Station Observatories',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTab('data')}
              className="w-full py-3.5 px-6 rounded-xl bg-polar-900 hover:bg-polar-850 border border-teal-500/50 text-teal-300 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer relative z-10"
            >
              <span>Access Data Catalog</span>
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </motion.button>
          </div>
        </div>

        {/* STEREOGRAPHIC MAP COMMAND TEASER */}
        <div className="bg-polar-900/90 rounded-3xl border border-polar-750 p-8 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-polar-950 border border-polar-750 text-teal-300 text-2xs font-mono">
              <Globe className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest font-semibold">Stereographic Radar Observatory</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Permanent Research Bases Across Antarctica & Svalbard
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Navigate polar stereographic map projections (EPSG:3031 Antarctic & EPSG:3575 Arctic) featuring telemetry radar beacons over Maitri, Bharati, Himadri, Himansh, and international observatories.
            </p>

            <div className="pt-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectTab('explore')}
                className="px-6 py-3 rounded-xl bg-ice-400 hover:bg-ice-300 text-polar-950 font-bold text-xs flex items-center gap-2.5 transition-all shadow-md cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>Launch Interactive Explorer</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-polar-950 rounded-2xl border border-polar-800 p-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono border-b border-polar-800 pb-3">
              <span className="text-slate-400">FEATURED OBSERVATORY</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Station
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">Maitri Station 🇮🇳</h4>
                  <span className="text-2xs font-mono text-slate-400">Schirmacher Oasis (70.76°S, 11.73°E)</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-polar-900 border border-polar-750 text-2xs font-mono text-ice-300">
                  Est. 1989
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-polar-900 border border-polar-800">
                  <div className="text-2xs font-mono text-slate-400">Mean Temp</div>
                  <div className="text-lg font-bold text-ice-300 font-mono">-10.5 °C</div>
                </div>
                <div className="p-3 rounded-xl bg-polar-900 border border-polar-800">
                  <div className="text-2xs font-mono text-slate-400">History</div>
                  <div className="text-lg font-bold text-teal-300 font-mono">34 Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Thermometer, Activity, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const stations = [
  {
    id: 'maitri',
    title: 'Maitri Station 🇮🇳',
    location: 'Schirmacher Oasis, Antarctica',
    year: '1989',
    description: 'India\'s second permanent research station in Antarctica. It provides year-round operational support for scientists operating in the deep south.',
    stats: { temp: '-10.5 °C', feature: 'Gateway to inland ice' },
    image: 'https://images.unsplash.com/photo-1549488344-c6c747514a60?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 'bharati',
    title: 'Bharati Station 🇮🇳',
    location: 'Larsemann Hills, Antarctica',
    year: '2012',
    description: 'A state-of-the-art research facility located between Thala Fjord and Quilty Bay. It focuses on oceanographic studies and continental breakup.',
    stats: { temp: '-8.0 °C', feature: 'Satellite ground station' },
    image: 'https://images.unsplash.com/photo-1520638023403-12d7c04d16c1?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 'himadri',
    title: 'Himadri Station 🇮🇳',
    location: 'Ny-Ålesund, Svalbard, Arctic',
    year: '2008',
    description: 'Located at 79°N, Himadri anchors India\'s Arctic research efforts, facilitating long-term observations of the Arctic marine ecosystem.',
    stats: { temp: '-4.2 °C', feature: 'Fjord ecosystem focus' },
    image: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=1200&q=80&auto=format&fit=crop'
  },
  {
    id: 'himansh',
    title: 'Himansh Station 🇮🇳',
    location: 'Spiti, Himalayas (4080m)',
    year: '2016',
    description: 'India\'s high-altitude glaciological research station in the Himalayas, crucial for understanding the "Third Pole" and water security.',
    stats: { temp: '-15.0 °C', feature: 'High altitude glaciology' },
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&auto=format&fit=crop'
  }
];

export const StationStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    // Only apply GSAP pinning on desktop
    if (isMobile || !containerRef.current || !rightColRef.current || !leftColRef.current) return;

    // Check for reduced motion
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const sections = gsap.utils.toArray<HTMLElement>('.station-block');

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top+=100',
      end: 'bottom bottom-=100',
      pin: rightColRef.current,
      scrub: true,
      invalidateOnRefresh: true,
    });

    sections.forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile, containerRef]);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full" aria-label="India Contribution Spotlight">
      <div className="space-y-4 mb-16 border-l-2 border-orange-500 pl-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/15 border border-orange-500/40 text-orange-400 text-2xs font-mono font-bold uppercase tracking-widest">
          <MapPin className="w-3.5 h-3.5" />
          <span>INDIAN NATIONAL POLAR PROGRAMME</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Permanent Research Observatories
        </h2>
        <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
          From the deep south of Antarctica to the high-altitude Himalayas, explore the outposts sustaining India's 40+ years of polar exploration.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 relative w-full">
        {/* LEFT COLUMN: SCROLLING TEXT (or stacked on mobile) */}
        <div ref={leftColRef} className="lg:w-1/2 flex flex-col gap-12 lg:gap-32 pb-12 lg:pb-64">
          {stations.map((station, i) => {
            const isActive = isMobile || activeIndex === i;

            return (
              <div
                key={station.id}
                className={`station-block flex flex-col gap-6 transition-opacity duration-500 ${!isActive && !isMobile ? 'opacity-30' : 'opacity-100'}`}
              >
                {/* Mobile visual inline */}
                {isMobile && (
                  <div className="w-full h-64 rounded-2xl overflow-hidden mb-4 relative">
                    <img src={station.image} alt={station.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-polar-950 via-polar-950/20 to-transparent" />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-orange-400 font-mono text-sm tracking-wider">Est. {station.year}</div>
                  <h3 className="text-3xl font-bold text-white">{station.title}</h3>
                  <div className="text-slate-400 font-mono text-xs flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    {station.location}
                  </div>
                </div>

                <p className="text-slate-300 text-lg leading-relaxed">
                  {station.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-polar-900 border border-polar-800">
                    <div className="text-2xs font-mono text-slate-400 mb-1 flex items-center gap-1.5"><Thermometer className="w-3 h-3" /> Mean Temp</div>
                    <div className="text-lg font-bold text-ice-300 font-mono">{station.stats.temp}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-polar-900 border border-polar-800">
                    <div className="text-2xs font-mono text-slate-400 mb-1 flex items-center gap-1.5"><Activity className="w-3 h-3" /> Key Focus</div>
                    <div className="text-sm font-bold text-teal-300 line-clamp-2">{station.stats.feature}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: PINNED VISUAL (Desktop only) */}
        {!isMobile && (
          <div className="lg:w-1/2 h-[70vh] relative">
            <div ref={rightColRef} className="w-full h-[70vh] rounded-3xl overflow-hidden border border-polar-750 shadow-2xl relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={stations[activeIndex].image}
                    alt={stations[activeIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-polar-950 via-polar-950/20 to-transparent opacity-80" />

                  {/* Visual Overlay Info */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="bg-polar-950/80 backdrop-blur-md border border-polar-800 rounded-xl p-4 inline-flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <Radio className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <div className="text-2xs font-mono text-slate-400">TELEMETRY STATUS</div>
                        <div className="text-sm font-bold text-white tracking-wide">ACTIVE OBSERVATORY</div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StationStory;

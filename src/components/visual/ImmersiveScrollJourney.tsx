import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { AtmosphericFogLayer } from './AtmosphericFogLayer';

interface ImmersiveScrollJourneyProps {
  children: React.ReactNode;
  className?: string;
}

export const ImmersiveScrollJourney: React.FC<ImmersiveScrollJourneyProps> = ({
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth physics interpolation for non-jerky camera scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  useEffect(() => {
    const checkReduced = () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isSmall = window.innerWidth < 768;
      setIsMobileOrReduced(prefersReduced || isSmall);
    };

    checkReduced();
    window.addEventListener('resize', checkReduced);

    const unsubscribe = smoothProgress.on('change', (v) => {
      setCurrentProgress(v);
    });

    return () => {
      window.removeEventListener('resize', checkReduced);
      unsubscribe();
    };
  }, [smoothProgress]);

  // Background environment transition colors across stages
  const auroraBgGradient = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1.0],
    [
      'radial-gradient(ellipse at 50% 0%, #0c1c2e 0%, #040914 70%, #02050a 100%)', // Stage 1: Deep Space
      'radial-gradient(ellipse at 70% 30%, #0f2d3e 0%, #061220 65%, #02050a 100%)', // Stage 2: Atmosphere Ribbon
      'radial-gradient(ellipse at 30% 50%, #123447 0%, #081726 65%, #02050a 100%)', // Stage 3: Antarctic Ice Horizon
      'radial-gradient(ellipse at 50% 70%, #0e2938 0%, #06111e 65%, #02050a 100%)', // Stage 4: Science Data Matrix
      'radial-gradient(ellipse at 50% 100%, #0c1f30 0%, #050d18 70%, #02050a 100%)' // Stage 5: Final Platform Hub
    ]
  );

  // If mobile or reduced motion, render clean progressive stack without 3D camera transforms
  if (isMobileOrReduced) {
    return (
      <div className={`w-full bg-polar-950 text-slate-100 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full bg-polar-950 ${className}`}>
      {/* Dynamic Background Environment */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-700"
        style={{ background: auroraBgGradient }}
        aria-hidden="true"
      />

      {/* Grid Mesh Lines Overlay */}
      <div className="fixed inset-0 bg-polar-lines opacity-15 pointer-events-none z-0" aria-hidden="true" />

      {/* Atmospheric Fog & Ice Particle Tunnel */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <AtmosphericFogLayer scrollProgress={currentProgress} />
      </div>

      {/* Sticky 3D Perspective Viewport */}
      <div className="relative z-20 w-full" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
};

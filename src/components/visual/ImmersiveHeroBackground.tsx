import React, { useState, useEffect } from 'react';
import { AuroraLayer } from './AuroraLayer';
import { ParticleField } from './ParticleField';
import { ParallaxLayer } from './ParallaxLayer';

interface ImmersiveHeroBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const ImmersiveHeroBackground: React.FC<ImmersiveHeroBackgroundProps> = ({
  children,
  className = ''
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`relative w-full overflow-hidden bg-polar-950 ${className}`}>
      {/* 1. Deep Space Mineral Background Gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-polar-900 via-polar-950 to-[#02050a] pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Atmospheric Polar Grid Mesh Lines Overlay */}
      <div className="absolute inset-0 bg-polar-lines opacity-20 pointer-events-none" aria-hidden="true" />

      {/* 3. Multi-layered Animated Aurora Waves */}
      <AuroraLayer />

      {/* 4. Canvas Floating Star & Ice Crystal Particle Field */}
      <ParticleField mousePosition={mousePosition} />

      {/* 5. Parallax Depth Layer Content */}
      <ParallaxLayer mousePosition={mousePosition} speedMultiplier={10} className="relative z-20 w-full h-full">
        {children}
      </ParallaxLayer>
    </div>
  );
};

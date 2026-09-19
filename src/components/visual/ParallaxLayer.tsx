import React from 'react';

interface ParallaxLayerProps {
  children: React.ReactNode;
  mousePosition: { x: number; y: number };
  speedMultiplier?: number;
  className?: string;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  mousePosition,
  speedMultiplier = 15,
  className = ''
}) => {
  const offsetX = (mousePosition.x - 0.5) * speedMultiplier;
  const offsetY = (mousePosition.y - 0.5) * speedMultiplier;

  return (
    <div
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0px)`
      }}
    >
      {children}
    </div>
  );
};

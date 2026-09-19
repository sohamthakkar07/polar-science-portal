import React, { useEffect, useRef } from 'react';

interface AtmosphericFogLayerProps {
  scrollProgress: number; // 0 to 1
  className?: string;
}

export const AtmosphericFogLayer: React.FC<AtmosphericFogLayerProps> = ({
  scrollProgress,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const count = prefersReducedMotion ? 20 : isMobile ? 35 : 70;

    // Atmospheric ice particles & fog puffs
    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.1 + Math.random() * 1.9, // 3D depth Z
      radius: 1 + Math.random() * 2.5,
      alpha: 0.2 + Math.random() * 0.5,
      color: Math.random() > 0.4 ? '#52a5d7' : Math.random() > 0.5 ? '#42c2b1' : '#ffffff'
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Camera Z movement based on scroll progress
      const cameraZSpeed = scrollProgress * 4.0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Effective Z position relative to camera
        let relZ = (p.z - cameraZSpeed) % 2.0;
        if (relZ < 0) relZ += 2.0;

        // Perspective scale factor
        const scale = 1 / Math.max(0.1, relZ);
        const drawX = width / 2 + (p.x - 0.5) * width * scale;
        const drawY = height / 2 + (p.y - 0.5) * height * scale;
        const drawRadius = p.radius * scale;
        const drawAlpha = Math.min(0.7, p.alpha * (relZ / 2));

        if (drawX >= -50 && drawX <= width + 50 && drawY >= -50 && drawY <= height + 50) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(drawX, drawY, Math.min(20, drawRadius), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0.02, drawAlpha);

          if (drawRadius > 3) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
          }

          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    />
  );
};

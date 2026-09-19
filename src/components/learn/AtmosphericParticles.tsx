import React, { useEffect, useRef } from 'react';
import { EnvironmentTheme } from './EnvironmentBackground';

interface AtmosphericParticlesProps {
  theme: EnvironmentTheme;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  alphaSpeed: number;
  vx: number;
  vy: number;
  color: string;
}

export const AtmosphericParticles: React.FC<AtmosphericParticlesProps> = ({
  theme,
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
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 30 : 65;

    const particles: Particle[] = [];

    // Particle color palettes per theme
    const colorsMap: Record<EnvironmentTheme, string[]> = {
      'sea-ice': ['#ffffff', '#e0f7ff', '#bfeaff', '#88d5f7', '#38bdf8'],
      'ozone-atmosphere': ['#5eead4', '#2dd4bf', '#a5f3fc', '#818cf8', '#c084fc'],
      'ocean-climate': ['#0284c7', '#0369a1', '#38bdf8', '#7dd3fc', '#14b8a6'],
      'space-satellite': ['#ffffff', '#93c5fd', '#c084fc', '#38bdf8', '#e2e8f0']
    };

    const colors = colorsMap[theme] || colorsMap['sea-ice'];

    const initParticles = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth || window.innerWidth;
      height = parent.clientHeight || window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * (theme === 'sea-ice' ? 2.5 : 1.8) + 0.8,
          alpha: Math.random() * 0.6 + 0.2,
          alphaSpeed: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
          vx: (Math.random() - 0.5) * (theme === 'sea-ice' ? 0.4 : 0.2),
          vy: theme === 'sea-ice' ? Math.random() * 0.3 + 0.1 : (Math.random() * 0.2 + 0.05) * -1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.75 || p.alpha < 0.15) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Wrap around bounds
        if (p.y > height) p.y = 0;
        if (p.y < 0) p.y = height;
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowBlur = theme === 'ozone-atmosphere' ? 8 : 4;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => initParticles();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-10 select-none ${className}`}
    />
  );
};

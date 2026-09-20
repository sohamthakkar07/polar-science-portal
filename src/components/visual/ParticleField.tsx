import React, { useEffect, useRef } from 'react';

interface ParticleFieldProps {
  mousePosition?: { x: number; y: number };
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  alphaSpeed: number;
  vx: number;
  vy: number;
  color: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  mousePosition = { x: 0, y: 0 },
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
    const particleCount = prefersReducedMotion ? 25 : isMobile ? 40 : 80;

    const particles: Particle[] = [];
    const colors = ['#ffffff', '#7dd3fc', '#38bdf8', '#52a5d7', '#93c5fd', '#a5f3fc'];

    const resizeCanvas = () => {
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

      if (particles.length === 0) {
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: 0.3 + Math.random() * 1.2,
            radius: Math.random() * 1.5 + 0.4,
            baseAlpha: Math.random() * 0.55 + 0.2,
            alpha: Math.random() * 0.55 + 0.2,
            alphaSpeed: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
            vx: (Math.random() - 0.5) * 0.15,
            vy: -0.12 - Math.random() * 0.25,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const parallaxX = (mousePosition.x - 0.5) * 16;
      const parallaxY = (mousePosition.y - 0.5) * 16;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx * p.z;
          p.y += p.vy * p.z;

          p.alpha += p.alphaSpeed;
          if (p.alpha > p.baseAlpha + 0.2 || p.alpha < Math.max(0.05, p.baseAlpha - 0.2)) {
            p.alphaSpeed = -p.alphaSpeed;
          }

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        const drawX = p.x + parallaxX * (1 / p.z) * 0.3;
        const drawY = p.y + parallaxY * (1 / p.z) * 0.3;

        ctx.save();
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, Math.max(0.05, p.alpha));

        if (p.radius > 1.2 && p.z > 0.9) {
          ctx.shadowBlur = 5;
          ctx.shadowColor = p.color;
        }

        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    />
  );
};

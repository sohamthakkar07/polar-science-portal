import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Compass, Radio, Activity, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface GlobeVisualizationProps {
  mousePosition?: { x: number; y: number };
  className?: string;
  onSelectStation?: (stationId: string) => void;
}

interface StationMarker {
  id: string;
  name: string;
  lat: number; // degrees
  lon: number; // degrees
  region: 'Antarctica' | 'Arctic' | 'Himalayas';
  flag: string;
}

const POLAR_STATIONS: StationMarker[] = [
  { id: 'maitri', name: 'Maitri Base', lat: -70.76, lon: 11.73, region: 'Antarctica', flag: '🇮🇳' },
  { id: 'bharati', name: 'Bharati Base', lat: -69.41, lon: 76.19, region: 'Antarctica', flag: '🇮🇳' },
  { id: 'himadri', name: 'Himadri Station', lat: 78.92, lon: 11.93, region: 'Arctic', flag: '🇮🇳' },
  { id: 'himansh', name: 'Himansh Lab', lat: 32.40, lon: 77.38, region: 'Himalayas', flag: '🇮🇳' }
];

// Antarctica continent simplified coastline relative polygon points (lat, lon)
const ANTARCTICA_POLYGON = [
  [-68, -60], [-72, -40], [-75, -20], [-78, 0], [-76, 30], [-70, 60], [-68, 90],
  [-66, 110], [-67, 130], [-70, 150], [-78, 170], [-84, -180], [-82, -140],
  [-74, -100], [-71, -75], [-68, -60]
];

export const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({
  mousePosition = { x: 0.5, y: 0.5 },
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeStationName, setActiveStationName] = useState<string>('Maitri Research Base');
  const [currentTelemetry, setCurrentTelemetry] = useState({ lat: '-70.76° S', lon: '11.73° E', alt: '700km Polar Orbit' });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotationAngle = 0;
    const tiltAngle = -0.55; // Tilt polar view ~32° so Antarctica & Southern Hemisphere are prominent

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.38;

      // Mouse interactive tilt delta
      const mouseTilt = (mousePosition.y - 0.5) * 0.15;
      const mouseRotate = (mousePosition.x - 0.5) * 0.15;
      const currentTilt = tiltAngle + mouseTilt;

      if (!prefersReducedMotion) {
        rotationAngle += 0.003; // Slow continuous 3D rotation
      }
      const activeRotation = rotationAngle + mouseRotate;

      // -------------------------------------------------------------
      // 1. OUTER ATMOSPHERIC GLOW HALO
      // -------------------------------------------------------------
      const outerGlow = ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.45);
      outerGlow.addColorStop(0, 'rgba(66, 194, 177, 0.35)');
      outerGlow.addColorStop(0.4, 'rgba(82, 165, 215, 0.18)');
      outerGlow.addColorStop(0.8, 'rgba(14, 61, 84, 0.08)');
      outerGlow.addColorStop(1, 'rgba(6, 11, 20, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.45, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // -------------------------------------------------------------
      // 2. GLOBE BASE SPHERE & SPECULAR LIGHTING
      // -------------------------------------------------------------
      // Deep space ocean gradient
      const sphereGradient = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.35,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      sphereGradient.addColorStop(0, '#1c3d5a');   // High specular highlight
      sphereGradient.addColorStop(0.4, '#0c2238'); // Mid ocean blue
      sphereGradient.addColorStop(0.85, '#061322'); // Deep ocean navy
      sphereGradient.addColorStop(1, '#02070e');   // Dark limb shadow

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGradient;
      ctx.fill();

      // Inner limb atmosphere rim light
      const rimGradient = ctx.createRadialGradient(cx, cy, radius * 0.82, cx, cy, radius);
      rimGradient.addColorStop(0, 'rgba(82, 165, 215, 0)');
      rimGradient.addColorStop(0.85, 'rgba(82, 165, 215, 0.12)');
      rimGradient.addColorStop(1, 'rgba(165, 243, 252, 0.45)');

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = rimGradient;
      ctx.fill();

      // Clip globe content within sphere boundary
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 0.5, 0, Math.PI * 2);
      ctx.clip();

      // 3D Projection helper function
      const project3D = (latDeg: number, lonDeg: number) => {
        const lat = (latDeg * Math.PI) / 180;
        const lon = (lonDeg * Math.PI) / 180 - activeRotation;

        const cosLat = Math.cos(lat);
        const sinLat = Math.sin(lat);
        const cosLon = Math.cos(lon);
        const sinLon = Math.sin(lon);

        const cosTilt = Math.cos(currentTilt);
        const sinTilt = Math.sin(currentTilt);

        // 3D coordinates on unit sphere
        const x3d = cosLat * sinLon;
        const y3d = sinLat;
        const z3d = cosLat * cosLon;

        // Apply tilt rotation around X-axis
        const yRotated = y3d * cosTilt - z3d * sinTilt;
        const zRotated = y3d * sinTilt + z3d * cosTilt;

        return {
          x: cx + x3d * radius,
          y: cy - yRotated * radius,
          z: zRotated, // > 0 means facing front hemisphere
          visible: zRotated > -0.15
        };
      };

      // -------------------------------------------------------------
      // 3. LATITUDE & LONGITUDE GRATICULE GRID
      // -------------------------------------------------------------
      ctx.lineWidth = 0.75;

      // Parallels (Latitude lines)
      const parallels = [-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75];
      parallels.forEach((lat) => {
        const isPolar = Math.abs(lat) >= 60;
        const isEquator = lat === 0;
        ctx.strokeStyle = isEquator
          ? 'rgba(66, 194, 177, 0.45)'
          : isPolar
          ? 'rgba(82, 165, 215, 0.35)'
          : 'rgba(56, 189, 248, 0.15)';

        ctx.beginPath();
        let firstPoint = true;
        for (let lon = -180; lon <= 180; lon += 5) {
          const pt = project3D(lat, lon);
          if (pt.visible) {
            if (firstPoint) {
              ctx.moveTo(pt.x, pt.y);
              firstPoint = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            firstPoint = true;
          }
        }
        ctx.stroke();
      });

      // Meridians (Longitude lines)
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
        ctx.beginPath();
        let firstPoint = true;
        for (let lat = -90; lat <= 90; lat += 5) {
          const pt = project3D(lat, lon);
          if (pt.visible) {
            if (firstPoint) {
              ctx.moveTo(pt.x, pt.y);
              firstPoint = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            firstPoint = true;
          }
        }
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 4. ANTARCTICA CONTINENT SILHOUETTE
      // -------------------------------------------------------------
      ctx.beginPath();
      let antarcticaStarted = false;
      ANTARCTICA_POLYGON.forEach(([lat, lon]) => {
        const pt = project3D(lat, lon);
        if (pt.visible) {
          if (!antarcticaStarted) {
            ctx.moveTo(pt.x, pt.y);
            antarcticaStarted = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
      });
      if (antarcticaStarted) {
        ctx.closePath();
        ctx.fillStyle = 'rgba(165, 243, 252, 0.14)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(165, 243, 252, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 5. POLAR STATIONS BEACON DOTS & PULSES
      // -------------------------------------------------------------
      POLAR_STATIONS.forEach((st) => {
        const pt = project3D(st.lat, st.lon);
        if (pt.visible) {
          // Beacon pulse ring
          const pulseTime = (Date.now() * 0.002) % (Math.PI * 2);
          const pulseRadius = 4 + Math.sin(pulseTime) * 3;

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(66, 194, 177, ' + (0.7 - pulseRadius / 10) + ')';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Center station dot
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#38bdf8';
          ctx.fill();
          ctx.shadowBlur = 0;

          // Station Tag Label
          ctx.font = 'bold 9px "JetBrains Mono", monospace';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`${st.flag} ${st.name}`, pt.x + 8, pt.y + 3);
        }
      });

      ctx.restore(); // Restore clip

      // -------------------------------------------------------------
      // 6. POLAR SATELLITE ORBIT RING
      // -------------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      const orbitRadiusX = radius * 1.22;
      const orbitRadiusY = radius * 0.38;
      ctx.ellipse(cx, cy, orbitRadiusX, orbitRadiusY, -0.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(82, 165, 215, 0.25)';
      ctx.setLineDash([3, 5]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // Satellite position along orbit ring
      const satAngle = Date.now() * 0.0008;
      const satX = cx + Math.cos(satAngle) * orbitRadiusX * Math.cos(-0.25) - Math.sin(satAngle) * orbitRadiusY * Math.sin(-0.25);
      const satY = cy + Math.cos(satAngle) * orbitRadiusX * Math.sin(-0.25) + Math.sin(satAngle) * orbitRadiusY * Math.cos(-0.25);

      ctx.beginPath();
      ctx.arc(satX, satY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#42c2b1';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#42c2b1';
      ctx.fill();
      ctx.restore();

      // Update telemetry display state
      const currentStation = POLAR_STATIONS[Math.floor((Date.now() / 4000) % POLAR_STATIONS.length)];
      if (currentStation && currentStation.name !== activeStationName) {
        setActiveStationName(`${currentStation.flag} ${currentStation.name}`);
        setCurrentTelemetry({
          lat: `${currentStation.lat > 0 ? currentStation.lat.toFixed(2) + '° N' : Math.abs(currentStation.lat).toFixed(2) + '° S'}`,
          lon: `${currentStation.lon.toFixed(2)}° E`,
          alt: 'Telemetry Active'
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  return (
    <div className={`relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center ${className}`}>
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block relative z-10" />

      {/* Scientific HUD Glass Box Frame */}
      <div className="absolute inset-0 border border-ice-500/20 rounded-3xl pointer-events-none z-20 shadow-glass backdrop-blur-[2px]">
        {/* HUD Corner Reticles */}
        <div className="absolute top-3 left-3 text-ice-400 font-mono text-[9px] flex items-center gap-1.5 bg-polar-950/80 px-2.5 py-1 rounded-md border border-polar-800">
          <Radio className="w-3 h-3 text-teal-400 animate-pulse" />
          <span className="uppercase tracking-widest font-bold">3D TELEMETRY OBSERVER</span>
        </div>

        <div className="absolute top-3 right-3 text-ice-300 font-mono text-[9px] flex items-center gap-1 bg-polar-950/80 px-2 py-1 rounded-md border border-polar-800">
          <Compass className="w-3 h-3 text-ice-400" />
          <span>EPSG:3031 / SOUTH POLE</span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-2xs font-mono bg-polar-950/90 border border-polar-800 px-3.5 py-2 rounded-xl text-slate-300 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
            <span className="text-white font-bold truncate max-w-[140px] sm:max-w-[180px]">{activeStationName}</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-slate-400 text-3xs">
            <span>LAT: <strong className="text-ice-300">{currentTelemetry.lat}</strong></span>
            <span>LON: <strong className="text-ice-300">{currentTelemetry.lon}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

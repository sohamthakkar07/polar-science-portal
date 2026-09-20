import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Compass,
  Play,
  Pause,
  MapPin,
  Layers,
  Sparkles,
  Info,
  Radio,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ResearchStation } from '../../types/polar';

interface InteractiveGlobeProps {
  stations: ResearchStation[];
  selectedStation: ResearchStation | null;
  hoveredStation: ResearchStation | null;
  onSelectStation: (station: ResearchStation) => void;
  onHoverStation: (station: ResearchStation | null) => void;
  onlyIndianStations: boolean;
}

// Spherical coordinates projection math helper
interface Point3D {
  x: number;
  y: number;
  z: number; // >0 is front of sphere, <0 is back face
}

// Convert lat/lon to 3D unit sphere relative to center (lambda0, phi0)
function projectSpherical(
  lat: number,
  lon: number,
  lambda0: number, // center longitude in degrees
  phi0: number,    // center latitude in degrees
  radius: number,
  cx: number,
  cy: number
): Point3D {
  const rad = Math.PI / 180;
  const phi = lat * rad;
  const lambda = lon * rad;
  const lam0 = lambda0 * rad;
  const p0 = phi0 * rad;

  const dLam = lambda - lam0;

  // Cosine of angular distance from center
  const cosC = Math.sin(p0) * Math.sin(phi) + Math.cos(p0) * Math.cos(phi) * Math.cos(dLam);

  // Screen coordinates
  const x = cx + radius * Math.cos(phi) * Math.sin(dLam);
  const y = cy - radius * (Math.cos(p0) * Math.sin(phi) - Math.sin(p0) * Math.cos(phi) * Math.cos(dLam));

  return { x, y, z: cosC };
}

// Polygon data for continents (simplified high-precision spherical paths)
const CONTINENT_POLYGONS: { name: string; isIce?: boolean; points: [number, number][] }[] = [
  // ANTARCTICA MAIN MASS
  {
    name: 'East & West Antarctica',
    isIce: true,
    points: [
      [-65.0, 60.0], [-67.0, 75.0], [-69.0, 90.0], [-66.0, 110.0], [-67.0, 130.0],
      [-68.0, 145.0], [-72.0, 160.0], [-77.0, 170.0], [-80.0, 180.0], [-78.0, -160.0],
      [-74.0, -140.0], [-72.0, -120.0], [-71.0, -100.0], [-74.0, -80.0], [-75.0, -60.0],
      [-65.0, -64.0], [-63.0, -57.0], [-70.0, -45.0], [-72.0, -20.0], [-70.0, 0.0],
      [-69.0, 20.0], [-68.0, 40.0], [-65.0, 60.0]
    ]
  },
  // ANTARCTIC PENINSULA
  {
    name: 'Antarctic Peninsula',
    isIce: true,
    points: [
      [-75.0, -65.0], [-71.0, -68.0], [-68.0, -66.0], [-64.0, -62.0], [-63.0, -57.0],
      [-66.0, -64.0], [-70.0, -67.0], [-75.0, -65.0]
    ]
  },
  // ROSS ICE SHELF
  {
    name: 'Ross Ice Shelf',
    isIce: true,
    points: [
      [-77.0, 165.0], [-78.0, 180.0], [-78.0, -160.0], [-85.0, -150.0], [-85.0, 165.0], [-77.0, 165.0]
    ]
  },
  // RONNE ICE SHELF
  {
    name: 'Ronne Ice Shelf',
    isIce: true,
    points: [
      [-75.0, -60.0], [-78.0, -50.0], [-82.0, -60.0], [-80.0, -80.0], [-75.0, -75.0], [-75.0, -60.0]
    ]
  },
  // GREENLAND
  {
    name: 'Greenland',
    isIce: true,
    points: [
      [60.0, -43.0], [65.0, -38.0], [70.0, -22.0], [76.0, -18.0], [82.0, -30.0],
      [83.0, -40.0], [78.0, -70.0], [72.0, -55.0], [65.0, -52.0], [60.0, -43.0]
    ]
  },
  // SVALBARD
  {
    name: 'Svalbard',
    isIce: true,
    points: [
      [76.5, 15.0], [78.0, 12.0], [80.0, 15.0], [80.5, 24.0], [79.0, 27.0], [77.0, 22.0], [76.5, 15.0]
    ]
  },
  // INDIA & SOUTH ASIA
  {
    name: 'Indian Subcontinent',
    isIce: false,
    points: [
      [8.0, 77.5], [12.0, 75.0], [16.0, 73.0], [20.0, 70.0], [24.0, 68.0], [30.0, 70.0],
      [35.0, 76.0], [32.0, 78.0], [28.0, 88.0], [22.0, 89.0], [16.0, 82.0], [13.0, 80.0],
      [8.0, 77.5]
    ]
  },
  // EURASIA
  {
    name: 'Eurasia',
    isIce: false,
    points: [
      [36.0, -5.0], [43.0, 10.0], [45.0, 30.0], [40.0, 50.0], [35.0, 70.0], [30.0, 80.0],
      [20.0, 110.0], [30.0, 120.0], [40.0, 140.0], [60.0, 160.0], [70.0, 170.0], [75.0, 140.0],
      [73.0, 100.0], [70.0, 70.0], [70.0, 40.0], [71.0, 25.0], [60.0, 5.0], [50.0, -5.0],
      [36.0, -5.0]
    ]
  },
  // AFRICA
  {
    name: 'Africa',
    isIce: false,
    points: [
      [37.0, 10.0], [30.0, 32.0], [12.0, 44.0], [-10.0, 40.0], [-34.0, 25.0], [-34.0, 18.0],
      [-10.0, 13.0], [5.0, 0.0], [15.0, -17.0], [30.0, -10.0], [37.0, 10.0]
    ]
  },
  // NORTH AMERICA
  {
    name: 'North America',
    isIce: false,
    points: [
      [25.0, -80.0], [30.0, -82.0], [40.0, -74.0], [50.0, -60.0], [60.0, -64.0], [70.0, -90.0],
      [72.0, -125.0], [60.0, -150.0], [60.0, -165.0], [50.0, -130.0], [30.0, -115.0], [15.0, -92.0],
      [25.0, -80.0]
    ]
  },
  // SOUTH AMERICA
  {
    name: 'South America',
    isIce: false,
    points: [
      [12.0, -72.0], [-5.0, -35.0], [-23.0, -43.0], [-40.0, -62.0], [-55.0, -68.0], [-45.0, -75.0],
      [-15.0, -75.0], [0.0, -80.0], [12.0, -72.0]
    ]
  },
  // AUSTRALIA
  {
    name: 'Australia',
    isIce: false,
    points: [
      [-12.0, 130.0], [-15.0, 145.0], [-28.0, 153.0], [-38.0, 145.0], [-35.0, 117.0], [-22.0, 114.0],
      [-12.0, 130.0]
    ]
  }
];

export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  stations,
  selectedStation,
  hoveredStation,
  onSelectStation,
  onHoverStation,
  onlyIndianStations
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Globe orientation state (Center Longitude & Center Latitude in degrees)
  const [rotation, setRotation] = useState<{ lambda: number; phi: number }>({
    lambda: 45,  // Centered nicely around Indian Ocean / Antarctic view
    phi: -40
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState<{ dLambda: number; dPhi: number }>({ dLambda: 0, dPhi: 0 });
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoomScale, setZoomScale] = useState(1);

  // Target animation state for smooth camera transitions
  const targetRotationRef = useRef<{ lambda: number; phi: number } | null>(null);

  // Smoothly focus on selected station when it changes externally
  useEffect(() => {
    if (selectedStation) {
      targetRotationRef.current = {
        lambda: selectedStation.longitude,
        phi: selectedStation.latitude
      };
      setIsAutoRotating(false);
    }
  }, [selectedStation]);

  // Handle Preset Camera Rotations
  const setCameraPreset = (region: 'antarctic' | 'arctic' | 'indian' | 'global') => {
    setIsAutoRotating(false);
    if (region === 'antarctic') {
      targetRotationRef.current = { lambda: 45, phi: -82 };
    } else if (region === 'arctic') {
      targetRotationRef.current = { lambda: 15, phi: 78 };
    } else if (region === 'indian') {
      // Focus on Maitri & Bharati longitude sector
      targetRotationRef.current = { lambda: 45, phi: -65 };
    } else {
      targetRotationRef.current = { lambda: 40, phi: 10 };
    }
  };

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setVelocity({ dLambda: 0, dPhi: 0 });
    targetRotationRef.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    const sensitivity = 0.45 / zoomScale;
    const dLambda = dx * sensitivity;
    const dPhi = -dy * sensitivity;

    setRotation((prev) => ({
      lambda: (prev.lambda + dLambda) % 360,
      phi: Math.max(-89, Math.min(89, prev.phi + dPhi))
    }));

    setVelocity({ dLambda, dPhi });
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support for drag
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setVelocity({ dLambda: 0, dPhi: 0 });
      targetRotationRef.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.x;
    const dy = touch.clientY - dragStart.y;

    const sensitivity = 0.45 / zoomScale;
    const dLambda = dx * sensitivity;
    const dPhi = -dy * sensitivity;

    setRotation((prev) => ({
      lambda: (prev.lambda + dLambda) % 360,
      phi: Math.max(-89, Math.min(89, prev.phi + dPhi))
    }));

    setVelocity({ dLambda, dPhi });
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  // Main Render Animation Loop
  useEffect(() => {
    let animId: number;

    const render = () => {
      // 1. Update Rotation Dynamics
      setRotation((prev) => {
        let { lambda, phi } = prev;

        // Smooth camera targeting
        if (targetRotationRef.current) {
          const target = targetRotationRef.current;
          let diffLam = (target.lambda - lambda) % 360;
          if (diffLam > 180) diffLam -= 360;
          if (diffLam < -180) diffLam += 360;
          const diffPhi = target.phi - phi;

          if (Math.abs(diffLam) < 0.1 && Math.abs(diffPhi) < 0.1) {
            targetRotationRef.current = null;
          } else {
            lambda += diffLam * 0.08;
            phi += diffPhi * 0.08;
          }
        }
        // Inertia decay after drag
        else if (!isDragging && (Math.abs(velocity.dLambda) > 0.01 || Math.abs(velocity.dPhi) > 0.01)) {
          lambda += velocity.dLambda;
          phi = Math.max(-89, Math.min(89, phi + velocity.dPhi));
          setVelocity((v) => ({
            dLambda: v.dLambda * 0.92,
            dPhi: v.dPhi * 0.92
          }));
        }
        // Auto rotation
        else if (isAutoRotating && !isDragging && !hoveredStation) {
          lambda += 0.08;
        }

        return { lambda, phi };
      });

      // 2. Draw Globe on Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;
          const cx = width / 2;
          const cy = height / 2;
          const baseRadius = Math.min(width, height) * 0.42;
          const radius = baseRadius * zoomScale;

          ctx.clearRect(0, 0, width, height);

          // Outer Atmosphere Rim Glow
          const outerGlow = ctx.createRadialGradient(cx, cy, radius * 0.9, cx, cy, radius * 1.25);
          outerGlow.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
          outerGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.08)');
          outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = outerGlow;
          ctx.beginPath();
          ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
          ctx.fill();

          // Globe Sphere Base (Deep Ocean Hydro-sphere)
          const oceanGrad = ctx.createRadialGradient(
            cx - radius * 0.3,
            cy - radius * 0.3,
            radius * 0.1,
            cx,
            cy,
            radius
          );
          oceanGrad.addColorStop(0, '#0a2342');
          oceanGrad.addColorStop(0.6, '#06152a');
          oceanGrad.addColorStop(1, '#020914');

          ctx.save();
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fillStyle = oceanGrad;
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#1e3a66';
          ctx.stroke();

          // Clip to sphere for landmasses and graticule
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.clip();

          // Graticule (Latitude Circles & Longitude Meridians)
          ctx.lineWidth = 0.75;
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';

          // Latitude lines
          [-66.5, -60, -30, 0, 30, 66.5].forEach((latVal) => {
            ctx.beginPath();
            let started = false;
            for (let lonVal = -180; lonVal <= 180; lonVal += 5) {
              const p = projectSpherical(latVal, lonVal, rotation.lambda, rotation.phi, radius, cx, cy);
              if (p.z > 0) {
                if (!started) {
                  ctx.moveTo(p.x, p.y);
                  started = true;
                } else {
                  ctx.lineTo(p.x, p.y);
                }
              } else {
                started = false;
              }
            }
            if (latVal === -60) {
              ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
              ctx.setLineDash([4, 4]);
            } else if (latVal === 0) {
              ctx.strokeStyle = 'rgba(77, 143, 226, 0.25)';
              ctx.setLineDash([]);
            } else {
              ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
              ctx.setLineDash([]);
            }
            ctx.stroke();
            ctx.setLineDash([]);
          });

          // Longitude lines
          for (let lonVal = -180; lonVal < 180; lonVal += 30) {
            ctx.beginPath();
            let started = false;
            for (let latVal = -89; latVal <= 89; latVal += 5) {
              const p = projectSpherical(latVal, lonVal, rotation.lambda, rotation.phi, radius, cx, cy);
              if (p.z > 0) {
                if (!started) {
                  ctx.moveTo(p.x, p.y);
                  started = true;
                } else {
                  ctx.lineTo(p.x, p.y);
                }
              } else {
                started = false;
              }
            }
            ctx.stroke();
          }

          // Render Continents Polygons
          CONTINENT_POLYGONS.forEach((continent) => {
            ctx.beginPath();
            let visibleCount = 0;

            continent.points.forEach(([latVal, lonVal], idx) => {
              const p = projectSpherical(latVal, lonVal, rotation.lambda, rotation.phi, radius, cx, cy);
              if (p.z > 0) visibleCount++;

              if (idx === 0) {
                ctx.moveTo(p.x, p.y);
              } else {
                ctx.lineTo(p.x, p.y);
              }
            });
            ctx.closePath();

            if (visibleCount > 0) {
              if (continent.isIce) {
                ctx.fillStyle = 'rgba(224, 247, 255, 0.35)';
                ctx.strokeStyle = 'rgba(186, 230, 253, 0.6)';
                ctx.lineWidth = 1.2;
              } else {
                ctx.fillStyle = 'rgba(15, 42, 74, 0.55)';
                ctx.strokeStyle = 'rgba(34, 78, 138, 0.5)';
                ctx.lineWidth = 1;
              }
              ctx.fill();
              ctx.stroke();
            }
          });

          // Shading Gradient Overlay for 3D Sphere Depth
          const depthShading = ctx.createRadialGradient(
            cx - radius * 0.4,
            cy - radius * 0.4,
            radius * 0.2,
            cx,
            cy,
            radius
          );
          depthShading.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
          depthShading.addColorStop(0.7, 'rgba(0, 0, 0, 0.1)');
          depthShading.addColorStop(1, 'rgba(2, 9, 20, 0.7)');
          ctx.fillStyle = depthShading;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore(); // Restore unclipped state for station beacons and tags

          // Render Research Station Beacons
          const now = Date.now();
          const pulse = (Math.sin(now / 300) + 1) / 2; // 0..1 smooth pulse

          stations.forEach((station) => {
            const p = projectSpherical(
              station.latitude,
              station.longitude,
              rotation.lambda,
              rotation.phi,
              radius,
              cx,
              cy
            );

            // Hide back-face stations completely or fade them out
            if (p.z <= 0.05) return;

            const isSelected = selectedStation?.id === station.id;
            const isHovered = hoveredStation?.id === station.id;
            const isActive = isSelected || isHovered;

            const colorMain = station.isIndianStation
              ? '#f97316'
              : isSelected
              ? '#38bdf8'
              : '#0284c7';
            const colorGlow = station.isIndianStation ? '#fbbf24' : '#7dd3fc';

            // Outer Pulse Ring
            ctx.beginPath();
            ctx.arc(p.x, p.y, (isActive ? 14 : 9) + pulse * 4, 0, Math.PI * 2);
            ctx.strokeStyle = colorMain;
            ctx.lineWidth = isActive ? 2 : 1;
            ctx.globalAlpha = 0.4 + pulse * 0.4;
            ctx.stroke();
            ctx.globalAlpha = 1;

            // Beacon Base Circle
            ctx.beginPath();
            ctx.arc(p.x, p.y, isActive ? 9 : 5.5, 0, Math.PI * 2);
            ctx.fillStyle = colorMain;
            ctx.shadowColor = colorGlow;
            ctx.shadowBlur = isActive ? 12 : 6;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Core White Dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, isActive ? 3.5 : 2, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            // Render Label Tag for Indian or Active Stations
            if (station.isIndianStation || isActive) {
              const labelText = station.isIndianStation ? `🇮🇳 ${station.name}` : station.name;
              ctx.font = `${isActive ? 'bold 11px' : 'bold 9.5px'} monospace`;
              const textWidth = ctx.measureText(labelText).width;

              const boxX = p.x + 12;
              const boxY = p.y - 12;
              const boxW = textWidth + 12;
              const boxH = 20;

              // Draw leader line
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(boxX, boxY + boxH / 2);
              ctx.strokeStyle = colorMain;
              ctx.lineWidth = 1;
              ctx.stroke();

              // Draw tag box
              ctx.fillStyle = 'rgba(4, 9, 20, 0.9)';
              ctx.strokeStyle = colorMain;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.roundRect ? ctx.roundRect(boxX, boxY, boxW, boxH, 4) : ctx.rect(boxX, boxY, boxW, boxH);
              ctx.fill();
              ctx.stroke();

              // Draw tag text
              ctx.fillStyle = station.isIndianStation ? '#fbbf24' : '#e0f7ff';
              ctx.fillText(labelText, boxX + 6, boxY + 14);
            }
          });
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [rotation, zoomScale, isDragging, velocity, isAutoRotating, stations, selectedStation, hoveredStation]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (canvas && container) {
        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle canvas mouse move for hover detection
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const mouseX = (e.clientX - rect.left) * dpr;
    const mouseY = (e.clientY - rect.top) * dpr;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.42 * zoomScale;

    let found: ResearchStation | null = null;

    for (const station of stations) {
      const p = projectSpherical(
        station.latitude,
        station.longitude,
        rotation.lambda,
        rotation.phi,
        radius,
        cx,
        cy
      );

      if (p.z > 0.05) {
        const dist = Math.hypot(mouseX - p.x, mouseY - p.y);
        if (dist <= 18 * dpr) {
          found = station;
          break;
        }
      }
    }

    onHoverStation(found);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const mouseX = (e.clientX - rect.left) * dpr;
    const mouseY = (e.clientY - rect.top) * dpr;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.42 * zoomScale;

    for (const station of stations) {
      const p = projectSpherical(
        station.latitude,
        station.longitude,
        rotation.lambda,
        rotation.phi,
        radius,
        cx,
        cy
      );

      if (p.z > 0.05) {
        const dist = Math.hypot(mouseX - p.x, mouseY - p.y);
        if (dist <= 20 * dpr) {
          onSelectStation(station);
          break;
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[540px] sm:h-[640px] bg-polar-950 rounded-3xl border border-polar-750 overflow-hidden flex items-center justify-center shadow-2xl select-none"
    >
      {/* Background Starfield Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a66_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      {/* HTML5 Interactive Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={(e) => {
          handleMouseMove(e);
          handleCanvasMouseMove(e);
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          onHoverStation(null);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-grab active:cursor-grabbing z-10"
      />

      {/* Top Left Camera Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCameraPreset('antarctic')}
          className="px-3 py-1.5 rounded-xl bg-polar-900/90 border border-polar-750 hover:border-ice-400 text-xs font-mono font-bold text-slate-200 hover:text-white backdrop-blur-md cursor-pointer transition-all shadow-md flex items-center gap-1.5"
        >
          <span>🇦🇶 Antarctic Focus</span>
        </button>
        <button
          type="button"
          onClick={() => setCameraPreset('arctic')}
          className="px-3 py-1.5 rounded-xl bg-polar-900/90 border border-polar-750 hover:border-ice-400 text-xs font-mono font-bold text-slate-200 hover:text-white backdrop-blur-md cursor-pointer transition-all shadow-md flex items-center gap-1.5"
        >
          <span>🧊 Arctic Focus</span>
        </button>
        <button
          type="button"
          onClick={() => setCameraPreset('indian')}
          className="px-3 py-1.5 rounded-xl bg-orange-950/80 border border-orange-500/50 hover:border-orange-400 text-xs font-mono font-bold text-orange-300 hover:text-orange-200 backdrop-blur-md cursor-pointer transition-all shadow-md flex items-center gap-1.5"
        >
          <span>🇮🇳 Indian Stations</span>
        </button>
        <button
          type="button"
          onClick={() => setCameraPreset('global')}
          className="px-3 py-1.5 rounded-xl bg-polar-900/90 border border-polar-750 hover:border-ice-400 text-xs font-mono font-bold text-slate-200 hover:text-white backdrop-blur-md cursor-pointer transition-all shadow-md flex items-center gap-1.5"
        >
          <span>🌐 Global View</span>
        </button>
      </div>

      {/* Top Right Zoom & Auto-Rotate Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer shadow-md ${
            isAutoRotating
              ? 'bg-teal-500/20 border-teal-400 text-teal-300'
              : 'bg-polar-900/90 border-polar-750 text-slate-400 hover:text-slate-200'
          }`}
          title={isAutoRotating ? 'Pause Ambient Rotation' : 'Resume Ambient Rotation'}
        >
          {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isAutoRotating ? 'Rotating' : 'Paused'}</span>
        </button>

        <div className="flex items-center gap-1 bg-polar-900/90 p-1 rounded-xl border border-polar-750 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setZoomScale((z) => Math.min(1.8, z + 0.2))}
            className="p-1.5 text-slate-300 hover:text-white cursor-pointer hover:bg-polar-800 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomScale((z) => Math.max(0.7, z - 0.2))}
            className="p-1.5 text-slate-300 hover:text-white cursor-pointer hover:bg-polar-800 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomScale(1)}
            className="p-1.5 text-slate-300 hover:text-white cursor-pointer hover:bg-polar-800 rounded-lg transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Center Coordinate Indicator Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-polar-900/90 px-4 py-2 rounded-2xl border border-polar-750 text-2xs font-mono text-slate-300 backdrop-blur-md shadow-lg flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-ice-400 animate-spin-slow" />
          <span>CENTER: {Math.abs(rotation.phi).toFixed(1)}°{rotation.phi < 0 ? 'S' : 'N'}, {Math.abs(rotation.lambda).toFixed(1)}°{rotation.lambda < 0 ? 'W' : 'E'}</span>
        </div>
        <span className="text-polar-700">|</span>
        <span className="text-teal-400">{stations.length} Station Beacons Active</span>
      </div>

      {/* Hover Station Floating Card Overlay */}
      {hoveredStation && (
        <div className="absolute bottom-16 left-4 z-30 max-w-xs bg-polar-950/95 p-4 rounded-2xl border border-ice-400/60 shadow-2xl backdrop-blur-md text-xs space-y-1.5 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-sm">
              {hoveredStation.isIndianStation ? '🇮🇳 ' : ''}
              {hoveredStation.name}
            </span>
            <span className="text-[10px] text-teal-300 font-mono">{hoveredStation.establishedYear}</span>
          </div>
          <div className="text-[11px] text-slate-300">{hoveredStation.operator}</div>
          <div className="text-[10px] text-slate-400 font-mono">
            {Math.abs(hoveredStation.latitude).toFixed(2)}°{hoveredStation.latitude < 0 ? 'S' : 'N'},{' '}
            {Math.abs(hoveredStation.longitude).toFixed(2)}°{hoveredStation.longitude < 0 ? 'W' : 'E'} • {hoveredStation.elevationMeters}m
          </div>
          <div className="pt-1.5 flex items-center justify-between text-[10px] text-ice-300 font-bold border-t border-polar-800">
            <span>Click beacon to inspect telemetry</span>
            <span>Mean: {hoveredStation.climateSummary.avgAnnualTempC}°C</span>
          </div>
        </div>
      )}
    </div>
  );
};

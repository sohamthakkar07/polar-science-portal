import React, { useState, useMemo } from 'react';
import { Download, BarChart2, Table as TableIcon, Info, ShieldCheck, FileSpreadsheet, Layers } from 'lucide-react';
import {
  SEA_ICE_EXTENT_SERIES,
  POLAR_TEMPERATURE_ANOMALY,
  OZONE_HOLE_TIME_SERIES,
  MAITRI_METEOROLOGY_SERIES,
  HIMALAYAN_GLACIER_MASS_BALANCE,
  SOUTHERN_OCEAN_HEAT_CONTENT
} from '../../data/timeSeriesData';

interface DataVisualizerProps {
  datasetKey?: string;
  title?: string;
  unit?: string;
  provenanceOrg?: string;
  doi?: string;
  compact?: boolean;
}

export const DataVisualizer: React.FC<DataVisualizerProps> = ({
  datasetKey = 'sea_ice_extent',
  title,
  unit,
  provenanceOrg = 'NSIDC / NASA',
  doi = '10.7265/N5K072F8',
  compact = false
}) => {
  const [viewMode, setViewMode] = useState<'line' | 'area' | 'table'>('line');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Resolve data and config based on datasetKey
  const { data, lines, yAxisLabel, defaultTitle, defaultUnit } = useMemo(() => {
    switch (datasetKey) {
      case 'sea_ice_extent':
        return {
          data: SEA_ICE_EXTENT_SERIES,
          defaultTitle: 'Arctic vs Antarctic Sea Ice Extent Record (1979–2024)',
          defaultUnit: 'million km²',
          yAxisLabel: 'Extent (million km²)',
          lines: [
            { key: 'arcticSeptMin', name: 'Arctic Sept Minimum', color: '#52a5d7', strokeWidth: 2.5 },
            { key: 'antarcticSeptMax', name: 'Antarctic Sept Maximum', color: '#818cf8', strokeWidth: 2.5 },
            { key: 'antarcticFebMin', name: 'Antarctic Feb Minimum', color: '#f43f5e', strokeWidth: 2 },
            { key: 'arcticMarchMax', name: 'Arctic March Maximum', color: '#42c2b1', strokeWidth: 2 }
          ]
        };
      case 'temperature_anomaly':
      case 'polar_temperature':
        return {
          data: POLAR_TEMPERATURE_ANOMALY,
          defaultTitle: 'Arctic & Antarctic vs Global Temperature Anomaly (1900–2024)',
          defaultUnit: '°C (relative to 1951-1980 baseline)',
          yAxisLabel: 'Anomaly (°C)',
          lines: [
            { key: 'arcticAnomaly', name: 'Arctic Anomaly (Polar Amplification)', color: '#f59e0b', strokeWidth: 3 },
            { key: 'antarcticAnomaly', name: 'Antarctic Anomaly', color: '#52a5d7', strokeWidth: 2 },
            { key: 'globalAnomaly', name: 'Global Mean Anomaly', color: '#94a3b8', strokeWidth: 2 }
          ]
        };
      case 'ozone_hole':
      case 'ozone_hole_series':
        return {
          data: OZONE_HOLE_TIME_SERIES,
          defaultTitle: 'Antarctic Total Column Minimum Ozone (1979–2024)',
          defaultUnit: 'Dobson Units (DU)',
          yAxisLabel: 'Minimum Ozone (DU)',
          lines: [
            { key: 'minDobsonUnits', name: 'Minimum Ozone Column', color: '#a855f7', strokeWidth: 3 },
            { key: 'holeAreaMillionKm2', name: 'Ozone Hole Area (million km²)', color: '#f43f5e', strokeWidth: 2 }
          ]
        };
      case 'maitri_met':
        return {
          data: MAITRI_METEOROLOGY_SERIES,
          defaultTitle: 'Maitri Station Surface Meteorological Record (1990–2024)',
          defaultUnit: '°C / km/h',
          yAxisLabel: 'Value',
          lines: [
            { key: 'meanTempC', name: 'Annual Mean Temp (°C)', color: '#52a5d7', strokeWidth: 2.5 },
            { key: 'minTempC', name: 'Record Min Temp (°C)', color: '#6366f1', strokeWidth: 1.5 },
            { key: 'avgWindKmh', name: 'Avg Wind Speed (km/h)', color: '#42c2b1', strokeWidth: 2 }
          ]
        };
      case 'himalayan_mass_balance':
        return {
          data: HIMALAYAN_GLACIER_MASS_BALANCE,
          defaultTitle: 'Chandra Basin Himalayan Cumulative Glacier Mass Balance (2002–2024)',
          defaultUnit: 'meters water equivalent (m w.e.)',
          yAxisLabel: 'Cumulative Loss (m w.e.)',
          lines: [
            { key: 'cumulativeLossMetersWE', name: 'Cumulative Mass Loss (m w.e.)', color: '#ef4444', strokeWidth: 3 },
            { key: 'annualBalance', name: 'Annual Balance (m w.e./yr)', color: '#52a5d7', strokeWidth: 2 }
          ]
        };
      case 'southern_ocean_heat':
        return {
          data: SOUTHERN_OCEAN_HEAT_CONTENT,
          defaultTitle: 'Southern Ocean 0–2000m Heat Content Anomaly (1970–2024)',
          defaultUnit: '10²² Joules',
          yAxisLabel: 'Heat Content Anomaly (10²² J)',
          lines: [
            { key: 'heatContentAnomaly1022J', name: 'Heat Content (0-2000m)', color: '#f97316', strokeWidth: 3 }
          ]
        };
      default:
        return {
          data: SEA_ICE_EXTENT_SERIES,
          defaultTitle: 'Polar Observation Series',
          defaultUnit: 'Standard Units',
          yAxisLabel: 'Metric Value',
          lines: [
            { key: 'arcticSeptMin', name: 'Arctic Sept Minimum', color: '#52a5d7', strokeWidth: 2.5 },
            { key: 'antarcticSeptMax', name: 'Antarctic Sept Maximum', color: '#818cf8', strokeWidth: 2.5 }
          ]
        };
    }
  }, [datasetKey]);

  const [exportedCsv, setExportedCsv] = useState(false);

  // CSV download function
  const handleDownloadCsv = () => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((d) => Object.values(d).join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `polarverse_${datasetKey}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportedCsv(true);
    setTimeout(() => setExportedCsv(false), 2200);
  };

  const chartTitle = title || defaultTitle;
  const chartUnit = unit || defaultUnit;

  // Chart dimensions & scaling math for SVG
  const width = 800;
  const height = compact ? 220 : 320;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };

  const chartMath = useMemo(() => {
    if (!data || data.length === 0) return null;

    let minY = Infinity;
    let maxY = -Infinity;

    data.forEach((row: any) => {
      lines.forEach((l) => {
        const val = row[l.key];
        if (typeof val === 'number') {
          if (val < minY) minY = val;
          if (val > maxY) maxY = val;
        }
      });
    });

    if (minY === maxY) {
      minY -= 1;
      maxY += 1;
    }

    // Add padding to Y bounds
    const yRange = maxY - minY;
    minY = minY - yRange * 0.05;
    maxY = maxY + yRange * 0.05;

    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;

    const getX = (index: number) => {
      if (data.length <= 1) return padding.left;
      return padding.left + (index / (data.length - 1)) * innerWidth;
    };

    const getY = (val: number) => {
      return padding.top + innerHeight - ((val - minY) / (maxY - minY)) * innerHeight;
    };

    // Build SVG path strings
    const paths = lines.map((l) => {
      const linePoints: string[] = [];
      const areaPoints: string[] = [];

      data.forEach((row: any, i: number) => {
        const val = row[l.key];
        if (typeof val === 'number') {
          const x = getX(i);
          const y = getY(val);
          const pt = `${x.toFixed(1)},${y.toFixed(1)}`;
          linePoints.push(i === 0 ? `M ${pt}` : `L ${pt}`);
          areaPoints.push(i === 0 ? `M ${pt}` : `L ${pt}`);
        }
      });

      const lineD = linePoints.join(' ');

      // Close area path down to baseline
      const lastX = getX(data.length - 1);
      const firstX = getX(0);
      const baseY = getY(Math.max(0, minY));
      const areaD = `${lineD} L ${lastX.toFixed(1)},${baseY.toFixed(1)} L ${firstX.toFixed(1)},${baseY.toFixed(1)} Z`;

      return { key: l.key, lineD, areaD, color: l.color, strokeWidth: l.strokeWidth };
    });

    // Generate Y axis ticks
    const tickCount = 5;
    const yTicks = Array.from({ length: tickCount }).map((_, i) => {
      const val = minY + (i / (tickCount - 1)) * (maxY - minY);
      const y = getY(val);
      return { val, y };
    });

    // Generate X axis ticks (subsampled)
    const xStep = Math.ceil(data.length / 6);
    const xTicks = data
      .map((row: any, i: number) => ({ year: row.year, x: getX(i), index: i }))
      .filter((_, i) => i % xStep === 0 || i === data.length - 1);

    return { getX, getY, paths, yTicks, xTicks, minY, maxY };
  }, [data, lines, width, height, compact]);

  const activeRow = hoverIndex !== null && data[hoverIndex] ? data[hoverIndex] : null;

  return (
    <div className="w-full bg-polar-900/90 rounded-2xl border border-polar-800 p-4 sm:p-6 shadow-panel backdrop-blur-xl space-y-4">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-polar-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-ice-400" />
            <h3 className="text-sm sm:text-base font-bold text-white font-mono">
              {chartTitle}
            </h3>
          </div>
          <p className="text-2xs text-slate-400 font-mono mt-1 flex items-center gap-2">
            <span>Unit: {chartUnit}</span>
            <span>•</span>
            <span className="text-teal-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              {provenanceOrg}
            </span>
          </p>
        </div>

        {/* View mode toggle & CSV export */}
        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
          <div className="flex items-center bg-polar-950 p-1 rounded-lg border border-polar-800">
            <button
              onClick={() => setViewMode('line')}
              className={`px-2.5 py-1 rounded text-2xs font-semibold transition-all ${
                viewMode === 'line' ? 'bg-ice-500 text-polar-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setViewMode('area')}
              className={`px-2.5 py-1 rounded text-2xs font-semibold transition-all ${
                viewMode === 'area' ? 'bg-ice-500 text-polar-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded text-2xs font-semibold transition-all ${
                viewMode === 'table' ? 'bg-ice-500 text-polar-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Table
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownloadCsv}
            className={`px-3 py-1.5 rounded-lg border font-mono text-2xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              exportedCsv
                ? 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold'
                : 'bg-polar-950 border-polar-750 hover:border-ice-400 text-slate-300 hover:text-white'
            }`}
            title="Download CSV dataset"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-teal-400" />
            <span>{exportedCsv ? '✓ CSV Downloaded' : 'CSV'}</span>
          </button>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap items-center gap-4 text-2xs font-mono text-slate-300 px-1">
        {lines.map((l) => (
          <div key={l.key} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
            <span>{l.name}</span>
          </div>
        ))}
      </div>

      {/* Chart Canvas / SVG View */}
      {(viewMode === 'line' || viewMode === 'area') && chartMath && (
        <div className="relative w-full overflow-hidden rounded-xl bg-polar-950/80 border border-polar-800/80 p-2">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto overflow-visible select-none"
            onMouseLeave={() => setHoverIndex(null)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const mouseX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, (mouseX - padding.left) / (width - padding.left - padding.right)));
              const index = Math.round(ratio * (data.length - 1));
              setHoverIndex(index);
            }}
          >
            <defs>
              {lines.map((l) => (
                <linearGradient key={`grad-${l.key}`} id={`grad-${l.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={l.color} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={l.color} stopOpacity="0.0" />
                </linearGradient>
              ))}
            </defs>

            {/* Gridlines */}
            {chartMath.yTicks.map((t, idx) => (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={t.y}
                  x2={width - padding.right}
                  y2={t.y}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={t.y + 3}
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {t.val.toFixed(1)}
                </text>
              </g>
            ))}

            {/* X Axis Labels */}
            {chartMath.xTicks.map((t, idx) => (
              <text
                key={idx}
                x={t.x}
                y={height - 10}
                fill="#64748b"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {t.year}
              </text>
            ))}

            {/* Area Paths */}
            {viewMode === 'area' &&
              chartMath.paths.map((p) => (
                <path key={`area-${p.key}`} d={p.areaD} fill={`url(#grad-${p.key})`} />
              ))}

            {/* Line Paths */}
            {chartMath.paths.map((p) => (
              <path
                key={`line-${p.key}`}
                d={p.lineD}
                fill="none"
                stroke={p.color}
                strokeWidth={p.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Active Hover Crosshair Line */}
            {hoverIndex !== null && data[hoverIndex] && (
              <line
                x1={chartMath.getX(hoverIndex)}
                y1={padding.top}
                x2={chartMath.getX(hoverIndex)}
                y2={height - padding.bottom}
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
            )}
          </svg>

          {/* Floating Hover Tooltip */}
          {activeRow && hoverIndex !== null && (
            <div className="absolute top-4 right-4 bg-polar-900/95 border border-polar-750 p-3 rounded-xl shadow-panel text-2xs font-mono backdrop-blur-xl space-y-1 z-10">
              <div className="font-bold text-white border-b border-polar-800 pb-1">
                Year: {activeRow.year}
              </div>
              {lines.map((l) => (
                <div key={l.key} className="flex items-center justify-between gap-4">
                  <span style={{ color: l.color }}>{l.name}:</span>
                  <span className="font-bold text-white">
                    {activeRow[l.key] !== undefined ? activeRow[l.key] : 'N/A'} {chartUnit}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto border border-polar-800 rounded-xl max-h-72 font-mono text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-polar-950 text-slate-400 sticky top-0 border-b border-polar-800">
              <tr>
                <th className="p-3 font-semibold">Year</th>
                {lines.map((l) => (
                  <th key={l.key} className="p-3 font-semibold" style={{ color: l.color }}>
                    {l.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-polar-850 text-slate-300">
              {data.map((row: any, i: number) => (
                <tr key={i} className="hover:bg-polar-850/60 transition-colors">
                  <td className="p-3 font-bold text-white">{row.year}</td>
                  {lines.map((l) => (
                    <td key={l.key} className="p-3">
                      {row[l.key] !== undefined ? row[l.key] : '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Provenance footer */}
      <div className="flex items-center justify-between text-3xs font-mono text-slate-500 pt-2 border-t border-polar-800/80">
        <span>DOI: {doi}</span>
        <span>Verified Ground-Truth Telemetry Series</span>
      </div>
    </div>
  );
};

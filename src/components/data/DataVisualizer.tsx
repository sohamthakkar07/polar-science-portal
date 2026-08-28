import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { Download, BarChart2, Table as TableIcon, Info, ShieldCheck, Eye, EyeOff } from 'lucide-react';
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
  const [activeSeries, setActiveSeries] = useState<Record<string, boolean>>({
    series1: true,
    series2: true,
    series3: true,
  });

  // Resolve data and config based on datasetKey
  const { data, lines, yAxisLabel, defaultTitle, defaultUnit } = React.useMemo(() => {
    switch (datasetKey) {
      case 'sea_ice_extent':
        return {
          data: SEA_ICE_EXTENT_SERIES,
          defaultTitle: 'Arctic vs Antarctic Sea Ice Extent (1979–2024)',
          defaultUnit: 'million km²',
          yAxisLabel: 'Extent (million km²)',
          lines: [
            { key: 'arcticSeptMin', name: 'Arctic Sept Minimum', color: '#38bdf8', strokeWidth: 2.5 },
            { key: 'antarcticSeptMax', name: 'Antarctic Sept Maximum', color: '#818cf8', strokeWidth: 2.5 },
            { key: 'antarcticFebMin', name: 'Antarctic Feb Minimum', color: '#fb7185', strokeWidth: 2 },
            { key: 'arcticMarchMax', name: 'Arctic March Maximum', color: '#2dd4bf', strokeWidth: 2 }
          ]
        };
      case 'temperature_anomaly':
      case 'polar_temperature':
        return {
          data: POLAR_TEMPERATURE_ANOMALY,
          defaultTitle: 'Arctic & Antarctic vs Global Temperature Anomaly (1900–2024)',
          defaultUnit: '°C (relative to 1951-1980 base)',
          yAxisLabel: 'Anomaly (°C)',
          lines: [
            { key: 'arcticAnomaly', name: 'Arctic Anomaly (Polar Amplification)', color: '#fbbf24', strokeWidth: 3 },
            { key: 'antarcticAnomaly', name: 'Antarctic Anomaly', color: '#38bdf8', strokeWidth: 2 },
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
            { key: 'meanTempC', name: 'Annual Mean Temp (°C)', color: '#38bdf8', strokeWidth: 2.5 },
            { key: 'minTempC', name: 'Record Min Temp (°C)', color: '#6366f1', strokeWidth: 1.5 },
            { key: 'avgWindKmh', name: 'Avg Wind Speed (km/h)', color: '#2dd4bf', strokeWidth: 2 }
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
            { key: 'annualBalance', name: 'Annual Balance (m w.e./yr)', color: '#38bdf8', strokeWidth: 2 }
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
            { key: 'arcticSeptMin', name: 'Arctic Sept Minimum', color: '#38bdf8', strokeWidth: 2.5 },
            { key: 'antarcticSeptMax', name: 'Antarctic Sept Maximum', color: '#818cf8', strokeWidth: 2.5 }
          ]
        };
    }
  }, [datasetKey]);

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
  };

  const chartTitle = title || defaultTitle;
  const chartUnit = unit || defaultUnit;

  return (
    <div className="w-full bg-polar-900/90 rounded-2xl border border-polar-750 p-4 sm:p-6 shadow-xl backdrop-blur-md space-y-4">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-polar-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-frost-cyan" />
            <h3 className="text-sm sm:text-base font-bold text-white font-mono">
              {chartTitle}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span className="font-semibold text-frost-teal">Unit: {chartUnit}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-frost-teal" />
              <span>{provenanceOrg}</span>
            </span>
          </div>
        </div>

        {/* View Controls & Download */}
        <div className="flex items-center gap-2">
          <div className="bg-polar-950 p-1 rounded-xl border border-polar-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('line')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'line' ? 'bg-frost-cyan text-polar-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Line Chart
            </button>
            <button
              onClick={() => setViewMode('area')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'area' ? 'bg-frost-cyan text-polar-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Area Chart
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table' ? 'bg-frost-cyan text-polar-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Table View
            </button>
          </div>

          <button
            onClick={handleDownloadCsv}
            className="p-2 rounded-xl bg-polar-950 border border-polar-800 text-slate-300 hover:text-frost-cyan hover:border-frost-cyan/40 transition-colors"
            title="Download CSV dataset"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chart Canvas or Table View */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto max-h-80 border border-polar-800 rounded-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-polar-950 text-slate-400 font-semibold border-b border-polar-800 sticky top-0">
              <tr>
                {Object.keys(data[0]).map((k) => (
                  <th key={k} className="p-3 capitalize">
                    {k.replace(/([A-Z])/g, ' $1')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-polar-800/60 bg-polar-900/60">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-polar-800/40 font-mono">
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="p-3">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full h-72 sm:h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === 'line' ? (
              <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#173663" opacity={0.5} />
                <XAxis
                  dataKey="year"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  fontFamily="monospace"
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  fontFamily="monospace"
                  label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#071326',
                    borderColor: '#38bdf8',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#f8fafc',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ color: '#e0f7ff' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />

                {/* Specific Reference Line for Ozone Hole (220 DU) */}
                {datasetKey.includes('ozone') && (
                  <ReferenceLine
                    y={220}
                    label={{ value: '220 DU Ozone Hole Threshold', fill: '#f43f5e', fontSize: 10, position: 'top' }}
                    stroke="#f43f5e"
                    strokeDasharray="4 4"
                  />
                )}

                {lines.map((line) => (
                  <Line
                    key={line.key}
                    type="monotone"
                    dataKey={line.key}
                    name={line.name}
                    stroke={line.color}
                    strokeWidth={line.strokeWidth || 2}
                    dot={{ r: 2, fill: line.color }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            ) : (
              <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  {lines.map((line) => (
                    <linearGradient key={line.key} id={`grad-${line.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={line.color} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={line.color} stopOpacity={0.0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#173663" opacity={0.5} />
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#071326',
                    borderColor: '#38bdf8',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#f8fafc'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                {lines.map((line) => (
                  <Area
                    key={line.key}
                    type="monotone"
                    dataKey={line.key}
                    name={line.name}
                    stroke={line.color}
                    strokeWidth={line.strokeWidth || 2}
                    fillOpacity={1}
                    fill={`url(#grad-${line.key})`}
                  />
                ))}
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      )}

      {/* Chart Footer with Provenance */}
      <div className="pt-2 border-t border-polar-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-frost-cyan shrink-0" />
          <span>Real public scientific measurements. No synthetic or interpolated trends.</span>
        </div>
        {doi && (
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-frost-cyan hover:underline font-mono text-[10px]"
          >
            DOI: {doi}
          </a>
        )}
      </div>
    </div>
  );
};

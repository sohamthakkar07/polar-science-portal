import React, { useState } from 'react';
import { ShieldCheck, Plus, Lock, Unlock, CheckCircle, Database, FileText, MapPin, Award, Eye } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { PolarDataset, ResearchStation, QuizQuestion, PolarTopic, PolarRegion } from '../../types/polar';

export const AdminCuration: React.FC = () => {
  const { isAuthenticated, login, logout, datasets, stations, papers, quizzes, addDataset, verifyItem } = useAdmin();
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'datasets' | 'stations' | 'quizzes' | 'new-dataset'>('datasets');

  // New dataset form state
  const [newTitle, setNewTitle] = useState('');
  const [newShortTitle, setNewShortTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTopic, setNewTopic] = useState<PolarTopic>('Cryosphere');
  const [newRegion, setNewRegion] = useState<PolarRegion>('Antarctic');
  const [newDoi, setNewDoi] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(passwordInput);
    if (!success) setAuthError(true);
    else setAuthError(false);
  };

  const handleAddDataset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newOrg) return;

    const dataset: PolarDataset = {
      id: `custom-dataset-${Date.now()}`,
      title: newTitle,
      shortTitle: newShortTitle || newTitle.slice(0, 30),
      description: newDesc,
      studentSummary: newDesc,
      topic: newTopic,
      region: newRegion,
      temporalCoverage: {
        startDate: '2020-01-01',
        endDate: '2026-12-31',
        resolution: 'Daily'
      },
      variables: [
        {
          name: 'observation_value',
          standardName: 'generic_polar_variable',
          unit: 'units',
          description: 'Standard observation value recorded at station or satellite pass.',
          typicalRange: '0 to 100'
        }
      ],
      dataFormats: ['NetCDF', 'CSV'],
      provenance: {
        sourceOrganization: newOrg,
        sourceOrgShort: newOrg.slice(0, 15),
        originalSourceUrl: newUrl || 'https://data.ncpor.res.in/',
        doi: newDoi,
        license: 'Creative Commons CC-BY 4.0',
        accessStatus: 'Open Access',
        dateRetrieved: new Date().toISOString().slice(0, 10),
        attribution: `Curated entry for ${newOrg}.`,
        isVerified: true
      },
      defaultVisualizationType: 'line-timeseries',
      relatedPaperIds: [],
      relatedStationIds: []
    };

    addDataset(dataset);
    setSubmittedSuccess(true);
    setNewTitle('');
    setNewShortTitle('');
    setNewDesc('');
    setNewDoi('');
    setNewOrg('');
    setNewUrl('');
    setTimeout(() => {
      setSubmittedSuccess(false);
      setActiveTab('datasets');
    }, 1500);
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-polar-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-polar-900 border border-polar-750 p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-polar-800 border border-frost-cyan/30 text-frost-cyan flex items-center justify-center mx-auto shadow-polar-glow">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white font-mono">
              Admin & Curation Gateway
            </h1>
            <p className="text-xs text-slate-400">
              Enter the administration passcode to review, verify, and register authoritative polar datasets.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Passcode</label>
              <input
                type="password"
                placeholder="Enter password (default: polarverse2026 or admin)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-polar-950 border border-polar-750 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-frost-cyan"
              />
              {authError && (
                <span className="text-[11px] text-rose-400 mt-1 block">
                  Invalid passcode. Use "polarverse2026" or "admin".
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-frost-cyan hover:bg-sky-300 text-polar-950 font-bold text-xs shadow-polar-glow transition-all"
            >
              Authenticate & Open Portal
            </button>
          </form>

          <div className="text-center text-[11px] text-slate-500">
            Protected provenance & curation gateway.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-polar-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-frost-teal text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Scientific Data Curation & Provenance Verification</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              🛡️ Admin & Curation Dashboard
            </h1>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-polar-900 border border-polar-750 text-slate-300 hover:text-white text-xs font-bold"
          >
            Log Out
          </button>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-polar-900 border border-polar-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-frost-cyan" /> Registered Datasets
            </div>
            <div className="text-2xl font-black text-white font-mono mt-1">{datasets.length}</div>
          </div>

          <div className="p-4 rounded-2xl bg-polar-900 border border-polar-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-orange-400" /> Active Stations
            </div>
            <div className="text-2xl font-black text-white font-mono mt-1">{stations.length}</div>
          </div>

          <div className="p-4 rounded-2xl bg-polar-900 border border-polar-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-indigo-400" /> Research Papers
            </div>
            <div className="text-2xl font-black text-white font-mono mt-1">{papers.length}</div>
          </div>

          <div className="p-4 rounded-2xl bg-polar-900 border border-polar-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Quiz Challenges
            </div>
            <div className="text-2xl font-black text-white font-mono mt-1">{quizzes.length}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-polar-800 pb-2">
          <button
            onClick={() => setActiveTab('datasets')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'datasets'
                ? 'bg-polar-800 text-frost-cyan border border-frost-cyan/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Manage Datasets ({datasets.length})
          </button>
          <button
            onClick={() => setActiveTab('stations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'stations'
                ? 'bg-polar-800 text-frost-cyan border border-frost-cyan/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Manage Stations ({stations.length})
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'quizzes'
                ? 'bg-polar-800 text-frost-cyan border border-frost-cyan/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Review Quizzes ({quizzes.length})
          </button>
          <button
            onClick={() => setActiveTab('new-dataset')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'new-dataset'
                ? 'bg-frost-cyan text-polar-950 shadow-sm'
                : 'bg-polar-900 text-frost-cyan hover:bg-polar-850'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Dataset</span>
          </button>
        </div>

        {/* Tab 1: Datasets Management */}
        {activeTab === 'datasets' && (
          <div className="space-y-4">
            {datasets.map((d) => (
              <div
                key={d.id}
                className="p-5 rounded-2xl bg-polar-900 border border-polar-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{d.shortTitle}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-polar-950 text-frost-cyan font-mono">
                      {d.topic}
                    </span>
                    {d.provenance.isVerified ? (
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified Provenance
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-400 font-semibold">Unverified</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{d.description}</p>
                  <div className="text-[10px] text-slate-500">
                    Source: {d.provenance.sourceOrganization} • DOI: {d.provenance.doi || 'None'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!d.provenance.isVerified && (
                    <button
                      onClick={() => verifyItem('dataset', d.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold"
                    >
                      Mark Verified
                    </button>
                  )}
                  <a
                    href={d.provenance.originalSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-polar-950 text-slate-300 hover:text-white border border-polar-800"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Stations Management */}
        {activeTab === 'stations' && (
          <div className="space-y-4">
            {stations.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-2xl bg-polar-900 border border-polar-800 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    {s.isIndianStation && <span>🇮🇳</span>}
                    <span>{s.name}</span>
                    <span className="text-slate-400 font-normal">({s.subRegion})</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Operator: {s.operator} • Lat: {s.latitude.toFixed(2)}°, Lon: {s.longitude.toFixed(2)}°
                  </div>
                </div>
                <span className="text-xs text-frost-teal font-mono">{s.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Quizzes Review */}
        {activeTab === 'quizzes' && (
          <div className="space-y-4">
            {quizzes.map((q) => (
              <div key={q.id} className="p-5 rounded-2xl bg-polar-900 border border-polar-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase font-mono">{q.type}</span>
                  <span className="text-[10px] text-slate-400">{q.difficulty}</span>
                </div>
                <div className="text-xs font-bold text-white">{q.question}</div>
                <div className="text-[11px] text-slate-300 bg-polar-950 p-2.5 rounded-lg border border-polar-850">
                  <strong className="text-frost-cyan">Explanation: </strong>
                  {q.whyExplanation}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Add New Dataset Form */}
        {activeTab === 'new-dataset' && (
          <form onSubmit={handleAddDataset} className="p-8 rounded-3xl bg-polar-900 border border-polar-750 shadow-2xl space-y-5">
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Plus className="w-5 h-5 text-frost-cyan" />
              <span>Register New Authoritative Polar Dataset</span>
            </h2>

            {submittedSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Dataset successfully registered with verified provenance!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Full Dataset Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Antarctic Surface Mass Balance Synthesis"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-polar-950 border border-polar-750 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-frost-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Short Display Title</label>
                <input
                  type="text"
                  placeholder="e.g. Antarctic SMB Series"
                  value={newShortTitle}
                  onChange={(e) => setNewShortTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-polar-950 border border-polar-750 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-frost-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Topic</label>
                <select
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value as PolarTopic)}
                  className="w-full px-3 py-2 rounded-xl bg-polar-950 border border-polar-750 text-xs text-slate-100 focus:outline-none focus:border-frost-cyan"
                >
                  <option value="Cryosphere">Cryosphere</option>
                  <option value="Climate">Climate</option>
                  <option value="Ocean">Ocean</option>
                  <option value="Atmosphere">Atmosphere</option>
                  <option value="Glaciers">Glaciers</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Region</label>
                <select
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value as PolarRegion)}
                  className="w-full px-3 py-2 rounded-xl bg-polar-950 border border-polar-750 text-xs text-slate-100 focus:outline-none focus:border-frost-cyan"
                >
                  <option value="Antarctic">Antarctic</option>
                  <option value="Arctic">Arctic</option>
                  <option value="Himalayan / Third Pole">Himalayan / Third Pole</option>
                  <option value="Global Ocean">Global Ocean</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Source Organization *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. National Centre for Polar and Ocean Research (NCPOR)"
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-polar-950 border border-polar-750 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-frost-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Digital Object Identifier (DOI)</label>
                <input
                  type="text"
                  placeholder="e.g. 10.5067/NCPOR/ANTARCTIC-SMB"
                  value={newDoi}
                  onChange={(e) => setNewDoi(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-polar-950 border border-polar-750 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-frost-cyan"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Original Repository URL</label>
              <input
                type="url"
                placeholder="https://data.ncpor.res.in/dataset/..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-polar-950 border border-polar-750 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-frost-cyan"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Dataset Description & Metadata *</label>
              <textarea
                rows={3}
                required
                placeholder="Describe methodology, variables measured, and satellite or in-situ instruments used..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-polar-950 border border-polar-750 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-frost-cyan"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-frost-cyan hover:bg-sky-300 text-polar-950 font-bold text-xs shadow-polar-glow transition-all"
            >
              Save & Register Dataset
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

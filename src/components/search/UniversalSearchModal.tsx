import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, MapPin, Database, BookOpen, FileText, Award, Compass, Image, Flag, ChevronRight, ShieldCheck } from 'lucide-react';
import { RESEARCH_STATIONS } from '../../data/stations';
import { POLAR_DATASETS } from '../../data/datasets';
import { RESEARCH_PAPERS } from '../../data/researchPapers';
import { LEARNING_MODULES } from '../../data/learningModules';
import { POLAR_SPECIES } from '../../data/biodiversity';
import { QUIZ_QUESTIONS } from '../../data/quizzes';
import { POLAR_EXPEDITIONS } from '../../data/expeditions';
import { MEDIA_GALLERY } from '../../data/mediaGallery';
import { NavTab } from '../layout/Navbar';

interface SearchResultItem {
  id: string;
  type: 'Station' | 'Dataset' | 'Research Paper' | 'Learning Module' | 'Species' | 'Quiz' | 'Expedition' | 'Media';
  title: string;
  subtitle: string;
  badge: string;
  targetTab: NavTab;
  detailId?: string;
  provenanceOrg: string;
}

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab, detailId?: string) => void;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Build searchable index
  const searchIndex = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [];

    RESEARCH_STATIONS.forEach((s) => {
      items.push({
        id: `station-${s.id}`,
        type: 'Station',
        title: s.name,
        subtitle: `${s.operator} • ${s.subRegion} (${s.latitude.toFixed(2)}°, ${s.longitude.toFixed(2)}°)`,
        badge: s.isIndianStation ? '🇮🇳 Indian Station' : s.country,
        targetTab: 'explore',
        detailId: s.id,
        provenanceOrg: s.provenance.sourceOrgShort,
      });
    });

    POLAR_DATASETS.forEach((d) => {
      items.push({
        id: `dataset-${d.id}`,
        type: 'Dataset',
        title: d.shortTitle,
        subtitle: `${d.description.slice(0, 110)}... • DOI: ${d.provenance.doi || 'N/A'}`,
        badge: d.topic,
        targetTab: 'data',
        detailId: d.id,
        provenanceOrg: d.provenance.sourceOrgShort,
      });
    });

    RESEARCH_PAPERS.forEach((p) => {
      items.push({
        id: `paper-${p.id}`,
        type: 'Research Paper',
        title: p.title,
        subtitle: `${p.authors.join(', ')} (${p.year}) • ${p.journal}`,
        badge: `DOI: ${p.doi}`,
        targetTab: 'research',
        detailId: p.id,
        provenanceOrg: p.provenance.sourceOrgShort,
      });
    });

    LEARNING_MODULES.forEach((l) => {
      items.push({
        id: `learn-${l.id}`,
        type: 'Learning Module',
        title: l.title,
        subtitle: l.tagline,
        badge: l.topic,
        targetTab: 'learn',
        detailId: l.id,
        provenanceOrg: l.provenance.sourceOrgShort,
      });
    });

    POLAR_SPECIES.forEach((sp) => {
      items.push({
        id: `species-${sp.id}`,
        type: 'Species',
        title: `${sp.commonName} (${sp.scientificName})`,
        subtitle: `${sp.group} • Habitat: ${sp.habitat} • Status: ${sp.conservationStatus}`,
        badge: sp.region,
        targetTab: 'biodiversity',
        detailId: sp.id,
        provenanceOrg: sp.provenance.sourceOrgShort,
      });
    });

    POLAR_EXPEDITIONS.forEach((ex) => {
      items.push({
        id: `exp-${ex.id}`,
        type: 'Expedition',
        title: ex.name,
        subtitle: `Leader: ${ex.leader} (${ex.yearStart}-${ex.yearEnd}) • ${ex.vesselOrTransport}`,
        badge: ex.isIndianExpedition ? '🇮🇳 Indian Expedition' : ex.country,
        targetTab: 'india',
        detailId: ex.id,
        provenanceOrg: ex.provenance.sourceOrgShort,
      });
    });

    QUIZ_QUESTIONS.forEach((q) => {
      items.push({
        id: `quiz-${q.id}`,
        type: 'Quiz',
        title: q.question,
        subtitle: `Type: ${q.type} • Difficulty: ${q.difficulty} • Topic: ${q.topic}`,
        badge: '🎮 Interactive Challenge',
        targetTab: 'quiz',
        detailId: q.id,
        provenanceOrg: q.provenance.sourceOrgShort,
      });
    });

    MEDIA_GALLERY.forEach((m) => {
      items.push({
        id: `media-${m.id}`,
        type: 'Media',
        title: m.title,
        subtitle: `${m.caption.slice(0, 100)}... • Location: ${m.locationName}`,
        badge: m.category,
        targetTab: 'media',
        detailId: m.id,
        provenanceOrg: m.provenance.sourceOrgShort,
      });
    });

    return items;
  }, []);

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return searchIndex.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.type.toLowerCase().includes(selectedCategory.toLowerCase());
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.provenanceOrg.toLowerCase().includes(q)
      );
    });
  }, [query, selectedCategory, searchIndex]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'station', label: 'Stations' },
    { id: 'dataset', label: 'Datasets' },
    { id: 'paper', label: 'Papers' },
    { id: 'learn', label: 'Learning' },
    { id: 'species', label: 'Wildlife' },
    { id: 'quiz', label: 'Quizzes' },
    { id: 'expedition', label: 'Expeditions' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-polar-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-polar-900 border border-polar-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Header */}
        <div className="p-4 border-b border-polar-800 flex items-center gap-3 bg-polar-950/80">
          <Search className="w-5 h-5 text-frost-cyan shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search polar stations, datasets, DOIs, expeditions, species, Maitri, sea ice..."
            autoFocus
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-polar-800"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-polar-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-4 py-2 bg-polar-900 border-b border-polar-800 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === c.id
                  ? 'bg-frost-cyan text-polar-950 shadow-sm font-semibold'
                  : 'bg-polar-800 text-slate-300 hover:bg-polar-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Search className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-medium">No verified polar science resources match "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for Maitri, Bharati, Sea ice, Ozone, Himadri, or Penguins.</p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onNavigate(item.targetTab, item.detailId);
                  onClose();
                }}
                className="p-3 rounded-xl bg-polar-850/80 hover:bg-polar-800 border border-polar-750/50 hover:border-frost-cyan/40 transition-all cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-polar-700/80 text-frost-cyan border border-polar-600/50">
                      {item.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-frost-cyan">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{item.subtitle}</p>
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <ShieldCheck className="w-3 h-3 text-frost-teal" />
                      <span>{item.provenanceOrg}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">•</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.badge}</span>
                  </div>
                </div>

                <div className="flex items-center text-slate-500 group-hover:text-frost-cyan pt-2">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-polar-950 border-t border-polar-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">{filteredResults.length}</span>
            <span>verified scientific resources indexed</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span>Esc to close</span>
            <span>•</span>
            <span>Click any item to explore</span>
          </div>
        </div>
      </div>
    </div>
  );
};

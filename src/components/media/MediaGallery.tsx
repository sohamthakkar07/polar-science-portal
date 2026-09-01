import React, { useState } from 'react';
import { Image, Filter, ExternalLink, ShieldCheck, X, Compass, Calendar, Camera } from 'lucide-react';
import { MEDIA_GALLERY } from '../../data/mediaGallery';
import { MediaItem } from '../../types/polar';
import { ProvenanceBadge } from '../layout/ProvenanceBadge';

export const MediaGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);

  const categories = ['all', 'Research Stations', 'Antarctica', 'Wildlife', 'Satellite Imagery'];

  const filteredMedia = MEDIA_GALLERY.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-polar-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-polar-900 border border-ice-500/30 text-ice-300 text-2xs font-mono mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider font-semibold">Earth Observation & Field Photography Archive</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Polar Scientific Media Gallery
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
              High-resolution imagery of research observatories, field expeditions, and remote sensing imagery from NASA, NCPOR, Wikimedia Commons, and British Antarctic Survey under open licenses.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-ice-500 text-polar-950 border-ice-400 font-bold shadow-sm'
                    : 'bg-polar-900 border border-polar-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Imagery' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((media) => (
            <div
              key={media.id}
              onClick={() => setPreviewMedia(media)}
              className="bg-polar-900/90 rounded-2xl border border-polar-800 hover:border-ice-500/40 overflow-hidden shadow-card transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-56 w-full overflow-hidden bg-polar-950">
                <img
                  src={media.imageUrl}
                  alt={media.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded text-2xs font-mono font-semibold uppercase bg-polar-950/90 border border-polar-750 text-ice-300 backdrop-blur-md">
                    {media.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-sm font-bold text-white group-hover:text-ice-300 transition-colors line-clamp-1">
                  {media.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {media.caption}
                </p>

                <div className="pt-3 border-t border-polar-800 flex items-center justify-between text-2xs font-mono text-slate-400">
                  <span className="truncate max-w-[160px]">{media.credit}</span>
                  <span className="text-teal-400">{media.license}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Image Preview Lightbox Modal */}
        {previewMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-polar-950/90 backdrop-blur-xl">
            <div className="w-full max-w-4xl bg-polar-900 border border-polar-800 rounded-2xl overflow-hidden shadow-elevated space-y-4">
              <div className="relative h-96 sm:h-[450px] w-full bg-polar-950 flex items-center justify-center">
                <img
                  src={previewMedia.imageUrl}
                  alt={previewMedia.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80';
                  }}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setPreviewMedia(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-xl bg-polar-950/90 text-white hover:bg-polar-850 border border-polar-750 shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{previewMedia.title}</h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    {previewMedia.caption}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-polar-950 border border-polar-800 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block">Credit & Source:</span>
                    <span className="text-slate-200 font-semibold">{previewMedia.credit}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Location:</span>
                    <span className="text-slate-200 font-semibold">{previewMedia.locationName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">License:</span>
                    <span className="text-teal-400 font-semibold">{previewMedia.license}</span>
                  </div>
                </div>

                <ProvenanceBadge provenance={previewMedia.provenance} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

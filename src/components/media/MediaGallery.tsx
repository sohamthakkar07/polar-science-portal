import React, { useState } from 'react';
import { Image, Filter, ExternalLink, ShieldCheck, X, Compass, Calendar } from 'lucide-react';
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
    <div className="w-full min-h-screen bg-polar-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-polar-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-frost-cyan text-xs font-bold uppercase tracking-wider mb-1">
              <Image className="w-4 h-4" />
              <span>Verified Scientific Photography & Earth Observation Imagery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              🖼️ Polar Media Gallery
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              High-resolution documentation of polar expeditions, research facilities, and remote sensing imagery from NASA, NCPOR, Wikimedia Commons, and BAS under open-access licenses.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-frost-cyan text-polar-950 font-bold shadow-polar-glow'
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
              className="bg-polar-900/90 rounded-2xl border border-polar-750 overflow-hidden shadow-xl hover:border-frost-cyan/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-56 w-full overflow-hidden bg-polar-950">
                <img
                  src={media.imageUrl}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-polar-950/80 border border-polar-700 text-frost-cyan backdrop-blur-md">
                    {media.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <h3 className="text-sm font-bold text-white group-hover:text-frost-cyan transition-colors line-clamp-1">
                  {media.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {media.caption}
                </p>

                <div className="pt-2 border-t border-polar-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[160px]">{media.credit}</span>
                  <span className="text-frost-teal font-mono">{media.license}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Image Preview Lightbox Modal */}
        {previewMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-polar-950/90 backdrop-blur-md">
            <div className="w-full max-w-4xl bg-polar-900 border border-polar-750 rounded-3xl overflow-hidden shadow-2xl space-y-4">
              <div className="relative h-96 sm:h-[450px] w-full bg-polar-950 flex items-center justify-center">
                <img
                  src={previewMedia.imageUrl}
                  alt={previewMedia.title}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setPreviewMedia(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-polar-950/80 text-white hover:bg-polar-800 border border-polar-700 shadow-md backdrop-blur-md"
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-polar-950 border border-polar-800 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Credit & Photographer:</span>
                    <span className="text-slate-200 font-medium">{previewMedia.credit}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Location:</span>
                    <span className="text-slate-200 font-medium">{previewMedia.locationName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">License:</span>
                    <span className="text-frost-teal font-mono">{previewMedia.license}</span>
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

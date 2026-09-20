import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Radio, Eye, Image as ImageIcon } from 'lucide-react';

interface ImmersiveMediaGalleryProps {
  images: string[];
  title?: string;
  subtitle?: string;
  badgeText?: string;
  autoPlayInterval?: number;
  aspectRatioClassName?: string;
  className?: string;
}

const GUARANTEED_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
];

export const ImmersiveMediaGallery: React.FC<ImmersiveMediaGalleryProps> = ({
  images: rawImages,
  title,
  subtitle,
  badgeText = 'FIELD OBSERVATION',
  autoPlayInterval = 5000,
  aspectRatioClassName = 'h-64 sm:h-96 w-full',
  className = ''
}) => {
  // Combine provided images with fallback pool
  const galleryImages = useMemo(() => {
    const validRaw = (rawImages || []).filter((img) => typeof img === 'string' && img.trim().length > 0);
    if (validRaw.length > 0) {
      return Array.from(new Set([...validRaw, ...GUARANTEED_FALLBACK_IMAGES]));
    }
    return GUARANTEED_FALLBACK_IMAGES;
  }, [rawImages]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Filter valid image list excluding failed ones
  const validImages = useMemo(() => {
    return galleryImages.filter((_, idx) => !failedIndices.has(idx));
  }, [galleryImages, failedIndices]);

  const activeImageUrl = validImages[currentIndex % Math.max(1, validImages.length)] || GUARANTEED_FALLBACK_IMAGES[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
    setIsLoaded(false);
  }, [validImages.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    setIsLoaded(false);
  }, [validImages.length]);

  // Handle broken image URL gracefully
  const handleImageError = (failedUrlIndex: number) => {
    console.warn(`[ImmersiveMediaGallery] Image failed to load at index ${failedUrlIndex}:`, galleryImages[failedUrlIndex]);
    setFailedIndices((prev) => {
      const next = new Set(prev);
      next.add(failedUrlIndex);
      return next;
    });
    handleNext();
  };

  // Automatic Rotation Timer
  useEffect(() => {
    if (prefersReducedMotion || lightboxOpen || isPaused || validImages.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [prefersReducedMotion, lightboxOpen, isPaused, validImages.length, autoPlayInterval, handleNext]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, handleNext, handlePrev]);

  return (
    <>
      {/* MAIN INLINE MEDIA CONTAINER */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-polar-950 border border-polar-750/90 shadow-2xl group select-none ${aspectRatioClassName} ${className}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Loading Shimmer State */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-polar-900 flex items-center justify-center z-10 animate-pulse">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Radio className="w-4 h-4 text-ice-400 animate-spin" />
              <span>Loading Field Telemetry Media...</span>
            </div>
          </div>
        )}

        {/* Animated Ken Burns Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImageUrl}
            src={activeImageUrl}
            alt={title || 'Polar Scientific Media'}
            onLoad={() => setIsLoaded(true)}
            onError={() => handleImageError(currentIndex)}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: 1,
              scale: prefersReducedMotion ? 1 : [1, 1.06, 1],
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeInOut' },
              scale: { duration: 25, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="w-full h-full object-cover filter contrast-105 brightness-95 cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          />
        </AnimatePresence>

        {/* Readability Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-polar-950 via-polar-950/40 to-transparent"
          onClick={() => setLightboxOpen(true)}
        />

        {/* Top HUD Controls & Counters */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          {badgeText && (
            <span className="px-3 py-1 rounded-full text-2xs font-mono font-bold bg-polar-950/85 border border-ice-400/50 text-ice-300 shadow-md backdrop-blur-md flex items-center gap-1.5 pointer-events-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-ice-400 animate-ping" />
              {badgeText}
            </span>
          )}

          <div className="flex items-center gap-2 pointer-events-auto">
            {validImages.length > 1 && (
              <span className="px-2.5 py-1 rounded-full text-2xs font-mono font-bold bg-polar-950/85 border border-polar-750 text-slate-300 shadow-md backdrop-blur-md">
                0{((currentIndex % validImages.length) + 1)} / 0{validImages.length}
              </span>
            )}
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="p-2 rounded-full bg-polar-950/85 border border-polar-700 text-slate-300 hover:text-white hover:border-ice-400 shadow-md backdrop-blur-md cursor-pointer transition-all"
              title="Expand Fullscreen Lightbox (Esc to exit)"
              aria-label="Expand image fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Title & Click-to-Expand Overlay */}
        <div
          className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20 cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <div className="space-y-0.5 max-w-lg">
            {title && (
              <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
                {title}
              </h3>
            )}
            {subtitle && (
              <div className="text-xs font-mono italic text-teal-300 drop-shadow">
                {subtitle}
              </div>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-polar-950/80 border border-polar-750 text-2xs font-mono text-slate-300 group-hover:text-white group-hover:border-ice-400 transition-all shadow-md backdrop-blur-md">
            <Eye className="w-3.5 h-3.5 text-ice-400" />
            <span>Click to Expand</span>
          </div>
        </div>
      </div>

      {/* FULL-SCREEN IMMERSIVE LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-polar-950/92 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen Image Viewer"
            onClick={(e) => {
              if (e.target === e.currentTarget) setLightboxOpen(false);
            }}
          >
            {/* Top Lightbox Header */}
            <div className="flex items-center justify-between z-20 max-w-7xl mx-auto w-full">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-2xs font-mono font-bold bg-ice-500/20 border border-ice-400/50 text-ice-300">
                    FULLSCREEN FIELD MEDIA
                  </span>
                  <span className="text-2xs font-mono text-slate-400">
                    0{((currentIndex % validImages.length) + 1)} of 0{validImages.length}
                  </span>
                </div>
                {title && <h2 className="text-lg font-bold text-white font-sans">{title}</h2>}
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-3 rounded-full bg-polar-900 hover:bg-polar-800 border border-polar-700 text-slate-300 hover:text-white cursor-pointer transition-all shadow-lg"
                aria-label="Close fullscreen view"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Central Main Expanded Image Container */}
            <div className="relative flex-1 flex items-center justify-center my-4 max-w-7xl mx-auto w-full overflow-hidden">
              {validImages.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 z-30 p-3.5 rounded-full bg-polar-950/80 border border-polar-750 text-white hover:bg-ice-400 hover:text-polar-950 cursor-pointer transition-all shadow-2xl backdrop-blur-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageUrl}
                  src={activeImageUrl}
                  alt={title || 'Fullscreen View'}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="max-h-[75vh] max-w-full object-contain rounded-2xl border border-polar-750 shadow-2xl"
                />
              </AnimatePresence>

              {validImages.length > 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 z-30 p-3.5 rounded-full bg-polar-950/80 border border-polar-750 text-white hover:bg-ice-400 hover:text-polar-950 cursor-pointer transition-all shadow-2xl backdrop-blur-md"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Lightbox Controls & Indicator Dots */}
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-slate-400 z-20">
              <span className="hidden sm:inline-block text-2xs text-slate-500">
                Use Left/Right arrows to navigate • Esc to close
              </span>

              {/* Indicator Dots */}
              {validImages.length > 1 && (
                <div className="flex items-center gap-2 mx-auto sm:mx-0">
                  {validImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setCurrentIndex(i);
                        setIsLoaded(false);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        (currentIndex % validImages.length) === i
                          ? 'bg-ice-400 w-7 rounded-full shadow-md'
                          : 'bg-polar-800 hover:bg-polar-700'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollSequenceProps {
  /**
   * Total number of frames in the sequence
   */
  frameCount: number;
  /**
   * Path template for frames, use {index} for the frame number
   * e.g., "/assets/sequence/frame_{index}.jpg"
   */
  framePath: (index: number) => string;
  /**
   * Starting index (usually 0 or 1)
   */
  startIndex?: number;
  /**
   * Padding for index (e.g., 4 makes 1 -> 0001)
   */
  indexPadding?: number;
  className?: string;
  containerClassName?: string;
}

export const ScrollSequence: React.FC<ScrollSequenceProps> = ({
  frameCount,
  framePath,
  startIndex = 1,
  indexPadding = 4,
  className = '',
  containerClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameIndex = i + startIndex;
      img.src = framePath(frameIndex);
      
      img.onload = () => {
        loadedCount++;
        setLoaded(loadedCount);
      };
      // Note: we might want to handle onerror as well in production
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount, framePath, startIndex, indexPadding]);

  useGSAP(() => {
    if (isReducedMotion || loaded < frameCount || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw the specific frame
    const render = (index: number) => {
      const img = images[index];
      if (img && img.complete) {
        // Handle responsive canvas sizing
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        // "cover" sizing logic
        if (canvasRatio > imgRatio) {
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // Resize handler
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Reset scale before resizing
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;
        ctx.scale(dpr, dpr);
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;
        
        // Re-render current frame
        const trigger = ScrollTrigger.getById('sequenceTrigger');
        const progress = trigger?.progress || 0;
        const frameIndex = Math.min(
          frameCount - 1,
          Math.max(0, Math.floor(progress * frameCount))
        );
        render(frameIndex);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // GSAP ScrollTrigger
    const playhead = { frame: 0 };
    
    ScrollTrigger.create({
      id: 'sequenceTrigger',
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%', // 300% scroll duration
      pin: true,
      scrub: 0.5,
      animation: gsap.to(playhead, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        onUpdate: () => render(Math.round(playhead.frame))
      }),
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getById('sequenceTrigger')?.kill();
    };
  }, [loaded, frameCount, images, isReducedMotion, containerRef]);

  if (isReducedMotion) {
    return (
      <div className={`relative w-full h-screen overflow-hidden ${containerClassName}`}>
        {images[0] && (
          <img 
            src={images[0].src} 
            alt="Sequence static fallback" 
            className={`w-full h-full object-cover ${className}`}
          />
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full h-screen overflow-hidden bg-polar-950 ${containerClassName}`}>
      {loaded < frameCount && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-polar-950/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-48 h-1 bg-polar-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-ice-500 transition-all duration-300 ease-out"
                style={{ width: `${(loaded / frameCount) * 100}%` }}
              />
            </div>
            <p className="text-sm font-mono text-slate-400">Loading frames... {Math.round((loaded / frameCount) * 100)}%</p>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className={`block w-full h-full ${className}`} />
    </div>
  );
};

export default ScrollSequence;

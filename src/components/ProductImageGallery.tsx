import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import type { GalleryImage } from '@/types';

interface ProductImageGalleryProps {
  gallery: GalleryImage[];
}

export default function ProductImageGallery({ gallery }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, goNext, goPrev]);

  if (gallery.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative group rounded-2xl-card overflow-hidden bg-white border border-beige/50">
        <img
          src={gallery[activeIndex].url}
          alt={gallery[activeIndex].alt}
          className="w-full aspect-square object-cover"
        />
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-chocolate hover:bg-white hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
          aria-label="Enlarge image"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        {gallery.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-chocolate hover:bg-white hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-chocolate hover:bg-white hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {gallery.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`rounded-xl-card overflow-hidden border-2 transition-all ${
                idx === activeIndex
                  ? 'border-caramel ring-2 ring-caramel/20'
                  : 'border-beige/50 hover:border-caramel/50'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full aspect-square object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[60] bg-chocolate/90 flex items-center justify-center animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <img
            src={gallery[activeIndex].url}
            alt={gallery[activeIndex].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl-card"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {activeIndex + 1} / {gallery.length}
          </span>
        </div>
      )}
    </div>
  );
}

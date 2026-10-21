import React, { useState, useEffect, useRef } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  theme?: 'dark' | 'cream' | 'neutral';
  containerClassName?: string;
  aspectRatio?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Spacedesk interior space',
  fallbackTitle,
  fallbackSubtitle,
  theme = 'cream',
  className = '',
  containerClassName = '',
  aspectRatio,
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(() => loading === 'eager');
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true);
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.01,
      }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
      observer.disconnect();
    };
  }, [loading]);

  useEffect(() => {
    setHasError(false);
    if (isInView && imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src, isInView]);

  const themeStyles = {
    dark: 'bg-[var(--color-charcoal)] text-[var(--color-white)] border border-[var(--color-border)]',
    cream: 'bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] border border-[var(--color-border)]',
    neutral: 'bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-border)]',
  }[theme];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!hasError && src ? (
        <>
          <img
            ref={imgRef}
            src={isInView ? src : undefined}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={loading}
            decoding={decoding}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              if (isInView) setHasError(true);
            }}
            className={`w-full h-full object-cover transition-all duration-700 backface-hidden ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } ${className}`}
            {...props}
          />
          {!isLoaded && (
            <div className={`absolute inset-0 flex items-center justify-center ${themeStyles} animate-pulse`}>
              <span className="text-xs uppercase tracking-widest font-[var(--font-sans)] opacity-60">Spacedesk</span>
            </div>
          )}
        </>
      ) : (
        <div className={`w-full h-full min-h-[220px] p-6 flex flex-col justify-between ${themeStyles}`}>
          <div className="flex items-center justify-between opacity-50">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="text-[10px] tracking-widest font-[var(--font-sans)] font-semibold uppercase text-[var(--color-gold)]">Spacedesk Studio</span>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight font-[var(--font-sans)] text-[var(--color-charcoal)]">
              {fallbackTitle || alt || 'Architectural Workspace'}
            </p>
            {fallbackSubtitle && (
              <p className="text-xs text-[var(--color-muted)] mt-1 font-[var(--font-sans)]">{fallbackSubtitle}</p>
            )}
          </div>
          <div className="w-12 h-0.5 bg-[var(--color-border)]" />
        </div>
      )}
    </div>
  );
};

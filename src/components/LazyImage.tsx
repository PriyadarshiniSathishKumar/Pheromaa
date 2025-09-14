import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = React.memo(({
  src,
  alt,
  className = '',
  placeholder,
  loading = 'lazy',
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse rounded-md" />
      )}
      
      {/* Main image */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={loading}
          onLoad={handleLoad}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Blur placeholder if provided */}
      {placeholder && !isLoaded && isInView && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          loading="eager"
        />
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;
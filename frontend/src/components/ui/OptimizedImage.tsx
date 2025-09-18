'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import './OptimizedImage.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width = 300,
  height = 200,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (priority) {
      setIsLoading(false);
    }
  }, [priority]);

  return (
    <div className={cn('imageContainer', className)}>
      {isLoading && !priority && (
        <div 
          className="imageLoading"
          style={{ width, height }}
        >
          <div className="loadingText">Loading...</div>
        </div>
      )}
      
      {error ? (
        <div 
          className="imageError"
          style={{ width, height }}
        >
          <span className="errorText">Image unavailable</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
          className={cn(
            'imageTransition',
            isLoading ? 'imageLoading' : 'imageLoaded'
          )}
          sizes="(max-width: 360px) 300px, (max-width: 640px) 400px, (max-width: 768px) 500px, 600px"
        />
      )}
    </div>
  );
}
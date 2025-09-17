'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

interface LazyWrapperProps {
  children: ReactNode;
  threshold?: number;
  className?: string;
  fallback?: ReactNode;
}

export function LazyWrapper({ 
  children, 
  threshold = 0.1, 
  className = '', 
  fallback 
}: LazyWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, hasLoaded]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : (fallback || <div className="min-h-[200px] bg-gray-100 animate-pulse" />)}
    </div>
  );
}
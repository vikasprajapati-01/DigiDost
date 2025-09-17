import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { useIsOnline } from '@/store';

interface OfflineIndicatorProps {
  className?: string;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ className }) => {
  const isOnline = useIsOnline();
  const [showIndicator, setShowIndicator] = useState(false);
  const [hasBeenOffline, setHasBeenOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setHasBeenOffline(true);
      setShowIndicator(true);
    } else if (hasBeenOffline) {
      // Show reconnected message briefly
      setShowIndicator(true);
      const timer = setTimeout(() => {
        setShowIndicator(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, hasBeenOffline]);

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 30 
          }}
          className={cn(
            'fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg border',
            isOnline 
              ? 'bg-green-50 text-green-800 border-green-200' 
              : 'bg-yellow-50 text-yellow-800 border-yellow-200',
            className
          )}
          role="alert"
          aria-live="polite"
        >
          {isOnline ? (
            <>
              <WifiIcon className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Back online!</p>
                <p className="text-xs text-green-600">Data will sync automatically</p>
              </div>
            </>
          ) : (
            <>
              <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">You're offline</p>
                <p className="text-xs text-yellow-600">Don't worry, you can still learn!</p>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Network status hook for components
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    // Check initial status
    setIsOnline(navigator.onLine);

    // Get connection info if available
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      setConnectionType(connection.effectiveType || 'unknown');
      
      // Listen for connection changes
      const handleConnectionChange = () => {
        setConnectionType(connection.effectiveType || 'unknown');
      };
      
      connection.addEventListener('change', handleConnectionChange);
      
      return () => {
        connection.removeEventListener('change', handleConnectionChange);
      };
    }

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, connectionType };
};

// Connection quality indicator
interface ConnectionQualityProps {
  className?: string;
}

export const ConnectionQuality: React.FC<ConnectionQualityProps> = ({ className }) => {
  const { isOnline, connectionType } = useNetworkStatus();

  if (!isOnline) {
    return (
      <div className={cn('flex items-center space-x-1 text-red-500', className)}>
        <div className="w-2 h-2 rounded-full bg-red-500"></div>
        <span className="text-xs">Offline</span>
      </div>
    );
  }

  const getQualityInfo = (type: string) => {
    switch (type) {
      case 'slow-2g':
      case '2g':
        return { color: 'text-red-500', bg: 'bg-red-500', label: 'Slow' };
      case '3g':
        return { color: 'text-yellow-500', bg: 'bg-yellow-500', label: 'Fair' };
      case '4g':
        return { color: 'text-green-500', bg: 'bg-green-500', label: 'Good' };
      default:
        return { color: 'text-blue-500', bg: 'bg-blue-500', label: 'Online' };
    }
  };

  const quality = getQualityInfo(connectionType);

  return (
    <div className={cn('flex items-center space-x-1', quality.color, className)}>
      <div className={cn('w-2 h-2 rounded-full', quality.bg)}></div>
      <span className="text-xs">{quality.label}</span>
    </div>
  );
};
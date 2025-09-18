import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { useIsOnline } from '@/store';
import './OfflineIndicator.css';

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
            'offlineIndicator',
            isOnline ? 'online' : 'offline',
            className
          )}
          role="alert"
          aria-live="polite"
        >
          {isOnline ? (
            <>
              <WifiIcon className={cn('offlineIcon', 'online')} />
              <div className="offlineContent">
                <p className="offlineTitle">Back online!</p>
                <p className={cn('offlineDescription', 'online')}>Data will sync automatically</p>
              </div>
            </>
          ) : (
            <>
              <ExclamationTriangleIcon className={cn('offlineIcon', 'offline')} />
              <div className="offlineContent">
                <p className="offlineTitle">You're offline</p>
                <p className={cn('offlineDescription', 'offline')}>Don't worry, you can still learn!</p>
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
      <div className={cn('connectionQuality', 'offline', className)}>
        <div className={cn('connectionDot', 'offline')}></div>
        <span className="connectionLabel">Offline</span>
      </div>
    );
  }

  const getQualityInfo = (type: string) => {
    switch (type) {
      case 'slow-2g':
      case '2g':
        return { variant: 'slow', label: 'Slow' };
      case '3g':
        return { variant: 'fair', label: 'Fair' };
      case '4g':
        return { variant: 'good', label: 'Good' };
      default:
        return { variant: 'online', label: 'Online' };
    }
  };

  const quality = getQualityInfo(connectionType);

  return (
    <div className={cn('connectionQuality', quality.variant, className)}>
      <div className={cn('connectionDot', quality.variant)}></div>
      <span className="connectionLabel">{quality.label}</span>
    </div>
  );
};
'use client';

import { useState, useEffect } from 'react';
import { Badge } from './Badge';

interface NetworkConnection extends EventTarget {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  addEventListener(type: 'change', listener: () => void): void;
  removeEventListener(type: 'change', listener: () => void): void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkConnection;
}

interface ConnectionInfo {
  isOnline: boolean;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

export function ConnectionStatus() {
  const [connection, setConnection] = useState<ConnectionInfo>({ isOnline: true });

  useEffect(() => {
    const updateConnection = () => {
      const navigator = window.navigator as NavigatorWithConnection;
      const connectionInfo: ConnectionInfo = {
        isOnline: navigator.onLine,
      };

      if ('connection' in navigator) {
        const conn = navigator.connection;
        connectionInfo.effectiveType = conn?.effectiveType;
        connectionInfo.downlink = conn?.downlink;
        connectionInfo.rtt = conn?.rtt;
      }

      setConnection(connectionInfo);
    };

    updateConnection();

    window.addEventListener('online', updateConnection);
    window.addEventListener('offline', updateConnection);

    if ('connection' in navigator && navigator.connection) {
      (navigator.connection as NetworkConnection).addEventListener('change', updateConnection);
    }

    return () => {
      window.removeEventListener('online', updateConnection);
      window.removeEventListener('offline', updateConnection);
      if ('connection' in navigator && navigator.connection) {
        (navigator.connection as NetworkConnection).removeEventListener('change', updateConnection);
      }
    };
  }, []);

  const getConnectionStatus = () => {
    if (!connection.isOnline) {
      return { label: 'Offline', variant: 'error' as const };
    }

    if (connection.effectiveType) {
      switch (connection.effectiveType) {
        case 'slow-2g':
        case '2g':
          return { label: 'Slow', variant: 'warning' as const };
        case '3g':
          return { label: 'Good', variant: 'info' as const };
        case '4g':
          return { label: 'Fast', variant: 'success' as const };
        default:
          return { label: 'Online', variant: 'success' as const };
      }
    }

    return { label: 'Online', variant: 'success' as const };
  };

  const status = getConnectionStatus();

  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-gray-600">Connection:</div>
      <Badge variant={status.variant} size="sm">
        {status.label}
      </Badge>
      {connection.downlink && (
        <div className="text-xs text-gray-500">
          {connection.downlink} Mbps
        </div>
      )}
    </div>
  );
}
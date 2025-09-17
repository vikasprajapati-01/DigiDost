import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Notification } from '@/types';
import { mockNotifications } from '@/data/mockData';
import { STORAGE_KEYS, THEMES, LANGUAGES } from '@/types/constants';

interface AppState {
  // UI State
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'hi' | 'te' | 'ta' | 'bn';
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reducedMotion: boolean;
  
  // Network State
  isOnline: boolean;
  isLoading: boolean;
  lastSyncTime: Date | null;
  offlineQueueSize: number;
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  
  // Modals and UI
  sidebarOpen: boolean;
  modalStack: string[];
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setLanguage: (language: 'en' | 'hi' | 'te' | 'ta' | 'bn') => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  setOnlineStatus: (isOnline: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  updateLastSyncTime: () => void;
  setOfflineQueueSize: (size: number) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: (modalId?: string) => void;
  closeAllModals: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial UI State
      theme: 'light',
      language: 'en',
      fontSize: 'medium',
      highContrast: false,
      reducedMotion: false,
      
      // Initial Network State
      isOnline: true,
      isLoading: false,
      lastSyncTime: null,
      offlineQueueSize: 0,
      
      // Initial Notifications
      notifications: mockNotifications,
      unreadCount: mockNotifications.filter(n => !n.isRead).length,
      
      // Initial UI State
      sidebarOpen: false,
      modalStack: [],
      
      // Theme Actions
      setTheme: (theme) => {
        set({ theme });
        
        // Apply theme to document
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (theme === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
          // Auto theme - check system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
      
      setLanguage: (language) => {
        set({ language });
        // In a real app, this would trigger internationalization
        document.documentElement.lang = language;
      },
      
      setFontSize: (fontSize) => {
        set({ fontSize });
        
        // Apply font size to document
        const fontSizeMap = {
          small: '14px',
          medium: '16px',
          large: '18px',
        };
        document.documentElement.style.fontSize = fontSizeMap[fontSize];
      },
      
      toggleHighContrast: () => {
        const { highContrast } = get();
        const newHighContrast = !highContrast;
        set({ highContrast: newHighContrast });
        
        // Apply high contrast styles
        if (newHighContrast) {
          document.documentElement.classList.add('high-contrast');
        } else {
          document.documentElement.classList.remove('high-contrast');
        }
      },
      
      toggleReducedMotion: () => {
        const { reducedMotion } = get();
        const newReducedMotion = !reducedMotion;
        set({ reducedMotion: newReducedMotion });
        
        // Apply reduced motion styles
        if (newReducedMotion) {
          document.documentElement.classList.add('reduce-motion');
        } else {
          document.documentElement.classList.remove('reduce-motion');
        }
      },
      
      // Network Actions
      setOnlineStatus: (isOnline) => {
        set({ isOnline });
        
        if (isOnline) {
          // Trigger sync when coming back online
          console.log('Back online - triggering sync');
        }
      },
      
      setLoading: (isLoading) => {
        set({ isLoading });
      },
      
      updateLastSyncTime: () => {
        set({ lastSyncTime: new Date() });
      },
      
      setOfflineQueueSize: (size) => {
        set({ offlineQueueSize: size });
      },
      
      // Notification Actions
      addNotification: (notificationData) => {
        const { notifications } = get();
        const newNotification: Notification = {
          ...notificationData,
          id: `notif-${Date.now()}`,
          createdAt: new Date(),
          isRead: false,
        };
        
        const updatedNotifications = [newNotification, ...notifications];
        const unreadCount = updatedNotifications.filter(n => !n.isRead).length;
        
        set({ 
          notifications: updatedNotifications,
          unreadCount 
        });
      },
      
      markNotificationAsRead: (id) => {
        const { notifications } = get();
        const updatedNotifications = notifications.map(notification =>
          notification.id === id 
            ? { ...notification, isRead: true }
            : notification
        );
        const unreadCount = updatedNotifications.filter(n => !n.isRead).length;
        
        set({ 
          notifications: updatedNotifications,
          unreadCount 
        });
      },
      
      removeNotification: (id) => {
        const { notifications } = get();
        const updatedNotifications = notifications.filter(n => n.id !== id);
        const unreadCount = updatedNotifications.filter(n => !n.isRead).length;
        
        set({ 
          notifications: updatedNotifications,
          unreadCount 
        });
      },
      
      clearAllNotifications: () => {
        set({ 
          notifications: [],
          unreadCount: 0 
        });
      },
      
      // UI Actions
      toggleSidebar: () => {
        const { sidebarOpen } = get();
        set({ sidebarOpen: !sidebarOpen });
      },
      
      setSidebarOpen: (open) => {
        set({ sidebarOpen: open });
      },
      
      openModal: (modalId) => {
        const { modalStack } = get();
        set({ modalStack: [...modalStack, modalId] });
      },
      
      closeModal: (modalId) => {
        const { modalStack } = get();
        if (modalId) {
          // Close specific modal
          set({ modalStack: modalStack.filter(id => id !== modalId) });
        } else {
          // Close top modal
          set({ modalStack: modalStack.slice(0, -1) });
        }
      },
      
      closeAllModals: () => {
        set({ modalStack: [] });
      },
    }),
    {
      name: STORAGE_KEYS.PREFERENCES,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        fontSize: state.fontSize,
        highContrast: state.highContrast,
        reducedMotion: state.reducedMotion,
        notifications: state.notifications,
      }),
    }
  )
);

// Initialize app state on store creation
if (typeof window !== 'undefined') {
  // Set up online/offline detection
  window.addEventListener('online', () => {
    useAppStore.getState().setOnlineStatus(true);
  });
  
  window.addEventListener('offline', () => {
    useAppStore.getState().setOnlineStatus(false);
  });
  
  // Set initial online status
  useAppStore.getState().setOnlineStatus(navigator.onLine);
  
  // Set up theme change detection
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    const { theme } = useAppStore.getState();
    if (theme === 'auto') {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });
}
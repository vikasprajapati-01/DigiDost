// Export all stores
export { useAuthStore } from './authStore';
export { useAppStore } from './appStore';
export { useAssignmentStore } from './assignmentStore';
export { useTournamentStore } from './tournamentStore';
export { useLearningStore } from './learningStore';
export { useGameStore } from './gameStore';

// Import stores for selectors
import { useAuthStore } from './authStore';
import { useAppStore } from './appStore';
import { useGameStore } from './gameStore';

// Export mock data
export { mockData } from '../data/mockData';

// Store selectors for common use cases
export const useCurrentUser = () => useAuthStore(state => state.user);
export const useIsAuthenticated = () => useAuthStore(state => state.isAuthenticated);
export const useUserRole = () => useAuthStore(state => state.user?.role);
export const useTheme = () => useAppStore(state => state.theme);
export const useLanguage = () => useAppStore(state => state.language);
export const useIsOnline = () => useAppStore(state => state.isOnline);
export const useNotifications = () => useAppStore(state => ({ 
  notifications: state.notifications, 
  unreadCount: state.unreadCount 
}));
export const useGameProgress = () => useGameStore(state => ({
  level: state.level,
  xp: state.xp,
  coins: state.coins,
  gems: state.gems,
  currentStreak: state.currentStreak,
}));